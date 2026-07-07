'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FLOW_STEPS } from '../data/content';

const WHEEL_SLICES = ['10% OFF', 'Envío gratis', '50 pts', '20% OFF', 'Intenta otra vez', 'Regalo'];

export function CampanasShowcaseCenter() {
  const [activeStep, setActiveStep] = useState(1);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prize, setPrize] = useState<string | null>(null);
  const [formStep, setFormStep] = useState(0);
  const [prizeRevealed, setPrizeRevealed] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);

  const spinWheel = () => {
    if (spinning) return;
    const segment = Math.floor(Math.random() * 6);
    setPrize(null);
    setSpinning(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setRotation((r) => r + 360 * 5 + segment * 60 + 30);
      });
    });

    setTimeout(() => {
      setSpinning(false);
      setPrize(WHEEL_SLICES[segment]);
      setActiveStep(2);
    }, 4000);
  };

  const fillForm = () => {
    if (formStep >= 3) return;
    setFormStep((s) => s + 1);
    if (formStep + 1 >= 3) {
      setLeadCaptured(true);
      setTimeout(() => setActiveStep(3), 600);
    }
  };

  const revealPrize = () => {
    setPrizeRevealed(true);
  };

  return (
    <div className="dok7-showcase-campanas">
      <div className="dok7-showcase-funnel">
        {FLOW_STEPS.map((step, index) => {
          const isActive = activeStep === index;
          return (
            <div key={step.title} className="dok7-showcase-funnel-item">
              {index > 0 && <div className="dok7-showcase-funnel-arrow">→</div>}
              <button
                type="button"
                className={`dok7-showcase-funnel-step ${isActive ? 'dok7-showcase-funnel-step--active' : ''}`}
                onClick={() => setActiveStep(index)}
                aria-pressed={isActive}
              >
                <div className="dok7-showcase-funnel-visual">
                  {index === 0 && (
                    <div className="dok7-showcase-ad-mock">
                      <div className="dok7-showcase-ad-banner">¡Juega y gana!</div>
                      <div className="dok7-showcase-ad-cta dok7-showcase-ad-cta--pulse">Participar →</div>
                    </div>
                  )}
                  {index === 1 && (
                    <div className="dok7-showcase-mini-wheel-wrap">
                      <div className="dok7-showcase-mini-wheel-pointer" />
                      <div
                        className={`dok7-showcase-mini-wheel ${spinning ? 'dok7-showcase-mini-wheel--spinning' : ''}`}
                        style={{ transform: `rotate(${rotation}deg)` }}
                      >
                        {WHEEL_SLICES.map((p, i) => (
                          <span key={p} style={{ '--slice-rotate': `${i * 60 + 30}deg` } as React.CSSProperties}>
                            {p.slice(0, 4)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="dok7-showcase-form-mock">
                      {['Nombre', 'Email', 'Teléfono'].map((field, fi) => (
                        <div key={field} className={`dok7-showcase-form-field ${fi < formStep ? 'dok7-showcase-form-field--filled' : ''}`}>
                          {fi < formStep ? (fi === 0 ? 'Laura M.' : fi === 1 ? 'laura@email.com' : '+34 600…') : field}
                        </div>
                      ))}
                    </div>
                  )}
                  {index === 3 && (
                    <div className={`dok7-showcase-prize-mock ${prizeRevealed ? 'dok7-showcase-prize-mock--open' : ''}`}>
                      <span className="dok7-showcase-prize-emoji">{prizeRevealed ? '🎉' : '🎁'}</span>
                      <span className="dok7-showcase-prize-text">{prizeRevealed ? (prize ?? '20% OFF') : 'Premio'}</span>
                    </div>
                  )}
                </div>
                <div className="dok7-showcase-funnel-text">
                  <span className="dok7-showcase-funnel-title">{step.title}</span>
                  <span className="dok7-showcase-funnel-sub">{step.subtitle}</span>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      <div className="dok7-showcase-campanas-actions">
        {activeStep === 0 && (
          <button type="button" className="dok7-showcase-action dok7-showcase-action--blue" onClick={() => setActiveStep(1)}>
            Simular clic en anuncio →
          </button>
        )}
        {activeStep === 1 && (
          <button type="button" className="dok7-showcase-action dok7-showcase-action--blue" onClick={spinWheel} disabled={spinning}>
            {spinning ? 'Girando ruleta...' : '¡Girar ruleta!'}
          </button>
        )}
        {activeStep === 2 && (
          <button type="button" className="dok7-showcase-action dok7-showcase-action--blue" onClick={fillForm} disabled={formStep >= 3}>
            {formStep >= 3 ? 'Lead captado ✓' : `Rellenar campo ${formStep + 1}/3`}
          </button>
        )}
        {activeStep === 3 && (
          <button type="button" className="dok7-showcase-action dok7-showcase-action--blue" onClick={revealPrize} disabled={prizeRevealed}>
            {prizeRevealed ? '¡Premio entregado!' : 'Revelar premio'}
          </button>
        )}

        {leadCaptured && (
          <div className="dok7-showcase-lead-badge">
            <span className="dok7-dyn-live-dot" /> Nuevo lead captado
          </div>
        )}

        <Link href="#contacto" className="dok7-showcase-link-cta">
          Crear una campaña →
        </Link>
      </div>

      {prize && activeStep >= 1 && (
        <p className="dok7-showcase-campanas-prize">Último premio: <strong>{prize}</strong></p>
      )}
    </div>
  );
}
