import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';

export default function Scene05SimulatedProjects({ onNext }) {
  const [activeTab, setActiveTab] = useState('sportsense');
  const [scrubberValue, setScrubberValue] = useState(65);
  const [ragQuery, setRagQuery] = useState('Semantic Vector Retrieval');

  const handleTabSwitch = (id) => {
    sound.playClick(450);
    setActiveTab(id);
  };

  const handleScrubberChange = (val) => {
    setScrubberValue(val);
    if (val === 45 || val === 60) {
      sound.playTone(val === 45 ? 200 : 500, 0.1);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white flex flex-col justify-between p-6 md:p-16 overflow-hidden select-none">
      
      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-[10px] text-[#FF3300] tracking-[0.3em] uppercase block mb-1">
            05 // THE PROJECTS ARE NOT PROJECTS
          </span>
          <h2 className="text-2xl md:text-4xl font-light tracking-tight text-white">
            Simulating The Problem Space
          </h2>
        </div>
        
        {/* Simulation Tabs */}
        <div className="flex items-center gap-2">
          {[
            { id: 'sportsense', label: '01 // SPORTSENSE RE-ID' },
            { id: 'rag', label: '02 // RAG ENGINE' },
            { id: 'branding', label: '03 // BRAND PIPELINE' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabSwitch(tab.id)}
              className={`font-mono text-[10px] md:text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                activeTab === tab.id
                  ? 'border-[#FF3300] bg-[#FF3300]/10 text-white font-bold shadow-[0_0_15px_rgba(255,51,0,0.2)]'
                  : 'border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Simulation Arena */}
      <div className="relative z-10 my-8 p-6 md:p-10 rounded-2xl border border-white/10 bg-[#080808]/80 backdrop-blur-xl min-h-[460px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          
          {/* SIMULATION 1: SPORTSENSE RE-IDENTIFICATION */}
          {activeTab === 'sportsense' && (
            <motion.div
              key="sim-sportsense"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col justify-between h-full gap-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-serif text-white">
                    Multi-Cam SportSense // Dual-Feed Alignment
                  </h3>
                  <p className="font-mono text-xs text-gray-400 mt-1">
                    Temporal Occlusion & Homography Coordinate Tracking
                  </p>
                </div>
                <div className={`font-mono text-xs border px-3 py-1 rounded transition-colors ${
                  scrubberValue < 45 
                    ? 'border-red-500/40 bg-red-950/20 text-red-400 animate-pulse' 
                    : 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400'
                }`}>
                  {scrubberValue < 45 ? '⚠️ IDENTITY LOST (OCCLUSION)' : '✓ HUNGARIAN MATCH RESOLVED'}
                </div>
              </div>

              {/* Visual Simulation Display */}
              <div className="relative w-full h-56 rounded-xl border border-white/10 bg-black overflow-hidden flex items-center justify-center">
                {/* Pitch Grid */}
                <div 
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                  }}
                />

                {/* Camera 1 (Broadcast) & Camera 2 (Tactical) Bounding Boxes */}
                <div className="relative w-4/5 h-full flex items-center justify-around">
                  {/* Player A Box */}
                  <motion.div
                    animate={{
                      x: (scrubberValue - 50) * 4,
                      borderColor: scrubberValue < 45 ? '#ef4444' : '#10b981'
                    }}
                    className="w-20 h-32 border-2 rounded flex flex-col justify-between p-1.5 bg-white/[0.02] shadow-2xl"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white">
                      CAM 01: [P_09]
                    </span>
                    <span className={`font-mono text-[8px] ${scrubberValue < 45 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {scrubberValue < 45 ? 'CONF: 0.21' : 'MATCH: 0.96'}
                    </span>
                  </motion.div>

                  {/* Dual Sync Vector Line */}
                  <div className={`w-32 h-[1px] ${scrubberValue < 45 ? 'bg-red-500/40 border-dashed' : 'bg-emerald-500'} transition-colors`} />

                  {/* Player A in Cam 02 */}
                  <motion.div
                    animate={{
                      x: (scrubberValue - 50) * -3,
                      borderColor: scrubberValue < 45 ? '#ef4444' : '#10b981'
                    }}
                    className="w-20 h-32 border-2 rounded flex flex-col justify-between p-1.5 bg-white/[0.02] shadow-2xl"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white">
                      CAM 02: [TACT]
                    </span>
                    <span className={`font-mono text-[8px] ${scrubberValue < 45 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {scrubberValue < 45 ? 'DRIFT DETECT' : 'HOMOGRAPHY OK'}
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Scrubber Control */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between font-mono text-[10px] text-gray-500 uppercase">
                  <span>0.00s // Entrance</span>
                  <span>Scrub Playhead Timeline: {scrubberValue}%</span>
                  <span>4.00s // Re-Identified</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={scrubberValue}
                  onChange={(e) => handleScrubberChange(Number(e.target.value))}
                  className="w-full accent-[#FF3300] cursor-pointer"
                />
              </div>
            </motion.div>
          )}

          {/* SIMULATION 2: RAG PIPELINE */}
          {activeTab === 'rag' && (
            <motion.div
              key="sim-rag"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col justify-between h-full gap-6"
            >
              <div>
                <h3 className="text-xl md:text-2xl font-serif text-white">
                  Enterprise RAG Engine // Latency & Semantic Clustering
                </h3>
                <p className="font-mono text-xs text-gray-400 mt-1">
                  Type a technical domain query to visualize dynamic sub-200ms document clustering
                </p>
              </div>

              <input
                type="text"
                value={ragQuery}
                onChange={(e) => setRagQuery(e.target.value)}
                placeholder="Enter query (e.g. Cross-border tax compliance, GDPR data residency)..."
                className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-[#FF3300]"
              />

              {/* Visual Clustered Chunks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { title: 'Vector Chunk #419', similarity: '0.94 Similarity', latency: '142ms', match: 'Sparse BM25 Hit' },
                  { title: 'Vector Chunk #882', similarity: '0.91 Similarity', latency: '168ms', match: 'Dense Cosine Match' },
                  { title: 'Vector Chunk #104', similarity: '0.88 Similarity', latency: '185ms', match: 'Reranker Validated' }
                ].map((chunk, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                    className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/10 flex flex-col justify-between gap-3 shadow-xl"
                  >
                    <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider">{chunk.match}</span>
                    <p className="font-mono text-xs text-white font-medium">{chunk.title}</p>
                    <div className="flex justify-between font-mono text-[9px] text-gray-400 border-t border-white/10 pt-2">
                      <span>{chunk.similarity}</span>
                      <span className="text-[#FF3300] font-bold">{chunk.latency}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SIMULATION 3: PERSONAL BRANDING PIPELINE */}
          {activeTab === 'branding' && (
            <motion.div
              key="sim-branding"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col justify-between h-full gap-6"
            >
              <div>
                <h3 className="text-xl md:text-2xl font-serif text-white">
                  Personal-Branding-Engine // Orchestrated Pipeline
                </h3>
                <p className="font-mono text-xs text-gray-400 mt-1">
                  Single Input Markdown → Docker Render Queue → Multi-Platform Deployment
                </p>
              </div>

              {/* Pipeline Flow */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                {[
                  { step: '01 // INGEST', desc: 'Markdown Draft', tech: 'Supabase DB' },
                  { step: '02 // QUEUE', desc: 'Worker Isolation', tech: 'Docker / Redis' },
                  { step: '03 // RENDER', desc: 'Dynamic Video & Poster', tech: 'FFmpeg Canvas' },
                  { step: '04 // SYNC', desc: 'Automated Publishing', tech: 'Webhooks / APIs' }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col gap-2 shadow-lg">
                    <span className="font-mono text-[9px] text-[#FF3300] tracking-widest uppercase">{item.step}</span>
                    <h5 className="font-medium text-sm text-white">{item.desc}</h5>
                    <span className="font-mono text-[10px] text-gray-400">{item.tech}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6">
        <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
          SIMULATING ENGINEERING IMPACT
        </span>
        <button
          onClick={() => {
            sound.playClick();
            onNext();
          }}
          className="font-mono text-xs text-white hover:text-[#FF3300] tracking-[0.25em] uppercase px-6 py-3 rounded-full border border-white/20 hover:border-[#FF3300] bg-white/[0.02] transition-colors"
        >
          SCENE 06: FORENSIC INVESTIGATION ›
        </button>
      </div>

    </section>
  );
}
