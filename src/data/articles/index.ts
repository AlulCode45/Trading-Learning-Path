import { EducationalArticle } from '../../types';
import { EDUCATIONAL_ARTICLES as PRICE_ACTION_ARTICLES } from './priceActionArticles.ts';
import { SMC_ARTICLES } from './smcArticles.ts';
import { WYCKOFF_ARTICLES } from './wyckoffArticles.ts';
import { RISK_ARTICLES } from './riskArticles.ts';
import { QUANT_ARTICLES } from './quantArticles.ts';

export const EDUCATIONAL_ARTICLES: Record<string, EducationalArticle> = {
  ...PRICE_ACTION_ARTICLES,
  ...SMC_ARTICLES,
  ...WYCKOFF_ARTICLES,
  ...RISK_ARTICLES,
  ...QUANT_ARTICLES
};

// Aliases mapping for common alternative slugs
EDUCATIONAL_ARTICLES['mengenal-trading'] = EDUCATIONAL_ARTICLES['what-is-trading-fundamentals'];
EDUCATIONAL_ARTICLES['apa-itu-trading'] = EDUCATIONAL_ARTICLES['what-is-trading-fundamentals'];
EDUCATIONAL_ARTICLES['trading-fundamentals'] = EDUCATIONAL_ARTICLES['what-is-trading-fundamentals'];
EDUCATIONAL_ARTICLES['smc-mastery'] = EDUCATIONAL_ARTICLES['smart-money-concepts-ict-mastery'];
EDUCATIONAL_ARTICLES['wyckoff-mastery'] = EDUCATIONAL_ARTICLES['wyckoff-method-vsa-mastery'];
EDUCATIONAL_ARTICLES['risk-mastery'] = EDUCATIONAL_ARTICLES['risk-management-psychology-mastery'];
EDUCATIONAL_ARTICLES['quant-mastery'] = EDUCATIONAL_ARTICLES['quantitative-algo-trading-mastery'];

export function getArticleBySlug(slug: string): EducationalArticle | null {
  return EDUCATIONAL_ARTICLES[slug] || null;
}

export function getRoadmapSlugForArticle(articleOrSlug?: EducationalArticle | string | null): string {
  if (!articleOrSlug) return 'price-action-market-structure';
  
  const slug = typeof articleOrSlug === 'string' ? articleOrSlug : articleOrSlug.slug;
  const category = typeof articleOrSlug === 'string' ? (EDUCATIONAL_ARTICLES[slug]?.category || '') : articleOrSlug.category;

  if (category === 'Institutional Trading' || slug.startsWith('smc-')) {
    return 'smart-money-concepts-ict';
  }
  if (category === 'Classical Analysis' || slug.startsWith('wyckoff-') || slug.startsWith('wyk-')) {
    return 'wyckoff-method-vsa';
  }
  if (category === 'Core Foundation' || slug.startsWith('risk-') || slug.startsWith('psych-')) {
    return 'risk-management-psychology';
  }
  if (category === 'Quantitative' || slug.startsWith('quant-')) {
    return 'quantitative-algo-trading';
  }
  return 'price-action-market-structure';
}

export function getAllArticles(): EducationalArticle[] {
  const seen = new Set<string>();
  const list: EducationalArticle[] = [];
  
  for (const article of Object.values(EDUCATIONAL_ARTICLES)) {
    if (!seen.has(article.id)) {
      seen.add(article.id);
      list.push(article);
    }
  }
  return list;
}

export {
  PRICE_ACTION_ARTICLES,
  SMC_ARTICLES,
  WYCKOFF_ARTICLES,
  RISK_ARTICLES,
  QUANT_ARTICLES
};
