import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';

const roleProfiles = [
  {
    id: 'ai-engineer',
    role: 'AI / COMPUTER VISION ENGINEER',
    summary: 'Specialized in real-time spatial object tracking, cross-camera re-identification, and high-throughput vector retrieval.',
    leadProject: 'Multi-Cam SportSense (YOLOv8, Hungarian Algorithm, PyTorch)',
    coreStack: ['Python', 'YOLOv8', 'PyTorch', 'OpenCV', 'Vector DBs'],
    keyHighlight: 'Engineered sub-30ms spatial tracking pipeline eliminating 93% of false identity swaps during player occlusions.',
    evalScore: 'CodeSignal Advanced SWE // Outlier AI Model Evaluator',
    matchScore: '99.4%'
  },
  {
    id: 'backend-engineer',
    role: 'BACKEND & SYSTEMS ENGINEER',
    summary: 'Constructing robust asynchronous microservices, event-driven worker queues, and sub-200ms knowledge retrieval engines.',
    leadProject: 'Enterprise RAG Engine (FastAPI, Hybrid Sparse/Dense Indexing)',
    coreStack: ['FastAPI', 'Python Async', 'Docker', 'Supabase', 'PostgreSQL'],
    keyHighlight: 'Sub-200ms semantic lookup over 50,000 documents with Reciprocal Rank Fusion preventing hallucination drift.',
    evalScore: 'Validated on distributed system challenges & Docker worker memory isolation',
    matchScore: '98.8%'
  },
  {
    id: 'ai-ops',
    role: 'AI DATA OPERATIONS & RLHF SPECIALIST',
    summary: 'Evaluating frontier language models, orchestrating multi-modal robotic datasets, and authoring precise alignment feedback.',
    leadProject: 'Frontier AI Operations (Outlier AI, TELUS Digital, TryRating)',
    coreStack: ['RLHF', 'Model Alignment', 'Project Aether', 'Mech Circuit', 'Trilingual (HI/EN/OR)'],
    keyHighlight: 'Conducted high-context evaluation across complex reasoning benchmarks with native Hindi/English/Odia localization.',
    evalScore: 'Tier-1 Evaluator on Project Aether & Mech Circuit',
    matchScore: '99.9%'
  },
  {
    id: 'creative-tech',
    role: 'CREATIVE TECHNOLOGIST & STORYTELLER',
    summary: 'Fusing deep mathematical systems with cinematic 24fps motion design to craft viral, high-retention technical narratives.',
    leadProject: 'ZERO ONE: CODEBREAK & Defense Analysis Video Essays',
    coreStack: ['After Effects', 'Premiere Pro', 'Visual Retention Pacing', 'DOM Cinema'],
    keyHighlight: 'Directing documentary-grade motion essays combining forensic codebreaking with high-dopamine visual retention.',
    evalScore: '100% Custom Motion Design, No Templates',
    matchScore: '97.6%'
  }
];

export default function Scene10ReverseResume({ onNext }) {
  const [selectedRole, setSelectedRole] = useState(roleProfiles[0]);
  const [copiedDossier, setCopiedDossier] = useState(false);

  const handleRoleSelect = (profile) => {
    sound.playClick(500);
    setSelectedRole(profile);
  };

  const handleCopyDossier = () => {
    sound.playChord([440, 554, 659, 880]);
    const text = `OMMPRAKASH MOHANTY - ${selectedRole.role}\n\nSummary: ${selectedRole.summary}\nLead Project: ${selectedRole.leadProject}\nCore Stack: ${selectedRole.coreStack.join(', ')}\nKey Metric: ${selectedRole.keyHighlight}\nPedigree: B.Tech CSE (2025), GIET University | Bhubaneswar, India\nContact: ommmohanty419@gmail.com | +91 9337060161`;
    navigator.clipboard.writeText(text);
    setCopiedDossier(true);
    setTimeout(() => setCopiedDossier(false), 2500);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white flex flex-col justify-between p-6 md:p-16 overflow-hidden select-none">
      
      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-[10px] text-[#FF3300] tracking-[0.3em] uppercase block mb-1">
            10 // THE REVERSE RESUME
          </span>
          <h2 className="text-2xl md:text-4xl font-light tracking-tight text-white">
            Targeted Credential Dossier
          </h2>
        </div>
        <div className="font-mono text-xs text-gray-400">
          CANDIDATE FIT: <span className="text-emerald-400 font-bold">{selectedRole.matchScore} MATCH</span>
        </div>
      </div>

      {/* Role Selector Tabs */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-6">
        {roleProfiles.map(profile => {
          const isSelected = selectedRole.id === profile.id;
          return (
            <button
              key={profile.id}
              onClick={() => handleRoleSelect(profile)}
              className={`p-4 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? 'border-[#FF3300] bg-[#FF3300]/10 text-white shadow-[0_0_15px_rgba(255,51,0,0.2)]'
                  : 'border-white/10 bg-[#080808]/60 hover:border-white/20 text-gray-400'
              }`}
            >
              <span className={`font-mono text-[9px] uppercase tracking-widest mb-2 block ${isSelected ? 'text-[#FF3300]' : 'text-gray-500'}`}>
                TARGET ROLE
              </span>
              <h4 className="font-mono text-xs md:text-sm font-bold tracking-tight text-white">
                {profile.role}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Dynamic Tailored Dossier */}
      <div className="relative z-10 p-8 md:p-10 rounded-2xl border border-white/15 bg-[#080808]/80 backdrop-blur-xl min-h-[340px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRole.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-[10px] text-[#FF3300] tracking-widest uppercase">
                  CUSTOM COMPILED DOSSIER
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-white font-medium">
                  {selectedRole.role}
                </h3>
              </div>
              <button
                onClick={handleCopyDossier}
                className="font-mono text-xs px-5 py-2 rounded-full border border-white/20 hover:border-white bg-white/[0.04] text-gray-200 transition-colors self-start md:self-auto shadow-lg hover:shadow-white/10"
              >
                {copiedDossier ? '✓ COPIED CUSTOM DOSSIER' : '📋 COPY ROLE DOSSIER'}
              </button>
            </div>

            <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed">
              {selectedRole.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/10 pt-4">
              <div>
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-1">LEAD PROOF</span>
                <p className="font-mono text-xs text-white">{selectedRole.leadProject}</p>
              </div>
              <div>
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-1">KEY PERFORMANCE</span>
                <p className="font-mono text-xs text-gray-300">{selectedRole.keyHighlight}</p>
              </div>
              <div>
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-1">EVALUATION METRIC</span>
                <p className="font-mono text-xs text-[#FF3300]">{selectedRole.evalScore}</p>
              </div>
            </div>

            {/* Core Stack */}
            <div className="flex flex-wrap gap-2 pt-2">
              {selectedRole.coreStack.map((tech, i) => (
                <span key={i} className="font-mono text-[10px] text-white bg-white/5 border border-white/15 px-3 py-1 rounded">
                  ✦ {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6">
        <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
          TAILORED REVERSE RESUME ACTIVE
        </span>
        <button
          onClick={() => {
            sound.playClick();
            onNext();
          }}
          className="font-mono text-xs text-white hover:text-[#FF3300] tracking-[0.25em] uppercase px-6 py-3 rounded-full border border-white/20 hover:border-[#FF3300] bg-white/[0.02] transition-colors"
        >
          SCENE 11: LET'S BUILD ›
        </button>
      </div>

    </section>
  );
}
