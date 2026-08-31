import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

/**
 * Experience Timeline Component
 * 
 * Vertical timeline tracking scroll progress to fill a neon line.
 * Hardware-accelerated animations only (scaleY, x, opacity) to ensure
 * 60fps lag-free performance. Dark glassmorphism aesthetics.
 */
const ExperienceTimeline = () => {
  // Reference for the entire timeline section to track scroll
  const containerRef = useRef(null);

  // Extract scrollYProgress based on the container's position in the viewport
  // "start center" means it starts tracking when the top of the container hits the center of the viewport
  // "end center" means it finishes when the bottom of the container hits the center
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const experiences = [
    {
      title: "AI Data Operations Specialist",
      company: "Outlier AI, TELUS Digital, TryRating",
      date: "Current",
      description:
        "Evaluated and trained frontier AI models. Managed complex data workflows for Project Aether and matched with Project Mech Circuit.",
    },
    {
      title: "Competitive Coding & Hackathons",
      company: "Innova Hack 2026 & Bharatiya Antariksh 2025",
      date: "2025 - 2026",
      description:
        "Actively participating in premier hackathons (Unstop & Hack2skill) to build intelligent solutions and scale robust backends under pressure.",
    },
    {
      title: "Technical Assessments & SWE Applications",
      company: "CodeSignal & Handshake AI",
      date: "2025",
      description:
        "Completed advanced technical evaluations and algorithm optimizations (Project Lotus India SWE), demonstrating strong fundamentals in data structures.",
    },
    {
      title: "Education Foundation",
      company: "GIET University",
      date: "2021 - 2025",
      description:
        "B.Tech in Computer Science. Built a strong theoretical and practical foundation in algorithms, databases, and modern web architecture.",
    },
  ];

  return (
    <section className="py-24 w-full bg-[#0a0a0a] relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-20 text-center">
          <h2 
            className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight" 
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Evolution & Execution
          </h2>
          <p className="text-slate-400 text-lg font-light">
            My professional journey across AI operations, software engineering, and competitive coding.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative w-full pb-10">
          
          {/* Background Track Line */}
          <div className="absolute left-[20px] md:left-[30px] top-0 bottom-0 w-[2px] bg-white/10 rounded-full" />

          {/* Glowing Animated Overlay Line (GPU Accelerated via scaleY) */}
          <motion.div
            style={{ 
              scaleY: scrollYProgress, 
              transformOrigin: "top" 
            }}
            className="absolute left-[20px] md:left-[30px] top-0 bottom-0 w-[2px] bg-white rounded-full z-10"
          />

          <div className="flex flex-col gap-12 pt-6">
            {experiences.map((item, index) => (
              <div key={index} className="relative flex items-start pl-16 md:pl-24">
                
                {/* Timeline Node (Dot) */}
                <div className="absolute left-[13px] md:left-[23px] top-6 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-white/50 z-20" />

                {/* Timeline Card - Fades in from the right */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1], // Custom smooth easing
                  }}
                  className="w-full relative group overflow-hidden rounded-2xl bg-[#050505] border border-white/5 flex-col p-6 md:p-8 transition-colors duration-500 hover:border-white/20"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 font-mono text-sm md:text-base mt-1">
                        {item.company}
                      </p>
                    </div>
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold font-mono bg-white/5 border border-white/10 text-slate-300 whitespace-nowrap w-fit">
                      {item.date}
                    </span>
                  </div>
                  
                  <p className="text-slate-400 font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Subtle inner glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/0 to-white/0 group-hover:to-white/5 transition-colors duration-500 pointer-events-none" />
                </motion.div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
