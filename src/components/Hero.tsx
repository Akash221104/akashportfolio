'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, ArrowRight, Download, Mail } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/Icons';
import Button from './ui/Button';
import { useAnimation } from '@/context/AnimationContext';



export default function Hero() {
  const { isIntroActive, isDoorOpeningStarted } = useAnimation();
  const shouldAnimate = !isIntroActive;
  const { scrollY } = useScroll();
  const videoOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const videoScale = useTransform(scrollY, [0, 600], [1, 1.05]);
  const contentY = useTransform(scrollY, [0, 600], [0, 80]);

  return (
    <section
      style={isIntroActive ? {
        opacity: isDoorOpeningStarted ? 1 : 0,
        filter: isDoorOpeningStarted ? 'none' : 'blur(10px)',
        transform: `translate3d(0, 0, 0) scale(${isDoorOpeningStarted ? 1 : 0.95})`,
        transition: 'opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1), filter 1.6s cubic-bezier(0.16, 1, 0.3, 1), transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, filter, transform',
      } : {}}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-28 pb-16 px-6 md:px-12 bg-background"
    >
      {/* Layer 1: Fullscreen Video Background */}
      <motion.div
        style={{ opacity: videoOpacity, scale: videoScale }}
        className="absolute inset-0 w-full h-full z-0 overflow-hidden"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-poster.webp"
          className="w-full h-full object-cover opacity-60 md:opacity-75 block"
        >
          <source src="/hero-bg-480.webm" type="video/webm" media="(max-width: 768px)" />
          <source src="/hero-bg-720.webm" type="video/webm" />
          <source src="/hero-bg-720.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Layer 2: Dark Overlay + Subtle Blur */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[1px] z-10 pointer-events-none" />

      {/* Layer 3: Bottom Gradient Fade (blends the video background seamlessly into the About section) */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-b from-transparent to-background z-10 pointer-events-none" />

      {/* Premium Floating Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-primary/10 blur-[120px] animate-pulse-slow z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[30vw] h-[30vw] rounded-full bg-secondary/10 blur-[100px] animate-pulse-slow z-10 pointer-events-none" style={{ animationDelay: '-4s' }} />

      {/* Layer 4: Hero Content (using parallax contentY animation) */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-20 max-w-5xl w-full flex flex-col items-center text-center"
      >
        {/* Animated tag */}
        <motion.div
          initial={shouldAnimate ? { opacity: 0, scale: 0.9 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass border border-border text-xs text-primary font-medium mb-6 font-display"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Open to Opportunities
        </motion.div>

        {/* Big Headline */}
        <motion.h1
          initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight leading-none mb-6"
        >
          AKASH SATPUTE
        </motion.h1>

        {/* Roles Carousel/Subtitle */}
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-sm sm:text-base md:text-lg font-medium text-muted font-display mb-6"
        >
          <span>Computer Engineering Student</span>
          <span className="text-border/80 hidden sm:inline">•</span>
          <span>AI Engineer</span>
          <span className="text-border/80 hidden sm:inline">•</span>
          <span>Full Stack Developer</span>
          <span className="text-border/80 hidden sm:inline">•</span>
          <span>Community Leader</span>
        </motion.div>

        {/* Tagline Bio */}
        <motion.p
          initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
        >
          Building AI-powered applications, intelligent systems, and scalable web solutions while empowering developer communities.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16"
        >
          <a href="#projects" className="w-full sm:w-auto">
            <Button variant="primary" className="w-full sm:w-auto gap-2">
              View Projects
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
          <a href="#contact" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto gap-2">
              Contact Me
              <Mail className="w-4 h-4" />
            </Button>
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button variant="ghost" className="w-full sm:w-auto gap-2 border border-dashed border-border hover:border-muted text-white">
              Download Resume
              <Download className="w-4 h-4" />
            </Button>
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center gap-8 mb-20"
        >
          {/* LinkedIn */}
          <div className="flex flex-col items-center gap-2 group">
            <a
              href="https://www.linkedin.com/in/akash-satpute-548b5a256/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-border/80 bg-white/5 text-muted group-hover:text-primary group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300 hover:scale-110 shadow-[0_0_15px_transparent] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] cursor-pointer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <span className="text-[10px] font-mono tracking-widest text-muted group-hover:text-primary transition-colors duration-300 uppercase font-bold">
              LinkedIn
            </span>
          </div>

          {/* GitHub */}
          <div className="flex flex-col items-center gap-2 group">
            <a
              href="https://github.com/Akash221104"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-border/80 bg-white/5 text-muted group-hover:text-white group-hover:border-white/50 group-hover:bg-white/10 transition-all duration-300 hover:scale-110 shadow-[0_0_15px_transparent] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] cursor-pointer"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <span className="text-[10px] font-mono tracking-widest text-muted group-hover:text-white transition-colors duration-300 uppercase font-bold">
              GitHub
            </span>
          </div>

          {/* Blog */}
          <div className="flex flex-col items-center gap-2 group">
            <a
              href="https://akashblogss.hashnode.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-border/80 bg-white/5 text-muted group-hover:text-secondary group-hover:border-secondary/50 group-hover:bg-secondary/10 transition-all duration-300 hover:scale-110 shadow-[0_0_15px_transparent] group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] cursor-pointer"
              aria-label="Hashnode Blog"
            >
              <BookOpen className="w-5 h-5" />
            </a>
            <span className="text-[10px] font-mono tracking-widest text-muted group-hover:text-secondary transition-colors duration-300 uppercase font-bold">
              Blog
            </span>
          </div>
        </motion.div>
      </motion.div>


    </section>
  );
}
