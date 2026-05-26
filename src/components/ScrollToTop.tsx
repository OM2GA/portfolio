import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import './ScrollToTop.css';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show the button when scrolled more than 400px down
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Check initial scroll position on mount
    toggleVisibility();

    // Cleanup the event listener on unmount
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`scroll-to-top-btn ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Retourner en haut de la page"
      aria-hidden={!isVisible}
      title="Retourner en haut de la page"
      tabIndex={isVisible ? 0 : -1}
    >
      <ArrowUp size={22} className="arrow-icon" strokeWidth={2.5} />
    </button>
  );
}
