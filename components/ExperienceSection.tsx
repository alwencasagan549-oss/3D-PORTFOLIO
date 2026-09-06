'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';

const experienceYears = [
  {
    id: 1,
    year: '2023',
    title: 'Frontend Foundation',
    jobTitle: 'Freelance Developer',
    learned: [
      'Mastered HTML5, CSS3, and modern JavaScript (ES6+)',
      'Built responsive layouts with Flexbox and CSS Grid',
      'Learned React fundamentals: components, state, and props',
      'Implemented interactive UIs with React hooks',
      'Understood component lifecycle and state management patterns'
    ],
    projects: ['Blackhole React'],
    struggles: [
      'Debugging complex UI rendering issues',
      'Mastering React component lifecycle and state management',
      'Creating responsive designs that work across all devices',
      'Overcoming imposter syndrome as a beginner developer'
    ],
    overcome: 'Developed systematic debugging approaches and built confidence through consistent practice and project completion.'
  },
  {
    id: 2,
    year: '2024',
    title: 'Backend Mastery',
    jobTitle: 'Freelance Developer',
    learned: [
      'Node.js and Express for server-side development',
      'Database design with SQL and NoSQL systems',
      'RESTful API architecture and best practices',
      'Authentication and authorization systems',
      'Performance optimization and caching strategies'
    ],
    projects: ['Omega AI Assistant'],
    struggles: [
      'Mastering asynchronous programming patterns',
      'Database optimization and query performance',
      'Implementing secure authentication flows',
      'Handling complex business logic efficiently'
    ],
    overcome: 'Developed deep understanding of async/await patterns, implemented database indexing strategies, and built robust security practices through hands-on problem solving.'
  },
  {
    id: 3,
    year: '2025',
    title: 'Full Stack Beginner',
    jobTitle: 'Website Performance Monitor (OJT - DICT)',
    learned: [
      'Monitoring website performance metrics',
      'Analyzing and optimizing page load times',
      'Implementing performance best practices',
      'Using tools like Lighthouse and WebPageTest',
      'Collaborating with development teams to improve performance'
    ],
    projects: ['Website Performance Optimization', 'Performance Monitoring Dashboard'],
    struggles: [
      'Understanding complex performance metrics',
      'Identifying performance bottlenecks',
      'Balancing performance improvements with business requirements',
      'Communicating performance findings to non-technical stakeholders'
    ],
    overcome: 'Developed strong analytical skills and improved communication abilities through hands-on experience and mentorship.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
};

function ExperienceSectionComponent() {
  return (
    <section
      id="experience"
      className="w-full relative overflow-hidden pt-16 md:pt-24 pb-2"
      aria-label="Development Experience Timeline"
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
              Experience
            </span>
          </h2>
          <div className="mt-4 h-1 w-32 bg-gradient-neon rounded-full origin-center shadow-[0_0_15px_rgba(0,212,255,0.8)]" />
        </motion.div>

        {/* Timeline */}
        <div role="list" aria-label="Experience timeline" className="relative">
          {/* Vertical spine */}
          <div
            aria-hidden="true"
            className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 rounded-full"
            style={{
              background: 'linear-gradient(180deg, #ff0040, #ff6a00 50%, #00d4ff)',
              boxShadow: '0 0 6px rgba(255,0,64,0.5), 0 0 12px rgba(0,212,255,0.3)'
            }}
          />

          {/* Experience Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col gap-10 md:gap-14"
          >
            {experienceYears.map((year) => {
              const isRight = year.id % 2 === 1;
              return (
              <motion.div
                key={year.id}
                variants={cardVariants}
                role="listitem"
                className={`relative pl-10 md:pl-0 md:w-[calc(50%-2.5rem)] ${isRight ? 'md:ml-auto' : 'md:mr-auto'}`}
              >
                {/* Connector from spine to card (desktop only) */}
                <div
                  aria-hidden="true"
                  className={`hidden md:block absolute top-7 h-px w-8 bg-cyan-400/60 shadow-[0_0_8px_rgba(0,212,255,0.6)] ${isRight ? 'right-full mr-2' : 'left-full ml-2'}`}
                />

                {/* Timeline dot with pulse ring */}
                <div className="absolute left-[7px] md:left-1/2 md:-translate-x-1/2 top-6">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-1.5 rounded-full border border-cyan-400/40"
                    style={{ animation: 'nodePulse 2s ease-in-out infinite' }}
                  />
                  <div
                    aria-hidden="true"
                    className="w-3 h-3 rounded-full border-2 border-cyan-400 bg-black z-10 relative"
                    style={{
                      boxShadow: '0 0 10px rgba(0,212,255,0.9), 0 0 20px rgba(0,212,255,0.5)'
                    }}
                  />
                </div>

                {/* Year Card */}
                <div className="group relative">
                  {/* Outer glow on hover */}
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-neon opacity-0 group-hover:opacity-25 transition-opacity duration-700 blur-sm" />

                  {/* Corner brackets */}
                  <div aria-hidden="true" className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  <div aria-hidden="true" className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  <div aria-hidden="true" className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  <div aria-hidden="true" className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative bg-[#0a0e1a]/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 md:p-8 hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(0,212,255,0.15),0_0_80px_rgba(255,0,64,0.06)] transition-all duration-500 overflow-hidden">
                    {/* Top gradient line */}
                    <div
                      aria-hidden="true"
                      className="absolute -top-px left-6 right-6 h-px bg-gradient-neon opacity-70 group-hover:opacity-100 group-hover:shadow-[0_0_12px_rgba(0,212,255,0.7)] transition-all duration-500"
                    />

                    {/* Scanline overlay */}
                    <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.025]"
                      style={{
                        background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,212,255,0.5) 2px, rgba(0,212,255,0.5) 4px)'
                      }}
                    />

                    {/* Year badge + title row */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-5">
                      <span
                        className="text-sm font-mono font-bold tracking-[0.25em] uppercase w-fit mx-auto sm:mx-0"
                        style={{
                          color: '#00d4ff',
                          textShadow: '0 0 10px rgba(0,212,255,0.8)'
                        }}
                      >
                        {year.year}
                      </span>
                      <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                      <span className="text-lg font-orbitron text-white font-semibold text-center sm:text-left">
                        {year.title}
                      </span>
                    </div>

                    {/* Job title */}
                    <div className="text-sm font-mono text-cyan-400 mb-5 text-center sm:text-left">
                      {year.jobTitle}
                    </div>

                    {/* What I Learned */}
                    <div className="mb-6">
                      <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-cyan-400 mb-3 flex items-center justify-center sm:justify-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00d4ff]" />
                        What I Learned
                      </h3>
                      <ul className="space-y-2.5 text-gray-200 font-mono text-sm md:text-base">
                        {year.learned.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400/80 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Projects Built */}
                    <div className="mb-6">
                      <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-cyan-400 mb-3 flex items-center justify-center sm:justify-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00d4ff]" />
                        Projects Built
                      </h3>
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        {year.projects.map((project) => (
                          <span key={project} className="px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-mono uppercase tracking-wider hover:border-cyan-400/60 hover:bg-cyan-500/15 transition-all duration-300 cursor-default">
                            {project}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Struggles & Growth */}
                    <div className="mb-5">
                      <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-orange-400 mb-3 flex items-center justify-center sm:justify-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_6px_rgba(255,106,0,0.6)]" />
                        Struggles & Growth
                      </h3>
                      <ul className="space-y-2.5 text-gray-200 font-mono text-sm md:text-base">
                        {year.struggles.map((struggle, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400/80 shrink-0" />
                            <span>{struggle}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Overcome quote */}
                    <div className="relative p-5 bg-black/30 rounded-xl border border-cyan-500/15 overflow-hidden">
                      {/* Quote accent line */}
                      <div aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-neon opacity-70" />

                      <p className="text-cyan-300/90 font-mono text-sm md:text-base leading-relaxed italic pl-3">
                        "{year.overcome}"
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </motion.div>
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

export default memo(ExperienceSectionComponent);