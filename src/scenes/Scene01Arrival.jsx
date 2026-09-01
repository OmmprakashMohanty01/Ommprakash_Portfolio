import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Scene01Arrival({ onComplete }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState(0); 
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    let animationFrameId;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const logicalWidth = window.innerWidth;
    const logicalHeight = window.innerHeight;
    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;
    ctx.scale(dpr, dpr);

    let mouse = { x: logicalWidth / 2, y: logicalHeight / 2 };

    // --- 1. Extract Target Pixels for "OMMPRAKASH" ---
    const offCanvas = document.createElement('canvas');
    offCanvas.width = logicalWidth;
    offCanvas.height = logicalHeight;
    const offCtx = offCanvas.getContext('2d');

    offCtx.fillStyle = 'white';
    const fontSize = Math.min(logicalWidth * 0.09, 130); 
    offCtx.font = `bold ${fontSize}px "Syncopate", sans-serif`;
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillText('OMMPRAKASH', logicalWidth / 2, logicalHeight / 2 - 50);

    const textData = offCtx.getImageData(0, 0, logicalWidth, logicalHeight);
    let targetCoordinates = [];
    
    // INCREASED STEP SIZE (from 6 to 8) to eliminate overlapping text messiness
    const step = 8;
    for (let y = 0; y < textData.height; y += step) {
      for (let x = 0; x < textData.width; x += step) {
        if (textData.data[(y * 4 * textData.width) + (x * 4) + 3] > 128) {
          targetCoordinates.push({ x, y });
        }
      }
    }

    // --- 2. The Code Rain Class ---
    const characters = '01XY<>{}[]/*&^%$#@!MNCXZ';
    
    class CodeDrop {
      constructor(target = null) {
        this.x = target ? target.x + (Math.random() * 300 - 150) : Math.random() * logicalWidth;
        this.y = Math.random() * -logicalHeight * 2; 
        this.speed = Math.random() * 10 + 3;
        this.char = characters[Math.floor(Math.random() * characters.length)];
        this.target = target; 
        this.ease = 0.04 + Math.random() * 0.02; // Snappier assembly for a cleaner lock
        this.locked = false;
        
        // 10% chance for an infrared red accent character
        this.isRed = Math.random() < 0.10; 
        this.z = Math.random() * 0.5 + 0.5; 
      }

      update(currentPhase) {
        if (currentPhase === 0) {
          this.y += this.speed;
          if (this.y > logicalHeight) this.y = Math.random() * -100;
          if (Math.random() < 0.05) this.char = characters[Math.floor(Math.random() * characters.length)];
          
          ctx.fillStyle = this.isRed ? 'rgba(255, 51, 0, 0.4)' : 'rgba(255, 255, 255, 0.12)'; 
          ctx.font = '10px monospace';
          ctx.fillText(this.char, this.x, this.y);
          
        } else if (currentPhase >= 1) {
          if (this.target) {
            let dx = this.target.x - this.x;
            let dy = this.target.y - this.y;
            this.x += dx * this.ease;
            this.y += dy * this.ease;
            
            if (Math.abs(dx) < 0.8 && Math.abs(dy) < 0.8) this.locked = true;

            let renderX = this.x;
            let renderY = this.y;
            if (this.locked && currentPhase >= 2) {
              const parallaxX = (mouse.x - logicalWidth / 2) * 0.015 * this.z;
              const parallaxY = (mouse.y - logicalHeight / 2) * 0.015 * this.z;
              renderX += parallaxX;
              renderY += parallaxY;
            }

            if (this.locked) {
              // Clean, crisp coloring for the final carved name
              ctx.fillStyle = this.isRed ? '#FF3300' : 'rgba(255, 255, 255, 0.95)'; 
            } else {
              ctx.fillStyle = this.isRed ? 'rgba(255, 51, 0, 0.5)' : 'rgba(255, 255, 255, 0.4)';
              if (Math.random() < 0.1) this.char = characters[Math.floor(Math.random() * characters.length)];
            }
            
            ctx.font = '10px monospace';
            ctx.fillText(this.char, renderX, renderY);
            
          } else {
            // Anti-gravity background embers drifting up
            this.y -= this.speed * 0.15;
            if (this.y < -50) this.y = logicalHeight + 50;
            
            ctx.fillStyle = this.isRed ? 'rgba(255, 51, 0, 0.15)' : 'rgba(255, 255, 255, 0.03)';
            ctx.font = '10px monospace';
            ctx.fillText(this.char, this.x, this.y);
          }
        }
      }
    }

    let drops = targetCoordinates.map(target => new CodeDrop(target));
    for(let i=0; i<250; i++) drops.push(new CodeDrop(null));

    const t1 = setTimeout(() => setPhase(1), 2500); 
    const t2 = setTimeout(() => setPhase(2), 6000); 

    let enginePhase = 0;
    const animate = () => {
      ctx.fillStyle = 'rgba(3, 3, 3, 0.35)';
      ctx.fillRect(0, 0, logicalWidth, logicalHeight);
      
      setPhase((prev) => {
        enginePhase = prev;
        return prev;
      });

      drops.forEach(drop => drop.update(enginePhase));
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleEnter = () => {
    if (isExiting) return; 
    setIsExiting(true);
    setPhase(3); 
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 800); 
  };

  return (
    <motion.div 
      exit={{ opacity: 0, filter: "blur(20px)" }} 
      transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
      className="absolute inset-0 w-full h-full bg-[#030303] z-50 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full mix-blend-screen pointer-events-none" />

      <AnimatePresence>
        {phase >= 2 && !isExiting && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
            className="absolute bottom-16 md:bottom-24 left-0 w-full flex flex-col items-center justify-center text-center pointer-events-auto z-10"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-sm md:text-xl font-serif text-white/80 tracking-widest max-w-2xl px-6 mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                I BUILD THINGS BETWEEN LOGIC AND IMAGINATION.
              </p>
            </motion.div>
            
            <button
              onClick={handleEnter}
              disabled={isExiting}
              className="font-mono text-xs text-white/50 hover:text-white tracking-[0.3em] uppercase transition-all duration-500 group relative px-12 py-3 border border-white/10 hover:border-[#FF3300]/50 rounded-full bg-black/50 backdrop-blur-md overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-[#FF3300]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              
              <span className="relative flex items-center">
                <span className="absolute left-[-20px] opacity-0 group-hover:opacity-100 transition-all duration-500 text-[#FF3300]">›</span>
                [ Enter ]
                <span className="absolute right-[-20px] opacity-0 group-hover:opacity-100 transition-all duration-500 text-[#FF3300]">‹</span>
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
