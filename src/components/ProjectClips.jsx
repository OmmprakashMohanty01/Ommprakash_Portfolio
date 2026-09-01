import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';

export default function ProjectClips({ isVisible, isMobile }) {
  const [activeProjectId, setActiveProjectId] = useState(null);

  useEffect(() => {
    if (!isVisible) {
      setActiveProjectId(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter(e => e.isIntersecting);
        if (intersecting.length > 0) {
          setActiveProjectId(intersecting[0].target.id.replace('project-node-', ''));
        }
      },
      { rootMargin: '-20% 0px -20% 0px', threshold: 0.1 }
    );

    projects.forEach((p) => {
      const el = document.getElementById(`project-node-${p.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isVisible]);

  const openProject = (project, e) => {
    if (project.isBentoOnly) {
      e.preventDefault();
      return;
    }
    if (e.button === 0 && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      const url = new URL(window.location);
      url.searchParams.set('project', project.id);
      window.history.pushState({}, '', url);
      window.dispatchEvent(new Event('popstate'));
    }
  };

  if (isMobile) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-5 pl-5 mt-4 overflow-hidden relative"
          >
            <div className="absolute left-[3px] top-2 bottom-4 w-[1px] bg-white/10" />
            
            {projects.map((project, idx) => {
              const isProjectActive = activeProjectId === project.id;
              return (
                <div key={project.id} className="relative flex items-center group">
                  <div className={`absolute left-[-21px] w-1.5 h-1.5 rounded-full z-10 transition-colors duration-300 ${isProjectActive ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'bg-slate-700'}`} />
                  <a
                    href={project.isBentoOnly ? undefined : `?project=${project.id}`}
                    onClick={(e) => openProject(project, e)}
                    className={`flex-1 focus:outline-none focus:ring-2 focus:ring-white/50 rounded py-1 ${project.isBentoOnly ? 'cursor-default' : 'cursor-pointer'} ${isProjectActive ? 'text-white' : 'text-slate-500'}`}
                    aria-current={isProjectActive ? 'true' : undefined}
                    tabIndex={project.isBentoOnly ? -1 : 0}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-mono tracking-widest uppercase opacity-70">
                        0{idx + 1} / {project.category}
                      </span>
                      <span className="text-sm font-display tracking-tight transition-colors group-hover:text-white">
                        {project.title.toUpperCase()}
                      </span>
                    </div>
                  </a>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Desktop View
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
          className="absolute top-full left-1/2 flex flex-col items-start w-[240px] pt-1"
        >
          {/* Vertical stem dropping from the parent center */}
          <div className="absolute left-0 top-0 bottom-[20px] w-[1px] bg-white/10" />
          
          {projects.map((project, idx) => {
            const isProjectActive = activeProjectId === project.id;
            return (
              <div key={project.id} className="relative flex items-center w-full group py-1.5">
                <div className={`absolute left-[-3px] w-1.5 h-1.5 rounded-full z-10 transition-colors duration-300 ${isProjectActive ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'bg-[#050505] border border-white/20 group-hover:border-white/50'}`} />
                <div className="w-[16px] h-[1px] bg-white/10" />
                
                <a
                  href={project.isBentoOnly ? undefined : `?project=${project.id}`}
                  onClick={(e) => openProject(project, e)}
                  className={`flex-1 pl-3 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded text-left ${project.isBentoOnly ? 'cursor-default' : 'cursor-pointer'} ${isProjectActive ? 'text-white' : 'text-slate-500 hover:text-white'}`}
                  aria-current={isProjectActive ? 'true' : undefined}
                  tabIndex={project.isBentoOnly ? -1 : 0}
                >
                  <div className="text-[9px] font-mono tracking-widest uppercase opacity-70 mb-0.5">
                    0{idx + 1} / {project.category}
                  </div>
                  <div className="text-[11px] font-bold tracking-wider leading-tight">
                    {project.title.toUpperCase()}
                  </div>
                </a>
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
