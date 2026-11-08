import { EducationalArticle } from '../../types';
import { EDUCATIONAL_ARTICLES as PRICE_ACTION_ARTICLES } from './priceActionArticles.ts';
import { SMC_ARTICLES } from './smcArticles.ts';
import { WYCKOFF_ARTICLES } from './wyckoffArticles.ts';
import { RISK_ARTICLES } from './riskArticles.ts';
import { QUANT_ARTICLES } from './quantArticles.ts';
import { EDIANTO_ONG_ARTICLES } from './ediantoOngArticles.ts';

export const EDUCATIONAL_ARTICLES: Record<string, EducationalArticle> = {
  ...PRICE_ACTION_ARTICLES,
  ...SMC_ARTICLES,
  ...WYCKOFF_ARTICLES,
  ...RISK_ARTICLES,
  ...QUANT_ARTICLES,
  ...EDIANTO_ONG_ARTICLES
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
  if (category === 'Edianto Ong Mega Profit' || slug.startsWith('edianto-ong-')) {
    return 'technical-analysis-mega-profit';
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

export interface DocModuleInfo {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  badge: string;
  description: string;
  accentColor: string;
  borderClass: string;
  badgeBg: string;
  badgeText: string;
  cardBg: string;
  iconName: 'TrendingUp' | 'Layers' | 'BarChart3' | 'ShieldCheck' | 'Cpu' | 'Award';
  roadmapSlug: string;
}

export const DOC_MODULES: DocModuleInfo[] = [
  {
    id: 'edianto-ong',
    slug: 'edianto-ong',
    title: 'Technical Analysis for Mega Profit (Edianto Ong)',
    shortTitle: 'Edianto Ong',
    badge: 'Mega Profit 29 Bab',
    description: 'Kurikulum lengkap 29 Bab buku legendaris Edianto Ong: 3 Aksioma, Dow Theory, Geometri Tren & Fan Principle, Elliott Wave, Indikator, hingga Suicide Anomaly & Sistem Trading.',
    accentColor: '#EA580C',
    borderClass: 'border-orange-400 dark:border-orange-500/50',
    badgeBg: 'bg-orange-100 dark:bg-orange-950/60',
    badgeText: 'text-orange-800 dark:text-orange-300',
    cardBg: 'hover:border-orange-400/80',
    iconName: 'Award',
    roadmapSlug: 'technical-analysis-mega-profit'
  },
  {
    id: 'price-action',
    slug: 'price-action',
    title: 'Price Action & Struktur Pasar',
    shortTitle: 'Price Action',
    badge: 'Fondasi Utama',
    description: 'Bahasa pergerakan harga murni: anatomi candlestick, validitas swing high/low, BOS, CHoCH, dan eksekusi multi-timeframe tanpa indikator lagging.',
    accentColor: '#F59E0B',
    borderClass: 'border-amber-400 dark:border-amber-500/50',
    badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
    badgeText: 'text-amber-800 dark:text-amber-300',
    cardBg: 'hover:border-amber-400/80',
    iconName: 'TrendingUp',
    roadmapSlug: 'price-action-market-structure'
  },
  {
    id: 'smc',
    slug: 'smc',
    title: 'Smart Money Concepts (SMC) & ICT',
    shortTitle: 'SMC & ICT',
    badge: 'Institusional',
    description: 'Menavigasi jejak likuiditas institusional perbankan: Order Block, Fair Value Gap (FVG), Judas Swing London/NY, dan siklus akumulasi manipulasi (AMD).',
    accentColor: '#0284C7',
    borderClass: 'border-sky-400 dark:border-sky-500/50',
    badgeBg: 'bg-sky-100 dark:bg-sky-950/60',
    badgeText: 'text-sky-800 dark:text-sky-300',
    cardBg: 'hover:border-sky-400/80',
    iconName: 'Layers',
    roadmapSlug: 'smart-money-concepts-ict'
  },
  {
    id: 'wyckoff',
    slug: 'wyckoff',
    title: 'Metode Wyckoff & Volume Spread Analysis',
    shortTitle: 'Wyckoff & VSA',
    badge: 'Analisis Klasik',
    description: 'Hukum Sebab-Akibat lelang pasar: skematik Akumulasi & Distribusi Composite Man, pengujian Spring & Upthrust, dan anomali Volume Spread (VSA).',
    accentColor: '#9333EA',
    borderClass: 'border-purple-400 dark:border-purple-500/50',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
    badgeText: 'text-purple-800 dark:text-purple-300',
    cardBg: 'hover:border-purple-400/80',
    iconName: 'BarChart3',
    roadmapSlug: 'wyckoff-method-vsa'
  },
  {
    id: 'risk',
    slug: 'risk',
    title: 'Manajemen Risiko & Psikologi Trading',
    shortTitle: 'Risiko & Mindset',
    badge: 'Pertahanan Modal',
    description: 'Formula asimetri Risk-to-Reward, kalkulasi position sizing, Kelly criterion, drawdown control, dan disiplin psikologis bebas FOMO / balas dendam.',
    accentColor: '#E11D48',
    borderClass: 'border-rose-400 dark:border-rose-500/50',
    badgeBg: 'bg-rose-100 dark:bg-rose-950/60',
    badgeText: 'text-rose-800 dark:text-rose-300',
    cardBg: 'hover:border-rose-400/80',
    iconName: 'ShieldCheck',
    roadmapSlug: 'risk-management-psychology'
  },
  {
    id: 'quant',
    slug: 'quant',
    title: 'Analisis Kuantitatif & Trading Algoritmik',
    shortTitle: 'Kuantitatif & Algo',
    badge: 'Probabilistik',
    description: 'Pemodelan matematis pasar finansial: backtesting Python, validasi walk-forward, uji ketahanan Monte Carlo, dan algoritma eksekusi order.',
    accentColor: '#10B981',
    borderClass: 'border-emerald-400 dark:border-emerald-500/50',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    cardBg: 'hover:border-emerald-400/80',
    iconName: 'Cpu',
    roadmapSlug: 'quantitative-algo-trading'
  }
];

export function getModuleIdForArticle(articleOrSlug?: EducationalArticle | string | null): string {
  if (!articleOrSlug) return 'price-action';
  const slug = typeof articleOrSlug === 'string' ? articleOrSlug : articleOrSlug.slug;
  const category = typeof articleOrSlug === 'string' ? (EDUCATIONAL_ARTICLES[slug]?.category || '') : articleOrSlug.category;

  if (category === 'Edianto Ong Mega Profit' || slug.startsWith('edianto-ong-') || slug.startsWith('art-eo-')) {
    return 'edianto-ong';
  }
  if (SMC_ARTICLES[slug] || category === 'Institutional Trading' || slug.startsWith('smc-')) {
    return 'smc';
  }
  if (WYCKOFF_ARTICLES[slug] || category === 'Classical Analysis' || slug.startsWith('wyckoff-') || slug.startsWith('wyk-')) {
    return 'wyckoff';
  }
  if (RISK_ARTICLES[slug] || category === 'Core Foundation' || slug.startsWith('risk-') || slug.startsWith('psych-')) {
    return 'risk';
  }
  if (QUANT_ARTICLES[slug] || category === 'Quantitative' || category === 'Quantitative Analysis' || slug.startsWith('quant-')) {
    return 'quant';
  }
  return 'price-action';
}

export function getArticlesByModule(moduleId: string): EducationalArticle[] {
  switch (moduleId) {
    case 'edianto-ong':
      return Object.values(EDIANTO_ONG_ARTICLES);
    case 'smc':
      return Object.values(SMC_ARTICLES);
    case 'wyckoff':
      return Object.values(WYCKOFF_ARTICLES);
    case 'risk':
      return Object.values(RISK_ARTICLES);
    case 'quant':
      return Object.values(QUANT_ARTICLES);
    case 'price-action':
    default:
      return Object.values(PRICE_ACTION_ARTICLES);
  }
}

export function getModulesWithArticles(): Array<DocModuleInfo & { articles: EducationalArticle[] }> {
  return DOC_MODULES.map(mod => ({
    ...mod,
    articles: getArticlesByModule(mod.id)
  }));
}

export {
  PRICE_ACTION_ARTICLES,
  SMC_ARTICLES,
  WYCKOFF_ARTICLES,
  RISK_ARTICLES,
  QUANT_ARTICLES
};
