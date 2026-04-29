import type { Metadata } from 'next';

export const revalidate = false; // legal content, only changes on deploy

export const metadata: Metadata = {
  title: 'Política de Privacidade | Element Group',
  description: 'Política de Privacidade da Element Group em conformidade com o RGPD. Como recolhemos, usamos e protegemos os seus dados pessoais em Portugal.',
};

export default function PoliticaPrivacidadePage() {
  return (
    <section className="legal-page">
      <div className="legal-shell">
        <header className="legal-head">
          <p>Informacao Legal</p>
          <h1>Politica de Privacidade</h1>
        </header>

        <div className="legal-body">
          <section>
            <h2>1. Responsavel pelo tratamento</h2>
            <p>
              A Element Group Digital Solutions e a entidade responsavel pelo tratamento dos dados pessoais
              recolhidos neste website. Para qualquer questao relacionada com privacidade, contacte
              {' '}<a href="mailto:info@elementgroup.pt">info@elementgroup.pt</a>.
            </p>
          </section>

          <section>
            <h2>2. Dados que recolhemos</h2>
            <ul>
              <li>Dados de contacto fornecidos em formularios (nome, email, telefone).</li>
              <li>Dados tecnicos de navegacao (IP, dispositivo, browser, paginas visitadas).</li>
              <li>Dados de comunicacao enviados por email ou WhatsApp.</li>
            </ul>
          </section>

          <section>
            <h2>3. Finalidades e base legal</h2>
            <ul>
              <li>Resposta a pedidos de contacto e propostas (diligencias pre-contratuais).</li>
              <li>Prestacao de servicos contratados (execucao de contrato).</li>
              <li>Obrigacoes legais e fiscais (cumprimento de obrigacao legal).</li>
              <li>Melhoria do website e seguranca (interesse legitimo).</li>
            </ul>
          </section>

          <section>
            <h2>4. Conservacao dos dados</h2>
            <p>
              Os dados pessoais sao conservados apenas durante o periodo necessario para as finalidades
              acima indicadas ou pelo prazo legal aplicavel em Portugal.
            </p>
          </section>

          <section>
            <h2>5. Partilha de dados</h2>
            <p>
              A Element Group pode recorrer a subcontratantes tecnologicos (alojamento, analytics, email)
              com garantias de seguranca adequadas e contratos de tratamento de dados quando exigivel.
            </p>
          </section>

          <section>
            <h2>6. Direitos dos titulares (RGPD)</h2>
            <p>
              Pode exercer os direitos de acesso, retificacao, apagamento, limitacao, portabilidade e
              oposicao, bem como retirar consentimento quando aplicavel, atraves de
              {' '}<a href="mailto:info@elementgroup.pt">info@elementgroup.pt</a>.
            </p>
            <p>
              Tem ainda o direito de reclamar junto da CNPD:
              {' '}<a href="https://www.cnpd.pt/" target="_blank" rel="noopener noreferrer">www.cnpd.pt</a>.
            </p>
          </section>

          <section>
            <h2>7. Seguranca</h2>
            <p>
              Sao aplicadas medidas tecnicas e organizativas para proteger os dados pessoais contra acesso
              nao autorizado, alteracao, divulgacao ou destruicao.
            </p>
          </section>

          <p className="legal-note">
            Ultima atualizacao: abril de 2026. Este documento deve ser revisto por apoio juridico para
            refletir os dados oficiais da empresa (NIF, morada e subprocessadores efetivos).
          </p>
        </div>
      </div>
    </section>
  );
}
