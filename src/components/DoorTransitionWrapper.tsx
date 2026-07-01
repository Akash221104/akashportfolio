'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAnimation } from '@/context/AnimationContext';

interface DoorTransitionWrapperProps {
  children: React.ReactNode;
}

export default function DoorTransitionWrapper({ children }: DoorTransitionWrapperProps) {
  const {
    isIntroActive,
    isDoorOpeningStarted,
    isIntroComplete,
    skipIntro,
    startDoorOpening,
    completeIntro,
  } = useAnimation();

  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Physics simulation state
  const scrollProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const touchStartYRef = useRef(0);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      skipIntro();
    }, 300);
  };

  // Keyboard controls for skip and scroll scrubbing
  useEffect(() => {
    if (!isIntroActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
        return;
      }

      // Natural arrow keys & spacebar mapping
      const keySensitivity = 0.015;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        scrollVelocityRef.current += keySensitivity;
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        scrollVelocityRef.current -= keySensitivity;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntroActive]);

  // Handle scroll and touch events to update velocity
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!isIntroActive || isIntroComplete || !overlay) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // NATURAL DIRECTION: Rolling wheel DOWN (deltaY > 0) advances the opening sequence.
      // Damping and sensitivity optimized to require more scroll distance (smoother threshold)
      const sensitivity = 0.00012; 
      scrollVelocityRef.current += e.deltaY * sensitivity;

      // Clamp velocity to maintain a smooth, premium feel
      const maxVelocity = 0.04;
      scrollVelocityRef.current = Math.max(-maxVelocity, Math.min(maxVelocity, scrollVelocityRef.current));
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - touchStartYRef.current;
        
        // NATURAL DIRECTION: Swiping UP (deltaY < 0, dragging page up to scroll down) advances the video.
        const sensitivity = 0.00035; 
        scrollVelocityRef.current -= deltaY * sensitivity;

        // Clamp velocity
        const maxVelocity = 0.045;
        scrollVelocityRef.current = Math.max(-maxVelocity, Math.min(maxVelocity, scrollVelocityRef.current));

        touchStartYRef.current = currentY;
      }
    };

    overlay.addEventListener('wheel', handleWheel, { passive: false });
    overlay.addEventListener('touchstart', handleTouchStart, { passive: true });
    overlay.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      overlay.removeEventListener('wheel', handleWheel);
      overlay.removeEventListener('touchstart', handleTouchStart);
      overlay.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isIntroActive, isIntroComplete]);

  // Physics animation rendering loop
  useEffect(() => {
    if (!isIntroActive || isIntroComplete) return;

    let animationFrameId: number;
    let hasEndedTriggered = false;

    const renderLoop = () => {
      const video = videoRef.current;
      if (!video) return;

      // 1. Apply velocity to scroll target progress
      scrollProgressRef.current = Math.max(
        0,
        Math.min(1, scrollProgressRef.current + scrollVelocityRef.current)
      );

      // 2. Decay velocity using friction damping
      scrollVelocityRef.current *= 0.88;

      // 3. Smoothly lerp actual rendering progress to targets
      currentProgressRef.current += (scrollProgressRef.current - currentProgressRef.current) * 0.18;

      let progress = currentProgressRef.current;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      const duration = video.duration && !isNaN(video.duration) && video.duration > 0
        ? video.duration
        : 8.0;

      // 4. Seek video frame natively
      if (!video.seeking) {
        const targetTime = progress * (duration - 0.05);
        if (Math.abs(video.currentTime - targetTime) > 0.01) {
          video.currentTime = targetTime;
        }
      }

      // Trigger Hero reveal after 10% progress threshold
      if (progress > 0.1 && !isDoorOpeningStarted) {
        startDoorOpening();
      }

      // Complete transition when progress reaches 98%
      if (progress >= 0.98 && !hasEndedTriggered) {
        hasEndedTriggered = true;
        setIsFadingOut(true);
        setTimeout(() => {
          completeIntro();
        }, 500);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isIntroActive, isIntroComplete, isDoorOpeningStarted, startDoorOpening, completeIntro]);

  return (
    <>
      {/* Portfolio Content Layer */}
      <div
        className="min-h-screen flex flex-col"
        style={{
          transform: isIntroActive ? (isDoorOpeningStarted ? 'scale(1)' : 'scale(0.95)') : 'none',
          opacity: isIntroActive ? (isDoorOpeningStarted ? 1 : 0) : 1,
          filter: isIntroActive ? (isDoorOpeningStarted ? 'none' : 'blur(10px)') : 'none',
          transition: isIntroActive ? 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1), filter 1.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          pointerEvents: isIntroComplete ? 'auto' : 'none',
          willChange: isIntroActive ? 'transform, opacity, filter' : 'auto',
        }}
      >
        {children}
      </div>

      {/* Overlay Door Layer */}
      {isIntroActive && (
        <div
          ref={overlayRef}
          className="fixed inset-0 w-screen h-screen z-[100] bg-black flex items-center justify-center overflow-hidden select-none transition-opacity duration-500 will-change-opacity"
          style={{
            opacity: isFadingOut ? 0 : 1,
            pointerEvents: isFadingOut ? 'none' : 'auto',
          }}
        >
          {/* Native Transparent Video (scrubbed programmatically) */}
          <video
            ref={videoRef}
            src="/OPENING.webm"
            muted
            playsInline
            preload="auto"
            onError={(e) => {
              console.error('Door Transition: Video loading error:', e);
              skipIntro();
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          />

          {/* Heavy Shadow Vignette Overlay */}
          <div className="absolute inset-0 pointer-events-none vignette-overlay z-20" />

          {/* Scroll instruction indicator text */}
          <div 
            className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/80 z-30 select-none transition-opacity duration-500"
            style={{
              opacity: isDoorOpeningStarted ? 0 : 1,
              display: isDoorOpeningStarted ? 'none' : 'flex',
            }}
          >
            <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-gradient-primary">
              Scroll Down
            </span>
            
            <div className="flex flex-col items-center gap-1">
              {/* Bouncing chevron pointing DOWN to guide user */}
              <svg className="w-5 h-5 text-primary animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <span className="text-[9px] text-muted tracking-wider uppercase font-medium">
              To open the portal
            </span>
          </div>

          {/* Skip Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSkip();
            }}
            className="absolute bottom-10 right-10 px-4 py-2 text-xs font-semibold tracking-wider text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-300 z-30 cursor-pointer"
          >
            Skip Intro [ESC]
          </button>
        </div>
      )}
    </>
  );
}
