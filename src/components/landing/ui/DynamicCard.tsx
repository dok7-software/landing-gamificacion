'use client';

import { useState } from 'react';
import type { DynamicItem } from '../types';
import { PlayIcon } from '../icons';
import { DynamicPreview } from '../dynamics/DynamicPreview';

interface DynamicCardProps {
  dynamic: DynamicItem;
  onOpen: (dynamic: DynamicItem) => void;
}

export function DynamicCard({ dynamic, onOpen }: DynamicCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="dok7-dynamic-card"
      style={{ borderColor: hovered ? `${dynamic.accent}66` : 'rgba(255,255,255,0.1)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(dynamic)}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(dynamic)}
      role="button"
      tabIndex={0}
      aria-label={`Ver demo de ${dynamic.title}`}
    >
      <div className="dok7-dynamic-card-preview" style={{ background: `linear-gradient(135deg, ${dynamic.accent}18, rgba(30,64,175,0.08))` }}>
        <DynamicPreview id={dynamic.id} accent={dynamic.accent} />
        <div className="dok7-dynamic-card-play" style={{ background: `${dynamic.accent}ee` }}>
          <PlayIcon />
        </div>
      </div>
      <div className="dok7-dynamic-card-body">
        <h3>{dynamic.title}</h3>
        <p>{dynamic.description}</p>
        <span className="dok7-dynamic-card-cta" style={{ color: dynamic.accent }}>
          <PlayIcon /> Ver demo
        </span>
      </div>
    </article>
  );
}
