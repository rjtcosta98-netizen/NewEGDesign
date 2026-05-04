'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  {
    label: 'Serviços',
    href: '/servicos',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <path d="M12 2 2 7l10 5 10-5-10-5M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    label: 'Blog',
    href: '/blog',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
  },
  {
    label: 'Sobre',
    href: '/sobre',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    label: 'Recursos',
    href: '/recursos',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h5" />
      </svg>
    ),
  },
  {
    label: 'Parcerias',
    href: '/parcerias',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: 'Contacto',
    href: '/contacto',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

function isActive(href: string, pathname: string): boolean {
  if (href.startsWith('/#')) return pathname === '/';
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  function handleClose() {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 450);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  // Close on pathname change (soft navigation)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setClosing(true);
        setTimeout(() => { setOpen(false); setClosing(false); }, 450);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <>
      <div className="nav-wrap">
        <nav
          className={scrolled ? 'nav nav--scrolled' : 'nav'}
        >
          {/* Brand — matches homepage logo */}
          <a className="brand" href="/" aria-label="Element Group Digital Solutions — Início">
            <div className="mark">E</div>
            <div className="name">
              <b>Element Group</b>
              <small>Digital Solutions</small>
            </div>
          </a>

          {/* Desktop links */}
          <nav className="nav-links" aria-label="Navegação principal">
            {NAV_LINKS.map(l => {
              const active = isActive(l.href, pathname);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={active ? 'nav-link nav-link--active' : 'nav-link'}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className="nav-link-icon">{l.icon}</span>
                  {l.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA + mobile burger */}
          <div className="nav-cta">
            <a className="btn-primary" href="/contacto">
              <span>Pedir orçamento</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>

            <button
              className={open ? 'menu-btn menu-btn--open' : 'menu-btn'}
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              onClick={() => open ? handleClose() : setOpen(true)}
            >
              <span className="menu-btn-bar" />
              <span className="menu-btn-bar" />
              <span className="menu-btn-bar" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div
          className="home-mobile-menu"
          data-closing={closing ? 'true' : undefined}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          {/* Background accent glow */}
          <div className="hmenu-bg-glow" aria-hidden="true" />

          <nav className="hmenu-links" aria-label="Navegação mobile">
          {NAV_LINKS.map((l, i) => {
            const active = isActive(l.href, pathname);
            return (
              <a
                key={l.href}
                href={l.href}
                className={active ? 'mobile-nav-link mobile-nav-link--active' : 'mobile-nav-link'}
                aria-current={active ? 'page' : undefined}
                onClick={() => setOpen(false)}
                style={{ '--i': i } as React.CSSProperties}
              >
                <span className="mobile-nav-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="mobile-nav-icon">{l.icon}</span>
                <span className="mobile-nav-label">{l.label}</span>
                <svg className="mobile-nav-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            );
          })}
          </nav>

          <div className="home-mobile-menu-cta">
            <div className="hmc-avail">
              <span className="dot"></span>
              <span>Disponíveis para novos projetos</span>
            </div>
            <a className="hmc-btn-wrap" href="/contacto" onClick={() => setOpen(false)}>
              <div className="hmc-inner">
                <div className="hmc-text">
                  <span className="hmc-label">Pedir orçamento grátis</span>
                  <span className="hmc-sub">Proposta sem compromisso &middot; Resposta em 24h</span>
                </div>
                <div className="hmc-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
            <a
              className="hmc-wa-link"
              href="https://wa.me/351930477894?text=Ol%C3%A1%2C+gostava+de+pedir+um+or%C3%A7amento"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.9.525 3.676 1.438 5.192L2 22l4.98-1.404A9.954 9.954 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.946 7.946 0 0 1-4.274-1.247l-.306-.183-3.173.895.877-3.089-.2-.317A7.952 7.952 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
              </svg>
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
