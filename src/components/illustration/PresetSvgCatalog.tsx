import React, { useState } from 'react';
import { VisualDiagram } from '../VisualDiagram';
import { Search, Grid, Check, Sparkles, Filter } from 'lucide-react';

export interface PresetSvgItem {
  type: string;
  title: string;
  category: 'Price Action' | 'SMC & ICT' | 'Wyckoff & VSA' | 'Risk & Psychology' | 'Quantitative';
  description: string;
}

export const PRESET_SVG_ITEMS: PresetSvgItem[] = [
  // Price Action Core
  {
    type: 'candlestick_anatomy',
    title: 'Anatomi Candlestick & Auction Theory',
    category: 'Price Action',
    description: 'Analisis lelang: Body vs Wick, komitmen volume buyer/seller, dan penolakan harga.',
  },
  {
    type: 'multi_timeframe',
    title: 'Fraktalitas Multi-Timeframe Alignment',
    category: 'Price Action',
    description: 'Top-down alignment: Macro Daily Wave ➔ H1 Structure ➔ M5/M1 Execution.',
  },
  {
    type: 'swing_structure',
    title: 'Struktur Swing High & Low Mekanis',
    category: 'Price Action',
    description: 'Aturan 3-candle fraktal tanpa subjektivitas untuk menentukan puncak dan lembah.',
  },
  {
    type: 'bos_choch',
    title: 'Break of Structure (BOS) vs. CHoCH',
    category: 'Price Action',
    description: 'Konfirmasi kelanjutan tren (BOS) vs peringatan pergeseran karakter (CHoCH).',
  },
  {
    type: 'strong_weak_levels',
    title: 'Strong Protected vs. Weak Targeted Swings',
    category: 'Price Action',
    description: 'Membedakan benteng pertahanan institusi dari sasaran likuiditas empuk.',
  },
  {
    type: 'supply_demand_zones',
    title: 'Supply & Demand: Fresh vs Mitigated',
    category: 'Price Action',
    description: 'Zona ketidakseimbangan order lelang: Fresh (100% order) vs Mitigated (melemah).',
  },
  {
    type: 'premium_discount',
    title: 'Premium vs. Discount Valuasi 50%',
    category: 'Price Action',
    description: 'Disiplin lelang grosir: Beli di area Diskon (<50%) dan Jual di area Premium (>50%).',
  },

  // Smart Money Concepts
  {
    type: 'liquidity_pools',
    title: 'Liquidity Pools (BSL & SSL)',
    category: 'SMC & ICT',
    description: 'Konsentrasi tumpukan Stop Loss di atas Equal Highs (EQH) dan Equal Lows (EQL).',
  },
  {
    type: 'liquidity_sweep',
    title: 'Liquidity Sweep & Turtle Soup Trap',
    category: 'SMC & ICT',
    description: 'Sapuan likuiditas palsu (fakeout) sebelum pembalikan harga agresif berlawanan arah.',
  },
  {
    type: 'fvg_bpr_diagram',
    title: 'Fair Value Gap (FVG) & Consequent Encroachment',
    category: 'SMC & ICT',
    description: 'Celah ketidakefisienan lelang 3 candlestick dan retest pada level 50% CE.',
  },
  {
    type: 'order_block_diagram',
    title: 'Order Block & Mean Threshold 50%',
    category: 'SMC & ICT',
    description: 'Candle institusi terakhir sebelum displacement dan garis toleransi Mean Threshold.',
  },
  {
    type: 'asian_range_judas_diagram',
    title: 'Asian Range & London Judas Swing',
    category: 'SMC & ICT',
    description: 'Rentang konsolidasi Tokyo dan manipulasi sapuan pembukaan sesi London.',
  },
  {
    type: 'amd_power_of_3_diagram',
    title: 'Power of 3 (AMD Daily Cycle)',
    category: 'SMC & ICT',
    description: 'Siklus candlestick harian: Accumulation, Manipulation, dan Distribution.',
  },
  {
    type: 'smt_divergence_diagram',
    title: 'SMT Divergence Intermarket Correlation',
    category: 'SMC & ICT',
    description: 'Ketidaksesuaian struktur antara aset berkorelasi (EURUSD vs GBPUSD).',
  },

  // Wyckoff Method
  {
    type: 'wyckoff_accumulation_schematic',
    title: 'Skematik Akumulasi Wyckoff (Fase A - E)',
    category: 'Wyckoff & VSA',
    description: 'Siklus institusional: PS ➔ SC ➔ AR ➔ ST ➔ Spring Fase C ➔ SOS ➔ LPS ➔ Markup.',
  },
  {
    type: 'wyckoff_distribution_schematic',
    title: 'Skematik Distribusi Wyckoff & UTAD',
    category: 'Wyckoff & VSA',
    description: 'Pelepasan inventaris: PSY ➔ BC ➔ AR ➔ UTAD (Bull Trap) ➔ SOW ➔ LPSY ➔ Markdown.',
  },
  {
    type: 'wyckoff_vsa_volume_spread',
    title: 'VSA: Effort vs. Result Anomali',
    category: 'Wyckoff & VSA',
    description: 'Stopping Volume, Churn Absorption, No Demand Bar, dan No Supply Test.',
  },

  // Risk & Psychology
  {
    type: 'drawdown_recovery_curve',
    title: 'Kurva Asimetri Drawdown Geometris',
    category: 'Risk & Psychology',
    description: 'Matematika pemulihan modal non-linear (-50% butuh +100%, -90% butuh +900%).',
  },
  {
    type: 'risk_position_sizing_calc',
    title: 'Kalkulator Formula Position Sizing Presisi',
    category: 'Risk & Psychology',
    description: 'Modal Akun × Fixed % Risk ÷ Jarak SL = Ukuran Lot Transaksi Pasti.',
  },
  {
    type: 'risk_reward_calc',
    title: 'Asymmetric Risk:Reward 1:3 Matrix',
    category: 'Risk & Psychology',
    description: 'Bukti matematis bahwa win rate 40% mengalahkan sistem win rate 80%.',
  },
  {
    type: 'trade_journaling',
    title: 'Siklus Audit Tertutup Jurnal Trading',
    category: 'Risk & Psychology',
    description: 'Pre-Trade Setup ➔ In-Trade Execution ➔ Post-Trade Review & Feedback Loop.',
  },

  // Quantitative
  {
    type: 'quant_time_series_stationarity_diagram',
    title: 'Stasioneritas Time Series & ADF Test',
    category: 'Quantitative',
    description: 'Perbandingan Raw Price Drift non-stasioner vs Log Returns stasioner (p < 0.05).',
  },
  {
    type: 'quant_monte_carlo_drawdown',
    title: 'Simulasi Resampling Monte Carlo (1,000 Paths)',
    category: 'Quantitative',
    description: 'Pemetaan confidence band 95th percentile dan batas maksimum drawdown terburuk.',
  },
  {
    type: 'orderbook_depth_l2',
    title: 'Order Book Depth Level 2 Microstructure',
    category: 'Quantitative',
    description: 'Buku pesanan L2: Cumulative Bids vs Asks, Bid-Ask Spread, dan antrean limit.',
  },
  {
    type: 'entry_protocol',
    title: 'Protokol Eksekusi 3 Langkah Presisi',
    category: 'Price Action',
    description: 'HTF POI Key Zone ➔ LTF Market Shift (CHoCH) ➔ Limit Order Entry.',
  },
];

interface PresetSvgCatalogProps {
  selectedType?: string;
  onSelect?: (type: string) => void;
  className?: string;
}

export const PresetSvgCatalog: React.FC<PresetSvgCatalogProps> = ({
  selectedType = 'candlestick_anatomy',
  onSelect,
  className = '',
}) => {
  const [activeType, setActiveType] = useState<string>(selectedType);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('Semua');

  const categories = ['Semua', 'Price Action', 'SMC & ICT', 'Wyckoff & VSA', 'Risk & Psychology', 'Quantitative'];

  const filteredItems = PRESET_SVG_ITEMS.filter(item => {
    const matchesCategory = categoryFilter === 'Semua' || item.category === categoryFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleChoose = (type: string) => {
    setActiveType(type);
    if (onSelect) {
      onSelect(type);
    }
  };

  const selectedItem = PRESET_SVG_ITEMS.find(item => item.type === activeType) || PRESET_SVG_ITEMS[0];

  return (
    <div className={`bg-[#060A12] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl overflow-hidden my-6 ${className}`}>
      {/* Header */}
      <div className="bg-[#0B1120] border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="p-1.5 bg-amber-950/80 text-amber-400 border border-amber-800 rounded">
            <Sparkles size={14} />
          </span>
          <div>
            <span className="text-xs font-mono font-bold text-white block">Preset SVG Illustration Catalog</span>
            <span className="text-[10px] font-mono text-slate-400">25+ Kurasi Diagram Edukasi Institusional Bawaan</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={13} className="absolute left-2.5 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari preset diagram..."
            className="w-full bg-[#020617] border border-slate-800 rounded pl-8 pr-3 py-1.5 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="bg-[#040810] border-b border-slate-800/80 px-4 py-2 flex flex-wrap items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
        <Filter size={12} className="text-slate-500 mr-1" />
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              categoryFilter === cat
                ? 'bg-[#38BDF8] text-black font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Content Area: Grid selector + Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* Left: Scrollable List of Diagram Presets */}
        <div className="lg:col-span-5 max-h-[460px] overflow-y-auto p-3 space-y-2">
          {filteredItems.map(item => {
            const isSelected = item.type === activeType;
            return (
              <div
                key={item.type}
                onClick={() => handleChoose(item.type)}
                className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-blue-950/60 border-[#38BDF8] shadow-[2px_2px_0px_#38BDF8]'
                    : 'bg-[#0B1120] border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                    isSelected ? 'bg-[#38BDF8] text-black' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.category}
                  </span>
                  {isSelected && <Check size={14} className="text-[#38BDF8]" />}
                </div>
                <h4 className="text-xs font-mono font-bold text-white mb-0.5">{item.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-1">{item.description}</p>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="p-8 text-center text-xs font-mono text-slate-500">
              Tidak ada preset diagram yang cocok dengan pencarian "{searchQuery}".
            </div>
          )}
        </div>

        {/* Right: Selected Diagram Live View */}
        <div className="lg:col-span-7 p-4 bg-[#020617] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <div>
                <span className="text-xs font-mono text-[#FACC15] font-bold block">{selectedItem.title}</span>
                <span className="text-[10px] font-mono text-slate-400">{selectedItem.category} • Key: {selectedItem.type}</span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-950/80 border border-emerald-600 text-emerald-300 px-2 py-0.5 rounded font-bold">
                Active SVG Preset
              </span>
            </div>

            {/* Render actual SVG */}
            <div className="overflow-x-auto">
              <VisualDiagram type={activeType} />
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Gunakan kode shortcode: <code className="text-[#38BDF8] bg-slate-900 px-1.5 py-0.5 rounded">::diagram[type="{activeType}"]</code></span>
          </div>
        </div>
      </div>
    </div>
  );
};
