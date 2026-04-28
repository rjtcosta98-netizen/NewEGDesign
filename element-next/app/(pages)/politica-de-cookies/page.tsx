import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politica de Cookies | Element Group',
  description: 'Politica de Cookies da Element Group para utilizadores em Portugal.',
};

export default function PoliticaCookiesPage() {
  return (
    <section className="legal-page">
      <div className="legal-shell">
        <header className="legal-head">
          <p>Informacao Legal</p>
          <h1>Politica de Cookies</h1>
        </header>

        <div className="legal-body">
          <section>
            <h2>1. O que sao cookies</h2>
            <p>
              Cookies sao pequenos ficheiros guardados no seu dispositivo para melhorar a experiencia de
              navegacao, medir desempenho do website e guardar preferencias.
            </p>
          </section>

          <section>
            <h2>2. Tipos de cookies utilizados</h2>
            <ul>
              <li>Essenciais: necessarios ao funcionamento tecnico do site.</li>
              <li>Analiticos: ajudam a compreender o uso do website.</li>
              <li>Funcionais: guardam preferencias e melhoram a experiencia.</li>
              <li>Marketing (quando aplicavel): medem campanhas e conversoes.</li>
            </ul>
          </section>

          <section>
            <h2>3. Base legal</h2>
            <p>
              Cookies nao essenciais sao utilizados apenas com o seu consentimento, nos termos do RGPD e
              da legislacao aplicavel em Portugal.
            </p>
          </section>

          <section>
            <h2>4. Gestao de preferencias</h2>
            <p>
              Pode aceitar, recusar ou alterar cookies atraves do banner de cookies e tambem nas
              configuracoes do browser.
            </p>
          </section>

          <section>
            <h2>5. Retencao</h2>
            <p>
              A duracao dos cookies varia consoante a sua finalidade. Cookies de sessao expiram ao fechar
              o browser; cookies persistentes expiram no prazo definido.
            </p>
          </section>

          <section>
            <h2>6. Contacto</h2>
            <p>
              Para esclarecimentos sobre cookies, contacte
              {' '}<a href="mailto:info@elementgroup.pt">info@elementgroup.pt</a>.
            </p>
          </section>

          <p className="legal-note">
            Ultima atualizacao: abril de 2026. Recomenda-se validar esta pagina com o gestor real de
            consentimento/cookies utilizado no website.
          </p>
        </div>
      </div>
    </section>
  );
}
