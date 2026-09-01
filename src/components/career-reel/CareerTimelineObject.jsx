import React, { useRef } from 'react';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function CareerTimelineObject({ isMobile }) {
  const groupRef = useRef();

  return (
    <group ref={groupRef} position={[0, -3, -20]}>
      {/* Main Base Track */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
         <boxGeometry args={[2, 0.1, 80]} />
         <meshStandardMaterial metalness={0.9} roughness={0.4} color="#111111" />
      </mesh>
      
      {/* Left Rail */}
      <mesh position={[-1.2, 0.2, 0]} receiveShadow castShadow>
         <boxGeometry args={[0.1, 0.4, 80]} />
         <meshStandardMaterial metalness={1} roughness={0.2} color="#222222" />
      </mesh>

      {/* Right Rail */}
      <mesh position={[1.2, 0.2, 0]} receiveShadow castShadow>
         <boxGeometry args={[0.1, 0.4, 80]} />
         <meshStandardMaterial metalness={1} roughness={0.2} color="#222222" />
      </mesh>
      
      {/* Crossbars / Sprockets */}
      {Array.from({ length: 40 }).map((_, i) => {
        const z = 30 - i * 2;
        // Make every 5th one glow slightly
        const isMajor = i % 5 === 0;
        
        return (
          <mesh key={i} position={[0, 0.1, z]} receiveShadow castShadow>
            <boxGeometry args={[2.4, 0.05, 0.1]} />
            <meshStandardMaterial 
              metalness={0.5} 
              roughness={0.5} 
              color={isMajor ? "#ffffff" : "#1a1a1a"} 
              emissive={isMajor ? "#ffffff" : "#000000"} 
              emissiveIntensity={isMajor ? 0.5 : 0} 
            />
          </mesh>
        );
      })}
    </group>
  );
}
