import { ExternalLink, Code, Users } from 'lucide-react';
import type { Project } from '../types/project';
import Button from './Button';
import TechBadge from './TechBadge';
import './ProjectCard.css';

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

export interface ProjectCardProps {
  project: Project;
  className?: string;
  style?: React.CSSProperties;
}

export default function ProjectCard({ project, className = '', style }: ProjectCardProps) {
  const { title, category, role, teamSize, stack, status, demoUrl, githubUrl, images, rhPath } =
    project;

  // Helper to extract a clean, concise excerpt from the project context
  const getExcerpt = (text: string, maxLength: number = 140) => {
    if (text.length <= maxLength) return text;

    // Try to cut at the end of the last sentence within maxLength
    const sentenceEnd = text.slice(0, maxLength).lastIndexOf('.');
    if (sentenceEnd > maxLength * 0.6) {
      return text.slice(0, sentenceEnd + 1);
    }

    // Otherwise, cut at the last space and add ellipsis
    const spaceIndex = text.slice(0, maxLength).lastIndexOf(' ');
    return text.slice(0, spaceIndex) + '...';
  };

  const projectExcerpt = getExcerpt(rhPath.context);

  // Status mapping for visual presentation
  const isProduction =
    status.toLowerCase().includes('prod') || status.toLowerCase().includes('livr');

  return (
    <article className={`project-card liquid-glass ${className}`.trim()} style={style}>
      {/* 1. Card Media (Thumbnail) */}
      <div className="project-card-media">
        <img
          src={images.thumbnail}
          alt={`Aperçu du projet ${title}`}
          loading="lazy"
          className="project-card-image"
        />

        {/* Category & Status Overlay Badges */}
        <div className="project-card-overlays">
          <span className="project-category-badge">{category}</span>
          <span className={`project-status-badge ${isProduction ? 'is-prod' : 'is-prototype'}`}>
            <span className="status-badge-dot" />
            {status}
          </span>
        </div>
      </div>

      {/* 2. Card Content */}
      <div className="project-card-content">
        {/* Title */}
        <h3 className="project-card-title">{title}</h3>

        {/* Role & Team details */}
        <div className="project-card-meta">
          <span className="project-meta-item" title="Votre rôle sur le projet">
            <Code size={14} className="meta-icon" />
            <span className="meta-text">{role}</span>
          </span>
          {teamSize && teamSize > 1 && (
            <span className="project-meta-item" title={`Équipe de ${teamSize} personnes`}>
              <Users size={14} className="meta-icon" />
              <span className="meta-text">Équipe ({teamSize})</span>
            </span>
          )}
        </div>

        {/* Description Excerpt */}
        <p className="project-card-description">{projectExcerpt}</p>

        {/* Stack Tags */}
        <div className="project-card-tags">
          {stack.slice(0, 4).map((tech) => (
            <TechBadge key={tech} tech={tech} size="sm" />
          ))}
          {stack.length > 4 && (
            <span className="project-tech-tag-more" title={stack.slice(4).join(', ')}>
              +{stack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* 3. Card Footer Actions */}
      <div className="project-card-actions">
        {githubUrl && (
          <Button
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="sm"
            leftIcon={<GithubIcon size={16} />}
            className="project-action-btn"
          >
            Code
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
            className="project-action-btn"
          >
            Démo
          </Button>
        )}
      </div>
    </article>
  );
}
