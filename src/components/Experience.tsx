'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './ui/Card';
import {
  Calendar,
  Briefcase,
  ChevronRight,
  Code,
  Zap,
  Users,
  Globe,
  FileJson,
  Terminal,
  Settings,
  Key,
  FolderOpen
} from 'lucide-react';

// ─── Experience Data ───────────────────────────────────────────────────────────
const experiences = [
  {
    id: 'cdac',
    position: 'Project Intern',
    organization: 'C-DAC',
    fullOrg: 'Centre for Development of Advanced Computing',
    duration: '2025 – 2026',
    yearRange: '2025 - 2026',
    icon: Code,
    color: '#00f0ff',
    colorRgb: '0,240,255',
    tag: 'AI & ML Systems',
    fileName: 'cdac.json',
    fileType: 'json',
    highlights: [
      'Built intelligent RAG-based AI chatbot systems and ingestion frameworks.',
      'Implemented custom vector search pipelines using dense embeddings.',
      'Worked with local embedding generators and open Large Language Models.',
      'Developed extensible document ingestion and text preprocessing modules.',
      'Improved organizational knowledge accessibility and search accuracy.',
    ],
    techStack: ['Python', 'RAG', 'Vector DB', 'LLMs', 'Embeddings'],
  },
  {
    id: 'pw',
    position: 'Product Development Intern',
    organization: 'Physics Wallah',
    fullOrg: 'Physics Wallah (PW)',
    duration: 'Nov 2024 – Feb 2025',
    yearRange: '2024 - 2025',
    icon: Zap,
    color: '#a855f7',
    colorRgb: '168,85,247',
    tag: 'Full Stack Dev',
    fileName: 'physics_wallah.log',
    fileType: 'log',
    highlights: [
      'Developed responsive healthcare platforms and administrative tools.',
      'Constructed multiple production-ready Proof of Concepts for key features.',
      'Analyzed code structures to optimize database interactions and system loads.',
      'Successfully reduced platform API and UI latency by 15% overall.',
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Latency Optimization'],
  },
  {
    id: 'gdg',
    position: 'GDG On Campus Lead',
    organization: 'GDG On Campus PCE',
    fullOrg: 'Google Developer Groups On Campus - Pillai College of Engineering',
    duration: 'Aug 2023 – Present',
    yearRange: '2023 - Present',
    icon: Users,
    color: '#3b82f6',
    colorRgb: '59,130,246',
    tag: 'Tech Leadership',
    fileName: 'gdg_on_campus.conf',
    fileType: 'conf',
    highlights: [
      'Managed and mentored a technical core team of 50+ members.',
      'Conceptualized and organized 15+ student workshops, study groups, and hackathons.',
      'Conducted interactive technical workshops on web standards and Google Cloud.',
      'Impacted over 2000+ students, creating an active developer hub on campus.',
    ],
    techStack: ['Community Leadership', 'Google Cloud', 'Web Standards', 'Mentoring'],
  },
  {
    id: 'oasis',
    position: 'Web Developer Intern',
    organization: 'Oasis Infobyte',
    fullOrg: 'Oasis Infobyte Tech Solutions',
    duration: 'Oct 2023 – Nov 2023',
    yearRange: '2023',
    icon: Globe,
    color: '#10b981',
    colorRgb: '16,185,129',
    tag: 'Frontend Engineering',
    fileName: 'oasis_infobyte.env',
    fileType: 'env',
    highlights: [
      'Built and deployed lightweight, highly responsive client websites.',
      'Iterated on designs to enhance user experience and cross-device usability.',
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'UI/UX'],
  },
];

// ─── Animation Motion Variants ────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 16,
    },
  },
} as const;

// ─── Module 1: Interactive digital HUD Year panel ──────────────────────────────
// ─── Modules 2-5: Standalone Selector Node ───────────────────────────────────
function ExperienceFileNode({
  exp,
  isActive,
  isHovered,
  onHover,
  onClick,
  isLast,
}: {
  exp: (typeof experiences)[0];
  isActive: boolean;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
  onClick: () => void;
  isLast: boolean;
}) {
  const FileIcon = exp.fileType === 'json' ? FileJson : exp.fileType === 'log' ? Terminal : exp.fileType === 'conf' ? Settings : Key;

  return (
    <div className="w-full relative pl-8 select-none">
      {/* ─── Cyber Folder Connector Lines ─── */}
      {/* Vertical connector segment */}
      <div
        className="absolute left-[14px] top-0 w-[1.5px] transition-colors duration-500 pointer-events-none"
        style={{
          bottom: isLast ? '50%' : 0,
          backgroundColor: isActive
            ? exp.color
            : isHovered
              ? `rgba(${exp.colorRgb}, 0.35)`
              : 'rgba(255,255,255,0.08)',
        }}
      />
      {/* Horizontal connector segment */}
      <div
        className="absolute left-[14px] top-1/2 w-4.5 h-[1.5px] transition-colors duration-500 pointer-events-none"
        style={{
          backgroundColor: isActive
            ? exp.color
            : isHovered
              ? `rgba(${exp.colorRgb}, 0.35)`
              : 'rgba(255,255,255,0.08)',
        }}
      />

      <motion.button
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        onClick={onClick}
        animate={{
          x: isHovered ? 4 : 0,
        }}
        whileTap={{ y: 0.01, transition: { duration: 3, ease: 'easeOut' } }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
        className="w-full flex items-center justify-between p-2.5 my-1 rounded-xl border text-left cursor-pointer transition-all duration-300 relative overflow-hidden bg-transparent group"
        style={{
          borderColor: isActive ? `rgba(${exp.colorRgb}, 0.35)` : 'transparent',
          backgroundColor: isActive ? `rgba(${exp.colorRgb}, 0.05)` : 'transparent',
        }}
      >
        {/* Left brand neon indicator line */}
        {isActive && (
          <div
            className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-l-xl"
            style={{ background: exp.color }}
          />
        )}

        {/* Body content - Stacked Layout to prevent overlaps */}
        <div className="flex flex-col gap-2 relative z-10 w-full min-w-0">

          {/* Top Row: Icon + Organization (Left) & Date + Active Indicator (Right) */}
          <div className="flex items-center justify-between w-full gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 shrink-0"
                style={{
                  borderColor: isActive ? `rgba(${exp.colorRgb}, 0.4)` : 'rgba(255,255,255,0.08)',
                  background: isActive ? `rgba(${exp.colorRgb}, 0.12)` : 'rgba(255,255,255,0.02)',
                }}
              >
                <FileIcon
                  className="w-4 h-4 transition-colors duration-300"
                  style={{ color: isActive ? exp.color : 'rgba(255,255,255,0.4)' }}
                />
              </div>

              <span
                className="text-xs sm:text-sm font-mono font-bold transition-colors duration-300 leading-snug"
                style={{
                  color: isActive ? '#ffffff' : isHovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.7)',
                }}
              >
                {exp.organization}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[9px] sm:text-[10px] font-mono text-white/35 group-hover:text-white/55 transition-colors uppercase whitespace-nowrap">
                {exp.duration.split('–')[0]?.trim() || exp.duration}
              </span>

              {isActive ? (
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse ml-0.5"
                  style={{
                    background: exp.color,
                    boxShadow: `0 0 8px ${exp.color}`,
                  }}
                />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-white/10 group-hover:text-white/30 transition-all opacity-0 group-hover:opacity-100 ml-0.5" />
              )}
            </div>
          </div>

          {/* Bottom Row: Position / Role Badge (Aligned under Organization Name) */}
          <div className="flex items-center pl-[38px] w-full">
            <span
              className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border transition-all duration-300 leading-tight text-center"
              style={{
                color: isActive ? '#ffffff' : isHovered ? exp.color : 'rgba(255,255,255,0.4)',
                borderColor: isActive ? `rgba(${exp.colorRgb}, 0.3)` : isHovered ? `rgba(${exp.colorRgb}, 0.15)` : 'rgba(255,255,255,0.05)',
                background: isActive ? `rgba(${exp.colorRgb}, 0.15)` : isHovered ? `rgba(${exp.colorRgb}, 0.04)` : 'rgba(255,255,255,0.01)',
              }}
            >
              {exp.position}
            </span>
          </div>

        </div>
      </motion.button>
    </div>
  );
}

// ─── Module 7: Holographic detail card (Right Column) ──────────────────────
function InteractiveDetailCard({ exp }: { exp: (typeof experiences)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // States for 3D tilt and mouse flashlight spotlights
  const [flashlight, setFlashlight] = useState({ x: 0, y: 0 });
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    setFlashlight({ x: mouseX, y: mouseY });

    // Subtle 3D tilt calculation (max 6.5 degrees)
    const rX = -((mouseY - height / 2) / (height / 2)) * 6.5;
    const rY = ((mouseX - width / 2) / (width / 2)) * 6.5;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full relative"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 20,
          mass: 0.8,
        }}
        className="w-full h-full relative"
      >
        <Card
          hoverGlow={false}
          className="transition-all duration-500 border-white/5 bg-[#030307]/75 backdrop-blur-xl relative overflow-hidden p-6 md:p-8 flex flex-col justify-between h-full min-h-[440px] select-text"
          style={{
            boxShadow: `0 20px 50px -10px rgba(${exp.colorRgb}, 0.12), inset 0 0 0 1px rgba(${exp.colorRgb}, 0.25)`,
            borderColor: exp.color,
          }}
        >
          {/* Laser Scanning Line Overlay */}
          <motion.div
            className="absolute left-0 right-0 h-[2px] pointer-events-none z-20"
            style={{
              background: `linear-gradient(90deg, transparent, ${exp.color}, transparent)`,
              boxShadow: `0 0 8px ${exp.color}`,
            }}
            animate={{
              top: ['0%', '100%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 4.0,
              ease: 'linear',
            }}
          />

          {/* Flashlight Spotlight Overlay */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
            style={{
              opacity: isMouseOver ? 1 : 0,
              background: `radial-gradient(220px circle at ${flashlight.x}px ${flashlight.y}px, rgba(${exp.colorRgb}, 0.1), transparent 80%)`,
            }}
          />

          {/* Brand Accent Top Border Line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2.5px] transition-all duration-300 z-10"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${exp.color} 50%, transparent 100%)`,
            }}
          />

          {/* Animating Contents */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 flex flex-col justify-between h-full flex-1"
          >
            <div>
              {/* Card Header */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300"
                    style={{
                      borderColor: `rgba(${exp.colorRgb}, 0.25)`,
                      background: `rgba(${exp.colorRgb}, 0.12)`,
                      boxShadow: `0 0 16px rgba(${exp.colorRgb}, 0.2)`,
                    }}
                  >
                    <exp.icon className="w-6 h-6" style={{ color: exp.color }} />
                  </div>
                  <div>
                    <span
                      className="inline-block text-[9px] font-mono font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full mb-1"
                      style={{
                        color: exp.color,
                        background: `rgba(${exp.colorRgb}, 0.1)`,
                        border: `1px solid rgba(${exp.colorRgb}, 0.15)`,
                      }}
                    >
                      {exp.tag}
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-black text-white leading-tight">
                      {exp.position}
                    </h3>
                    <p className="text-sm font-bold mt-0.5" style={{ color: exp.color }}>
                      {exp.fullOrg}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-[11px] text-white/50 font-mono whitespace-nowrap">
                  <Calendar className="w-3.5 h-3.5 opacity-70 animate-pulse" style={{ color: exp.color }} />
                  {exp.duration}
                </div>
              </motion.div>

              {/* Divider */}
              <motion.div variants={itemVariants} className="h-px bg-white/5 my-5" />

              {/* Highlights */}
              <motion.ul variants={containerVariants} className="space-y-3.5 pl-1">
                {exp.highlights.map((bullet, idx) => (
                  <motion.li
                    key={idx}
                    variants={itemVariants}
                    className="flex items-start gap-3.5 text-sm text-white/50 leading-relaxed hover:text-white/75 transition-colors duration-200"
                  >
                    <ChevronRight
                      className="w-4.5 h-4.5 shrink-0 mt-0.5"
                      style={{ color: exp.color }}
                    />
                    <span>{bullet}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Tech stack tags footer */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 mt-8 pt-4 border-t border-white/5">
              <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest mr-1">
                Technology Stack:
              </span>
              {exp.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-white/70 text-[10px] font-mono font-medium transition-all hover:bg-white/10 hover:border-white/15"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────
export default function Experience() {
  const [activeId, setActiveId] = useState<string>('cdac');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // States & Ref for Left Panel cursor-tracking tilt + neon glow
  const consoleRef = useRef<HTMLDivElement>(null);
  const [consoleGlow, setConsoleGlow] = useState({ x: 0, y: 0 });
  const [isConsoleHovered, setIsConsoleHovered] = useState(false);
  const [consoleRotateX, setConsoleRotateX] = useState(0);
  const [consoleRotateY, setConsoleRotateY] = useState(0);

  // Refs for mobile scroll container & timeline container
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  const chronologicalExps = experiences;
  const activeIndex = chronologicalExps.findIndex((e) => e.id === activeId);

  // Scroll active timeline node into view when activeId changes
  useEffect(() => {
    if (timelineRef.current) {
      const activeNode = timelineRef.current.querySelector(`[data-timeline-id="${activeId}"]`);
      if (activeNode) {
        activeNode.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeId]);

  // Handle timeline node clicks
  const handleTimelineNodeClick = (id: string) => {
    setActiveId(id);
    if (scrollContainerRef.current) {
      const element = scrollContainerRef.current.querySelector(`[data-card-id="${id}"]`);
      if (element) {
        isScrollingRef.current = true;
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 600);
      }
    }
  };

  // Sync scroll of cards on mobile back to timeline
  const handleScroll = () => {
    if (isScrollingRef.current) return;
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const clientWidth = container.clientWidth;
    if (clientWidth === 0) return;

    const index = Math.round(scrollLeft / clientWidth);
    const targetExp = chronologicalExps[index];
    if (targetExp && targetExp.id !== activeId) {
      setActiveId(targetExp.id);
    }
  };

  const handleConsoleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!consoleRef.current) return;
    const rect = consoleRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setConsoleGlow({ x: mouseX, y: mouseY });

    // Subtle 3D tilt for the left panel (max 3.5 degrees)
    const rX = -((mouseY - height / 2) / (height / 2)) * 3.5;
    const rY = ((mouseX - width / 2) / (width / 2)) * 3.5;
    setConsoleRotateX(rX);
    setConsoleRotateY(rY);
  };

  const handleConsoleMouseLeave = () => {
    setIsConsoleHovered(false);
    setConsoleRotateX(0);
    setConsoleRotateY(0);
  };

  const activeExp = experiences.find((e) => e.id === activeId) || experiences[0];
  const activeColorRgb = activeExp.colorRgb;

  return (
    <section
      id="experience"
      className="relative overflow-hidden py-24 transition-colors duration-1000 select-none"
      style={{
        background: `radial-gradient(circle 800px at 50% 50%, rgba(${activeColorRgb}, 0.05), transparent 75%), #020205`,
      }}
    >
      {/* Background Cyber blueprint grid */}
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-[1240px] w-full mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-indigo-400 bg-indigo-500/[0.08] border border-indigo-500/[0.15] rounded-full px-4 py-1.5 mb-4 shadow-sm"
          >
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            Professional Journey
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight">
            Work{' '}
            <span
              className="text-transparent bg-clip-text transition-all duration-[1000ms]"
              style={{
                backgroundImage: `linear-gradient(135deg, ${activeExp.color} 0%, #ffffff 100%)`,
              }}
            >
              Experience
            </span>
          </h2>
        </div>

        {/* Journey Timeline (Reverse Chronological present -> past) */}
        <div 
          className="w-full mb-16 select-none overflow-x-auto [&::-webkit-scrollbar]:hidden scroll-smooth" 
          ref={timelineRef}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="min-w-[500px] md:min-w-0 md:max-w-4xl mx-auto px-4 relative py-6">
            {/* Timeline track line */}
            <div className="absolute left-[12.5%] right-[12.5%] top-[40px] h-[2px] bg-white/10 -translate-y-1/2 z-0" />
            
            {/* Animated Glowing track line */}
            <div className="absolute left-[12.5%] right-[12.5%] top-[40px] h-[2px] -translate-y-1/2 z-0 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00f0ff] via-[#a855f7] via-[#3b82f6] to-[#10b981]"
                style={{
                  width: `${(activeIndex / (experiences.length - 1)) * 100}%`,
                  boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
                }}
                animate={{
                  width: `${(activeIndex / (experiences.length - 1)) * 100}%`,
                }}
                transition={{ type: 'spring', stiffness: 60, damping: 15 }}
              />
            </div>

            {/* Timeline nodes */}
            <div className="flex justify-between relative z-10">
              {chronologicalExps.map((exp, idx) => {
                const isActive = activeId === exp.id;
                return (
                  <button
                    key={exp.id}
                    data-timeline-id={exp.id}
                    onClick={() => handleTimelineNodeClick(exp.id)}
                    className="flex-1 flex flex-col items-center cursor-pointer group outline-none bg-transparent border-none p-0 focus:outline-none"
                  >
                    {/* Year above dot */}
                    <span 
                      className="text-[10px] sm:text-xs font-mono font-bold mb-2.5 transition-all duration-300 block uppercase tracking-wider whitespace-nowrap"
                      style={{ 
                        color: isActive ? exp.color : 'rgba(255,255,255,0.3)',
                        textShadow: isActive ? `0 0 8px ${exp.color}40` : 'none'
                      }}
                    >
                      {exp.yearRange}
                    </span>

                    {/* Glowing dot container */}
                    <div className="relative flex items-center justify-center">
                      <div
                        className="w-6 h-6 rounded-full border-2 flex items-center justify-center bg-[#020205] transition-all duration-500 relative z-10"
                        style={{
                          borderColor: isActive ? exp.color : 'rgba(255,255,255,0.15)',
                          boxShadow: isActive ? `0 0 14px ${exp.color}` : 'none',
                        }}
                      >
                        <div
                          className="w-2.5 h-2.5 rounded-full transition-all duration-500"
                          style={{
                            backgroundColor: isActive ? exp.color : 'rgba(255,255,255,0.2)',
                          }}
                        />
                      </div>

                      {/* Additional pulse ring when active */}
                      {isActive && (
                        <span 
                          className="absolute w-10 h-10 rounded-full animate-ping pointer-events-none opacity-20"
                          style={{ backgroundColor: exp.color }}
                        />
                      )}
                    </div>

                    {/* Company below dot */}
                    <span 
                      className="text-[10px] sm:text-xs font-mono font-bold mt-2.5 text-center max-w-[100px] sm:max-w-[120px] transition-all duration-300 block leading-tight"
                      style={{ 
                        color: isActive ? '#ffffff' : 'rgba(255,255,255,0.5)',
                        transform: isActive ? 'scale(1.05)' : 'scale(1)'
                      }}
                    >
                      {exp.organization}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Widescreen Dashboard Grid Layout (Desktop only) */}
        <div className="hidden md:grid grid-cols-12 gap-8 lg:gap-12 items-stretch">

          {/* ═══════════════════════════════════════════════════════
               LEFT PANEL: Interactive Control Console (col-span-5)
          ═══════════════════════════════════════════════════════ */}
          <div
            className="md:col-span-5 flex flex-col justify-stretch"
            style={{ perspective: '1000px' }}
          >
            <motion.div
              animate={{
                rotateX: consoleRotateX,
                rotateY: consoleRotateY,
              }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 20,
                mass: 0.8,
              }}
              className="w-full h-full"
            >
              <div
                ref={consoleRef}
                onMouseMove={handleConsoleMouseMove}
                onMouseEnter={() => setIsConsoleHovered(true)}
                onMouseLeave={handleConsoleMouseLeave}
                className="w-full h-full rounded-2xl border bg-[#040407]/95 p-5 md:p-6 flex flex-col justify-between min-h-[440px] relative overflow-hidden transition-all duration-500"
                style={{
                  borderColor: `rgba(${activeColorRgb}, 0.25)`,
                  boxShadow: `0 20px 45px -10px rgba(${activeColorRgb}, 0.08), inset 0 0 12px rgba(${activeColorRgb}, 0.03)`,
                }}
              >
                {/* Brand Accent Top Border Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2.5px] transition-all duration-500 z-20"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${activeExp.color} 50%, transparent 100%)`,
                  }}
                />

                {/* Subtle cursor-tracking radial glow */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
                  style={{
                    opacity: isConsoleHovered ? 1 : 0,
                    background: `radial-gradient(200px circle at ${consoleGlow.x}px ${consoleGlow.y}px, rgba(${activeColorRgb}, 0.08), transparent 80%)`,
                  }}
                />

                {/* Inner wrapper to structure the card contents */}
                <div className="flex flex-col relative z-20">
                  {/* Explorer Header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      {/* Mock red/yellow/green terminal dots */}
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                        <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-2">
                        Explorer: Experience
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-white/20 tracking-wider">
                      FILES
                    </span>
                  </div>

                  {/* Timeline display integrated directly under header */}
                  <div className="border-b border-white/5 pb-3.5 mb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block mb-0.5">
                        Timeline
                      </span>
                      <div className="text-xl font-mono font-bold tracking-tight text-white flex items-center gap-1.5">
                        {(() => {
                          const yearRange = activeExp.yearRange || '2023';
                          const years = yearRange.split(' ');
                          const startYear = years[0] || '2023';
                          const hasRange = yearRange.includes('-');
                          const endYear = hasRange ? (years[years.length - 1] || 'Present') : '';
                          return (
                            <>
                              <span style={{ color: activeExp.color }}>{startYear}</span>
                              {hasRange && (
                                <>
                                  <span className="text-white/20">→</span>
                                  <span className="text-white/50">{endYear}</span>
                                </>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block mb-0.5">
                        Organization
                      </span>
                      <span
                        className="text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-500"
                        style={{ color: activeExp.color }}
                      >
                        {activeExp.organization}
                      </span>
                    </div>
                  </div>

                  {/* Folder Node */}
                  <div className="flex items-center gap-2 px-1 py-1.5 text-xs font-mono font-bold text-white/50 select-none mb-1">
                    <FolderOpen className="w-4 h-4 text-white/40 transition-colors duration-500" style={{ color: activeExp.color }} />
                    <span>experience/</span>
                  </div>

                  {/* Directory Tree Files list */}
                  <div className="flex flex-col mt-1">
                    {experiences.map((exp, idx) => {
                      const isLast = idx === experiences.length - 1;
                      return (
                        <ExperienceFileNode
                          key={exp.id}
                          exp={exp}
                          isActive={activeId === exp.id}
                          isHovered={hoveredId === exp.id}
                          onHover={(hovered) => setHoveredId(hovered ? exp.id : null)}
                          onClick={() => setActiveId(exp.id)}
                          isLast={isLast}
                        />
                      );
                    })}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          {/* ═══════════════════════════════════════════════════════
               RIGHT PANEL: 3D Tilting Details Card (col-span-7)
          ═══════════════════════════════════════════════════════ */}
          <div className="md:col-span-7 flex flex-col justify-stretch">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="w-full h-full"
              >
                <InteractiveDetailCard exp={activeExp} />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Mobile View Layout (Mobile only) */}
        <div className="flex md:hidden flex-col w-full">
          {/* Mobile Cards Horizontal Scroll */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 px-4 w-full scroll-smooth [&::-webkit-scrollbar]:hidden"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {chronologicalExps.map((exp) => (
              <div
                key={exp.id}
                data-card-id={exp.id}
                className="w-[85vw] sm:w-[75vw] shrink-0 snap-center"
              >
                <InteractiveDetailCard exp={exp} />
              </div>
            ))}
          </div>

          {/* Swipe Indicator & Pagination dots */}
          <div className="flex flex-col items-center gap-3.5 mt-2 select-none">
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2.5">
              {chronologicalExps.map((exp, idx) => {
                const isActive = activeId === exp.id;
                return (
                  <button
                    key={exp.id}
                    onClick={() => handleTimelineNodeClick(exp.id)}
                    className="h-1.5 rounded-full transition-all duration-300 border-none outline-none"
                    style={{
                      width: isActive ? '20px' : '6px',
                      backgroundColor: isActive ? exp.color : 'rgba(255, 255, 255, 0.15)',
                      boxShadow: isActive ? `0 0 8px ${exp.color}` : 'none',
                    }}
                  />
                );
              })}
            </div>
            
            {/* Micro-animated Swipe Instruction */}
            <div className="flex items-center gap-1 text-[9px] font-mono tracking-[0.2em] text-white/30 uppercase animate-pulse">
              <span>Swipe to explore</span>
              <motion.div
                animate={{
                  x: [0, 4, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'easeInOut',
                }}
              >
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
             STATISTICS ROW
        ═══════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-20 max-w-4xl mx-auto"
        >
          {[
            { label: 'Total Companies', value: '4+' },
            { label: 'Latency Optimized', value: '15%' },
            { label: 'Students Impacted', value: '2000+' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04, y: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="rounded-2xl border border-white/5 bg-[#030307]/50 p-5 text-center backdrop-blur-md transition-all duration-500 shadow-xl group cursor-default"
              style={{
                borderColor: `rgba(${activeColorRgb}, 0.1)`,
                boxShadow: `0 10px 30px -10px rgba(${activeColorRgb}, 0.04)`,
              }}
            >
              <div
                className="text-3xl md:text-4xl font-display font-black transition-all duration-[1000ms]"
                style={{ color: activeExp.color }}
              >
                {stat.value}
              </div>
              <div className="text-[10px] font-mono font-bold text-white/35 uppercase tracking-widest mt-1.5">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
