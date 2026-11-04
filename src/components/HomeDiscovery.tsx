import React, { useState, useMemo } from 'react';
import { Roadmap } from '../types';
import { getAllArticles } from '../data/articles';
import { SpotlightCard } from './reactbits/SpotlightCard';
import { BorderBeam } from './reactbits/BorderBeam';
import { DecryptedText } from './reactbits/DecryptedText';
import { MagnetButton } from './reactbits/MagnetButton';
import { InteractiveChartBite } from './reactbits/InteractiveChartBite';
import { 
  Search, 
  Map, 
  BookOpen, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Compass, 
  Activity, 
  Layers, 
  Sparkles, 
  Terminal, 
  CheckCircle2, 
  Clock, 
  BookMarked, 
  Users, 
  ExternalLink,
  ChevronRight,
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

export const HomeDiscovery: React.FC<HomeDiscoveryProps> = ({
  roadmaps,
  onSelectRoadmap,
  onNavigateToRoadmap,
  onNavigateToDocs,
  onNavigateToPlayground,
  onOpenContributorModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const allArticles = useMemo(() => getAllArticles(), []);

  // Filter roadmaps and articles based on search query
  const filteredRoadmaps = useMemo(() => {
    return roadmaps.filter(rm => {
      const matchSearch = rm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rm.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rm.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === 'all' || rm.category.toLowerCase().includes(selectedCategory.toLowerCase());
      return matchSearch && matchCat;
    });
  }, [roadmaps, searchQuery, selectedCategory]);

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return allArticles.slice(0, 8);
    return allArticles.filter(art => 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allArticles, searchQuery]);

  return (
    <div className="flex-1 flex flex-col bg-[#08090D] not-dark:bg-[#F8FAFC] text-[#F8FAFC] not-dark:text-[#0F172A] transition-colors">
      {/* 1. HERO SECTION: Roadmap Discovery */}
      <section className="relative overflow-hidden border-b border-[#1D2532] not-dark:border-slate-200 py-16 sm:py-24">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <DecryptedText
              text="ATLAS PENGETAHUAN FINANSIAL & TRADING TERBUKA"
              speed={35}
              className="text-[#10B981] font-semibold text-[11px] tracking-wider"
            />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F8FAFC] not-dark:text-slate-900 leading-[1.15] mb-6">
            Peta Jalan Terstruktur Menuju <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-[#38BDF8] to-[#60A5FA]">
              Pemahaman Pasar Finansial
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#929BAA] not-dark:text-slate-600 leading-relaxed mb-8 font-light">
            Jelajahi roadmap interaktif, pelajari konsep struktural tanpa spekulasi buta, dan baca dokumentasi teknis mendalam — satu topik demi satu topik.
          </p>

          {/* Search Bar Input */}
          <div className="max-w-xl mx-auto relative mb-8">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-[#64748B] absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari konsep (cth: Order Blocks, BOS, Candlestick, Risk 1%)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#0D1017] not-dark:bg-white border border-[#1D2532] not-dark:border-slate-300 text-sm focus:outline-none focus:border-[#10B981] shadow-xl text-[#F8FAFC] not-dark:text-black placeholder:text-[#64748B] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-mono text-[#64748B] hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Quick Action CTAs with React Bits MagnetButton */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <MagnetButton
              onClick={() => {
                onSelectRoadmap('price-action-market-structure');
                onNavigateToRoadmap();
              }}
              strength={14}
              className="px-6 py-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-[#08090D] font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:scale-[1.02]"
            >
              <Map className="w-4 h-4" />
              <span>Buka Peta Jalan Price Action</span>
              <ArrowRight className="w-4 h-4" />
            </MagnetButton>

            <MagnetButton
              onClick={() => onNavigateToDocs('candlestick-anatomy-wick-dynamics')}
              strength={10}
              className="px-5 py-3 rounded-xl bg-[#121722] not-dark:bg-white hover:bg-[#1D2532] not-dark:hover:bg-slate-100 text-[#CBD5E1] not-dark:text-slate-700 border border-[#1D2532] not-dark:border-slate-300 font-medium text-xs sm:text-sm flex items-center space-x-2 transition-all"
            >
              <BookOpen className="w-4 h-4 text-[#38BDF8]" />
              <span>Baca Dokumentasi Lengkap</span>
            </MagnetButton>

            <MagnetButton
              onClick={onNavigateToPlayground}
              strength={10}
              className="px-5 py-3 rounded-xl bg-[#121722] not-dark:bg-white hover:bg-[#1D2532] not-dark:hover:bg-slate-100 text-[#CBD5E1] not-dark:text-slate-700 border border-[#1D2532] not-dark:border-slate-300 font-medium text-xs sm:text-sm flex items-center space-x-2 transition-all"
            >
              <Terminal className="w-4 h-4 text-[#F59E0B]" />
              <span>Kalkulator &amp; Simulator</span>
            </MagnetButton>
          </div>
        </div>
      </section>

      {/* 2. VISUAL ROADMAP GRAPH PREVIEW: Immediate Knowledge Graph on Homepage */}
      <section className="py-12 border-b border-[#1D2532] not-dark:border-slate-200 bg-[#090C13] not-dark:bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#10B981] font-semibold">
                <Compass className="w-3.5 h-3.5" />
                <span>Simulasi Alur Belajar Terhubung</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] not-dark:text-slate-900 mt-1">
                Grafik Jalur Price Action &amp; Market Structure
              </h2>
            </div>

            <button
              onClick={() => {
                onSelectRoadmap('price-action-market-structure');
                onNavigateToRoadmap();
              }}
              className="px-4 py-2 rounded-lg bg-[#121722] not-dark:bg-white border border-[#1D2532] not-dark:border-slate-300 text-xs font-mono text-[#10B981] hover:border-[#10B981] flex items-center space-x-1.5 transition-colors self-start sm:self-auto"
            >
              <span>Eksplorasi Kanvas Interaktif Penuh</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive DAG Preview Canvas Box with React Bits BorderBeam */}
          <div className="p-6 rounded-2xl bg-[#0D1017] not-dark:bg-white border border-[#1D2532] not-dark:border-slate-200 shadow-xl relative overflow-hidden">
            <BorderBeam size={300} duration={12} colorFrom="#10B981" colorTo="#38BDF8" borderWidth={1.5} />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Level 1: Foundations */}
              <div className="space-y-3">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#929BAA] pb-2 border-b border-[#1D2532]">
                  Lapis 1: Fondasi Harga
                </div>
                <div 
                  onClick={() => onNavigateToDocs('candlestick-anatomy-wick-dynamics')}
                  className="p-3.5 rounded-xl bg-[#121722] not-dark:bg-slate-50 border border-[#10B981]/50 hover:border-[#10B981] cursor-pointer transition-all hover:translate-y-[-2px] group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">01</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#F8FAFC] not-dark:text-slate-900 group-hover:text-[#10B981]">
                    Anatomi Candlestick &amp; Wick
                  </h4>
                  <p className="text-[11px] text-[#929BAA] mt-1 line-clamp-2">
                    Lelang harga dua arah &amp; validasi harga penutupan.
                  </p>
                </div>

                <div 
                  onClick={() => onNavigateToDocs('support-resistance-liquidity')}
                  className="p-3.5 rounded-xl bg-[#121722] not-dark:bg-slate-50 border border-[#1D2532] hover:border-[#38BDF8] cursor-pointer transition-all hover:translate-y-[-2px] group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#38BDF8]/20 text-[#38BDF8]">02</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#F8FAFC] not-dark:text-slate-900 group-hover:text-[#38BDF8]">
                    Support &amp; Kolam Likuiditas
                  </h4>
                  <p className="text-[11px] text-[#929BAA] mt-1 line-clamp-2">
                    Mengapa garis horizontal konvensional menjadi jebakan.
                  </p>
                </div>
              </div>

              {/* Level 2: Market Structure */}
              <div className="space-y-3">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#929BAA] pb-2 border-b border-[#1D2532]">
                  Lapis 2: Struktur Pasar
                </div>
                <div 
                  onClick={() => onNavigateToDocs('market-structure-bos-choch')}
                  className="p-3.5 rounded-xl bg-[#121722] not-dark:bg-slate-50 border border-[#38BDF8]/50 hover:border-[#38BDF8] cursor-pointer transition-all hover:translate-y-[-2px] group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#38BDF8]/20 text-[#38BDF8]">04</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#F8FAFC] not-dark:text-slate-900 group-hover:text-[#38BDF8]">
                    BOS vs. CHoCH
                  </h4>
                  <p className="text-[11px] text-[#929BAA] mt-1 line-clamp-2">
                    Kelanjutan tren vs sinyal transisi pembalikan struktural.
                  </p>
                </div>

                <div 
                  onClick={() => onNavigateToDocs('multi-timeframe-fractality')}
                  className="p-3.5 rounded-xl bg-[#121722] not-dark:bg-slate-50 border border-[#1D2532] hover:border-[#38BDF8] cursor-pointer transition-all hover:translate-y-[-2px] group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#38BDF8]/20 text-[#38BDF8]">05</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#F8FAFC] not-dark:text-slate-900 group-hover:text-[#38BDF8]">
                    Fraktalitas Multi-Timeframe
                  </h4>
                  <p className="text-[11px] text-[#929BAA] mt-1 line-clamp-2">
                    Penyelarasan Top-Down: HTF Bias ke LTF Execution.
                  </p>
                </div>
              </div>

              {/* Level 3: Institutional Inefficiencies */}
              <div className="space-y-3">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#929BAA] pb-2 border-b border-[#1D2532]">
                  Lapis 3: Jejak Institusi
                </div>
                <div 
                  onClick={() => onNavigateToDocs('fair-value-gaps-imbalance')}
                  className="p-3.5 rounded-xl bg-[#121722] not-dark:bg-slate-50 border border-[#1D2532] hover:border-[#F59E0B] cursor-pointer transition-all hover:translate-y-[-2px] group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#F59E0B]/20 text-[#F59E0B]">07</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#F8FAFC] not-dark:text-slate-900 group-hover:text-[#F59E0B]">
                    Fair Value Gaps (FVG)
                  </h4>
                  <p className="text-[11px] text-[#929BAA] mt-1 line-clamp-2">
                    Imbalance harga 3 lilin dan algoritma pengiriman harga.
                  </p>
                </div>

                <div 
                  onClick={() => onNavigateToDocs('supply-demand-order-blocks')}
                  className="p-3.5 rounded-xl bg-[#121722] not-dark:bg-slate-50 border border-[#1D2532] hover:border-[#F59E0B] cursor-pointer transition-all hover:translate-y-[-2px] group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#F59E0B]/20 text-[#F59E0B]">08</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#F8FAFC] not-dark:text-slate-900 group-hover:text-[#F59E0B]">
                    Order Blocks &amp; Mitigasi
                  </h4>
                  <p className="text-[11px] text-[#929BAA] mt-1 line-clamp-2">
                    Lilin displacement terakhir sebelum lonjakan volume.
                  </p>
                </div>
              </div>

              {/* Level 4: Risk & Psychology */}
              <div className="space-y-3">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#929BAA] pb-2 border-b border-[#1D2532]">
                  Lapis 4: Matematika Bertahan
                </div>
                <div 
                  onClick={() => onNavigateToDocs('risk-management-1percent-rule')}
                  className="p-3.5 rounded-xl bg-[#121722] not-dark:bg-slate-50 border border-[#10B981]/50 hover:border-[#10B981] cursor-pointer transition-all hover:translate-y-[-2px] group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">10</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#F8FAFC] not-dark:text-slate-900 group-hover:text-[#10B981]">
                    Aturan Risiko 1% &amp; R:R Asimetris
                  </h4>
                  <p className="text-[11px] text-[#929BAA] mt-1 line-clamp-2">
                    Matematika drawdown eksponensial dan ukuran lot presisi.
                  </p>
                </div>

                <div 
                  onClick={() => onNavigateToDocs('trading-psychology-tilt')}
                  className="p-3.5 rounded-xl bg-[#121722] not-dark:bg-slate-50 border border-[#1D2532] hover:border-[#10B981] cursor-pointer transition-all hover:translate-y-[-2px] group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">11</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#F8FAFC] not-dark:text-slate-900 group-hover:text-[#10B981]">
                    Psikologi Trading &amp; Tilt
                  </h4>
                  <p className="text-[11px] text-[#929BAA] mt-1 line-clamp-2">
                    Mengendalikan loss aversion dan amigdala hijack.
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded React Bits: Interactive Candlestick & Auction Scrubber */}
            <div className="mt-6 pt-6 border-t border-[#1D2532] not-dark:border-slate-100">
              <InteractiveChartBite />
            </div>
          </div>
        </div>
      </section>

      {/* 3. ROADMAP DIRECTORY SECTION: Role & Skill Based Paths */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono uppercase text-[#38BDF8] font-semibold">
              Katalog Kurikulum
            </span>
            <h2 className="text-2xl font-bold text-[#F8FAFC] not-dark:text-slate-900 mt-1">
              Daftar Peta Jalan (Roadmaps)
            </h2>
            <p className="text-xs text-[#929BAA] mt-1">
              Pilih metodologi belajar sesuai pendekatan analitikal Anda.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-2 sm:pb-0">
            {['all', 'Technical Analysis', 'Institutional', 'Classical', 'Quantitative'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-mono capitalize transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#10B981] text-black font-semibold'
                    : 'bg-[#121722] not-dark:bg-slate-100 text-[#929BAA] hover:text-white not-dark:hover:text-black border border-[#1D2532] not-dark:border-slate-300'
                }`}
              >
                {cat === 'all' ? 'Semua Kategori' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Roadmap Cards Grid with React Bits SpotlightCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoadmaps.map((rm) => (
            <SpotlightCard
              key={rm.id}
              spotlightColor="rgba(16, 185, 129, 0.18)"
              className="p-6 flex flex-col justify-between group shadow-sm hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] font-semibold border border-[#10B981]/30">
                    {rm.category}
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B]">
                    {rm.difficulty}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#F8FAFC] not-dark:text-slate-900 group-hover:text-[#10B981] transition-colors leading-snug mb-2">
                  {rm.title}
                </h3>

                <p className="text-xs text-[#929BAA] not-dark:text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {rm.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1D2532] not-dark:border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3 text-[11px] font-mono text-[#64748B]">
                  <span className="flex items-center space-x-1">
                    <Layers className="w-3 h-3 text-[#38BDF8]" />
                    <span>{rm.nodes_count} Topik</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-[#F59E0B]" />
                    <span>~{rm.estimated_hours} Jam</span>
                  </span>
                </div>

                <button
                  onClick={() => {
                    onSelectRoadmap(rm.slug);
                    onNavigateToRoadmap();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#121722] not-dark:bg-slate-100 hover:bg-[#10B981] hover:text-black text-xs font-mono font-medium text-[#10B981] border border-[#1D2532] hover:border-[#10B981] flex items-center space-x-1 transition-all"
                >
                  <span>Buka Peta</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 4. KNOWLEDGE BASE ARTICLES DIRECTORY */}
      <section className="py-16 border-t border-[#1D2532] not-dark:border-slate-200 bg-[#090C13] not-dark:bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase text-[#F59E0B] font-semibold">
                Basis Pengetahuan Teknis
              </span>
              <h2 className="text-2xl font-bold text-[#F8FAFC] not-dark:text-slate-900 mt-1">
                Dokumentasi &amp; Modul Referensi Lengkap
              </h2>
              <p className="text-xs text-[#929BAA] mt-1">
                Artikel edukasi komprehensif tanpa jargon klise. 100% terbuka tanpa registrasi.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredArticles.map(art => (
              <SpotlightCard
                key={art.slug}
                onClick={() => onNavigateToDocs(art.slug)}
                spotlightColor="rgba(56, 189, 248, 0.16)"
                className="p-4 hover:border-[#10B981] cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B] mb-2">
                    <span className="text-[#10B981]">{art.category}</span>
                    <span>~{art.readingTimeMinutes}m</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#F8FAFC] not-dark:text-slate-900 group-hover:text-[#10B981] transition-colors leading-snug mb-2">
                    {art.title}
                  </h4>
                  <p className="text-[11px] text-[#929BAA] not-dark:text-slate-600 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-[#1D2532]/60 not-dark:border-slate-100 flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                  <span>Level {art.level}</span>
                  <span className="text-[#10B981] group-hover:underline flex items-center space-x-1">
                    <span>Baca Panduan</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CURATED AUTHORITATIVE RESOURCES */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-[#1D2532] not-dark:border-slate-200">
        <div className="mb-8">
          <span className="text-xs font-mono uppercase text-[#38BDF8] font-semibold">
            Literatur &amp; Validasi Institusional
          </span>
          <h2 className="text-2xl font-bold text-[#F8FAFC] not-dark:text-slate-900 mt-1">
            Bahan Bacaan &amp; Sumber Rujukan Terverifikasi
          </h2>
          <p className="text-xs text-[#929BAA] mt-1">
            Literatur akademik, buku pegangan trader legendaris, dan repositori pengawasan bursa resmi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-[#0D1017] not-dark:bg-white border border-[#1D2532] not-dark:border-slate-200">
            <BookMarked className="w-5 h-5 text-[#10B981] mb-3" />
            <h4 className="text-sm font-bold text-[#F8FAFC] not-dark:text-slate-900 mb-1">
              Buku Referensi Klasik
            </h4>
            <p className="text-xs text-[#929BAA] mb-3 leading-relaxed">
              Buku teks penting mengenai Auction Market Theory, Dow Theory, dan psikologi probabilistik.
            </p>
            <ul className="text-xs font-mono space-y-1.5 text-[#CBD5E1] not-dark:text-slate-700">
              <li>• Mind Over Markets (Dalton)</li>
              <li>• Trading in the Zone (Douglas)</li>
              <li>• Reminiscences of a Stock Operator</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-[#0D1017] not-dark:bg-white border border-[#1D2532] not-dark:border-slate-200">
            <Activity className="w-5 h-5 text-[#38BDF8] mb-3" />
            <h4 className="text-sm font-bold text-[#F8FAFC] not-dark:text-slate-900 mb-1">
              Dokumen Regulasi &amp; Bursa
            </h4>
            <p className="text-xs text-[#929BAA] mb-3 leading-relaxed">
              Data publik untuk memverifikasi transparansi pasar dan likuiditas institusional.
            </p>
            <ul className="text-xs font-mono space-y-1.5 text-[#CBD5E1] not-dark:text-slate-700">
              <li>• SEC EDGAR Company Filings</li>
              <li>• CFTC Commitments of Traders (COT)</li>
              <li>• BIS Triennial Central Bank Survey</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-[#0D1017] not-dark:bg-white border border-[#1D2532] not-dark:border-slate-200">
            <Code2 className="w-5 h-5 text-[#F59E0B] mb-3" />
            <h4 className="text-sm font-bold text-[#F8FAFC] not-dark:text-slate-900 mb-1">
              Alat Verifikasi &amp; Simulator
            </h4>
            <p className="text-xs text-[#929BAA] mb-3 leading-relaxed">
              Kalkulator matematis terintegrasi untuk menguji pemahaman Anda secara langsung.
            </p>
            <button
              onClick={onNavigateToPlayground}
              className="text-xs font-mono text-[#10B981] hover:underline flex items-center space-x-1 mt-2"
            >
              <span>Buka Playground Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. COMMUNITY & CONTRIBUTOR CALLOUT */}
      <section className="py-16 border-t border-[#1D2532] not-dark:border-slate-200 bg-[#0D1017] not-dark:bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#121722] not-dark:bg-white border border-[#1D2532] not-dark:border-slate-300 flex items-center justify-center mx-auto mb-4 text-[#10B981] shadow-lg">
            <Users className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] not-dark:text-slate-900 mb-3">
            Berkontribusi Memperluas Basis Pengetahuan Terbuka
          </h2>

          <p className="text-xs sm:text-sm text-[#929BAA] not-dark:text-slate-600 max-w-xl mx-auto leading-relaxed mb-6 font-light">
            Trading Learning Path dibangun dengan prinsip keterbukaan seperti roadmap.sh. Trader berpengalaman, analis kuantitatif, dan pendidik finansial dipersilakan mendaftarkan diri sebagai kontributor untuk mengusulkan simpul kurikulum baru.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenContributorModal}
              className="px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-black font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-md"
            >
              <Users className="w-4 h-4" />
              <span>Portal Kontributor Kurikulum</span>
            </button>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#121722] not-dark:bg-white text-[#929BAA] hover:text-white not-dark:hover:text-black border border-[#1D2532] not-dark:border-slate-300 font-medium text-xs sm:text-sm flex items-center space-x-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Dokumentasi GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* Minimal Editorial Footer */}
      <footer className="py-8 border-t border-[#1D2532] not-dark:border-slate-200 text-center text-xs font-mono text-[#64748B]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            Trading Learning Path • Open Financial Knowledge Atlas
          </div>
          <div className="flex items-center space-x-4">
            <span>Non-komersial</span>
            <span>Edukasi Murni</span>
            <span>Bukan Saran Finansial</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
