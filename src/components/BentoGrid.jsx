import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectModal from './ProjectModal';

export default function BentoGrid() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [activeProject, setActiveProject] = useState(null);
  const triggerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Initialize from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('project');
    if (projectId) {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        setActiveProject(project);
      } else {
        // Invalid ID -> clean URL
        const url = new URL(window.location);
        url.searchParams.delete('project');
        window.history.replaceState({}, '', url);
      }
    }
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const projectId = params.get('project');
      if (projectId) {
        const project = projects.find(p => p.id === projectId);
        setActiveProject(project || null);
      } else {
        setActiveProject(null);
        // Focus restoration if we navigate back to grid
        if (triggerRef.current) {
          triggerRef.current.focus();
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openProject = (project, event) => {
    if (event) {
      triggerRef.current = event.currentTarget;
    }
    setActiveProject(project);
    const url = new URL(window.location);
    url.searchParams.set('project', project.id);
    window.history.pushState({}, '', url);
  };

  const closeProject = () => {
    setActiveProject(null);
    const url = new URL(window.location);
    url.searchParams.delete('project');
    window.history.pushState({}, '', url);
    
    // Focus restoration after modal unmounts
    setTimeout(() => {
      if (triggerRef.current) {
        triggerRef.current.focus();
      }
    }, shouldReduceMotion ? 0 : 400);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="py-24 w-full bg-[#050505] relative z-10" id="work">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
            Selected Work
          </h2>
          <div className="w-12 h-[1px] bg-white/20"></div>
        </div>

        {/* Bento Grid Container */}
        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[400px]"
        >
          {projects.map((project) => (
            <motion.a 
              key={project.id}
              href={project.isBentoOnly ? undefined : `?project=${project.id}`}
              onClick={(e) => {
                if (project.isBentoOnly) {
                  e.preventDefault();
                  return;
                }
                // Only prevent default if we're not opening in a new tab
                if (e.button === 0 && !e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  openProject(project, e);
                }
              }}
              layoutId={shouldReduceMotion ? undefined : `project-container-${project.id}`}
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : { scale: 0.98, transition: { type: "spring", stiffness: 400, damping: 30 } }}
              className={`group relative ${project.colSpan} rounded-3xl overflow-hidden bg-[#050505] border border-white/5 flex flex-col justify-end p-8 md:p-10 transition-all duration-500 ${!project.isBentoOnly ? 'hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent cursor-pointer' : ''}`}
            >
              {/* Top Right Arrow Indicator */}
              {!project.isBentoOnly && (
                <div className="absolute top-8 right-8 z-20 w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}

              {/* Media Background */}
              <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
                <motion.img
                  layoutId={shouldReduceMotion ? undefined : `project-image-${project.id}`}
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-50 md:opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                {project.hoverVideoPlaceholder && (
                  <motion.div 
                    className="w-full h-full absolute inset-0 z-0 opacity-0 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 ease-out"
                    style={{ 
                      backgroundImage: `url('${project.hoverVideoPlaceholder}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                )}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none" />
              </div>
              
              {/* Content */}
              <div className="relative z-30 transition-transform duration-500 group-hover:translate-y-[-4px]">
                <motion.div layoutId={shouldReduceMotion ? undefined : `project-category-${project.id}`} className="mb-3 text-slate-500 font-mono text-xs tracking-widest uppercase font-bold transition-colors group-hover:text-white">
                  {project.category}
                </motion.div>
                <motion.h3 layoutId={shouldReduceMotion ? undefined : `project-title-${project.id}`} className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                  {project.title}
                </motion.h3>
                <motion.p layoutId={shouldReduceMotion ? undefined : `project-desc-${project.id}`} className="text-slate-400 font-light max-w-md">
                  {project.shortDescription}
                </motion.p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal 
            key="project-modal" 
            project={activeProject} 
            onClose={closeProject} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
