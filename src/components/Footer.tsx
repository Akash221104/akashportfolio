'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/Icons';
import dynamic from 'next/dynamic';

// ssr: false ensures this never runs on the server — it reads localStorage/sessionStorage
const VisitorCounter = dynamic(() => import('./VisitorCounter'), { ssr: false });

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-black py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Profile Branding */}
        <div className="text-center md:text-left">
          <Link href="/" className="text-lg font-display font-bold text-white">
            Akash Satpute
          </Link>
          <p className="text-xs text-muted mt-1 max-w-sm">
            AI Engineer | Full Stack Developer | Community Leader
          </p>
        </div>

        {/* Technical Stack Description */}
        <div className="flex flex-col items-center md:items-center text-center">
          <p className="text-xs text-muted flex items-center gap-1 justify-center">
            Built with Next.js, TypeScript, Tailwind, & Framer Motion
          </p>
          <p className="text-[10px] text-muted/60 mt-1">
            Deployed on Vercel
          </p>
        </div>

        {/* Social Navigation */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/Akash221104"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/akash-satpute-548b5a256/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-white transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://akashblogss.hashnode.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-white transition-colors"
            aria-label="Hashnode Blog"
          >
            <BookOpen className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto text-center border-t border-border/40 mt-8 pt-6">
        <VisitorCounter />
        <p className="text-xs text-muted/50 flex items-center justify-center gap-1">
          &copy; {currentYear} Akash Satpute. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
