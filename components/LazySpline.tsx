'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
    </div>
  ),
});

type LazySplineProps = {
  scene: string;
  onLoad?: (app: any) => void;
  onError?: (error: any) => void;
};

function SplineComponent({ scene, onLoad, onError }: LazySplineProps) {
  return (
    <Spline
      scene={scene}
      onLoad={onLoad}
      onError={onError}
      style={{ width: '100%', height: '100%', opacity: 0.8 }}
    />
  );
}

export default function LazySpline({ scene, onLoad, onError }: LazySplineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [inView, setInView] = useState(false);

  // IntersectionObserver — load when within 300px of viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Once in view, no need to keep observing
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Defer loading until browser is idle
  useEffect(() => {
    if (!inView) return;

    const scheduleLoad = () => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => setShouldLoad(true), { timeout: 2000 });
      } else {
        setTimeout(() => setShouldLoad(true), 100);
      }
    };

    scheduleLoad();
  }, [inView]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {shouldLoad ? (
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
          </div>
        }>
          <SplineComponent scene={scene} onLoad={onLoad} onError={onError} />
        </Suspense>
      ) : null}
    </div>
  );
}
