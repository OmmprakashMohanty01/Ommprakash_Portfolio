import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';

const challenges = [
  {
    id: 'rag',
    title: 'AI // Retrieval Latency & Hallucination',
    problem: 'YOU HAVE 50,000 HIGH-DENSITY ENTERPRISE DOCUMENTS. BUILD A PIPELINE THAT CAN ANSWER DOMAIN-SPECIFIC QUERIES IN < 1.5s WITHOUT HALLUCINATING.',
    options: [
      {
        id: 'A',
        text: 'Naive full-text chunking into a standard vector DB with basic Top-K cosine similarity.',
        grade: 'SUBOPTIMAL',
        latency: '1,420ms',
        accuracy: '68.2%',
        critique: 'High latency on broad queries, loses subtle semantic context, and exposes the model to hallucinations on multi-hop questions.'
      },
      {
        id: 'B',
        text: 'Hybrid Dense/Sparse Indexing (BM25 + Cohere Vectors) + Cross-Encoder Reranking + Strict Zero-Shot Context Guardrails.',
        grade: 'OPTIMAL ARCHITECTURE',
        latency: '185ms',
        accuracy: '99.4%',
        critique: 'Sub-200ms retrieval latency. Sparse BM25 catches exact keyword codes while Dense vectors extract semantic intent, with rerankers filtering irrelevant noise before context injection.'
      },
      {
        id: 'C',
        text: 'Fine-tuning a base open-weights LLM directly on the raw document text.',
        grade: 'HIGH RISK',
        latency: '890ms',
        accuracy: '74.1%',
        critique: 'Catastrophic forgetting risk, expensive to update when documents change, and does not provide auditable source citations.'
      }
    ],
    optimalChoice: 'B'
  },
  {
    id: 'vision',
    title: 'VISION // Cross-Camera Re-Identification',
    problem: 'PLAYERS DISAPPEAR BEHIND DEFENDERS OR TRANSITION FROM BROADCAST TO TACTICAM VIEWS, BREAKING TEMPORAL IDENTITY TRACKING.',
    options: [
      {
        id: 'A',
        text: 'Rely purely on optical flow pixel displacement vectors.',
        grade: 'FAILS UNDER OCCLUSION',
        latency: '45ms',
        accuracy: '42.0%',
        critique: 'Optical flow breaks completely when players overlap or when camera angle abruptly switches from tactical to sideline.'
      },
      {
        id: 'B',
        text: 'YOLOv8 Bounding + Feature Embedding Extraction + Hungarian Matching with Homography Coordinate Mapping.',
        grade: 'OPTIMAL ARCHITECTURE',
        latency: '28ms',
        accuracy: '98.2%',
        critique: 'Extracts robust color/spatial feature vectors per player box and solves the assignment problem globally via the Hungarian algorithm across synchronized multi-camera coordinate planes.'
      },
      {
        id: 'C',
        text: 'Re-run unconstrained object detection independently on every camera feed without unified spatial alignment.',
        grade: 'IDENTITY DRIFT',
        latency: '110ms',
        accuracy: '61.5%',
        critique: 'Causes continuous ID swapping whenever jerseys occlude each other in crowded penalty boxes.'
      }
    ],
    optimalChoice: 'B'
  },
  {
    id: 'devops',
    title: 'DEVOPS // Automated Media Distribution',
    problem: 'PROCESSING AND RENDERING 500+ DYNAMIC VIDEO & BANNER ASSETS SIMULTANEOUSLY ON LIMITED CLOUD INFRASTRUCTURE.',
    options: [
      {
        id: 'A',
        text: 'Sequential single-threaded rendering script on one large VM.',
        grade: 'BOTTLENECK',
        latency: '3.5 hrs',
        accuracy: 'Fail Safe: Low',
        critique: 'Massive queue times (hours) and single point of failure if one asset render crashes.'
      },
      {
        id: 'B',
        text: 'Decoupled Event-Driven Pipeline: Supabase DB Webhooks → Docker Worker Pool with strict memory constraints on Render.',
        grade: 'OPTIMAL ARCHITECTURE',
        latency: '4.2 mins',
        accuracy: 'Fail Safe: 99.9%',
        critique: 'Prevents OOM crashes by isolating ffmpeg renders inside resource-capped Docker workers while webhook queues process concurrently with auto-retry resilience.'
      },
      {
        id: 'C',
        text: 'Triggering unlimited unconstrained concurrent serverless invocations.',
        grade: 'COST EXPLOSION',
        latency: '12 mins',
        accuracy: 'Fail Safe: Moderate',
        critique: 'Exceeds serverless memory limits during video encoding and risks huge API billing surges.'
      }
    ],
    optimalChoice: 'B'
  }
];

export default function Scene04PressureTest({ onNext }) {
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentChallenge = challenges[activeChallengeIdx];

  const handleSelect = (option) => {
    if (option.id === currentChallenge.optimalChoice) {
      sound.playChord([440, 554, 659]); // Major triad on correct
    } else {
      sound.playTone(220, 0.2, 'sawtooth'); // Alert tone
    }
    setSelectedOption(option);
  };

  const handleNextChallenge = () => {
    sound.playClick();
    setSelectedOption(null);
    if (activeChallengeIdx < challenges.length - 1) {
      setActiveChallengeIdx(prev => prev + 1);
    } else {
      onNext();
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white flex flex-col justify-between p-6 md:p-16 overflow-hidden select-none">
      
      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-[10px] text-[#FF3300] tracking-[0.3em] uppercase block mb-1">
            04 // THE PRESSURE TEST
          </span>
          <h2 className="text-2xl md:text-4xl font-light tracking-tight text-white">
            Architecture Simulation
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {challenges.map((c, i) => (
            <button
              key={c.id}
              onClick={() => {
                sound.playClick(400 + i * 50);
                setActiveChallengeIdx(i);
                setSelectedOption(null);
              }}
              className={`font-mono text-xs px-3 py-1 rounded border transition-colors ${
                activeChallengeIdx === i 
                  ? 'border-[#FF3300] bg-[#FF3300]/10 text-white' 
                  : 'border-white/10 text-gray-500 hover:text-white'
              }`}
            >
              0{i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Challenge Board */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-start">
        
        {/* Left Column: Problem Definition & Options */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-[#080808]/60 backdrop-blur-xl">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block mb-2">
              SCENARIO // {currentChallenge.title}
            </span>
            <p className="font-mono text-sm md:text-base text-[#f5f5f5] font-bold leading-relaxed">
              "{currentChallenge.problem}"
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
              Select Your Engineering Approach:
            </span>
            {currentChallenge.options.map((opt) => {
              const isSelected = selectedOption?.id === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-4 ${
                    isSelected
                      ? opt.id === currentChallenge.optimalChoice
                        ? 'border-emerald-500 bg-emerald-950/20 text-white shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                        : 'border-[#FF3300] bg-red-950/20 text-white shadow-[0_0_20px_rgba(255,51,0,0.15)]'
                      : 'border-white/10 bg-[#080808]/40 hover:border-white/30 text-gray-300'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold border flex-shrink-0 ${
                    isSelected ? 'border-white bg-white text-black' : 'border-white/20 text-gray-400'
                  }`}>
                    {opt.id}
                  </span>
                  <div className="flex flex-col gap-1 w-full">
                    <p className="text-xs md:text-sm font-light leading-relaxed">
                      {opt.text}
                    </p>
                    {isSelected && (
                      <div className="flex items-center gap-4 mt-2 font-mono text-[10px]">
                        <span className="text-gray-400">LATENCY: <strong className="text-white">{opt.latency}</strong></span>
                        <span className="text-gray-400">ACCURACY: <strong className="text-white">{opt.accuracy}</strong></span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Architectural Feedback & Telemetry */}
        <div className="lg:col-span-5 relative min-h-[360px] p-7 md:p-8 rounded-2xl border border-white/10 bg-[#080808]/80 backdrop-blur-xl flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {selectedOption ? (
              <motion.div
                key={selectedOption.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
                className="flex flex-col gap-4"
              >
                <div>
                  <span className={`font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded border inline-block mb-3 ${
                    selectedOption.id === currentChallenge.optimalChoice
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                      : 'border-[#FF3300]/40 bg-[#FF3300]/10 text-[#FF3300]'
                  }`}>
                    {selectedOption.grade}
                  </span>
                  <h4 className="font-serif text-lg md:text-xl font-medium text-white">
                    Architectural Diagnostic
                  </h4>
                </div>

                <p className="text-gray-300 text-xs md:text-sm font-light leading-relaxed">
                  {selectedOption.critique}
                </p>

                <div className="border-t border-white/10 pt-4 mt-2">
                  <span className="font-mono text-[10px] text-[#FF3300] tracking-widest uppercase block mb-1">
                    OMMPRAKASH'S DEPLOYED PATTERN
                  </span>
                  <p className="font-mono text-xs text-gray-400">
                    Implemented in live repositories with verified benchmarking against baseline failures.
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center h-full py-16 text-gray-500 font-mono text-xs uppercase tracking-widest">
                [ Select an architecture option on the left to trigger the diagnostic evaluation ]
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Footer Navigation */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6">
        <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
          PROBLEM {activeChallengeIdx + 1} OF {challenges.length}
        </span>
        <button
          onClick={handleNextChallenge}
          className="font-mono text-xs text-white hover:text-[#FF3300] tracking-[0.25em] uppercase px-6 py-3 rounded-full border border-white/20 hover:border-[#FF3300] bg-white/[0.02] transition-colors"
        >
          {activeChallengeIdx < challenges.length - 1 ? 'NEXT CHALLENGE ›' : 'SCENE 05: SIMULATED PROJECTS ›'}
        </button>
      </div>

    </section>
  );
}
