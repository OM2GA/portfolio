import React, { useState } from 'react';
import { Briefcase, GraduationCap, Award, ChevronDown, Calendar, MapPin } from 'lucide-react';
import TechBadge from './TechBadge';
import './Timeline.css';

interface TimelineMilestone {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  location: string;
  summary: string;
  description: string;
  iconType: 'alternance' | 'mmi' | 'sti2d';
  tags: string[];
}

const TIMELINE_DATA: TimelineMilestone[] = [
  {
    id: 'alternance',
    date: 'Sept. 2026',
    title: 'Alternance BUT3',
    subtitle: 'Développeur Web & IoT',
    location: 'Entreprise d\'Accueil (Recherchée)',
    summary: 'Recherche d\'un contrat d\'un an pour concevoir des solutions web innovantes et/ou des dispositifs connectés.',
    description: 'Prêt à intégrer votre équipe technique pour développer des applications performantes et créatives. Fortement intéressé par le développement Front-End (React, Vite, TypeScript), la programmation Back-End (Node.js, Express, Laravel), la mise en œuvre de protocoles de communication temps réel (WebSockets, MQTT) et le prototypage IoT. Soucieux de l\'accessibilité (RGAA/WCAG), du SEO et de la propreté du code.',
    iconType: 'alternance',
    tags: ['Fullstack', 'React', 'Node.js', 'WebSockets', 'IoT', 'Autonomie']
  },
  {
    id: 'mmi',
    date: '2024 - Présent',
    title: 'BUT MMI',
    subtitle: 'Métiers du Multimédia et de l\'Internet',
    location: 'IUT Lyon 1 - Université Claude Bernard',
    summary: 'Spécialisation Développement Web et Dispositifs Interactifs. Apprentissage de la synergie design-technique.',
    description: 'Formation pluridisciplinaire poussée. Conception et développement de projets web complets (SAÉ) : intégration responsive en React/TypeScript, développement d\'API RESTful, bases de données relationnelles et non relationnelles. Volet IoT conséquent : programmation de microcontrôleurs (Arduino, ESP32) en C++, interfaçage avec des capteurs physiques et liaison bidirectionnelle temps réel avec des dashboards web.',
    iconType: 'mmi',
    tags: ['TypeScript', 'React', 'Node.js', 'Laravel', 'Arduino/C++', 'WebSockets', 'Git']
  },
  {
    id: 'sti2d',
    date: '2022 - 2024',
    title: 'Bac STI2D',
    subtitle: 'Sciences et Technologies de l\'Industrie',
    location: 'Lycée Technique - Spécialité SIN',
    summary: 'Obtention du baccalauréat STI2D (Système d\'Information et Numérique) avec mention.',
    description: 'Découverte approfondie des bases algorithmiques, de l\'électronique numérique, de l\'embarqué et des architectures réseaux. Modélisation et programmation orientée objet de petits objets communicants (Python, C++). C\'est ici qu\'est née ma passion pour l\'assemblage de pièces physiques contrôlées par du code et reliées à des interfaces utilisateur.',
    iconType: 'sti2d',
    tags: ['Algorithmique', 'C++', 'Python', 'Réseaux', 'Électronique']
  }
];

export default function Timeline() {
  const [activeId, setActiveId] = useState<string>('mmi');

  const renderIcon = (type: 'alternance' | 'mmi' | 'sti2d') => {
    switch (type) {
      case 'alternance':
        return <Briefcase className="timeline-icon-svg" size={20} />;
      case 'mmi':
        return <GraduationCap className="timeline-icon-svg" size={20} />;
      case 'sti2d':
        return <Award className="timeline-icon-svg" size={20} />;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveId(id);
    }
  };

  const activeMilestone = TIMELINE_DATA.find((m) => m.id === activeId) || TIMELINE_DATA[0];

  return (
    <div className="portfolio-timeline">
      {/* DESKTOP TIMELINE (Horizontal Bento Mode) */}
      <div className="timeline-desktop" role="tablist" aria-label="Mon parcours professionnel et académique">
        <div className="timeline-track-container">
          <div className="timeline-track-line" />
          
          <div className="timeline-steps">
            {TIMELINE_DATA.map((milestone) => {
              const isActive = milestone.id === activeId;
              return (
                <button
                  key={milestone.id}
                  id={`tab-${milestone.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${milestone.id}`}
                  tabIndex={0}
                  className={`timeline-step-btn ${isActive ? 'is-active' : ''} ${milestone.id === 'alternance' ? 'is-special' : ''}`}
                  onClick={() => setActiveId(milestone.id)}
                  onKeyDown={(e) => handleKeyDown(e, milestone.id)}
                >
                  <div className="timeline-step-marker">
                    <span className="timeline-step-pulse" />
                    <div className="timeline-step-icon-wrapper">
                      {renderIcon(milestone.iconType)}
                    </div>
                  </div>
                  
                  <div className="timeline-step-info">
                    <span className="timeline-step-date">{milestone.date}</span>
                    <h4 className="timeline-step-title">{milestone.title}</h4>
                    <p className="timeline-step-sub">{milestone.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel de détails Desktop avec animation */}
        <div 
          className="timeline-detail-panel liquid-glass" 
          id={`panel-${activeMilestone.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeMilestone.id}`}
          key={activeMilestone.id} /* force re-render for anim trigger */
        >
          <div className="panel-header">
            <div className="panel-meta">
              <span className="panel-badge-date">
                <Calendar size={14} style={{ marginRight: '6px' }} />
                {activeMilestone.date}
              </span>
              <span className="panel-badge-location">
                <MapPin size={14} style={{ marginRight: '6px' }} />
                {activeMilestone.location}
              </span>
            </div>
            <h3 className="panel-title">
              {activeMilestone.title} <span className="panel-title-separator">—</span> <span className="panel-subtitle">{activeMilestone.subtitle}</span>
            </h3>
          </div>
          
          <div className="panel-body">
            <p className="panel-description">{activeMilestone.description}</p>
            
            <div className="panel-skills">
              <span className="skills-label">Compétences clés acquises :</span>
              <div className="skills-badge-list">
                {activeMilestone.tags.map((tag) => (
                  <TechBadge key={tag} tech={tag} size="sm" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE TIMELINE (Vertical Accordion Mode) */}
      <div className="timeline-mobile">
        <div className="timeline-vertical-track" />
        
        <div className="timeline-accordion-list">
          {TIMELINE_DATA.map((milestone) => {
            const isOpen = milestone.id === activeId;
            return (
              <div 
                key={milestone.id} 
                className={`timeline-accordion-item ${isOpen ? 'is-open' : ''} ${milestone.id === 'alternance' ? 'is-special' : ''}`}
              >
                <button
                  className="accordion-trigger-btn"
                  onClick={() => setActiveId(isOpen ? '' : milestone.id)}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-panel-${milestone.id}`}
                >
                  <div className="accordion-marker-col">
                    <div className="accordion-step-marker">
                      <span className="accordion-step-pulse" />
                      <div className="accordion-icon-wrapper">
                        {renderIcon(milestone.iconType)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="accordion-title-col">
                    <span className="accordion-date">{milestone.date}</span>
                    <h4 className="accordion-title-text">{milestone.title}</h4>
                    <p className="accordion-subtitle-text">{milestone.subtitle}</p>
                  </div>
                  
                  <div className="accordion-arrow-col">
                    <ChevronDown className="accordion-arrow-icon" size={18} />
                  </div>
                </button>
                
                <div 
                  id={`accordion-panel-${milestone.id}`}
                  className="accordion-content-wrapper"
                  style={{
                    maxHeight: isOpen ? '500px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    visibility: isOpen ? 'visible' : 'hidden'
                  }}
                >
                  <div className="accordion-content-inner">
                    <div className="accordion-location">
                      <MapPin size={12} style={{ marginRight: '4px' }} />
                      {milestone.location}
                    </div>
                    <p className="accordion-description">{milestone.description}</p>
                    
                    <div className="accordion-skills">
                      <div className="skills-badge-list">
                        {milestone.tags.map((tag) => (
                          <TechBadge key={tag} tech={tag} size="sm" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
