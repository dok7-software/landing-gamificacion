'use client';

import { useEffect, useRef } from 'react';
import { enviarConversionPageViewAgradecimiento } from '@/lib/analytics/gtm';

export function AgradecimientoConversion() {
  const enviado = useRef(false);

  useEffect(() => {
    if (enviado.current) return;
    enviado.current = true;
    enviarConversionPageViewAgradecimiento();
  }, []);

  return null;
}
