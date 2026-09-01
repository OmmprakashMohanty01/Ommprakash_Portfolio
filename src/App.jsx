import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Scene01Arrival from './scenes/Scene01Arrival';
import DocumentExhibition from './scenes/DocumentExhibition';
import CommandPalette from './components/CommandPalette';
import CaseStudyModal from './components/CaseStudyModal';
import { projects } from './data/projects';
import AtmosphereEngine from './components/AtmosphereEngine';

export default function App() {
  const [activeScene, setActiveScene] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [commandMode, setCommandMode] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState(null);

  // Global transition handler preventing state fragmentation
  const advanceScene = (targetScene) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveScene(targetScene);
  };

  // Global Keyboard listener for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeProject = projects.find(p => p.id === activeProjectId);

  const getSceneLabel = () => {
    if (activeScene === 1) return 'SCENE 01 // ARRIVAL';
    return 'SCENE 02 // EXHIBITION';
  };

  return (
    <main className={`relative w-screen h-screen bg-[#030303] text-[#f5f5f5] selection:bg-[#FF3300] selection:text-white ${activeScene === 2 ? 'overflow-y-auto overflow-x-hidden' : 'overflow-hidden'}`}>
      
      {/* Living Film Grain & Breathing Aurora (Global Atmosphere) */}
      <div className="film-grain" />
      <div className="dark-aurora" />

      {/* --- INJECT THE ATMOSPHERE ENGINE HERE --- */}
      {/* It will run globally behind every section of the exhibition */}
      <AtmosphereEngine />

      {/* THE APPLE-TIER GLASSMORPHIC TOP BAR */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 0.5 }}
        className="fixed top-0 inset-x-0 z-[100] flex justify-between items-center px-6 md:px-12 py-4 bg-black/40 backdrop-blur-2xl saturate-150 border-b border-white/10"
      >
        <div className="flex flex-col">
          <p className="font-mono text-[10px] md:text-xs text-white uppercase tracking-[0.2em]">
            OMMPRAKASH MOHANTY
          </p>
          <p className="font-mono text-[8px] md:text-[9px] text-white/50 uppercase tracking-[0.3em]">
            Logic & Imagination
          </p>
        </div>

        <div className="text-right">
          <p className="font-mono text-[10px] md:text-xs text-[#FF3300] uppercase tracking-[0.2em] flex items-center justify-end gap-3">
            <span className="w-1.5 h-1.5 bg-[#FF3300] rounded-full animate-pulse" />
            SYSTEM ONLINE
          </p>
          <p className="font-mono text-[8px] md:text-[9px] text-white/50 uppercase tracking-[0.3em] hidden md:block">
            LAT: 20.2961° N // LON: 85.8245° E
          </p>
        </div>
      </motion.nav>

      {/* FLOATING GLASSMORPHIC COMMAND PILL (Bottom Right) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 1 }}
        className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[100] pointer-events-auto"
      >
        <button 
          onClick={() => setCommandMode(true)}
          className="flex items-center gap-3 px-6 py-3 bg-black/40 backdrop-blur-2xl saturate-150 border border-white/10 rounded-full font-mono text-[9px] text-white/70 hover:text-white hover:bg-white/5 hover:border-white/30 transition-all duration-300 uppercase tracking-[0.3em] shadow-2xl"
        >
          <span className="text-[#FF3300]">●</span>
          [ CMD + K ] Search
        </button>
      </motion.div>

      {/* 
        The Synchronous State Machine
        mode="wait" ensures the current component fully executes its exit{} 
        animation before the new component mounts. 
      */}
      <AnimatePresence 
        mode="wait" 
        onExitComplete={() => setIsTransitioning(false)}
      >
        {activeScene === 1 && (
          <Scene01Arrival 
            key="scene-1" 
            onComplete={() => advanceScene(2)} 
          />
        )}

        {activeScene === 2 && (
          <motion.div 
            key="scene-exhibition"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.05 }}
            transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
            className="relative w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth"
          >
            <DocumentExhibition onSelectProject={(id) => setActiveProjectId(id)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODE 2: RECRUITER COMMAND PALETTE (CMD + K) */}
      <AnimatePresence>
        {commandMode && (
          <CommandPalette 
            onClose={() => setCommandMode(false)} 
            onSelectProject={(id) => setActiveProjectId(id)}
          />
        )}
      </AnimatePresence>

      {/* Case Study Modal */}
      <CaseStudyModal 
        project={activeProject} 
        onClose={() => setActiveProjectId(null)} 
      />

    </main>
  );
}