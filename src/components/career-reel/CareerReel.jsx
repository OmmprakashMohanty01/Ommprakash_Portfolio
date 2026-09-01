import React, { useState, useEffect, Suspense } from 'react';
import { useFrame } from '../../context/FrameContext';

// Lazy load the heavy 3D scene
const CareerScene = React.lazy(() => import('./CareerScene'));

export default function CareerReel() {
  const [shouldRender, setShouldRender] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { mode, transitionProgress } = useFrame();

  useEffect(() => {
    // Check capabilities
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Only render WebGL if we aren't in a reduced-motion environment
    if (!mediaQuery.matches) {
      setShouldRender(true);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!shouldRender) {
    return null; // Fallback to standard DOM experience
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Suspense fallback={null}>
        <CareerScene 
          isMobile={isMobile} 
          mode={mode} 
          transitionProgress={transitionProgress} 
        />
      </Suspense>
    </div>
  );
}
