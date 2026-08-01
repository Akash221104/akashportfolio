'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue, useMotionTemplate } from 'framer-motion';
import Image from 'next/image';
import About3D from './About3D';

interface AboutCardProps {
  label: string;
  color: string;
  text: React.ReactNode;
  idx: number;
}

function AboutCard({ label, color, text, idx }: AboutCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleCardMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Determine lock colors based on card hover styles
  let lockColorClass = "text-sky-400/40";
  let borderLockColor = "border-sky-500/20";
  let centerLineColor = "bg-sky-500/30";
  let coordinatesHex = "0xAB1";
  if (color.includes("purple")) {
    lockColorClass = "text-purple-400/40";
    borderLockColor = "border-purple-500/20";
    centerLineColor = "bg-purple-500/30";
    coordinatesHex = "0xAB2";
  } else if (color.includes("blue")) {
    lockColorClass = "text-blue-400/40";
    borderLockColor = "border-blue-500/20";
    centerLineColor = "bg-blue-500/30";
    coordinatesHex = "0xAB3";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 * idx }}
      onMouseMove={handleCardMouseMove}
      className={`p-5 md:p-6 rounded-xl border border-white/5 bg-zinc-950/25 hover:bg-zinc-950/45 backdrop-blur-md transition-all duration-500 group ${color} hover:shadow-[0_0_25px_rgba(59,130,246,0.06)] relative overflow-hidden`}
    >
      {/* Background Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              ${color.includes("sky") ? 'rgba(56, 189, 248, 0.08)' : color.includes("purple") ? 'rgba(168, 85, 247, 0.08)' : 'rgba(59, 130, 246, 0.08)'},
              transparent 80%
            )
          `,
        }}
      />

      {/* Sleek bracket follower for cursor */}
      <motion.div
        className={`pointer-events-none absolute w-14 h-14 opacity-0 group-hover:opacity-100 transition-opacity duration-350 ${lockColorClass} select-none z-10 hidden md:block`}
        style={{
          left: mouseX,
          top: mouseY,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Four corner bracket marks */}
        <div className={`absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 ${borderLockColor.replace('/20', '/50')}`} />
        <div className={`absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 ${borderLockColor.replace('/20', '/50')}`} />
        <div className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 ${borderLockColor.replace('/20', '/50')}`} />
        <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 ${borderLockColor.replace('/20', '/50')}`} />

        {/* Pulsing center micro-dot */}
        <div className={`absolute w-1.5 h-1.5 rounded-full ${centerLineColor.replace('/30', '/70')} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse`} />

        {/* Small tech coordinate label */}
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[7px] font-mono tracking-widest opacity-60 uppercase whitespace-nowrap">
          READ: {coordinatesHex}
        </span>
      </motion.div>

      {/* HUD Content panel corner brackets */}
      <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-white/10 pointer-events-none" />
      <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-white/10 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-white/10 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-white/10 pointer-events-none" />

      <div className="relative z-10">
        <span className="text-[9px] font-mono text-white/30 group-hover:text-white/65 transition-colors duration-300 tracking-widest block mb-2 md:mb-3">
          {label}
        </span>
        <p className="text-sm leading-relaxed font-sans font-medium text-white/80">
          {text}
        </p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  const sectionMouseX = useMotionValue(0);
  const sectionMouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    sectionMouseX.set(e.clientX - rect.left);
    sectionMouseY.set(e.clientY - rect.top);
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Calculate parallax offsets for background blobs
  const blobY1 = useTransform(scrollYProgress, [0, 1], [-180, 180]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [180, -180]);
  const blobRotation = useTransform(scrollYProgress, [0, 1], [0, 180]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    scrollRef.current = latest;
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden select-text flex items-center justify-center min-h-screen py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 group/section bg-black lg:bg-transparent"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Backdrop Canvas — desktop only; on mobile the LowEndFallback overlaps main content */}
      <div className="hidden lg:block">
        <About3D mouse={mouseRef} scrollProgress={scrollRef} />
      </div>

      {/* Floating Parallax Background Blobs */}
      <motion.div
        style={{ y: blobY1, rotate: blobRotation }}
        className="absolute -top-[10%] -left-[10%] w-[45vw] h-[45vw] rounded-full bg-primary/10 blur-[130px] z-0 pointer-events-none"
      />
      <motion.div
        style={{ y: blobY2 }}
        className="absolute -bottom-[15%] -right-[15%] w-[40vw] h-[40vw] rounded-full bg-secondary/10 blur-[120px] z-0 pointer-events-none"
      />

      {/* ── Background Custom Spotlight & Follower Reticle ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 hidden md:block"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${sectionMouseX}px ${sectionMouseY}px,
              rgba(147, 51, 234, 0.05),
              transparent 80%
            )
          `,
        }}
      />

      <motion.div
        className="pointer-events-none absolute w-56 h-56 z-0 hidden md:block"
        style={{
          left: sectionMouseX,
          top: sectionMouseY,
          transform: 'translate(-50%, -50%)',
          opacity: isHovered ? 1 : 0,
        }}
      >
        {/* Radar concentric circular scan lines */}
        <div className="absolute inset-0 border border-white/5 rounded-full" />
        <div className="absolute inset-10 border border-dashed border-sky-500/10 rounded-full animate-spin" style={{ animationDuration: '24s' }} />
        <div className="absolute inset-20 border border-white/5 rounded-full animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }} />

        {/* Orbiting HUD satellite indicators */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          {/* A small dot orbiter */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-500/50 shadow-[0_0_8px_rgba(168,85,247,0.5)] animate-pulse" />
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          {/* A small bracket orbiter */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[8px] font-sans font-bold text-sky-400/40 select-none leading-none">
            [+]
          </div>
        </motion.div>

        {/* Fine crosshair lines */}
        <div className="absolute top-1/2 left-0 right-0 h-[0.5px] bg-white/[0.03]" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-white/[0.03]" />
      </motion.div>

      {/* Main grid */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center">

        {/* ══════════════════════════════════════════
            LEFT COLUMN — Photo + Heading + Taglines
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center lg:items-start gap-0"
        >
          {/* ── Circle Photo ── */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            className="relative group cursor-pointer mb-10"
          >
            {/* Blurred glow ring */}
            <div className="absolute -inset-[5px] rounded-full bg-gradient-to-tr from-sky-500 via-blue-500 to-purple-500 blur-md opacity-55 group-hover:opacity-90 transition-opacity duration-500" />
            {/* Solid gradient border */}
            <div className="absolute -inset-[2px] rounded-full bg-gradient-to-tr from-sky-400 via-blue-500 to-purple-500" />
            {/* Photo */}
            <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden bg-zinc-900">
              <Image
                src="/akash-photo.webp"
                alt="Akash Satpute"
                fill
                sizes="(max-width: 640px) 144px, (max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            {/* Status badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950/90 border border-white/10 backdrop-blur-sm shadow-lg whitespace-nowrap z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-[9px] sm:text-[10px] font-mono text-white/70 tracking-widest uppercase">Available for Work</span>
            </div>
          </motion.div>

          {/* ── Heading ── */}
          <div className="space-y-2 text-center lg:text-left mb-6">
            <span className="text-[10px] font-mono text-purple-400 tracking-[0.3em] font-bold uppercase block">
              {"// PROFILE_OVERVIEW"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-wider uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
              About{' '}
              <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Me
              </span>
            </h2>
          </div>

          {/* ── Tagline Chips ── */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3 font-mono text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest uppercase">
            {[
              {
                text: 'Building AI Systems',
                border: 'border-sky-500/20 bg-sky-950/15 text-sky-400',
                hover: 'hover:text-sky-300 hover:border-sky-500/50 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)]',
              },
              {
                text: 'Leading Communities',
                border: 'border-purple-500/20 bg-purple-950/15 text-purple-400',
                hover: 'hover:text-purple-300 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]',
              },
              {
                text: 'Learning in Public',
                border: 'border-blue-500/20 bg-blue-950/15 text-blue-400',
                hover: 'hover:text-blue-300 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]',
              },
            ].map((item, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.05, y: -3 }}
                transition={{ type: 'spring', stiffness: 450, damping: 15 }}
                className={`px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg border backdrop-blur-sm transition-all duration-300 cursor-default flex items-center gap-1.5 md:gap-2 ${item.border} ${item.hover}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {item.text}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════
            RIGHT COLUMN — Bio Cards
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 0, y: 30 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="space-y-4 md:space-y-5"
        >
          {[
            {
              id: 'specialization',
              label: '01 // SPECIALIZATION',
              color: 'hover:border-sky-500/50',
              text: (
                <>
                  I am a Computer Engineering student specializing in building{' '}
                  <span className="text-sky-400 font-bold border-b border-sky-400/20 hover:text-sky-300 hover:border-sky-400 transition-all duration-200">
                    intelligent systems
                  </span>
                  , optimizing{' '}
                  <span className="text-purple-400 font-bold border-b border-purple-400/20 hover:text-purple-300 hover:border-purple-400 transition-all duration-200">
                    Retrieval-Augmented Generation (RAG)
                  </span>{' '}
                  models, and developing modular{' '}
                  <span className="text-blue-400 font-bold border-b border-blue-400/20 hover:text-blue-300 hover:border-blue-400 transition-all duration-200">
                    full-stack web applications
                  </span>
                  .
                </>
              ),
            },
            {
              id: 'experience',
              label: '02 // EXPERIENCE',
              color: 'hover:border-purple-500/50',
              text: (
                <>
                  Through internships at{' '}
                  <span className="text-sky-400 font-bold border-b border-sky-400/20 hover:text-sky-300 hover:border-sky-400 transition-all duration-200">
                    C-DAC
                  </span>{' '}
                  and{' '}
                  <span className="text-purple-400 font-bold border-b border-purple-400/20 hover:text-purple-300 hover:border-purple-400 transition-all duration-200">
                    Physics Wallah
                  </span>
                  , I have specialized in configuring document ingestion vectors, integrating database schemas, and tuning model outputs, successfully lowering{' '}
                  <span className="text-emerald-400 font-bold inline-block drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">
                    chatbot response latency by 40%
                  </span>
                  .
                </>
              ),
            },
            {
              id: 'leadership',
              label: '03 // LEADERSHIP',
              color: 'hover:border-blue-500/50',
              text: (
                <>
                  Beyond coding, I am passionate about developer community growth. As the{' '}
                  <span className="text-blue-400 font-bold border-b border-blue-400/20 hover:text-blue-300 hover:border-blue-400 transition-all duration-200">
                    GDG On Campus Lead
                  </span>{' '}
                  at PCE, I coordinate workshops and hackathons, bridging the gap between student engineers and{' '}
                  <span className="text-purple-400 font-bold border-b border-purple-400/20 hover:text-purple-300 hover:border-purple-400 transition-all duration-200">
                    modern tech standards
                  </span>
                  .
                </>
              ),
            },
          ].map((item, idx) => (
            <AboutCard
              key={item.id}
              label={item.label}
              color={item.color}
              text={item.text}
              idx={idx}
            />
          ))}
        </motion.div>

      </div>

      {/* Screen edge fades */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
}
