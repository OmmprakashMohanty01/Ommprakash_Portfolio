import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Grid } from '@react-three/drei';

export default function CareerScene() {
  const gridRef = useRef();

  // Endlessly move the grid forward along Z-axis for infinite momentum
  useFrame((state, delta) => {
    if (gridRef.current) {
      gridRef.current.position.z += delta * 1.5;
      if (gridRef.current.position.z > 5) {
        gridRef.current.position.z = 0;
      }
    }
  });

  return (
    <>
      {/* Deep cinematic fog so grid fades into the dark abyss */}
      <fog attach="fog" args={['#050505', 5, 25]} />

      {/* High-fashion stark spotlight from above */}
      <spotLight position={[0, 10, 5]} intensity={4} color="#ffffff" penumbra={1} angle={0.8} />
      <ambientLight intensity={0.15} />

      {/* The Architectural Data Floor */}
      <group ref={gridRef} position={[0, -2.2, 0]}>
        <Grid
          position={[0, 0, 0]}
          args={[100, 100]} 
          cellSize={1} 
          cellThickness={1}
          cellColor="#1a1a1a"
          sectionSize={5} 
          sectionThickness={1.5}
          sectionColor="#ffffff"
          fadeDistance={25}
        />
      </group>
    </>
  );
}
