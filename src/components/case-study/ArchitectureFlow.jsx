import { motion } from 'framer-motion';

export default function ArchitectureFlow({ pipeline }) {
  if (!pipeline || pipeline.length === 0) return null;

  return (
    <div className="relative w-full py-12">
      <div className="absolute left-6 top-12 bottom-12 w-px bg-white/10 hidden md:block"></div>
      
      <div className="space-y-12">
        {pipeline.map((stage, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.15 }}
            className="relative flex flex-col md:flex-row md:items-start gap-6 md:gap-12"
          >
            {/* Desktop Node */}
            <div className="hidden md:flex flex-col items-center z-10">
              <div className="w-12 h-12 rounded-full bg-black border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <span className="text-xs font-mono text-slate-300">{String(index + 1).padStart(2, '0')}</span>
              </div>
            </div>

            <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-xl p-6 md:p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00f3ff]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <span className="md:hidden text-xs font-mono text-[#00f3ff] bg-[#00f3ff]/10 px-2 py-1 rounded">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-mono font-bold text-white tracking-widest uppercase">
                  {stage.stage}
                </h3>
              </div>
              
              <p className={`text-slate-300 font-light leading-relaxed ${stage.details === 'CONTENT_PENDING' ? 'text-amber-500/80 font-mono text-sm uppercase' : ''}`}>
                {stage.details}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
