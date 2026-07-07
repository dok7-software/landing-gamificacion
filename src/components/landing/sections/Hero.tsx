import { MonitorIcon } from '../icons';

export function Hero() {
  return (
    <section className="dok7-section dok7-section--hero dok7-hero">
      <div
        className="dok7-hero-badge"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          border: '1px solid rgba(108,58,237,0.5)',
          borderRadius: 28,
          padding: '10px 22px 10px 16px',
          marginBottom: 40,
        }}
      >
        <MonitorIcon />
        <span style={{ color: '#7c5cfc', fontSize: 13, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase' }}>
          Gamificación para eventos y campañas
        </span>
      </div>

      <h1 style={{ fontWeight: 800, lineHeight: 1.05, margin: '0 0 28px', maxWidth: 900 }}>
        <span style={{ color: 'white' }}>Tu audiencia ya está mirando.</span>
        <br />
        <span style={{ color: '#7c5cfc' }}>Haz que participe.</span>
      </h1>

      <p style={{ fontSize: 18, lineHeight: 1.65, color: 'rgba(255,255,255,0.5)', maxWidth: 580, margin: '0 0 50px' }}>
        Creamos experiencias gamificadas para activar asistentes en eventos y convertir campañas promocionales en oportunidades de captación.
      </p>
    </section>
  );
}
