import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

export default function OrbitalParticles({ count = 5000, isMobile }) {
  const pointsRef = useRef();
  
  // We can tap into the global scroll state to drive velocity
  const { scrollYVelocity } = useScroll();

  // Generate initial particle positions, original positions (for returning), and colors
  const { positions, originalPositions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color('#ffffff'), // dim white
      new THREE.Color('#708090'), // slate grey
      new THREE.Color('#00f3ff'), // cyan highlight
      new THREE.Color('#333333'), // dark grey
    ];

    for (let i = 0; i < count; i++) {
      // Create a wide, deep orbital field
      const theta = Math.random() * Math.PI * 2;
      const radius = 10 + Math.random() * 40; // Don't cluster at the exact center
      const y = (Math.random() - 0.5) * 80;
      
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius - 20; // push slightly back into the void

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Assign a random color from the palette, mostly weighting towards dark/grey
      const rand = Math.random();
      let color;
      if (rand > 0.95) color = colorPalette[2]; // 5% cyan
      else if (rand > 0.8) color = colorPalette[0]; // 15% white
      else if (rand > 0.4) color = colorPalette[1]; // 40% slate
      else color = colorPalette[3]; // 40% dark grey

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, originalPositions, colors };
  }, [count]);

  // Create an unprojected vector for the mouse once to reuse
  const mouse3D = new THREE.Vector3();

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // 1. Scroll Velocity (Forward Momentum / Rotation)
    // We add a gentle default rotation, plus a burst based on scroll velocity
    const velocity = scrollYVelocity.get();
    const scrollBoost = velocity * 0.0001;
    pointsRef.current.rotation.y -= (0.05 * delta) + scrollBoost;
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      velocity * 0.01,
      0.1
    );

    // 2. Mouse Repulsion (only if not mobile)
    if (!isMobile) {
      // Unproject the 2D cursor to 3D space
      mouse3D.set(state.pointer.x, state.pointer.y, 0.8);
      mouse3D.unproject(state.camera);

      const positionsArray = pointsRef.current.geometry.attributes.position.array;
      const repelRadius = 8; // How far the repulsion reaches

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Current position of this particle
        const px = positionsArray[i3];
        const py = positionsArray[i3 + 1];
        const pz = positionsArray[i3 + 2];

        // Original position of this particle
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];

        // Calculate distance from mouse to this particle
        const dx = px - mouse3D.x;
        const dy = py - mouse3D.y;
        const dz = pz - mouse3D.z;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < repelRadius * repelRadius) {
          // If within radius, repel away from the mouse
          const dist = Math.sqrt(distSq);
          const force = (repelRadius - dist) / repelRadius; // 0 to 1

          // Push direction normalized
          const pushX = (dx / dist) * force * 2;
          const pushY = (dy / dist) * force * 2;
          const pushZ = (dz / dist) * force * 2;

          positionsArray[i3] += pushX;
          positionsArray[i3 + 1] += pushY;
          positionsArray[i3 + 2] += pushZ;
        } else {
          // If outside radius, gently lerp back to the original orbital position
          positionsArray[i3] = THREE.MathUtils.lerp(px, ox, 0.05);
          positionsArray[i3 + 1] = THREE.MathUtils.lerp(py, oy, 0.05);
          positionsArray[i3 + 2] = THREE.MathUtils.lerp(pz, oz, 0.05);
        }
      }

      // Tell Three.js the buffer has been updated
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}
