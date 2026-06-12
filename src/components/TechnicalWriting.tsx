'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from './ui/Card';
import Button from './ui/Button';
import { BookOpen, ArrowRight, Cpu, Code, Cloud, GraduationCap, Users, Terminal } from 'lucide-react';

const topics = [
  { name: 'Artificial Intelligence', icon: Cpu, color: 'text-blue-400 border-blue-500/20 bg-blue-500/5' },
  { name: 'RAG Systems', icon: Terminal, color: 'text-purple-400 border-purple-500/20 bg-purple-500/5' },
  { name: 'Full Stack Development', icon: Code, color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' },
  { name: 'Cloud Computing', icon: Cloud, color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5' },
  { name: 'Software Engineering', icon: Terminal, color: 'text-rose-400 border-rose-500/20 bg-rose-500/5' },
  { name: 'Career Growth', icon: GraduationCap, color: 'text-amber-400 border-amber-500/20 bg-amber-500/5' },
  { name: 'Developer Communities', icon: Users, color: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5' },
];

export default function TechnicalWriting() {
  return (
    <section className="py-24 px-6 md:px-12 bg-black/20 grid-bg relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">
            Technical Writing
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mb-3">
            Technical Writing & Learning Journey
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <p className="text-muted text-sm sm:text-base max-w-2xl leading-relaxed">
            I regularly share my experiences, project learnings, AI experiments, software engineering insights, internship experiences, and community leadership journey through technical blogs.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Column 1: Featured Writing Card (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <Card className="h-full border-border bg-card p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
              {/* Animated corner light */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500 pointer-events-none" />

              <div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-primary/15 border border-primary/20 text-primary uppercase tracking-wider inline-block mb-4">
                  Featured Card
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">
                  Sharing Knowledge Through Writing
                </h3>
                <p className="text-sm text-muted leading-relaxed max-w-xl mb-8">
                  I believe in learning publicly and documenting my journey. Through my blogs, I share technical insights, project breakdowns, internship experiences, and lessons learned while building real-world applications.
                </p>

                {/* Abstract Vector Illustration */}
                <div className="h-36 w-full rounded-xl border border-border/80 bg-black/40 overflow-hidden relative flex items-center justify-center p-6">
                  <div className="absolute inset-0 grid-bg opacity-15" />
                  <svg className="w-full h-full max-w-[280px] text-muted/30" viewBox="0 0 200 100" fill="none">
                    <motion.path
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                      d="M20 50 Q50 20, 80 50 T140 50 T180 20"
                      stroke="url(#featuredGrad)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="80" cy="50" r="3" fill="#3B82F6" className="animate-ping" />
                    <circle cx="140" cy="50" r="3" fill="#8B5CF6" />
                    <defs>
                      <linearGradient id="featuredGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute bottom-3 right-4 flex items-center gap-2 px-2.5 py-1 rounded bg-black/60 border border-border text-[9px] text-muted font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Active Publications
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 flex items-center gap-4">
                <a
                  href="https://akashblogss.hashnode.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="primary" className="w-full sm:w-auto gap-2 group/btn cursor-pointer">
                    Explore All Articles
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>
            </Card>
          </div>

          {/* Column 2: Topics I Write About (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <Card className="h-full border-border bg-card p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-display font-bold text-white mb-6 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Topics I Write About
                </h3>
                <div className="flex flex-col gap-3">
                  {topics.map((topic, idx) => {
                    const Icon = topic.icon;
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ x: 4 }}
                        className={`flex items-center justify-between p-3 rounded-lg border ${topic.color} transition-all`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4" />
                          <span className="text-xs font-semibold text-white">
                            {topic.name}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="flex justify-center border-t border-border/40 pt-8">
          <p className="text-sm italic font-medium text-muted/80 text-center font-display">
            "Learning is valuable. Sharing that learning creates impact."
          </p>
        </div>
      </div>
    </section>
  );
}
