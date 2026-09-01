import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const row1 = [
  "React.js", "Next.js", "Python", "YOLOv8", "OpenCV", "Vector DBs", 
  "Docker", "Supabase", "PyTorch", "TypeScript", "FastAPI", "PostgreSQL"
];

const row2 = [
  "Premiere Pro", "After Effects", "Photoshop", "Motion Graphics", 
  "Figma", "Notion", "DaVinci Resolve", "Sound Design", "Cinema 4D", "Visual Storytelling"
];

export default function TechMarquee() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "100px 0px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section 
      ref={containerRef}
      className="w-full relative z-10 bg-transparent py-20 overflow-hidden select-none"
    >
      {/* Section Sub-heading */}
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <span className="text-[11px] font-mono tracking-[0.3em] text-gray-500 uppercase">
          04 // Dual-Engine Capabilities & Core Tools
        </span>
      </div>

      {/* Left/Right Vignette Blur Gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#050505] to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#050505] to-transparent z-20" />

      <div className="flex flex-col gap-6 w-full">
        
        {/* ROW 1: Logic / Dev (Leftward Flow) */}
        <div className="flex overflow-hidden w-full">
          <motion.div 
            className="flex items-center gap-10 whitespace-nowrap will-change-transform"
            animate={
              isInView && !shouldReduceMotion
                ? { x: ["0%", "-50%"] }
                : { x: "0%" }
            }
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 32,
            }}
          >
            {/* Duplicated for smooth loop */}
            {[...row1, ...row1, ...row1, ...row1].map((item, idx) => (
              <span 
                key={idx} 
                className="text-white/30 hover:text-white/80 transition-colors duration-300 font-mono text-sm md:text-base tracking-[0.25em] uppercase flex items-center gap-6"
              >
                <span>{item}</span>
                <span className="text-white/10 text-xs">✦</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* ROW 2: Magic / Creative (Rightward Flow) */}
        <div className="flex overflow-hidden w-full">
          <motion.div 
            className="flex items-center gap-10 whitespace-nowrap will-change-transform"
            animate={
              isInView && !shouldReduceMotion
                ? { x: ["-50%", "0%"] }
                : { x: "0%" }
            }
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 35,
            }}
          >
            {/* Duplicated for smooth loop */}
            {[...row2, ...row2, ...row2, ...row2].map((item, idx) => (
              <span 
                key={idx} 
                className="text-white/25 hover:text-white/80 transition-colors duration-300 font-mono text-sm md:text-base tracking-[0.25em] uppercase flex items-center gap-6"
              >
                <span>{item}</span>
                <span className="text-white/10 text-xs">✦</span>
              </span>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
