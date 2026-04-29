export type CaseStudyResult = {
  value: string;
  label: string;
  icon?: 'up' | 'speed' | 'star' | 'clock' | 'check';
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  category: string;
  year: string;
  url: string | null;

  /* SEO */
  metaTitle: string;
  metaDescription: string;

  /* Hero */
  image: string | null;
  heroHeadline: string;
  heroSub: string;
  keyResults: CaseStudyResult[]; // 3 max — shown in hero

  /* Deliverables */
  deliverables: string[];

  /* Sections */
  challenge: {
    title?: string;
    body: string[];
  };
  solution: {
    title?: string;
    body: string[];
    highlights: string[];
  };
  results: {
    title?: string;
    items: CaseStudyResult[];
    body?: string;
  };

  testimonial?: {
    text: string;
    author: string;
    role?: string;
  };

  /* Navigation */
  prevSlug?: string;
  nextSlug?: string;
};

const SITE_URL = 'https://elementgroup.pt';

export const CASE_STUDIES: Record<string, CaseStudy> = {

  /* ─────────────────────────────────────────────────────────────────────
     1. Matias Nature
  ───────────────────────────────────────────────────────────────────── */
  'matias-nature-portugal': {
    slug: 'matias-nature-portugal',
    client: 'Matias Nature',
    title: 'Matias Nature — E-commerce + App PWA',
    category: 'E-commerce',
    year: '2025',
    url: 'https://www.matiasnature.com',
    metaTitle: 'Matias Nature — Reservas diretas +25% com E-commerce & App PWA | Element Group',
    metaDescription:
      'Como a Element Group eliminou a dependência de OTAs e aumentou as reservas diretas da Matias Nature em 25% com e-commerce, app PWA e social media. PageSpeed 96.',
    image: '/images/MNSITE.webp',
    heroHeadline: 'De plataformas terceiras a reservas 100% diretas.',
    heroSub:
      'A Matias Nature pagava 15-20% de comissão por cada reserva. Criámos uma plataforma digital própria que coloca o controlo — e o dinheiro — nas mãos do cliente.',
    keyResults: [
      { value: '+25%', label: 'Reservas diretas em 90 dias', icon: 'up' },
      { value: 'PageSpeed 96', label: 'Performance desktop', icon: 'speed' },
      { value: '+30%', label: 'Retorno de clientes via app', icon: 'up' },
    ],
    deliverables: ['Website E-commerce', 'App PWA', 'Social Media'],
    challenge: {
      title: 'O problema: margens comidas por comissões',
      body: [
        'A Matias Nature dependia exclusivamente de plataformas OTA — Booking, Airbnb, Tripadvisor — para conseguir reservas. Cada reserva custava entre 15% e 20% de comissão, reduzindo drasticamente a margem de lucro.',
        'Não havia website próprio, não havia app, não havia nenhuma forma de comunicar diretamente com os clientes existentes para promover regresso. O negócio estava refém de algoritmos alheios.',
        'A necessidade era clara: criar uma presença digital autónoma que permitisse reservas diretas, fidelização de clientes e independência das plataformas de terceiros.',
      ],
    },
    solution: {
      title: 'A solução: ecossistema digital completo',
      body: [
        'Desenvolvemos um website e-commerce com sistema de reservas integrado e checkout nativo — sem intermediários, sem comissões. O fluxo de reserva foi otimizado para conversão mobile-first, com menos de 3 cliques da landing page ao pagamento confirmado.',
        'A App PWA (Progressive Web App) permite aos clientes anteriores aceder a ofertas exclusivas, repetir reservas e receber notificações push — um canal de marketing direto com 0% de comissão e altíssima taxa de engagement.',
        'A estratégia de social media foi alinhada com o funil de conversão, direcionando tráfego diretamente para o website próprio em vez de para as plataformas OTA.',
      ],
      highlights: [
        'Sistema de reservas sem comissões',
        'App PWA com notificações push',
        'Checkout em 3 cliques',
        'Integração com pagamentos portugueses',
        'SEO técnico para turismo local',
        'Social media orientado à conversão',
      ],
    },
    results: {
      title: 'Resultados em 90 dias',
      items: [
        { value: '+25%', label: 'Reservas diretas no primeiro trimestre', icon: 'up' },
        { value: '96', label: 'PageSpeed desktop (máximo 100)', icon: 'speed' },
        { value: '+30%', label: 'Taxa de retorno via App PWA', icon: 'up' },
        { value: '0%', label: 'Comissão paga nas reservas diretas', icon: 'check' },
        { value: '<2s', label: 'Tempo de carregamento da página', icon: 'clock' },
      ],
      body: 'Em 90 dias após o lançamento, a Matias Nature registou um crescimento significativo nas reservas diretas e uma redução efetiva da dependência das plataformas OTA — traduzindo-se diretamente em maior margem por reserva.',
    },
    testimonial: {
      text: 'Desde o primeiro contato até a entrega foi excecional! A equipa entendeu exatamente o que precisávamos e entregou uma plataforma que já está a gerar resultados reais.',
      author: 'Cliente Matias Nature',
      role: 'Proprietário',
    },
    prevSlug: 'football-nation-store-branding',
    nextSlug: 'football-nation-store-loja',
  },

  /* ─────────────────────────────────────────────────────────────────────
     2. Football Nation Store — website
  ───────────────────────────────────────────────────────────────────── */
  'football-nation-store-loja': {
    slug: 'football-nation-store-loja',
    client: 'Football Nation Store',
    title: 'Football Nation Store — Loja Online',
    category: 'E-commerce',
    year: '2026',
    url: null,
    metaTitle: 'Football Nation Store — Loja Online de Futebol com PageSpeed 95+ | Element Group',
    metaDescription:
      'Do logótipo à loja online: como a Element Group criou a Football Nation Store de raiz, com e-commerce mobile-first, PageSpeed 95+ e SEO otimizado para camisolas de futebol.',
    image: '/images/FOOTBALLNATIONWEB.webp',
    heroHeadline: 'Do logótipo à loja online. Camisolas de futebol ao mundo inteiro.',
    heroSub:
      'Um projeto completo criado do zero: identidade visual, loja e-commerce e estratégia digital para um negócio de camisolas de futebol com ambição internacional.',
    keyResults: [
      { value: 'PageSpeed 95+', label: 'Mobile & desktop', icon: 'speed' },
      { value: '100%', label: 'Satisfação do cliente', icon: 'star' },
      { value: 'SEO Ready', label: 'Otimizado para Google', icon: 'check' },
    ],
    deliverables: ['Loja Online E-commerce', 'Mobile-First', 'SEO Técnico'],
    challenge: {
      title: 'Do zero ao mercado internacional',
      body: [
        'A Football Nation Store queria entrar no mercado de camisolas de futebol — um nicho competitivo dominado por grandes marketplaces. Não havia marca, não havia website, não havia qualquer presença digital.',
        'O desafio era duplo: criar uma identidade visual forte que transmitisse credibilidade e paixão pelo futebol, e simultaneamente construir uma loja e-commerce que competisse com players estabelecidos em termos de experiência de utilizador e performance.',
        'Tudo tinha de ser construído de raiz, com um prazo apertado para aproveitar a janela de mercado antes do início da época.',
      ],
    },
    solution: {
      title: 'Identidade + loja numa só entrega',
      body: [
        'Começámos pela identidade visual: logótipo, paleta de cores e linguagem gráfica que capturam a energia do futebol sem cair nos clichês do setor. A marca foi desenhada para funcionar desde um favicon até a uma caixa de envio.',
        'A loja e-commerce foi desenvolvida com mobile-first como premissa absoluta — mais de 70% do tráfego de nicho de moda desportiva vem de dispositivos móveis. O checkout foi otimizado para 3 cliques máximos.',
        'SEO técnico avançado desde o primeiro dia: estrutura de URLs otimizada para palavras-chave de produto, schema markup para produtos, meta tags únicas geradas automaticamente por produto e categoria.',
      ],
      highlights: [
        'Design mobile-first responsivo',
        'Checkout otimizado (3 cliques)',
        'Schema markup para produtos',
        'URLs otimizadas para SEO',
        'PageSpeed 95+ mobile e desktop',
        'Integração com pagamentos nacionais e internacionais',
      ],
    },
    results: {
      title: 'Performance desde o dia 1',
      items: [
        { value: '95+', label: 'PageSpeed mobile e desktop', icon: 'speed' },
        { value: '100%', label: 'Satisfação do cliente', icon: 'star' },
        { value: 'A+', label: 'SEO técnico no Lighthouse', icon: 'check' },
        { value: '<1.5s', label: 'First Contentful Paint', icon: 'clock' },
        { value: '0', label: 'Erros de rastreamento no GSC', icon: 'check' },
      ],
      body: 'A loja foi lançada com PageSpeed 95+ e zero erros de rastreamento — uma base técnica sólida que permite crescer organicamente no Google desde o primeiro dia.',
    },
    testimonial: {
      text: 'Da identidade visual ao website — tudo ficou perfeito. A equipa entendeu a nossa visão e entregou uma loja que nos deixa orgulhosos.',
      author: 'Football Nation Store',
      role: 'Fundador',
    },
    prevSlug: 'matias-nature-portugal',
    nextSlug: 'apiarios-terras-pulga',
  },

  /* ─────────────────────────────────────────────────────────────────────
     3. Apiários Terras da Pulga
  ───────────────────────────────────────────────────────────────────── */
  'apiarios-terras-pulga': {
    slug: 'apiarios-terras-pulga',
    client: 'Apiários Terras da Pulga',
    title: 'Apiários Terras da Pulga — E-commerce',
    category: 'E-commerce',
    year: '2026',
    url: 'https://apiariosterrasdapulga.pt',
    metaTitle: 'Apiários Terras da Pulga — +40% Vendas Online & Top 3 Google | Element Group',
    metaDescription:
      'Como a Element Group aumentou as vendas de mel dos Apiários Terras da Pulga em 40% em 60 dias com e-commerce e SEO local. Caso de estudo.',
    image: '/images/APIARIOSWEB.webp',
    heroHeadline: 'Tradição encontra digital. Vendas 24h/dia.',
    heroSub:
      'Mel artesanal produzido com paixão, mas vendido apenas em mercados locais. Transformámos um negócio de proximidade numa loja online que vende para todo o país.',
    keyResults: [
      { value: '+40%', label: 'Vendas online em 60 dias', icon: 'up' },
      { value: 'PageSpeed 95', label: 'Performance desktop', icon: 'speed' },
      { value: 'Top 3', label: 'Google em termos locais', icon: 'star' },
    ],
    deliverables: ['Website & E-commerce', 'SEO Local & Nacional', 'Branding'],
    challenge: {
      title: 'Produto excelente, alcance limitado',
      body: [
        'Os Apiários Terras da Pulga produzem mel artesanal de qualidade premium — um produto com uma história genuína, colhido em colmeias tradicionais no interior de Portugal. Mas toda a distribuição era feita através de mercados locais e vendas diretas, limitando o alcance a poucos quilómetros.',
        'Sem presença digital, sem loja online e sem visibilidade no Google, o negócio estava limitado à área geográfica imediata. Clientes que ouviam falar do produto não tinham forma de o comprar se não estivessem presentes nos mercados.',
        'A oportunidade era enorme: criar uma loja online que levasse este mel artesanal a qualquer ponto do país, com uma presença no Google que captasse quem procura "mel artesanal" ou "mel português".',
      ],
    },
    solution: {
      title: 'E-commerce com raízes na tradição',
      body: [
        'Desenvolvemos um website com e-commerce nativo que conta a história dos apiários com autenticidade — fotografia real dos produtos e das colmeias, textos que comunicam a qualidade artesanal sem exageros.',
        'A loja online foi integrada com MBWay, Multibanco e cartão de crédito — os métodos de pagamento preferidos pelo consumidor português. O processo de encomenda foi simplificado ao máximo para clientes que não estão habituados a comprar online.',
        'A estratégia de SEO focou-se em dois vetores: SEO local para dominar pesquisas de "mel [região]" e "apicultor [cidade]", e SEO nacional para palavras-chave como "mel artesanal Portugal" e "mel biológico comprar online".',
      ],
      highlights: [
        'Storytelling visual autêntico',
        'Checkout com MBWay e Multibanco',
        'SEO local + nacional integrado',
        'Schema markup para produtos alimentares',
        'Branding consistente com a identidade da marca',
        'Design mobile-first para todas as idades',
      ],
    },
    results: {
      title: 'Resultados em 60 dias',
      items: [
        { value: '+40%', label: 'Crescimento nas vendas online', icon: 'up' },
        { value: '95', label: 'PageSpeed desktop (máx. 100)', icon: 'speed' },
        { value: 'Top 3', label: 'Google em pesquisas locais', icon: 'star' },
        { value: 'Portugal', label: 'Alcance de entregas (todo o país)', icon: 'check' },
        { value: '24/7', label: 'Disponibilidade para encomendas', icon: 'clock' },
      ],
      body: 'Em apenas 60 dias após o lançamento, as vendas online cresceram 40% face ao período anterior. O website passou a ser o principal canal de vendas, superando os mercados físicos.',
    },
    testimonial: {
      text: 'Recomendo totalmente. Excelente capacidade de transformar ideias em processos claros e resultados reais. A nossa loja online ficou exactamente como imaginámos.',
      author: 'Ricardo Jesus',
      role: 'Proprietário, Apiários Terras da Pulga',
    },
    prevSlug: 'football-nation-store-loja',
    nextSlug: 'maria-mendes-massagens',
  },

  /* ─────────────────────────────────────────────────────────────────────
     4. Maria Mendes Massagens
  ───────────────────────────────────────────────────────────────────── */
  'maria-mendes-massagens': {
    slug: 'maria-mendes-massagens',
    client: 'Maria Mendes Massagens',
    title: 'Maria Mendes Massagens — Website',
    category: 'Websites',
    year: '2026',
    url: null,
    metaTitle: 'Maria Mendes Massagens — PageSpeed 100 & Marcações 24/7 em 10 dias | Element Group',
    metaDescription:
      'De link na bio a website profissional com PageSpeed 100 e marcações 24/7. A Element Group entregou em 10 dias. Caso de estudo: terapeuta de massagens em Portugal.',
    image: '/images/MARIAWEB.webp',
    heroHeadline: 'De plataforma gratuita a website profissional. Marcações 24/7.',
    heroSub:
      'Uma terapeuta talentosa com presença digital amadora. Em 10 dias, transformámos um link na bio num website com PageSpeed 100 e marcações automáticas a qualquer hora.',
    keyResults: [
      { value: 'PageSpeed 100', label: 'Mobile & desktop', icon: 'speed' },
      { value: '<1s', label: 'Carregamento da página', icon: 'clock' },
      { value: '10 dias', label: 'Do brief ao site live', icon: 'check' },
    ],
    deliverables: ['Website Profissional', 'SEO Local', 'Performance'],
    challenge: {
      title: 'Presença digital dependente das redes sociais',
      body: [
        'A Maria Mendes usava exclusivamente o Instagram para comunicar os seus serviços de massagem. Toda a sua "presença digital" se resumia a um link na bio que apontava para uma landing page gratuita — sem domínio próprio, sem aspeto profissional, sem controlo.',
        'As marcações dependiam de mensagens no Direct do Instagram ou WhatsApp — um processo manual, sujeito a erros e indisponível quando a Maria não estava ao telefone. Potenciais clientes desistiam por falta de resposta imediata.',
        'O posicionamento local no Google para pesquisas como "massagens [cidade]" era inexistente, deixando clientes na zona que procuravam ativamente estes serviços a encontrar apenas concorrentes.',
      ],
    },
    solution: {
      title: 'Website de alta performance em tempo recorde',
      body: [
        'Desenvolvemos um website profissional com identidade visual coerente com a proposta de valor da Maria: serenidade, profissionalismo e confiança. Design limpo, mobile-first, otimizado para conversão.',
        'O sistema de marcações online permite que clientes marquem sessões 24 horas por dia, 7 dias por semana — sem necessidade de intervenção manual. Confirmações automáticas por email e SMS eliminam falhas de comunicação.',
        'A estratégia de SEO local focou-se em posicionar o website para pesquisas geográficas como "massagens [cidade]", "terapeuta de massagens perto de mim" e termos específicos dos tratamentos oferecidos.',
      ],
      highlights: [
        'Design sereno e profissional',
        'Marcações online 24/7',
        'Confirmações automáticas por email',
        'SEO local otimizado',
        'Velocidade de carregamento <1s',
        'Entregue em 10 dias úteis',
      ],
    },
    results: {
      title: 'Resultados imediatos',
      items: [
        { value: '100', label: 'PageSpeed mobile e desktop', icon: 'speed' },
        { value: '<1s', label: 'Tempo de carregamento', icon: 'clock' },
        { value: '10 dias', label: 'Do brief ao website live', icon: 'check' },
        { value: '24/7', label: 'Disponibilidade para marcações', icon: 'check' },
        { value: '100%', label: 'Satisfação da cliente', icon: 'star' },
      ],
      body: 'Um dos projetos de que mais nos orgulhamos em termos de relação tempo/qualidade. Em 10 dias, a Maria passou de uma landing page gratuita a um website com PageSpeed 100 — um resultado que a maioria das agências leva 2 meses a entregar.',
    },
    testimonial: {
      text: 'Recomendo totalmente. Profissionalismo e rapidez na execução. O meu website ficou exatamente como eu queria — moderno, elegante e fácil de usar.',
      author: 'Maria Mendes',
      role: 'Proprietária, Maria Mendes Massagens',
    },
    prevSlug: 'apiarios-terras-pulga',
    nextSlug: 'ad-sao-romao',
  },

  /* ─────────────────────────────────────────────────────────────────────
     5. AD São Romão
  ───────────────────────────────────────────────────────────────────── */
  'ad-sao-romao': {
    slug: 'ad-sao-romao',
    client: 'Assoc. Desportiva São Romão',
    title: 'AD São Romão — Website Institucional',
    category: 'Websites',
    year: '2026',
    url: 'https://adsaoromao.pt',
    metaTitle: 'AD São Romão — Website Institucional | Element Group',
    metaDescription:
      'Como a Element Group criou o website da AD São Romão em 10 dias com PageSpeed 100 e SEO 92/100. Caso de estudo de website institucional.',
    image: '/images/ADSRWEB.webp',
    heroHeadline: 'Uma associação com presença digital à altura da sua história.',
    heroSub:
      'Uma associação desportiva com décadas de história e sem website. Em 10 dias, criámos um portal digital que une a comunidade e coloca a AD São Romão no Google.',
    keyResults: [
      { value: '92/100', label: 'SEO Score Lighthouse', icon: 'star' },
      { value: 'PageSpeed 100', label: 'Performance', icon: 'speed' },
      { value: '10 dias', label: 'Do brief ao site live', icon: 'clock' },
    ],
    deliverables: ['Website Institucional', 'SEO', 'Mobile-First'],
    challenge: {
      title: 'Uma associação invisível no digital',
      body: [
        'A Associação Desportiva São Romão tem uma história rica e uma comunidade fiel — mas zero presença digital. Informações sobre jogos, eventos e notícias eram partilhadas exclusivamente em grupos de WhatsApp e na página do Facebook, com alcance limitado e organização inexistente.',
        'Sócios mais novos e familiares procuravam informação no Google e não encontravam nada. A associação perdia potenciais novos sócios e parceiros simplesmente por não existir digitalmente.',
        'A necessidade era criar um portal institucional que centralizasse a comunicação, fosse fácil de gerir e posicionasse a associação para pesquisas locais relevantes.',
      ],
    },
    solution: {
      title: 'Portal institucional completo',
      body: [
        'Desenvolvemos um website institucional com uma arquitetura de informação clara: página inicial com destaque para eventos próximos, secção de notícias, historial da associação, contactos e modalidades.',
        'A gestão de conteúdo foi simplificada ao máximo — a direção da associação pode publicar notícias e eventos sem conhecimentos técnicos. O design foi criado para refletir os valores da comunidade: seriedade, proximidade e tradição desportiva.',
        'SEO técnico completo: schema markup para organização desportiva, meta tags únicas por página, URLs limpas e sitemap automático — tudo o que o Google precisa para indexar e posicionar o website.',
      ],
      highlights: [
        'Portal com notícias e eventos',
        'Gestão de conteúdo simples',
        'Schema markup para associação desportiva',
        'SEO local para a comunidade',
        'Design que reflete a identidade da associação',
        'Entregue em 10 dias',
      ],
    },
    results: {
      title: 'Resultados desde o lançamento',
      items: [
        { value: '92/100', label: 'SEO Score no Lighthouse', icon: 'star' },
        { value: '100', label: 'PageSpeed (máx. 100)', icon: 'speed' },
        { value: '10 dias', label: 'Do brief ao website live', icon: 'check' },
        { value: '100%', label: 'Satisfação da direção', icon: 'star' },
      ],
      body: 'Um projeto que prova que velocidade e qualidade não são mutuamente exclusivos. Em 10 dias, a AD São Romão passou de zero presença digital a um website com PageSpeed 100 e SEO Score de 92/100.',
    },
    testimonial: {
      text: 'Excelente trabalho! O site ficou moderno e profissional, exatamente o que a nossa associação precisava. A equipa foi rápida, atenta e entregou tudo dentro do prazo.',
      author: 'Associação Desportiva São Romão',
      role: 'Direção',
    },
    prevSlug: 'maria-mendes-massagens',
    nextSlug: 'estrela-detail-wash',
  },

  /* ─────────────────────────────────────────────────────────────────────
     6. Estrela Detail & Wash — Branding
  ───────────────────────────────────────────────────────────────────── */
  'estrela-detail-wash': {
    slug: 'estrela-detail-wash',
    client: 'Estrela Detail & Wash',
    title: 'Estrela Detail & Wash — Branding',
    category: 'Design',
    year: '2026',
    url: null,
    metaTitle: 'Estrela Detail & Wash — Branding Premium | Element Group',
    metaDescription:
      'Como a Element Group criou a identidade visual premium da Estrela Detail & Wash: logótipo profissional, manual de marca e banner promocional. Caso de estudo de branding.',
    image: '/images/BannerEstrela.webp',
    heroHeadline: 'Uma marca premium para um serviço de excelência automóvel.',
    heroSub:
      'Um serviço de detailing de topo a merecer uma identidade visual à altura. Criámos uma marca que comunica qualidade, confiança e profissionalismo.',
    keyResults: [
      { value: '100%', label: 'Satisfação do cliente', icon: 'star' },
      { value: 'Premium', label: 'Posicionamento da marca', icon: 'check' },
      { value: '1 semana', label: 'Do briefing à entrega', icon: 'clock' },
    ],
    deliverables: ['Logótipo Profissional', 'Manual de Marca', 'Banner Promocional'],
    challenge: {
      title: 'Serviço premium com imagem amadora',
      body: [
        'A Estrela Detail & Wash oferece um serviço de detailing e lavagem automóvel de altíssimo nível — os seus clientes são proprietários de carros de alta gama que procuram o melhor tratamento para os seus veículos.',
        'Mas a identidade visual não comunicava esse posicionamento. O logótipo existente era inconsistente, criado sem critério visual e claramente amador — transmitindo exatamente o oposto do que o serviço representa.',
        'Um potencial cliente de um Mercedes S-Class ou Porsche que visse o logótipo anterior dificilmente confiaria o seu carro a esse serviço. Era preciso construir uma marca que justificasse os preços premium.',
      ],
    },
    solution: {
      title: 'Identidade visual de luxo automóvel',
      body: [
        'Desenvolvemos um processo de briefing aprofundado para entender o posicionamento pretendido: serviço premium, mas local; qualidade de showroom, mas acessível; profissional, mas com alma.',
        'O logótipo combina tipografia editorial bold com um ícone geométrico limpo — transmitindo precisão e profissionalismo sem ser frio. A paleta de cores assenta em tons escuros com detalhes metálicos, evocando a sofisticação automóvel.',
        'O manual de marca garante consistência em todos os pontos de contacto: cartão de visita, redes sociais, uniforme, viatura de serviço. O banner promocional foi otimizado para Instagram e Facebook, os principais canais de aquisição de clientes.',
      ],
      highlights: [
        'Logótipo principal + variações',
        'Paleta de cores e tipografia',
        'Manual de marca completo',
        'Banner para redes sociais',
        'Aplicações em mockups reais',
        'Entregue em ficheiros vetoriais',
      ],
    },
    results: {
      title: 'Uma marca que fecha negócios',
      items: [
        { value: '100%', label: 'Satisfação do cliente', icon: 'star' },
        { value: 'Premium', label: 'Posicionamento conseguido', icon: 'check' },
        { value: '1 semana', label: 'Do briefing à entrega final', icon: 'clock' },
        { value: '∞', label: 'Versões vetoriais para uso ilimitado', icon: 'check' },
      ],
      body: 'Uma identidade visual coerente e profissional que posiciona a Estrela Detail & Wash no mercado premium — justificando os preços e atraindo o cliente certo.',
    },
    testimonial: {
      text: 'Ficou exatamente como imaginámos — profissional e com impacto. A marca comunica exatamente o que somos: um serviço de excelência.',
      author: 'Estrela Detail & Wash',
      role: 'Proprietário',
    },
    prevSlug: 'ad-sao-romao',
    nextSlug: 'football-nation-store-branding',
  },

  /* ─────────────────────────────────────────────────────────────────────
     7. Football Nation Store — Branding
  ───────────────────────────────────────────────────────────────────── */
  'football-nation-store-branding': {
    slug: 'football-nation-store-branding',
    client: 'Football Nation Store',
    title: 'Football Nation Store — Branding',
    category: 'Design',
    year: '2026',
    url: null,
    metaTitle: 'Football Nation Store — Branding & Identidade Visual',
    metaDescription:
      'Como a Element Group criou a identidade visual completa da Football Nation Store de raiz: logótipo, cartão de visita e brand guidelines. Caso de estudo de branding.',
    image: '/images/mockuplogofootball.webp',
    heroHeadline: 'Identidade visual de raiz para e-commerce de futebol.',
    heroSub:
      'Uma marca de futebol criada do zero — com energia, impacto e a personalidade certa para se destacar num mercado competitivo.',
    keyResults: [
      { value: '100%', label: 'Satisfação do cliente', icon: 'star' },
      { value: 'Premium', label: 'Posicionamento da marca', icon: 'check' },
      { value: '1 semana', label: 'Conceito à entrega final', icon: 'clock' },
    ],
    deliverables: ['Logótipo Profissional', 'Cartão de Visita', 'Brand Guidelines'],
    challenge: {
      title: 'Lançar uma marca num mercado competitivo',
      body: [
        'A Football Nation Store queria entrar no mercado de camisolas de futebol — um setor com players estabelecidos e marcas reconhecidas. Sem identidade visual, seria impossível criar memorabilidade e confiança nos primeiros contactos com clientes.',
        'O desafio era criar uma marca que transmitisse paixão pelo futebol e credibilidade como loja especializada, sem parecer uma cópia das marcas existentes. Tinha de ser original, contemporânea e consistente.',
        'A marca precisava de funcionar em múltiplos contextos: website, redes sociais, embalagens, e comunicação digital — com a mesma força e reconhecimento em todos.',
      ],
    },
    solution: {
      title: 'Uma marca com garra própria',
      body: [
        'Desenvolvemos o conceito visual a partir dos valores definidos no briefing: autenticidade, paixão desportiva, comunidade e qualidade. A identidade afasta-se dos clichês do futebol (campo verde, bola) em favor de uma abordagem mais editorial e moderna.',
        'O logótipo usa tipografia bold com uma ligação visual que cria um símbolo único e reconhecível. A paleta de cores evoca a intensidade do jogo sem ser demasiado óbvia — um equilíbrio entre familiar e surpreendente.',
        'Os brand guidelines garantem que qualquer futura aplicação da marca — seja numa caixa de envio ou num anúncio do Instagram — mantém a coerência e o impacto da identidade original.',
      ],
      highlights: [
        'Conceito visual original',
        'Logótipo em múltiplas versões',
        'Cartão de visita premium',
        'Brand guidelines completos',
        'Ficheiros vetoriais editáveis',
        'Aplicações em mockups reais',
      ],
    },
    results: {
      title: 'Uma identidade que abre portas',
      items: [
        { value: '100%', label: 'Satisfação do cliente', icon: 'star' },
        { value: 'Premium', label: 'Posicionamento conseguido', icon: 'check' },
        { value: '1 semana', label: 'Do conceito à entrega', icon: 'clock' },
        { value: '∞', label: 'Aplicações possíveis com os ficheiros', icon: 'check' },
      ],
      body: 'A Football Nation Store lançou o e-commerce com uma identidade visual que transmite confiança desde o primeiro contacto — um dos fatores críticos para a conversão em lojas online novas.',
    },
    testimonial: {
      text: 'Superou as expectativas! O logótipo ficou profissional e com a identidade certa. Estamos muito satisfeitos com o resultado e com a rapidez da entrega.',
      author: 'Football Nation Store',
      role: 'Fundador',
    },
    prevSlug: 'estrela-detail-wash',
    nextSlug: 'matias-nature-portugal',
  },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES[slug];
}

export function getAllSlugs(): string[] {
  return Object.keys(CASE_STUDIES);
}

export const SITE_URL_CS = 'https://elementgroup.pt';
