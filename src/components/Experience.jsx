import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const experiences = [
  {
    role: "Frontier AI & Data Operations",
    organization: "Outlier AI, TELUS Digital, TryRating",
    period: "2024 — Present",
    category: "AI OPERATIONS",
    description: "Evaluated frontier language models, authored structured RLHF feedback, and managed complex data pipeline evaluation for Project Aether and Mech Circuit.",
    tags: ["LLM Evaluation", "RLHF", "Model Safety", "Data Operations"]
  },
  {
    role: "Hackathons & Innovation Challenges",
    organization: "Innova Hack 2026 & Bharatiya Antariksh 2025",
    period: "2025 — 2026",
    category: "COMPETITIVE ENGINEERING",
    description: "Built edge-compute data evaluation architectures and rapid full-stack prototypes under intense sprint conditions.",
    tags: ["Edge AI", "Computer Vision", "Rapid Prototyping", "Distributed Systems"]
  },
  {
    role: "Advanced Technical Assessments",
    organization: "CodeSignal & Handshake AI",
    period: "2025",
    category: "SOFTWARE EVALUATION",
    description: "Completed industry-standard algorithmic evaluations and software engineering challenges (Project Lotus India SWE), demonstrating deep algorithmic problem-solving.",
    tags: ["Algorithms", "Data Structures", "System Design", "Optimization"]
  },
  {
    role: "B.Tech in Computer Science & Engineering",
    organization: "GIET University",
    period: "2021 — 2025",
    category: "ACADEMIC FOUNDATION",
    description: "Graduated with strong foundations in distributed computing, computer vision, data architecture, and full-stack web applications.",
    tags: ["Computer Science", "Database Systems", "Computer Vision", "Algorithms"]
  }
];

export default function Experience() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section 
      id="experience" 
      className="w-full relative z-10 bg-transparent py-24 px-6 max-w-5xl mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col mb-16 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-2 h-2 rounded-full bg-white/40" />
          <h4 className="text-gray-500 font-mono tracking-[0.25em] text-xs uppercase">
            03 // Operational Timeline
          </h4>
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-light text-white tracking-tight">
          Real-World <span className="italic font-serif text-gray-300">Pedigree</span> & Operations
        </h2>
      </div>

      {/* Timeline Section */}
      <div ref={containerRef} className="relative w-full pb-8">
        
        {/* Background Inactive Track */}
        <div className="absolute left-[18px] md:left-[26px] top-4 bottom-4 w-[2px] bg-white/10 rounded-full" />

        {/* Glowing Scroll-Linked Neon Thread (Cyan -> Violet -> Pink) */}
        <motion.div
          style={{
            scaleY: scrollYProgress,
            transformOrigin: "top"
          }}
          className="absolute left-[18px] md:left-[26px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#00f3ff] via-[#a855f7] to-[#ec4899] rounded-full z-10 shadow-[0_0_12px_rgba(0,243,255,0.7)]"
        />

        {/* Timeline Items */}
        <div className="flex flex-col gap-10 md:gap-12">
          {experiences.map((item, index) => (
            <div key={index} className="relative flex items-start pl-12 md:pl-20">
              
              {/* Timeline Node Dot */}
              <div className="absolute left-[11px] md:left-[19px] top-6 w-4 h-4 rounded-full bg-[#050505] border-2 border-white/40 z-20 group-hover:border-[#00f3ff] transition-colors" />

              {/* Glassmorphic Experience Card */}
              <motion.div
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
                className="w-full relative group overflow-hidden rounded-2xl bg-[#0a0a0a]/60 backdrop-blur-md border border-white/10 hover:border-white/25 p-7 md:p-8 transition-all duration-500 hover:shadow-2xl"
              >
                {/* Top Meta Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 mb-4">
                  <div>
                    <span className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-medium text-white tracking-tight">
                      {item.role}
                    </h3>
                    <p className="text-gray-400 font-mono text-xs md:text-sm mt-0.5">
                      {item.organization}
                    </p>
                  </div>

                  <span className="px-3.5 py-1 rounded-full text-xs font-mono tracking-widest bg-white/[0.03] border border-white/10 text-gray-300 whitespace-nowrap self-start md:self-auto">
                    {item.period}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed mb-6 max-w-3xl">
                  {item.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {item.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="font-mono text-[10px] uppercase text-gray-400 border border-white/10 px-2 py-0.5 bg-white/[0.02] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover Ambient Highlight */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
