import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import CaseStudyModal from '../components/CaseStudyModal';

export default function Scene02Evidence({ onSwitchToDocumentView }) {
  const constraintsRef = useRef(null);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const evidenceNodes = [
    { 
      id: 'multi-cam-sportsense', 
      label: 'Multi-Cam SportSense', 
      category: 'AI / COMPUTER VISION',
      desc: 'Cross-camera re-identification & spatial tracking using YOLOv8 & Hungarian Matching.', 
      x: '38%', 
      y: '28%',
      isProject: true,
      tags: ['YOLOv8', 'PyTorch', 'OpenCV']
    },
    { 
      id: 'enterprise-knowledge-engine', 
      label: 'Enterprise RAG Engine', 
      category: 'BACKEND / LLM',
      desc: 'Sub-200ms semantic lookup & contextual retrieval pipeline.', 
      x: '62%', 
      y: '22%',
      isProject: true,
      tags: ['FastAPI', 'Vector DB', 'RAG']
    },
    { 
      id: 'zero-one', 
      label: 'ZERO ONE: CODEBREAK', 
      category: 'CREATIVE / MOTION',
      desc: 'High-retention tech & military historical video essay series.', 
      x: '74%', 
      y: '58%',
      isProject: true,
      tags: ['After Effects', 'Premiere', 'Cinematic']
    },
    { 
      id: 'personal-branding-engine', 
      label: 'Personal-Branding-Engine', 
      category: 'DEVOPS / ORCHESTRATION',
      desc: 'Automated multi-platform distribution and asset generation.', 
      x: '24%', 
      y: '68%',
      isProject: true,
      tags: ['Docker', 'Supabase', 'Render']
    },
    { 
      id: 'outlier-ai', 
      label: 'Frontier AI Operations', 
      category: 'DATA OPERATIONS',
      desc: 'Outlier AI, TELUS Digital, TryRating (Project Aether, Mech Circuit).', 
      x: '20%', 
      y: '35%',
      isProject: false,
      tags: ['RLHF', 'Model Evaluation', 'Data Pipelines']
    },
    { 
      id: 'hackathons', 
      label: 'Competitive Hackathons', 
      category: 'ENGINEERING SPRINTS',
      desc: 'Innova Hack 2026 & Bharatiya Antariksh 2025.', 
      x: '48%', 
      y: '72%',
      isProject: false,
      tags: ['Edge AI', 'Rapid Prototyping']
    },
    { 
      id: 'education', 
      label: "B.Tech CSE '25", 
      category: 'FOUNDATION',
      desc: 'GIET University — Distributed Computing & Data Architecture.', 
      x: '82%', 
      y: '38%',
      isProject: false,
      tags: ['Algorithms', 'Data Structures']
    },
    { 
      id: 'culture', 
      label: 'Trilingual Command', 
      category: 'COMMUNICATION',
      desc: 'English (Fluent) ✦ Hindi (Fluent) ✦ Odia (Native).', 
      x: '42%', 
      y: '48%',
      isProject: false,
      tags: ['English', 'Hindi', 'Odia']
    }
  ];

  const activeProject = projects.find(p => p.id === activeProjectId);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
      className="absolute inset-0 w-full h-full overflow-hidden bg-[#050505] select-none"
    >
      {/* Background Architectural Grid */}
      <div 
        className="absolute inset-[-50%] w-[200%] h-[200%] opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      {/* Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_80%)] pointer-events-none z-10" />

      {/* Draggable Container Constraint Area */}
      <div ref={constraintsRef} className="absolute inset-[-60%] w-[220%] h-[220%]" />

      {/* The Draggable Canvas Surface */}
      <motion.div 
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.12}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-20"
      >
        {/* Center Orientation Cue */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
          <p className="font-mono text-[10px] md:text-xs text-white/30 tracking-[0.5em] uppercase">
            [ DRAG SURFACE TO EXPLORE EVIDENCE MAP ]
          </p>
          <p className="font-mono text-[9px] text-[#FF3300]/60 tracking-[0.3em] uppercase mt-2">
            CLICK ANY NODE TO EXPAND TECHNICAL TELEMETRY
          </p>
        </div>

        {/* Evidence Data Nodes */}
        {evidenceNodes.map((node, i) => (
          <div
            key={node.id}
            className="absolute group z-30"
            style={{ left: node.x, top: node.y }}
          >
            {/* Pulsing Node Target */}
            <button
              onClick={() => {
                if (node.isProject) {
                  setActiveProjectId(node.id);
                } else {
                  setSelectedNode(selectedNode?.id === node.id ? null : node);
                }
              }}
              className="relative flex items-center justify-center p-3 -m-3 cursor-pointer group focus:outline-none"
            >
              <span className="w-3 h-3 rounded-full bg-white/30 group-hover:bg-[#FF3300] transition-colors duration-300 shadow-[0_0_12px_rgba(255,255,255,0.4)] group-hover:shadow-[0_0_16px_rgba(255,51,0,0.8)]" />
              <span className="absolute w-6 h-6 rounded-full border border-white/20 group-hover:border-[#FF3300]/60 animate-ping opacity-60" />
            </button>

            {/* Always-Visible Label Tag */}
            <div className="absolute top-5 left-0 whitespace-nowrap pointer-events-none">
              <span className="font-mono text-[9px] tracking-widest text-[#FF3300] uppercase block">
                {node.category}
              </span>
              <span className="font-serif text-sm md:text-base font-medium text-white tracking-wide block">
                {node.label}
              </span>
            </div>

            {/* Hover Expansion Card */}
            <div className="absolute top-16 left-0 w-64 p-4 rounded-xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-2xl z-40">
              <p className="text-xs text-gray-300 font-light leading-relaxed mb-3">
                {node.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {node.tags.map((t, idx) => (
                  <span key={idx} className="font-mono text-[9px] text-gray-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
              {node.isProject && (
                <span className="font-mono text-[9px] text-[#FF3300] tracking-wider uppercase block mt-2.5">
                  Click to open full case study ↗
                </span>
              )}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Floating Bottom Switch Bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 px-5 py-2.5 rounded-full border border-white/15 bg-black/60 backdrop-blur-xl shadow-2xl">
        <button
          onClick={onSwitchToDocumentView}
          className="font-mono text-[10px] md:text-xs text-gray-300 hover:text-white transition-colors tracking-widest uppercase flex items-center gap-2"
        >
          <span>📜</span>
          <span>SWITCH TO DOCUMENT EXHIBITION (SCROLL)</span>
        </button>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal 
        project={activeProject} 
        onClose={() => setActiveProjectId(null)} 
      />
    </motion.div>
  );
}
