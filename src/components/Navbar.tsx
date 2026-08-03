'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Button from './ui/Button';

const navItems = [
  { name: 'About', href: '/#about' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Blog', href: 'https://akashblogss.hashnode.dev/', external: true },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on path changes during render phase to avoid extra effect renders
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-navbar py-4 shadow-lg shadow-black/20'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-display font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
        >
          AKASH<span className="text-primary">.</span>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            if (item.external) {
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium transition-colors hover:text-white text-muted"
                >
                  {item.name}
                </a>
              );
            }
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-white ${
                  isActive ? 'text-primary' : 'text-muted'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          
          <a
            href="https://www.linkedin.com/in/akash-satpute-548b5a256/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="sm" className="gap-1.5 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              Connect
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1 text-muted hover:text-white focus:outline-none cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-950/98 backdrop-blur-2xl border-b border-sky-500/20 absolute top-full left-0 w-full overflow-hidden z-50 shadow-2xl shadow-black"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => {
                if (item.external) {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-muted hover:text-white transition-colors py-2"
                    >
                      {item.name}
                    </a>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium text-muted hover:text-white transition-colors py-2"
                  >
                    {item.name}
                  </Link>
                );
              })}
              <a
                href="https://www.linkedin.com/in/akash-satpute-548b5a256/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-2"
              >
                <Button variant="primary" className="w-full gap-1.5 justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  Connect
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
