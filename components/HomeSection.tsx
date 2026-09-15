'use client';

import { memo, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import SplineViewer from './SplineViewer';
import {
  fadeInUpVariants,
  staggerContainerVariants,
} from './ui/motion-variants';
import { useDeviceCapabilities, useShouldReduceMotion } from '@/hooks/useDeviceCapabilities';

const ROLES = ['Full-Stack Software Engineer', 'Web Developer', 'Networking', 'Technician', 'System Architect'];

const TypingRole = memo(function TypingRole({ enabled }: { enabled: boolean }) {
  const [text, setText] = useState('');
  const timeoutRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) {
      setText('Full-Stack Software Engineer');
      return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 100;

    const tick = () => {
      const currentRole = ROLES[roleIndex];
      if (isDeleting) {
        charIndex--;
        speed = 50;
      } else {
        charIndex++;
        speed = 100;
      }
      setText(currentRole.substring(0, charIndex));

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        speed = 2000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % ROLES.length;
        speed = 500;
      }
      timeoutRef.current = window.setTimeout(tick, speed);
    };

    timeoutRef.current = window.setTimeout(tick, 500);
    return () => window.clearTimeout(timeoutRef.current);
  }, [enabled]);

  return text;
});

function SocialIcon({ name, className = "" }: { name: string; className?: string }) {
  const commonProps = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  if (name === 'github') return (
    <svg {...commonProps} stroke="url(#iconGradient)">
      <defs><linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff0040" /><stop offset="50%" stopColor="#ff6a00" /><stop offset="100%" stopColor="#00d4ff" />
      </linearGradient></defs>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  );
  if (name === 'linkedin') return (
    <svg {...commonProps} stroke="url(#iconGradient)">
      <defs><linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff0040" /><stop offset="50%" stopColor="#ff6a00" /><stop offset="100%" stopColor="#00d4ff" />
      </linearGradient></defs>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  );
  if (name === 'facebook') return (
    <svg {...commonProps} stroke="url(#iconGradient)">
      <defs><linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff0040" /><stop offset="50%" stopColor="#ff6a00" /><stop offset="100%" stopColor="#00d4ff" />
      </linearGradient></defs>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
  return null;
}

const LOAD_MINIMUM_MS = 1800;

function HomeSectionComponent() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [robotLoaded, setRobotLoaded] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const capabilities = useDeviceCapabilities();
  const shouldReduceMotion = useShouldReduceMotion(capabilities);

  const showLoading = !contentReady;
  const loadStartTime = useRef(Date.now());

  const containerVariants = useMemo(() => ({
    ...staggerContainerVariants,
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0.05 : 0.15,
        delayChildren: shouldReduceMotion ? 0.05 : 0.2,
      },
    },
  }), [shouldReduceMotion]);

  const itemVariants = useMemo(() => ({
    ...fadeInUpVariants,
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: shouldReduceMotion ? 80 : 100,
      },
    },
  }), [shouldReduceMotion]);

  // Jump animation — skip on low-end
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 400);
    }, 3000);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // Reveal content when 3D scene is ready
  useEffect(() => {
    if (!robotLoaded) return;
    const elapsed = Date.now() - loadStartTime.current;
    const remaining = Math.max(0, LOAD_MINIMUM_MS - elapsed);
    const timeout = setTimeout(() => setContentReady(true), remaining);
    return () => clearTimeout(timeout);
  }, [robotLoaded]);

  // Hard fallback if 3D never loads
  useEffect(() => {
    const fallback = setTimeout(() => {
      if (!contentReady) {
        setRobotLoaded(true);
      }
    }, 8000);
    return () => clearTimeout(fallback);
  }, [contentReady]);

  // Typing effect is handled by isolated TypingRole component

  const btn1Class = `group cursor-pointer relative px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 bg-white text-black hover:text-white hover:bg-gradient-to-r hover:from-[#ff0040] hover:via-[#ff6a00] hover:to-[#00d4ff] shadow-xl hover:shadow-[0_0_40px_rgba(255,0,64,0.4)] active:scale-95 ${isJumping ? 'jump-active' : ''}`;
  const btn2Class = `px-8 py-4 rounded-xl font-medium text-base transition-all duration-300 relative overflow-hidden group cursor-pointer border border-cyan-500/30 bg-[#0a0e1a]/80 text-gray-300 hover:border-transparent hover:shadow-[0_0_40px_rgba(0,212,255,0.15),0_0_80px_rgba(255,0,64,0.08)] active:scale-95 ${isJumping ? 'jump-active-delayed' : ''}`;

  return (
    <section id="home" className="min-h-screen relative">
      {/* Loading Screen */}
      {showLoading && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-8">
          <div className="text-7xl font-bold font-orbitron text-gradient-neon animate-pulse">AC</div>
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400 animate-spin" style={{ animationDuration: '1s' }} />
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-orange-500 border-l-orange-500 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs font-mono text-gray-400 tracking-[0.3em] uppercase">
              {!robotLoaded ? 'Loading 3D Assets...' : 'Preparing Interface...'}
            </p>
            <div className="w-48 h-0.5 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-neon rounded-full transition-all duration-500"
                style={{ width: `${robotLoaded ? 100 : 0}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Tech Overlay */}
      <div className="tech-overlay" />

      {/* Ambient home background — keeps brightness consistent with other sections */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(0,212,255,0.07) 0%, transparent 55%), ' +
            'radial-gradient(ellipse at 70% 60%, rgba(255,0,64,0.05) 0%, transparent 55%), ' +
            'linear-gradient(180deg, rgba(10,14,26,0.25) 0%, rgba(5,8,15,0.1) 50%, rgba(10,14,26,0.35) 100%)',
        }}
      />

      {/* Cursor glow — only on high-end devices */}
      {!shouldReduceMotion && (
        <div
          className="fixed pointer-events-none w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl transition-transform duration-300"
          style={{ transform: `translate(${mousePos.x - 192}px, ${mousePos.y - 192}px)` }}
        />
      )}

      {/* 3D Model */}
      <SplineViewer onLoad={() => setRobotLoaded(true)} />

      {/* Robot Glow */}
      <div className="robot-glow" />

      {/* Main Content */}
      <motion.div
        className={`relative z-20 min-h-screen flex items-center transition-opacity duration-1000 ${contentReady ? 'opacity-100' : 'opacity-0'}`}
        initial="hidden"
        animate={contentReady ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {contentReady && (
          <>
            <Header />
          </>
        )}
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between pt-24 pb-12">
            <div className="w-full md:w-[66%] lg:w-[64%] text-center md:text-left mb-12 md:pl-12">
              {/* Badge */}
              <motion.div variants={itemVariants}>
                <div className={`relative inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-10 fade-in-up overflow-hidden ${contentReady ? 'fade-delay-1' : ''}`}>
                  <div className="absolute inset-0 rounded-full p-[1px] bg-gradient-neon">
                    <div className="w-full h-full rounded-full bg-black/80 backdrop-blur-sm" />
                  </div>
                  <div className="relative flex items-center gap-2.5">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse glow-dot"></div>
                    <span className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-gradient-neon-short font-medium">
                      Available for work
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Name */}
              <motion.div variants={itemVariants}>
                <div className={`mb-14 fade-in-up pr-4 md:pr-0 ${contentReady ? 'fade-delay-2' : ''}`}>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem] font-bold leading-[0.85] tracking-tight uppercase font-orbitron overflow-visible max-w-full">
                    <span className="text-gradient-neon animate-gradient-shift block mb-4">Alwen</span>
                    <span className="text-gradient-neon animate-gradient-shift block">Casagan</span>
                  </h1>
                </div>
              </motion.div>

              {/* Role */}
              <motion.div variants={itemVariants}>
                <div className={`min-h-[3rem] mb-10 fade-in-up ${contentReady ? 'fade-delay-3' : ''}`}>
                  <p
                    aria-label={`Current role: ${!shouldReduceMotion ? 'typing...' : 'Full-Stack Software Engineer'}`}
                    className="text-xl md:text-2xl font-bold font-orbitron tracking-tight text-gradient-neon whitespace-nowrap min-w-[200px]"
                  >
                    <TypingRole enabled={!shouldReduceMotion} />
                    <span aria-hidden="true" className="inline-block w-[2px] h-[1.2em] bg-cyan-400 ml-2 animate-pulse shadow-[0_0_10px_#00d4ff,0_0_20px_#00d4ff] align-middle"></span>
                  </p>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants}>
                <div className={`flex flex-wrap justify-center md:justify-start gap-5 mb-16 pointer-events-auto fade-in-up ${contentReady ? 'fade-delay-4' : ''}`}>
                  <a href="/api/download" aria-label="Download my resume as PDF" className={btn1Class}>
                    Download CV
                  </a>
                  <a href="#projects" aria-label="View my project portfolio" className={btn2Class} onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById('projects');
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-neon-short"></div>
                    <div className="relative z-10 group-hover:text-white transition-colors duration-300">
                      View Projects
                    </div>
                  </a>
                </div>
              </motion.div>

              {/* Social & Stats */}
              <motion.div variants={itemVariants}>
                <div className={`flex flex-col sm:flex-row items-center gap-8 pointer-events-auto fade-in-up ${contentReady ? 'fade-delay-5' : ''}`}>
                  <div className="flex gap-4">
                    {[
                      { href: "https://github.com/alwencasagan549-oss", icon: "github", label: "Visit my GitHub profile" },
                      { href: "https://linkedin.com", icon: "linkedin", label: "Visit my LinkedIn profile" },
                      { href: "https://facebook.com", icon: "facebook", label: "Visit my Facebook profile" }
                    ].map((social) => (
                      <a key={social.icon} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                        className="group cursor-pointer w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-black/40 border border-gray-700/50 hover:border-transparent hover:shadow-[0_0_20px_rgba(255,0,64,0.3)] relative overflow-hidden icon-glow">
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[1.5px] bg-gradient-neon">
                          <div className="w-full h-full rounded-xl bg-black" />
                        </div>
                        <div className="relative z-10"><SocialIcon name={social.icon} /></div>
                      </a>
                    ))}
                  </div>

                  <div className="hidden sm:block w-px h-10 bg-gradient-to-b from-[#ff0040] via-[#ff6a00] to-[#00d4ff] opacity-60"></div>

                  <div className="flex gap-8 sm:gap-12">
                    {[
                      { label: "Years Exp", val: "3+" },
                      { label: "Projects", val: "20+" },
                      { label: "Tech Stack", val: "10+" }
                    ].map((stat) => (
                      <div key={stat.label} className="group cursor-default text-center md:text-left">
                        <div className="text-3xl font-bold text-gradient-neon leading-none mb-1.5 overflow-hidden">
                          <span className="inline-block transition-transform duration-300 group-hover:scale-105 origin-left">{stat.val}</span>
                        </div>
                        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 group-hover:text-cyan-400 transition-colors duration-300">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="hidden md:block w-1/3 pointer-events-none"></div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div role="note" aria-label="Scroll down for more content"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce pointer-events-auto">
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

export const HomeSection = memo(HomeSectionComponent);
