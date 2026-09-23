'use client';

import { memo, useState } from 'react';
import { motion } from 'framer-motion';

const contactInfo = [
  {
    id: 1,
    label: 'Email',
    value: 'alwincasagan549-oss@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    id: 2,
    label: 'GitHub',
    value: 'github.com/alwincasagan549-oss',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    id: 3,
    label: 'LinkedIn',
    value: 'linkedin.com/in/alwincasagan',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
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

export default memo(function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      id="contact"
      className="w-full relative overflow-hidden pt-16 md:pt-24 pb-2"
      aria-label="Contact"
    >
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(255,106,0,0.07) 0%, transparent 60%), ' +
            'radial-gradient(ellipse at 20% 20%, rgba(0,212,255,0.05) 0%, transparent 55%), ' +
            'radial-gradient(ellipse at 80% 75%, rgba(255,0,64,0.05) 0%, transparent 55%)'
        }}
      />

      <div className="relative z-10 max-w-[980px] mx-auto px-6 md:px-8 w-full">

        {/* Section Title */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-center text-center mb-16 md:mb-20"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-orbitron tracking-tight">
            <span className="text-gradient-neon animate-gradient-shift">
              Get
            </span>
            <span className="text-white ml-3 md:ml-4 neon-text-glow-cyan-strong">
              In
            </span>
            <span className="text-gradient-neon animate-gradient-shift">
              Touch
            </span>
          </h2>
          <div className="mt-4 h-1 w-32 bg-gradient-neon rounded-full origin-center shadow-[0_0_15px_rgba(0,212,255,0.8)]" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">

          {/* Left: Contact Info */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-6"
          >
            <p className="font-mono text-lg md:text-xl text-gray-300 leading-relaxed mb-4">
              Have a project in mind or just want to say hello? Drop me a message
              and I will get back to you as soon as possible.
            </p>

            {contactInfo.map((item) => (
              <motion.a
                key={item.id}
                href={`mailto:${item.value}`}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="group relative flex items-center gap-4 bg-[#0a0e1a]/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl px-6 py-5 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(0,212,255,0.15)] transition-all duration-500"
              >
                <div
                  aria-hidden="true"
                  className="absolute -top-px left-6 right-0 h-px bg-gradient-neon opacity-60 group-hover:opacity-100 group-hover:shadow-[0_0_10px_rgba(0,212,255,0.8)] transition-all duration-500"
                />
                <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                  {item.icon}
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
                    {item.label}
                  </span>
                  <span className="text-base font-mono text-gray-200 group-hover:text-white transition-colors duration-300">
                    {item.value}
                  </span>
                </div>
              </motion.a>
            ))}

            {/* Download CV Button */}
            <a
              href="/api/download"
              className="group relative flex items-center gap-4 bg-gradient-neon/10 backdrop-blur-xl border border-cyan-500/30 rounded-2xl px-6 py-5 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-all duration-500 cursor-pointer"
            >
              <div
                aria-hidden="true"
                className="absolute -top-px left-6 right-0 h-px bg-gradient-neon opacity-60 group-hover:opacity-100 group-hover:shadow-[0_0_10px_rgba(0,212,255,0.8)] transition-all duration-500"
              />
              <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
                  Resume
                </span>
                <span className="text-base font-mono text-white group-hover:text-cyan-300 transition-colors duration-300">
                  Download CV
                </span>
              </div>
            </a>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="bg-[#0a0e1a]/80 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 md:p-8 hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(0,212,255,0.15),0_0_80px_rgba(255,0,64,0.08)] transition-all duration-500"
          >
            {/* Gradient top border */}
            <div
              aria-hidden="true"
              className="absolute -top-px left-6 right-6 h-px bg-gradient-neon opacity-60 group-hover:opacity-100 group-hover:shadow-[0_0_10px_rgba(0,212,255,0.8)] transition-all duration-500"
            />

            <h3 className="text-xl md:text-2xl font-bold font-orbitron text-white mb-6">
              Send a Message
            </h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-lg font-mono text-cyan-300">
                  Message sent successfully!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5 block"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-cyan-500/20 rounded-xl px-4 py-3 text-base font-mono text-white placeholder-gray-600 focus:border-cyan-400/60 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5 block"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-cyan-500/20 rounded-xl px-4 py-3 text-base font-mono text-white placeholder-gray-600 focus:border-cyan-400/60 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 transition-all duration-300"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5 block"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-cyan-500/20 rounded-xl px-4 py-3 text-base font-mono text-white placeholder-gray-600 focus:border-cyan-400/60 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 transition-all duration-300 resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="mt-2 w-full py-3 rounded-xl bg-gradient-neon font-mono text-sm font-bold uppercase tracking-wider text-white hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all duration-300"
                >
                  Send Message
                </motion.button>
              </form>
            )}
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
});
