import { rastrearClicCta } from '@/lib/analytics/gtm';

export function ContactSection() {
  return (
    <section className="dok7-section dok7-section--contact-cta">
      <div className="dok7-contact-cta">
        <h2 className="dok7-contact-cta__title">
          ¿Listo para activar tu próximo <span>evento o campaña</span>?
        </h2>
        <p className="dok7-contact-cta__text">
          Diseñamos dinámicas gamificadas a medida: desde el concepto hasta la medición de resultados.
        </p>
        <a
          href="#contacto"
          className="dok7-contact-cta__link"
          onClick={() => rastrearClicCta('Volver al formulario', 'cta_contacto_final')}
        >
          Volver al formulario
        </a>
      </div>
    </section>
  );
}
