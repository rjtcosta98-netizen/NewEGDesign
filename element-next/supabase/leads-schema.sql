-- Lead Magnets — tabela de captação de leads
-- Separada da tabela `contacts` (formulário de contacto)
-- Guarda os utilizadores que descarregam recursos grátis em /recursos

CREATE TABLE IF NOT EXISTS leads (
  id            uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  email         text          NOT NULL,
  name          text          NOT NULL,
  resource_slug text          NOT NULL,
  created_at    timestamptz   NOT NULL DEFAULT now()
);

-- Índice para evitar duplicados por email + recurso
CREATE UNIQUE INDEX IF NOT EXISTS leads_email_slug_uniq
  ON leads (email, resource_slug);

-- Índice para queries por recurso (dashboard futuro)
CREATE INDEX IF NOT EXISTS leads_resource_slug_idx
  ON leads (resource_slug);

-- Row Level Security — anon pode inserir, nunca selecionar
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "leads_insert_anon"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Apenas authenticated (service role) pode ler
CREATE POLICY "leads_select_authenticated"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);
