import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function CaseStudyModal({ project, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('architecture'); // 'architecture' | 'pipeline' | 'decisions'
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll Locking & Escape Key binding
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden'; 
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to render formatted markdown-like text
  const renderFormattedText = (text) => {
    if (!text) return null;

    return text.trim().split('\n\n').map((paragraph, pIdx) => {
      // Check if it's a numbered list
      if (paragraph.match(/^\d+\.\s/m)) {
        const items = paragraph.split('\n').filter(Boolean);
        return (
          <ol key={pIdx} className="space-y-4 my-4">
            {items.map((item, iIdx) => {
              const cleaned = item.replace(/^\d+\.\s*/, '');
              const parts = cleaned.split(/(\*\*.*?\*\*)/g);
              return (
                <li key={iIdx} className="flex items-start gap-3 text-gray-300 text-sm md:text-base leading-relaxed">
                  <span className="font-mono text-xs font-bold text-[#00f3ff] bg-white/5 border border-white/10 px-2 py-0.5 rounded mt-0.5">
                    0{iIdx + 1}
                  </span>
                  <span>
                    {parts.map((part, pPartIdx) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={pPartIdx} className="text-white font-medium">{part.slice(2, -2)}</strong>;
                      }
                      return part;
                    })}
                  </span>
                </li>
              );
            })}
          </ol>
        );
      }

      // Regular paragraph with bold highlights
      const parts = paragraph.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={pIdx} className="text-gray-300 text-base md:text-lg font-light leading-relaxed mb-5 last:mb-0">
          {parts.map((part, pPartIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pPartIdx} className="text-white font-medium">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none p-4 md:p-10 lg:p-14">
          
          {/* Backdrop Blur Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050505]/90 backdrop-blur-2xl pointer-events-auto cursor-pointer"
          />

          {/* Expanded Card Sheet */}
          <motion.div
            layoutId={shouldReduceMotion ? undefined : `project-card-${project.id}`}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative z-10 w-full max-w-5xl max-h-[88vh] overflow-y-auto rounded-3xl bg-[#0a0a0a] border border-white/15 shadow-[0_0_80px_rgba(0,0,0,0.98)] pointer-events-auto flex flex-col"
          >
            {/* Modal Top Sticky Bar */}
            <div className="sticky top-0 z-30 flex items-center justify-between p-6 md:px-10 md:py-6 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#00f3ff] animate-pulse" />
                <span className="text-[11px] font-mono tracking-[0.25em] text-gray-400 uppercase">
                  Technical Deep-Dive // {project.track}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleCopyLink}
                  className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/10 text-xs font-mono text-gray-300 uppercase tracking-widest transition-colors"
                >
                  <span>{copied ? '✓ Link Copied' : 'Share Link'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-xs font-mono text-white uppercase tracking-widest transition-all"
                  aria-label="Close Case Study"
                >
                  [✕ Close]
                </button>
              </div>
            </div>

            {/* Scrollable Content Container */}
            <div className="p-6 md:p-10 lg:p-12 flex flex-col gap-10">
              
              {/* Header Details */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-md text-[11px] font-mono tracking-wider uppercase bg-white/5 border border-white/10 text-gray-300">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-gray-500">
                    Role: {project.role}
                  </span>
                </div>

                <motion.h1
                  layoutId={shouldReduceMotion ? undefined : `project-title-${project.id}`}
                  className="text-3xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight leading-[1.05]"
                >
                  {project.title}
                </motion.h1>

                <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-4xl pt-1">
                  {project.tagline || project.shortDescription}
                </p>
              </div>

              {/* Media Slot (Video Player / Visual Asset) */}
              <div className="w-full relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 aspect-video flex items-center justify-center">
                {project.video ? (
                  <video
                    src={project.video}
                    poster={project.poster}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : project.poster ? (
                  <img
                    src={project.poster}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-white/[0.03] to-transparent relative">
                    <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center mb-4 text-[#00f3ff]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                        <line x1="8" y1="21" x2="16" y2="21"/>
                        <line x1="12" y1="17" x2="12" y2="21"/>
                      </svg>
                    </div>
                    <span className="text-xs font-mono tracking-widest uppercase text-gray-400">
                      System Architecture Diagram View
                    </span>
                    <span className="text-sm text-gray-500 font-mono mt-1">
                      {project.title} // Computational Pipeline
                    </span>
                  </div>
                )}
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-mono tracking-[0.25em] text-gray-500 uppercase">
                  Tech Stack & Tools:
                </span>
                <div className="flex flex-wrap gap-2">
                  {(project.stack || project.tags)?.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs font-mono text-gray-300 hover:border-white/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white text-black text-xs font-mono font-medium hover:bg-gray-200 transition-colors ml-auto"
                    >
                      <span>View GitHub Repository</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Tab Switcher */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto">
                {[
                  { id: 'architecture', label: '01. Architecture' },
                  { id: 'pipeline', label: '02. Pipeline & Engine' },
                  { id: 'decisions', label: '03. Engineering Decisions' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-white/10 text-white font-medium border border-white/20'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content Renderer */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
                className="p-8 rounded-2xl border border-white/10 bg-white/[0.015]"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                  <span className="w-2 h-2 rounded-full bg-[#00f3ff]" />
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#00f3ff]">
                    {activeTab === 'architecture' ? 'System Overview & Technical Architecture' : activeTab === 'pipeline' ? 'Execution Pipeline & Data Flow' : 'Critical Engineering Decisions & Trade-Offs'}
                  </h3>
                </div>

                <div className="prose prose-invert max-w-none font-sans text-white/80 leading-relaxed">
                  {project.content?.[activeTab] ? (
                    renderFormattedText(project.content[activeTab])
                  ) : (
                    <p className="text-gray-500 font-mono text-sm">
                      Detailed documentation for this section is being indexed.
                    </p>
                  )}
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
