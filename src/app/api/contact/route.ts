import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';

const CONTACT_RECIPIENTS = [
  { email: 'diego.alarcon@dok7.io' },
  { email: 'grace.sanchez@dok7.io' },
  { email: 'stuart.cornelio@dok7.io' },
] as const;

const BREVO_SENDER = {
  name: 'DOK7 Landing',
  email: 'diego.alarcon@dok7.io',
} as const;

interface ContactPayload {
  name: string;
  company: string;
  email: string;
  projectType: string;
  message: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Servicio de correo no configurado.' }, { status: 500 });
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Datos inválidos.' }, { status: 400 });
  }

  const name = body.name?.trim() ?? '';
  const company = body.company?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const projectType = body.projectType?.trim() ?? '';
  const message = body.message?.trim() ?? '';

  if (!name || !email) {
    return NextResponse.json({ error: 'Nombre y email son obligatorios.' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Email inválido.' }, { status: 400 });
  }

  const htmlContent = `
    <h2>Nuevo contacto — Landing Gamificación</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
    <p><strong>Empresa:</strong> ${escapeHtml(company || '—')}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>¿Qué quieres crear?:</strong> ${escapeHtml(projectType || '—')}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${escapeHtml(message || '—').replace(/\n/g, '<br>')}</p>
  `;

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { name: BREVO_SENDER.name, email: BREVO_SENDER.email },
        to: [...CONTACT_RECIPIENTS],
        replyTo: { email, name },
        subject: `Nuevo contacto: ${name}${company ? ` (${company})` : ''}`,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Brevo API error:', errorText);
      return NextResponse.json({ error: 'No se pudo enviar el mensaje. Inténtalo de nuevo.' }, { status: 502 });
    }

    const leadId = randomUUID();

    return NextResponse.json(
      {
        success: true,
        leadId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Error de conexión. Inténtalo de nuevo.' }, { status: 500 });
  }
}
