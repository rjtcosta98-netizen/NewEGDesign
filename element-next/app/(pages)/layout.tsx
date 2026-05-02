import Link from 'next/link';
import SiteNav from '@/components/SiteNav';

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <>
      <SiteNav />
      <main>{children}</main>

      {/* Pre-footer CTA strip */}
      <section className="prefooter-cta">
        <div className="container">
          <div className="prefooter-cta-inner">
            <div className="prefooter-cta-copy">
              <h2 className="prefooter-cta-title">Pronto para começar o seu projeto?</h2>
              <p className="prefooter-cta-sub">Resposta em menos de 24 horas. Proposta gratuita e sem compromisso.</p>
            </div>
            <div className="prefooter-cta-actions">
              <Link href="/contacto" className="btn-primary">
                Pedir orçamento grátis
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <div className="site-footer-grid">
            <div className="site-footer-brand">
              <Link href="/" className="site-footer-logo">
                <span className="site-footer-logo-mark">E</span>
                <span>Element Group</span>
              </Link>
              <p>
                Soluções digitais para PMEs em Portugal: websites, e-commerce, apps e marketing digital com resultados reais.
              </p>
              <div className="site-footer-social">
                <a href="https://www.instagram.com/elementgroup.pt" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zM12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                  </svg>
                </a>
                <a href="https://www.facebook.com/elementgroupdigitalsolutions" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/elementgroup-pt" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3>Navegação</h3>
              <div className="site-footer-links">
                <Link href="/">Início</Link>
                <Link href="/servicos">Serviços</Link>
                <Link href="/portfolio">Portfolio</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/sobre">Sobre nós</Link>
                <Link href="/recursos">Recursos</Link>
              </div>
            </div>

            <div>
              <h3>Contacto</h3>
              <div className="site-footer-links">
                <a href="mailto:info@elementgroup.pt">info@elementgroup.pt</a>
                <a href="tel:+351930477894">+351 930 477 894</a>
                <a href="https://wa.me/351930477894" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                <Link href="/parcerias">Parcerias</Link>
              </div>
            </div>

            <div>
              <h3>Informação Legal</h3>
              <div className="site-footer-links">
                <Link href="/politica-de-privacidade">Política de Privacidade</Link>
                <Link href="/politica-de-cookies">Política de Cookies</Link>
                <Link href="/termos-e-condicoes">Termos e Condições</Link>
                <Link href="/resolucao-de-litigios">Resolução de Litígios</Link>
                <a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noopener noreferrer">Livro de Reclamações</a>
              </div>
            </div>
          </div>

          <div className="site-footer-bottom">
            <span>© {year} Element Group. Todos os direitos reservados.</span>
            <span>Agência digital em Portugal.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
