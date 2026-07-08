'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { DynamicId } from '../types';
import { ScratchCard } from './ScratchCard';

interface DynamicDemoProps {
  id: DynamicId;
  accent: string;
}

export function DynamicDemo({ id, accent }: DynamicDemoProps) {
  switch (id) {
    case 'pasaporte-qr':
      return <PasaporteDemo accent={accent} />;
    case 'misiones':
      return <MisionesDemo accent={accent} />;
    case 'ranking':
      return <RankingDemo accent={accent} />;
    case 'trivia':
      return <TriviaDemo accent={accent} />;
    case 'ruleta':
      return <RuletaDemo accent={accent} />;
    case 'rasca-gana':
      return <RascaDemo accent={accent} />;
    case 'memoria':
      return <MemoriaDemo accent={accent} />;
    case 'calendario':
      return <CalendarioDemo accent={accent} />;
    default:
      return null;
  }
}

function PasaporteDemo({ accent }: { accent: string }) {
  const [stamps, setStamps] = useState(2);
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const scan = () => {
    if (stamps >= 6 || scanning) return;
    setScanning(true);
    setMessage(null);
    setTimeout(() => {
      setStamps((s) => s + 1);
      setScanning(false);
      if (stamps + 1 >= 6) setMessage('¡Pasaporte completo! Recompensa desbloqueada 🎉');
      else setMessage('¡Sello añadido!');
    }, 1200);
  };

  return (
    <div className="dok7-demo dok7-demo--pasaporte">
      <div className="dok7-demo-passport-card">
        <h4>Tu pasaporte digital</h4>
        <div className="dok7-demo-stamps-grid">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className={`dok7-demo-stamp ${i < stamps ? 'dok7-demo-stamp--done' : ''}`} style={{ '--c': accent } as React.CSSProperties}>
              {i < stamps ? '✓' : i + 1}
            </div>
          ))}
        </div>
        <p className="dok7-demo-progress">{stamps}/6 sellos</p>
      </div>
      <button type="button" className="dok7-demo-btn" style={{ background: accent }} onClick={scan} disabled={scanning || stamps >= 6}>
        {scanning ? 'Escaneando QR...' : stamps >= 6 ? 'Completado' : 'Escanear QR del stand'}
      </button>
      {message && <p className="dok7-demo-toast">{message}</p>}
    </div>
  );
}

function MisionesDemo({ accent }: { accent: string }) {
  const [missions, setMissions] = useState([
    { id: 1, label: 'Visita el stand principal', done: true, pts: 100 },
    { id: 2, label: 'Responde la trivia del evento', done: false, pts: 150 },
    { id: 3, label: 'Comparte en redes sociales', done: false, pts: 200 },
  ]);

  const complete = (id: number) => {
    setMissions((m) => m.map((x) => (x.id === id ? { ...x, done: true } : x)));
  };

  const total = missions.filter((m) => m.done).reduce((a, m) => a + m.pts, 0);

  return (
    <div className="dok7-demo dok7-demo--misiones">
      <div className="dok7-demo-points-badge" style={{ background: `${accent}22`, color: accent }}>
        {total} pts acumulados
      </div>
      {missions.map((m) => (
        <div key={m.id} className={`dok7-demo-mission-item ${m.done ? 'dok7-demo-mission-item--done' : ''}`}>
          <div>
            <strong>{m.label}</strong>
            <span style={{ color: accent }}>+{m.pts} pts</span>
          </div>
          {!m.done ? (
            <button type="button" className="dok7-demo-btn dok7-demo-btn--sm" style={{ background: accent }} onClick={() => complete(m.id)}>
              Completar
            </button>
          ) : (
            <span className="dok7-demo-check">✓</span>
          )}
        </div>
      ))}
    </div>
  );
}

function RankingDemo({ accent }: { accent: string }) {
  const initial = [
    { name: 'Laura M.', pts: 1250 },
    { name: 'Equipo Alpha', pts: 980 },
    { name: 'Jorge R.', pts: 870 },
    { name: 'Tú', pts: 720, isYou: true },
  ];
  const [players, setPlayers] = useState(initial);
  const [boosted, setBoosted] = useState(false);

  const addPoints = () => {
    setPlayers((p) =>
      p
        .map((x) => (x.isYou ? { ...x, pts: x.pts + 200 } : x))
        .sort((a, b) => b.pts - a.pts)
    );
    setBoosted(true);
    setTimeout(() => setBoosted(false), 800);
  };

  const medals = ['🥇', '🥈', '🥉', '4º'];

  return (
    <div className="dok7-demo dok7-demo--ranking">
      <div className="dok7-demo-live-header">
        <span className="dok7-dyn-live-dot" /> Ranking en tiempo real
      </div>
      {players.map((p, i) => (
        <div key={p.name} className={`dok7-demo-rank-row ${p.isYou ? 'dok7-demo-rank-row--you' : ''} ${p.isYou && boosted ? 'dok7-demo-rank-row--boost' : ''}`}>
          <span>{medals[i]}</span>
          <span>{p.name}</span>
          <span style={{ color: accent }}>{p.pts} pts</span>
        </div>
      ))}
      <button type="button" className="dok7-demo-btn" style={{ background: accent }} onClick={addPoints}>
        Sumar +200 pts (simular acción)
      </button>
    </div>
  );
}

const TRIVIA_QUESTIONS = [
  { q: '¿En qué año se fundó la empresa?', options: ['2010', '2015', '2018', '2020'], correct: 2 },
  { q: '¿Cuál es nuestro producto estrella?', options: ['App móvil', 'Plataforma web', 'API', 'Hardware'], correct: 1 },
];

function TriviaDemo({ accent }: { accent: string }) {
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);

  const q = TRIVIA_QUESTIONS[qIndex];

  useEffect(() => {
    if (selected !== null) return;
    const t = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [qIndex, selected]);

  const answer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === q.correct;
    if (correct) setScore((s) => s + 100);
    setFeedback(correct ? '¡Correcto! +100 pts' : 'Incorrecto, sigue intentando');
    setTimeout(() => {
      if (qIndex < TRIVIA_QUESTIONS.length - 1) {
        setQIndex((i) => i + 1);
        setSelected(null);
        setFeedback(null);
        setTimeLeft(15);
      }
    }, 1500);
  };

  return (
    <div className="dok7-demo dok7-demo--trivia">
      <div className="dok7-demo-trivia-header">
        <span>Pregunta {qIndex + 1}/{TRIVIA_QUESTIONS.length}</span>
        <span style={{ color: accent }}>{score} pts</span>
      </div>
      <div className="dok7-demo-timer-bar">
        <div className="dok7-demo-timer-fill" style={{ width: `${(timeLeft / 15) * 100}%`, background: accent }} />
      </div>
      <p className="dok7-demo-trivia-question">{q.q}</p>
      <div className="dok7-demo-trivia-opts">
        {q.options.map((opt, i) => (
          <button
            key={opt}
            type="button"
            className={`dok7-demo-trivia-opt ${selected === i ? (i === q.correct ? 'dok7-demo-trivia-opt--correct' : 'dok7-demo-trivia-opt--wrong') : ''}`}
            onClick={() => answer(i)}
            disabled={selected !== null}
          >
            {opt}
          </button>
        ))}
      </div>
      {feedback && <p className="dok7-demo-toast">{feedback}</p>}
    </div>
  );
}

const WHEEL_PRIZES = ['10% OFF', 'Envío gratis', 'Producto gratis', '50 pts', 'Intenta otra vez', '20% OFF'];
const WHEEL_SEGMENT_ANGLE = 360 / WHEEL_PRIZES.length;

function getPrizeIndexFromRotation(degrees: number): number {
  const normalized = ((degrees % 360) + 360) % 360;
  const angleAtPointer = (360 - normalized) % 360;
  return Math.floor(angleAtPointer / WHEEL_SEGMENT_ANGLE) % WHEEL_PRIZES.length;
}

function getWheelResultMessage(prize: string): string {
  if (prize.toLowerCase() === 'intenta otra vez') {
    return '¡Intenta otra vez! 🔄';
  }
  return `¡Has ganado: ${prize}! 🎉`;
}

function RuletaDemo({ accent }: { accent: string }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prize, setPrize] = useState<string | null>(null);
  const rotationRef = useRef(0);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setPrize(null);

    const segment = Math.floor(Math.random() * WHEEL_PRIZES.length);
    const sliceCenter = segment * WHEEL_SEGMENT_ANGLE + WHEEL_SEGMENT_ANGLE / 2;
    const currentMod = ((rotationRef.current % 360) + 360) % 360;
    const targetMod = (360 - sliceCenter + 360) % 360;
    const delta = (targetMod - currentMod + 360) % 360;
    const nextRotation = rotationRef.current + 360 * 5 + delta;

    rotationRef.current = nextRotation;
    setRotation(nextRotation);

    setTimeout(() => {
      setSpinning(false);
      setPrize(WHEEL_PRIZES[getPrizeIndexFromRotation(nextRotation)]);
    }, 4000);
  };

  return (
    <div className="dok7-demo dok7-demo--ruleta">
      <div className="dok7-demo-wheel-wrap">
        <div className="dok7-demo-wheel-pointer" style={{ borderTopColor: accent }} />
        <div
          className="dok7-demo-wheel"
          style={{ transform: `rotate(${rotation}deg)`, transition: spinning ? 'transform 4s cubic-bezier(0.17,0.67,0.12,0.99)' : 'none' }}
        >
          {WHEEL_PRIZES.map((p, i) => (
            <div key={p} className="dok7-demo-wheel-slice" style={{ transform: `rotate(${i * 60}deg)`, background: i % 2 === 0 ? `${accent}33` : 'rgba(255,255,255,0.08)' }}>
              <span>{p}</span>
            </div>
          ))}
        </div>
      </div>
      <button type="button" className="dok7-demo-btn" style={{ background: accent }} onClick={spin} disabled={spinning}>
        {spinning ? 'Girando...' : '¡Girar ruleta!'}
      </button>
      {prize && <p className="dok7-demo-toast">{getWheelResultMessage(prize)}</p>}
    </div>
  );
}

function RascaDemo({ accent }: { accent: string }) {
  return (
    <div className="dok7-demo dok7-demo--rasca">
      <ScratchCard accent={accent} prize="20% de descuento" />
    </div>
  );
}

const MEMORY_EMOJIS = ['🎮', '🎯', '⭐', '🎁'];

function shuffleDeck() {
  return [...MEMORY_EMOJIS, ...MEMORY_EMOJIS].sort(() => Math.random() - 0.5);
}

function MemoriaDemo({ accent }: { accent: string }) {
  const [deck, setDeck] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [lock, setLock] = useState(false);

  useEffect(() => {
    setDeck(shuffleDeck());
  }, []);

  const flip = useCallback(
    (idx: number) => {
      if (lock || flipped.includes(idx) || matched.includes(idx)) return;
      const next = [...flipped, idx];
      setFlipped(next);
      if (next.length === 2) {
        setLock(true);
        const [a, b] = next;
        if (deck[a] === deck[b]) {
          setMatched((m) => [...m, a, b]);
          setFlipped([]);
          setLock(false);
        } else {
          setTimeout(() => {
            setFlipped([]);
            setLock(false);
          }, 800);
        }
      }
    },
    [deck, flipped, lock, matched]
  );

  const won = deck.length > 0 && matched.length === deck.length;

  if (deck.length === 0) {
    return <div className="dok7-demo dok7-demo--memoria"><p className="dok7-demo-mem-hint">Cargando juego...</p></div>;
  }

  return (
    <div className="dok7-demo dok7-demo--memoria">
      <p className="dok7-demo-mem-hint">Encuentra los 4 pares — {matched.length / 2}/4</p>
      <div className="dok7-demo-mem-grid">
        {deck.map((emoji, i) => {
          const isOpen = flipped.includes(i) || matched.includes(i);
          return (
            <button key={i} type="button" className={`dok7-demo-mem-card ${isOpen ? 'dok7-demo-mem-card--open' : ''}`} onClick={() => flip(i)} disabled={won}>
              <span className="dok7-demo-mem-front" style={{ background: accent }}>?</span>
              <span className="dok7-demo-mem-back">{emoji}</span>
            </button>
          );
        })}
      </div>
      {won && <p className="dok7-demo-toast">¡Completado! Tiempo récord 🏆</p>}
    </div>
  );
}

function CalendarioDemo({ accent }: { accent: string }) {
  const [opened, setOpened] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const today = 7;
  const prizes: Record<number, string> = {
    1: '5% descuento', 2: 'Envío gratis', 3: '10 pts', 4: '15% OFF', 5: 'Sticker digital', 6: 'Sorteo extra', 7: '¡Premio sorpresa!',
  };

  const openDay = (d: number) => {
    if (d !== today || opened.includes(d)) return;
    setOpened((o) => [...o, d]);
  };

  return (
    <div className="dok7-demo dok7-demo--calendario">
      <p className="dok7-demo-cal-hint">Abre el día de hoy para descubrir tu premio</p>
      <div className="dok7-demo-cal-grid">
        {Array.from({ length: 14 }, (_, i) => i + 1).map((d) => {
          const isOpen = opened.includes(d);
          const isToday = d === today;
          return (
            <button
              key={d}
              type="button"
              className={`dok7-demo-cal-day ${isOpen ? 'dok7-demo-cal-day--open' : ''} ${isToday ? 'dok7-demo-cal-day--today' : ''}`}
              style={isToday && !isOpen ? { borderColor: accent, boxShadow: `0 0 16px ${accent}44` } : undefined}
              onClick={() => openDay(d)}
              disabled={!isToday || isOpen}
            >
              {isOpen ? '🎁' : d}
            </button>
          );
        })}
      </div>
      {opened.includes(today) && <p className="dok7-demo-toast">Hoy ganaste: {prizes[today]} 🎉</p>}
    </div>
  );
}
