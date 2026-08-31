import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function SystemPipeline({ nodes = [], activeNodeId = null }) {
  const shouldReduceMotion = useReducedMotion();
  
  if (!nodes || nodes.length === 0) return null;

  return (
    <div className="w-full py-16 md:py-24 overflow-hidden relative">
      <div className="flex flex-col md:flex-row items-stretch md:items-start w-full max-w-5xl mx-auto px-6 lg:px-8">
        
        {nodes.map((node, index) => {
          const isActive = activeNodeId === node.id || (!activeNodeId && true); 
          const isPast = activeNodeId && nodes.findIndex(n => n.id === activeNodeId) > index;
          const stateIsActive = activeNodeId ? isActive : true;
          const stateIsPast = activeNodeId ? isPast : false;

          return (
            <React.Fragment key={node.id}>
              
              {/* NODE */}
              <div className="relative flex flex-row md:flex-col items-center md:items-center gap-6 md:gap-4 z-10 w-full md:flex-1 md:flex-shrink-0 group">
                
                {/* Circle */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: shouldReduceMotion ? 0 : 0.5, 
                    delay: shouldReduceMotion ? 0 : index * 0.15,
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center border transition-all duration-700
                    ${stateIsActive 
                      ? 'bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.15)] ring-1 ring-white/30 ring-offset-4 ring-offset-black' 
                      : stateIsPast 
                        ? 'bg-[#111] border-white/20 text-white' 
                        : 'bg-black border-white/5 text-white/30'
                    }
                  `}
                >
                  <span className="font-mono text-sm">{String(index + 1).padStart(2, '0')}</span>
                </motion.div>

                {/* Label container */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: shouldReduceMotion ? 0 : 0.5, 
                    delay: shouldReduceMotion ? 0 : index * 0.15 + 0.2,
                  }}
                  className="flex flex-col md:items-center text-left md:text-center pt-1 pb-6 md:pb-0"
                >
                  <span className={`text-sm md:text-base font-display font-medium tracking-wide transition-colors duration-500 ${stateIsActive ? 'text-white' : 'text-slate-300 group-hover:text-white/80'}`}>
                    {node.label}
                  </span>
                  {node.subLabel && (
                    <span className="text-[10px] md:text-xs font-mono text-slate-500 mt-1 uppercase tracking-widest max-w-[140px] opacity-80 md:mx-auto">
                      {node.subLabel}
                    </span>
                  )}
                </motion.div>
                
              </div>

              {/* CONNECTOR LINE */}
              {index < nodes.length - 1 && (
                <div className="flex-none flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center min-h-[40px] md:min-h-0 w-px md:w-auto md:flex-1 ml-[23px] md:ml-0 md:mt-6 -mt-6 md:-mt-0 mb-2 md:mb-0 relative z-0">
                  {/* Desktop Line */}
                  <div className="hidden md:block w-full h-px bg-white/5 relative overflow-hidden -mx-2">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-white/30 origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ 
                        duration: shouldReduceMotion ? 0 : 0.8, 
                        delay: shouldReduceMotion ? 0 : index * 0.15 + 0.3,
                        ease: "easeInOut"
                      }}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  {/* Mobile Line */}
                  <div className="block md:hidden h-16 w-px bg-white/5 relative overflow-hidden -mt-2">
                    <motion.div
                      className="absolute inset-x-0 top-0 bg-white/30 origin-top"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ 
                        duration: shouldReduceMotion ? 0 : 0.8, 
                        delay: shouldReduceMotion ? 0 : index * 0.15 + 0.3,
                        ease: "easeInOut"
                      }}
                      style={{ height: '100%' }}
                    />
                  </div>
                </div>
              )}
              
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
