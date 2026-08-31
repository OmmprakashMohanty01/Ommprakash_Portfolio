import React from 'react';
import { motion } from 'framer-motion';

/**
 * BentoGrid Component
 * 
 * Showcases both Engineering and Storytelling projects.
 * Enforces strict performance rules: content-visibility optimization, 
 * lazy loaded media, and GPU-accelerated hover states.
 */
const BentoGrid = () => {
  // Staggered animation configuration for the grid wrapper
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Spring physics for individual card entry
  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  return (
    <section 
      className="py-24 w-full relative z-10" 
      // content-visibility skips rendering work for offscreen content
      style={{ contentVisibility: 'auto' }}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Main Grid Wrapper */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-[300px] md:auto-rows-[400px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          {/* CARD 1: Engineering - Multi-Cam SportSense (7 cols) */}
          <motion.div 
            variants={itemVariants}
            className="group relative md:col-span-7 rounded-3xl overflow-hidden bg-[#050505] border border-white/5 flex flex-col justify-end p-8 md:p-10 transition-colors duration-500 hover:border-white/20"
          >
            {/* Media Background */}
            <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
              <motion.img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
                alt="Multi-Cam SportSense"
                loading="lazy"
                className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none" />
            </div>
            {/* Content */}
            <div className="relative z-10">
              <div className="mb-3 text-slate-500 font-mono text-xs tracking-widest uppercase font-bold transition-colors group-hover:text-white">Engineering</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Multi-Cam SportSense</h3>
              <p className="text-slate-400 font-light max-w-md">AI Player Tracking with YOLOv8 & OpenCV solving identity switching in sports analytics.</p>
            </div>
          </motion.div>

          {/* CARD 2: Engineering - Personal Branding Engine (5 cols) */}
          <motion.div 
            variants={itemVariants}
            className="group relative md:col-span-5 rounded-3xl overflow-hidden bg-[#050505] border border-white/5 flex flex-col justify-end p-8 md:p-10 transition-colors duration-500 hover:border-white/20"
          >
            {/* Media Background */}
            <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
              <motion.img
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1200&auto=format&fit=crop"
                alt="Personal Branding Engine"
                loading="lazy"
                className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none" />
            </div>
            {/* Content */}
            <div className="relative z-10">
              <div className="mb-3 text-slate-500 font-mono text-xs tracking-widest uppercase font-bold transition-colors group-hover:text-white">Engineering</div>
              <h3 className="text-3xl font-bold text-white mb-2">Personal-Branding-Engine</h3>
              <p className="text-slate-400 font-light">Full-stack cloud deployment engineered via Supabase, Docker, and Render.</p>
            </div>
          </motion.div>

          {/* CARD 3: Storytelling - ZERO ONE (5 cols) */}
          <motion.div 
            variants={itemVariants}
            className="group relative md:col-span-5 rounded-3xl overflow-hidden bg-[#050505] border border-white/5 flex flex-col justify-end p-8 md:p-10 transition-colors duration-500 hover:border-white/20"
          >
            {/* Media Background with Hover Video/Graphics Reveal */}
            <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
              {/* Static Fallback Image */}
              <motion.img
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop"
                alt="ZERO ONE"
                loading="lazy"
                className="w-full h-full object-cover opacity-30 group-hover:opacity-0 transition-opacity duration-700 ease-out absolute inset-0 z-10"
              />
              {/* Muted Looping Video Preview (Simulated via placeholder image for now, ready for actual video source) */}
              <motion.div 
                className="w-full h-full absolute inset-0 z-0 opacity-0 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 ease-out"
                style={{ 
                  backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none" />
            </div>
            {/* Content */}
            <div className="relative z-30">
              <div className="mb-3 text-slate-500 font-mono text-xs tracking-widest uppercase font-bold transition-colors group-hover:text-white">Storytelling</div>
              <h3 className="text-3xl font-bold text-white mb-2">ZERO ONE</h3>
              <p className="text-slate-400 font-light">Tech & Military Explainer channel featuring high-end motion graphics and visual motion art.</p>
            </div>
          </motion.div>

          {/* CARD 4: Storytelling - Crazy_Cam (7 cols) */}
          <motion.div 
            variants={itemVariants}
            className="group relative md:col-span-7 rounded-3xl overflow-hidden bg-[#050505] border border-white/5 flex flex-col justify-end p-8 md:p-10 transition-colors duration-500 hover:border-white/20"
          >
            {/* Media Background */}
            <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
              <motion.img
                src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1600&auto=format&fit=crop"
                alt="Crazy Cam"
                loading="lazy"
                className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none" />
            </div>
            {/* Content */}
            <div className="relative z-10">
              <div className="mb-3 text-slate-500 font-mono text-xs tracking-widest uppercase font-bold transition-colors group-hover:text-white">Storytelling</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Crazy_Cam</h3>
              <p className="text-slate-400 font-light max-w-md">Mystery & History Documentaries driving high retention through deep editing and scriptwriting.</p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default BentoGrid;
