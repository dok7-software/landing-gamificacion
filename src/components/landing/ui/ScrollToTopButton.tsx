'use client';

import { useEffect, useState } from 'react';
import { enviarEvento } from '@/lib/analytics/gtm';
import { ChevronUpIcon } from '../icons';

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('.dok7-section--hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    enviarEvento('clic_subir_arriba');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={`dok7-scroll-top${visible ? ' dok7-scroll-top--visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Volver al inicio"
      title="Volver al inicio"
    >
      <ChevronUpIcon color="white" size={24} />
    </button>
  );
}
