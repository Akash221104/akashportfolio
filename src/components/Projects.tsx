'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate, Variants } from 'framer-motion';
import Button from './ui/Button';
import { ExternalLink, X, BookOpen, Layers, Settings, ShieldCheck, Check } from 'lucide-react';
import { Github } from '@/components/ui/Icons';
import dynamic from 'next/dynamic';

const InteractiveBackground = dynamic(() => import('./InteractiveBackground'), { ssr: false });

interface Project {
  id: string;
  name: string;
  description: string;
  features: string[];
  tech: string[];
  github: string;
  demo: string;
  color: string;
  caseStudy: {
    challenge: string;
    solution: string;
    architecture: string[];
    outcomes: string[];
  };
}

const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'CourseCrafter',
    description: 'AI-powered learning platform that generates personalized learning paths using YouTube content and intelligent ranking algorithms.',
    features: [
      'Personalized course structures based on user queries',
      'Intelligent learning path generation with sequence nodes',
      'YouTube API parsing & subtitle data analysis',
      'Difficulty-based node recommendation engine',
    ],
    tech: ['Next.js', 'Node.js', 'AI APIs', 'YouTube API', 'PostgreSQL'],
    github: 'https://github.com/akashsatpute/coursecrafter',
    demo: 'https://coursecrafter-demo.vercel.app',
    color: 'from-emerald-600/20 to-green-600/20',
    caseStudy: {
      challenge: 'Traditional online courses are static and rigid. Students often waste hours browsing scattered tutorials on YouTube without a clear sequence, structure, or difficulty mapping.',
      solution: 'Built CourseCrafter, which accepts a topic or skill goal, queries YouTube for educational playlists and videos, indexes transcript segments, and uses an AI model to build structured syllabus nodes mapping from beginner to advanced topics.',
      architecture: [
        'User Query Input -> Next.js client-side handler',
        'AI Syllabus Builder -> Node.js back-end generates curricular nodes',
        'YouTube Video Parser -> Queries API and extracts relevance metrics',
        'Difficulty Ranking Algorithm -> Sorts and embeds learning content inside nodes'
      ],
      outcomes: [
        'Created a dynamic curriculum generator that runs in under 4 seconds.',
        'Successfully tested on 50+ diverse subjects with high student feedback.',
        'Integrated automated progress tracking to save state to PostgreSQL.'
      ]
    }
  },
  {
    id: 'proj-2',
    name: 'Medicine Recommendation System',
    description: 'Machine learning system that predicts diseases from symptoms and recommends medicines, diets, and workouts.',
    features: [
      'Multi-symptom input disease prediction',
      'Supervised ML recommendation analytics',
      'Diet, exercise, and pharmaceutical recommendations',
      'Secure warning system & disclaimer filters',
    ],
    tech: ['Python', 'Scikit-learn', 'Flask', 'Pandas', 'NumPy'],
    github: 'https://github.com/akashsatpute/medicine-recommender',
    demo: 'https://med-recommend-demo.vercel.app',
    color: 'from-teal-600/20 to-emerald-600/20',
    caseStudy: {
      challenge: 'Preliminary healthcare diagnosis is inaccessible to many, leading to ignored symptoms or inaccurate self-medication. Patients need guidance on symptoms before clinical visits.',
      solution: 'Developed a Python-based machine learning engine trained on large symptom-disease datasets. Users enter multiple symptoms, and the system outputs the most probable disease along with a curated guidance pack covering dietary steps, workouts, and common over-the-counter medicine types.',
      architecture: [
        'Symptom text pre-processor -> Tokenizes and converts symptoms into array vectors',
        'SVM Classifier -> Predicts disease class using a trained kernel',
        'Recommendation mapper -> Retrieves relational records for predicted disease',
        'Flask API -> Exposes model outputs to interactive UI'
      ],
      outcomes: [
        'Achieved a model accuracy of 94.5% across 40+ disease categories.',
        'Added dynamic validation to match user inputs with standard medical terms.',
        'Optimized vector lookup structures to return predictions in under 100ms.'
      ]
    }
  },
  {
    id: 'proj-3',
    name: 'RAG AI Chatbot',
    description: 'Enterprise-style retrieval augmented generation chatbot developed during C-DAC internship.',
    features: [
      'Automated document ingestion (PDFs, Markdown, DOCX)',
      'High-performance text chunking and sentence embeddings',
      'Vector database storage for fast cosine search',
      'Context-aware responses with Ollama local LLMs',
    ],
    tech: ['Next.js', 'Node.js', 'Ollama', 'Llama 3', 'ChromaDB', 'TypeScript'],
    github: 'https://github.com/akashsatpute/rag-chatbot',
    demo: 'https://rag-chatbot-demo.vercel.app',
    color: 'from-green-600/20 to-teal-600/20',
    caseStudy: {
      challenge: 'Enterprises struggle to query knowledge base files quickly. Traditional keyword searching fails to answer context-dependent questions, and uploading documents to public cloud LLMs poses data privacy leaks.',
      solution: 'Designed and deployed a local, private RAG pipeline. It digests files, splits them, indexes semantic embeddings in ChromaDB, and passes chunks as context to a local Ollama instance running Llama 3 on private servers.',
      architecture: [
        'Ingestion Worker -> Extracts text, chunks, and creates vector embeddings',
        'Vector Store -> Databases ChromaDB handles metadata and vector storage',
        'Retrieval Engine -> Computes cosine similarity for user query embeddings',
        'LLM Orchestration -> Forms context prompts and queries local Ollama'
      ],
      outcomes: [
        'Ensured 100% data privacy by hosting both vector DB and LLM models locally.',
        'Reduced hallucination rates to less than 2% by employing strict retrieval filters.',
        'Built a beautiful drag-and-drop document upload dashboard in Next.js.'
      ]
    }
  },
  {
    id: 'proj-4',
    name: 'Smart Retail Decision Assistant',
    description: 'Retail analytics platform helping businesses optimize inventory and pricing strategies using data-driven insights.',
    features: [
      'Interactive pricing strategy simulators',
      'Inventory stockout forecasting model',
      'SQL-based transactional data queries',
      'Visual business dashboards & revenue metrics',
    ],
    tech: ['Python', 'SQL', 'Streamlit', 'Statsmodels', 'Matplotlib'],
    github: 'https://github.com/akashsatpute/retail-assistant',
    demo: 'https://retail-assistant-demo.vercel.app',
    color: 'from-emerald-600/20 to-teal-600/20',
    caseStudy: {
      challenge: 'Small to mid-size retail businesses fail to identify sales patterns, leading to excess dead stock or frequent stockouts of top-selling items.',
      solution: 'Created an analytical assistant that digests historical sales tables, computes seasonal trends using time-series analysis, and provides pricing optimizations and replenishment alerts.',
      architecture: [
        'SQL Queries -> Aggregates transactional inventory datasets',
        'Statistical Forecasting -> Employs ARIMA models to predict product demand',
        'Decision Engine -> Recommends optimal pricing margins',
        'Streamlit UI -> Renders dashboard visualizations and data grids'
      ],
      outcomes: [
        'Helped simulate a 12% revenue increase through optimal markdown strategies.',
        'Designed stock warning models forecasting inventory needs 30 days out.',
        'Implemented fast SQL queries optimized with secondary index schemas.'
      ]
    }
  }
];

function ProjectCard({ 
  project, 
  idx, 
  setSelectedProj 
}: { 
  project: Project; 
  idx: number; 
  setSelectedProj: (p: Project) => void;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const isEven = idx % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className={`group relative w-full rounded-2xl border border-white/5 hover:border-emerald-500/40 bg-zinc-950/45 flex flex-col ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      } items-stretch overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/5 cursor-default`}
    >
      {/* Background Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      {/* Floating target reticle scope following mouse */}
      <motion.div
        className="pointer-events-none absolute w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[8px] text-emerald-400/40 select-none z-10 hidden md:block"
        style={{
          left: mouseX,
          top: mouseY,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Rotating outer targeting scope */}
        <div className="absolute inset-0 border border-emerald-500/20 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute inset-2 border border-dashed border-emerald-500/10 rounded-full animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
        
        {/* Center reticle lines */}
        <div className="absolute w-3.5 h-0.5 bg-emerald-500/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute h-3.5 w-0.5 bg-emerald-500/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        {/* Mock hacker coordinates trackers */}
        <div className="absolute top-0.5 left-7 font-sans font-bold text-[7px] text-emerald-400/50 tracking-wider">SYS.LOCK</div>
        <div className="absolute bottom-0.5 left-7 font-sans font-bold text-[7px] text-emerald-400/50 tracking-wider">
          0x{project.id === 'proj-1' ? 'A3F' : project.id === 'proj-2' ? 'B90' : project.id === 'proj-3' ? 'CF4' : 'DE1'}
        </div>
      </motion.div>

      {/* Visual banner monitor display */}
      <div className={`w-full md:w-[42%] h-56 md:h-auto bg-gradient-to-br ${project.color} border-b md:border-b-0 ${
        isEven ? 'md:border-r' : 'md:border-l'
      } border-white/5 flex flex-col items-center justify-center p-8 relative overflow-hidden shrink-0`}>
        {/* CRT Scanline grid overlay */}
        <div className="absolute inset-0 grid-bg opacity-[0.25] group-hover:opacity-40 group-hover:scale-[1.03] transition-all duration-500 pointer-events-none" />
        
        {/* Ambient background glows */}
        <div className="absolute w-36 h-36 rounded-full bg-white/[0.01] -top-12 -right-12 blur-2xl pointer-events-none" />
        
        {/* Traveling laser scanner line */}
        <motion.div 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 right-0 h-[1.5px] bg-emerald-500/45 shadow-[0_0_8px_#10B981] z-10 pointer-events-none"
        />

        {/* HUD targeting corner brackets */}
        <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-emerald-500/30 pointer-events-none" />
        <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-emerald-500/30 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-emerald-500/30 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-emerald-500/30 pointer-events-none" />

        {/* Telemetry data points */}
        <div className="absolute top-3.5 left-9 text-[8px] font-mono text-emerald-500/30 leading-none select-none">
          LOC.ADDR: 0x{project.id === 'proj-1' ? 'A3F2' : project.id === 'proj-2' ? 'B90C' : project.id === 'proj-3' ? 'CF40' : 'DE12'}
        </div>
        <div className="absolute top-3.5 right-9 text-[8px] font-mono text-emerald-500/30 leading-none select-none">
          PORT: {project.id === 'proj-1' ? '8080' : project.id === 'proj-2' ? '5000' : project.id === 'proj-3' ? '11434' : '8501'}
        </div>
        <div className="absolute bottom-3.5 left-9 text-[8px] font-mono text-emerald-500/30 leading-none select-none">
          SYS.STATE: ACTIVE
        </div>
        <div className="absolute bottom-3.5 right-9 text-[8px] font-mono text-emerald-500/30 leading-none select-none">
          SYS.INTG: 100%
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-display font-black text-white tracking-wider group-hover:tracking-[0.15em] transition-all duration-500 ease-out relative z-10 drop-shadow-[0_0_8px_rgba(16,185,129,0.2)] text-center uppercase">
          {project.name}
        </h3>
      </div>

      {/* Content panel */}
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between relative z-10">
        {/* HUD Content panel corner brackets */}
        <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-white/10 pointer-events-none" />
        <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-white/10 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-white/10 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-white/10 pointer-events-none" />

        <div>
          <h4 className="text-lg md:text-xl font-display font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
            {project.name}
          </h4>
          <p className="text-sm text-muted leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Features snippet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs">
            {project.features.slice(0, 4).map((feat, fIdx) => (
              <motion.div 
                key={fIdx}
                whileHover={{ x: 2 }}
                className="text-muted flex items-start gap-2.5 transition-colors duration-300 hover:text-white"
              >
                <div className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-emerald-400" />
                </div>
                <span>{feat}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          {/* Tech stack capsule badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] font-semibold px-2.5 py-0.5 rounded bg-white/5 border border-white/5 text-muted transition-all duration-300 hover:text-white hover:border-emerald-500/30 hover:bg-emerald-500/[0.03]"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Actions buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedProj(project)}
              className="flex-1 gap-1.5 cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:text-white transition-all duration-300 text-xs font-semibold"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              Case Study
            </Button>
            
            <motion.a
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg border border-border bg-white/5 text-muted hover:text-white hover:border-emerald-500/20 hover:bg-emerald-500/10 transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <Github className="w-4 h-4 shrink-0" />
              Source Code
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg border border-border bg-white/5 text-muted hover:text-white hover:border-emerald-500/20 hover:bg-emerald-500/10 transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              Live Demo
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 18 }
  }
};

export default function Projects() {
  const [selectedProj, setSelectedProj] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 bg-black/20 relative overflow-hidden select-none">
      {/* Scope the interactive network node background strictly to the projects section wrapper */}
      <InteractiveBackground />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 relative">
          {/* Subtle Ambient Header Glow */}
          <div className="absolute w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl -top-12 -z-10 pointer-events-none" />
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mb-3"
          >
            Featured Projects
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="h-[3px] bg-emerald-500 rounded-full"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-muted max-w-xl mt-4 leading-relaxed"
          >
            A curated gallery of engineering projects, showcasing interactive web systems, machine learning applications, and private RAG architectures.
          </motion.p>
        </div>

        {/* Projects Stack */}
        <div className="flex flex-col gap-10">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              idx={idx}
              setSelectedProj={setSelectedProj}
            />
          ))}
        </div>
      </div>

      {/* Case Study Slide-Over Modal */}
      <AnimatePresence>
        {selectedProj && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Dark Overlay Backdrop with deeper blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProj(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-[6px] cursor-pointer"
            />

            {/* Slide-over panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="relative w-full max-w-2xl h-full bg-[#0d0d10] border-l border-white/5 shadow-2xl flex flex-col z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/45">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase">Project Case Study</span>
                  <h3 className="text-xl font-display font-bold text-white mt-1">{selectedProj.name}</h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.08, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedProj(null)}
                  className="p-2 rounded-lg text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Panel Contents */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8"
              >
                {/* Visual Banner */}
                <motion.div 
                  variants={itemVariants}
                  className={`h-48 w-full bg-gradient-to-br ${selectedProj.color} rounded-xl border border-white/5 flex flex-col justify-end p-6 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 grid-bg opacity-30" />
                  
                  {/* Glowing background shapes */}
                  <div className="absolute w-44 h-44 rounded-full bg-white/[0.015] -top-10 -right-10 blur-3xl" />
                  
                  <div className="relative z-10 flex flex-wrap gap-2 mb-2">
                    {selectedProj.tech.map((t) => (
                      <span key={t} className="text-[9px] font-bold px-2.5 py-0.5 rounded bg-black/70 border border-white/10 text-white">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Challenge */}
                <motion.div variants={itemVariants}>
                  <h4 className="text-sm font-display font-semibold text-white uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <Settings className="w-4 h-4 text-emerald-400" />
                    The Challenge
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">
                    {selectedProj.caseStudy.challenge}
                  </p>
                </motion.div>

                {/* Solution */}
                <motion.div variants={itemVariants}>
                  <h4 className="text-sm font-display font-semibold text-white uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                    Proposed Solution
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">
                    {selectedProj.caseStudy.solution}
                  </p>
                </motion.div>

                {/* System Architecture */}
                <motion.div variants={itemVariants}>
                  <h4 className="text-sm font-display font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    System Architecture
                  </h4>
                  <div className="relative pl-6 space-y-4">
                    {/* Vertical connector line */}
                    <div className="absolute left-[11px] top-2 bottom-2 w-[1.5px] bg-gradient-to-b from-emerald-500 via-emerald-500/50 to-teal-500/10" />
                    
                    {selectedProj.caseStudy.architecture.map((step, idx) => {
                      const parts = step.split('->');
                      return (
                        <div key={idx} className="relative flex items-start gap-4">
                          <span className="absolute -left-[23px] w-4.5 h-4.5 rounded-full bg-[#0d0d10] border border-emerald-500/50 text-[9px] font-bold text-emerald-400 flex items-center justify-center shrink-0 shadow-md">
                            {idx + 1}
                          </span>
                          <div className="flex-1 p-3.5 rounded-xl border border-white/5 bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300">
                            {parts.length > 1 ? (
                              <div className="flex flex-col gap-0.5">
                                <span className="font-display font-bold text-xs text-white tracking-wide">{parts[0].trim()}</span>
                                <span className="text-[11px] text-muted leading-relaxed">{parts[1].trim()}</span>
                              </div>
                            ) : (
                              <span className="text-xs text-muted leading-relaxed">{step}</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Key Outcomes */}
                <motion.div variants={itemVariants}>
                  <h4 className="text-sm font-display font-semibold text-white uppercase tracking-wider mb-3.5 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Key Outcomes
                  </h4>
                  <ul className="space-y-3">
                    {selectedProj.caseStudy.outcomes.map((out, idx) => (
                      <motion.li 
                        key={idx} 
                        whileHover={{ x: 2 }}
                        className="flex items-start gap-3 text-sm text-muted leading-relaxed hover:text-white transition-colors duration-300"
                      >
                        <div className="w-5 h-5 rounded-md bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <span>{out}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-white/5 bg-black/45 flex items-center gap-3">
                <a
                  href={selectedProj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full gap-2 justify-center hover:bg-white/5 hover:border-emerald-500/40 hover:text-white text-xs">
                    <Github className="w-4 h-4" />
                    Source Code
                  </Button>
                </a>
                <a
                  href={selectedProj.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full gap-2 justify-center bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 text-white text-xs">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
