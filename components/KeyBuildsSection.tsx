'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';

const milestoneProjects = [
  {
    id: 1,
    title: 'Nexus Operational Dashboard',
    context: 'Freelance Client',
    hook: 'Unified 5 fragmented data streams into a single real-time interface, cutting operational decision latency by 40%.',
    tags: ['React', 'Next.js 14', 'WebSocket', 'Tailwind'],
    year: '2025',
  },
  {
    id: 2,
    title: 'ShaderPlayground WebGL Editor',
    context: 'Personal Project',
    hook: 'Engineered a GPU-accelerated WebGL shader editor with live GLSL preview under 50ms render time.',
    tags: ['TypeScript', 'Three.js', 'GLSL', 'Vite'],
    year: '2025',
  },
  {
    id: 3,
    title: 'DevForge API Gateway',
    context: 'Open Source Contribution',
    hook: 'Optimized GraphQL resolver batching, reducing average query response time from 800ms to 120ms for 10k+ weekly users.',
    tags: ['Node.js', 'GraphQL', 'PostgreSQL', 'Redis'],
    year: '2024',
  },
  {
    id: 4,
    title: 'Immersive Portfolio V4 (This site)',
    context: 'Personal Project',
    hook: 'Designed an interactive 3D brand experience using Spline while maintaining 95+ Lighthouse scores across all metrics.',
    tags: ['Next.js 15', 'Tailwind', 'Spline', 'Framer Motion'],
    year: '2026',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

function KeyBuildsSectionComponent() {
  return (
    <section
      id="keybuilds"
      className="w-full relative overflow-hidden pt-16 md:pt-24 pb-2"
      aria-label="Key Builds and Milestone Projects"
    >
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.05) 0%, transparent 60%)',
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
              Key
            </span>
            <span
              className="text-white ml-3 md:ml-4"
              style={{ textShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(0,212,255,0.4)' }}
            >
              Builds
            </span>
          </h2>
          <div className="mt-4 h-1 w-32 bg-gradient-neon rounded-full origin-center shadow-[0_0_15px_rgba(0,212,255,0.8)]" />
        </motion.div>

        {/* Timeline */}
        <div role="list" aria-label="Milestone projects timeline" className="relative">
          {/* Vertical spine */}
          <div
            aria-hidden="true"
            className="absolute left-[11px] top-0 bottom-0 w-0.5 rounded-full"
            style={{
              background: 'linear-gradient(180deg, #ff0040, #ff6a00 50%, #00d4ff)',
              boxShadow: '0 0 6px rgba(255,0,64,0.5), 0 0 12px rgba(0,212,255,0.3)',
            }}
          />

          {/* Entries */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col gap-10 md:gap-12"
          >
            {milestoneProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                role="listitem"
                className="relative pl-10 md:pl-12"
              >
                {/* Neon dot */}
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-5 w-5 h-5 rounded-full border-2 border-cyan-400 bg-black z-10"
                  style={{
                    boxShadow: '0 0 8px rgba(0,212,255,0.8), 0 0 16px rgba(0,212,255,0.5)',
                  }}
                />

                {/* Card */}
                <div className="group relative bg-[#0a0e1a]/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 md:p-8 hover:border-cyan-500/40 hover:shadow-[0_0_50px_rgba(0,212,255,0.2)] transition-all duration-500">
                  {/* Gradient top border */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-px left-6 right-6 h-px bg-gradient-neon opacity-60 group-hover:opacity-100 group-hover:shadow-[0_0_10px_rgba(0,212,255,0.8)] transition-all duration-500"
                  />

                  {/* Year */}
                  <div className="mb-3">
                    <span
                      className="text-xs font-mono font-bold tracking-[0.25em] uppercase"
                      style={{
                        color: '#00d4ff',
                        textShadow: '0 0 10px rgba(0,212,255,0.8)',
                      }}
                    >
                      {project.year}
                    </span>
                  </div>

                  {/* Context badge */}
                  <div className="mb-3">
                    <span className="inline-block text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                      {project.context}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold font-orbitron text-white mb-3 tracking-tight">
                    <span className="text-gradient-neon group-hover:from-[#ff6a00] group-hover:to-[#00d4ff] transition-all duration-500">
                      {project.title}
                    </span>
                  </h3>

                  {/* Hook */}
                  <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-6 font-mono font-medium">
                    {project.hook}
                  </p>

                  {/* Tags */}
                  <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-cyan-500/30 bg-gradient-to-r from-[#ff0040]/15 to-[#00d4ff]/15 text-cyan-300 hover:border-cyan-400/60 hover:text-white transition-all duration-300 cursor-default">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
        />
      </div>
    </section>
  );
}

export default memo(KeyBuildsSectionComponent);
