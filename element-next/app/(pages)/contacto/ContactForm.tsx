'use client';

import { useActionState, useEffect, useRef, useCallback } from 'react';
import { submitContact, type ContactState } from './actions';
import { trackContactSubmitted } from '@/lib/analytics';

const SERVICES = [
  'Website',
  'Loja Online',
  'App Mobile',
  'SEO & Google',
  'Design & Branding',
  'Redesign',
  'Marketing Digital',
  'Outro',
];

function SuccessState() {
  return (
    <div className="ct-success">
      <div className="ct-success-ring" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div className="ct-success-content">
        <h2 className="ct-success-title">Mensagem recebida!</h2>
        <p className="ct-success-body">
          Respondemos em menos de 24&nbsp;horas com uma proposta
          personalizada e gratuita.
        </p>
        <a
          href="https://wa.me/351930477894?text=Ol%C3%A1!%20Gostaria%20de%20pedir%20um%20or%C3%A7amento."
          target="_blank"
          rel="noopener noreferrer"
          className="ct-success-wa"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
          </svg>
          Falar no WhatsApp
        </a>
      </div>
    </div>
  );
}

export function ContactForm() {
  const pendingDataRef = useRef<{ service: string; has_phone: boolean; has_message: boolean } | null>(null);
  const trackedRef = useRef(false);

  const wrappedAction = useCallback(
    async (prev: ContactState, fd: FormData): Promise<ContactState> => {
      pendingDataRef.current = {
        service: fd.get('service')?.toString() || '',
        has_phone: Boolean(fd.get('phone')?.toString()?.trim()),
        has_message: Boolean(fd.get('message')?.toString()?.trim()),
      };
      return submitContact(prev, fd);
    },
    [],
  );

  const [state, action, isPending] = useActionState<ContactState, FormData>(
    wrappedAction,
    null,
  );

  useEffect(() => {
    if (state?.ok && !trackedRef.current && pendingDataRef.current) {
      trackedRef.current = true;
      trackContactSubmitted(pendingDataRef.current);
    }
  }, [state]);

  if (state?.ok) return <SuccessState />;

  return (
    <form className="ct-form" action={action} noValidate>
      {/* Honeypot — invisible to humans, bots fill this in */}
      <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor="ct-website" aria-hidden="true">Website</label>
        <input id="ct-website" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      </div>

      {/* Form header */}
      <div className="ct-form-header">
        <span className="ct-form-eyebrow">Enviar mensagem</span>
        <h2 className="ct-form-title">Conta-nos<br />o teu projeto</h2>
      </div>

      {/* Name + Email */}
      <div className="ct-form-row">
        <div className="ct-field ct-field--float">
          <input
            className="ct-input"
            id="ct-name"
            name="name"
            type="text"
            placeholder=" "
            autoComplete="name"
            required
          />
          <label className="ct-label" htmlFor="ct-name">
            Nome <span className="ct-required" aria-label="obrigatório">*</span>
          </label>
        </div>
        <div className="ct-field ct-field--float">
          <input
            className="ct-input"
            id="ct-email"
            name="email"
            type="email"
            placeholder=" "
            autoComplete="email"
            required
          />
          <label className="ct-label" htmlFor="ct-email">
            Email <span className="ct-required" aria-label="obrigatório">*</span>
          </label>
        </div>
      </div>

      {/* Phone */}
      <div className="ct-field ct-field--float ct-field--half">
        <input
          className="ct-input"
          id="ct-phone"
          name="phone"
          type="tel"
          placeholder=" "
          autoComplete="tel"
        />
        <label className="ct-label" htmlFor="ct-phone">
          Telefone <span className="ct-optional">opcional</span>
        </label>
      </div>

      {/* Service pills */}
      <fieldset className="ct-service-fieldset">
        <legend className="ct-service-legend">
          Serviço de interesse <span className="ct-optional">opcional</span>
        </legend>
        <div className="ct-service-grid">
          {SERVICES.map((s) => (
            <label key={s} className="ct-service-pill">
              <input
                type="radio"
                name="service"
                value={s}
                className="ct-service-radio"
              />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Message */}
      <div className="ct-field ct-field--float">
        <textarea
          className="ct-textarea"
          id="ct-message"
          name="message"
          rows={4}
          placeholder=" "
        />
        <label className="ct-label ct-label--textarea" htmlFor="ct-message">
          Mensagem <span className="ct-optional">opcional</span>
        </label>
      </div>

      {/* Error */}
      {state && !state.ok && (
        <div className="ct-form-error" role="alert">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          {state.error}
        </div>
      )}

      {/* Submit */}
      <div className="ct-form-footer">
        <button
          type="submit"
          className="ct-submit"
          disabled={isPending}
          aria-busy={isPending}
        >
          {isPending ? (
            <>
              <span className="ct-spinner" aria-hidden="true" />
              A enviar…
            </>
          ) : (
            <>
              Enviar mensagem
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
        <p className="ct-form-privacy">
          Dados tratados de forma confidencial e nunca partilhados com terceiros.{' '}
          <a href="/politica-de-privacidade">Política de privacidade</a>.
        </p>
      </div>

    </form>
  );
}
