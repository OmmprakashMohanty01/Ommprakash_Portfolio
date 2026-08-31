import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

/**
 * Preloader Component
 * 
 * Futuristic terminal-based preloader sequence.
 * Features a rapid 0-100% counter and smoothly slides up off-screen
 * after exactly 1.5 seconds. Fires onComplete when finished.
 */
const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    // Rapid counter logic: reach 100% in roughly 1.2 seconds
    let currentCount = 0;
    const duration = 1200; 
    const stepTime = Math.abs(Math.floor(duration / 100));
    
    const counterInterval = setInterval(() => {
      currentCount += 1;
      setCount(currentCount);
      if (currentCount >= 100) {
        clearInterval(counterInterval);
      }
    }, stepTime);

    // After exactly 1.5 seconds (1500ms), start the exit animation
    const exitTimer = setTimeout(async () => {
      // Powerful, smooth ease-in-out curve for the slide up
      await controls.start({
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      });
      
      // Notify parent that the preloader has fully exited
      if (onComplete) {
        onComplete();
      }
    }, 1500);

    return () => {
      clearInterval(counterInterval);
      clearTimeout(exitTimer);
    };
  }, [controls, onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={controls}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0a0a0a] text-[#00ff66] font-mono select-none"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Massive Percentage Counter */}
        <div className="text-6xl md:text-9xl font-bold tracking-tighter">
          {count}%
        </div>
        
        {/* Fast-typing / Pulse Terminal Text */}
        <div className="text-xs md:text-sm tracking-widest uppercase animate-pulse flex items-center gap-2">
          <span>INITIALIZING NEURAL ARCHITECTURE...</span>
          <span className="w-2 h-4 bg-[#00ff66] block" />
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
