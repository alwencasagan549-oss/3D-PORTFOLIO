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
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const rafIdRef = useRef<number>(0);

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

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!outerRef.current || prefersReducedMotion) return;
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(() => {
      const rect = outerRef.current!.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
      setTilt({ x, y });
    });
  }, [prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={outerRef}
      className={`relative ${className}`}
      style={perspectiveStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        aria-hidden="true"
        className={`absolute rounded-full ${glowClassName}`}
        style={{
          inset: '-20%',
          background: 'radial-gradient(circle at 50% 50%, rgba(0,212,255,0.15) 0%, rgba(255,0,64,0.08) 40%, transparent 70%)',
          filter: 'blur(50px)',
          ...glowStyle,
        }}
      />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={imageSizes}
        className="object-contain transition-transform duration-100 ease-out"
        style={{ transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
      />
    </div>
  );
}

export default TiltImage;
