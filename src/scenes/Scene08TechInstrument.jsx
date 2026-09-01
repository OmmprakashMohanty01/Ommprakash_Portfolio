import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/audio';

const instruments = [
  { id: 'python', label: 'PYTHON', desc: 'Core logic & asynchronous backend pipelines', category: 'LANG', freq: 261.63 }, // C4
  { id: 'fastapi', label: 'FASTAPI', desc: 'Microsecond asynchronous REST & Webhook APIs', category: 'BACKEND', freq: 293.66 }, // D4
  { id: 'yolov8', label: 'YOLOV8', desc: 'Real-time spatial object bounding & tracking', category: 'AI/CV', freq: 329.63 }, // E4
  { id: 'pytorch', label: 'PYTORCH', desc: 'Tensor computation & neural feature extraction', category: 'AI/CV', freq: 392.00 }, // G4
  { id: 'vectordb', label: 'VECTOR DB', desc: 'High-dimensional cosine semantic indexing', category: 'AI', freq: 440.00 }, // A4
  { id: 'docker', label: 'DOCKER', desc: 'Isolated container memory and render queues', category: 'DEVOPS', freq: 523.25 }, // C5
  { id: 'supabase', label: 'SUPABASE', desc: 'PostgreSQL relational schemas & realtime events', category: 'DATABASE', freq: 587.33 }, // D5
  { id: 'react', label: 'REACT', desc: 'Declarative, performant UI state machines', category: 'FRONTEND', freq: 659.25 }, // E5
  { id: 'cinema', label: 'AFTER EFFECTS', desc: 'High-retention cinematic pacing & motion design', category: 'CREATIVE', freq: 783.99 } // G5
];

export default function Scene08TechInstrument({ onNext }) {
  const [selectedStack, setSelectedStack] = useState(new Set(['python', 'fastapi', 'vectordb']));

  const toggleTech = (inst) => {
    sound.playTone(inst.freq, 0.35, 'sine');
    setSelectedStack(prev => {
      const next = new Set(prev);
      if (next.has(inst.id)) {
        next.delete(inst.id);
      } else {
        next.add(inst.id);
      }
      return next;
    });
  };

  const getSynthesizedOutput = () => {
    const has = (k) => selectedStack.has(k);
    if (has('python') && has('yolov8') && has('pytorch')) {
      return {
        title: 'MULTI-CAM COMPUTER VISION & RE-ID SYSTEM',
        latency: '< 30ms Frame Latency',
        architecture: 'Live spatial tracking pipeline matching occluded targets across synchronized feeds.'
      };
    }
    if (has('python') && has('fastapi') && has('vectordb')) {
      return {
        title: 'ENTERPRISE RAG CONTEXTUAL RETRIEVAL ENGINE',
        latency: 'Sub-200ms Search Time',
        architecture: 'Hybrid Sparse/Dense indexing with cross-encoder reranking over enterprise knowledge bases.'
      };
    }
    if (has('docker') && has('supabase') && (has('react') || has('python'))) {
      return {
        title: 'AUTONOMOUS CONTENT GENERATION & DEPLOYMENT ENGINE',
        latency: 'Continuous Async Queue',
        architecture: 'Container-isolated worker pool rendering dynamic video assets from database webhooks.'
      };
    }
    return {
      title: 'CUSTOM COMPOSABLE ARCHITECTURE',
      latency: 'Optimized Throughput',
      architecture: `Synthesizing ${selectedStack.size} selected engineering primitives into production infrastructure.`
    };
  };

  const synthesized = getSynthesizedOutput();

  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white flex flex-col justify-between p-6 md:p-16 overflow-hidden select-none">
      
      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-[10px] text-[#FF3300] tracking-[0.3em] uppercase block mb-1">
            08 // THE TECH INSTRUMENT
          </span>
          <h2 className="text-2xl md:text-4xl font-light tracking-tight text-white">
            Audio-Visual Stack Synthesizer
          </h2>
        </div>
        <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">
          [ Trigger notes & synthesize live production architectures ]
        </p>
      </div>

      {/* Main Interactive Matrix */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-center">
        
        {/* Left Column: The 9-Key Instrument Board */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {instruments.map(inst => {
            const isSelected = selectedStack.has(inst.id);
            return (
              <button
                key={inst.id}
                onClick={() => toggleTech(inst)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[110px] ${
                  isSelected
                    ? 'border-[#FF3300] bg-[#FF3300]/10 shadow-[0_0_20px_rgba(255,51,0,0.25)]'
                    : 'border-white/10 bg-[#080808]/50 hover:border-white/20 text-gray-400 hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-[#FF3300] uppercase tracking-widest">{inst.category}</span>
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#FF3300] shadow-[0_0_8px_#FF3300]' : 'bg-white/20'}`} />
                </div>
                <div>
                  <h4 className="font-mono text-xs md:text-sm font-bold text-white tracking-wider">{inst.label}</h4>
                  <p className="font-sans text-[10px] text-gray-400 mt-1 line-clamp-2 leading-tight">{inst.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Synthesized Architecture Chamber */}
        <div className="lg:col-span-6 p-8 md:p-10 rounded-2xl border border-white/15 bg-[#080808]/80 backdrop-blur-xl flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
              <span className="font-mono text-[10px] text-[#FF3300] tracking-widest uppercase">
                SYNTHESIZED LIVE ARCHITECTURE
              </span>
              <span className="font-mono text-[10px] text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-950/20">
                {synthesized.latency}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif text-white font-medium mb-4">
              {synthesized.title}
            </h3>

            <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-6">
              {synthesized.architecture}
            </p>
          </div>

          {/* Active Stack Chips */}
          <div className="border-t border-white/10 pt-4 flex flex-wrap gap-2">
            {Array.from(selectedStack).map(key => {
              const item = instruments.find(i => i.id === key);
              return (
                <span key={key} className="font-mono text-[10px] text-white bg-white/5 border border-white/15 px-2.5 py-1 rounded">
                  ✦ {item?.label}
                </span>
              );
            })}
          </div>
        </div>

      </div>

      {/* Footer Navigation */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6">
        <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
          ACOUSTIC FREQUENCY SYNTHESIZER ACTIVE
        </span>
        <button
          onClick={() => {
            sound.playClick();
            onNext();
          }}
          className="font-mono text-xs text-white hover:text-[#FF3300] tracking-[0.25em] uppercase px-6 py-3 rounded-full border border-white/20 hover:border-[#FF3300] bg-white/[0.02] transition-colors"
        >
          SCENE 09: THE DESK ›
        </button>
      </div>

    </section>
  );
}
