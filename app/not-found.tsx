'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,212,255,0.08),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(255,0,64,0.06),transparent_55%)]" />
      </div>

      <div className="relative max-w-xl w-full">
        <div className="relative rounded-3xl border border-cyan-500/20 bg-[#0a0e1a]/80 p-8 md:p-10 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true" style={{ background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,212,255,0.5) 2px, rgba(0,212,255,0.5) 4px)' }} />

          <p className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 mb-4">404</p>
          <h1 className="text-3xl md:text-4xl font-bold font-orbitron text-white mb-4 leading-tight">
            Page <span className="text-gradient-neon">Not Found</span>
          </h1>
          <p className="text-gray-300 leading-relaxed mb-8">
            Sorry, the page you are looking for does not exist or has been moved.
          </p>

          <button type="button" onClick={() => {
            const target = document.getElementById('home');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }} className="inline-flex items-center justify-center px-8 py-3 rounded-xl font-bold text-base transition-all duration-300 bg-white text-black hover:text-white hover:bg-gradient-to-r hover:from-[#ff0040] hover:via-[#ff6a00] hover:to-[#00d4ff] shadow-xl hover:shadow-[0_0_40px_rgba(255,0,64,0.35)] active:scale-95 cursor-pointer">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
