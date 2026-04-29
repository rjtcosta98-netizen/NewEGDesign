import type { Metadata } from 'next';

export const revalidate = false;

export const metadata: Metadata = {
  title: 'Resolução de Litígios | Element Group',
  description: 'Informação sobre resolução alternativa de litígios (RAL) e acesso ao livro de reclamações eletrónico da Element Group, conforme a legislação portuguesa.',
};

export default function ResolucaoLitigiosPage() {
  return (
    <section className="legal-page">
      <div className="legal-shell">
        <header className="legal-head">
          <p>Informacao Legal</p>
          <h1>Resolucao de Litigios</h1>
        </header>

        <div className="legal-body">
          <section>
            <h2>1. Resolucao alternativa de litigios de consumo</h2>
            <p>
              Em caso de litigio de consumo, o consumidor pode recorrer a uma entidade de Resolucao
              Alternativa de Litigios (RAL), nos termos legais em vigor em Portugal.
            </p>
          </section>

          <section>
            <h2>2. Entidades e plataformas uteis</h2>
            <ul>
              <li>
                Portal do Consumidor:
                {' '}<a href="https://www.consumidor.gov.pt/" target="_blank" rel="noopener noreferrer">www.consumidor.gov.pt</a>
              </li>
              <li>
                Plataforma Europeia de Resolucao de Litigios em Linha (ODR):
                {' '}<a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a>
              </li>
              <li>
                CNIACC - Centro Nacional de Informacao e Arbitragem de Conflitos de Consumo:
                {' '}<a href="https://www.cniacc.pt/" target="_blank" rel="noopener noreferrer">www.cniacc.pt</a>
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Livro de Reclamacoes Eletronico</h2>
            <p>
              O cliente pode apresentar reclamacao no Livro de Reclamacoes Eletronico:
              {' '}<a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noopener noreferrer">www.livroreclamacoes.pt</a>.
            </p>
          </section>

          <section>
            <h2>4. Contacto para apoio</h2>
            <p>
              Para esclarecimentos adicionais, contacte
              {' '}<a href="mailto:info@elementgroup.pt">info@elementgroup.pt</a>.
            </p>
          </section>

          <p className="legal-note">
            Ultima atualizacao: abril de 2026. Confirmar a entidade RAL territorialmente competente para
            o vosso domicilio/sede e setor de atividade.
          </p>
        </div>
      </div>
    </section>
  );
}
