import { motion } from 'framer-motion';

export default function CaseStudySection({ title, children, className = '' }) {
  return (
    <section className={`py-20 border-b border-white/5 last:border-0 ${className}`}>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-10 tracking-tight">
          {title}
        </h2>
      </motion.div>
      <div className="space-y-8">
        {children}
      </div>
    </section>
  );
}
