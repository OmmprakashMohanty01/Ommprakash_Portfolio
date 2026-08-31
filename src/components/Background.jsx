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

      {/* Static CSS Noise Texture (Replaces expensive SVG feTurbulence) */}
      <div
        className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.02]"
        style={{
          backgroundImage: 'url("data:image/png;base64,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")',
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
      
    </div>
  );
};

export default Background;
