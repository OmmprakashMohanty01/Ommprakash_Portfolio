import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';

const layers = [
  {
    id: 'mind',
    tag: 'THE HEAD',
    title: 'How I Think',
    quote: 'Probabilistic reasoning meets deterministic rigor.',
    details: 'I approach engineering problems from first principles. Whether evaluating frontier LLM failure modes or debugging camera perspective warps, I treat systems as living state machines where edge cases define the real architecture.',
    tokens: ['First Principles', 'Bayesian Reasoning', 'Failure Mode Analysis', 'Model Safety']
  },
  {
    id: 'hands',
    tag: 'THE HANDS',
    title: 'How I Build',
    quote: 'Zero boilerplate. Heavy emphasis on throughput and latency.',
    details: 'Writing asynchronous Python microservices in FastAPI, fine-tuning YOLOv8 for sub-30ms inference, and structuring automated deployment pipelines with Docker and Supabase.',
    tokens: ['FastAPI', 'YOLOv8', 'PyTorch', 'Vector Indexing', 'Docker']
  },
  {
    id: 'eyes',
    tag: 'THE EYES',
    title: 'What I Notice',
    quote: 'The invisible 2% that causes 98% of system failure.',
    details: 'In computer vision: optical occlusions and bounding drift. In LLMs: subtle sycophancy and hallucinations. In cinema: 24fps pacing cuts that hold audience dopamine without filler.',
    tokens: ['Optical Flow Disconnects', 'RLHF Bias Drift', 'Cinematic Pacing', 'Retention Curves']
  },
  {
    id: 'origin',
    tag: 'THE ROOTS',
    title: 'Where I Came From',
    quote: 'Bhubaneswar, Odisha // 20.2961° N, 85.8245° E',
    details: 'B.Tech CSE Class of 2025 at GIET University. Operating with complete native fluency across Hindi, English, and Odia—providing high-context cultural and linguistic localization for frontier AI alignment.',
    tokens: ['GIET University', 'B.Tech CSE 2025', 'Trilingual Fluency (HI/EN/OR)', 'Odisha, India']
  }
];

export default function Scene03HumanLayer({ onNext }) {
  const [selectedLayer, setSelectedLayer] = useState(layers[0]);

  const handleSelect = (layer) => {
    sound.playClick(500);
    setSelectedLayer(layer);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white flex flex-col justify-between p-6 md:p-16 overflow-hidden select-none">
      
      {/* Top Section Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-[10px] text-[#FF3300] tracking-[0.3em] uppercase block mb-1">
            03 // THE HUMAN LAYER
          </span>
          <h2 className="text-2xl md:text-4xl font-light tracking-tight text-white">
            Disassembling Identity
          </h2>
        </div>
        <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">
          [ Select an anatomical dimension to deconstruct ]
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-center">
        
        {/* Left Column: Anatomical Selectors */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {layers.map((layer) => {
            const isSelected = selectedLayer.id === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => handleSelect(layer)}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                  isSelected
                    ? 'bg-white/[0.06] border-[#FF3300] shadow-[0_0_20px_rgba(255,51,0,0.15)]'
                    : 'bg-[#080808]/50 border-white/10 hover:border-white/25 hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[10px] text-[#FF3300] tracking-widest uppercase">
                    {layer.tag}
                  </span>
                  <span className="text-lg md:text-xl font-medium text-white tracking-tight">
                    {layer.title}
                  </span>
                </div>
                <span className={`font-mono text-xs transition-transform ${isSelected ? 'text-[#FF3300] translate-x-1' : 'text-gray-600'}`}>
                  ›
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Layer Deconstruction Readout */}
        <div className="lg:col-span-7 relative min-h-[380px] p-8 md:p-10 rounded-2xl border border-white/10 bg-[#080808]/80 backdrop-blur-xl flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLayer.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
              className="flex flex-col gap-6"
            >
              <div>
                <span className="font-mono text-[10px] text-gray-500 tracking-[0.25em] uppercase block mb-2">
                  ANATOMICAL FOCUS // {selectedLayer.tag}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-light text-white leading-snug">
                  "{selectedLayer.quote}"
                </h3>
              </div>

              <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed">
                {selectedLayer.details}
              </p>

              {/* Tokens */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {selectedLayer.tokens.map((tok, i) => (
                  <span key={i} className="font-mono text-[10px] uppercase text-gray-300 px-3 py-1 rounded bg-white/5 border border-white/10">
                    {tok}
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
          PEDIGREE & COGNITIVE TELEMETRY VERIFIED
        </span>
        <button
          onClick={() => {
            sound.playClick();
            onNext();
          }}
          className="font-mono text-xs text-white hover:text-[#FF3300] tracking-[0.25em] uppercase px-6 py-3 rounded-full border border-white/20 hover:border-[#FF3300] bg-white/[0.02] transition-colors"
        >
          SCENE 04: PRESSURE TEST ›
        </button>
      </div>

    </section>
  );
}
