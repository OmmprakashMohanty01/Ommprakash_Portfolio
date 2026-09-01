import { motion } from 'framer-motion';

export default function CaseStudyHero({ project }) {
  const { title, content, role, category } = project;
  const technologies = content?.technologies || [];

  return (
    <div className="relative w-full min-h-[70vh] flex flex-col justify-end pt-32 pb-16 overflow-hidden">
      {/* Abstract Background pattern and image */}
      <div className="absolute inset-0 z-0 bg-[#050505]">
        {content?.media?.hero && content.media.hero !== 'CONTENT_PENDING' && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
            style={{ backgroundImage: `url(${content.media.hero})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#00f3ff] opacity-[0.03] blur-[100px]" />
      </div>

      <div className="relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
          className="mb-6 flex flex-wrap gap-4 items-center font-mono text-xs md:text-sm tracking-widest uppercase"
        >
          <span className="text-[#00f3ff] font-bold">{category}</span>
          <span className="text-white/20">—</span>
          <span className="text-slate-400">{role}</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tight leading-[1.05] max-w-5xl mb-12"
        >
          {title}
        </motion.h1>

        {/* Technical Metadata Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 0.2 }}
          className="flex flex-wrap gap-x-12 gap-y-6 pt-10 border-t border-white/10"
        >
          {technologies.slice(0, 4).map((tech, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Tech Stack</span>
              <span className="text-sm font-medium text-slate-300">{tech}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
