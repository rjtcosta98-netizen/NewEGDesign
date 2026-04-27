-- =====================================================================
-- Atribui logos (imagens) aos clientes da marquee
-- Faz upload dos seguintes ficheiros para o bucket "client-logos":
--   • apiarios.png
--   • matias-nature.png
--   • maria-mendes.png
--   • ad-sao-romao.png
-- Depois corre este SQL.
-- =====================================================================

update public.marquee_logos
set logo_path = 'apiarios.png'
where slug = 'apiarios-terras-pulga';

update public.marquee_logos
set logo_path = 'matias-nature.png'
where slug = 'matias-nature';

update public.marquee_logos
set logo_path = 'maria-mendes.png'
where slug = 'maria-mendes-massagens';

update public.marquee_logos
set logo_path = 'ad-sao-romao.png'
where slug = 'ad-sao-romao';

-- Confirma o resultado
select slug, name, logo_path, display_order, is_published
from public.marquee_logos
order by display_order desc;
