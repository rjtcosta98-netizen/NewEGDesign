-- ============================================================
-- TABLE: case_studies
-- Run this in the Supabase SQL editor (Dashboard > SQL Editor)
-- ============================================================

CREATE TABLE IF NOT EXISTS case_studies (
  id               uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             text          UNIQUE NOT NULL,
  client           text          NOT NULL,
  title            text          NOT NULL,
  category         text,
  year             text,
  url              text,
  meta_title       text,
  meta_description text,
  -- Can be a Supabase Storage URL OR a relative path like /images/MNSITE.webp
  image_url        text,
  hero_headline    text,
  hero_sub         text,
  -- [{value, label, icon}]
  key_results      jsonb         NOT NULL DEFAULT '[]'::jsonb,
  deliverables     text[]        NOT NULL DEFAULT '{}',
  -- {title?, body[]}
  challenge        jsonb         NOT NULL DEFAULT '{}'::jsonb,
  -- {title?, body[], highlights[]}
  solution         jsonb         NOT NULL DEFAULT '{}'::jsonb,
  -- {title?, items[], body?}
  results          jsonb         NOT NULL DEFAULT '{}'::jsonb,
  -- {text, author, role?} or null
  testimonial      jsonb,
  prev_slug        text,
  next_slug        text,
  is_published     boolean       NOT NULL DEFAULT true,
  display_order    int           NOT NULL DEFAULT 0,
  created_at       timestamptz   NOT NULL DEFAULT now(),
  updated_at       timestamptz   NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS case_studies_slug_idx   ON case_studies (slug);
CREATE INDEX IF NOT EXISTS case_studies_order_idx  ON case_studies (display_order DESC, created_at DESC);

ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- Visitors can read published case studies
CREATE POLICY "cs_select_anon"
  ON case_studies FOR SELECT TO anon
  USING (is_published = true);

-- Authenticated users can read all (including drafts)
CREATE POLICY "cs_select_auth"
  ON case_studies FOR SELECT TO authenticated
  USING (true);

-- Authenticated users can insert / update / delete
CREATE POLICY "cs_write_auth"
  ON case_studies FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- ============================================================
-- SEED DATA  (safe to re-run — uses ON CONFLICT DO UPDATE)
-- ============================================================

INSERT INTO case_studies (
  slug, client, title, category, year, url,
  meta_title, meta_description, image_url,
  hero_headline, hero_sub,
  key_results, deliverables,
  challenge, solution, results, testimonial,
  prev_slug, next_slug, display_order
) VALUES

-- 1. Matias Nature
(
  'matias-nature-portugal',
  'Matias Nature',
  'Matias Nature — E-commerce + App PWA',
  'E-commerce', '2025',
  'https://www.matiasnature.com',
  'Matias Nature — Reservas diretas +25% com E-commerce & App PWA | Element Group',
  'Como a Element Group eliminou a dependência de OTAs e aumentou as reservas diretas da Matias Nature em 25% com e-commerce, app PWA e social media. PageSpeed 96.',
  '/images/MNSITE.webp',
  'De plataformas terceiras a reservas 100% diretas.',
  'A Matias Nature pagava 15-20% de comissão por cada reserva. Criámos uma plataforma digital própria que coloca o controlo — e o dinheiro — nas mãos do cliente.',
  '[{"value":"+25%","label":"Reservas diretas em 90 dias","icon":"up"},{"value":"PageSpeed 96","label":"Performance desktop","icon":"speed"},{"value":"+30%","label":"Retorno de clientes via app","icon":"up"}]',
  ARRAY['Website E-commerce','App PWA','Social Media'],
  '{"title":"O problema: margens comidas por comissões","body":["A Matias Nature dependia exclusivamente de plataformas OTA — Booking, Airbnb, Tripadvisor — para conseguir reservas. Cada reserva custava entre 15% e 20% de comissão, reduzindo drasticamente a margem de lucro.","Não havia website próprio, não havia app, não havia nenhuma forma de comunicar diretamente com os clientes existentes para promover regresso. O negócio estava refém de algoritmos alheios.","A necessidade era clara: criar uma presença digital autónoma que permitisse reservas diretas, fidelização de clientes e independência das plataformas de terceiros."]}',
  '{"title":"A solução: ecossistema digital completo","body":["Desenvolvemos um website e-commerce com sistema de reservas integrado e checkout nativo — sem intermediários, sem comissões. O fluxo de reserva foi otimizado para conversão mobile-first, com menos de 3 cliques da landing page ao pagamento confirmado.","A App PWA (Progressive Web App) permite aos clientes anteriores aceder a ofertas exclusivas, repetir reservas e receber notificações push — um canal de marketing direto com 0% de comissão e altíssima taxa de engagement.","A estratégia de social media foi alinhada com o funil de conversão, direcionando tráfego diretamente para o website próprio em vez de para as plataformas OTA."],"highlights":["Sistema de reservas sem comissões","App PWA com notificações push","Checkout em 3 cliques","Integração com pagamentos portugueses","SEO técnico para turismo local","Social media orientado à conversão"]}',
  '{"title":"Resultados em 90 dias","items":[{"value":"+25%","label":"Reservas diretas no primeiro trimestre","icon":"up"},{"value":"96","label":"PageSpeed desktop (máximo 100)","icon":"speed"},{"value":"+30%","label":"Taxa de retorno via App PWA","icon":"up"},{"value":"0%","label":"Comissão paga nas reservas diretas","icon":"check"},{"value":"<2s","label":"Tempo de carregamento da página","icon":"clock"}],"body":"Em 90 dias após o lançamento, a Matias Nature registou um crescimento significativo nas reservas diretas e uma redução efetiva da dependência das plataformas OTA — traduzindo-se diretamente em maior margem por reserva."}',
  '{"text":"Desde o primeiro contato até a entrega foi excecional! A equipa entendeu exatamente o que precisávamos e entregou uma plataforma que já está a gerar resultados reais.","author":"Cliente Matias Nature","role":"Proprietário"}',
  'football-nation-store-branding', 'football-nation-store-loja', 70
),

-- 2. Football Nation Store — Loja
(
  'football-nation-store-loja',
  'Football Nation Store',
  'Football Nation Store — Loja Online',
  'E-commerce', '2026',
  'https://www.footballnation.pt',
  'Football Nation Store — Loja Online de Futebol com PageSpeed 95+ | Element Group',
  'Do logótipo à loja online: como a Element Group criou a Football Nation Store de raiz, com e-commerce mobile-first, PageSpeed 95+ e SEO otimizado para camisolas de futebol.',
  '/images/FOOTBALLNATIONWEB.webp',
  'Do logótipo à loja online. Camisolas de futebol ao mundo inteiro.',
  'Um projeto completo criado do zero: identidade visual, loja e-commerce e estratégia digital para um negócio de camisolas de futebol com ambição internacional.',
  '[{"value":"PageSpeed 95+","label":"Mobile & desktop","icon":"speed"},{"value":"100%","label":"Satisfação do cliente","icon":"star"},{"value":"SEO Ready","label":"Otimizado para Google","icon":"check"}]',
  ARRAY['Loja Online E-commerce','Mobile-First','SEO Técnico'],
  '{"title":"Do zero ao mercado internacional","body":["A Football Nation Store queria entrar no mercado de camisolas de futebol — um nicho competitivo dominado por grandes marketplaces. Não havia marca, não havia website, não havia qualquer presença digital.","O desafio era duplo: criar uma identidade visual forte que transmitisse credibilidade e paixão pelo futebol, e simultaneamente construir uma loja e-commerce que competisse com players estabelecidos em termos de experiência de utilizador e performance.","Tudo tinha de ser construído de raiz, com um prazo apertado para aproveitar a janela de mercado antes do início da época."]}',
  '{"title":"Identidade + loja numa só entrega","body":["Começámos pela identidade visual: logótipo, paleta de cores e linguagem gráfica que capturam a energia do futebol sem cair nos clichês do setor. A marca foi desenhada para funcionar desde um favicon até a uma caixa de envio.","A loja e-commerce foi desenvolvida com mobile-first como premissa absoluta — mais de 70% do tráfego de nicho de moda desportiva vem de dispositivos móveis. O checkout foi otimizado para 3 cliques máximos.","SEO técnico avançado desde o primeiro dia: estrutura de URLs otimizada para palavras-chave de produto, schema markup para produtos, meta tags únicas geradas automaticamente por produto e categoria."],"highlights":["Design mobile-first responsivo","Checkout otimizado (3 cliques)","Schema markup para produtos","URLs otimizadas para SEO","PageSpeed 95+ mobile e desktop","Integração com pagamentos nacionais e internacionais"]}',
  '{"title":"Performance desde o dia 1","items":[{"value":"95+","label":"PageSpeed mobile e desktop","icon":"speed"},{"value":"100%","label":"Satisfação do cliente","icon":"star"},{"value":"A+","label":"SEO técnico no Lighthouse","icon":"check"},{"value":"<1.5s","label":"First Contentful Paint","icon":"clock"},{"value":"0","label":"Erros de rastreamento no GSC","icon":"check"}],"body":"A loja foi lançada com PageSpeed 95+ e zero erros de rastreamento — uma base técnica sólida que permite crescer organicamente no Google desde o primeiro dia."}',
  '{"text":"Da identidade visual ao website — tudo ficou perfeito. A equipa entendeu a nossa visão e entregou uma loja que nos deixa orgulhosos.","author":"Football Nation Store","role":"Fundador"}',
  'matias-nature-portugal', 'apiarios-terras-pulga', 80
),

-- 3. Apiários Terras da Pulga
(
  'apiarios-terras-pulga',
  'Apiários Terras da Pulga',
  'Apiários Terras da Pulga — E-commerce',
  'E-commerce', '2026',
  'https://apiariosterrasdapulga.pt',
  'Apiários Terras da Pulga — +40% Vendas Online & Top 3 Google | Element Group',
  'Como a Element Group ajudou os Apiários Terras da Pulga a aumentar as vendas de mel em 40% em 60 dias com loja e-commerce, SEO local e PageSpeed 95. Caso de estudo real.',
  '/images/APIARIOSWEB.webp',
  'Tradição encontra digital. Vendas 24h/dia.',
  'Mel artesanal produzido com paixão, mas vendido apenas em mercados locais. Transformámos um negócio de proximidade numa loja online que vende para todo o país.',
  '[{"value":"+40%","label":"Vendas online em 60 dias","icon":"up"},{"value":"PageSpeed 95","label":"Performance desktop","icon":"speed"},{"value":"Top 3","label":"Google em termos locais","icon":"star"}]',
  ARRAY['Website & E-commerce','SEO Local & Nacional','Branding'],
  '{"title":"Produto excelente, alcance limitado","body":["Os Apiários Terras da Pulga produzem mel artesanal de qualidade premium — um produto com uma história genuína, colhido em colmeias tradicionais no interior de Portugal. Mas toda a distribuição era feita através de mercados locais e vendas diretas, limitando o alcance a poucos quilómetros.","Sem presença digital, sem loja online e sem visibilidade no Google, o negócio estava limitado à área geográfica imediata. Clientes que ouviam falar do produto não tinham forma de o comprar se não estivessem presentes nos mercados.","A oportunidade era enorme: criar uma loja online que levasse este mel artesanal a qualquer ponto do país, com uma presença no Google que captasse quem procura mel artesanal ou mel português."]}',
  '{"title":"E-commerce com raízes na tradição","body":["Desenvolvemos um website com e-commerce nativo que conta a história dos apiários com autenticidade — fotografia real dos produtos e das colmeias, textos que comunicam a qualidade artesanal sem exageros.","A loja online foi integrada com MBWay, Multibanco e cartão de crédito — os métodos de pagamento preferidos pelo consumidor português. O processo de encomenda foi simplificado ao máximo para clientes que não estão habituados a comprar online.","A estratégia de SEO focou-se em dois vetores: SEO local para dominar pesquisas de mel [região] e apicultor [cidade], e SEO nacional para palavras-chave como mel artesanal Portugal e mel biológico comprar online."],"highlights":["Storytelling visual autêntico","Checkout com MBWay e Multibanco","SEO local + nacional integrado","Schema markup para produtos alimentares","Branding consistente com a identidade da marca","Design mobile-first para todas as idades"]}',
  '{"title":"Resultados em 60 dias","items":[{"value":"+40%","label":"Crescimento nas vendas online","icon":"up"},{"value":"95","label":"PageSpeed desktop (máx. 100)","icon":"speed"},{"value":"Top 3","label":"Google em pesquisas locais","icon":"star"},{"value":"Portugal","label":"Alcance de entregas (todo o país)","icon":"check"},{"value":"24/7","label":"Disponibilidade para encomendas","icon":"clock"}],"body":"Em apenas 60 dias após o lançamento, as vendas online cresceram 40% face ao período anterior. O website passou a ser o principal canal de vendas, superando os mercados físicos."}',
  '{"text":"Recomendo totalmente. Excelente capacidade de transformar ideias em processos claros e resultados reais. A nossa loja online ficou exactamente como imaginámos.","author":"Ricardo Jesus","role":"Proprietário, Apiários Terras da Pulga"}',
  'football-nation-store-loja', 'maria-mendes-massagens', 90
),

-- 4. Maria Mendes Massagens
(
  'maria-mendes-massagens',
  'Maria Mendes Massagens',
  'Maria Mendes Massagens — Website',
  'Websites', '2026',
  'https://mariamendessmassagens.pt',
  'Maria Mendes Massagens — PageSpeed 100 & Marcações 24/7 em 10 dias | Element Group',
  'De link na bio a website profissional com PageSpeed 100 e marcações 24/7. A Element Group entregou em 10 dias. Caso de estudo: terapeuta de massagens em Portugal.',
  '/images/MARIAWEB.webp',
  'De plataforma gratuita a website profissional. Marcações 24/7.',
  'Uma terapeuta talentosa com presença digital amadora. Em 10 dias, transformámos um link na bio num website com PageSpeed 100 e marcações automáticas a qualquer hora.',
  '[{"value":"PageSpeed 100","label":"Mobile & desktop","icon":"speed"},{"value":"<1s","label":"Carregamento da página","icon":"clock"},{"value":"10 dias","label":"Do brief ao site live","icon":"check"}]',
  ARRAY['Website Profissional','SEO Local','Performance'],
  '{"title":"Presença digital dependente das redes sociais","body":["A Maria Mendes usava exclusivamente o Instagram para comunicar os seus serviços de massagem. Toda a sua presença digital resumia-se a um link na bio que apontava para uma landing page gratuita — sem domínio próprio, sem aspeto profissional, sem controlo.","As marcações dependiam de mensagens no Direct do Instagram ou WhatsApp — um processo manual, sujeito a erros e indisponível quando a Maria não estava ao telefone. Potenciais clientes desistiam por falta de resposta imediata.","O posicionamento local no Google para pesquisas como massagens [cidade] era inexistente, deixando clientes na zona que procuravam ativamente estes serviços a encontrar apenas concorrentes."]}',
  '{"title":"Website de alta performance em tempo recorde","body":["Desenvolvemos um website profissional com identidade visual coerente com a proposta de valor da Maria: serenidade, profissionalismo e confiança. Design limpo, mobile-first, otimizado para conversão.","O sistema de marcações online permite que clientes marquem sessões 24 horas por dia, 7 dias por semana — sem necessidade de intervenção manual. Confirmações automáticas por email e SMS eliminam falhas de comunicação.","A estratégia de SEO local focou-se em posicionar o website para pesquisas geográficas como massagens [cidade], terapeuta de massagens perto de mim e termos específicos dos tratamentos oferecidos."],"highlights":["Design sereno e profissional","Marcações online 24/7","Confirmações automáticas por email","SEO local otimizado","Velocidade de carregamento <1s","Entregue em 10 dias úteis"]}',
  '{"title":"Resultados imediatos","items":[{"value":"100","label":"PageSpeed mobile e desktop","icon":"speed"},{"value":"<1s","label":"Tempo de carregamento","icon":"clock"},{"value":"10 dias","label":"Do brief ao website live","icon":"check"},{"value":"24/7","label":"Disponibilidade para marcações","icon":"check"},{"value":"100%","label":"Satisfação da cliente","icon":"star"}],"body":"Um dos projetos de que mais nos orgulhamos em termos de relação tempo/qualidade. Em 10 dias, a Maria passou de uma landing page gratuita a um website com PageSpeed 100 — um resultado que a maioria das agências leva 2 meses a entregar."}',
  '{"text":"Recomendo totalmente. Profissionalismo e rapidez na execução. O meu website ficou exatamente como eu queria — moderno, elegante e fácil de usar.","author":"Maria Mendes","role":"Proprietária, Maria Mendes Massagens"}',
  'apiarios-terras-pulga', 'ad-sao-romao', 100
),

-- 5. AD São Romão
(
  'ad-sao-romao',
  'Assoc. Desportiva São Romão',
  'AD São Romão — Website Institucional',
  'Websites', '2026',
  'https://adsaoromao.pt',
  'AD São Romão — Website Institucional com SEO 92/100 em 10 dias | Element Group',
  'Como a Element Group criou o website da Associação Desportiva São Romão em 10 dias com PageSpeed 100 e SEO Score 92/100. Caso de estudo: associação desportiva em Portugal.',
  '/images/ADSRWEB.webp',
  'Uma associação com presença digital à altura da sua história.',
  'Uma associação desportiva com décadas de história e sem website. Em 10 dias, criámos um portal digital que une a comunidade e coloca a AD São Romão no Google.',
  '[{"value":"92/100","label":"SEO Score Lighthouse","icon":"star"},{"value":"PageSpeed 100","label":"Performance","icon":"speed"},{"value":"10 dias","label":"Do brief ao site live","icon":"clock"}]',
  ARRAY['Website Institucional','SEO','Mobile-First'],
  '{"title":"Uma associação invisível no digital","body":["A Associação Desportiva São Romão tem uma história rica e uma comunidade fiel — mas zero presença digital. Informações sobre jogos, eventos e notícias eram partilhadas exclusivamente em grupos de WhatsApp e na página do Facebook, com alcance limitado e organização inexistente.","Sócios mais novos e familiares procuravam informação no Google e não encontravam nada. A associação perdia potenciais novos sócios e parceiros simplesmente por não existir digitalmente.","A necessidade era criar um portal institucional que centralizasse a comunicação, fosse fácil de gerir e posicionasse a associação para pesquisas locais relevantes."]}',
  '{"title":"Portal institucional completo","body":["Desenvolvemos um website institucional com uma arquitetura de informação clara: página inicial com destaque para eventos próximos, secção de notícias, historial da associação, contactos e modalidades.","A gestão de conteúdo foi simplificada ao máximo — a direção da associação pode publicar notícias e eventos sem conhecimentos técnicos. O design foi criado para refletir os valores da comunidade: seriedade, proximidade e tradição desportiva.","SEO técnico completo: schema markup para organização desportiva, meta tags únicas por página, URLs limpas e sitemap automático — tudo o que o Google precisa para indexar e posicionar o website."],"highlights":["Portal com notícias e eventos","Gestão de conteúdo simples","Schema markup para associação desportiva","SEO local para a comunidade","Design que reflete a identidade da associação","Entregue em 10 dias"]}',
  '{"title":"Resultados desde o lançamento","items":[{"value":"92/100","label":"SEO Score no Lighthouse","icon":"star"},{"value":"100","label":"PageSpeed (máx. 100)","icon":"speed"},{"value":"10 dias","label":"Do brief ao website live","icon":"check"},{"value":"100%","label":"Satisfação da direção","icon":"star"}],"body":"Um projeto que prova que velocidade e qualidade não são mutuamente exclusivos. Em 10 dias, a AD São Romão passou de zero presença digital a um website com PageSpeed 100 e SEO Score de 92/100."}',
  '{"text":"Excelente trabalho! O site ficou moderno e profissional, exatamente o que a nossa associação precisava. A equipa foi rápida, atenta e entregou tudo dentro do prazo.","author":"Associação Desportiva São Romão","role":"Direção"}',
  'maria-mendes-massagens', 'estrela-detail-wash', 110
),

-- 6. Estrela Detail & Wash
(
  'estrela-detail-wash',
  'Estrela Detail & Wash',
  'Estrela Detail & Wash — Branding',
  'Design', '2026',
  NULL,
  'Estrela Detail & Wash — Branding Premium para Detailing Automóvel | Element Group',
  'Como a Element Group criou a identidade visual premium da Estrela Detail & Wash: logótipo profissional, manual de marca e banner promocional. Caso de estudo de branding.',
  '/images/BannerEstrela.webp',
  'Uma marca premium para um serviço de excelência automóvel.',
  'Um serviço de detailing de topo a merecer uma identidade visual à altura. Criámos uma marca que comunica qualidade, confiança e profissionalismo.',
  '[{"value":"100%","label":"Satisfação do cliente","icon":"star"},{"value":"Premium","label":"Posicionamento da marca","icon":"check"},{"value":"1 semana","label":"Do briefing à entrega","icon":"clock"}]',
  ARRAY['Logótipo Profissional','Manual de Marca','Banner Promocional'],
  '{"title":"Serviço premium com imagem amadora","body":["A Estrela Detail & Wash oferece um serviço de detailing e lavagem automóvel de altíssimo nível — os seus clientes são proprietários de carros de alta gama que procuram o melhor tratamento para os seus veículos.","Mas a identidade visual não comunicava esse posicionamento. O logótipo existente era inconsistente, criado sem critério visual e claramente amador — transmitindo exatamente o oposto do que o serviço representa.","Um potencial cliente de um Mercedes S-Class ou Porsche que visse o logótipo anterior dificilmente confiaria o seu carro a esse serviço. Era preciso construir uma marca que justificasse os preços premium."]}',
  '{"title":"Identidade visual de luxo automóvel","body":["Desenvolvemos um processo de briefing aprofundado para entender o posicionamento pretendido: serviço premium, mas local; qualidade de showroom, mas acessível; profissional, mas com alma.","O logótipo combina tipografia editorial bold com um ícone geométrico limpo — transmitindo precisão e profissionalismo sem ser frio. A paleta de cores assenta em tons escuros com detalhes metálicos, evocando a sofisticação automóvel.","O manual de marca garante consistência em todos os pontos de contacto: cartão de visita, redes sociais, uniforme, viatura de serviço. O banner promocional foi otimizado para Instagram e Facebook, os principais canais de aquisição de clientes."],"highlights":["Logótipo principal + variações","Paleta de cores e tipografia","Manual de marca completo","Banner para redes sociais","Aplicações em mockups reais","Entregue em ficheiros vetoriais"]}',
  '{"title":"Uma marca que fecha negócios","items":[{"value":"100%","label":"Satisfação do cliente","icon":"star"},{"value":"Premium","label":"Posicionamento conseguido","icon":"check"},{"value":"1 semana","label":"Do briefing à entrega final","icon":"clock"},{"value":"∞","label":"Versões vetoriais para uso ilimitado","icon":"check"}],"body":"Uma identidade visual coerente e profissional que posiciona a Estrela Detail & Wash no mercado premium — justificando os preços e atraindo o cliente certo."}',
  '{"text":"Ficou exatamente como imaginámos — profissional e com impacto. A marca comunica exatamente o que somos: um serviço de excelência.","author":"Estrela Detail & Wash","role":"Proprietário"}',
  'ad-sao-romao', 'football-nation-store-branding', 120
),

-- 7. Football Nation Store — Branding
(
  'football-nation-store-branding',
  'Football Nation Store',
  'Football Nation Store — Branding',
  'Design', '2026',
  NULL,
  'Football Nation Store — Branding de Raiz para E-commerce de Futebol | Element Group',
  'Como a Element Group criou a identidade visual completa da Football Nation Store de raiz: logótipo, cartão de visita e brand guidelines. Caso de estudo de branding.',
  '/images/mockuplogofootball.webp',
  'Identidade visual de raiz para e-commerce de futebol.',
  'Uma marca de futebol criada do zero — com energia, impacto e a personalidade certa para se destacar num mercado competitivo.',
  '[{"value":"100%","label":"Satisfação do cliente","icon":"star"},{"value":"Premium","label":"Posicionamento da marca","icon":"check"},{"value":"1 semana","label":"Conceito à entrega final","icon":"clock"}]',
  ARRAY['Logótipo Profissional','Cartão de Visita','Brand Guidelines'],
  '{"title":"Lançar uma marca num mercado competitivo","body":["A Football Nation Store queria entrar no mercado de camisolas de futebol — um setor com players estabelecidos e marcas reconhecidas. Sem identidade visual, seria impossível criar memorabilidade e confiança nos primeiros contactos com clientes.","O desafio era criar uma marca que transmitisse paixão pelo futebol e credibilidade como loja especializada, sem parecer uma cópia das marcas existentes. Tinha de ser original, contemporânea e consistente.","A marca precisava de funcionar em múltiplos contextos: website, redes sociais, embalagens, e comunicação digital — com a mesma força e reconhecimento em todos."]}',
  '{"title":"Uma marca com garra própria","body":["Desenvolvemos o conceito visual a partir dos valores definidos no briefing: autenticidade, paixão desportiva, comunidade e qualidade. A identidade afasta-se dos clichês do futebol (campo verde, bola) em favor de uma abordagem mais editorial e moderna.","O logótipo usa tipografia bold com uma ligação visual que cria um símbolo único e reconhecível. A paleta de cores evoca a intensidade do jogo sem ser demasiado óbvia — um equilíbrio entre familiar e surpreendente.","Os brand guidelines garantem que qualquer futura aplicação da marca — seja numa caixa de envio ou num anúncio do Instagram — mantém a coerência e o impacto da identidade original."],"highlights":["Conceito visual original","Logótipo em múltiplas versões","Cartão de visita premium","Brand guidelines completos","Ficheiros vetoriais editáveis","Aplicações em mockups reais"]}',
  '{"title":"Uma identidade que abre portas","items":[{"value":"100%","label":"Satisfação do cliente","icon":"star"},{"value":"Premium","label":"Posicionamento conseguido","icon":"check"},{"value":"1 semana","label":"Do conceito à entrega","icon":"clock"},{"value":"∞","label":"Aplicações possíveis com os ficheiros","icon":"check"}],"body":"A Football Nation Store lançou o e-commerce com uma identidade visual que transmite confiança desde o primeiro contacto — um dos fatores críticos para a conversão em lojas online novas."}',
  '{"text":"Superou as expectativas! O logótipo ficou profissional e com a identidade certa. Estamos muito satisfeitos com o resultado e com a rapidez da entrega.","author":"Football Nation Store","role":"Fundador"}',
  'estrela-detail-wash', 'matias-nature-portugal', 130
)

ON CONFLICT (slug) DO UPDATE SET
  client           = EXCLUDED.client,
  title            = EXCLUDED.title,
  category         = EXCLUDED.category,
  year             = EXCLUDED.year,
  url              = EXCLUDED.url,
  meta_title       = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  image_url        = EXCLUDED.image_url,
  hero_headline    = EXCLUDED.hero_headline,
  hero_sub         = EXCLUDED.hero_sub,
  key_results      = EXCLUDED.key_results,
  deliverables     = EXCLUDED.deliverables,
  challenge        = EXCLUDED.challenge,
  solution         = EXCLUDED.solution,
  results          = EXCLUDED.results,
  testimonial      = EXCLUDED.testimonial,
  prev_slug        = EXCLUDED.prev_slug,
  next_slug        = EXCLUDED.next_slug,
  display_order    = EXCLUDED.display_order,
  updated_at       = now();
