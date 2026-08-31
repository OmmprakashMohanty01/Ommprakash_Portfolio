import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom / Magnetic Cursor Component
 * 
 * Implements a high-end dual-cursor effect (instant dot + trailing spring ring).
 * Strictly animates only x and y for 60fps performance without layout thrashing.
 * Completely disabled on touch/mobile devices via CSS media queries.
 */
const CustomCursor = () => {
  // Motion values for the small dot (instant)
  // Initialized off-screen to avoid flashing in the top-left corner
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Motion values for the larger ring target
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  // Spring physics for the trailing ring effect
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springRingX = useSpring(ringX, springConfig);
  const springRingY = useSpring(ringY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Offset by half the width/height to center the cursor exactly on the pointer
      // Dot is w-2 h-2 (8px), half is 4px
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
      
      // Ring is w-8 h-8 (32px), half is 16px
      ringX.set(e.clientX - 16);
      ringY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [dotX, dotY, ringX, ringY]);

  return (
    // Only display on devices that support hover and have a fine pointer (mouse)
    // Ensures mobile/touch devices do not see this buggy artifact
    <div className="hidden [@media(hover:hover)_and_(pointer:fine)]:block pointer-events-none z-[9999]">
      
      {/* Small Dot (Instantly follows mouse) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
        }}
      />
      
      {/* Larger Trailing Ring (Spring animated) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-[1.5px] border-white/50 rounded-full pointer-events-none z-[9998]"
        style={{
          x: springRingX,
          y: springRingY,
        }}
      />
      
    </div>
  );
};

export default CustomCursor;
