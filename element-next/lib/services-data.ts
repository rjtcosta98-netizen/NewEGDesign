const SITE_URL = 'https://elementgroup.pt';
const WA_BASE = 'https://wa.me/351930477894?text=';

export type ServiceFAQ = { q: string; a: string };
export type ServiceDeliverable = { icon: string; label: string; desc: string };
export type ServiceDifferentiator = { num: string; title: string; desc: string };

export type ServicePage = {
  slug: string;
  color: string;
  accentHex: string;
  iconId: string;
  title: string;
  definition?: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  h1: string;
  h1Em: string;
  price: string;
  priceNum: number;
  period: string;
  badge: string | null;
  heroSub: string;
  deliverables: ServiceDeliverable[];
  differentiators: ServiceDifferentiator[];
  faqs: ServiceFAQ[];
  relatedSlugs: string[];
  trustBadges?: string[];
  processSteps?: ServiceDifferentiator[];
  whyStat?: { value: string; label: string };
  ctaHeadline?: string;
  riskNote?: string;
  checklist?: string[];
};

export const SERVICE_PAGES: ServicePage[] = [
  /* ── 1. Criação de Websites ────────────────────────────────────────── */
  {
    slug: 'criacao-de-websites',
    color: 'violet',
    accentHex: '#a78bfa',
    iconId: 'globe',
    title: 'Criação de Websites',
    definition: 'Criação de websites profissionais é o desenvolvimento de um site à medida com código 100% original (sem templates), PageSpeed 95+, SEO técnico e mobile-first incluídos, entregue em 2–3 semanas a partir de 197€. Disponível para PMEs em todo o território português.',
    metaTitle: 'Criação de Websites em Portugal | Element Group',
    metaDescription:
      'Websites profissionais à medida desde 197€. Código 100% original, PageSpeed 95+, SEO técnico incluído. Proposta gratuita em 24h. Entrega em 2–3 semanas.',
    ogTitle: 'Criação de Websites Profissionais | desde 197€ | Element Group',
    ogDescription:
      'Websites à medida com PageSpeed 95+, SEO incluído e código 100% original. Agência digital portuguesa com propostas em 24h.',
    h1: 'Criação de websites profissionais',
    h1Em: 'que vendem por si.',
    price: 'desde 197€',
    priceNum: 197,
    period: 'pagamento único',
    badge: 'Popular',
    heroSub:
      'Sites institucionais à medida em Portugal — código 100% original, sem templates. PageSpeed 95+, SEO técnico, mobile-first e apoio pós-lançamento incluídos desde 197€.',
    deliverables: [
      { icon: 'brush', label: 'Design 100% à medida', desc: 'Sem templates pré-feitos. Cada pixel concebido para o teu negócio e público.' },
      { icon: 'speed', label: 'PageSpeed 95+', desc: 'Core Web Vitals otimizados por defeito. O teu site carrega em menos de 1,5 segundos.' },
      { icon: 'seo', label: 'SEO técnico incluído', desc: 'Schema markup, sitemap, canonical, meta tags e otimização on-page desde o primeiro dia.' },
      { icon: 'mobile', label: 'Mobile-first', desc: 'Desenhado para telemóvel primeiro. Experiência perfeita em qualquer dispositivo.' },
      { icon: 'code', label: 'Código 100% teu', desc: 'Recebes o código-fonte completo. Sem dependências de subscrições ou plataformas externas.' },
      { icon: 'support', label: 'Apoio pós-lançamento', desc: 'Suporte e pequenas alterações incluídas após o lançamento. Não ficas sozinho.' },
    ],
    differentiators: [
      { num: '01', title: 'Preço justo, qualidade premium', desc: 'Agências tradicionais cobram €2.000–€5.000 por sites comparáveis. A nossa tecnologia moderna reduz o tempo de produção sem baixar a qualidade — por isso cobramos 197€.' },
      { num: '02', title: 'Sem templates, sem WordPress lento', desc: 'Nada de temas pré-feitos com 40 plugins. O teu site é construído de raiz: mais rápido, mais seguro e 100% personalizado.' },
      { num: '03', title: 'Entrega em 2–3 semanas', desc: 'Processo claro com feedback em cada etapa. Sabes sempre em que ponto o projeto está — sem surpresas nem atrasos.' },
    ],
    faqs: [
      { q: 'Quanto custa criar um website profissional em Portugal?', a: 'Na Element Group, um website profissional começa em 197€ (pagamento único). Inclui design à medida, SEO técnico, mobile-first e apoio pós-lançamento. Agências tradicionais cobram tipicamente entre €2.000 e €5.000 por sites comparáveis.' },
      { q: 'Quanto tempo demora a criar um website?', a: 'Sites institucionais são entregues em 2 a 3 semanas. O processo tem etapas definidas: diagnóstico, estratégia, design, desenvolvimento e lançamento — com o teu feedback em cada fase.' },
      { q: 'O SEO está incluído na criação do website?', a: 'Sim. SEO técnico (schema markup, sitemap, canonical, velocidade), otimização on-page e Core Web Vitals estão sempre incluídos. SEO mensal contínuo é opcional no pacote de Marketing Digital.' },
      { q: 'Vou ter acesso ao código do meu website?', a: 'Sim. Recebes o código-fonte completo. O site é 100% teu — sem dependências de plataformas externas ou subscrições obrigatórias.' },
    { q: 'Fazem alojamento e domínio?', a: 'Sim. Tratamos do registo de domínio e alojamento com SSL incluído e performance otimizada para o mercado português. Disponível como add-on mensal acessível, sem contratos anuais obrigatórios.' },
    ],
    relatedSlugs: ['negocios-locais', 'loja-online', 'redesign-migracao'],
  },

  /* ── 2. Negócios Locais ─────────────────────────────────────────────── */
  {
    slug: 'negocios-locais',
    color: 'yellow',
    accentHex: '#facc15',
    iconId: 'pin',
    title: 'Negócios Locais',
    definition: 'Solução de SEO local para negócios físicos em Portugal: website profissional + ficha Google Business Profile otimizada + SEO geo-segmentado para aparecer no Top 3 do Google Maps. Desde 297€, resultados visíveis em 30–60 dias.',
    metaTitle: 'Website Negócio Local + SEO Local | Element Group',
    metaDescription:
      'Website para negócio local com SEO geo-segmentado e Google Maps Top 3. Para restaurantes, clínicas e lojas. Desde 297€, proposta grátis em 24h.',
    ogTitle: 'Website para Negócio Local + Google Maps Top 3 | desde 297€',
    ogDescription:
      'Solução completa para negócios físicos em Portugal: site profissional + SEO local + ficha Google otimizada. Apareça no topo das pesquisas locais.',
    h1: 'Website para negócio local',
    h1Em: 'no topo do Google Maps.',
    price: 'desde 297€',
    priceNum: 297,
    period: 'pagamento único',
    badge: null,
    heroSub:
      'Solução completa para negócios físicos em Portugal: website profissional + ficha Google otimizada + SEO geo-segmentado. Apareça quando alguém pesquisa o teu serviço na tua cidade.',
    deliverables: [
      { icon: 'maps', label: 'Ficha Google otimizada', desc: 'Configuração e otimização completa do Google Business Profile para máxima visibilidade local.' },
      { icon: 'seo', label: 'SEO local geo-segmentado', desc: 'Keywords para a tua cidade e serviço. Apareces quando alguém pesquisa "restaurante Lisboa" ou "canalização Porto".' },
      { icon: 'schema', label: 'Schema markup local', desc: 'LocalBusiness, OpeningHours, GeoCoordinates — dados estruturados que o Google lê e valoriza.' },
      { icon: 'calendar', label: 'Reservas e contactos online', desc: 'Formulário de marcação, WhatsApp direto e click-to-call integrados no site.' },
      { icon: 'reviews', label: 'Estratégia de reviews', desc: 'Orientação sobre como obter mais avaliações positivas no Google para escalar a autoridade local.' },
      { icon: 'speed', label: 'PageSpeed 95+ garantido', desc: 'Performance técnica de topo — um fator de ranking que o Google considera explicitamente.' },
    ],
    differentiators: [
      { num: '01', title: 'Especialistas em SEO local português', desc: 'Sabemos como o Google trata as pesquisas em Portugal. Geo-keywords, zonas de influência e localização no Maps são configurados com precisão.' },
      { num: '02', title: 'Solução all-in-one', desc: 'Site + Google Maps + SEO local numa só proposta. Não precisas de coordenar vários fornecedores: nós tratamos de tudo.' },
      { num: '03', title: 'Resultados visíveis em 30–60 dias', desc: 'Com a ficha Google otimizada e o SEO local correto, a maioria dos clientes começa a ver melhorias de posição nas primeiras 4 a 8 semanas.' },
    ],
    faqs: [
      { q: 'O que é o SEO local e porquê é importante para o meu negócio?', a: 'SEO local é a otimização do teu negócio para aparecer em pesquisas geográficas — "restaurante Lisboa" ou "dentista Braga". Com ficha Google otimizada e site com schema local, apareces no "pacote de 3" do Maps, onde estão 70% dos cliques.' },
      { q: 'Funciona para que tipo de negócios locais?', a: 'Restaurantes, cafés, salões de beleza, clínicas, ginásios, lojas físicas, canalistas, eletricistas, advogados, médicos e qualquer negócio com morada física. Se tens clientes de uma zona geográfica, tens a beneficiar do SEO local.' },
      { q: 'Quanto tempo para aparecer no Top 3 do Google Maps?', a: 'Depende da concorrência na tua cidade e setor. Com a nossa otimização, a maioria dos clientes vê melhorias visíveis em 30 a 60 dias. Mercados muito competitivos (Lisboa centro, Porto) podem levar 2 a 4 meses.' },
      { q: 'O que é o Google Business Profile e como o otimizam?', a: 'O Google Business Profile é a ficha do teu negócio no Maps e na pesquisa. Otimizamos categorias, descrição, fotos, horários, atributos e publicações regulares — todos os fatores que o Google usa para ordenar os resultados locais.' },
      { q: 'Têm casos de sucesso em negócios locais?', a: 'Sim. Maria Mendes Massagens: passou da 2.ª página para Top 3 do Google Maps em menos de 45 dias após o nosso trabalho. Temos casos de estudo detalhados disponíveis por email.' },
    ],
    relatedSlugs: ['criacao-de-websites', 'marketing-digital', 'redesign-migracao'],
  },

  /* ── 3. Loja Online ─────────────────────────────────────────────────── */
  {
    slug: 'loja-online',
    color: 'green',
    accentHex: '#22c55e',
    iconId: 'shop',
    title: 'Loja Online',    definition: 'Loja online completa (e-commerce) para o mercado português, com pagamentos MBWay, Multibanco e cartão, gestão de stock, faturação automática AT e SEO e-commerce incluîdo. Desde 997€, entrega em 4–6 semanas, sem mensalidades de plataforma.',    metaTitle: 'Criar Loja Online em Portugal | Element Group',
    metaDescription:
      'Cria a tua loja online em Portugal com MBWay, Multibanco, gestão de stock e faturação automática. E-commerce profissional desde 997€. Entrega em 4–6 semanas.',
    ogTitle: 'Criar Loja Online em Portugal | desde 997€ | Element Group',
    ogDescription:
      'E-commerce completo com MBWay, Multibanco, gestão de stock e SEO incluído. A tua loja a funcionar em 4 a 6 semanas.',
    h1: 'Cria a tua loja online',
    h1Em: 'com pagamentos portugueses.',
    price: 'desde 997€',
    priceNum: 997,
    period: 'pagamento único',
    badge: null,
    heroSub:
      'E-commerce completo para o mercado português — MBWay, Multibanco, cartão, gestão de stock, faturação automática e SEO e-commerce incluídos. A tua loja online pronta a vender em 4 a 6 semanas.',
    deliverables: [
      { icon: 'payment', label: 'MBWay, Multibanco e cartão', desc: 'Métodos de pagamento portugueses totalmente integrados. Os teus clientes pagam como preferem.' },
      { icon: 'stock', label: 'Gestão de produtos e stock', desc: 'Painel de controlo intuitivo para adicionar produtos, gerir stock e atualizar preços sem precisar de ajuda técnica.' },
      { icon: 'invoice', label: 'Faturação automática', desc: 'Emissão automática de faturas em conformidade com a AT (Autoridade Tributária) portuguesa.' },
      { icon: 'seo', label: 'SEO e-commerce incluído', desc: 'Páginas de produto, categorias e breadcrumbs otimizados para o Google. Schema markup de produto incluído.' },
      { icon: 'mobile', label: 'Checkout mobile-first', desc: 'Processo de compra otimizado para telemóvel — o canal onde ocorrem 65% das compras em Portugal.' },
      { icon: 'analytics', label: 'Analytics e conversão', desc: 'Google Analytics 4 com rastreio de e-commerce e funil de conversão configurados desde o lançamento.' },
    ],
    differentiators: [
      { num: '01', title: 'Desenvolvida para o mercado português', desc: 'Não adaptamos uma solução estrangeira — integramos MBWay, Multibanco e faturação AT desde o início. Zero fricção para os teus clientes.' },
      { num: '02', title: 'Sem mensalidades obrigatórias de plataforma', desc: 'Ao contrário do Shopify ou WooCommerce hospedado, o teu e-commerce é desenvolvido para que sejas 100% dono da plataforma sem taxas mensais fixas.' },
      { num: '03', title: 'Código 100% original, performance 95+', desc: 'Lojas online lentas perdem vendas. O nosso e-commerce carrega em menos de 2 segundos — comprovado por PageSpeed 95+.' },
    ],
    faqs: [
      { q: 'Qual a diferença entre a vossa loja e o Shopify ou WooCommerce?', a: 'O Shopify cobra entre €30 e €300/mês para sempre, mais 2% por transação. O WooCommerce hospedado tem custos de plugins e manutenção. A nossa solução é um desenvolvimento à medida — pagas uma vez e a loja é 100% tua, sem taxas mensais obrigatórias.' },
      { q: 'O MBWay e o Multibanco ficam incluídos?', a: 'Sim. Integramos MBWay, Multibanco, cartão de crédito/débito e transferência bancária. São os métodos mais usados em Portugal e ficam todos disponíveis no checkout.' },
      { q: 'Posso gerir os produtos eu próprio após o lançamento?', a: 'Sim. O painel de gestão é intuitivo — sem necessidade de conhecimentos técnicos. Adicionas produtos, atualizes preços e gerenças stock diretamente, com ou sem o nosso apoio.' },
      { q: 'Quanto tempo demora a criar uma loja online?', a: '4 a 6 semanas para lojas standard. Marketplaces ou lojas com catálogo muito grande podem levar 8 semanas. O prazo inclui design, desenvolvimento, testes e migração de produtos.' },
      { q: 'O SEO e-commerce está incluído?', a: 'Sim. Páginas de produto e categoria com meta tags únicas, schema markup de produto (preço, disponibilidade, avaliações), sitemap dinâmico e breadcrumbs — tudo configurado para o Google.' },
    ],
    relatedSlugs: ['criacao-de-websites', 'marketing-digital', 'design-grafico'],
  },

  /* ── 4. Apps Mobile ─────────────────────────────────────────────────── */
  {
    slug: 'apps-mobile',
    color: 'cyan',
    accentHex: '#22d3ee',
    iconId: 'mobile',
    title: 'Apps Mobile',
    definition: 'Desenvolvimento de apps nativas iOS e Android e Progressive Web Apps (PWA) em Portugal, com painél de gestão incluído, notificações push e integração com APIs. Desde 1.497€, código 100% do cliente, entrega em 6–8 semanas.',
    metaTitle: 'Apps Mobile iOS, Android & PWA | Element Group',
    metaDescription:
      'Apps mobile para iOS e Android desde 1.497€. Apps nativas e PWA com painel de gestão, notificações push e integração com APIs incluídos.',
    ogTitle: 'Apps Mobile iOS, Android & PWA em Portugal | desde 1.497€',
    ogDescription:
      'Desenvolvimento de apps nativas e Progressive Web Apps para iOS e Android. Painel de gestão incluído, notificações push e integração com APIs externas.',
    h1: 'Apps mobile para iOS e Android',
    h1Em: 'feitas em Portugal.',
    price: 'desde 1.497€',
    priceNum: 1497,
    period: 'pagamento único',
    badge: null,
    heroSub:
      'Apps nativas iOS/Android e Progressive Web Apps desenvolvidas em Portugal. Notificações push, integração com APIs, painel de gestão incluído. Desde 1.497€, com código 100% teu.',
    deliverables: [
      { icon: 'apple', label: 'iOS, Android & PWA', desc: 'Desenvolvemos apps nativas para iOS e Android, ou PWA (Progressive Web App) que funciona em qualquer dispositivo sem instalação.' },
      { icon: 'bell', label: 'Notificações push', desc: 'Mantém os utilizadores envolvidos com notificações push personalizadas e automatizadas.' },
      { icon: 'api', label: 'Integração com APIs', desc: 'Ligamos a tua app a qualquer API externa — pagamentos, mapas, reservas, CRM ou sistemas internos.' },
      { icon: 'dashboard', label: 'Painel de gestão incluído', desc: 'Backoffice web para gerir utilizadores, conteúdo e dados da app sem precisar de programadores.' },
      { icon: 'store', label: 'Publicação nas stores', desc: 'Tratamos da publicação na App Store e Google Play — revisão, assets e metadados incluídos.' },
      { icon: 'code', label: 'Código 100% teu', desc: 'Recebes todo o código-fonte. Sem licenças ou plataformas com custos mensais obrigatórios.' },
    ],
    differentiators: [
      { num: '01', title: 'Preço justo para desenvolvimento mobile', desc: 'O mercado cobra tipicamente €15.000–€80.000 por apps de qualidade. O nosso processo estruturado e tecnologia moderna permite entregar apps profissionais a partir de 1.497€.' },
      { num: '02', title: 'PWA ou nativa — a escolha certa para o teu caso', desc: 'Nem sempre uma app nativa é necessária. Aconselhamos honestamente sobre PWA vs. nativa, consoante o orçamento, audiência e funcionalidades necessárias.' },
      { num: '03', title: 'Painel de gestão incluído', desc: 'A maioria das empresas acaba por pagar €3.000–€10.000 extra por um backoffice. Nós incluímos o painel de gestão por defeito, para que sejas autónomo após o lançamento.' },
    ],
    faqs: [
      { q: 'Qual a diferença entre uma app nativa e uma PWA?', a: 'Uma app nativa (iOS/Android) é instalada da App Store ou Google Play e tem acesso total ao hardware do dispositivo. Uma PWA funciona no browser, não precisa de instalação e é mais rápida de desenvolver. Recomendamos PWA para casos de uso mais simples e apps nativas para funcionalidades avançadas (câmara, notificações, pagamentos in-app).' },
      { q: 'Quanto tempo demora o desenvolvimento de uma app?', a: '6 a 8 semanas para apps standard. Apps mais complexas com integrações avançadas podem levar 10 a 14 semanas. O prazo inclui design, desenvolvimento, testes e publicação nas stores.' },
      { q: 'Ficam responsáveis pela publicação na App Store e Google Play?', a: 'Sim. Tratamos de toda a documentação e assets necessários para aprovação nas stores. Tens de ter conta de developer (Apple Developer Program: $99/ano; Google Play: $25 único) — podemos orientar-te no processo de criação.' },
      { q: 'Posso adicionar funcionalidades após o lançamento?', a: 'Sim. O desenvolvimento é modular e documentado para que novas funcionalidades possam ser adicionadas facilmente. Oferecemos também contratos de manutenção mensal para updates contínuos.' },
      { q: 'As vossas apps passam na revisão da Apple?', a: 'Sim. Conhecemos as diretrizes da App Store e desenvolvemos em conformidade. Nunca tivemos um projeto rejeitado definitivamente — casos de pedido de informação adicional foram resolvidos em menos de 48 horas.' },
    ],
    relatedSlugs: ['criacao-de-websites', 'loja-online', 'marketing-digital'],
  },

  /* ── 5. Design Gráfico ──────────────────────────────────────────────── */
  {
    slug: 'design-grafico',
    color: 'red',
    accentHex: '#f87171',
    iconId: 'palette',
    title: 'Design Gráfico',
    definition: 'Design gráfico e identidade visual para empresas portuguesas: logótipo profissional, manual de marca e ficheiros editáveis (AI, EPS, SVG, PNG). Desde 297€, 2 conceitos iniciais + 2 rondas de revisão, entrega em 1–2 semanas.',
    metaTitle: 'Design Gráfico & Logótipo | desde 297€ | Element Group',
    metaDescription:
      'Design gráfico em Portugal: logótipo, manual de marca e identidade visual para empresas. Desde 297€, com ficheiros editáveis e variações de logótipo incluídas.',
    ogTitle: 'Logótipo & Identidade Visual para Empresas | desde 297€ | Element Group',
    ogDescription:
      'Logótipo profissional, manual de marca e design gráfico para empresas em Portugal. Desde 297€, entrega em 1–2 semanas com ficheiros editáveis incluídos.',
    h1: 'Logótipo e identidade visual',
    h1Em: 'que ficam na memória.',
    price: 'desde 297€',
    priceNum: 297,
    period: 'pagamento único',
    badge: null,
    heroSub:
      'Design gráfico profissional para empresas em Portugal — logótipo, manual de marca e identidade visual coerente. Desde 297€, com ficheiros editáveis, entrega em 1–2 semanas.',
    deliverables: [
      { icon: 'logo', label: 'Logótipo + variações', desc: 'Versão principal, versão horizontal, versão símbolo e versão a preto e branco. Pronto para qualquer uso.' },
      { icon: 'book', label: 'Manual de marca', desc: 'Paleta de cores, tipografia, espaçamentos e regras de uso. Garantia de consistência visual em todos os canais.' },
      { icon: 'social', label: 'Posts redes sociais', desc: 'Templates editáveis para Instagram, Facebook e LinkedIn. Mantens a identidade visual sem precisar de designer.' },
      { icon: 'files', label: 'Ficheiros editáveis incluídos', desc: 'Recebes ficheiros AI, EPS, SVG, PNG e PDF. Usas em qualquer plataforma, para sempre.' },
      { icon: 'print', label: 'Versões para impressão', desc: 'Ficheiros CMYK prontos para cartões, papel timbrado, banners e qualquer material impresso.' },
      { icon: 'mockup', label: 'Mockups de apresentação', desc: 'Visualizações da identidade em contexto real — cartão de visita, t-shirt, montra, etc.' },
    ],
    differentiators: [
      { num: '01', title: 'Design estratégico, não apenas bonito', desc: 'Um bom logótipo precisa de ser funcionar a 16px e a 1600px, a cores e a preto e branco, em digital e em impressão. Todos estes critérios guiam o nosso processo.' },
      { num: '02', title: 'Processo colaborativo com feedback estruturado', desc: 'Apresentamos 2 conceitos distintos para o teu feedback. Cada revisão é orientada — não é "gostar ou não gostar" à sorte.' },
      { num: '03', title: 'Tudo integrado com o teu website', desc: 'Se desenvolvemos o site também, a identidade visual é aplicada com consistência total — fontes, cores e elementos gráficos completamente alinhados.' },
    ],
    faqs: [
      { q: 'O que inclui exatamente o pacote de design gráfico?', a: 'Logótipo principal + variações (horizontal, símbolo, preto e branco), paleta de cores, tipografia, manual de marca, templates de posts para redes sociais e todos os ficheiros editáveis (AI, SVG, PNG, PDF, CMYK).' },
      { q: 'Quantas revisões posso pedir ao logótipo?', a: 'Apresentamos 2 conceitos iniciais distintos. Cada conceito tem 2 rondas de revisão incluídas. Revisões adicionais fora deste âmbito têm custo extra acordado previamente.' },
      { q: 'Quanto tempo demora a criar um logótipo?', a: '7 a 14 dias para o processo completo: briefing, pesquisa, 2 conceitos, revisões e entrega final com todos os ficheiros.' },
      { q: 'Posso usar o logótipo para impressão?', a: 'Sim. Entregamos ficheiros em CMYK prontos para qualquer tipo de impressão — cartões, papel timbrado, banners, viaturas ou uniformes.' },
      { q: 'E se não gostar de nenhum dos conceitos apresentados?', a: 'Isso raramente acontece porque o processo começa com um briefing aprofundado. Se após as revisões o resultado não corresponder às expectativas, apresentamos um terceiro conceito sem custo adicional.' },
    ],
    relatedSlugs: ['criacao-de-websites', 'loja-online', 'marketing-digital'],
  },

  /* ── 6. Redesign & Migração ─────────────────────────────────────────── */
  {
    slug: 'redesign-migracao',
    color: 'teal',
    accentHex: '#2dd4bf',
    iconId: 'pencil',
    title: 'Redesign & Migração',
    definition: 'Redesign de website e migração de plataforma sem perder posições no Google: processo SEO-safe com checklist de 80+ pontos, redirects 301, PageSpeed 95+ e zero downtime garantido. Desde 297€, staging antes do lançamento.',
    metaTitle: 'Redesign & Migração Web sem Perder SEO | Element Group',
    metaDescription:
      'Redesign de website sem perder SEO. Redirects 301, autoridade preservada e PageSpeed 95+. Zero downtime garantido. Desde 297€, proposta grátis.',
    ogTitle: 'Redesign de Website & Migração sem Perder SEO | desde 297€',
    ogDescription:
      'Renova o teu site sem perder posições no Google. Redirects 301, SEO preservado, PageSpeed 95+ e zero downtime. Desde 297€.',
    h1: 'Redesign e migração de website',
    h1Em: 'sem perder o SEO.',
    price: 'desde 297€',
    priceNum: 297,
    period: 'pagamento único',
    badge: null,
    heroSub:
      'O teu site está desatualizado mas tens medo de perder posições no Google? Fazemos o redesign e a migração com redirects 301 cuidados, SEO preservado e PageSpeed 95+. Zero downtime garantido.',
    deliverables: [
      { icon: 'redirect', label: 'Redirects 301 cuidados', desc: 'Mapeamos todos os URLs antigos para os novos com redirects 301. Nenhuma posição no Google é perdida por erros de migração.' },
      { icon: 'seo', label: 'Preservação total do SEO', desc: 'Auditoria SEO pré-migração, preservação de keywords, meta tags e autoridade. O Google não nota a transição.' },
      { icon: 'speed', label: 'Performance 95+', desc: 'O novo site é até 3x mais rápido que o anterior. PageSpeed 95+, Core Web Vitals verdes e carregamento sub-2 segundos.' },
      { icon: 'uptime', label: 'Zero downtime', desc: 'A migração é feita em ambiente de staging. O site antigo permanece online até ao momento exato do lançamento do novo.' },
      { icon: 'audit', label: 'Auditoria técnica completa', desc: 'Análise de 80+ pontos técnicos antes e após a migração: crawl errors, broken links, duplicados, canonical e indexação.' },
      { icon: 'monitor', label: 'Monitorização pós-migração', desc: 'Acompanhamento de rankings, Search Console e tráfego durante 30 dias após o lançamento.' },
    ],
    differentiators: [
      { num: '01', title: 'Especialistas em migrações SEO-safe', desc: 'A maior causa de perda de tráfego em redesigns é a migração descuidada. O nosso processo tem uma checklist de 80+ pontos criada especificamente para migrações SEO-safe.' },
      { num: '02', title: 'Staging antes do lançamento', desc: 'O redesign é desenvolvido e testado em ambiente privado. Só vai a público quando estiver 100% aprovado — sem surpresas para os visitantes nem para o Google.' },
      { num: '03', title: 'Saímos mais fortes do que entrámos', desc: 'Não nos limitamos a preservar o SEO — melhoramos-o. A maioria dos clientes vê aumento de posições no mês seguinte à migração graças à performance melhorada.' },
    ],
    faqs: [
      { q: 'Posso perder posições no Google ao fazer um redesign?', a: 'É um risco real se a migração for mal feita. Os erros mais comuns são: URLs alterados sem redirects 301, meta tags perdidas e velocidade do site piorada. O nosso processo de migração SEO-safe previne todos estes erros com uma checklist de 80+ pontos.' },
      { q: 'Quais as plataformas de origem que conseguem migrar?', a: 'WordPress, Wix, Squarespace, Webflow, Shopify, Joomla, Drupal e qualquer plataforma custom. Se tens um site, conseguimos migrar e melhorá-lo.' },
      { q: 'O site vai ficar offline durante a migração?', a: 'Não. Desenvolvemos o novo site em staging (ambiente privado) enquanto o antigo continua online. O lançamento é feito com um switch DNS de menos de 5 minutos.' },
      { q: 'O que é um redirect 301 e porquê é importante?', a: 'Um redirect 301 diz ao Google "esta página mudou de endereço, transfere toda a autoridade para o novo URL". Sem redirects, o Google vê o novo site como um site completamente novo e perde-se toda a autoridade acumulada.' },
      { q: 'Fazem auditoria SEO antes de começar?', a: 'Sim. A auditoria pré-migração é parte do nosso processo: inventariamos todos os URLs indexados, verificamos backlinks relevantes e auditamos o SEO atual para preservar (e melhorar) tudo o que já funciona.' },
    ],
    relatedSlugs: ['criacao-de-websites', 'negocios-locais', 'marketing-digital'],
    trustBadges: ['Zero downtime', '301 redirects mapeados', 'SEO 100% preservado', 'Staging privado'],
    processSteps: [
      { num: '01', title: 'Auditoria SEO', desc: 'Inventariamos todos os URLs indexados, backlinks e o estado do SEO atual antes de mover uma linha de código.' },
      { num: '02', title: 'Mapa de redirects', desc: 'Criamos o mapa completo de redirects 301 — cada URL antigo ligado ao novo, sem buracos nem perdas de autoridade.' },
      { num: '03', title: 'Staging & testes', desc: 'O novo design é construído e testado em ambiente privado. O teu site atual permanece online sem qualquer interrupção.' },
      { num: '04', title: 'Launch zero-downtime', desc: 'Switch DNS em menos de 5 minutos. Monitorização de rankings, Search Console e tráfego durante 30 dias pós-lançamento.' },
    ],
    whyStat: { value: '80%', label: 'dos redesigns perdem tráfego orgânico no mês seguinte por erros de migração evitáveis' },
    ctaHeadline: 'O teu site merece renovação —<br />sem perder o que <em>já conquistaste.</em>',
    riskNote: '80% dos redesigns perdem tráfego orgânico no primeiro mês por erros de migração evitáveis.',
    checklist: [
      'Inventário completo de URLs indexados',
      'Mapeamento de todos os redirects 301',
      'Preservação de meta tags e canonical',
      'Verificação de backlinks relevantes',
      'Teste de performance pré e pós-lançamento',
      'Validação de Schema markup',
      'Search Console configurado e verificado',
      'Monitorização 30 dias pós-lançamento',
      'Broken links eliminados',
      'Sitemap XML atualizado e submetido',
    ],
  },

  /* ── 7. Marketing Digital ───────────────────────────────────────────── */
  {
    slug: 'marketing-digital',
    color: 'yellow',
    accentHex: '#fbbf24',
    iconId: 'megaphone',
    title: 'Marketing Digital',
    definition: 'Gestão completa de marketing digital para PMEs em Portugal: redes sociais (Instagram, Facebook), Google Ads com foco em ROI e SEO mensal. Conteúdo criativo, relatórios mensais de performance e estratégia de crescimento incluídos. Desde 350€/mês.',
    metaTitle: 'Marketing Digital para PMEs | desde 350€/mês | Element Group',
    metaDescription:
      'Gestão de redes sociais, Google Ads e SEO mensal para PMEs em Portugal. Instagram, Facebook e Google por especialistas. Desde 350€/mês.',
    ogTitle: 'Marketing Digital para PMEs em Portugal | desde 350€/mês | Element Group',
    ogDescription:
      'Gestão de Instagram, Facebook e Google Ads para PMEs em Portugal. SEO mensal, conteúdo criativo e relatórios de performance incluídos. Desde 350€/mês.',
    h1: 'Marketing digital para PMEs',
    h1Em: 'com resultados mensuráveis.',
    price: 'desde 350€',
    priceNum: 350,
    period: 'por mês',
    badge: null,
    heroSub:
      'Gestão completa de redes sociais, Google Ads e SEO mensal para PMEs em Portugal. Conteúdo criativo, relatórios de performance e uma equipa dedicada ao crescimento do teu negócio. Desde 350€/mês.',
    deliverables: [
      { icon: 'instagram', label: 'Instagram + Facebook geridos', desc: 'Criação de conteúdo, publicação regular e gestão de comunidade. A tua presença nas redes sempre ativa e coerente.' },
      { icon: 'ads', label: 'Google Ads otimizados', desc: 'Campanhas de pesquisa e display geridas com foco em ROI. Sem desperdício de orçamento em cliques irrelevantes.' },
      { icon: 'seo', label: 'SEO mensal e relatórios', desc: 'Otimização contínua de conteúdo, backlinks e performance técnica. Relatório mensal com posições, tráfego e conversões.' },
      { icon: 'content', label: 'Conteúdo criativo incluído', desc: 'Copywriting, design de posts e criação de stories — tudo produzido pela nossa equipa, com a tua aprovação.' },
      { icon: 'analytics', label: 'Dashboard de resultados', desc: 'Relatório mensal com métricas claras: impressões, cliques, leads, custo por resultado e ROI das campanhas.' },
      { icon: 'strategy', label: 'Estratégia de crescimento', desc: 'Reunião mensal de performance e ajuste de estratégia consoante os dados reais — sem piloto automático.' },
    ],
    differentiators: [
      { num: '01', title: 'Resultados mensuráveis, não "engagement" vazio', desc: 'Não medimos sucesso em likes. Medimos leads gerados, custo por aquisição e retorno sobre investimento. Se não houver resultados reais, ajustamos a estratégia.' },
      { num: '02', title: 'Especialistas portugueses para o mercado português', desc: 'Sabemos como o consumidor português se comporta online. As nossas campanhas e conteúdos são criados com esse conhecimento — não são traduções de fórmulas americanas.' },
      { num: '03', title: 'Transparência total — sem surpresas', desc: 'Relatório detalhado todo mês com todos os dados da tua conta. Tens acesso a todas as contas e campanhas a qualquer momento.' },
    ],
    faqs: [
      { q: 'O que está incluído na gestão de marketing digital?', a: 'Gestão de Instagram e Facebook (criação de conteúdo, publicação, comunidade), Google Ads (campanhas de pesquisa e display), SEO mensal (otimização de conteúdo e técnica) e relatório mensal de performance com todas as métricas.' },
      { q: 'Qual é o contrato mínimo de gestão de marketing?', a: 'O contrato inicial é de 3 meses — tempo suficiente para as campanhas estabilizarem e mostrarem resultados consistentes. Após os primeiros 3 meses, o contrato é renovado mensalmente.' },
      { q: 'Quem cria o conteúdo para as redes sociais?', a: 'A nossa equipa cria o conteúdo completo — copywriting e design de posts e stories. Enviamos para aprovação antes de publicar. Podes ter tão pouco ou tanto envolvimento quanto quiseres.' },
      { q: 'Quanto devo investir em Google Ads?', a: 'O orçamento mínimo recomendado para Google Ads em Portugal é €300–€500/mês em adspend (separado da nossa fee de gestão). Abaixo deste valor os dados são insuficientes para otimizar bem as campanhas.' },
      { q: 'Como medem o retorno do investimento?', a: 'Configuramos rastreio de conversões desde o primeiro dia — chamadas, formulários, compras ou qualquer ação relevante para o teu negócio. O relatório mensal mostra custo por lead/venda e ROI calculado com dados reais, não estimativas.' },
    ],
    relatedSlugs: ['criacao-de-websites', 'negocios-locais', 'loja-online'],
  },
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}

export function getRelatedServices(slugs: string[]): ServicePage[] {
  return slugs.map((s) => getServiceBySlug(s)).filter(Boolean) as ServicePage[];
}

export function buildServiceJsonLd(service: ServicePage) {
  const serviceUrl = `${SITE_URL}/servicos/${service.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${serviceUrl}#service`,
    name: service.title,
    description: service.metaDescription,
    url: serviceUrl,
    provider: {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#organization`,
      name: 'Element Group',
      url: SITE_URL,
    },
    areaServed: { '@type': 'Country', name: 'Portugal' },
    offers: {
      '@type': 'Offer',
      price: service.priceNum,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: serviceUrl,
    },
    image: `${SITE_URL}/og-image.jpg`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.svc-definition'],
    },
  };
}

export function buildServiceBreadcrumbLd(service: ServicePage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Serviços', item: `${SITE_URL}/servicos` },
      { '@type': 'ListItem', position: 3, name: service.title, item: `${SITE_URL}/servicos/${service.slug}` },
    ],
  };
}

export function buildServiceFaqLd(service: ServicePage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}

export function buildServiceHowToLd(service: ServicePage) {
  const serviceUrl = `${SITE_URL}/servicos/${service.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `Como contratar ${service.title} na Element Group`,
    description: service.definition ?? service.metaDescription,
    totalCost: {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      minValue: service.priceNum,
    },
    supply: [
      { '@type': 'HowToSupply', name: 'Brief do projeto' },
      { '@type': 'HowToSupply', name: 'Conteúdos e materiais existentes' },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Diagnóstico',
        text: 'Analisamos o negócio, a concorrência e o que o teu cliente procura online.',
        url: `${serviceUrl}#processo`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Estratégia',
        text: 'Definimos objetivos mensuráveis antes de desenhar uma linha ou escrever código.',
        url: `${serviceUrl}#processo`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Execução',
        text: 'Design + desenvolvimento com o teu feedback em cada etapa do processo.',
        url: `${serviceUrl}#processo`,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Lançamento',
        text: 'Entrega final, monitorização e ajustes contínuos baseados em dados reais.',
        url: `${serviceUrl}#processo`,
      },
    ],
  };
}

export function buildWaLink(title: string): string {
  return `${WA_BASE}${encodeURIComponent(`Olá! Tenho interesse no serviço de ${title}. Podiam enviar um orçamento?`)}`;
}
