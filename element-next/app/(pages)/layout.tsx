import SiteNav from '@/components/SiteNav';

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main>{children}</main>
      <footer
        style={{
          borderTop: '1px solid rgba(255,255,255,.07)',
          padding: '48px 24px',
          textAlign: 'center',
          color: 'var(--muted-2)',
          fontSize: 13,
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 20,
              marginBottom: 28,
            }}
          >
            {/* Brand */}
            <a
              href="/"
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                fontWeight: 700, fontSize: 17, letterSpacing: '-.01em',
                color: '#fff', textDecoration: 'none',
              }}
            >
              <div
                style={{
                  width: 32, height: 32, borderRadius: 9,
                  background: 'linear-gradient(140deg, #5b8cff, #6a4dff 50%, #9b3dff)',
                  display: 'grid', placeItems: 'center',
                  color: '#fff', fontWeight: 800, fontSize: 17,
                  boxShadow: '0 8px 20px -6px rgba(124,58,237,.5)',
                }}
              >
                E
              </div>
              <span>Element Group</span>
            </a>

            {/* Nav links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 22px' }}>
              {[
                { label: 'Início', href: '/' },
                { label: 'Serviços', href: '/servicos' },
                { label: 'Preços', href: '/pricing' },
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'Sobre', href: '/sobre' },
                { label: 'Contacto', href: 'https://wa.me/351930477894' },
              ].map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  className="foot-nav-link"
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Social */}
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { href: 'https://www.instagram.com/elementgroup.pt', label: 'Instagram', path: 'M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zM12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z' },
                { href: 'https://www.facebook.com/elementgroupdigitalsolutions', label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
              ].map(s => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    border: '1px solid var(--line-2)',
                    background: 'rgba(255,255,255,.02)',
                    display: 'grid', placeItems: 'center',
                    color: 'var(--muted)',
                    transition: 'color .2s, border-color .2s',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d={s.path}/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              paddingTop: 20,
              borderTop: '1px solid var(--line)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
              fontSize: 12,
              color: 'var(--muted-2)',
            }}
          >
            <span>© {new Date().getFullYear()} Element Group · Agência Digital em Portugal</span>
            <span>
              <a href="mailto:info@elementgroup.pt" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
                info@elementgroup.pt
              </a>
              {' · '}+351 930 477 894
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
