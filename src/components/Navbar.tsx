import { useState, useEffect } from 'react';
import { Home, User, Briefcase, Code, Mail, Sun, Moon, Menu, X } from 'lucide-react';
import './Navbar.css';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: 'hero',
    label: 'Accueil',
    icon: <Home size={18} />,
  },
  {
    id: 'about',
    label: 'À Propos',
    icon: <User size={18} />,
  },
  {
    id: 'projects',
    label: 'Projets',
    icon: <Briefcase size={18} />,
  },
  {
    id: 'skills',
    label: 'Compétences',
    icon: <Code size={18} />,
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: <Mail size={18} />,
  },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'dark' || attr === 'light') return attr;
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    return prefersLight ? 'light' : 'dark';
  });

  // Theme Sync effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Dynamic system preference change listener
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem('theme');
      if (!saved) {
        setTheme(e.matches ? 'light' : 'dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Multi-tab/window theme synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme' && (e.newValue === 'dark' || e.newValue === 'light')) {
        setTheme(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Scroll handler for navbar contraction
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger on mount in case the page is loaded scrolled
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section Observer effect for active navigation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // high density trigger range to prevent double trigger
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
      setActiveSection(id);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#hero" className="navbar-logo" onClick={(e) => handleNavClick(e, 'hero')}>
          <span>MC</span>
          <span className="logo-dot">.dev</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="navbar-desktop-nav" aria-label="Navigation principale">
          <ul className="navbar-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`navbar-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  {item.label}
                  <span className="navbar-link-indicator" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar-actions">
          {/* Theme Toggle Button (Desktop) */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label={`Activer le mode ${theme === 'dark' ? 'clair' : 'sombre'}`}
            title={`Passer en mode ${theme === 'dark' ? 'clair' : 'sombre'}`}
          >
            {theme === 'dark' ? (
              <Sun size={20} className="sun-icon" />
            ) : (
              <Moon size={20} className="moon-icon" />
            )}
          </button>

          {/* Hamburger Menu Button (Mobile) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="menu-burger-btn"
            aria-expanded={isMenuOpen}
            aria-label="Ouvrir le menu"
          >
            <Menu size={24} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`drawer-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Drawer Menu */}
      <div className={`drawer-menu ${isMenuOpen ? 'open' : ''}`} aria-hidden={!isMenuOpen}>
        <div className="drawer-header">
          <a href="#hero" className="navbar-logo" onClick={(e) => handleNavClick(e, 'hero')}>
            <span>MC</span>
            <span className="logo-dot">.dev</span>
          </a>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="drawer-close-btn"
            aria-label="Fermer le menu"
          >
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>

        <nav className="drawer-nav" aria-label="Navigation mobile">
          <ul className="drawer-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`drawer-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  <span className="drawer-link-icon">{item.icon}</span>
                  <span className="drawer-link-text">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="drawer-footer">
          <div className="drawer-theme-section">
            <span className="drawer-theme-label">Thème</span>
            <button
              onClick={toggleTheme}
              className="drawer-theme-toggle"
              aria-label={`Activer le mode ${theme === 'dark' ? 'clair' : 'sombre'}`}
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={18} className="drawer-theme-icon" />
                  Mode Clair
                </>
              ) : (
                <>
                  <Moon size={18} className="drawer-theme-icon" />
                  Mode Sombre
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
