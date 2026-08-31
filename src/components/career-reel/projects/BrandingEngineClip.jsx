import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function BrandingEngineClip({ position, isMobile }) {
  const groupRef = useRef();

  // Create an abstract system graph
  const nodes = useMemo(() => [
    { id: 'Trigger', pos: [-4, 1, 0] },
    { id: 'Scheduler', pos: [-2, 2, -1] },
    { id: 'Dispatch', pos: [0, 0, 0] },
    { id: 'Idempotency', pos: [2, 1, 1] },
    { id: 'Verification', pos: [3, -1, 0] },
    { id: 'Publishing', pos: [5, 0, -2] },
  ], []);

  const lines = useMemo(() => {
    const points = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      points.push(new THREE.Vector3(...nodes[i].pos));
      points.push(new THREE.Vector3(...nodes[i+1].pos));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [nodes]);

  useFrame((state, delta) => {
    if (groupRef.current && !isMobile) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group position={position} ref={groupRef}>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <mesh key={node.id} position={node.pos}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
      ))}

      {/* Luminous Paths */}
      <lineSegments geometry={lines}>
        <lineBasicMaterial color="#ffffff" opacity={0.3} transparent />
      </lineSegments>

      {/* A structural frame surrounding the nodes */}
      <mesh position={[0.5, 0.5, -0.5]}>
        <boxGeometry args={[10, 5, 4]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.05} />
      </mesh>
    </group>
  );
}
