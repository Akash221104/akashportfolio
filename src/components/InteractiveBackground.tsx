'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseVx: number;
  baseVy: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  strength: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  radius: number;
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const lastMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const parent = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number = 0;
    let particles: Particle[] = [];
    let ripples: Ripple[] = [];
    let sparks: Spark[] = [];
    let width = (canvas.width = parent.clientWidth);
    let height = (canvas.height = parent.clientHeight);

    // Settings
    const isMobile = width < 768;
    const particleCount = isMobile ? 45 : 115;
    const maxLineDistance = isMobile ? 90 : 130;
    const maxMouseDistance = isMobile ? 130 : 200;
    const repulsionStrength = 0.95;

    // Helper to generate a particle
    const createParticle = (): Particle => {
      const vx = (Math.random() - 0.5) * 0.45;
      const vy = (Math.random() - 0.5) * 0.45;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        radius: Math.random() * 2.2 + 1.2, // slightly larger, more visible
      };
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    };

    initParticles();

    // Event handlers relative to parent bounds
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      // Calculate speed for sparks
      const dx = currentX - lastMouseRef.current.x;
      const dy = currentY - lastMouseRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Spawn sparks if mouse moves fast
      if (speed > 4 && sparks.length < 150) {
        const sparkCount = Math.min(Math.floor(speed / 3.5), 6);
        for (let i = 0; i < sparkCount; i++) {
          sparks.push({
            x: currentX,
            y: currentY,
            vx: (Math.random() - 0.5) * 1.5 + dx * 0.08,
            vy: (Math.random() - 0.5) * 1.5 + dy * 0.08,
            alpha: 0.85,
            decay: Math.random() * 0.025 + 0.02,
            radius: Math.random() * 1.6 + 0.6,
          });
        }
      }

      mouseRef.current.x = currentX;
      mouseRef.current.y = currentY;
      mouseRef.current.active = true;

      lastMouseRef.current.x = currentX;
      lastMouseRef.current.y = currentY;
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
        maxRadius: isMobile ? 120 : 240,
        speed: isMobile ? 4.5 : 6,
        strength: 3.5,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!canvas || e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const currentX = e.touches[0].clientX - rect.left;
      const currentY = e.touches[0].clientY - rect.top;

      mouseRef.current.x = currentX;
      mouseRef.current.y = currentY;
      mouseRef.current.active = true;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!canvas || e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      ripples.push({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
        radius: 0,
        maxRadius: isMobile ? 100 : 200,
        speed: 4.5,
        strength: 3.0,
      });
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    // Attach listeners
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);
    parent.addEventListener('mousedown', handleMouseDown);
    parent.addEventListener('touchmove', handleTouchMove, { passive: true });
    parent.addEventListener('touchstart', handleTouchStart, { passive: true });
    parent.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', handleResize);

    // Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      // Update click shockwave ripples
      ripples.forEach((r) => {
        r.radius += r.speed;
      });
      // Filter out completed ripples
      ripples = ripples.filter((r) => r.radius < r.maxRadius);

      // Draw custom mouse neon aura halo glow
      if (mouse.active) {
        const glowRadius = maxMouseDistance;
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, glowRadius);
        grad.addColorStop(0, 'rgba(16, 185, 129, 0.18)');
        grad.addColorStop(0.35, 'rgba(16, 185, 129, 0.07)');
        grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update and Draw Particles
      particles.forEach((p) => {
        // Apply Mouse Repulsion Force
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxMouseDistance) {
            const force = (maxMouseDistance - dist) / maxMouseDistance;
            const angle = Math.atan2(dy, dx);

            p.vx += Math.cos(angle) * force * repulsionStrength * 0.08;
            p.vy += Math.sin(angle) * force * repulsionStrength * 0.08;
          } else {
            p.vx = p.vx * 0.98 + p.baseVx * 0.02;
            p.vy = p.vy * 0.98 + p.baseVy * 0.02;
          }
        } else {
          p.vx = p.vx * 0.95 + p.baseVx * 0.05;
          p.vy = p.vy * 0.95 + p.baseVy * 0.05;
        }

        // Apply Click Shockwaves Repulsion Force
        ripples.forEach((r) => {
          const dx = p.x - r.x;
          const dy = p.y - r.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 0 && Math.abs(dist - r.radius) < 30) {
            const force = (1 - r.radius / r.maxRadius) * r.strength;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force * 0.8;
            p.vy += Math.sin(angle) * force * 0.8;
          }
        });

        // Limit speed
        const speedLimit = 1.6;
        const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (currentSpeed > speedLimit) {
          p.vx = (p.vx / currentSpeed) * speedLimit;
          p.vy = (p.vy / currentSpeed) * speedLimit;
        }

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce borders
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
          p.baseVx *= -1;
        } else if (p.x > width) {
          p.x = width;
          p.vx *= -1;
          p.baseVx *= -1;
        }

        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
          p.baseVy *= -1;
        } else if (p.y > height) {
          p.y = height;
          p.vy *= -1;
          p.baseVy *= -1;
        }

        // Draw particle node
        const isNearCursor = mouse.active && Math.sqrt((p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2) < maxMouseDistance;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isNearCursor
          ? 'rgba(16, 185, 129, 0.75)'
          : 'rgba(16, 185, 129, 0.35)';
        ctx.fill();
      });

      // Update and Draw Sparks
      sparks = sparks.filter((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;
        if (s.alpha <= 0) return false;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${s.alpha})`;
        ctx.fill();
        return true;
      });

      // Draw Connection Lines (Particles)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxLineDistance) {
            const alpha = ((maxLineDistance - dist) / maxLineDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }

        // Draw link line from mouse to particle
        if (mouse.active) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxMouseDistance) {
            const alpha = ((maxMouseDistance - dist) / maxMouseDistance) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      // Draw Click shockwave rings
      ripples.forEach((r) => {
        const alpha = (1 - r.radius / r.maxRadius) * 0.35;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    // Pause animation when canvas is off-screen to save CPU/battery
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationId) {
          // Resume the loop if it was paused
          const resume = () => {
            if (!isVisible) return;
            render();
          };
          resume();
        }
      },
      { threshold: 0 }
    );

    if (canvas) visibilityObserver.observe(canvas);

    // Override render to respect visibility
    const originalRender = render;
    const pauseAwareRender = () => {
      if (!isVisible) {
        animationId = 0;
        return;
      }
      originalRender();
    };
    // Restart with the pause-aware version
    cancelAnimationFrame(animationId);
    // Redefine inner render to be visibility-aware
    const renderLoop = () => {
      if (!isVisible) {
        animationId = 0;
        return;
      }
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      ripples.forEach((r) => { r.radius += r.speed; });
      ripples = ripples.filter((r) => r.radius < r.maxRadius);

      if (mouse.active) {
        const glowRadius = maxMouseDistance;
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, glowRadius);
        grad.addColorStop(0, 'rgba(16, 185, 129, 0.18)');
        grad.addColorStop(0.35, 'rgba(16, 185, 129, 0.07)');
        grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      particles.forEach((p) => {
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxMouseDistance) {
            const force = (maxMouseDistance - dist) / maxMouseDistance;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force * repulsionStrength * 0.08;
            p.vy += Math.sin(angle) * force * repulsionStrength * 0.08;
          } else {
            p.vx = p.vx * 0.98 + p.baseVx * 0.02;
            p.vy = p.vy * 0.98 + p.baseVy * 0.02;
          }
        } else {
          p.vx = p.vx * 0.95 + p.baseVx * 0.05;
          p.vy = p.vy * 0.95 + p.baseVy * 0.05;
        }

        ripples.forEach((r) => {
          const dx = p.x - r.x;
          const dy = p.y - r.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0 && Math.abs(dist - r.radius) < 30) {
            const force = (1 - r.radius / r.maxRadius) * r.strength;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force * 0.8;
            p.vy += Math.sin(angle) * force * 0.8;
          }
        });

        const speedLimit = 1.6;
        const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (currentSpeed > speedLimit) {
          p.vx = (p.vx / currentSpeed) * speedLimit;
          p.vy = (p.vy / currentSpeed) * speedLimit;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) { p.x = 0; p.vx *= -1; p.baseVx *= -1; }
        else if (p.x > width) { p.x = width; p.vx *= -1; p.baseVx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; p.baseVy *= -1; }
        else if (p.y > height) { p.y = height; p.vy *= -1; p.baseVy *= -1; }

        const isNearCursor = mouse.active && Math.sqrt((p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2) < maxMouseDistance;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isNearCursor ? 'rgba(16, 185, 129, 0.75)' : 'rgba(16, 185, 129, 0.35)';
        ctx.fill();
      });

      sparks = sparks.filter((s) => {
        s.x += s.vx; s.y += s.vy; s.alpha -= s.decay;
        if (s.alpha <= 0) return false;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${s.alpha})`;
        ctx.fill();
        return true;
      });

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxLineDistance) {
            const alpha = ((maxLineDistance - dist) / maxLineDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
        if (mouse.active) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxMouseDistance) {
            const alpha = ((maxMouseDistance - dist) / maxMouseDistance) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      ripples.forEach((r) => {
        const alpha = (1 - r.radius / r.maxRadius) * 0.35;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      animationId = requestAnimationFrame(renderLoop);
    };

    // Restart with visibility-aware loop
    animationId = requestAnimationFrame(renderLoop);
    void pauseAwareRender; // suppress unused warning

    return () => {
      cancelAnimationFrame(animationId);
      visibilityObserver.disconnect();
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      parent.removeEventListener('mousedown', handleMouseDown);
      parent.removeEventListener('touchmove', handleTouchMove);
      parent.removeEventListener('touchstart', handleTouchStart);
      parent.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
