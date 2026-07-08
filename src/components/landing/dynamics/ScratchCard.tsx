'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface ScratchCardProps {
  accent: string;
  prize: string;
  revealThreshold?: number;
}

export function ScratchCard({ accent, prize, revealThreshold = 55 }: ScratchCardProps) {
  const areaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scratching = useRef(false);
  const hasScratched = useRef(false);
  const lastCheck = useRef(0);
  const initialized = useRef(false);
  const [percent, setPercent] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const drawOverlay = useCallback(() => {
    const canvas = canvasRef.current;
    const area = areaRef.current;
    if (!canvas || !area) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = area.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#94a3b8');
    gradient.addColorStop(1, '#64748b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    for (let x = 0; x < width; x += 10) {
      for (let y = 0; y < height; y += 10) {
        if ((x + y) % 20 === 0) ctx.fillRect(x, y, 5, 5);
      }
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
    ctx.font = '600 13px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Rasca aquí', width / 2, height / 2);
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    drawOverlay();

    const area = areaRef.current;
    if (!area) return;

    const observer = new ResizeObserver(() => {
      if (!scratching.current && !hasScratched.current) drawOverlay();
    });
    observer.observe(area);
    return () => observer.disconnect();
  }, [drawOverlay]);

  const getPos = (canvas: HTMLCanvasElement, clientX: number, clientY: number) => {
    const rect = canvas.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const erase = (x: number, y: number) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    hasScratched.current = true;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
  };

  const measureCleared = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;

    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;

    const { width, height } = canvas;
    const step = 8;
    const imageData = ctx.getImageData(0, 0, width, height);
    let cleared = 0;
    let total = 0;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const alpha = imageData.data[(y * width + x) * 4 + 3];
        if (alpha === 0) cleared++;
        total++;
      }
    }

    return Math.round((cleared / total) * 100);
  }, []);

  const updateProgress = useCallback(() => {
    const now = performance.now();
    if (now - lastCheck.current < 120) return;
    lastCheck.current = now;

    const cleared = measureCleared();
    setPercent(cleared);
    if (cleared >= revealThreshold) setRevealed(true);
  }, [measureCleared, revealThreshold]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (revealed) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    scratching.current = true;
    const { x, y } = getPos(e.currentTarget, e.clientX, e.clientY);
    erase(x, y);
    updateProgress();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!scratching.current || revealed) return;
    const { x, y } = getPos(e.currentTarget, e.clientX, e.clientY);
    erase(x, y);
    updateProgress();
  };

  const stopScratching = () => {
    scratching.current = false;
    updateProgress();
  };

  return (
    <>
      <div ref={areaRef} className="dok7-demo-scratch-area">
        <div className="dok7-demo-scratch-prize" style={{ color: accent }}>{prize}</div>
        <canvas
          ref={canvasRef}
          className={`dok7-demo-scratch-canvas ${revealed ? 'dok7-demo-scratch-canvas--done' : ''}`}
          aria-label="Rasca para revelar el premio"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopScratching}
          onPointerCancel={stopScratching}
        />
        {!revealed && percent > 0 && (
          <span className="dok7-demo-scratch-hint">{100 - percent}% por rascar</span>
        )}
      </div>
      {revealed && <p className="dok7-demo-toast">¡Premio revelado! Canjéalo ahora 🎁</p>}
    </>
  );
}
