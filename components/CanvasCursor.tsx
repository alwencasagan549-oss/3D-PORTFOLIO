'use client';

import { useEffect, useRef } from 'react';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';

const MAX_PARTICLES = 300;
const SPAWN_RATE = 12;
const GLOW_SIZE = 5;
const IDLE_TIMEOUT = 2000;

function createGlowSprite(size: number): HTMLCanvasElement {
  const offscreen = document.createElement('canvas');
  offscreen.width = size * 2;
  offscreen.height = size * 2;
  const octx = offscreen.getContext('2d')!;
  const gradient = octx.createRadialGradient(size, size, 0, size, size, size);
  gradient.addColorStop(0, 'rgba(255, 0, 64, 1)');
  gradient.addColorStop(0.5, 'rgba(255, 106, 0, 0.6)');
  gradient.addColorStop(0.75, 'rgba(0, 212, 255, 0.3)');
  gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
  octx.fillStyle = gradient;
  octx.fillRect(0, 0, size * 2, size * 2);
  return offscreen;
}

export default function CanvasCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const capabilities = useDeviceCapabilities();

  useEffect(() => {
    // Skip entirely on low-end devices or touch-primary devices
    if (capabilities.isLowEnd) return;
    const isTouchPrimary = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    if (isTouchPrimary) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true })!;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const sprite = createGlowSprite(GLOW_SIZE);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; r: number; vx: number; vy: number; life: number; hue: number }[] = [];
    let raf = 0;
    let globalHue = 0;
    let lastMoveTime = Date.now();
    let isRunning = false;

    const stopLoop = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      isRunning = false;
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        raf = requestAnimationFrame(render);
      }
    };

    const clearParticles = () => {
      particles.length = 0;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      stopLoop();
    };

    const onMove = (e: MouseEvent) => {
      lastMoveTime = Date.now();
      // Reduce particles on mid-tier devices
      const rate = capabilities.tier === 'mid' ? SPAWN_RATE / 2 : SPAWN_RATE;
      const maxP = capabilities.tier === 'mid' ? MAX_PARTICLES / 2 : MAX_PARTICLES;

      for (let i = 0; i < rate; i++) {
        if (particles.length >= maxP) {
          particles.shift();
        }
        particles.push({
          x: e.clientX,
          y: e.clientY,
          r: Math.random() * 2 + 0.8,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          life: 1,
          hue: globalHue + Math.random() * 40 - 20,
        });
      }
      startLoop();
    };

    const render = () => {
      if (particles.length === 0) {
        clearParticles();
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      globalHue = (globalHue + 0.3) % 360;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.018;

        if (p.life <= 0) {
          particles[i] = particles[particles.length - 1];
          particles.pop();
          continue;
        }

        const size = p.r * p.life * GLOW_SIZE * 2;
        ctx.globalAlpha = p.life * 0.7;
        ctx.drawImage(sprite, p.x - size / 2, p.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;

      // Stop loop when all particles dead and mouse idle
      if (particles.length === 0) {
        stopLoop();
        return;
      }

      // Idle check — stop loop if mouse hasn't moved in IDLE_TIMEOUT
      if (Date.now() - lastMoveTime > IDLE_TIMEOUT && particles.length < 5) {
        clearParticles();
        return;
      }

      raf = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('blur', clearParticles);
    document.addEventListener('mouseleave', clearParticles);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopLoop();
        clearParticles();
      }
    });
    window.addEventListener('pagehide', clearParticles);

    return () => {
      clearParticles();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('blur', clearParticles);
      document.removeEventListener('mouseleave', clearParticles);
      document.removeEventListener('visibilitychange', () => {});
      window.removeEventListener('pagehide', clearParticles);
      window.removeEventListener('resize', resize);
    };
  }, [capabilities.tier, capabilities.isLowEnd]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 5, pointerEvents: 'none' }}
    />
  );
}
