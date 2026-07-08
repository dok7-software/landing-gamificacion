'use client';

import { useCallback, useEffect, useState } from 'react';
import { STATS_DATA } from '../data/content';
import { RefreshIcon } from '../icons';

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
  return Math.round(num).toLocaleString('es-ES');
}

const CHANGE_RANGES: Record<string, { min: number; max: number }> = {
  'Leads captados': { min: 18, max: 31 },
  'Tasa de conversión': { min: 7, max: 19 },
  'Premios entregados': { min: 4, max: 15 },
  'ROI de campaña': { min: 9, max: 24 },
};

function randomChange(label: string, fallback: string): string {
  const range = CHANGE_RANGES[label];
  if (!range) return fallback;
  const value = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  return `+${value}%`;
}

function randomValue(base: number, suffix: string): number {
  const variance = suffix === '' ? 0.06 : 0.05;
  const factor = 1 - variance / 2 + Math.random() * variance;
  return base * factor;
}

export function ShowcaseLiveStats() {
  const [animated, setAnimated] = useState(STATS_DATA.map(() => 0));
  const [changes, setChanges] = useState(() => STATS_DATA.map((s) => randomChange(s.label, s.change)));
  const [pulsing, setPulsing] = useState(false);
  const [spinning, setSpinning] = useState(false);

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

  const updateStats = useCallback((spinIcon = false) => {
    setPulsing(true);
    if (spinIcon) setSpinning(true);
    setAnimated(
      STATS_DATA.map((s) => {
        const { num, suffix } = parseValue(s.value);
        return randomValue(num, suffix);
      }),
    );
    setChanges(STATS_DATA.map((s) => randomChange(s.label, s.change)));
    window.setTimeout(() => {
      setPulsing(false);
      if (spinIcon) setSpinning(false);
    }, 600);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => updateStats(false), 3000);
    return () => window.clearInterval(interval);
  }, [updateStats]);

  const refresh = () => updateStats(true);

  return (
    <div className={`dok7-showcase-stats ${pulsing ? 'dok7-showcase-stats--pulse' : ''}`}>
      <div className="dok7-showcase-stats-header">
        <span>Resultados en tiempo real</span>
        <button
          type="button"
          className={`dok7-showcase-stats-refresh ${spinning ? 'dok7-showcase-stats-refresh--spinning' : ''}`}
          onClick={refresh}
          aria-label="Actualizar datos"
        >
          <RefreshIcon />
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
              <span className="dok7-showcase-stat-change">{changes[i]}</span>
            </div>
          );
        })}
      </div>

      <p className="dok7-showcase-stats-foot">Datos actualizados al instante</p>
    </div>
  );
}
