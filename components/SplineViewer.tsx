'use client';

import { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineViewer() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Delay loading to improve initial page load
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Suppress WebGL shader errors from Spline runtime
    const originalError = console.error;
    console.error = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes('THREE.WebGLProgram')) {
        return; // Suppress shader errors
      }
      originalError.apply(console, args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  const onLoad = (splineApp: any) => {
    try {
      // Hide the logo on the robot's chest
      const logoObject = splineApp.findObjectByName('Logo');
      if (logoObject) {
         logoObject.visible = false;
      }
    } catch (error) {
      console.error('Error in Spline onLoad:', error);
    }
  };

  if (!isVisible || hasError) return null;

  return (
    <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden pointer-events-auto z-0">
      <Spline 
        scene="https://prod.spline.design/YGJtFFrJMfW4iK-g/scene.splinecode" 
        onLoad={onLoad}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
