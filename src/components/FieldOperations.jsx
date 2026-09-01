import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

const operationsData = [
  {
    id: "01",
    role: "Frontier LLM Evaluation & RLHF",
    org: "Outlier AI ✦ TELUS Digital ✦ TryRating",
    date: "2024 — Present",
    desc: "Spearheaded structured reinforcement learning feedback protocols. Managed complex data pipeline evaluation and alignment strategies for Project Aether and Mech Circuit.",
    tags: ["LLM Operations", "Model Alignment", "Data Integrity"]
  },
  {
    id: "02",
    role: "Edge-Compute Architecture Sprint",
    org: "Innova Hack 2026",
    date: "2026",
    desc: "Engineered rapid full-stack prototypes under intense, high-pressure hackathon conditions, optimizing deployment pipelines and resolving spatial computer vision constraints.",
    tags: ["Rapid Prototyping", "Backend Dev", "Sprint Execution"]
  },
  {
    id: "03",
    role: "National Technical Prototype",
    org: "Bharatiya Antariksh Hackathon",
    date: "2025",
    desc: "Formulated and deployed scalable technical solutions in a highly competitive national environment, focusing on strict logic handling and algorithmic efficiency.",
    tags: ["Algorithms", "Distributed Systems", "Python"]
  }
];

export default function FieldOperations() {
  const containerRef = useRef(null);

  // Track the scroll progress specifically within this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-[#030303] flex justify-center border-t border-white/10 z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-[0.15] pointer-events-none mix-blend-screen" />
      
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16">
        
        {/* Left Column: Fixed Header */}
        <div className="md:w-1/3 flex flex-col">
          <div className="sticky top-32">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
              className="font-mono text-[#FF3300] text-[10px] tracking-[0.3em] uppercase mb-4 flex items-center gap-4"
            >
              <span className="w-1.5 h-1.5 bg-[#FF3300]" />
              03 // Operational Log
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-[1.1] mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Field <br/> Operations.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 0.2 }}
              className="font-sans text-sm text-white/50 leading-relaxed max-w-xs"
            >
              A documented history of production-level evaluation pedigree, strict technical assessments, and high-stakes sprint deployments.
            </motion.p>
          </div>
        </div>

        {/* Right Column: The Interactive Audit Log */}
        <div className="md:w-2/3 relative">
          
          {/* 1. The Dim Background Track */}
          <div className="absolute top-0 bottom-0 left-[15px] md:left-[23px] w-[1px] bg-white/10" />

          {/* 2. The Glowing Interactive Scroll Line */}
          <motion.div 
            style={{ scaleY: scrollYProgress }}
            className="absolute top-0 bottom-0 left-[15px] md:left-[23px] w-[1px] bg-[#FF3300] origin-top shadow-[0_0_10px_#FF3300]" 
          />

          <div className="flex flex-col gap-12 relative z-10">
            {operationsData.map((op, index) => (
              <motion.div 
                key={op.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                
                // ADD CONTINUOUS LEVITATION HERE:
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6 + (index % 2), repeat: Infinity, ease: "easeInOut" }}
                
                className="relative pl-12 md:pl-20 group"
              >
                {/* Node Indicator */}
                <div className="absolute left-[11px] md:left-[19px] top-8 w-[9px] h-[9px] rounded-full bg-[#030303] border border-white/30 group-hover:border-[#FF3300] group-hover:bg-[#FF3300] transition-colors duration-500 z-10 shadow-[0_0_10px_rgba(255,51,0,0)] group-hover:shadow-[0_0_15px_rgba(255,51,0,0.8)]" />

                {/* UPGRADE: The Frosted Glass Card */}
                <div className="flex flex-col bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/20 p-8 rounded-xl transition-all duration-500 backdrop-blur-sm shadow-[0_5px_20px_rgba(0,0,0,0.3)]">
                  <p className="font-mono text-[#FF3300] text-[9px] tracking-[0.2em] uppercase mb-2">
                    {op.date}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 transition-colors duration-300">
                    {op.role}
                  </h3>
                  <p className="font-mono text-xs text-white/40 tracking-widest uppercase mb-6">
                    {op.org}
                  </p>
                  <p className="text-sm md:text-base text-white/60 leading-relaxed mb-8 max-w-xl">
                    {op.desc}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {op.tags.map((tag, i) => (
                      <span key={i} className="font-mono text-[9px] text-white/50 border border-white/10 px-3 py-1 rounded-sm uppercase tracking-widest bg-black/50 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
