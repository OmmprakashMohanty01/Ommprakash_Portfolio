import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';

export default function CommandPalette({ onClose, onSelectProject }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const projectCommands = projects.map(p => ({
    id: `proj-${p.id}`,
    type: 'CASE STUDY',
    title: p.title,
    subtitle: p.tagline || p.category,
    action: () => {
      onSelectProject?.(p.id);
      onClose();
    }
  }));

  const actionCommands = [
    {
      id: 'act-email',
      type: 'DIRECT ACTION',
      title: copied ? '✓ Copied Email to Clipboard' : 'Copy Direct Email',
      subtitle: 'ommmohanty419@gmail.com',
      action: () => {
        navigator.clipboard.writeText('ommmohanty419@gmail.com');
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
          onClose();
        }, 800);
      }
    },
    {
      id: 'act-whatsapp',
      type: 'EXTERNAL LINE',
      title: 'WhatsApp Direct Line',
      subtitle: '+91 9337060161',
      action: () => {
        window.open('https://wa.me/919337060161', '_blank');
        onClose();
      }
    },
    {
      id: 'act-github',
      type: 'CODEBASE',
      title: 'GitHub Repositories',
      subtitle: 'github.com/OmmprakashMohanty01',
      action: () => {
        window.open('https://github.com/OmmprakashMohanty01', '_blank');
        onClose();
      }
    },
    {
      id: 'act-linkedin',
      type: 'NETWORK',
      title: 'LinkedIn Network',
      subtitle: 'linkedin.com/in/ommprakash-mohanty-366b73278',
      action: () => {
        window.open('https://www.linkedin.com/in/ommprakash-mohanty-366b73278/', '_blank');
        onClose();
      }
    }
  ];

  const allCommands = [
    ...projectCommands,
    ...actionCommands
  ];

  const filteredCommands = allCommands.filter(cmd => 
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
    cmd.type.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-xl select-none">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", mass: 1.2, stiffness: 60, damping: 15 }}
        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.02]">
          <span className="text-[#FF3300] font-mono text-sm">›</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search projects, stack, case studies, contact..."
            className="w-full bg-transparent text-white font-mono text-sm placeholder:text-gray-500 focus:outline-none tracking-wide"
          />
          <span className="font-mono text-[10px] text-gray-500 border border-white/10 px-2 py-0.5 rounded uppercase">
            ESC TO EXIT
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 flex flex-col gap-1">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-gray-500 font-mono text-xs uppercase tracking-widest">
              No matching records found
            </div>
          ) : (
            filteredCommands.map((cmd, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between gap-4 transition-all duration-150 ${
                    isSelected 
                      ? 'bg-white/[0.08] border border-white/20 text-white' 
                      : 'text-gray-300 hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <div className="flex flex-col gap-0.5 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] tracking-widest text-[#FF3300] uppercase">
                        [{cmd.type}]
                      </span>
                      <span className="font-medium text-sm text-white truncate">
                        {cmd.title}
                      </span>
                    </div>
                    {cmd.subtitle && (
                      <span className="text-xs text-gray-400 font-mono tracking-wider truncate">
                        {cmd.subtitle}
                      </span>
                    )}
                  </div>

                  <span className="font-mono text-xs text-gray-500 group-hover:text-white flex-shrink-0">
                    ↵
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Bottom Status Bar */}
        <div className="px-5 py-2.5 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] font-mono text-gray-500">
          <span>Navigate: ↑ ↓</span>
          <span>Select: ↵</span>
          <span>Direct Index Access</span>
        </div>
      </motion.div>
    </div>
  );
}
