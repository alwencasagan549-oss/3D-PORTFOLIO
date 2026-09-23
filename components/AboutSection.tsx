'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import CurvedLoop from './CurvedLoop';
import TiltImage from '@/components/ui/TiltImage';
import {
  fadeInUpVariants,
  fadeInRightVariants,
  fadeInLeftVariants,
  staggerContainerVariants,
} from '@/components/ui/motion-variants';
import { useDeviceCapabilities, useShouldReduceMotion } from '@/hooks/useDeviceCapabilities';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const capabilities = useDeviceCapabilities();
  const shouldReduceMotion = useShouldReduceMotion(capabilities);

  return (
    <section
      id="about"
      ref={containerRef}
      className="w-full relative overflow-hidden pt-16 md:pt-24 pb-2"
    >
      <div className="relative z-10 max-w-[980px] mx-auto px-6 md:px-8 w-full">

        {/* Title - Centered */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center text-center mb-12 md:mb-16"
        >
          <motion.h2
            variants={fadeInUpVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-orbitron tracking-tight"
          >
            <span className="text-gradient-neon animate-gradient-shift neon-text-glow-red">About</span>
            <span className="text-white ml-3 md:ml-4 neon-text-glow-cyan-strong">Me</span>
          </motion.h2>
          <motion.div
            variants={fadeInUpVariants}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="mt-4 h-1 w-32 bg-gradient-neon rounded-full origin-center shadow-[0_0_10px_rgba(0,212,255,0.5)]"
          />
        </motion.div>

        {/* Row: Image + Bio */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">

          {/* Left: Image */}
          <motion.div
            variants={fadeInRightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative w-72 sm:w-80 md:w-96 lg:w-[32rem] aspect-[3/4] pointer-events-auto shrink-0"
          >
            <TiltImage
              src="/images/profile.webp"
              alt="Portrait of Alwin Casagan, a full-stack developer and system architect"
              className="w-full h-full"
              perspectiveStyle={{ perspective: shouldReduceMotion ? 'none' : '800px' }}
              imageSizes="(max-width: 640px) 288px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 512px"
            />
          </motion.div>

          {/* Right: Bio Card */}
          <motion.div
            variants={fadeInLeftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="flex-1 w-full text-center lg:text-left"
          >
            <div className="relative group">
              {/* Outer glow ring */}
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-neon opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-sm" />

              {/* Corner accent brackets */}
              <div aria-hidden="true" className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div aria-hidden="true" className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div aria-hidden="true" className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div aria-hidden="true" className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-cyan-400 rounded-br-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-[#0a0e1a]/80 border border-cyan-500/20 rounded-3xl p-8 md:p-10 hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(0,212,255,0.15),0_0_80px_rgba(255,0,64,0.08)] transition-all duration-500 overflow-hidden">

                {/* Animated top gradient line */}
                <div
                  aria-hidden="true"
                  className="absolute -top-px left-8 right-8 h-px bg-gradient-neon opacity-70 group-hover:opacity-100 group-hover:shadow-[0_0_12px_rgba(0,212,255,0.7)] transition-all duration-500"
                />

                {/* Subtle scanline texture */}
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.03]"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,212,255,0.5) 2px, rgba(0,212,255,0.5) 4px)'
                  }}
                />

                {/* Role tag + subtitle row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-[0.3em] w-fit mx-auto sm:mx-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00d4ff] animate-pulse" />
                    Who I Am
                  </span>
                  <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                </div>

                {/* Main Heading */}
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold font-orbitron mb-6 text-white leading-[1.15] neon-text-glow-white">
                  Building <br className="hidden sm:block" />
                  <span className="text-gradient-neon tech-text-neon">
                    Digital Experiences
                  </span>
                </h3>

                {/* Bio Paragraph with highlighted phrase */}
                <div className="relative mb-8">
                  <p className="font-mono text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed">
                    I'm a passionate full-stack developer and system architect with&nbsp;
                    <span className="relative inline-block">
                      <span className="relative z-10 text-gradient-neon-short font-semibold">3+ years</span>
                      <span aria-hidden="true" className="absolute -bottom-0.5 left-0 right-0 h-2 bg-cyan-500/15 -skew-x-6 rounded-full" />
                    </span>
                    &nbsp;of experience crafting scalable web applications. My focus is on creating seamless user interfaces, robust backend systems, and ensuring high-performance deployments. I love turning complex problems into simple, beautiful, and&nbsp;
                    <span className="relative inline-block">
                      <span className="relative z-10 text-gradient-neon-short font-semibold">intuitive solutions</span>
                      <span aria-hidden="true" className="absolute -bottom-0.5 left-0 right-0 h-2 bg-cyan-500/15 -skew-x-6 rounded-full" />
                    </span>
                    .
                  </p>
                </div>

                {/* Stats row */}
                <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-4 mb-2">
                  {/* Stat 1 */}
                  <div className="relative group/stat">
                    <div className="absolute inset-0 rounded-xl bg-gradient-neon opacity-0 group-hover/stat:opacity-10 transition-opacity duration-500" />
                    <div className="relative bg-white/[0.03] border border-cyan-500/10 rounded-xl p-4 md:p-5 text-center hover:border-cyan-500/30 hover:bg-white/[0.05] transition-[border-color_0.3s,background-color_0.3s] duration-300">
                      <div className="text-3xl md:text-4xl font-bold font-orbitron text-gradient-neon-short neon-stat-glow-cyan mb-1">3+</div>
                      <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-400 leading-tight">Years Experience</div>
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="relative group/stat">
                    <div className="absolute inset-0 rounded-xl bg-gradient-neon opacity-0 group-hover/stat:opacity-10 transition-opacity duration-500" />
                    <div className="relative bg-white/[0.03] border border-cyan-500/10 rounded-xl p-4 md:p-5 text-center hover:border-cyan-500/30 hover:bg-white/[0.05] transition-[border-color_0.3s,background-color_0.3s] duration-300">
                      <div className="text-3xl md:text-4xl font-bold font-orbitron text-gradient-neon-short neon-stat-glow-orange mb-1">20+</div>
                      <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-400 leading-tight">Projects Completed</div>
                    </div>
                  </div>

                  {/* Stat 3 - new */}
                  <div className="relative group/stat hidden sm:block">
                    <div className="absolute inset-0 rounded-xl bg-gradient-neon opacity-0 group-hover/stat:opacity-10 transition-opacity duration-500" />
                    <div className="relative bg-white/[0.03] border border-cyan-500/10 rounded-xl p-4 md:p-5 text-center hover:border-cyan-500/30 hover:bg-white/[0.05] transition-[border-color_0.3s,background-color_0.3s] duration-300">
                      <div className="text-3xl md:text-4xl font-bold font-orbitron text-gradient-neon-short neon-stat-glow-cyan mb-1">10+</div>
                      <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-400 leading-tight">Technologies</div>
                    </div>
                  </div>
                </div>

                {/* Decorative bottom accent */}
                <div aria-hidden="true" className="mt-6 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-width curved marquee strip */}
      <div aria-hidden="true" className="relative z-10 w-full mt-1">
        <CurvedLoop
          marqueeText="Think # Code # Build # "
          speed={shouldReduceMotion ? 0 : 2.5}
          curveAmount={0}
          direction="left"
          interactive={!shouldReduceMotion}
          className="tech-text"
        />
      </div>
    </section>
  );
}
