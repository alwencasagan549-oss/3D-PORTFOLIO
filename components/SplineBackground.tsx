'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => null,
});

export default function SplineBackground({ onLoad, sceneUrl, className }: { onLoad?: (app: any) => void; sceneUrl?: string; className?: string }) {
  const [errored, setErrored] = useState(false);
  const url = sceneUrl || 'https://prod.spline.design/Ld-wsEMBZ2wEYm3Z/scene.splinecode';
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 ${className || ''}`}>
      {errored ? (
        <div className="absolute inset-0 spline-fallback" />
      ) : (
        <Spline
          scene={url}
          style={{ width: '100%', height: '100%', opacity: 0.8 }}
          onLoad={onLoad}
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}
