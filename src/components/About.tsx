'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import About3D from './About3D';
import { Brain, Cpu, CheckCircle2, ChevronRight, X, Zap } from 'lucide-react';

const SKILL_NODES = [
  { id: 'genai',      label: 'Generative AI',              color: '#a78bfa' },
  { id: 'rag',        label: 'RAG',                         color: '#38bdf8' },
  { id: 'fullstack',  label: 'Full Stack',                  color: '#34d399' },
  { id: 'cloud',      label: 'Cloud Computing',             color: '#fb923c' },
  { id: 'research',   label: 'Research & Eng.',             color: '#f472b6' },
  { id: 'advocacy',   label: 'Dev Advocacy',                color: '#facc15' },
  { id: 'opensource', label: 'Open Source',                 color: '#4ade80' },
];

const NODE_DETAILS: Record<string, { title: string; subtitle: string; items: string[] }> = {
  genai: {
    title: 'Generative AI',
    subtitle: 'Large Language Models & Agentic Workflows',
    items: [
      'LLMs & Custom Model Finetuning',
      'LangChain & LlamaIndex Orchestration',
      'Autonomous AI Agent Architectures',
      'Prompt Engineering & Context Optimization',
      'Hugging Face Transformers & Model Serving',
    ],
  },
  rag: {
    title: 'Retrieval-Augmented Generation',
    subtitle: 'Context-Aware AI Retrieval Systems',
    items: [
      'AI Chatbot Development & Semantic Queries',
      'Dense Embeddings & Chunking Strategies',
      'Semantic Search & Hybrid Retrieval',
      'Vector DBs: Pinecone, Chroma, pgvector',
      'Enterprise Knowledge Retrieval Pipelines',
    ],
  },
  fullstack: {
    title: 'Full Stack Development',
    subtitle: 'High-Performance Scalable Web Architectures',
    items: [
      'Next.js 15 & React 19 Frontend Systems',
      'Node.js & Express REST/gRPC Server APIs',
      'PostgreSQL, MongoDB & Redis Cache',
      'GraphQL, WebSockets & Server-Sent Events',
      'State Machine Frameworks & Loading Hooks',
    ],
  },
  cloud: {
    title: 'Cloud Computing',
    subtitle: 'Infrastructure, Containerization & CI/CD',
    items: [
      'AWS & Google Cloud Platform (GCP)',
      'Docker Containerization & Multi-stage Builds',
      'Serverless Architectures & Lambda Functions',
      'CI/CD Workflows & GitHub Actions Pipelines',
      'Microservices Orchestration & API Gateways',
    ],
  },
  research: {
    title: 'Research & Engineering',
    subtitle: 'Algorithmic Optimization & Deep Learning',
    items: [
      'Deep Learning Network Architectures',
      'System Latency & Throughput Profiling',
      'High-throughput Data Engineering & ETL',
      'Technical Paper Writing & Benchmarking',
      'Advanced Mathematics & Algorithm Design',
    ],
  },
  advocacy: {
    title: 'Developer Advocacy',
    subtitle: 'Technical Speaking, Writing & Community Lead',
    items: [
      'Technical Speaking & Conference Presentations',
      'Developer Workshop Mentorship & Curriculum',
      'GDG On Campus Community Leadership',
      'Developer Experience (DX) Auditing',
      'Blog Writing & API Documentation',
    ],
  },
  opensource: {
    title: 'Open Source',
    subtitle: 'Collaborative Dev Tooling & Package Publishing',
    items: [
      'Git Workflows, Branching & Merge Conflicts',
      'NPM Package Publishing & Versioning',
      'Pull Request Reviews & Automation Actions',
      'Custom Developer CLI Tooling',
      'Markdown Documentation & Guides',
    ],
  },
};

export default function About() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(prev => prev === nodeId ? null : nodeId);
  };

  const activeDetail = selectedNode ? NODE_DETAILS[selectedNode] : null;
  const activeColor = selectedNode ? SKILL_NODES.find(n => n.id === selectedNode)?.color : undefined;

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', background: '#020208' }}
    >
      {/* ── Full-background 3D Neural Scene ── */}
      <About3D onNodeClick={handleNodeClick} />

      {/* ── Radial vignette to focus center content ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(2,2,8,0.55) 60%, rgba(2,2,8,0.92) 100%)',
        }}
      />
      {/* Edge darkening */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, rgba(2,2,8,0.7) 0%, transparent 18%, transparent 82%, rgba(2,2,8,0.85) 100%)' }}
      />

      {/* ── FOREGROUND CONTENT ── */}
      <div className="relative z-20 flex flex-col min-h-screen">

        {/* ── Top label ── */}
        <div className="flex justify-center pt-16 pb-2">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/25 bg-violet-950/30 backdrop-blur-sm"
          >
            <Brain className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-violet-300/80 font-mono">
              Neural Knowledge Map
            </span>
          </motion.div>
        </div>

        {/* ── Section headline ── */}
        <div className="flex flex-col items-center text-center px-6 pt-4 pb-2 select-none">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-tight"
          >
            About{' '}
            <span style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Me
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-3 text-sm text-white/45 max-w-md font-sans leading-relaxed"
          >
            Hover the orbs. Click to explore my expertise.
          </motion.p>
        </div>

        {/* ── Main split layout ── */}
        <div className="flex-1 flex items-end pb-10 px-6 md:px-12 lg:px-20">
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* LEFT — Bio console */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div
                className="rounded-2xl border border-white/8 p-6 md:p-8 h-full"
                style={{
                  background: 'rgba(4, 4, 18, 0.75)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 0 0 1px rgba(139,92,246,0.12), 0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                {/* Console header */}
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/6">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-[10px] font-mono text-white/30 ml-2 tracking-wider">akash_profile.sys</span>
                  <div className="ml-auto flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-mono text-emerald-400/80 tracking-wider">ONLINE</span>
                  </div>
                </div>

                {/* Headline */}
                <h3 className="text-lg md:text-xl font-display font-bold text-white leading-snug mb-4">
                  Building AI Systems.{' '}
                  <span className="text-violet-300">Leading Communities.</span>{' '}
                  Learning in Public.
                </h3>

                {/* Bio */}
                <div className="space-y-3 text-sm text-white/55 font-sans leading-relaxed mb-6">
                  <p>
                    Computer Engineering student specializing in Retrieval-Augmented Generation, Full Stack Development, Cloud Computing, and AI Developer Communities.
                  </p>
                  <p>
                    Internship experience at C-DAC and Physics Wallah. GDG On Campus Lead building the next generation of AI-native developers.
                  </p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { val: '2+', label: 'Years Building' },
                    { val: '15+', label: 'AI Projects' },
                    { val: '500+', label: 'Community Members' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center text-center p-3 rounded-xl border border-white/5 bg-white/3">
                      <span className="text-lg font-display font-black text-white">{stat.val}</span>
                      <span className="text-[10px] text-white/35 font-sans mt-0.5">{stat.label}</span>
                    </div>
                  ))}
                </div>

                {/* Skill badge grid */}
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/28 mb-3 font-display">
                  Click a node to inspect
                </p>
                <div className="flex flex-wrap gap-2">
                  {SKILL_NODES.map((node) => {
                    const isActive = selectedNode === node.id;
                    return (
                      <button
                        key={node.id}
                        onClick={() => handleNodeClick(node.id)}
                        className="group relative px-3 py-1.5 rounded-lg text-[11px] font-semibold font-display transition-all duration-300 cursor-pointer"
                        style={{
                          background: isActive ? `${node.color}22` : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${isActive ? node.color + '55' : 'rgba(255,255,255,0.07)'}`,
                          color: isActive ? node.color : 'rgba(255,255,255,0.5)',
                          boxShadow: isActive ? `0 0 14px ${node.color}22` : 'none',
                          transform: isActive ? 'translateY(-1px)' : 'none',
                        }}
                      >
                        {node.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* RIGHT — Inspector panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div
                className="rounded-2xl border border-white/8 p-6 md:p-8 h-full min-h-[320px] flex flex-col"
                style={{
                  background: 'rgba(4, 4, 18, 0.75)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: activeColor
                    ? `0 0 0 1px ${activeColor}22, 0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`
                    : '0 0 0 1px rgba(139,92,246,0.12), 0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                  transition: 'box-shadow 0.5s ease',
                }}
              >
                {/* Panel header */}
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/6">
                  <Cpu className="w-3.5 h-3.5 text-violet-400/70" />
                  <span className="text-[10px] font-mono text-white/30 tracking-wider">node_inspector.exe</span>
                  {selectedNode && (
                    <button
                      onClick={() => setSelectedNode(null)}
                      className="ml-auto p-1 rounded-lg hover:bg-white/8 text-white/30 hover:text-white/70 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {activeDetail ? (
                      <motion.div
                        key={selectedNode!}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col h-full"
                      >
                        {/* Node title */}
                        <div className="flex items-center gap-2 mb-1">
                          <Zap
                            className="w-4 h-4 shrink-0"
                            style={{ color: activeColor }}
                          />
                          <h4
                            className="text-base font-display font-black uppercase tracking-wider"
                            style={{ color: activeColor }}
                          >
                            {activeDetail.title}
                          </h4>
                        </div>
                        <p className="text-[10px] font-mono text-white/35 mb-5 tracking-wide">
                          {activeDetail.subtitle}
                        </p>

                        {/* Skill checklist */}
                        <ul className="space-y-3 flex-1">
                          {activeDetail.items.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: 8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.06 }}
                              className="flex items-start gap-2.5"
                            >
                              <CheckCircle2
                                className="w-4 h-4 shrink-0 mt-0.5"
                                style={{ color: activeColor }}
                              />
                              <span className="text-sm text-white/65 font-sans leading-snug">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="flex flex-col items-center justify-center text-center py-8 select-none"
                      >
                        {/* Animated neural icon */}
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                          style={{
                            background: 'rgba(139,92,246,0.1)',
                            border: '1px solid rgba(139,92,246,0.25)',
                            boxShadow: '0 0 30px rgba(139,92,246,0.15)',
                          }}
                        >
                          <Brain className="w-7 h-7 text-violet-400 animate-pulse" />
                        </div>
                        <h4 className="text-sm font-display font-semibold text-white mb-2">
                          No Node Selected
                        </h4>
                        <p className="text-xs text-white/40 font-sans max-w-[220px] leading-relaxed mb-5">
                          Interact with the glowing orbs in the background or select a skill badge to inspect capabilities.
                        </p>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-violet-400/70 tracking-widest">
                          <span>AWAITING SIGNAL</span>
                          <ChevronRight className="w-3 h-3 animate-pulse" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
