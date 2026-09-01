import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';

const suggestions = [
  'Multi-camera automated sports analysis',
  'Sub-100ms enterprise legal RAG pipeline',
  'Autonomous video content rendering worker pool'
];

export default function Scene11CollaborativeTerminal({ onNext }) {
  const [idea, setIdea] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (idea.trim()) {
      sound.playChord([261.63, 329.63, 392.00, 523.25]); // C major chord on synthesis
      setSubmitted(true);
    }
  };

  const handleSuggestionClick = (s) => {
    sound.playClick(600);
    setIdea(s);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white flex flex-col justify-between p-6 md:p-16 overflow-hidden select-none">
      
      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-[10px] text-[#FF3300] tracking-[0.3em] uppercase block mb-1">
            11 // COLLABORATION TERMINAL
          </span>
          <h2 className="text-2xl md:text-4xl font-light tracking-tight text-white">
            Architecting Your Vision
          </h2>
        </div>
        <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">
          [ Enter a problem statement or product concept ]
        </p>
      </div>

      {/* Terminal Body */}
      <div className="relative z-10 my-8 p-8 md:p-12 rounded-2xl border border-white/15 bg-[#080808]/90 backdrop-blur-xl flex flex-col justify-center min-h-[440px] max-w-4xl mx-auto w-full">
        
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="terminal-input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              <h3 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-tight leading-tight"
                style={{ fontFamily: "'Syncopate', sans-serif" }}
              >
                SO... WHAT ARE WE BUILDING?
              </h3>

              <div className="flex items-center gap-3 border-b-2 border-white/20 focus-within:border-[#FF3300] pb-2 transition-colors">
                <span className="font-mono text-lg text-[#FF3300]">›</span>
                <input
                  type="text"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Type an idea (e.g. AI tool for surgical diagnostics, automated video engine)..."
                  className="w-full bg-transparent font-mono text-base md:text-lg text-white placeholder:text-gray-600 focus:outline-none tracking-wide"
                  autoFocus
                />
              </div>

              {/* Sample Suggestions */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="font-mono text-[10px] text-gray-500 uppercase">TRY:</span>
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSuggestionClick(s)}
                    className="font-mono text-[10px] text-gray-400 hover:text-white border border-white/10 hover:border-white/30 px-2.5 py-1 rounded bg-white/[0.02] transition-colors"
                  >
                    "{s}"
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4">
                <span className="font-mono text-xs text-gray-500">
                  PRESS [ ENTER ] TO GENERATE SYSTEM ARCHITECTURE SKETCH
                </span>
                <button
                  type="submit"
                  disabled={!idea.trim()}
                  className="font-mono text-xs px-6 py-2.5 rounded-full border border-white/20 hover:border-[#FF3300] bg-white/[0.04] hover:bg-[#FF3300]/10 text-white disabled:opacity-30 transition-all uppercase tracking-widest"
                >
                  SYNTHESIZE ›
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="terminal-output"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
              className="flex flex-col gap-8"
            >
              <div>
                <span className="font-mono text-[10px] text-[#FF3300] tracking-widest uppercase block mb-1">
                  CONCEPT PROPOSED
                </span>
                <h4 className="font-mono text-xl md:text-2xl text-white font-bold">
                  "{idea}"
                </h4>
              </div>

              {/* Generated System Architecture Sketch */}
              <div className="p-6 rounded-xl border border-white/10 bg-black/60 font-mono text-xs text-gray-300 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <span className="text-gray-500 block text-[9px]">01. INPUT</span>
                  <span className="text-white font-bold">Domain Data</span>
                </div>
                <span className="text-[#FF3300]">→</span>
                <div className="text-center">
                  <span className="text-gray-500 block text-[9px]">02. AI MODEL</span>
                  <span className="text-white font-bold">Neural / Vision</span>
                </div>
                <span className="text-[#FF3300]">→</span>
                <div className="text-center">
                  <span className="text-gray-500 block text-[9px]">03. LATENCY</span>
                  <span className="text-white font-bold">Sub-200ms API</span>
                </div>
                <span className="text-[#FF3300]">→</span>
                <div className="text-center md:text-right">
                  <span className="text-gray-500 block text-[9px]">04. INTERFACE</span>
                  <span className="text-white font-bold">High-Fidelity App</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
                <span className="font-serif text-lg text-white italic">
                  "Interesting. Let’s engineer this into reality."
                </span>
                
                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:ommmohanty419@gmail.com?subject=Project Inquiry: ${encodeURIComponent(idea)}`}
                    className="font-mono text-xs px-6 py-3 rounded-full bg-[#FF3300] text-white font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
                  >
                    START TRANSMISSION ↗
                  </a>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setSubmitted(false);
                    }}
                    className="font-mono text-xs px-4 py-3 rounded-full border border-white/20 text-gray-400 hover:text-white transition-colors uppercase"
                  >
                    RESET
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Footer Navigation */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6">
        <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
          DIRECT TRANSMISSION CHANNEL READY
        </span>
        <button
          onClick={() => {
            sound.playClick();
            onNext();
          }}
          className="font-mono text-xs text-white hover:text-[#FF3300] tracking-[0.25em] uppercase px-6 py-3 rounded-full border border-white/20 hover:border-[#FF3300] bg-white/[0.02] transition-colors"
        >
          SCENE 12: THE LOOP ›
        </button>
      </div>

    </section>
  );
}
