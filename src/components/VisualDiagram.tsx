import React from 'react';

interface VisualDiagramProps {
  type: string;
}

export const VisualDiagram: React.FC<VisualDiagramProps> = ({ type }) => {
  switch (type) {
    case 'candlestick_anatomy':
      return (
        <div className="bg-[#0B1120] border border-[#1E293B] rounded-xl p-4 my-4 flex flex-col items-center">
          <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-2">Anatomi Candlestick & Auction Wick</span>
          <svg viewBox="0 0 400 180" className="w-full max-w-sm h-44">
            {/* Bullish Candle */}
            <g transform="translate(100, 20)">
              {/* Upper wick */}
              <line x1="40" y1="10" x2="40" y2="40" stroke="#10B981" strokeWidth="2.5" />
              {/* Body */}
              <rect x="20" y="40" width="40" height="70" fill="#10B981" rx="2" />
              {/* Lower wick */}
              <line x1="40" y1="110" x2="40" y2="135" stroke="#10B981" strokeWidth="2.5" />
              
              {/* Labels */}
              <text x="70" y="15" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">High (Pucuk)</text>
              <text x="70" y="45" fill="#F8FAFC" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">Close (Penutupan)</text>
              <text x="70" y="78" fill="#10B981" fontSize="11" fontFamily="JetBrains Mono">Real Body</text>
              <text x="70" y="115" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">Open (Pembukaan)</text>
              <text x="70" y="140" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">Low (Lembah)</text>
            </g>

            {/* Bearish Rejection Wick Candle */}
            <g transform="translate(260, 20)">
              <line x1="40" y1="10" x2="40" y2="70" stroke="#F43F5E" strokeWidth="2.5" />
              <rect x="25" y="70" width="30" height="35" fill="#F43F5E" rx="2" />
              <line x1="40" y1="105" x2="40" y2="120" stroke="#F43F5E" strokeWidth="2.5" />
              
              <text x="65" y="40" fill="#F43F5E" fontSize="10" fontFamily="JetBrains Mono">Aggressive</text>
              <text x="65" y="52" fill="#F43F5E" fontSize="10" fontFamily="JetBrains Mono">Rejection Wick</text>
              <text x="65" y="90" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">Seller Close</text>
            </g>
          </svg>
        </div>
      );

    case 'bos_choch':
      return (
        <div className="bg-[#0B1120] border border-[#1E293B] rounded-xl p-4 my-4 flex flex-col items-center">
          <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-2">Break of Structure (BOS) vs Change of Character (CHoCH)</span>
          <svg viewBox="0 0 500 180" className="w-full max-w-md h-44">
            {/* Background gridlines */}
            <line x1="20" y1="50" x2="480" y2="50" stroke="#1E293B" strokeDasharray="4 4" />
            <line x1="20" y1="130" x2="480" y2="130" stroke="#1E293B" strokeDasharray="4 4" />

            {/* Price line */}
            <polyline 
              points="40,140 100,70 140,110 220,40 260,90 320,30 390,140 430,90 470,160" 
              fill="none" 
              stroke="#F8FAFC" 
              strokeWidth="2.5" 
            />

            {/* BOS Line 1 */}
            <line x1="100" y1="70" x2="225" y2="70" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
            <rect x="145" y="58" width="45" height="18" fill="#10B981" rx="4" />
            <text x="153" y="71" fill="#090D16" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">BOS</text>

            {/* BOS Line 2 */}
            <line x1="220" y1="40" x2="325" y2="40" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
            <rect x="255" y="28" width="45" height="18" fill="#10B981" rx="4" />
            <text x="263" y="41" fill="#090D16" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">BOS</text>

            {/* CHoCH Level at Higher Low */}
            <line x1="260" y1="90" x2="400" y2="90" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" />
            <rect x="330" y="98" width="55" height="18" fill="#F59E0B" rx="4" />
            <text x="338" y="111" fill="#090D16" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">CHoCH</text>
          </svg>
        </div>
      );

    case 'premium_discount':
      return (
        <div className="bg-[#0B1120] border border-[#1E293B] rounded-xl p-4 my-4 flex flex-col items-center">
          <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-2">Equilibrium & Premium vs Discount Zone</span>
          <svg viewBox="0 0 460 170" className="w-full max-w-md h-44">
            {/* Premium box */}
            <rect x="60" y="20" width="340" height="60" fill="rgba(244, 63, 94, 0.12)" stroke="#F43F5E" strokeWidth="1" rx="4" />
            <text x="75" y="40" fill="#F43F5E" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">PREMIUM ZONE (&gt; 50%)</text>
            <text x="75" y="58" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">Area Mahal — Hanya Cari Peluang SELL</text>

            {/* Equilibrium Line */}
            <line x1="50" y1="80" x2="410" y2="80" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5 5" />
            <text x="75" y="95" fill="#F59E0B" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">50% EQUILIBRIUM (Fair Value)</text>

            {/* Discount box */}
            <rect x="60" y="100" width="340" height="60" fill="rgba(16, 185, 129, 0.12)" stroke="#10B981" strokeWidth="1" rx="4" />
            <text x="75" y="125" fill="#10B981" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">DISCOUNT ZONE (&lt; 50%)</text>
            <text x="75" y="143" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">Area Murah — Hanya Cari Peluang BUY</text>
          </svg>
        </div>
      );

    case 'liquidity_pools':
    case 'liquidity_sweep':
      return (
        <div className="bg-[#0B1120] border border-[#1E293B] rounded-xl p-4 my-4 flex flex-col items-center">
          <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-2">Liquidity Sweep &amp; Stop Hunt Mechanics</span>
          <svg viewBox="0 0 460 170" className="w-full max-w-md h-44">
            {/* Equal Highs Line */}
            <line x1="60" y1="70" x2="380" y2="70" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="70" y="62" fill="#38BDF8" fontSize="10" fontFamily="JetBrains Mono">Equal Highs (Retail Resistance)</text>
            
            {/* Liquidity X marks */}
            <text x="200" y="55" fill="#F59E0B" fontSize="13" fontWeight="bold" fontFamily="JetBrains Mono">$$$ (BSL Pool)</text>

            {/* Price path */}
            <polyline 
              points="40,130 90,70 140,110 190,70 230,120 280,35 320,150 360,110 420,160" 
              fill="none" 
              stroke="#F8FAFC" 
              strokeWidth="2.5" 
            />

            {/* Sweep Wick Indicator */}
            <circle cx="280" cy="35" r="4" fill="#F43F5E" />
            <text x="290" y="32" fill="#F43F5E" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">Sweep Wick!</text>
            
            {/* Aggressive Displacement arrow */}
            <line x1="285" y1="45" x2="315" y2="135" stroke="#F43F5E" strokeWidth="2" strokeDasharray="2 2" />
            <text x="325" y="85" fill="#F43F5E" fontSize="10" fontFamily="JetBrains Mono">Displacement</text>
          </svg>
        </div>
      );

    case 'risk_reward_calc':
      return (
        <div className="bg-[#0B1120] border border-[#1E293B] rounded-xl p-4 my-4 flex flex-col items-center">
          <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-2">Asymmetric Risk-to-Reward Ratio (1:3 R:R)</span>
          <svg viewBox="0 0 460 170" className="w-full max-w-md h-44">
            {/* Take Profit Target Box */}
            <rect x="80" y="20" width="300" height="75" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" strokeWidth="1.5" rx="4" />
            <text x="100" y="45" fill="#10B981" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono">TARGET TAKE PROFIT (+3.0 R)</text>
            <text x="100" y="65" fill="#F8FAFC" fontSize="10" fontFamily="JetBrains Mono">Gain: +$300 (Potensi Keuntungan 3x Lipat)</text>

            {/* Entry Price Line */}
            <line x1="60" y1="95" x2="400" y2="95" stroke="#38BDF8" strokeWidth="2" />
            <text x="100" y="90" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">HARGA ENTRY (Buy Limit)</text>

            {/* Stop Loss Box */}
            <rect x="80" y="95" width="300" height="35" fill="rgba(244, 63, 94, 0.15)" stroke="#F43F5E" strokeWidth="1.5" rx="4" />
            <text x="100" y="118" fill="#F43F5E" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">STOP LOSS (-1.0 R)</text>
            <text x="240" y="118" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">Risiko: -$100 (Max 1% Equity)</text>
          </svg>
        </div>
      );

    default:
      return (
        <div className="bg-[#0B1120] border border-[#1E293B] rounded-xl p-4 my-4 text-center">
          <span className="text-xs font-mono text-[#94A3B8]">Diagram interaktif untuk modul ini termuat otomatis di chart canvas</span>
        </div>
      );
  }
};
