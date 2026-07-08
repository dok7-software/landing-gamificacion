'use client';

import type { DynamicId } from '../types';

interface DynamicPreviewProps {
  id: DynamicId;
  accent: string;
}

export function DynamicPreview({ id, accent }: DynamicPreviewProps) {
  switch (id) {
    case 'pasaporte-qr':
      return <PasaportePreview accent={accent} />;
    case 'misiones':
      return <MisionesPreview accent={accent} />;
    case 'ranking':
      return <RankingPreview accent={accent} />;
    case 'trivia':
      return <TriviaPreview accent={accent} />;
    case 'ruleta':
      return <RuletaPreview accent={accent} />;
    case 'rasca-gana':
      return <RascaPreview accent={accent} />;
    case 'memoria':
      return <MemoriaPreview accent={accent} />;
    case 'calendario':
      return <CalendarioPreview accent={accent} />;
    default:
      return null;
  }
}

function PasaportePreview({ accent }: { accent: string }) {
  return (
    <div className="dok7-dyn-preview dok7-dyn-preview--pasaporte">
      <div className="dok7-dyn-phone">
        <div className="dok7-dyn-phone-notch" />
        <div className="dok7-dyn-passport">
          <span className="dok7-dyn-passport-title">PASAPORTE</span>
          <div className="dok7-dyn-stamps">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className={`dok7-dyn-stamp ${n <= 3 ? 'dok7-dyn-stamp--filled' : ''}`} style={{ '--stamp-color': accent } as React.CSSProperties}>
                {n <= 3 ? '✓' : ''}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="dok7-dyn-qr-scan" style={{ borderColor: accent }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="3" height="3" />
          <path d="M21 14v7h-7" />
        </svg>
      </div>
    </div>
  );
}

function MisionesPreview({ accent }: { accent: string }) {
  return (
    <div className="dok7-dyn-preview dok7-dyn-preview--misiones">
      {[
        { label: 'Visita stand A', pct: 100 },
        { label: 'Completa trivia', pct: 65 },
        { label: 'Foto en zona VIP', pct: 20 },
      ].map((m) => (
        <div key={m.label} className="dok7-dyn-mission">
          <div className="dok7-dyn-mission-head">
            <span>{m.label}</span>
            <span style={{ color: accent }}>{m.pct}%</span>
          </div>
          <div className="dok7-dyn-mission-bar">
            <div className="dok7-dyn-mission-fill" style={{ width: `${m.pct}%`, background: accent }} />
          </div>
        </div>
      ))}
      <div className="dok7-dyn-mission-badge" style={{ background: `${accent}22`, color: accent }}>
        +250 pts
      </div>
    </div>
  );
}

function RankingPreview({ accent }: { accent: string }) {
  const rows = [
    { pos: 1, name: 'Laura M.', pts: 1250, medal: '🥇' },
    { pos: 2, name: 'Equipo Alpha', pts: 980, medal: '🥈' },
    { pos: 3, name: 'Jorge R.', pts: 870, medal: '🥉' },
  ];
  return (
    <div className="dok7-dyn-preview dok7-dyn-preview--ranking">
      {rows.map((r, i) => (
        <div key={r.pos} className="dok7-dyn-rank-row" style={{ animationDelay: `${i * 0.15}s` }}>
          <span className="dok7-dyn-rank-medal">{r.medal}</span>
          <span className="dok7-dyn-rank-name">{r.name}</span>
          <span className="dok7-dyn-rank-pts" style={{ color: accent }}>{r.pts}</span>
        </div>
      ))}
      <div className="dok7-dyn-live-pill">
        <span className="dok7-dyn-live-dot" /> EN VIVO
      </div>
    </div>
  );
}

function TriviaPreview({ accent }: { accent: string }) {
  return (
    <div className="dok7-dyn-preview dok7-dyn-preview--trivia">
      <p className="dok7-dyn-trivia-q">¿Cuál es el slogan de la marca?</p>
      <div className="dok7-dyn-trivia-options">
        {['Opción A', 'Opción B', 'Opción C'].map((opt, i) => (
          <div key={opt} className={`dok7-dyn-trivia-opt ${i === 1 ? 'dok7-dyn-trivia-opt--active' : ''}`} style={i === 1 ? { borderColor: accent, background: `${accent}18` } : undefined}>
            {opt}
          </div>
        ))}
      </div>
      <div className="dok7-dyn-trivia-timer">
        <div className="dok7-dyn-trivia-timer-fill" style={{ background: accent }} />
      </div>
    </div>
  );
}

function RuletaPreview({ accent }: { accent: string }) {
  return (
    <div className="dok7-dyn-preview dok7-dyn-preview--ruleta">
      <div className="dok7-dyn-wheel dok7-dyn-wheel--spin">
        {['🎁', '⭐', '🎯', '💎', '🏆', '🎉'].map((emoji, i) => (
          <span
            key={i}
            className="dok7-dyn-wheel-segment"
            style={{ transform: `rotate(${i * 60}deg) translateY(calc(-1 * var(--wheel-segment-radius)))` }}
          >
            {emoji}
          </span>
        ))}
      </div>
      <div className="dok7-dyn-wheel-pointer" style={{ borderTopColor: accent }} />
    </div>
  );
}

function RascaPreview({ accent }: { accent: string }) {
  return (
    <div className="dok7-dyn-preview dok7-dyn-preview--rasca">
      <div className="dok7-dyn-scratch-card">
        <div className="dok7-dyn-scratch-prize" style={{ color: accent }}>20% OFF</div>
        <div className="dok7-dyn-scratch-overlay dok7-dyn-scratch-overlay--animate">
          <span>RASCA AQUÍ</span>
        </div>
      </div>
    </div>
  );
}

function MemoriaPreview({ accent }: { accent: string }) {
  return (
    <div className="dok7-dyn-preview dok7-dyn-preview--memoria">
      <div className="dok7-dyn-memory-board">
        <div className="dok7-dyn-memory-tile dok7-dyn-memory-tile--face-down" style={{ '--tile-accent': accent } as React.CSSProperties}>
          <span>?</span>
        </div>
        <div className="dok7-dyn-memory-tile dok7-dyn-memory-tile--face-down dok7-dyn-memory-tile--flip" style={{ '--tile-accent': accent } as React.CSSProperties}>
          <span className="dok7-dyn-memory-tile-back">?</span>
          <span className="dok7-dyn-memory-tile-front">🎯</span>
        </div>
        <div className="dok7-dyn-memory-tile dok7-dyn-memory-tile--matched" style={{ '--tile-accent': accent } as React.CSSProperties}>
          <span>🎮</span>
        </div>
        <div className="dok7-dyn-memory-tile dok7-dyn-memory-tile--matched" style={{ '--tile-accent': accent } as React.CSSProperties}>
          <span>🎮</span>
        </div>
      </div>
      <span className="dok7-dyn-memory-hint" style={{ color: accent }}>Encuentra los pares</span>
    </div>
  );
}

function CalendarioPreview({ accent }: { accent: string }) {
  const days = Array.from({ length: 12 }, (_, i) => i + 1);
  return (
    <div className="dok7-dyn-preview dok7-dyn-preview--calendario">
      <div className="dok7-dyn-cal-grid">
        {days.map((d) => (
          <div
            key={d}
            className={`dok7-dyn-cal-day ${d === 7 ? 'dok7-dyn-cal-day--today' : ''} ${d < 7 ? 'dok7-dyn-cal-day--opened' : ''}`}
            style={d === 7 ? { borderColor: accent, boxShadow: `0 0 12px ${accent}55` } : undefined}
          >
            {d < 7 ? '🎁' : d}
          </div>
        ))}
      </div>
    </div>
  );
}
