'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, Mail, Sparkles, BookOpen } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/Icons';
import Button from './ui/Button';
import FuturisticBackground from './FuturisticBackground';
import AIAvatarHologram from './AIAvatarHologram';
import { useAnimation } from '@/context/AnimationContext';

const BIO_ROLES = [
  'M.Tech Cyber Security @ NIT Patna',
  'Building AI Products',
  'Building Intelligent Systems',
  'Building Developer Tools',
  'Building Scalable Web Experiences'
];

interface HeroProps {
  onOpenChat?: () => void;
}

export default function Hero({ onOpenChat }: HeroProps) {
  const { isIntroActive, isDoorOpeningStarted } = useAnimation();
  const shouldAnimate = !isIntroActive;
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const { scrollY } = useScroll();
  const avatarScale = useTransform(scrollY, [0, 500], [1, 0.75]);
  const avatarOpacity = useTransform(scrollY, [0, 500], [1, 0.4]);
  const avatarY = useTransform(scrollY, [0, 500], [0, 100]);

  // Bio roles crossfade interval
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % BIO_ROLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleOpenChatTrigger = () => {
    if (onOpenChat) {
      onOpenChat();
    } else {
      // Trigger chatbot open button click if available on DOM
      const chatBtn = document.querySelector('[aria-label="Open Ask Akash AI chatbot"]') as HTMLButtonElement;
      if (chatBtn) chatBtn.click();
    }
  };

  return (
    <section
      style={
        isIntroActive
          ? {
            opacity: isDoorOpeningStarted ? 1 : 0,
            filter: isDoorOpeningStarted ? 'none' : 'blur(10px)',
            transform: `translate3d(0, 0, 0) scale(${isDoorOpeningStarted ? 1 : 0.95})`,
            transition:
              'opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1), filter 1.6s cubic-bezier(0.16, 1, 0.3, 1), transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'opacity, filter, transform',
          }
          : {}
      }
      className="relative min-h-screen flex flex-col justify-center items-center overflow-x-hidden overflow-y-visible pt-20 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 bg-background"
    >
      {/* 60fps Futuristic Backdrop Engine */}
      <FuturisticBackground />

      {/* Hero Split Layout Grid */}
      <div className="relative z-20 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">

        {/* LEFT COLUMN (Left-aligned Text & CTAs on Desktop) */}
        <motion.div
          initial={shouldAnimate ? { opacity: 0, x: -30 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 flex flex-col items-center lg:items-start justify-center text-center lg:text-left py-2 sm:py-6 lg:py-0"
        >
          {/* Main Prominent NIT Patna Tag Banner */}
          <motion.div
            initial={shouldAnimate ? { opacity: 0, scale: 0.9 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full bg-gradient-to-r from-emerald-950/90 via-teal-950/90 to-cyan-950/90 border-2 border-emerald-400/60 text-emerald-300 text-xs sm:text-sm font-mono font-bold shadow-[0_0_25px_rgba(52,211,153,0.35)] backdrop-blur-md mb-4 sm:mb-6 max-w-full text-center"
          >
            <BookOpen className="w-4 h-4 text-emerald-400 animate-bounce shrink-0" />
            <span className="tracking-wide truncate">M.Tech Cyber Security @ NIT Patna</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0 hidden xs:inline-block" />
          </motion.div>

          {/* Large Sci-Fi Assembly Headline (Strictly Single Line) */}
          <motion.h1
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black tracking-tight leading-none mb-4 sm:mb-6 text-white whitespace-nowrap max-w-full text-center lg:text-left"
            style={{
              textShadow:
                '0 1px 0 #1e1b4b, 0 2px 0 #312e81, 0 3px 0 #3730a3, 0 4px 0 #4338ca, 0 5px 0 #4f46e5, 1px 8px 16px rgba(56, 189, 248, 0.4), 0 12px 24px rgba(0, 0, 0, 0.9)',
            }}
          >
            AKASH SATPUTE
          </motion.h1>

          {/* Smooth Crossfade Bio Role Subtitle */}
          <div className="h-8 mb-3 sm:mb-4 overflow-hidden flex items-center justify-center lg:justify-start w-full">
            <motion.div
              key={BIO_ROLES[roleIndex]}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="text-base sm:text-xl md:text-2xl font-mono font-bold text-sky-400 tracking-wide flex items-center gap-2 justify-center lg:justify-start truncate max-w-full"
            >
              <Sparkles className="w-4 h-4 text-sky-300 animate-spin-slow shrink-0" />
              <span className="truncate">{BIO_ROLES[roleIndex]}</span>
            </motion.div>
          </div>

          {/* Bio Copy */}
          <motion.p
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-300 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mb-6 sm:mb-8 text-center lg:text-left mx-auto lg:mx-0 px-1"
          >
            Building AI products, developer tools, and intelligent web experiences that solve real-world problems.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mb-6 sm:mb-8"
          >
            {/* Primary CTA: View Projects */}
            <a href="#projects" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto h-11 px-4 sm:px-6 rounded-xl gap-2 text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]">
                <span className="hidden xs:inline">View Projects</span>
                <span className="xs:hidden">Projects</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Button>
            </a>

            {/* Featured AI CTA: Talk to My AI */}
            <button
              onClick={handleOpenChatTrigger}
              className="w-full sm:w-auto h-11 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-display font-semibold text-xs sm:text-sm shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 cursor-pointer border border-sky-300/30"
            >
              <Sparkles className="w-4 h-4 text-sky-200 animate-pulse shrink-0" />
              <span className="hidden xs:inline">✨ Talk to My AI</span>
              <span className="xs:hidden">Talk to AI</span>
            </button>

            {/* Secondary CTA: Download Resume */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                variant="ghost"
                className="w-full sm:w-auto h-11 px-4 sm:px-6 rounded-xl gap-2 text-xs sm:text-sm font-semibold border border-dashed border-sky-500/40 hover:border-sky-400 text-white bg-zinc-900/60 backdrop-blur-md"
              >
                <span>Resume</span>
                <Download className="w-4 h-4 shrink-0" />
              </Button>
            </a>

            {/* Ghost CTA: Contact */}
            <a href="#contact" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto h-11 px-4 sm:px-6 rounded-xl gap-2 text-xs sm:text-sm font-semibold">
                <span>Contact</span>
                <Mail className="w-4 h-4 shrink-0" />
              </Button>
            </a>
          </motion.div>

          {/* Social Links Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4"
          >
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/akash-satpute-548b5a256/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:text-sky-400 hover:border-sky-500/40 hover:bg-sky-500/10 transition-all duration-300 shadow-md group cursor-pointer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
              <span className="text-xs font-mono font-semibold uppercase">LinkedIn</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Akash221104"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all duration-300 shadow-md group cursor-pointer"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
              <span className="text-xs font-mono font-semibold uppercase">GitHub</span>
            </a>

            {/* Hashnode Blog */}
            <a
              href="https://akashblogss.hashnode.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:text-purple-400 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300 shadow-md group cursor-pointer"
              aria-label="Hashnode Blog"
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-xs font-mono font-semibold uppercase">Blog</span>
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN (Desktop Parallax Only, Anchored to Bottom) */}
        <motion.div
          style={isDesktop ? {
            scale: avatarScale,
            opacity: avatarOpacity,
            y: avatarY,
          } : {}}
          initial={shouldAnimate ? { opacity: 0, x: 30 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-end self-end relative w-full mt-4 lg:mt-0 pt-2 lg:pt-0 overflow-visible h-full"
        >
          <AIAvatarHologram onOpenChat={handleOpenChatTrigger} />
        </motion.div>
      </div>
    </section>
  );
}
