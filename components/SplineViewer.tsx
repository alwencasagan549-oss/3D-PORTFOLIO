'use client';

import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineViewer({ onLoad }: { onLoad?: (app: any) => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasError, setHasError] = useState(false);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const originalError = console.error;
    console.error = (...args) => {
      const msg = typeof args[0] === 'string' ? args[0] : '';
      if (msg.includes('THREE.WebGLProgram') || msg.includes('Encountered two children with the same key')) {
        return;
      }
      originalError.apply(console, args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  const handleLoad = (splineApp: any) => {
    try {
      const logoObject = splineApp.findObjectByName('Logo');
      if (logoObject) {
         logoObject.visible = false;
      }
      if (onLoad) onLoad(splineApp);
    } catch (error) {
      console.error('Error in Spline onLoad:', error);
    }
  };

  if (hasError) return null;

  return (
    <div ref={containerRef} className="absolute right-0 top-0 h-full w-1/2 overflow-hidden pointer-events-auto z-10">
      {shouldMount && (
        <Spline
          scene="https://prod.spline.design/YGJtFFrJMfW4iK-g/scene.splinecode"
          onLoad={handleLoad}
          onError={(error) => {
            console.error('Spline error:', error);
            setHasError(true);
          }}
        />
      )}
    </div>
  );
}
