declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(args);
}

// ── Core event dispatcher ──────────────────────────────────────────────────
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, params ?? {});
}

// ── Conversion events ──────────────────────────────────────────────────────

/** Formulário de contacto submetido com sucesso */
export function trackContactSubmitted(opts: {
  service?: string;
  has_phone: boolean;
  has_message: boolean;
}) {
  trackEvent('contact_submitted', {
    service: opts.service || 'nenhum',
    has_phone: opts.has_phone,
    has_message: opts.has_message,
  });
}

/** Candidatura a parceiro submetida com sucesso */
export function trackParceriaSubmitted(opts: {
  profile?: string;
  volume?: string;
}) {
  trackEvent('parceria_submitted', {
    profile: opts.profile || 'nenhum',
    volume: opts.volume || 'nenhum',
  });
}

/** Lead magnet descarregado com sucesso */
export function trackLeadMagnetDownloaded(opts: {
  resource_slug: string;
  resource_title: string;
}) {
  trackEvent('lead_magnet_downloaded', {
    resource_slug: opts.resource_slug,
    resource_title: opts.resource_title,
  });
}

// ── Engagement events ──────────────────────────────────────────────────────

/** CTA clicado (botões de proposta, WhatsApp, etc.) */
export function trackCtaClicked(opts: {
  button_text: string;
  location: string;
}) {
  trackEvent('cta_clicked', {
    button_text: opts.button_text,
    location: opts.location,
  });
}

export { gtag };
