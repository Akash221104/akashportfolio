'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import About3D from './About3D';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    scrollRef.current = latest;
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden select-text bg-transparent flex items-center justify-center min-h-screen py-24 px-6 md:px-12 lg:px-20"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Backdrop Canvas */}
      <About3D mouse={mouseRef} scrollProgress={scrollRef} />

      {/* Main grid */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

        {/* ══════════════════════════════════════════
            LEFT COLUMN — Photo + Heading + Taglines
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center lg:items-start gap-8"
        >
          {/* ── Circle Photo ── */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            className="relative group cursor-pointer"
          >
            {/* Blurred glow ring */}
            <div className="absolute -inset-[5px] rounded-full bg-gradient-to-tr from-sky-500 via-blue-500 to-purple-500 blur-md opacity-55 group-hover:opacity-90 transition-opacity duration-500" />
            {/* Solid gradient border */}
            <div className="absolute -inset-[2px] rounded-full bg-gradient-to-tr from-sky-400 via-blue-500 to-purple-500" />
            {/* Photo */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-64 lg:h-64 rounded-full overflow-hidden bg-zinc-900">
              <img
                src="/akash photo.png"
                alt="Akash Satpute"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            {/* Status badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950/90 border border-white/10 backdrop-blur-sm shadow-lg whitespace-nowrap z-10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-white/70 tracking-widest uppercase">Available for Work</span>
            </div>
          </motion.div>

          {/* ── Heading ── */}
          <div className="space-y-3 text-center lg:text-left mt-4">
            <span className="text-[10px] font-mono text-purple-400 tracking-[0.3em] font-bold uppercase block">
              // PROFILE_OVERVIEW
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-wider uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
              About{' '}
              <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Me
              </span>
            </h2>
          </div>

          {/* ── Tagline Chips ── */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase">
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
                className={`px-3 py-2 rounded-lg border backdrop-blur-sm transition-all duration-300 cursor-default flex items-center gap-2 ${item.border} ${item.hover}`}
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
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="space-y-5"
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
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 * idx }}
              className={`p-6 rounded-xl border border-white/5 bg-zinc-950/25 hover:bg-zinc-950/45 backdrop-blur-md transition-all duration-300 group ${item.color} hover:shadow-[0_0_25px_rgba(59,130,246,0.06)]`}
            >
              <span className="text-[9px] font-mono text-white/30 group-hover:text-white/65 transition-colors duration-300 tracking-widest block mb-3">
                {item.label}
              </span>
              <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans font-medium">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Screen edge fades */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </section>
  );
}
