import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';

export default function DioramaCamera() {
  const scroll = useScroll();
  const { camera } = useThree();

  // Define a curved flight path for the camera using CatmullRomCurve3
  // This spline defines the entire spatial journey
  const cameraPath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.5, 12),     // Node 1: Start (Welcome)
      new THREE.Vector3(-6, 2.5, 0),     // Midpoint banking left
      new THREE.Vector3(0, 1.5, -15),    // Node 2: About Me
      new THREE.Vector3(6, 0.5, -30),    // Midpoint banking right and dipping
      new THREE.Vector3(0, 1.5, -45),    // Node 3: Projects
    ]);
  }, []);

  useFrame((state, delta) => {
    // 1. DAMPING: Smooth the raw scroll offset to create a premium "spring" inertia
    const smoothOffset = THREE.MathUtils.damp(
      state.camera.userData.scrollProgress || 0, 
      scroll.offset, 
      4, 
      delta
    );
    
    // Store the smoothed value to use in the next frame
    state.camera.userData.scrollProgress = smoothOffset;

    // 2. LERPING: Get the point on the curve for our smoothed offset
    const targetPosition = cameraPath.getPointAt(smoothOffset);
    
    // Move the camera smoothly towards the target position
    camera.position.lerp(targetPosition, 0.1);

    // 3. LOOK AHEAD: Calculate a point slightly ahead on the curve to look at
    const lookAheadOffset = Math.min(smoothOffset + 0.05, 1);
    const lookAtPosition = cameraPath.getPointAt(lookAheadOffset);
    
    if (!state.camera.userData.currentLookAt) {
      state.camera.userData.currentLookAt = new THREE.Vector3().copy(lookAtPosition);
    }
    
    state.camera.userData.currentLookAt.lerp(lookAtPosition, 0.1);
    camera.lookAt(state.camera.userData.currentLookAt);
  });

  return null;
}
