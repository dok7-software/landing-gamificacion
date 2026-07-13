'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { rastrearClicCta, rastrearInteraccionDemo } from '@/lib/analytics/gtm';
import { FLOW_STEPS } from '../data/content';

const WHEEL_SLICES = [
  { label: '10% OFF', icon: '🏷️' },
  { label: 'Envío gratis', icon: '📦' },
  { label: '50 pts', icon: '⭐' },
  { label: '20% OFF', icon: '💰' },
  { label: 'Intenta otra vez', icon: '🔄' },
  { label: 'Regalo', icon: '🎁' },
] as const;
const WHEEL_SEGMENT_ANGLE = 360 / WHEEL_SLICES.length;

function getSliceIndexFromRotation(degrees: number): number {
  const normalized = ((degrees % 360) + 360) % 360;
  const angleAtPointer = (360 - normalized) % 360;
  return Math.round(angleAtPointer / WHEEL_SEGMENT_ANGLE) % WHEEL_SLICES.length;
}

export function CampanasShowcaseCenter() {
  const [activeStep, setActiveStep] = useState(1);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);
  const [prize, setPrize] = useState<string | null>(null);
  const [formStep, setFormStep] = useState(0);
  const [prizeRevealed, setPrizeRevealed] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);

  const spinWheel = () => {
    if (spinning) return;
    rastrearInteraccionDemo('campanas', 'girar_ruleta', 'juego');
    const segment = Math.floor(Math.random() * WHEEL_SLICES.length);
    setPrize(null);
    setSpinning(true);

    const sliceAngle = segment * WHEEL_SEGMENT_ANGLE;
    const currentMod = ((rotationRef.current % 360) + 360) % 360;
    const targetMod = (360 - sliceAngle) % 360;
    const delta = (targetMod - currentMod + 360) % 360;
    const nextRotation = rotationRef.current + 360 * 5 + delta;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        rotationRef.current = nextRotation;
        setRotation(nextRotation);
      });
    });

    setTimeout(() => {
      setSpinning(false);
      setPrize(WHEEL_SLICES[getSliceIndexFromRotation(nextRotation)].label);
      setActiveStep(2);
    }, 4000);
  };

  const fillForm = () => {
    if (formStep >= 3) return;
    const siguientePaso = formStep + 1;
    setFormStep(siguientePaso);
    if (siguientePaso >= 3) {
      rastrearInteraccionDemo('campanas', 'lead_demo_captado', 'registro');
      setLeadCaptured(true);
      setTimeout(() => setActiveStep(3), 600);
    } else {
      rastrearInteraccionDemo('campanas', 'rellenar_formulario_demo', 'registro');
    }
  };

  const revealPrize = () => {
    rastrearInteraccionDemo('campanas', 'revelar_premio', 'incentivo');
    setPrizeRevealed(true);
  };

  return (
    <div className="dok7-showcase-campanas-wrap">
      <div className="dok7-showcase-campanas-ambience" aria-hidden="true" />

      <div className="dok7-showcase-campanas">
      <div className="dok7-showcase-funnel">
        {FLOW_STEPS.map((step, index) => {
          const isActive = activeStep === index;
          return (
            <div key={step.title} className="dok7-showcase-funnel-item">
              <button
                type="button"
                className={`dok7-showcase-funnel-step ${isActive ? 'dok7-showcase-funnel-step--active' : ''}`}
                onClick={() => {
                  setActiveStep(index);
                  rastrearInteraccionDemo('campanas', 'clic_paso_funnel', FLOW_STEPS[index].title.toLowerCase());
                }}
                aria-pressed={isActive}
              >
                <div className="dok7-showcase-funnel-visual">
                  {index === 0 && (
                    <div className="dok7-showcase-ad-mock">
                      <div className="dok7-showcase-ad-banner">¡Juega y gana!</div>
                      <div className="dok7-showcase-ad-cta dok7-showcase-ad-cta--pulse">Participar</div>
                    </div>
                  )}
                  {index === 1 && (
                    <div className="dok7-showcase-mini-wheel-wrap">
                      <div className="dok7-showcase-mini-wheel-pointer" />
                      <div
                        className={`dok7-showcase-mini-wheel ${spinning ? 'dok7-showcase-mini-wheel--spinning' : ''}`}
                        style={{ transform: `rotate(${rotation}deg)` }}
                      >
                        {WHEEL_SLICES.map((slice, i) => (
                          <span
                            key={slice.label}
                            className="dok7-showcase-mini-wheel-segment"
                            style={{
                              transform: `rotate(${i * WHEEL_SEGMENT_ANGLE}deg) translateY(calc(-1 * var(--mini-wheel-segment-radius)))`,
                            }}
                            aria-hidden="true"
                          >
                            {slice.icon}
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
          <button type="button" className="dok7-showcase-action dok7-showcase-action--blue" onClick={() => {
            rastrearInteraccionDemo('campanas', 'simular_anuncio', 'anuncio');
            setActiveStep(1);
          }}>
            Simular clic en anuncio
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

        <Link
          href="#contacto"
          className="dok7-showcase-link-cta"
          onClick={() => rastrearClicCta('Crear una campaña', 'showcase_campanas')}
        >
          Crear una campaña
        </Link>
      </div>
    </div>
    </div>
  );
}
