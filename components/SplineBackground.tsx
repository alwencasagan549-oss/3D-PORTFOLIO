'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => null,
});

type SplineBackgroundProps = {
  onLoad?: (app: any) => void;
  sceneUrl?: string;
  className?: string;
};

function AnimatedGradientFallback() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(0,212,255,0.08) 0%, transparent 50%), ' +
            'radial-gradient(ellipse at 70% 60%, rgba(255,0,64,0.06) 0%, transparent 50%), ' +
            'radial-gradient(ellipse at 50% 80%, rgba(255,106,0,0.04) 0%, transparent 40%)',
        }}
      />
    </div>
  );
}

export default function SplineBackground({ onLoad, sceneUrl, className }: SplineBackgroundProps) {
  const [errored, setErrored] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const capabilities = useDeviceCapabilities();
  const containerRef = useRef<HTMLDivElement>(null);

  // Skip 3D on low-end devices entirely
  if (capabilities.isLowEnd) {
    return <AnimatedGradientFallback />;
  }

  // Lazy-load by viewport intersection
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setShouldLoad(true); },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const url = sceneUrl || 'https://prod.spline.design/Ld-wsEMBZ2wEYm3Z/scene.splinecode';

  return (
    <div ref={containerRef} className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 ${className || ''}`}>
      {errored ? (
        <AnimatedGradientFallback />
      ) : shouldLoad ? (
        <Spline
          scene={url}
          style={{ width: '100%', height: '100%', opacity: 0.8 }}
          onLoad={onLoad}
          onError={() => setErrored(true)}
        />
      ) : (
        <AnimatedGradientFallback />
      )}
    </div>
  );
}
