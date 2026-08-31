import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * ScrollExpandMedia Component
 * 
 * Completely re-architected for high performance and UX.
 * Removes all manual scroll hijacking.
 * Uses native position: sticky and Framer Motion's useScroll.
 * Animates using composited properties (clipPath) to guarantee 60fps.
 */
const ScrollExpandMedia = ({
  mediaSrc,
  posterSrc,
  title,
  subtitle,
}) => {
  const containerRef = useRef(null);

  // Track the scroll progress of the large 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Apply a subtle spring to the scroll progress for cinematic smoothness
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001
  });

  // Animate the clip-path from a small central box to full screen.
  // Using inset avoids layout thrashing completely.
  const clipPath = useTransform(
    smoothProgress,
    [0, 1],
    // Start with a centered rectangle with rounded corners, expand to full viewport
    ["inset(30% 15% 30% 15% round 32px)", "inset(0% 0% 0% 0% round 0px)"]
  );

  // Split title if possible
  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  // Text movement based on scroll (splits apart to reveal media)
  const textXLeft = useTransform(smoothProgress, [0, 1], ["0vw", "-100vw"]);
  const textXRight = useTransform(smoothProgress, [0, 1], ["0vw", "100vw"]);
  
  // Background fade out
  const bgOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);

  return (
    // 300vh provides enough scroll distance for the expansion effect
    <div ref={containerRef} className="relative w-full h-[300vh]">
      
      {/* Sticky container holds the viewport while scrolling down */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#050505]">
        
        {/* Cinematic Background (Fades out as video expands) */}
        <motion.div 
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
        </motion.div>

        {/* The Expanding Media Box */}
        <motion.div
          style={{ clipPath }}
          className="absolute inset-0 z-10 w-full h-full flex items-center justify-center bg-black"
        >
          {mediaSrc ? (
            <video
              src={mediaSrc}
              poster={posterSrc}
              autoPlay
              muted
              loop
              playsInline
              preload='auto'
              className='w-full h-full object-cover opacity-80'
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
            />
          ) : (
            // Fallback cinematic gradient if no video is provided
            <div className="w-full h-full bg-gradient-to-tr from-slate-900 via-black to-slate-900 opacity-80" />
          )}
          {/* Subtle overlay for text readability when expanded */}
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        </motion.div>

        {/* Foreground Typography */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none mix-blend-difference">
          <div className="flex items-center justify-center gap-4 w-full px-4">
            <motion.h1 
              style={{ x: textXLeft }}
              className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-white tracking-tighter uppercase"
            >
              {firstWord}
            </motion.h1>
            <motion.h1 
              style={{ x: textXRight }}
              className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-white tracking-tighter uppercase"
            >
              {restOfTitle}
            </motion.h1>
          </div>
          {subtitle && (
            <motion.p 
              style={{ opacity: bgOpacity }}
              className="mt-8 text-slate-300 font-mono tracking-widest uppercase text-xs md:text-sm text-center max-w-lg px-4"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: bgOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-white/50 flex flex-col items-center gap-2 font-mono text-[10px] tracking-widest uppercase pointer-events-none"
        >
          <span className="animate-pulse">Scroll down</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>

      </div>
    </div>
  );
};

export default ScrollExpandMedia;
