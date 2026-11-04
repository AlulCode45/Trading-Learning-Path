import React, { useState } from 'react';
import { CommunityRoadmap } from '../types';
import { Heart, Search, PlusCircle, CheckCircle, Flame } from 'lucide-react';

interface CommunityViewProps {
  roadmaps: CommunityRoadmap[];
  onUpvote: (id: string) => void;
  onOpenCreateModal: () => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  roadmaps,
  onUpvote,
  onOpenCreateModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(roadmaps.map(r => r.category)))];

  const filtered = roadmaps.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.creator_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Community Banner */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 text-xs font-mono uppercase mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>Ekosistem Terbuka Komunitas (UGC)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
            Peta Jalan Buatan Komunitas Trader
          </h1>
          <p className="text-sm text-[#94A3B8] mt-2 leading-relaxed">
            Jelajahi alur belajar trading yang dibuat dan dibagikan oleh praktisi pasar: strategi scalping emas, siklus rotasi altcoin, hingga model swing institusional. Buat dan bagikan roadmap versi Anda sendiri.
          </p>
          <div className="mt-5">
            <button
              onClick={onOpenCreateModal}
              className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#10B981] text-[#090D16] rounded-xl font-semibold text-xs hover:bg-[#059669] transition-colors shadow-lg shadow-[#10B981]/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publikasikan Roadmap Baru</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Cari roadmap komunitas, topik, atau pembuat..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-[#0F172A] border border-[#1E293B] focus:border-[#10B981] rounded-xl pl-10 pr-4 py-2 text-xs text-[#F8FAFC] placeholder-[#94A3B8] outline-none transition-colors"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#10B981] text-[#090D16] font-semibold'
                  : 'bg-[#0F172A] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#1E293B]'
              }`}
            >
              {cat === 'all' ? 'Semua Kategori' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Roadmaps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <div
            key={item.id}
            className="bg-[#0F172A] border border-[#1E293B] hover:border-[#334155] rounded-xl p-5 flex flex-col justify-between transition-all duration-200 group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1E293B] text-[#38BDF8] border border-[#334155]">
                  {item.category}
                </span>
                <button
                  onClick={() => onUpvote(item.id)}
                  className="flex items-center space-x-1 text-xs font-mono text-[#94A3B8] hover:text-[#F43F5E] bg-[#090D16] px-2 py-1 rounded-md border border-[#1E293B] transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 text-[#F43F5E] fill-[#F43F5E]/20" />
                  <span>{item.upvotes}</span>
                </button>
              </div>

              <h2 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#10B981] transition-colors line-clamp-2">
                {item.title}
              </h2>
              <div className="text-[11px] font-mono text-[#94A3B8] mt-1">
                Dibuat oleh: <span className="text-[#F8FAFC]">{item.creator_name}</span>
              </div>

              <p className="text-xs text-[#94A3B8] mt-3 line-clamp-3 leading-relaxed">
                {item.description}
              </p>

              {/* Node Sequence Preview */}
              <div className="mt-4 pt-3 border-t border-[#1E293B] space-y-2">
                <div className="text-[10px] font-mono uppercase text-[#94A3B8]">Tahapan Modul:</div>
                {item.nodes && item.nodes.map((node, nIdx) => (
                  <div key={nIdx} className="flex items-center space-x-2 text-xs text-[#CBD5E1]">
                    <CheckCircle className="w-3 h-3 text-[#10B981] flex-shrink-0" />
                    <span className="truncate">{node.title}</span>
                    <span className="text-[10px] font-mono text-[#94A3B8] ml-auto flex-shrink-0">{node.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#1E293B] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#94A3B8]">{item.nodes?.length || 0} Modul Interaktif</span>
              <span className="text-xs font-mono text-[#10B981] group-hover:translate-x-1 transition-transform">
                Pelajari Path &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
