'use client';

import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Serviços',  href: '/servicos' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Sobre',     href: '/#sobre' },
  { label: 'FAQ',       href: '/#faq' },
  { label: 'Contacto',  href: '/contacto' },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change / resize
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (open) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <div className="nav-wrap">
        <nav
          className="nav"
          style={scrolled ? { boxShadow: '0 30px 60px -30px rgba(0,0,0,.7)' } : undefined}
        >
          {/* Brand */}
          <a className="brand" href="/" aria-label="Element Group — Início">
            <div className="mark">E</div>
            <div className="name">
              <b>Element</b>
              <small>Group</small>
            </div>
          </a>

          {/* Desktop links */}
          <div className="nav-links" aria-label="Navegação principal">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="nav-cta">
            <a
              className="btn-primary"
              href="https://wa.me/351930477894?text=Ol%C3%A1!%20Gostaria%20de%20pedir%20um%20or%C3%A7amento."
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Pedir orçamento</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </a>

            {/* Mobile hamburger */}
            <button
              className="menu-btn"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              onClick={() => setOpen(o => !o)}
            >
              {open ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M3 12h18M3 6h18M3 18h18"/>
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 49,
            background: 'rgba(5,7,13,.97)',
            backdropFilter: 'blur(20px)',
            display: 'flex', flexDirection: 'column',
            paddingTop: 'max(100px, calc(env(safe-area-inset-top) + 72px))',
            paddingRight: '24px',
            paddingBottom: 'max(40px, env(safe-area-inset-bottom))',
            paddingLeft: '24px',
            gap: 6,
            overflowY: 'auto',
          }}
          role="dialog"
          aria-label="Menu de navegação"
        >
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                padding: '16px 0',
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: '-.02em',
                color: '#fff',
                borderBottom: '1px solid var(--line)',
                textDecoration: 'none',
              }}
            >
              {l.label}
            </a>
          ))}
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a
              className="btn-primary"
              href="https://wa.me/351930477894?text=Ol%C3%A1!%20Gostaria%20de%20pedir%20um%20or%C3%A7amento."
              target="_blank"
              rel="noopener noreferrer"
              style={{ textAlign: 'center', justifyContent: 'center', padding: '15px 24px', fontSize: 15 }}
              onClick={() => setOpen(false)}
            >
              Pedir orçamento grátis
            </a>
          </div>
        </div>
      )}
    </>
  );
}
