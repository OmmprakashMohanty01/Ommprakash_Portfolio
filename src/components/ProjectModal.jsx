import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';

export default function ProjectModal({ project, onClose }) {
  const lenis = useLenis();
  const modalRef = useRef(null);

  useEffect(() => {
    if (project && lenis) {
      lenis.stop();
    }
    return () => {
      if (lenis) lenis.start();
    };
  }, [project, lenis]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#050505] overscroll-none"
      ref={modalRef}
    >
      {/* Fixed Header / Close Button */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-end items-center p-6 md:p-10 pointer-events-none">
        <button 
          onClick={onClose}
          className="pointer-events-auto w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 group"
          aria-label="Close Case Study"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:scale-90 transition-transform">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Hero Section */}
      <motion.div 
        layoutId={`project-container-${project.id}`}
        className="relative w-full h-[60vh] md:h-[80vh] flex flex-col justify-end overflow-hidden"
      >
        <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
          <motion.img
            layoutId={`project-image-${project.id}`}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 max-w-5xl pb-12 md:pb-20">
          <motion.div layoutId={`project-category-${project.id}`} className="mb-4 text-slate-400 font-mono text-sm tracking-widest uppercase font-bold">
            {project.category}
          </motion.div>
          <motion.h1 layoutId={`project-title-${project.id}`} className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 tracking-tight leading-[1.1]">
            {project.title}
          </motion.h1>
          <motion.p layoutId={`project-desc-${project.id}`} className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl">
            {project.shortDescription}
          </motion.p>
        </div>
      </motion.div>

      {/* Case Study Content */}
      <div className="container mx-auto px-6 max-w-4xl py-16 md:py-24">
        {project.content ? (
          <div className="space-y-24 text-lg md:text-xl text-slate-400 font-light leading-relaxed">
            
            {/* Metadata Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-white/10 mb-16 font-mono text-sm"
            >
              <div>
                <span className="block text-slate-500 uppercase tracking-widest mb-2">Role</span>
                <span className="text-white">{project.role}</span>
              </div>
              <div>
                <span className="block text-slate-500 uppercase tracking-widest mb-2">Technologies</span>
                <span className="text-white">{project.content.technologies?.join(', ')}</span>
              </div>
              <div>
                <span className="block text-slate-500 uppercase tracking-widest mb-2">Links</span>
                <div className="flex gap-4">
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#00f3ff] transition-colors flex items-center gap-2">
                      GitHub <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {project.links.live && (
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#00f3ff] transition-colors flex items-center gap-2">
                      Live Demo <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Content Blocks */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-display font-bold text-white mb-6">Overview</h2>
              <p className={project.content.overview.startsWith('CONTENT_PENDING') ? 'text-amber-500/80 font-mono text-sm uppercase tracking-widest' : ''}>
                {project.content.overview}
              </p>
            </motion.section>

            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-display font-bold text-white mb-6">The Problem</h2>
              <p className={project.content.problem.startsWith('CONTENT_PENDING') ? 'text-amber-500/80 font-mono text-sm uppercase tracking-widest' : ''}>
                {project.content.problem}
              </p>
            </motion.section>

            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-display font-bold text-white mb-6">Technical Architecture</h2>
              <p className={project.content.architecture.startsWith('CONTENT_PENDING') ? 'text-amber-500/80 font-mono text-sm uppercase tracking-widest' : ''}>
                {project.content.architecture}
              </p>
            </motion.section>

            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-display font-bold text-white mb-6">Engineering Challenges</h2>
              <p className={project.content.challenges.startsWith('CONTENT_PENDING') ? 'text-amber-500/80 font-mono text-sm uppercase tracking-widest' : ''}>
                {project.content.challenges}
              </p>
            </motion.section>

            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-display font-bold text-white mb-6">Solution & Results</h2>
              <p className={project.content.solution.startsWith('CONTENT_PENDING') ? 'text-amber-500/80 font-mono text-sm uppercase tracking-widest' : ''}>
                {project.content.solution}
              </p>
              <p className={`mt-4 ${project.content.results.startsWith('CONTENT_PENDING') ? 'text-amber-500/80 font-mono text-sm uppercase tracking-widest' : ''}`}>
                {project.content.results}
              </p>
            </motion.section>

          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center text-center py-20"
          >
            <h2 className="text-3xl font-display font-bold text-white mb-6">Project Overview</h2>
            <p className="text-xl text-slate-400 font-light max-w-2xl mb-12">
              This project does not currently have an expanded case study. You can view the source code or live demo directly.
            </p>
            <div className="flex gap-6 flex-wrap justify-center">
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-mono uppercase tracking-widest text-sm hover:bg-white/10 transition-colors">
                  View on GitHub
                </a>
              )}
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-mono uppercase tracking-widest text-sm hover:bg-white/10 transition-colors">
                  View Live Demo
                </a>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
