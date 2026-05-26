import React from 'react';
import './TechBadge.css';

export interface TechBadgeProps {
  tech: string;
  showIcon?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

interface TechConfig {
  color: string;
  icon: React.ReactNode;
}

// Convert a hex color string (e.g. "#6366f1") to "R, G, B" string for CSS variables
const hexToRgb = (hex: string): string => {
  const cleanHex = hex.replace('#', '');
  // Handle shorthand hex like "fff"
  const expandHex =
    cleanHex.length === 3
      ? cleanHex
          .split('')
          .map((char) => char + char)
          .join('')
      : cleanHex;

  const r = parseInt(expandHex.substring(0, 2), 16);
  const g = parseInt(expandHex.substring(2, 4), 16);
  const b = parseInt(expandHex.substring(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return '99, 102, 241'; // Fallback to accent-primary indigo RGB
  }
  return `${r}, ${g}, ${b}`;
};

export default function TechBadge({
  tech,
  showIcon = true,
  size = 'sm',
  className = '',
}: TechBadgeProps) {
  // SVG Icon definitions for consistent, lightweight rendering without external dependencies
  const icons = {
    html5: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.9 21.2L12 24 3.4 21.2zM18.8 6H5.2l.4 5h12.4zm-1.8 6H9.7l.2 2.5 3.1.8 3.1-.8.2-2.5z" />
      </svg>
    ),
    css3: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.9 21.2L12 24 3.4 21.2zM18.8 6H5.2l.4 5h12.4zm-1.8 6H9.7l.2 2.5 3.1.8 3.1-.8.2-2.5zm-3.5 3.1l.2-2.2H8.9l.2 2.2h6.2l-.5 5-2.8.8-2.8-.8-.2-1.8H6.7l.3 4 5 1.4 5-1.4.7-7.8h-7.7l-.2-2.2h8.2z" />
      </svg>
    ),
    javascript: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm18.5 19.3c-.6 0-1.1-.3-1.3-.8-.3-.6-.2-1.5-.2-2.3h-2.1c0 1.5-.1 2.8.7 3.8 1 1.2 2.6 1.3 3.8.7.6-.3.9-.9.9-1.6v-8.4h-2.2v8.6zm-5.4-6.3h-2.2v6.1c0 1-.5 1.4-1.3 1.4-.7 0-1.1-.4-1.1-1.2V13H6.3v6.5c0 2.2 1.3 3.3 3.2 3.3 2 0 3.6-1.1 3.6-3.3V13z" />
      </svg>
    ),
    typescript: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm11.7 13.5H9.4v8.3H7.1v-8.3H4.8V11.3h6.9v2.2zm6.6 4c0 2.2-1.3 3.3-3.6 3.3-2 0-3.3-1.1-3.7-2.7h2.4c.2.8.6 1.1 1.3 1.1.7 0 1-.3 1-.8 0-.5-.3-.7-1-.9l-1.4-.4c-1.7-.4-2.6-1.1-2.6-2.7 0-1.7 1.3-2.9 3.2-2.9 1.9 0 3 .9 3.4 2.3h-2.4c-.2-.7-.6-1.1-1.2-1.1-.6 0-.8.2-.8.6 0 .4.3.5.9.7l1.5.4c1.6.4 2.6 1.1 2.6 2.7z" />
      </svg>
    ),
    react: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
    nextjs: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm5.6 17.6l-5.6-7.2v7.2H10V8.2h1.6l5.2 6.7V8.2h1.9v9.4z" />
      </svg>
    ),
    angular: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.5L2 5l1.5 13.5L12 22.5l8.5-4L22 5L12 1.5zm0 3.7l6.5 11.3h-2.3l-1.2-3H9l-1.2 3H5.5L12 5.2zm2.2 6.8L12 7.7 9.8 12h4.4z" />
      </svg>
    ),
    php: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-3.5 13.5H6.2l.6-3h2.3c.9 0 1.4-.4 1.4-1.2s-.5-1.2-1.4-1.2H6.8l.6-3h2.3c2.3 0 3.6 1.1 3.6 3 0 2.2-1.5 3.4-3.8 3.4v2zm9 0h-2.3l.6-3h2.3c.9 0 1.4-.4 1.4-1.2s-.5-1.2-1.4-1.2h-2.3l.6-3h2.3c2.3 0 3.6 1.1 3.6 3 0 2.2-1.5 3.4-3.8 3.4v2z" />
      </svg>
    ),
    laravel: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.3 1.7h7.4v7.4H8.3V1.7zm1.1 1.1v5.2h5.2V2.8H9.4zm7.4 7.4h5.2v5.2h-5.2v-5.2zm1.1 1.1v3h3v-3h-3zm-16.1 3.7h5.2v5.2H1.8v-5.2zm1.1 1.1v3h3v-3h-3z" />
      </svg>
    ),
    nodejs: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.5L3.8 6.2v9.6L12 20.5l8.2-4.7V6.2L12 1.5zM12 4.2l5.7 3.3v6.6L12 17.4l-5.7-3.3V7.5L12 4.2zm-1.4 7.6l2.1-1.2v2.4l-2.1 1.2v-2.4z" />
      </svg>
    ),
    database: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
      </svg>
    ),
    git: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M6 9v6" />
        <path d="M9 15h6a3 3 0 0 0 3-3V9" />
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    trello: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <rect x="6" y="6" width="4" height="9" rx="1" ry="1" fill="#fff" />
        <rect x="14" y="6" width="4" height="5" rx="1" ry="1" fill="#fff" />
      </svg>
    ),
    bootstrap: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.3 11.2c0 2.2-1.8 3.3-3.8 3.3H8.3V7.5h3.2c2 0 3.8 1.1 3.8 3.3 0 1.1-.6 1.8-1.5 2.1.9.3 1.5 1 1.5 2.1v.2zm-2-5.4c0-.9-.7-1.3-1.8-1.3H9.8V10h1.7c1.1 0 1.8-.4 1.8-1.3zm.5 5.4c0-1-.7-1.4-1.8-1.4H9.8v2.8h1.7c1.1 0 1.8-.4 1.8-1.4z" />
      </svg>
    ),
    arduino: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 7.5a4.5 4.5 0 0 0-4.5 4.5 4.5 4.5 0 0 0 4.5 4.5 4.5 4.5 0 0 0 3.75-2h-1.5A3 3 0 0 1 8 15a3 3 0 0 1-3-3 3 3 0 0 1 3-3c1 0 1.8.5 2.25 1.25h1.5A4.5 4.5 0 0 0 8 7.5zm8 0a4.5 4.5 0 0 0-3.75 2h1.5A3 3 0 0 1 16 9a3 3 0 0 1 3 3 3 3 0 0 1-3 3c-1 0-1.8-.5-2.25-1.25h-1.5A4.5 4.5 0 0 0 16 7.5z" />
        <path d="M7 11.25h2v1.5H7v-1.5zM15 11.25h2v1.5h-2v-1.5zm-1 .75h4v0h-4v0z" />
      </svg>
    ),
    microchip: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <path d="M9 1v4M9 19v4M15 1v4M15 19v4M1 9h4M19 9h4M1 15h4M19 15h4" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    figma: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12a4 4 0 1 0-4-4v4h4zm-4 0a4 4 0 1 0 0 8h4v-8H8zm0-12a4 4 0 1 0 0 8h4V0H8zm8 6a4 4 0 1 0-4 4V6h4zm-4 6a4 4 0 1 0 4 4v-4h-4z" />
      </svg>
    ),
    adobe: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.9 2h8.1v19.4L13.9 2zm-3.8 0L2 21.4V2h8.1zm1.9 6.8l4.9 11.6h-3.6l-1.3-3.2H8.8l-1.3 3.2H3.9l4.9-11.6h3.2z" />
      </svg>
    ),
    code: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    api: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7.7v10.6L12 24l10-5.7V7.7L12 2zm0 3.3l6.5 3.7-6.5 3.8-6.5-3.8 6.5-3.7zM5.5 16.5V9.7l6.5 3.8v6.7l-6.5-3.7zm13 0l-6.5 3.7v-6.7l6.5-3.8v6.8z" />
      </svg>
    ),
  };

  // Helper mapping values to normalise different formats of technology names
  const normalizeTech = (name: string) => {
    const n = name.toLowerCase().trim();
    if (n.includes('html')) return 'html5';
    if (n.includes('css')) return 'css3';
    if (n.includes('typescript') || n === 'ts') return 'typescript';
    if (n.includes('javascript') || n === 'js') return 'javascript';
    if (n.includes('react')) return 'react';
    if (n.includes('next')) return 'nextjs';
    if (n.includes('angular')) return 'angular';
    if (n.includes('laravel')) return 'laravel';
    if (n.includes('php')) return 'php';
    if (n.includes('express')) return 'express';
    if (n.includes('node')) return 'nodejs';
    if (n.includes('postgres') || n.includes('sql') || n.includes('db')) return 'database';
    if (n.includes('mysql')) return 'database';
    if (n.includes('mongo')) return 'database';
    if (n.includes('esp32')) return 'microchip';
    if (n.includes('arduino')) return 'arduino';
    if (n === 'c++' || n === 'cpp' || n === 'c') return 'code';
    if (n.includes('mqtt') || n.includes('websocket')) return 'api';
    if (n.includes('figma')) return 'figma';
    if (n.includes('github')) return 'github';
    if (n.includes('git')) return 'git';
    if (n.includes('trello')) return 'trello';
    if (n.includes('bootstrap')) return 'bootstrap';
    if (n.includes('graphql') || n.includes('rest') || n.includes('api')) return 'api';
    if (n.includes('adobe') || n.includes('suite')) return 'adobe';
    if (n.includes('vercel') || n.includes('netlify')) return 'api';
    if (n.includes('p5') || n.includes('creative coding')) return 'code';
    return 'default';
  };

  // Get matching config with colors and icons
  const getConfig = (name: string): TechConfig => {
    const normalized = normalizeTech(name);

    const themeMap: Record<string, Omit<TechConfig, 'icon'>> = {
      html5: { color: '#e34f26' },
      css3: { color: '#1572b6' },
      javascript: { color: '#f7df1e' },
      typescript: { color: '#3178c6' },
      react: { color: '#61dafb' },
      nextjs: { color: '#818cf8' },
      angular: { color: '#dd0031' },
      php: { color: '#777bb4' },
      laravel: { color: '#ff2d20' },
      nodejs: { color: '#339933' },
      database: { color: '#00758f' },
      git: { color: '#f05032' },
      github: { color: '#9ca3af' },
      trello: { color: '#0079bf' },
      bootstrap: { color: '#7952b3' },
      arduino: { color: '#00979d' },
      microchip: { color: '#e7352c' },
      figma: { color: '#f24e1e' },
      adobe: { color: '#ff0000' },
      code: { color: '#10b981' },
      api: { color: '#0ea5e9' },
    };

    const config = themeMap[normalized] || { color: '#6366f1' };
    const icon = icons[normalized as keyof typeof icons] || icons.code;

    return {
      color: config.color,
      icon,
    };
  };

  const { color, icon } = getConfig(tech);
  const rgb = hexToRgb(color);

  const inlineStyles = {
    '--tech-color': color,
    '--tech-color-rgb': rgb,
  } as React.CSSProperties;

  return (
    <span
      className={`tech-badge size-${size} ${className}`.trim()}
      style={inlineStyles}
      title={tech}
    >
      {showIcon && <span className="tech-badge-icon">{icon}</span>}
      <span className="tech-badge-label">{tech}</span>
    </span>
  );
}
