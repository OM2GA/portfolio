import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  // Coordonnées de la souris et du suiveur
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const followerX = useRef(0);
  const followerY = useRef(0);

  // État de visibilité et d'animation
  const isVisible = useRef(false);
  const animationFrameId = useRef<number | null>(null);

  // État local pour désactiver le rendu sur mobile/tablette/a11y
  const [isDisabled] = useState(() => {
    if (typeof window === 'undefined') return true;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return isTouch || prefersReducedMotion;
  });

  useEffect(() => {
    if (isDisabled) return;

    // Initialisation des coordonnées au centre de l'écran au démarrage
    mouseX.current = window.innerWidth / 2;
    mouseY.current = window.innerHeight / 2;
    followerX.current = window.innerWidth / 2;
    followerY.current = window.innerHeight / 2;

    // Déplacement immédiat du curseur central et fluide du suiveur
    const handlePointerMove = (e: PointerEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }

      // Rendre visible dès le premier mouvement
      if (containerRef.current && !isVisible.current) {
        containerRef.current.classList.add('is-visible');
        isVisible.current = true;
      }
    };

    // Sortie de la souris de la fenêtre de navigation
    const handlePointerLeaveWindow = () => {
      if (containerRef.current) {
        containerRef.current.classList.remove('is-visible');
        isVisible.current = false;
      }
    };

    // Entrée de la souris dans la fenêtre
    const handlePointerEnterWindow = (e: PointerEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      if (containerRef.current) {
        containerRef.current.classList.add('is-visible');
        isVisible.current = true;
      }
    };

    // Fonction d'aide pour détecter si un élément est interactif
    const isInteractive = (target: HTMLElement | null): boolean => {
      if (!target) return false;
      return (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA' ||
        !!target.closest('a') ||
        !!target.closest('button') ||
        !!target.closest('[role="button"]') ||
        !!target.closest('.interactive') ||
        !!target.closest('.filter-btn')
      );
    };

    // Gestion du survol des éléments cliquables
    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (isInteractive(target)) {
        cursorRef.current?.classList.add('hovering');
        followerRef.current?.classList.add('hovering');
      }
    };

    const handlePointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (isInteractive(target)) {
        cursorRef.current?.classList.remove('hovering');
        followerRef.current?.classList.remove('hovering');
      }
    };

    // Boucle d'animation à 60 FPS pour l'inertie du suiveur
    const animateFollower = () => {
      const ease = 0.15; // Coefficient d'amortissement / inertie (plus bas = plus lent/fluide)

      followerX.current += (mouseX.current - followerX.current) * ease;
      followerY.current += (mouseY.current - followerY.current) * ease;

      if (followerRef.current) {
        followerRef.current.style.left = `${followerX.current}px`;
        followerRef.current.style.top = `${followerY.current}px`;
      }

      animationFrameId.current = requestAnimationFrame(animateFollower);
    };

    // Démarrage de la boucle d'animation
    animationFrameId.current = requestAnimationFrame(animateFollower);

    // Enregistrement des écouteurs d'événements
    window.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerleave', handlePointerLeaveWindow);
    document.addEventListener('pointerenter', handlePointerEnterWindow);
    window.addEventListener('pointerover', handlePointerOver);
    window.addEventListener('pointerout', handlePointerOut);

    // Nettoyage lors du démontage du composant
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeaveWindow);
      document.removeEventListener('pointerenter', handlePointerEnterWindow);
      window.removeEventListener('pointerover', handlePointerOver);
      window.removeEventListener('pointerout', handlePointerOut);

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isDisabled]);

  if (isDisabled) return null;

  return (
    <div className="custom-cursor-container" ref={containerRef}>
      <div className="custom-cursor-follower" ref={followerRef} />
      <div className="custom-cursor" ref={cursorRef} />
    </div>
  );
}
