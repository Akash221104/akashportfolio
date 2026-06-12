'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './ui/Card';
import Button from './ui/Button';
import { ExternalLink, X, BookOpen, Layers, Settings, ShieldCheck, Check } from 'lucide-react';
import { Github } from '@/components/ui/Icons';

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
    color: 'from-blue-600/20 to-cyan-600/20',
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
    color: 'from-purple-600/20 to-indigo-600/20',
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
    color: 'from-emerald-600/20 to-teal-600/20',
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
    color: 'from-rose-600/20 to-orange-600/20',
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

export default function Projects() {
  const [selectedProj, setSelectedProj] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 bg-black/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mb-3"
          >
            Featured Projects
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-12 h-1 bg-primary rounded-full"
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <Card
              key={project.id}
              delay={idx * 0.1}
              className="h-full border-border bg-card hover:border-primary/30 flex flex-col justify-between overflow-hidden relative group"
            >
              {/* Geometric visual header */}
              <div className={`h-40 w-full bg-gradient-to-br ${project.color} border-b border-border/60 flex items-center justify-center p-6 relative`}>
                <div className="absolute inset-0 grid-bg opacity-30" />
                <h3 className="text-xl sm:text-2xl font-display font-black text-white tracking-wider group-hover:scale-105 transition-transform duration-300 relative z-10">
                  {project.name.toUpperCase()}
                </h3>
              </div>

              {/* Text contents */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-display font-bold text-white mb-2">
                    {project.name}
                  </h4>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Features snippet */}
                  <ul className="space-y-1.5 mb-6">
                    {project.features.slice(0, 2).map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs text-muted/80 flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary shrink-0 mt-1.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/5 border border-white/5 text-muted"
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
                      className="flex-1 gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Case Study
                    </Button>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg border border-border bg-white/5 text-muted hover:text-white transition-colors"
                      aria-label="View Source Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg border border-border bg-white/5 text-muted hover:text-white transition-colors"
                      aria-label="View Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Case Study Slide-Over Modal */}
      <AnimatePresence>
        {selectedProj && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Dark Overlay Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProj(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Slide-over panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-2xl h-full bg-card border-l border-border shadow-2xl flex flex-col z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-border/80 flex items-center justify-between bg-black/30">
                <div>
                  <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Project Case Study</span>
                  <h3 className="text-xl font-display font-bold text-white mt-1">{selectedProj.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedProj(null)}
                  className="p-2 rounded-lg text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Panel Contents */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                {/* Visual Banner */}
                <div className={`h-48 w-full bg-gradient-to-br ${selectedProj.color} rounded-xl border border-border flex flex-col justify-end p-6 relative overflow-hidden`}>
                  <div className="absolute inset-0 grid-bg opacity-30" />
                  <div className="relative z-10 flex flex-wrap gap-2 mb-2">
                    {selectedProj.tech.map((t) => (
                      <span key={t} className="text-[9px] font-bold px-2.5 py-0.5 rounded bg-black/60 border border-white/10 text-white">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Challenge */}
                <div>
                  <h4 className="text-sm font-display font-semibold text-white uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <Settings className="w-4 h-4 text-primary" />
                    The Challenge
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">
                    {selectedProj.caseStudy.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h4 className="text-sm font-display font-semibold text-white uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-secondary" />
                    Proposed Solution
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">
                    {selectedProj.caseStudy.solution}
                  </p>
                </div>

                {/* System Architecture */}
                <div>
                  <h4 className="text-sm font-display font-semibold text-white uppercase tracking-wider mb-3.5 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" />
                    System Architecture
                  </h4>
                  <div className="space-y-2">
                    {selectedProj.caseStudy.architecture.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-white/[0.01]">
                        <span className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs text-muted">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Outcomes */}
                <div>
                  <h4 className="text-sm font-display font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Key Outcomes
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedProj.caseStudy.outcomes.map((out, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-muted leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-border/80 bg-black/40 flex items-center gap-3">
                <a
                  href={selectedProj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full gap-2 justify-center">
                    <Github className="w-4 h-4" />
                    GitHub Repository
                  </Button>
                </a>
                <a
                  href={selectedProj.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="primary" className="w-full gap-2 justify-center">
                    <ExternalLink className="w-4 h-4" />
                    Live Deployment
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
