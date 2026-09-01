import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useFrame } from '../context/FrameContext';

/**
 * FrameToggle — Quiet, always-available toggle between flat and revealed modes.
 * 
 * Replaces the old DioramaToggle. Uses FrameContext instead of route navigation.
 * Keyboard accessible with proper aria-label.
 */
export default function FrameToggle() {
  const { mode, triggerExit, triggerReturn } = useFrame();
  const shouldReduceMotion = useReducedMotion();

  const isFlat = mode === 'flat';
  const isTransitioning = mode === 'transitioning';

  const handleClick = () => {
    if (isTransitioning) return; // Don't allow re-triggering during animation
    if (isFlat) {
      triggerExit();
    } else {
      triggerReturn();
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={isTransitioning}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 3 }}
      aria-label={isFlat ? 'Exit the frame into 3D space' : 'Return to flat portfolio view'}
      className={`
        fixed bottom-6 right-6 z-[100] 
        px-3 py-1.5 
        rounded-full 
        border border-white/10 
        bg-black/40 backdrop-blur-sm
        text-white/50 text-[10px] font-mono uppercase tracking-[0.2em]
        hover:text-white hover:border-white/30
        focus:outline-none focus:ring-1 focus:ring-white/30
        transition-colors duration-500
        disabled:opacity-30 disabled:cursor-not-allowed
      `}
    >
      {isFlat ? 'Exit' : 'Return'}
    </motion.button>
  );
}
