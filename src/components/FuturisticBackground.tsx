'use client';

import React, { useEffect, useRef } from 'react';

export default function FuturisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
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

    const isMobile = width < 768;

    // ── High-Density 3D Parallax Particle System ──
    const particleCount = isMobile ? 180 : 380;
    const colorPalette = [
      'rgba(56, 189, 248, ',  // Electric Cyan
      'rgba(168, 85, 247, ',  // Deep Violet
      'rgba(254, 224, 71, ',  // Celestial Gold
      'rgba(45, 212, 191, ',  // Teal
      'rgba(255, 255, 255, ',  // White Starlight
    ];

    interface ParallaxParticle {
      x: number;
      y: number;
      z: number;           // 3D Depth (0.2 = far, 3.5 = close)
      baseSize: number;
      color: string;
      alpha: number;
      twinkleSpeed: number;
      twinklePhase: number;
      driftVx: number;      // Subtle base drift
      driftVy: number;
    }

    const particles: ParallaxParticle[] = Array.from({ length: particleCount }, () => {
      const z = Math.random() * 3.3 + 0.2; // depth multiplier
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        baseSize: Math.random() * 1.5 + 0.5,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        alpha: Math.random() * 0.45 + 0.25,
        twinkleSpeed: Math.random() * 0.025 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        driftVx: (Math.random() - 0.5) * 0.12,
        driftVy: -0.2 - Math.random() * 0.15, // default gentle upward flow
      };
    });

    // ── Scroll Parallax Tracker ──
    let targetScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let currentScrollY = targetScrollY;
    let lastScrollY = targetScrollY;
    let scrollVelocity = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    // ── Interactive Shockwave Rings ──
    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
    }
    let ripples: Ripple[] = [];

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

    const handleTouchMove = (e: TouchEvent) => {
      if (!canvas || e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        maxRadius: isMobile ? 150 : 280,
        alpha: 0.75,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('touchmove', handleTouchMove, { passive: true });
    parent.addEventListener('mouseleave', handleMouseLeave);
    parent.addEventListener('touchend', handleMouseLeave);
    parent.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('resize', handleResize);

    // ── Render Loop ──
    let time = 0;
    const render = () => {
      time += 0.01;

      // Smooth scroll lerp calculation
      currentScrollY += (targetScrollY - currentScrollY) * 0.12;
      scrollVelocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      ctx.clearRect(0, 0, width, height);

      // Layer 1: Dark Cosmos Deep Blue-Black Base
      const spaceGrad = ctx.createLinearGradient(0, 0, 0, height);
      spaceGrad.addColorStop(0, '#02040a');
      spaceGrad.addColorStop(0.5, '#050a18');
      spaceGrad.addColorStop(1, '#02040a');
      ctx.fillStyle = spaceGrad;
      ctx.fillRect(0, 0, width, height);

      // Layer 2: Ambient Glowing Nebula Orbs
      const neb1X = width * 0.3 + Math.sin(time * 0.5) * 60;
      const neb1Y = height * 0.35 + Math.cos(time * 0.4) * 40;
      const neb1Grad = ctx.createRadialGradient(neb1X, neb1Y, 0, neb1X, neb1Y, width * 0.45);
      neb1Grad.addColorStop(0, 'rgba(56, 189, 248, 0.18)');
      neb1Grad.addColorStop(0.5, 'rgba(124, 58, 237, 0.10)');
      neb1Grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = neb1Grad;
      ctx.beginPath();
      ctx.arc(neb1X, neb1Y, width * 0.45, 0, Math.PI * 2);
      ctx.fill();

      const neb2X = width * 0.75 + Math.cos(time * 0.6) * 70;
      const neb2Y = height * 0.65 + Math.sin(time * 0.5) * 50;
      const neb2Grad = ctx.createRadialGradient(neb2X, neb2Y, 0, neb2X, neb2Y, width * 0.5);
      neb2Grad.addColorStop(0, 'rgba(168, 85, 247, 0.16)');
      neb2Grad.addColorStop(0.5, 'rgba(30, 27, 75, 0.08)');
      neb2Grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = neb2Grad;
      ctx.beginPath();
      ctx.arc(neb2X, neb2Y, width * 0.5, 0, Math.PI * 2);
      ctx.fill();

      // Layer 3: High-Density 3D Parallax Particle Engine
      particles.forEach((p, idx) => {
        // Apply depth-weighted scroll displacement (Scrolling down moves particles UPWARDS rapidly based on Z depth)
        const scrollDisplacement = scrollVelocity * p.z * 0.65;
        p.y -= scrollDisplacement;

        // Base subtle continuous travel
        p.x += p.driftVx * p.z;
        p.y += p.driftVy * p.z * 0.4;

        // Wrap around Y boundary seamlessly when scrolling down or up
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        } else if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        // Wrap around X boundary
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Mouse Magnetic Attraction Force
        let drawX = p.x;
        let drawY = p.y;

        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.hypot(dx, dy);
          const mouseRadius = 220;

          if (dist < mouseRadius) {
            const pullFactor = (1 - dist / mouseRadius) * (p.z * 10);
            const angle = Math.atan2(dy, dx);
            drawX += Math.cos(angle) * pullFactor;
            drawY += Math.sin(angle) * pullFactor;
          }
        }

        // Particle sizing & twinkling
        p.twinklePhase += p.twinkleSpeed;
        const twinkleAlpha = p.alpha + Math.sin(p.twinklePhase) * 0.25;
        const clampedAlpha = Math.max(0.12, Math.min(0.9, twinkleAlpha));
        const renderedSize = p.baseSize * (p.z * 0.75 + 0.3);

        ctx.fillStyle = `${p.color}${clampedAlpha})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, renderedSize, 0, Math.PI * 2);
        ctx.fill();

        // Cross-flare glow for high depth / large particles
        if (renderedSize > 2.5 && clampedAlpha > 0.6) {
          ctx.strokeStyle = `${p.color}${(clampedAlpha - 0.5) * 0.6})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(drawX - renderedSize * 2.2, drawY);
          ctx.lineTo(drawX + renderedSize * 2.2, drawY);
          ctx.moveTo(drawX, drawY - renderedSize * 2.2);
          ctx.lineTo(drawX, drawY + renderedSize * 2.2);
          ctx.stroke();
        }

        // Draw faint constellation connecting lines between close particles
        for (let j = idx + 1; j < Math.min(idx + 12, particles.length); j++) {
          const p2 = particles[j];
          const dist = Math.hypot(drawX - p2.x, drawY - p2.y);
          const maxDist = isMobile ? 65 : 95;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.12 * (p.z / 3);
            ctx.beginPath();
            ctx.moveTo(drawX, drawY);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      });

      // Layer 4: Shockwave Ripples from User Click/Tap
      ripples.forEach((r) => {
        r.radius += 5;
        r.alpha -= 0.02;
      });
      ripples = ripples.filter((r) => r.alpha > 0);

      ripples.forEach((r) => {
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${r.alpha * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Layer 5: Interactive Cursor Spotlight Halo
      if (mouseRef.current.active) {
        const { x, y } = mouseRef.current;
        const auraGrad = ctx.createRadialGradient(x, y, 0, x, y, 220);
        auraGrad.addColorStop(0, 'rgba(56, 189, 248, 0.2)');
        auraGrad.addColorStop(0.4, 'rgba(168, 85, 247, 0.06)');
        auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(x, y, 220, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    // IntersectionObserver to pause loop when offscreen
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
      window.removeEventListener('scroll', handleScroll);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('touchmove', handleTouchMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      parent.removeEventListener('touchend', handleMouseLeave);
      parent.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Soft Ambient Vignette Framing */}
      <div className="absolute inset-0 bg-radial from-transparent via-background/20 to-background/95 pointer-events-none" />
    </div>
  );
}
