import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const profiles = {
  ai: { id: 'ai', label: 'Applied AI Engineer', file: '/resume-ai.pdf' },
  backend: { id: 'backend', label: 'Backend & Systems Architect', file: '/resume-backend.pdf' },
  academic: { id: 'academic', label: 'M.Sc. Computer Science Candidate', file: '/resume-academic.pdf' }
};

const compileSteps = [
  "PARSING SOURCE IDENTITY...",
  "FILTERING RELEVANT METRICS...",
  "RANKING ARCHITECTURAL DECISIONS...",
  "COMPOSING PROFILE...",
  "SYSTEM READY."
];

export default function IdentityCompiler() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileIndex, setCompileIndex] = useState(0);

  useEffect(() => {
    if (!isCompiling) return;
    const interval = setInterval(() => {
      setCompileIndex((prev) => {
        if (prev < compileSteps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [isCompiling]);

  const handleSelect = (key) => {
    setSelectedProfile(profiles[key]);
    setIsCompiling(true);
    setCompileIndex(0);
  };

  const isFinished = compileIndex === compileSteps.length - 1;

  return (
    <section className="relative w-full py-16 md:py-32 bg-[#030303] border-t border-white/10 z-20 flex flex-col items-center">
      {/* Subtle Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,51,0,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
          className="mb-16 md:mb-24"
        >
          <p className="font-mono text-[#FF3300] text-[10px] tracking-[0.3em] uppercase mb-4 flex items-center gap-4">
            <span className="w-1.5 h-1.5 bg-[#FF3300]" />
            05 // The Identity Compiler
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight max-w-2xl">
            Extract the data <br/> relevant to your objective.
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="md:w-1/3 flex flex-col gap-4">
            <p className="font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase mb-4 border-b border-white/10 pb-4">
              Select Target Profile
            </p>
            {Object.keys(profiles).map((key) => (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`text-left px-6 py-4 font-mono text-xs tracking-widest uppercase transition-all duration-300 border ${
                  selectedProfile?.id === key 
                    ? 'border-[#FF3300] bg-[#FF3300]/10 text-white shadow-[0_0_20px_rgba(255,51,0,0.2)]' 
                    : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white bg-white/[0.02]'
                }`}
              >
                {profiles[key].label}
              </button>
            ))}
          </div>

          {/* UPGRADE: Changed h-64 to min-h-[300px] h-auto md:h-64 */}
          <div className="md:w-2/3 min-h-[300px] h-auto md:h-64 border border-white/20 bg-[#050505] p-6 md:p-8 font-mono text-xs overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-sm">
            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 z-20" />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.9)] z-30" />

            {!selectedProfile ? (
              <div className="flex h-full items-center justify-center text-white/30 animate-pulse tracking-widest relative z-10">
                [ AWAITING INPUT ]
              </div>
            ) : (
              <div className="flex flex-col h-full justify-between relative z-10">
                <div>
                  <p className="text-[#FF3300] mb-4 tracking-widest drop-shadow-[0_0_5px_rgba(255,51,0,0.5)]">TARGET: {selectedProfile.label}</p>
                  <div className="flex flex-col gap-2 text-white/80">
                    {compileSteps.map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={compileIndex >= idx ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.1 }}
                      >
                        {idx === compileIndex && idx !== compileSteps.length - 1 ? '> ' + step + ' █' : '> ' + step}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {isFinished && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
                      className="flex justify-between items-end border-t border-white/20 pt-4 mt-4"
                    >
                      <div className="flex flex-col gap-1 text-white/50 text-[9px] tracking-widest">
                        <p>CGPA / DEGREE: VERIFIED</p>
                        <p>TECHNICAL METRICS: EXTRACTED</p>
                      </div>
                      
                      {/* FIX: The download attribute prevents routing errors */}
                      <a 
                        href={selectedProfile.file} 
                        download={`Ommprakash_Mohanty_${selectedProfile.id.toUpperCase()}_Resume.pdf`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white text-black px-6 py-2 uppercase tracking-widest hover:bg-[#FF3300] hover:text-white transition-colors duration-300 font-bold z-40 relative shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                      >
                        [ EXPORT PROFILE ]
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
