import type {
  BenefitItem,
  FaqItem,
  FlowStep,
  NavItem,
  RankingItem,
  StatItem,
} from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Eventos', href: '#showcase', tabId: 'eventos' },
  { label: 'Campañas', href: '#showcase', tabId: 'campanas' },
  { label: 'Dinámicas', href: '#dinamicas' },
  { label: 'Cómo funciona', href: '#objetivo' },
  { label: 'FAQ', href: '#faq' },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: '¿Los usuarios necesitan descargar una app?',
    answer: 'Nuestras dinámicas funcionan desde el navegador del móvil. Sin embargo, si tu objetivo es crear una app o ya tienes una, podemos desarrollarlo.',
  },
  {
    question: '¿Qué diferencia hay entre gamificación para eventos y campañas?',
    answer: 'En eventos activamos a personas que ya están dentro de la experiencia. En campañas usamos la dinámica para atraer, captar y convertir audiencia.',
  },
  {
    question: '¿Se puede usar en eventos presenciales?',
    answer: 'Sí. Creamos recorridos con QR, NFC, pasaportes digitales, retos, rankings, trivias y más, todo desde el móvil.',
  },
  {
    question: '¿Se puede conectar con nuestro CRM?',
    answer: 'Sí. Integramos con herramientas como HubSpot, Salesforce, Brevo, Mailchimp y muchas más, o mediante API.',
  },
  {
    question: '¿Qué tipo de resultados se pueden medir?',
    answer: 'Participación, leads captados, juegos completados, visitas a stands, respuestas, permisos entregados, recurrencia y mucho más.',
  },
  {
    question: '¿Podemos reutilizar la solución?',
    answer: 'Sí. Puedes reutilizar la misma experiencia en distintos eventos o campañas, adaptando contenidos, reglas, premios y diseño sin empezar desde cero.',
  },
];


export const RANKING_DATA: RankingItem[] = [
  { position: 1, name: 'Laura M.', points: '1250 pts', color: '#ef4444' },
  { position: 2, name: 'Equipo Alpha', points: '980 pts', color: '#f97316' },
  { position: 3, name: 'Jorge R.', points: '870 pts', color: '#eab308' },
];

export const STATS_DATA: StatItem[] = [
  { label: 'Leads captados', value: '1,248', change: '+24%' },
  { label: 'Tasa de conversión', value: '18.6%', change: '+12%' },
  { label: 'Premios entregados', value: '532', change: '+8%' },
  { label: 'ROI de campaña', value: '3.4x', change: '+16%' },
];

export const FLOW_STEPS: FlowStep[] = [
  { title: 'Anuncio', subtitle: 'Atrae tu audiencia' },
  { title: 'Juego', subtitle: 'Interactúan y participan' },
  { title: 'Registro', subtitle: 'Dejan sus datos' },
  { title: 'Incentivo', subtitle: 'Reciben su premio' },
];

export const EVENTO_BENEFITS = [
  'Aumenta la participación',
  'Dirige recorridos y visitas',
  'Mide, comprende y actúa',
];

export const CAMPANA_BENEFITS = [
  'Atrae más audiencia cualificada',
  'Convierte con experiencias únicas',
  'Captura leads y genera oportunidades',
  'Mide resultados en tiempo real',
];

export const OBJETIVO_LEFT_BENEFITS: BenefitItem[] = [
  { title: 'Más participación', description: 'Asistentes o usuarios completan acciones dentro de la experiencia.' },
  { title: 'Más recuerdo de marca', description: 'Una experiencia interactiva tiene una alta tasa de recuerdo.' },
];

export const OBJETIVO_RIGHT_BENEFITS: BenefitItem[] = [
  { title: 'Más leads', description: 'El registro se integra de forma natural dentro de la dinámica.' },
  { title: 'Más tráfico', description: 'Dirige a las personas hacia stands, productos, contenidos o páginas clave.' },
  { title: 'Más datos útiles', description: 'Recoge intereses, preferencias y comportamiento.' },
];

export const CONTACT_FORM_OPTIONS = {
  projectType: ['Selecciona una opción', 'Evento', 'Campaña', 'Otro'],
};
