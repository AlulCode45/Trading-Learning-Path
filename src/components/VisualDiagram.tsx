import React from 'react';

interface VisualDiagramProps {
  type?: string;
}

function normalizeDiagramType(rawType?: string): string {
  if (!rawType) return 'candlestick_anatomy';
  const clean = rawType.toLowerCase().trim().replace(/[-_]+/g, '_');

  // Exact & direct aliases
  if (clean === 'candlestick' || clean === 'candlestick_anatomy' || clean === 'candlesticks') {
    return 'candlestick_anatomy';
  }
  if (clean === 'market_structure' || clean === 'market_participants' || clean === 'market_structure_participants') {
    return 'market_structure';
  }
  if (clean === 'swing_structure' || clean === 'structure') {
    return 'swing_structure';
  }
  if (clean === 'bos_choch' || clean === 'bos' || clean === 'choch' || clean === 'break_of_structure') {
    return 'bos_choch';
  }
  if (clean === 'strong_weak_levels' || clean === 'strong_weak' || clean === 'protected_highs_lows') {
    return 'strong_weak_levels';
  }
  if (clean === 'supply_demand_zones' || clean === 'supply_demand' || clean === 'snd') {
    return 'supply_demand_zones';
  }
  if (clean === 'order_block' || clean === 'orderblock' || clean === 'order_block_diagram') {
    return 'order_block_diagram';
  }
  if (clean === 'fvg_bpr_diagram' || clean === 'fvg' || clean === 'fvg_bpr' || clean === 'fair_value_gap') {
    return 'fvg_bpr_diagram';
  }
  if (clean === 'premium_discount' || clean === 'pd_array' || clean === 'discount_premium') {
    return 'premium_discount';
  }
  if (clean === 'liquidity_pools' || clean === 'liquidity' || clean === 'liquidity_pool') {
    return 'liquidity_pools';
  }
  if (clean === 'liquidity_sweep' || clean === 'sweep' || clean === 'turtle_soup') {
    return 'liquidity_sweep';
  }
  if (clean === 'asian_range_judas_diagram' || clean === 'asian_range' || clean === 'judas_swing') {
    return 'asian_range_judas_diagram';
  }
  if (clean === 'amd_power_of_3_diagram' || clean === 'amd' || clean === 'power_of_3' || clean === 'po3') {
    return 'amd_power_of_3_diagram';
  }
  if (clean === 'smt_divergence_diagram' || clean === 'smt' || clean === 'smt_divergence') {
    return 'smt_divergence_diagram';
  }
  if (clean === 'wyckoff_accumulation_schematic' || clean === 'wyckoff_accumulation' || clean === 'accumulation') {
    return 'wyckoff_accumulation_schematic';
  }
  if (clean === 'wyckoff_distribution_schematic' || clean === 'wyckoff_distribution' || clean === 'distribution') {
    return 'wyckoff_distribution_schematic';
  }
  if (clean === 'wyckoff_vsa_volume_spread' || clean === 'wyckoff_vsa' || clean === 'vsa' || clean === 'volume_spread_analysis') {
    return 'wyckoff_vsa_volume_spread';
  }
  if (clean === 'drawdown_recovery_curve' || clean === 'drawdown' || clean === 'drawdown_recovery') {
    return 'drawdown_recovery_curve';
  }
  if (clean === 'risk_position_sizing_calc' || clean === 'risk_position_sizing' || clean === 'position_sizing') {
    return 'risk_position_sizing_calc';
  }
  if (clean === 'risk_reward_calc' || clean === 'risk_reward' || clean === 'rrr') {
    return 'risk_reward_calc';
  }
  if (clean === 'trade_journaling' || clean === 'trade_journal' || clean === 'journal') {
    return 'trade_journaling';
  }
  if (clean === 'quant_time_series_stationarity_diagram' || clean === 'quant_time_series' || clean === 'stationarity') {
    return 'quant_time_series_stationarity_diagram';
  }
  if (clean === 'quant_monte_carlo_drawdown' || clean === 'monte_carlo' || clean === 'quant_monte_carlo') {
    return 'quant_monte_carlo_drawdown';
  }
  if (clean === 'orderbook_depth_l2' || clean === 'orderbook' || clean === 'orderbook_depth' || clean === 'level2') {
    return 'orderbook_depth_l2';
  }
  if (clean === 'entry_protocol' || clean === 'entry' || clean === 'checklist_entry') {
    return 'entry_protocol';
  }
  if (clean === 'multi_timeframe' || clean === 'mtf' || clean === 'timeframe') {
    return 'multi_timeframe';
  }

  // Fuzzy match fallback
  if (clean.includes('candlestick')) return 'candlestick_anatomy';
  if (clean.includes('timeframe')) return 'multi_timeframe';
  if (clean.includes('swing') || clean.includes('structure')) return 'swing_structure';
  if (clean.includes('bos') || clean.includes('choch')) return 'bos_choch';
  if (clean.includes('fvg') || clean.includes('gap')) return 'fvg_bpr_diagram';
  if (clean.includes('order') && clean.includes('block')) return 'order_block_diagram';
  if (clean.includes('sweep')) return 'liquidity_sweep';
  if (clean.includes('liquidity')) return 'liquidity_pools';
  if (clean.includes('judas') || clean.includes('asian')) return 'asian_range_judas_diagram';
  if (clean.includes('power') || clean.includes('amd')) return 'amd_power_of_3_diagram';
  if (clean.includes('smt') || clean.includes('divergence')) return 'smt_divergence_diagram';
  if (clean.includes('accumul')) return 'wyckoff_accumulation_schematic';
  if (clean.includes('distribut')) return 'wyckoff_distribution_schematic';
  if (clean.includes('vsa') || clean.includes('volume')) return 'wyckoff_vsa_volume_spread';
  if (clean.includes('sizing') || clean.includes('position')) return 'risk_position_sizing_calc';
  if (clean.includes('drawdown')) return 'drawdown_recovery_curve';
  if (clean.includes('journal')) return 'trade_journaling';
  if (clean.includes('monte') || clean.includes('carlo')) return 'quant_monte_carlo_drawdown';
  if (clean.includes('orderbook') || clean.includes('depth')) return 'orderbook_depth_l2';
  if (clean.includes('risk') || clean.includes('reward')) return 'risk_reward_calc';
  if (clean.includes('entry')) return 'entry_protocol';

  return 'candlestick_anatomy';
}

export const VisualDiagram: React.FC<VisualDiagramProps> = ({ type }) => {
  const normalized = normalizeDiagramType(type);

  switch (normalized) {
    case 'market_structure':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider font-bold">
              Hierarki Partisipan &amp; Ekosistem Likuiditas Pasar
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Institutional Order Flow Pyramid
            </span>
          </div>
          <svg viewBox="0 0 540 220" className="w-full max-w-lg h-56 select-none">
            {/* Pyramid Layers */}
            {/* Tier 1: Central Banks */}
            <polygon points="270,15 220,55 320,55" fill="rgba(245, 158, 11, 0.25)" stroke="#F59E0B" strokeWidth="1.5" />
            <text x="270" y="42" fill="#F59E0B" fontSize="9.5" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">
              Tier 1: Bank Sentral (The Fed, ECB, BOJ)
            </text>

            {/* Tier 2: Tier-1 Market Makers */}
            <polygon points="220,57 320,57 360,95 180,95" fill="rgba(16, 185, 129, 0.2)" stroke="#10B981" strokeWidth="1.5" />
            <text x="270" y="80" fill="#10B981" fontSize="9.5" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">
              Tier 2: Market Makers &amp; Tier-1 Banks (JP Morgan, Citi)
            </text>

            {/* Tier 3: Institutional Hedge Funds */}
            <polygon points="180,97 360,97 400,135 140,135" fill="rgba(56, 189, 248, 0.2)" stroke="#38BDF8" strokeWidth="1.5" />
            <text x="270" y="120" fill="#38BDF8" fontSize="9.5" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">
              Tier 3: Hedge Funds &amp; Algorithmic CTAs (Citadel, RenTech)
            </text>

            {/* Tier 4: Commercial Hedgers */}
            <polygon points="140,137 400,137 440,170 100,170" fill="rgba(168, 85, 247, 0.2)" stroke="#A855F7" strokeWidth="1.5" />
            <text x="270" y="157" fill="#C084FC" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">
              Tier 4: Commercial Entities &amp; Multinational Hedgers
            </text>

            {/* Tier 5: Retail Traders (Bottom) */}
            <polygon points="100,172 440,172 480,205 60,205" fill="rgba(244, 63, 94, 0.2)" stroke="#F43F5E" strokeWidth="1.5" />
            <text x="270" y="193" fill="#FB7185" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">
              Tier 5: Retail Traders (Kolam Likuiditas &amp; Stop Hunts)
            </text>
          </svg>
        </div>
      );

    case 'candlestick_anatomy':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#FACC15] uppercase tracking-wider font-bold">
              Anatomi Candlestick & Auction Market Theory
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Figure 1.1: Body vs Wick Dynamics
            </span>
          </div>
          <svg viewBox="0 0 520 220" className="w-full max-w-lg h-56 select-none">
            {/* Bullish Auction Candle */}
            <g transform="translate(60, 25)">
              <text x="50" y="5" fill="#10B981" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">
                Bullish Expansion Bar
              </text>
              {/* Upper wick */}
              <line x1="50" y1="15" x2="50" y2="45" stroke="#10B981" strokeWidth="3" />
              {/* Real Body */}
              <rect x="25" y="45" width="50" height="95" fill="#10B981" stroke="#000" strokeWidth="1.5" rx="3" />
              {/* Lower wick */}
              <line x1="50" y1="140" x2="50" y2="175" stroke="#10B981" strokeWidth="3" />
              
              {/* Labels & Callouts */}
              <circle cx="50" cy="15" r="3.5" fill="#FACC15" />
              <text x="90" y="20" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">High (Pucuk Lelang)</text>
              
              <line x1="75" y1="45" x2="110" y2="45" stroke="#10B981" strokeDasharray="3 3" />
              <text x="115" y="49" fill="#F8FAFC" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">Close (Pemenang Buyer)</text>
              
              <text x="115" y="95" fill="#10B981" fontSize="10" fontFamily="JetBrains Mono">Real Body (Volume Komitmen)</text>
              
              <line x1="75" y1="140" x2="110" y2="140" stroke="#10B981" strokeDasharray="3 3" />
              <text x="115" y="144" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">Open (Pembukaan Sesi)</text>
              
              <circle cx="50" cy="175" r="3.5" fill="#FACC15" />
              <text x="90" y="180" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">Low (Lembah Penyerapan)</text>
            </g>

            {/* Bearish Absorption / Rejection Wick Candle */}
            <g transform="translate(320, 25)">
              <text x="50" y="5" fill="#F43F5E" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">
                Aggressive Rejection Wick
              </text>
              {/* Massive Upper Wick */}
              <line x1="50" y1="15" x2="50" y2="105" stroke="#F43F5E" strokeWidth="3.5" />
              {/* Squeeze Body */}
              <rect x="30" y="105" width="40" height="35" fill="#F43F5E" stroke="#000" strokeWidth="1.5" rx="3" />
              {/* Tiny lower wick */}
              <line x1="50" y1="140" x2="50" y2="160" stroke="#F43F5E" strokeWidth="3" />
              
              {/* Rejection indicator bracket */}
              <path d="M 80,20 L 95,20 L 95,100 L 80,100" fill="none" stroke="#F43F5E" strokeWidth="1.5" />
              <text x="105" y="55" fill="#F43F5E" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">Penolakan Harga</text>
              <text x="105" y="70" fill="#F43F5E" fontSize="9" fontFamily="JetBrains Mono">(Institutional Absorption)</text>

              <text x="80" y="125" fill="#F8FAFC" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">Close di Dasar</text>
              <text x="80" y="137" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono">(Seller Ambil Alih)</text>
            </g>
          </svg>
        </div>
      );

    case 'multi_timeframe':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider font-bold">
              Fraktalitas Multi-Timeframe (Top-Down Alignment)
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Macro Bias (Daily) ➔ Structure (H1) ➔ Execution (M5/M1)
            </span>
          </div>
          <svg viewBox="0 0 540 210" className="w-full max-w-lg h-52 select-none">
            {/* HTF Macro Wave (Daily) - Thick Gold dotted curve */}
            <path 
              d="M 30,170 Q 140,20 270,170 T 510,40" 
              fill="none" 
              stroke="#FACC15" 
              strokeWidth="4" 
              strokeDasharray="6 6"
              strokeOpacity="0.85" 
            />
            <text x="40" y="35" fill="#FACC15" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">
              Daily Macro Wave (HTF Bias)
            </text>

            {/* MTF Waves (H1 Structure) - Blue Line */}
            <polyline 
              points="30,170 70,110 100,140 140,50 180,95 230,30 270,170 320,130 360,150 420,80 460,110 510,40" 
              fill="none" 
              stroke="#38BDF8" 
              strokeWidth="2.5" 
            />

            {/* LTF Micro Fractal Waves (M5/M1 Execution) */}
            <g transform="translate(140, 50)" opacity="0.9">
              <rect x="-15" y="-10" width="165" height="135" fill="rgba(56, 189, 248, 0.08)" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" rx="6" />
              <text x="0" y="8" fill="#38BDF8" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">Zoom LTF (M5/M1 Shift)</text>
              <polyline 
                points="0,85 20,40 35,60 55,20 70,40 90,5 110,120" 
                fill="none" 
                stroke="#10B981" 
                strokeWidth="1.8" 
              />
              <circle cx="90" cy="5" r="3" fill="#F43F5E" />
              <text x="96" y="8" fill="#F43F5E" fontSize="8" fontWeight="bold" fontFamily="JetBrains Mono">CHoCH</text>
            </g>

            {/* Legend */}
            <g transform="translate(30, 195)">
              <circle cx="5" cy="-4" r="4" fill="#FACC15" />
              <text x="15" y="0" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">HTF Context (Daily)</text>
              <circle cx="160" cy="-4" r="4" fill="#38BDF8" />
              <text x="170" y="0" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">MTF Trend (H1)</text>
              <circle cx="285" cy="-4" r="4" fill="#10B981" />
              <text x="295" y="0" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">LTF Execution (M5/M1)</text>
            </g>
          </svg>
        </div>
      );

    case 'swing_structure':
    case 'strong_weak_levels':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#10B981] uppercase tracking-wider font-bold">
              Strong (Protected) vs Weak (Targeted) High/Low
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Structural Invalidation Architecture
            </span>
          </div>
          <svg viewBox="0 0 520 200" className="w-full max-w-lg h-52 select-none">
            {/* Price Line */}
            <polyline 
              points="40,160 110,60 160,110 260,30 320,80 430,20 480,100" 
              fill="none" 
              stroke="#F8FAFC" 
              strokeWidth="2.75" 
            />

            {/* BOS Lines */}
            <line x1="110" y1="60" x2="260" y2="60" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
            <rect x="170" y="48" width="40" height="18" fill="#10B981" rx="3" />
            <text x="178" y="61" fill="#000" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">BOS</text>

            <line x1="260" y1="30" x2="430" y2="30" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
            <rect x="330" y="18" width="40" height="18" fill="#10B981" rx="3" />
            <text x="338" y="31" fill="#000" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">BOS</text>

            {/* Strong Low 1 (Protected) */}
            <circle cx="160" cy="110" r="5" fill="#10B981" stroke="#000" strokeWidth="2" />
            <rect x="100" y="125" width="125" height="42" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" strokeWidth="1" rx="4" />
            <text x="108" y="140" fill="#10B981" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">STRONG LOW (HL)</text>
            <text x="108" y="153" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono">Dilindungi Institusi</text>
            <text x="108" y="163" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono">Tempat Aman Stop Loss</text>

            {/* Strong Low 2 (Protected) */}
            <circle cx="320" cy="80" r="5" fill="#10B981" stroke="#000" strokeWidth="2" />
            <rect x="280" y="95" width="130" height="42" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" strokeWidth="1" rx="4" />
            <text x="288" y="110" fill="#10B981" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">STRONG LOW (HL)</text>
            <text x="288" y="123" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono">Sukses Picu BOS Baru</text>

            {/* Weak High (Targeted) */}
            <circle cx="430" cy="20" r="5" fill="#F43F5E" stroke="#000" strokeWidth="2" />
            <rect x="390" y="30" width="120" height="40" fill="rgba(244, 63, 94, 0.15)" stroke="#F43F5E" strokeWidth="1" rx="4" />
            <text x="398" y="44" fill="#F43F5E" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">WEAK HIGH</text>
            <text x="398" y="56" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono">Target Take Profit</text>
            <text x="398" y="66" fill="#FACC15" fontSize="8" fontFamily="JetBrains Mono">$$$ Likuiditas BSL</text>
          </svg>
        </div>
      );

    case 'bos_choch':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#FACC15] uppercase tracking-wider font-bold">
              Break of Structure (BOS) vs Change of Character (CHoCH)
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Tren Kelanjutan vs Pergeseran Arah Awal
            </span>
          </div>
          <svg viewBox="0 0 520 200" className="w-full max-w-lg h-52 select-none">
            {/* Price Line */}
            <polyline 
              points="30,150 90,80 130,120 210,40 260,95 330,30 390,150 440,105 490,175" 
              fill="none" 
              stroke="#F8FAFC" 
              strokeWidth="2.75" 
            />

            {/* BOS 1 */}
            <line x1="90" y1="80" x2="215" y2="80" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
            <rect x="135" y="68" width="45" height="18" fill="#10B981" rx="3" />
            <text x="144" y="81" fill="#000" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">BOS</text>

            {/* BOS 2 */}
            <line x1="210" y1="40" x2="335" y2="40" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
            <rect x="255" y="28" width="45" height="18" fill="#10B981" rx="3" />
            <text x="264" y="41" fill="#000" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">BOS</text>

            {/* CHoCH Level at Key Protected Higher Low */}
            <line x1="260" y1="95" x2="410" y2="95" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="4 4" />
            <rect x="330" y="83" width="60" height="20" fill="#F59E0B" rx="3" />
            <text x="338" y="97" fill="#000" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">CHoCH!</text>

            {/* Explanation box */}
            <rect x="360" y="125" width="145" height="45" fill="rgba(245, 158, 11, 0.12)" stroke="#F59E0B" strokeWidth="1" rx="4" />
            <text x="368" y="140" fill="#F59E0B" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">Pergeseran Karakter</text>
            <text x="368" y="152" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono">Higher Low Terakhir Ditembus</text>
            <text x="368" y="162" fill="#F43F5E" fontSize="8" fontFamily="JetBrains Mono">Tren Berbalik Bearish</text>
          </svg>
        </div>
      );

    case 'supply_demand_zones':
    case 'fvg_bpr_diagram':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#C084FC] uppercase tracking-wider font-bold">
              Fair Value Gap (FVG) & Imbalance 3-Candle
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Consequent Encroachment (50% Rebalance)
            </span>
          </div>
          <svg viewBox="0 0 520 210" className="w-full max-w-lg h-56 select-none">
            {/* Candle 1 (Bullish setup) */}
            <g transform="translate(60, 40)">
              <line x1="30" y1="20" x2="30" y2="40" stroke="#10B981" strokeWidth="2.5" />
              <rect x="15" y="40" width="30" height="60" fill="#10B981" stroke="#000" strokeWidth="1" rx="2" />
              <line x1="30" y1="100" x2="30" y2="120" stroke="#10B981" strokeWidth="2.5" />
              <text x="30" y="140" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">Candle 1</text>
            </g>

            {/* Candle 2 (Giant Impulse Displacement) */}
            <g transform="translate(130, 10)">
              <line x1="30" y1="5" x2="30" y2="20" stroke="#10B981" strokeWidth="3" />
              <rect x="10" y="20" width="40" height="135" fill="#10B981" stroke="#000" strokeWidth="1.5" rx="3" />
              <line x1="30" y1="155" x2="30" y2="170" stroke="#10B981" strokeWidth="3" />
              <text x="30" y="185" fill="#10B981" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">Candle 2 (Impuls)</text>
            </g>

            {/* Candle 3 (Next bar) */}
            <g transform="translate(210, 20)">
              <line x1="30" y1="5" x2="30" y2="15" stroke="#10B981" strokeWidth="2.5" />
              <rect x="15" y="15" width="30" height="45" fill="#10B981" stroke="#000" strokeWidth="1" rx="2" />
              <line x1="30" y1="60" x2="30" y2="80" stroke="#10B981" strokeWidth="2.5" />
              <text x="30" y="140" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">Candle 3</text>
            </g>

            {/* Fair Value Gap (Shaded Box) */}
            {/* Between Candle 1 High (y=60 on candle, absolute 40+20=60) and Candle 3 Low (y=80 on candle, absolute 20+80=100) */}
            <rect x="180" y="80" width="220" height="40" fill="rgba(192, 132, 252, 0.22)" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="4 4" rx="4" />
            <text x="290" y="98" fill="#C084FC" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">
              FAIR VALUE GAP (BISI)
            </text>

            {/* Consequent Encroachment (50% FVG line) */}
            <line x1="180" y1="100" x2="400" y2="100" stroke="#FACC15" strokeWidth="2" strokeDasharray="3 3" />
            <rect x="405" y="91" width="100" height="18" fill="#FACC15" rx="3" />
            <text x="410" y="104" fill="#000" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">50% CE (Target)</text>

            {/* Pullback test arrow */}
            <path d="M 270,30 Q 320,60 330,95" fill="none" stroke="#F8FAFC" strokeWidth="2" strokeDasharray="3 3" />
            <polygon points="330,95 324,87 334,87" fill="#F8FAFC" />
            <text x="340" y="65" fill="#F8FAFC" fontSize="9" fontFamily="JetBrains Mono">Pullback Retest</text>
          </svg>
        </div>
      );

    case 'premium_discount':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#F43F5E] uppercase tracking-wider font-bold">
              Premium vs Discount Equilibrium (Auction Market Pricing)
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Prinsip Harga Grosir Institusi
            </span>
          </div>
          <svg viewBox="0 0 520 200" className="w-full max-w-lg h-52 select-none">
            {/* Swing High Reference */}
            <text x="25" y="25" fill="#F43F5E" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">100%</text>
            <line x1="60" y1="20" x2="480" y2="20" stroke="#F43F5E" strokeWidth="2" strokeDasharray="4 4" />
            <text x="70" y="15" fill="#F43F5E" fontSize="10" fontFamily="JetBrains Mono">Swing High (Pucuk Dealing Range)</text>

            {/* Premium Zone Box */}
            <rect x="60" y="20" width="420" height="75" fill="rgba(244, 63, 94, 0.12)" stroke="#F43F5E" strokeWidth="1" rx="4" />
            <text x="80" y="45" fill="#F43F5E" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono">
              PREMIUM PRICING ZONE (&gt; 50%)
            </text>
            <text x="80" y="62" fill="#CBD5E1" fontSize="10" fontFamily="JetBrains Mono">
              Area Harga Mahal — Institusi Menjual ke Retail (Hanya Cari Setup SELL)
            </text>

            {/* 50% Equilibrium Line */}
            <text x="25" y="100" fill="#FACC15" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">50%</text>
            <line x1="50" y1="95" x2="490" y2="95" stroke="#FACC15" strokeWidth="3" strokeDasharray="6 6" />
            <rect x="180" y="85" width="160" height="20" fill="#FACC15" rx="3" />
            <text x="188" y="99" fill="#000" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">
              EQUILIBRIUM (Fair Value)
            </text>

            {/* Discount Zone Box */}
            <rect x="60" y="95" width="420" height="75" fill="rgba(16, 185, 129, 0.12)" stroke="#10B981" strokeWidth="1" rx="4" />
            <text x="80" y="125" fill="#10B981" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono">
              DISCOUNT PRICING ZONE (&lt; 50%)
            </text>
            <text x="80" y="142" fill="#CBD5E1" fontSize="10" fontFamily="JetBrains Mono">
              Area Harga Murah Grosir — Institusi Akumulasi Beli (Hanya Cari Setup BUY)
            </text>

            {/* Swing Low Reference */}
            <text x="30" y="175" fill="#10B981" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">0%</text>
            <line x1="60" y1="170" x2="480" y2="170" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" />
            <text x="70" y="185" fill="#10B981" fontSize="10" fontFamily="JetBrains Mono">Swing Low (Dasar Dealing Range)</text>
          </svg>
        </div>
      );

    case 'liquidity_pools':
    case 'liquidity_sweep':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#FACC15] uppercase tracking-wider font-bold">
              Kolam Likuiditas (BSL/SSL) & Protokol Turtle Soup Sweep
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Anatomi Jebakan Stop-Hunt
            </span>
          </div>
          <svg viewBox="0 0 520 210" className="w-full max-w-lg h-56 select-none">
            {/* Equal Highs / Retail Resistance */}
            <line x1="60" y1="75" x2="440" y2="75" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" />
            <text x="70" y="65" fill="#38BDF8" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">
              Resistensi Retail / Equal Highs (EQH)
            </text>
            <rect x="230" y="45" width="130" height="22" fill="#FACC15" rx="3" />
            <text x="238" y="60" fill="#000" fontSize="11" fontWeight="extrabold" fontFamily="JetBrains Mono">
              $$$ POOL BSL $$$
            </text>

            {/* Price Movement Line */}
            <polyline 
              points="40,150 110,75 160,120 220,75 270,125 330,35 370,170 410,130 470,185" 
              fill="none" 
              stroke="#F8FAFC" 
              strokeWidth="2.75" 
            />

            {/* Liquidity Sweep Wick Highlight */}
            <circle cx="330" cy="35" r="5" fill="#F43F5E" stroke="#FFF" strokeWidth="1.5" />
            <line x1="330" y1="35" x2="330" y2="75" stroke="#F43F5E" strokeWidth="2.5" />
            <rect x="345" y="20" width="140" height="35" fill="rgba(244, 63, 94, 0.2)" stroke="#F43F5E" strokeWidth="1" rx="4" />
            <text x="352" y="34" fill="#F43F5E" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">SWEEP WICK!</text>
            <text x="352" y="46" fill="#CBD5E1" fontSize="8" fontFamily="JetBrains Mono">Retail Stop Loss Terpicu</text>

            {/* Displacement Arrow Down */}
            <path d="M 345,70 Q 370,105 365,150" fill="none" stroke="#F43F5E" strokeWidth="3" />
            <polygon points="365,150 358,142 370,142" fill="#F43F5E" />
            <text x="380" y="115" fill="#F43F5E" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">
              Displacement Agresif
            </text>
          </svg>
        </div>
      );

    case 'entry_protocol':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#10B981] uppercase tracking-wider font-bold">
              Protokol Eksekusi 3 Langkah (HTF Key Zone ➔ LTF Shift Entry)
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              SOP Konfirmasi Presisi
            </span>
          </div>
          <svg viewBox="0 0 520 200" className="w-full max-w-lg h-52 select-none">
            {/* Step 1 Box */}
            <g transform="translate(20, 30)">
              <rect x="0" y="0" width="145" height="135" fill="rgba(56, 189, 248, 0.1)" stroke="#38BDF8" strokeWidth="1.5" rx="6" />
              <circle cx="20" cy="20" r="10" fill="#38BDF8" />
              <text x="16" y="24" fill="#000" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">1</text>
              <text x="38" y="24" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">HTF POI REACHED</text>
              <text x="12" y="55" fill="#F8FAFC" fontSize="10" fontFamily="JetBrains Mono">Harga memasuki</text>
              <text x="12" y="70" fill="#F8FAFC" fontSize="10" fontFamily="JetBrains Mono">zona Demand H4</text>
              <text x="12" y="85" fill="#F8FAFC" fontSize="10" fontFamily="JetBrains Mono">di area Discount</text>
              <rect x="12" y="102" width="120" height="20" fill="rgba(16, 185, 129, 0.2)" rx="3" />
              <text x="18" y="115" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">✓ Sweep Liquidity</text>
            </g>

            {/* Connecting Arrow 1 */}
            <path d="M 170,95 L 195,95" stroke="#FACC15" strokeWidth="2.5" />
            <polygon points="195,95 188,90 188,100" fill="#FACC15" />

            {/* Step 2 Box */}
            <g transform="translate(200, 30)">
              <rect x="0" y="0" width="145" height="135" fill="rgba(250, 204, 21, 0.1)" stroke="#FACC15" strokeWidth="1.5" rx="6" />
              <circle cx="20" cy="20" r="10" fill="#FACC15" />
              <text x="16" y="24" fill="#000" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">2</text>
              <text x="38" y="24" fill="#FACC15" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">LTF SHIFT (M5)</text>
              <text x="12" y="55" fill="#F8FAFC" fontSize="10" fontFamily="JetBrains Mono">Tunggu struktur</text>
              <text x="12" y="70" fill="#F8FAFC" fontSize="10" fontFamily="JetBrains Mono">membentuk CHoCH</text>
              <text x="12" y="85" fill="#F8FAFC" fontSize="10" fontFamily="JetBrains Mono">dengan candle tebal</text>
              <rect x="12" y="102" width="120" height="20" fill="rgba(245, 158, 11, 0.2)" rx="3" />
              <text x="18" y="115" fill="#F59E0B" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">✓ Displacement MSS</text>
            </g>

            {/* Connecting Arrow 2 */}
            <path d="M 350,95 L 375,95" stroke="#FACC15" strokeWidth="2.5" />
            <polygon points="375,95 368,90 368,100" fill="#FACC15" />

            {/* Step 3 Box */}
            <g transform="translate(380, 30)">
              <rect x="0" y="0" width="135" height="135" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" strokeWidth="2" rx="6" />
              <circle cx="20" cy="20" r="10" fill="#10B981" />
              <text x="16" y="24" fill="#000" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">3</text>
              <text x="38" y="24" fill="#10B981" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">EXECUTION LIMIT</text>
              <text x="12" y="55" fill="#F8FAFC" fontSize="10" fontFamily="JetBrains Mono">Limit Buy di FVG</text>
              <text x="12" y="70" fill="#F8FAFC" fontSize="10" fontFamily="JetBrains Mono">SL di bawah Low</text>
              <text x="12" y="85" fill="#F8FAFC" fontSize="10" fontFamily="JetBrains Mono">Target TP 1:3 R:R</text>
              <rect x="12" y="102" width="110" height="20" fill="#10B981" rx="3" />
              <text x="20" y="115" fill="#000" fontSize="10" fontWeight="extrabold" fontFamily="JetBrains Mono">ORDER ACTIVE</text>
            </g>
          </svg>
        </div>
      );

    case 'risk_reward_calc':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#10B981] uppercase tracking-wider font-bold">
              Asymmetric Risk-to-Reward Ratio (1:3 R:R Asymmetry)
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Matematika Edge Finansial
            </span>
          </div>
          <svg viewBox="0 0 520 200" className="w-full max-w-lg h-52 select-none">
            {/* Take Profit Target Box */}
            <rect x="70" y="20" width="380" height="80" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" strokeWidth="2" rx="4" />
            <text x="90" y="45" fill="#10B981" fontSize="13" fontWeight="bold" fontFamily="JetBrains Mono">
              TARGET TAKE PROFIT (+3.0 R)
            </text>
            <text x="90" y="65" fill="#F8FAFC" fontSize="11" fontFamily="JetBrains Mono">
              Potensi Keuntungan: +$300.00 (3% Modal)
            </text>
            <text x="90" y="82" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono">
              Ditempatkan pada Weak Highs / Liquidity Pool Lawan
            </text>

            {/* Entry Line */}
            <line x1="50" y1="100" x2="470" y2="100" stroke="#38BDF8" strokeWidth="3" />
            <rect x="70" y="90" width="160" height="20" fill="#38BDF8" rx="3" />
            <text x="78" y="104" fill="#000" fontSize="10" fontWeight="extrabold" fontFamily="JetBrains Mono">
              HARGA ENTRY (BUY LIMIT)
            </text>

            {/* Stop Loss Box */}
            <rect x="70" y="100" width="380" height="45" fill="rgba(244, 63, 94, 0.15)" stroke="#F43F5E" strokeWidth="2" rx="4" />
            <text x="90" y="125" fill="#F43F5E" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono">
              STOP LOSS (-1.0 R)
            </text>
            <text x="250" y="125" fill="#F8FAFC" fontSize="10" fontFamily="JetBrains Mono">
              Risiko Terukur: -$100.00 (Tepat 1% Modal)
            </text>
            <text x="90" y="138" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono">
              Diletakkan di luar Protected Swing Extremum
            </text>

            {/* Win Rate Breakeven Indicator */}
            <text x="70" y="175" fill="#FACC15" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
              ★ Tingkat Kemenangan Minimum Untuk Impas (Breakeven Win Rate): HANYA 25.0%!
            </text>
          </svg>
        </div>
      );

    case 'trade_journaling':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider font-bold">
              Siklus Audit & Feedback Loop Jurnal Trading
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Evaluasi Objektif Bebas Bias Emosi
            </span>
          </div>
          <svg viewBox="0 0 520 180" className="w-full max-w-lg h-48 select-none">
            {/* Step 1: Pre-Trade */}
            <g transform="translate(30, 30)">
              <rect x="0" y="0" width="130" height="90" fill="rgba(56, 189, 248, 0.12)" stroke="#38BDF8" strokeWidth="1.5" rx="6" />
              <text x="12" y="24" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">1. Pra-Eksekusi</text>
              <text x="12" y="45" fill="#CBD5E1" fontSize="9" fontFamily="JetBrains Mono">• Screenshot HTF</text>
              <text x="12" y="60" fill="#CBD5E1" fontSize="9" fontFamily="JetBrains Mono">• Alasan Logis Entry</text>
              <text x="12" y="75" fill="#CBD5E1" fontSize="9" fontFamily="JetBrains Mono">• Hitung Lot 1% SL</text>
            </g>

            {/* Arrow 1 */}
            <path d="M 165,75 L 185,75" stroke="#38BDF8" strokeWidth="2" />
            <polygon points="185,75 178,70 178,80" fill="#38BDF8" />

            {/* Step 2: In-Trade */}
            <g transform="translate(195, 30)">
              <rect x="0" y="0" width="130" height="90" fill="rgba(250, 204, 21, 0.12)" stroke="#FACC15" strokeWidth="1.5" rx="6" />
              <text x="12" y="24" fill="#FACC15" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">2. Saat Posisi</text>
              <text x="12" y="45" fill="#CBD5E1" fontSize="9" fontFamily="JetBrains Mono">• Catat Emosi (FOMO?)</text>
              <text x="12" y="60" fill="#CBD5E1" fontSize="9" fontFamily="JetBrains Mono">• Patuhi Rule BE</text>
              <text x="12" y="75" fill="#CBD5E1" fontSize="9" fontFamily="JetBrains Mono">• Jangan Sentuh SL</text>
            </g>

            {/* Arrow 2 */}
            <path d="M 330,75 L 350,75" stroke="#FACC15" strokeWidth="2" />
            <polygon points="350,75 343,70 343,80" fill="#FACC15" />

            {/* Step 3: Post-Trade Review */}
            <g transform="translate(360, 30)">
              <rect x="0" y="0" width="130" height="90" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" strokeWidth="1.5" rx="6" />
              <text x="12" y="24" fill="#10B981" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">3. Pasca-Review</text>
              <text x="12" y="45" fill="#CBD5E1" fontSize="9" fontFamily="JetBrains Mono">• Screenshot Exit</text>
              <text x="12" y="60" fill="#CBD5E1" fontSize="9" fontFamily="JetBrains Mono">• Catat R-Multiple</text>
              <text x="12" y="75" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">• Skor Disiplin (1-10)</text>
            </g>

            {/* Feedback Loop Curved Arrow */}
            <path d="M 425,125 Q 260,175 95,125" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" />
            <polygon points="95,125 105,122 101,131" fill="#10B981" />
            <text x="210" y="160" fill="#10B981" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
              Loop Peningkatan Berkelanjutan
            </text>
          </svg>
        </div>
      );

    case 'order_block_diagram':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider font-bold">
              Bullish Order Block (OB) & Mean Threshold (50% Body)
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Jejak Pembelian Institusional
            </span>
          </div>
          <svg viewBox="0 0 520 200" className="w-full max-w-lg h-52 select-none">
            {/* Liquidity Sweep Low on previous swing */}
            <line x1="30" y1="130" x2="160" y2="130" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="35" y="122" fill="#F43F5E" fontSize="9" fontFamily="JetBrains Mono">Old Low (Sweep Likuiditas)</text>

            {/* Bullish Order Block (Bearish Candle before explosive rally) */}
            <g transform="translate(130, 40)">
              <line x1="25" y1="20" x2="25" y2="40" stroke="#F43F5E" strokeWidth="2.5" />
              <rect x="10" y="40" width="30" height="70" fill="#F43F5E" stroke="#000" strokeWidth="1.5" rx="2" />
              <line x1="25" y1="110" x2="25" y2="135" stroke="#F43F5E" strokeWidth="2.5" />
              <circle cx="25" cy="135" r="3" fill="#FACC15" />

              {/* Mean Threshold (50% body) Line */}
              <line x1="0" y1="75" x2="180" y2="75" stroke="#FACC15" strokeWidth="2" strokeDasharray="3 3" />
              <rect x="120" y="65" width="130" height="18" fill="#FACC15" rx="3" />
              <text x="126" y="78" fill="#000" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">Mean Threshold (50%)</text>
              <text x="10" y="150" fill="#F43F5E" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">ORDER BLOCK</text>
            </g>

            {/* Big Bullish Displacement Candles */}
            <g transform="translate(195, 10)">
              <line x1="20" y1="10" x2="20" y2="150" stroke="#10B981" strokeWidth="3" />
              <rect x="5" y="25" width="30" height="110" fill="#10B981" stroke="#000" strokeWidth="1.5" rx="2" />
            </g>
            <g transform="translate(245, 0)">
              <line x1="20" y1="5" x2="20" y2="120" stroke="#10B981" strokeWidth="3" />
              <rect x="5" y="15" width="30" height="85" fill="#10B981" stroke="#000" strokeWidth="1.5" rx="2" />
            </g>

            {/* Retest to Mean Threshold */}
            <path d="M 290,30 Q 340,75 350,115 T 380,115" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="4 4" />
            <polygon points="380,115 373,110 373,120" fill="#38BDF8" />
            <rect x="360" y="125" width="140" height="35" fill="rgba(56, 189, 248, 0.15)" stroke="#38BDF8" strokeWidth="1" rx="4" />
            <text x="368" y="140" fill="#38BDF8" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">Re-Mitigation Entry</text>
            <text x="368" y="152" fill="#F8FAFC" fontSize="9" fontFamily="JetBrains Mono">Pantulan dari MT 50%</text>
          </svg>
        </div>
      );

    case 'asian_range_judas_diagram':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#FACC15] uppercase tracking-wider font-bold">
              Asian Range Accumulation & London Judas Swing Trap
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Siklus Waktu & Likuiditas ICT
            </span>
          </div>
          <svg viewBox="0 0 520 200" className="w-full max-w-lg h-52 select-none">
            {/* Asian Range Box (Tokyo 20:00 - 00:00 EST) */}
            <rect x="40" y="65" width="150" height="65" fill="rgba(250, 204, 21, 0.12)" stroke="#FACC15" strokeWidth="1.5" strokeDasharray="4 4" rx="4" />
            <text x="50" y="82" fill="#FACC15" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">ASIAN RANGE</text>
            <text x="50" y="95" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono">20:00 - 00:00 EST</text>
            <text x="50" y="118" fill="#CBD5E1" fontSize="9" fontFamily="JetBrains Mono">Konsolidasi Rapat</text>

            {/* Asian High / Low lines extending */}
            <line x1="40" y1="65" x2="480" y2="65" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="200" y="58" fill="#F43F5E" fontSize="9" fontFamily="JetBrains Mono">Asian High (BSL Pool $$$)</text>

            <line x1="40" y1="130" x2="480" y2="130" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="200" y="142" fill="#10B981" fontSize="9" fontFamily="JetBrains Mono">Asian Low (SSL Pool $$$)</text>

            {/* Price line executing the Judas Swing */}
            <polyline 
              points="50,105 80,75 110,115 140,85 170,100 210,105 240,30 280,165 340,110 400,185 470,175" 
              fill="none" 
              stroke="#F8FAFC" 
              strokeWidth="2.75" 
            />

            {/* The Judas Swing Callout */}
            <circle cx="240" cy="30" r="5" fill="#F43F5E" stroke="#FFF" strokeWidth="1.5" />
            <rect x="255" y="15" width="150" height="36" fill="rgba(244, 63, 94, 0.2)" stroke="#F43F5E" strokeWidth="1" rx="4" />
            <text x="263" y="28" fill="#F43F5E" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">THE JUDAS SWING!</text>
            <text x="263" y="42" fill="#CBD5E1" fontSize="8" fontFamily="JetBrains Mono">02:00-03:00 EST Manipulasi</text>

            {/* True Daily Trend Arrow */}
            <path d="M 270,90 Q 300,140 330,160" fill="none" stroke="#10B981" strokeWidth="2.5" />
            <polygon points="330,160 322,152 331,150" fill="#10B981" />
            <text x="340" y="145" fill="#10B981" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">True Daily Trend</text>
          </svg>
        </div>
      );

    case 'amd_power_of_3_diagram':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#10B981] uppercase tracking-wider font-bold">
              Power of 3 (AMD: Accumulation, Manipulation, Distribution)
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Anatomi Candlestick Harian OHLC
            </span>
          </div>
          <svg viewBox="0 0 520 200" className="w-full max-w-lg h-52 select-none">
            {/* Complete Daily Bullish Bar on the right */}
            <g transform="translate(420, 25)">
              <line x1="30" y1="10" x2="30" y2="35" stroke="#10B981" strokeWidth="3" />
              <rect x="15" y="35" width="30" height="95" fill="#10B981" stroke="#000" strokeWidth="1.5" rx="2" />
              <line x1="30" y1="130" x2="30" y2="160" stroke="#10B981" strokeWidth="3" />
              <text x="30" y="175" fill="#10B981" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">Daily Candle</text>
            </g>

            {/* 3 Step Breakdown */}
            {/* Step 1: Accumulation (Open) */}
            <g transform="translate(30, 40)">
              <rect x="0" y="0" width="105" height="110" fill="rgba(56, 189, 248, 0.12)" stroke="#38BDF8" strokeWidth="1.5" rx="6" />
              <text x="10" y="24" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">A - Akumulasi</text>
              <text x="10" y="45" fill="#CBD5E1" fontSize="9" fontFamily="JetBrains Mono">Jam Buka Sesi</text>
              <text x="10" y="60" fill="#CBD5E1" fontSize="9" fontFamily="JetBrains Mono">(Midnight Open)</text>
              <line x1="10" y1="85" x2="95" y2="85" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" />
              <text x="10" y="100" fill="#F8FAFC" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">Open Price</text>
            </g>

            {/* Step 2: Manipulation (Drop to Low of Day) */}
            <g transform="translate(150, 40)">
              <rect x="0" y="0" width="115" height="110" fill="rgba(244, 63, 94, 0.15)" stroke="#F43F5E" strokeWidth="1.5" rx="6" />
              <text x="10" y="24" fill="#F43F5E" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">M - Manipulasi</text>
              <text x="10" y="45" fill="#CBD5E1" fontSize="9" fontFamily="JetBrains Mono">Harga menusuk</text>
              <text x="10" y="60" fill="#CBD5E1" fontSize="9" fontFamily="JetBrains Mono">ke bawah Open</text>
              <text x="10" y="75" fill="#F43F5E" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">Sumbu Bawah Low</text>
              <text x="10" y="100" fill="#FACC15" fontSize="8" fontFamily="JetBrains Mono">Beli di Diskon!</text>
            </g>

            {/* Step 3: Distribution (Expands to High of Day & Close) */}
            <g transform="translate(280, 40)">
              <rect x="0" y="0" width="120" height="110" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" strokeWidth="2" rx="6" />
              <text x="10" y="24" fill="#10B981" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">D - Distribusi</text>
              <text x="10" y="45" fill="#CBD5E1" fontSize="9" fontFamily="JetBrains Mono">Ekspansi reli tren</text>
              <text x="10" y="60" fill="#CBD5E1" fontSize="9" fontFamily="JetBrains Mono">sesungguhnya</text>
              <text x="10" y="75" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">Body Lilin Besar</text>
              <text x="10" y="100" fill="#F8FAFC" fontSize="8" fontFamily="JetBrains Mono">Tutup di Pucuk</text>
            </g>
          </svg>
        </div>
      );

    case 'smt_divergence_diagram':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#F43F5E] uppercase tracking-wider font-bold">
              Bearish SMT Divergence (EUR/USD vs GBP/USD Correlation)
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Konfirmasi Ketidaksinkronan Smart Money
            </span>
          </div>
          <svg viewBox="0 0 520 200" className="w-full max-w-lg h-52 select-none">
            {/* Chart 1: EUR/USD (Makes Higher High) */}
            <g transform="translate(30, 25)">
              <rect x="0" y="0" width="215" height="135" fill="rgba(15, 23, 42, 0.6)" stroke="#38BDF8" strokeWidth="1" rx="6" />
              <text x="12" y="20" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">EUR/USD (Higher High)</text>
              <polyline points="20,105 70,55 120,85 180,30" fill="none" stroke="#F8FAFC" strokeWidth="2.5" />
              <line x1="70" y1="55" x2="180" y2="30" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" />
              <circle cx="70" cy="55" r="4" fill="#38BDF8" />
              <circle cx="180" cy="30" r="4" fill="#10B981" />
              <text x="120" y="25" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">Higher High (HH)</text>
            </g>

            {/* SMT Divergence Lightning Symbol */}
            <text x="250" y="85" fill="#F43F5E" fontSize="16" fontWeight="extrabold" fontFamily="JetBrains Mono">≠</text>
            <text x="245" y="105" fill="#F43F5E" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">SMT</text>

            {/* Chart 2: GBP/USD (Fails and makes Lower High) */}
            <g transform="translate(275, 25)">
              <rect x="0" y="0" width="215" height="135" fill="rgba(15, 23, 42, 0.6)" stroke="#F43F5E" strokeWidth="1" rx="6" />
              <text x="12" y="20" fill="#F43F5E" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">GBP/USD (Lower High - Gagal)</text>
              <polyline points="20,105 70,35 120,75 180,60" fill="none" stroke="#F8FAFC" strokeWidth="2.5" />
              <line x1="70" y1="35" x2="180" y2="60" stroke="#F43F5E" strokeWidth="2" strokeDasharray="3 3" />
              <circle cx="70" cy="35" r="4" fill="#38BDF8" />
              <circle cx="180" cy="60" r="4" fill="#F43F5E" />
              <text x="120" y="55" fill="#F43F5E" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">Lower High (LH)</text>
            </g>

            {/* Bottom Verdict */}
            <rect x="30" y="168" width="460" height="24" fill="rgba(244, 63, 94, 0.15)" stroke="#F43F5E" strokeWidth="1" rx="4" />
            <text x="40" y="184" fill="#F43F5E" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
              ★ SMT VERDICT: Institusi sedang melakukan Institutional Selling (Shorting) terselubung!
            </text>
          </svg>
        </div>
      );

    case 'wyckoff_accumulation_schematic':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#C084FC] uppercase tracking-wider font-bold">
              Skematik Akumulasi Wyckoff (Fase A Hingga Fase E)
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              The Composite Operator Campaign
            </span>
          </div>
          <svg viewBox="0 0 540 220" className="w-full max-w-lg h-56 select-none">
            {/* Support and Resistance Lines */}
            <line x1="40" y1="65" x2="490" y2="65" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="45" y="58" fill="#38BDF8" fontSize="9" fontFamily="JetBrains Mono">Resistance (AR Peak)</text>

            <line x1="40" y1="140" x2="490" y2="140" stroke="#FACC15" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="45" y="152" fill="#FACC15" fontSize="9" fontFamily="JetBrains Mono">Support (SC Base)</text>

            {/* Wyckoff Accumulation Curve */}
            <polyline 
              points="30,30 60,110 80,95 110,145 150,65 190,135 230,110 270,140 310,175 340,115 380,85 410,40 440,70 500,20" 
              fill="none" 
              stroke="#F8FAFC" 
              strokeWidth="2.5" 
            />

            {/* Labels for Wyckoff Points */}
            <circle cx="60" cy="110" r="3" fill="#FACC15" />
            <text x="50" y="125" fill="#FACC15" fontSize="8" fontWeight="bold" fontFamily="JetBrains Mono">PS</text>

            <circle cx="110" cy="145" r="4" fill="#F43F5E" />
            <text x="100" y="160" fill="#F43F5E" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">SC</text>

            <circle cx="150" cy="65" r="4" fill="#38BDF8" />
            <text x="145" y="58" fill="#38BDF8" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">AR</text>

            <circle cx="190" cy="135" r="3" fill="#94A3B8" />
            <text x="185" y="148" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono">ST</text>

            {/* The Spring Highlight (Phase C) */}
            <circle cx="310" cy="175" r="5" fill="#10B981" stroke="#FFF" strokeWidth="1.5" />
            <rect x="270" y="180" width="85" height="24" fill="#10B981" rx="3" />
            <text x="278" y="196" fill="#000" fontSize="10" fontWeight="extrabold" fontFamily="JetBrains Mono">SPRING (C)</text>

            <circle cx="410" cy="40" r="4" fill="#10B981" />
            <text x="400" y="32" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">SOS (D)</text>

            <circle cx="440" cy="70" r="4" fill="#10B981" />
            <text x="445" y="80" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">LPS</text>

            {/* Phase Separators */}
            <line x1="130" y1="35" x2="130" y2="170" stroke="#334155" strokeDasharray="2 2" />
            <text x="75" y="195" fill="#64748B" fontSize="9" fontFamily="JetBrains Mono">Fase A</text>

            <line x1="280" y1="35" x2="280" y2="170" stroke="#334155" strokeDasharray="2 2" />
            <text x="195" y="195" fill="#64748B" fontSize="9" fontFamily="JetBrains Mono">Fase B (Sebab)</text>

            <line x1="360" y1="35" x2="360" y2="170" stroke="#334155" strokeDasharray="2 2" />
            <text x="375" y="195" fill="#64748B" fontSize="9" fontFamily="JetBrains Mono">Fase D</text>
            <text x="450" y="195" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">Fase E (Markup)</text>
          </svg>
        </div>
      );

    case 'drawdown_recovery_curve':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#F43F5E] uppercase tracking-wider font-bold">
              Kurva Asimetris Pemulihan Drawdown (Risk of Ruin)
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Matematika Geometris Kerugian Modal
            </span>
          </div>
          <svg viewBox="0 0 520 200" className="w-full max-w-lg h-52 select-none">
            {/* Axis */}
            <line x1="60" y1="160" x2="480" y2="160" stroke="#475569" strokeWidth="2" />
            <line x1="60" y1="20" x2="60" y2="160" stroke="#475569" strokeWidth="2" />
            
            {/* Labels X Axis (% Loss) */}
            <text x="60" y="175" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono">0%</text>
            <text x="140" y="175" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono">-20%</text>
            <text x="230" y="175" fill="#FACC15" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">-50%</text>
            <text x="330" y="175" fill="#F43F5E" fontSize="9" fontFamily="JetBrains Mono">-75%</text>
            <text x="440" y="175" fill="#F43F5E" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">-90%</text>
            <text x="250" y="195" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Besaran Kerugian Modal (% Drawdown)</text>

            {/* Labels Y Axis (% Gain Required) */}
            <text x="15" y="155" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono">0%</text>
            <text x="10" y="105" fill="#FACC15" fontSize="8" fontFamily="JetBrains Mono">+100%</text>
            <text x="10" y="55" fill="#F43F5E" fontSize="8" fontFamily="JetBrains Mono">+300%</text>
            <text x="10" y="25" fill="#F43F5E" fontSize="8" fontFamily="JetBrains Mono">+900%</text>

            {/* Exponential Drawdown Recovery Curve */}
            <path 
              d="M 60,160 Q 200,150 230,105 T 330,55 T 440,25" 
              fill="none" 
              stroke="#F43F5E" 
              strokeWidth="3.5" 
            />

            {/* Key Marker -50% Loss -> +100% Gain Required */}
            <circle cx="230" cy="105" r="5" fill="#FACC15" stroke="#000" strokeWidth="2" />
            <line x1="230" y1="105" x2="230" y2="160" stroke="#FACC15" strokeDasharray="3 3" />
            <line x1="60" y1="105" x2="230" y2="105" stroke="#FACC15" strokeDasharray="3 3" />
            <rect x="240" y="90" width="160" height="24" fill="rgba(250, 204, 21, 0.2)" stroke="#FACC15" strokeWidth="1" rx="3" />
            <text x="246" y="106" fill="#FACC15" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">Loss -50% ➔ Butuh +100%!</text>
          </svg>
        </div>
      );

    case 'quant_time_series_stationarity_diagram':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider font-bold">
              Deret Waktu Finansial: Non-Stasioner (Harga) vs Stasioner (Log Returns)
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Prasyarat Uji Augmented Dickey-Fuller (ADF)
            </span>
          </div>
          <svg viewBox="0 0 520 200" className="w-full max-w-lg h-52 select-none">
            {/* Top Graph: Non-Stationary Raw Price (Drifting upward) */}
            <g transform="translate(30, 20)">
              <rect x="0" y="0" width="460" height="65" fill="rgba(244, 63, 94, 0.08)" stroke="#F43F5E" strokeWidth="1" rx="4" />
              <text x="12" y="18" fill="#F43F5E" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">
                HARGA MENTAH (Non-Stationary): Varians & Mean Berubah Seiring Waktu
              </text>
              <polyline 
                points="10,50 50,45 80,55 120,40 160,48 200,35 240,42 280,25 320,30 360,18 400,22 450,12" 
                fill="none" 
                stroke="#F43F5E" 
                strokeWidth="2" 
              />
            </g>

            {/* Bottom Graph: Stationary Log Returns (Mean-reverting around 0) */}
            <g transform="translate(30, 100)">
              <rect x="0" y="0" width="460" height="65" fill="rgba(16, 185, 129, 0.08)" stroke="#10B981" strokeWidth="1" rx="4" />
              <text x="12" y="18" fill="#10B981" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">
                LOG RETURNS r_t (Stationary): Berosilasi Simetris di Sekitar Ekuilibrium 0
              </text>
              <line x1="10" y1="40" x2="450" y2="40" stroke="#475569" strokeDasharray="3 3" />
              <polyline 
                points="10,40 40,25 70,55 100,32 130,48 160,22 190,58 220,35 250,45 280,20 310,60 340,30 370,50 400,28 430,45 450,40" 
                fill="none" 
                stroke="#10B981" 
                strokeWidth="2" 
              />
            </g>

            <text x="40" y="185" fill="#FACC15" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
              ✓ Uji ADF: p-value &lt; 0.05 pada Log Returns mengonfirmasi data aman untuk model kuantitatif
            </text>
          </svg>
        </div>
      );

    case 'wyckoff_distribution_schematic':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#F43F5E] uppercase tracking-wider font-bold">
              Skematik Distribusi Wyckoff (Institusional Offloading)
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Fase A ➔ B ➔ C (UTAD) ➔ D (SOW) ➔ E (Markdown)
            </span>
          </div>
          <svg viewBox="0 0 540 230" className="w-full max-w-lg h-56 select-none">
            {/* Phase divider lines */}
            <line x1="110" y1="20" x2="110" y2="190" stroke="#334155" strokeDasharray="3 3" />
            <line x1="220" y1="20" x2="220" y2="190" stroke="#334155" strokeDasharray="3 3" />
            <line x1="320" y1="20" x2="320" y2="190" stroke="#334155" strokeDasharray="3 3" />
            <line x1="430" y1="20" x2="430" y2="190" stroke="#334155" strokeDasharray="3 3" />

            {/* Phase labels */}
            <text x="60" y="18" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">FASE A</text>
            <text x="165" y="18" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">FASE B</text>
            <text x="270" y="18" fill="#F43F5E" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">FASE C (UTAD)</text>
            <text x="375" y="18" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">FASE D (SOW)</text>
            <text x="480" y="18" fill="#F43F5E" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">FASE E</text>

            {/* Trading Range Levels */}
            <line x1="20" y1="65" x2="520" y2="65" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="25" y="60" fill="#F43F5E" fontSize="9" fontFamily="JetBrains Mono">Resisten TR / Ice Line</text>

            <line x1="20" y1="145" x2="520" y2="145" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="25" y="157" fill="#10B981" fontSize="9" fontFamily="JetBrains Mono">Support TR / Creek</text>

            {/* Price Curve */}
            <polyline
              points="20,180 50,110 75,55 95,145 125,75 155,135 185,70 215,140 270,30 305,115 345,160 380,105 420,180 470,165 520,215"
              fill="none"
              stroke="#F8FAFC"
              strokeWidth="2.5"
            />

            {/* Milestone markers */}
            <circle cx="50" cy="110" r="3" fill="#38BDF8" />
            <text x="50" y="125" fill="#38BDF8" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">PSY</text>

            <circle cx="75" cy="55" r="3.5" fill="#F43F5E" />
            <text x="75" y="47" fill="#F43F5E" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">BC</text>

            <circle cx="95" cy="145" r="3" fill="#10B981" />
            <text x="95" y="160" fill="#10B981" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">AR</text>

            <circle cx="270" cy="30" r="5" fill="#F43F5E" />
            <text x="270" y="22" fill="#F43F5E" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">UTAD (Bull Trap)</text>

            <circle cx="345" cy="160" r="3.5" fill="#FACC15" />
            <text x="345" y="175" fill="#FACC15" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">SOW (Break Ice)</text>

            <circle cx="380" cy="105" r="4" fill="#F43F5E" />
            <text x="380" y="97" fill="#F43F5E" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">LPSY (Short Entry)</text>

            <text x="475" y="155" fill="#F43F5E" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">Markdown (Terjun)</text>
          </svg>
        </div>
      );

    case 'wyckoff_vsa_volume_spread':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#FACC15] uppercase tracking-wider font-bold">
              Volume Spread Analysis (VSA): Effort vs. Result
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Anomali Volume &amp; Konfirmasi Candlestick
            </span>
          </div>
          <svg viewBox="0 0 540 220" className="w-full max-w-lg h-56 select-none">
            {/* Card 1: Climactic Churn */}
            <g transform="translate(25, 15)">
              <rect x="0" y="0" width="115" height="190" fill="rgba(15, 23, 42, 0.6)" stroke="#334155" rx="6" />
              <text x="57" y="18" fill="#FACC15" fontSize="8.5" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">CHURN ABSORPTION</text>
              <line x1="57" y1="35" x2="57" y2="95" stroke="#F43F5E" strokeWidth="2" />
              <rect x="42" y="55" width="30" height="25" fill="#F43F5E" rx="2" />
              <text x="57" y="112" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Spread Sempit</text>
              <rect x="40" y="130" width="34" height="45" fill="#F43F5E" />
              <text x="57" y="185" fill="#F43F5E" fontSize="8" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">Ultra High Vol</text>
            </g>

            {/* Card 2: No Demand */}
            <g transform="translate(150, 15)">
              <rect x="0" y="0" width="115" height="190" fill="rgba(15, 23, 42, 0.6)" stroke="#334155" rx="6" />
              <text x="57" y="18" fill="#38BDF8" fontSize="8.5" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">NO DEMAND BAR</text>
              <line x1="57" y1="35" x2="57" y2="95" stroke="#10B981" strokeWidth="2" />
              <rect x="45" y="50" width="24" height="25" fill="#10B981" rx="2" />
              <text x="57" y="112" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Up Bar Menipu</text>
              <rect x="47" y="160" width="20" height="15" fill="#475569" />
              <text x="57" y="185" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Volume Kering</text>
            </g>

            {/* Card 3: No Supply */}
            <g transform="translate(275, 15)">
              <rect x="0" y="0" width="115" height="190" fill="rgba(15, 23, 42, 0.6)" stroke="#334155" rx="6" />
              <text x="57" y="18" fill="#10B981" fontSize="8.5" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">NO SUPPLY TEST</text>
              <line x1="57" y1="40" x2="57" y2="95" stroke="#10B981" strokeWidth="2" />
              <rect x="45" y="45" width="24" height="25" fill="#10B981" rx="2" />
              <circle cx="57" cy="95" r="2.5" fill="#10B981" />
              <text x="57" y="112" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Uji Seller Kosong</text>
              <rect x="49" y="163" width="16" height="12" fill="#10B981" />
              <text x="57" y="185" fill="#10B981" fontSize="8" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">Volume Minimal</text>
            </g>

            {/* Card 4: SOS */}
            <g transform="translate(400, 15)">
              <rect x="0" y="0" width="115" height="190" fill="rgba(15, 23, 42, 0.6)" stroke="#10B981" strokeWidth="1.2" rx="6" />
              <text x="57" y="18" fill="#10B981" fontSize="8.5" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">TRUE BREAKOUT (SOS)</text>
              <line x1="57" y1="30" x2="57" y2="100" stroke="#10B981" strokeWidth="2.5" />
              <rect x="41" y="38" width="32" height="55" fill="#10B981" rx="2" />
              <text x="57" y="112" fill="#10B981" fontSize="8" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">Wide Spread Bar</text>
              <rect x="41" y="132" width="32" height="43" fill="#10B981" />
              <text x="57" y="185" fill="#10B981" fontSize="8" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">High Volume Push</text>
            </g>
          </svg>
        </div>
      );

    case 'risk_position_sizing_calc':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#10B981] uppercase tracking-wider font-bold">
              Formula Kalkulasi Position Sizing Presisi
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Equity ➔ Fixed % Risk ➔ Distance ➔ Strict Lot Size
            </span>
          </div>
          <svg viewBox="0 0 540 200" className="w-full max-w-lg h-52 select-none">
            {/* Box 1: Modal */}
            <g transform="translate(15, 25)">
              <rect x="0" y="0" width="110" height="70" fill="rgba(30, 41, 59, 0.8)" stroke="#38BDF8" strokeWidth="1.5" rx="6" />
              <text x="55" y="24" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">1. MODAL AKUN</text>
              <text x="55" y="46" fill="#F8FAFC" fontSize="13" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">$10,000</text>
              <text x="55" y="60" fill="#38BDF8" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Account Equity</text>
            </g>

            {/* Operator x */}
            <text x="135" y="65" fill="#94A3B8" fontSize="16" fontWeight="bold" fontFamily="JetBrains Mono">×</text>

            {/* Box 2: Risk % */}
            <g transform="translate(150, 25)">
              <rect x="0" y="0" width="105" height="70" fill="rgba(30, 41, 59, 0.8)" stroke="#FACC15" strokeWidth="1.5" rx="6" />
              <text x="52" y="24" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">2. RISIKO TETAP</text>
              <text x="52" y="46" fill="#FACC15" fontSize="13" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">1.0% ($100)</text>
              <text x="52" y="60" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Max Risk Capital</text>
            </g>

            {/* Operator / */}
            <text x="268" y="65" fill="#94A3B8" fontSize="18" fontWeight="bold" fontFamily="JetBrains Mono">÷</text>

            {/* Box 3: SL Distance */}
            <g transform="translate(280, 25)">
              <rect x="0" y="0" width="115" height="70" fill="rgba(30, 41, 59, 0.8)" stroke="#F43F5E" strokeWidth="1.5" rx="6" />
              <text x="57" y="24" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">3. JARAK SL</text>
              <text x="57" y="46" fill="#F43F5E" fontSize="13" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">25 Pips</text>
              <text x="57" y="60" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">($10 / Pip Standard)</text>
            </g>

            {/* Operator = */}
            <text x="408" y="65" fill="#94A3B8" fontSize="18" fontWeight="bold" fontFamily="JetBrains Mono">=</text>

            {/* Box 4: Result Lot */}
            <g transform="translate(425, 20)">
              <rect x="0" y="0" width="100" height="80" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" strokeWidth="2" rx="8" />
              <text x="50" y="22" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">LOT DIEKSEKUSI</text>
              <text x="50" y="48" fill="#10B981" fontSize="16" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">0.40 Lot</text>
              <text x="50" y="68" fill="#F8FAFC" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">40,000 Units</text>
            </g>

            {/* Bottom summary bar */}
            <rect x="15" y="115" width="510" height="65" fill="rgba(15, 23, 42, 0.9)" stroke="#334155" rx="6" />
            <text x="25" y="136" fill="#FACC15" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">
              ★ Formula Matematis: Position Size = (Akun × Risk%) / (Jarak SL × Nilai Per Pip)
            </text>
            <text x="25" y="156" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono">
              Jika SL terkena: Kerugian persis $100 (1%). Tidak peduli pasar bergejolak sekeras apa pun, modal terlindungi.
            </text>
            <text x="25" y="172" fill="#10B981" fontSize="9" fontFamily="JetBrains Mono">
              Target R:R 1:3 ($300 Gain) menghasilkan rasio risiko-keuntungan asimetris yang unggul.
            </text>
          </svg>
        </div>
      );

    case 'quant_monte_carlo_drawdown':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider font-bold">
              Simulasi Monte Carlo (1,000 Reshuffled Paths)
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Confidence Band &amp; Tail Risk Drawdown
            </span>
          </div>
          <svg viewBox="0 0 540 210" className="w-full max-w-lg h-52 select-none">
            <line x1="40" y1="30" x2="500" y2="30" stroke="#1E293B" strokeDasharray="3 3" />
            <line x1="40" y1="80" x2="500" y2="80" stroke="#1E293B" strokeDasharray="3 3" />
            <line x1="40" y1="130" x2="500" y2="130" stroke="#1E293B" strokeDasharray="3 3" />
            <line x1="40" y1="170" x2="500" y2="170" stroke="#334155" />

            {/* Random simulated paths */}
            <path d="M 40,140 Q 150,110 260,85 T 480,45" fill="none" stroke="#38BDF8" strokeWidth="0.8" opacity="0.3" />
            <path d="M 40,140 Q 130,150 250,110 T 480,75" fill="none" stroke="#38BDF8" strokeWidth="0.8" opacity="0.3" />
            <path d="M 40,140 Q 180,120 280,130 T 480,60" fill="none" stroke="#38BDF8" strokeWidth="0.8" opacity="0.3" />
            <path d="M 40,140 Q 140,165 240,125 T 480,105" fill="none" stroke="#F43F5E" strokeWidth="0.8" opacity="0.4" />
            <path d="M 40,140 Q 160,130 300,95 T 480,30" fill="none" stroke="#10B981" strokeWidth="0.8" opacity="0.3" />

            {/* 95th Percentile Curve */}
            <path d="M 40,140 Q 180,90 320,60 T 480,25" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" />
            <text x="485" y="28" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">95th %ile</text>

            {/* Median Curve */}
            <path d="M 40,140 Q 180,120 320,85 T 480,65" fill="none" stroke="#FACC15" strokeWidth="3" />
            <text x="485" y="68" fill="#FACC15" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">Median</text>

            {/* 5th Percentile Curve */}
            <path d="M 40,140 Q 160,170 300,155 T 480,120" fill="none" stroke="#F43F5E" strokeWidth="2" strokeDasharray="4 4" />
            <text x="485" y="123" fill="#F43F5E" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">5th %ile (VaR)</text>

            {/* Max Drawdown Threshold Envelope */}
            <rect x="40" y="145" width="440" height="22" fill="rgba(244, 63, 94, 0.15)" stroke="#F43F5E" strokeWidth="0.8" strokeDasharray="2 2" />
            <text x="45" y="160" fill="#F43F5E" fontSize="9" fontFamily="JetBrains Mono">Zona Maksimum Drawdown Terburuk (&lt; -14.2%)</text>

            {/* Stats Footer */}
            <text x="40" y="195" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono">
              Monte Carlo membuktikan: Sistem memiliki 99.2% probabilitas profitabilitas dalam horizon 500 trade.
            </text>
          </svg>
        </div>
      );

    case 'orderbook_depth_l2':
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#FACC15] uppercase tracking-wider font-bold">
              Level 2 Orderbook Depth &amp; Liquidity Microstructure
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Bid-Ask Spread &amp; Volume Walls
            </span>
          </div>
          <svg viewBox="0 0 540 210" className="w-full max-w-lg h-52 select-none">
            {/* Center Spread Divider */}
            <line x1="270" y1="25" x2="270" y2="155" stroke="#FACC15" strokeWidth="1.5" strokeDasharray="3 3" />
            <rect x="245" y="75" width="50" height="24" fill="#020617" stroke="#FACC15" strokeWidth="1.2" rx="4" />
            <text x="270" y="90" fill="#FACC15" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">SPREAD</text>

            {/* Left Side: Cumulative Bids (Green Steps) */}
            <path
              d="M 40,150 L 90,150 L 90,130 L 130,130 L 130,105 L 180,105 L 180,75 L 220,75 L 220,45 L 255,45 L 255,150 Z"
              fill="rgba(16, 185, 129, 0.2)"
              stroke="#10B981"
              strokeWidth="2"
            />
            <text x="90" y="40" fill="#10B981" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">BIDS (Antrean Beli)</text>
            <text x="90" y="55" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono">Limit Buy Support Walls</text>

            {/* Right Side: Cumulative Asks (Red Steps) */}
            <path
              d="M 285,150 L 285,45 L 320,45 L 320,75 L 360,75 L 360,105 L 410,105 L 410,130 L 450,130 L 450,150 L 500,150 Z"
              fill="rgba(244, 63, 94, 0.2)"
              stroke="#F43F5E"
              strokeWidth="2"
            />
            <text x="450" y="40" fill="#F43F5E" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="end">ASKS (Antrean Jual)</text>
            <text x="450" y="55" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono" textAnchor="end">Limit Sell Resistance Walls</text>

            {/* Axis Baseline */}
            <line x1="30" y1="150" x2="510" y2="150" stroke="#334155" strokeWidth="1.5" />
            <text x="40" y="170" fill="#10B981" fontSize="9" fontFamily="JetBrains Mono">Harga Lebih Rendah</text>
            <text x="270" y="170" fill="#FACC15" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Mid-Price (1.08500)</text>
            <text x="500" y="170" fill="#F43F5E" fontSize="9" fontFamily="JetBrains Mono" textAnchor="end">Harga Lebih Tinggi</text>

            {/* Note */}
            <text x="270" y="195" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">
              Market Order menyerap antrean limit order: pesanan besar menembus tipisnya likuiditas (Slippage)
            </text>
          </svg>
        </div>
      );

    default:
      return (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-5 my-5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#10B981] uppercase tracking-wider font-bold">
              Struktur Pasar Mekanis &amp; Dinamika Likuiditas
            </span>
            <span className="text-[10px] font-mono bg-black/60 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Technical Chart Model
            </span>
          </div>
          <svg viewBox="0 0 520 200" className="w-full max-w-lg h-52 select-none">
            <polyline 
              points="40,160 110,60 160,110 260,30 320,80 430,20 480,100" 
              fill="none" 
              stroke="#F8FAFC" 
              strokeWidth="2.5" 
            />
            <circle cx="110" cy="60" r="4.5" fill="#10B981" />
            <circle cx="160" cy="110" r="4.5" fill="#10B981" />
            <circle cx="260" cy="30" r="4.5" fill="#10B981" />
            <circle cx="320" cy="80" r="4.5" fill="#10B981" />
            <circle cx="430" cy="20" r="4.5" fill="#10B981" />
            <line x1="110" y1="60" x2="260" y2="60" stroke="#10B981" strokeDasharray="3 3" strokeWidth="1.5" />
            <text x="180" y="55" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">BOS</text>
            <line x1="260" y1="30" x2="430" y2="30" stroke="#10B981" strokeDasharray="3 3" strokeWidth="1.5" />
            <text x="340" y="25" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">BOS</text>
            <text x="160" y="130" fill="#38BDF8" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">HL (Protected)</text>
            <text x="320" y="100" fill="#38BDF8" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">HL (Protected)</text>
            <text x="260" y="185" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">
              Validasi Konfirmasi Struktur: Higher High &amp; Protected Higher Low
            </text>
          </svg>
        </div>
      );
  }
};
