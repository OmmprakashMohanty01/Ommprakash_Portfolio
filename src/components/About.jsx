import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section 
      className="py-24 md:py-32 w-full relative z-10"
      style={{ contentVisibility: 'auto' }}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column (The Narrative) */}
          <motion.div 
            className="lg:col-span-7 flex flex-col space-y-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="text-slate-500 font-mono tracking-[0.2em] font-bold text-sm uppercase">
              The Identity Matrix
            </h4>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              I bridge creative storytelling with scalable technology.
            </h2>
            <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Whether it's finding hidden patterns in complex geological datasets, architecting AI evaluation workflows, or crafting high-retention video narratives—I exist at the intersection of logic and magic.
            </p>
          </motion.div>

          {/* Right Column (The Specs) */}
          <motion.div 
            className="lg:col-span-5 flex flex-col space-y-8 pl-0 lg:pl-10"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Item 1 */}
            <div className="pl-6 border-l border-white/10 relative group">
              <div className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-white scale-y-0 origin-top transition-transform duration-500 group-hover:scale-y-100" />
              <h5 className="text-xs tracking-widest text-slate-500 font-mono mb-2">EDUCATION</h5>
              <p className="text-slate-400 text-lg font-medium transition-colors duration-300 group-hover:text-white">
                B.Tech, Computer Science & Engineering
              </p>
            </div>

            {/* Item 2 */}
            <div className="pl-6 border-l border-white/10 relative group">
              <div className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-white scale-y-0 origin-top transition-transform duration-500 group-hover:scale-y-100" />
              <h5 className="text-xs tracking-widest text-slate-500 font-mono mb-2">FOCUS</h5>
              <p className="text-slate-400 text-lg font-medium transition-colors duration-300 group-hover:text-white">
                Frontier AI Operations & Full-Stack Web
              </p>
            </div>

            {/* Item 3 */}
            <div className="pl-6 border-l border-white/10 relative group">
              <div className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-white scale-y-0 origin-top transition-transform duration-500 group-hover:scale-y-100" />
              <h5 className="text-xs tracking-widest text-slate-500 font-mono mb-2">LANGUAGES</h5>
              <p className="text-slate-400 text-lg font-medium transition-colors duration-300 group-hover:text-white">
                English, Hindi, Odia
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
