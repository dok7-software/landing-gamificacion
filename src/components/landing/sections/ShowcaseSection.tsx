'use client';

import type { TabId } from '../types';
import { enviarEvento } from '@/lib/analytics/gtm';
import { CalendarIcon, TargetIcon } from '../icons';
import { CampanasPanel } from './ShowcasePanels';
import { EventosPanel } from './EventosPanel';

interface ShowcaseSectionProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TABS = [
  {
    id: 'eventos' as const,
    label: 'EVENTOS',
    subtitle: 'Ventajas de la gamificación en eventos',
    icon: <CalendarIcon color="white" />,
  },
  {
    id: 'campanas' as const,
    label: 'CAMPAÑAS',
    subtitle: 'Atrae, convierte y genera leads.',
    icon: <TargetIcon color="white" />,
  },
];

export function ShowcaseSection({ activeTab, onTabChange }: ShowcaseSectionProps) {
  const handleTabChange = (tabId: TabId) => {
    if (tabId === activeTab) return;
    onTabChange(tabId);
    enviarEvento('pestaña_showcase', { pestaña: tabId });
  };

  return (
    <>
      <div className="dok7-tabbar" role="tablist">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              className={`dok7-tab dok7-tab--${tab.id} ${isActive ? 'dok7-tab--active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              <span className="dok7-tab-shine" aria-hidden="true" />
              <span className="dok7-tab-glow" aria-hidden="true" />
              <span className="dok7-tab-icon">{tab.icon}</span>
              <span className="dok7-tab-body">
                <span className="tab-title">{tab.label}</span>
                <span className="tab-sub">{tab.subtitle}</span>
              </span>
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
