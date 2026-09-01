import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

function MagneticPill({ children, href, onClick, className = "", primary = false }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  // Tactile spring physics
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Magnetic pull strength (max 18px offset)
    const maxMovement = 18;
    x.set(((clientX - centerX) / (width / 2)) * maxMovement);
    y.set(((clientY - centerY) / (height / 2)) * maxMovement);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? motion.a : motion.button;
  const props = href 
    ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: href.startsWith('http') ? 'noopener noreferrer' : undefined }
    : { onClick };

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={shouldReduceMotion ? {} : { x: springX, y: springY }}
      className={`
        relative inline-flex items-center justify-center gap-3
        px-8 py-4 rounded-full
        font-mono text-xs md:text-sm uppercase tracking-[0.2em]
        transition-all duration-500 select-none
        ${primary 
          ? 'bg-white text-black font-semibold hover:bg-gray-200 shadow-[0_0_30px_rgba(255,255,255,0.25)]' 
          : 'bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 text-white hover:border-white/40 hover:bg-white/[0.06]'
        }
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2.5 pointer-events-none">
        {children}
      </span>
    </Component>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ommmohanty419@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer 
      id="contact" 
      className="w-full relative z-10 bg-transparent pt-32 md:pt-44 pb-16 px-6 max-w-7xl mx-auto flex flex-col justify-between"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 pb-16 border-b border-white/10">
        
        {/* Left Column: Headline & Interactive Actions */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <h4 className="text-gray-500 font-mono tracking-[0.25em] text-xs uppercase">
              05 // Initiating Connection
            </h4>
          </div>

          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-3 w-fit px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-xs text-gray-300 tracking-wider">
              Available for select engineering & creative roles
            </span>
          </div>

          {/* Massive Impact Headline */}
          <h2 className="text-[clamp(2.6rem,6vw,5.5rem)] font-display font-medium tracking-tighter text-white leading-[0.95] mb-10">
            Let’s build something <span className="italic font-serif text-gray-300">exceptional</span> together.
          </h2>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <MagneticPill 
              href="mailto:ommmohanty419@gmail.com" 
              primary
            >
              <span>ommmohanty419@gmail.com</span>
              <span className="text-sm">↗</span>
            </MagneticPill>

            <MagneticPill onClick={handleCopyEmail}>
              <span>{copied ? '✓ Copied to Clipboard' : 'Copy Email'}</span>
            </MagneticPill>

            <MagneticPill href="https://wa.me/919337060161">
              <span>WhatsApp / Chat</span>
              <span className="text-sm">↗</span>
            </MagneticPill>
          </div>
        </div>

        {/* Right Column: Clean Editorial Balcony Night Portrait Card */}
        <motion.div 
          className="lg:col-span-5 relative group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl p-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-black">
              <img
                src="/balcony-night.jpg"
                alt="Ommprakash Mohanty on Balcony"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Telemetry Tag */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-gray-300 uppercase bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <span>NIGHT TELEMETRY</span>
                <span className="text-[#00f3ff]">20.2961° N, 85.8245° E</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Bottom Row: Socials & Coordinates */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        {/* Social Pill Group */}
        <div className="flex flex-wrap items-center gap-3">
          <MagneticPill href="https://github.com/OmmprakashMohanty01" className="!px-5 !py-2.5 !text-xs">
            GitHub
          </MagneticPill>
          <MagneticPill href="https://www.linkedin.com/in/ommprakash-mohanty-366b73278/" className="!px-5 !py-2.5 !text-xs">
            LinkedIn
          </MagneticPill>
          <MagneticPill href="mailto:ommmohanty419@gmail.com" className="!px-5 !py-2.5 !text-xs">
            Email
          </MagneticPill>
        </div>

        {/* Coordinates & Copyright */}
        <div className="flex flex-col md:items-end gap-1 font-mono text-xs text-gray-500 tracking-widest uppercase">
          <span>Bhubaneswar, Odisha // India</span>
          <span>© {new Date().getFullYear()} Ommprakash Mohanty. Crafted with Logic & Magic.</span>
        </div>

      </div>
    </footer>
  );
}
