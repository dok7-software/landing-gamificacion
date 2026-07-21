type ParametrosEvento = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
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
