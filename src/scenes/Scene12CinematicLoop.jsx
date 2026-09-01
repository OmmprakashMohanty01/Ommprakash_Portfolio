import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/audio';

export default function Scene12CinematicLoop({ onRestart }) {
  const handleLoopRestart = () => {
    sound.playChord([220, 277, 330, 440, 554]);
    onRestart();
  };

  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white flex flex-col justify-between p-6 md:p-16 overflow-hidden select-none">
      
      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-[10px] text-[#FF3300] tracking-[0.3em] uppercase block mb-1">
            12 // THE INFINITE LOOP
          </span>
          <h2 className="text-2xl md:text-4xl font-light tracking-tight text-white">
            Origin Point Restored
          </h2>
        </div>
        <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
          BHUBANESWAR, INDIA // 20.2961° N, 85.8245° E
        </span>
      </div>

      {/* Center Singular Particle & Loop Statement */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-16">
        
        {/* The Origin Star Particle */}
        <motion.button
          onClick={handleLoopRestart}
          animate={{ scale: [1, 1.6, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-4 h-4 rounded-full bg-white shadow-[0_0_30px_#ffffff] mb-8 cursor-pointer focus:outline-none group flex items-center justify-center"
        >
          <span className="absolute w-12 h-12 rounded-full border border-white/20 group-hover:border-[#FF3300] animate-ping" />
        </motion.button>

        <h3 
          className="text-3xl sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-tight mb-4"
          style={{ fontFamily: "'Syncopate', sans-serif" }}
        >
          OMMPRAKASH
        </h3>

        <p className="font-mono text-xs md:text-sm text-[#FF3300] tracking-[0.4em] uppercase mb-12">
          ✦ STILL BUILDING. ALWAYS EVOLVING. ✦
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:ommmohanty419@gmail.com"
            onClick={() => sound.playClick()}
            className="font-mono text-xs px-6 py-3 rounded-full bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors shadow-lg"
          >
            ommmohanty419@gmail.com ↗
          </a>
          <a
            href="https://wa.me/919337060161"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="font-mono text-xs px-6 py-3 rounded-full border border-white/20 text-white uppercase tracking-widest hover:border-white bg-white/[0.02] transition-colors"
          >
            WhatsApp Line ↗
          </a>
          <a
            href="https://github.com/OmmprakashMohanty01"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="font-mono text-xs px-6 py-3 rounded-full border border-white/20 text-white uppercase tracking-widest hover:border-white bg-white/[0.02] transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/ommprakash-mohanty-366b73278/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="font-mono text-xs px-6 py-3 rounded-full border border-white/20 text-white uppercase tracking-widest hover:border-white bg-white/[0.02] transition-colors"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      {/* Bottom Closed Loop Control */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
        <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
          © {new Date().getFullYear()} OMMPRAKASH MOHANTY // A FILM YOU CAN CONTROL
        </span>
        <button
          onClick={handleLoopRestart}
          className="font-mono text-xs text-[#FF3300] hover:text-white tracking-[0.25em] uppercase px-6 py-2.5 rounded-full border border-[#FF3300]/40 hover:border-white bg-[#FF3300]/10 transition-colors flex items-center gap-2"
        >
          <span>↺</span>
          <span>RESTART FILM EXPERIENCE</span>
        </button>
      </div>

    </section>
  );
}
