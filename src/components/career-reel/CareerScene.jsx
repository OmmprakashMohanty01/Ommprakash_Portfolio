import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import CareerCamera from './CareerCamera';
import CareerEnvironment from './CareerEnvironment';
import CareerTimelineObject from './CareerTimelineObject';
import SportSenseClip from './projects/SportSenseClip';
import BrandingEngineClip from './projects/BrandingEngineClip';
import ZeroOneClip from './projects/ZeroOneClip';

export default function CareerScene({ isMobile }) {
  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ 
        antialias: !isMobile, 
        powerPreference: "high-performance",
        alpha: true 
      }}
    >
      <PerformanceMonitor 
        onDecline={() => setDpr(1)} 
        onIncline={() => setDpr(Math.min(window.devicePixelRatio, 1.5))} 
      />
      
      <CareerEnvironment isMobile={isMobile} />
      
      {/* 
        The Camera controller contains the GSAP ScrollTrigger timeline 
        that choreographs the whole scene.
      */}
      <CareerCamera isMobile={isMobile} />
      
      {/* Group containing all timeline elements, positioned in space */}
      <group position={[0, 0, 0]}>
        <CareerTimelineObject isMobile={isMobile} />
        
        {/* Project 01 */}
        <SportSenseClip position={[0, 0, -10]} isMobile={isMobile} />
        
        {/* Project 02 */}
        <BrandingEngineClip position={[0, -5, -25]} isMobile={isMobile} />
        
        {/* Project 03 */}
        <ZeroOneClip position={[10, 5, -40]} isMobile={isMobile} />
      </group>
    </Canvas>
  );
}
