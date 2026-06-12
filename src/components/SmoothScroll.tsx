'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useAnimation } from '@/context/AnimationContext';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { isIntroActive } = useAnimation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Animation frame hook
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Set scroll state based on initial intro state
    if (isIntroActive) {
      lenis.stop();
    } else {
      lenis.start();
    }

    // Connect Lenis to window for global access if needed
    (window as any).lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as any).lenis = null;
    };
  }, []);

  // Control scrolling based on intro state changes
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (isIntroActive) {
      lenis.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis.start();
      document.body.style.overflow = '';
      // Force instant scroll to top on first unlock to avoid weird offset issues
      window.scrollTo(0, 0);
    }
  }, [isIntroActive]);

  return <>{children}</>;
}
