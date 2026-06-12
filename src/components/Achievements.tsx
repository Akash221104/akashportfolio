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

                <div className="border-l-2 border-border/80 pl-4 space-y-1 ml-1">
                  <h4 className="text-base font-display font-bold text-white leading-tight">
                    Pillai College of Engineering
                  </h4>
                  <span className="text-xs text-primary font-semibold block">
                    Bachelor of Technology (B.Tech)
                  </span>
                  <span className="text-xs text-muted block">
                    Branch: Computer Engineering
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-muted/80 mt-2">
                    <Calendar className="w-3.5 h-3.5 text-muted" />
                    2022 – 2026
                  </div>
                </div>
              </div>

              {/* CGPA display box */}
              <div className="mt-8 p-4 rounded-xl border border-border bg-white/[0.01] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Academic standing</span>
                  <span className="text-xs text-white font-medium">Excellent rating</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-display font-black text-gradient-primary">
                    8.9+
                  </span>
                  <span className="text-[10px] text-muted block mt-0.5">CGPA Score</span>
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
