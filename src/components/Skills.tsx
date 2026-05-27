import { useState } from 'react';
import { Layout, Server, Cpu, Palette, Grid, Sliders, ExternalLink, Sparkles } from 'lucide-react';
import { skillCategories } from '../data/skills';
import { projects } from '../data/projects';
import type { Skill, SkillCategory } from '../types/skill';
import TechBadge from './TechBadge';
import './Skills.css';

// Dynamic Icon Mapper for categories
const IconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Layout: Layout,
  Server: Server,
  Cpu: Cpu,
  Palette: Palette,
};

export default function Skills() {
  const [viewMode, setViewMode] = useState<'grid' | 'focus'>('grid');
  const [activeCategory, setActiveCategory] = useState<SkillCategory>(skillCategories[0]);
  const [selectedSkill, setSelectedSkill] = useState<Skill>(skillCategories[0].skills[0]);

  const handleCategoryTabChange = (category: SkillCategory) => {
    setActiveCategory(category);
    setSelectedSkill(category.skills[0]);
  };

  const handleSkillSelect = (skill: Skill) => {
    setSelectedSkill(skill);
  };

  // Convert hex color for CSS variables based on technology name
  const getTechColorRgb = (techName: string): string => {
    const n = techName.toLowerCase().trim();
    if (n.includes('html')) return '227, 79, 38'; // #e34f26
    if (n.includes('css')) return '21, 114, 182'; // #1572b6
    if (n.includes('typescript') || n === 'ts') return '49, 120, 198'; // #3178c6
    if (n.includes('javascript') || n === 'js') return '247, 223, 30'; // #f7df1e
    if (n.includes('react')) return '97, 218, 251'; // #61dafb
    if (n.includes('next')) return '129, 140, 248'; // #818cf8
    if (n.includes('angular')) return '221, 0, 49'; // #dd0031
    if (n.includes('laravel')) return '255, 45, 32'; // #ff2d20
    if (n.includes('php')) return '119, 123, 180'; // #777bb4
    if (n.includes('node')) return '51, 153, 51'; // #339933
    if (
      n.includes('postgres') ||
      n.includes('sql') ||
      n.includes('mysql') ||
      n.includes('db') ||
      n.includes('mongo')
    )
      return '0, 117, 143'; // #00758f
    if (n.includes('arduino')) return '0, 151, 157'; // #00979d
    if (n.includes('esp32') || n.includes('microchip')) return '231, 53, 44'; // #e7352c
    if (n === 'c++' || n === 'cpp' || n === 'c' || n.includes('p5')) return '16, 185, 129'; // #10b981
    if (n.includes('mqtt') || n.includes('websocket') || n.includes('api') || n.includes('vercel'))
      return '14, 165, 233'; // #0ea5e9
    if (n.includes('figma')) return '242, 78, 30'; // #f24e1e
    if (n.includes('github') || n.includes('git')) return '156, 163, 175'; // #9ca3af
    if (n.includes('adobe') || n.includes('suite')) return '255, 0, 0'; // #ff0000
    return '99, 102, 241'; // Fallback indigo
  };

  const getCategoryColorRgb = (categoryId: string): string => {
    switch (categoryId) {
      case 'front':
        return '99, 102, 241'; // Indigo
      case 'back':
        return '16, 185, 129'; // Emerald
      case 'iot':
        return '6, 182, 212'; // Cyan
      case 'design':
        return '236, 72, 153'; // Pink
      default:
        return '99, 102, 241';
    }
  };

  const selectedSkillRgb = selectedSkill ? getTechColorRgb(selectedSkill.name) : '99, 102, 241';

  return (
    <div className="skills-wrapper">
      {/* 1. CONTROLS (Toggles Grid vs Focus Mode) */}
      <div className="skills-controls">
        <div className="skills-view-toggle">
          <button
            className={`mode-btn ${viewMode === 'grid' ? 'is-active' : ''}`}
            onClick={() => setViewMode('grid')}
            aria-label="Affichage sous forme de grille de synthèse"
            title="Vue d'ensemble par catégorie"
          >
            <Grid size={16} />
            <span>Vue Synthèse</span>
          </button>
          <button
            className={`mode-btn ${viewMode === 'focus' ? 'is-active' : ''}`}
            onClick={() => setViewMode('focus')}
            aria-label="Affichage interactif avec détails de chaque compétence"
            title="Explorez chaque technologie avec ses détails et projets"
          >
            <Sliders size={16} />
            <span>Vue Interactive Détaillée</span>
          </button>
        </div>
      </div>

      {/* 2. GRID VIEW (DEFAULT) */}
      {viewMode === 'grid' && (
        <div className="skills-grid" role="list">
          {skillCategories.map((category) => {
            const Icon = IconMap[category.iconName] || CodeIconFallback;
            const glowRgb = getCategoryColorRgb(category.id);
            return (
              <div
                key={category.id}
                className="category-card liquid-glass"
                style={{ '--category-glow-rgb': glowRgb } as React.CSSProperties}
                role="listitem"
              >
                <div className="category-header">
                  <div className="category-icon-wrapper">
                    <Icon size={22} />
                  </div>
                  <h3>{category.title}</h3>
                </div>
                <p className="category-desc">{category.description}</p>
                <div className="category-skills-list">
                  {category.skills.map((skill) => (
                    <TechBadge key={skill.name} tech={skill.name} size="sm" />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. FOCUS VIEW (INTERACTIVE SPLIT) */}
      {viewMode === 'focus' && (
        <div className="skills-focus-layout">
          {/* Picker Panel (Categories Tabs & Clickable Badges) */}
          <div className="skills-picker-panel">
            <div className="picker-tabs" role="tablist" aria-label="Catégories de compétences">
              {skillCategories.map((category) => {
                const isActive = activeCategory.id === category.id;
                const glowRgb = getCategoryColorRgb(category.id);
                return (
                  <button
                    key={category.id}
                    role="tab"
                    aria-selected={isActive}
                    className={`picker-tab-btn ${isActive ? 'is-active' : ''}`}
                    style={{ '--category-glow-rgb': glowRgb } as React.CSSProperties}
                    onClick={() => handleCategoryTabChange(category)}
                  >
                    {category.title}
                  </button>
                );
              })}
            </div>

            <div className="picker-skills-grid">
              {activeCategory.skills.map((skill) => {
                const isSelected = selectedSkill.name === skill.name;
                return (
                  <div
                    key={skill.name}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    className={`interactive-skill-badge ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleSkillSelect(skill)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSkillSelect(skill);
                      }
                    }}
                  >
                    <TechBadge
                      tech={skill.name}
                      size="md"
                      showIcon={true}
                      className={isSelected ? 'is-active' : ''}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details focus dashboard */}
          <div
            className="skills-focus-board liquid-glass"
            style={
              {
                '--active-tech-rgb': selectedSkillRgb,
                '--active-tech-color': `rgb(${getTechColorRgb(selectedSkill.name)})`,
              } as React.CSSProperties
            }
          >
            {selectedSkill ? (
              <div className="focus-content">
                <div className="focus-header">
                  <div className="focus-title-area">
                    <span className="focus-category-badge">{activeCategory.title}</span>
                    <div className="focus-tech-title">
                      <h3>{selectedSkill.name}</h3>
                    </div>
                  </div>
                  <div className="focus-level-score">
                    <span className="focus-score-pct">{selectedSkill.level}%</span>
                    <span className="focus-score-label">Maîtrise</span>
                  </div>
                </div>

                {/* Level Progress bar */}
                <div className="focus-progress-section">
                  <div className="focus-progress-bg">
                    <div
                      key={selectedSkill.name}
                      className="focus-progress-fill"
                      style={{ width: `${selectedSkill.level}%` }}
                      role="progressbar"
                      aria-valuenow={selectedSkill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>

                {/* Info details */}
                <div className="focus-details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Expérience</span>
                    <span className="detail-value">{selectedSkill.experience}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Cas d'usage type</span>
                    <span className="detail-value">{selectedSkill.useCase}</span>
                  </div>
                  <div className="detail-item detail-value description">
                    {selectedSkill.description}
                  </div>
                </div>

                {/* Portfolio Project relations */}
                <div className="focus-projects-section">
                  <span className="detail-label">Projets liés (Portfolio)</span>
                  {selectedSkill.projectIds && selectedSkill.projectIds.length > 0 ? (
                    <div className="focus-projects-list">
                      {selectedSkill.projectIds.map((pId) => {
                        const matchedProj = projects.find((p) => p.id === pId);
                        if (!matchedProj) return null;
                        return (
                          <a
                            key={pId}
                            href="#projects"
                            className="project-tag-link"
                            title={`Voir le projet ${matchedProj.title}`}
                          >
                            <ExternalLink size={12} />
                            <span>{matchedProj.title}</span>
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    <span className="no-projects-msg">
                      Appliqué dans divers exercices académiques et micro-prototypages.
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="focus-placeholder">
                <div className="focus-placeholder-icon">
                  <Sparkles size={48} />
                </div>
                <h3>Découvrez mes Compétences</h3>
                <p>
                  Cliquez sur n'importe quel badge technologique à gauche pour afficher ses détails
                  de maîtrise technique, son expérience et ses cas concrets.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Fallback icon component for standard styling
function CodeIconFallback({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
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
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
