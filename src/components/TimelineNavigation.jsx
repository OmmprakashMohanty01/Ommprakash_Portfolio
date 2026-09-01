import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import ProjectClips from './ProjectClips';

const sections = [
  { id: 'about', label: 'Intro', num: '00' },
  { id: 'work', label: 'Projects', num: '01' },
  { id: 'experience', label: 'Experience', num: '02' },
  { id: 'contact', label: 'Contact', num: '03' },
];

export default function TimelineNavigation() {
  const [hidden, setHidden] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [activeSection, setActiveSection] = useState('about');
  const [markers, setMarkers] = useState(
    sections.map((sec, i) => ({ ...sec, position: (i / (sections.length - 1)) * 100 }))
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { scrollY, scrollYProgress } = useScroll();
  
  // Smooth the playhead slightly to feel premium
  const playheadScaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
    mass: 0.1,
  });

  // Calculate marker positions based on actual DOM layout
  useEffect(() => {
    const updateMarkers = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const newMarkers = sections.map((sec, i) => {
        const el = document.getElementById(sec.id);
        if (el) {
          // If it's the last section (contact), force it to 100% to ensure the track end is reached
          if (i === sections.length - 1) {
            return { ...sec, position: 100 };
          }
          let pos = el.offsetTop / scrollableHeight;
          pos = Math.max(0, Math.min(pos, 1));
          return { ...sec, position: pos * 100 };
        }
        return { ...sec, position: (i / (sections.length - 1)) * 100 };
      });
      setMarkers(newMarkers);
    };

    updateMarkers();
    const resizeObserver = new ResizeObserver(() => {
      updateMarkers();
    });
    
    resizeObserver.observe(document.body);
    return () => resizeObserver.disconnect();
  }, []);

  // Handle active section via IntersectionObserver (more reliable for highlighting than math)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Manage accessibility for mobile menu
  useEffect(() => {
    const mainNode = document.querySelector('main');
    if (!mainNode) return;
    if (mobileMenuOpen) {
      mainNode.setAttribute('aria-hidden', 'true');
    } else {
      mainNode.removeAttribute('aria-hidden');
    }
    
    return () => mainNode.removeAttribute('aria-hidden');
  }, [mobileMenuOpen]);

  // Hide on scroll down
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest < 100) {
      setIsAtTop(true);
      setHidden(false);
    } else {
      setIsAtTop(false);
      setHidden(latest > previous && latest > 150 && !mobileMenuOpen);
    }
  });

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        variants={{
          top: { y: 0, backgroundColor: 'rgba(5, 5, 5, 0)', borderColor: 'rgba(255, 255, 255, 0)' },
          visible: { y: 0, backgroundColor: 'rgba(10, 10, 10, 0.4)', borderColor: 'rgba(255, 255, 255, 0.05)' },
          hidden: { y: '-100%', backgroundColor: 'rgba(10, 10, 10, 0.4)', borderColor: 'rgba(255, 255, 255, 0.05)' }
        }}
        initial="top"
        animate={isAtTop ? "top" : hidden ? "hidden" : "visible"}
        transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
        className="fixed top-0 left-0 right-0 z-[60] backdrop-blur-md border-b"
      >
        <div className="container mx-auto px-6 max-w-7xl h-20 flex items-center justify-between">
          
          {/* Identity */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-white font-display font-bold tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-white/50 rounded shrink-0"
            aria-label="Back to top"
          >
            OMM
          </button>

          {/* Desktop Cinematic Timeline */}
          <div className="hidden md:flex flex-1 mx-16 items-center relative h-full">
            <div className="w-full relative h-12 flex items-center">
              {/* The Track */}
              <div className="absolute left-0 right-0 h-[1px] bg-white/10" />
              
              {/* The Playhead Bar */}
              <motion.div 
                className="absolute h-[1px] bg-white transform-gpu origin-left z-10"
                style={{ 
                  left: 0,
                  right: 0,
                  scaleX: playheadScaleX,
                }}
              />
              
              {/* The Playhead Dot */}
              <motion.div
                className="absolute w-2 h-2 rounded-full bg-white -mt-[1px] shadow-[0_0_8px_rgba(255,255,255,0.5)] z-20 transform-gpu"
                style={{
                  left: useSpring(useScroll().scrollYProgress, { stiffness: 400, damping: 90, mass: 0.1 }),
                  x: '-50%' // Center the dot on the playhead progress
                }}
              />

              {/* Timeline Markers */}
              {markers.map((marker, i) => {
                const isActive = activeSection === marker.id;
                // Align first to left, last to right, middle centered
                const transform = i === 0 ? 'translateX(0)' : i === markers.length - 1 ? 'translateX(-100%)' : 'translateX(-50%)';
                
                return (
                  <React.Fragment key={marker.id}>
                    <button
                      onClick={() => scrollToSection(marker.id)}
                      className={`absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-2 py-4 z-30 ${
                        isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                      }`}
                      style={{ left: `${marker.position}%`, transform }}
                      aria-current={isActive ? 'step' : undefined}
                    >
                      <span className="w-[1px] h-3 bg-current opacity-30 group-hover:opacity-100 transition-opacity" />
                      <span className="text-[10px] font-mono tracking-widest uppercase transition-colors whitespace-nowrap mt-1">
                        {marker.num} / {marker.label}
                      </span>
                    </button>
                    {marker.id === 'work' && (
                      <div className="absolute top-1/2 -translate-y-1/2 z-30" style={{ left: `${marker.position}%`, transform }}>
                        <ProjectClips isVisible={isActive} isMobile={false} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Mobile Sequence Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center gap-3 text-xs font-mono tracking-widest text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-2 py-2"
            aria-label={mobileMenuOpen ? "Close timeline" : "Open timeline"}
          >
            <span>SEQUENCE</span>
            <div className="w-4 h-[1px] bg-current relative">
              <span className={`absolute top-[-4px] right-0 w-2 h-[1px] bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 origin-right' : ''}`} />
              <span className={`absolute bottom-[-4px] right-0 w-2 h-[1px] bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 origin-right' : ''}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Vertical Timeline Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[55] bg-[#050505]/95 backdrop-blur-xl flex flex-col justify-center pt-20 pb-8 px-8 md:hidden overflow-hidden overscroll-none"
          >
            <div className="relative flex flex-col gap-12 max-w-sm mx-auto w-full h-[60vh] justify-between">
              {/* Vertical Track */}
              <div className="absolute left-[3px] top-4 bottom-4 w-[1px] bg-white/10" />
              
              {/* Vertical Playhead (approximate based on active section for simplicity on mobile, or bind to scroll) */}
              {/* Since the overlay covers the screen and they can't scroll, we just highlight the active section */}
              
              {sections.map((section, i) => {
                const isActive = activeSection === section.id;
                
                return (
                  <React.Fragment key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`relative flex items-center gap-8 group focus:outline-none focus:ring-2 focus:ring-white/50 rounded p-2 -ml-2 text-left z-10 ${
                        isActive ? 'text-white' : 'text-slate-500'
                      }`}
                    >
                      {/* Vertical Marker */}
                      <span className={`w-2 h-2 rounded-full z-10 transition-colors ${isActive ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'bg-slate-700'}`} />
                      
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-mono tracking-widest uppercase opacity-50">
                          {section.num}
                        </span>
                        <span className="text-xl font-display tracking-tight transition-colors group-hover:text-white">
                          {section.label}
                        </span>
                      </div>
                    </button>
                    {section.id === 'work' && (
                      <ProjectClips isVisible={isActive} isMobile={true} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
