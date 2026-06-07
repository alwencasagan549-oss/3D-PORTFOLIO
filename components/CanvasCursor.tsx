'use client';

import useCanvasCursor from '@/hooks/use-canvasCursor';

const CanvasCursor = () => {
  const canvasRef = useCanvasCursor();

  return (
    <canvas
      ref={canvasRef}
      className='pointer-events-none fixed inset-0 z-30'
    />
  );
};

export default CanvasCursor;
