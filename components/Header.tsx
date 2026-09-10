'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

        {/* Left: Logo */}
        <a
          href="#home"
          className={`font-bold font-orbitron tracking-tighter bg-gradient-to-r from-[#ff0040] via-[#ff6a00] to-[#00d4ff] bg-clip-text text-transparent header-logo transition-all duration-300 hover:scale-105 active:scale-95 ${scrolled ? 'text-2xl' : 'text-3xl'}`}
        >
          AC
        </a>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => {
            const sectionId = item.toLowerCase();
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item}
                href={`#${sectionId}`}
                className={`relative text-sm font-mono uppercase tracking-wider transition-colors duration-300 hover:text-cyan-400 ${isActive ? 'text-cyan-400' : 'text-gray-400'} ${scrolled ? 'text-xs' : 'text-sm'}`}
              >
                {item}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_10px_#00d4ff,0_0_20px_#00d4ff]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-cyan-400 transition-colors duration-300"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'} overflow-hidden`}>
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-b border-gray-800/50 p-6 flex flex-col gap-6">
          {navItems.map((item) => {
            const sectionId = item.toLowerCase();
            return (
              <a
                key={item}
                href={`#${sectionId}`}
                className={`text-sm font-mono uppercase tracking-wider transition-colors duration-300 ${activeSection === sectionId ? 'text-cyan-400' : 'text-gray-400 hover:text-cyan-400'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            );
          })}
        </div>
      </div>

      {/* Scanline Effect */}
      <div className="header-scanline" />
    </header>
  );
}
