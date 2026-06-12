'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from './ui/Card';
import { Calendar, Briefcase, Award } from 'lucide-react';

const experiences = [
  {
    position: 'Project Intern',
    organization: 'C-DAC',
    fullOrg: 'Centre for Development of Advanced Computing',
    duration: '2025 – 2026',
    highlights: [
      'Built intelligent RAG-based AI chatbot systems and ingestion frameworks.',
      'Implemented custom vector search pipelines using dense embeddings.',
      'Worked with local embedding generators and open Large Language Models (LLMs).',
      'Developed extensible document ingestion and text preprocessing modules.',
      'Improved organizational knowledge accessibility and search accuracy using AI.',
    ],
  },
  {
    position: 'Product Development Intern',
    organization: 'Physics Wallah',
    fullOrg: 'Physics Wallah (PW)',
    duration: 'Nov 2024 – Feb 2025',
    highlights: [
      'Developed responsive healthcare platforms and administrative tools.',
      'Constructed multiple production-ready Proof of Concepts (POCs) for key features.',
      'Analyzed code structures to optimize database interactions and system loads.',
      'Successfully reduced platform API and UI latency by 15% overall.',
    ],
  },
  {
    position: 'GDG On Campus Lead',
    organization: 'GDG On Campus PCE',
    fullOrg: 'Google Developer Groups On Campus - Pillai College of Engineering',
    duration: 'Aug 2023 – Present',
    highlights: [
      'Managed and mentored a technical core team of 50+ members.',
      'Conceptualized and organized 15+ student workshops, study groups, and hackathons.',
      'Conducted interactive technical workshops on web standards and Google Cloud.',
      'Impacted over 2000+ students, creating an active developer hub on campus.',
    ],
  },
  {
    position: 'Web Developer Intern',
    organization: 'Oasis Infobyte',
    fullOrg: 'Oasis Infobyte Tech Solutions',
    duration: 'Oct 2023 – Nov 2023',
    highlights: [
      'Built and deployed lightweight, highly responsive client websites.',
      'Iterated on designs to enhance user experience and cross-device usability.',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 bg-black/40 relative">
      {/* Decorative vertical background line */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-border to-transparent hidden md:block" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mb-3"
          >
            Work Experience
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-12 h-1 bg-primary rounded-full"
          />
        </div>

        {/* Timeline List */}
        <div className="space-y-12 md:space-y-0">
          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`flex flex-col md:flex-row items-stretch md:mb-16 last:mb-0 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Space Column */}
                <div className="hidden md:block w-1/2" />

                {/* Timeline node */}
                <div className="hidden md:flex items-center justify-center relative w-16">
                  <div className="w-4 h-4 rounded-full bg-black border-[3px] border-primary z-20 shadow-md shadow-primary/20" />
                  {/* Dynamic connect indicator */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-0.5 h-full bg-border" />
                </div>

                {/* Card Container Column */}
                <div className="w-full md:w-1/2">
                  <Card
                    delay={idx * 0.1}
                    className="h-full border-border bg-card hover:border-primary/40 relative overflow-hidden"
                  >
                    {/* Glowing highlight top-border */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/30 to-secondary/30" />

                    {/* Metadata Header */}
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                      <div>
                        <span className="text-xs font-display font-semibold text-primary uppercase tracking-wider block mb-1">
                          {exp.position}
                        </span>
                        <h3 className="text-lg font-display font-bold text-white leading-tight">
                          {exp.organization}
                        </h3>
                        <span className="text-[10px] text-muted font-medium block mt-0.5">
                          {exp.fullOrg}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-muted">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.duration}
                      </div>
                    </div>

                    {/* Highlight bullets */}
                    <ul className="space-y-2.5">
                      {exp.highlights.map((bullet, bulletIdx) => (
                        <li
                          key={bulletIdx}
                          className="flex items-start gap-2.5 text-sm text-muted leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary/80 shrink-0 mt-2" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
