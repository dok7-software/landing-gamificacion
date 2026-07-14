type ParametrosEvento = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

/** Conversión Google Ads — disparar solo en /agradecimiento. */
export function enviarConversionLeadForm() {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: 'conversion_event_submit_lead_form',
  });

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion_event_submit_lead_form');
  }
}

/** Envía un evento personalizado al dataLayer de GTM. */
export function enviarEvento(evento: string, parametros?: ParametrosEvento) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: evento,
    ...parametros,
  });
}

export function rastrearClicCta(textoCta: string, ubicacionCta: string) {
  enviarEvento('clic_cta', {
    texto_cta: textoCta,
    ubicacion_cta: ubicacionCta,
  });
}

export function rastrearClicSalida(urlDestino: string, ubicacion: string) {
  enviarEvento('clic_salida', {
    url_destino: urlDestino,
    ubicacion,
  });
}

export function rastrearInteraccionDemo(
  pestaña: 'eventos' | 'campanas',
  accion: string,
  paso?: string,
) {
  enviarEvento('interaccion_demo', {
    pestaña,
    accion,
    ...(paso ? { paso } : {}),
  });
}
