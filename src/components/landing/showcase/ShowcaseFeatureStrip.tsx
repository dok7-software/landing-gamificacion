'use client';

import Link from 'next/link';
import { rastrearClicCta } from '@/lib/analytics/gtm';
import type { DynamicItem } from '../types';
import { DynamicPreview } from '../dynamics/DynamicPreview';

interface ShowcaseFeatureStripProps {
  dynamics: DynamicItem[];
}

export function ShowcaseFeatureStrip({ dynamics }: ShowcaseFeatureStripProps) {
  return (
    <div className="dok7-showcase-features">
      <p className="dok7-showcase-features-label">Dinámicas disponibles</p>
      <div className="dok7-showcase-features-grid">
        {dynamics.map((item) => (
          <Link
            key={item.id}
            href="#dinamicas"
            className="dok7-showcase-feature-chip"
            style={{ '--chip-accent': item.accent } as React.CSSProperties}
            onClick={() => rastrearClicCta(item.title, 'showcase_features')}
          >
            <div className="dok7-showcase-feature-preview">
              <DynamicPreview id={item.id} accent={item.accent} />
            </div>
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
