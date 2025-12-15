import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { 
  Play, 
  Image as ImageIcon, 
  Code2, 
  ArrowRight, 
  X, 
  Github, 
  Linkedin, 
  Mail, 
  Twitter, 
  ChevronDown,
  CheckCircle,
  Youtube,
  Maximize2,
  Menu,
  ChevronLeft,
  MapPin,
  Languages,
  GraduationCap,
  ExternalLink,
  Home,
  MessageCircle,
  Send,
  Sun,
  Moon
} from 'lucide-react';

/**
 * CONTEXT: Theme Management
 */
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`min-h-screen transition-colors duration-1000 ease-in-out ${theme === 'dark' ? 'dark bg-[#0A0A0B]' : 'bg-[#FDFCF8]'}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

/**
 * UTILITY: 3D Tilt Hook
 * Refined for subtle, premium Apple-like motion.
 */
const useTilt = (active = true) => {
  const ref = useRef(null);

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    if (!active || !ref.current || isMobile) return;

    const card = ref.current;
    
    const handleEnter = () => {
      card.style.transition = 'none'; 
    };

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Reduced rotation for a heavier, premium feel (VisionOS style)
      const rotateX = ((y - centerY) / centerY) * -4; 
      const rotateY = ((x - centerX) / centerX) * 4;

      const translateZ = 12;

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01) translateZ(${translateZ}px)`;
    };

    const handleLeave = () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'; 
      card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)`;
    };

    card.addEventListener('mouseenter', handleEnter);
    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);

    return () => {
      card.removeEventListener('mouseenter', handleEnter);
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, [active]);

  return ref;
};

/**
 * COMPONENT: Global Navigation Control
 */
const GlobalNav = () => {
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400); 
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = (e) => {
    window.dispatchEvent(new CustomEvent('reset-navigation'));
    document.body.style.overflow = 'unset';
  };

  return (
    <a 
      href="#home"
      onClick={handleHomeClick}
      className={`fixed bottom-6 left-6 z-[110] px-5 py-3 rounded-full transition-all duration-500 group flex items-center gap-2 hover:scale-105 cursor-pointer backdrop-blur-2xl border shadow-2xl ${
        theme === 'dark' 
          ? 'bg-white/5 border-white/10 text-white hover:bg-white/10 shadow-black/40' 
          : 'bg-white/60 border-white/40 text-slate-900 hover:bg-white/80 shadow-slate-300/50'
      } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      aria-label="Back to Home"
    >
      <Home className="w-5 h-5" />
      <span className="text-sm font-medium">Home</span>
    </a>
  );
};

/**
 * COMPONENT: Background System
 * Concept: "Ambient Light Drift"
 * - Dark Mode: Dim Studio (Soft Bloom + Vignette + Grain)
 * - Light Mode: Diffused Daylight (Frosted Glass + Temperature Shift + Texture)
 */
const Background = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-[2000ms] ease-in-out">
      {/* Base Layer - Theme Specific Tone */}
      <div 
        className={`absolute inset-0 transition-colors duration-[2000ms] ease-in-out ${
          theme === 'dark' ? 'bg-[#0A0A0B]' : 'bg-[#FDFCF8]'
        }`} 
      />
      
      {/* Ambient Light Drift Layers */}
      <div className={`absolute inset-0 transition-opacity duration-[2000ms] ${theme === 'dark' ? 'opacity-100' : 'opacity-90'}`}>
        
        {/* Primary Bloom: Slow, organic drift */}
        <div 
          className={`absolute top-[-20%] left-[-10%] w-[90vw] h-[90vw] rounded-full blur-[180px] animate-drift-ultra-slow
          ${theme === 'dark' ? 'bg-indigo-950/30 mix-blend-screen' : 'bg-orange-50/70 mix-blend-multiply'}`}
        />
        
        {/* Secondary Bloom: Counter-movement & Fill */}
        <div 
          className={`absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full blur-[160px] animate-drift-ultra-slow animation-delay-minus-30s
          ${theme === 'dark' ? 'bg-slate-900/30 mix-blend-screen' : 'bg-blue-50/70 mix-blend-multiply'}`}
        />

        {/* Tertiary Accent: Micro Temperature Shift */}
        <div 
          className={`absolute top-[40%] left-[20%] w-[60vw] h-[60vw] rounded-full blur-[200px] animate-pulse-slow
          ${theme === 'dark' ? 'bg-blue-950/10 mix-blend-screen' : 'bg-rose-50/40 mix-blend-multiply'}`}
        />
      </div>

      {/* Vignette (Dark Mode Only) - Studio Depth */}
      <div 
        className={`absolute inset-0 transition-opacity duration-[2000ms] ${theme === 'dark' ? 'opacity-70' : 'opacity-0'}`}
        style={{ background: 'radial-gradient(circle at center, transparent 40%, #000000 100%)' }}
      />

      {/* Organic Grain / Tactile Texture */}
      <div 
        className={`absolute inset-0 mix-blend-overlay pointer-events-none animate-grain ${theme === 'dark' ? 'opacity-[0.035]' : 'opacity-[0.05]'}`}
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
    </div>
  );
};

/**
 * COMPONENT: Navigation
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Glassmorphism Navbar Styles
  const navClass = scrolled 
    ? (theme === 'dark' ? 'bg-[#0A0A0B]/80 border-white/5 shadow-lg shadow-black/20' : 'bg-white/70 border-white/40 shadow-sm shadow-slate-200/50') 
    : 'bg-transparent border-transparent';

  const textClass = theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black';
  const logoClass = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const logoSpanClass = theme === 'dark' ? 'text-white/40' : 'text-slate-400';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b backdrop-blur-xl py-4 ${navClass}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className={`text-xl font-bold tracking-tight cursor-pointer z-50 ${logoClass}`}
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          Ommprakash<span className={logoSpanClass}>.Mohanty</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo('work')} className={`text-sm font-medium transition-colors ${textClass}`}>Work</button>
          <button onClick={() => scrollTo('about')} className={`text-sm font-medium transition-colors ${textClass}`}>About</button>
          <button 
            onClick={() => scrollTo('contact')} 
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-lg ${
              theme === 'dark' 
                ? 'bg-white text-black hover:bg-slate-200 shadow-white/5' 
                : 'bg-slate-900 text-white hover:bg-slate-700 shadow-slate-400/20'
            }`}
          >
            Let's Collaborate
          </button>
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all border backdrop-blur-md ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/5 text-yellow-300 hover:bg-white/10' 
                : 'bg-white/50 border-black/5 text-slate-600 hover:bg-white/80'
            }`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <button className={`md:hidden z-50 ${logoClass}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div className={`fixed inset-0 z-40 transform transition-transform duration-300 flex items-center justify-center ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} ${theme === 'dark' ? 'bg-[#0A0A0B]/95 backdrop-blur-2xl' : 'bg-white/95 backdrop-blur-2xl'}`}>
        <div className="flex flex-col gap-8 text-center items-center">
          <button onClick={() => scrollTo('work')} className={`text-2xl font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Work</button>
          <button onClick={() => scrollTo('about')} className={`text-2xl font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>About</button>
          <button onClick={() => scrollTo('contact')} className={`text-2xl font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Contact</button>
          <button 
            onClick={() => { toggleTheme(); }}
            className={`mt-4 px-6 py-3 rounded-full flex items-center gap-2 border ${theme === 'dark' ? 'bg-white/10 text-white border-white/10' : 'bg-slate-100 text-slate-900 border-slate-200'}`}
          >
            {theme === 'dark' ? <><Sun className="w-5 h-5" /> Light Mode</> : <><Moon className="w-5 h-5" /> Dark Mode</>}
          </button>
        </div>
      </div>
    </nav>
  );
};

/**
 * COMPONENT: Hero
 * Updates: Seamless background integration, kept animated text.
 */
const Hero = () => {
  const { theme } = useTheme();

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      
      {/* Floating Focus Glow - Attached to Hero */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] -z-10 animate-pulse-slow pointer-events-none transition-colors duration-[2000ms] ${theme === 'dark' ? 'bg-indigo-500/10' : 'bg-blue-300/10'}`} />

      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
        <h1 
          className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter leading-[1.1] animate-fadeIn opacity-0 pb-2" 
          style={{
            animationDelay: '0.1s',
            backgroundImage: 'linear-gradient(270deg, #00f5ff, #6a5cff, #ff4ecd, #ffb86c, #00f5ff)',
            backgroundSize: '600% 600%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'textGradientShift 10s ease infinite, fadeIn 0.8s ease-out forwards 0.1s' 
          }}
        >
          I Build Stories, <br />
          Brands & Software
        </h1>
        <p className={`text-lg md:text-xl font-light mb-10 animate-fadeIn opacity-0 max-w-2xl mx-auto ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`} style={{animationDelay: '0.2s'}}>
          Bridging creative storytelling with scalable technology.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeIn opacity-0" style={{animationDelay: '0.3s'}}>
          <button 
            onClick={() => document.getElementById('work').scrollIntoView({behavior: 'smooth'})} 
            className={`w-full sm:w-auto px-8 py-4 font-bold rounded-full hover:scale-105 transition-all shadow-xl ${
              theme === 'dark' 
                ? 'bg-white text-black shadow-white/10' 
                : 'bg-slate-900 text-white shadow-slate-900/20'
            }`}
          >
            View My Work
          </button>
          <button 
            onClick={() => document.getElementById('contact').scrollIntoView({behavior: 'smooth'})} 
            className={`w-full sm:w-auto px-8 py-4 border rounded-full transition-all backdrop-blur-md ${
              theme === 'dark' 
                ? 'border-white/10 text-white hover:bg-white/5 bg-white/5' 
                : 'border-black/10 text-slate-800 hover:bg-white/60 bg-white/30'
            }`}
          >
            Let's Collaborate
          </button>
        </div>
      </div>
    </section>
  );
};

/**
 * COMPONENT: Skills Stack
 */
const SkillsStack = () => {
  const { theme } = useTheme();
  const skills = [
    "Premiere Pro", "After Effects", "Photoshop", 
    "React.js", "Next.js", "Analytics", "Figma", "Notion"
  ];
  return (
    <section className={`py-12 border-y overflow-hidden ${theme === 'dark' ? 'border-white/5 bg-white/[0.01]' : 'border-black/5 bg-white/30'}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, idx) => (
            <div 
              key={idx}
              className={`px-6 py-3 border rounded-full text-sm md:text-base font-medium transition-all cursor-default hover:-translate-y-1 backdrop-blur-sm ${
                theme === 'dark' 
                  ? 'bg-white/5 border-white/5 text-slate-300 hover:border-white/20 hover:text-white shadow-lg shadow-black/20' 
                  : 'bg-white/60 border-white/60 text-slate-600 hover:border-white hover:text-black shadow-sm shadow-slate-200/50'
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * COMPONENT: Selected Works (Unified Engine)
 */
const SelectedWorks = () => {
  const { theme } = useTheme();
  const [filter, setFilter] = useState('All');
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeThumb, setActiveThumb] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  // Modal & Scroll Management
  useEffect(() => {
    const handleReset = () => {
      setActiveVideo(null);
      setActiveThumb(null);
      setActiveProject(null);
    };
    window.addEventListener('reset-navigation', handleReset);
    
    // Check if any modal is open
    const anyModalOpen = activeVideo || activeThumb !== null || activeProject;
    
    if (anyModalOpen) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e) => {
        if (e.key === 'Escape') handleReset();
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleEsc);
        window.removeEventListener('reset-navigation', handleReset);
      };
    } else {
      document.body.style.overflow = 'unset';
      return () => window.removeEventListener('reset-navigation', handleReset);
    }
  }, [activeVideo, activeThumb, activeProject]);

  const videos = [
    { 
      id: "OmKHqTlIiNI", 
      title: "Crazy_Cam - Mystery & History Documentary", 
      role: "Editor · Scriptwriter", 
      thumb: "https://img.youtube.com/vi/OmKHqTlIiNI/maxresdefault.jpg",
      channel: "Crazy_Cam"
    },
    { 
      id: "2GL-HX9M2-Y", 
      title: "ZERO ONE - Tech & Military Explainer", 
      role: "Editor · Motion Graphics", 
      thumb: "https://img.youtube.com/vi/2GL-HX9M2-Y/maxresdefault.jpg",
      channel: "ZERO ONE"
    },
    { 
      id: "DDnFAk5LGzg", 
      title: "India's Fragile 22 KM!", 
      role: "Video Editing", 
      thumb: "https://img.youtube.com/vi/DDnFAk5LGzg/maxresdefault.jpg",
      channel: "Defense & Geo-Politics"
    },
    { 
      id: "cKRtoBX8wBo", 
      title: "Zero One: Codebreak", 
      role: "Visual Motion Art", 
      thumb: "https://img.youtube.com/vi/cKRtoBX8wBo/maxresdefault.jpg",
      channel: "ZERO ONE"
    }
  ];

  const thumbnails = [
    { src: "https://img.youtube.com/vi/OmKHqTlIiNI/maxresdefault.jpg", title: "Mystery Documentary", tags: ["Compositing", "Atmosphere"] },
    { src: "https://img.youtube.com/vi/2GL-HX9M2-Y/maxresdefault.jpg", title: "Tech Explainer", tags: ["Motion Graphics", "Clean"] },
    { src: "https://img.youtube.com/vi/DDnFAk5LGzg/maxresdefault.jpg", title: "Geo-Politics Map", tags: ["Map Design", "High Contrast"] },
    { src: "https://img.youtube.com/vi/cKRtoBX8wBo/maxresdefault.jpg", title: "Abstract Art", tags: ["Abstract", "Neon"] }
  ];

  const devProjects = [
    {
      id: 1,
      title: "Multi-Cam SportSense",
      subtitle: "AI Player Tracking (Computer Vision)",
      stack: ["Python", "YOLOv8", "OpenCV"],
      description: "Built a custom pipeline using YOLOv8 and Cosine Similarity Matching to re-identify players across multiple camera feeds using feature embeddings. Solved identity switching issues in sports analytics.",
      metric: "Reliable Tracking",
      link: "https://github.com/OmmprakashMohanty01/player_reidentification"
    },
    {
      id: 2,
      title: "Enterprise Knowledge Engine",
      subtitle: "RAG-based Business Bot",
      stack: ["Python", "LLMs", "Vector DB"],
      description: "Engineered a Retrieval-Augmented Generation (RAG) system grounding responses in internal PDFs and documents. Prevents LLM hallucinations and ensures enterprise-safe accurate responses.",
      metric: "Enterprise Safe",
      link: "https://github.com/OmmprakashMohanty01/Business-RAG-Q-A-Bot"
    }
  ];

  const showVideo = filter === 'All' || filter === 'Video' || filter === 'Writing';
  const showDesign = filter === 'All' || filter === 'Design';
  const showDev = filter === 'All' || filter === 'Development';

  return (
    <section id="work" className="py-24 min-h-screen relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Selected Works</h2>
            <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Proof of work across creative and technical domains.</p>
          </div>
          <div className={`flex flex-wrap gap-2 p-1 rounded-full border backdrop-blur-md shadow-sm ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/60 border-white/20 shadow-slate-200/50'}`}>
            {['All', 'Video', 'Design', 'Development'].map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === cat 
                    ? (theme === 'dark' ? 'bg-white text-black shadow-lg scale-105' : 'bg-slate-900 text-white shadow-lg scale-105')
                    : (theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-black hover:bg-white/40')
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 1. FEATURED YOUTUBE PROJECTS (Amber Accent) */}
        {showVideo && (
          <div className="mb-24 animate-fadeIn">
            <div className="flex items-center gap-3 mb-8 opacity-90">
              <Youtube className={`w-5 h-5 ${theme === 'dark' ? 'text-amber-500' : 'text-amber-600'}`} />
              <h3 className={`text-xl font-bold tracking-wide ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Featured YouTube Projects</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map((video, idx) => (
                <VideoCard key={idx} video={video} onClick={() => setActiveVideo(video)} theme={theme} />
              ))}
            </div>
          </div>
        )}

        {/* 2. THUMBNAIL SHOWCASE (Violet Accent) */}
        {showDesign && (
          <div className="mb-24 animate-fadeIn">
            <div className="flex items-center gap-3 mb-8 opacity-90">
              <ImageIcon className={`w-5 h-5 ${theme === 'dark' ? 'text-violet-500' : 'text-violet-600'}`} />
              <h3 className={`text-xl font-bold tracking-wide ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>High-CTR Thumbnail Designs</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {thumbnails.map((thumb, idx) => (
                <ThumbnailCard key={idx} thumb={thumb} onClick={() => setActiveThumb(idx)} theme={theme} />
              ))}
            </div>
          </div>
        )}

        {/* 3. DEVELOPMENT PROJECTS (Blue Accent) */}
        {showDev && (
          <div className="animate-fadeIn">
            <div className="flex items-center gap-3 mb-8 opacity-90">
              <Code2 className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-500' : 'text-blue-600'}`} />
              <h3 className={`text-xl font-bold tracking-wide ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Technical Projects</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {devProjects.map((project) => (
                <DevCard key={project.id} project={project} onClick={() => setActiveProject(project)} theme={theme} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- MODALS (Glassmorphism Applied) --- */}

      {/* Video Modal */}
      {activeVideo && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-2xl animate-fadeIn ${theme === 'dark' ? 'bg-black/80' : 'bg-white/60'}`} onClick={() => setActiveVideo(null)}>
          <button onClick={() => setActiveVideo(null)} className={`absolute top-6 right-6 p-4 rounded-full transition-colors z-50 border ${theme === 'dark' ? 'bg-black/40 border-white/10 text-white hover:bg-white/20' : 'bg-white/60 border-white/40 text-black hover:bg-white'}`}>
            <X className="w-6 h-6" />
          </button>
          
          <div className={`w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl relative border flex flex-col ${theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-white/40 shadow-slate-300/50'}`} onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video w-full bg-black relative">
                 <iframe width="100%" height="100%" src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?rel=0&modestbranding=1`} title="YouTube" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0"></iframe>
            </div>
            <div className={`p-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4 ${theme === 'dark' ? 'bg-[#111] border-white/5' : 'bg-white/80 border-slate-100'}`}>
                <div>
                    <h3 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{activeVideo.title}</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{activeVideo.role} • {activeVideo.channel}</p>
                </div>
                <a href={`https://www.youtube.com/watch?v=${activeVideo.id}`} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap shadow-lg shadow-red-600/20">
                    <Youtube className="w-5 h-5" /> Watch on YouTube ↗
                </a>
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox */}
      {activeThumb !== null && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-2xl animate-fadeIn ${theme === 'dark' ? 'bg-black/90' : 'bg-white/80'}`} onClick={() => setActiveThumb(null)}>
          <button className={`absolute top-6 right-6 p-4 rounded-full transition-colors z-50 border ${theme === 'dark' ? 'bg-black/40 border-white/10 text-white hover:bg-white/20' : 'bg-white/60 border-white/40 text-black hover:bg-white'}`}>
            <X className="w-6 h-6" />
          </button>
          <img src={thumbnails[activeThumb].src} alt="Full Preview" className="max-h-[85vh] max-w-full rounded-lg shadow-2xl object-contain border border-white/10" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* Dev Project Modal */}
      {activeProject && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-2xl animate-fadeIn ${theme === 'dark' ? 'bg-black/80' : 'bg-white/60'}`} onClick={() => setActiveProject(null)}>
          <div className={`w-full max-w-2xl border rounded-2xl p-8 relative shadow-2xl backdrop-blur-xl ${theme === 'dark' ? 'bg-[#0f0f0f]/90 border-white/10' : 'bg-white/90 border-white/40 shadow-slate-300/50'}`} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActiveProject(null)} className={`absolute top-4 right-4 p-3 rounded-full transition-colors ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-black/5 hover:bg-black/10 text-black'}`}>
              <X className="w-5 h-5" />
            </button>
            <h3 className={`text-2xl font-bold mb-2 mt-8 md:mt-0 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{activeProject.title}</h3>
            <p className={`mb-6 font-light text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{activeProject.subtitle}</p>
            <div className="mb-6 flex gap-2">
              {activeProject.stack.map(tech => (
                <span key={tech} className={`px-3 py-1 border rounded-full text-xs font-mono ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'}`}>{tech}</span>
              ))}
            </div>
            <div className={`p-6 rounded-xl border mb-6 ${theme === 'dark' ? 'bg-black/30 border-white/5' : 'bg-slate-50/50 border-slate-200'}`}>
              <h4 className={`font-bold mb-2 text-sm uppercase tracking-wider ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Project Overview</h4>
              <p className={`leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>{activeProject.description}</p>
            </div>
            <div className={`flex items-center justify-between pt-6 border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`}>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Key Metric</span>
                <span className={`font-bold text-xl ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>{activeProject.metric}</span>
              </div>
              <a href={activeProject.link} target="_blank" rel="noreferrer" className={`px-6 py-3 font-bold rounded-lg transition-transform active:scale-95 flex items-center gap-2 ${theme === 'dark' ? 'bg-white text-black hover:bg-slate-200' : 'bg-slate-900 text-white hover:bg-slate-700'}`}>
                <Github className="w-4 h-4" /> View Code
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

/* --- SUB-COMPONENTS with Glass & Shadows --- */

const VideoCard = ({ video, onClick, theme }) => {
  const tiltRef = useTilt();
  return (
    <div ref={tiltRef} onClick={onClick} className={`group relative aspect-[16/9] rounded-xl overflow-hidden border cursor-pointer transition-all duration-300 ${theme === 'dark' ? 'bg-[#111] border-white/10 hover:border-amber-400/30 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]' : 'bg-white border-white/60 hover:border-amber-500/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_-12px_rgba(245,158,11,0.25)]'}`}>
      <img src={video.thumb} alt={video.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="w-14 h-14 bg-amber-600 rounded-full flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform"><Play className="w-6 h-6 text-white fill-current ml-1" /></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h4 className="text-white font-bold text-sm leading-tight mb-1 line-clamp-1 group-hover:text-amber-400 transition-colors">{video.title}</h4>
        <div className="flex items-center gap-2"><span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">YouTube</span><span className="text-[10px] text-slate-300 border-l border-white/20 pl-2">{video.role}</span></div>
      </div>
    </div>
  );
};

const ThumbnailCard = ({ thumb, onClick, theme }) => {
  const tiltRef = useTilt();
  return (
    <div ref={tiltRef} onClick={onClick} className={`group relative aspect-video rounded-xl overflow-hidden border cursor-pointer transition-all duration-300 ${theme === 'dark' ? 'bg-[#111] border-white/10 hover:border-violet-400/30 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]' : 'bg-white border-white/60 hover:border-violet-500/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_-12px_rgba(139,92,246,0.25)]'}`}>
      <img src={thumb.src} alt={thumb.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
        <Maximize2 className="w-6 h-6 text-violet-400" /><span className="text-violet-200 text-xs font-bold tracking-wider">VIEW FULLSCREEN</span>
      </div>
    </div>
  );
};

const DevCard = ({ project, onClick, theme }) => {
  const tiltRef = useTilt();
  return (
    <div ref={tiltRef} onClick={onClick} className={`group relative p-8 rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden ${theme === 'dark' ? 'bg-[#111] border-white/10 hover:border-blue-400/30 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]' : 'bg-white border-white/60 hover:border-blue-500/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.25)]'}`}>
      <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity"><ArrowRight className={`w-6 h-6 -rotate-45 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} /></div>
      <div className="mb-4">
        <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${theme === 'dark' ? 'text-blue-500' : 'text-blue-600'}`}>Development</span>
        <h3 className={`text-2xl font-bold mb-1 transition-colors ${theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'}`}>{project.title}</h3>
        <p className={`font-light ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{project.subtitle}</p>
      </div>
      <div className="flex gap-2 mb-6">
        {project.stack.map(t => (<span key={t} className={`text-xs font-mono px-2 py-1 rounded border transition-colors ${theme === 'dark' ? 'text-slate-500 bg-white/5 border-white/5 group-hover:border-blue-500/20' : 'text-slate-600 bg-slate-50 border-slate-100 group-hover:border-blue-500/30'}`}>{t}</span>))}
      </div>
      <div className={`pt-4 border-t flex items-center justify-between ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
         <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Status</span>
         <span className={`text-xs font-bold px-2 py-1 rounded ${theme === 'dark' ? 'bg-green-500/10 text-green-400' : 'bg-green-100 text-green-700'}`}>PUBLIC</span>
      </div>
    </div>
  );
};

/**
 * COMPONENT: Contact
 */
const Contact = () => {
  const { theme } = useTheme();
  return (
    <section id="contact" className={`py-24 relative z-10 border-t ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Let's Collaborate</h2>
        <p className={`mb-12 max-w-xl mx-auto ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Whether you need a high-conversion video, a custom AI solution, or a brand strategy, I'm ready to help you build something great.</p>
        <div className="grid md:grid-cols-3 gap-6">
          <a href="https://wa.me/919861665266?text=Hi%20Ommprakash,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer" className={`group p-8 border rounded-2xl transition-all duration-300 flex flex-col items-center gap-4 shadow-lg ${theme === 'dark' ? 'bg-[#111] border-white/10 hover:border-green-500/50 hover:bg-green-500/5 shadow-black/20' : 'bg-white border-white/60 hover:border-green-500/50 hover:bg-green-50 shadow-slate-200/50'}`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${theme === 'dark' ? 'bg-green-500/10 text-green-500' : 'bg-green-100 text-green-600'}`}><MessageCircle className="w-8 h-8" /></div>
            <h3 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Quick Chat</h3><p className="text-slate-500 text-sm">WhatsApp</p>
          </a>
          <a href="mailto:ommprakash.mohanty0001@gmail.com" target="_blank" rel="noopener noreferrer" className={`group p-8 border rounded-2xl transition-all duration-300 flex flex-col items-center gap-4 cursor-pointer shadow-lg ${theme === 'dark' ? 'bg-[#111] border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 shadow-black/20' : 'bg-white border-white/60 hover:border-blue-500/50 hover:bg-blue-50 shadow-slate-200/50'}`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${theme === 'dark' ? 'bg-blue-500/10 text-blue-500' : 'bg-blue-100 text-blue-600'}`}><Mail className="w-8 h-8" /></div>
            <h3 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Email Me</h3><p className="text-slate-500 text-sm">Detailed inquiries</p>
          </a>
          <a href="https://www.linkedin.com/in/ommprakash-mohanty-366b73278" target="_blank" rel="noopener noreferrer" className={`group p-8 border rounded-2xl transition-all duration-300 flex flex-col items-center gap-4 shadow-lg ${theme === 'dark' ? 'bg-[#111] border-white/10 hover:border-blue-400/50 hover:bg-blue-400/5 shadow-black/20' : 'bg-white border-white/60 hover:border-blue-400/50 hover:bg-blue-50 shadow-slate-200/50'}`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${theme === 'dark' ? 'bg-blue-400/10 text-blue-400' : 'bg-blue-100 text-blue-500'}`}><Linkedin className="w-8 h-8" /></div>
            <h3 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>LinkedIn</h3><p className="text-slate-500 text-sm">Professional network</p>
          </a>
        </div>
      </div>
    </section>
  );
};

/**
 * COMPONENT: About
 */
const About = () => {
  const { theme } = useTheme();
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className={`text-3xl font-bold mb-12 text-center ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
           <div className="space-y-6">
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>AI Engineer & Digital Storyteller</h3>
              <p className={`leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>I sit at the intersection of Logic and Magic. As a Software Developer, I build scalable AI systems using Computer Vision and RAG architectures. As a Content Creator, I craft high-retention narratives for YouTube that have garnered millions of views. I don’t just write code; I tell the story behind it.</p>
              <p className={`leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Based in Bhubaneswar, my career is defined by a dual passion: building intelligent systems and telling compelling stories. I love analyzing large datasets—from election statistics to geological data—to find patterns others miss.</p>
           </div>
           <div className={`border rounded-2xl p-8 space-y-6 shadow-lg backdrop-blur-md ${theme === 'dark' ? 'bg-white/5 border-white/10 shadow-black/20' : 'bg-white/60 border-white/40 shadow-slate-200/50'}`}>
              <div className="flex items-start gap-4">
                 <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}><MapPin className="w-5 h-5"/></div>
                 <div><h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Location</h4><p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Bhubaneswar, Odisha, India</p></div>
              </div>
              <div className="flex items-start gap-4">
                 <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-50 text-purple-600'}`}><Languages className="w-5 h-5"/></div>
                 <div><h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Languages</h4><p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>English · Hindi · Odia</p></div>
              </div>
              <div className="flex items-start gap-4">
                 <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600'}`}><GraduationCap className="w-5 h-5"/></div>
                 <div><h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Education</h4><p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>B.Tech in Computer Science & Engineering</p></div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

/**
 * MAIN APP
 */
const App = () => {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
};

const MainContent = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen font-sans selection:bg-indigo-500/30 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
      <Background />
      <Navbar />
      <Hero />
      <SkillsStack />
      <SelectedWorks />
      <About />
      <Contact />
      <GlobalNav />
      
      <footer className={`py-12 border-t relative z-10 ${theme === 'dark' ? 'border-white/5 bg-[#0A0A0B]' : 'border-black/5 bg-[#FAFAF9]'}`}>
        <div className="container mx-auto px-6 flex flex-col items-center gap-6">
          <div className="flex gap-6">
             <a href="mailto:ommprakash.mohanty0001@gmail.com" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full transition-all ${theme === 'dark' ? 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'}`} aria-label="Email"><Mail className="w-5 h-5"/></a>
             <a href="https://github.com/OmmprakashMohanty01" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full transition-all ${theme === 'dark' ? 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'}`} aria-label="GitHub"><Github className="w-5 h-5"/></a>
             <a href="https://www.linkedin.com/in/ommprakash-mohanty-366b73278" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full transition-all ${theme === 'dark' ? 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'}`} aria-label="LinkedIn"><Linkedin className="w-5 h-5"/></a>
             <a href="https://wa.me/919861665266?text=Hi%20Ommprakash,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full transition-all ${theme === 'dark' ? 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'}`} aria-label="WhatsApp"><MessageCircle className="w-5 h-5"/></a>
          </div>
          <div className="text-center text-slate-500 text-sm space-y-2"><p>© 2024 Ommprakash Mohanty. All rights reserved.</p></div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 0.2; transform: translate(-50%, -50%) scale(1.1); } }
        @keyframes drift-ultra-slow { 0% { transform: translate(0, 0); } 33% { transform: translate(30px, 20px) scale(1.05); } 66% { transform: translate(-20px, -30px) scale(0.95); } 100% { transform: translate(0, 0); } }
        @keyframes breathe { 0%, 100% { opacity: 0.85; } 50% { opacity: 1; } }
        @keyframes grain { 0% { transform: translate(0, 0); } 20% { transform: translate(5px, 0); } 40% { transform: translate(-5px, 5px); } 60% { transform: translate(5px, -5px); } 80% { transform: translate(-5px, -5px); } 100% { transform: translate(0, 0); } }
        @keyframes textGradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .animate-drift-ultra-slow { animation: drift-ultra-slow 60s ease-in-out infinite; }
        .animate-breathe { animation: breathe 8s ease-in-out infinite; }
        .animate-grain { animation: grain 1s steps(10) infinite; }
        .animate-gradient-shift { animation: gradientShift 15s ease infinite; background-size: 400% 400%; }
        
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${theme === 'dark' ? '#0A0A0B' : '#FAFAF9'}; }
        ::-webkit-scrollbar-thumb { background: ${theme === 'dark' ? '#333' : '#cbd5e1'}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${theme === 'dark' ? '#444' : '#94a3b8'}; }
      `}</style>
    </div>
  );
};

export default App;