export type TabId = 'eventos' | 'campanas';

export interface NavItem {
  label: string;
  href: string;
  tabId?: TabId;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type DynamicId =
  | 'pasaporte-qr'
  | 'misiones'
  | 'ranking'
  | 'trivia'
  | 'ruleta'
  | 'rasca-gana'
  | 'memoria'
  | 'calendario';

export interface DynamicItem {
  id: DynamicId;
  title: string;
  description: string;
  category: 'evento' | 'campana';
  accent: string;
  steps: string[];
}

export interface RankingItem {
  position: number;
  name: string;
  points: string;
  color: string;
}

export interface StatItem {
  label: string;
  value: string;
  change: string;
}

export interface FlowStep {
  title: string;
  subtitle: string;
}

export interface BenefitItem {
  title: string;
  description: string;
}
