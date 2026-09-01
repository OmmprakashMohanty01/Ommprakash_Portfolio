import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';

const deskItems = [
  {
    id: 'laptop',
    icon: '💻',
    label: 'MacBook Pro M-Series',
    category: 'ACTIVE WORKSPACE',
    title: 'Production Repositories & Terminal',
    content: 'Currently deploying SportSense v2 with YOLOv8 homography matrix calibration and containerizing microservices on Docker/Render.',
    activeArtifacts: ['github.com/OmmprakashMohanty01', 'Multi-Cam SportSense', 'Enterprise RAG']
  },
  {
    id: 'notebook',
    icon: '📓',
    label: 'Engineering Journal',
    category: 'ALGORITHMIC BLUEPRINTS',
    title: 'First-Principles Math & System Maps',
    content: 'Sketches of Hungarian assignment optimization, Reciprocal Rank Fusion equations, and spatial coordinate transformations across camera angles.',
    activeArtifacts: ['Hungarian Algorithm', 'RRF Formulation', 'Matrix Projections']
  },
  {
    id: 'stickies',
    icon: '📝',
    label: 'Experiment Notes',
    category: 'LIVE BENCHMARKS',
    title: 'Active Optimization Targets',
    content: 'Current benchmark targets: Keep RAG retrieval latency < 150ms over 50,000 docs; push cross-camera re-ID precision to 98.2%.',
    activeArtifacts: ['Latency Target: < 150ms', 'False ID Swaps: < 2%', 'Docker Memory: 512MB Cap']
  },
  {
    id: 'phone',
    icon: '📱',
    label: 'Communication Device',
    category: 'TRANSMISSION & MEDIA',
    title: 'Content Channels & Direct Lines',
    content: 'Direct WhatsApp/Telegram communication line, video essay distribution channels, and professional engineering network.',
    activeArtifacts: ['WhatsApp (+91 9337060161)', 'ommmohanty419@gmail.com', 'ZERO ONE Broadcasts']
  }
];

export default function Scene09TheDesk({ onNext }) {
  const [selectedItem, setSelectedItem] = useState(deskItems[0]);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (item) => {
    sound.playClick(450);
    setSelectedItem(item);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white flex flex-col justify-between p-6 md:p-16 overflow-hidden select-none">
      
      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-[10px] text-[#FF3300] tracking-[0.3em] uppercase block mb-1">
            09 // CURRENTLY BUILDING
          </span>
          <h2 className="text-2xl md:text-4xl font-light tracking-tight text-white">
            The Overhead Desk
          </h2>
        </div>
        <div className="flex items-center gap-4 font-mono text-xs text-gray-400">
          <span>BHUBANESWAR TIME: <strong className="text-white">{time || '14:00:00'} IST</strong></span>
        </div>
      </div>

      {/* Desk Board */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-center">
        
        {/* Left Column: Physical Desk Objects */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          {deskItems.map(item => {
            const isSelected = selectedItem.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between min-h-[160px] ${
                  isSelected
                    ? 'border-[#FF3300] bg-[#FF3300]/10 shadow-[0_0_20px_rgba(255,51,0,0.15)]'
                    : 'border-white/10 bg-[#080808]/60 hover:border-white/25 hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{item.icon}</span>
                  <span className={`font-mono text-[9px] px-2 py-0.5 rounded ${isSelected ? 'bg-[#FF3300] text-black font-bold' : 'text-gray-500 border border-white/10'}`}>
                    {isSelected ? 'ACTIVE' : 'INSPECT'}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-[#FF3300] tracking-widest uppercase block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-medium text-sm md:text-base text-white tracking-tight">
                    {item.label}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Object Telemetry Readout */}
        <div className="lg:col-span-6 p-8 md:p-10 rounded-2xl border border-white/15 bg-[#080808]/80 backdrop-blur-xl flex flex-col justify-between min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
              className="flex flex-col gap-6"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{selectedItem.icon}</span>
                  <span className="font-mono text-[10px] text-[#FF3300] tracking-widest uppercase">
                    {selectedItem.category} // {selectedItem.label}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-white font-medium">
                  {selectedItem.title}
                </h3>
              </div>

              <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed">
                {selectedItem.content}
              </p>

              {/* Active Artifact Badges */}
              <div className="border-t border-white/10 pt-4 flex flex-wrap gap-2">
                {selectedItem.activeArtifacts.map((art, i) => (
                  <span key={i} className="font-mono text-[10px] text-white bg-white/5 border border-white/15 px-3 py-1 rounded">
                    ✦ {art}
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
          DESK TELEMETRY ACTIVE
        </span>
        <button
          onClick={() => {
            sound.playClick();
            onNext();
          }}
          className="font-mono text-xs text-white hover:text-[#FF3300] tracking-[0.25em] uppercase px-6 py-3 rounded-full border border-white/20 hover:border-[#FF3300] bg-white/[0.02] transition-colors"
        >
          SCENE 10: REVERSE RESUME ›
        </button>
      </div>

    </section>
  );
}
