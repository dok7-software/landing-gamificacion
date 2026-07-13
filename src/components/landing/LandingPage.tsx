'use client';

import { useState } from 'react';
import type { TabId } from './types';
import { DinamicasSection } from './sections/DinamicasSection';
import { ContactSection } from './sections/ContactSection';
import { FaqChatbot } from './ui/FaqChatbot';
import { Hero } from './sections/Hero';
import { PorQueDok7Section } from './sections/PorQueDok7Section';
import { ShowcaseSection } from './sections/ShowcaseSection';
import { ScrollToTopButton } from './ui/ScrollToTopButton';
import './landing.css';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<TabId>('eventos');
  const [faqChatOpen, setFaqChatOpen] = useState(false);

  return (
    <div className="dok7-landing" style={{ background: '#0b0b1a', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Hero />
      <ShowcaseSection activeTab={activeTab} onTabChange={setActiveTab} />
      <PorQueDok7Section />
      <DinamicasSection />
      <ContactSection />
      <FaqChatbot open={faqChatOpen} onOpenChange={setFaqChatOpen} />
      <ScrollToTopButton />
    </div>
  );
}
