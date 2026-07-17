type ParametrosEvento = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Conversión Google Ads — page view de /agradecimiento.
 *
 * El tag global de Google Ads (gtag.js, AW-18271571852) se carga en
 * src/app/layout.tsx, así que `window.gtag` existe en todo el sitio y esta
 * llamada dispara la conversión directamente hacia la cuenta de Google Ads,
 * sin depender de un trigger configurado en GTM. El push al dataLayer se
 * mantiene además como respaldo, por si en el futuro se quiere enganchar
 * también desde GTM (p. ej. para reenviar el evento a GA4).
 */
const EVENTO_CONVERSION_PAGE_VIEW = 'conversion_event_page_view_2';

export function enviarConversionPageViewAgradecimiento() {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: EVENTO_CONVERSION_PAGE_VIEW,
    page_path: '/agradecimiento',
  });

  if (typeof window.gtag === 'function') {
    window.gtag('event', EVENTO_CONVERSION_PAGE_VIEW, {
      page_path: '/agradecimiento',
    });
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
