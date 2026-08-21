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

  // Global mouse movement tracking so the avatar turns towards cursor on desktop screens
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
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
    <div ref={containerRef} className="relative w-full max-w-[340px] xs:max-w-[400px] sm:max-w-[540px] md:max-w-[640px] lg:max-w-[740px] flex flex-col items-center justify-end select-none py-0 mx-auto">

      {/* 3D Soft Ambient Glow Aura */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] xs:w-[360px] sm:w-[520px] h-[300px] xs:h-[360px] sm:h-[520px] rounded-full bg-gradient-to-tr from-sky-500/25 via-indigo-600/15 to-emerald-500/10 blur-[100px] sm:blur-[130px] pointer-events-none animate-pulse-slow" />

      {/* Floating Single Tech Pill Crossfade (Top Right Badge) */}
      <div className="absolute top-2 right-0 sm:top-2 sm:right-2 z-30">
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

      {/* Main 3D Floating Avatar Container - Anchored to Bottom */}
      <motion.div
        onClick={handleAvatarClick}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.12s cubic-bezier(0.1, 1, 0.2, 1)',
          transformStyle: 'preserve-3d',
        }}
        className="relative z-20 w-full aspect-[4/5] max-h-[380px] xs:max-h-[440px] sm:max-h-[580px] md:max-h-[660px] lg:max-h-[740px] flex items-end justify-center cursor-pointer group touch-manipulation overflow-visible"
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

        {/* Transparent Video Element - Bottom Anchored */}
        <div className="relative w-full h-full flex items-end justify-center overflow-visible">
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
            playsInline
            preload="auto"
            poster="/hero-poster.webp"
            onEnded={handleVideoEnded}
            style={{
              maskImage: 'linear-gradient(to bottom, black 0%, black 86%, transparent 98%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 86%, transparent 98%)',
            }}
            className="w-full h-full object-contain object-bottom filter brightness-[0.96] drop-shadow-[0_10px_40px_rgba(14,165,233,0.55)] transition-transform duration-300 group-hover:scale-[1.03] outline-none border-none"
          >
            <source src="/Akash Satpute_s Video (1)-Picsart-BackgroundRemover.webm" type="video/webm" />
            <source src="/Akash Satpute_s Video (1).mp4" type="video/mp4" />
            <source src="/OPENING.webm" type="video/webm" />
          </video>
        </div>
      </motion.div>

      {/* Sleek Futuristic Holographic Light Stage Base at Bottom */}
      <div className="w-full flex flex-col items-center relative z-30 -mt-2">
        {/* Horizontal Glowing Light Emitter Beam */}
        <div className="w-[85%] sm:w-[90%] h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_20px_#38bdf8] opacity-80" />
        
        {/* Sci-Fi Status Dock Pill */}
        <div className="mt-2.5 inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-zinc-950/90 border border-sky-400/40 shadow-[0_0_20px_rgba(56,189,248,0.3)] backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse shrink-0" />
          <span className="font-display text-[11px] sm:text-xs font-semibold text-white">AKASH AI</span>
          <span className="text-zinc-600">•</span>
          <span className="font-mono text-[9px] sm:text-[10px] text-sky-300">Digital Portfolio Guide</span>
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              className="ml-1 px-2 py-0.5 rounded bg-sky-500/20 hover:bg-sky-500/40 text-sky-300 text-[10px] font-mono font-semibold transition-all cursor-pointer border border-sky-400/30"
            >
              Ask AI →
            </button>
          )}
        </div>
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
