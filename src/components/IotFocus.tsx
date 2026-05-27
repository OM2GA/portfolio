import { useState, useEffect } from 'react';
import { Cpu, Wifi, Layers, Activity, Code, Info, RefreshCw, Zap } from 'lucide-react';
import './IotFocus.css';

interface FlowStep {
  id: 'sensor' | 'esp32' | 'websocket' | 'dashboard';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  role: string;
  code: string;
  language: 'cpp' | 'javascript' | 'typescript';
  filename: string;
}

const flowSteps: FlowStep[] = [
  {
    id: 'sensor',
    title: 'Capteur Physique',
    subtitle: 'HC-SR04 (Ultrasons)',
    icon: <Activity size={20} />,
    description: "Mesure physique de la distance de l'obstacle en temps réel.",
    role: "Le capteur HC-SR04 émet des salves d'ultrasons (à 40 kHz) via son émetteur (Trig). Ces ondes se propagent dans l'air, rebondissent sur l'obstacle et reviennent vers le récepteur (Echo). Le microcontrôleur mesure le temps de trajet en microsecondes, puis applique l'équation de la vitesse du son pour calculer la distance physique exacte avec une précision millimétrique.",
    filename: 'Sensor_HCSR04.cpp',
    language: 'cpp',
    code: `// Mesure de la distance via le capteur HC-SR04
const int trigPin = 12; // Déclencheur (émetteur)
const int echoPin = 14; // Écho (récepteur)

float getDistance() {
  // 1. Génération d'une impulsion propre de 10µs
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // 2. Mesure de la durée de l'impulsion de retour (Echo)
  long duration = pulseIn(echoPin, HIGH);
  
  // 3. Calcul de la distance en cm
  // Vitesse du son = 340 m/s soit 0.034 cm/µs
  // Division par 2 car l'onde fait l'aller-retour
  float distance = duration * 0.034 / 2.0;
  
  // Filtrage des valeurs aberrantes (portée max 4m)
  if (distance > 400 || distance < 2) return -1;
  return distance;
}`,
  },
  {
    id: 'esp32',
    title: 'Microcontrôleur',
    subtitle: 'ESP32 (Wi-Fi/BLE)',
    icon: <Cpu size={20} />,
    description: 'Traitement local du signal et formatage des paquets.',
    role: "L'ESP32 est le cœur intelligent embarqué. Équipé d'un processeur dual-core cadencé à 240 MHz et d'une puce Wi-Fi intégrée, il récupère la distance brute lue par le capteur. Il effectue un filtrage par moyenne glissante pour gommer le bruit électronique, structure la donnée dans un objet JSON léger, puis l'encapsule pour la diffuser à intervalles réguliers (toutes les 50ms) via un tunnel WebSocket persistant.",
    filename: 'WebSocket_ESP32.ino',
    language: 'cpp',
    code: `#include <WiFi.h>
#include <ArduinoJson.h>
#include <WebSocketsClient.h>

WebSocketsClient webSocket;
const char* ssid = "BUT_MMI_IOT_NET";

void sendSensorData(float distance) {
  // Crée un document JSON optimisé en mémoire
  StaticJsonDocument<128> doc;
  doc["deviceId"] = "esp32_mmi_05";
  doc["distance"] = distance;
  doc["status"] = (distance < 30) ? "CRITICAL" : "OK";
  
  String jsonPayload;
  serializeJson(doc, jsonPayload);
  
  // Envoi asynchrone non-bloquant en temps réel
  webSocket.sendTXT(jsonPayload);
}`,
  },
  {
    id: 'websocket',
    title: 'Passerelle Temps Réel',
    subtitle: 'Serveur WebSockets (ws)',
    icon: <Layers size={20} />,
    description: 'Acheminement ultra-rapide sans latence HTTP.',
    role: "Contrairement à une API REST classique qui nécessite de réouvrir une connexion HTTP pour chaque mesure (très lourd et lent), le serveur WebSocket maintient un canal bidirectionnel ouvert en continu. Dès que le serveur Node.js reçoit un paquet de l'ESP32, il le redistribue (broadcast) instantanément en moins de 2 millisecondes à tous les navigateurs connectés au Dashboard, assurant une réactivité bluffante.",
    filename: 'server-ws.js',
    language: 'javascript',
    code: `// Serveur de messagerie temps réel (Node.js + library 'ws')
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Nouveau nœud connecté au réseau IoT');
  
  ws.on('message', (message) => {
    try {
      // Validation du paquet JSON
      const packet = JSON.parse(message);
      
      // Diffusion (Broadcast) immédiate à tous les clients web actifs
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(packet));
        }
      });
    } catch (err) {
      console.error('Paquet corrompu reçu:', err);
    }
  });
});`,
  },
  {
    id: 'dashboard',
    title: 'Interface Web',
    subtitle: 'Application React / CSS',
    icon: <Wifi size={20} />,
    description: 'Visualisation dynamique à 60 FPS.',
    role: "Côté navigateur, un composant React gère la connexion WebSocket persistante grâce à un hook d'effet. À chaque fois qu'un message transite sur le réseau, le state React est mis à jour. Cette réactivité déclenche un re-rendu fluide des jauges SVG et des éléments interactifs en CSS à 60 images par seconde, permettant au recruteur ou à l'utilisateur final de suivre les variations physiques instantanément.",
    filename: 'useIotSensor.ts',
    language: 'typescript',
    code: `import { useState, useEffect } from 'react';

export function useIotSensor(wsUrl: string) {
  const [distance, setDistance] = useState<number>(80);
  const [status, setStatus] = useState<string>('OK');

  useEffect(() => {
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (typeof data.distance === 'number') {
        setDistance(data.distance);
        setStatus(data.status || 'OK');
      }
    };

    ws.onerror = () => setStatus('CONNECTION_ERROR');
    
    // Fermeture propre de la connexion au démontage du composant
    return () => ws.close();
  }, [wsUrl]);

  return { distance, status };
}`,
  },
];

export default function IotFocus() {
  const [activeStep, setActiveStep] = useState<'sensor' | 'esp32' | 'websocket' | 'dashboard'>(
    'sensor'
  );
  const [simulatedDistance, setSimulatedDistance] = useState<number>(75); // Range 10 to 150 cm
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [direction, setDirection] = useState<'up' | 'down'>('up');

  // Autoplay physical slider simulation for a lively effect when not hovered
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setSimulatedDistance((prev) => {
        if (direction === 'up') {
          if (prev >= 140) {
            setDirection('down');
            return prev - 2;
          }
          return prev + 2;
        } else {
          if (prev <= 15) {
            setDirection('up');
            return prev + 2;
          }
          return prev - 2;
        }
      });
    }, 60);

    return () => clearInterval(interval);
  }, [isAutoPlaying, direction]);

  const activeStepData = flowSteps.find((s) => s.id === activeStep) || flowSteps[0];

  // Helper colors for dashboard warning states
  const getAlertColor = () => {
    if (simulatedDistance < 30) return '#ef4444'; // Red
    if (simulatedDistance < 70) return '#f59e0b'; // Amber
    return '#10b981'; // Mint / Emerald
  };

  // Convert distance to opacity or size for interactive visuals
  const alertColor = getAlertColor();
  const physicalPercent = ((simulatedDistance - 10) / 140) * 100;

  return (
    <div className="iot-focus-wrapper">
      <div className="iot-intro-text">
        <p className="iot-lead">
          En tant que développeur orienté <strong>Dispositifs Interactifs & IoT</strong>, j'adore
          connecter le monde tangible aux technologies web. Ce simulateur interactif modélise
          l'architecture temps réel que j'ai implémentée pour lier des capteurs physiques à un
          dashboard de monitoring.
        </p>
      </div>

      <div className="iot-bento-grid">
        {/* PANEL 1: THE INTERACTIVE SIMULATOR (MONDE PHYSIQUE & VISUEL) */}
        <div className="bento-card bento-simulator liquid-glass">
          <div className="card-header-badge">
            <Zap size={14} className="badge-pulse-icon" />
            <span>Simulateur Interactif Temps Réel</span>
          </div>

          {/* 1. Controller Area */}
          <div className="simulator-controls-bar">
            <div className="control-label-group">
              <span className="control-title">Distance de l'obstacle</span>
              <span className="control-val" style={{ color: alertColor }}>
                {simulatedDistance} cm
              </span>
            </div>

            <div className="slider-container">
              <input
                type="range"
                min="10"
                max="150"
                value={simulatedDistance}
                onChange={(e) => {
                  setSimulatedDistance(parseInt(e.target.value));
                  setIsAutoPlaying(false); // Stop autoplay on user interaction
                }}
                className="physical-slider"
                style={
                  {
                    '--slider-fill': `${physicalPercent}%`,
                    '--slider-accent': alertColor,
                  } as React.CSSProperties
                }
                aria-label="Ajuster la distance physique de l'obstacle"
              />
            </div>

            <button
              className={`autoplay-btn ${isAutoPlaying ? 'is-active' : ''}`}
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              title={
                isAutoPlaying
                  ? 'Arrêter la simulation automatique'
                  : 'Activer la simulation automatique'
              }
            >
              <RefreshCw size={14} className={isAutoPlaying ? 'spin-icon' : ''} />
              <span>{isAutoPlaying ? 'Autoplay ON' : 'Autoplay OFF'}</span>
            </button>
          </div>

          {/* 2. Physical World Sandbox */}
          <div className="physical-sandbox">
            <div className="sandbox-background-grid" />

            {/* The Ultrasonic Sensor (HC-SR04) */}
            <div
              className={`virtual-sensor ${activeStep === 'sensor' ? 'active' : ''}`}
              onClick={() => setActiveStep('sensor')}
            >
              <div className="sensor-eyes">
                <div className="sensor-eye transmitter">
                  <div className="eye-inner">TX</div>
                </div>
                <div className="sensor-eye receiver">
                  <div className="eye-inner">RX</div>
                </div>
              </div>
              <span className="sandbox-label">HC-SR04</span>
            </div>

            {/* Ultrasonic Waves */}
            <div
              className="ultrasonic-waves-wrapper"
              style={{ width: `calc(${physicalPercent}% - 60px)` }}
            >
              <div
                className="wave-line"
                style={{
                  animationDuration: `${Math.max(0.2, (simulatedDistance / 150) * 1.5)}s`,
                  borderColor: alertColor,
                }}
              />
              <div
                className="wave-line delay-1"
                style={{
                  animationDuration: `${Math.max(0.2, (simulatedDistance / 150) * 1.5)}s`,
                  borderColor: alertColor,
                }}
              />
              <div
                className="wave-line delay-2"
                style={{
                  animationDuration: `${Math.max(0.2, (simulatedDistance / 150) * 1.5)}s`,
                  borderColor: alertColor,
                }}
              />
            </div>

            {/* The Obstacle */}
            <div
              className="virtual-obstacle"
              style={{
                left: `calc(75px + ${physicalPercent * 0.75}%)`,
                borderColor: alertColor,
                boxShadow: `0 0 20px ${alertColor}22`,
              }}
            >
              <div className="obstacle-inner" style={{ backgroundColor: alertColor }} />
              <span className="obstacle-dist-label">{simulatedDistance}cm</span>
            </div>
          </div>

          {/* 3. The SVG Network Flow Architecture */}
          <div className="network-architecture">
            <svg viewBox="0 0 400 120" className="architecture-svg">
              <defs>
                <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--accent-primary)" />
                  <stop offset="50%" stopColor="var(--accent-secondary)" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>

                {/* Glow Filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Connecting Cables / Paths */}
              <path
                d="M 50 60 L 140 60"
                className={`cable-path ${activeStep === 'sensor' || activeStep === 'esp32' ? 'active' : ''}`}
              />
              <path
                d="M 140 60 L 250 60"
                className={`cable-path wifi-path ${activeStep === 'esp32' || activeStep === 'websocket' ? 'active' : ''}`}
                strokeDasharray="6, 6"
              />
              <path
                d="M 250 60 L 350 60"
                className={`cable-path ${activeStep === 'websocket' || activeStep === 'dashboard' ? 'active' : ''}`}
              />

              {/* Animated pulses of data running along paths */}
              <circle
                r="4"
                fill="var(--accent-secondary)"
                className="data-pulse pulse-cable-1"
                style={{ animationDuration: `${Math.max(0.4, (simulatedDistance / 150) * 1.2)}s` }}
              />
              <circle
                r="4"
                fill="#0ea5e9"
                className="data-pulse pulse-cable-2"
                style={{ animationDuration: `${Math.max(0.4, (simulatedDistance / 150) * 1.2)}s` }}
              />
              <circle
                r="4"
                fill="var(--accent-primary)"
                className="data-pulse pulse-cable-3"
                style={{ animationDuration: `${Math.max(0.4, (simulatedDistance / 150) * 1.2)}s` }}
              />

              {/* Node 1: Sensor */}
              <g
                className={`node-g ${activeStep === 'sensor' ? 'is-active' : ''}`}
                onClick={() => setActiveStep('sensor')}
              >
                <circle cx="50" cy="60" r="22" className="node-circle bg" />
                <circle cx="50" cy="60" r="18" className="node-circle border" />
                <foreignObject x="38" y="48" width="24" height="24">
                  <div className="node-icon-content">
                    <Activity size={15} />
                  </div>
                </foreignObject>
                <text x="50" y="95" className="node-label">
                  Capteur
                </text>
              </g>

              {/* Node 2: ESP32 */}
              <g
                className={`node-g ${activeStep === 'esp32' ? 'is-active' : ''}`}
                onClick={() => setActiveStep('esp32')}
              >
                <circle cx="140" cy="60" r="22" className="node-circle bg" />
                <circle cx="140" cy="60" r="18" className="node-circle border" />
                <foreignObject x="128" y="48" width="24" height="24">
                  <div className="node-icon-content">
                    <Cpu size={15} />
                  </div>
                </foreignObject>
                <text x="140" y="95" className="node-label">
                  ESP32
                </text>
              </g>

              {/* Node 3: WebSocket */}
              <g
                className={`node-g ${activeStep === 'websocket' ? 'is-active' : ''}`}
                onClick={() => setActiveStep('websocket')}
              >
                <circle cx="250" cy="60" r="22" className="node-circle bg" />
                <circle cx="250" cy="60" r="18" className="node-circle border" />
                <foreignObject x="238" y="48" width="24" height="24">
                  <div className="node-icon-content">
                    <Layers size={15} />
                  </div>
                </foreignObject>
                <text x="250" y="95" className="node-label">
                  WebSockets
                </text>
              </g>

              {/* Node 4: Web Dashboard */}
              <g
                className={`node-g ${activeStep === 'dashboard' ? 'is-active' : ''}`}
                onClick={() => setActiveStep('dashboard')}
              >
                <circle cx="350" cy="60" r="22" className="node-circle bg" />
                <circle cx="350" cy="60" r="18" className="node-circle border" />
                <foreignObject x="338" y="48" width="24" height="24">
                  <div className="node-icon-content">
                    <Wifi size={15} />
                  </div>
                </foreignObject>
                <text x="350" y="95" className="node-label">
                  Dashboard
                </text>
              </g>
            </svg>
          </div>

          {/* 4. Live Visual Gauge Render */}
          <div className="live-gauge-container">
            <div className="gauge-card">
              <span className="gauge-title">Dashboard Client</span>
              <div className="gauge-visual-body">
                <svg viewBox="0 0 100 100" className="radial-gauge-svg">
                  {/* Background Track */}
                  <path
                    d="M20,80 A40,40 0 1,1 80,80"
                    fill="none"
                    stroke="var(--bg-secondary)"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  {/* Dynamic Value Arc */}
                  <path
                    d="M20,80 A40,40 0 1,1 80,80"
                    fill="none"
                    stroke={alertColor}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="188.5"
                    strokeDashoffset={188.5 - (188.5 * simulatedDistance) / 150}
                    style={{ transition: 'stroke-dashoffset 0.1s ease, stroke 0.3s ease' }}
                  />

                  {/* Distance text inside gauge */}
                  <text
                    x="50"
                    y="55"
                    className="gauge-text-val"
                    style={{ fill: 'var(--text-primary)' }}
                  >
                    {simulatedDistance}
                  </text>
                  <text
                    x="50"
                    y="70"
                    className="gauge-text-unit"
                    style={{ fill: 'var(--text-secondary)' }}
                  >
                    cm
                  </text>
                </svg>

                <div className="gauge-text-details">
                  <div className="gauge-status-indicator" style={{ borderColor: alertColor }}>
                    <span className="status-dot" style={{ backgroundColor: alertColor }} />
                    <span className="status-label" style={{ color: alertColor }}>
                      {simulatedDistance < 30
                        ? 'TROP PROCHE'
                        : simulatedDistance < 70
                          ? 'MISE EN GARDE'
                          : 'SÉCURISÉ'}
                    </span>
                  </div>
                  <span className="latency-text">Latence: ~2.4ms (WS)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 2: THE TECH EXPLORER / CODE INSPECTOR */}
        <div className="bento-card bento-code-explorer liquid-glass">
          <div className="card-header-badge">
            <Code size={14} />
            <span>Inspecteur Technique de Flux</span>
          </div>

          {/* Stepper Selector */}
          <div
            className="iot-stepper"
            role="tablist"
            aria-label="Étapes de transmission de données"
          >
            {flowSteps.map((step) => (
              <button
                key={step.id}
                role="tab"
                aria-selected={activeStep === step.id}
                className={`step-selector-btn ${activeStep === step.id ? 'is-active' : ''}`}
                onClick={() => setActiveStep(step.id)}
              >
                <div className="step-btn-icon-box">{step.icon}</div>
                <div className="step-btn-text">
                  <span className="step-num">Étape {flowSteps.indexOf(step) + 1}</span>
                  <span className="step-title">{step.title}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Step Details & Explanation */}
          <div className="step-details-pane">
            <div className="step-info-bubble">
              <Info size={16} className="info-icon" />
              <div>
                <h4>
                  {activeStepData.title} <span className="step-sub">{activeStepData.subtitle}</span>
                </h4>
                <p>{activeStepData.role}</p>
              </div>
            </div>

            {/* Code Editor Window */}
            <div className="code-editor-mockup">
              <div className="editor-tab-bar">
                <div className="editor-file-info">
                  <Code size={12} className="file-icon" />
                  <span className="editor-filename">{activeStepData.filename}</span>
                </div>
                <div className="editor-lang-badge">{activeStepData.language.toUpperCase()}</div>
              </div>
              <div className="editor-code-body">
                <pre>
                  <code>{activeStepData.code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
