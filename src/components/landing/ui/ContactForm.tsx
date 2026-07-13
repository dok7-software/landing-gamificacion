'use client';

import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { enviarEvento } from '@/lib/analytics/gtm';
import { CONTACT_FORM_OPTIONS } from '../data/content';
import { LockIcon } from '../icons';
import { FormField, FormSelect, FormTextarea } from './FormFields';

interface ContactFormState {
  name: string;
  company: string;
  email: string;
  projectType: string;
  message: string;
}

const INITIAL_FORM: ContactFormState = {
  name: '',
  company: '',
  email: '',
  projectType: CONTACT_FORM_OPTIONS.projectType[0],
  message: '',
};

interface ContactFormProps {
  variant?: 'hero' | 'section';
}

export function ContactForm({ variant = 'section' }: ContactFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isHero = variant === 'hero';
  const formularioIniciado = useRef(false);

  const ubicacionFormulario = isHero ? 'hero' : 'seccion';

  const marcarFormularioIniciado = () => {
    if (formularioIniciado.current) return;
    formularioIniciado.current = true;
    enviarEvento('formulario_iniciado', { ubicacion_formulario: ubicacionFormulario });
  };

  const updateField = <K extends keyof ContactFormState>(field: K, value: ContactFormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        const mensajeError = data.error ?? 'No se pudo enviar el mensaje. Inténtalo de nuevo.';
        enviarEvento('formulario_error', {
          ubicacion_formulario: ubicacionFormulario,
          tipo_error: mensajeError,
        });
        setError(mensajeError);
        return;
      }

      enviarEvento('formulario_enviado', {
        ubicacion_formulario: ubicacionFormulario,
        tipo_proyecto: form.projectType,
      });
      router.push('/agradecimiento');
    } catch {
      enviarEvento('formulario_error', {
        ubicacion_formulario: ubicacionFormulario,
        tipo_error: 'error_conexion',
      });
      setError('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className={`dok7-form-card ${isHero ? 'dok7-hero-form-card' : ''}`}
      onSubmit={handleSubmit}
    >
      {isHero && (
        <div className="dok7-hero-form-card__glow" aria-hidden="true" />
      )}

      {isHero && (
        <div className="dok7-hero-form-card__header">
          <span className="dok7-hero-form-card__badge">Empieza aquí</span>
          <h2 className="dok7-hero-form-card__title">Cuéntanos tu proyecto</h2>
          <p className="dok7-hero-form-card__subtitle">
            Te respondemos con una propuesta adaptada a tu evento o campaña.
          </p>
        </div>
      )}

      <div className={`dok7-form-row ${isHero ? 'dok7-form-row--hero' : ''}`}>
        <FormField label="Nombre" placeholder="Ej.: Juan Pérez" value={form.name} onChange={(v) => updateField('name', v)} onFocus={marcarFormularioIniciado} required />
        <FormField label="Empresa" placeholder="Ej.: Tu empresa" value={form.company} onChange={(v) => updateField('company', v)} onFocus={marcarFormularioIniciado} />
      </div>
      <div className={`dok7-form-row ${isHero ? 'dok7-form-row--hero' : ''}`}>
        <FormField label="Email" placeholder="ejemplo@empresa.com" type="email" value={form.email} onChange={(v) => updateField('email', v)} onFocus={marcarFormularioIniciado} required />
        <FormSelect label="¿Qué quieres crear?" options={CONTACT_FORM_OPTIONS.projectType} value={form.projectType} onChange={(v) => updateField('projectType', v)} onFocus={marcarFormularioIniciado} />
      </div>
      <div className={isHero ? 'dok7-hero-form-message' : ''} style={isHero ? undefined : { marginBottom: 24 }}>
        <FormTextarea
          label="Mensaje"
          placeholder="Cuéntanos más sobre tu proyecto, audiencia y lo que quieres lograr..."
          value={form.message}
          onChange={(v) => updateField('message', v)}
          onFocus={marcarFormularioIniciado}
          maxLength={isHero ? 500 : 1000}
        />
      </div>
      {error && <p className="dok7-form-error">{error}</p>}
      <button type="submit" className="dok7-form-submit" disabled={submitting}>
        {submitting ? 'Enviando...' : 'Enviar'}
      </button>
      <div className="dok7-form-privacy">
        <LockIcon />
        <span>Tu información está segura. No compartimos tus datos.</span>
      </div>
    </form>
  );
}
