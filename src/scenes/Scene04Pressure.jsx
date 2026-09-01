import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export default function Scene04Pressure({ onNext }) {
  const [stage, setStage] = useState('prompt'); // prompt -> processing -> resolution
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleSelection = (choice) => {
    setSelectedAnswer(choice);
    setStage('processing');
    
    // Simulate system visualization calculation
    setTimeout(() => {
      setStage('resolution');
    }, 2400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.05 }}
      transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 select-none bg-[#050505] text-[#f5f5f5]"
    >
      <AnimatePresence mode="wait">
        
        {/* STAGE 1: THE PROBLEM */}
        {stage === 'prompt' && (
          <motion.div 
            key="prompt"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
            className="max-w-3xl w-full flex flex-col items-center text-center px-4"
          >
            <p className="font-mono text-[#FF3300] text-[10px] tracking-[0.3em] uppercase mb-10">
              System Pressure Test 01
            </p>
            
            <h2 
              className="text-2xl sm:text-3xl md:text-5xl leading-tight mb-12 tracking-tight uppercase"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              YOU HAVE 50,000 ENTERPRISE DOCUMENTS.<br className="hidden sm:inline"/>
              BUILD A SYSTEM THAT ANSWERS A QUERY<br className="hidden sm:inline"/>
              IN &lt; 2 SECONDS.
            </h2>
            
            <p className="font-mono text-xs text-white/50 tracking-widest uppercase mb-8">
              What is the architectural approach?
            </p>

            <div className="flex flex-col gap-4 w-full max-w-lg font-mono text-xs sm:text-sm tracking-wide">
              <button 
                onClick={() => handleSelection('A')} 
                className="p-4 rounded-lg border border-white/10 hover:border-[#FF3300] hover:bg-[#FF3300]/10 transition-all text-left group flex items-center justify-between"
              >
                <span>A. Standard SQL Full-Text Search</span>
                <span className="text-gray-600 group-hover:text-[#FF3300] transition-colors">›</span>
              </button>
              <button 
                onClick={() => handleSelection('B')} 
                className="p-4 rounded-lg border border-white/10 hover:border-[#FF3300] hover:bg-[#FF3300]/10 transition-all text-left group flex items-center justify-between"
              >
                <span>B. Hybrid Dense-Sparse Vector Retrieval (RAG)</span>
                <span className="text-gray-600 group-hover:text-[#FF3300] transition-colors">›</span>
              </button>
              <button 
                onClick={() => handleSelection('C')} 
                className="p-4 rounded-lg border border-white/10 hover:border-[#FF3300] hover:bg-[#FF3300]/10 transition-all text-left group flex items-center justify-between"
              >
                <span>C. MapReduce Batch Processing</span>
                <span className="text-gray-600 group-hover:text-[#FF3300] transition-colors">›</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* STAGE 2: THE SIMULATION */}
        {stage === 'processing' && (
          <motion.div 
            key="processing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
            className="flex flex-col items-center"
          >
            {/* Minimalist Data Node Visualization */}
            <div className="w-64 h-64 relative mb-8 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-dashed border-white/20 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }} 
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-6 border border-dotted border-white/15 rounded-full"
              />
              <motion.div 
                animate={{ scale: [1, 1.3, 1] }} 
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-4 h-4 bg-[#FF3300] rounded-full shadow-[0_0_20px_#FF3300]"
              />
            </div>
            
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60 animate-pulse">
              Simulating architectural load...
            </p>
          </motion.div>
        )}

        {/* STAGE 3: THE RESOLUTION */}
        {stage === 'resolution' && (
          <motion.div 
            key="resolution"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
            className="max-w-3xl w-full flex flex-col items-center text-center px-4"
          >
            <p className="font-mono text-[#FF3300] text-[10px] tracking-[0.3em] uppercase mb-8">
              System Architecture Validated
            </p>
            
            <h3 
              className="text-2xl sm:text-3xl md:text-4xl leading-tight mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Hybrid Dense-Sparse Vector Retrieval is the only path to sub-200ms semantic lookup without hallucination.
            </h3>
            
            <div className="text-left bg-white/[0.03] border border-white/10 p-6 md:p-8 rounded-xl w-full font-mono text-xs text-white/70 leading-relaxed space-y-3 mb-10">
              <p className="flex items-center gap-2">
                <span className="text-[#FF3300]">&gt;</span> INGESTION: Documents chunked via overlap-aware splitters.
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#FF3300]">&gt;</span> EMBEDDING: Hybrid lexical (BM25) and dense vector mapping.
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#FF3300]">&gt;</span> GUARDRAILS: Strict embedding distance thresholds applied.
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#FF3300]">&gt;</span> DEPLOYMENT: FastAPI serving PostgreSQL/Vector instances.
              </p>
            </div>

            <button 
              onClick={onNext}
              className="font-mono text-xs text-white tracking-[0.25em] uppercase hover:text-[#FF3300] transition-colors flex items-center gap-4 px-8 py-3 rounded-full border border-white/20 hover:border-[#FF3300] bg-white/[0.02]"
            >
              PROCEED TO EXHIBITION <span className="text-lg">→</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
