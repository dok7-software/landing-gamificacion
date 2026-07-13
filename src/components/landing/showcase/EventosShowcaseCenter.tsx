'use client';

import { useEffect, useState } from 'react';
import { rastrearInteraccionDemo } from '@/lib/analytics/gtm';

const SCENES = [
  { id: 'pasaporte', label: 'Pasaporte' },
  { id: 'mision', label: 'Misión' },
  { id: 'trivia', label: 'Trivia' },
] as const;

type SceneId = (typeof SCENES)[number]['id'];

interface EventosShowcaseCenterProps {
  yourPoints: number;
  onEarnPoints: (points: number) => void;
}

export function EventosShowcaseCenter({ yourPoints, onEarnPoints }: EventosShowcaseCenterProps) {
  const [scene, setScene] = useState<SceneId>('pasaporte');
  const [stamps, setStamps] = useState(3);
  const [scanning, setScanning] = useState(false);
  const [missionProgress, setMissionProgress] = useState(3);
  const [triviaAnswered, setTriviaAnswered] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setScene((s) => {
        const idx = SCENES.findIndex((x) => x.id === s);
        return SCENES[(idx + 1) % SCENES.length].id;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scanQr = () => {
    if (scanning || stamps >= 6) return;
    rastrearInteraccionDemo('eventos', 'escanear_qr', 'pasaporte');
    setScanning(true);
    setToast(null);
    setTimeout(() => {
      setStamps((n) => n + 1);
      setScanning(false);
      setToast('¡Sello añadido! +50 pts');
      onEarnPoints(50);
    }, 1000);
  };

  const advanceMission = () => {
    if (missionProgress >= 5) return;
    const next = missionProgress + 1;
    const points = next >= 5 ? 120 : 24;
    rastrearInteraccionDemo('eventos', next >= 5 ? 'mision_completada' : 'avanzar_mision', 'mision');
    setMissionProgress(next);
    setToast(next >= 5 ? '¡Misión completada! +120 pts' : `Stand ${next} visitado (+24 pts)`);
    onEarnPoints(points);
  };

  const answerTrivia = (correct: boolean) => {
    if (triviaAnswered) return;
    const points = correct ? 80 : 20;
    rastrearInteraccionDemo('eventos', correct ? 'trivia_correcta' : 'trivia_incorrecta', 'trivia');
    setTriviaAnswered(true);
    setToast(correct ? '¡Correcto! +80 pts' : '¡Casi! +20 pts por participar');
    onEarnPoints(points);
    setTimeout(() => setTriviaAnswered(false), 2500);
  };

  return (
    <div className={`dok7-showcase-eventos dok7-showcase-eventos--${scene}`}>
      <div className="dok7-showcase-event-ambience" aria-hidden="true">
        <span className="dok7-showcase-event-ambience__blob dok7-showcase-event-ambience__blob--1" />
        <span className="dok7-showcase-event-ambience__blob dok7-showcase-event-ambience__blob--2" />
        <span className="dok7-showcase-event-ambience__blob dok7-showcase-event-ambience__blob--3" />
        <span className="dok7-showcase-event-ambience__beam" />
        <span className="dok7-showcase-event-ambience__crowd" />
        <span className="dok7-showcase-event-ambience__floor" />
      </div>

      <div className="dok7-showcase-eventos-content">
      <div className="dok7-showcase-pills">
        <div className="dok7-showcase-pill dok7-showcase-pill--active">
          <span className="dok7-showcase-pill-label">Escena</span>
          <span className="dok7-showcase-pill-value">{SCENES.find((s) => s.id === scene)?.label}</span>
        </div>
        <div className="dok7-showcase-pill">
          <span className="dok7-showcase-pill-label">Puntos</span>
          <span className="dok7-showcase-pill-value" style={{ color: '#7c5cfc' }}>
            {yourPoints}
          </span>
        </div>
        <div className="dok7-showcase-pill dok7-showcase-pill--live">
          <span className="dok7-dyn-live-dot" /> En vivo
        </div>
      </div>

      <div className="dok7-showcase-eventos-stage">
      <div className="dok7-iphone">
        <div className="dok7-iphone-frame">
          <div className="dok7-iphone-btn dok7-iphone-btn--silent" aria-hidden="true" />
          <div className="dok7-iphone-btn dok7-iphone-btn--vol-up" aria-hidden="true" />
          <div className="dok7-iphone-btn dok7-iphone-btn--vol-down" aria-hidden="true" />
          <div className="dok7-iphone-btn dok7-iphone-btn--power" aria-hidden="true" />

          <div className="dok7-iphone-screen">
            <div className="dok7-iphone-statusbar">
              <span className="dok7-iphone-time">9:41</span>
              <div className="dok7-iphone-island" />
              <div className="dok7-iphone-status-icons" aria-hidden="true">
                <svg width="16" height="10" viewBox="0 0 16 10" fill="white"><rect x="0" y="6" width="3" height="4" rx="0.5" opacity="0.4"/><rect x="4" y="4" width="3" height="6" rx="0.5" opacity="0.6"/><rect x="8" y="2" width="3" height="8" rx="0.5" opacity="0.8"/><rect x="12" y="0" width="3" height="10" rx="0.5"/></svg>
                <svg width="14" height="10" viewBox="0 0 14 10" fill="white"><path d="M7 2C5.3 2 3.8 2.6 2.6 3.6L1.2 2.2C2.8 0.8 4.8 0 7 0s4.2 0.8 5.8 2.2L11.4 3.6C10.2 2.6 8.7 2 7 2zm0 3c-1.1 0-2.1 0.4-2.8 1.1L3.1 4C4.1 3 5.5 2.5 7 2.5s2.9 0.5 3.9 1.5L9.8 6.1C9.1 5.4 8.1 5 7 5zm0 3c-0.6 0-1.1 0.2-1.5 0.6L7 8.5l1.5-1.5C8.1 6.6 7.6 6.5 7 6.5z"/></svg>
                <svg width="22" height="10" viewBox="0 0 22 10" fill="none"><rect x="0.5" y="0.5" width="18" height="9" rx="2" stroke="white" strokeOpacity="0.35"/><rect x="2" y="2" width="13" height="6" rx="1" fill="white"/><path d="M20 4v2a1 1 0 0 0 0-2z" fill="white" opacity="0.4"/></svg>
              </div>
            </div>

            <div className="dok7-showcase-phone-app">
              <div className="dok7-showcase-phone-header">
                <span>DOK7 Event</span>
              </div>

              <div className="dok7-showcase-phone-scenes" role="tablist">
                {SCENES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={scene === s.id}
                    className={`dok7-showcase-scene-tab ${scene === s.id ? 'dok7-showcase-scene-tab--active' : ''}`}
                    onClick={() => {
                      if (scene !== s.id) {
                        rastrearInteraccionDemo('eventos', 'cambiar_escena', s.id);
                      }
                      setScene(s.id);
                      setToast(null);
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <div className={`dok7-showcase-phone-body dok7-showcase-phone-body--${scene}`}>
                <div className="dok7-showcase-phone-ambience" aria-hidden="true">
                  <span className="dok7-showcase-phone-ambience__wash" />
                  <span className="dok7-showcase-phone-ambience__bokeh dok7-showcase-phone-ambience__bokeh--1" />
                  <span className="dok7-showcase-phone-ambience__bokeh dok7-showcase-phone-ambience__bokeh--2" />
                  <span className="dok7-showcase-phone-ambience__bokeh dok7-showcase-phone-ambience__bokeh--3" />
                </div>
          {scene === 'pasaporte' && (
            <div className="dok7-showcase-scene dok7-showcase-scene--pasaporte">
              <p className="dok7-showcase-scene-title">Tu pasaporte</p>
              <div className="dok7-showcase-stamps">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className={`dok7-showcase-stamp ${i < stamps ? 'dok7-showcase-stamp--done' : ''}`}>
                    {i < stamps ? '✓' : ''}
                  </div>
                ))}
              </div>
              <button type="button" className="dok7-showcase-action" onClick={scanQr} disabled={scanning || stamps >= 6}>
                {scanning ? 'Escaneando...' : stamps >= 6 ? 'Completado ✓' : 'Escanear QR del stand'}
              </button>
              <div className={`dok7-showcase-qr-frame ${scanning ? 'dok7-showcase-qr-frame--scan' : ''}`}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#7c5cfc" strokeWidth="1.5" aria-hidden="true">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <path d="M21 14v7h-7M14 14h3v3" />
                </svg>
              </div>
            </div>
          )}

          {scene === 'mision' && (
            <div className="dok7-showcase-scene dok7-showcase-scene--mision">
              <p className="dok7-showcase-scene-title">Misión activa</p>
              <p className="dok7-showcase-mission-name">Visita 5 stands del evento</p>
              <div className="dok7-showcase-mission-bar">
                <div className="dok7-showcase-mission-fill" style={{ width: `${(missionProgress / 5) * 100}%` }} />
              </div>
              <p className="dok7-showcase-mission-count">{missionProgress}/5 stands</p>
              <div className="dok7-showcase-stands">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className={`dok7-showcase-stand ${i < missionProgress ? 'dok7-showcase-stand--done' : ''}`}>
                    {i < missionProgress ? '✓' : i + 1}
                  </div>
                ))}
              </div>
              <button type="button" className="dok7-showcase-action" onClick={advanceMission} disabled={missionProgress >= 5}>
                {missionProgress >= 5 ? 'Misión completada' : 'Registrar visita'}
              </button>
            </div>
          )}

          {scene === 'trivia' && (
            <div className="dok7-showcase-scene dok7-showcase-scene--trivia">
              <p className="dok7-showcase-scene-title">Trivia del evento</p>
              <p className="dok7-showcase-trivia-q">¿Cuál es el producto estrella de la marca?</p>
              <div className="dok7-showcase-trivia-opts">
                {['App móvil', 'Plataforma web', 'Consultoría'].map((opt, i) => (
                  <button key={opt} type="button" className="dok7-showcase-trivia-opt" onClick={() => answerTrivia(i === 1)} disabled={triviaAnswered}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {toast && <div className="dok7-showcase-toast">{toast}</div>}
            </div>

            <div className="dok7-iphone-home-bar" aria-hidden="true" />
          </div>
        </div>
      </div>
      </div>

      <p className="dok7-showcase-hint">Haz clic en las escenas o interactúa con el móvil</p>
      </div>
    </div>
  );
}
