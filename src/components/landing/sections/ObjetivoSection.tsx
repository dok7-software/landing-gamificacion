import Image from 'next/image';
import { OBJETIVO_LEFT_BENEFITS, OBJETIVO_RIGHT_BENEFITS } from '../data/content';
import { LightbulbIcon } from '../icons';
import { BenefitCard } from '../ui/BenefitCard';
import { SectionDivider, SectionTitle } from '../ui/SectionTitle';

export function ObjetivoSection() {
  const [participacion, recuerdo] = OBJETIVO_LEFT_BENEFITS;
  const [leads, trafico, datos] = OBJETIVO_RIGHT_BENEFITS;

  return (
    <section id="objetivo" className="dok7-section" style={{ background: '#faf5ee' }}>
      <SectionTitle className="dok7-objetivo-title">Objetivo</SectionTitle>
      <SectionDivider />

      <div className="dok7-objetivo-visual">
        <Image
          src="/objetivo-illustration.png"
          alt="Ilustración de objetivo con líneas de conexión"
          width={1024}
          height={512}
          className="dok7-objetivo-illustration"
          priority
        />

        <div className="dok7-objetivo-card dok7-objetivo-card--left">
          <BenefitCard title={participacion.title} description={participacion.description} />
        </div>

        <div className="dok7-objetivo-card dok7-objetivo-card--top-right">
          <BenefitCard title={leads.title} description={leads.description} />
        </div>

        <div className="dok7-objetivo-card dok7-objetivo-card--mid-right">
          <BenefitCard title={trafico.title} description={trafico.description} />
        </div>

        <div className="dok7-objetivo-card dok7-objetivo-card--bot-right">
          <BenefitCard title={datos.title} description={datos.description} />
        </div>

        <div className="dok7-objetivo-card dok7-objetivo-card--bottom-center">
          <BenefitCard title={recuerdo.title} description={recuerdo.description} />
        </div>
      </div>

      <div className="dok7-objetivo-callout" style={{ border: '1px solid rgba(108,58,237,0.25)', borderRadius: 16, padding: '28px 36px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(108,58,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <LightbulbIcon />
        </div>
        <p style={{ margin: 0, fontSize: 18, color: '#0f172a', lineHeight: 1.6 }}>
          <strong>
            No se trata de <span style={{ color: '#6c3aed', textDecoration: 'underline' }}>añadir un juego por entretenimiento.</span>
          </strong>{' '}
          Se trata de diseñar una dinámica que lleve a tu audiencia hacia una acción concreta.
        </p>
      </div>
    </section>
  );
}
