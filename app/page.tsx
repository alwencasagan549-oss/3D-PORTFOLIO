'use client';

import { useEffect } from 'react';
import { HomeSection } from '@/components/HomeSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectSection from '@/components/ProjectSection';
import { TechStackSection } from '@/components/TechStackSection';
import ContactSection from '@/components/ContactSection';
import SplineBackground from '@/components/SplineBackground';

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
      <SplineBackground className="fixed inset-0" />
      <main className="relative z-10">
        <HomeSection />
        <AboutSection />
        <ExperienceSection />
        <TechStackSection />
        <ProjectSection />
        <ContactSection />
      </main>
    </>
  );
}
