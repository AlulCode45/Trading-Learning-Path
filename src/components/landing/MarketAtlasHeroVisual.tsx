import React, { useState } from 'react';

export const MarketAtlasHeroVisual: React.FC = () => {
  const [activePin, setActivePin] = useState<string | null>('sweep');

  return (
    <div className="relative bg-[#EAE7DF] border border-[#DCD9D0] rounded-none p-6 md:p-8 flex flex-col justify-between">
      {/* Top Header / Metadata bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#DCD9D0] text-xs font-mono-data text-[#85857D]">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#F26A3D]" />
          <span className="text-[#171916] font-medium uppercase tracking-wider">FIG 1.1 · AUCTION MARKET ANATOMY</span>
        </div>
        <span>TIMEFRAME: MULTI-FRACTAL</span>
      </div>

      {/* Bespoke Educational SVG Chart */}
      <div className="my-6 relative">
        <svg viewBox="0 0 560 260" className="w-full h-auto overflow-visible">
          {/* Subtle horizontal grid lines */}
          <line x1="20" y1="50" x2="540" y2="50" stroke="#DCD9D0" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="20" y1="130" x2="540" y2="130" stroke="#DCD9D0" strokeWidth="1.5" />
          <line x1="20" y1="210" x2="540" y2="210" stroke="#DCD9D0" strokeWidth="1" strokeDasharray="3 3" />

          {/* Grid Labels */}
          <text x="25" y="42" fill="#85857D" fontSize="10" fontFamily="JetBrains Mono">PREMIUM ZONE (&gt; 50%)</text>
          <text x="25" y="124" fill="#171916" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">EQUILIBRIUM (FAIR VALUE)</text>
          <text x="25" y="226" fill="#85857D" fontSize="10" fontFamily="JetBrains Mono">DISCOUNT ZONE (&lt; 50%)</text>

          {/* Value area background tint */}
          <rect x="20" y="50" width="520" height="80" fill="rgba(242, 106, 61, 0.04)" />
          <rect x="20" y="130" width="520" height="80" fill="rgba(109, 137, 107, 0.05)" />

          {/* Wholesale Accumulation & Markup Path */}
          <polyline
            points="40,215 80,185 120,205 170,140 210,165 270,85 310,115 360,40"
            fill="none"
            stroke="#171916"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Liquidity Sweep Spike Wick */}
          <line x1="360" y1="40" x2="360" y2="15" stroke="#F26A3D" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="360" cy="15" r="4" fill="#F26A3D" />

          {/* Displacement Reversal Wave */}
          <polyline
            points="360,40 395,90 425,70 480,175 520,150 545,215"
            fill="none"
            stroke="#F26A3D"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Structure Break Annotations */}
          {/* BOS 1 */}
          <line x1="170" y1="140" x2="270" y2="140" stroke="#6D896B" strokeWidth="1" strokeDasharray="3 3" />
          <text x="220" y="134" fill="#6D896B" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">BOS (CONFIRMED)</text>

          {/* Liquidity Pool X markers */}
          <text x="325" y="32" fill="#F26A3D" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">$$$ (BSL POOL)</text>

          {/* CHoCH Level */}
          <line x1="310" y1="115" x2="440" y2="115" stroke="#171916" strokeWidth="1.5" strokeDasharray="4 2" />
          <rect x="375" y="105" width="48" height="18" fill="#171916" />
          <text x="382" y="118" fill="#F5F3ED" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">CHoCH</text>

          {/* Interactive Inspection Pins */}
          {/* Pin 1: Sweep */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePin('sweep')}
          >
            <circle cx="360" cy="15" r="9" fill="#F26A3D" fillOpacity="0.2" className="animate-ping" />
            <circle cx="360" cy="15" r="5" fill="#F26A3D" />
          </g>

          {/* Pin 2: Value Area */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePin('value')}
          >
            <circle cx="120" cy="205" r="6" fill="#6D896B" />
            <circle cx="120" cy="205" r="3" fill="#FFFFFF" />
          </g>

          {/* Pin 3: CHoCH Shift */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePin('choch')}
          >
            <circle cx="480" cy="175" r="6" fill="#171916" />
            <circle cx="480" cy="175" r="3" fill="#FFFFFF" />
          </g>
        </svg>

        {/* Dynamic Concept Caption Box */}
        <div className="mt-4 p-3.5 bg-[#F5F3ED] border border-[#DCD9D0] text-xs font-sans-ui text-[#171916] flex items-start space-x-3">
          <span className="font-mono-data text-[#F26A3D] font-bold text-sm">✦</span>
          <div>
            {activePin === 'sweep' && (
              <>
                <strong className="font-bold">Liquidity Sweep (The Purge):</strong> Harga menusuk di atas swing high sebelumnya untuk melahap stop-loss buyer, sebelum berbalik arah dengan displacement agresif.
              </>
            )}
            {activePin === 'value' && (
              <>
                <strong className="font-bold">Discount Value Accumulation:</strong> Institusi mengakumulasi posisi beli di bawah 50% range lelang saat retail trader panik menjual di lembah.
              </>
            )}
            {activePin === 'choch' && (
              <>
                <strong className="font-bold">Change of Character (CHoCH):</strong> Penembusan Higher Low struktural terakhir yang mengonfirmasi bahwa penawaran seller telah mengambil alih kontrol tren.
              </>
            )}
            {!activePin && (
              <>Klik titik pin pada diagram di atas untuk membaca anatomi lelang pasar.</>
            )}
          </div>
        </div>
      </div>

      {/* Bottom status note */}
      <div className="pt-3 border-t border-[#DCD9D0] flex items-center justify-between text-[11px] font-mono-data text-[#85857D]">
        <span>METHODOLOGY: PURE PRICE AUCTION</span>
        <span className="text-[#6D896B]">INDICATORS LAG: 0.0%</span>
      </div>
    </div>
  );
};
