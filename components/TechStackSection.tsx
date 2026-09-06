'use client';

import { memo, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  fadeInUpVariants,
  staggerContainerVariants,
} from '@/components/ui/motion-variants';

const categoryVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

// Tech icon SVGs - sharp, brand-accurate, consistent
const techIcons: Record<string, React.ReactNode> = {
  // Languages
  JavaScript: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <rect width="24" height="24" rx="3" fill="#F7DF1E" />
      <path d="M10.5 17.5c0 .8.7 1.4 1.7 1.4.9 0 1.6-.6 1.6-1.4v-3.6h1.7v3.6c0 1.7-1.4 2.9-3.3 2.9-2 0-3.4-1.2-3.4-2.9h1.7zM16 17.4c0 1.5 1.1 2.5 2.7 2.5 1.5 0 2.6-.9 2.6-2.2 0-1.2-.7-1.8-2.1-2.2l-.8-.2c-.8-.2-1.1-.4-1.1-.8 0-.4.4-.7 1-.7.6 0 1 .3 1.1.8h1.6c-.1-1.4-1.2-2.3-2.7-2.3-1.5 0-2.6.9-2.6 2.1 0 1.2.7 1.8 2 2.1l.7.2c.8.2 1.2.4 1.2.9 0 .5-.5.8-1.1.8-.7 0-1.2-.4-1.3-1H16z" fill="#000" />
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <rect width="24" height="24" rx="3" fill="#3178C6" />
      <path d="M13.2 18.5V17h-3v-1.5h3V14h-3V9.5h-1.5c-.6 0-1.1-.4-1.4-.9-.3-.5-.3-1.1 0-1.6.3-.5.8-.8 1.4-.8H12V4.5c0-.6.4-1.1.9-1.4.5-.3 1.1-.3 1.6 0 .5.3.8.8.8 1.4V6.2h3.5c.6 0 1.1.4 1.4.9.3.5.3 1.1 0 1.6-.3.5-.8.8-1.4.8H15.3v1.5h3.5c.6 0 1.1.4 1.4.9.3.5.3 1.1 0 1.6-.3.5-.8.8-1.4.8H15.3v3.6c0 .6-.4 1.1-.9 1.4-.5.3-1.1.3-1.6 0-.4-.3-.7-.8-.6-1.4zm.5-8h-3v1.5h3v-1.5zm0 3h-3V15h3v-1.5z" fill="#fff" />
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <path d="M11.4 2c-2 0-3.7.3-4.6 1.5C6.2 4.3 6 5.3 6 6.5v3.4h5.5v1H3.6c-1.6 0-3 1.6-3.4 3.7-.5 2.4-.5 3.9 0 6.4.4 1.9 1.4 3.3 3 3.3h1.9v-3c0-1.7 1.5-3.2 3.3-3.2h5.5c1.5 0 2.7-1.2 2.7-2.7V6.5c0-1.4-1.2-2.7-2.7-3.1-1-.3-1.9-.4-2.5-.4zm-3 2.2c.6 0 1 .5 1 1.1 0 .6-.4 1.1-1 1.1s-1-.5-1-1.1c0-.6.4-1.1 1-1.1z" fill="#3776AB" />
      <path d="M22.4 8.3c-.4-1.8-1.4-3-3-3H17.5v2.9c0 1.8-1.5 3.3-3.3 3.3H8.7c-1.5 0-2.7 1.3-2.7 2.8v5.7c0 1.4 1.2 2.2 2.7 2.7 1.8.5 3.5.5 5.5 0 1.4-.4 2.7-1.3 2.7-2.7V16h-5.5v-1H19c1.6 0 2.2-1.3 2.7-3 .5-1.8.5-3.5.1-3.7zm-3.5 6.6c.6 0 1 .5 1 1.1 0 .6-.4 1.1-1 1.1s-1-.5-1-1.1c0-.6.4-1.1 1-1.1z" fill="#FFD43B" />
    </svg>
  ),
  PHP: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="8" fill="#777BB4" />
      <ellipse cx="12" cy="9.5" rx="6.5" ry="3" fill="#FFF" />
      <path d="M9.4 9h1.7c.9 0 1.5.5 1.5 1.3 0 .5-.2.8-.6 1.1.6.2.9.7.9 1.3 0 1-.7 1.6-1.8 1.6H9.4V9zm1.5 1.3v1h.3c.4 0 .6-.2.6-.5s-.2-.5-.6-.5h-.3zm0 2.1v1.1h.4c.5 0 .7-.2.7-.5 0-.4-.2-.6-.7-.6h-.4zM13.4 9h1.5l1.2 5.3h-1.4l-.2-.9h-1l-.2.9h-1.4L13.4 9zm.5 1.3l-.4 2h.8l-.4-2z" fill="#000" />
    </svg>
  ),
  Go: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <path d="M3 9.5C3 7 7 5 12 5s9 2 9 4.5c0 1.2-1 2.3-2.6 3.1.2.2.3.5.3.8 0 .9-1 1.6-2.3 1.6-1.1 0-1.9-.5-2.6-1.2-.6.3-1.2.4-1.8.4-.5 0-1-.1-1.4-.3C9.8 14.6 9 15 8 15c-1.3 0-2.3-.7-2.3-1.6 0-.3.1-.6.3-.8C4 11.8 3 10.7 3 9.5z" fill="#00ADD8" />
      <path d="M9 6.5c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5s-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5zm5 0c0-.3.2-.5.5-.5h2c.3 0 .5.2.5.5s-.2.5-.5.5h-2c-.3 0-.5-.2-.5-.5z" fill="#FFF" />
      <ellipse cx="8" cy="9.5" rx="1" ry="1.3" fill="#FFF" />
      <ellipse cx="12" cy="9.5" rx="1" ry="1.3" fill="#FFF" />
      <path d="M5 19h14l-1.4-2.4c-.2-.3-.5-.5-.9-.5H7.3c-.4 0-.7.2-.9.5L5 19z" fill="#00ADD8" />
    </svg>
  ),
  HTML: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <path d="M4.5 2L6 19l6 3 6-3L19.5 2h-15z" fill="#E44D26" />
      <path d="M12 20.4l4.8-2.4L17.9 4H12v16.4z" fill="#F16529" />
      <path d="M12 4H6.1l1.1 12L12 17.5V4z" fill="#E44D26" />
      <path d="M12 4v4.5h5l-.4-4.5H12zm0 6.8v3.2l-2.6-.7-.2-2.5H7l.4 4.3L12 17.5l4.6-1.4.5-5.3H12z" fill="#EBEBEB" />
      <path d="M12 4H7l.4 4.5H12V4zm0 6.8H9.2l.2 2.5L12 14V10.8zm0 0v3.2l2.6-.7.2-2.5H12z" fill="#FFF" />
    </svg>
  ),
  CSS: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <path d="M4.5 2L6 19l6 3 6-3L19.5 2h-15z" fill="#264DE4" />
      <path d="M12 20.4l4.8-2.4L17.9 4H12v16.4z" fill="#2965F1" />
      <path d="M7 6.5h10l-.2 2.5H8L8 6.5zM7.5 11.5h6.8l-.3 3.1L12 15.5l-2.2-.7-.1-1.5h-2l.3 3 4 1.1 4-1.1.5-5.4H7.5z" fill="#EBEBEB" />
      <path d="M8 6.5L8 9h4V6.5H8zm-.5 5h5.8l-.3 3.1L12 15.5l-2.2-.7-.1-1.5h-2l.3 3 4 1.1V14l-2.2-.7-.1-1.5h2.5l.3-3.3H7.5z" fill="#FFF" />
    </svg>
  ),
  // Frontend
  React: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1" fill="none" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(120 12 12)" />
    </svg>
  ),
  'Next.js': (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <circle cx="12" cy="12" r="10" fill="#000" />
      <path d="M16.5 17L9 8h-1.5v8h1.5v-6.2L15 17h1.5zM16 8v1.5h1.5V8H16z" fill="#fff" />
    </svg>
  ),
  Svelte: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <path d="M21 4.5C19.3 1.5 15.5.4 12.2 1.8 9.7 2.9 8.2 5.1 7.6 7.7c-.3 1.4-.4 2.7-.2 4-1.1.6-2.5.6-3.5.2-1.5-.5-2.6-2-2.9-3.8-.5-3 .2-6 2.3-8.4 2.7-3.1 6.9-4.4 10.8-3.4 3.2.8 5.7 3 7 5.9.5 1 .5 2.1.2 3.1 1.1.3 2.3.2 3.2-.3 1.6-.8 2.6-2.4 2.6-4.1.1-1.4-.3-2.8-1.1-4z" fill="#FF3E00" />
      <path d="M7.5 19.3c1.1 1.5 2.7 2.6 4.5 2.6 1.7 0 3.4-1.1 4-2.6.5-1.5 0-3.2-1.5-4.4-1.3-1.1-3-1.7-4.5-1.7 1.2-.7 2.5-1 3.8-.7 1.5.4 2.7 1.6 3.1 3.1.2.7.2 1.5 0 2.2-.4 1.3-1.5 2.3-2.9 2.4-1.5.1-3-.7-3.6-2.1-.4-1 .2-2.1 1.2-2.4.8-.2 1.6.2 1.9 1 .1.4.5.6.9.5.4-.1.6-.5.5-.9-.5-1.4-1.9-2.3-3.4-2-1.8.4-3 2.2-2.6 4 .2 1 .9 1.9 1.8 2.4-.4.1-.8.1-1.2 0z" fill="#FF3E00" />
    </svg>
  ),
  'Bootstrap 5': (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#7952B3" />
      <path d="M7 6.5h5.7c1.7 0 2.8.9 2.8 2.3 0 1-.5 1.6-1.3 2 .9.3 1.5 1.1 1.5 2.2 0 1.7-1.2 2.5-3.2 2.5H7V6.5zm2.4 4.4h2.6c.9 0 1.4-.4 1.4-1.1 0-.7-.5-1-1.4-1H9.4v2.1zm0 3.7h2.7c1 0 1.6-.4 1.6-1.2 0-.7-.5-1.2-1.6-1.2H9.4v2.4z" fill="#fff" />
    </svg>
  ),
  'Tailwind CSS': (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <path d="M12 4.5c-2.2 0-3.7 1.1-4.5 3.2.9-1 2-1.4 3.3-1.1 1.4.3 2.4 1.5 3.2 2.5.9 1.1 1.8 2.3 3.5 2.3 2.2 0 3.7-1.1 4.5-3.2-.9 1-2 1.4-3.3 1.1-1.4-.3-2.4-1.5-3.2-2.5C14.6 5.7 13.7 4.5 12 4.5z" fill="#06B6D4" />
      <path d="M7.5 12c-2.2 0-3.7 1.1-4.5 3.2.9-1 2-1.4 3.3-1.1 1.4.3 2.4 1.5 3.2 2.5.9 1.1 1.8 2.3 3.5 2.3 2.2 0 3.7-1.1 4.5-3.2-.9 1-2 1.4-3.3 1.1-1.4-.3-2.4-1.5-3.2-2.5-.9-1.1-1.8-2.3-3.5-2.3z" fill="#06B6D4" />
    </svg>
  ),
  Vite: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <path d="M21.4 4.2L13 20.5c-.2.4-.7.5-1 .2L8 17.5l-1.5 1.4c-.3.3-.8.1-.8-.3v-3.7l9.8-9.3c.2-.2 0-.5-.2-.4L5.2 11.6 2 9.4c-.4-.2-.3-.8.1-.9L20.4 3c.4-.1.7.3.6.7l-.6.5z" fill="#646CFF" />
      <path d="M21.4 4.2L13 20.5c-.2.4-.7.5-1 .2L8 17.5l3.8-3.6 5.7-5.4c.2-.2 0-.5-.2-.4L8 13.1l-2.8-1.5L21.4 4.2z" fill="#000" opacity=".3" />
    </svg>
  ),
  'Three.js': (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2z" fill="#000" />
      <path d="M12 2L2 7.5l10 5.5 10-5.5L12 2z" fill="#049EF4" />
      <path d="M12 12.5L2 7.5v9L12 21.5v-9z" fill="#049EF4" opacity=".7" />
      <path d="M12 12.5L22 7.5v9L12 21.5v-9z" fill="#049EF4" opacity=".5" />
      <path d="M12 13l-3 1.5 3 1.5 3-1.5L12 13z" fill="#fff" />
    </svg>
  ),
  WebGL: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <rect width="24" height="24" rx="3" fill="#990000" />
      <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="#fff" strokeWidth="1" />
      <path d="M7 7l3 10 4-10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M8.5 11.5h3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  SCSS: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <rect width="24" height="24" rx="3" fill="#CD6799" />
      <path d="M5 17.5c0-1 .7-1.7 1.7-1.7h.8v-1.3h-.5c-.5 0-.8-.3-.8-.7 0-.4.3-.7.8-.7H8c.4 0 .7.2.9.5l1.3 1.7 1.3-1.7c.2-.3.5-.5.9-.5h1c.5 0 .8.3.8.7 0 .4-.3.7-.8.7h-.5v1.3h.8c1 0 1.7.7 1.7 1.7s-.7 1.7-1.7 1.7H6.7c-1 0-1.7-.7-1.7-1.7zm1.5 0c0 .1.1.2.2.2H8.4v-1.4h-1.7c-.1 0-.2.1-.2.2v1zm3.4-.2c0 .1.1.2.2.2h1.2c.1 0 .2-.1.2-.2v-1c0-.1-.1-.2-.2-.2h-1.2c-.1 0-.2.1-.2.2v1zm3.4 0c0 .1.1.2.2.2h1.2c.1 0 .2-.1.2-.2v-1c0-.1-.1-.2-.2-.2h-1.2c-.1 0-.2.1-.2.2v1zM6 19.5h12v1.5H6v-1.5z" fill="#fff" />
    </svg>
  ),
  // Backend
  'Node.js': (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <path d="M12 2L4 6.5v9L12 20l8-4.5v-9L12 2z" fill="#339933" />
      <path d="M12 4.5L6 7.5v7L12 17.5l6-3v-7l-6-3z" fill="#fff" />
      <path d="M9.5 9.5h2.5l-1 1.5H10v3.5h-1V10c0-.3.2-.5.5-.5z" fill="#339933" />
      <path d="M13 9.5h1v5h-1v-5z" fill="#339933" />
      <path d="M15 9.5h.5l1 2.5 1-2.5h.5v5h-1V12l-.5 1h-1l-.5-1v2.5h-1v-5z" fill="#339933" />
    </svg>
  ),
  Express: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <rect width="24" height="24" rx="3" fill="#000" />
      <path d="M4 18l4-12 4 12h-2l-.7-2.2H6.7L6 18H4zm3.4-3.7h1.2L8 11.8l-.6 2.5zM13 18V8.5c0-.8.6-1.5 1.5-1.5h.5c.8 0 1.5.7 1.5 1.5V18h-1.8V8.8c0-.2-.1-.3-.3-.3-.1 0-.3.1-.3.3V18H13z" fill="#fff" />
    </svg>
  ),
  Firebase: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <path d="M5.5 14.5L4 21h16l-1.5-6.5L13 11l-3 1.5-4.5 2z" fill="#FFA000" />
      <path d="M5.5 14.5L4 21l5-8L7 8l-1.5 6.5z" fill="#F57C00" />
      <path d="M7 8l2 5 4-2-3-5-3 2z" fill="#FFCA28" />
      <path d="M13 6l-3 5 3 1 4.5 2.5L13 6z" fill="#FFA000" />
      <path d="M13 6l4.5 9.5L19 14l-3-7-3-1z" fill="#FF6F00" />
    </svg>
  ),
  // Database
  MySQL: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <ellipse cx="12" cy="5.5" rx="8" ry="2.8" fill="#00758F" />
      <path d="M4 5.5v13c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8v-13c0 1.5-3.6 2.8-8 2.8S4 7 4 5.5z" fill="#00758F" />
      <ellipse cx="12" cy="5.5" rx="8" ry="2.8" fill="#F29111" />
      <path d="M12 8.3c-4.4 0-8-1.3-8-2.8v3c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8v-3c0 1.5-3.6 2.8-8 2.8z" fill="#00758F" />
      <path d="M12 14.3c-4.4 0-8-1.3-8-2.8v3c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8v-3c0 1.5-3.6 2.8-8 2.8z" fill="#F29111" opacity=".85" />
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <path d="M12 2c-1.8 3.5-5 7-5 12 0 2.2 1.2 4 3 4.5V22h4v-3.5c1.8-.5 3-2.3 3-4.5 0-5-3.2-8.5-5-12z" fill="#00684A" />
      <path d="M12 2c-1.8 3.5-5 7-5 12 0 2.2 1.2 4 3 4.5V22h2V2z" fill="#13AA52" />
      <path d="M11 2v22h2V2h-2z" fill="#00684A" />
      <path d="M12 5c-1 2-3 4-3 8 0 1.5.7 2.5 1.8 2.8V18h2.4v-2.2c1.1-.3 1.8-1.3 1.8-2.8 0-4-2-6-3-8z" fill="#fff" opacity=".15" />
    </svg>
  ),
  // Tools
  'Git/GitHub': (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.51 2.87 8.34 6.84 9.69.5.09.68-.22.68-.49v-1.7c-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05.8-.23 1.65-.34 2.5-.34s1.7.11 2.5.34c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.64 1.03 2.76 0 3.94-2.33 4.81-4.56 5.07.36.32.68.94.68 1.9v2.81c0 .27.18.59.69.49 4-1.35 6.84-5.18 6.84-9.69C22 6.58 17.52 2 12 2z" fill="#181717" />
    </svg>
  ),
  Docker: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <path d="M22 9.4c-.4-.3-1.4-.5-2.5-.3-.1.1-.2.2-.2.4 0 .2 0 .4.1.6-.5.2-1.2.4-1.9.4-1.6-2.3-4.4-2.4-4.4-2.4l-.2.2c1.7.4 2.7 1.4 3.3 2.3-1.4-.7-3.2-1-5.1-1-1.4 0-2.7.2-3.8.6H4.5v-1c0-.3-.2-.5-.5-.5s-.5.2-.5.5v1.4c-.6.3-1.2.6-1.6 1l-.2.2c-.4.5-.5 1.1-.5 1.6 0 1.4.9 2.8 2.4 3.9 1.7 1.2 3.9 1.9 6.2 1.9 1.5 0 2.9-.3 4.2-.8 1.5-.6 2.7-1.4 3.6-2.4 1.3-1.5 2-3.4 2.1-5.4.3 0 .6 0 .9-.1.8-.2 1.3-.7 1.4-1.1z" fill="#2496ED" />
      <path d="M4 12.5h2v2H4v-2zm3 0h2v2H7v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zM4 9.5h2v2H4v-2zm3 0h2v2H7v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zM4 6.5h2v2H4v-2zm3 0h2v2H7v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2z" fill="#2496ED" />
    </svg>
  ),
  'VS Code': (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <path d="M17.5 2.5L22 4.5v15l-4.5 2-13-9.5 13-8.5z" fill="#0066B8" />
      <path d="M17.5 2.5L4.5 12l13 9.5v-19z" fill="#007ACC" />
      <path d="M17.5 5L8 12l9.5 7V5z" fill="#1F9CF0" opacity=".4" />
      <path d="M3 4l1.5-1L17.5 12 4.5 21 3 20V4z" fill="#007ACC" />
      <path d="M3 4v16l1.5 1 1.5-1V4L4.5 3 3 4z" fill="#0066B8" />
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <path d="M8 2h4v6.5H8c-1.7 0-3-1.3-3-3s1.3-3.5 3-3.5z" fill="#F24E1E" />
      <path d="M12 2h4c1.7 0 3 1.5 3 3.5s-1.3 3-3 3h-4V2z" fill="#FF7262" />
      <path d="M12 8.5h4c1.7 0 3 1.3 3 3s-1.3 3.5-3 3.5-3-1.5-3-3.5v-3z" fill="#A259FF" />
      <path d="M8 8.5h4V15c0 2-1.3 3.5-3 3.5S5 17 5 15.5s1.3-3.5 3-3.5 3 1.5 3 3.5V8.5H8z" fill="#1ABCFE" />
      <path d="M8 15c0-2 1.3-3.5 3-3.5s3 1.5 3 3.5-1.3 3.5-3 3.5S8 17 8 15z" fill="#0ACF83" />
    </svg>
  ),
  Linux: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <path d="M14.5 17.5c-.4.5-1.4.8-2.5.8s-2.1-.3-2.5-.8c-.3-.4 0-1 .5-1.1 1.3-.3 2.7-.3 4 0 .5.1.8.7.5 1.1z" fill="#333" />
      <path d="M12 2c-3 0-5 2.5-5 6 0 2 1 4 1 5.5 0 1-.5 2-1 3-.5 1 0 2 1 2.5 1 .5 2.5.5 3 .5h2c.5 0 2 0 3-.5 1-.5 1.5-1.5 1-2.5-.5-1-1-2-1-3 0-1.5 1-3.5 1-5.5 0-3.5-2-6-5-6z" fill="#333" />
      <circle cx="10.5" cy="10" r="1" fill="#fff" />
      <circle cx="13.5" cy="10" r="1" fill="#fff" />
      <path d="M11 12.5c.3.3.7.5 1 .5s.7-.2 1-.5" stroke="#fff" strokeWidth=".6" strokeLinecap="round" fill="none" />
      <path d="M7 7c1-2 2.5-3 5-3s4 1 5 3" stroke="#F90" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M5.5 6c1.5-2.5 3.5-3.5 6.5-3.5s5 1 6.5 3.5" stroke="#F90" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity=".6" />
    </svg>
  ),
  XAMPP: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
      <rect width="24" height="24" rx="3" fill="#FB7A24" />
      <path d="M3.5 6.5h17v11h-17v-11z" fill="#fff" />
      <path d="M5 8.5h2.5v1.5h-1V12h1v1.5H5V8.5zM9 8.5h1.5L11 11l.5-2.5H13v5h-1.2v-2.8l-.5 2-.5-2v2.8H9.5v-5zM14.5 8.5h1.5l1 3.5v-3.5h1.2v5h-1.5l-1-3.5v3.5h-1.2v-5z" fill="#FB7A24" />
    </svg>
  ),
};

interface TechItem {
  name: string;
  icon: React.ReactNode;
}

interface TechCategory {
  title: string;
  items: TechItem[];
}

const techCategories: TechCategory[] = [
  {
    title: 'Languages',
    items: [
      { name: 'JavaScript', icon: techIcons['JavaScript'] },
      { name: 'TypeScript', icon: techIcons['TypeScript'] },
      { name: 'Python', icon: techIcons['Python'] },
      { name: 'PHP', icon: techIcons['PHP'] },
      { name: 'Go', icon: techIcons['Go'] },
      { name: 'HTML', icon: techIcons['HTML'] },
      { name: 'CSS', icon: techIcons['CSS'] },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { name: 'React', icon: techIcons['React'] },
      { name: 'Next.js', icon: techIcons['Next.js'] },
      { name: 'Svelte', icon: techIcons['Svelte'] },
      { name: 'Bootstrap 5', icon: techIcons['Bootstrap 5'] },
      { name: 'Tailwind CSS', icon: techIcons['Tailwind CSS'] },
      { name: 'Vite', icon: techIcons['Vite'] },
      { name: 'Three.js', icon: techIcons['Three.js'] },
      { name: 'WebGL', icon: techIcons['WebGL'] },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Node.js', icon: techIcons['Node.js'] },
      { name: 'Express', icon: techIcons['Express'] },
      { name: 'Firebase', icon: techIcons['Firebase'] },
    ],
  },
  {
    title: 'Database',
    items: [
      { name: 'MySQL', icon: techIcons['MySQL'] },
      { name: 'MongoDB', icon: techIcons['MongoDB'] },
    ],
  },
  {
    title: 'Tools & DevOps',
    items: [
      { name: 'Git/GitHub', icon: techIcons['Git/GitHub'] },
      { name: 'Docker', icon: techIcons['Docker'] },
      { name: 'VS Code', icon: techIcons['VS Code'] },
      { name: 'Figma', icon: techIcons['Figma'] },
      { name: 'Linux', icon: techIcons['Linux'] },
      { name: 'XAMPP', icon: techIcons['XAMPP'] },
    ],
  },
];

function TechStackSectionComponent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="techstack"
      ref={sectionRef}
      className="w-full relative overflow-hidden pt-2 pb-2"
    >
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 w-full">
        {/* Title */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate={visible ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center mb-16 md:mb-20"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-orbitron tracking-tight">
            <span className="text-gradient-neon animate-gradient-shift">
              Tech
            </span>
            <span className="text-white ml-3 md:ml-4 neon-title-glow">
              Stack
            </span>
          </h2>
          <div
            className="mt-4 h-1 w-32 bg-gradient-neon rounded-full origin-center shadow-[0_0_10px_rgba(0,212,255,0.5)]"
          />
        </motion.div>

        {/* Category Cards Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={visible ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 md:gap-6"
        >
          {techCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={categoryVariants}
              className="group relative"
            >
              {/* Outer glow ring */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-neon opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-sm" />

              {/* Corner brackets */}
              <div aria-hidden="true" className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
              <div aria-hidden="true" className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
              <div aria-hidden="true" className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
              <div aria-hidden="true" className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br-lg opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-[#0a0e1a]/70 backdrop-blur-xl border border-cyan-500/15 rounded-2xl p-6 md:p-7 hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(0,212,255,0.12),0_0_80px_rgba(255,0,64,0.05)] transition-all duration-500 overflow-hidden">
                {/* Top gradient line */}
                <div aria-hidden="true" className="absolute -top-px left-6 right-6 h-px bg-gradient-neon opacity-60 group-hover:opacity-100 group-hover:shadow-[0_0_10px_rgba(0,212,255,0.8)] transition-all duration-500" />

                {/* Scanline texture */}
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.025]"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,212,255,0.5) 2px, rgba(0,212,255,0.5) 4px)'
                  }}
                />

                {/* Category Header */}
                <h3 className="text-base md:text-lg font-bold font-orbitron text-white tracking-tight mb-5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#ff0040] group-hover:to-[#00d4ff] transition-all duration-300">
                  {category.title}
                </h3>

                {/* Tech Items */}
                <div className="flex flex-col gap-3">
                  {category.items.map((tech) => (
                    <div
                      key={tech.name}
                      className="group/item flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] hover:border hover:border-cyan-500/10 transition-all duration-200 cursor-default"
                    >
                      <div className="relative w-8 h-8 flex items-center justify-center shrink-0 group-hover/item:shadow-[0_0_12px_rgba(0,212,255,0.3)] transition-all duration-300 group-hover/item:scale-110">
                        {tech.icon}
                      </div>
                      <span className="text-sm font-mono text-gray-300 group-hover/item:text-white transition-colors duration-200">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={visible ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
        />
      </div>
    </section>
  );
}

export const TechStackSection = memo(TechStackSectionComponent);
