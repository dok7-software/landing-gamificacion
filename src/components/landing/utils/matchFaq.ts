import { FAQ_ITEMS } from '../data/content';
import type { FaqItem } from '../types';

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function findFaqMatch(query: string): FaqItem | null {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return null;

  let bestMatch: FaqItem | null = null;
  let bestScore = 0;

  for (const faq of FAQ_ITEMS) {
    const normalizedQuestion = normalize(faq.question);
    let score = 0;

    if (normalizedQuestion === normalizedQuery) {
      return faq;
    }

    if (normalizedQuestion.includes(normalizedQuery) || normalizedQuery.includes(normalizedQuestion)) {
      score += 12;
    }

    const queryWords = normalizedQuery.split(' ').filter((word) => word.length > 2);
    for (const word of queryWords) {
      if (normalizedQuestion.includes(word)) score += 3;
      if (normalize(faq.answer).includes(word)) score += 1;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  }

  return bestScore >= 3 ? bestMatch : null;
}
