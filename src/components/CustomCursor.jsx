import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/**
 * Inner component encapsulating the expensive Framer Motion physics.
 * Only mounted when the device is confirmed to have a fine pointer.
 */
const CursorImplementation = () => {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  
  // Track hover state natively without React Context overhead
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");

  const springConfig = { damping: 40, stiffness: 400, mass: 0.2 }; // tighter, less bouncy spring
  const springRingX = useSpring(ringX, springConfig);
  const springRingY = useSpring(ringY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      dotX.set(e.clientX - 2); // 4px dot
      dotY.set(e.clientY - 2);
      
      // Ring follows a bit loosely, but tightens up
      ringX.set(e.clientX - (isHovering ? 24 : 12));
      ringY.set(e.clientY - (isHovering ? 24 : 12));
    };

    const handleMouseOver = (e) => {
      const interactive = e.target.closest('a, button, [data-cursor="interactive"], .cursor-interactive');
      if (interactive) {
        setIsHovering(true);
        setHoverText(interactive.getAttribute('data-cursor-text') || "");
      } else {
        setIsHovering(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [dotX, dotY, ringX, ringY, isHovering]);

  return (
    <div className="pointer-events-none z-[9999]">
      {/* Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY }}
      />
      {/* Subtle Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center border border-white/30 backdrop-blur-[2px]"
        initial={{ width: 24, height: 24 }}
        animate={{ 
          width: isHovering ? 48 : 24, 
          height: isHovering ? 48 : 24,
          backgroundColor: isHovering ? "rgba(255,255,255,0.05)" : "transparent"
        }}
        transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
        style={{ x: springRingX, y: springRingY }}
      >
        <AnimatePresence>
          {isHovering && hoverText && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[8px] font-mono tracking-widest text-white uppercase mix-blend-difference"
            >
              {hoverText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
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
