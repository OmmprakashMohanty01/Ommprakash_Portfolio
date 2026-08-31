import React from 'react';

const Background = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-black overflow-hidden pointer-events-none flex items-start justify-center">
      
      {/* Premium Ambient Spotlight (Linear/Vercel Aesthetic) */}
      <div
        className="absolute top-[-30%] w-[120vw] max-w-[1200px] h-[60vh] rounded-[100%] bg-white blur-[120px] opacity-[0.03] pointer-events-none"
        style={{
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
      />
      
      {/* Secondary core highlight for depth */}
      <div
        className="absolute top-[-20%] w-[60vw] max-w-[600px] h-[40vh] rounded-[100%] bg-slate-300 blur-[150px] opacity-[0.02] pointer-events-none"
        style={{
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
      />

      {/* SVG Film Grain Noise Overlay (Reduced Opacity for Sophistication) */}
      <svg
        className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.015]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      
    </div>
  );
};

export default Background;
