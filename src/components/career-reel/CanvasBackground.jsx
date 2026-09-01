import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Noise, Vignette, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

const DataGrid = () => {
  const meshRef = useRef();
  
  // Dimensions of the mathematical grid
  const gridSize = 60; // 60x60 grid
  const spacing = 1.5; // Distance between nodes
  const count = gridSize * gridSize;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!meshRef.current) return;
    let i = 0;
    const offset = (gridSize * spacing) / 2;
    
    // Build the grid once
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        dummy.position.set(
          x * spacing - offset,
          -4, // Floor level relative to the camera
          z * spacing - offset
        );
        // Brutalist architectural nodes: thin, rigid vertical lines
        dummy.scale.set(0.05, 0.6, 0.05); 
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i++, dummy.matrix);
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy, gridSize, spacing]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Move the entire grid structure smoothly forward along the Z-axis
      meshRef.current.position.z += delta * 3.0; // Forward momentum speed
      
      // Mathematical reset: once it moves forward exactly one 'spacing' unit, 
      // snap it back perfectly to create the illusion of an infinite treadmill.
      if (meshRef.current.position.z > spacing) {
        meshRef.current.position.z -= spacing;
      }
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[1, 1, 1]} />
      {/* 
        Stark, monochromatic material that heavily reacts to the single spotlight.
        High metalness and low roughness makes the nodes catch sharp reflections.
      */}
      <meshStandardMaterial 
        color="#888888" 
        metalness={0.9} 
        roughness={0.1} 
      />
    </instancedMesh>
  );
};

export default function CanvasBackground() {
  return (
    <>
      <DataGrid />

      {/* Harsh, physical film post-processing */}
      <EffectComposer disableNormalPass>
        {/* Barely noticeable bloom for physical halation, not neon glow */}
        <Bloom intensity={0.2} luminanceThreshold={0.5} mipmapBlur />
        <Noise premultiply opacity={0.6} blendFunction={BlendFunction.OVERLAY} />
        <Vignette eskil={false} offset={0.5} darkness={0.5} blendFunction={BlendFunction.MULTIPLY} />
      </EffectComposer>
    </>
  );
}
