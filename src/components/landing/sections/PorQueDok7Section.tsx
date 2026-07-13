import { PORQUE_DOK7_STATS } from '../data/content';
import { SectionDivider } from '../ui/SectionTitle';

export function PorQueDok7Section() {
  return (
    <section id="por-que-dok7" className="dok7-section dok7-porque">
      <h2 className="dok7-porque-title">
        ¿Por qué <span>Dok7</span>?
      </h2>
      <SectionDivider />

      <div className="dok7-porque-intro">
        <p className="dok7-porque-lead">
          El partner tecnológico en el que las empresas confían para construir y escalar
        </p>
        <p className="dok7-porque-description">
          Diseñamos y desarrollamos soluciones digitales a medida, uniendo visión de negocio, criterio técnico y una ejecución clara en cada etapa.
        </p>
      </div>

      <div className="dok7-porque-stats">
        {PORQUE_DOK7_STATS.map((stat) => (
          <article key={stat.label} className="dok7-porque-stat">
            <strong className="dok7-porque-stat__value">{stat.value}</strong>
            <h3 className="dok7-porque-stat__label">{stat.label}</h3>
            <p className="dok7-porque-stat__description">{stat.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
