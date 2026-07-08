'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChartIcon } from '../icons';

const OTHER_PLAYERS = [
  { name: 'Laura M.', pts: 1250 },
  { name: 'Equipo Alpha', pts: 980 },
  { name: 'Jorge R.', pts: 870 },
];

const MEDALS = ['🥇', '🥈', '🥉'];

interface ShowcaseLiveRankingProps {
  yourPoints: number;
  boosted?: boolean;
}

export function ShowcaseLiveRanking({ yourPoints, boosted = false }: ShowcaseLiveRankingProps) {
  const [displayPoints, setDisplayPoints] = useState(yourPoints);
  const displayRef = useRef(yourPoints);

  useEffect(() => {
    const start = displayRef.current;
    const delta = yourPoints - start;
    if (delta === 0) return;

    const duration = 500;
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      const next = Math.round(start + delta * eased);
      setDisplayPoints(next);
      if (t >= 1) {
        displayRef.current = yourPoints;
        return;
      }
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [yourPoints]);

  const players = useMemo(() => {
    return [
      ...OTHER_PLAYERS,
      { name: 'Tú', pts: displayPoints, isYou: true as const },
    ].sort((a, b) => b.pts - a.pts);
  }, [displayPoints]);

  return (
    <div className="dok7-showcase-ranking">
      <div className="dok7-showcase-ranking-header">
        <ChartIcon />
        <span>Ranking en vivo</span>
        <span className="dok7-showcase-ranking-live"><span className="dok7-dyn-live-dot" /> LIVE</span>
      </div>

      <div className="dok7-showcase-ranking-list">
        {players.map((p, i) => {
          const isYou = 'isYou' in p && p.isYou;
          const medal = i < 3 ? MEDALS[i] : `${i + 1}º`;
          return (
            <div
              key={p.name}
              className={`dok7-showcase-ranking-row ${isYou ? 'dok7-showcase-ranking-row--you' : ''} ${isYou && boosted ? 'dok7-showcase-ranking-row--boost' : ''}`}
            >
              <span className="dok7-showcase-ranking-medal">{medal}</span>
              <span className="dok7-showcase-ranking-name">{p.name}</span>
              <span className="dok7-showcase-ranking-pts">{p.pts} pts</span>
            </div>
          );
        })}
      </div>

      <p className="dok7-showcase-ranking-hint">Interactúa con el móvil para sumar puntos</p>
    </div>
  );
}
