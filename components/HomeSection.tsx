'use client';

import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Leapfrog } from 'ldrs/react';
import 'ldrs/react/Leapfrog.css';

// Load Spline components only on client, with a simple fallback
const SplineBackground = dynamic(() => import('./SplineBackground'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black z-0" />,
});

const SplineViewer = dynamic(() => import('./SplineViewer'), {
  ssr: false,
  loading: () => <div className="absolute right-0 top-0 h-full w-1/2 bg-black z-10" />,
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

  const gradient = (
    <defs>
      <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff0040" />
        <stop offset="50%" stopColor="#ff6a00" />
        <stop offset="100%" stopColor="#00d4ff" />
      </linearGradient>
    </defs>
  );

  if (name === 'github') return (
    <svg {...commonProps} stroke="url(#iconGradient)">
      {gradient}
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  );
  if (name === 'linkedin') return (
    <svg {...commonProps} stroke="url(#iconGradient)">
      {gradient}
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
  if (name === 'facebook') return (
    <svg {...commonProps} stroke="url(#iconGradient)">
      {gradient}
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
  return null;
}

function HomeSectionComponent() {
  const [roleText, setRoleText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [robotLoaded, setRobotLoaded] = useState(false);
  const [animationReady, setAnimationReady] = useState(false);
  const allLoaded = bgLoaded && robotLoaded;
  const contentReady = allLoaded && animationReady;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Jump animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setIsJumping(true);
      // Stop the jump after 400ms
      setTimeout(() => setIsJumping(false), 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Set animationReady after robot loads (wait for entrance animation)
  useEffect(() => {
    if (robotLoaded) {
      const timer = setTimeout(() => setAnimationReady(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [robotLoaded]);

  // Fallback timer for loading
  useEffect(() => {
    const fallback = setTimeout(() => {
      if (!allLoaded) {
        setBgLoaded(true);
        setRobotLoaded(true);
      }
    }, 10000); // Force load after 10s
    return () => clearTimeout(fallback);
  }, [allLoaded]);

  useEffect(() => {
    if (!contentReady) return;

    const roles = ['Full-Stack Software Engineer', 'Web Developer','Networking','Technician','System Architect'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        setRoleText(currentRole.substring(0, charIndex - 1));
        charIndex--;
        typingSpeed = 50;
      } else {
        setRoleText(currentRole.substring(0, charIndex + 1));
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before typing next
      }

      setTimeout(type, typingSpeed);
    };

    const timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, [contentReady]);

  const btn1Class = `group relative px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 bg-white text-black hover:text-white hover:bg-gradient-to-r hover:from-[#ff0040] hover:via-[#ff6a00] hover:to-[#00d4ff] shadow-xl hover:shadow-[0_0_40px_rgba(255,0,64,0.4)] active:scale-95 ${isJumping ? 'jump-active' : ''}`;

  const btn2Class = `px-8 py-4 rounded-xl font-medium text-base transition-all duration-300 relative overflow-hidden group border border-gray-800/50 bg-black/50 text-gray-300 hover:border-transparent hover:shadow-[0_0_30px_rgba(255,0,64,0.3)] active:scale-95 ${isJumping ? 'jump-active-delayed' : ''}`;

  return (
    <section id="home" className="min-h-screen bg-black relative overflow-hidden">
      {/* Custom AC Loading Screen */}
      {!contentReady && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-6">
          {/* Brand Logo */}
          <div className="text-6xl font-bold font-orbitron bg-gradient-to-r from-[#ff0040] to-[#00d4ff] bg-clip-text text-transparent">
            AC
          </div>

          {/* New Animated Loader */}
          <Leapfrog
            size="50"
            speed="2.5"
            color="#00d4ff"
          />

          {/* Loading Text */}
          <p className="text-xs font-mono text-gray-500 animate-pulse tracking-[0.2em]">
            LOADING INTERFACE...
          </p>
        </div>
      )}

      {/* Background Scene */}
      <SplineBackground onLoad={() => setBgLoaded(true)} />
      
      {/* Tech Overlay */}
      <div className="tech-overlay" />
      
      {/* Interactive Cursor Glow */}
      <div
        className="fixed pointer-events-none w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl transition-transform duration-300"
        style={{ transform: `translate(${mousePos.x - 192}px, ${mousePos.y - 192}px)` }}
      />
      
      {/* 3D Model Background/Right Side */}
      <SplineViewer onLoad={() => setRobotLoaded(true)} />
      
      {/* Robot Glow */}
      <div className="robot-glow" />
      
      {/* Main Content Container */}
      <motion.div
        className={`relative z-20 min-h-screen flex items-center transition-opacity duration-1000 pointer-events-none ${contentReady ? 'opacity-100' : 'opacity-0'}`}
        initial="hidden"
        animate={contentReady ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between pt-24 pb-12">
            {/* Left Side Content */}
            <div className="w-full md:w-[55%] lg:w-1/2 text-center md:text-left mb-12 md:pl-12">
              {/* AVAILABLE FOR WORK Badge */}
              <motion.div variants={itemVariants}>
                <div className={`relative inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-10 fade-in-up overflow-hidden ${contentReady ? 'fade-delay-1' : ''}`}>
                {/* Gradient border using pseudo element */}
                <div className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-[#ff0040] via-[#ff6a00] to-[#00d4ff]">
                  <div className="w-full h-full rounded-full bg-black/80 backdrop-blur-sm" />
                </div>

                {/* Content */}
                <div className="relative flex items-center gap-2.5">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse glow-dot"></div>
                  <span className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] bg-gradient-to-r from-[#ff0040] to-[#00d4ff] bg-clip-text text-transparent font-medium">
                    Available for work
                  </span>
                </div>
              </div>
              </motion.div>
              
              {/* Name */}
              <motion.div variants={itemVariants}>
                <div className={`mb-14 fade-in-up ${contentReady ? 'fade-delay-2' : ''}`}>
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] font-bold leading-[0.85] tracking-tighter uppercase font-orbitron">
                  <span className="tech-text block mb-4">Alwen</span>
                  <span className="tech-text block">Casagan</span>
                </h1>
              </div>
              </motion.div>
              
              {/* Role */}
              <motion.div variants={itemVariants}>
                <div className={`min-h-[3rem] mb-10 fade-in-up ${contentReady ? 'fade-delay-3' : ''}`}>
                <p className="text-xl md:text-2xl font-bold font-orbitron tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ff0040] via-[#ff6a00] to-[#00d4ff] whitespace-nowrap min-w-[200px]">
                  {roleText}
                  <span className="inline-block w-[2px] h-[1.2em] bg-cyan-400 ml-2 animate-pulse shadow-[0_0_10px_#00d4ff,0_0_20px_#00d4ff] align-middle"></span>
                </p>
              </div>
              </motion.div>
              
              {/* CTA Buttons */}
              <motion.div variants={itemVariants}>
                <div className={`flex flex-wrap justify-center md:justify-start gap-5 mb-16 pointer-events-auto fade-in-up ${contentReady ? 'fade-delay-4' : ''}`}>

                {/* Download CV Button */}
                <button className={btn1Class}>
                  Download CV
                </button>

                {/* View Projects Button */}
                <button className={btn2Class}>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#ff0040] to-[#00d4ff]"></div>
                  <div className="relative z-10 group-hover:text-white transition-colors duration-300">
                    View Projects
                  </div>
                </button>

              </div>
              </motion.div>
              
              {/* Social & Stats Row */}
              <motion.div variants={itemVariants}>
                <div className={`flex flex-col sm:flex-row items-center gap-8 pointer-events-auto fade-in-up ${contentReady ? 'fade-delay-5' : ''}`}>
                {/* Social Icons */}
                <div className="flex gap-4">
                  {[
                    { href: "https://github.com/alwencasagan549-oss", icon: "github" },
                    { href: "https://linkedin.com", icon: "linkedin" },
                    { href: "https://facebook.com", icon: "facebook" }
                  ].map((social) => (
                    <a
                      key={social.icon}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-black/40 border border-gray-700/50 hover:border-transparent hover:shadow-[0_0_20px_rgba(255,0,64,0.3)] relative overflow-hidden icon-glow"
                    >
                      {/* Gradient Border on Hover (Using pseudo-element trick) */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[1.5px] bg-gradient-to-r from-[#ff0040] via-[#ff6a00] to-[#00d4ff]">
                        <div className="w-full h-full rounded-xl bg-black" />
                      </div>

                      {/* Icon with gradient (always on, not just hover) */}
                      <div className="relative z-10">
                        <SocialIcon name={social.icon} />
                      </div>
                    </a>
                  ))}
                </div>

                {/* Vertical Divider - Now Gradient */}
                <div className="hidden sm:block w-px h-10 bg-gradient-to-b from-[#ff0040] via-[#ff6a00] to-[#00d4ff] opacity-60"></div>

                {/* Stats */}
                <div className="flex gap-8 sm:gap-12">
                  {[
                    { label: "Years Exp", val: "3+" },
                    { label: "Projects", val: "20+" },
                    { label: "Tech Stack", val: "10+" }
                  ].map((stat, index) => (
                    <div key={stat.label} className="group cursor-default text-center md:text-left">
                      {/* Stat Number with Gradient and Glow */}
                      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0040] via-[#ff6a00] to-[#00d4ff] leading-none mb-1.5 group-hover:scale-105 transition-transform duration-300">
                        {stat.val}
                      </div>

                      {/* Stat Label with Gradient */}
                      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-500 group-hover:from-[#ff6a00] group-hover:to-[#00d4ff] transition-all duration-300">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </motion.div>
            </div>
            
            {/* Right Side Spacer for Spline (SplineViewer is absolute/fixed) */}
            <div className="hidden md:block w-1/2 pointer-events-none"></div>
          </div>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce pointer-events-auto">
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

export const HomeSection = memo(HomeSectionComponent);
