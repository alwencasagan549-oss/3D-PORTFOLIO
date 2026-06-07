'use client';

import Spline from '@splinetool/react-spline';

export default function SplineBackground({ onLoad }: { onLoad?: (app: any) => void }) {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-black">
      <Spline
        scene="https://prod.spline.design/Ld-wsEMBZ2wEYm3Z/scene.splinecode"
        style={{ width: '100%', height: '100%', opacity: 0.8 }}
        onLoad={onLoad}
      />
    </div>
  );
}
