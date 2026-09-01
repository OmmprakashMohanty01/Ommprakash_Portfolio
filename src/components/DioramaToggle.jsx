import React from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

export default function DioramaToggle() {
  const [location, setLocation] = useLocation();

  const isDiorama = location === '/diorama';

  const toggleMode = () => {
    if (isDiorama) {
      setLocation('/');
    } else {
      setLocation('/diorama');
    }
  };

  return (
    <motion.button
      onClick={toggleMode}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15, delay: 2 }}
      className="fixed bottom-6 left-6 z-[100] px-4 py-2 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
    >
      {isDiorama ? 'Exit Diorama Mode' : 'Enter Diorama Mode'}
    </motion.button>
  );
}
