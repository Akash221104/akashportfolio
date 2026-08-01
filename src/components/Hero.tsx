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
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-28 pb-16 px-6 md:px-12 bg-background"
    >
      {/* 60fps Futuristic Backdrop Engine */}
      <FuturisticBackground />

      {/* Hero Split Layout Grid */}
      <div className="relative z-20 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        
        {/* LEFT COLUMN (Middle-aligned Text & CTAs) */}
        <motion.div
          initial={shouldAnimate ? { opacity: 0, x: -30 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 flex flex-col items-center justify-center text-center"
        >
          {/* Status Badge */}
          <motion.div
            initial={shouldAnimate ? { opacity: 0, scale: 0.9 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/60 border border-sky-400/30 text-xs font-mono font-medium text-sky-300 mb-6 shadow-[0_0_15px_rgba(56,189,248,0.2)] backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span>Open to Full-time Opportunities</span>
          </motion.div>

          {/* Large Sci-Fi Assembly Headline */}
          <motion.h1
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight leading-none mb-6 text-white text-center"
            style={{
              textShadow:
                '0 1px 0 #1e1b4b, 0 2px 0 #312e81, 0 3px 0 #3730a3, 0 4px 0 #4338ca, 0 5px 0 #4f46e5, 1px 8px 16px rgba(56, 189, 248, 0.4), 0 12px 24px rgba(0, 0, 0, 0.9)',
            }}
          >
            AKASH SATPUTE
          </motion.h1>

          {/* Smooth Crossfade Bio Role Subtitle */}
          <div className="h-8 mb-4 overflow-hidden flex items-center justify-center">
            <motion.div
              key={BIO_ROLES[roleIndex]}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl font-mono font-bold text-sky-400 tracking-wide flex items-center gap-2 justify-center"
            >
              <Sparkles className="w-4 h-4 text-sky-300 animate-spin-slow" />
              <span>{BIO_ROLES[roleIndex]}</span>
            </motion.div>
          </div>

          {/* Bio Copy */}
          <motion.p
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-300 text-base sm:text-lg max-w-xl leading-relaxed mb-8 text-center mx-auto"
          >
            Building AI products, developer tools, and intelligent web experiences that solve real-world problems.
          </motion.p>

          {/* Action CTAs (Centered Layout) */}
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3.5 w-full mb-10"
          >
            {/* Primary CTA: View Projects */}
            <a href="#projects" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto gap-2 shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]">
                View Projects
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>

            {/* Featured AI CTA: Talk to My AI */}
            <button
              onClick={handleOpenChatTrigger}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-display font-semibold text-sm shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 cursor-pointer border border-sky-300/30"
            >
              <Sparkles className="w-4 h-4 text-sky-200 animate-pulse" />
              <span>✨ Talk to My AI</span>
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
                className="w-full sm:w-auto gap-2 border border-dashed border-sky-500/40 hover:border-sky-400 text-white bg-zinc-900/60 backdrop-blur-md"
              >
                Resume
                <Download className="w-4 h-4" />
              </Button>
            </a>

            {/* Ghost CTA: Contact */}
            <a href="#contact" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto gap-2">
                Contact
                <Mail className="w-4 h-4" />
              </Button>
            </a>
          </motion.div>

          {/* Social Links Row (Centered) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-6"
          >
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/akash-satpute-548b5a256/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:text-sky-400 hover:border-sky-500/40 hover:bg-sky-500/10 transition-all duration-300 shadow-md group cursor-pointer"
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
              className="flex items-center gap-2 p-2.5 rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all duration-300 shadow-md group cursor-pointer"
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
              className="flex items-center gap-2 p-2.5 rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:text-purple-400 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300 shadow-md group cursor-pointer"
              aria-label="Hashnode Blog"
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-xs font-mono font-semibold uppercase">Blog</span>
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN (45% desktop width - lg:col-span-5) */}
        <motion.div
          style={{
            scale: avatarScale,
            opacity: avatarOpacity,
            y: avatarY,
          }}
          initial={shouldAnimate ? { opacity: 0, x: 30 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          <AIAvatarHologram onOpenChat={handleOpenChatTrigger} />
        </motion.div>
      </div>
    </section>
  );
}
