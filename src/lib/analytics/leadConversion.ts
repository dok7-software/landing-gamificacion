const PENDING_LEAD_CONVERSION_KEY = 'dok7_pending_lead_conversion';
const PENDING_LEAD_CONVERSION_TTL_MS = 30 * 60 * 1000; // 30 minutos

export type UbicacionFormulario = 'hero' | 'seccion';

export type PendingLeadConversion = {
  leadId: string;
  ubicacionFormulario: UbicacionFormulario;
  tipoProyecto: string;
  createdAt: number;
};

function esNavegador(): boolean {
  return typeof window !== 'undefined';
}

function esUbicacionFormularioValida(valor: unknown): valor is UbicacionFormulario {
  return valor === 'hero' || valor === 'seccion';
}

function esPendingLeadConversionValida(valor: unknown): valor is PendingLeadConversion {
  if (!valor || typeof valor !== 'object') return false;

  const candidato = valor as Record<string, unknown>;

  return (
    typeof candidato.leadId === 'string' &&
    candidato.leadId.trim().length > 0 &&
    esUbicacionFormularioValida(candidato.ubicacionFormulario) &&
    typeof candidato.tipoProyecto === 'string' &&
    typeof candidato.createdAt === 'number'
  );
}

/**
 * Guarda en sessionStorage la conversión de lead pendiente, para que
 * `/agradecimiento` la consuma una única vez tras la redirección.
 */
export function guardarConversionPendiente(conversion: PendingLeadConversion): void {
  if (!esNavegador()) return;
  if (!conversion.leadId || conversion.leadId.trim().length === 0) return;

  try {
    window.sessionStorage.setItem(PENDING_LEAD_CONVERSION_KEY, JSON.stringify(conversion));
  } catch {
    // sessionStorage puede fallar (modo privado, cuota agotada, etc.).
    // No es crítico para el flujo del formulario: el lead ya se envió por email.
  }
}

/**
 * Lee y elimina de sessionStorage la conversión de lead pendiente.
 *
 * La clave se elimina siempre justo después de leerla —incluso si el
 * contenido resulta inválido o caducado— para impedir que React Strict Mode,
 * un remontaje del componente o una recarga de /agradecimiento puedan
 * disparar una segunda conversión con el mismo dato.
 *
 * Devuelve `null` cuando no hay conversión pendiente, es inválida o caducó
 * (más de 30 minutos desde que se guardó).
 */
export function consumirConversionPendiente(): PendingLeadConversion | null {
  if (!esNavegador()) return null;

  let valorAlmacenado: string | null;
  try {
    valorAlmacenado = window.sessionStorage.getItem(PENDING_LEAD_CONVERSION_KEY);
  } catch {
    return null;
  }

  if (!valorAlmacenado) return null;

  try {
    window.sessionStorage.removeItem(PENDING_LEAD_CONVERSION_KEY);
  } catch {
    // Si no se puede eliminar seguimos validando; en el peor caso quedará
    // una entrada caducada que expirará sola a los 30 minutos.
  }

  let datos: unknown;
  try {
    datos = JSON.parse(valorAlmacenado);
  } catch {
    return null;
  }

  if (!esPendingLeadConversionValida(datos)) return null;

  const haCaducado = Date.now() - datos.createdAt > PENDING_LEAD_CONVERSION_TTL_MS;
  if (haCaducado) return null;

  return datos;
}
