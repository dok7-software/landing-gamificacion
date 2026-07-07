import Link from 'next/link';
import { EVENTO_BENEFITS, CAMPANA_BENEFITS } from '../data/content';
import { CAMPANA_DYNAMICS, EVENTO_DYNAMICS } from '../data/dynamics';
import { CalendarIcon, TargetIcon } from '../icons';
import { CampanasShowcaseCenter } from '../showcase/CampanasShowcaseCenter';
import { EventosShowcaseCenter } from '../showcase/EventosShowcaseCenter';
import { ShowcaseFeatureStrip } from '../showcase/ShowcaseFeatureStrip';
import { ShowcaseLiveRanking } from '../showcase/ShowcaseLiveRanking';
import { ShowcaseLiveStats } from '../showcase/ShowcaseLiveStats';
import { CheckList } from '../ui/CheckList';

function PanelHeader({ icon, title, subtitle, iconBg = 'rgba(108,58,237,0.2)' }: { icon: React.ReactNode; title: string; subtitle: string; iconBg?: string }) {
  return (
    <div className="dok7-panel-header">
      <div className="dok7-panel-header-icon" style={{ background: iconBg }}>
        {icon}
      </div>
      <div>
        <div className="dok7-panel-header-title">{title}</div>
        <div className="dok7-panel-header-sub">{subtitle}</div>
      </div>
    </div>
  );
}

function MobileDynamicsLink() {
  return (
    <Link href="#dinamicas" className="dok7-showcase-mobile-link">
      Ver todas las dinámicas →
    </Link>
  );
}

export function EventosPanel() {
  return (
    <div className="dok7-panel dok7-panel--eventos" style={{ border: '1px solid rgba(108,58,237,0.3)', borderRadius: '0 0 20px 20px' }}>
      <div className="dok7-panel-side" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
        <PanelHeader icon={<CalendarIcon size={26} color="#7c5cfc" />} title="EVENTOS" subtitle="Activa a quienes ya están dentro." />
        <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 28 }} />
        <CheckList items={EVENTO_BENEFITS} />
        <ShowcaseFeatureStrip dynamics={EVENTO_DYNAMICS} />
        <MobileDynamicsLink />
      </div>

      <div className="dok7-panel-center dok7-panel-center--showcase">
        <EventosShowcaseCenter />
      </div>

      <div className="dok7-panel-side dok7-panel-side--widget" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
        <ShowcaseLiveRanking />
      </div>
    </div>
  );
}

export function CampanasPanel() {
  return (
    <div className="dok7-panel dok7-panel--campanas" style={{ border: '1px solid rgba(30,64,175,0.35)', borderRadius: '0 0 20px 20px' }}>
      <div className="dok7-panel-side" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
        <PanelHeader
          icon={<TargetIcon size={26} color="#60a5fa" />}
          title="CAMPAÑAS"
          subtitle="Atrae, convierte y genera leads."
          iconBg="rgba(30,64,175,0.3)"
        />
        <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 28 }} />
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
