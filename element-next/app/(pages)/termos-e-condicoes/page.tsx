import type { Metadata } from 'next';

export const revalidate = false;

export const metadata: Metadata = {
  title: 'Termos e Condições | Element Group',
  description: 'Termos e Condições de utilização e prestação de serviços da Element Group. Condições que regem o acesso e uso dos nossos serviços digitais em Portugal.',
};

export default function TermosCondicoesPage() {
  return (
    <section className="legal-page">
      <div className="legal-shell">
        <header className="legal-head">
          <p>Informacao Legal</p>
          <h1>Termos e Condicoes</h1>
        </header>

        <div className="legal-body">
          <section>
            <h2>1. Objeto</h2>
            <p>
              Estes Termos e Condicoes regulam o acesso ao website e a prestacao de servicos digitais da
              Element Group, incluindo websites, lojas online, apps e marketing digital.
            </p>
          </section>

          <section>
            <h2>2. Aceitacao</h2>
            <p>
              A utilizacao deste website implica a leitura e aceitacao destes termos. Caso nao concorde,
              deve cessar a utilizacao do website.
            </p>
          </section>

          <section>
            <h2>3. Orcamentos e contratacao</h2>
            <ul>
              <li>Os orcamentos apresentados sao validos pelo prazo indicado na proposta.</li>
              <li>A execucao do projeto depende da aceitacao escrita da proposta.</li>
              <li>Condições de pagamento, prazos e entregas constam no contrato/proposta.</li>
            </ul>
          </section>

          <section>
            <h2>4. Propriedade intelectual</h2>
            <p>
              Todo o conteudo deste website e propriedade da Element Group, exceto quando indicado em
              contrario. A utilizacao nao autorizada e proibida.
            </p>
          </section>

          <section>
            <h2>5. Responsabilidade</h2>
            <p>
              A Element Group empenha-se na exatidao da informacao, mas nao garante ausencia de erros,
              interrupcoes ou indisponibilidades tecnicas temporarias.
            </p>
          </section>

          <section>
            <h2>6. Lei aplicavel e foro</h2>
            <p>
              Estes termos regem-se pela lei portuguesa. Em caso de litigio, aplica-se o enquadramento
              legal em vigor em Portugal e os mecanismos de resolucao alternativa quando aplicaveis.
            </p>
          </section>

          <section>
            <h2>7. Alteracoes</h2>
            <p>
              A Element Group pode atualizar estes termos sem aviso previo, sendo publicada neste website a
              versao mais recente.
            </p>
          </section>

          <p className="legal-note">
            Ultima atualizacao: abril de 2026. Este texto deve ser ajustado ao modelo contratual final da
            empresa e aos dados legais completos da entidade.
          </p>
        </div>
      </div>
    </section>
  );
}
