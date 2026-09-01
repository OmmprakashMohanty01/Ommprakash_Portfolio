import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { useMotionValue, animate, useReducedMotion } from 'framer-motion';

const FrameContext = createContext(null);

export function useFrame() {
  const ctx = useContext(FrameContext);
  if (!ctx) throw new Error('useFrame must be used within FrameProvider');
  return ctx;
}

export function FrameProvider({ children }) {
  const [mode, setMode] = useState('flat'); // 'flat' | 'transitioning' | 'revealed'
  const transitionProgress = useMotionValue(0); // 0 = flat, 1 = revealed
  const shouldReduceMotion = useReducedMotion();
  const hasAutoTriggered = useRef(false);

  const triggerExit = useCallback(() => {
    if (mode === 'revealed' || mode === 'transitioning') return;

    setMode('transitioning');

    // Update URL for deep-linking without a hard navigation
    window.history.pushState({}, '', '/diorama');

    const duration = shouldReduceMotion ? 0.1 : 1.2;

    animate(transitionProgress, 1, {
      duration,
      ease: [0.76, 0, 0.24, 1], // matches the Preloader exit easing
      onComplete: () => setMode('revealed'),
    });
  }, [mode, transitionProgress, shouldReduceMotion]);

  const triggerReturn = useCallback(() => {
    if (mode === 'flat' || mode === 'transitioning') return;

    setMode('transitioning');

    // Restore the flat URL
    window.history.pushState({}, '', '/');

    const duration = shouldReduceMotion ? 0.1 : 1.0;

    animate(transitionProgress, 0, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => setMode('flat'),
    });
  }, [mode, transitionProgress, shouldReduceMotion]);

  // Auto-trigger: fires once per session when #contact enters viewport
  const autoTriggerExit = useCallback(() => {
    if (hasAutoTriggered.current) return;

    // Check sessionStorage so it only fires once per session
    if (sessionStorage.getItem('frameExited')) return;

    hasAutoTriggered.current = true;
    sessionStorage.setItem('frameExited', 'true');
    triggerExit();
  }, [triggerExit]);

  const value = {
    mode,
    transitionProgress,
    triggerExit,
    triggerReturn,
    autoTriggerExit,
  };

  return (
    <FrameContext.Provider value={value}>
      {children}
    </FrameContext.Provider>
  );
}
