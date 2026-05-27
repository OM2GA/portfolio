import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { projects } from '../data/projects';
import './Terminal.css';

interface TerminalLine {
  type: 'input' | 'output';
  content: string | React.ReactNode;
  cmd?: string;
}

export default function Terminal() {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isTypingAuto, setIsTypingAuto] = useState(false);
  const [autoTypedText, setAutoTypedText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [matrixActive, setMatrixActive] = useState(false);
  const [matrixText, setMatrixText] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const matrixIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const initialCommand = 'npx maxence-coste';

  // Commands listing
  const availableCommands = [
    { name: 'help', desc: 'Affiche la liste des commandes disponibles' },
    { name: 'about', desc: 'Présente le profil de Maxence Coste' },
    { name: 'skills', desc: 'Liste les compétences techniques par catégorie' },
    { name: 'projects', desc: 'Affiche la liste des réalisations (SAÉ et perso)' },
    { name: 'clear', desc: 'Vide la console de son historique' },
    { name: 'matrix', desc: 'Active la pluie numérique Matrix en ASCII' },
    { name: 'cv', desc: 'Ouvre le CV PDF de Maxence Coste dans un nouvel onglet' },
    { name: 'contact', desc: 'Donne les coordonnées de contact direct' },
    { name: 'secret', desc: '???' },
  ];

  // Welcome banner ASCII & text
  const welcomeBanner = (
    <div className="terminal-welcome">
      <div className="terminal-banner">
{` __  __                                         
|  \\/  | __ ___  _____ _ __   ___ ___           
| |\\/| |/ _\` \\ \\/ / _ \\ '_ \\ / __/ _ \\          
| |  | | (_| |>  <  __/ | | | (_|  __/          
|_|  |_|\\__,_/_/\\_\\___|_| |_|\\___\\___|          `}
      </div>
      <p className="terminal-welcome-text">
        <span className="terminal-welcome-highlight">Bienvenue sur le terminal de Maxence Coste v1.0.0 !</span>
      </p>
      <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
        Taper <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>help</span> pour obtenir la liste des commandes et commencer l'exploration.
      </p>
    </div>
  );

  // Trigger terminal focusing on body click
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Auto scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, autoTypedText, matrixText, scrollToBottom]);

  // Execute a command
  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const commandName = trimmedCmd.split(' ')[0];

    let output: string | React.ReactNode = '';

    // Add command to command history list
    if (cmd.trim() !== '') {
      setCommandHistory((prev) => [...prev, cmd]);
    }
    setHistoryIndex(-1);

    switch (commandName) {
      case '':
        output = '';
        break;

      case 'help':
        output = (
          <div>
            <p className="cmd-accent cmd-bold" style={{ marginBottom: '8px' }}>
              Commandes disponibles :
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <tbody>
                {availableCommands.map((c) => (
                  <tr key={c.name} style={{ verticalAlign: 'top' }}>
                    <td style={{ width: '120px', color: 'var(--accent-secondary)', fontWeight: 'bold', paddingBottom: '6px' }}>
                      {c.name}
                    </td>
                    <td style={{ color: 'var(--text-secondary)', paddingBottom: '6px' }}>
                      {c.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        break;

      case 'about':
        output = (
          <div style={{ color: 'var(--text-secondary)' }}>
            <p>
              <span className="cmd-bold cmd-success">Maxence Coste</span> - Étudiant en{' '}
              <span className="cmd-bold">BUT MMI</span> (Métiers du Multimédia et de l'Internet) à Lyon.
            </p>
            <p style={{ marginTop: '8px' }}>
              Spécialisé dans le <span className="cmd-bold cmd-accent">Développement Web</span> et la création de{' '}
              <span className="cmd-bold cmd-accent">Dispositifs Interactifs & IoT</span>.
            </p>
            <p style={{ marginTop: '8px' }}>
              Passionné par les interactions homme-machine, je connecte des capteurs réels à des
              applications web en temps réel (Arduino, ESP32, WebSockets, React, TS).
            </p>
            <p style={{ marginTop: '8px', color: 'var(--text-primary)' }}>
              👉 Recherche activement une <span className="cmd-bold cmd-accent">alternance BUT3 d'un an</span> à partir de septembre 2026.
            </p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div>
            <p className="cmd-bold cmd-accent" style={{ marginBottom: '8px' }}>
              Compétences techniques :
            </p>
            <div className="terminal-grid">
              <div className="terminal-grid-item">
                <span className="cmd-bold" style={{ color: 'var(--accent-primary)' }}>1. FRONT-END</span>
                <ul style={{ paddingLeft: '16px', margin: '4px 0', color: 'var(--text-secondary)' }}>
                  <li>React / TypeScript</li>
                  <li>HTML5 / CSS3 (Bento, Flex)</li>
                  <li>Animations (Framer, GSAP)</li>
                </ul>
              </div>
              <div className="terminal-grid-item">
                <span className="cmd-bold" style={{ color: 'var(--accent-secondary)' }}>2. BACK-END</span>
                <ul style={{ paddingLeft: '16px', margin: '4px 0', color: 'var(--text-secondary)' }}>
                  <li>Node.js / Express</li>
                  <li>APIs REST & WebSockets</li>
                  <li>Bases de données SQL</li>
                </ul>
              </div>
              <div className="terminal-grid-item">
                <span className="cmd-bold" style={{ color: '#f59e0b' }}>3. DISPOSITIFS IOT</span>
                <ul style={{ paddingLeft: '16px', margin: '4px 0', color: 'var(--text-secondary)' }}>
                  <li>C++ (Arduino, ESP32)</li>
                  <li>Protocoles (MQTT, HTTP)</li>
                  <li>Intégration Capteurs</li>
                </ul>
              </div>
              <div className="terminal-grid-item">
                <span className="cmd-bold" style={{ color: '#ef4444' }}>4. AUTRES</span>
                <ul style={{ paddingLeft: '16px', margin: '4px 0', color: 'var(--text-secondary)' }}>
                  <li>Git / GitHub / Agile</li>
                  <li>UI Design (Figma, Maquettes)</li>
                  <li>Accessibilité (RGAA AA)</li>
                </ul>
              </div>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div>
            <p className="cmd-bold cmd-accent" style={{ marginBottom: '8px' }}>
              Sélection de Projets :
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {projects.map((p, idx) => (
                <div key={p.id} style={{ borderLeft: '3px solid var(--accent-primary)', paddingLeft: '10px' }}>
                  <p className="cmd-bold" style={{ color: 'var(--text-primary)' }}>
                    {idx + 1}. {p.title}{' '}
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({p.category})</span>
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: '2px 0' }}>
                    {p.rhPath?.context.substring(0, 100)}...
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)' }}>
                    Stack : {p.stack.join(', ')}
                  </p>
                </div>
              ))}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '10px' }}>
              Défilez sur la page pour voir ces projets en détail dans la section "Mes Projets" !
            </p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'matrix':
        setMatrixActive(true);
        output = 'Connexion établie avec la Matrice... Activation du flux numérique...';
        break;

      case 'cv':
        output = (
          <span style={{ color: 'var(--accent-secondary)' }}>
            Téléchargement lancé ! Le CV s'ouvre dans un nouvel onglet...{' '}
            <a
              href="/CV_Maxence_Coste.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="cmd-bold"
              style={{ textDecoration: 'underline', color: 'var(--accent-primary)' }}
            >
              Cliquez ici si l'onglet ne s'ouvre pas automatiquement.
            </a>
          </span>
        );
        setTimeout(() => {
          window.open('/CV_Maxence_Coste.pdf', '_blank');
        }, 1000);
        break;

      case 'contact':
        output = (
          <div style={{ color: 'var(--text-secondary)' }}>
            <p className="cmd-bold cmd-accent" style={{ marginBottom: '8px' }}>
              Coordonnées de Maxence Coste :
            </p>
            <ul style={{ paddingLeft: '16px', margin: '4px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li>
                <span className="cmd-bold">Email :</span>{' '}
                <a href="mailto:maxence.coste@example.com" style={{ color: 'var(--accent-secondary)', textDecoration: 'underline' }}>
                  maxence.coste@example.com
                </a>
              </li>
              <li>
                <span className="cmd-bold">Région :</span> Lyon / Rhône-Alpes (Disponible pour mobilité)
              </li>
              <li>
                <span className="cmd-bold">LinkedIn :</span>{' '}
                <span style={{ color: 'var(--text-muted)' }}>linkedin.com/in/maxence-coste</span>
              </li>
              <li>
                <span className="cmd-bold">GitHub :</span>{' '}
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-secondary)', textDecoration: 'underline' }}>
                  github.com/maxence-coste
                </a>
              </li>
            </ul>
            <p style={{ marginTop: '8px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              Vous pouvez également utiliser le formulaire de contact interactif au bas de cette page !
            </p>
          </div>
        );
        break;

      case 'secret':
        output = (
          <div style={{ textAlign: 'center', padding: '10px 0', border: '1px dashed var(--accent-secondary)', borderRadius: '8px' }}>
            <p style={{ fontSize: '2rem', margin: '0' }}>🍪</p>
            <p className="cmd-bold cmd-success" style={{ marginTop: '4px' }}>
              EASTER EGG DEBLOQUÉ !
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
              Félicitations recruteur ! Voici un cookie virtuel pour récompenser votre curiosité.
            </p>
          </div>
        );
        break;

      default:
        output = (
          <span className="cmd-error">
            Command not found: <span style={{ fontWeight: 'bold' }}>{commandName}</span>. Taper <span className="cmd-bold" style={{ color: 'var(--text-primary)' }}>help</span> pour voir les commandes valides.
          </span>
        );
    }

    setHistory((prev) => [
      ...prev,
      { type: 'input', content: cmd, cmd: commandName },
      { type: 'output', content: output, cmd: commandName },
    ]);
  }, [availableCommands]);

  // Matrix Digital Rain effect simulation
  useEffect(() => {
    if (matrixActive) {
      let counter = 0;
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$+-*/=<>[]{}%#@&';
      const maxRows = 8;
      const cols = 45;

      const runMatrix = () => {
        let text = '';
        for (let r = 0; r < maxRows; r++) {
          let line = '';
          for (let c = 0; c < cols; c++) {
            // Randomly decide to put a space or a character
            if (Math.random() > 0.8) {
              line += chars[Math.floor(Math.random() * chars.length)];
            } else if (Math.random() > 0.85) {
              line += ' ';
            } else {
              line += Math.random() > 0.5 ? '0' : '1';
            }
          }
          text += line + '\n';
        }
        setMatrixText(text);

        counter++;
        if (counter >= 40) {
          // End animation after ~8 seconds
          setMatrixActive(false);
          setMatrixText('');
          if (matrixIntervalRef.current) {
            clearInterval(matrixIntervalRef.current);
            matrixIntervalRef.current = null;
          }
          setHistory((prev) => [
            ...prev,
            { type: 'output', content: <span style={{ color: 'var(--accent-secondary)' }}>Connexion Matrix fermée. Retour au terminal.</span> },
          ]);
        }
      };

      matrixIntervalRef.current = setInterval(runMatrix, 180);
    }

    return () => {
      if (matrixIntervalRef.current) {
        clearInterval(matrixIntervalRef.current);
      }
    };
  }, [matrixActive]);

  // Autoplay Typing effect for introductory command
  const startAutoplay = useCallback(() => {
    if (isTypingAuto || hasStarted) return;
    setIsTypingAuto(true);

    let currentIndex = 0;
    const type = () => {
      if (currentIndex < initialCommand.length) {
        setAutoTypedText((prev) => prev + initialCommand.charAt(currentIndex));
        currentIndex++;
        setTimeout(type, 80); // typing speed
      } else {
        // Autoplay completed: trigger execution
        setTimeout(() => {
          setIsTypingAuto(false);
          setHasStarted(true);
          setAutoTypedText('');
          // Inject welcome banner and first executed command into history
          setHistory([
            { type: 'input', content: initialCommand },
            { type: 'output', content: welcomeBanner },
          ]);
        }, 300);
      }
    };

    setTimeout(type, 500); // Small initial pause before typing starts
  }, [isTypingAuto, hasStarted, welcomeBanner]);

  // Intersection Observer to trigger autoplay
  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAutoplay();
            observer.disconnect(); // Only trigger once
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [startAutoplay]);

  // Handle keys (Enter, ArrowUp, ArrowDown, Tab)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = inputVal;
      setInputVal('');
      executeCommand(cmd);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple Autocomplete
      if (inputVal.trim() === '') return;
      const match = availableCommands.find((c) => c.name.startsWith(inputVal.trim().toLowerCase()));
      if (match) {
        setInputVal(match.name);
      }
    }
  };

  return (
    <div className="terminal-container" ref={containerRef} id="cli-terminal">
      <div className={`terminal-window ${isFocused ? 'is-focused' : ''}`}>
        {/* En-tête OS Style */}
        <div className="terminal-header" onClick={focusInput}>
          <div className="terminal-buttons">
            <span className="terminal-btn close" />
            <span className="terminal-btn minimize" />
            <span className="terminal-btn maximize" />
          </div>
          <span className="terminal-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <TerminalIcon size={14} style={{ color: 'var(--accent-secondary)' }} />
            <span>guest@maxence-coste: ~</span>
          </span>
          <div className="terminal-status" />
        </div>

        {/* Viewport de la console */}
        <div className="terminal-body" ref={bodyRef} onClick={focusInput}>
          {/* Autoplay Initial Input */}
          {!hasStarted && (
            <div className="terminal-input-row">
              <span className="terminal-prompt-prefix">
                <span className="terminal-prompt-user">guest@maxence-coste</span>
                <span className="terminal-prompt-char">:~$</span>
              </span>
              <span className="terminal-prompt-cmd">{autoTypedText}</span>
              {isTypingAuto && <span className="terminal-cursor" />}
            </div>
          )}

          {/* History */}
          {hasStarted &&
            history.map((line, index) => (
              <div key={index} className="terminal-line">
                {line.type === 'input' ? (
                  <div className="terminal-line-input">
                    <span className="terminal-prompt-prefix">
                      <span className="terminal-prompt-user">guest@maxence-coste</span>
                      <span className="terminal-prompt-char">:~$</span>
                    </span>
                    <span className="terminal-prompt-cmd">{line.content}</span>
                  </div>
                ) : (
                  <div className="terminal-line-output">{line.content}</div>
                )}
              </div>
            ))}

          {/* Matrix rain animation screen */}
          {matrixActive && matrixText && (
            <div className="matrix-container">{matrixText}</div>
          )}

          {/* Live input prompt row */}
          {hasStarted && !matrixActive && (
            <div className="terminal-input-row" style={{ marginTop: '8px' }}>
              <span className="terminal-prompt-prefix">
                <span className="terminal-prompt-user">guest@maxence-coste</span>
                <span className="terminal-prompt-char">:~$</span>
              </span>
              <span className="terminal-prompt-cmd" style={{ color: 'var(--text-primary)' }}>
                {inputVal}
              </span>
              <span className="terminal-cursor" />

              {/* Hidden text input */}
              <input
                ref={inputRef}
                type="text"
                className="terminal-hidden-input"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Terminal Input"
              />
            </div>
          )}
        </div>
      </div>

      {/* Decorative prompt note under terminal */}
      <div
        style={{
          marginTop: '10px',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <Sparkles size={14} style={{ color: 'var(--accent-secondary)' }} />
        <span>Astuce : Le terminal supporte l'historique (↑/↓) et l'auto-complétion (Tab) !</span>
      </div>
    </div>
  );
}
