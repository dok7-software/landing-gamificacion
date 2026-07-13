import { ContactForm } from '../ui/ContactForm';

export function Hero() {
  return (
    <section id="contacto" className="dok7-section dok7-section--hero dok7-hero">
      <div className="dok7-hero-grid">
        <div className="dok7-hero-copy">
          <h1>
            <span className="dok7-hero-title-line">Convierte a tus espectadores en </span>
            <span className="dok7-hero-title-accent">participantes.</span>
          </h1>

          <p className="dok7-hero-description">
            Creamos experiencias gamificadas para activar asistentes en eventos y convertir campañas promocionales en oportunidades de captación.
          </p>
        </div>

        <div className="dok7-hero-form-wrap">
          <ContactForm variant="hero" />
        </div>
      </div>
    </section>
  );
}
