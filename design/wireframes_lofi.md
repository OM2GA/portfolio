# 📐 Spécifications des Layouts et Wireframes Lo-Fi (Mobile & Desktop)

Ce document remplace les croquis papier ou les wireframes Figma physiques par une spécification textuelle et schématique complète en Markdown, conformément au ticket **[DESIGN-05]**. Il décrit l'agencement global, l'organisation spatiale et le comportement responsive du portfolio de **Maxence Coste** (BUT MMI - Développement Web & Dispositifs Interactifs) avec une approche rigoureusement **Mobile-First**.

---

## 🗺️ 1. Architecture Globale du Single-Page Application (SPA)

Le site est conçu comme une application web d'une seule page fluide (Single-Page App) avec un scroll vertical fluide, complétée par une modale dynamique pour les détails de chaque projet.

### Structure Sémantique HTML5 (DOM)

```text
+-----------------------------------------------------------+
| <html> & <body> (Contrôle du thème .dark / .light)         |
|  +-----------------------------------------------------+  |
|  | <header> (Navbar persistante en Glassmorphism)      |  |
|  +-----------------------------------------------------+  |
|  | <main> (Conteneur principal centré max-width)       |  |
|  |   +---------------------------------------------+   |  |
|  |   | <section id="hero"> (Intro + CTA)            |   |  |
|  |   +---------------------------------------------+   |  |
|  |   | <section id="about"> (Bio + Timeline MMI)   |   |  |
|  |   +---------------------------------------------+   |  |
|  |   | <section id="projects"> (Grille + Filtres)  |   |  |
|  |   +---------------------------------------------+   |  |
|  |   | <section id="skills"> (Catégories Tech/DA)  |   |  |
|  |   +---------------------------------------------+   |  |
|  |   | <section id="contact"> (Formulaire)         |   |  |
|  |   +---------------------------------------------+   |  |
|  | </main>                                             |  |
|  +-----------------------------------------------------+  |
|  | <footer> (Liens sociaux, mentions légales, année)    |  |
|  +-----------------------------------------------------+  |
|  | <dialog id="project-modal"> (Fenêtre de détails)    |  |
|  +-----------------------------------------------------+  |
+-----------------------------------------------------------+
```

---

## 📱 2. Le Squelette Commun : En-tête (Navbar) et Pied de page (Footer)

La navigation doit s'adapter pour garantir une accessibilité optimale sur écran tactile (zone de confort des pouces) et une esthétique premium sur écran d'ordinateur.

### 2.1 En-tête : Barre de Navigation (`<header>`)

#### Vue Mobile (Écran < 768px)

- **Comportement** : Barre compacte collée en haut (`position: fixed`). Le menu s'ouvre sous forme de tiroir latéral plein écran (Drawer) au clic sur l'icône "Burger".
- **Zone tactile** : Les boutons font au minimum `48px x 48px` pour éviter les erreurs de clic.

```text
+---------------------------------------------------+
| [ MC.dev ]                                 [ ☰ ] | <-- Bar fixe (Glassmorphism, blur)
+---------------------------------------------------+
|  Tiroir mobile (ouvert au clic sur ☰)              |
|                                                   |
|  (X) Bouton Fermer                                 |
|                                                   |
|  [ 🏠 Accueil ]                                    | <-- Liens empilés verticalement
|  [ 📂 Projets ]                                    |     (Padding vertical généreux)
|  [ 🧑 À Propos ]                                   |
|  [ ✉️ Contact ]                                    |
|                                                   |
|  [ Commutateur Thème ☉ / 🌗 ]                      | <-- Accès facile en bas de tiroir
+---------------------------------------------------+
```

#### Vue Desktop (Écran >= 768px)

- **Comportement** : Alignement horizontal sur une seule ligne. Intègre l'effet **Liquid Glass** (Glassmorphism, flou d'arrière-plan et bordure fine translucide) avec détection active de la section au scroll (Intersection Observer).

```text
+-----------------------------------------------------------------------------------------+
| [ MC.dev ]                          [ Accueil ] [ Projets ] [ À propos ] [ Contact ] [☉]|
+-----------------------------------------------------------------------------------------+
  ^ Logo cliquable                     ^ Navigation horizontale fluide                  ^ Thème
  (Scroll to top)                      (Hover: soulignement dynamique)                  (Toggle)
```

---

### 2.2 Pied de page (`<footer>`)

Contient les liens obligatoires et renforce la crédibilité. Il est structuré de manière identique sur mobile et desktop, seul l'alignement passe de vertical à horizontal.

```text
Vue Mobile (Centré verticalement)          Vue Desktop (Réparti sur les côtés)
+------------------------------------+     +---------------------------------------------------+
|            [ Logo MC ]             |     | [ Logo MC ]                [ Github ] [ LinkedIn ]|
|                                    |     | © 2026 Maxence Coste.                             |
|          [ Github Link ]           |     | Conçu en BUT MMI.                                 |
|         [ LinkedIn Link ]          |     +---------------------------------------------------+
|                                    |
|       © 2026 Maxence Coste.        |
|        Conçu en BUT MMI.           |
+------------------------------------+
```

---

## 🎨 3. Spécifications Détaillées des Sections (Wireframes Lo-Fi)

---

### 3.1 SECTION : Hero / Accueil (`#hero`)

C'est la première impression de l'utilisateur. Elle applique l'argumentaire ciblé (alternance BUT3).

#### 📱 Layout Mobile (Mobile-First)

- **Structure** : Simple colonne centrée verticalement.
- **Hiérarchie** : Badge d'état -> Titre H1 -> Slogan de ciblage -> Boutons d'actions empilés.

```text
+---------------------------------------------------+
|                                                   |
|    +-----------------------------------------+    |
|    | [🟢 Disponible Alternance BUT3 Sept. 26]|    | <-- Badge d'état (Pulsing Green)
|    +-----------------------------------------+    |
|                                                   |
|    ★ Développeur Web & Concepteur             | <-- Titre principal H1 (Outfit)
|      d'Interfaces Interactives ★                  |
|                                                   |
|    Actuellement en BUT MMI, je conçois des        | <-- Paragraphe d'intro (Inter, gris)
|    applications web performantes et des           |
|    dispositifs connectés innovants (IoT).         |
|                                                   |
|    +-----------------------------------------+    |
|    |           [ Voir les Projets ]          |    | <-- CTA Primaire (Bouton plein, Indigo)
|    +-----------------------------------------+    |
|    |          [ Télécharger le CV ]          |    | <-- CTA Secondaire (Bouton contour)
|    +-----------------------------------------+    |
|                                                   |
+---------------------------------------------------+
```

#### 💻 Layout Desktop (Écran >= 1024px)

- **Structure** : Grille à deux colonnes (`grid-template-columns: 3fr 2fr`).
- **Contenu** :
  - **Colonne Gauche** : Titre H1, sous-titre de ciblage stratégique, texte interactif d'auto-typing (caps), et boutons d'action côte à côte.
  - **Colonne Droite** : Une illustration SVG interactive ou une pièce de "Creative Coding" représentant l'interactivité ou un concept IoT en temps réel.

```text
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  COLONNE GAUCHE (Textes & Actions)          COLONNE DROITE (Visuel Interactif)          |
|  +---------------------------------------+  +----------------------------------------+  |
|  | [🟢 Disponible pour Septembre 2026]   |  |   _________________________________    |  |
|  |                                       |  |  /                                 \   |  |
|  |  <h1> Maxence Coste </h1>             |  | |  [ Illustration interactive de ]  |  |  |
|  |  <h2> Développeur Web &               |  | |  [ Creative Coding / Canvas ou ]  |  |  |
|  |      Concepteur d'Interfaces          |  | |  [ Rendu 3D de dispositif IoT  ]  |  |  |
|  |      Interactives </h2>               |  |  \_________________________________/   |  |
|  |                                       |  |                                        |  |
|  |  Je suis <span class="typing">...  |  |  (Réagit aux mouvements de la souris,  |  |
|  |                                       |  |   mettant en valeur l'aspect créatif)  |  |
|  |  [ Voir les Projets ]  [ Télécharger CV]| +----------------------------------------+  |
|  +---------------------------------------+                                              |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

### 3.2 SECTION : À Propos & Frise Chronologique (`#about`)

Présente le profil de Maxence, sa polyvalence, et son parcours BUT MMI via une timeline interactive.

#### 📱 Layout Mobile

- **Structure** : Flux vertical standard. La timeline est une ligne verticale sur le bord gauche, avec les événements empilés les uns en dessous des autres.

```text
+---------------------------------------------------+
|  <h2> 🧑 À Propos de moi </h2>                   |
|                                                   |
|  [ Photo / Avatar Stylisé Centré ]                | <-- Rond ou carré arrondi
|                                                   |
|  Bio textuelle : "Étudiant passionné par la       | <-- Texte fluide
|  double compétence technique et créative..."      |
|                                                   |
|  <h3> 🎓 Mon Parcours (BUT MMI) </h3>             |
|                                                   |
|  +-- TIMELINE MOBIL ----------------------------+ |
|  |  o  [2024 - Présent]                         | | <-- Ligne verticale continue à gauche
|  |  |  BUT MMI (Parcours Dev Web & IoT)         | |     Chaque point est cliquable
|  |  |  "Spécialisation dans les archi..."        | |
|  |  |                                           | |
|  |  o  [2022 - 2024]                            | |
|  |  |  Baccalauréat STI2D                       | |
|  |     "Bases en systèmes d'information..."     | |
|  +----------------------------------------------+ |
+---------------------------------------------------+
```

#### 💻 Layout Desktop (Écran >= 1024px)

- **Structure** : Grille à deux colonnes (`1fr 1fr`) pour la bio, puis frise horizontale interactive couvrant toute la largeur pour le parcours.

```text
+-----------------------------------------------------------------------------------------+
|  <h2> 🧑 À Propos de moi </h2>                                                           |
|                                                                                         |
|  COLONNE GAUCHE (Visuel & Soft Skills)      COLONNE DROITE (Bio Professionnelle)        |
|  +---------------------------------------+  +----------------------------------------+  |
|  | +-----------------------------------+ |  | "Venant d'un parcours technique, j'ai  |  |
|  | |                                   | |  | trouvé dans le BUT MMI le parfait      |  |
|  | |    [ Photo de Profil Premium ]    | |  | équilibre entre la rigueur du code...  |  |
|  | |                                   | |  |                                        |  |
|  | +-----------------------------------+ |  | Mes forces :                           |  |
|  |   Soft Skills :                       |  | - Développement Front-end moderne      |  |
|  |   - Autonomie  - Esprit d'équipe      |  | - Intégration d'objets connectés (IoT) |  |
|  |   - Curiosité - Vulgarisation         |  | - Respect strict de l'accessibilité    |  |
|  +---------------------------------------+  +----------------------------------------+  |
|                                                                                         |
|  <h3> 🎓 Mon Parcours </h3>                                                             |
|  +-- TIMELINE HORIZONTALE INTERACTIVE (Bento Style) ---------------------------------+  |
|  |                                                                                   |  |
|  |  [ Étape 1 : STI2D ]  =======>  [ Étape 2 : BUT1/BUT2 MMI ] =======> [ Étape 3 ]    |  |
|  |  - Années : 2022-2024           - Années : 2024-2026                Alternance    |  |
|  |  - Bases électroniques & dev    - Approfondissement Web & IoT       Recherchée    |  |
|  |                                                                                   |  |
|  +-----------------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------------+
```

---

### 3.3 SECTION : Projets (`#projects`) - Grille Bento Premium

Affiche les projets sous forme de **Bento Grid** interactive avec un système de filtres temps réel (sans rechargement de page).

#### 📱 Layout Mobile

- **Structure** : Filtres disposés dans un menu de défilement horizontal (swipeable). Les cartes de projets sont empilées sur une seule colonne à 100% de largeur pour s'adapter à l'écran tactile.

```text
+---------------------------------------------------+
|  <h2> 📂 Mes Projets Phares </h2>                 |
|                                                   |
|  <- [Tout] [Web Front] [Back-end] [IoT] ->        | <-- Filtres horizontaux swipeables
|                                                   |
|  +-- CARTE PROJET (100% Largeur) ---------------+ |
|  | +-------------------------------------------+ | | <-- Image de couverture (16:9)
|  | |               [ Image ]                   | | |
|  | +-------------------------------------------+ | |
|  |  Projet 1 : Nom du Projet                     | | <-- H3 (Outfit)
|  |  "Brève description vulgarisée..."           | | <-- Texte (Inter)
|  |  [Badge: React] [Badge: Node] [Badge: IoT]   | | <-- Fira Code
|  |                                               | |
|  |  [ Voir Détails ]  [ Github ↗ ]                | | <-- CTAs avec icônes (48px height)
|  +-----------------------------------------------+ |
|                                                   |
|  +-- CARTE PROJET 2 (Empilée) ------------------+ |
|  | ...                                           | |
|  +-----------------------------------------------+ |
+---------------------------------------------------+
```

#### 💻 Layout Desktop (Écran >= 1024px)

- **Structure** : **Bento Grid** asymétrique (`grid-template-columns: repeat(3, 1fr)`).
- **Agencement** : Le projet majeur (ex: SAÉ de groupe ou Projet IoT clé) s'étend sur deux colonnes (`grid-column: span 2`), tandis que les projets secondaires occupent une seule colonne. L'effet au survol applique un zoom de l'image et une bordure lumineuse (Glow effect).

```text
+-----------------------------------------------------------------------------------------+
|  <h2> 📂 Mes Projets Phares </h2>                                                       |
|                                                                                         |
|      [ Tout ]        [ Dev Web Front ]        [ Archi Back-end ]        [ IoT & Interactif ] <-- Boutons filtres
|                                                                                         |
|  BENTO GRID (3 Colonnes)                                                                |
|  +---------------------------------------------------+-------------------------------+  |
|  | CARTE PROJET MAJEUR (Double Largeur - span 2)     | CARTE PROJET 2 (Simple col)   |  |
|  | +-----------------------------------------------+ | +---------------------------+ |  |
|  | |                  [ Image ]                    | | |          [ Image ]        | |  |
|  | +-----------------------------------------------+ | +---------------------------+ |  |
|  |  Nom du Projet 1 (SAÉ Majeure MMI)              | |  Nom du Projet 2 (Perso)    |  |
|  |  "Description complète axée double ciblage..."   | |  "Description courte..."    |  |
|  |  [React] [Next.js] [Tailwind] [Node.js]          | |  [Vanilla JS] [Canvas]      |  |
|  |  [ Voir Détails ]  [ Github ↗ ]                  | |  [ Voir Détails ] [Github]  |  |
|  +---------------------------------------------------+-------------------------------+  |
|  | CARTE PROJET 3 (Simple col)                       | CARTE PROJET 4 (Simple col)   |  |
|  | +-----------------------------------------------+ | +---------------------------+ |  |
|  | |                  [ Image ]                    | | |          [ Image ]        | |  |
|  | +-----------------------------------------------+ | +---------------------------+ |  |
|  |  Nom du Projet 3 (IoT / interactif)              | |  Nom du Projet 4            |  |
|  |  "Description courte..."                        | |  "Description courte..."    |  |
|  |  [Arduino] [C++] [WebSockets]                     | |  [HTML/CSS] [Figma]         |  |
|  |  [ Voir Détails ]  [ Github ↗ ]                  | |  [ Voir Détails ] [Github]  |  |
|  +---------------------------------------------------+-------------------------------+  |
+-----------------------------------------------------------------------------------------+
```

---

### 3.4 SECTION : Compétences / Skills (`#skills`)

Présente la stack technique et méthodologique de manière organisée.

#### 📱 Layout Mobile

- **Structure** : Sections pliables (Accordéon) ou empilées verticalement pour éviter de surcharger l'écran.

```text
+---------------------------------------------------+
|  <h2> 🛠️ Compétences </h2>                        |
|                                                   |
|  +-- CATÉGORIE 1: Dev Front-End (Ouvert) --------+ |
|  |  - HTML5 & CSS3 / SCSS                        | | <-- Icônes alignées à gauche
|  |  - JavaScript (ES6+) / TypeScript             | |     Texte explicatif à droite
|  |  - React & Next.js                             | |
|  +-----------------------------------------------+ |
|  +-- CATÉGORIE 2: Back-End & Bases (Fermé [v]) --+ |
|  +-- CATÉGORIE 3: Dispositifs IoT (Fermé [v]) ---+ |
|  +-- CATÉGORIE 4: Design & Outils (Fermé [v]) ---+ |
+---------------------------------------------------+
```

#### 💻 Layout Desktop (Écran >= 1024px)

- **Structure** : Bento Grid à 4 blocs distincts (`grid-template-columns: repeat(2, 1fr)` ou `repeat(4, 1fr)`).
- **Contenu** : Chaque catégorie est une carte avec un fond en **Glassmorphism**, des icônes colorées et des tags technologiques (Fira Code) qui s'illuminent au survol.

```text
+-----------------------------------------------------------------------------------------+
|  <h2> 🛠️ Compétences Techniques & Créatives </h2>                                      |
|                                                                                         |
|  +-------------------------------------------+---------------------------------------+  |
|  | 💻 DÉVELOPPEMENT FRONT-END                | ⚙️ ARCHITECTURES BACK-END & DB         |  |
|  | - React / Next.js    - JavaScript (ES6+)  | - Node.js / Express  - PHP / Laravel  |  |
|  | - TypeScript         - TailwindCSS / SCSS | - PostgreSQL / MySQL - MongoDB / Redis|  |
|  | - HTML5 / CSS3 / A11y (Accessibilité)      | - API REST & GraphQL - WebSockets     |  |
|  +-------------------------------------------+---------------------------------------+  |
|  | 🔌 DISPOSITIFS INTERACTIFS & IOT          | 🎨 DESIGN & OUTILS                    |  |
|  | - Arduino / ESP32    - C++ (Programmation)| - Figma / UI/UX Design- Git / Github  |  |
|  | - Capteurs physiques  - Protocoles MQTT   | - Suite Adobe        - Vercel/Netlify |  |
|  | - Creative Coding (P5.js / Three.js)      | - Méthode Agile/Scrum- Vite / Webpack |  |
|  +-------------------------------------------+---------------------------------------+  |
+-----------------------------------------------------------------------------------------+
```

---

### 3.5 SECTION : Contact (`#contact`)

Permet la conversion (envoi de message) via un formulaire sécurisé et esthétique.

#### 📱 Layout Mobile

- **Structure** : Formulaire vertical à colonne unique. Les champs sont larges et faciles à presser.

```text
+---------------------------------------------------+
|  <h2> ✉️ Discutons de votre projet </h2>          |
|                                                   |
|  Prêt à collaborer pour une alternance ?          | <-- Texte d'incitation
|                                                   |
|  [ Label : Votre Nom * ]                          |
|  +---------------------------------------------+  |
|  | Saisir votre nom...                         |  | <-- Input (min 48px height)
|  +---------------------------------------------+  |
|                                                   |
|  [ Label : Votre Email * ]                        |
|  +---------------------------------------------+  |
|  | Saisir votre email...                       |  | <-- Input
|  +---------------------------------------------+  |
|                                                   |
|  [ Label : Votre Message * ]                      |
|  +---------------------------------------------+  |
|  | Écrire votre message ici...                 |  |
|  |                                             |  | <-- Textarea
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |              [ Envoyer le message ]         |  | <-- CTA d'envoi (Bouton Indigo plein)
|  +---------------------------------------------+  |
+---------------------------------------------------+
```

#### 💻 Layout Desktop (Écran >= 1024px)

- **Structure** : Grille à deux colonnes (`2fr 3fr`).
- **Colonne Gauche** : Informations de contact directes (Email, téléphone, zone géographique, disponibilité, réseaux sociaux) pour une lecture rapide par le recruteur RH.
- **Colonne Droite** : Formulaire de contact moderne interactif avec validation à la volée.

```text
+-----------------------------------------------------------------------------------------+
|  <h2> ✉️ Discutons de votre projet </h2>                                                 |
|                                                                                         |
|  COLONNE GAUCHE (Coordonnées directes)      COLONNE DROITE (Formulaire Interactif)      |
|  +---------------------------------------+  +----------------------------------------+  |
|  | Slogan : "Donnons vie à vos projets"  |  | Nom *                                  |  |
|  |                                       |  | +------------------------------------+ |  |
|  | 📧 Email : maxence.coste@example.com  |  | | Saisir votre nom...                | |  |
|  | 📱 Tél : 06 XX XX XX XX               |  | +------------------------------------+ |  |
|  | 📍 Région : Lyon / Rhône-Alpes        |  | Email *                                |  |
|  | 🟢 Disponibilité : Alternance BUT3     |  | +------------------------------------+ |  |
|  |                                       |  | | Saisir votre email...              | |  |
|  | [ LinkedIn ]  [ Github ]  [ Twitter ] |  | +------------------------------------+ |  |
|  |                                       |  | Message *                              |  |
|  | (Boutons sous forme de badges         |  | +------------------------------------+ |  |
|  |  interactifs et colorés)              |  | | Écrire votre message ici...        | |  |
|  |                                       |  | +------------------------------------+ |  |
|  |                                       |  |                [ Envoyer le message ]  |  |
|  +---------------------------------------+  +----------------------------------------+  |
+-----------------------------------------------------------------------------------------+
```

---

## 🪟 4. La Modale de Détail Projet (`#project-modal` / `<dialog>`)

Lorsqu'un visiteur clique sur "Voir Détails" sur n'importe quel projet, cette modale en plein écran ou grand panneau s'ouvre de manière fluide. Elle est critique pour la **Cible 2 (Lead Dev)** car elle explique en détail l'architecture technique, le rôle de Maxence et les problématiques résolues.

#### Layout Unifié (Optimisé Desktop avec repli fluide sur Mobile)

- **Structure HTML** : Utilisation de la balise HTML5 sémantique `<dialog>` pour une gestion native de l'accessibilité au clavier (Focus-trap, touche `ESC` pour fermer).
- **Agencement Desktop** : Double colonne (`1fr 1fr`) pour la galerie d'images et l'explication.

```text
+-----------------------------------------------------------------------------------------+
|  [ MODALE DÉTAIL PROJET ]                                                [ (X) Fermer ] |
|  +-----------------------------------------------------------------------------------+  |
|  | Titre : SAÉ 301 - Application de Gestion de Capteurs IoT                          |  | <-- H2 (Outfit)
|  | Rôle : Développeur Lead (Front-end & Scripting ESP32) | Année : 2025              |  | <-- Métadonnées
|  |                                                                                   |  |
|  | COLONNE GAUCHE (Visuels)                   COLONNE DROITE (Contenu Technique)     |  |
|  | +---------------------------------------+  +------------------------------------+ |  |
|  | |  [ CAROUSEL D'IMAGES DU PROJET ]      |  |  🧪 Le Problème Métier (Pour RH)   | |  | <-- Double ciblage
|  | |                                       |  |  "Les données récoltées par les   | |  |
|  | |  [ < Précédent ]      [ Suivant > ]   |  |   capteurs étaient illisibles..."  | |  |
|  | |                                       |  |                                    | |  |
|  | |  - Miniature 1  - Miniature 2         |  |  ⚡ La Solution Technique (Pour Dev)  | |  |
|  | +---------------------------------------+  |  - Dev d'un Dashboard Next.js.     | |  |
|  |  Technologies utilisées :               |  |  - Scripting C++ avec protocoles   | |  |
|  |  [React] [ESP32] [MQTT] [Postgres]      |  |    MQTT pour l'envoi temps réel.   | |  |
|  |                                         |  |                                    | |  |
|  |  +-----------------------------------+  |  🛡️ Défi Technique surmonté           | |  |
|  |  |        [ Démo en ligne ↗ ]        |  |  "Gestion de la latence lors de la | |  |
|  |  +-----------------------------------+  |   réception des trames MQTT..."    | |  |
|  |  |        [ Code Source Github ↗ ]   |  |                                    | |  |
|  |  +-----------------------------------+  |                                    | |  |
|  +-----------------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------------+
```

_Note : Sur version Mobile, les colonnes gauche et droite s'empilent verticalement de manière classique pour préserver la lisibilité de la police de lecture._

---

## ⚡ 5. Spécifications des Transitions et États d'Interaction

Afin de garantir un rendu premium conforme aux meilleures pratiques de design interactif, les comportements suivants sont spécifiés au niveau du CSS :

### 5.1 Hover Effects (Survol de souris)

- **Bento Cards** : Légère translation verticale de `-4px` et halo lumineux (`box-shadow` ou `--glow-color`) de couleur d'accent (Indigo ou Menthe).
- **Boutons (CTAs)** : Transition fluide du fond de 0.2s (`transition: background-color 0.2s ease-in-out`).
- **Images Projets** : Léger zoom d'image (`transform: scale(1.05)`) contenu à l'intérieur de la carte (`overflow: hidden`).

### 5.2 Accessibilité & Focus Clavier (`:focus-visible`)

- Tout élément cliquable navigué à la touche `TAB` doit afficher un contour net :
  ```css
  *:focus-visible {
    outline: 3px solid var(--accent-primary);
    outline-offset: 4px;
  }
  ```
- **Skip-Links** : Ajout d'un lien d'évitement caché "Aller au contenu principal" visible uniquement au focus clavier pour les personnes naviguant avec un lecteur d'écran.
