'use client';

import { useActionState, useEffect, useRef, useCallback } from 'react';
import type { LeadMagnet } from '@/lib/lead-magnets';
import { submitLeadCapture, type LeadState } from './actions';
import { trackLeadMagnetDownloaded } from '@/lib/analytics';

// ── Icons ─────────────────────────────────────────────────────────────────
function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPrint() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9V2h12v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="6" y="14" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

// ── Content renderer ───────────────────────────────────────────────────────
function ContentSection({ section }: { section: LeadMagnet['sections'][number] }) {
  return (
    <div className="lm-content-section">
      <h3 className="lm-content-section-title">{section.title}</h3>
      {section.body && (
        <p className="lm-content-section-body">{section.body}</p>
      )}
      {section.items && section.items.length > 0 && (
        <ul className="lm-content-list">
          {section.items.map((item, i) => {
            // Detect checkbox items (☐)
            const isCheckbox = item.startsWith('☐');
            // Render bold markdown (**text**)
            const parts = item.replace(/^☐\s*/, '').split(/\*\*(.*?)\*\*/g);
            const rendered = parts.map((part, j) =>
              j % 2 === 1 ? <strong key={j}>{part}</strong> : part,
            );
            return (
              <li key={i} className={`lm-content-list-item ${isCheckbox ? 'lm-checkbox-item' : ''}`}>
                {isCheckbox ? (
                  <label className="lm-checkbox-label">
                    <input type="checkbox" className="lm-checkbox" />
                    <span className="lm-checkbox-text">{rendered}</span>
                  </label>
                ) : (
                  <>
                    <span className="lm-list-dot" aria-hidden="true">
                      <IconCheck />
                    </span>
                    <span>{rendered}</span>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ── Success state ──────────────────────────────────────────────────────────
function ContentReveal({ resource }: { resource: LeadMagnet }) {
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div ref={topRef} className="lm-revealed">
      {/* Success banner */}
      <div className="lm-success-banner">
        <span className="lm-success-icon">✓</span>
        <div>
          <p className="lm-success-title">Acesso desbloqueado!</p>
          <p className="lm-success-sub">{resource.thankyouNote}</p>
        </div>
      </div>

      {/* Print / Save as PDF */}
      <div className="lm-print-row">
        <button
          type="button"
          className="lm-btn-print"
          onClick={() => window.print()}
        >
          <IconPrint />
          Guardar como PDF
        </button>
        <span className="lm-print-hint">Ctrl+P → Guardar como PDF</span>
      </div>

      {/* Full content */}
      <div className="lm-content-body">
        <h2 className="lm-content-main-title">
          {resource.title}
          <span className="lm-content-subtitle">{resource.subtitle}</span>
        </h2>

        {resource.sections.map((section) => (
          <ContentSection key={section.id} section={section} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="lm-bottom-cta">
        <p className="lm-bottom-cta-text">
          Precisas de ajuda a implementar estes pontos?
        </p>
        <a href="/contacto" className="lm-btn-contact">
          Fala com a Element Group →
        </a>
      </div>
    </div>
  );
}

// ── Gate form ──────────────────────────────────────────────────────────────
function GateForm({
  resource,
  state,
  action,
  pending,
}: {
  resource: LeadMagnet;
  state: LeadState;
  action: (payload: FormData) => void;
  pending: boolean;
}) {
  return (
    <div className="lm-gate">
      {/* Social proof micro-strip */}
      <div className="lm-social-proof">
        <span className="lm-stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <IconStar key={i} />
          ))}
        </span>
        <span className="lm-social-proof-text">Grátis · Sem spam · Cancela quando quiseres</span>
      </div>

      <form action={action} className="lm-form" noValidate>
        <input type="hidden" name="slug" value={resource.slug} />

        <div className="lm-field">
          <label htmlFor="lm-name" className="lm-label">
            O teu nome
          </label>
          <input
            id="lm-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Maria Silva"
            className="lm-input"
            required
            disabled={pending}
          />
        </div>

        <div className="lm-field">
          <label htmlFor="lm-email" className="lm-label">
            O teu email
          </label>
          <input
            id="lm-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="maria@empresa.pt"
            className="lm-input"
            required
            disabled={pending}
          />
        </div>

        {state && !state.ok && (
          <p className="lm-error" role="alert">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          className="lm-btn-submit"
          disabled={pending}
          aria-busy={pending}
        >
          {pending ? (
            <span className="lm-spinner" aria-label="A processar…" />
          ) : (
            <>
              <IconLock />
              {resource.cta}
            </>
          )}
        </button>

        <p className="lm-privacy-note">
          Ao submeter aceitas receber emails da Element Group. Sem spam. Podes cancelar a qualquer momento.
        </p>
      </form>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────
export default function LeadMagnetForm({ resource }: { resource: LeadMagnet }) {
  const trackedRef = useRef(false);

  const wrappedAction = useCallback(
    (prev: LeadState, fd: FormData) => submitLeadCapture(prev, fd),
    [],
  );

  const [state, action, pending] = useActionState<LeadState, FormData>(
    wrappedAction,
    null,
  );

  useEffect(() => {
    if (state?.ok && !trackedRef.current) {
      trackedRef.current = true;
      trackLeadMagnetDownloaded({
        resource_slug: resource.slug,
        resource_title: resource.title,
      });
    }
  }, [state, resource.slug, resource.title]);

  if (state?.ok) {
    return <ContentReveal resource={resource} />;
  }

  return (
    <GateForm
      resource={resource}
      state={state}
      action={action}
      pending={pending}
    />
  );
}
