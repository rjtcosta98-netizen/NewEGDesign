'use client';

import { useState } from 'react';

export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  image: string | null;
  url: string | null;
  year: string;
  headline: string;
  deliverables: string[];
  results: Array<{ value: string; label: string }>;
  testimonial?: { text: string; author: string };
  source: 'supabase' | 'static';
};

const FILTER_CATS = ['Todos', 'Websites', 'E-commerce', 'Apps', 'Marketing', 'Design'] as const;

function GridIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  );
}
function ListIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M5 12h14M13 5l7 7-7 7"/>
    </svg>
  );
}
function StarRow({ n = 5 }: { n?: number }) {
  return (
    <span style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className="ts-stars" style={{ display: 'inline-flex' }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="#facc15">
            <path d="M12 2l3 7h7l-5.5 4.5L18 22l-6-4-6 4 1.5-8.5L2 9h7z"/>
          </svg>
        </span>
      ))}
    </span>
  );
}

export default function PortfolioClient({ projects }: { projects: PortfolioProject[] }) {
  const [active, setActive] = useState('Todos');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = active === 'Todos'
    ? projects
    : projects.filter(p => p.category === active);

  return (
    <>
      {/* ── Filters ── */}
      <div className="pf-filters-wrap">
        <div className="pf-filters">
          {FILTER_CATS.map(cat => (
            <button
              key={cat}
              className={`pf-filter-btn${active === cat ? ' is-on' : ''}`}
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
            >
              {cat}
            </button>
          ))}

          {/* View toggle — hidden on very small screens */}
          <div className="pf-view-toggle" style={{ display: 'flex' }}>
            <button
              className={`pf-view-btn${view === 'grid' ? ' is-on' : ''}`}
              onClick={() => setView('grid')}
              aria-label="Vista em grelha"
            >
              <GridIcon />
            </button>
            <button
              className={`pf-view-btn${view === 'list' ? ' is-on' : ''}`}
              onClick={() => setView('list')}
              aria-label="Vista em lista"
            >
              <ListIcon />
            </button>
          </div>
        </div>
      </div>

      {/* ── Projects ── */}
      <div className="pf-content">
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
            Nenhum projeto encontrado nesta categoria.
          </div>
        ) : view === 'grid' ? (
          <GridView projects={filtered} />
        ) : (
          <ListView projects={filtered} />
        )}

        {/* Testimonials panel */}
        {filtered.some(p => p.testimonial) ? (
          <div className="pf-ts-panel">
            <div className="pf-ts-head">
              <p className="pf-ts-eyebrow">O que dizem os nossos clientes</p>
            </div>
            <div className="pf-ts-grid">
              {filtered.reduce<PortfolioProject[]>((acc, p) => {
                if (p.testimonial && acc.length < 4) acc.push(p);
                return acc;
              }, []).map(p => (
                <div key={p.id} style={{
                  padding: '16px',
                  borderRadius: '14px',
                  border: '1px solid var(--line)',
                  background: 'rgba(255,255,255,.025)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}>
                  <StarRow />
                  <p style={{ margin: 0, fontSize: '12.5px', color: 'rgba(255,255,255,.55)', fontStyle: 'italic', lineHeight: 1.6 }}>
                    &ldquo;{p.testimonial!.text}&rdquo;
                  </p>
                  <span style={{ fontSize: '11px', color: 'var(--muted-2)', fontWeight: 600 }}>
                    — {p.testimonial!.author}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* CTA */}
        <div className="pf-cta">
          <div className="pf-cta-badge">
            <span></span>
            Disponíveis para novos projetos
          </div>
          <h2>O próximo projeto<br/>pode ser <em>o seu.</em></h2>
          <p>Proposta personalizada em menos de 24 horas. Sem compromisso. Respondemos sempre.</p>
          <div className="pf-cta-actions">
            <a href="/contacto" className="btn-primary" style={{ padding: '14px 30px', fontSize: '15px' }}>
              Pedir orçamento grátis <ArrowRight />
            </a>
            <div className="pf-cta-trust">
              <span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Garantia 30 dias
              </span>
              <span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Sem compromisso
              </span>
              <span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Resposta &lt;2h
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Grid View ── */
function GridView({ projects }: { projects: PortfolioProject[] }) {
  return (
    <div className="pf-grid">
      {projects.map((p, idx) => (
        <ProjectCard key={p.id} project={p} idx={idx} />
      ))}
    </div>
  );
}

function ProjectCard({ project: p, idx }: { project: PortfolioProject; idx: number }) {
  return (
    <a href={`/portfolio/${p.slug}`} className="pf-card">
      {/* Cover */}
      <div className="pf-card__cover">
        {p.image ? (
          <img
            src={p.image}
            alt={`${p.client} — ${p.title}`}
            width={800}
            height={500}
            loading={idx < 3 ? 'eager' : 'lazy'}
            decoding="async"
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: 'radial-gradient(circle at 30% 40%, rgba(124,58,237,.28), transparent 60%), #070b16',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            aspectRatio: '16/10',
          }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '64px', color: 'rgba(255,255,255,.8)' }}>
              {p.client[0]}
            </span>
          </div>
        )}
        <div className="pf-card__overlay" />

        {/* Badges */}
        <div className="pf-card__badges">
          <span className="pf-card__badge">{p.category}</span>
          {p.url ? (
            <span
              role="link"
              tabIndex={0}
              className="pf-card__live"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(p.url!, '_blank', 'noopener,noreferrer'); }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(p.url!, '_blank', 'noopener,noreferrer'); } }}
              title="Ver site ao vivo"
            >
              <span className="pf-card__live-dot" />
              Live
            </span>
          ) : null}
        </div>

        {/* Index number */}
        <span className="pf-card__num">{String(idx + 1).padStart(2, '0')}</span>

        {/* Arrow */}
        <div className="pf-card__arrow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M5 12h14M13 5l7 7-7 7"/>
          </svg>
        </div>

        {/* Overlay info */}
        <div className="pf-card__info">
          <h3 className="pf-card__title">{p.client}</h3>
          <p className="pf-card__sub">{p.headline}</p>
          {p.results.length > 0 ? (
            <div className="pf-card__results">
              {p.results.slice(0, 3).map((r, i) => (
                <span key={i} className="pf-card__result">{r.value}</span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </a>
  );
}

/* ── List View ── */
function ListView({ projects }: { projects: PortfolioProject[] }) {
  return (
    <div className="pf-list">
      {projects.map((p, idx) => (
        <ListItem key={p.id} project={p} idx={idx} />
      ))}
    </div>
  );
}

function ListItem({ project: p, idx }: { project: PortfolioProject; idx: number }) {
  return (
    <a href={`/portfolio/${p.slug}`} className="pf-list-item">
      <div className="pf-list-inner">
        {/* Thumbnail */}
        <div className="pf-list-cover">
          {p.image ? (
            <img src={p.image} alt={p.client} width={400} height={280} loading="lazy" decoding="async" />
          ) : (
            <div style={{
              width: '100%', height: '100%', minHeight: 160,
              background: 'radial-gradient(circle at 30% 40%, rgba(124,58,237,.28), transparent 60%), #070b16',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '48px', color: 'rgba(255,255,255,.8)' }}>
                {p.client[0]}
              </span>
            </div>
          )}
          <div className="pf-list-edge" />
        </div>

        {/* Body */}
        <div className="pf-list-body">
          <div className="pf-list-meta">
            <span className="pf-list-num">{String(idx + 1).padStart(2, '0')}</span>
            <span className="pf-card__badge">{p.category}</span>
            <span style={{ fontSize: '11px', color: 'var(--muted-2)' }}>{p.year}</span>
          </div>

          <h3 className="pf-list-title">{p.client}</h3>
          <p className="pf-list-headline">{p.headline}</p>

          {/* Results */}
          {p.results.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {p.results.map((r, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '5px 10px', borderRadius: 10,
                  border: '1px solid var(--line)', background: 'rgba(255,255,255,.02)',
                }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#a78bfa' }}>{r.value}</span>
                  <span style={{ fontSize: '10px', color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{r.label}</span>
                </div>
              ))}
            </div>
          ) : null}

          {/* Deliverables */}
          {p.deliverables.length > 0 ? (
            <div className="pf-list-delivs">
              {p.deliverables.map((d, i) => (
                <span key={i} className="pf-list-deliv">{d}</span>
              ))}
            </div>
          ) : null}

          {/* Footer */}
          <div className="pf-list-footer">
            {p.testimonial && (
              <p className="pf-list-quote">&ldquo;{p.testimonial.text}&rdquo;</p>
            )}
            <span className="pf-list-cta">
              Ver case study <ArrowRight />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
