'use client';

import { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineBackground({ onLoad }: { onLoad?: (app: any) => void }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsReady(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-black">
      {isReady && (
        <Spline
          scene="https://prod.spline.design/Ld-wsEMBZ2wEYm3Z/scene.splinecode"
          style={{ width: '100%', height: '100%', opacity: 0.8 }}
          onLoad={onLoad}
        />
      )}
    </div>
  );
}
