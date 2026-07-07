import type { DynamicItem } from '../types';

export const EVENTO_DYNAMICS: DynamicItem[] = [
  {
    id: 'pasaporte-qr',
    title: 'Pasaporte digital con QR',
    description: 'Escanea, acumula sellos y desbloquea recompensas exclusivas.',
    category: 'evento',
    accent: '#7c5cfc',
    steps: ['Escanea el QR del stand', 'Acumula sellos en tu pasaporte', 'Desbloquea recompensas'],
  },
  {
    id: 'misiones',
    title: 'Misiones y retos',
    description: 'Completa desafíos, suma puntos y consigue grandes premios.',
    category: 'evento',
    accent: '#60a5fa',
    steps: ['Recibe una misión', 'Completa la acción', 'Gana puntos y premios'],
  },
  {
    id: 'ranking',
    title: 'Ranking en vivo',
    description: 'Compite en tiempo real y sube posiciones en el ranking del evento.',
    category: 'evento',
    accent: '#f97316',
    steps: ['Participa en dinámicas', 'Suma puntos en vivo', 'Sube en el ranking'],
  },
  {
    id: 'trivia',
    title: 'Trivia para asistentes',
    description: 'Pon a prueba tus conocimientos y gana puntos al responder.',
    category: 'evento',
    accent: '#a78bfa',
    steps: ['Responde preguntas', 'Acumula aciertos', 'Gana puntos extra'],
  },
];

export const CAMPANA_DYNAMICS: DynamicItem[] = [
  {
    id: 'ruleta',
    title: 'Ruleta de premios',
    description: 'Gira la ruleta y gana premios al instante.',
    category: 'campana',
    accent: '#fbbf24',
    steps: ['Gira la ruleta', 'Descubre tu premio', 'Canjéalo al instante'],
  },
  {
    id: 'rasca-gana',
    title: 'Rasca y gana digital',
    description: 'Rasca y descubre premios, descuentos y beneficios exclusivos.',
    category: 'campana',
    accent: '#34d399',
    steps: ['Rasca la tarjeta', 'Revela tu premio', 'Actívalo con un clic'],
  },
  {
    id: 'memoria',
    title: 'Juego de memoria',
    description: 'Encuentra los pares en el menor tiempo posible y gana.',
    category: 'campana',
    accent: '#f472b6',
    steps: ['Voltea las cartas', 'Encuentra los pares', 'Mejora tu tiempo'],
  },
  {
    id: 'calendario',
    title: 'Calendario de premios',
    description: 'Participa cada día y descubre premios sorpresa.',
    category: 'campana',
    accent: '#38bdf8',
    steps: ['Abre el día actual', 'Participa en segundos', 'Descubre premios diarios'],
  },
];

export const ALL_DYNAMICS = [...EVENTO_DYNAMICS, ...CAMPANA_DYNAMICS];
