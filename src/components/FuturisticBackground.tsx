'use client';

import React, { useEffect, useRef } from 'react';

export default function FuturisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const parent = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let width = (canvas.width = parent.clientWidth);
    let height = (canvas.height = parent.clientHeight);

    // Particles setup
    const isMobile = width < 768;
    const particleCount = isMobile ? 35 : 75;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      pulseSpeed: number;
    }

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    // Moving light streaks setup
    interface LightStreak {
      y: number;
      x: number;
      length: number;
      speed: number;
      alpha: number;
    }

    const lightStreaks: LightStreak[] = [
      { y: height * 0.25, x: -200, length: 300, speed: 1.2, alpha: 0.15 },
      { y: height * 0.65, x: -400, length: 450, speed: 0.8, alpha: 0.12 },
      { y: height * 0.85, x: -150, length: 250, speed: 1.5, alpha: 0.18 },
    ];

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Layer 1: Dark Gradient Base
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#030712');
      bgGrad.addColorStop(0.5, '#070d1a');
      bgGrad.addColorStop(1, '#030712');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Layer 2: Blueprint Line Grid
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.035)';
      ctx.lineWidth = 1;
      const gridSize = 48;
      const gridOffsetY = (time * 8) % gridSize;

      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = gridOffsetY; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Layer 3: Animated Dot Grid Mesh
      const dotSpacing = isMobile ? 40 : 32;
      ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
      for (let x = dotSpacing / 2; x < width; x += dotSpacing) {
        for (let y = dotSpacing / 2; y < height; y += dotSpacing) {
          const distToMouse = mouseRef.current.active
            ? Math.hypot(x - mouseRef.current.x, y - mouseRef.current.y)
            : 999;

          let dotAlpha = 0.06;
          let dotRadius = 1;

          if (distToMouse < 140) {
            const factor = (140 - distToMouse) / 140;
            dotAlpha = 0.06 + factor * 0.45;
            dotRadius = 1 + factor * 1.5;
          }

          ctx.fillStyle = `rgba(56, 189, 248, ${dotAlpha})`;
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Layer 4: Soft Moving Cyan Light Streaks
      lightStreaks.forEach((streak) => {
        streak.x += streak.speed;
        if (streak.x - streak.length > width) {
          streak.x = -streak.length;
        }

        const streakGrad = ctx.createLinearGradient(
          streak.x - streak.length,
          streak.y,
          streak.x,
          streak.y
        );
        streakGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
        streakGrad.addColorStop(0.7, `rgba(56, 189, 248, ${streak.alpha})`);
        streakGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.fillStyle = streakGrad;
        ctx.fillRect(streak.x - streak.length, streak.y - 1, streak.length, 2);
      });

      // Layer 5: Floating Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.alpha += Math.sin(time * 5 + p.x) * p.pulseSpeed;
        const clampedAlpha = Math.max(0.1, Math.min(0.7, p.alpha));

        ctx.fillStyle = `rgba(96, 165, 250, ${clampedAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Layer 6: Cursor Spotlight Effect
      if (mouseRef.current.active) {
        const { x, y } = mouseRef.current;
        const spotlight = ctx.createRadialGradient(x, y, 0, x, y, 220);
        spotlight.addColorStop(0, 'rgba(59, 130, 246, 0.12)');
        spotlight.addColorStop(0.5, 'rgba(56, 189, 248, 0.04)');
        spotlight.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = spotlight;
        ctx.beginPath();
        ctx.arc(x, y, 220, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    // Pause when canvas off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationId) {
        render();
      }
    });
    observer.observe(canvas);

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Soft Ambient Corner Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-background/40 to-background/90 pointer-events-none" />
    </div>
  );
}
