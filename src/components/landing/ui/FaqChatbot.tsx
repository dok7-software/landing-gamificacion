'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { FAQ_ITEMS } from '../data/content';
import { CloseIcon } from '../icons';
import { findFaqMatch } from '../utils/matchFaq';

interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
}

interface FaqChatbotProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WELCOME_MESSAGE =
  '¡Hola! Soy el asistente de DOK7. Puedo resolver tus dudas sobre gamificación para eventos y campañas. Elige una pregunta o escríbela con tus palabras.';

const FALLBACK_MESSAGE =
  'No encontré una respuesta exacta para eso. Prueba con otra pregunta o cuéntanos tu caso en el formulario de contacto.';

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function ChatBubbleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

export function FaqChatbot({ open, onOpenChange }: FaqChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'bot', text: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    const container = messagesContainerRef.current;
    if (!container) return;

    container.scrollTop = 0;
  }, [open]);

  useEffect(() => {
    if (!open || messages.length <= 1) return;

    const container = messagesContainerRef.current;
    if (!container) return;

    container.scrollTop = container.scrollHeight;
  }, [messages, isTyping, open]);

  useEffect(() => {
    if (open) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 200);
      return () => window.clearTimeout(timer);
    }
  }, [open]);

  const respond = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { id: createId(), role: 'user', text: trimmed },
    ]);
    setInput('');
    setIsTyping(true);

    window.setTimeout(() => {
      const match = findFaqMatch(trimmed);
      const answer = match?.answer ?? FALLBACK_MESSAGE;

      setMessages((current) => [
        ...current,
        { id: createId(), role: 'bot', text: answer },
      ]);
      setIsTyping(false);
    }, 450);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    respond(input);
  };

  const showSuggestions = messages.length === 1 && !isTyping;

  return (
    <div className="dok7-faq-chat">
      {open && (
        <div className="dok7-faq-chat-panel" role="dialog" aria-label="Asistente de preguntas frecuentes">
          <header className="dok7-faq-chat-header">
            <div>
              <strong>Asistente DOK7</strong>
              <span>Preguntas frecuentes</span>
            </div>
            <button
              type="button"
              className="dok7-faq-chat-close"
              onClick={() => onOpenChange(false)}
              aria-label="Cerrar chat"
            >
              <CloseIcon />
            </button>
          </header>

          <div className="dok7-faq-chat-messages" ref={messagesContainerRef}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`dok7-faq-chat-message dok7-faq-chat-message--${message.role}`}
              >
                {message.text}
              </div>
            ))}

            {isTyping && (
              <div className="dok7-faq-chat-message dok7-faq-chat-message--bot dok7-faq-chat-typing" aria-live="polite">
                <span />
                <span />
                <span />
              </div>
            )}

            {showSuggestions && (
              <div className="dok7-faq-chat-suggestions">
                {FAQ_ITEMS.map((faq) => (
                  <button
                    key={faq.question}
                    type="button"
                    className="dok7-faq-chat-suggestion"
                    onClick={() => respond(faq.question)}
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            )}

          </div>

          <form className="dok7-faq-chat-form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Escribe tu pregunta..."
              aria-label="Escribe tu pregunta"
              disabled={isTyping}
            />
            <button type="submit" aria-label="Enviar pregunta" disabled={!input.trim() || isTyping}>
              <SendIcon />
            </button>
          </form>

          <p className="dok7-faq-chat-footer">
            ¿Necesitas algo más personalizado?{' '}
            <a href="#contacto" onClick={() => onOpenChange(false)}>
              Contáctanos
            </a>
          </p>
        </div>
      )}

      <button
        type="button"
        className={`dok7-faq-chat-toggle${open ? ' dok7-faq-chat-toggle--open' : ''}`}
        onClick={() => onOpenChange(!open)}
        aria-label={open ? 'Cerrar asistente de FAQ' : 'Abrir asistente de FAQ'}
        aria-expanded={open}
      >
        {open ? <CloseIcon /> : <ChatBubbleIcon />}
      </button>
    </div>
  );
}
