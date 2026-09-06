'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef, memo, useCallback } from 'react';

const navItems = ['Home', 'About', 'Experience', 'Tech Stack', 'Projects', 'Contact'];

function NavLink({ item, activeSection }: { item: string; activeSection: string }) {
  const isActive = activeSection === item.toLowerCase();

  return (
    <motion.a
      href={`#${item.toLowerCase()}`}
      className={`relative text-sm font-mono uppercase tracking-wider transition-colors duration-300 hover:text-cyan-400 cursor-pointer focus-visible:text-cyan-400 ${isActive ? 'text-cyan-400' : 'text-gray-400'} `}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {item}
      {isActive && (
        <motion.div
          layoutId="activeDot"
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_10px_#00d4ff,0_0_20px_#00d4ff]"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </motion.a>
  );
}

const Header = memo(function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sectionOffsetsRef = useRef<Map<string, number>>(new Map());

  // Cache offsetTop values on mount and on resize
  useEffect(() => {
    const updateOffsets = () => {
      const sections = ['home', 'about', 'experience', 'techstack', 'projects', 'contact'];
      sectionOffsetsRef.current = new Map(
        sections.map(section => [section, document.getElementById(section)?.offsetTop ?? 0])
      );
    };
    updateOffsets();
    window.addEventListener('resize', updateOffsets);
    return () => window.removeEventListener('resize', updateOffsets);
  }, []);

  const scrollHandler = useCallback(() => {
    setScrolled(window.scrollY > 50);

    const scrollY = window.scrollY + 100;
    const offsets = sectionOffsetsRef.current;
    let active = 'home';
    for (const [section, offsetTop] of offsets) {
      const el = document.getElementById(section);
      if (el && offsetTop <= scrollY) {
        active = section;
      }
    }
    setActiveSection(active);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          scrollHandler();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollHandler]);

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
          className={`font-bold font-orbitron tracking-tighter text-gradient-neon header-logo transition-all duration-300 cursor-pointer ${scrolled ? 'text-2xl' : 'text-3xl'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          AC
        </motion.a>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <NavLink key={item} item={item} activeSection={activeSection} />
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          className="md:hidden text-gray-400 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-b border-gray-800/50 p-6 flex flex-col gap-6 md:hidden ${isMobileMenuOpen ? '' : 'pointer-events-none'}`}
      >
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={`text-sm font-mono uppercase tracking-wider transition-colors duration-300 cursor-pointer ${activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-gray-400 hover:text-cyan-400'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item}
          </a>
        ))}
      </motion.div>

      {/* Scanline Effect */}
      <div className="header-scanline" />
    </header>
  );
});

export default Header;
