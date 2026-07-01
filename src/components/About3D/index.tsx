'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAnimation } from '@/context/AnimationContext';

// Dynamically load the Holographic Background scene with SSR disabled
const BackgroundScene = dynamic(() => import('./BackgroundScene'), {
  ssr: false,
  loading: () => <LoadingFallback />,
});

// A clean glassmorphic loading screen for initial mount
function LoadingFallback() {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black z-0">
      <div className="glass p-6 rounded-2xl border border-sky-500/15 flex flex-col items-center gap-3.5 shadow-2xl shadow-sky-500/5 select-none">
        <div className="w-7 h-7 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
        <span className="text-[9px] text-sky-300 tracking-[0.2em] uppercase font-bold">
          Initializing Holographic Core
        </span>
      </div>
    </div>
  );
}

// 2D Premium Fallback for Low-End / Slow Devices
function LowEndFallback() {
  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 z-0 bg-black overflow-y-auto">
      <div className="max-w-4xl w-full flex flex-col items-center gap-12 py-16">
        
        {/* Core Centerpiece Title */}
        <div className="text-center relative py-6 px-12 rounded-full border border-sky-500/20 bg-sky-950/10 shadow-[0_0_30px_rgba(56,189,248,0.1)]">
          <h2 className="font-display font-black text-2xl md:text-3xl text-white tracking-[0.3em] uppercase drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]">
            Akash Satpute
          </h2>
          <span className="text-[10px] font-mono text-sky-400 tracking-widest uppercase block mt-1">
            Futuristic AI Ecosystem
          </span>
        </div>

        {/* 2D Holographic Content Plates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
          {[
            {
              id: 'academic',
              title: 'Academic Focus',
              desc: 'I am a Computer Engineering student specializing in building intelligent systems, optimizing Retrieval-Augmented Generation (RAG) models, and developing modular full-stack web applications.'
            },
            {
              id: 'industry',
              title: 'Industry Experience',
              desc: 'Through internships at C-DAC and Physics Wallah, I have specialized in configuring document ingestion vectors, integrating database schemas, and tuning model outputs, successfully lowering chatbot response latency by 40%.'
            },
            {
              id: 'community',
              title: 'Community Leadership',
              desc: 'Beyond coding, I am passionate about developer community growth. As the GDG On Campus Lead at PCE, I coordinate workshops and hackathons, bridging the gap between student engineers and modern tech standards.'
            }
          ].map(zone => (
            <div
              key={zone.id}
              className="p-6 rounded-2xl border border-sky-500/10 bg-zinc-950/50 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.05)] hover:border-violet-500/30 hover:shadow-[0_0_25px_rgba(139,92,246,0.15)] transition-all duration-300"
            >
              <div className="text-[10px] font-mono text-violet-400 font-bold uppercase tracking-wider mb-2">
                {zone.id === 'academic' ? '01 // ACADEMIC' : zone.id === 'industry' ? '02 // EXPERIENCE' : '03 // LEADERSHIP'}
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-3">
                {zone.title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed font-sans">
                {zone.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

interface About3DProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scrollProgress: React.MutableRefObject<number>;
}

export default function About3D({ mouse, scrollProgress }: About3DProps) {
  const { isLowEndDevice } = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // If client is a low-end device or on mobile, bypass WebGL Canvas to save CPU/GPU performance
  if (isLowEndDevice || isMobile) {
    return <LowEndFallback />;
  }

  return <BackgroundScene mouse={mouse} scrollProgress={scrollProgress} />;
}
