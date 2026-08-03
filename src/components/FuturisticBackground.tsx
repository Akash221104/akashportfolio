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

    let width = parent.clientWidth;
    let height = parent.clientHeight;
    const isMobile = width < 768;

    let isVisible = true;
    let animationId = 0;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // ── Event Handlers Bounded to Hero Container ──
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
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

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('touchmove', handleTouchMove, { passive: true });
    parent.addEventListener('mouseleave', handleMouseLeave);
    parent.addEventListener('touchend', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // ── Render Loop Engine ──
    let time = 0;
    let gridOffset = 0;

    const render = () => {
      if (!isVisible) {
        animationId = 0;
        return;
      }

      time += 0.015;
      gridOffset += isMobile ? 0.005 : 0.012; // Smooth continuous 3D motion
      if (gridOffset >= 1) gridOffset = 0;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // ── Layer 1: Deep Dark Professional Obsidian Base ──
      const baseGrad = ctx.createLinearGradient(0, 0, width, height);
      baseGrad.addColorStop(0, '#02050e');
      baseGrad.addColorStop(0.5, '#070d1a');
      baseGrad.addColorStop(1, '#02050e');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // ── Layer 2: Top Vanishing Point (Starts from VERY TOP of Screen) ──
      let vanishingX = width * 0.5 + Math.sin(time * 0.3) * 20;
      let vanishingY = -height * 0.1 + Math.cos(time * 0.25) * 10;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      if (mouseActive) {
        vanishingX += (mouseX - width * 0.5) * (isMobile ? 0.03 : 0.06);
        vanishingY += (mouseY - height * 0.5) * (isMobile ? 0.02 : 0.04);
      }

      // Soft Top Horizon Lighting Atmosphere Glow (Ultra-Subtle)
      const topGrad = ctx.createRadialGradient(vanishingX, 0, 0, vanishingX, 0, width * 0.7);
      topGrad.addColorStop(0, 'rgba(56, 189, 248, 0.06)');
      topGrad.addColorStop(0.45, 'rgba(168, 85, 247, 0.02)');
      topGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, width, height);

      // ── Layer 3: 3D Radial Grid Lines (Zoomed-In 3D Perspective) ──
      const numRadials = isMobile ? 22 : 44;
      for (let i = 0; i <= numRadials; i++) {
        const bottomTargetX = ((i - numRadials / 2) / (numRadials / 2)) * (width * 1.6) + width * 0.5;

        ctx.beginPath();
        ctx.moveTo(vanishingX, vanishingY);

        if (mouseActive) {
          const dx = mouseX - bottomTargetX;
          const dist = Math.abs(dx);
          const curve = Math.sin(time * 2 + i * 0.2) * Math.max(0, 22 - dist * 0.03);
          ctx.quadraticCurveTo(vanishingX + (bottomTargetX - vanishingX) * 0.5 + curve, height * 0.5, bottomTargetX, height);
        } else {
          ctx.lineTo(bottomTargetX, height);
        }

        ctx.strokeStyle = i % 2 === 0 ? 'rgba(56, 189, 248, 0.07)' : 'rgba(168, 85, 247, 0.05)';
        ctx.lineWidth = isMobile ? 0.7 : 0.9;
        ctx.stroke();
      }

      // ── Layer 4: Moving 3D Horizontal Grid Rows (Zoomed-In Downward Motion) ──
      const gridRows = isMobile ? 20 : 32;
      for (let r = 1; r <= gridRows; r++) {
        const progress = ((r + gridOffset) % gridRows) / gridRows;
        const t = Math.pow(progress, 2.2);
        const rowY = t * height;

        const waveOffset = Math.sin(time * 2.4 + rowY * 0.018) * 4;

        ctx.beginPath();
        ctx.moveTo(0, rowY + waveOffset);
        ctx.lineTo(width, rowY + waveOffset);

        let rowAlpha = 0.02 + t * 0.16;
        if (mouseActive) {
          const dy = Math.abs(mouseY - (rowY + waveOffset));
          if (dy < 160) {
            rowAlpha += (1 - dy / 160) * 0.10;
          }
        }

        ctx.strokeStyle = r % 2 === 0 ? `rgba(56, 189, 248, ${rowAlpha})` : `rgba(168, 85, 247, ${rowAlpha * 0.85})`;
        ctx.lineWidth = 0.7 + t * 0.9;
        ctx.stroke();
      }

      // ── Layer 5: Interactive Cursor 3D Spotlight Aura ──
      if (mouseActive) {
        const haloGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 240);
        haloGrad.addColorStop(0, 'rgba(56, 189, 248, 0.06)');
        haloGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.02)');
        haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 240, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animationId = requestAnimationFrame(render);
    };

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
      parent.removeEventListener('touchmove', handleTouchMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      parent.removeEventListener('touchend', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Soft Ambient Vignette Framing */}
      <div className="absolute inset-0 bg-radial from-transparent via-background/10 to-background/90 pointer-events-none" />
    </div>
  );
}
