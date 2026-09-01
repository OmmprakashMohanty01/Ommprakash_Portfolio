import { useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';

// --- Sub-Component: 3D Holographic Repo Card ---
const TiltCard = ({ repo }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Springs for buttery smooth return-to-center physics
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  // Map mouse position to a 3D rotation angle (15 degrees max)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a 
      href={`https://github.com/OmmprakashMohanty01/${repo.name}`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative p-6 border border-white/10 hover:border-[#FF3300]/50 bg-white/[0.01] transition-colors group overflow-hidden"
    >
      {/* 3D Glare Effect */}
      <motion.div 
        style={{
          background: `radial-gradient(circle at ${useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"])}, rgba(255,255,255,0.1) 0%, transparent 50%)`
        }}
        className="absolute inset-0 z-0 pointer-events-none"
      />
      
      {/* Content lifted in Z-space */}
      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
        <p className="font-mono text-sm text-white/90 truncate mb-2 group-hover:text-white">{repo.name}</p>
        <p className="font-mono text-[10px] text-[#FF3300] tracking-widest uppercase">{repo.tech}</p>
      </div>
    </motion.a>
  );
};

// --- Sub-Component: Magnetic Button Physics ---
const MagneticButton = ({ children, href }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const { x, y } = position;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative px-12 py-6 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 font-mono text-sm tracking-[0.2em] uppercase group"
    >
      {children}
    </motion.a>
  );
};

// --- Main Component ---
export default function TransmissionHub() {
  const repos = [
    { name: 'player_reidentification', tech: 'Python ✦ YOLOv8' },
    { name: 'business-rag-qna', tech: 'Python ✦ LLMs' },
    { name: 'llama3-faiss-agent', tech: 'Python ✦ Vector DB' },
    { name: 'personal-branding-engine', tech: 'Python ✦ Orchestration' },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#030303] flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 border-t border-white/10 overflow-hidden z-20" style={{ perspective: "1000px" }}>
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[#FF3300] opacity-[0.03] blur-[120px] pointer-events-none rounded-full" />

      <div className="w-full max-w-7xl mx-auto flex flex-col flex-grow">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
        >
          <p className="font-mono text-[#FF3300] text-[10px] tracking-[0.3em] uppercase mb-4 flex items-center gap-4">
            <span className="w-1.5 h-1.5 bg-[#FF3300] animate-pulse" />
            04 // Transmission Hub
          </p>
          <h2 className="text-4xl md:text-7xl lg:text-[7rem] font-serif text-white tracking-tighter leading-[0.9] mb-8" style={{ fontFamily: "'Syncopate', sans-serif" }}>
            INITIATE<br />TRANSMISSION.
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between mt-12 md:mt-24 gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 0.2 }}
            className="md:w-1/2"
          >
            <p className="font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase mb-8 pb-4 border-b border-white/10">
              Active Codebases // OmmprakashMohanty01
            </p>
            {/* The 3D Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ perspective: "1000px" }}>
              {repos.map((repo, i) => (
                <TiltCard key={i} repo={repo} />
              ))}
            </div>
            <a 
              href="https://github.com/OmmprakashMohanty01" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-8 font-mono text-[10px] text-white/50 hover:text-white tracking-[0.2em] transition-colors"
            >
              [ VIEW ALL 29 REPOSITORIES ] ↗
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 0.4 }}
            className="md:w-1/2 flex flex-col items-start md:items-end gap-6"
          >
            <p className="font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase mb-2 md:text-right w-full">
              Establish Connection
            </p>
            
            <MagneticButton href="mailto:ommprakashmohanty@gmail.com">
              <span className="mr-3 text-[#FF3300] group-hover:text-black">↗</span> Email Dispatch
            </MagneticButton>
            
            <MagneticButton href="https://github.com/OmmprakashMohanty01">
              <span className="mr-3 text-[#FF3300] group-hover:text-black">↗</span> GitHub Network
            </MagneticButton>

            {/* UPGRADED LINKEDIN ROUTE */}
            <MagneticButton href="https://www.linkedin.com/in/ommprakash-mohanty-366b73278/">
              <span className="mr-3 text-[#FF3300] group-hover:text-black">↗</span> LinkedIn Hub
            </MagneticButton>
          </motion.div>
          
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 0.8 }}
        className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-32 border-t border-white/10 pt-8"
      >
        <div className="font-mono text-[9px] text-white/40 tracking-[0.2em] uppercase text-center md:text-left mb-4 md:mb-0">
          <p>© 2026 OMMPRAKASH MOHANTY ✦ LOGIC & IMAGINATION</p>
          <p className="mt-1">LAT: 20.2961° N // LON: 85.8245° E // BHUBANESWAR, IN</p>
        </div>

        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-mono text-[10px] text-white/50 hover:text-[#FF3300] tracking-[0.3em] uppercase transition-colors"
        >
          [ RETURN TO ORIGIN ] ↑
        </button>
      </motion.div>
    </section>
  );
}
