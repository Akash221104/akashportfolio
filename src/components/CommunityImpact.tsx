'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from './ui/Card';
import { Users, Presentation, CalendarRange, Trophy, Laptop } from 'lucide-react';

const stats = [
  {
    value: '2000+',
    label: 'Students Reached',
    desc: 'Empowered student developers with core technical insights.',
    icon: Users,
    color: 'text-blue-400',
  },
  {
    value: '15+',
    label: 'Events Organized',
    desc: 'Conducted Cloud study jams, Android loops, and build camps.',
    icon: CalendarRange,
    color: 'text-purple-400',
  },
  {
    value: '8+',
    label: 'Workshops Led',
    desc: 'Hands-on coding bootcamps on Next.js, Cloud deployments, and Git.',
    icon: Presentation,
    color: 'text-emerald-400',
  },
  {
    value: '2',
    label: 'Hackathons Hosted',
    desc: 'Organized national-level build-a-thons and local prototyping sprints.',
    icon: Trophy,
    color: 'text-rose-400',
  },
];

const highlights = [
  {
    title: 'Developer Community Building',
    detail: 'Cultivated an active ecosystem at PCE, connecting senior developers, alumni, and industry professionals directly with student teams.',
  },
  {
    title: 'Hands-on Technical Mentorship',
    detail: 'Conducted continuous 1-on-1 and group guidance sessions on software engineering roadmap choices, Cloud basics, and resume building.',
  },
  {
    title: 'Collaborative Open Source Focus',
    detail: 'Championed contribution drives on GitHub, helping students make their first pull requests and collaborate on shared software assemblies.',
  },
];

export default function CommunityImpact() {
  return (
    <section id="community" className="py-24 px-6 md:px-12 bg-black/40">
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
            Community Impact
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-12 h-1 bg-primary rounded-full"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <Card
                key={idx}
                delay={idx * 0.05}
                className="border-border bg-card p-6 flex flex-col justify-between text-center items-center hover:border-primary/20"
              >
                <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center ${stat.color} mb-6`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className={`text-3xl font-display font-black tracking-tight ${stat.color} block mb-2`}>
                    {stat.value}
                  </span>
                  <h3 className="text-sm font-display font-bold text-white mb-2 uppercase tracking-wider">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Highlight details panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {highlights.map((high, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-border bg-white/[0.01] flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                <Laptop className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-display font-bold text-white mb-2">
                  {high.title}
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  {high.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
