import React from 'react';
import { CandleTemplatePreset } from '../../types/chartBuilderTypes';
import { Sparkles, Layers, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

export const CANDLE_PRESETS: CandleTemplatePreset[] = [
  // Single Candle Presets
  {
    id: 'bullish-marubozu',
    name: 'Bullish Expansion (Marubozu)',
    category: 'Single Candle',
    description: 'Candle ekspansi kuat tanpa wick dengan komitmen buyer maksimal.',
    candles: [
      { open: 100, high: 140, low: 98, close: 138, label: 'Expansion' }
    ]
  },
  {
    id: 'bearish-rejection-pinbar',
    name: 'Shooting Star / Rejection Wick',
    category: 'Single Candle',
    description: 'Upper wick panjang menandakan penolakan harga dan aksi jual institusi.',
    candles: [
      { open: 110, high: 155, low: 105, close: 108, label: 'Sweep Pin' }
    ]
  },
  {
    id: 'bullish-hammer',
    name: 'Bullish Hammer / Liquidity Absorption',
    category: 'Single Candle',
    description: 'Lower wick panjang menunjukkan penyerapan likuiditas jual di area support.',
    candles: [
      { open: 115, high: 118, low: 75, close: 116, label: 'Hammer' }
    ]
  },
  {
    id: 'neutral-doji',
    name: 'Indecision Doji Star',
    category: 'Single Candle',
    description: 'Keseimbangan volume lelang antara buyer dan seller sebelum pergerakan besar.',
    candles: [
      { open: 110, high: 130, low: 90, close: 110, label: 'Doji' }
    ]
  },

  // Multi-Candle Patterns
  {
    id: 'fvg-triplet-setup',
    name: '3-Candle Fair Value Gap (FVG)',
    category: 'SMC Setup',
    description: 'Ketidakseimbangan harga antara High candle 1 dan Low candle 3.',
    candles: [
      { open: 100, high: 112, low: 95, close: 110, label: 'C1' },
      { open: 111, high: 165, low: 110, close: 162, label: 'C2 (Impulse)' },
      { open: 163, high: 180, low: 142, close: 175, label: 'C3 (FVG Area)' }
    ]
  },
  {
    id: 'bullish-engulfing-pair',
    name: 'Bullish Engulfing Reversal',
    category: 'Reversal Pattern',
    description: 'Candle bull menelan seluruh rentang candle bear sebelumnya.',
    candles: [
      { open: 125, high: 128, low: 105, close: 108, label: 'Bear Base' },
      { open: 106, high: 145, low: 104, close: 142, label: 'Engulfing' }
    ]
  },
  {
    id: 'order-block-mitigation-sequence',
    name: 'Order Block & Mitigasi',
    category: 'SMC Setup',
    description: 'Down-candle terakhir sebelum ekspansi naik yang kemudian dimitigasi.',
    candles: [
      { open: 120, high: 124, low: 95, close: 98, label: 'OB' },
      { open: 100, high: 150, low: 98, close: 148, label: 'BOS Push' },
      { open: 146, high: 155, low: 135, close: 138, label: 'Pullback' },
      { open: 137, high: 140, low: 110, close: 112, label: 'Mitigasi' },
      { open: 113, high: 170, low: 112, close: 168, label: 'Expansion' }
    ]
  },
  {
    id: 'asian-sweep-judas-pattern',
    name: 'Asian Range Liquidity Sweep',
    category: 'SMC Setup',
    description: 'Manipulasi sweep Asian High sebelum reversal tajam ke arah berlawanan.',
    candles: [
      { open: 118, high: 122, low: 114, close: 120, label: 'Asia High' },
      { open: 121, high: 142, low: 119, close: 123, label: 'Judas Sweep' },
      { open: 122, high: 124, low: 85, close: 88, label: 'Reversal' }
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
  return (
    <div className="space-y-4">
      {/* Quick Add Blank Single Candles */}
      <div className="bg-slate-50 dark:bg-[#0E131F] p-3 rounded-xl border border-slate-200 dark:border-zinc-800">
        <div className="text-[11px] font-mono font-bold text-slate-700 dark:text-zinc-300 mb-2 flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <span>Tambah Candle Satuan:</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onAddBlankCandle(true)}
            className="flex items-center justify-center space-x-1.5 py-2 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-mono font-bold transition-all"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+ Bullish (Hijau)</span>
          </button>
          <button
            type="button"
            onClick={() => onAddBlankCandle(false)}
            className="flex items-center justify-center space-x-1.5 py-2 px-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 rounded-lg text-xs font-mono font-bold transition-all"
          >
            <TrendingDown className="w-3.5 h-3.5" />
            <span>+ Bearish (Merah)</span>
          </button>
        </div>
      </div>

      {/* Preset Formations List */}
      <div className="space-y-2">
        <div className="text-[11px] font-mono font-bold text-slate-700 dark:text-zinc-300 flex items-center space-x-1.5">
          <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>Template Formasi Candlestick:</span>
        </div>

        <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
          {CANDLE_PRESETS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => onAddPreset(preset)}
              className="p-3 bg-white dark:bg-[#121722] hover:bg-slate-50 dark:hover:bg-[#1A2234] border border-slate-200 dark:border-zinc-800 hover:border-emerald-500 rounded-xl cursor-pointer transition-all group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                  {preset.name}
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
                  {preset.category}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-snug">
                {preset.description}
              </p>
              <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <span>+ Sisipkan {preset.candles.length} Candle</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
