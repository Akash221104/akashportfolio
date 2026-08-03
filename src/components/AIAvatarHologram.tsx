'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cpu, Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface AIAvatarHologramProps {
  onOpenChat?: () => void;
}

const TECH_STACK = ['Next.js', 'Python', 'AI / LLMs', 'TypeScript', 'React', 'Node.js', 'PyTorch'];

export default function AIAvatarHologram({ onOpenChat }: AIAvatarHologramProps) {
  const [hasSeenBoot, setHasSeenBoot] = useState(true);
  const [booting, setBooting] = useState(false);

  // Check localStorage after initial SSR client hydration to prevent hydration mismatches
  useEffect(() => {
    try {
      const seen = localStorage.getItem('has_seen_ai_boot') === 'true';
      if (!seen) {
        setHasSeenBoot(false);
        setBooting(true);
      }
    } catch {
      // ignore
    }
  }, []);
  const [bootStep, setBootStep] = useState(0);
  const [techIndex, setTechIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showToast, setShowToast] = useState(false);

  // 3D Mouse Parallax Tilt state following global cursor
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Global mouse & touch movement tracking so the avatar turns towards cursor/finger anywhere on screen
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const centerX = windowWidth / 2;
      const centerY = windowHeight / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Smooth 3D tilt calculation
      const rY = (mouseX / centerX) * 22;
      const rX = -(mouseY / centerY) * 18;

      setRotateX(rX);
      setRotateY(rY);
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const centerX = windowWidth / 2;
        const centerY = windowHeight / 2;

        const touchX = touch.clientX - centerX;
        const touchY = touch.clientY - centerY;

        const rY = (touchX / centerX) * 18;
        const rX = -(touchY / centerY) * 14;

        setRotateX(rX);
        setRotateY(rY);
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('touchmove', handleGlobalTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
    };
  }, []);

  // IntersectionObserver: Whenever visitor enters/returns to Hero screen, restart video from 0s
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Run first-visit boot sequence if not seen
  useEffect(() => {
    if (hasSeenBoot) return;
    const step1 = setTimeout(() => setBootStep(1), 600);
    const step2 = setTimeout(() => setBootStep(2), 1200);
    const step3 = setTimeout(() => setBootStep(3), 1800);
    const finish = setTimeout(() => {
      setBooting(false);
      setHasSeenBoot(true);
      try {
        localStorage.setItem('has_seen_ai_boot', 'true');
      } catch {
        // ignore
      }
    }, 2200);
    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(finish);
    };
  }, [hasSeenBoot]);

  // Tech stack single-pill rotation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setTechIndex((prev) => (prev + 1) % TECH_STACK.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Video 1-cycle completion handler
  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  // Toggle Video Audio (Unmute/Mute)
  const handleToggleAudio = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);

      if (!nextMuted) {
        if (videoRef.current.paused || !isPlaying) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
        }
      }
    }
  };

  // Replay Video from start
  const handleReplayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
    }
  };

  const handleAvatarClick = () => {
    setShowToast(true);
    if (videoRef.current) {
      if (videoRef.current.muted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
    }
    setTimeout(() => setShowToast(false), 3500);
  };

  const handleSkipBoot = () => {
    setBooting(false);
    setHasSeenBoot(true);
    try {
      localStorage.setItem('has_seen_ai_boot', 'true');
    } catch {
      // ignore
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[360px] xs:max-w-[420px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[580px] flex flex-col items-center justify-center select-none py-3 sm:py-6 mx-auto">

      {/* Ambient Soft Cyan Backdrop Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] xs:w-[340px] sm:w-[420px] h-[280px] xs:h-[340px] sm:h-[420px] rounded-full bg-gradient-to-tr from-sky-500/25 via-blue-600/15 to-transparent blur-[80px] sm:blur-[100px] pointer-events-none animate-pulse-slow" />

      {/* Floating Single Tech Pill Crossfade (Top Right Badge) */}
      <div className="absolute -top-2 right-0 sm:top-0 sm:right-2 z-30">
        <AnimatePresence mode="wait">
          <motion.div
            key={TECH_STACK[techIndex]}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-sky-950/90 text-[10px] sm:text-[11px] font-mono font-semibold text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.25)] backdrop-blur-md"
          >
            <Cpu className="w-3 h-3 text-sky-400 animate-spin-slow" />
            <span>Active: {TECH_STACK[techIndex]}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main 3D Floating Avatar Container with Global Mouse & Touch Parallax Reaction */}
      <motion.div
        onClick={handleAvatarClick}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.12s cubic-bezier(0.1, 1, 0.2, 1)',
          transformStyle: 'preserve-3d',
        }}
        className="relative z-20 w-full aspect-[4/5] max-h-[380px] xs:max-h-[440px] sm:max-h-[500px] md:max-h-[540px] lg:max-h-[580px] flex items-center justify-center cursor-pointer group touch-manipulation"
      >

        {/* Audio Toggle & Replay Action Controls Overlay (Top Center) */}
        {!booting && (
          <div className="absolute top-2 sm:top-4 z-40 flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); handleToggleAudio(); }}
              className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full font-mono text-[11px] sm:text-xs font-bold shadow-[0_0_20px_rgba(56,189,248,0.5)] backdrop-blur-md flex items-center gap-1 sm:gap-1.5 cursor-pointer transition-all ${isMuted
                  ? 'bg-sky-500/90 hover:bg-sky-400 text-white animate-bounce'
                  : 'bg-emerald-500/90 hover:bg-emerald-400 text-white'
                }`}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="hidden xs:inline">{isMuted ? 'Voice OFF 🔊' : 'Voice ON 🔊'}</span>
              <span className="xs:hidden">{isMuted ? 'Mute 🔊' : 'Voice 🔊'}</span>
            </button>

            {!isPlaying && (
              <button
                onClick={(e) => { e.stopPropagation(); handleReplayVideo(); }}
                className="p-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-sky-400 shadow-lg cursor-pointer"
                title="Replay Video"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* First Visit Boot Sequence Overlay */}
        <AnimatePresence>
          {booting && !hasSeenBoot && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-40 rounded-2xl sm:rounded-3xl bg-zinc-950/92 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-6 text-center shadow-2xl"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-sky-500/30 border-t-sky-400 animate-spin mb-3 sm:mb-4" />
              <h4 className="font-mono text-[11px] sm:text-xs font-bold text-sky-400 tracking-wider uppercase mb-2">
                Initializing AKASH AI
              </h4>

              <div className="font-mono text-[10px] sm:text-[11px] text-zinc-400 space-y-1 h-12">
                {bootStep >= 0 && <p className="animate-fade-in">✓ Loading Knowledge Base...</p>}
                {bootStep >= 1 && <p className="animate-fade-in">✓ Loading Projects &amp; Experience...</p>}
                {bootStep >= 2 && <p className="animate-fade-in text-sky-300">✓ AI Ready.</p>}
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleSkipBoot(); }}
                className="mt-4 sm:mt-6 text-[10px] font-mono text-zinc-500 hover:text-sky-300 underline cursor-pointer py-1 px-2"
              >
                [Skip Intro]
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transparent Video Element with Smooth Natural Holographic Glow */}
        <div className="relative w-full h-full flex items-center justify-center overflow-visible">
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
            playsInline
            preload="auto"
            poster="/hero-poster.webp"
            onEnded={handleVideoEnded}
            className="w-full h-full object-contain opacity-95 filter brightness-[0.88] drop-shadow-[0_0_40px_rgba(14,165,233,0.55)] transition-transform duration-300 group-hover:scale-[1.04] outline-none border-none"
          >
            <source src="/Akash Satpute_s Video (1)-Picsart-BackgroundRemover.webm" type="video/webm" />
            <source src="/Akash Satpute_s Video (1).mp4" type="video/mp4" />
            <source src="/OPENING.webm" type="video/webm" />
          </video>
        </div>
      </motion.div>

      {/* Floating Caption Badge */}
      <div className="relative z-30 mt-2 sm:mt-3 flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-zinc-900/90 shadow-[0_0_15px_rgba(56,189,248,0.25)] backdrop-blur-md max-w-[95%] text-center">
        <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse shrink-0" />
        <span className="font-display text-[11px] sm:text-xs font-semibold text-white">AKASH AI</span>
        <span className="text-zinc-500 hidden xs:inline">•</span>
        <span className="font-mono text-[9px] sm:text-[10px] text-sky-300">Digital Portfolio Guide</span>
        {onOpenChat && (
          <button
            onClick={onOpenChat}
            className="ml-1 px-2 py-0.5 rounded bg-sky-500/25 hover:bg-sky-500/40 text-sky-300 text-[10px] font-mono font-semibold transition-all cursor-pointer"
          >
            Ask AI →
          </button>
        )}
      </div>

      {/* Interactive Easter Egg Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-14 sm:bottom-16 z-50 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium text-[11px] sm:text-xs shadow-2xl flex items-center gap-2 max-w-[90vw] text-center"
          >
            <span>Hello 👋 I&apos;m Akash&apos;s AI. Feel free to explore!</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
