import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useScroll } from 'framer-motion';

export default function AtmosphereEngine() {
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Buttery smooth physics for the cursor spotlight
  const smoothX = useSpring(mousePosition.x, { damping: 50, stiffness: 400, mass: 0.5 });
  const smoothY = useSpring(mousePosition.y, { damping: 50, stiffness: 400, mass: 0.5 });

  // Deep Parallax Math: These elements move on the Y-axis slower than the user scrolls
  const y1 = useTransform(scrollY, [0, 4000], [0, -800]);
  const y2 = useTransform(scrollY, [0, 4000], [0, -1200]);
  const y3 = useTransform(scrollY, [0, 4000], [0, -400]);
  const gridY = useTransform(scrollY, [0, 4000], [0, -150]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      
      {/* 1. DEEP PARALLAX MONOLITHS (Creates infinite Z-depth) */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#FF3300] opacity-[0.025] blur-[120px]"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-[60%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-white opacity-[0.015] blur-[100px]"
      />
      <motion.div 
        style={{ y: y3 }}
        className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-[#FF3300] opacity-[0.015] blur-[150px]"
      />

      {/* 2. STRUCTURAL REFERENCE GRID (Moves independently of the foreground) */}
      <motion.div 
        style={{ y: gridY }}
        className="absolute -inset-[100%] opacity-[0.15]"
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 70%)'
          }}
        />
      </motion.div>

      {/* 3. VOLUMETRIC CURSOR SPOTLIGHT */}
      <motion.div
        style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
        className="absolute top-0 left-0 w-[80vw] md:w-[40vw] aspect-square rounded-full mix-blend-screen"
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0%,rgba(255,51,0,0.015)_40%,transparent_70%)]" />
      </motion.div>

    </div>
  );
}
