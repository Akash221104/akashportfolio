'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';
import DoorTransitionWrapper from '@/components/DoorTransitionWrapper';
import dynamic from 'next/dynamic';
import LazySection from '@/components/LazySection';
import ScrollReveal from '@/components/ScrollReveal';

// Dynamically import below-the-fold components with SSR disabled to optimize chunk size and execution time
const Experience = dynamic(() => import('@/components/Experience'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects'), { ssr: false });
const Achievements = dynamic(() => import('@/components/Achievements'), { ssr: false });
const CommunityImpact = dynamic(() => import('@/components/CommunityImpact'), { ssr: false });
const TechnicalWriting = dynamic(() => import('@/components/TechnicalWriting'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });
const AskAkashAI = dynamic(() => import('@/components/AskAkashAI'), { ssr: false });

export default function Home() {
  return (
    <DoorTransitionWrapper>
      <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Navigation Header */}
        <Navbar />

        {/* Main Sections */}
        <main className="flex-1">
          <Hero />
          
          <ScrollReveal>
            <div>
              <About />
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <div id="experience">
              <LazySection fallbackHeight="min-h-[600px]">
                <Experience />
              </LazySection>
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <div id="projects">
              <LazySection fallbackHeight="min-h-[800px]">
                <Projects />
              </LazySection>
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <div id="skills">
              <Skills />
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <div id="achievements">
              <LazySection fallbackHeight="min-h-[500px]">
                <Achievements />
              </LazySection>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <LazySection fallbackHeight="min-h-[400px]">
              <CommunityImpact />
            </LazySection>
          </ScrollReveal>

          <ScrollReveal>
            <LazySection fallbackHeight="min-h-[500px]">
              <TechnicalWriting />
            </LazySection>
          </ScrollReveal>

          <ScrollReveal>
            <div id="contact">
              <LazySection fallbackHeight="min-h-[600px]">
                <Contact />
              </LazySection>
            </div>
          </ScrollReveal>
        </main>

        {/* Floating Chatbot Assistant */}
        <AskAkashAI />

        {/* Page Footer */}
        <Footer />
      </div>
    </DoorTransitionWrapper>
  );
}
