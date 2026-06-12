'use client';

import React, { useState, useEffect, useRef } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  fallbackHeight?: string; // e.g. "400px" or "h-[500px]"
}

export default function LazySection({ children, fallbackHeight = 'min-h-[400px]' }: LazySectionProps) {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px 0px', // Pre-load 200px before scrolling into view
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {isInView ? (
        children
      ) : (
        <div className={`w-full ${fallbackHeight} bg-transparent pointer-events-none`} />
      )}
    </div>
  );
}
