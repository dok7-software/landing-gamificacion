'use client';

import { useState } from 'react';
import type { TabId } from '../types';
import { enviarEvento } from '@/lib/analytics/gtm';
import { CalendarIcon, TargetIcon } from '../icons';
import { CampanasPanel } from './ShowcasePanels';
import { EventosPanel } from './EventosPanel';

const TABS = [
  {
    id: 'eventos' as const,
    inputId: 'showcase-tab-eventos',
    label: 'EVENTOS',
    subtitle: 'Ventajas de la gamificación en eventos',
    icon: <CalendarIcon color="white" />,
  },
  {
    id: 'campanas' as const,
    inputId: 'showcase-tab-campanas',
    label: 'CAMPAÑAS',
    subtitle: 'Atrae, convierte y genera leads.',
    icon: <TargetIcon color="white" />,
  },
];

export function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState<TabId>('eventos');

  const handleTabChange = (tabId: TabId) => {
    if (tabId === activeTab) return;
    setActiveTab(tabId);
    enviarEvento('pestaña_showcase', { pestaña: tabId });
  };

  return (
    <div className="dok7-showcase-shell">
      {TABS.map((tab) => (
        <input
          key={tab.inputId}
          type="radio"
          name="dok7-showcase-tab"
          id={tab.inputId}
          className="dok7-showcase-tab-input"
          checked={activeTab === tab.id}
          onChange={() => handleTabChange(tab.id)}
          tabIndex={-1}
        />
      ))}

      <div className="dok7-tabbar" role="tablist" aria-label="Eventos y campañas">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <label
              key={tab.id}
              id={`tab-${tab.id}`}
              htmlFor={tab.inputId}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              className={`dok7-tab dok7-tab--${tab.id} ${isActive ? 'dok7-tab--active' : ''}`}
            >
              <span className="dok7-tab-shine" aria-hidden="true" />
              <span className="dok7-tab-glow" aria-hidden="true" />
              <span className="dok7-tab-icon">{tab.icon}</span>
              <span className="dok7-tab-body">
                <span className="tab-title">{tab.label}</span>
                <span className="tab-sub">{tab.subtitle}</span>
              </span>
            </label>
          );
        })}
      </div>

      <section id="showcase" className="dok7-section--panels" aria-label="Demostración de eventos y campañas">
        {activeTab === 'eventos' ? (
          <div id="panel-eventos" role="tabpanel" aria-labelledby="tab-eventos">
            <EventosPanel />
          </div>
        ) : (
          <div id="panel-campanas" role="tabpanel" aria-labelledby="tab-campanas">
            <CampanasPanel />
          </div>
        )}
      </section>
    </div>
  );
}
