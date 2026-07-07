'use client';

import { useEffect, useState } from 'react';
import { STATS_DATA } from '../data/content';

function parseValue(value: string): { num: number; suffix: string; decimals: number } {
  if (value.includes('%')) {
    const num = parseFloat(value);
    return { num, suffix: '%', decimals: 1 };
  }
  if (value.includes('x')) {
    const num = parseFloat(value);
    return { num, suffix: 'x', decimals: 1 };
  }
  const num = parseInt(value.replace(/,/g, ''), 10);
  return { num, suffix: '', decimals: 0 };
}

function formatAnimated(num: number, suffix: string, decimals: number): string {
  if (suffix === '%') return `${num.toFixed(decimals)}%`;
  if (suffix === 'x') return `${num.toFixed(decimals)}x`;
  return num.toLocaleString('es-ES');
}

export function ShowcaseLiveStats() {
  const [animated, setAnimated] = useState(STATS_DATA.map(() => 0));
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    const targets = STATS_DATA.map((s) => parseValue(s.value));
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      setAnimated(targets.map((target) => target.num * eased));
      if (t < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, []);

  const refresh = () => {
    setPulsing(true);
    setAnimated(STATS_DATA.map((s) => parseValue(s.value).num * (0.95 + Math.random() * 0.1)));
    setTimeout(() => setPulsing(false), 500);
  };

  return (
    <div className={`dok7-showcase-stats ${pulsing ? 'dok7-showcase-stats--pulse' : ''}`}>
      <div className="dok7-showcase-stats-header">
        <span>Resultados en tiempo real</span>
        <button type="button" className="dok7-showcase-stats-refresh" onClick={refresh} aria-label="Actualizar datos">
          ↻
        </button>
      </div>

      <div className="dok7-showcase-stats-list">
        {STATS_DATA.map((stat, i) => {
          const { suffix, decimals } = parseValue(stat.value);
          return (
            <div key={stat.label} className="dok7-showcase-stat-row">
              <div>
                <div className="dok7-showcase-stat-label">{stat.label}</div>
                <div className="dok7-showcase-stat-value">{formatAnimated(animated[i], suffix, decimals)}</div>
              </div>
              <span className="dok7-showcase-stat-change">{stat.change}</span>
            </div>
          );
        })}
      </div>

      <p className="dok7-showcase-stats-foot">Datos actualizados al instante</p>
    </div>
  );
}
