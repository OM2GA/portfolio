# 📋 Backlog de Création de Portfolio - BUT MMI (Développement Web & Dispositifs Interactifs)

Ce fichier regroupe **50 tickets détaillés** pour concevoir, développer, optimiser et déployer ton portfolio professionnel. Les tickets sont structurés sous forme de tâches prêtes à être cochées (`[ ]` -> `[x]`) au fil de ta progression.

> [!TIP]
> En tant qu'étudiant en parcours **Développement Web et Dispositifs Interactifs**, ton portfolio doit montrer une excellente maîtrise technique (code propre, responsive, bonnes pratiques), mais aussi ta capacité à créer des interfaces vivantes et interactives (IoT, creative coding, micro-animations).

> [!IMPORTANT]
> **Instructions pour l'assistant IA (Gemini)** :
> À chaque fois que tu réalises ou finalises une tâche associée à l'un des tickets ci-dessous, tu **dois impérativement mettre à jour ce fichier (`backlog.md`)** en marquant la tâche correspondante comme complétée (`[x]`). Si tu commences une tâche sans l'avoir tout à fait finie, tu peux utiliser la notation `[/]` pour indiquer qu'elle est en cours de traitement. Veille à ce que cet outil de suivi reste le reflet exact de l'état d'avancement réel du projet.

---

## 🗺️ Sommaire des Phases

- [🎨 Phase 1 : Conception & Design (UI/UX)](#-phase-1--conception--design-uiux) (7 tickets)
- [🛠️ Phase 2 : Configuration Technique & Architecture](#%EF%B8%8F-phase-2--configuration-technique--architecture) (7 tickets)
- [🧱 Phase 3 : Intégration du Design System & Composants Core](#-phase-3--intégration-du-design-system--composants-core) (8 tickets)
- [🖥️ Phase 4 : Développement des Sections Principales](#%EF%B8%8F-phase-4--développement-des-sections-principales) (9 tickets)
- [⚡ Phase 5 : Fonctionnalités Avancées & Interactivité](#-phase-5--fonctionnalités-avancées--interactivité) (8 tickets)
- [📈 Phase 6 : Optimisation, SEO & Accessibilité (A11y)](#-phase-6--optimisation-seo--accessibilité-a11y) (6 tickets)
- [🚀 Phase 7 : Tests, Finitions & Déploiement](#-phase-7--tests-finitions--déploiement) (5 tickets)

---

## 🎨 Phase 1 : Conception & Design (UI/UX)

_Cette phase permet de poser les bases visuelles et éditoriales de ton portfolio avant de toucher au code._

- [x] **[DESIGN-01] Définition de la ligne éditoriale et de la cible**
  - **Description** : Définir clairement les objectifs du portfolio (recherche d'alternance BUT3, stage de fin d'études, ou poursuite d'études en école d'ingénieurs/master) et le ton éditorial (professionnel, créatif, passionné).
  - **Critères d'acceptation** :
    - [x] Cible principale identifiée (ex: recruteurs techniques, leads dev).
    - [x] Argumentaire ou phrase d'accroche principale rédigée au brouillon.

- [x] **[DESIGN-02] Sélection et structuration des projets phares (SAÉ et projets perso)**
  - **Description** : Choisir 3 à 5 projets marquants (dont au moins une SAÉ technique de BUT MMI et un projet orienté "Dispositifs Interactifs/IoT" ou "Creative Coding").
  - **Critères d'acceptation** :
    - [x] Données structurées pour chaque projet : contexte, problématique, technologies, rôle et résultats obtenus.
    - [x] Captures d'écran ou visuels de qualité identifiés pour chaque projet.

- [x] **[DESIGN-03] Création du Moodboard & Veille technologique**
  - **Description** : Réaliser une veille sur les portfolios de développeurs créatifs modernes (ex: Awwwards, Dribbble) pour s'inspirer des tendances de navigation et d'animation.
  - **Critères d'acceptation** :
    - [x] Analyse de veille et inspirations rédigée sous forme de document ([design_inspiration_analysis.md](file:///c:/Users/maxen/Documents/portfolio/design/design_inspiration_analysis.md)).

- [x] **[DESIGN-04] Choix de la palette de couleurs et de la typographie**
  - **Description** : Définir une charte graphique premium. Privilégier un mode sombre natif (dark mode élégant avec des touches de couleurs néon/gradient dynamiques) et des typographies lisibles.
  - **Critères d'acceptation** :
    - [x] Palette de couleurs définie (fond sombre, couleurs de texte contrastées, couleur d'accentuation dynamique comme le violet indigo ou le vert menthe).
    - [x] Polices Google Fonts sélectionnées (ex: une sans-serif moderne comme _Inter_ ou _Outfit_ pour le texte de lecture, et une monospace comme _JetBrains Mono_ ou _Fira Code_ pour marquer l'aspect dev).

- [x] **[DESIGN-05] Wireframes basse fidélité (Lo-Fi)**
  - **Description** : Définir l'agencement global des pages (Accueil, Projets, À Propos, Contact) en vue Desktop et Mobile (approche Mobile-First) pour valider l'expérience utilisateur (UX) et le parcours de lecture.
  - **Critères d'acceptation** :
    - [x] Schémas et spécifications de chaque section réalisés sous forme de document Markdown détaillé ([wireframes_lofi.md](file:///c:/Users/maxen/Documents/portfolio/design/wireframes_lofi.md)) décrivant les versions Mobile et Desktop (Bento Grid, formulaires, modale).

- [x] **[DESIGN-06] Maquettes haute fidélité (Hi-Fi) en Markdown**
  - **Description** : Créer le design pixel-perfect du portfolio en Markdown ([maquettes_hifi.md](file:///c:/Users/maxen/Documents/portfolio/design/maquettes_hifi.md)) avec l'ensemble des éléments graphiques réels et maquettes d'interface intégrées.
  - **Critères d'acceptation** :
    - [x] Maquettes complètes des versions Desktop et Mobile intégrées dans le document.
    - [x] États d'interaction (hovers sur les boutons, focus, clics) modélisés et spécifiés techniquement en CSS.

- [x] **[DESIGN-07] Spécification des micro-interactions et animations**
  - **Description** : Rédiger ou annoter les maquettes Figma avec le comportement des animations souhaitées au scroll et au survol.
  - **Critères d'acceptation** :
    - [x] Liste des transitions définies et spécifiées techniquement sous forme de document ([animations_interactions.md](file:///c:/Users/maxen/Documents/portfolio/design/animations_interactions.md)).

---

## 🛠️ Phase 2 : Configuration Technique & Architecture

_Mise en place de l'environnement de développement pour démarrer sur des bases robustes._

- [x] **[TECH-01] Choix de la stack technique et initialisation**
  - **Description** : Initialiser le projet avec les technologies modernes adaptées à ton profil de développeur web.
  - _Recommandation MMI_ : Next.js (React) pour le SSR/SEO, ou Vite (React/Vue/Svelte) pour une Single Page Application ultra-rapide.
  - **Critères d'acceptation** :
    - [x] Projet initialisé avec le gestionnaire de paquets (`npm`, `pnpm` ou `yarn`).
    - [x] Dépôt Git configuré et premier commit effectué sur GitHub.

- [x] **[TECH-02] Configuration des outils de qualité de code (Linters & Formatters)**
  - **Description** : Installer et configurer ESLint et Prettier pour automatiser le formatage du code et éviter les erreurs de syntaxe.
  - **Critères d'acceptation** :
    - [x] Fichiers `eslint.config.js` (flat config) et `.prettierrc` configurés.
    - [x] Script de linting/formatting fonctionnel dans le `package.json`.
    - [x] Fichier `.gitignore` configuré pour exclure le dossier `node_modules` et les builds.

- [x] **[TECH-03] Configuration du CSS & du Design System**
  - **Description** : Mettre en place la couche de style (CSS pur, SCSS pour la modularité, ou TailwindCSS). Déclarer les variables globales de style (Custom Properties) correspondant à la DA.
  - **Critères d'acceptation** :
    - [x] Fichier CSS global configuré avec les variables (couleurs HSL, fonts, espacements).
    - [x] Reset CSS moderne (type Josh Comeau ou Andy Bell) appliqué.

- [x] **[TECH-04] Configuration du routage et de la navigation**
  - **Description** : Structurer la navigation de l'application (multi-pages physiques ou single-page fluide avec ancres URL).
  - **Critères d'acceptation** :
    - [x] Système de routage en place et fonctionnel sans erreur de redirection.
    - [x] Gestion du scroll fluide (smooth scrolling) activée par défaut.

- [x] **[TECH-05] Intégration d'une bibliothèque d'icônes**
  - **Description** : Configurer une librairie d'icônes vectorielles légères et modernes.
  - **Critères d'acceptation** :
    - [x] Bibliothèque configurée (ex: `lucide-react`, `react-icons` ou icônes SVG optimisées importées directement).

- [ ] **[TECH-06] Modélisation et stockage des données des projets**
  - **Description** : Créer un stockage propre pour les projets (fichiers JSON locaux ou fichiers Markdown avec frontmatter) pour séparer le contenu de la logique de présentation.
  - **Critères d'acceptation** :
    - [ ] Fichier de données de test en place contenant les détails d'au moins 3 projets.

- [ ] **[TECH-07] Setup du déploiement continu (CI/CD) de test**
  - **Description** : Connecter ton dépôt GitHub à ton service d'hébergement (Vercel ou Netlify) pour valider que le processus de build fonctionne dès le début du développement.
  - **Critères d'acceptation** :
    - [ ] Projet déployé sur une URL temporaire.
    - [ ] Déploiement automatique déclenché à chaque `push` sur la branche principale.

---

## 🧱 Phase 3 : Intégration du Design System & Composants Core

_Développement des composants de base réutilisables qui structureront l'ensemble des pages._

- [ ] **[CORE-01] Composant Bouton réutilisable (Button)**
  - **Description** : Créer un composant bouton hautement paramétrable supportant plusieurs styles (primaire, secondaire, outline, désactivé).
  - **Critères d'acceptation** :
    - [ ] Props du composant définies proprement (icones optionnelles, tailles, variantes).
    - [ ] Micro-interactions au survol (hover) fluides avec transitions CSS.

- [ ] **[CORE-02] Composant Carte de Projet (ProjectCard)**
  - **Description** : Créer la carte interactive affichant un projet de manière synthétique avant d'accéder aux détails.
  - **Critères d'acceptation** :
    - [ ] Affichage de l'image de couverture, du titre, d'une courte description et des technologies associées.
    - [ ] Présence d'un lien vers la démo en ligne et/ou le dépôt GitHub.
    - [ ] Effet au survol élégant (ex: zoom léger de l'image, surbrillance de la bordure).

- [ ] **[CORE-03] Composant En-tête / Navigation (Navbar)**
  - **Description** : Créer la barre de navigation principale qui reste accessible lors du défilement.
  - **Critères d'acceptation** :
    - [ ] Effet de flou d'arrière-plan en mode "glassmorphism" (`backdrop-filter: blur()`).
    - [ ] Liens internes actifs se mettant en surbrillance selon la section actuellement visible (Intersection Observer API).

- [ ] **[CORE-04] Menu Mobile (Responsive Menu)**
  - **Description** : Adapter la barre de navigation pour les smartphones avec une interface adaptée aux pouces.
  - **Critères d'acceptation** :
    - [ ] Menu tiroir (drawer/slide-in) s'ouvrant de manière fluide au clic sur l'icône burger.
    - [ ] Fermeture automatique du menu lors d'un clic en dehors ou sur un lien de navigation.

- [ ] **[CORE-05] Composant Pied de page (Footer)**
  - **Description** : Structurer le bas de page pour laisser une impression professionnelle durable.
  - **Critères d'acceptation** :
    - [ ] Liens rapides vers les profils professionnels (GitHub, LinkedIn, Email).
    - [ ] Mention du copyright avec année dynamique.

- [ ] **[CORE-06] Composant Badges Technologiques (TechBadge)**
  - **Description** : Composant affichant les technologies utilisées sous forme de pastilles ou de badges avec couleurs/icônes personnalisées.
  - **Critères d'acceptation** :
    - [ ] Badges réutilisables au sein des cartes projets et de la section compétences.

- [ ] **[CORE-07] Bouton de retour en haut (ScrollToTop)**
  - **Description** : Créer un bouton flottant discret qui apparaît uniquement après un certain niveau de défilement (scroll) pour faciliter la remontée rapide.
  - **Critères d'acceptation** :
    - [ ] Bouton invisible en haut de page, apparaissant en douceur (fade-in) après 400px de scroll.
    - [ ] Défilement fluide vers le haut lors du clic.

- [ ] **[CORE-08] Système de Thème Sombre / Clair (Dark Mode Toggle)**
  - **Description** : Implémenter un commutateur permettant de passer du thème sombre au thème clair de manière transparente et persistante.
  - **Critères d'acceptation** :
    - [ ] Thème sauvegardé dans le `localStorage` pour persister lors des futures visites.
    - [ ] Détection automatique des préférences système de l'utilisateur (`prefers-color-scheme`).

---

## 🖥️ Phase 4 : Développement des Sections Principales

_Développement des blocs de contenus indispensables qui composent la page principale._

- [ ] **[VIEW-01] Section Hero (Accueil) : Premier contact**
  - **Description** : Rédiger et intégrer une phrase d'accroche percutante mettant en avant ta spécialité BUT MMI Web Dev et tes compétences.
  - **Critères d'acceptation** :
    - [ ] Affichage du titre principal (`<h1>` unique pour le SEO).
    - [ ] CTA principal évident ("Voir mes projets") et secondaire ("Télécharger mon CV").

- [ ] **[VIEW-02] Section Hero : Effet interactif de texte**
  - **Description** : Ajouter un effet interactif pour dynamiser la Hero section (ex: effet d'auto-typing décrivant tes casquettes : "Développeur Front-End", "Passionné d'IoT", "Créateur de dispositifs interactifs").
  - **Critères d'acceptation** :
    - [ ] Effet d'écriture fluide et sans bug de mise en page (pas de décalage de conteneur).

- [ ] **[VIEW-03] Section À Propos (About) : Présentation et Profil**
  - **Description** : Rédiger une biographie concise expliquant ton profil BUT MMI (polyvalence design/technique) et ton projet professionnel.
  - **Critères d'acceptation** :
    - [ ] Contenu textuel rédigé sans fautes d'orthographe.
    - [ ] Photo de profil optimisée ou illustration stylisée intégrée harmonieusement.

- [ ] **[VIEW-04] Section À Propos : Timeline interactive du parcours**
  - **Description** : Créer une frise chronologique animée présentant tes étapes clés (Bac, BUT MMI, projets marquants, stages/jobs).
  - **Critères d'acceptation** :
    - [ ] Composant interactif permettant de cliquer sur les étapes pour afficher des détails textuels ou visuels supplémentaires.

- [ ] **[VIEW-05] Section Projets : Liste & Grille interactive**
  - **Description** : Afficher la grille de cartes de projets en important les données structurées de ton fichier JSON/Markdown.
  - **Critères d'acceptation** :
    - [ ] Alignement responsive (CSS Grid ou Flexbox) s'adaptant parfaitement aux écrans.
    - [ ] Rendu performant des images.

- [ ] **[VIEW-06] Section Projets : Filtrage dynamique par catégorie**
  - **Description** : Ajouter des boutons de filtrage pour trier rapidement les projets (ex: "Tous", "Front-End", "Back-End", "Dispositifs Interactifs").
  - **Critères d'acceptation** :
    - [ ] Transition animée fluide lors du masquage/affichage des projets filtrés (sans saccade visuelle).

- [ ] **[VIEW-07] Section Compétences (Skills)**
  - **Description** : Organiser tes compétences techniques par sous-catégories (Langages Front, Outils Back/Base de données, Dispositifs Interactifs/IoT, Design/Maquettage).
  - **Critères d'acceptation** :
    - [ ] Icônes officielles ou logos propres pour chaque technologie.
    - [ ] Mise en page claire (grille de compétences interactives ou badges stylisés).

- [ ] **[VIEW-08] Section Contact : Formulaire interactif**
  - **Description** : Créer un formulaire de contact professionnel permettant aux recruteurs de t'envoyer un message directement depuis le site.
  - **Critères d'acceptation** :
    - [ ] Champs obligatoires validés en temps réel (Nom, Email, Message) avec des messages d'erreur explicites.
    - [ ] Style des champs cohérent avec le design global du site.

- [ ] **[VIEW-09] Page de Détail Projet (Template dynamique ou modale)**
  - **Description** : Créer une page ou un panneau coulissant pour détailler un projet spécifique (très valorisant pour expliquer ton rôle dans les SAÉ de BUT MMI).
  - **Critères d'acceptation** :
    - [ ] Présentation du problème de départ et de la solution technique.
    - [ ] Galerie d'images / captures d'écran intégrée de façon ergonomique.

---

## ⚡ Phase 5 : Fonctionnalités Avancées & Interactivité

_Ajout de l'effet "Wow" et de fonctionnalités interactives qui démarqueront ton profil._

- [ ] **[INT-01] Intégration d'une bibliothèque d'animations fluides (GSAP ou Framer Motion)**
  - **Description** : Installer et configurer une bibliothèque d'animation robuste pour enrichir l'expérience utilisateur globale.
  - **Critères d'acceptation** :
    - [ ] Librairie initialisée sans impact négatif sur les performances de chargement initial.

- [ ] **[INT-02] Animations de défilement (Scroll-Triggered Transitions)**
  - **Description** : Faire apparaître en fondu et décalage subtil les différentes sections et composants au fil de la navigation de l'utilisateur.
  - **Critères d'acceptation** :
    - [ ] Les éléments apparaissent de manière fluide dès qu'ils entrent dans le viewport (fenêtre d'affichage).

- [ ] **[INT-03] Effet d'inclinaison 3D sur les cartes de projets (Tilt Effect)**
  - **Description** : Ajouter un effet de parallaxe ou d'inclinaison 3D subtil sur les cartes de projets au survol de la souris.
  - **Critères d'acceptation** :
    - [ ] La carte s'incline légèrement en suivant les mouvements du curseur.
    - [ ] Désactivation automatique de l'effet sur les écrans tactiles pour éviter les conflits d'interaction.

- [ ] **[INT-04] Curseur personnalisé interactif (Custom Cursor)**
  - **Description** : Créer un curseur personnalisé réagissant au survol des éléments interactifs pour montrer ta maîtrise du développement créatif.
  - **Critères d'acceptation** :
    - [ ] Curseur fluide (sans latence perçue) qui change de style (grossissement, flou, ou inversion de couleur) au survol des liens et boutons.
    - [ ] Repli automatique (fallback) vers le curseur système par défaut sur tablette et mobile.

- [ ] **[INT-05] Focus spécial "Dispositifs Interactifs / IoT"**
  - **Description** : Créer un composant graphique interactif (ex: un schéma interactif animé ou un simulateur en SVG/CSS) expliquant visuellement comment tu as connecté un capteur physique à une API web dans l'un de tes projets.
  - **Critères d'acceptation** :
    - [ ] Schéma explicatif animé interactif au clic ou au survol montrant la circulation des flux de données (ex: Capteur -> Arduino -> WebSockets -> Dashboard).

- [ ] **[INT-06] Mini Terminal de commande interactif (Easter Egg pour recruteurs)**
  - **Description** : Intégrer un mini-terminal rétro interactif (type CLI) où les recruteurs techniques peuvent s'amuser à taper des commandes de base.
  - **Critères d'acceptation** :
    - [ ] Terminal fonctionnel réagissant à des commandes simples (`help`, `about`, `skills`, `projects`, `clear`).
    - [ ] Effet d'écriture rétro et style Monospace parfait.

- [ ] **[INT-07] Intégration de l'API de messagerie du formulaire**
  - **Description** : Connecter ton formulaire de contact à un service d'envoi d'e-mails pour recevoir directement les messages dans ta boîte de réception.
  - **Critères d'acceptation** :
    - [ ] Liaison réussie avec un service gratuit (ex: EmailJS, Formspree ou via une Serverless API route).
    - [ ] Message de succès et d'erreur propre affiché à l'utilisateur après soumission.

- [ ] **[INT-08] Téléchargement dynamique du CV**
  - **Description** : Mettre en ligne ton CV au format PDF et assurer son téléchargement ou son ouverture propre.
  - **Critères d'acceptation** :
    - [ ] Fichier PDF compressé pour le web (léger mais parfaitement net).
    - [ ] Bouton ouvrant le CV dans un nouvel onglet avec l'attribut `target="_blank"` et `rel="noopener noreferrer"`.

---

## 📈 Phase 6 : Optimisation, SEO & Accessibilité (A11y)

_Amélioration de la qualité technique du code pour garantir performance et accessibilité à tous les utilisateurs._

- [ ] **[PERF-01] Optimisation des images et des médias**
  - **Description** : Compresser l'intégralité des images et utiliser des formats modernes pour maximiser la vitesse de chargement du portfolio.
  - **Critères d'acceptation** :
    - [ ] Toutes les images converties au format `.webp` ou `.avif`.
    - [ ] Tailles d'images adaptées (redimensionnées) pour éviter de charger des fichiers trop lourds.
    - [ ] Attribut `loading="lazy"` ajouté sur les images sous la ligne de flottaison.

- [ ] **[PERF-02] Optimisation des polices de caractères**
  - **Description** : Configurer les polices pour éliminer le blocage du rendu visuel au démarrage.
  - **Critères d'acceptation** :
    - [ ] Utilisation de la propriété CSS `font-display: swap` pour afficher une police de secours en attendant le chargement de la police principale.
    - [ ] Pré-connexion aux serveurs de polices (`preconnect`) ou polices hébergées localement.

- [ ] **[SEO-01] Balises Meta de base et Open Graph**
  - **Description** : Optimiser le référencement naturel (SEO) du site pour apparaître dans les recherches avec des résumés accrocheurs.
  - **Critères d'acceptation** :
    - [ ] Balises `<title>` et `<meta name="description">` personnalisées et percutantes.
    - [ ] Intégration des balises Open Graph (`og:title`, `og:description`, `og:image`) pour un affichage parfait lors des partages sur LinkedIn et Twitter.

- [ ] **[SEO-02] Sitemap XML et Robots.txt**
  - **Description** : Fournir les fichiers nécessaires pour guider les robots de recherche (Google, Bing) lors de l'indexation de ton site.
  - **Critères d'acceptation** :
    - [ ] Fichier `sitemap.xml` valide listant les pages du site.
    - [ ] Fichier `robots.txt` standard autorisant l'indexation globale.

- [ ] **[A11Y-01] Contraste de couleurs et sémantique HTML5**
  - **Description** : Garantir l'accès à ton portfolio pour les personnes en situation de handicap (conformément au RGAA/WCAG).
  - **Critères d'acceptation** :
    - [ ] Utilisation exclusive de balises sémantiques HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
    - [ ] Rapport de contraste de couleurs conforme aux normes d'accessibilité (minimum AA) vérifié dans la console de développement.
    - [ ] Attribut `alt` renseigné pour chaque image informative.

- [ ] **[A11Y-02] Accessibilité au clavier et indicateurs de focus**
  - **Description** : S'assurer que le site est entièrement navigable pour les personnes n'utilisant pas de souris.
  - **Critères d'acceptation** :
    - [ ] Possibilité de naviguer logiquement sur tout le site avec la touche `Tab`.
    - [ ] Styles `:focus-visible` bien visibles et élégants pour tous les éléments interactifs.

---

## 🚀 Phase 7 : Tests, Finitions & Déploiement

_La dernière ligne droite pour garantir un lancement professionnel sans aucun bug._

- [ ] **[TEST-01] Tests multi-navigateurs et réactivité mobile (Responsive)**
  - **Description** : Valider le parfait rendu graphique et comportemental sur l'ensemble des navigateurs et des tailles d'écrans du marché.
  - **Critères d'acceptation** :
    - [ ] Affichage validé sur Chrome, Firefox, Edge et Safari.
    - [ ] Test effectué physiquement ou par émulation sur mobiles (iOS et Android) et tablettes.

- [ ] **[TEST-02] Validation W3C du code HTML/CSS**
  - **Description** : Passer le code source dans les validateurs officiels du W3C pour corriger les éventuelles erreurs de syntaxe.
  - **Critères d'acceptation** :
    - [ ] Zéro erreur bloquante au validateur HTML W3C.

- [ ] **[TEST-03] Audit de performance Google Lighthouse**
  - **Description** : Lancer un rapport Lighthouse pour valider la qualité globale du site.
  - **Critères d'acceptation** :
    - [ ] Obtenir un score de **90+** dans les 4 catégories clés (Performance, Accessibilité, Bonnes Pratiques, SEO).

- [ ] **[DEPLOY-01] Achat et liaison d'un nom de domaine personnalisé**
  - **Description** : Associer ton site à ton identité avec un nom de domaine propre (ex: `prenomnom.dev` ou `prenom-nom.fr`).
  - **Critères d'acceptation** :
    - [ ] DNS configurés correctement chez ton bureau d'enregistrement.
    - [ ] Certificat SSL actif (connexion sécurisée obligatoire en HTTPS).

- [ ] **[DEPLOY-02] Intégration d'un outil d'Analytics respectueux de la vie privée**
  - **Description** : Suivre l'audience de ton site et voir si les recruteurs cliquent sur tes projets sans pour autant violer leur vie privée (respect RGPD).
  - **Critères d'acceptation** :
    - [ ] Outil configuré (ex: _Plausible_, _Umami_ ou _Google Analytics sans cookies tiers_).
    - [ ] Dashboard de statistiques accessible et fonctionnel.
