import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion';

const roles = [
  "AI & Web Engineer",
  "Digital Storyteller",
  "Motion Graphics Artist"
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // 1. Mouse Tracking Physics for Immersive Text
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for buttery smooth tracking (no jitter)
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax constraints (Text floats subtly opposite to mouse, portrait moves slightly with it)
  const textX = useTransform(smoothX, [-1, 1], [25, -25]);
  const textY = useTransform(smoothY, [-1, 1], [25, -25]);
  const portraitX = useTransform(smoothX, [-1, 1], [-12, 12]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) * 2 - 1);
      mouseY.set((e.clientY / innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#050505] flex items-center select-none">
      
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 flex items-center justify-start pl-[15vw] z-0 pointer-events-none">
        <div className="w-[60vw] max-w-4xl h-[45vh] bg-white/[0.025] blur-[160px] rounded-full" />
      </div>

      {/* 2. Kinetic Typography (Mouse-Tracked Parallax on Left) */}
      <motion.div 
        style={shouldReduceMotion ? {} : { x: textX, y: textY }}
        className="relative z-10 w-full pl-6 md:pl-16 lg:pl-24 pr-4 flex flex-col justify-center pointer-events-none"
      >
        {/* Location & Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
          className="mb-6 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md text-xs font-mono tracking-widest text-gray-300 uppercase shadow-2xl w-fit pointer-events-auto"
        >
          <span className="text-sm">📍</span>
          <span>Bhubaneswar, Odisha</span>
          <span className="text-white/20">|</span>
          <span className="text-gray-400">India</span>
        </motion.div>

        {/* Massive Staggered Asymmetrical Typography */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
          className="flex flex-col"
        >
          <h1 className="text-[clamp(3.5rem,11.5vw,11.5rem)] leading-[0.82] font-display font-black text-white tracking-tighter mix-blend-difference z-30 drop-shadow-2xl">
            OMMPRAKASH
          </h1>
          <h1 className="text-[clamp(3.5rem,11.5vw,11.5rem)] leading-[0.82] font-display font-black text-white/20 tracking-tighter ml-[4vw] md:ml-[8vw]">
            MOHANTY
          </h1>
        </motion.div>
        
        {/* Kinetic Animated Subtitle */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 0.25 }}
          className="mt-6 md:mt-8 flex flex-col gap-2 pointer-events-auto"
        >
          <div className="h-7 flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ y: 12, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -12, opacity: 0, filter: "blur(4px)" }}
                transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
                className="font-mono text-xs md:text-sm tracking-[0.25em] text-[#00f3ff] uppercase drop-shadow-[0_0_10px_rgba(0,243,255,0.4)]"
              >
                ✦ {roles[roleIndex]} ✦
              </motion.p>
            </AnimatePresence>
          </div>

          <span className="text-xs font-mono tracking-widest text-gray-500 uppercase">
            B.Tech CSE // AI & Dev Core // Class of 2025
          </span>
        </motion.div>
      </motion.div>

      {/* 3. Asymmetrical Portrait Placement (Bottom Right) */}
      <motion.div
        style={shouldReduceMotion ? {} : { x: portraitX }}
        initial={{ opacity: 0, scale: 1.05, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
        className="absolute bottom-0 right-0 md:right-[4vw] lg:right-[8vw] z-20 w-[80vw] sm:w-[60vw] md:w-[44vw] lg:w-[36vw] max-w-[580px] pointer-events-none flex justify-center items-end"
      >
        <img
          src="/suit-cutout-clean.png" 
          alt="Ommprakash Mohanty"
          className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
        />
        {/* Soft floor shadow to ground cutout into the background */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none" />
      </motion.div>

    </section>
  );
}
