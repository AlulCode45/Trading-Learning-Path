import React, { useState, useMemo } from 'react';
import { Roadmap } from '../types';
import { getAllArticles } from '../data/articles';
import { 
  Search, 
  Map, 
  BookOpen, 
  ArrowRight, 
  Clock, 
  Layers, 
  Compass, 
  CheckCircle2, 
  Users, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileText,
  Shield,
  Code2
} from 'lucide-react';

interface HomeDiscoveryProps {
  roadmaps: Roadmap[];
  onSelectRoadmap: (slug: string) => void;
  onNavigateToRoadmap: () => void;
  onNavigateToDocs: (articleSlug: string) => void;
  onNavigateToPlayground: () => void;
  onOpenContributorModal: () => void;
}

type TabCategory = 'all' | 'role' | 'skill' | 'guides';

export const HomeDiscovery: React.FC<HomeDiscoveryProps> = ({
  roadmaps,
  onSelectRoadmap,
  onNavigateToRoadmap,
  onNavigateToDocs,
  onNavigateToPlayground,
  onOpenContributorModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabCategory>('all');
  const allArticles = useMemo(() => getAllArticles(), []);

  // Categorize roadmaps into Role-based vs Skill-based (like roadmap.sh)
  const roleRoadmaps = useMemo(() => {
    return roadmaps.filter(rm => 
      ['price-action-market-structure', 'smart-money-concepts-ict', 'wyckoff-method-vsa', 'quantitative-algo-trading'].includes(rm.slug)
    );
  }, [roadmaps]);

  const skillRoadmaps = useMemo(() => {
    return [
      {
        slug: 'candlestick-anatomy-wick-dynamics',
        title: 'Anatomi Candlestick & Lelang',
        category: 'Price Action',
        difficulty: 'Fondasi',
        duration: '8 min baca',
        topics: 6
      },
      {
        slug: 'support-resistance-liquidity',
        title: 'Support, Resistance & Kolam Likuiditas',
        category: 'Market Dynamics',
        difficulty: 'Fondasi',
        duration: '10 min baca',
        topics: 6
      },
      {
        slug: 'market-structure-bos-choch',
        title: 'Struktur Tren: BOS vs. CHoCH',
        category: 'Market Structure',
        difficulty: 'Menengah',
        duration: '12 min baca',
        topics: 6
      },
      {
        slug: 'fair-value-gaps-imbalance',
        title: 'Fair Value Gaps & Imbalance Harga',
        category: 'Institusi',
        difficulty: 'Menengah',
        duration: '10 min baca',
        topics: 5
      },
      {
        slug: 'supply-demand-order-blocks',
        title: 'Order Blocks & Mitigasi Penawaran',
        category: 'Institusi',
        difficulty: 'Lanjutan',
        duration: '12 min baca',
        topics: 5
      },
      {
        slug: 'risk-management-1percent-rule',
        title: 'Matematika Risiko 1% & R:R Asimetris',
        category: 'Proteksi Modal',
        difficulty: 'Wajib',
        duration: '14 min baca',
        topics: 6
      }
    ];
  }, []);

  // Filter based on search query
  const filteredRoleRoadmaps = useMemo(() => {
    if (!searchQuery.trim()) return roleRoadmaps;
    return roleRoadmaps.filter(rm => 
      rm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rm.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rm.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [roleRoadmaps, searchQuery]);

  const filteredSkillRoadmaps = useMemo(() => {
    if (!searchQuery.trim()) return skillRoadmaps;
    return skillRoadmaps.filter(sm => 
      sm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sm.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [skillRoadmaps, searchQuery]);

  const filteredGuides = useMemo(() => {
    if (!searchQuery.trim()) return allArticles;
    return allArticles.filter(art => 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allArticles, searchQuery]);

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-[#0A0D14] text-slate-900 dark:text-[#E2E8F0] transition-colors duration-200 font-sans">
      {/* 1. HERO SECTION (Clean, Authentic, roadmap.sh Style) */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-[#1E293B]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white leading-tight mb-4">
            Peta Jalan Belajar Trading
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Trading Learning Path adalah inisiatif kurikulum terbuka berisi peta jalan visual, panduan teknis, dan dokumentasi mendalam untuk membantu siapa saja belajar trading secara terstruktur tanpa spekulasi buta.
          </p>

          {/* Clean Search Bar (like roadmap.sh) */}
          <div className="max-w-xl mx-auto relative mb-6">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari roadmap, konsep, atau topik (cth: Order Blocks, BOS, Candlestick)..."
                className="w-full pl-11 pr-16 py-3 rounded-xl bg-slate-50 dark:bg-[#111622] border border-slate-300 dark:border-[#222B3D] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-slate-500 dark:focus:border-slate-400 transition-colors shadow-sm"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-white font-mono"
                >
                  Clear
                </button>
              ) : (
                <span className="absolute right-4 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hidden sm:inline">
                  ⌘K
                </span>
              )}
            </div>
          </div>

          {/* Clean Category Navigation Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'Semua Konten' },
              { id: 'role', label: 'Role-based Roadmaps' },
              { id: 'skill', label: 'Skill-based Roadmaps' },
              { id: 'guides', label: 'Panduan & Dokumentasi' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabCategory)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                    : 'bg-slate-100 dark:bg-[#131926] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#1E293B]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. MAIN DIRECTORY CONTENT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 w-full">
        {/* A. ROLE-BASED ROADMAPS (Alur Karir / Metodologi Penuh) */}
        {(activeTab === 'all' || activeTab === 'role') && (
          <section>
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200 dark:border-[#1E293B]">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center space-x-2">
                  <Map className="w-5 h-5 text-[#10B981]" />
                  <span>Role-based Roadmaps</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Kurikulum terintegrasi dari tingkat pemula hingga mandiri untuk metodologi trading spesifik.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {filteredRoleRoadmaps.length} Peta Jalan
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRoleRoadmaps.map((rm) => (
                <div
                  key={rm.id}
                  onClick={() => {
                    onSelectRoadmap(rm.slug);
                    onNavigateToRoadmap();
                  }}
                  className="p-5 rounded-xl bg-white dark:bg-[#10141E] border border-slate-200 dark:border-[#1E293B] hover:border-slate-400 dark:hover:border-slate-500 transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-[#161D2C] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#222B3D] font-medium">
                        {rm.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                        {rm.difficulty}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#10B981] transition-colors leading-snug mb-2">
                      {rm.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4">
                      {rm.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-[#1A2232] flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span className="flex items-center space-x-1.5">
                      <Layers className="w-3.5 h-3.5 text-slate-400" />
                      <span>{rm.nodes_count} Topik</span>
                    </span>
                    <span className="flex items-center space-x-1 font-semibold text-slate-900 dark:text-white group-hover:text-[#10B981] transition-colors">
                      <span>Buka Peta</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* B. SKILL-BASED ROADMAPS (Topik & Modul Mandiri) */}
        {(activeTab === 'all' || activeTab === 'skill') && (
          <section>
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200 dark:border-[#1E293B]">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center space-x-2">
                  <Compass className="w-5 h-5 text-[#38BDF8]" />
                  <span>Skill-based Roadmaps</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Panduan simpul keterampilan mandiri untuk memperkuat pilar analisis pasar Anda.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {filteredSkillRoadmaps.length} Keterampilan
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSkillRoadmaps.map((sm) => (
                <div
                  key={sm.slug}
                  onClick={() => onNavigateToDocs(sm.slug)}
                  className="p-4 rounded-xl bg-white dark:bg-[#10141E] border border-slate-200 dark:border-[#1E293B] hover:border-slate-400 dark:hover:border-slate-500 transition-all cursor-pointer flex items-center justify-between group shadow-xs hover:shadow-md"
                >
                  <div className="pr-3">
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-1">
                      {sm.category} • {sm.duration}
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#38BDF8] transition-colors leading-snug">
                      {sm.title}
                    </h3>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#38BDF8] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* C. PANDUAN & DOKUMENTASI LENGKAP (Guides & Best Practices) */}
        {(activeTab === 'all' || activeTab === 'guides') && (
          <section>
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200 dark:border-[#1E293B]">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-[#F59E0B]" />
                  <span>Dokumentasi Teknis &amp; Artikel Panduan</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Materi bacaan komprehensif berstandar buku teks: teori lelang, studi kasus, dan mitigasi risiko.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {filteredGuides.length} Artikel
              </span>
            </div>

            <div className="space-y-3">
              {filteredGuides.map((guide) => (
                <div
                  key={guide.slug}
                  onClick={() => onNavigateToDocs(guide.slug)}
                  className="p-4 rounded-xl bg-white dark:bg-[#10141E] border border-slate-200 dark:border-[#1E293B] hover:border-slate-400 dark:hover:border-slate-500 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group shadow-xs hover:shadow-md"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      <span className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-[#161D2C] text-slate-700 dark:text-slate-300">
                        {guide.category}
                      </span>
                      <span>•</span>
                      <span>Level {guide.level}</span>
                      <span>•</span>
                      <span>~{guide.readingTimeMinutes} min baca</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#10B981] transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                      {guide.summary}
                    </p>
                  </div>

                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white flex items-center space-x-1 flex-shrink-0 self-start sm:self-center">
                    <span>Baca Panduan</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* D. COMMUNITY CONTRIBUTION CALLOUT (Clean, Open Source Ethos) */}
        <section className="p-8 rounded-2xl bg-slate-50 dark:bg-[#10141E] border border-slate-200 dark:border-[#1E293B] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-slate-900 dark:text-white">
              <Users className="w-4 h-4 text-[#10B981]" />
              <span>Inisiatif Berbasis Komunitas Terbuka</span>
            </div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">
              Ingin berkontribusi membuat atau menyempurnakan roadmap?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Seluruh materi Trading Learning Path bersifat terbuka. Trader, analis institusional, dan pendidik finansial dapat mendaftarkan diri sebagai kontributor untuk menerbitkan kurikulum mereka sendiri.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <button
              onClick={onOpenContributorModal}
              className="px-4 py-2.5 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-black font-semibold text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xs"
            >
              Daftar Jadi Kontributor
            </button>
            <button
              onClick={onNavigateToPlayground}
              className="px-4 py-2.5 rounded-lg bg-white dark:bg-[#161D2C] border border-slate-200 dark:border-[#222B3D] text-slate-700 dark:text-slate-200 font-medium text-xs hover:border-slate-400 transition-colors"
            >
              Buka Simulator Pasar
            </button>
          </div>
        </section>
      </div>

      {/* 3. FOOTER (Minimalist roadmap.sh Style) */}
      <footer className="border-t border-slate-200 dark:border-[#1E293B] py-8 px-4 text-center text-xs font-mono text-slate-500 dark:text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">Trading Learning Path</span>
            <span>•</span>
            <span>Edukasi Pasar Finansial Terbuka</span>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => onSelectRoadmap('price-action-market-structure')} className="hover:underline">
              Price Action
            </button>
            <button onClick={onNavigateToPlayground} className="hover:underline">
              Simulator
            </button>
            <button onClick={onOpenContributorModal} className="hover:underline">
              Kontributor
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
