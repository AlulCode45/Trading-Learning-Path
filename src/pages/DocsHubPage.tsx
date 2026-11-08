import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Clock, 
  ArrowRight, 
  TrendingUp, 
  Layers, 
  BarChart3, 
  ShieldCheck, 
  Cpu, 
  Award,
  Coins,
  Compass, 
  CheckCircle2, 
  Sparkles,
  Bookmark,
  Share2,
  Filter,
  GraduationCap
} from 'lucide-react';
import { 
  DOC_MODULES, 
  DocModuleInfo, 
  ArticleMeta
} from '../data/curriculumMeta';
import { useCurriculumManifest } from '../hooks/useCurriculumManifest';

export const DocsHubPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [communityArticles, setCommunityArticles] = useState<any[]>([]);
  const { articles: allArticles } = useCurriculumManifest();

  useEffect(() => {
    fetch('/api/community/articles')
      .then(res => res.json())
      .then(json => {
        if (json.success && Array.isArray(json.data)) {
          setCommunityArticles(json.data);
        }
      })
      .catch(err => console.error('Failed to load community articles', err));
  }, []);

  // Spotlight Featured Article: Mengenal Trading Fundamentals or first article
  const featuredArticle: ArticleMeta | undefined = useMemo(() => {
    return allArticles.find(a => a.slug === 'what-is-trading-fundamentals') || allArticles[0];
  }, [allArticles]);

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coins': return <Coins className="w-4 h-4 text-sky-400" />;
      case 'Award': return <Award className="w-4 h-4 text-orange-500" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4 text-amber-500" />;
      case 'Layers': return <Layers className="w-4 h-4 text-sky-500" />;
      case 'BarChart3': return <BarChart3 className="w-4 h-4 text-purple-500" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 text-rose-500" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-emerald-500" />;
      default: return <BookOpen className="w-4 h-4 text-[#10B981]" />;
    }
  };

  // Filtered list based on search and tab
  const modulesWithFilteredArticles = useMemo(() => {
    return DOC_MODULES.map(module => {
      const moduleArticles = allArticles.filter(a => a.moduleId === module.id);
      const filtered = moduleArticles.filter(article => {
        const matchesSearch = 
          searchQuery.trim() === '' ||
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.slug.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDifficulty = 
          selectedDifficulty === 'all' || 
          article.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

        return matchesSearch && matchesDifficulty;
      });

      return {
        ...module,
        articles: filtered,
        totalInModule: moduleArticles.length
      };
    }).filter(m => selectedModuleId === 'all' || m.id === selectedModuleId);
  }, [allArticles, searchQuery, selectedModuleId, selectedDifficulty]);

  const totalFilteredCount = useMemo(() => {
    return modulesWithFilteredArticles.reduce((acc, m) => acc + m.articles.length, 0);
  }, [modulesWithFilteredArticles]);

  return (
    <div className="flex-1 bg-slate-50 dark:bg-[#08090D] text-slate-900 dark:text-[#E2E8F0] py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-slate-200 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-200">
            <BookOpen className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Pusat Dokumentasi &amp; Modul Belajar</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Dokumentasi &amp; Modul Teknikal
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8] leading-relaxed">
            Kurikulum edukasi modular bergaya publikasi teknikal. Setiap modul dirancang terpisah dan mendalam: Price Action murni, likuiditas institusional SMC, siklus lelang Wyckoff, manajemen risiko asimetris, hingga pemodelan kuantitatif.
          </p>

          <div className="pt-2 flex justify-center">
            <Link
              to="/roadmaps/create"
              className="px-4 py-2 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-black font-mono font-extrabold text-xs border-2 border-black shadow-[3px_3px_0px_#000] inline-flex items-center space-x-2 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>✍️ Buat Kurikulum &amp; Dokumentasi Baru (/roadmaps/create)</span>
            </Link>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white dark:bg-[#121722] border-2 border-slate-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
              <input
                type="text"
                placeholder="Cari artikel, topik, atau konsep teknikal (cth: Order Block, FVG, Candlestick, Wyckoff, Kelly Criterion)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A0D14] border border-slate-300 dark:border-zinc-700 focus:border-black dark:focus:border-white rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 outline-none transition-all"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-slate-50 dark:bg-[#0A0D14] border border-slate-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-700 dark:text-zinc-300 outline-none"
              >
                <option value="all">Semua Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>

              <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 whitespace-nowrap pl-2">
                {totalFilteredCount} Materi
              </span>
            </div>
          </div>

          {/* Module Selector Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-slate-200 dark:border-zinc-800/80">
            <button
              onClick={() => setSelectedModuleId('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all border whitespace-nowrap flex items-center space-x-1.5 ${
                selectedModuleId === 'all'
                  ? 'bg-black text-white dark:bg-white dark:text-black font-bold border-black dark:border-white shadow-xs'
                  : 'bg-slate-100 dark:bg-[#0D1017] text-slate-600 dark:text-[#94A3B8] border-transparent hover:border-slate-300 dark:hover:border-zinc-700'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Semua Modul ({allArticles.length})</span>
            </button>

            {DOC_MODULES.map(mod => {
              const isSelected = selectedModuleId === mod.id;
              const count = allArticles.filter(a => a.moduleId === mod.id).length;
              return (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModuleId(mod.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all border whitespace-nowrap flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-black text-white dark:bg-white dark:text-black font-bold border-black dark:border-white shadow-xs'
                      : 'bg-slate-100 dark:bg-[#0D1017] text-slate-600 dark:text-[#94A3B8] border-transparent hover:border-slate-300 dark:hover:border-zinc-700'
                  }`}
                >
                  {getModuleIcon(mod.iconName)}
                  <span>{mod.shortTitle}</span>
                  <span className="text-[10px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Spotlight Article (Show when no specific search is active and 'all' is selected) */}
        {!searchQuery && selectedModuleId === 'all' && (
          <div className="bg-gradient-to-br from-amber-500/10 via-slate-900/5 to-transparent dark:from-amber-500/15 dark:via-zinc-900/40 dark:to-transparent border-2 border-amber-500/40 dark:border-amber-500/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
            <div className="max-w-3xl space-y-4 relative z-10">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-black font-extrabold uppercase">
                  Featured Guide
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 font-bold">
                  Modul 01: Price Action
                </span>
                <span className="text-slate-500 dark:text-zinc-400 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{featuredArticle.readingTime} Menit Baca</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-snug">
                {featuredArticle.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-700 dark:text-[#CBD5E1] leading-relaxed line-clamp-3">
                {featuredArticle.summary}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to={`/docs/${featuredArticle.slug}`}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-xs hover:opacity-90 transition-all shadow-sm"
                >
                  <span>Mulai Baca Panduan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/roadmaps/price-action-market-structure"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-500" />
                  <span>Buka Peta Visual Jalur Ini</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Modules Content Stream (Grouped per Module like a Publication / Blog Hub) */}
        <div className="space-y-16">
          {/* Community Published Documentation Articles Section */}
          {communityArticles.length > 0 && selectedModuleId === 'all' && (
            <section className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b-2 border-slate-200 dark:border-zinc-800">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded font-extrabold uppercase bg-[#FACC15] text-black border border-black">
                      Community Docs
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                      {communityArticles.length} Artikel Modul Komunitas
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    Dokumentasi Kurikulum Komunitas
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-[#94A3B8]">
                    Dokumentasi lengkap yang disusun oleh kreator dan mentor melalui Studio Pembuat Roadmap.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communityArticles
                  .filter(a => !searchQuery.trim() || a.title?.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((art, idx) => {
                    let parsedPayload: any = {};
                    try {
                      if (art.illustration_payload) parsedPayload = JSON.parse(art.illustration_payload);
                    } catch {
                      // ignore
                    }
                    const sectionsCount = parsedPayload.docConfig?.sections?.length || 1;
                    const readMins = parsedPayload.docConfig?.readingTimeMinutes || 8;
                    const summaryText =
                      parsedPayload.docConfig?.summary ||
                      (art.content_markdown ? art.content_markdown.replace(/[#*`]/g, '').slice(0, 140) : '');

                    return (
                      <article
                        key={art.id || art.slug}
                        className="group bg-white dark:bg-[#121722] border-2 border-slate-200 dark:border-zinc-800/90 rounded-2xl p-5 flex flex-col justify-between hover:border-black dark:hover:border-zinc-400 transition-all duration-150 shadow-xs hover:-translate-y-1"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                              #{String(idx + 1).padStart(2, '0')} • {parsedPayload.roadmapTitle || 'Komunitas'}
                            </span>
                            <span className="text-slate-400 dark:text-zinc-500 flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{readMins}m</span>
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-[#10B981] transition-colors leading-snug line-clamp-2">
                            {art.title}
                          </h3>

                          <p className="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed line-clamp-3">
                            {summaryText}
                          </p>
                        </div>

                        <div className="pt-4 mt-5 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between">
                          <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-500">
                            {sectionsCount} Bab • Oleh {art.author_name || 'Mentor'}
                          </span>

                          <Link
                            to={`/docs/${art.slug}`}
                            className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-[#10B981] transition-colors"
                          >
                            <span>Baca Dokumentasi</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </article>
                    );
                  })}
              </div>
            </section>
          )}

          {modulesWithFilteredArticles.map(module => {
            if (module.articles.length === 0) return null;

            return (
              <section key={module.id} className="space-y-6">
                
                {/* Module Section Banner */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b-2 border-slate-200 dark:border-zinc-800">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-1.5 rounded-lg bg-slate-200 dark:bg-zinc-800">
                        {getModuleIcon(module.iconName)}
                      </div>
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-extrabold uppercase ${module.badgeBg} ${module.badgeText}`}>
                        {module.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                        {module.articles.length} Materi Terstruktur
                      </span>
                    </div>

                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      {module.title}
                    </h2>

                    <p className="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                      {module.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 flex-shrink-0">
                    <Link
                      to={`/roadmaps/${module.roadmapSlug}`}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#121722] dark:hover:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-xs font-mono font-medium text-slate-700 dark:text-zinc-300 transition-colors"
                    >
                      <Compass className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Lihat Alur Visual Roadmap</span>
                    </Link>
                  </div>
                </div>

                {/* Article Cards Grid for this Module */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {module.articles.map((article, idx) => {
                    const orderNum = String(idx + 1).padStart(2, '0');

                    return (
                      <article
                        key={article.id}
                        className="group bg-white dark:bg-[#121722] border-2 border-slate-200 dark:border-zinc-800/90 rounded-2xl p-5 flex flex-col justify-between hover:border-black dark:hover:border-zinc-400 transition-all duration-150 shadow-xs hover:-translate-y-1"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="font-extrabold text-slate-400 dark:text-zinc-500">
                              #{orderNum}
                            </span>
                            
                            <div className="flex items-center space-x-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                                {article.difficulty}
                              </span>
                              <span className="text-slate-400 dark:text-zinc-500 flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{article.readingTime}m</span>
                              </span>
                            </div>
                          </div>

                          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-[#10B981] transition-colors leading-snug line-clamp-2">
                            {article.title}
                          </h3>

                          <p className="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed line-clamp-3">
                            {article.summary}
                          </p>
                        </div>

                        <div className="pt-4 mt-5 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between">
                          <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-500">
                            {article.tableOfContents?.length || 4} Bagian
                          </span>

                          <Link
                            to={`/docs/${article.slug}`}
                            className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-[#10B981] transition-colors"
                          >
                            <span>Baca Materi</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>

              </section>
            );
          })}

          {totalFilteredCount === 0 && (
            <div className="py-20 text-center space-y-3">
              <BookOpen className="w-10 h-10 mx-auto text-slate-400 dark:text-zinc-600" />
              <h3 className="text-base font-bold text-slate-800 dark:text-zinc-200">
                Tidak ada materi yang sesuai dengan pencarian "{searchQuery}"
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Coba gunakan kata kunci lain seperti "Order Block", "FVG", "Candlestick", atau reset filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedModuleId('all');
                  setSelectedDifficulty('all');
                }}
                className="mt-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded-lg"
              >
                Reset Semua Filter
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
