'use client';

import { useEffect } from 'react';
import { HomeSection } from '@/components/HomeSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectSection from '@/components/ProjectSection';
import { TechStackSection } from '@/components/TechStackSection';
import ContactSection from '@/components/ContactSection';
import CanvasCursor from '@/components/CanvasCursor';
import LazySection from '@/components/LazySection';

export default function Home() {
  useEffect(() => {
    if ('scrollRestoration' in window) {
      window.history.scrollRestoration = 'manual';
    }

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    };

    scrollToTop();

    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToTop);
    });

    const timeout = setTimeout(scrollToTop, 150);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <CanvasCursor />
      <main className="relative z-10">
        <HomeSection />
        <LazySection minHeight="60vh">
          <AboutSection />
        </LazySection>
        <LazySection minHeight="60vh">
          <ExperienceSection />
        </LazySection>
        <LazySection minHeight="60vh">
          <TechStackSection />
        </LazySection>
        <LazySection minHeight="60vh">
          <ProjectSection />
        </LazySection>
        <LazySection minHeight="60vh">
          <ContactSection />
        </LazySection>
      </main>
    </>
  );
}
