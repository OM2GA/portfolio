import { useState } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import Button from './components/Button';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import ScrollToTop from './components/ScrollToTop';
import Typewriter from './components/Typewriter';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import ContactForm from './components/ContactForm';
import { projects } from './data/projects';
import type { Project } from './types/project';
import IotFocus from './components/IotFocus';
import Terminal from './components/Terminal';
import { LazyMotion, domAnimation } from 'framer-motion';
import ScrollReveal from './components/ScrollReveal';
import './App.css';

function App() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters = ['Tous', 'Front-End', 'Back-End', 'Dispositifs Interactifs'];

  const handleFilterChange = (filter: string) => {
    if (filter === activeFilter || isTransitioning) return;

    // Phase 1: trigger exit animation
    setIsTransitioning(true);

    // Phase 2: wait for exit transition (250ms), update list, end transition
    setTimeout(() => {
      setActiveFilter(filter);
      if (filter === 'Tous') {
        setVisibleProjects(projects);
      } else {
        setVisibleProjects(projects.filter((p) => p.techCategory === filter));
      }
      setIsTransitioning(false);
    }, 250);
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="portfolio-app">
        <CustomCursor />
        <Navbar />

        <main className="main-content">
          {/* SECTION HERO */}
          <section id="hero" className="section-hero">
            <div className="section-container">
              <div className="hero-grid">
                <ScrollReveal direction="left" delay={0.15} className="hero-text-col">
                  <div className="status-badge">
                    <span className="status-pulse" />
                    <span>Disponible Alternance BUT3 - Sept. 26</span>
                  </div>
                  <h1 className="hero-title">
                    Développeur Web & <br />
                    <Typewriter
                      words={[
                        "Concepteur d'Interfaces",
                        "Passionné d'IoT",
                        'Créateur de dispositifs interactifs',
                      ]}
                    />
                  </h1>
                  <p className="hero-description">
                    Actuellement en BUT MMI, je conçois des applications web performantes et des
                    dispositifs connectés innovants. À la recherche d'une{' '}
                    <strong>alternance de 3ème année</strong> à partir de septembre 2026 pour
                    concrétiser vos projets de bout en bout.
                  </p>
                  <div className="hero-actions">
                    <Button
                      href="#projects"
                      variant="glow"
                      size="lg"
                      rightIcon={<ArrowRight size={20} />}
                    >
                      Voir les Projets
                    </Button>
                    <Button
                      href="/CV_Maxence_Coste.pdf"
                      variant="secondary"
                      size="lg"
                      leftIcon={<Download size={20} />}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Télécharger mon CV
                    </Button>
                  </div>
                </ScrollReveal>
                <ScrollReveal direction="right" delay={0.3} className="hero-visual-col">
                  <div className="creative-card">
                    <div className="creative-card-glow" />
                    <div className="creative-card-inner">
                      <div className="visual-header">
                        <div className="dot red" />
                        <div className="dot yellow" />
                        <div className="dot green" />
                        <span className="window-title">canvas.ts</span>
                      </div>
                      <div className="visual-body">
                        <div className="visual-animation">
                          <svg
                            className="rotating-gear"
                            viewBox="0 0 100 100"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <circle cx="50" cy="50" r="20" strokeDasharray="4 4" />
                            <circle cx="50" cy="50" r="35" />
                            <path d="M50 5v10M50 85v10M5 50h10M85 50h10M18.2 18.2l7.1 7.1M74.7 74.7l7.1 7.1M18.2 81.8l7.1-7.1M74.7 25.3l7.1-7.1" />
                          </svg>
                          <span className="visual-label">Dispositifs IoT & Web</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* SECTION ABOUT */}
          <section id="about" className="section-about">
            <div className="section-container">
              <ScrollReveal direction="up">
                <h2 className="section-title">À Propos</h2>
              </ScrollReveal>

              <div className="about-grid">
                {/* Colonne Gauche : Visuel & Savoir-être */}
                <ScrollReveal direction="left" delay={0.2} className="about-visual-col">
                  <div className="about-profile-card liquid-glass">
                    <div className="profile-image-container">
                      <img
                        src="/assets/images/pp_maxence.jpg"
                        alt="Portrait professionnel de Maxence Coste"
                        className="profile-image"
                        loading="lazy"
                      />
                      <div className="profile-image-glow" />
                    </div>

                    <div className="about-soft-skills">
                      <h3 className="soft-skills-title">Savoir-être (Soft Skills)</h3>
                      <div className="soft-skills-tags">
                        <span className="soft-skill-tag">
                          <span className="soft-skill-dot dot-indigo" />
                          Autonomie
                        </span>
                        <span className="soft-skill-tag">
                          <span className="soft-skill-dot dot-green" />
                          Esprit d'équipe
                        </span>
                        <span className="soft-skill-tag">
                          <span className="soft-skill-dot dot-yellow" />
                          Curiosité
                        </span>
                        <span className="soft-skill-tag">
                          <span className="soft-skill-dot dot-red" />
                          Vulgarisation
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Colonne Droite : Bio Professionnelle & Forces */}
                <ScrollReveal direction="right" delay={0.4} className="about-text-col">
                  <div className="bio-card liquid-glass">
                    <h3 className="bio-title">Qui suis-je ?</h3>
                    <p>
                      Passionné par la synergie entre le monde physique et le monde numérique, je
                      suis étudiant en{' '}
                      <strong>BUT MMI (Métiers du Multimédia et de l'Internet)</strong>, spécialisé
                      dans le <strong>Développement Web et les Dispositifs Interactifs</strong>.
                    </p>
                    <p>
                      Mon parcours me permet d'allier la <strong>rigueur technique du code</strong>{' '}
                      à la <strong>sensibilité esthétique du design d'interface</strong>. J'adore
                      concevoir des applications web fluides, performantes et accessibles (conformes
                      aux directives RGAA/WCAG), mais aussi donner vie à des dispositifs interactifs
                      connectés en programmant des microcontrôleurs (Arduino, ESP32) communicant en
                      temps réel via WebSockets ou MQTT.
                    </p>
                    <p>
                      Actuellement à la recherche d'une{' '}
                      <strong>alternance d'un an pour ma 3ème année de BUT MMI</strong> à partir de
                      septembre 2026, je souhaite mettre ma polyvalence, ma proactivité et mon sens
                      du détail au service de projets ambitieux de bout en bout.
                    </p>

                    <div className="about-strengths">
                      <h4 className="strengths-title">Mes Forces :</h4>
                      <ul className="strengths-list">
                        <li>
                          <strong>Développement Front-End Moderne :</strong> Intégration
                          pixel-perfect avec React, TypeScript et transitions fluides
                          (cubic-bezier).
                        </li>
                        <li>
                          <strong>Intégration d'Objets Connectés :</strong> Liaison de capteurs
                          physiques à des dashboards web temps réel (WebSockets, API).
                        </li>
                        <li>
                          <strong>Accessibilité & Performance :</strong> Code sémantique,
                          optimisation SEO et respect des normes d'accessibilité AA.
                        </li>
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* SECTION TIMELINE (Mon Parcours - VIEW-04) */}
              <ScrollReveal direction="up" delay={0.2} className="about-timeline-section">
                <h3 className="timeline-section-title">Mon Parcours</h3>
                <Timeline />
              </ScrollReveal>
            </div>
          </section>

          {/* SECTION PROJECTS */}
          <section id="projects" className="section-projects">
            <div className="section-container">
              <ScrollReveal direction="up">
                <h2 className="section-title">Mes Projets</h2>
                <p className="section-subtitle">
                  Découvrez une sélection de mes réalisations académiques (SAÉ) et personnelles.
                </p>
              </ScrollReveal>

              {/* Filtres de Projets */}
              <ScrollReveal direction="up" delay={0.15} className="projects-filter-container">
                <div
                  className="projects-filters liquid-glass"
                  role="tablist"
                  aria-label="Filtrer les projets par catégorie"
                >
                  {filters.map((filter) => {
                    const isActive = filter === activeFilter;
                    return (
                      <button
                        key={filter}
                        role="tab"
                        aria-selected={isActive}
                        className={`filter-btn ${isActive ? 'is-active' : ''}`}
                        onClick={() => handleFilterChange(filter)}
                      >
                        {filter}
                      </button>
                    );
                  })}
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <div
                  className={`projects-grid ${isTransitioning ? 'is-transitioning' : ''}`}
                  key={activeFilter}
                >
                  {visibleProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onOpenDetails={(p) => setSelectedProject(p)}
                      style={{ '--index': index } as React.CSSProperties}
                    />
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* SECTION IOT FOCUS */}
          <section id="iot" className="section-iot-focus">
            <div className="section-container">
              <ScrollReveal direction="up">
                <h2 className="section-title">Focus : Dispositifs Interactifs & IoT</h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.2}>
                <IotFocus />
              </ScrollReveal>
            </div>
          </section>

          {/* SECTION TERMINAL (EASTER EGG) */}
          <section id="terminal" className="section-terminal">
            <div className="section-container">
              <ScrollReveal direction="up">
                <h2 className="section-title">Terminal CLI Interactif</h2>
                <p className="section-subtitle">
                  Pour les recruteurs techniques : explorez mon profil, mes compétences et mes
                  projets en ligne de commande.
                </p>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.2}>
                <Terminal />
              </ScrollReveal>
            </div>
          </section>

          {/* SECTION SKILLS */}
          <section id="skills" className="section-skills">
            <div className="section-container">
              <ScrollReveal direction="up">
                <h2 className="section-title">Compétences</h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.2}>
                <Skills />
              </ScrollReveal>
            </div>
          </section>

          {/* SECTION CONTACT */}
          <section id="contact" className="section-contact">
            <div className="section-container">
              <ScrollReveal direction="up">
                <h2 className="section-title">Contact</h2>
              </ScrollReveal>
              <div className="contact-grid">
                <ScrollReveal direction="left" delay={0.2} className="contact-info-panel">
                  <h3>Discutons de votre projet !</h3>
                  <p>
                    Vous êtes à la recherche d'un alternant passionné et rigoureux pour la rentrée
                    de Septembre 2026 ? Écrivez-moi !
                  </p>
                  <ul className="contact-details-list">
                    <li>
                      <strong>Email :</strong> maxence.coste@example.com
                    </li>
                    <li>
                      <strong>Région :</strong> Lyon / Rhône-Alpes
                    </li>
                    <li>
                      <strong>Rythme :</strong> Disponible en alternance
                    </li>
                  </ul>
                </ScrollReveal>
                <ScrollReveal direction="right" delay={0.4}>
                  <ContactForm />
                </ScrollReveal>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <ScrollToTop />

        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </div>
    </LazyMotion>
  );
}

export default App;
