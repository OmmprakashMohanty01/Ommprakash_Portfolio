import React, { useRef } from 'react';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function CareerTimelineObject({ isMobile }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current && !isMobile) {
      // Subtle float or rotation
      meshRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -20]} rotation={[0, 0, Math.PI / 4]}>
      {/* A long refractive prism stretching through the Z axis */}
      <boxGeometry args={[0.5, 0.5, 60]} />
      
      {!isMobile ? (
        <MeshTransmissionMaterial 
          backside
          samples={4} 
          thickness={0.5} 
          chromaticAberration={0.05} 
          anisotropy={0.2} 
          distortion={0.1} 
          distortionScale={0.1} 
          temporalDistortion={0.05} 
          clearcoat={1} 
          attenuationDistance={1} 
          attenuationColor="#ffffff" 
          color="#a0a0a0"
        />
      ) : (
        <meshPhysicalMaterial 
          color="#333" 
          transparent 
          opacity={0.3} 
          roughness={0.2} 
          metalness={0.8} 
        />
      )}
    </mesh>
  );
}
