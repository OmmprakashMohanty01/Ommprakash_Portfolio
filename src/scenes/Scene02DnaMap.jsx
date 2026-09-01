import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/audio';

const evidenceData = [
  { id: 'python', label: 'PYTHON', stat: 'USED ACROSS 8 PRODUCTION PIPELINES', category: 'CORE', parent: null, x: 22, y: 35 },
  { id: 'ai', label: 'FRONTIER AI & RLHF', stat: 'OUTLIER AI & TELUS MODEL EVALUATION', category: 'AI', parent: 'python', x: 42, y: 25 },
  { id: 'rag', label: 'ENTERPRISE RAG', stat: 'SUB-200MS VECTOR SEARCH & CONTEXT EXTRACTION', category: 'AI', parent: 'ai', x: 65, y: 18 },
  { id: 'cv', label: 'COMPUTER VISION', stat: 'YOLOV8 & CROSS-CAMERA RE-IDENTIFICATION', category: 'VISION', parent: 'python', x: 48, y: 48 },
  { id: 'yolo', label: 'YOLOV8 / PYTORCH', stat: 'SPATIAL BOUNDING & HUNGARIAN MATCHING', category: 'VISION', parent: 'cv', x: 74, y: 42 },
  { id: 'fastapi', label: 'FASTAPI / BACKEND', stat: 'ASYNCHRONOUS HIGH-THROUGHPUT MICROSERVICES', category: 'SYSTEMS', parent: 'python', x: 38, y: 70 },
  { id: 'docker', label: 'DOCKER / DEVOPS', stat: 'SUPABASE, RENDER & CONTAINER ORCHESTRATION', category: 'SYSTEMS', parent: 'fastapi', x: 62, y: 75 },
  { id: 'cinema', label: 'CINEMATIC MOTION', stat: 'HIGH-RETENTION TECH & MILITARY VIDEO ESSAYS', category: 'CREATIVE', parent: null, x: 78, y: 65 }
];

export default function Scene02DnaMap({ onNext }) {
  const [discovered, setDiscovered] = useState(new Set(['python']));
  const [activeItem, setActiveItem] = useState(evidenceData[0]);

  const handleDiscover = (item) => {
    if (!discovered.has(item.id)) {
      sound.playTone(300 + discovered.size * 50, 0.15);
    } else {
      sound.playClick(450);
    }
    setActiveItem(item);
    setDiscovered(prev => new Set([...prev, item.id]));
  };

  const handleDiscoverAll = () => {
    sound.playChord([220, 330, 440, 550, 660]);
    setDiscovered(new Set(evidenceData.map(e => e.id)));
  };

  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white flex flex-col justify-between p-6 md:p-16 overflow-hidden select-none">
      
      {/* Header Info */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-[10px] text-[#FF3300] tracking-[0.3em] uppercase block mb-1">
            02 // THE DNA OF THE WORK
          </span>
          <h2 className="text-2xl md:text-4xl font-light tracking-tight text-white">
            Evidence Discovery Surface
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="font-mono text-xs text-gray-400">
            DISCOVERED: <span className="text-[#FF3300] font-bold">{discovered.size}</span> / {evidenceData.length} SYSTEMS
          </div>
          {discovered.size < evidenceData.length && (
            <button
              onClick={handleDiscoverAll}
              className="font-mono text-[10px] text-gray-400 hover:text-white border border-white/10 px-2.5 py-1 rounded transition-colors"
            >
              [ REVEAL ALL ]
            </button>
          )}
        </div>
      </div>

      {/* Spatial Evidence Surface */}
      <div className="relative w-full h-[60vh] my-8 rounded-2xl border border-white/10 bg-[#080808]/60 backdrop-blur-xl overflow-hidden">
        
        {/* Coordinate matrix grid */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* Dynamic Connection Lines with Pulsing Packets */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {evidenceData.map(node => {
            if (!node.parent || !discovered.has(node.id) || !discovered.has(node.parent)) return null;
            const parent = evidenceData.find(e => e.id === node.parent);
            if (!parent) return null;

            return (
              <g key={`${parent.id}-${node.id}`}>
                <line
                  x1={`${parent.x}%`}
                  y1={`${parent.y}%`}
                  x2={`${node.x}%`}
                  y2={`${node.y}%`}
                  stroke="#FF3300"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="opacity-70"
                />
              </g>
            );
          })}
        </svg>

        {/* Evidence Marks */}
        {evidenceData.map(node => {
          const isDiscovered = discovered.has(node.id);
          const isActive = activeItem?.id === node.id;

          return (
            <motion.div
              key={node.id}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              onMouseEnter={() => handleDiscover(node)}
              onClick={() => handleDiscover(node)}
            >
              <button className="relative group p-4 -m-4 focus:outline-none cursor-pointer flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#FF3300] scale-125 shadow-[0_0_15px_#FF3300]' 
                    : isDiscovered 
                    ? 'bg-white shadow-[0_0_8px_#ffffff]' 
                    : 'bg-white/30 hover:bg-white/70'
                }`} />
                <span className={`font-mono text-[10px] md:text-xs tracking-widest uppercase transition-colors ${
                  isDiscovered ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
                }`}>
                  {node.label}
                </span>
              </button>
            </motion.div>
          );
        })}

        {/* Bottom Cue */}
        <div className="absolute bottom-4 left-6 pointer-events-none font-mono text-[10px] text-gray-500 uppercase tracking-widest">
          [ Hover or touch nodes to reconstruct the capability graph ]
        </div>
      </div>

      {/* Discovered Telemetry Card & Navigation */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/10 pt-6">
        {activeItem ? (
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="font-mono text-[10px] text-[#FF3300] tracking-widest uppercase">
              [{activeItem.category}] EVIDENCE VERIFIED
            </span>
            <h3 className="text-xl md:text-2xl font-serif text-white font-medium">
              {activeItem.label}
            </h3>
            <p className="text-gray-400 font-mono text-xs md:text-sm tracking-wide">
              {activeItem.stat}
            </p>
          </div>
        ) : (
          <p className="font-mono text-xs text-gray-500 uppercase">Hover across the marks to uncover evidence</p>
        )}

        <button
          onClick={() => {
            sound.playClick();
            onNext();
          }}
          className="font-mono text-xs text-white hover:text-[#FF3300] tracking-[0.25em] uppercase px-6 py-3 rounded-full border border-white/20 hover:border-[#FF3300] bg-white/[0.02] transition-colors self-end md:self-auto"
        >
          SCENE 03: HUMAN LAYER ›
        </button>
      </div>

    </section>
  );
}
