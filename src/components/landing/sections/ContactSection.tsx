'use client';

import { FormEvent, useState } from 'react';
import { CONTACT_FORM_OPTIONS } from '../data/content';
import { ArrowRightIcon, LockIcon } from '../icons';
import { FormField, FormSelect, FormTextarea } from '../ui/FormFields';

interface ContactFormState {
  name: string;
  company: string;
  email: string;
  projectType: string;
  objective: string;
  message: string;
}

const INITIAL_FORM: ContactFormState = {
  name: '',
  company: '',
  email: '',
  projectType: CONTACT_FORM_OPTIONS.projectType[0],
  objective: CONTACT_FORM_OPTIONS.objective[0],
  message: '',
};

export function ContactSection() {
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const updateField = <K extends keyof ContactFormState>(field: K, value: ContactFormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="dok7-section" style={{ background: '#0f1225' }}>
      <div className="dok7-contact-grid">
        <div style={{ paddingTop: 20 }}>
          <h2 className="dok7-contact-title" style={{ fontWeight: 800, lineHeight: 1.15, color: 'white', margin: '0 0 28px' }}>
            Convierte tu próximo <span style={{ color: '#7c5cfc' }}>evento o campaña</span> en una experiencia que tu audiencia quiera completar
          </h2>
          <div style={{ width: 48, height: 4, background: '#6c3aed', borderRadius: 2, marginBottom: 28 }} />
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, margin: 0 }}>
            Cuéntanos qué quieres activar, quién es tu público y qué resultado necesitas conseguir. Diseñaremos una dinámica gamificada adaptada a tu marca, canal y objetivo.
          </p>
        </div>

        <form
          className="dok7-form-card"
          onSubmit={handleSubmit}
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 36 }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'white', marginBottom: 12 }}>¡Gracias por tu interés!</div>
              <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.6 }}>
                Hemos recibido tu solicitud. Nos pondremos en contacto contigo pronto.
              </p>
            </div>
          ) : (
            <>
              <div className="dok7-form-row">
                <FormField label="Nombre" placeholder="Ej.: Juan Pérez" value={form.name} onChange={(v) => updateField('name', v)} required />
                <FormField label="Empresa" placeholder="Ej.: Tu empresa" value={form.company} onChange={(v) => updateField('company', v)} />
              </div>
              <div className="dok7-form-row">
                <FormField label="Email corporativo" placeholder="ejemplo@empresa.com" type="email" value={form.email} onChange={(v) => updateField('email', v)} required />
                <FormSelect label="¿Qué quieres crear?" options={CONTACT_FORM_OPTIONS.projectType} value={form.projectType} onChange={(v) => updateField('projectType', v)} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <FormSelect label="Objetivo principal" options={CONTACT_FORM_OPTIONS.objective} value={form.objective} onChange={(v) => updateField('objective', v)} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <FormTextarea
                  label="Mensaje"
                  placeholder="Cuéntanos más sobre tu proyecto, audiencia y lo que quieres lograr..."
                  value={form.message}
                  onChange={(v) => updateField('message', v)}
                />
              </div>
              <button
                type="submit"
                style={{ width: '100%', padding: 18, background: 'linear-gradient(135deg,#6c3aed,#7c5cfc)', border: 'none', borderRadius: 14, color: 'white', fontSize: 17, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
              >
                Solicitar propuesta
                <ArrowRightIcon />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 20 }}>
                <LockIcon />
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>Tu información está segura. No compartimos tus datos.</span>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
