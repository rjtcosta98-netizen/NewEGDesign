'use client';

import { useActionState } from 'react';
import { submitContact, type ContactState } from './actions';

const SERVICES = [
  'Criação de Website',
  'Loja Online',
  'App Mobile',
  'Negócio Local (SEO + Google)',
  'Design & Branding',
  'Redesign de Website',
  'Marketing Digital',
  'Outro / Ainda não sei',
];

function SuccessState() {
  return (
    <div className="ct-success">
      <div className="ct-success-icon" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 className="ct-success-title">Mensagem recebida!</h2>
      <p className="ct-success-body">
        Recebemos o teu pedido. Respondemos em menos de 24&nbsp;horas
        com uma proposta personalizada e gratuita.
      </p>
      <p className="ct-success-alt">
        Precisas de resposta mais rápida?{' '}
        <a
          href="https://wa.me/351930477894?text=Ol%C3%A1!%20Gostaria%20de%20pedir%20um%20or%C3%A7amento."
          target="_blank"
          rel="noopener noreferrer"
        >
          Fala connosco no WhatsApp
        </a>
        .
      </p>
    </div>
  );
}

export function ContactForm() {
  const [state, action, isPending] = useActionState<ContactState, FormData>(
    submitContact,
    null,
  );

  if (state?.ok) return <SuccessState />;

  return (
    <form className="ct-form" action={action} noValidate>
      <div className="ct-form-section-label">Envia-nos uma mensagem</div>

      <div className="ct-form-row ct-form-row--2">
        <div className="ct-field">
          <label className="ct-label" htmlFor="ct-name">
            Nome <span className="ct-required" aria-label="obrigatório">*</span>
          </label>
          <input
            className="ct-input"
            id="ct-name"
            name="name"
            type="text"
            placeholder="O teu nome"
            autoComplete="name"
            required
          />
        </div>
        <div className="ct-field">
          <label className="ct-label" htmlFor="ct-email">
            Email <span className="ct-required" aria-label="obrigatório">*</span>
          </label>
          <input
            className="ct-input"
            id="ct-email"
            name="email"
            type="email"
            placeholder="teu@email.com"
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div className="ct-form-row ct-form-row--2">
        <div className="ct-field">
          <label className="ct-label" htmlFor="ct-phone">
            Telefone{' '}
            <span className="ct-optional">opcional</span>
          </label>
          <input
            className="ct-input"
            id="ct-phone"
            name="phone"
            type="tel"
            placeholder="+351 900 000 000"
            autoComplete="tel"
          />
        </div>
        <div className="ct-field">
          <label className="ct-label" htmlFor="ct-service">
            Serviço de interesse{' '}
            <span className="ct-optional">opcional</span>
          </label>
          <div className="ct-select-wrap">
            <select className="ct-select" id="ct-service" name="service">
              <option value="">Selecionar...</option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <svg
              className="ct-select-arrow"
              width="14" height="14"
              viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      <div className="ct-field">
        <label className="ct-label" htmlFor="ct-message">
          Mensagem{' '}
          <span className="ct-optional">opcional</span>
        </label>
        <textarea
          className="ct-textarea"
          id="ct-message"
          name="message"
          rows={5}
          placeholder="Descreve o teu projeto, prazo ou qualquer dúvida..."
        />
      </div>

      {state && !state.ok && (
        <div className="ct-form-error" role="alert">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          {state.error}
        </div>
      )}

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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
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
