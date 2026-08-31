import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Reusable Magnetic Neon Button
 * 
 * Features:
 * - Magnetic pull effect on hover using Framer Motion springs
 * - Glassmorphism dark background with Cyan neon border
 * - Intense glowing drop-shadow on hover
 * - Accepts href (renders <a>) or onClick (renders <button>)
 */
const MagneticButton = ({ children, onClick, href, className = "", ...props }) => {
  const ref = useRef(null);
  
  // Motion values to track the mouse position offset
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for elegant snapping as requested
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // Calculate the center of the button
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Map the distance so the max movement at the edge of the button is exactly 15px
    const maxMovement = 15;
    x.set((distanceX / (width / 2)) * maxMovement);
    y.set((distanceY / (height / 2)) * maxMovement);
  };

  const handleMouseLeave = () => {
    // Snap back to origin
    x.set(0);
    y.set(0);
  };

  // Dark glassmorphism and subtle white border, transitioning to elegant glow
  const baseClasses = `
    relative inline-flex items-center justify-center 
    px-6 py-3 rounded-full 
    bg-black/40 backdrop-blur-md 
    border border-white/30 text-white
    transition-all duration-300 ease-out
    hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]
    ${className}
  `;

  // Dynamically render anchor or button based on props
  const Component = href ? motion.a : motion.button;
  const componentProps = href ? { href, ...props } : { onClick, ...props };

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      className={baseClasses}
      {...componentProps}
    >
      <span className="relative z-10 flex items-center gap-2 pointer-events-none whitespace-nowrap font-medium tracking-wide">
        {children}
      </span>
    </Component>
  );
};

export default MagneticButton;
