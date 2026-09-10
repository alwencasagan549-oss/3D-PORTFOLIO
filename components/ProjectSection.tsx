'use client';

import { memo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

// Projects from GitHub account
const projects = [
  {
    id: 1,
    name: 'Blackhole',
    description: 'A high-end, interactive 3D simulation of a supermassive black hole. A stunning, cinematic space environment that runs smoothly in your browser using WebGL and Three.js.',
    technologies: ['JavaScript', 'Three.js', 'WebGL', 'Vite', 'React'],
    githubUrl: 'https://github.com/alwencasagan549-oss/Blackhole',
    liveUrl: 'https://blackhole1.vercel.app/',
    image: '/images/blackhole.png',
    year: '2026'
  },
  {
    id: 2,
    name: 'Alvin AI Voice Assistant',
    description: 'An AI-powered voice assistant with natural language processing capabilities, designed for seamless voice interactions and intelligent task automation.',
    technologies: ['Python', 'TensorFlow', 'NLP', 'Node.js', 'Speech Recognition'],
    githubUrl: 'https://github.com/alwencasagan549-oss',
    liveUrl: 'https://alvin-ai.example.com',
    image: '/images/alvin-ai-voice-assistant.svg',
    year: '2025'
  },
  {
    id: 3,
    name: 'BrgySync Management System',
    description: 'A comprehensive PHP web app for managing barangay operations — resident records, document requests with QR verification, blotter cases, and financial transactions with role-based access.',
    technologies: ['PHP', 'MySQL', 'Bootstrap 5', 'XAMPP', 'SMS API'],
    githubUrl: 'https://github.com/alwencasagan549-oss/BrgySync-Management-System',
    liveUrl: 'https://by.free.nf/',
    image: '/images/brgysync.png',
    year: '2025'
  },
  {
    id: 4,
    name: 'EduPortal',
    description: 'A premium, production-ready Assignment Portal for students and educators with comprehensive assignment management, tracking, and collaboration features.',
    technologies: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'XAMPP'],
    githubUrl: 'https://github.com/alwencasagan549-oss/EduPortal',
    liveUrl: 'https://reesnhs.l.cd',
    image: '/images/eduportal.png',
    year: '2025'
  },
  {
    id: 5,
    name: 'Inventory & Borrowing System',
    description: 'A centralized system for managing inventory tracking and item borrowing operations, designed to streamline resource management and accountability.',
    technologies: ['JavaScript', 'Node.js', 'MongoDB', 'Express', 'EJS'],
    githubUrl: 'https://github.com/alwencasagan549-oss/IBS',
    liveUrl: 'https://ibs.example.com',
    image: '/images/inventory-borrowing-system.svg',
    year: '2025'
  },
  {
    id: 6,
    name: 'AllWhenQuiz',
    description: 'A high-performance, real-time classroom assessment application for creating, managing, and evaluating quizzes with live results and analytics.',
    technologies: ['Svelte', 'JavaScript', 'Real-time', 'Firebase', 'CSS'],
    githubUrl: 'https://github.com/alwencasagan549-oss/AllWhenQuiz',
    liveUrl: 'https://allwhenquiz.example.com',
    image: '/images/allwhen-quiz.svg',
    year: '2025'
  }
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const }
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.97,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
};

function ProjectSectionComponent() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToProject = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentProjectIndex(index);
    setTimeout(() => setIsAnimating(false), 900);
  };

  const nextProject = () => {
    goToProject(currentProjectIndex === projects.length - 1 ? 0 : currentProjectIndex + 1);
  };

  const prevProject = () => {
    goToProject(currentProjectIndex === 0 ? projects.length - 1 : currentProjectIndex - 1);
  };

  const currentProject = projects[currentProjectIndex];

  return (
    <section
      id="projects"
      className="w-full relative overflow-hidden pt-16 md:pt-24 pb-2"
      aria-label="Project Showcase"
    >
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(255,0,64,0.04) 0%, transparent 60%)'
        }}
      />

      <div className="relative z-10 max-w-[980px] mx-auto px-6 md:px-8 w-full">

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center text-center mb-16 md:mb-20"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-orbitron tracking-tight">
            <span
              className="text-gradient-neon animate-gradient-shift"
              style={{ textShadow: '0 0 20px rgba(255,0,64,0.5), 0 0 40px rgba(0,212,255,0.3)' }}
            >
              My
            </span>
            <span
              className="text-white ml-3 md:ml-4"
              style={{ textShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(0,212,255,0.4)' }}
            >
              Projects
            </span>
          </h2>
          <div className="mt-4 h-1 w-32 bg-gradient-neon rounded-full origin-center shadow-[0_0_15px_rgba(0,212,255,0.8)]" />
        </motion.div>

        {/* Project Cards Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative"
            >
              {/* Project Card */}
              <div className="group relative">
                {/* Outer glow ring */}
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-neon opacity-0 group-hover:opacity-25 transition-opacity duration-700 blur-sm" />

                {/* Corner brackets */}
                <div aria-hidden="true" className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <div aria-hidden="true" className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <div aria-hidden="true" className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <div aria-hidden="true" className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-cyan-400 rounded-br-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative bg-[#0a0e1a]/80 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 md:p-8 hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(0,212,255,0.15),0_0_80px_rgba(255,0,64,0.08)] transition-all duration-500 overflow-hidden">
                  {/* Top gradient line */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-px left-8 right-8 h-px bg-gradient-neon opacity-70 group-hover:opacity-100 group-hover:shadow-[0_0_12px_rgba(0,212,255,0.7)] transition-all duration-500"
                  />

                  {/* Scanline texture */}
                  <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                      background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,212,255,0.5) 2px, rgba(0,212,255,0.5) 4px)'
                    }}
                  />

                  {/* Project Header */}
                  <div className="mb-5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                      <span
                        className="text-sm font-mono font-bold tracking-[0.25em] uppercase w-fit mx-auto sm:mx-0"
                        style={{
                          color: '#00d4ff',
                          textShadow: '0 0 10px rgba(0,212,255,0.8)'
                        }}
                      >
                        {currentProject.year}
                      </span>
                      <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                      <span className="text-xl md:text-2xl font-orbitron text-white font-semibold text-center sm:text-left">
                        {currentProject.name}
                      </span>
                    </div>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                  </div>

                  {/* Project Image */}
                  {currentProject.image && (
                    <div className="mb-6 rounded-xl overflow-hidden border border-cyan-500/15 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/60 to-transparent z-10 pointer-events-none" />
                      <Image
                        src={currentProject.image}
                        alt={`${currentProject.name} screenshot`}
                        className="w-full h-auto object-cover"
                        width={800}
                        height={450}
                      />
                    </div>
                  )}

                  {/* Project Description */}
                  <div className="mb-6">
                    <p className="font-mono text-base md:text-lg text-gray-200 leading-relaxed">
                      {currentProject.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h3 className="text-base font-mono uppercase tracking-[0.2em] text-cyan-400 mb-3 flex items-center justify-center sm:justify-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00d4ff]" />
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      {currentProject.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-mono uppercase tracking-wider hover:border-cyan-400/60 hover:bg-cyan-500/15 transition-all duration-300 cursor-default">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-black/30 border border-cyan-500/30 text-cyan-300 font-mono uppercase tracking-wider text-sm hover:bg-cyan-500/10 hover:border-cyan-400/60 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm-1 15h-3v-2h3v2zm0-3.5h-3v-2h3v2zm1 3.5h-2v-2h2v2zm2.5-4h-2v-2h2v2zm0-3h-2v-2.5h2v2.5z" />
                      </svg>
                      <span>GitHub</span>
                    </a>
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-black/30 border border-cyan-500/30 text-cyan-300 font-mono uppercase tracking-wider text-sm hover:bg-cyan-500/10 hover:border-cyan-400/60 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2v-6zm0 8h2v2h-2v-2z" />
                      </svg>
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2.5 mt-8">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => goToProject(index)}
                aria-label={`Go to project ${index + 1}: ${project.name}`}
                className={`relative w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentProjectIndex
                    ? 'bg-cyan-400 shadow-[0_0_10px_rgba(0,212,255,0.8)] scale-110'
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
              >
                {index === currentProjectIndex && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-cyan-400/60"
                    style={{
                      animation: 'nodePulse 2s ease-in-out infinite'
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-6 mt-6">
            <button
              onClick={prevProject}
              disabled={isAnimating}
              aria-label="Previous project"
              className={`p-3 rounded-full border-2 border-cyan-500/30 bg-black/30 hover:bg-cyan-500/10 transition-all duration-300 ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:border-cyan-400/60'}`}
            >
              <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextProject}
              disabled={isAnimating}
              aria-label="Next project"
              className={`p-3 rounded-full border-2 border-cyan-500/30 bg-black/30 hover:bg-cyan-500/10 transition-all duration-300 ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:border-cyan-400/60'}`}
            >
              <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Project Counter */}
          <div className="flex justify-center mt-5">
            <span className="text-sm font-mono text-gray-400">
              Project {currentProjectIndex + 1} of {projects.length}
            </span>
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
        />
      </div>
    </section>
  );
}

export default memo(ProjectSectionComponent);