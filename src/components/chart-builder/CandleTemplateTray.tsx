import React, { useState } from 'react';
import { CandleTemplatePreset } from '../../types/chartBuilderTypes';
import { 
  Sparkles, 
  Layers, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight,
  Zap,
  Activity,
  Workflow
} from 'lucide-react';

export const CANDLE_PRESETS: CandleTemplatePreset[] = [
  // --- SINGLE CANDLES ---
  {
    id: 'bullish-marubozu',
    name: 'Bullish Expansion (Marubozu)',
    category: 'Single Candle',
    description: 'Candle ekspansi kuat tanpa wick dengan komitmen buyer institusional maksimal.',
    candles: [
      { open: 100, high: 140, low: 98, close: 138, volume: 1800, label: 'Expansion' }
    ]
  },
  {
    id: 'bearish-rejection-pinbar',
    name: 'Shooting Star / Rejection Wick',
    category: 'Single Candle',
    description: 'Upper wick panjang menandakan penolakan harga dan aksi jual institusi.',
    candles: [
      { open: 110, high: 155, low: 105, close: 108, volume: 2400, label: 'Sweep Pin' }
    ]
  },
  {
    id: 'bullish-hammer',
    name: 'Bullish Hammer / Liquidity Absorption',
    category: 'Single Candle',
    description: 'Lower wick panjang menunjukkan penyerapan likuiditas jual di area support.',
    candles: [
      { open: 115, high: 118, low: 75, close: 116, volume: 2200, label: 'Hammer' }
    ]
  },
  {
    id: 'neutral-doji',
    name: 'Indecision Doji Star',
    category: 'Single Candle',
    description: 'Keseimbangan volume lelang antara buyer dan seller sebelum pergerakan besar.',
    candles: [
      { open: 110, high: 130, low: 90, close: 110, volume: 900, label: 'Doji' }
    ]
  },

  // --- SMC & PRICE ACTION SETUPS ---
  {
    id: 'fvg-triplet-setup',
    name: '3-Candle Fair Value Gap (FVG)',
    category: 'SMC Setup',
    description: 'Ketidakseimbangan harga antara High candle 1 dan Low candle 3 dengan garis Consequent Encroachment 50%.',
    candles: [
      { open: 100, high: 112, low: 95, close: 110, volume: 1100, label: 'C1' },
      { open: 111, high: 165, low: 110, close: 162, volume: 3200, label: 'C2 (Impulse)' },
      { open: 163, high: 180, low: 142, close: 175, volume: 1500, label: 'C3' }
    ],
    suggestedBoxes: [
      { startIndex: 0, endIndex: 2, topPrice: 142, bottomPrice: 112, label: 'FVG (CE 50%)', color: '#10B981', showMidLine: true }
    ],
    suggestedBadges: [
      { candleIndex: 1, price: 166, text: 'BOS', color: '#10B981' }
    ]
  },
  {
    id: 'bullish-engulfing-pair',
    name: 'Bullish Engulfing Reversal',
    category: 'Reversal Pattern',
    description: 'Candle bull menelan seluruh rentang candle bear sebelumnya di area demand.',
    candles: [
      { open: 125, high: 128, low: 105, close: 108, volume: 1200, label: 'Bear Base' },
      { open: 106, high: 145, low: 104, close: 142, volume: 2800, label: 'Engulfing' }
    ]
  },
  {
    id: 'order-block-mitigation-sequence',
    name: 'Order Block & Mitigasi MT 50%',
    category: 'SMC Setup',
    description: 'Down-candle terakhir sebelum ekspansi naik yang kemudian dimitigasi pada level Mean Threshold.',
    candles: [
      { open: 120, high: 124, low: 95, close: 98, volume: 1400, label: 'OB' },
      { open: 100, high: 150, low: 98, close: 148, volume: 3400, label: 'BOS Push' },
      { open: 146, high: 155, low: 135, close: 138, volume: 1100, label: 'Pullback' },
      { open: 137, high: 140, low: 110, close: 112, volume: 950, label: 'Mitigasi' },
      { open: 113, high: 170, low: 112, close: 168, volume: 3100, label: 'Rally' }
    ],
    suggestedBoxes: [
      { startIndex: 0, endIndex: 4, topPrice: 124, bottomPrice: 95, label: 'Bullish OB (MT 50%)', color: '#38BDF8', showMidLine: true }
    ],
    suggestedBadges: [
      { candleIndex: 1, price: 152, text: 'BOS', color: '#10B981' },
      { candleIndex: 3, price: 108, text: 'Entry Limit', color: '#FACC15' }
    ]
  },

  // --- FULL MARKET SCENARIOS (MULTI-PHASE) ---
  {
    id: 'power-of-3-amd-scenario',
    name: 'Power of 3 (AMD: Accumulation, Manipulation, Distribution)',
    category: 'Market Scenario',
    description: 'Siklus harian institusi: Konsolidasi Asian Range ➔ Judas Swing Sweep High ➔ Distribusi Bearish Trend.',
    candles: [
      { open: 120, high: 125, low: 118, close: 122, volume: 800, label: 'Asia 1' },
      { open: 122, high: 126, low: 119, close: 121, volume: 750, label: 'Asia 2' },
      { open: 121, high: 125, low: 120, close: 124, volume: 820, label: 'Asia 3' },
      { open: 124, high: 144, low: 123, close: 139, volume: 2900, label: 'Judas Up' },
      { open: 138, high: 141, low: 110, close: 114, volume: 3800, label: 'CHoCH Down' },
      { open: 115, high: 125, low: 112, close: 122, volume: 1200, label: 'Retest' },
      { open: 121, high: 123, low: 90, close: 93, volume: 3400, label: 'Expansion' },
      { open: 94, high: 96, low: 72, close: 75, volume: 3900, label: 'Distribution' }
    ],
    suggestedBoxes: [
      { startIndex: 0, endIndex: 2, topPrice: 126, bottomPrice: 118, label: 'Asian Range (Accumulation)', color: '#A855F7' },
      { startIndex: 3, endIndex: 4, topPrice: 144, bottomPrice: 126, label: 'Liquidity Sweep Area', color: '#F43F5E' }
    ],
    suggestedBadges: [
      { candleIndex: 3, price: 146, text: 'BSL $$$ Swept', color: '#F43F5E' },
      { candleIndex: 4, price: 110, text: 'CHoCH', color: '#F43F5E' }
    ]
  },
  {
    id: 'wyckoff-spring-reversal-scenario',
    name: 'Wyckoff Accumulation Spring & Test',
    category: 'Market Scenario',
    description: 'Skematik fase C Wyckoff: Penembusan support palsu (Spring) diikuti test bervolume rendah lalu rally SOS.',
    candles: [
      { open: 130, high: 135, low: 105, close: 110, volume: 2100, label: 'Selling Climax' },
      { open: 111, high: 142, low: 110, close: 138, volume: 1600, label: 'Auto Rally' },
      { open: 137, high: 140, low: 115, close: 118, volume: 1100, label: 'Sec Test' },
      { open: 117, high: 122, low: 88, close: 94, volume: 3600, label: 'Spring (Trap)' },
      { open: 95, high: 120, low: 94, close: 116, volume: 1900, label: 'Recovery' },
      { open: 116, high: 119, low: 102, close: 106, volume: 850, label: 'Test (Low Vol)' },
      { open: 107, high: 152, low: 106, close: 149, volume: 3900, label: 'Sign of Strength' }
    ],
    suggestedBoxes: [
      { startIndex: 0, endIndex: 5, topPrice: 142, bottomPrice: 105, label: 'Trading Range (TR)', color: '#38BDF8' }
    ],
    suggestedBadges: [
      { candleIndex: 3, price: 86, text: 'Spring Trap', color: '#F43F5E' },
      { candleIndex: 6, price: 154, text: 'SOS Breakout', color: '#10B981' }
    ]
  }
];

interface CandleTemplateTrayProps {
  onAddPreset: (preset: CandleTemplatePreset) => void;
  onAddBlankCandle: (isBullish: boolean) => void;
}

export const CandleTemplateTray: React.FC<CandleTemplateTrayProps> = ({
  onAddPreset,
  onAddBlankCandle
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Single Candle' | 'Reversal Pattern' | 'SMC Setup' | 'Market Scenario'>('All');

  const filteredPresets = selectedCategory === 'All'
    ? CANDLE_PRESETS
    : CANDLE_PRESETS.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-4">
      {/* Quick Add Blank Single Candles */}
      <div className="bg-slate-50 dark:bg-[#0E131F] p-3 rounded-xl border border-slate-200 dark:border-zinc-800">
        <div className="text-[11px] font-mono font-bold text-slate-700 dark:text-zinc-300 mb-2 flex items-center justify-between">
          <span className="flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Tambah Candle Satuan:</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">1-Klik</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onAddBlankCandle(true)}
            className="flex items-center justify-center space-x-1.5 py-2 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-mono font-bold transition-all"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+ Bullish Bar</span>
          </button>
          <button
            type="button"
            onClick={() => onAddBlankCandle(false)}
            className="flex items-center justify-center space-x-1.5 py-2 px-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 rounded-lg text-xs font-mono font-bold transition-all"
          >
            <TrendingDown className="w-3.5 h-3.5" />
            <span>+ Bearish Bar</span>
          </button>
        </div>
      </div>

      {/* Preset Category Filter Tabs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-zinc-300 flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Katalog Formasi &amp; Skenario:</span>
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-2">
          {(['All', 'Market Scenario', 'SMC Setup', 'Single Candle'] as const).map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat as any)}
              className={`text-[10px] font-mono px-2 py-1 rounded-md transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-black font-extrabold shadow-2xs'
                  : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {cat === 'All' ? 'Semua' : cat}
            </button>
          ))}
        </div>

        {/* Preset Cards List */}
        <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
          {filteredPresets.map((preset) => (
            <div
              key={preset.id}
              onClick={() => onAddPreset(preset)}
              className="p-3 bg-white dark:bg-[#121722] hover:bg-slate-50 dark:hover:bg-[#1A2234] border border-slate-200 dark:border-zinc-800 hover:border-emerald-500 rounded-xl cursor-pointer transition-all group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                  {preset.name}
                </span>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                  preset.category === 'Market Scenario'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'
                }`}>
                  {preset.category}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-snug">
                {preset.description}
              </p>
              <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold opacity-85 group-hover:opacity-100 transition-opacity">
                <span className="flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span>+ Sisipkan {preset.candles.length} Candle</span>
                  {preset.suggestedBoxes && <span>• +{preset.suggestedBoxes.length} Box</span>}
                </span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
