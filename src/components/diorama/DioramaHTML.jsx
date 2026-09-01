import React from 'react';
import { Scroll, useScroll } from '@react-three/drei';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useFrame } from '@react-three/fiber';

export default function DioramaHTML() {
  const scroll = useScroll();
  const scrollProgress = useMotionValue(0);

  // Sync Drei's scroll offset to Framer Motion
  useFrame(() => {
    scrollProgress.set(scroll.offset);
  });

  // Map scroll offsets to opacities and Y transforms
  // Node 1 (0.0 -> 0.2)
  const opacity1 = useTransform(scrollProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollProgress, [0, 0.2], [0, -100]);

  // Node 2 (0.4 -> 0.6)
  const opacity2 = useTransform(scrollProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const y2 = useTransform(scrollProgress, [0.3, 0.5, 0.7], [100, 0, -100]);

  // Node 3 (0.8 -> 1.0)
  const opacity3 = useTransform(scrollProgress, [0.8, 0.95, 1.0], [0, 1, 1]);
  const y3 = useTransform(scrollProgress, [0.8, 0.95, 1.0], [100, 0, 0]);

  return (
    <Scroll html>
      {/* We use fixed positioning so the elements don't scroll natively, 
          instead they are driven purely by Framer Motion transforms */}
      
      {/* Node 1: Welcome */}
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className="fixed top-1/4 left-10 md:left-32 pointer-events-none"
      >
        <h1 className="text-6xl md:text-8xl font-display font-bold text-white tracking-tighter mb-4">
          WELCOME
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 font-light font-mono uppercase tracking-widest">
          Immersive Diorama
        </p>
      </motion.div>

      {/* Node 2: About Me */}
      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="fixed top-1/3 right-10 md:right-32 text-right pointer-events-none"
      >
        <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter mb-4">
          ABOUT / SKILLS
        </h2>
        <p className="text-lg md:text-xl text-[#00f3ff] font-light max-w-sm ml-auto">
          Creative Developer specializing in high-end WebGL experiences and architectural UI.
        </p>
      </motion.div>

      {/* Node 3: Projects */}
      <motion.div 
        style={{ opacity: opacity3, y: y3 }}
        className="fixed bottom-1/4 left-10 md:left-32 pointer-events-none"
      >
        <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter mb-4">
          PROJECTS
        </h2>
        <p className="text-lg md:text-xl text-slate-400 font-light font-mono uppercase tracking-widest">
          Final Destination
        </p>
      </motion.div>
    </Scroll>
  );
}
