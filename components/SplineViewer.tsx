'use client';

import { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineViewer({ onLoad }: { onLoad?: (app: any) => void }) {
  const [hasError, setHasError] = useState(false);

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
      // Hide the logo on the robot's chest
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
    <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden pointer-events-auto z-10">
      <Spline
        scene="https://prod.spline.design/YGJtFFrJMfW4iK-g/scene.splinecode"
        onLoad={handleLoad}
        onError={(error) => {
          console.error('Spline error:', error);
          setHasError(true);
        }}
      />
    </div>
  );
}
