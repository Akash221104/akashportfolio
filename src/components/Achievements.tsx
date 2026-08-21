'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from './ui/Card';
import { Award, GraduationCap, Calendar, CheckCircle2, Bookmark } from 'lucide-react';

const achievements = [
  'GDG On Campus Lead Organizer',
  'Microsoft Learn Student Ambassador',
  'Physics Wallah Internship Completion',
  'C-DAC Project Internship Appointment',
  '15+ Google Cloud Skill Badges Earned',
  'Organized National-Level Hackathons',
  'Community Leadership Initiatives',
  'End-to-End AI Application Development',
];

const certifications = [
  { name: 'Google Cloud Skill Badges (15+)', issuer: 'Google Cloud' },
  { name: 'Data Structures and System Design', issuer: 'AlgoAcademy' },
  { name: 'Cybersecurity Foundations', issuer: 'Palo Alto Networks' },
  { name: 'Figma Motion Design', issuer: 'Figma Academy' },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 md:px-12 bg-black/20">
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
            Education & Milestones
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-12 h-1 bg-primary rounded-full"
          />
        </div>

        {/* Multi-Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Column 1: Education (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <Card className="h-full border-border bg-card flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-transparent" />
              <div>
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-white">
                    Education
                  </h3>
                </div>

                <div className="space-y-5">
                  {/* NIT Patna - Featured #1 Education Entry */}
                  <div className="p-4 rounded-xl border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-950/40 via-zinc-950/80 to-teal-950/40 shadow-[0_0_20px_rgba(16,185,129,0.18)] relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-400 via-teal-400 to-transparent" />
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shadow-[0_0_10px_rgba(52,211,153,0.3)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        LATEST DEGREE • PURSUING
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400/80 font-bold uppercase tracking-wider">
                        NIT PATNA
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-display font-black text-white leading-tight mb-1 group-hover:text-emerald-300 transition-colors">
                      National Institute of Technology Patna
                    </h4>
                    
                    <div className="text-xs font-bold text-emerald-400 tracking-wide mb-1">
                      Master of Technology (M.Tech)
                    </div>

                    <div className="inline-block px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-semibold text-emerald-200 mb-2">
                      🛡️ Specialization: Cyber Security
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Current Student</span>
                    </div>
                  </div>

                  {/* Pillai College of Engineering - Second Education Entry */}
                  <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-display font-bold text-white leading-tight">
                        Pillai College of Engineering
                      </h4>
                      <span className="text-[10px] font-mono text-muted">2022 – 2026</span>
                    </div>
                    <span className="text-xs text-sky-400 font-semibold block">
                      Bachelor of Technology (B.Tech)
                    </span>
                    <span className="text-xs text-muted block">
                      Branch: Computer Engineering
                    </span>
                  </div>
                </div>
              </div>

              {/* CGPA display box */}
              <div className="mt-6 p-4 rounded-xl border border-border bg-white/[0.01] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Academic standing</span>
                  <span className="text-xs text-white font-medium">B.Tech 8.9+ CGPA • NIT Patna Scholar</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-display font-black text-gradient-primary">
                    8.9+
                  </span>
                  <span className="text-[10px] text-muted block mt-0.5">B.Tech CGPA</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Column 2: Milestones & Certifications (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-between h-full">
            {/* Achievements lists */}
            <Card className="flex-1 border-border bg-card relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-secondary to-transparent" />
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-display font-bold text-white">
                  Key Achievements
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {achievements.map((ach, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-muted leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Certifications lists */}
            <Card className="flex-1 border-border bg-card relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-secondary" />
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <Bookmark className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-display font-bold text-white">
                  Certifications
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-border/60 bg-white/[0.01] flex flex-col justify-center"
                  >
                    <span className="text-xs font-semibold text-white leading-tight">
                      {cert.name}
                    </span>
                    <span className="text-[10px] text-muted mt-1">
                      Issuer: {cert.issuer}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
