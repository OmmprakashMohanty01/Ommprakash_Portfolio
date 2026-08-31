import React from 'react';

export default function CareerEnvironment({ isMobile }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
    </>
  );
}
