-- ============================================================================
-- CONTACTS — tabela de submissões do formulário /contacto
-- Run em: Supabase Studio → SQL Editor
-- ============================================================================

create table if not exists public.contacts (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null    default now(),

  -- Dados do formulário
  name        text        not null,
  email       text        not null,
  phone       text,
  service     text,
  message     text,

  -- Gestão interna
  read        boolean     not null default false,
  notes       text                                -- notas internas (ex: resposta enviada)
);

-- Índices
create index if not exists contacts_created_at_idx on public.contacts (created_at desc);
create index if not exists contacts_read_idx       on public.contacts (read);

-- RLS: activado mas com política permissiva para INSERT (formulário público)
alter table public.contacts enable row level security;

-- Qualquer pedido autenticado (via publishable key) pode inserir
create policy "Allow public insert"
  on public.contacts
  for insert
  with check (true);

-- Apenas o service role pode ler e actualizar (protege os dados dos leads)
create policy "Service role select"
  on public.contacts
  for select
  using (auth.role() = 'service_role');

create policy "Service role update"
  on public.contacts
  for update
  using (auth.role() = 'service_role');
