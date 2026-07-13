'use client';

import { useEffect } from 'react';
import { enviarEvento } from '@/lib/analytics/gtm';

const SECCIONES = [
  { selector: '#contacto', nombre: 'hero' },
  { selector: '#showcase', nombre: 'showcase' },
  { selector: '#por-que-dok7', nombre: 'por_que_dok7' },
  { selector: '#dinamicas', nombre: 'dinamicas' },
  { selector: '.dok7-section--contact-cta', nombre: 'cta_contacto' },
] as const;

const NIVELES_SCROLL = [25, 50, 75, 100] as const;

export function useLandingAnalytics() {
  useEffect(() => {
    const seccionesVistas = new Set<string>();
    const observers: IntersectionObserver[] = [];

    SECCIONES.forEach(({ selector, nombre }) => {
      const elemento = document.querySelector(selector);
      if (!elemento) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting || entry.intersectionRatio < 0.5 || seccionesVistas.has(nombre)) {
            return;
          }

          seccionesVistas.add(nombre);
          enviarEvento('seccion_vista', { nombre_seccion: nombre });
        },
        { threshold: 0.5 },
      );

      observer.observe(elemento);
      observers.push(observer);
    });

    const nivelesAlcanzados = new Set<number>();

    const medirScroll = () => {
      const alturaDocumento = document.documentElement.scrollHeight - window.innerHeight;
      if (alturaDocumento <= 0) return;

      const porcentaje = Math.round((window.scrollY / alturaDocumento) * 100);

      NIVELES_SCROLL.forEach((nivel) => {
        if (porcentaje >= nivel && !nivelesAlcanzados.has(nivel)) {
          nivelesAlcanzados.add(nivel);
          enviarEvento('profundidad_scroll', { porcentaje: nivel });
        }
      });
    };

    window.addEventListener('scroll', medirScroll, { passive: true });
    medirScroll();

    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener('scroll', medirScroll);
    };
  }, []);
}
