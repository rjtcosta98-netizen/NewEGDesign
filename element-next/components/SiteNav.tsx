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
  const [scrolled, setScrolled] = useState(false);

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
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
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
          className="nav"
          style={scrolled ? { boxShadow: '0 30px 60px -30px rgba(0,0,0,.7)' } : undefined}
        >
          {/* Brand — matches homepage logo */}
          <a className="brand" href="/" aria-label="Element Group — Início">
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
              className="menu-btn"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              onClick={() => setOpen(o => !o)}
            >
              {open ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div
          className="home-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          {/* Mobile brand */}
          <a
            className="brand"
            href="/"
            style={{ marginBottom: 16, alignSelf: 'flex-start' }}
            onClick={() => setOpen(false)}
            aria-label="Element Group — Início"
          >
            <div className="mark">E</div>
            <div className="name">
              <b>Element Group</b>
              <small>Digital Solutions</small>
            </div>
          </a>

          {NAV_LINKS.map(l => {
            const active = isActive(l.href, pathname);
            return (
              <a
                key={l.href}
                href={l.href}
                className={active ? 'mobile-nav-link mobile-nav-link--active' : 'mobile-nav-link'}
                aria-current={active ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="mobile-nav-icon">{l.icon}</span>
                {l.label}
                {active && (
                  <svg className="mobile-nav-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                )}
              </a>
            );
          })}

          <div className="home-mobile-menu-cta">
            <a
              className="btn-primary"
              href="/contacto"
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
