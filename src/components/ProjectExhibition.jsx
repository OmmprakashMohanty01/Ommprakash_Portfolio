import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 'sportsense',
    title: 'Multi-Cam SportSense',
    category: 'Computer Vision',
    tech: 'YOLOv8 ✦ OpenCV ✦ PyTorch',
    video: '/media/sportsense-loop.webm',
    // Linked directly to your YOLOv8 / DeepSORT repo
    link: 'https://github.com/OmmprakashMohanty01/player_reidentification' 
  },
  {
    id: 'rag-engine',
    title: 'Enterprise RAG Engine',
    category: 'Backend Architecture',
    tech: 'FastAPI ✦ PostgreSQL ✦ LLMs',
    video: '/media/rag-loop.webm',
    // Linked directly to your business-rag-qna repo
    link: 'https://github.com/OmmprakashMohanty01/business-rag-qna' 
  },
  {
    id: 'zero-one',
    title: 'ZERO ONE: CODEBREAK',
    category: 'Digital Storytelling',
    tech: 'After Effects ✦ Premiere Pro',
    video: '/media/zero-one-loop.webm',
    // Linked directly to your official YouTube channel
    link: 'https://youtube.com/@zero_one_codebreak?si=omXrOIIRvoO8SieP' 
  },
  {
    id: 'branding-engine',
    title: 'Personal-Branding-Engine',
    category: 'DevOps & Orchestration',
    tech: 'Docker ✦ Render ✦ Next.js',
    video: '/media/branding-loop.webm',
    // Linked directly to your orchestration repo
    link: 'https://github.com/OmmprakashMohanty01/personal-branding-engine' 
  }
];

const ease = [0.22, 1, 0.36, 1];

export default function ProjectExhibition() {
  const [hoveredProject, setHoveredProject] = useState(null);

  // Hard Redirect Handler
  const handleProjectClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative w-full min-h-screen bg-[#030303] py-16 md:py-32 flex flex-col justify-center border-t border-white/10 z-20" style={{ perspective: "1500px" }}>
      
      {/* DYNAMIC VIDEO BACKGROUND */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              key={hoveredProject}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.15, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
              className="absolute inset-0 w-full h-full"
            >
              <video src={projects.find(p => p.id === hoveredProject)?.video} autoPlay muted loop playsInline className="w-full h-full object-cover grayscale contrast-125" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FOREGROUND ROSTER */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
          className="mb-16 md:mb-24"
        >
          <p className="font-mono text-[#FF3300] text-[10px] tracking-[0.3em] uppercase mb-4 flex items-center gap-4">
            <span className="w-1.5 h-1.5 bg-[#FF3300]" />
            02 // Dual-Core Capability
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight">
            Engineering & Visuals.
          </h2>
        </motion.div>

        <div className="flex flex-col border-t border-white/10 group">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => handleProjectClick(project.link)}
              className={`flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 border-b border-white/10 cursor-pointer transition-all duration-500
                ${hoveredProject && hoveredProject !== project.id ? 'opacity-20 blur-[2px]' : 'opacity-100'}
                ${hoveredProject === project.id ? 'pl-4 border-l-4 border-l-[#FF3300] bg-white/[0.02]' : 'border-l-4 border-l-transparent'}
              `}
            >
              <div className="md:w-1/2 flex flex-col mb-4 md:mb-0">
                <p className="font-mono text-[9px] text-white/40 tracking-[0.2em] uppercase mb-2 transition-colors duration-300">{project.category}</p>
                <h3 className={`text-2xl md:text-4xl font-serif transition-colors duration-500 ${hoveredProject === project.id ? 'text-white' : 'text-white/80'}`}>{project.title}</h3>
              </div>
              <div className="md:w-1/2 flex items-center justify-between md:justify-end gap-8">
                <p className="font-mono text-[10px] text-[#FF3300] tracking-[0.2em] uppercase">{project.tech}</p>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${hoveredProject === project.id ? 'border-[#FF3300] bg-[#FF3300]/10 text-[#FF3300] scale-110' : 'border-white/20 text-white/30'}`}>
                  <span className="text-xs">↗</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
