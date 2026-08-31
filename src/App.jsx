import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SmoothScroll from './components/SmoothScroll';
import Background from './components/Background';
import ScrollExpandMedia from './components/ui/scroll-expansion-hero';
import About from './components/About';
import BentoGrid from './components/BentoGrid';
import ExperienceTimeline from './components/ExperienceTimeline';
import MagneticButton from './components/MagneticButton';
import CustomCursor from './components/CustomCursor';
import TimelineNavigation from './components/TimelineNavigation';
import FinalCTA from './components/FinalCTA';
import Preloader from './components/Preloader';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SmoothScroll>
      {/* Globally Active Components at Root */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <TimelineNavigation />
      <CustomCursor />
      <Background />
      
      {/* Main Content Stack */}
      <main className="relative z-10 antialiased overflow-hidden text-white min-h-screen flex flex-col">
        
        <ScrollExpandMedia 
          title="OMMPRAKASH MOHANTY"
          subtitle="Creative Technologist & Software Engineer"
        />
        
        <About />
        
        <BentoGrid />
        
        <ExperienceTimeline />
        
        <FinalCTA />
        
        {/* Minimalist Footer */}
        <footer className="w-full py-12 bg-[#0a0a0a]/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="text-slate-500 font-mono text-sm tracking-widest uppercase">
              © {new Date().getFullYear()} Ommprakash Mohanty.
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-4">
              <MagneticButton 
                href="https://github.com/OmmprakashMohanty01" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                GitHub
              </MagneticButton>
              <MagneticButton 
                href="https://www.linkedin.com/in/ommprakash-mohanty-366b73278/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                LinkedIn
              </MagneticButton>
              <MagneticButton 
                href="mailto:ommmohanty419@gmail.com"
              >
                Email
              </MagneticButton>
            </div>

          </div>
        </footer>

      </main>
    </SmoothScroll>
  );
};

export default App;