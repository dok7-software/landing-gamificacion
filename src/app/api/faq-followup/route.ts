import { NextResponse } from 'next/server';

const FAQ_FOLLOWUP_RECIPIENT = { email: 'diego.alarcon@dok7.io' } as const;

const BREVO_SENDER = {
  name: 'DOK7 Landing',
  email: 'diego.alarcon@dok7.io',
} as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FaqFollowupPayload {
  email: string;
  question: string;
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

  let body: FaqFollowupPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Datos inválidos.' }, { status: 400 });
  }

  const email = body.email?.trim() ?? '';
  const question = body.question?.trim() ?? '';

  if (!email || !question) {
    return NextResponse.json({ error: 'Email y pregunta son obligatorios.' }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Email inválido.' }, { status: 400 });
  }

  const htmlContent = `
    <h2>Pregunta sin respuesta — Chatbot FAQ</h2>
    <p><strong>Email de contacto:</strong> ${escapeHtml(email)}</p>
    <p><strong>Pregunta:</strong></p>
    <p>${escapeHtml(question).replace(/\n/g, '<br>')}</p>
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
        to: [FAQ_FOLLOWUP_RECIPIENT],
        replyTo: { email, name: email },
        subject: `FAQ sin respuesta: ${question.slice(0, 60)}${question.length > 60 ? '…' : ''}`,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Brevo API error:', errorText);
      return NextResponse.json({ error: 'No se pudo enviar el mensaje. Inténtalo de nuevo.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('FAQ follow-up error:', error);
    return NextResponse.json({ error: 'Error de conexión. Inténtalo de nuevo.' }, { status: 500 });
  }
}
