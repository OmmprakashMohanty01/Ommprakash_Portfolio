import { motion } from 'framer-motion';

export default function PendingEvidence({ label, description, className = '' }) {
  return (
    <div className={`relative w-full aspect-video md:aspect-[21/9] border border-dashed border-white/10 bg-black/40 rounded-xl overflow-hidden flex flex-col items-center justify-center p-8 text-center group ${className}`}>
      {/* Abstract Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        </div>
        <h4 className="text-sm font-mono tracking-widest uppercase text-amber-500/80 mb-2">
          {label} — Content Pending
        </h4>
        {description && (
          <p className="text-sm text-slate-500 font-light max-w-md">
            {description}
          </p>
        )}
      </motion.div>
    </div>
  );
}
