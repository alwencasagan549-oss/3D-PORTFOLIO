'use client';

import { useState, useEffect, useRef, type ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  minHeight?: string;
}

export default function LazySection({
  children,
  className = '',
  rootMargin = '200px',
  minHeight = '100vh',
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Start rendering content after a tiny delay for smooth transition
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsLoaded(true);
            });
          });
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        minHeight: isLoaded ? undefined : minHeight,
        contentVisibility: isLoaded ? 'auto' : 'hidden',
        containIntrinsicSize: isLoaded ? undefined : minHeight,
      }}
    >
      {isVisible && (
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
