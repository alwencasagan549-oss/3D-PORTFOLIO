'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [jumpTrigger, setJumpTrigger] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'projects', 'about', 'contact'];
      const scrollY = window.scrollY + 100;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Jump animation loop for navigation
  useEffect(() => {
    const interval = setInterval(() => {
      setJumpTrigger((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const navItems = ['Home', 'Projects', 'About', 'Contact'];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50 transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>

      {/* Animated Glowing Background */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, #ff0040, #ff6a00, #00d4ff, #0088ff, #ff0040)',
          backgroundSize: '300% 100%',
          animation: 'headerShift 6s linear infinite',
          opacity: 0.15,
        }}
      />

      <div className={`max-w-[1440px] mx-auto px-6 md:px-8 flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>

        {/* Left: Logo with Gradient & Glow */}
        <motion.a
          href="#home"
          className={`font-bold font-orbitron tracking-tighter bg-gradient-to-r from-[#ff0040] via-[#ff6a00] to-[#00d4ff] bg-clip-text text-transparent header-logo transition-all duration-300 ${scrolled ? 'text-2xl' : 'text-3xl'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          AC
        </motion.a>

        {/* Navigation Links (Desktop) with Sequential Jump */}
        <nav className="hidden md:flex gap-6">
          <motion.div
            key={jumpTrigger ? 'jump' : 'idle'}
            className="flex gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: {
                transition: {
                  staggerChildren: 0.08,
                  when: "beforeChildren"
                }
              }
            }}
          >
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                variants={{
                  hidden: { y: 0 },
                  visible: {
                    y: [0, -10, 0],
                    transition: {
                      duration: 0.35,
                      ease: "easeInOut",
                    }
                  }
                }}
                className={`relative text-sm font-mono uppercase tracking-wider transition-colors duration-300 hover:text-cyan-400 ${activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-gray-400'} ${scrolled ? 'text-xs' : 'text-sm'}`}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_10px_#00d4ff,0_0_20px_#00d4ff]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </motion.div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-cyan-400 transition-colors duration-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-b border-gray-800/50 p-6 flex flex-col gap-6 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm font-mono uppercase tracking-wider transition-colors duration-300 ${activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-gray-400 hover:text-cyan-400'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scanline Effect */}
      <div className="header-scanline" />
    </header>
  );
}
