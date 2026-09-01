import React from 'react';

export default function CareerEnvironment({ isMobile }) {
  return (
    <>
      <ambientLight intensity={0.1} color="#ffffff" />
      <directionalLight position={[10, 20, 5]} intensity={1.5} color="#ffffff" castShadow />
      
      {/* Spotlights for drama */}
      <spotLight position={[0, 15, -10]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" castShadow />
      <spotLight position={[0, 15, -25]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" castShadow />
      <spotLight position={[0, 15, -40]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" castShadow />
    </>
  );
}
