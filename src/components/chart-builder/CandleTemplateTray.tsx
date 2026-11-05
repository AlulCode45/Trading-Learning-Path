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
  FileText,
  CornerDownRight
} from 'lucide-react';

export const CANDLE_PRESETS: CandleTemplatePreset[] = [
  // --- BLUEPRINT SCHEMATICS (MULTI-WAVE, CARDS, ARROWS & LEGENDS) ---
  {
    id: 'btc-dominance-altseason-blueprint',
    name: 'Bitcoin Dominance (BTC.D) & Altseason Rotation',
    category: 'Market Scenario',
    title: 'Rotasi Likuiditas: Bitcoin Dominance (BTC.D) & Altseason Index',
    subtitle: 'Macro Cycle (BTC.D) ➔ ETH/BTC Ratio ➔ Large Caps ➔ Altseason Mania',
    showCandles: false,
    showVolume: false,
    showEma: false,
    description: 'Blueprint lengkap kurva siklus BTC.D, gelombang struktur ETH/BTC, fokus zoom LTF Shift CHoCH, kartu fase rotasi modal, dan legend.',
    candles: [
      { open: 100, high: 110, low: 90, close: 105, label: 'Q1 (BTC)' },
      { open: 105, high: 125, low: 100, close: 120, label: 'Peak BTC.D' },
      { open: 120, high: 135, low: 110, close: 128, label: 'Distribution' },
      { open: 128, high: 140, low: 115, close: 122, label: 'ETH/BTC Up' },
      { open: 122, high: 130, low: 95, close: 102, label: 'BTC.D Drop' },
      { open: 102, high: 115, low: 85, close: 92, label: 'Large Caps' },
      { open: 92, high: 145, low: 88, close: 138, label: 'Altseason' },
      { open: 138, high: 165, low: 130, close: 160, label: 'Climax' },
      { open: 160, high: 170, low: 120, close: 135, label: 'Reset' },
      { open: 135, high: 168, low: 130, close: 162, label: 'Expansion' }
    ],
    suggestedPolylines: [
      {
        label: 'Daily Macro Wave (BTC.D Bias)',
        color: '#FACC15',
        strokeWidth: 3.5,
        lineStyle: 'dashed',
        curveType: 'smooth',
        showDots: false,
        points: [
          { index: 0, price: 95 },
          { index: 2, price: 162 },
          { index: 5, price: 92 },
          { index: 7, price: 148 },
          { index: 9, price: 158 }
        ]
      },
      {
        label: 'MTF Structure (ETH/BTC & Large Caps)',
        color: '#38BDF8',
        strokeWidth: 2.5,
        lineStyle: 'solid',
        curveType: 'zigzag',
        showDots: true,
        points: [
          { index: 0, price: 95 },
          { index: 1, price: 125 },
          { index: 2, price: 110 },
          { index: 3, price: 152 },
          { index: 4, price: 128 },
          { index: 5, price: 164 },
          { index: 6, price: 95 },
          { index: 7, price: 118 },
          { index: 8, price: 104 },
          { index: 9, price: 162 }
        ]
      },
      {
        label: 'LTF Micro Fractal (Altseason Shift)',
        color: '#10B981',
        strokeWidth: 2,
        lineStyle: 'solid',
        curveType: 'zigzag',
        showDots: true,
        points: [
          { index: 3, price: 112 },
          { index: 4, price: 138 },
          { index: 5, price: 124 },
          { index: 6, price: 156 },
          { index: 7, price: 102 }
        ]
      }
    ],
    suggestedBoxes: [
      {
        startIndex: 3,
        endIndex: 6,
        topPrice: 160,
        bottomPrice: 98,
        label: 'Zoom LTF (M5/M1 Altseason Shift)',
        color: '#38BDF8',
        borderStyle: 'dashed',
        showMidLine: false
      }
    ],
    suggestedBadges: [
      { candleIndex: 5, price: 166, text: 'CHoCH!', color: '#F43F5E', textColor: '#FFFFFF', style: 'badge' },
      { candleIndex: 2, price: 165, text: 'BTC.D Peak (60%)', color: '#FACC15', textColor: '#000000', style: 'pill' }
    ],
    suggestedInfoCards: [
      {
        candleIndex: 1,
        price: 105,
        width: 155,
        stepBadge: '1',
        title: 'FASE 1: BTC SURGE',
        lines: ['Arus modal institusi ke BTC', 'Altcoin tertahan di dasar'],
        footerBadge: '✓ Akumulasi ETH & L1',
        color: '#FACC15'
      },
      {
        candleIndex: 7,
        price: 152,
        width: 165,
        stepBadge: '2',
        title: 'FASE 2: ALTSEASON',
        lines: ['BTC.D patah struktur turun', 'Rotasi masif ke Mid/Low Cap'],
        footerBadge: '✓ Eksekusi Long Altcoin',
        color: '#10B981'
      }
    ],
    suggestedArrows: [
      {
        startIndex: 2,
        startPrice: 158,
        endIndex: 5,
        endPrice: 162,
        color: '#F8FAFC',
        curved: true,
        curveOffset: 15,
        label: 'Rotasi Likuiditas'
      }
    ],
    suggestedLegends: [
      { label: 'HTF Context (BTC.D Cycle)', color: '#FACC15' },
      { label: 'MTF Trend (ETH/BTC Ratio)', color: '#38BDF8' },
      { label: 'LTF Execution (Altseason Index)', color: '#10B981' }
    ]
  },
  {
    id: 'strong-weak-structure-blueprint',
    name: 'Strong (Protected) vs Weak (Targeted) Structure',
    category: 'Market Scenario',
    title: 'Strong (Protected) vs Weak (Targeted) High/Low',
    subtitle: 'Structural Invalidation & Liquidity Target Architecture',
    showCandles: false,
    showVolume: false,
    showEma: false,
    description: 'Ilustrasi gelombang struktur pasar dengan garis BOS, kartu Strong Low (tempat aman SL), dan Weak High (target likuiditas).',
    candles: [
      { open: 90, high: 100, low: 85, close: 95, label: 'HL 0' },
      { open: 95, high: 145, low: 92, close: 140, label: 'HH 1' },
      { open: 140, high: 142, low: 112, close: 115, label: 'Strong HL 1' },
      { open: 115, high: 145, low: 114, close: 142, label: 'BOS 1' },
      { open: 142, high: 168, low: 138, close: 165, label: 'HH 2' },
      { open: 165, high: 166, low: 132, close: 135, label: 'Strong HL 2' },
      { open: 135, high: 168, low: 134, close: 166, label: 'BOS 2' },
      { open: 166, high: 185, low: 160, close: 180, label: 'Weak High' },
      { open: 180, high: 182, low: 140, close: 145, label: 'Pullback' }
    ],
    suggestedPolylines: [
      {
        label: 'Swing Price Structure',
        color: '#F8FAFC',
        strokeWidth: 3,
        lineStyle: 'solid',
        curveType: 'zigzag',
        showDots: true,
        points: [
          { index: 0, price: 90 },
          { index: 1, price: 142 },
          { index: 2, price: 115 },
          { index: 4, price: 165 },
          { index: 5, price: 135 },
          { index: 7, price: 180 },
          { index: 8, price: 142 }
        ]
      }
    ],
    suggestedBadges: [
      { candleIndex: 2, price: 142, text: 'BOS', color: '#10B981', textColor: '#000000', style: 'badge' },
      { candleIndex: 5, price: 165, text: 'BOS', color: '#10B981', textColor: '#000000', style: 'badge' }
    ],
    suggestedInfoCards: [
      {
        candleIndex: 2,
        price: 102,
        width: 150,
        stepBadge: '✓',
        title: 'STRONG LOW (HL)',
        lines: ['Dilindungi Institusi', 'Tempat Aman Stop Loss'],
        footerBadge: 'Protected Level',
        color: '#10B981'
      },
      {
        candleIndex: 7,
        price: 170,
        width: 145,
        stepBadge: '$',
        title: 'WEAK HIGH (HH)',
        lines: ['Target Take Profit', 'Gagal Cetak Low Baru'],
        footerBadge: '$$$ Target BSL',
        color: '#F43F5E'
      }
    ],
    suggestedLegends: [
      { label: 'Protected Strong Low (SL Zone)', color: '#10B981' },
      { label: 'Targeted Weak High (TP Zone)', color: '#F43F5E' }
    ]
  },

  // --- FULL MARKET SCENARIOS (CANDLESTICK + ANNOTATIONS) ---
  {
    id: 'power-of-3-amd-scenario',
    name: 'Power of 3 (AMD: Accumulation, Manipulation, Distribution)',
    category: 'Market Scenario',
    title: 'ICT Power of 3 (Accumulation, Manipulation, Distribution)',
    subtitle: 'Asian Consolidation ➔ London Judas Sweep ➔ NY Expansion',
    showCandles: true,
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
    ],
    suggestedArrows: [
      {
        startIndex: 4,
        startPrice: 138,
        endIndex: 7,
        endPrice: 82,
        color: '#F43F5E',
        curved: true,
        curveOffset: 18,
        label: 'Aggressive Displacement'
      }
    ]
  },
  {
    id: 'wyckoff-spring-reversal-scenario',
    name: 'Wyckoff Accumulation Spring & Test',
    category: 'Market Scenario',
    title: 'Skematik Akumulasi Wyckoff: Fase C Spring & SOS',
    subtitle: 'Selling Climax ➔ Spring Stop-Hunt ➔ Low Volume Test ➔ Markup',
    showCandles: true,
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
  }
];

interface CandleTemplateTrayProps {
  onAddPreset: (preset: CandleTemplatePreset, replaceAll?: boolean) => void;
  onAddBlankCandle: (isBullish: boolean) => void;
  onQuickAddWave?: (curveType: 'zigzag' | 'smooth') => void;
  onQuickAddInfoCard?: () => void;
  onQuickAddArrow?: () => void;
}

export const CandleTemplateTray: React.FC<CandleTemplateTrayProps> = ({
  onAddPreset,
  onAddBlankCandle,
  onQuickAddWave,
  onQuickAddInfoCard,
  onQuickAddArrow
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Single Candle' | 'SMC Setup' | 'Market Scenario'>('All');

  const filteredPresets = selectedCategory === 'All'
    ? CANDLE_PRESETS
    : CANDLE_PRESETS.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-3.5">
      {/* Quick Add Elements & Objects */}
      <div className="bg-slate-50 dark:bg-[#0E131F] p-3 rounded-xl border border-slate-200 dark:border-zinc-800 space-y-2">
        <div className="text-[11px] font-mono font-bold text-slate-700 dark:text-zinc-300 flex items-center justify-between">
          <span className="flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Sisipkan Objek Cepat (1-Klik):</span>
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => onAddBlankCandle(true)}
            className="flex items-center justify-center space-x-1.5 py-1.5 px-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-lg text-[11px] font-mono font-bold transition-all"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+ Bullish Bar</span>
          </button>
          <button
            type="button"
            onClick={() => onAddBlankCandle(false)}
            className="flex items-center justify-center space-x-1.5 py-1.5 px-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 rounded-lg text-[11px] font-mono font-bold transition-all"
          >
            <TrendingDown className="w-3.5 h-3.5" />
            <span>+ Bearish Bar</span>
          </button>
          {onQuickAddWave && (
            <>
              <button
                type="button"
                onClick={() => onQuickAddWave('zigzag')}
                className="flex items-center justify-center space-x-1.5 py-1.5 px-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 rounded-lg text-[11px] font-mono font-bold transition-all"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>+ Zigzag Wave</span>
              </button>
              <button
                type="button"
                onClick={() => onQuickAddWave('smooth')}
                className="flex items-center justify-center space-x-1.5 py-1.5 px-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-lg text-[11px] font-mono font-bold transition-all"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>+ Macro Curve</span>
              </button>
            </>
          )}
          {onQuickAddInfoCard && (
            <button
              type="button"
              onClick={onQuickAddInfoCard}
              className="flex items-center justify-center space-x-1.5 py-1.5 px-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 rounded-lg text-[11px] font-mono font-bold transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>+ Kartu Info</span>
            </button>
          )}
          {onQuickAddArrow && (
            <button
              type="button"
              onClick={onQuickAddArrow}
              className="flex items-center justify-center space-x-1.5 py-1.5 px-2 bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 dark:text-pink-400 border border-pink-500/30 rounded-lg text-[11px] font-mono font-bold transition-all"
            >
              <CornerDownRight className="w-3.5 h-3.5" />
              <span>+ Panah Lengkung</span>
            </button>
          )}
        </div>
      </div>

      {/* Preset Category Filter Tabs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-zinc-300 flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Blueprint Skematik &amp; Formasi:</span>
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
        <div className="space-y-2 pr-1">
          {filteredPresets.map((preset) => {
            const isFullBlueprint = Boolean(preset.suggestedPolylines || preset.suggestedInfoCards);
            return (
              <div
                key={preset.id}
                className="p-3 bg-white dark:bg-[#121722] border border-slate-200 dark:border-zinc-800 hover:border-emerald-500 rounded-xl transition-all group shadow-2xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                    {preset.name}
                  </span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold flex-shrink-0 ${
                    isFullBlueprint
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : preset.category === 'Market Scenario'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'
                  }`}>
                    {isFullBlueprint ? 'Full Blueprint' : preset.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-snug mb-2.5">
                  {preset.description}
                </p>
                <div className="flex items-center gap-1.5">
                  {isFullBlueprint && (
                    <button
                      type="button"
                      onClick={() => onAddPreset(preset, true)}
                      className="flex-1 py-1.5 px-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-extrabold text-[10px] flex items-center justify-center space-x-1 transition-all"
                    >
                      <Zap className="w-3 h-3" />
                      <span>Muat Blueprint Utuh</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onAddPreset(preset, false)}
                    className={`py-1.5 px-2.5 rounded-lg border font-mono font-bold text-[10px] flex items-center justify-center space-x-1 transition-all ${
                      isFullBlueprint
                        ? 'bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 border-slate-300 dark:border-zinc-700'
                        : 'w-full bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    }`}
                  >
                    <span>+ Sisipkan ke Kanvas</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
