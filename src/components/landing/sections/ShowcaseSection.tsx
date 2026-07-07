'use client';

import type { TabId } from '../types';
import { CalendarIcon, TargetIcon } from '../icons';
import { CampanasPanel, EventosPanel } from './ShowcasePanels';

interface ShowcaseSectionProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TABS = [
  {
    id: 'eventos' as const,
    label: 'EVENTOS',
    subtitle: 'Activa a quienes ya están dentro.',
    activeBg: '#5b21b6',
    inactiveBg: '#3b1f7a',
    borderRadius: '16px 0 0 0',
    icon: <CalendarIcon color="white" />,
  },
  {
    id: 'campanas' as const,
    label: 'CAMPAÑAS',
    subtitle: 'Atrae, convierte y genera leads.',
    activeBg: '#1e40af',
    inactiveBg: '#162d6e',
    borderRadius: '0 16px 0 0',
    icon: <TargetIcon color="white" />,
  },
];

export function ShowcaseSection({ activeTab, onTabChange }: ShowcaseSectionProps) {
  return (
    <>
      <div className="dok7-tabbar" role="tablist" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '0 64px' }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              style={{
                background: isActive ? tab.activeBg : tab.inactiveBg,
                padding: '28px 36px',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                borderRadius: tab.borderRadius,
                transition: 'background 0.3s',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'inherit',
              }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {tab.icon}
              </div>
              <div>
                <div className="tab-title" style={{ fontWeight: 800, color: 'white', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {tab.label}
                </div>
                <div className="tab-sub" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {tab.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <section id="showcase" className="dok7-section--panels" aria-label="Demostración de eventos y campañas">
        {activeTab === 'eventos' ? <EventosPanel /> : <CampanasPanel />}
      </section>
    </>
  );
}
