import React, { useRef } from 'react';
import { useVideoTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function SportSenseClip({ position, isMobile }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current && !isMobile) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  // Only load video if not on mobile/reduced environments to save performance
  // On mobile, just render a fallback physical plane
  if (isMobile) {
    return (
      <group position={position} ref={groupRef}>
        <mesh position={[-2, 0, 0]} rotation={[0, 0.2, 0]}>
          <planeGeometry args={[4, 2.25]} />
          <meshPhysicalMaterial color="#0a0a0a" roughness={0.1} metalness={0.8} />
        </mesh>
      </group>
    );
  }

  return (
    <group position={position} ref={groupRef}>
      {/* Broadcast Video Plane */}
      <VideoPlane 
        src="/media/multi-cam-sportsense/broadcast.mp4" 
        position={[-2, 0, 0]} 
        rotation={[0, 0.2, 0]} 
      />
      
      {/* Tacticam Video Plane */}
      <VideoPlane 
        src="/media/multi-cam-sportsense/tacticam.mp4" 
        position={[2, -1, 1]} 
        rotation={[0, -0.2, 0]} 
        scale={0.8}
      />
    </group>
  );
}

function VideoPlane({ src, position, rotation, scale = 1 }) {
  const texture = useVideoTexture(src, { 
    muted: true, 
    loop: true, 
    start: true,
    crossOrigin: "Anonymous" 
  });

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[4, 2.25]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}
