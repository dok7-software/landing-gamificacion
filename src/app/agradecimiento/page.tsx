import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import '@/components/landing/landing.css';

export const metadata: Metadata = {
  title: 'Gracias por tu mensaje',
  description: 'Hemos recibido tu solicitud. Nos pondremos en contacto contigo pronto.',
};

export default function AgradecimientoPage() {
  return (
    <div
      className="dok7-landing dok7-agradecimiento"
      style={{ background: '#0b0b1a', fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <Link href="/" className="dok7-site-logo" aria-label="DOK7 — Volver al inicio">
        <Image
          src="/Logo-completo_blanco_sin-fondo.png"
          alt="DOK7"
          width={140}
          height={40}
          className="dok7-site-logo-img"
          priority
        />
      </Link>

      <main className="dok7-agradecimiento__main">
        <div className="dok7-form-success dok7-form-success--page">
          <div className="dok7-form-success__icon" aria-hidden="true">
            ✓
          </div>
          <h1 className="dok7-form-success__title">¡Gracias por tu interés!</h1>
          <p className="dok7-form-success__text">
            Hemos recibido tu solicitud. Nos pondremos en contacto contigo pronto.
          </p>
        </div>

        <Link href="/" className="dok7-agradecimiento__cta">
          Volver al inicio
        </Link>
      </main>
    </div>
  );
}
