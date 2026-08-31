import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation() {
  const [hidden, setHidden] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    // Determine if at top (less than 100px)
    if (latest < 100) {
      setIsAtTop(true);
      setHidden(false);
    } else {
      setIsAtTop(false);
      // Hide on scroll down, show on scroll up (only after passing 100px)
      if (latest > previous && latest > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    }
  });

  useEffect(() => {
    const observers = [];
    
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Handle Escape for mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Lenis handles the smooth scroll automatically if configured for anchor links, 
      // but natively we can just use scrollIntoView.
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
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[60] backdrop-blur-md border-b"
      >
        <div className="container mx-auto px-6 max-w-7xl h-20 flex items-center justify-between">
          
          {/* Logo / Identity */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-white font-display font-bold tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
            aria-label="Back to top"
          >
            OMM
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-sm font-mono tracking-widest uppercase transition-colors relative focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-2 py-1 ${
                  activeSection === section.id ? 'text-white font-bold' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {section.label}
                {activeSection === section.id && (
                  <motion.div 
                    layoutId="activeSectionIndicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00f3ff]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden md:block">
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-xs font-mono tracking-widest uppercase text-[#00f3ff] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#00f3ff]/50 rounded px-2 py-1 flex items-center gap-2"
            >
              Let's Talk <span aria-hidden="true">↗</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-12 h-12 flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-6 h-4 relative flex flex-col justify-between">
              <span className={`w-full h-[2px] bg-white transition-transform origin-left ${mobileMenuOpen ? 'rotate-45 translate-y-[1px]' : ''}`} />
              <span className={`w-full h-[2px] bg-white transition-opacity ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`w-full h-[2px] bg-white transition-transform origin-left ${mobileMenuOpen ? '-rotate-45 -translate-y-[1px]' : ''}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[55] bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20 pb-8 px-6 md:hidden overflow-hidden overscroll-none"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-sm">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full min-h-[48px] text-2xl font-display tracking-tight transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded ${
                    activeSection === section.id ? 'text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
