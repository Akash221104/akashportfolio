'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Card from './ui/Card';
import { Code2, Monitor, Server, Database, Cpu, Cloud, Settings, BarChart2 } from 'lucide-react';

const categories = [
  {
    id: 'programming',
    name: 'Programming',
    icon: Code2,
    skills: ['Java', 'Python', 'JavaScript', 'C', 'SQL', 'C++'],
  },
  {
    id: 'frontend',
    name: 'Frontend',
    icon: Monitor,
    skills: ['React', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'Framer Motion'],
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: Server,
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'],
  },
  {
    id: 'database',
    name: 'Databases',
    icon: Database,
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'ChromaDB'],
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    icon: Cpu,
    skills: ['RAG', 'LLM Integration', 'Vector Search', 'TensorFlow', 'Scikit-learn', 'Ollama'],
  },
  {
    id: 'cloud',
    name: 'Cloud Computing',
    icon: Cloud,
    skills: ['Google Cloud Platform', 'Vercel Deployment', 'CI/CD Pipelines'],
  },
  {
    id: 'tools',
    name: 'Tools & Design',
    icon: Settings,
    skills: ['Git', 'GitHub', 'Postman', 'Figma', 'VS Code'],
  },
  {
    id: 'analytics',
    name: 'Data Analytics',
    icon: BarChart2,
    skills: ['Data Analysis', 'Dashboard Development', 'Data Visualization', 'SQL Queries'],
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const blobY1 = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const filteredCategories = activeCategory === 'all' 
    ? categories 
    : categories.filter(c => c.id === activeCategory);

  return (
    <section ref={sectionRef} id="skills" className="relative py-24 px-6 md:px-12 bg-black/40 overflow-hidden">
      {/* Floating Parallax Background Blobs */}
      <motion.div
        style={{ y: blobY1 }}
        className="absolute -top-[10%] -right-[10%] w-[35vw] h-[35vw] rounded-full bg-secondary/5 blur-[120px] z-0 pointer-events-none"
      />
      <motion.div
        style={{ y: blobY2 }}
        className="absolute -bottom-[10%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[130px] z-0 pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mb-3"
          >
            Skills & Technologies
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-12 h-1 bg-primary rounded-full"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-primary border-primary text-white shadow-md shadow-primary/10'
                : 'bg-white/5 border-white/5 text-muted hover:text-white hover:border-muted'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-primary border-primary text-white shadow-md shadow-primary/10'
                  : 'bg-white/5 border-white/5 text-muted hover:text-white hover:border-muted'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredCategories.map((category, catIdx) => {
            const Icon = category.icon;
            
            return (
              <Card
                key={category.id}
                delay={catIdx * 0.05}
                className="border-border bg-card p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                      {category.name}
                    </h3>
                  </div>

                  {/* Skill Badge List */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: sIdx * 0.05 }}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                        className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-muted hover:text-white transition-all cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
