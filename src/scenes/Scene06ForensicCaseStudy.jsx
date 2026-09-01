import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';

const cases = [
  {
    id: 'sportsense-fail',
    project: 'MULTI-CAM SPORTSENSE',
    failurePoint: 'CROSS-CAMERA ID SWAP UNDER HIGH-SPEED SPRINT OCCLUSIONS',
    diagnosis: 'Pure visual cosine similarity between YOLO bounding crops failed because players on the same team wear identical jerseys with minimal visual difference.',
    rootCause: 'Lack of global spatial-temporal constraints. Re-ID model was ignoring physical pitch geometry.',
    fix: 'Engineered a Homography Coordinate Matrix projecting camera pixels onto 2D bird-eye coordinates, constraining Hungarian matching distance so players cannot teleport across the pitch.',
    telemetry: 'False ID Swaps Reduced from 28.4% to 1.8%',
    diffPatch: `// BEFORE:
- score = cosine_similarity(feat_cam1, feat_cam2)
// AFTER:
+ homography_pt = H @ pixel_coord
+ if euclidean(homography_pt, prev_track) < MAX_SPEED_DELTA:
+     score = 0.6 * cosine_sim + 0.4 * spatial_affinity`
  },
  {
    id: 'rag-fail',
    project: 'ENTERPRISE RAG ENGINE',
    failurePoint: 'MODEL ANSWERING CONFIDENTLY FROM OUTDATED 2022 CLAUSES',
    diagnosis: 'Dense vector embeddings mapped semantic similarities regardless of effective date timestamps, causing the LLM to pull deprecated policy language.',
    rootCause: 'Naive vector indexing lacks temporal metadata weighting.',
    fix: 'Implemented metadata filtering combined with Reciprocal Rank Fusion (RRF), forcing dense vectors to be bounded by active temporal validity windows.',
    telemetry: 'Hallucination on Deprecated Clauses Dropped to 0.0%',
    diffPatch: `// BEFORE:
- results = vector_db.query(user_query, top_k=5)
// AFTER:
+ rrf_score = (1 / (60 + dense_rank)) + (1 / (60 + sparse_rank))
+ results = [doc for doc in filtered_docs if doc.valid_date >= target_epoch]`
  }
];

export default function Scene06ForensicCaseStudy({ onNext }) {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [isResolved, setIsResolved] = useState(false);

  const currentCase = cases[activeCaseIdx];

  const toggleResolution = () => {
    if (!isResolved) {
      sound.playChord([330, 415, 493, 659]); // E major chord on resolution
    } else {
      sound.playTone(250, 0.2);
    }
    setIsResolved(!isResolved);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white flex flex-col justify-between p-6 md:p-16 overflow-hidden select-none">
      
      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-[10px] text-[#FF3300] tracking-[0.3em] uppercase block mb-1">
            06 // FORENSIC INVESTIGATION
          </span>
          <h2 className="text-2xl md:text-4xl font-light tracking-tight text-white">
            Zoom Into The Decision
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {cases.map((c, i) => (
            <button
              key={c.id}
              onClick={() => {
                sound.playClick(400 + i * 50);
                setActiveCaseIdx(i);
                setIsResolved(false);
              }}
              className={`font-mono text-xs px-3 py-1 rounded border transition-colors ${
                activeCaseIdx === i 
                  ? 'border-[#FF3300] bg-[#FF3300]/10 text-white' 
                  : 'border-white/10 text-gray-500 hover:text-white'
              }`}
            >
              INVESTIGATION 0{i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Investigation Chamber */}
      <div className="relative z-10 my-8 p-6 md:p-10 rounded-2xl border border-white/10 bg-[#080808]/80 backdrop-blur-xl min-h-[460px] flex flex-col justify-between">
        
        {/* Status Indicator */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block">
              TARGET SYSTEM // {currentCase.project}
            </span>
            <h3 className="text-lg md:text-xl font-mono text-white font-bold mt-0.5">
              {currentCase.failurePoint}
            </h3>
          </div>
          <span className={`font-mono text-xs px-3 py-1 rounded border ${
            isResolved 
              ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-400' 
              : 'border-[#FF3300]/40 bg-[#FF3300]/10 text-[#FF3300] animate-pulse'
          }`}>
            {isResolved ? '✓ RESOLVED & BENCHMARKED' : '⚠️ SYSTEM BREACH / FAILURE DETECTED'}
          </span>
        </div>

        {/* Forensic Execution Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6 items-start">
          
          {/* Step 1: Input */}
          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col gap-2">
            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-1">01 // THE SYMPTOM</span>
            <p className="text-xs md:text-sm text-gray-300 font-light leading-relaxed">
              {currentCase.diagnosis}
            </p>
          </div>

          {/* Step 2: Root Cause */}
          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col gap-2">
            <span className="font-mono text-[9px] text-[#FF3300] uppercase tracking-widest block mb-1">02 // THE ROOT CAUSE</span>
            <p className="text-xs md:text-sm text-gray-300 font-light leading-relaxed">
              {currentCase.rootCause}
            </p>
          </div>

          {/* Step 3: What I Changed + Code Patch */}
          <div className={`p-5 rounded-xl border transition-all duration-500 flex flex-col gap-2 ${
            isResolved 
              ? 'border-emerald-500/40 bg-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
              : 'border-white/10 bg-white/[0.02]'
          }`}>
            <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest block mb-1">
              03 // THE ARCHITECTURAL FIX
            </span>
            <p className="text-xs md:text-sm text-gray-300 font-light leading-relaxed mb-2">
              {currentCase.fix}
            </p>
            {isResolved && (
              <pre className="font-mono text-[9px] text-emerald-300/80 bg-black/60 p-2.5 rounded border border-emerald-500/20 overflow-x-auto whitespace-pre-wrap">
                {currentCase.diffPatch}
              </pre>
            )}
          </div>

        </div>

        {/* Action Toggle & Telemetry */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-white/10 pt-4">
          <div className="font-mono text-xs text-gray-400">
            METRIC VERIFICATION: <span className="text-white font-bold">{currentCase.telemetry}</span>
          </div>

          <button
            onClick={toggleResolution}
            className={`font-mono text-xs px-6 py-2.5 rounded-full border transition-all uppercase tracking-widest ${
              isResolved
                ? 'border-emerald-500 bg-emerald-500 text-black font-bold shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                : 'border-[#FF3300] text-[#FF3300] hover:bg-[#FF3300] hover:text-white'
            }`}
          >
            {isResolved ? '✓ RUNNING STABLE AT 60FPS' : 'EXECUTE ARCHITECTURAL FIX ⚙'}
          </button>
        </div>

      </div>

      {/* Footer Navigation */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6">
        <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
          SYSTEM DECISION MATRIX VERIFIED
        </span>
        <button
          onClick={() => {
            sound.playClick();
            onNext();
          }}
          className="font-mono text-xs text-white hover:text-[#FF3300] tracking-[0.25em] uppercase px-6 py-3 rounded-full border border-white/20 hover:border-[#FF3300] bg-white/[0.02] transition-colors"
        >
          SCENE 07: THE GROWTH MACHINE ›
        </button>
      </div>

    </section>
  );
}
