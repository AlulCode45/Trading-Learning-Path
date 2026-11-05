import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Roadmap, CommunityRoadmap } from '../types';
import { 
  Compass, 
  Search, 
  Layers, 
  Clock, 
  BookOpen, 
  ArrowRight, 
  PlusCircle, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert, 
  TrendingUp, 
  Cpu, 
  Users,
  Award,
  GitFork
} from 'lucide-react';

interface RoadmapsDirectoryPageProps {
  onOpenCreateModal?: () => void;
  onForkRoadmap?: (roadmap: any) => void;
}

export const RoadmapsDirectoryPage: React.FC<RoadmapsDirectoryPageProps> = ({
  onOpenCreateModal,
  onForkRoadmap
}) => {
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [communityRoadmaps, setCommunityRoadmaps] = useState<CommunityRoadmap[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    Promise.all([
      fetch('/api/roadmaps').then(res => res.json()),
      fetch('/api/community').then(res => res.json())
    ])
      .then(([officialJson, communityJson]) => {
        if (officialJson.success) setRoadmaps(officialJson.data);
        if (communityJson.success) setCommunityRoadmaps(communityJson.data);
      })
      .catch(err => console.error('Failed to load roadmaps directory data', err))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const base = [
      { id: 'all', label: 'Semua Jalur' },
      { id: 'Price Action', label: 'Price Action & Struktur' },
      { id: 'Institutional', label: 'Institusional & SMC' },
      { id: 'Wyckoff', label: 'Wyckoff & Volume' },
      { id: 'Core Foundation', label: 'Manajemen Risiko' },
      { id: 'Quantitative', label: 'Kuantitatif & Algo' },
      { id: 'community', label: 'Kurikulum Komunitas' }
    ];

    // Ekstrak kategori kustom dari roadmap buatan komunitas secara dinamis
    const customCats = Array.from(new Set(communityRoadmaps.map(c => c.category)))
      .filter(cat => cat && !base.some(b => b.id.toLowerCase() === cat.toLowerCase() || b.label.toLowerCase() === cat.toLowerCase()));

    const customPills = customCats.map(cat => ({
      id: cat,
      label: cat
    }));

    return [...base, ...customPills];
  }, [communityRoadmaps]);

  const filteredOfficialRoadmaps = useMemo(() => {
    return roadmaps.filter(rm => {
      const matchSearch = rm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rm.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rm.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'all' || 
                            (selectedCategory !== 'community' && (
                              rm.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                              selectedCategory.toLowerCase().includes(rm.category.toLowerCase())
                            ));
      return matchSearch && matchCategory;
    });
  }, [roadmaps, searchQuery, selectedCategory]);

  const filteredCommunityRoadmaps = useMemo(() => {
    return communityRoadmaps.filter(crm => {
      const matchSearch = crm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          crm.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          crm.creator_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          crm.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchCategory = selectedCategory === 'all' || 
                            selectedCategory === 'community' ||
                            crm.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                            selectedCategory.toLowerCase().includes(crm.category.toLowerCase());

      return matchSearch && matchCategory;
    });
  }, [communityRoadmaps, searchQuery, selectedCategory]);

  // Color mapping per roadmap slug
  const getRoadmapColorTheme = (slug: string) => {
    switch (slug) {
      case 'price-action-market-structure':
        return {
          bg: 'bg-[#FEF08A] hover:bg-[#FDE047] text-zinc-950',
          badge: 'bg-black text-[#FEF08A]',
          accent: '#CA8A04',
          shadow: 'shadow-[4px_4px_0px_#000000]'
        };
      case 'smart-money-concepts-ict':
        return {
          bg: 'bg-[#BAE6FD] hover:bg-[#7DD3FC] text-zinc-950',
          badge: 'bg-black text-[#38BDF8]',
          accent: '#0284C7',
          shadow: 'shadow-[4px_4px_0px_#000000]'
        };
      case 'wyckoff-method-vsa':
        return {
          bg: 'bg-[#E9D5FF] hover:bg-[#D8B4FE] text-zinc-950',
          badge: 'bg-black text-[#C084FC]',
          accent: '#9333EA',
          shadow: 'shadow-[4px_4px_0px_#000000]'
        };
      case 'risk-management-psychology':
        return {
          bg: 'bg-[#FECDD3] hover:bg-[#FDA4AF] text-zinc-950',
          badge: 'bg-black text-[#FB7185]',
          accent: '#E11D48',
          shadow: 'shadow-[4px_4px_0px_#000000]'
        };
      case 'quantitative-algo-trading':
      default:
        return {
          bg: 'bg-[#BBF7D0] hover:bg-[#86EFAC] text-zinc-950',
          badge: 'bg-black text-[#4ADE80]',
          accent: '#16A34A',
          shadow: 'shadow-[4px_4px_0px_#000000]'
        };
    }
  };

  return (
    <div className="flex-1 bg-slate-50 dark:bg-[#08090D] text-slate-900 dark:text-[#E2E8F0] py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-200">
            <Compass className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Katalog Kurikulum Terstruktur</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Peta Jalan Belajar Trading
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8] leading-relaxed">
            Pilih metodologi dan jalur keahlian Anda. Setiap roadmap menyajikan alur visual terstruktur, diagram alur lelang pasar, kuis pemahaman, dan dokumentasi mendalam tanpa tebak-tebakan.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
              <input
                type="text"
                placeholder="Cari roadmap atau konsep (cth: Price Action, ICT, Risk, Wyckoff)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-[#121722] border-2 border-slate-300 dark:border-zinc-700 focus:border-black dark:focus:border-white rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 outline-none transition-all shadow-xs"
              />
            </div>

            <Link
              to="/roadmaps/create"
              className="w-full sm:w-auto px-4 py-2.5 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl text-xs flex items-center justify-center space-x-2 hover:opacity-90 transition-all shadow-xs flex-shrink-0"
            >
              <PlusCircle className="w-4 h-4 text-[#10B981]" />
              <span>Buat Roadmap Baru</span>
            </Link>
          </div>

          {/* Category Chips Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(cat => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-black text-white dark:bg-white dark:text-black font-bold border-black dark:border-white shadow-xs'
                      : 'bg-white dark:bg-[#121722] text-slate-600 dark:text-[#94A3B8] border-slate-200 dark:border-zinc-800 hover:border-slate-400'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-24 text-center text-xs font-mono text-slate-500 dark:text-zinc-400">
            <div className="inline-block w-4 h-4 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mb-2" />
            <p>Memuat direktori roadmap kurikulum...</p>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* Section: Official Kurikulum Roadmaps */}
            {(selectedCategory === 'all' || selectedCategory !== 'community') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-[#10B981]" />
                    <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      Kurikulum Resmi (Official Roadmaps)
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                    {filteredOfficialRoadmaps.length} Jalur Tersedia
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredOfficialRoadmaps.map(rm => {
                    const theme = getRoadmapColorTheme(rm.slug);
                    const isFullyPopulated = rm.slug === 'price-action-market-structure';

                    return (
                      <div
                        key={rm.id}
                        className={`rounded-2xl border-2 border-black dark:border-zinc-300 p-6 flex flex-col justify-between transition-all duration-150 ${theme.bg} ${theme.shadow} hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-extrabold uppercase ${theme.badge}`}>
                              {rm.category}
                            </span>

                            <span className="text-[10px] font-mono font-bold text-zinc-700 bg-black/10 px-2 py-0.5 rounded">
                              {rm.difficulty}
                            </span>
                          </div>

                          <h3 className="text-lg font-black text-zinc-950 tracking-tight leading-snug">
                            {rm.title}
                          </h3>

                          <p className="text-xs text-zinc-800 leading-relaxed line-clamp-3">
                            {rm.description}
                          </p>
                        </div>

                        <div className="pt-6 mt-6 border-t border-black/15 flex items-center justify-between">
                          <div className="flex items-center space-x-3 text-[11px] font-mono font-semibold text-zinc-800">
                            <span className="flex items-center space-x-1">
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>{rm.nodes_count || (isFullyPopulated ? 12 : 10)} Modul</span>
                            </span>
                            <span>•</span>
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{rm.estimated_hours} Jam</span>
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/roadmaps/create?fork=${rm.slug}`}
                              title="Fork kurikulum ini ke Roadmap Studio"
                              className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-black/10 hover:bg-black/20 text-zinc-950 font-mono text-xs font-bold transition-all"
                            >
                              <GitFork className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Fork</span>
                            </Link>

                            <Link
                              to={`/roadmaps/${rm.slug}`}
                              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-black text-white hover:bg-zinc-800 font-mono text-xs font-bold transition-all shadow-xs"
                            >
                              <span>Buka Peta</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Section: Community Roadmaps */}
            {(selectedCategory === 'all' || selectedCategory === 'community') && filteredCommunityRoadmaps.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-zinc-800">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-[#38BDF8]" />
                    <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      Kurikulum Komunitas
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                    {filteredCommunityRoadmaps.length} Kontribusi Trader
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCommunityRoadmaps.map(crm => {
                    let nodeCount = 0;
                    try {
                      nodeCount = JSON.parse((crm as any).nodes_json || '[]').length;
                    } catch {
                      nodeCount = crm.nodes?.length || 0;
                    }

                    return (
                      <div
                        key={crm.id}
                        className="rounded-2xl border-2 border-black dark:border-zinc-700 bg-white dark:bg-[#121722] p-5 shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#334155] flex flex-col justify-between hover:-translate-y-0.5 transition-all"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 font-bold border border-sky-300 dark:border-sky-800">
                              {crm.category}
                            </span>
                            <span className="text-slate-500">Oleh {crm.creator_name}</span>
                          </div>

                          <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                            {crm.title}
                          </h3>

                          <p className="text-xs text-slate-600 dark:text-[#94A3B8] line-clamp-2 leading-relaxed">
                            {crm.description}
                          </p>
                        </div>

                        <div className="pt-4 mt-4 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-500">{nodeCount} Modul Khusus</span>
                          <div className="flex items-center space-x-2.5">
                            <Link
                              to={`/roadmaps/create?fork=${crm.slug}`}
                              className="text-slate-500 hover:text-black dark:text-zinc-400 dark:hover:text-white flex items-center space-x-1 text-[11px]"
                              title="Fork kurikulum ini ke Roadmap Studio"
                            >
                              <GitFork className="w-3 h-3" />
                              <span>Fork</span>
                            </Link>
                            <Link
                              to={`/roadmaps/${crm.slug}`}
                              className="text-[#10B981] font-bold hover:underline flex items-center space-x-1"
                            >
                              <span>Buka Path</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
