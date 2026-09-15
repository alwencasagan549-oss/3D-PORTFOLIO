'use client';

import { useEffect, useState, Suspense } from 'react';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';
import LazySpline from './LazySpline';

function AnimatedGradientFallback() {
  return (
    <div className="absolute inset-x-0 top-0 h-[47svh] w-full overflow-hidden pointer-events-none md:h-full md:w-1/2 md:left-auto md:right-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 70% 30%, rgba(0,212,255,0.05) 0%, transparent 50%), ' +
            'radial-gradient(ellipse at 30% 70%, rgba(255,0,64,0.04) 0%, transparent 50%)',
          animation: 'bgPulse 6s ease-in-out infinite alternate',
        }}
      />
      <style jsx>{`
        @keyframes bgPulse {
          0% { opacity: 0.5; transform: scale(1); }
          100% { opacity: 0.9; transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
}

export default function SplineViewer({ onLoad }: { onLoad?: (app: any) => void }) {
  const [hasError, setHasError] = useState(false);
  const capabilities = useDeviceCapabilities();

  // Suppress known WebGL noise at the source
  const handleError = (error: any) => {
    const msg = typeof error === 'string' ? error : error?.message ?? '';
    if (msg.includes('THREE.WebGLProgram') || msg.includes('Encountered two children with the same key')) {
      return;
    }
    console.error('Spline error:', error);
    setHasError(true);
  };

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

  const showFallback = capabilities.isLowEnd || hasError;

  if (showFallback) return <AnimatedGradientFallback />;

  return (
    <div className="absolute inset-x-0 top-0 h-[47svh] w-full overflow-hidden pointer-events-none z-10 md:h-full md:w-1/2 md:left-auto md:right-0 md:pointer-events-auto">
      <Suspense fallback={<AnimatedGradientFallback />}>
        <LazySpline
          scene="https://prod.spline.design/YGJtFFrJMfW4iK-g/scene.splinecode"
          onLoad={handleLoad}
          onError={handleError}
        />
      </Suspense>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#020617/0.45] via-[#07111f/0.15] to-transparent md:hidden" />
    </div>
  );
}
