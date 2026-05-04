import { cache } from 'react';
import { getSupabase, publicAsset } from './supabase';
import { CASE_STUDIES, type CaseStudy, type CaseStudyResult } from './case-studies';

const CS_BUCKET = 'project-images';

type CaseStudyRow = {
  slug: string;
  client: string;
  title: string;
  category: string | null;
  year: string | null;
  url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  image_url: string | null;
  hero_headline: string | null;
  hero_sub: string | null;
  key_results: CaseStudyResult[];
  deliverables: string[];
  challenge: CaseStudy['challenge'];
  solution: CaseStudy['solution'];
  results: CaseStudy['results'];
  testimonial: CaseStudy['testimonial'] | null;
  prev_slug: string | null;
  next_slug: string | null;
  display_order: number;
};

function rowToCaseStudy(row: CaseStudyRow): CaseStudy {
  // image_url can be:
  //   - a path in the case-study-images bucket  (no leading slash → storage)
  //   - a relative /images/... path              (served from public/)
  //   - a full https:// URL
  const image =
    row.image_url?.startsWith('http') || row.image_url?.startsWith('/')
      ? row.image_url
      : row.image_url
      ? publicAsset(CS_BUCKET, row.image_url)
      : null;

  return {
    slug:            row.slug,
    client:          row.client,
    title:           row.title,
    category:        row.category ?? '',
    year:            row.year ?? '',
    url:             row.url,
    metaTitle:       row.meta_title ?? row.title,
    metaDescription: row.meta_description ?? '',
    image,
    heroHeadline:    row.hero_headline ?? '',
    heroSub:         row.hero_sub ?? '',
    keyResults:      row.key_results ?? [],
    deliverables:    row.deliverables ?? [],
    challenge:       row.challenge ?? { body: [] },
    solution:        row.solution ?? { body: [], highlights: [] },
    results:         row.results ?? { items: [] },
    testimonial:     row.testimonial ?? undefined,
    prevSlug:        row.prev_slug ?? undefined,
    nextSlug:        row.next_slug ?? undefined,
  };
}

const fetchAll = cache(async (): Promise<CaseStudy[]> => {
  const sb = getSupabase();
  if (!sb) return Object.values(CASE_STUDIES);

  const { data, error } = await sb
    .from('case_studies')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: false });

  if (error || !data?.length) {
    console.error('[case_studies] fetch error:', error?.message);
    return Object.values(CASE_STUDIES);
  }

  return (data as CaseStudyRow[]).map(rowToCaseStudy);
});

export async function getCaseStudyDB(slug: string): Promise<CaseStudy | undefined> {
  const all = await fetchAll();
  return all.find((cs) => cs.slug === slug);
}

export async function getAllCaseStudySlugsDB(): Promise<string[]> {
  const all = await fetchAll();
  return all.map((cs) => cs.slug);
}

export async function getAllCaseStudiesDB(): Promise<CaseStudy[]> {
  return fetchAll();
}
