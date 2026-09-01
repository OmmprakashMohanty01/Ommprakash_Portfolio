import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Box, Cone, Torus } from '@react-three/drei';

export default function DioramaNodes() {
  const glassRef = useRef();

  useFrame((state, delta) => {
    if (glassRef.current) {
      glassRef.current.rotation.x += delta * 0.2;
      glassRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <>
      {/* Node 1: Welcome (Start of path) */}
      <group position={[0, 0, 0]}>
        <Box ref={glassRef} args={[3, 3, 3]} position={[0, 1.5, 0]}>
          <MeshTransmissionMaterial 
            backside
            thickness={2}
            roughness={0}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.1}
            color="#ffffff"
          />
        </Box>
      </group>

      {/* Node 2: About Me (Middle of path) */}
      <group position={[0, -1, -15]}>
        <Cone args={[2, 4, 32]} position={[-3, 2, 0]} rotation={[0, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#00f3ff" roughness={0.2} metalness={0.8} />
        </Cone>
        <Cone args={[1.5, 3, 32]} position={[3, 1.5, -2]} rotation={[0, -Math.PI / 4, 0]}>
          <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.9} />
        </Cone>
      </group>

      {/* Node 3: Projects (End of path) */}
      <group position={[0, 0, -45]}>
        <Torus args={[3, 0.2, 32, 100]} position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#333333" roughness={0.5} metalness={1} />
        </Torus>
        <Torus args={[2, 0.1, 32, 100]} position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0.5, 0]}>
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.8} />
        </Torus>
      </group>
    </>
  );
}
