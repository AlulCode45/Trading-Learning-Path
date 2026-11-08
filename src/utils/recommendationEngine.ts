import { EducationalArticle } from '../types';
import { 
  EDUCATIONAL_ARTICLES, 
  getAllArticles, 
  getArticlesByModule, 
  getModuleIdForArticle, 
  DOC_MODULES 
} from '../data/articles';

export interface ArticleRecommendation {
  article: EducationalArticle;
  reason: string;
  type: 'next_step' | 'synergy' | 'risk_defense' | 'prerequisite' | 'classical_comparison' | 'quant_validation';
  badgeText: string;
  badgeBg: string;
  badgeTextClass: string;
  score: number;
}

/**
 * Intelligent recommendation engine for technical trading curriculum.
 * Computes recommendations based on:
 * 1. Immediate Next Step in the current module syllabus
 * 2. Prerequisite foundation (if advanced)
 * 3. Cross-module methodology synergy (SMC <-> Wyckoff <-> Price Action)
 * 4. Compulsory risk management pairing
 * 5. Explicit related topics defined on the article
 */
export function getSmartRecommendations(
  currentArticle: EducationalArticle | null | undefined,
  maxResults = 4
): ArticleRecommendation[] {
  if (!currentArticle || !currentArticle.slug) return [];

  const recommendations: ArticleRecommendation[] = [];
  const currentSlug = currentArticle.slug;
  const currentModuleId = getModuleIdForArticle(currentArticle);
  const moduleArticles = getArticlesByModule(currentModuleId);
  const allArticles = getAllArticles();

  const articleMap = new Map<string, EducationalArticle>();
  allArticles.forEach(a => articleMap.set(a.slug, a));

  const addedSlugs = new Set<string>([currentSlug]);

  // Helper to safely add recommendation
  const addRec = (
    slug: string, 
    reason: string, 
    type: ArticleRecommendation['type'], 
    badgeText: string, 
    badgeBg: string, 
    badgeTextClass: string,
    score: number
  ) => {
    if (addedSlugs.has(slug)) return;
    const target = articleMap.get(slug) || EDUCATIONAL_ARTICLES[slug];
    if (!target) return;

    addedSlugs.add(slug);
    recommendations.push({
      article: target,
      reason,
      type,
      badgeText,
      badgeBg,
      badgeTextClass,
      score
    });
  };

  // 1. Next Sequential Step in current module
  const currentIdx = moduleArticles.findIndex(a => a.slug === currentSlug);
  if (currentIdx >= 0 && currentIdx < moduleArticles.length - 1) {
    const nextArt = moduleArticles[currentIdx + 1];
    addRec(
      nextArt.slug,
      `Lanjutan logis setelah ${currentArticle.title.slice(0, 32)}...`,
      'next_step',
      'Langkah Selanjutnya',
      'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
      'text-emerald-700 dark:text-emerald-400',
      100
    );
  }

  // 2. Explicit Related Topics from article definition
  if (currentArticle.relatedTopics && currentArticle.relatedTopics.length > 0) {
    for (const rel of currentArticle.relatedTopics) {
      if (rel.slug !== currentSlug && !addedSlugs.has(rel.slug)) {
        addRec(
          rel.slug,
          `Topik yang memiliki kaitan konseptual langsung dengan materi ini`,
          'synergy',
          'Konsep Terkait',
          'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30',
          'text-sky-700 dark:text-sky-400',
          85
        );
      }
    }
  }

  // 3. Domain Cross-Module Synergy Rules:
  // Rule A: Price Action or SMC -> Must pair with Risk Management
  if (currentModuleId === 'price-action' || currentModuleId === 'smc') {
    addRec(
      'logical-stop-loss-asymmetric-rr',
      'Proteksi modal: Aturan Stop Loss logis dan Risk-to-Reward asimetris minimum 1:2',
      'risk_defense',
      'Proteksi Risiko',
      'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
      'text-rose-700 dark:text-rose-400',
      90
    );

    // Rule B: SMC / Price Action Liquidity -> Pair with Wyckoff Spring / VSA
    if (currentSlug.includes('liquidity') || currentSlug.includes('sweep') || currentSlug.includes('order-block') || currentSlug.includes('fvg')) {
      addRec(
        'wyckoff-spring-upthrust-action',
        'Bandingkan manipulasi likuiditas institusional dengan skematik Spring & Upthrust klasik',
        'classical_comparison',
        'Sinergi Wyckoff',
        'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30',
        'text-purple-700 dark:text-purple-400',
        80
      );
    }
  }

  // Rule C: Wyckoff -> Pair with modern SMC Order Block / Imbalance
  if (currentModuleId === 'wyckoff') {
    addRec(
      'smc-liquidity-inducement',
      'Evolusi modern: Cara Smart Money masa kini menjebak retail trader di area akumulasi',
      'synergy',
      'Sinergi Modern SMC',
      'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30',
      'text-sky-700 dark:text-sky-400',
      85
    );
    addRec(
      'risk-mathematical-expectancy',
      'Menghitung keunggulan statistik (Positive Expectancy) pada setup akumulasi Wyckoff',
      'risk_defense',
      'Kalkulasi Edge',
      'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
      'text-rose-700 dark:text-rose-400',
      75
    );
  }

  // Rule D: Risk Management -> Pair with Trading Journal & Psychology
  if (currentModuleId === 'risk') {
    addRec(
      'journaling-post-trade-review',
      'Audit statistik: Catat setiap eksekusi untuk mendeteksi deviasi disiplin dan emosi',
      'synergy',
      'Audit Disiplin',
      'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
      'text-amber-700 dark:text-amber-400',
      85
    );
    addRec(
      'psych-neuroscience-tilt-fomo',
      'Kendalikan amigdala & reaksi fisiologis saat mengalami kerugian beruntun',
      'risk_defense',
      'Psikologi Emosi',
      'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
      'text-rose-700 dark:text-rose-400',
      80
    );
  }

  // Rule E: Quantitative & Algorithmic -> Pair with Market Microstructure & Python backtest
  if (currentModuleId === 'quant') {
    addRec(
      'quant-walk-forward-monte-carlo',
      'Uji ketahanan algoritma terhadap curve-fitting menggunakan simulasi Monte Carlo',
      'quant_validation',
      'Validasi Model',
      'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
      'text-emerald-700 dark:text-emerald-400',
      85
    );
    addRec(
      'candlestick-anatomy-wick-dynamics',
      'Pahami mikrostruktur pembentukan harga sebelum merumuskan data baris numerik',
      'prerequisite',
      'Mikrostruktur Harga',
      'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
      'text-amber-700 dark:text-amber-400',
      75
    );
  }

  // Sort by score descending and take maxResults
  recommendations.sort((a, b) => b.score - a.score);
  return recommendations.slice(0, maxResults);
}
