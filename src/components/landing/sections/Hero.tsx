import { ContactForm } from '../ui/ContactForm';
import { SiteLogo } from '../ui/SiteLogo';

export function Hero() {
  return (
    <section id="contacto" className="dok7-section dok7-section--hero dok7-hero">
      <SiteLogo />
      <div className="dok7-hero-grid">
        <div className="dok7-hero-copy">
          <h1>
            <span className="dok7-hero-title-line">Convierte a tus espectadores en </span>
            <span className="dok7-hero-title-accent">participantes.</span>
          </h1>

          <p className="dok7-hero-description">
            ¿Tu evento reúne asistentes, pero no consigue que participen? ¿Tus campañas generan tráfico, pero no captan suficientes leads? Cuéntanos tu proyecto y descubre cómo aumentar la participación y captar más leads.
          </p>
        </div>

        <div className="dok7-hero-form-wrap">
          <ContactForm variant="hero" />
        </div>
      </div>
    </section>
  );
}
