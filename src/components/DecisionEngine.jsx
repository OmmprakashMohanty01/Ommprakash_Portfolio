import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DecisionEngine() {
  const [speed, setSpeed] = useState(50);
  const [accuracy, setAccuracy] = useState(50);
  const [cost, setCost] = useState(50);

  // Dynamic Architecture Logic based on user input
  const getArchitecture = () => {
    let db = "PostgreSQL (pgvector)";
    let model = "GPT-3.5-Turbo";
    let retrieval = "Dense Vector Search";
    let cache = "None";

    if (speed > 75) cache = "Redis Semantic Cache (Sub 50ms)";
    if (accuracy > 75) retrieval = "Hybrid Search + Cohere Rerank";
    if (cost < 25) model = "Llama-3-8B (Self-Hosted)";
    if (cost > 75 && accuracy > 75) model = "GPT-4o (Frontier)";

    return { db, model, retrieval, cache };
  };

  const arch = getArchitecture();

  return (
    <section className="relative w-full py-32 bg-[#030303] border-t border-white/10 z-20 flex flex-col items-center">
      
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24"
        >
          <p className="font-mono text-[#FF3300] text-[10px] tracking-[0.3em] uppercase mb-4 flex items-center gap-4">
            <span className="w-1.5 h-1.5 bg-[#FF3300]" />
            03 // The Decision Engine
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight max-w-2xl">
            Don't read my skills. <br/> Test my mental model.
          </h2>
          <p className="font-mono text-xs text-white/50 mt-6 max-w-lg leading-relaxed">
            SYSTEM PROMPT: You have 100,000 enterprise documents. The client needs answers instantly. 
            Adjust the constraints below to see how I dynamically scale the architecture.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* LEFT: The Physical Constraints */}
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="lg:w-1/3 flex flex-col gap-12 bg-white/[0.02] border border-white/10 p-8 rounded-xl backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          >
            {[
              { label: "SPEED (Latency)", value: speed, setter: setSpeed },
              { label: "ACCURACY (Retrieval)", value: accuracy, setter: setAccuracy },
              { label: "COST (Compute)", value: cost, setter: setCost }
            ].map((constraint, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-white/60">
                  <span>{constraint.label}</span>
                  <span className="text-[#FF3300]">{constraint.value}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={constraint.value}
                  onChange={(e) => constraint.setter(Number(e.target.value))}
                  className="w-full appearance-none bg-white/10 h-[1px] outline-none slider-thumb cursor-ew-resize"
                />
              </div>
            ))}
          </motion.div>

          {/* RIGHT: The Live Architecture Simulation */}
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="lg:w-2/3 relative border border-white/10 bg-[#050505] p-8 md:p-12 rounded-xl shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Grid background to look like a blueprint */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col gap-8">
              
              <motion.div layout className="flex flex-col border-l-2 border-[#FF3300] pl-6">
                <p className="font-mono text-[9px] text-white/40 tracking-[0.2em] uppercase mb-1">Retrieval Strategy</p>
                <p className="font-serif text-2xl text-white">{arch.retrieval}</p>
              </motion.div>

              <motion.div layout className="flex flex-col border-l-2 border-white/20 pl-6">
                <p className="font-mono text-[9px] text-white/40 tracking-[0.2em] uppercase mb-1">Vector Database</p>
                <p className="font-serif text-2xl text-white">{arch.db}</p>
              </motion.div>

              <AnimatePresence mode="popLayout">
                {arch.cache !== "None" && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col border-l-2 border-green-500 pl-6"
                  >
                    <p className="font-mono text-[9px] text-white/40 tracking-[0.2em] uppercase mb-1">Caching Layer (High Speed)</p>
                    <p className="font-serif text-2xl text-green-400">{arch.cache}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div layout className="flex flex-col border-l-2 border-blue-500 pl-6">
                <p className="font-mono text-[9px] text-white/40 tracking-[0.2em] uppercase mb-1">Inference Model</p>
                <p className="font-serif text-2xl text-blue-400">{arch.model}</p>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
