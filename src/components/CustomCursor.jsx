import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Inner component encapsulating the expensive Framer Motion physics.
 * Only mounted when the device is confirmed to have a fine pointer.
 */
const CursorImplementation = () => {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springRingX = useSpring(ringX, springConfig);
  const springRingY = useSpring(ringY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
      
      ringX.set(e.clientX - 16);
      ringY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [dotX, dotY, ringX, ringY]);

  return (
    <div className="pointer-events-none z-[9999]">
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-[1.5px] border-white/50 rounded-full pointer-events-none z-[9998]"
        style={{ x: springRingX, y: springRingY }}
      />
    </div>
  );
};

/**
 * Custom / Magnetic Cursor Wrapper
 * 
 * Safely guards against mounting heavy cursor logic on touch/coarse devices
 * while preserving the premium desktop experience.
 */
const CustomCursor = () => {
  // Default to false during SSR or initial mount to avoid flashing logic on mobile
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    // Determine pointer capability natively
    const mediaQuery = window.matchMedia("(pointer: fine)");
    
    // Set initial capability
    setHasFinePointer(mediaQuery.matches);
    
    // Handle hybrid devices seamlessly (e.g. detaching tablet keyboard)
    const handleChange = (e) => setHasFinePointer(e.matches);
    
    // Modern API with legacy fallback
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  if (!hasFinePointer) return null;

  return <CursorImplementation />;
};

export default CustomCursor;
