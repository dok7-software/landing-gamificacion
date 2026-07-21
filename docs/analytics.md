# Contrato de analítica

Este proyecto usa **únicamente Google Tag Manager (`GTM-MXLZ2Z94`)** como punto de entrada
hacia Google Analytics 4 y Google Ads. Next.js nunca carga `gtag.js` directamente ni conoce
el Conversion ID / Conversion Label de Google Ads: esa configuración vive exclusivamente en GTM.

Todos los eventos se envían mediante `window.dataLayer.push(...)` a través del wrapper
`enviarEvento()` en `src/lib/analytics/gtm.ts`.

## Evento de conversión: `lead_success`

```ts
{
  event: "lead_success",
  lead_id: string,          // igual a transaction_id
  transaction_id: string,   // ID único del lead, usado como transacción de Google Ads
  ubicacion_formulario: "hero" | "seccion",
  tipo_proyecto: string,
}
```

### Reglas

- Se emite **una sola vez**, exclusivamente desde `AgradecimientoConversion.tsx`, montado en
  `/agradecimiento`.
- Solo se emite si existe una conversión pendiente válida en `sessionStorage`
  (clave `dok7_pending_lead_conversion`), guardada por `ContactForm.tsx` **después** de que
  `/api/contact` confirme un envío exitoso (Brevo procesó el correo y devolvió un `leadId`).
- El dato pendiente se elimina de `sessionStorage` en el mismo momento en que se lee, antes de
  validarlo. Esto evita una segunda emisión por:
  - Entrar directamente a `/agradecimiento` sin haber enviado el formulario.
  - Recargar `/agradecimiento` después de una conversión ya emitida.
  - Un doble montaje del componente por React Strict Mode.
  - Volver atrás y volver a entrar a la página.
- La conversión pendiente caduca a los **30 minutos**; si el usuario tarda más en llegar a
  `/agradecimiento`, no se emite `lead_success`.
- `transaction_id` debe configurarse en GTM como el ID de transacción de la conversión de
  Google Ads (deduplicación).
- GTM debe transformar `lead_success` en el evento `generate_lead` de GA4.
- **No** se debe volver a crear una conversión basada únicamente en la URL `/agradecimiento`
  (visitas o recargas no son conversiones).
- **No** se envían datos personales (nombre, email, empresa, teléfono, mensaje) en este ni en
  ningún otro evento del `dataLayer`.
- La conversión de Google Ads (Conversion ID + Conversion Label) se configura en GTM, nunca en
  el código de este proyecto.

## Otros eventos existentes (sin cambios de nombre)

| Evento | Origen | Cuándo se dispara |
| --- | --- | --- |
| `formulario_iniciado` | `ContactForm.tsx` | Al enfocar por primera vez cualquier campo del formulario. |
| `formulario_enviado` | `ContactForm.tsx` | Tras una respuesta exitosa de `/api/contact` con `leadId` válido. Evento analítico general, **no** es la conversión de Ads. |
| `formulario_error` | `ContactForm.tsx` | Si `/api/contact` falla, la respuesta no trae `leadId` válido, o hay un error de conexión. |
| `clic_cta` | Varias secciones | Al hacer clic en un CTA. |
| `clic_salida` | Varias secciones | Al hacer clic en un enlace de salida. |
| `interaccion_demo` | Showcase (demo interactiva) | Al interactuar con las pestañas/demos de Eventos o Campañas. |
| `seccion_vista` | `useLandingAnalytics.ts` | Cuando una sección de la landing entra al menos un 50% en el viewport (una vez por sección). |
| `profundidad_scroll` | `useLandingAnalytics.ts` | Al alcanzar los niveles de scroll 25%, 50%, 75% y 100% (una vez cada uno). |

## Configuración pendiente en Google Tag Manager

1. **Variable de dataLayer**: crear una variable que lea `transaction_id` del evento `lead_success`.
2. **Trigger personalizado**: evento personalizado `lead_success`.
3. **Tag GA4 – Evento**: `generate_lead`, disparado por el trigger anterior, mapeando
   `lead_id` / `transaction_id` / `ubicacion_formulario` / `tipo_proyecto` como parámetros del evento.
4. **Tag de conversión de Google Ads**: tipo "Seguimiento de conversiones", con el Conversion ID
   y Conversion Label de la acción "Enviar formulario", usando la variable `transaction_id` como
   ID de transacción para deduplicar conversiones.
5. Publicar el contenedor `GTM-MXLZ2Z94` tras configurar lo anterior.
