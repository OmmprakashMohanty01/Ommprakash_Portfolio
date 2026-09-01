import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const specs = [
    {
      label: "ACADEMICS",
      value: "B.Tech in Computer Science & Engineering",
      sub: "Graduating 2025"
    },
    {
      label: "CORE DISCIPLINES",
      value: "Frontier AI Operations & Full-Stack Systems",
      sub: "Edge Compute // High-Retention Narratives"
    },
    {
      label: "LANGUAGES",
      value: "English, Hindi, Odia",
      sub: "Native & Professional Fluency"
    }
  ];

  return (
    <section 
      id="about"
      className="py-28 md:py-36 w-full relative z-10 bg-transparent text-white"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          
          {/* Left Column: 60% Editorial Philosophy Narrative */}
          <motion.div 
            className="lg:col-span-7 flex flex-col space-y-8"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
          >
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white/40" />
              <h4 className="text-gray-500 font-mono tracking-[0.25em] text-xs uppercase">
                01 // The Identity Matrix
              </h4>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-light text-white leading-[1.15] tracking-tight">
              I bridge <span className="italic font-serif text-gray-200">creative storytelling</span> with <span className="font-mono text-gray-300 font-normal">scalable technology</span>.
            </h2>

            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              From finding hidden patterns in complex datasets to crafting high-retention video narratives—I exist at the intersection of <span className="text-white font-medium">logic and magic</span>.
            </p>
          </motion.div>

          {/* Right Column: 40% Editorial Minimal Specs */}
          <motion.div 
            className="lg:col-span-5 flex flex-col space-y-10 pt-4 lg:pt-12"
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 0.15 }}
          >
            {specs.map((item, idx) => (
              <motion.div 
                key={idx}
                className="pl-6 border-l border-white/10 relative group cursor-default"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{ 
                  opacity: hoveredIndex === null || hoveredIndex === idx ? 1 : 0.35,
                  x: hoveredIndex === idx ? 8 : 0
                }}
                transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
              >
                {/* Active vertical highlight bar */}
                <div className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-white scale-y-0 origin-top transition-transform duration-500 group-hover:scale-y-100" />
                
                <h5 className="text-[11px] tracking-[0.25em] text-gray-500 font-mono mb-2 transition-colors duration-300 group-hover:text-gray-300 uppercase">
                  {item.label}
                </h5>
                <p className="text-white text-lg md:text-xl font-medium tracking-tight mb-1 transition-colors duration-300 group-hover:text-white">
                  {item.value}
                </p>
                {item.sub && (
                  <p className="text-gray-400 text-xs font-mono tracking-wide">
                    {item.sub}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
