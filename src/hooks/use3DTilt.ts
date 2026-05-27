import { useRef, useEffect } from 'react';

interface TiltOptions {
  maxRotation?: number; // Maximum rotation in degrees
  perspective?: number; // Perspective value in pixels
  scale?: number; // Scale on hover
}

export function use3DTilt(options: TiltOptions = {}) {
  const {
    maxRotation = 8, // Subtle tilt is elegant and premium
    perspective = 1000,
    scale = 1.02,
  } = options;

  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Detect touch device to disable the tilt effect
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouchDevice) return;

    let width = 0;
    let height = 0;
    let left = 0;
    let top = 0;

    const updateDimensions = () => {
      const rect = el.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      left = rect.left;
      top = rect.top;
    };

    const handleMouseEnter = () => {
      updateDimensions();
      // Smooth initial transition into the tilt state
      el.style.transition = 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (width === 0 || height === 0) {
        updateDimensions();
      }

      // Calculate mouse position relative to the element
      const x = e.clientX - left;
      const y = e.clientY - top;

      // Normalize to [-0.5, 0.5] range
      const percentX = x / width - 0.5;
      const percentY = y / height - 0.5;

      // Calculate tilt rotations
      // Rotate around X-axis for vertical movement, Y-axis for horizontal movement
      const rotateX = -(percentY * maxRotation);
      const rotateY = percentX * maxRotation;

      // Set transition to very fast/none for real-time tracking
      el.style.transition = 'transform 0.05s ease-out';
      el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    };

    const handleMouseLeave = () => {
      // Restore native transition and clear styles to reset smoothly
      el.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
      el.style.transform = '';

      // Let the browser reset to stylesheet values
      setTimeout(() => {
        if (el) {
          el.style.transition = '';
        }
      }, 500);
    };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    // Update dimensions on resize/scroll to keep coordinates accurate
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('scroll', updateDimensions, { passive: true });

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('scroll', updateDimensions);
    };
  }, [maxRotation, perspective, scale]);

  return elementRef;
}
