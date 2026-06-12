'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useAnimation } from '@/context/AnimationContext';

// Dynamically load the WebGL 3D Tensor Grid Matrix background scene with SSR disabled
const BackgroundScene = dynamic(() => import('./BackgroundScene'), {
  ssr: false,
  loading: () => <LoadingFallback />,
});

// A clean glassmorphic loading screen for initial mount
function LoadingFallback() {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40 z-0">
      <div className="glass p-6 rounded-2xl border border-primary/15 flex flex-col items-center gap-3.5 shadow-2xl shadow-primary/5 select-none">
        <div className="w-7 h-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <span className="text-[9px] text-muted tracking-[0.2em] uppercase font-bold text-gradient-primary">
          Initializing Neural Synapse Network
        </span>
      </div>
    </div>
  );
}

// 2D Interactive Fallback for Low-End / Slow Devices to prevent CPU/WebGL lags
function LowEndFallback({ onNodeClick }: { onNodeClick: (id: string) => void }) {
  const nodes = [
    { id: 'genai', name: 'Generative AI' },
    { id: 'rag', name: 'Retrieval-Augmented Generation (RAG)' },
    { id: 'fullstack', name: 'Full Stack Development' },
    { id: 'cloud', name: 'Cloud Computing' },
    { id: 'research', name: 'Research & Engineering' },
    { id: 'advocacy', name: 'Developer Advocacy' },
    { id: 'opensource', name: 'Open Source' },
  ];

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-4 z-0 pointer-events-auto bg-black/50">
      {/* 2D grid matrix fallback representation for slow devices */}
      <div className="flex flex-wrap items-center justify-center gap-3 max-w-lg select-none">
        {nodes.map((node) => (
          <button
            key={node.id}
            onClick={() => onNodeClick(node.id)}
            className="px-4 py-2 text-xs font-semibold text-white/80 hover:text-white glass hover:bg-primary/10 border border-white/5 hover:border-primary/30 rounded-xl transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 hover:scale-105 active:scale-95"
          >
            {node.name}
          </button>
        ))}
      </div>
    </div>
  );
}

interface About3DProps {
  onNodeClick: (nodeId: string) => void;
}

export default function About3D({ onNodeClick }: About3DProps) {
  const { isLowEndDevice } = useAnimation();

  // If client is a low-end device, bypass WebGL Canvas to save CPU/GPU performance
  if (isLowEndDevice) {
    return <LowEndFallback onNodeClick={onNodeClick} />;
  }

  return <BackgroundScene onNodeClick={onNodeClick} />;
}
