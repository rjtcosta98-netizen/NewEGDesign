-- ============================================================================
-- REVIEWS — Adicionar suporte a foto do autor
-- Cria bucket público `review-avatars` + coluna avatar_path na tabela reviews.
-- Run em: Supabase Studio → SQL Editor (depois de já teres corrido reviews-schema.sql)
-- ============================================================================

-- ---------- 1. Bucket público para fotos dos autores ----------
insert into storage.buckets (id, name, public)
values ('review-avatars', 'review-avatars', true)
on conflict (id) do nothing;

drop policy if exists "public read review-avatars" on storage.objects;
create policy "public read review-avatars"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'review-avatars');

-- ---------- 2. Adicionar coluna avatar_path à tabela reviews ----------
alter table public.reviews
  add column if not exists avatar_path text;        -- path no bucket review-avatars

-- ---------- 3. Definir paths das fotos (faz upload com estes nomes) ----------
update public.reviews set avatar_path = 'ricardo-jesus.jpg'      where slug = 'ricardo-jesus-apiarios';
update public.reviews set avatar_path = 'mariana-mendes.jpg'     where slug = 'mariana-mendes-fns';
update public.reviews set avatar_path = 'maria-mendes.jpg'       where slug = 'maria-mendes-massagens';
update public.reviews set avatar_path = 'goncalo-nascimento.jpg' where slug = 'goncalo-nascimento-estrela';
update public.reviews set avatar_path = 'duarte-marvanejo.jpg'   where slug = 'duarte-marvanejo-adsr';
update public.reviews set avatar_path = 'jason-silva.jpg'        where slug = 'jason-silva-adsr';

-- NOTA: se ainda não tiveres uma foto, deixa o avatar_path NULL para manter as iniciais como fallback.
-- Faz upload das fotos (recomendado: 200×200px, quadradas, JPG/WEBP) ao bucket `review-avatars`
-- com exatamente os nomes acima.
