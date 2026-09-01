import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function InteractiveVoidLight({ isMobile }) {
  const lightRef = useRef();
  const targetVec = new THREE.Vector3();

  useFrame((state) => {
    if (!lightRef.current || isMobile) return; // Disable interactive light on touch devices

    // Map the 2D DOM mouse pointer (-1 to +1) to a 3D coordinate in front of the moving camera
    // We use a normalized Z depth (e.g. 0.8) to push the light slightly into the scene
    targetVec.set(state.pointer.x, state.pointer.y, 0.8);
    
    // Unproject converts the 2D NDC coordinates into 3D world space based on the current camera
    targetVec.unproject(state.camera);

    // Smoothly interpolate the light's physical position towards the mouse
    lightRef.current.position.lerp(targetVec, 0.05);
  });

  // If mobile, we just return null to save GPU
  if (isMobile) return null;

  return (
    <pointLight 
      ref={lightRef}
      color="#00f3ff"
      intensity={3}
      distance={15}
      decay={2}
      castShadow
    />
  );
}
