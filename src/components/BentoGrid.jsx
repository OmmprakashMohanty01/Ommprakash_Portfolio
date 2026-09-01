import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { projects } from '../data/projects';
import CaseStudyModal from './CaseStudyModal';

const ProjectCard = ({ project, onOpen, shouldReduceMotion }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      layoutId={shouldReduceMotion ? undefined : `project-card-${project.id}`}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/25 transition-colors duration-500 bg-[#0a0a0a]/80 backdrop-blur-xl flex flex-col justify-between p-7 md:p-9 min-h-[360px] md:min-h-[420px] cursor-pointer ${project.colSpan || 'md:col-span-6'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => onOpen(project.id, e)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(project.id, e);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View deep dive case study: ${project.title}`}
    >
      {/* 1. Muted Background Media Layer (Fades in & plays only on active hover) */}
      {project.video ? (
        <div className="absolute inset-0 w-full h-full bg-black z-0">
          <video
            ref={videoRef}
            src={project.video}
            poster={project.poster}
            muted
            loop
            playsInline
            preload="metadata"
            className={`w-full h-full object-cover transition-opacity duration-700 pointer-events-none ${
              isHovered ? 'opacity-50' : 'opacity-0'
            }`}
          />
        </div>
      ) : project.poster ? (
        <div className="absolute inset-0 w-full h-full bg-black z-0">
          <img
            src={project.poster}
            alt={project.title}
            loading="lazy"
            className={`w-full h-full object-cover transition-opacity duration-700 pointer-events-none ${
              isHovered ? 'opacity-35' : 'opacity-0'
            }`}
          />
        </div>
      ) : (
        /* Fallback Dynamic Gradient on Hover */
        <div className={`absolute inset-0 z-0 bg-gradient-to-tr from-white/[0.08] via-transparent to-white/[0.02] transition-opacity duration-700 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
      )}

      {/* 2. Background Technical Grid Pattern & Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/80 opacity-70 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)', 
          backgroundSize: '22px 22px' 
        }} 
      />

      {/* 3. Top Bar: Category & Expand Cue */}
      <div className="relative z-10 flex items-start justify-between gap-4 w-full">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono tracking-[0.25em] text-gray-500 uppercase">
            {project.track}
          </span>
          <span className="text-xs font-mono tracking-wider text-[#00f3ff]">
            {project.category}
          </span>
        </div>

        {/* Action Cue */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-[10px] font-mono text-gray-400 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-300">
          <span>CASE STUDY</span>
          <span className="text-xs">↗</span>
        </div>
      </div>

      {/* 4. Bottom Content: Title, Description, and Tags (Lifts smoothly on hover) */}
      <motion.div 
        animate={shouldReduceMotion ? {} : { y: isHovered ? -8 : 0 }}
        transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
        className="relative z-10 flex flex-col gap-4 mt-12"
      >
        <div className="flex flex-col gap-2">
          <motion.h3 
            layoutId={shouldReduceMotion ? undefined : `project-title-${project.id}`}
            className="text-2xl md:text-3xl lg:text-4xl font-display font-medium text-white tracking-tight group-hover:text-white transition-colors"
          >
            {project.title}
          </motion.h3>
          <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-2xl line-clamp-2">
            {project.tagline || project.shortDescription}
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {(project.stack || project.tags)?.map((tag, i) => (
            <span 
              key={i} 
              className="font-mono text-[10px] uppercase text-gray-300 border border-white/10 px-2.5 py-1 bg-white/[0.02] backdrop-blur-sm rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Viewfinder Corner Brackets */}
      <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default function BentoGrid() {
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const triggerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // URL Sync Listener via window.history & popstate
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      setActiveProjectId(params.get('project'));
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const openProject = (id, event) => {
    if (event) {
      triggerRef.current = event.currentTarget;
    }
    window.history.pushState({}, '', `?project=${id}`);
    setActiveProjectId(id);
  };

  const closeProject = () => {
    window.history.pushState({}, '', window.location.pathname);
    setActiveProjectId(null);
    
    setTimeout(() => {
      if (triggerRef.current) {
        triggerRef.current.focus();
      }
    }, shouldReduceMotion ? 0 : 250);
  };

  const activeProject = projects.find(p => p.id === activeProjectId);

  const filteredProjects = projects.filter(p => {
    if (activeFilter === 'AI') return p.track === 'AI / DEV CORE';
    if (activeFilter === 'CREATIVE') return p.track === 'CREATIVE CORE';
    return true;
  });

  return (
    <section className="w-full relative z-10 bg-transparent py-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center" id="work">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <h4 className="text-gray-500 font-mono tracking-[0.25em] text-xs uppercase">
              02 // Dual-Core Operations
            </h4>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-light text-white tracking-tight">
            Logic & Magic <span className="text-white/30 italic font-serif">Deployed.</span>
          </h2>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 p-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md self-start md:self-auto">
          {['ALL', 'AI', 'CREATIVE'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                activeFilter === filter 
                  ? 'bg-white text-black font-semibold shadow-md' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {filter === 'ALL' ? 'All Works' : filter === 'AI' ? 'AI / Dev Core' : 'Creative Core'}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetrical Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onOpen={openProject}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </div>

      {/* Deep-Dive Case Study Modal */}
      <CaseStudyModal 
        project={activeProject} 
        onClose={closeProject} 
      />

    </section>
  );
}
