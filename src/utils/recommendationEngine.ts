import { ArticleMeta } from '../data/curriculumMeta';

export interface ArticleRecommendation {
  article: ArticleMeta;
  reason: string;
  type: 'next_step' | 'synergy' | 'risk_defense' | 'prerequisite' | 'classical_comparison' | 'quant_validation';
  badgeText: string;
  badgeBg: string;
  badgeTextClass: string;
  score: number;
}

export function getSmartRecommendations(
  currentArticle: { slug?: string; moduleId?: string; category?: string; level?: number } | null | undefined,
  allArticles: ArticleMeta[],
  maxResults = 4
): ArticleRecommendation[] {
  if (!currentArticle || !currentArticle.slug) return [];

  const recommendations: ArticleRecommendation[] = [];
  const currentSlug = currentArticle.slug;
  const currentModuleId = currentArticle.moduleId;
  const addedSlugs = new Set<string>([currentSlug]);

  const articleMap = new Map<string, ArticleMeta>();
  allArticles.forEach(a => articleMap.set(a.slug, a));

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
    const target = articleMap.get(slug);
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

  // 1. Next immediate lesson in current module
  const sameModuleArticles = allArticles.filter(a => a.moduleId === currentModuleId);
  const currentIdx = sameModuleArticles.findIndex(a => a.slug === currentSlug);
  if (currentIdx !== -1 && currentIdx < sameModuleArticles.length - 1) {
    const nextArt = sameModuleArticles[currentIdx + 1];
    addRec(
      nextArt.slug,
      'Langkah berikutnya dalam silabus modul ini',
      'next_step',
      'Langkah Berikutnya',
      'bg-emerald-500/10 dark:bg-emerald-500/20',
      'text-emerald-700 dark:text-emerald-400',
      100
    );
  }

  // 2. Cross-module methodology synergy
  if (currentModuleId === 'smc') {
    const wyckoffArt = allArticles.find(a => a.moduleId === 'wyckoff' && a.level === 1);
    if (wyckoffArt) {
      addRec(
        wyckoffArt.slug,
        'Bandingkan logika manipulasi Smart Money dengan Skematik Akumulasi Wyckoff klasik',
        'classical_comparison',
        'Sinergi Wyckoff',
        'bg-purple-500/10 dark:bg-purple-500/20',
        'text-purple-700 dark:text-purple-400',
        85
      );
    }
  }

  // 3. Compulsory risk management pairing
  const riskArt = allArticles.find(a => a.moduleId === 'risk');
  if (riskArt && currentModuleId !== 'risk') {
    addRec(
      riskArt.slug,
      'Lindungi modal Anda: kuasai kalkulasi risiko asimetris sebelum menguji strategi ini di akun riil',
      'risk_defense',
      'Wajib: Pertahanan Modal',
      'bg-rose-500/10 dark:bg-rose-500/20',
      'text-rose-700 dark:text-rose-400',
      75
    );
  }

  // 4. Fill remaining spots with relevant module lessons
  for (const art of sameModuleArticles) {
    if (recommendations.length >= maxResults) break;
    if (!addedSlugs.has(art.slug)) {
      addRec(
        art.slug,
        `Materi terkait dalam ${art.category}`,
        'synergy',
        'Topik Selevel',
        'bg-sky-500/10 dark:bg-sky-500/20',
        'text-sky-700 dark:text-sky-400',
        50
      );
    }
  }

  return recommendations.sort((a, b) => b.score - a.score).slice(0, maxResults);
}
