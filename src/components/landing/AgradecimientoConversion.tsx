'use client';

import { useEffect, useRef } from 'react';
import { enviarEvento } from '@/lib/analytics/gtm';
import { consumirConversionPendiente } from '@/lib/analytics/leadConversion';

/**
 * Emite la conversión de lead ("lead_success") una única vez, solo cuando
 * hay una conversión pendiente válida en sessionStorage (guardada por
 * ContactForm.tsx tras un envío exitoso a /api/contact).
 *
 * Entrar directamente a /agradecimiento, recargar la página o un doble
 * montaje por React Strict Mode NO generan una conversión, porque el dato
 * pendiente se elimina de sessionStorage en el mismo momento en que se lee.
 */
export function AgradecimientoConversion() {
  const enviado = useRef(false);

  useEffect(() => {
    if (enviado.current) return;
    enviado.current = true;

    const conversion = consumirConversionPendiente();
    if (!conversion) return;

    enviarEvento('lead_success', {
      lead_id: conversion.leadId,
      transaction_id: conversion.leadId,
      ubicacion_formulario: conversion.ubicacionFormulario,
      tipo_proyecto: conversion.tipoProyecto,
    });
  }, []);

  return null;
}
