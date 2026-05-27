import { useState, useEffect, useRef } from 'react';
import {
  X,
  ExternalLink,
  Code,
  Target,
  Zap,
  Award,
  Layers,
  CheckCircle,
  Copy,
  Check,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import type { Project } from '../types/project';
import Button from './Button';
import TechBadge from './TechBadge';
import './ProjectModal.css';

const GithubIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const {
    title,
    category,
    role,
    teamSize,
    stack,
    status,
    demoUrl,
    githubUrl,
    images,
    rhPath,
    techPath,
    codeSnippet,
  } = project;

  // Build unified images array for gallery
  const galleryImages: string[] = [];
  if (images.thumbnail) galleryImages.push(images.thumbnail);
  if (images.mockup) galleryImages.push(images.mockup);
  if (images.gallery) {
    images.gallery.forEach((img) => {
      if (!galleryImages.includes(img)) {
        galleryImages.push(img);
      }
    });
  }

  const [activeImage, setActiveImage] = useState(galleryImages[0] || images.thumbnail);
  const [copied, setCopied] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalWrapperRef = useRef<HTMLDivElement>(null);

  // Keyboard focus trap and close handlers
  useEffect(() => {
    // Put initial focus on the close button to trap keyboard flow instantly
    if (modalWrapperRef.current) {
      const focusable = modalWrapperRef.current.querySelectorAll<HTMLElement>(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
      );
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!modalWrapperRef.current) return;

        const focusable = Array.from(
          modalWrapperRef.current.querySelectorAll<HTMLElement>(
            'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
          )
        ).filter(
          (el) =>
            el.tabIndex !== -1 &&
            el.getAttribute('aria-hidden') !== 'true' &&
            el.style.display !== 'none' &&
            el.style.visibility !== 'hidden'
        );

        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Click outside modal content to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  // Clipboard copy snippet handler
  const handleCopyCode = () => {
    if (codeSnippet) {
      navigator.clipboard.writeText(codeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Score circular visualizer renderer
  const renderMetric = (score: number, label: string) => {
    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (circumference * score) / 100;

    let scoreClass = 'metric-score-poor';
    if (score >= 90) {
      scoreClass = 'metric-score-excellent';
    } else if (score >= 50) {
      scoreClass = 'metric-score-good';
    }

    return (
      <div className="metric-circle-container" key={label}>
        <div className="metric-svg-wrapper">
          <svg width="70" height="70" viewBox="0 0 70 70">
            <circle className="metric-circle-bg" cx="35" cy="35" r={radius} />
            <circle
              className={`metric-circle-fill ${scoreClass}`}
              cx="35"
              cy="35"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <span className={`metric-score-text ${scoreClass}`}>{score}</span>
        </div>
        <span className="metric-score-label">{label}</span>
      </div>
    );
  };

  return (
    <div
      className="project-modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="project-modal-wrapper liquid-glass" ref={modalWrapperRef}>
        {/* Close Button */}
        <button className="project-modal-close-btn" onClick={onClose} aria-label="Fermer la modale">
          <X size={20} />
        </button>

        {/* Hero Header Area */}
        <header className="project-modal-hero">
          <div
            className="project-modal-hero-blur-bg"
            style={{ backgroundImage: `url(${images.thumbnail})` }}
          />
          <div className="project-modal-hero-glow" />

          <div className="project-modal-hero-content">
            <div className="project-modal-hero-text">
              <div className="project-modal-badge-row">
                <span className="project-category-badge">{category}</span>
                <span
                  className={`project-status-badge ${status.toLowerCase().includes('prod') || status.toLowerCase().includes('livr') ? 'is-prod' : 'is-prototype'}`}
                >
                  <span className="status-badge-dot" />
                  {status}
                </span>
              </div>
              <h2 id="project-modal-title" className="project-modal-title">
                {title}
              </h2>
              <div className="project-modal-role-row">
                <Code size={16} className="project-modal-role-icon" />
                <span>{role}</span>
              </div>
            </div>

            {images.mockup && (
              <div className="project-modal-hero-mockup-wrapper">
                <img
                  src={images.mockup}
                  alt={`Mockup 3D du projet ${title}`}
                  className="project-modal-hero-mockup"
                  loading="eager"
                />
              </div>
            )}
          </div>
        </header>

        {/* Modal Scrollable Body */}
        <div className="project-modal-body-scroll">
          <div className="project-modal-grid">
            {/* Left Column: RH & Tech Narrative Content */}
            <main className="project-modal-main-col">
              {/* 1. RH Path Section (Business & Team perspective) */}
              <section className="project-modal-section">
                <h3 className="project-modal-section-title">
                  <Target size={18} className="project-modal-section-title-icon" />
                  Approche Projet & Valeur Humaine (RH)
                </h3>

                <div className="project-modal-context">
                  <p className="project-modal-sub-label">Le Contexte & La Problématique</p>
                  <p>{rhPath.context}</p>
                </div>

                <div className="project-modal-solution">
                  <p className="project-modal-sub-label">Ma Solution & Démarche</p>
                  <p>{rhPath.solution}</p>
                </div>

                <div className="project-modal-results">
                  <p className="project-modal-sub-label">Résultats & Compétences Validées</p>
                  <ul className="results-list">
                    {rhPath.results.map((result, idx) => (
                      <li key={idx} className="results-item">
                        <CheckCircle size={16} className="results-item-icon" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 2. Technical Path Section (Engineering perspective) */}
              <section className="project-modal-section">
                <h3 className="project-modal-section-title">
                  <Zap size={18} className="project-modal-section-title-icon" />
                  Conception & Résolution Technique (Tech)
                </h3>

                <div className="project-modal-architecture">
                  <p className="project-modal-sub-label">Architecture du Système</p>
                  <p>{techPath.architecture}</p>
                </div>

                <div className="project-modal-challenges">
                  <p className="project-modal-sub-label">Défis Techniques Clés relevés</p>
                  <div className="challenges-list">
                    {techPath.challenges.map((challenge, idx) => {
                      // Separate bold title from description if any
                      const hasDivider = challenge.includes(' : ');
                      let chalTitle = '';
                      let chalDesc = challenge;

                      if (hasDivider) {
                        const parts = challenge.split(' : ');
                        chalTitle = parts[0];
                        chalDesc = parts.slice(1).join(' : ');
                      }

                      return (
                        <div key={idx} className="challenge-item">
                          <h4 className="challenge-title">
                            <span className="challenge-bullet" />
                            {chalTitle || `Défi #${idx + 1}`}
                          </h4>
                          <p className="challenge-desc">{chalDesc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* 3. VS Code Monospace Terminal Snippet */}
              {codeSnippet && (
                <section className="project-modal-code-snippet">
                  <div className="code-header">
                    <div className="code-dots">
                      <span className="code-dot red" />
                      <span className="code-dot yellow" />
                      <span className="code-dot green" />
                    </div>
                    <span className="code-filename">{codeSnippet.filename}</span>
                    <button
                      className={`code-copy-btn ${copied ? 'copied' : ''}`}
                      onClick={handleCopyCode}
                      aria-label="Copier l'extrait de code"
                    >
                      {copied ? <Check size={13} /> : <Copy size={13} />}
                      <span>{copied ? 'Copié !' : 'Copier'}</span>
                    </button>
                  </div>
                  <pre className="code-viewport">
                    <code className="code-content">{codeSnippet.code}</code>
                  </pre>
                </section>
              )}
            </main>

            {/* Right Column: Metadata Sidebar, Metrics & Media Gallery */}
            <aside className="project-modal-sidebar-col">
              {/* 1. Project Summary & Quick Info */}
              <section className="project-modal-section">
                <h3 className="project-modal-section-title">
                  <Award size={18} className="project-modal-section-title-icon" />
                  Fiche Synthétique
                </h3>

                <div className="project-sidebar-meta-list">
                  <div className="sidebar-meta-item">
                    <span className="sidebar-meta-label">Catégorie</span>
                    <span className="sidebar-meta-val">{category}</span>
                  </div>
                  {teamSize && teamSize > 1 && (
                    <div className="sidebar-meta-item">
                      <span className="sidebar-meta-label">Équipe</span>
                      <span className="sidebar-meta-val">{teamSize} personnes</span>
                    </div>
                  )}
                  <div className="sidebar-meta-item">
                    <span className="sidebar-meta-label">Statut</span>
                    <span className="sidebar-meta-val">{status}</span>
                  </div>
                  <div className="sidebar-meta-item">
                    <span className="sidebar-meta-label">Rôle</span>
                    <span className="sidebar-meta-val">{role}</span>
                  </div>
                </div>

                <div className="project-sidebar-tags-container" style={{ marginBottom: '16px' }}>
                  <p className="project-modal-sub-label" style={{ marginBottom: '8px' }}>
                    Stack Technique
                  </p>
                  <div className="project-sidebar-tags">
                    {stack.map((tech) => (
                      <TechBadge key={tech} tech={tech} size="sm" />
                    ))}
                  </div>
                </div>

                <div className="project-sidebar-actions">
                  {githubUrl && (
                    <Button
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="sm"
                      leftIcon={<GithubIcon size={16} />}
                    >
                      Dépôt Code
                    </Button>
                  )}
                  {demoUrl && (
                    <Button
                      href={demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="glow"
                      size="sm"
                      rightIcon={<ExternalLink size={16} />}
                    >
                      Visiter Démo
                    </Button>
                  )}
                </div>
              </section>

              {/* 2. SEO & Performance Metrics (Google Lighthouse style) */}
              {techPath.metrics && (
                <section className="project-modal-section metrics-section">
                  <h3 className="project-modal-section-title">
                    <Layers size={18} className="project-modal-section-title-icon" />
                    Métriques Lighthouse
                  </h3>

                  <div className="metrics-row">
                    {renderMetric(techPath.metrics.performance, 'Perf.')}
                    {renderMetric(techPath.metrics.accessibility, 'Access.')}
                    {renderMetric(techPath.metrics.seo, 'SEO')}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: '6px',
                      alignItems: 'center',
                      fontSize: '0.74rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <AlertCircle size={12} />
                    <span>Scores officiels Google Lighthouse.</span>
                  </div>
                </section>
              )}

              {/* 3. Media Gallery Grid & Slider */}
              {galleryImages.length > 0 && (
                <section className="project-modal-section gallery-showcase">
                  <h3 className="project-modal-section-title">
                    <Calendar size={18} className="project-modal-section-title-icon" />
                    Galerie Médias
                  </h3>

                  <div className="gallery-main-view-container">
                    <img
                      src={activeImage}
                      alt={`Vue principale du projet ${title}`}
                      className="gallery-main-image"
                      loading="lazy"
                    />
                  </div>

                  {galleryImages.length > 1 && (
                    <div className="gallery-thumbnails">
                      {galleryImages.map((img, idx) => (
                        <button
                          key={idx}
                          className={`gallery-thumbnail-btn ${activeImage === img ? 'is-active' : ''}`}
                          onClick={() => setActiveImage(img)}
                          aria-label={`Afficher la capture d'écran #${idx + 1}`}
                        >
                          <img
                            src={img}
                            alt={`Miniature #${idx + 1} de ${title}`}
                            className="gallery-thumbnail-img"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </section>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
