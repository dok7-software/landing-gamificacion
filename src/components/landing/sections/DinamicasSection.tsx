'use client';

import { useState } from 'react';
import { CAMPANA_DYNAMICS, EVENTO_DYNAMICS } from '../data/dynamics';
import { DynamicDemoModal } from '../dynamics/DynamicDemoModal';
import { CalendarIcon, LightbulbIcon, TargetIcon } from '../icons';
import type { DynamicItem } from '../types';
import { DynamicCard } from '../ui/DynamicCard';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionDividerCompact, SectionTitle } from '../ui/SectionTitle';

export function DinamicasSection() {
  const [activeDynamic, setActiveDynamic] = useState<DynamicItem | null>(null);

  return (
    <section id="dinamicas" className="dok7-section" style={{ background: '#0b0b1a' }}>
      <SectionTitle className="dok7-section-title" light>
        Dinámicas
      </SectionTitle>
      <SectionDividerCompact />
      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 16, margin: '0 0 48px' }}>
        Explora las experiencias que puedes activar en tu evento o campaña.
      </p>

      <SectionHeader
        icon={<CalendarIcon size={20} color="#7c5cfc" />}
        title="Para eventos"
        subtitle="Motiva, conecta y genera emoción en cada momento de tu evento."
      />
      <div className="dok7-dynamics-grid" style={{ marginBottom: 48 }}>
        {EVENTO_DYNAMICS.map((item) => (
          <DynamicCard key={item.id} dynamic={item} onOpen={setActiveDynamic} />
        ))}
      </div>

      <SectionHeader
        icon={<TargetIcon size={20} color="#60a5fa" />}
        title="Para campañas"
        subtitle="Aumenta la participación, impulsa tus objetivos y premia a tu audiencia."
      />
      <div className="dok7-dynamics-grid" style={{ marginBottom: 32 }}>
        {CAMPANA_DYNAMICS.map((item) => (
          <DynamicCard key={item.id} dynamic={item} onOpen={setActiveDynamic} />
        ))}
      </div>

      <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '16px 28px', maxWidth: 500, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <LightbulbIcon />
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
          Haz <span style={{ color: '#7c5cfc', textDecoration: 'underline' }}>clic</span> en una dinámica para probarla en vivo.
        </span>
      </div>

      <DynamicDemoModal dynamic={activeDynamic} onClose={() => setActiveDynamic(null)} />
    </section>
  );
}
