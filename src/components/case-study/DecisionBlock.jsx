import { motion } from 'framer-motion';

export default function DecisionBlock({ decision, why, tradeOff, index }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
      className="p-8 border border-white/10 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors"
    >
      <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-4">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-xs font-mono text-slate-300">
          {String(index + 1).padStart(2, '0')}
        </span>
        {decision}
      </h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Rationale</h4>
          <p className={`text-slate-300 font-light leading-relaxed ${why === 'CONTENT_PENDING' ? 'text-amber-500/80 uppercase text-sm font-mono' : ''}`}>
            {why}
          </p>
        </div>
        
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Trade-offs</h4>
          <p className={`text-slate-300 font-light leading-relaxed ${tradeOff === 'CONTENT_PENDING' ? 'text-amber-500/80 uppercase text-sm font-mono' : ''}`}>
            {tradeOff}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
