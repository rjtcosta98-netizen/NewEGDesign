-- ============================================================================
-- Adiciona 3 clientes de teste (mantém os existentes).
-- Run em: Supabase Studio → SQL Editor
-- ============================================================================

insert into public.clients (slug, name, industry, website) values
  ('cliente-teste-1', 'Cliente Teste 1', 'Tecnologia',  'https://cliente1.example'),
  ('cliente-teste-2', 'Cliente Teste 2', 'Restauração', 'https://cliente2.example'),
  ('cliente-teste-3', 'Cliente Teste 3', 'Retalho',     'https://cliente3.example')
on conflict (slug) do nothing;
