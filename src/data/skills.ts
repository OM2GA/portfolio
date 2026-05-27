import type { SkillCategory } from '../types/skill';

export const skillCategories: SkillCategory[] = [
  {
    id: 'front',
    title: 'Langages Front',
    description: "Conception d'interfaces web fluides, sémantiques et interactives.",
    iconName: 'Layout',
    skills: [
      {
        name: 'HTML5',
        level: 95,
        description:
          'Intégration sémantique structurée, respect strict des normes WCAG/RGAA pour une accessibilité optimale.',
        experience: '3 ans (SAÉs, projets personnels & professionnels)',
        useCase: 'Structure sémantique et accessibilité de tous mes projets web.',
        projectIds: ['20-bornes-andresy', 'decathlon-profiler', 'coulisses-gym'],
      },
      {
        name: 'CSS3',
        level: 90,
        description:
          'Mises en page modernes (Grid, Flexbox), animations fluides (cubic-bezier) et gestion fine des Design Systems.',
        experience: '3 ans (SAÉs, projets personnels & professionnels)',
        useCase: 'Conception responsive de maquettes pixel-perfect et thèmes sombres/clairs.',
        projectIds: ['20-bornes-andresy', 'decathlon-profiler', 'coulisses-gym'],
      },
      {
        name: 'JavaScript',
        level: 90,
        description:
          "Développement d'interactions riches côté client, manipulation robuste du DOM et programmation asynchrone.",
        experience: '3 ans (SAÉs, projets personnels & professionnels)',
        useCase: "Logique applicative front-end et algorithmes d'évaluation.",
        projectIds: ['20-bornes-andresy', 'decathlon-profiler', 'coulisses-gym'],
      },
      {
        name: 'TypeScript',
        level: 85,
        description:
          'Typage statique avancé pour garantir la robustesse des flux de données et faciliter la maintenance à grande échelle.',
        experience: '1.5 an (SAÉs et projets personnels)',
        useCase:
          'Sécurisation et structuration de la logique applicative dans mes projets complexes.',
        projectIds: [],
      },
      {
        name: 'React',
        level: 85,
        description:
          "Architecture par composants modulaires réutilisables, hooks personnalisés et gestion d'état performante.",
        experience: '2 ans (SAÉs et projets personnels)',
        useCase: "Développement d'applications Single Page dynamiques et réactives.",
        projectIds: [],
      },
      {
        name: 'Next.js',
        level: 80,
        description:
          "Développement d'applications web hybrides avec rendu côté serveur (SSR) et génération statique (SSG) pour un SEO maximal.",
        experience: '1 an (Projets personnels)',
        useCase: 'Optimisation de la vitesse de chargement et référencement des projets.',
        projectIds: [],
      },
    ],
  },
  {
    id: 'back',
    title: 'Outils Back & BDD',
    description: 'Création de serveurs robustes et modélisation de bases de données sécurisées.',
    iconName: 'Server',
    skills: [
      {
        name: 'Node.js',
        level: 80,
        description:
          "Exécution JavaScript côté serveur pour le développement d'outils et de services back-end performants.",
        experience: '2 ans (SAÉs et projets personnels)',
        useCase: 'Développement de serveurs temps réel légers.',
        projectIds: [],
      },
      {
        name: 'Express',
        level: 80,
        description:
          "Création d'APIs RESTful avec gestion de middlewares personnalisés, routage structuré et sécurité.",
        experience: '2 ans (Projets personnels)',
        useCase: "Endpoints d'échange de données pour les dashboards web.",
        projectIds: [],
      },
      {
        name: 'PHP',
        level: 85,
        description:
          'Programmation serveur orientée objet, requêtes préparées PDO sécurisées contre les injections SQL.',
        experience: '2 ans (SAÉs et projets académiques)',
        useCase: "Création d'APIs RESTful et systèmes d'authentification session.",
        projectIds: ['oishi-sushi-shop'],
      },
      {
        name: 'Laravel',
        level: 75,
        description:
          'Utilisation du framework MVC pour structurer rapidement des back-offices complexes et sécurisés.',
        experience: '1 an (SAÉs)',
        useCase:
          "Développement rapide d'applications collaboratives et gestion de bases de données.",
        projectIds: [],
      },
      {
        name: 'MySQL',
        level: 80,
        description:
          'Modélisation relationnelle rigoureuse (MCD/MLD), requêtes complexes, jointures et indexation de données.',
        experience: '2 ans (SAÉs et projets universitaires)',
        useCase: 'Persistance sécurisée des bases de données utilisateurs et catalogues.',
        projectIds: ['oishi-sushi-shop'],
      },
      {
        name: 'MongoDB',
        level: 75,
        description:
          'Gestion de bases de données NoSQL orientées documents pour les projets nécessitant de la flexibilité.',
        experience: '1.5 an (Projets personnels)',
        useCase: "Stockage flexible de logs d'activité IoT et profils non structurés.",
        projectIds: [],
      },
    ],
  },
  {
    id: 'iot',
    title: 'Dispositifs Interactifs & IoT',
    description: 'Programmation embarquée et interfaces physiques connectées en temps réel.',
    iconName: 'Cpu',
    skills: [
      {
        name: 'Arduino',
        level: 85,
        description:
          "Prototypage électronique, lecture de capteurs physiques (analogiques/numériques) et contrôle d'actionneurs.",
        experience: '2 ans (SAÉs de dispositifs connectés)',
        useCase: "Développement d'interfaces physiques interactives et de captation de données.",
        projectIds: [],
      },
      {
        name: 'ESP32',
        level: 85,
        description:
          'Programmation de puces embarquées communicantes avec protocoles réseau Wi-Fi et Bluetooth Low Energy (BLE).',
        experience: '1.5 an (Projets IoT autonomes)',
        useCase: "Création d'objets communicants connectés au cloud ou à des dashboards locaux.",
        projectIds: [],
      },
      {
        name: 'C++',
        level: 80,
        description:
          'Écriture de micrologiciels embarqués optimisés, gestion des interruptions et de la mémoire.',
        experience: '2 ans (IoT universitaire)',
        useCase: 'Programmation des cartes Arduino et ESP32 pour les SAÉs.',
        projectIds: [],
      },
      {
        name: 'WebSockets',
        level: 85,
        description:
          'Communication bidirectionnelle en temps réel à très faible latence entre applications web et objets physiques.',
        experience: '1.5 an (Dispositifs interactifs)',
        useCase:
          "Mise à jour instantanée d'interfaces web selon des mouvements physiques ou capteurs.",
        projectIds: [],
      },
      {
        name: 'MQTT',
        level: 80,
        description:
          'Utilisation du protocole de messagerie léger de publication-abonnement (Pub/Sub) pour la domotique et la télémétrie.',
        experience: '1 an (Projets IoT)',
        useCase: "Architecture d'échange de données légères sur des réseaux IoT.",
        projectIds: [],
      },
      {
        name: 'Creative Coding',
        level: 85,
        description:
          "Création d'animations génératives, d'œuvres interactives en P5.js réagissant au son, au curseur ou aux capteurs physiques.",
        experience: '2 ans (SAÉs créatives et artistiques)',
        useCase:
          'Conception de dispositifs de médiation et de visualisation de données innovantes.',
        projectIds: ['coulisses-gym'],
      },
    ],
  },
  {
    id: 'design',
    title: 'Design & Outils',
    description: 'Outils de prototypage, de travail collaboratif et de déploiement continu.',
    iconName: 'Palette',
    skills: [
      {
        name: 'Figma',
        level: 90,
        description:
          'Design UI/UX pixel-perfect, création de composants réutilisables (variants, auto-layout) et prototypes interactifs.',
        experience: '3 ans (BUT MMI, SAÉs, projets persos)',
        useCase: 'Recherche utilisateur, wireframes et maquettes haute fidélité pour mes projets.',
        projectIds: ['20-bornes-andresy', 'oishi-sushi-shop', 'decathlon-profiler'],
      },
      {
        name: 'Git',
        level: 90,
        description:
          'Maîtrise de la gestion de versions en ligne de commande : commits rigoureux, branches isolées et résolutions de conflits.',
        experience: '3 ans (Tous mes projets de développement)',
        useCase: "Versioning et suivi de l'intégrité du code source.",
        projectIds: ['oishi-sushi-shop'],
      },
      {
        name: 'GitHub',
        level: 85,
        description:
          'Travail collaboratif : revues de code, Pull Requests complexes, GitHub Issues et déploiements CI/CD de base.',
        experience: "3 ans (Projets universitaires d'équipe)",
        useCase: 'Coordination technique et collaboration en équipe de dev.',
        projectIds: ['oishi-sushi-shop'],
      },
      {
        name: 'Suite Adobe',
        level: 80,
        description:
          "Traitement d'images de haute qualité (Photoshop), création d'assets vectoriels (Illustrator) et montage vidéo (Premiere Pro).",
        experience: '3 ans (BUT MMI)',
        useCase: "Création d'assets visuels, illustrations et web-documentaires multimédias.",
        projectIds: ['coulisses-gym'],
      },
      {
        name: 'Vercel & Netlify',
        level: 85,
        description:
          "Déploiement continu agile connecté aux dépôts Git, configuration de noms de domaine et variables d'environnement.",
        experience: '2 ans (Projets personnels et SAÉs)',
        useCase: 'Mise en ligne rapide et automatisée de prototypes réactifs.',
        projectIds: [],
      },
    ],
  },
];
