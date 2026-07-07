'use client';

import { useState } from 'react';
import { ChartIcon } from '../icons';

const INITIAL = [
  { name: 'Laura M.', pts: 1250, medal: '🥇' },
  { name: 'Equipo Alpha', pts: 980, medal: '🥈' },
  { name: 'Jorge R.', pts: 870, medal: '🥉' },
  { name: 'Tú', pts: 650, isYou: true },
];

export function ShowcaseLiveRanking() {
  const [players, setPlayers] = useState(INITIAL);
  const [boosted, setBoosted] = useState(false);

  const addPoints = () => {
    setPlayers((p) =>
      p
        .map((x) => ('isYou' in x && x.isYou ? { ...x, pts: x.pts + 150 } : x))
        .sort((a, b) => b.pts - a.pts)
    );
    setBoosted(true);
    setTimeout(() => setBoosted(false), 700);
  };

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
          const medal = isYou ? `${i + 1}º` : p.medal;
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

      <button type="button" className="dok7-showcase-ranking-btn" onClick={addPoints}>
        Simular acción (+150 pts)
      </button>
    </div>
  );
}
