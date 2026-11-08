import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { MermaidDiagram } from './MermaidDiagram';
import { EducationalArticle, RoadmapNode } from '../types';
import { 
  EDUCATIONAL_ARTICLES, 
  getAllArticles, 
  getRoadmapSlugForArticle, 
  DOC_MODULES, 
  getModuleIdForArticle, 
  getArticlesByModule 
} from '../data/articles';
import { getSmartRecommendations } from '../utils/recommendationEngine';
import { VisualDiagram } from './VisualDiagram';
import { InteractiveTradingChart } from './illustration/InteractiveTradingChart';
import { ChartSnapshotViewer } from './illustration/ChartSnapshotViewer';
import { CustomChartRenderer } from './illustration/CustomChartRenderer';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  FileText, 
  Layers, 
  Map, 
  AlertTriangle, 
  Lightbulb, 
  Info, 
  Bookmark, 
  Share2, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Folder,
  TrendingUp,
  Check,
  Search,
  GraduationCap,
  Sparkles,
  Target
} from 'lucide-react';

interface DocReaderProps {
  articleSlug: string;
  allNodes?: RoadmapNode[];
  onSelectArticle: (slug: string) => void;
  onReturnToRoadmap: () => void;
  onUpdateNodeStatus?: (nodeId: string, status: RoadmapNode['status']) => void;
  nodeStatus?: Record<string, RoadmapNode['status']>;
}

export const DocReader: React.FC<DocReaderProps> = ({
  articleSlug,
  allNodes = [],
  onSelectArticle,
  onReturnToRoadmap,
  onUpdateNodeStatus,
  nodeStatus = {}
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sidebarSearch, setSidebarSearch] = useState<string>('');
  const [dynamicArticle, setDynamicArticle] = useState<EducationalArticle | null>(null);
  const [dynamicRoadmapMeta, setDynamicRoadmapMeta] = useState<{ title: string; slug: string } | null>(null);

  const isCommunitySlug = !EDUCATIONAL_ARTICLES[articleSlug];
  const [loadingCommunity, setLoadingCommunity] = useState<boolean>(isCommunitySlug);

  useEffect(() => {
    // 1. First attempt to fetch from high-performance Database API
    fetch(`/api/curriculum/articles/${articleSlug}`)
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          const row = json.data;
          const art: EducationalArticle = {
            id: row.id,
            nodeId: row.nodeId,
            slug: row.slug,
            title: row.title,
            category: row.category,
            level: row.level,
            readingTimeMinutes: row.readingTimeMinutes,
            summary: row.summary,
            difficulty: row.difficulty,
            prerequisites: [],
            tableOfContents: (row.sections || []).map((s: any) => ({
              id: s.id,
              title: s.title
            })),
            sections: row.sections || [],
            keyTakeaways: row.keyTakeaways || [],
            commonMistakes: row.commonMistakes || [],
            relatedTopics: row.relatedTopics || [],
            references: row.references || []
          };
          setDynamicArticle(art);
          setLoadingCommunity(false);
        } else if (isCommunitySlug) {
          // Fallback to community articles
          fetchCommunityArticle();
        } else {
          setLoadingCommunity(false);
        }
      })
      .catch(() => {
        if (isCommunitySlug) {
          fetchCommunityArticle();
        } else {
          setLoadingCommunity(false);
        }
      });

    function fetchCommunityArticle() {
      setLoadingCommunity(true);
      fetch(`/api/community/articles/${articleSlug}`)
        .then(res => res.json())
        .then(json => {
          if (json.success && json.data) {
            const row = json.data;
            let payload: any = {};
            try {
              if (row.illustration_payload) {
                payload = JSON.parse(row.illustration_payload);
              }
            } catch (e) {
              console.error(e);
            }

            if (payload.roadmapSlug) {
              setDynamicRoadmapMeta({
                title: payload.roadmapTitle || 'Kurikulum Komunitas',
                slug: payload.roadmapSlug
              });
            } else {
              setDynamicRoadmapMeta(null);
            }

            const docCfg = payload.docConfig;
            const builtSections =
              docCfg && Array.isArray(docCfg.sections) && docCfg.sections.length > 0
                ? docCfg.sections.map((sec: any, idx: number) => ({
                    id: sec.id || `sec-${idx + 1}`,
                    title: sec.title || `Bab ${idx + 1}`,
                    content: sec.content || '',
                    illustrationMode:
                      sec.illustrationMode && sec.illustrationMode !== 'none'
                        ? sec.illustrationMode
                        : idx === 0
                        ? payload.illustrationMode || row.illustration_mode
                        : undefined,
                    customChartConfig:
                      sec.customChartConfig || (idx === 0 ? payload.customChartConfig : undefined),
                    snapshotConfig: sec.snapshotUrl
                      ? { src: sec.snapshotUrl, caption: sec.title }
                      : idx === 0
                      ? payload.snapshotConfig
                      : undefined,
                    callout:
                      sec.callout && sec.callout.enabled
                        ? {
                            type: sec.callout.type || 'tip',
                            title: sec.callout.title,
                            text: sec.callout.text
                          }
                        : undefined,
                    financialExample:
                      sec.financialExample && sec.financialExample.enabled
                        ? {
                            scenario: sec.financialExample.scenario,
                            analysis: sec.financialExample.analysis,
                            outcome: sec.financialExample.outcome
                          }
                        : undefined
                  }))
                : [
                    {
                      id: 'sec-materi',
                      title: row.title,
                      illustrationMode: (payload.illustrationMode || row.illustration_mode || 'none') as any,
                      customChartConfig: payload.customChartConfig,
                      snapshotConfig: payload.snapshotConfig,
                      content: row.content_markdown || ''
                    }
                  ];

            const art: EducationalArticle = {
              id: row.id,
              nodeId: payload.nodeId || row.node_id,
              slug: row.slug,
              title: row.title,
              category: payload.category || row.category || 'Kurikulum Komunitas',
              level: payload.level || 1,
              readingTimeMinutes: docCfg?.readingTimeMinutes || 8,
              summary:
                docCfg?.summary ||
                (row.content_markdown
                  ? row.content_markdown.replace(/[#*`]/g, '').slice(0, 160) + '...'
                  : 'Dokumentasi Modul Kurikulum Komunitas'),
              difficulty: payload.difficulty || 'Intermediate',
              prerequisites: docCfg?.prerequisites || [],
              tableOfContents: builtSections.map((s: any) => ({
                id: s.id,
                title: s.title
              })),
              keyTakeaways:
                docCfg?.keyTakeaways && docCfg.keyTakeaways.length > 0
                  ? docCfg.keyTakeaways
                  : [
                      'Pahami struktur dan metodologi trading yang disajikan secara sistematis.',
                      'Perhatikan visualisasi skematik candlestick chart atau anotasi snapshot.',
                      'Disiplin dalam manajemen risiko dan validasi sebelum eksekusi.'
                    ],
              commonMistakes: docCfg?.commonMistakes || [],
              sections: builtSections as any,
              relatedTopics: [],
              references: []
            };
            setDynamicArticle(art);
          }
        })
        .catch(err => console.error('Failed to load community article', err))
        .finally(() => setLoadingCommunity(false));
    }
  }, [articleSlug, isCommunitySlug]);

  const article: EducationalArticle | undefined = EDUCATIONAL_ARTICLES[articleSlug] || dynamicArticle;
  const allArticlesList = getAllArticles();

  const currentModuleId = useMemo(() => getModuleIdForArticle(article), [article]);
  const currentModuleInfo = useMemo(() => DOC_MODULES.find(m => m.id === currentModuleId) || DOC_MODULES[0], [currentModuleId]);

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'price-action': true,
    'smc': true,
    'wyckoff': true,
    'risk': true,
    'quant': true
  });

  // Ensure current module is expanded when article changes
  useEffect(() => {
    setExpandedModules(prev => ({
      ...prev,
      [currentModuleId]: true
    }));
  }, [currentModuleId]);

  const DOC_CATEGORIES = [
    { id: 'all', label: 'Semua Modul' },
    { id: 'price-action', label: 'Price Action' },
    { id: 'smc', label: 'SMC & ICT' },
    { id: 'wyckoff', label: 'Wyckoff' },
    { id: 'risk', label: 'Risiko' },
    { id: 'quant', label: 'Kuantitatif' }
  ];

  // Grouped modules for the sidebar
  const groupedModulesForSidebar = useMemo(() => {
    return DOC_MODULES.map(mod => {
      const articles = getArticlesByModule(mod.id);
      const filtered = articles.filter(item => {
        if (!sidebarSearch.trim()) return true;
        const q = sidebarSearch.toLowerCase();
        return item.title.toLowerCase().includes(q) ||
               item.slug.toLowerCase().includes(q) ||
               item.category.toLowerCase().includes(q);
      });
      return {
        ...mod,
        articles: filtered,
        total: articles.length
      };
    }).filter(mod => selectedCategory === 'all' || mod.id === selectedCategory);
  }, [sidebarSearch, selectedCategory]);

  const connectedRoadmap = useMemo(() => {
    if (dynamicRoadmapMeta) {
      return dynamicRoadmapMeta;
    }
    const rSlug = getRoadmapSlugForArticle(article);
    switch (rSlug) {
      case 'smart-money-concepts-ict':
        return { title: 'Smart Money Concepts & ICT', slug: rSlug };
      case 'wyckoff-method-vsa':
        return { title: 'Wyckoff Method & VSA', slug: rSlug };
      case 'risk-management-psychology':
        return { title: 'Risk Management & Trading Psychology', slug: rSlug };
      case 'quantitative-algo-trading':
        return { title: 'Quantitative & Algorithmic Trading', slug: rSlug };
      default:
        return { title: 'Price Action & Market Structure', slug: 'price-action-market-structure' };
    }
  }, [article, dynamicRoadmapMeta]);

  // Current module's articles for logical in-module prev/next
  const currentModuleArticles = useMemo(() => {
    return getArticlesByModule(currentModuleId);
  }, [currentModuleId]);

  const moduleCompletedCount = useMemo(() => {
    return currentModuleArticles.filter(a => a.nodeId && nodeStatus[a.nodeId] === 'completed').length;
  }, [currentModuleArticles, nodeStatus]);

  const moduleProgressPercent = useMemo(() => {
    if (currentModuleArticles.length === 0) return 0;
    return Math.round((moduleCompletedCount / currentModuleArticles.length) * 100);
  }, [moduleCompletedCount, currentModuleArticles]);

  const filteredCurrentModuleArticles = useMemo(() => {
    if (!sidebarSearch.trim()) return currentModuleArticles;
    const q = sidebarSearch.toLowerCase();
    return currentModuleArticles.filter(item => 
      item.title.toLowerCase().includes(q) ||
      item.slug.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }, [currentModuleArticles, sidebarSearch]);

  // Contextual smart recommendations engine
  const smartRecommendations = useMemo(() => {
    return getSmartRecommendations(article, 4);
  }, [article]);

  const moduleIndex = article ? currentModuleArticles.findIndex(a => a.slug === article.slug) : -1;
  const prevArticle = moduleIndex > 0 ? currentModuleArticles[moduleIndex - 1] : null;
  const nextArticle = moduleIndex >= 0 && moduleIndex < currentModuleArticles.length - 1 ? currentModuleArticles[moduleIndex + 1] : null;

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!article) return;
      const tocs = article.tableOfContents || [];
      const sections = tocs.map(toc => document.getElementById(toc.id)).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSectionId(el.id);
            return;
          }
        }
      }
      if (tocs.length > 0) {
        setActiveSectionId(tocs[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveSectionId(id);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const isCompleted = article && article.nodeId ? nodeStatus[article.nodeId] === 'completed' : false;

  const handleToggleCompleted = () => {
    if (!article || !article.nodeId) return;
    if (!article.nodeId || !onUpdateNodeStatus) return;
    if (!isCompleted) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10B981', '#38BDF8', '#F59E0B']
      });
      onUpdateNodeStatus(article.nodeId, 'completed');
    } else {
      onUpdateNodeStatus(article.nodeId, 'available');
    }
  };

  if (loadingCommunity) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-6 text-center space-y-3">
        <div className="w-8 h-8 mx-auto border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono text-slate-500 dark:text-zinc-400">Memuat artikel komunitas...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h2 className="text-xl font-bold mb-3">Materi Belum Tersedia</h2>
        <p className="text-sm text-slate-500 mb-6">Artikel edukasi untuk topik ini sedang dalam tahap penulisan tim kurikulum.</p>
        <button
          onClick={onReturnToRoadmap}
          className="px-4 py-2 bg-[#10B981] text-black font-semibold rounded-lg text-xs"
        >
          Kembali ke Peta Roadmap
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090D] text-slate-900 dark:text-[#E2E8F0] transition-colors">
      {/* Top Sticky Subheader Bar */}
      <div className="sticky top-15 z-30 bg-white/95 dark:bg-[#0D1017]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#1D2532] px-4 sm:px-8 py-2.5 flex items-center justify-between transition-colors">
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 dark:text-[#94A3B8] overflow-x-auto">
          <Link
            to="/docs"
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-[#121722] dark:hover:bg-[#1D2532] text-slate-700 dark:text-[#94A3B8] hover:text-black dark:hover:text-white border border-slate-300 dark:border-[#1D2532] transition-colors flex-shrink-0 font-medium"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Dokumentasi Hub</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 opacity-40 text-slate-400" />
          <button
            onClick={() => setSelectedCategory(currentModuleId)}
            className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono transition-colors flex-shrink-0 ${currentModuleInfo.badgeBg} ${currentModuleInfo.badgeText}`}
          >
            {currentModuleInfo.shortTitle}
          </button>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 opacity-40 text-slate-400" />
          <span className="truncate max-w-[220px] sm:max-w-none text-emerald-600 dark:text-[#10B981] font-semibold">
            {article.title}
          </span>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={onReturnToRoadmap}
            className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-[#1D2532] hover:bg-slate-100 dark:hover:bg-[#1D2532] text-slate-600 dark:text-[#94A3B8] hover:text-black dark:hover:text-white text-xs font-mono transition-colors"
            title="Buka peta visual roadmap"
          >
            <Map className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Peta Visual</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="p-1.5 rounded-lg border border-slate-300 dark:border-[#1D2532] hover:bg-slate-100 dark:hover:bg-[#1D2532] text-slate-600 dark:text-[#94A3B8] hover:text-black dark:hover:text-white text-xs flex items-center space-x-1 transition-colors"
            title="Bagikan tautan dokumen"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copiedLink ? 'Tersalin' : 'Share'}</span>
          </button>

          {article.nodeId && onUpdateNodeStatus && (
            <button
              onClick={handleToggleCompleted}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 border transition-all ${
                isCompleted
                  ? 'bg-[#10B981] text-black border-[#10B981] shadow-xs'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-[#121722] dark:text-[#10B981] dark:border-[#10B981]/40 dark:hover:bg-[#10B981]/15'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isCompleted ? 'Selesai Dipelajari ✓' : 'Tandai Selesai'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main 3-Column Technical Documentation Layout - Expanded Main Content Focus */}
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        {/* Left Navigation: Focussed on Current Module + Smart Recommendation Engine */}
        <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
          <div className="sticky top-28 space-y-4">
            
            {/* Back to Blog Hub Button */}
            <Link
              to="/docs"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#121722] dark:hover:bg-zinc-800 border border-slate-300 dark:border-zinc-800 text-xs font-mono font-bold text-slate-800 dark:text-zinc-200 transition-colors shadow-2xs"
            >
              <span className="flex items-center space-x-2">
                <BookOpen className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Katalog Blog &amp; Semua Modul</span>
              </span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>

            {/* Current Module Focus Card & Progress */}
            <div className={`p-4 rounded-2xl border-2 transition-all ${currentModuleInfo.borderClass} bg-white dark:bg-[#0D1017] shadow-xs space-y-2.5`}>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded ${currentModuleInfo.badgeBg} ${currentModuleInfo.badgeText}`}>
                  {currentModuleInfo.badge}
                </span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                  {moduleCompletedCount}/{currentModuleArticles.length} Selesai ({moduleProgressPercent}%)
                </span>
              </div>

              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                  {currentModuleInfo.title}
                </h3>
                <p className="text-[11px] text-slate-600 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {currentModuleInfo.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300" 
                  style={{ width: `${moduleProgressPercent}%` }}
                />
              </div>
            </div>

            {/* Search within this module */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={`Cari materi ${currentModuleInfo.shortTitle}...`}
                value={sidebarSearch}
                onChange={(e) => setSidebarSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-[#121722] border border-slate-200 dark:border-[#1D2532] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Step-by-step topic list of current module (Full Focus) */}
            <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
              {filteredCurrentModuleArticles.map((item, idx) => {
                const isActive = item.slug === article.slug;
                const itemCompleted = item.nodeId ? nodeStatus[item.nodeId] === 'completed' : false;

                return (
                  <button
                    key={`${item.slug}-${idx}`}
                    onClick={() => onSelectArticle(item.slug)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between group ${
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-900 dark:text-[#10B981] font-bold border-2 border-emerald-500/60 shadow-xs'
                        : 'bg-white dark:bg-[#0D1017] border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-[#94A3B8] hover:border-slate-400 dark:hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex items-start space-x-2 truncate pr-2">
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded flex-shrink-0 ${
                        isActive 
                          ? 'bg-emerald-500 text-black font-extrabold'
                          : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400'
                      }`}>
                        #{String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="truncate">
                        <div className="truncate font-medium">{item.title}</div>
                        {isActive && (
                          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                            <span>Sedang Dibaca</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {itemCompleted && (
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Connected Interactive Roadmap Canvas */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#0D1017] border border-slate-200 dark:border-[#1D2532] shadow-2xs">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Peta Roadmap Visual</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-[#94A3B8] leading-relaxed mb-2.5">
                Modul ini terhubung ke kurikulum <strong>{connectedRoadmap.title}</strong>.
              </p>
              <Link
                to={`/roadmaps/${connectedRoadmap.slug}`}
                className="w-full py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-emerald-50 text-emerald-800 border border-slate-300 hover:border-emerald-500 dark:bg-[#121722] dark:hover:bg-white/5 dark:border-[#1D2532] dark:hover:border-[#10B981] dark:text-[#10B981] text-xs font-mono flex items-center justify-center space-x-1.5 transition-colors font-medium"
              >
                <Map className="w-3.5 h-3.5" />
                <span>Buka Kanvas Interaktif</span>
              </Link>
            </div>

          </div>
        </aside>

        {/* Center: Main Educational Article Body - Expanded & Focused */}
        <article className="flex-1 min-w-0 max-w-none">
          {/* Article Header Metadata */}
          <div className="border-b border-slate-200 dark:border-[#1D2532] pb-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-[#10B981]/15 dark:text-[#10B981] border border-emerald-300 dark:border-[#10B981]/30 font-semibold">
                {article.category}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-[#121722] text-slate-700 dark:text-[#94A3B8] border border-slate-200 dark:border-[#1D2532]">
                Level {article.level}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-[#121722] text-slate-700 dark:text-[#94A3B8] border border-slate-200 dark:border-[#1D2532]">
                {article.difficulty}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-[#94A3B8] flex items-center space-x-1 ml-auto font-medium">
                <Clock className="w-3 h-3" />
                <span>{article.readingTimeMinutes} min baca</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-[#F8FAFC] leading-tight mb-4">
              {article.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8] leading-relaxed font-normal">
              {article.summary}
            </p>

            {article.prerequisites && article.prerequisites.length > 0 && (
              <div className="mt-4 p-3 rounded-lg bg-slate-100 dark:bg-[#0D1017] border border-slate-200 dark:border-[#1D2532] flex items-start space-x-2 text-xs">
                <Bookmark className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-[#F8FAFC]">Prasyarat Pembahasan: </span>
                  <span className="text-slate-600 dark:text-[#94A3B8]">
                    {article.prerequisites.join(' • ')}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Article Sections Loop with Rich Markdown Rendering */}
          <div className="space-y-10 text-sm leading-relaxed text-slate-800 dark:text-[#CBD5E1]">
            {article.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 space-y-4">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC] pt-2 border-b border-slate-200 dark:border-[#1D2532]/60 pb-2">
                  {section.title}
                </h2>

                {/* Render Rich Markdown with GFM Table Support & KaTeX Math */}
                <div className="leading-relaxed">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      p: ({ children }) => (
                        <p className="text-sm leading-relaxed text-slate-700 dark:text-[#CBD5E1] mb-3.5 last:mb-0">
                          {children}
                        </p>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mt-4 mb-2 tracking-tight">
                          {children}
                        </h3>
                      ),
                      h4: ({ children }) => (
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-3 mb-1.5 tracking-tight">
                          {children}
                        </h4>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-outside ml-5 space-y-1.5 my-3 text-sm text-slate-700 dark:text-[#CBD5E1]">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-outside ml-5 space-y-1.5 my-3 text-sm text-slate-700 dark:text-[#CBD5E1]">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="text-sm leading-relaxed text-slate-700 dark:text-[#CBD5E1]">
                          {children}
                        </li>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-bold text-slate-950 dark:text-white">
                          {children}
                        </strong>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 my-3.5 rounded-r-lg text-xs sm:text-sm text-amber-950 dark:text-amber-200 italic font-medium">
                          {children}
                        </blockquote>
                      ),
                      code: ({ children, className, ...props }: any) => {
                        const isInline = !className && typeof children === 'string' && !children.includes('\n');
                        if (isInline) {
                          return (
                            <code className="bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold border border-slate-200 dark:border-zinc-700" {...props}>
                              {children}
                            </code>
                          );
                        }

                        // Check if language is mermaid
                        const match = /language-(\w+)/.exec(className || '');
                        const lang = match ? match[1] : '';
                        if (lang === 'mermaid' || (typeof children === 'string' && (children.trim().startsWith('flowchart') || children.trim().startsWith('sequenceDiagram') || children.trim().startsWith('graph')))) {
                          return <MermaidDiagram chart={String(children)} />;
                        }

                        return (
                          <pre className="bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto my-3 border border-zinc-800">
                            <code {...props}>{children}</code>
                          </pre>
                        );
                      },
                      /* GFM Table Rendering Components */
                      table: ({ children }) => (
                        <div className="my-5 overflow-x-auto rounded-xl border border-slate-300 dark:border-zinc-700 shadow-sm">
                          <table className="w-full text-left text-xs border-collapse">
                            {children}
                          </table>
                        </div>
                      ),
                      thead: ({ children }) => (
                        <thead className="bg-slate-100 dark:bg-zinc-800 border-b-2 border-slate-300 dark:border-zinc-700">
                          {children}
                        </thead>
                      ),
                      th: ({ children }) => (
                        <th className="px-4 py-3 font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-zinc-100 border-r last:border-r-0 border-slate-300 dark:border-zinc-700 text-[11.5px]">
                          {children}
                        </th>
                      ),
                      tbody: ({ children }) => (
                        <tbody className="divide-y divide-slate-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900/60 font-mono">
                          {children}
                        </tbody>
                      ),
                      tr: ({ children }) => (
                        <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/40 transition-colors">
                          {children}
                        </tr>
                      ),
                      td: ({ children }) => (
                        <td className="px-4 py-2.5 text-xs text-slate-800 dark:text-zinc-200 border-r last:border-r-0 border-slate-200 dark:border-zinc-800">
                          {children}
                        </td>
                      )
                    }}
                  >
                    {section.content}
                  </ReactMarkdown>
                </div>

                {/* Visual Technical Diagram or Chart Illustration */}
                {section.illustrationMode === 'custom_builder' && (section as any).customChartConfig ? (
                  <div className="my-6">
                    <CustomChartRenderer
                      config={(section as any).customChartConfig}
                      title={section.title}
                    />
                  </div>
                ) : section.visualType ? (
                  <div className="my-6">
                    <VisualDiagram type={section.visualType} />
                  </div>
                ) : section.illustrationMode === 'interactive_chart' ? (
                  <div className="my-6">
                    <InteractiveTradingChart
                      title={section.chartConfig?.title || `${section.title} Setup Chart`}
                      timeframe={section.chartConfig?.timeframe || '15m'}
                    />
                  </div>
                ) : section.illustrationMode === 'snapshot' && section.snapshotConfig?.src ? (
                  <div className="my-6">
                    <ChartSnapshotViewer
                      initialImageUrl={section.snapshotConfig.src}
                      title={section.snapshotConfig.caption || section.title}
                    />
                  </div>
                ) : null}

                {/* Optional Context Callout */}
                {section.callout && (
                  <div className={`p-4 rounded-xl border flex items-start space-x-3 text-xs leading-relaxed ${
                    section.callout.type === 'warning'
                      ? 'bg-rose-50 border-rose-300 text-rose-800 dark:bg-[#F43F5E]/10 dark:border-[#F43F5E]/30 dark:text-[#F43F5E]'
                      : section.callout.type === 'tip'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-[#10B981]/10 dark:border-[#10B981]/30 dark:text-[#10B981]'
                      : section.callout.type === 'example'
                      ? 'bg-sky-50 border-sky-300 text-sky-800 dark:bg-[#38BDF8]/10 dark:border-[#38BDF8]/30 dark:text-[#38BDF8]'
                      : 'bg-amber-50 border-amber-300 text-amber-800 dark:bg-[#F59E0B]/10 dark:border-[#F59E0B]/30 dark:text-[#F59E0B]'
                  }`}>
                    {section.callout.type === 'warning' && <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                    {section.callout.type === 'tip' && <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                    {section.callout.type === 'example' && <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                    {section.callout.type === 'note' && <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                    <div>
                      {section.callout.title && (
                        <div className="font-bold mb-1 uppercase tracking-wider font-mono text-[11px]">
                          {section.callout.title}
                        </div>
                      )}
                      <p className="text-slate-800 dark:text-[#E2E8F0]">{section.callout.text}</p>
                    </div>
                  </div>
                )}

                {/* Optional Financial Example Box */}
                {section.financialExample && (
                  <div className="my-4 p-4 rounded-xl bg-slate-50 dark:bg-[#090D16] border border-slate-200 dark:border-[#1D2532] space-y-2 text-xs">
                    <div className="font-mono uppercase text-[10px] text-sky-600 dark:text-[#38BDF8] font-bold tracking-wider">
                      Studi Kasus Transaksi Riil
                    </div>
                    <div>
                      <strong className="text-slate-900 dark:text-[#F8FAFC]">Skenario: </strong>
                      <span className="text-slate-600 dark:text-[#94A3B8]">{section.financialExample.scenario}</span>
                    </div>
                    <div>
                      <strong className="text-slate-900 dark:text-[#F8FAFC]">Analisis Perilaku Pasar: </strong>
                      <span className="text-slate-600 dark:text-[#94A3B8]">{section.financialExample.analysis}</span>
                    </div>
                    <div className="pt-1 text-emerald-700 dark:text-[#10B981]">
                      <strong className="font-bold">Hasil / Evaluasi: </strong>
                      <span>{section.financialExample.outcome}</span>
                    </div>
                  </div>
                )}
              </section>
            ))}

            {/* Common Mistakes Section */}
            {article.commonMistakes && article.commonMistakes.length > 0 && (
              <section id="common-mistakes" className="scroll-mt-28 pt-6 border-t border-slate-200 dark:border-[#1D2532]">
                <h3 className="text-lg font-bold text-slate-900 dark:text-[#F8FAFC] mb-4 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span>Kesalahan Fatal Trader Pemula &amp; Solusinya</span>
                </h3>
                <div className="space-y-3">
                  {article.commonMistakes.map((cm, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white dark:bg-[#0D1017] border border-slate-200 dark:border-[#1D2532] space-y-1.5 text-xs shadow-xs">
                      <div className="text-rose-600 dark:text-[#F43F5E] font-medium flex items-center space-x-1.5">
                        <span className="font-bold">✕</span>
                        <span>{cm.mistake}</span>
                      </div>
                      <div className="text-emerald-700 dark:text-[#10B981] flex items-center space-x-1.5 pl-3 border-l-2 border-emerald-500">
                        <span className="font-bold">✓</span>
                        <span>{cm.correction}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Key Takeaways Section */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <section id="key-takeaways" className="scroll-mt-28 p-5 rounded-xl bg-emerald-50/70 dark:bg-[#10B981]/5 border border-emerald-300 dark:border-[#10B981]/25">
                <h3 className="text-sm font-mono uppercase tracking-wider text-emerald-800 dark:text-[#10B981] mb-3 flex items-center space-x-2 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Poin Kunci &amp; Prinsip Bertahan</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-800 dark:text-[#CBD5E1]">
                  {article.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-600 dark:text-[#10B981] font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Related Topics Links */}
            {article.relatedTopics && article.relatedTopics.length > 0 && (
              <div className="pt-6 border-t border-slate-200 dark:border-[#1D2532]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] mb-3 font-bold">
                  Topik Terkait dalam Jalur Belajar
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {article.relatedTopics.map((rel, rIdx) => (
                    <button
                      key={`${rel.slug}-${rIdx}`}
                      onClick={() => onSelectArticle(rel.slug)}
                      className="p-3.5 rounded-lg bg-white dark:bg-[#0D1017] border border-slate-200 dark:border-[#1D2532] hover:border-emerald-500 text-left transition-colors group flex items-center justify-between shadow-xs"
                    >
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-[#F8FAFC] group-hover:text-emerald-600 dark:group-hover:text-[#10B981] transition-colors">
                          {rel.title}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 dark:text-[#64748B] mt-0.5">{rel.category}</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Academic & Authoritative References */}
            {article.references && article.references.length > 0 && (
              <div className="pt-6 border-t border-slate-200 dark:border-[#1D2532] text-xs text-slate-500 dark:text-[#94A3B8]">
                <h4 className="font-mono uppercase text-[10px] tracking-wider mb-2 font-bold">
                  Referensi Ilmiah &amp; Literatur Klasik:
                </h4>
                <ul className="space-y-1 font-mono text-[11px]">
                  {article.references.map((ref, idx) => (
                    <li key={idx} className="flex items-center space-x-1.5">
                      <span>[{idx + 1}]</span>
                      <span className="text-slate-800 dark:text-[#CBD5E1] italic">{ref.title}</span>
                      <span>— {ref.author} {ref.year ? `(${ref.year})` : ''}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Previous / Next Article Navigation Footer (In-Module) */}
          <div className="mt-12 pt-6 border-t border-slate-200 dark:border-[#1D2532] space-y-4">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-zinc-400">
              <span>Alur Belajar Modul: <strong className="text-slate-800 dark:text-zinc-200">{currentModuleInfo.title}</strong></span>
              <span>Materi {(moduleIndex >= 0 ? moduleIndex + 1 : 1)} dari {currentModuleArticles.length}</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              {prevArticle ? (
                <button
                  onClick={() => onSelectArticle(prevArticle.slug)}
                  className="flex items-center space-x-2 text-left p-3.5 rounded-xl border border-slate-200 dark:border-[#1D2532] hover:border-emerald-500 bg-white dark:bg-[#0D1017] text-xs transition-colors flex-1 shadow-2xs"
                >
                  <ArrowLeft className="w-4 h-4 text-emerald-600 dark:text-[#10B981] flex-shrink-0" />
                  <div className="truncate">
                    <div className="text-[10px] font-mono text-slate-500">Sebelumnya di {currentModuleInfo.shortTitle}</div>
                    <div className="font-semibold text-slate-900 dark:text-[#F8FAFC] truncate">{prevArticle.title}</div>
                  </div>
                </button>
              ) : <div className="flex-1" />}

              {nextArticle ? (
                <button
                  onClick={() => onSelectArticle(nextArticle.slug)}
                  className="flex items-center justify-end space-x-2 text-right p-3.5 rounded-xl border border-slate-200 dark:border-[#1D2532] hover:border-emerald-500 bg-white dark:bg-[#0D1017] text-xs transition-colors flex-1 shadow-2xs"
                >
                  <div className="truncate">
                    <div className="text-[10px] font-mono text-slate-500">Selanjutnya di {currentModuleInfo.shortTitle}</div>
                    <div className="font-semibold text-slate-900 dark:text-[#F8FAFC] truncate">{nextArticle.title}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-[#10B981] flex-shrink-0" />
                </button>
              ) : (
                <Link
                  to="/docs"
                  className="flex items-center justify-end space-x-2 text-right p-3.5 rounded-xl border border-emerald-500/50 bg-emerald-500/10 text-xs transition-colors flex-1 shadow-2xs"
                >
                  <div className="truncate">
                    <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Modul Selesai ✓</div>
                    <div className="font-semibold text-slate-900 dark:text-white">Jelajahi Modul Lainnya di Blog Hub</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-[#10B981] flex-shrink-0" />
                </Link>
              )}
            </div>

            {/* Quick Link back to Docs Hub */}
            <div className="pt-4 text-center">
              <Link
                to="/docs"
                className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Lihat Semua Modul Dokumentasi (Price Action, SMC, Wyckoff, Risiko, Quant) &rarr;</span>
              </Link>
            </div>
          </div>
        </article>

        {/* Right Sticky Column: Table of Contents + Smart Recommendations System */}
        <aside className="hidden xl:block w-64 2xl:w-72 flex-shrink-0">
          <div className="sticky top-28 space-y-5 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1 scrollbar-none">
            
            {/* 1. Table of Contents (Daftar Isi) */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0D1017] border border-slate-200 dark:border-[#1E293B] shadow-2xs space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] flex items-center space-x-1.5 font-bold">
                <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Daftar Isi (TOC)</span>
              </h4>

              <nav className="space-y-1 text-xs max-h-48 overflow-y-auto pr-1">
                {(article.tableOfContents || []).map(toc => {
                  const isActive = activeSectionId === toc.id;
                  return (
                    <button
                      key={toc.id}
                      onClick={() => scrollToSection(toc.id)}
                      className={`w-full text-left py-1.5 px-2 rounded text-[11px] leading-snug transition-colors truncate block ${
                        isActive
                          ? 'text-emerald-700 dark:text-[#10B981] font-bold bg-emerald-100/60 dark:bg-[#10B981]/10 border-l-2 border-emerald-500'
                          : 'text-slate-600 dark:text-[#94A3B8] hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {toc.title}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* 2. Sistem Rekomendasi Pintar (Right Column) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-zinc-100 font-bold">
                    Rekomendasi Cerdas
                  </h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold border border-amber-500/20">
                  AI Context
                </span>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed">
                Materi lanjutan &amp; sinergi risiko yang relevan dengan topik ini:
              </p>

              <div className="space-y-2.5">
                {smartRecommendations.map((rec, recIdx) => (
                  <div
                    key={`${rec.article.slug}-${recIdx}`}
                    onClick={() => onSelectArticle(rec.article.slug)}
                    className="p-3 rounded-xl bg-white dark:bg-[#0D1017] border border-slate-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500/70 transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-extrabold uppercase border ${rec.badgeBg}`}>
                        {rec.badgeText}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 flex items-center space-x-1">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{rec.article.readingTimeMinutes}m</span>
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-[#10B981] transition-colors leading-snug line-clamp-2">
                      {rec.article.title}
                    </h5>

                    <p className="text-[10px] text-slate-500 dark:text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                      {rec.reason}
                    </p>

                    <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-400 truncate max-w-[120px]">{rec.article.category}</span>
                      <span className="text-emerald-600 dark:text-[#10B981] font-bold group-hover:translate-x-0.5 transition-transform inline-flex items-center space-x-0.5">
                        <span>Baca &rarr;</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Reading Meta Info */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#121722]/50 border border-slate-200 dark:border-zinc-800/70 text-[10px] font-mono text-slate-500 dark:text-[#64748B] space-y-1">
              <div>Topik: {article.slug}</div>
              <div>Estimasi: ~{article.readingTimeMinutes} menit baca</div>
              <div>Kurikulum: {currentModuleInfo.shortTitle}</div>
            </div>

          </div>
        </aside>
      </div>
    </div>
  );
};
