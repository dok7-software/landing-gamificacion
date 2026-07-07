'use client';

import { useEffect } from 'react';
import type { DynamicItem } from '../types';
import { DynamicDemo } from './DynamicDemo';

interface DynamicDemoModalProps {
  dynamic: DynamicItem | null;
  onClose: () => void;
}

export function DynamicDemoModal({ dynamic, onClose }: DynamicDemoModalProps) {
  useEffect(() => {
    if (!dynamic) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [dynamic, onClose]);

  if (!dynamic) return null;

  return (
    <div className="dok7-dyn-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="dok7-dyn-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dok7-dyn-modal-title"
      >
        <button type="button" className="dok7-dyn-modal-close" onClick={onClose} aria-label="Cerrar demo">
          ×
        </button>

        <div className="dok7-dyn-modal-header">
          <span className="dok7-dyn-modal-badge" style={{ background: `${dynamic.accent}22`, color: dynamic.accent }}>
            {dynamic.category === 'evento' ? 'Evento' : 'Campaña'}
          </span>
          <h2 id="dok7-dyn-modal-title">{dynamic.title}</h2>
          <p>{dynamic.description}</p>
        </div>

        <div className="dok7-dyn-modal-steps">
          {dynamic.steps.map((step, i) => (
            <div key={step} className="dok7-dyn-modal-step">
              <span className="dok7-dyn-modal-step-num" style={{ background: dynamic.accent }}>{i + 1}</span>
              <span>{step}</span>
            </div>
          ))}
        </div>

        <div className="dok7-dyn-modal-demo">
          <div className="dok7-dyn-modal-demo-label">
            <span className="dok7-dyn-live-dot" /> Prueba interactiva
          </div>
          <DynamicDemo id={dynamic.id} accent={dynamic.accent} />
        </div>
      </div>
    </div>
  );
}
