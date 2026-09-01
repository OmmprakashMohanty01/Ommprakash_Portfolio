import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';

const machineYears = [
  {
    year: '2021 — 2022',
    title: 'THE CORE SEED // FOUNDATION',
    stage: 'Stage 01: Deterministic Computing',
    desc: 'Commenced B.Tech in CSE at GIET University. Mastered core memory allocation, data structures, discrete mathematics, and foundational Python.',
    nodes: ['C/C++', 'Data Structures', 'Python Core', 'Discrete Math'],
    milestone: 'GIET University B.Tech CSE Inception'
  },
  {
    year: '2023',
    title: 'THE EXPANSION // COMPUTER VISION & MEDIA',
    stage: 'Stage 02: Spatial & Visual Processing',
    desc: 'Began building OpenCV matrix pipelines and directing high-retention video essays. Explored the crossover between computational geometry and cinematic storytelling.',
    nodes: ['OpenCV', 'Video Algorithms', 'Spatial Math', 'Narrative Pacing'],
    milestone: 'First Computational Vision Pipelines'
  },
  {
    year: '2024',
    title: 'THE FRONTIER // AI DATA OPERATIONS',
    stage: 'Stage 03: LLMs & Human-in-the-Loop',
    desc: 'Engaged as AI Data Operations Engineer across Outlier AI, TELUS Digital, and TryRating. Evaluated frontier language models and structured complex RLHF training datasets.',
    nodes: ['RLHF', 'LLM Evaluation', 'Project Aether', 'Mech Circuit'],
    milestone: 'Outlier AI & TELUS Frontier Model Evaluator'
  },
  {
    year: '2025',
    title: 'THE SYNTHESIS // COMPETITIVE SPRINT',
    stage: 'Stage 04: High-Throughput Production',
    desc: 'Constructed SportSense Re-ID and Enterprise RAG engines. Competed in Innova Hack 2026 and Bharatiya Antariksh Hackathon 2025; validated by CodeSignal assessments.',
    nodes: ['SportSense', 'Vector RAG', 'Innova Hack', 'CodeSignal SWE'],
    milestone: 'Innova Hack 2026 & Antariksh Hackathon Finalist'
  },
  {
    year: '2026',
    title: 'THE UNIFICATION // LOGIC & MAGIC',
    stage: 'Stage 05: The Operating System',
    desc: 'Full convergence. Autonomous engineering capability combining high-throughput backend infrastructure with award-winning creative direction.',
    nodes: ['Full Systems', 'Production AI', 'Digital Cinema', 'Autonomous SWE'],
    milestone: 'Full Architecture Convergence'
  }
];

export default function Scene07GrowthMachine({ onNext }) {
  const [selectedYearIdx, setSelectedYearIdx] = useState(4);

  const currentStage = machineYears[selectedYearIdx];

  const handleYearSelect = (idx) => {
    sound.playTone(250 + idx * 80, 0.15);
    setSelectedYearIdx(idx);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white flex flex-col justify-between p-6 md:p-16 overflow-hidden select-none">
      
      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-[10px] text-[#FF3300] tracking-[0.3em] uppercase block mb-1">
            07 // THE GROWTH MACHINE
          </span>
          <h2 className="text-2xl md:text-4xl font-light tracking-tight text-white">
            Evolutionary Convergence
          </h2>
        </div>
        <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
          [ Scrub or click timeline nodes to scale the machine ]
        </span>
      </div>

      {/* Machine Stage Board */}
      <div className="relative z-10 my-8 flex flex-col gap-8">
        
        {/* Horizontal Year Rail */}
        <div className="grid grid-cols-5 gap-2 border-b border-white/10 pb-4">
          {machineYears.map((item, idx) => {
            const isSelected = selectedYearIdx === idx;
            return (
              <button
                key={item.year}
                onClick={() => handleYearSelect(idx)}
                className={`flex flex-col text-left p-3 rounded-lg border transition-all ${
                  isSelected
                    ? 'border-[#FF3300] bg-[#FF3300]/10 text-white shadow-[0_0_15px_rgba(255,51,0,0.2)]'
                    : 'border-white/5 hover:border-white/20 text-gray-500 hover:text-gray-300'
                }`}
              >
                <span className="font-mono text-[9px] text-[#FF3300]">0{idx + 1}</span>
                <span className="font-mono text-xs md:text-sm font-bold tracking-wider">{item.year}</span>
              </button>
            );
          })}
        </div>

        {/* Machine Network Display */}
        <div className="p-8 md:p-10 rounded-2xl border border-white/10 bg-[#080808]/80 backdrop-blur-xl min-h-[340px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.year}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <span className="font-mono text-[10px] text-[#FF3300] tracking-[0.25em] uppercase block mb-1">
                    {currentStage.stage}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif text-white font-medium">
                    {currentStage.title}
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-gray-400 border border-white/10 px-3 py-1 rounded bg-white/[0.02]">
                  {currentStage.milestone}
                </span>
              </div>

              <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed max-w-3xl">
                {currentStage.desc}
              </p>

              {/* Active Neural Subsystems Added in this Stage */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {currentStage.nodes.map((node, i) => (
                  <span
                    key={i}
                    className="font-mono text-[11px] uppercase tracking-wider text-gray-200 border border-white/15 px-3 py-1 bg-white/[0.03] rounded-md"
                  >
                    ✦ {node}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Footer Navigation */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6">
        <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
          TIME-SERIES PEDIGREE RECONSTRUCTED
        </span>
        <button
          onClick={() => {
            sound.playClick();
            onNext();
          }}
          className="font-mono text-xs text-white hover:text-[#FF3300] tracking-[0.25em] uppercase px-6 py-3 rounded-full border border-white/20 hover:border-[#FF3300] bg-white/[0.02] transition-colors"
        >
          SCENE 08: TECH INSTRUMENT ›
        </button>
      </div>

    </section>
  );
}
