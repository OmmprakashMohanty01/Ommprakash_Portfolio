import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function FinalCTA() {
  return (
    <section id="contact" className="relative w-full py-32 md:py-48 bg-[#050505] flex items-center justify-center overflow-hidden z-10 border-t border-white/5">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(0,243,255,0.03)_0%,transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <span className="text-xs font-mono tracking-[0.3em] text-[#00f3ff] uppercase mb-8">
            Next Sequence
          </span>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tight leading-[1.05] mb-8">
            Let's build <br className="hidden md:block" />
            something.
          </h2>

          <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
            Currently open for new opportunities. Whether you have a complex architectural challenge or an ambitious creative vision, my inbox is open.
          </p>

          <MagneticButton href="mailto:ommmohanty419@gmail.com" className="text-lg md:text-xl px-10 py-5">
            GET IN TOUCH <span aria-hidden="true" className="ml-2 font-mono">↗</span>
          </MagneticButton>
          
          <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12">
            <a href="https://github.com/OmmprakashMohanty01" target="_blank" rel="noopener noreferrer" className="text-sm font-mono tracking-widest text-slate-500 uppercase hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded p-1">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/ommprakash-mohanty-366b73278/" target="_blank" rel="noopener noreferrer" className="text-sm font-mono tracking-widest text-slate-500 uppercase hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded p-1">
              LinkedIn
            </a>
            <a href="mailto:ommmohanty419@gmail.com" className="text-sm font-mono tracking-widest text-slate-500 uppercase hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded p-1">
              Email
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
