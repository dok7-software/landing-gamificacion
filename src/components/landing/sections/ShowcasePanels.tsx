import Link from 'next/link';
import { CAMPANA_BENEFITS } from '../data/content';
import { CAMPANA_DYNAMICS } from '../data/dynamics';
import { CampanasShowcaseCenter } from '../showcase/CampanasShowcaseCenter';
import { ShowcaseFeatureStrip } from '../showcase/ShowcaseFeatureStrip';
import { ShowcaseLiveStats } from '../showcase/ShowcaseLiveStats';
import { CheckList } from '../ui/CheckList';

function MobileDynamicsLink() {
  return (
    <Link href="#dinamicas" className="dok7-showcase-mobile-link">
      Ver todas las dinámicas
    </Link>
  );
}

export function CampanasPanel() {
  return (
    <div className="dok7-panel dok7-panel--campanas" style={{ border: '1px solid rgba(30,64,175,0.35)', borderRadius: '0 0 20px 20px' }}>
      <div className="dok7-panel-side" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
        <CheckList items={CAMPANA_BENEFITS} />
        <ShowcaseFeatureStrip dynamics={CAMPANA_DYNAMICS} />
        <MobileDynamicsLink />
      </div>

      <div className="dok7-panel-center dok7-panel-center--showcase">
        <CampanasShowcaseCenter />
      </div>

      <div className="dok7-panel-side dok7-panel-side--widget" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
        <ShowcaseLiveStats />
      </div>
    </div>
  );
}
