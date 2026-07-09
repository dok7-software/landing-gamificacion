'use client';

import { useState } from 'react';
import type { TabId } from './types';
import { DinamicasSection } from './sections/DinamicasSection';
import { ContactSection } from './sections/ContactSection';
import { FaqSection } from './sections/FaqSection';
import { Hero } from './sections/Hero';
import { Navbar } from './sections/Navbar';
import { ObjetivoSection } from './sections/ObjetivoSection';
import { ShowcaseSection } from './sections/ShowcaseSection';
import './landing.css';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<TabId>('eventos');

  return (
    <div className="dok7-landing" style={{ background: '#0b0b1a', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <Hero />
      <ShowcaseSection activeTab={activeTab} onTabChange={setActiveTab} />
      <ObjetivoSection />
      <DinamicasSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
}
