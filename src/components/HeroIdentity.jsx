import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export default function HeroIdentity() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 80 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 80 });

  // Subtle Parallax
  const textX = useTransform(smoothX, [-1, 1], [15, -15]);
  const textY = useTransform(smoothY, [-1, 1], [10, -10]);
  const portraitX = useTransform(smoothX, [-1, 1], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.section 
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
      className="relative w-full h-screen overflow-hidden flex items-center bg-[#030303]"
    >
      {/* 1. The Premium Dark Aurora Background */}
      <div className="dark-aurora" />

      {/* 
        2. STRICT TYPOGRAPHY LAYER (Left Side)
        Width is capped to max-w-[65vw] to guarantee it never goes behind your head.
      */}
      <motion.div 
        style={{ x: textX, y: textY }}
        className="relative z-20 w-full pl-[6vw] flex flex-col items-start justify-center pointer-events-none max-w-[65vw]"
      >
        <div className="overflow-hidden pb-2">
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 0.1 }}
            className="font-bold tracking-tighter liquid-metal"
            style={{ 
              fontFamily: "'Syncopate', sans-serif",
              fontSize: "clamp(2.5rem, 6.5vw, 110px)", // Perfectly scaled to fit
              lineHeight: "0.9"
            }}
          >
            OMMPRAKASH
          </motion.h1>
        </div>
        
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 0.2 }}
            className="font-bold text-transparent tracking-tighter"
            style={{ 
              fontFamily: "'Syncopate', sans-serif",
              fontSize: "clamp(2.5rem, 6.5vw, 110px)",
              lineHeight: "0.9",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.4)"
            }}
          >
            MOHANTY
          </motion.h1>
        </div>

        {/* Short Pitch */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 0.5 }}
          className="mt-8 max-w-sm pointer-events-auto"
        >
          <p className="font-serif text-lg text-white/90 leading-relaxed mb-4">
            Bridging cinematic storytelling with scalable architecture.
          </p>
          <p className="font-mono text-[9px] text-[#FF3300] tracking-[0.2em] uppercase">
            Computer Vision ✦ LLM Ops ✦ Motion
          </p>
        </motion.div>
      </motion.div>

      {/* 
        3. THE PORTRAIT LAYER (Right Side)
        Anchored firmly to the right. It will not block the text.
      */}
      <motion.div
        style={{ x: portraitX }}
        initial={{ opacity: 0, x: "10vw", filter: "blur(10px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 0.2 }}
        className="absolute bottom-0 right-0 md:right-[2vw] z-10 w-[85vw] md:w-[45vw] h-[85vh] pointer-events-none"
      >
        <img 
          src="/suit-cutout-clean.png" 
          alt="Ommprakash Mohanty" 
          className="w-full h-full object-cover object-bottom grayscale contrast-[1.1] brightness-[0.9] mix-blend-lighten"
        />
        {/* Seamless Blending Masks */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/20 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#030303] to-transparent opacity-80" />
      </motion.div>

      {/* 4. Foreground UI (Status & Scroll Indicators) */}
      <div className="absolute inset-0 z-30 pointer-events-none p-6 md:p-12 flex flex-col justify-between mix-blend-difference">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 0.8 }}
          className="flex justify-between items-start font-mono text-[10px] uppercase tracking-[0.3em] text-white/50"
        >
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 bg-[#FF3300] rounded-full animate-pulse" />
            <p className="text-white">STATUS: READY</p>
          </div>
        </motion.div>
      </div>

    </motion.section>
  );
}
