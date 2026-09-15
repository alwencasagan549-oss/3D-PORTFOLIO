'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface TiltImageProps {
  src: string;
  alt: string;
  className?: string;
  perspectiveStyle?: React.CSSProperties;
  glowClassName?: string;
  glowStyle?: React.CSSProperties;
  imageSizes?: string;
}

function TiltImage({
  src,
  alt,
  className = '',
  perspectiveStyle = { perspective: '800px' },
  glowClassName = '',
  glowStyle,
  imageSizes,
}: TiltImageProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const rafIdRef = useRef<number>(0);
  const rectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => {
      mq.removeEventListener('change', handler);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const cacheRect = useCallback(() => {
    if (outerRef.current) {
      rectRef.current = outerRef.current.getBoundingClientRect();
    }
  }, []);

  useEffect(() => {
    cacheRect();
    window.addEventListener('resize', cacheRect);
    return () => window.removeEventListener('resize', cacheRect);
  }, [cacheRect]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!outerRef.current || prefersReducedMotion) return;
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(() => {
      const rect = rectRef.current || outerRef.current!.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
      if (imageRef.current) {
        imageRef.current.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
      }
    });
  }, [prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    if (imageRef.current) {
      imageRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
  }, []);

  return (
    <div
      ref={outerRef}
      className={`relative ${className} ${prefersReducedMotion ? '' : 'transition-transform duration-300 ease-out hover:scale-[1.04]'}`}
      style={perspectiveStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        aria-hidden="true"
        className={`absolute rounded-full transition-opacity duration-300 ${glowClassName}`}
        style={{
          inset: '-8%',
          background: 'radial-gradient(circle at 50% 50%, rgba(0,212,255,0.10) 0%, rgba(255,0,64,0.05) 40%, transparent 70%)',
          filter: 'blur(14px)',
          opacity: hovered ? 1 : 0.45,
          ...glowStyle,
        }}
      />
      <div ref={imageRef} className="relative w-full h-full will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={imageSizes}
          className="object-contain"
        />
      </div>
      {hovered && !prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[2rem] border border-cyan-400/20 shadow-[0_0_25px_rgba(0,212,255,0.12),0_0_60px_rgba(255,0,64,0.08)] pointer-events-none transition-opacity duration-300"
        />
      )}
    </div>
  );
}

export default TiltImage;
