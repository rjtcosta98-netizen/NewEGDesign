'use client';

import { useActionState, useEffect, useRef, useCallback } from 'react';
import { submitParcerias, type ParceriasState } from './actions';
import { trackParceriaSubmitted } from '@/lib/analytics';

const PROFILES = [
  'Contabilista / TOC',
  'Advogado / Solicitador',
  'Consultor de Negócios',
  'Designer / Criativo',
  'Gestor de Redes Sociais',
  'Fotógrafo / Videógrafo',
  'Agente Imobiliário',
  'Comercial / Vendedor',
  'Empreendedor / Empresário',
  'Outro',
];

const VOLUMES = [
  '1–2 clientes por ano',
  '3–5 clientes por ano',
  '6–10 clientes por ano',
  'Mais de 10 por ano',
  'Ainda não sei',
];

function SuccessState() {
  return (
    <div className="par-form-success">
      <div className="par-success-ring">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        <h3 className="par-success-title">Candidatura enviada!</h3>
        <p className="par-success-body">
          Vamos analisar o teu perfil e entrar em contacto nas próximas 24–48 horas com todos os detalhes.
        </p>
        <a
          href="https://wa.me/351930477894?text=Ol%C3%A1!%20Candidatei-me%20ao%20Programa%20de%20Parceiros%20da%20Element%20Group."
          target="_blank"
          rel="noopener noreferrer"
          className="par-success-wa"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
          </svg>
          Ou fala diretamente no WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function ParceriasForm() {
  const pendingDataRef = useRef<{ profile: string; volume: string } | null>(null);
  const trackedRef = useRef(false);

  const wrappedAction = useCallback(
    async (prev: ParceriasState, fd: FormData): Promise<ParceriasState> => {
      pendingDataRef.current = {
        profile: fd.get('profile')?.toString() || '',
        volume: fd.get('volume')?.toString() || '',
      };
      return submitParcerias(prev, fd);
    },
    [],
  );

  const [state, action, isPending] = useActionState<ParceriasState, FormData>(
    wrappedAction,
    null,
  );

  useEffect(() => {
    if (state?.ok && !trackedRef.current && pendingDataRef.current) {
      trackedRef.current = true;
      trackParceriaSubmitted(pendingDataRef.current);
    }
  }, [state]);

  if (state?.ok) return <SuccessState />;

  return (
    <form id="candidatura" className="par-form" action={action} noValidate>
      {/* Honeypot — invisible to humans, bots fill this in */}
      <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor="par-website" aria-hidden="true">Website</label>
        <input id="par-website" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      </div>

      <div className="par-form-header">
        <span className="par-form-eyebrow">Candidatura</span>
        <h2 className="par-form-title">Torna-te parceiro</h2>
        <p className="par-form-sub">Preenche o formulário e entramos em contacto em 24–48h.</p>
      </div>

      {/* Name + Email */}
      <div className="par-form-row">
        <div className="par-field par-field--float">
          <input
            className="par-input"
            id="par-name"
            name="name"
            type="text"
            placeholder=" "
            autoComplete="name"
            required
            disabled={isPending}
          />
          <label className="par-label" htmlFor="par-name">
            Nome completo <span className="par-required">*</span>
          </label>
        </div>
        <div className="par-field par-field--float">
          <input
            className="par-input"
            id="par-email"
            name="email"
            type="email"
            placeholder=" "
            autoComplete="email"
            required
            disabled={isPending}
          />
          <label className="par-label" htmlFor="par-email">
            Email <span className="par-required">*</span>
          </label>
        </div>
      </div>

      {/* Phone */}
      <div className="par-field par-field--float par-field--half">
        <input
          className="par-input"
          id="par-phone"
          name="phone"
          type="tel"
          placeholder=" "
          autoComplete="tel"
          disabled={isPending}
        />
        <label className="par-label" htmlFor="par-phone">
          Telefone <span className="par-optional">opcional</span>
        </label>
      </div>

      {/* Profile pills */}
      <fieldset className="par-fieldset">
        <legend className="par-legend">
          O teu perfil <span className="par-optional">opcional</span>
        </legend>
        <div className="par-pill-grid">
          {PROFILES.map((p) => (
            <label key={p} className="par-pill">
              <input type="radio" name="profile" value={p} className="par-pill-radio" disabled={isPending} />
              <span>{p}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Volume pills */}
      <fieldset className="par-fieldset">
        <legend className="par-legend">
          Quantos clientes podes encaminhar? <span className="par-optional">estimativa</span>
        </legend>
        <div className="par-pill-grid">
          {VOLUMES.map((v) => (
            <label key={v} className="par-pill">
              <input type="radio" name="volume" value={v} className="par-pill-radio" disabled={isPending} />
              <span>{v}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Message */}
      <div className="par-field par-field--float">
        <textarea
          className="par-textarea"
          id="par-message"
          name="message"
          rows={4}
          placeholder=" "
          disabled={isPending}
        />
        <label className="par-label par-label--textarea" htmlFor="par-message">
          Conta-nos mais sobre ti <span className="par-optional">opcional</span>
        </label>
      </div>

      {/* Error */}
      {state && !state.ok && (
        <div className="par-form-error" role="alert">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          {state.error}
        </div>
      )}

      {/* Submit */}
      <div className="par-form-footer">
        <button
          type="submit"
          className="par-submit"
          disabled={isPending}
          aria-busy={isPending}
        >
          {isPending ? (
            <>
              <span className="par-spinner" aria-hidden="true" />
              A enviar…
            </>
          ) : (
            <>
              Enviar candidatura
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
        <p className="par-form-privacy">
          Dados tratados de forma confidencial.{' '}
          <a href="/politica-de-privacidade">Política de privacidade</a>.
        </p>
      </div>

    </form>
  );
}
