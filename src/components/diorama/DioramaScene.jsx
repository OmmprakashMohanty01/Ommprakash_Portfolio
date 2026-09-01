import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Environment } from '@react-three/drei';
import DioramaCamera from './DioramaCamera';
import DioramaNodes from './DioramaNodes';
import DioramaHTML from './DioramaHTML';

export default function DioramaScene() {
  return (
    <div className="w-full h-screen bg-[#050505] fixed inset-0 z-50">
      <Canvas camera={{ position: [0, 1.5, 12], fov: 60 }} gl={{ antialias: true, alpha: false }}>
        
        {/* Environment and Lighting for premium moody look */}
        <color attach="background" args={['#050505']} />
        <Environment preset="city" />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#00f3ff" />
        
        {/* Fog to hide the horizon and blend into the charcoal background */}
        <fog attach="fog" args={['#050505', 10, 30]} />

        {/* ScrollControls maps native scrolling to WebGL timeline (4 pages long) */}
        <ScrollControls pages={4} damping={0.2}>
          
          <Suspense fallback={null}>
            {/* The 3D geometry nodes */}
            <DioramaNodes />
            
            {/* The HTML UI overlay mapped to scroll */}
            <DioramaHTML />
          </Suspense>

          {/* The mathematical camera spline */}
          <DioramaCamera />
          
        </ScrollControls>
      </Canvas>
    </div>
  );
}
