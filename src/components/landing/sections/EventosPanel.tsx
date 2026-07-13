'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { rastrearClicCta } from '@/lib/analytics/gtm';
import { EVENTO_BENEFITS } from '../data/content';
import { EVENTO_DYNAMICS } from '../data/dynamics';
import { EventosShowcaseCenter } from '../showcase/EventosShowcaseCenter';
import { ShowcaseFeatureStrip } from '../showcase/ShowcaseFeatureStrip';
import { ShowcaseLiveRanking } from '../showcase/ShowcaseLiveRanking';
import { CheckList } from '../ui/CheckList';

const INITIAL_YOUR_POINTS = 650;

function MobileDynamicsLink() {
  return (
    <Link
      href="#dinamicas"
      className="dok7-showcase-mobile-link"
      onClick={() => rastrearClicCta('Ver todas las dinámicas', 'showcase_eventos')}
    >
      Ver todas las dinámicas
    </Link>
  );
}

export function EventosPanel() {
  const [yourPoints, setYourPoints] = useState(INITIAL_YOUR_POINTS);
  const [boosted, setBoosted] = useState(false);

  const earnPoints = useCallback((points: number) => {
    if (points <= 0) return;
    setYourPoints((prev) => prev + points);
    setBoosted(true);
    window.setTimeout(() => setBoosted(false), 700);
  }, []);

  return (
    <div className="dok7-panel dok7-panel--eventos" style={{ border: '1px solid rgba(108,58,237,0.3)', borderRadius: '0 0 20px 20px' }}>
      <div className="dok7-panel-side" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
        <CheckList items={EVENTO_BENEFITS} />
        <ShowcaseFeatureStrip dynamics={EVENTO_DYNAMICS} />
        <MobileDynamicsLink />
      </div>

      <div className="dok7-panel-center dok7-panel-center--showcase">
        <EventosShowcaseCenter yourPoints={yourPoints} onEarnPoints={earnPoints} />
      </div>

      <div className="dok7-panel-side dok7-panel-side--widget" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
        <ShowcaseLiveRanking yourPoints={yourPoints} boosted={boosted} />
      </div>
    </div>
  );
}
