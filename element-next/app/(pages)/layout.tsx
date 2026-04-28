import Link from 'next/link';
import SiteNav from '@/components/SiteNav';

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <>
      <SiteNav />
      <main>{children}</main>
      <footer className="site-footer">
        <div className="container">
          <div className="site-footer-grid">
            <div className="site-footer-brand">
              <Link href="/" className="site-footer-logo">
                <span className="site-footer-logo-mark">E</span>
                <span>Element Group</span>
              </Link>
              <p>
                Solucoes digitais para PMEs em Portugal: websites, e-commerce, apps e marketing.
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
              </div>
            </div>

            <div>
              <h3>Navegacao</h3>
              <div className="site-footer-links">
                <Link href="/">Inicio</Link>
                <Link href="/servicos">Servicos</Link>
                <Link href="/portfolio">Portfolio</Link>
                <Link href="/sobre">Sobre</Link>
              </div>
            </div>

            <div>
              <h3>Contacto</h3>
              <div className="site-footer-links">
                <a href="mailto:info@elementgroup.pt">info@elementgroup.pt</a>
                <a href="tel:+351930477894">+351 930 477 894</a>
                <a href="https://wa.me/351930477894" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
            </div>

            <div>
              <h3>Informacao Legal</h3>
              <div className="site-footer-links">
                <Link href="/politica-de-privacidade">Politica de Privacidade</Link>
                <Link href="/politica-de-cookies">Politica de Cookies</Link>
                <Link href="/termos-e-condicoes">Termos e Condicoes</Link>
                <Link href="/resolucao-de-litigios">Resolucao de Litigios</Link>
                <a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noopener noreferrer">Livro de Reclamacoes</a>
              </div>
            </div>
          </div>

          <div className="site-footer-bottom">
            <span>© {year} Element Group. Todos os direitos reservados.</span>
            <span>Agencia digital em Portugal.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
