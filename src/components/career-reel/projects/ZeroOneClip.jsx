import React, { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function ZeroOneClip({ position, isMobile }) {
  const groupRef = useRef();
  
  // Load the verified logo texture
  const logoTexture = useTexture('/media/zero-one/logo.jpeg');

  useFrame((state, delta) => {
    if (groupRef.current && !isMobile) {
      // Subtle float effect
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <group position={position} ref={groupRef}>
      <mesh>
        {/* The aspect ratio of the logo is likely square or slightly wide, let's use 1:1 or 16:9 
            Assuming it's a wide rectangle or square, let's use a standard 2x2. 
        */}
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial 
          map={logoTexture} 
          transparent 
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}
