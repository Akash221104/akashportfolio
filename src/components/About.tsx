'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from './ui/Card';
import { Cpu, Code, Cloud, Users, FileText, CheckCircle2 } from 'lucide-react';

const organizations = [
  { name: 'C-DAC', role: 'Project Intern', desc: 'RAG & Vector AI Systems' },
  { name: 'Physics Wallah', role: 'Product Intern', desc: 'EdTech Scalability & Performance' },
  { name: 'GDG On Campus', role: 'Lead Organizer', desc: 'Developer Community Mentorship' },
];

const interests = [
  { name: 'Generative AI', icon: Cpu },
  { name: 'Retrieval-Augmented Generation (RAG)', icon: Cpu },
  { name: 'Full Stack Development', icon: Code },
  { name: 'Cloud Computing', icon: Cloud },
  { name: 'Research & Engineering', icon: FileText },
  { name: 'Developer Advocacy', icon: Users },
  { name: 'Open Source', icon: Code },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-black/20">
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
            About Me
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-12 h-1 bg-primary rounded-full"
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Column 1: Summary & Affiliations */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <Card className="flex-1 flex flex-col justify-center">
              <h3 className="text-xl font-display font-semibold text-white mb-4">
                Who is Akash Satpute?
              </h3>
              <p className="text-muted text-base leading-relaxed mb-6">
                Akash Satpute is an ambitious Computer Engineering student with hands-on experience in Artificial Intelligence, Full Stack Development, Cloud Computing, and Developer Communities.
              </p>
              <p className="text-muted text-base leading-relaxed">
                Currently specializing in building intelligent systems, optimizing application latencies, and managing large developer teams to bridge the gap between complex algorithms and intuitive user experiences.
              </p>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {organizations.map((org, idx) => (
                <Card key={idx} hoverGlow={false} className="p-4 flex flex-col justify-center text-center border-border/80 bg-white/[0.02] hover:bg-white/[0.04]">
                  <h4 className="text-sm font-display font-bold text-white mb-0.5">{org.name}</h4>
                  <span className="text-[11px] text-primary font-medium mb-1.5 block">{org.role}</span>
                  <p className="text-[10px] text-muted leading-snug">{org.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Column 2: Highlights & Technical Interests */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <Card className="h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-display font-semibold text-white mb-6">
                  Core Interests & Focus
                </h3>
                <div className="flex flex-col gap-4">
                  {interests.map((interest, idx) => {
                    const Icon = interest.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3.5"
                      >
                        <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-muted hover:text-white transition-colors">
                          {interest.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action/Recruiter Tip */}
              <div className="mt-8 p-3.5 rounded-lg border border-border bg-black/40 text-[11px] text-muted flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span>
                  Seeking B.Tech placement opportunities, software engineering positions, or research internship positions starting late 2025/2026.
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
