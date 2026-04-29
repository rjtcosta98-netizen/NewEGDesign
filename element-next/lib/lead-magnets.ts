export type LeadMagnetSection = {
  id: string;
  title: string;
  items?: string[];
  body?: string;
};

export type LeadMagnet = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  readTime: string;
  format: string;
  preview: string[]; // 4-5 bullet points shown before gate
  sections: LeadMagnetSection[];
  cta: string;
  thankyouNote: string;
};

export const LEAD_MAGNETS: Record<string, LeadMagnet> = {

  /* ───────────────────────────────────────────────────────────────────
     1. Checklist SEO para PMEs
  ─────────────────────────────────────────────────────────────────── */
  'checklist-seo-pmes': {
    slug: 'checklist-seo-pmes',
    title: 'Checklist SEO para PMEs',
    subtitle: '20 pontos para subir no Google em 2026',
    description:
      'Um checklist prático e direto ao ponto para proprietários de pequenas e médias empresas em Portugal. Sem jargão técnico — só o que realmente importa para aparecer no Google.',
    metaTitle: 'Checklist SEO para PMEs: 20 Pontos para o Google em 2026 — Grátis | Element Group',
    metaDescription:
      'Descarrega grátis o Checklist SEO para PMEs Portuguesas: 20 pontos verificáveis para subir no Google em 2026. Sem jargão, 100% prático. Criado pela Element Group.',
    category: 'SEO',
    readTime: '10 min',
    format: 'Checklist PDF',
    preview: [
      '20 pontos organizados em 5 categorias (Técnico, Conteúdo, Local, Velocidade, Off-page)',
      'Cada ponto com explicação e como verificar — sem precisar de técnico',
      'Inclui as métricas mínimas do Google PageSpeed que importam em 2026',
      'Secção especial de SEO Local para negócios físicos (Google Business Profile)',
      'Lista de ferramentas gratuitas para verificar cada ponto',
    ],
    cta: 'Quero o Checklist Grátis',
    thankyouNote:
      'O teu checklist está pronto. Guarda esta página ou imprime (Ctrl+P / Cmd+P → Guardar como PDF).',
    sections: [
      {
        id: 'tecnico',
        title: '01 — SEO Técnico',
        items: [
          'O website tem certificado SSL (HTTPS) ativo — verifica se aparece o cadeado no browser.',
          'O ficheiro robots.txt existe e não bloqueia páginas importantes — acede a seutsite.pt/robots.txt.',
          'Existe um sitemap XML submetido no Google Search Console — acede a seutsite.pt/sitemap.xml.',
          'Todas as páginas importantes têm uma tag canonical definida (evita conteúdo duplicado).',
          'O website não tem erros 404 em links internos — usa o Google Search Console para verificar.',
        ],
      },
      {
        id: 'conteudo',
        title: '02 — Conteúdo & On-Page',
        items: [
          'Cada página tem um título único (title tag) com 50-60 caracteres que inclui a palavra-chave principal.',
          'Cada página tem uma meta description única com 150-160 caracteres com uma chamada à ação.',
          'Existe apenas um H1 por página e os headings seguem hierarquia lógica (H1 → H2 → H3).',
          'As imagens têm atributo alt descritivo — o Google não "vê" imagens, lê o texto alternativo.',
          'O conteúdo de cada página responde claramente à intenção de pesquisa do utilizador.',
        ],
      },
      {
        id: 'local',
        title: '03 — SEO Local (negócios físicos)',
        items: [
          'O Google Business Profile está criado, verificado e completamente preenchido (horários, fotos, serviços).',
          'O nome, morada e telefone (NAP) são consistentes em todas as plataformas online (website, redes, diretórios).',
          'O website tem conteúdo localizado: menciona a cidade/região nos títulos, textos e alt das imagens.',
          'Existem avaliações positivas no Google — responde sempre às reviews, incluindo as negativas.',
          'O website está listado nos principais diretórios portugueses: Infopáginas, Páginas Amarelas, Sapo.',
        ],
      },
      {
        id: 'velocidade',
        title: '04 — Velocidade & Core Web Vitals',
        items: [
          'O PageSpeed Insights (pagespeed.web.dev) mostra score ≥ 75 no mobile — o Google penaliza sites lentos.',
          'As imagens estão em formato WebP ou AVIF e com dimensões otimizadas (não carregar imagens de 4000px para mostrar em 300px).',
          'O Largest Contentful Paint (LCP) é inferior a 2.5 segundos — mede quanto tempo o utilizador espera para ver o conteúdo principal.',
          'O website não tem Cumulative Layout Shift (CLS) visível — os elementos não "saltam" enquanto a página carrega.',
          'Fontes, scripts e CSS críticos são carregados de forma não bloqueante — sem atrasar o render da página.',
        ],
      },
      {
        id: 'offpage',
        title: '05 — Off-Page & Autoridade',
        items: [
          'O website tem backlinks de qualidade — outros sites respeitados na tua área que linkam para o teu.',
          'Existe uma estratégia de conteúdo: blog, artigos ou guias que respondem a pesquisas reais do teu público.',
          'O negócio está mencionado em publicações, jornais ou blogs do setor — mesmo sem link, a menção conta.',
          'As redes sociais estão ativas e linkam para o website — o Google usa estes sinais de atividade.',
          'O perfil de backlinks não tem links de baixa qualidade ou spam que possam penalizar o domínio.',
        ],
      },
    ],
  },

  /* ───────────────────────────────────────────────────────────────────
     2. Template de Brief de Website
  ─────────────────────────────────────────────────────────────────── */
  'brief-website': {
    slug: 'brief-website',
    title: 'Template de Brief de Website',
    subtitle: 'O guia completo para preparar o brief da tua empresa',
    description:
      'Tudo o que uma agência digital precisa de saber antes de começar o teu projeto. Preenche este template e recebe propostas mais precisas, mais rápidas — e sem surpresas a meio do projeto.',
    metaTitle: 'Template de Brief de Website Grátis — Como Preparar o Brief da tua Empresa | Element Group',
    metaDescription:
      'Descarrega grátis o Template de Brief de Website: 7 secções com todas as perguntas que uma agência precisa. Proposta mais rápida, projeto mais bem sucedido. Element Group.',
    category: 'Planeamento',
    readTime: '15 min',
    format: 'Template Preenchível',
    preview: [
      '7 secções estruturadas: objetivos, público-alvo, referências, funcionalidades, conteúdo, prazo e orçamento',
      'Cada secção com exemplos reais — não ficas em branco sem saber o que responder',
      'Inclui a lista das funcionalidades mais pedidas com explicação de cada uma',
      'Secção de referências visuais: como comunicar o estilo que queres sem ser designer',
      'Checklist final de validação antes de enviar o brief à agência',
    ],
    cta: 'Quero o Template Grátis',
    thankyouNote:
      'O teu template está pronto. Guarda esta página ou imprime (Ctrl+P / Cmd+P → Guardar como PDF).',
    sections: [
      {
        id: 'objetivos',
        title: '01 — Objetivos do Projeto',
        body: 'Antes de qualquer detalhe técnico, define claramente o que queres alcançar.',
        items: [
          '**Qual é o objetivo principal do website?** (ex: gerar leads, vender online, apresentar a empresa, informar clientes)',
          '**Como é o teu website atual?** (se existe — o que funciona, o que não funciona, por que queres mudar)',
          '**O que vai o teu cliente fazer no site?** (ex: pedir orçamento, fazer uma reserva, comprar, contactar, informar-se)',
          '**Como vais medir o sucesso?** (ex: número de formulários enviados, tempo no site, vendas geradas)',
          '**Tens prazo definido para o lançamento?** Se sim, porquê essa data? (evento, sazonalidade, campanha)',
        ],
      },
      {
        id: 'publico',
        title: '02 — Público-Alvo',
        body: 'O website deve ser construído para quem o vai usar, não para quem o mandou fazer.',
        items: [
          '**Quem é o teu cliente típico?** (idade, profissão, localização, nível de familiaridade com digital)',
          '**Quais são as principais dores ou problemas que o teu produto/serviço resolve?**',
          '**Como é que o teu cliente normalmente procura o que ofereces?** (Google, redes sociais, recomendação)',
          '**Que objeções tem antes de comprar/contactar?** (preço, confiança, comparação com concorrência)',
          '**O teu público é maioritariamente mobile ou desktop?** (afeta toda a estratégia de design)',
        ],
      },
      {
        id: 'referencias',
        title: '03 — Referências Visuais & Estilo',
        body: 'Não precisas de ser designer. Mas tens de conseguir comunicar o que queres.',
        items: [
          '**Partilha 3-5 websites que gostas** (de qualquer setor) — explica o que gostas em cada um (layout, cores, tipografia, sensação geral)',
          '**Que adjetivos descrevem a imagem que queres transmitir?** (ex: moderno, elegante, profissional, acolhedor, premium, descontraído)',
          '**Tens marca existente?** Se sim, partilha logo, cores, tipografia e quaisquer guidelines existentes',
          '**Há algo que definitivamente NÃO queres?** (ex: "não quero pop-ups", "nada de animações exageradas", "sem fundo preto")',
          '**Tens fotografia ou imagens profissionais?** O conteúdo visual é um dos fatores mais importantes no resultado final',
        ],
      },
      {
        id: 'funcionalidades',
        title: '04 — Funcionalidades Necessárias',
        body: 'Lista o que o website precisa de fazer. Assinala com ✓ o que se aplica ao teu caso.',
        items: [
          '☐ Formulário de contacto / pedido de orçamento',
          '☐ Sistema de reservas / marcações online',
          '☐ Loja online (e-commerce) com carrinho e pagamento',
          '☐ Blog ou área de notícias',
          '☐ Galeria de fotos ou portfólio',
          '☐ Mapa integrado (Google Maps)',
          '☐ Chat ao vivo ou chatbot',
          '☐ Área de clientes / login',
          '☐ Integração com CRM ou email marketing (ex: Mailchimp, HubSpot)',
          '☐ Versões em múltiplos idiomas',
          '☐ Integração com redes sociais (feed do Instagram, partilha)',
          '☐ Outro: ________________________',
        ],
      },
      {
        id: 'conteudo',
        title: '05 — Conteúdo & Páginas',
        body: 'O conteúdo é responsabilidade tua (ou a acordar com a agência). Define o que existe e o que precisa de ser criado.',
        items: [
          '**Que páginas precisa o website?** (ex: Início, Sobre, Serviços, Portfolio, Blog, Contacto, FAQ)',
          '**Tens os textos escritos ou precisas de apoio de copywriting?**',
          '**Tens fotografias profissionais ou precisas de banco de imagens / sessão fotográfica?**',
          '**Tens logótipo e identidade visual ou precisas de branding?**',
          '**O conteúdo já está organizado ou precisas de ajuda na arquitetura de informação?**',
        ],
      },
      {
        id: 'tecnico',
        title: '06 — Requisitos Técnicos',
        body: 'Detalhes que impactam o custo, prazo e tecnologia escolhida.',
        items: [
          '**Já tens domínio registado?** Se sim, qual? (ex: meusite.pt)',
          '**Já tens alojamento / hosting?** Se sim, qual o fornecedor?',
          '**O website precisa de integrar com algum sistema existente?** (ex: ERP, sistema de faturação, plataforma de reservas)',
          '**Quem vai gerir o conteúdo após o lançamento?** (tu próprio, a equipa, a agência)',
          '**Tens alguma preferência de plataforma?** (WordPress, Next.js custom, Shopify, etc.) — se não sabes, não precisas de responder',
        ],
      },
      {
        id: 'orcamento',
        title: '07 — Prazo & Orçamento',
        body: 'Transparência aqui evita mal-entendidos. Não há resposta errada.',
        items: [
          '**Qual é o teu prazo ideal de entrega?** E existe algum prazo máximo ou data limite?',
          '**Qual é a tua estimativa de investimento?** (ex: "entre 500€ e 1.500€", "até 3.000€", "não sei, preciso de orientação")',
          '**Preferes pagamento único ou em prestações?**',
          '**Tens orçamento para manutenção mensal após o lançamento?** (hosting, atualizações, SEO mensal)',
          '**Alguma outra informação que consideres relevante partilhar com a agência?**',
        ],
      },
    ],
  },
};

export function getLeadMagnet(slug: string): LeadMagnet | undefined {
  return LEAD_MAGNETS[slug];
}

export function getAllLeadMagnetSlugs(): string[] {
  return Object.keys(LEAD_MAGNETS);
}

export function getAllLeadMagnets(): LeadMagnet[] {
  return Object.values(LEAD_MAGNETS);
}

export const SITE_URL_LM = 'https://elementgroup.pt';
