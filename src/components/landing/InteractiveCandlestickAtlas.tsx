import React, { useState } from 'react';

type PatternType = 'pinbar' | 'engulfing' | 'morningstar' | 'fvg' | 'sweep';

export const InteractiveCandlestickAtlas: React.FC = () => {
  const [selected, setSelected] = useState<PatternType>('pinbar');

  const patternData = {
    pinbar: {
      number: '01',
      name: 'Pin Bar (Absorption Wick)',
      classification: 'Single-Candle Liquidity Rejection',
      context: 'Hanya valid di Area Discount (<50%) atau Fresh Demand Zone',
      logic: 'Seller mencoba mendorong harga turun tajam, namun seluruh volume penawaran langsung diserap (absorbed) oleh limit order institusi, memaksa harga ditutup mendekati titik tertinggi.',
      rules: [
        'Sumbu bawah minimal 2.5× panjang badan (real body).',
        'Penutupan (Close) wajib berada di sepertiga teratas range candle.',
        'Wajib menunggu candle berikutnya tutup sebagai bukti validasi momentum.'
      ],
      svg: (
        <svg viewBox="0 0 200 180" className="w-48 h-44 mx-auto">
          {/* Reference line */}
          <line x1="20" y1="50" x2="180" y2="50" stroke="#DCD9D0" strokeDasharray="3 3" />
          <text x="25" y="42" fill="#85857D" fontSize="10" fontFamily="JetBrains Mono">KEY SUPPORT / LIQUIDITY LEVEL</text>
          {/* Pin Bar Candle */}
          <line x1="100" y1="45" x2="100" y2="60" stroke="#171916" strokeWidth="2.5" />
          <rect x="85" y="60" width="30" height="24" fill="#6D896B" stroke="#171916" strokeWidth="1.5" />
          <line x1="100" y1="84" x2="100" y2="165" stroke="#171916" strokeWidth="2.5" />
          {/* Wick annotation */}
          <text x="115" y="130" fill="#F26A3D" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">ABSORPTION WICK</text>
        </svg>
      )
    },
    engulfing: {
      number: '02',
      name: 'Bullish Engulfing Bar',
      classification: 'Two-Candle Momentum Takeover',
      context: 'Terbentuk setelah pullback lelang ke zona nilai kritis',
      logic: 'Candle hijau besar yang badan lilinnya secara menyeluruh menelan rentang candle merah sebelumnya. Menandakan pergeseran kekuatan seketika dari pihak penawar (seller) ke pihak penawar beli (buyer).',
      rules: [
        'Body candle kedua harus menutup bersih di atas High candle pertama.',
        'Volume lelang pada candle kedua harus melebihi volume candle pertama.',
        'Bukan sekadar pergerakan acak di tengah konsolidasi flat.'
      ],
      svg: (
        <svg viewBox="0 0 220 180" className="w-52 h-44 mx-auto">
          {/* Candle 1 (Bearish) */}
          <line x1="70" y1="50" x2="70" y2="125" stroke="#171916" strokeWidth="2" />
          <rect x="56" y="65" width="28" height="45" fill="#EAE7DF" stroke="#171916" strokeWidth="1.5" />
          {/* Candle 2 (Bullish Engulfing) */}
          <line x1="140" y1="30" x2="140" y2="150" stroke="#171916" strokeWidth="2.5" />
          <rect x="122" y="45" width="36" height="90" fill="#6D896B" stroke="#171916" strokeWidth="1.5" />
          {/* Engulfing bracket */}
          <line x1="165" y1="45" x2="175" y2="45" stroke="#F26A3D" strokeWidth="1.5" />
          <line x1="175" y1="45" x2="175" y2="135" stroke="#F26A3D" strokeWidth="1.5" />
          <line x1="165" y1="135" x2="175" y2="135" stroke="#F26A3D" strokeWidth="1.5" />
          <text x="180" y="94" fill="#F26A3D" fontSize="9" fontFamily="JetBrains Mono">ENGULFED</text>
        </svg>
      )
    },
    morningstar: {
      number: '03',
      name: 'Morning Star Schematics',
      classification: 'Three-Candle Structural Reversal',
      context: 'Pembalikan lelang pada ekstrem diskon terdalam',
      logic: 'Pola 3 candle: (1) Penjualan agresif, (2) Candle star kecil di mana kecepatan lelang melambat drastis, dan (3) Lonjakan beli yang menutup melewati titik tengah candle pertama.',
      rules: [
        'Candle tengah mencerminkan fase transfer inventaris lelang.',
        'Candle ke-3 memverifikasi penolakan harga rendah secara definitif.',
        'Stop loss logis ditempatkan tepat di bawah sumbu terendah candle tengah.'
      ],
      svg: (
        <svg viewBox="0 0 240 180" className="w-56 h-44 mx-auto">
          {/* C1: Bearish */}
          <line x1="50" y1="35" x2="50" y2="130" stroke="#171916" strokeWidth="2" />
          <rect x="40" y="45" width="20" height="70" fill="#EAE7DF" stroke="#171916" strokeWidth="1.5" />
          {/* C2: Star */}
          <line x1="120" y1="110" x2="120" y2="155" stroke="#171916" strokeWidth="1.5" />
          <rect x="112" y="125" width="16" height="15" fill="#F26A3D" stroke="#171916" strokeWidth="1.5" />
          {/* C3: Bullish */}
          <line x1="190" y1="30" x2="190" y2="140" stroke="#171916" strokeWidth="2" />
          <rect x="180" y="40" width="20" height="85" fill="#6D896B" stroke="#171916" strokeWidth="1.5" />
          {/* 50% threshold dotted line */}
          <line x1="30" y1="80" x2="210" y2="80" stroke="#DCD9D0" strokeDasharray="3 3" />
          <text x="50" y="25" fill="#85857D" fontSize="9" fontFamily="JetBrains Mono">50% THRESHOLD</text>
        </svg>
      )
    },
    fvg: {
      number: '04',
      name: 'Fair Value Gap (FVG)',
      classification: 'Three-Bar Price Imbalance',
      context: 'Ketidakseimbangan order flow satu arah',
      logic: 'Terjadi saat satu sisi pelaku pasar (misal buyer) mengeksekusi volume begitu agresif sehingga tidak sempat ada interaksi tawar-menawar dua arah antara candle 1 dan candle 3.',
      rules: [
        'Ada ruang kosong (gap) antara Low candle 1 dan High candle 3.',
        'Pasar cenderung bertindak seperti magnet kembali ke area gap ini untuk re-balancing.',
        'Area 50% FVG (Consequent Encroachment) adalah level reaksi paling sensitif.'
      ],
      svg: (
        <svg viewBox="0 0 240 180" className="w-56 h-44 mx-auto">
          {/* C1 */}
          <line x1="60" y1="100" x2="60" y2="155" stroke="#171916" strokeWidth="2" />
          <rect x="50" y="110" width="20" height="35" fill="#EAE7DF" stroke="#171916" strokeWidth="1.5" />
          {/* C2 Displacement */}
          <line x1="120" y1="20" x2="120" y2="145" stroke="#171916" strokeWidth="2" />
          <rect x="110" y="35" width="20" height="95" fill="#6D896B" stroke="#171916" strokeWidth="1.5" />
          {/* C3 */}
          <line x1="180" y1="15" x2="180" y2="70" stroke="#171916" strokeWidth="2" />
          <rect x="170" y="25" width="20" height="30" fill="#6D896B" stroke="#171916" strokeWidth="1.5" />
          {/* Gap highlight between C1 High and C3 Low */}
          <rect x="50" y="70" width="140" height="40" fill="rgba(242, 106, 61, 0.15)" stroke="#F26A3D" strokeWidth="1" strokeDasharray="3 3" />
          <text x="80" y="94" fill="#F26A3D" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">FAIR VALUE GAP</text>
        </svg>
      )
    },
    sweep: {
      number: '05',
      name: 'Liquidity Sweep & Displacement',
      classification: 'Institutional Stop-Hunt Mechanism',
      context: 'Level pucuk ganda (Equal Highs) atau lembah ganda (Equal Lows)',
      logic: 'Harga sengaja didorong menembus level resisten untuk memicu stop loss dari para seller ritel. Setelah likuiditas terbeli terserap oleh pesanan jual institusi, harga berbalik arah secara instan.',
      rules: [
        'Penembusan hanya terjadi via sumbu (wick), bukan penutupan body candle.',
        'Diikuti displacement bar tebal yang segera menutup kembali ke dalam range.',
        'Sinyal konfirmasi paling dapat diandalkan untuk setup pembalikan arah.'
      ],
      svg: (
        <svg viewBox="0 0 240 180" className="w-56 h-44 mx-auto">
          {/* Resistance Line */}
          <line x1="20" y1="65" x2="220" y2="65" stroke="#171916" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="25" y="55" fill="#85857D" fontSize="9" fontFamily="JetBrains Mono">EQUAL HIGHS ($$$ BSL POOL)</text>
          {/* Sweep candle */}
          <line x1="120" y1="25" x2="120" y2="150" stroke="#171916" strokeWidth="2.5" />
          <rect x="110" y="70" width="20" height="60" fill="#EAE7DF" stroke="#171916" strokeWidth="1.5" />
          {/* Sweep spike highlight */}
          <circle cx="120" cy="25" r="4" fill="#F26A3D" />
          <text x="135" y="32" fill="#F26A3D" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">SWEEP WICK</text>
        </svg>
      )
    }
  };

  const current = patternData[selected];

  return (
    <div className="border border-[#DCD9D0] bg-[#FFFFFF] p-6 md:p-10">
      {/* Pattern Selector Tabs (Swiss Editorial Index) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 border-b border-[#DCD9D0] pb-4 gap-2">
        {(Object.keys(patternData) as PatternType[]).map((key) => {
          const item = patternData[key];
          const isSelected = selected === key;
          return (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`text-left p-3 transition-colors border ${
                isSelected
                  ? 'border-[#171916] bg-[#F5F3ED] text-[#171916]'
                  : 'border-transparent text-[#85857D] hover:text-[#171916] hover:bg-[#EAE7DF]/40'
              }`}
            >
              <div className="text-[10px] font-mono-data text-[#85857D]">{item.number}</div>
              <div className="text-xs font-sans-ui font-semibold truncate mt-0.5">{item.name}</div>
            </button>
          );
        })}
      </div>

      {/* Main Pattern Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
        {/* Left: SVG Diagram Container */}
        <div className="lg:col-span-5 bg-[#F5F3ED] border border-[#DCD9D0] p-6 flex flex-col items-center justify-center">
          <div className="text-[11px] font-mono-data text-[#85857D] uppercase mb-2">
            FIG {current.number} · {current.classification}
          </div>
          {current.svg}
          <div className="text-[10px] font-mono-data text-[#85857D] text-center mt-3">
            Garis putus-putus menunjukkan level likuiditas dan ambang pembatas lelang.
          </div>
        </div>

        {/* Right: Editorial Explanation */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <div className="text-xs font-mono-data text-[#F26A3D] font-bold uppercase tracking-wider">
              FORMASI NO. {current.number} · {current.classification}
            </div>
            <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-[#171916] mt-1">
              {current.name}
            </h3>
            <p className="text-xs font-mono-data text-[#85857D] mt-1">
              Konteks Kunci: <span className="text-[#171916]">{current.context}</span>
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono-data uppercase text-[#171916] font-semibold">
              Mekanika Lelang (Auction Logic):
            </h4>
            <p className="text-sm font-sans-ui text-[#171916] leading-relaxed">
              {current.logic}
            </p>
          </div>

          <div className="p-4 bg-[#F5F3ED] border border-[#DCD9D0] space-y-2">
            <h4 className="text-xs font-mono-data uppercase text-[#171916] font-semibold">
              Aturan Validasi Objektif (Validation Checklist):
            </h4>
            <ul className="space-y-1.5 text-xs font-sans-ui text-[#171916]">
              {current.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-[#6D896B] font-mono-data font-bold">✓</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
