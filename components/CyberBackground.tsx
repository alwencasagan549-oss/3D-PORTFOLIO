'use client';

import { memo, useEffect, useRef } from 'react';
import { useDeviceCapabilities, useShouldReduceMotion } from '@/hooks/useDeviceCapabilities';

const CYAN = '#00d4ff';
const RED = '#ff0040';
const ORANGE = '#ff6a00';

const GRID_COLOR = 'rgba(0, 212, 255, 0.12)';
const GRID_SIZE = 32;
const PARTICLE_COUNT = 70;
const CONNECTION_DIST = 170;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
  color: string;
};

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const capabilities = useDeviceCapabilities();
  const shouldReduceMotion = useShouldReduceMotion(capabilities);

  useEffect(() => {
    if (shouldReduceMotion || capabilities.isLowEnd) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles: Particle[] = [];
    const palette = [CYAN, ORANGE, RED];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.24,
          vy: (Math.random() - 0.5) * 0.24,
          radius: Math.random() * 1.6 + 0.6,
          opacity: Math.random() * 0.6 + 0.25,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.018 + 0.006,
          color: palette[Math.floor(Math.random() * palette.length)],
        });
      }
    };

    const drawBackgroundGlow = () => {
      const g1 = ctx.createRadialGradient(width * 0.08, height * 0.15, 0, width * 0.08, height * 0.15, width * 0.7);
      g1.addColorStop(0, hexToRgba(CYAN, 0.18));
      g1.addColorStop(1, hexToRgba(CYAN, 0));
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const g2 = ctx.createRadialGradient(width * 0.92, height * 0.85, 0, width * 0.92, height * 0.85, width * 0.65);
      g2.addColorStop(0, hexToRgba(RED, 0.14));
      g2.addColorStop(1, hexToRgba(RED, 0));
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      const g3 = ctx.createRadialGradient(width * 0.5, height * 0.5, 0, width * 0.5, height * 0.5, width * 0.8);
      g3.addColorStop(0, hexToRgba(ORANGE, 0.1));
      g3.addColorStop(1, hexToRgba(ORANGE, 0));
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, width, height);
    };

    const drawGrid = () => {
      ctx.strokeStyle = GRID_COLOR;
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const horizon = ctx.createRadialGradient(width / 2, height * 0.35, 0, width / 2, height * 0.35, Math.max(width, height) * 0.9);
      horizon.addColorStop(0, hexToRgba(CYAN, 0.08));
      horizon.addColorStop(1, hexToRgba(CYAN, 0));
      ctx.fillStyle = horizon;
      ctx.fillRect(0, 0, width, height);
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.24;
            const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            gradient.addColorStop(0, hexToRgba(a.color, alpha));
            gradient.addColorStop(1, hexToRgba(b.color, alpha));
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const drawParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;

        const alpha = p.opacity * (0.55 + 0.45 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(p.color, alpha);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(p.color, alpha * 0.14);
        ctx.fill();
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      drawBackgroundGlow();
      drawGrid();
      drawConnections();
      drawParticles();
      raf = requestAnimationFrame(render);
    };

    resize();
    initParticles();
    render();

    window.addEventListener('resize', () => {
      resize();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', () => {});
    };
  }, [capabilities.tier, capabilities.isLowEnd, shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        opacity: 0.95,
      }}
    />
  );
}

export default memo(CyberBackground);
