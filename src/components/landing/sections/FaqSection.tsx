'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FAQ_ITEMS } from '../data/content';
export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section id="faq" className="dok7-section" style={{ background: '#faf5ee' }}>
      <h2 className="dok7-faq-title" style={{ textAlign: 'center', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
        Preguntas <span style={{ fontStyle: 'italic', color: '#6c3aed' }}>frecuentes</span>
      </h2>
      <p style={{ textAlign: 'center', color: 'rgba(15,23,42,0.5)', fontSize: 16, margin: '16px 0 48px', lineHeight: 1.6 }}>
        Resolvemos las dudas más comunes para que tengas claridad antes de lanzar tu evento o campaña.
      </p>

      <div className="dok7-faq-layout">
        <div className="dok7-faq-character">
          <Image
            src="/faq-character-hq-nobg.png"
            alt="Personaje pensativo con preguntas frecuentes"
            width={500}
            height={620}
            className="dok7-faq-character-img"
            priority
          />
        </div>

        <div className="dok7-faq-list">
        {FAQ_ITEMS.map((faq, index) => {
          const isOpen = openIndex === index;
          const headingId = `faq-heading-${index}`;
          const panelId = `faq-panel-${index}`;

          return (
            <div
              key={faq.question}
              className="dok7-faq-item"
              style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 14, padding: '24px 28px', cursor: 'pointer', transition: 'box-shadow 0.2s' }}
            >
              <button
                type="button"
                id={headingId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
              >
                <span style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{faq.question}</span>
              </button>
              {isOpen && (
                <p id={panelId} role="region" aria-labelledby={headingId} style={{ margin: '12px 0 0', fontSize: 14, color: 'rgba(15,23,42,0.6)', lineHeight: 1.6 }}>
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
