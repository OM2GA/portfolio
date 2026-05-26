import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="portfolio-app">
      <Navbar />

      <main className="main-content">
        {/* SECTION HERO */}
        <section id="hero" className="section-hero">
          <div className="section-container">
            <div className="hero-grid">
              <div className="hero-text-col">
                <div className="status-badge">
                  <span className="status-pulse" />
                  <span>Disponible Alternance BUT3 - Sept. 26</span>
                </div>
                <h1 className="hero-title">
                  Développeur Web & Concepteur d'Interfaces Interactives
                </h1>
                <p className="hero-description">
                  Actuellement en BUT MMI, je conçois des applications web modernes, performantes et
                  accessibles, et je développe des dispositifs connectés innovants (IoT).
                </p>
                <div className="hero-actions">
                  <a href="#projects" className="btn btn-primary">
                    Voir les Projets
                  </a>
                  <a href="#contact" className="btn btn-secondary">
                    Me Contacter
                  </a>
                </div>
              </div>
              <div className="hero-visual-col">
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
              </div>
            </div>
          </div>
        </section>

        {/* SECTION ABOUT */}
        <section id="about" className="section-about">
          <div className="section-container">
            <h2 className="section-title">À Propos</h2>
            <div className="about-grid">
              <div className="about-text">
                <p>
                  Bienvenue ! Je m'appelle <strong>Maxence Coste</strong>, étudiant en BUT MMI
                  spécialisé en développement web et objets connectés. J'adore créer des interfaces
                  qui sortent de l'écran, mêlant programmation pure et interactivité avec le monde
                  réel.
                </p>
                <p>
                  Ce site montre mes travaux, de la modélisation à l'intégration, avec le souci
                  permanent de la qualité de code, de la performance et de l'accessibilité
                  (RGAA/WCAG).
                </p>
              </div>
              <div className="timeline-mock">
                <h3>Mon Parcours</h3>
                <div className="timeline-item">
                  <div className="timeline-marker" />
                  <div className="timeline-content">
                    <span className="timeline-date">2024 - Présent</span>
                    <h4>BUT MMI (Web Dev & IoT)</h4>
                    <p>
                      Développement fullstack, architectures d'API, WebSocket, communication
                      matérielle.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker" />
                  <div className="timeline-content">
                    <span className="timeline-date">2022 - 2024</span>
                    <h4>Baccalauréat STI2D</h4>
                    <p>
                      Fondations des systèmes d'information, électronique numérique, initiation au
                      codage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION PROJECTS */}
        <section id="projects" className="section-projects">
          <div className="section-container">
            <h2 className="section-title">Mes Projets</h2>
            <p className="section-subtitle">
              Découvrez une sélection de mes réalisations académiques (SAÉ) et personnelles.
            </p>
            <div className="projects-grid-placeholder">
              <div className="project-card-mock span-2">
                <div className="project-card-badge">SAÉ Majeure</div>
                <h3>Plateforme Web Collaborative</h3>
                <p>
                  Application fullstack de gestion de projet en temps réel avec authentification
                  sécurisée.
                </p>
                <div className="project-tags">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>PostgreSQL</span>
                </div>
              </div>
              <div className="project-card-mock">
                <div className="project-card-badge">IoT / Interactif</div>
                <h3>Station Météo Connectée</h3>
                <p>Dashboard de monitoring météo en temps réel via WebSockets et protocole MQTT.</p>
                <div className="project-tags">
                  <span>Arduino</span>
                  <span>C++</span>
                  <span>WebSockets</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION SKILLS */}
        <section id="skills" className="section-skills">
          <div className="section-container">
            <h2 className="section-title">Compétences</h2>
            <div className="skills-grid-placeholder">
              <div className="skills-card-mock">
                <h3>Développement Front</h3>
                <div className="skill-tags">
                  <code>HTML5 / CSS3</code>
                  <code>JavaScript (ES6+)</code>
                  <code>TypeScript</code>
                  <code>React / Next.js</code>
                </div>
              </div>
              <div className="skills-card-mock">
                <h3>Développement Back</h3>
                <div className="skill-tags">
                  <code>Node.js / Express</code>
                  <code>PHP / Laravel</code>
                  <code>REST & GraphQL</code>
                  <code>PostgreSQL / MongoDB</code>
                </div>
              </div>
              <div className="skills-card-mock">
                <h3>Dispositifs Interactifs & IoT</h3>
                <div className="skill-tags">
                  <code>Arduino / ESP32</code>
                  <code>C++</code>
                  <code>MQTT / WebSockets</code>
                  <code>Creative Coding (P5.js)</code>
                </div>
              </div>
              <div className="skills-card-mock">
                <h3>Design & Outils</h3>
                <div className="skill-tags">
                  <code>Figma (UI/UX)</code>
                  <code>Git & GitHub</code>
                  <code>Suite Adobe</code>
                  <code>Vercel / Netlify</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION CONTACT */}
        <section id="contact" className="section-contact">
          <div className="section-container">
            <h2 className="section-title">Contact</h2>
            <div className="contact-grid">
              <div className="contact-info-panel">
                <h3>Discutons de votre projet !</h3>
                <p>
                  Vous êtes à la recherche d'un alternant passionné et rigoureux pour la rentrée de
                  Septembre 2026 ? Écrivez-moi !
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
              </div>
              <div className="contact-form-mock">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" id="name" placeholder="Votre nom" disabled />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Votre email" disabled />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" rows={4} placeholder="Votre message..." disabled />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled>
                    Envoyer (Prochainement disponible)
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
