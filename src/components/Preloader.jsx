import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Lock scroll and reset to top
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    
    let isReady = false;
    let minTimePassed = false;
    let isCompleted = false;
    
    const completeSequence = () => {
      if (isCompleted) return;
      isCompleted = true;
      onComplete();
    };

    // Minimum cinematic duration: 800ms
    const minTimer = setTimeout(() => {
      minTimePassed = true;
      if (isReady) completeSequence();
    }, 800);
    
    // Maximum fallback duration: 1400ms
    const maxTimer = setTimeout(() => {
      completeSequence();
    }, 1400);

    // Handle document readiness
    const handleReady = () => {
      isReady = true;
      if (minTimePassed) completeSequence();
    };

    if (document.readyState === 'complete') {
      handleReady();
    } else {
      window.addEventListener('load', handleReady);
    }

    return () => {
      document.body.style.overflow = '';
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
      window.removeEventListener('load', handleReady);
    };
  }, [onComplete]);

  // Framer Motion variants
  const exitVariant = shouldReduceMotion 
    ? { opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }
    : { y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } };

  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      exit={exitVariant}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col justify-between p-6 md:p-12 items-center overflow-hidden"
    >
      {/* Top Meta */}
      <div className="w-full flex justify-between text-slate-500 font-mono text-xs md:text-sm tracking-widest uppercase">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 0.1 }}
        >
          00 / INITIALIZING
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 0.1 }}
        >
          OMM
        </motion.span>
      </div>

      {/* Center Display */}
      <div className="flex-1 flex items-center justify-center w-full px-4 overflow-hidden">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { y: 40, opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
          animate={{ y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
          transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 0.2 }}
        >
          <h1 className="text-[clamp(2.5rem,8vw,8rem)] font-display font-bold text-white tracking-tighter uppercase whitespace-nowrap leading-none">
            OMMPRAKASH
          </h1>
        </motion.div>
      </div>

      {/* Bottom Meta */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center text-slate-500 font-mono text-xs md:text-sm tracking-widest uppercase gap-4">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 0.3 }}
        >
          Creative Technologist
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 0.3 }}
        >
          Software Engineer
        </motion.span>
      </div>
    </motion.div>
  );
};

export default Preloader;
