// Lightweight metadata definitions for curriculum navigation
// All article contents, markdown bodies, and illustrations are fetched dynamically from the database.

export interface ArticleMeta {
  id: string;
  slug: string;
  title: string;
  category: string;
  moduleId: string;
  level: number;
  readingTimeMinutes: number;
  difficulty: string;
  summary: string;
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
  iconName: 'TrendingUp' | 'Layers' | 'BarChart3' | 'ShieldCheck' | 'Cpu' | 'Award' | 'Coins';
  roadmapSlug: string;
}

export const DOC_MODULES: DocModuleInfo[] = [
  {
    id: 'crypto-smart-money',
    slug: 'crypto-smart-money',
    title: 'Crypto Smart Money Concept (Akademi Crypto)',
    shortTitle: 'Akademi Crypto CSM',
    badge: 'Whale & Likuiditas',
    description: 'Buku & kurikulum 12 Bab Akademi Crypto: Mengungkap jejak likuiditas Whales, CEX/DEX Order Flow, Liquidity Sweeps, Market Structure, CHoCH, Order Block, dan Manajemen Portofolio 70/30.',
    accentColor: '#38BDF8',
    borderClass: 'border-sky-400 dark:border-sky-500/50',
    badgeBg: 'bg-sky-100 dark:bg-sky-950/60',
    badgeText: 'text-sky-800 dark:text-sky-300',
    cardBg: 'hover:border-sky-400/80',
    iconName: 'Coins',
    roadmapSlug: 'crypto-smart-money-concept'
  },
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
    badge: 'Proteksi Modal',
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

export function getRoadmapSlugForArticle(articleOrSlug?: { slug?: string; category?: string; moduleId?: string } | string | null): string {
  if (!articleOrSlug) return 'price-action-market-structure';
  const slug = typeof articleOrSlug === 'string' ? articleOrSlug : (articleOrSlug.slug || '');
  const category = typeof articleOrSlug === 'string' ? '' : (articleOrSlug.category || '');
  const moduleId = typeof articleOrSlug === 'string' ? '' : (articleOrSlug.moduleId || '');

  if (moduleId === 'crypto-smart-money' || category === 'Crypto Smart Money' || slug.startsWith('csm-')) {
    return 'crypto-smart-money-concept';
  }
  if (moduleId === 'edianto-ong' || category === 'Edianto Ong Mega Profit' || slug.startsWith('edianto-ong-')) {
    return 'technical-analysis-mega-profit';
  }
  if (moduleId === 'smc' || category === 'Institutional Trading' || slug.startsWith('smc-')) {
    return 'smart-money-concepts-ict';
  }
  if (moduleId === 'wyckoff' || category === 'Classical Analysis' || slug.startsWith('wyckoff-') || slug.startsWith('wyk-')) {
    return 'wyckoff-method-vsa';
  }
  if (moduleId === 'risk' || category === 'Core Foundation' || category === 'Risk Management' || slug.startsWith('risk-') || slug.startsWith('psych-')) {
    return 'risk-management-psychology';
  }
  if (moduleId === 'quant' || category === 'Quantitative' || category === 'Quantitative Analysis' || slug.startsWith('quant-')) {
    return 'quantitative-algo-trading';
  }
  return 'price-action-market-structure';
}

export function getModuleIdForArticle(articleOrSlug?: { slug?: string; category?: string; moduleId?: string } | string | null): string {
  if (!articleOrSlug) return 'price-action';
  if (typeof articleOrSlug !== 'string' && articleOrSlug.moduleId) {
    return articleOrSlug.moduleId;
  }
  const slug = typeof articleOrSlug === 'string' ? articleOrSlug : (articleOrSlug.slug || '');
  const category = typeof articleOrSlug === 'string' ? '' : (articleOrSlug.category || '');

  if (category === 'Crypto Smart Money' || slug.startsWith('csm-')) return 'crypto-smart-money';
  if (category === 'Edianto Ong Mega Profit' || slug.startsWith('edianto-ong-')) return 'edianto-ong';
  if (category === 'Institutional Trading' || slug.startsWith('smc-')) return 'smc';
  if (category === 'Classical Analysis' || slug.startsWith('wyckoff-') || slug.startsWith('wyk-')) return 'wyckoff';
  if (category === 'Core Foundation' || category === 'Risk Management' || slug.startsWith('risk-') || slug.startsWith('psych-')) return 'risk';
  if (category === 'Quantitative' || category === 'Quantitative Analysis' || slug.startsWith('quant-')) return 'quant';
  return 'price-action';
}
