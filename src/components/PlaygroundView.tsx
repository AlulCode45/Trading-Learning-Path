import React, { useState } from 'react';
import { MarketStructureSimulator } from './landing/MarketStructureSimulator';
import { RiskCalculatorBite } from './landing/RiskCalculatorBite';
import { Terminal, Shield, TrendingUp, Sparkles, AlertCircle, Info, Calculator } from 'lucide-react';

type PatternKey = 'hammer' | 'engulfing' | 'morning_star' | 'doji' | 'marubozu';

export const PlaygroundView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'patterns' | 'structure' | 'sizing'>('patterns');
  const [selectedPattern, setSelectedPattern] = useState<PatternKey>('hammer');

  // Position Sizing Calculator state
  const [equity, setEquity] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [stopLossPips, setStopLossPips] = useState<number>(20);
  const [pipValuePerLot, setPipValuePerLot] = useState<number>(10); // Standard $10/pip on 1.00 lot EUR/USD

  const dollarRisk = (equity * riskPercent) / 100;
  const calculatedLotSize = stopLossPips > 0 ? (dollarRisk / (stopLossPips * pipValuePerLot)) : 0;
  const targetGain3R = dollarRisk * 3;

  const patterns = {
    hammer: {
      name: 'Hammer / Pin Bar Rejection',
      type: 'Bullish Reversal',
      reliability: 'Tinggi di Zona Fresh Demand',
      description: 'Candle dengan body kecil di bagian atas dan sumbu bawah panjang (minimal 2-3x panjang body). Menunjukkan seller sempat mendorong harga jatuh bebas namun langsung dipukul mundur oleh likuiditas pembeli yang masif.',
      rules: [
        'Hanya valid jika terbentuk di area Discount atau Fresh Demand HTF',
        'Sumbu bawah harus menunjukkan penyerapan likuiditas (sweep) pada swing low sebelumnya',
        'Wajib menunggu candle penutup berikutnya sebagai konfirmasi momentum'
      ],
      svg: (
        <svg viewBox="0 0 160 160" className="w-36 h-36">
          <line x1="80" y1="20" x2="80" y2="40" stroke="#10B981" strokeWidth="2.5" />
          <rect x="65" y="40" width="30" height="25" fill="#10B981" rx="2" />
          <line x1="80" y1="65" x2="80" y2="145" stroke="#10B981" strokeWidth="3" />
        </svg>
      )
    },
    engulfing: {
      name: 'Bullish Engulfing Bar',
      type: 'Aggressive Momentum Shift',
      reliability: 'Tinggi jika Menelan Range 2+ Candle',
      description: 'Candle hijau besar yang badan lilinnya secara menyeluruh menelan (engulf) badan candle merah sebelumnya. Menandakan pergeseran kekuatan lelang seketika dari pihak penawar (seller) ke pihak penawar beli (buyer).',
      rules: [
        'Body candle konfirmasi harus menutup di atas High candle sebelumnya',
        'Idealnya diiringi lonjakan volume lelang (Effort vs Result)',
        'Sering menjadi cikal bakal terbentuknya zona Fair Value Gap (FVG)'
      ],
      svg: (
        <svg viewBox="0 0 200 160" className="w-44 h-36">
          {/* Bearish candle */}
          <line x1="60" y1="40" x2="60" y2="110" stroke="#F43F5E" strokeWidth="2" />
          <rect x="48" y="55" width="24" height="40" fill="#F43F5E" rx="2" />
          {/* Engulfing Bullish candle */}
          <line x1="130" y1="20" x2="130" y2="140" stroke="#10B981" strokeWidth="3" />
          <rect x="112" y="35" width="36" height="85" fill="#10B981" rx="2" />
        </svg>
      )
    },
    morning_star: {
      name: 'Morning Star Schematic',
      type: '3-Candle Reversal Pattern',
      reliability: 'Sangat Tinggi di Level Diskon Kunci',
      description: 'Formasi 3 candle: (1) Candle merah besar, (2) Candle kecil (indecision star) yang menyerap likuiditas di bawah, dan (3) Candle hijau besar yang ditutup melewati 50% rentang candle pertama.',
      rules: [
        'Candle tengah mencerminkan fase transfer inventaris lelang',
        'Candle ke-3 memverifikasi penolakan harga rendah secara definitif',
        'Stop loss logis ditempatkan tepat di bawah sumbu terendah candle tengah'
      ],
      svg: (
        <svg viewBox="0 0 240 160" className="w-52 h-36">
          {/* C1: Bearish */}
          <line x1="50" y1="25" x2="50" y2="120" stroke="#F43F5E" strokeWidth="2" />
          <rect x="40" y="35" width="20" height="70" fill="#F43F5E" rx="2" />
          {/* C2: Star */}
          <line x1="120" y1="100" x2="120" y2="145" stroke="#F59E0B" strokeWidth="2" />
          <rect x="112" y="115" width="16" height="14" fill="#F59E0B" rx="1" />
          {/* C3: Bullish */}
          <line x1="190" y1="20" x2="190" y2="130" stroke="#10B981" strokeWidth="2.5" />
          <rect x="180" y="30" width="20" height="80" fill="#10B981" rx="2" />
        </svg>
      )
    },
    doji: {
      name: 'Long-Legged Doji / Indecision',
      type: 'Auction Equilibrium Star',
      reliability: 'Netral (Butuh Konfirmasi Konteks)',
      description: 'Candle dengan harga pembukaan dan penutupan yang hampir identik dengan sumbu panjang di kedua sisi. Mencerminkan pertarungan lelang sengit di mana kedua belah pihak gagal memaksakan tren.',
      rules: [
        'Jangan pernah mengambil posisi trading hanya karena kemunculan Doji semata',
        'Doji di tengah zona tanpa struktur menandakan kebisingan acak (market noise)',
        'Perhatikan candle penutup berikutnya untuk konfirmasi arah pemenang'
      ],
      svg: (
        <svg viewBox="0 0 160 160" className="w-36 h-36">
          <line x1="80" y1="20" x2="80" y2="140" stroke="#94A3B8" strokeWidth="2.5" />
          <rect x="60" y="78" width="40" height="4" fill="#F8FAFC" rx="1" />
        </svg>
      )
    },
    marubozu: {
      name: 'Full Marubozu (Displacement Bar)',
      type: 'Pure Institutional Momentum',
      reliability: 'Tinggi untuk Breakout Konfirmasi',
      description: 'Candle berbadan tebal tanpa sumbu (atau sumbu amat kecil). Menunjukkan satu pihak mengontrol lelang secara mutlak dari detik pembukaan hingga bel penutupan.',
      rules: [
        'Seringkali memicu Break of Structure (BOS) yang sah',
        'Meninggalkan ketidakseimbangan order (Fair Value Gap) di belakangnya',
        'Pullback ke area 50% badan Marubozu sering menjadi area re-entry terbaik'
      ],
      svg: (
        <svg viewBox="0 0 160 160" className="w-36 h-36">
          <line x1="80" y1="18" x2="80" y2="24" stroke="#10B981" strokeWidth="2" />
          <rect x="55" y="24" width="50" height="112" fill="#10B981" rx="2" />
          <line x1="80" y1="136" x2="80" y2="142" stroke="#10B981" strokeWidth="2" />
        </svg>
      )
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Playground Header */}
      <div className="border-b border-[#1E293B] not-dark:border-slate-200 pb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30 text-xs font-mono mb-2">
          <Terminal className="w-3.5 h-3.5" />
          <span>Interactive Trading Laboratory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] not-dark:text-slate-900 tracking-tight">
          Laboratorium &amp; Simulator Trading Interaktif
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] not-dark:text-slate-600 mt-2 max-w-2xl leading-relaxed">
          Eksperimen langsung dengan pengenalan pola candlestick objektif, simulasi break of structure, dan kalkulasi ukuran lot matematis.
        </p>

        {/* Tab Buttons */}
        <div className="flex items-center space-x-2 mt-6">
          <button
            onClick={() => setActiveTab('patterns')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'patterns'
                ? 'bg-[#10B981] text-[#090D16] shadow-sm'
                : 'bg-[#0F172A] not-dark:bg-slate-100 text-[#94A3B8] not-dark:text-slate-600 border border-[#1E293B] not-dark:border-slate-200 hover:text-white not-dark:hover:text-black'
            }`}
          >
            Pola Candlestick &amp; Rejection
          </button>

          <button
            onClick={() => setActiveTab('structure')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'structure'
                ? 'bg-[#10B981] text-[#090D16] shadow-sm'
                : 'bg-[#0F172A] not-dark:bg-slate-100 text-[#94A3B8] not-dark:text-slate-600 border border-[#1E293B] not-dark:border-slate-200 hover:text-white not-dark:hover:text-black'
            }`}
          >
            Simulasi BOS &amp; CHoCH
          </button>

          <button
            onClick={() => setActiveTab('sizing')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'sizing'
                ? 'bg-[#10B981] text-[#090D16] shadow-sm'
                : 'bg-[#0F172A] not-dark:bg-slate-100 text-[#94A3B8] not-dark:text-slate-600 border border-[#1E293B] not-dark:border-slate-200 hover:text-white not-dark:hover:text-black'
            }`}
          >
            Kalkulator Lot &amp; Margin Presisi
          </button>
        </div>
      </div>

      {/* Tab 1: Pattern Explorer */}
      {activeTab === 'patterns' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Pattern Picker List */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-mono text-[#94A3B8] uppercase block mb-2">Pilih Formasi Candle:</span>
            {(Object.keys(patterns) as PatternKey[]).map(key => {
              const item = patterns[key];
              const isSelected = selectedPattern === key;
              return (
                <div
                  key={key}
                  onClick={() => setSelectedPattern(key)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0F172A] not-dark:bg-white border-[#10B981] shadow-md'
                      : 'bg-[#0F172A]/70 not-dark:bg-slate-50 border-[#1E293B] not-dark:border-slate-200 hover:border-[#334155]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#F8FAFC] not-dark:text-slate-900">{item.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981]">
                      {item.type}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-[#94A3B8] not-dark:text-slate-500 mt-1">{item.reliability}</div>
                </div>
              );
            })}
          </div>

          {/* Pattern Deep Dive Detail */}
          <div className="lg:col-span-8 bg-[#0F172A] not-dark:bg-white border border-[#1E293B] not-dark:border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E293B] not-dark:border-slate-200">
                <div>
                  <span className="text-xs font-mono uppercase text-[#10B981]">{patterns[selectedPattern].type}</span>
                  <h2 className="text-2xl font-bold text-[#F8FAFC] not-dark:text-slate-900 mt-1">
                    {patterns[selectedPattern].name}
                  </h2>
                </div>
                <div className="bg-[#090D16] not-dark:bg-slate-100 p-2 rounded-xl border border-[#1E293B] not-dark:border-slate-200 flex items-center justify-center">
                  {patterns[selectedPattern].svg}
                </div>
              </div>

              <div className="my-6 space-y-4">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] mb-1.5 flex items-center space-x-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>Mekanika Lelang (Auction Logic)</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#CBD5E1] not-dark:text-slate-700 leading-relaxed">
                    {patterns[selectedPattern].description}
                  </p>
                </div>

                <div className="bg-[#090D16] not-dark:bg-slate-50 p-4 rounded-xl border border-[#1E293B] not-dark:border-slate-200">
                  <h4 className="text-xs font-mono uppercase text-[#F59E0B] font-semibold mb-2 flex items-center space-x-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Aturan Validasi Struktural</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#94A3B8] not-dark:text-slate-600 font-mono">
                    {patterns[selectedPattern].rules.map((r, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-[#10B981]">✓</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1E293B] not-dark:border-slate-200 text-xs font-mono text-[#94A3B8]">
              💡 Ingat: Candlestick adalah bahasa lelang sesaat. Jangan pernah trading candle tanpa memperhatikan struktur HTF.
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Structure Simulator */}
      {activeTab === 'structure' && (
        <div className="space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-lg font-bold text-[#F8FAFC] not-dark:text-slate-900">
              Interactive Market Structure Engine
            </h2>
            <p className="text-xs text-[#94A3B8] not-dark:text-slate-600 mt-1">
              Uji skenario pembentukan Break of Structure (kelanjutan tren), Change of Character (sinyal pembalikan awal), dan Liquidity Sweep.
            </p>
          </div>
          <div className="max-w-3xl">
            <MarketStructureSimulator />
          </div>
        </div>
      )}

      {/* Tab 3: Precision Position Sizing Calculator */}
      {activeTab === 'sizing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-[#0F172A] not-dark:bg-white border border-[#1E293B] not-dark:border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#10B981] font-semibold flex items-center space-x-1.5">
                <Calculator className="w-3.5 h-3.5" />
                <span>Kalkulator Ukuran Lot Objektif</span>
              </span>
              <h2 className="text-xl font-bold text-[#F8FAFC] not-dark:text-slate-900 mt-1">
                Jangan Pernah Menebak Ukuran Posisi Anda
              </h2>
              <p className="text-xs text-[#94A3B8] not-dark:text-slate-600 mt-1">
                Kalkulator ini menghitung lot presisi berdasarkan jarak Stop Loss struktural Anda, sehingga kerugian moneter tetap terkunci tepat pada batas risiko akun Anda.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-1">
                  Modal Akun ($ USD)
                </label>
                <input
                  type="number"
                  value={equity}
                  onChange={e => setEquity(Math.max(100, Number(e.target.value)))}
                  className="w-full bg-[#090D16] not-dark:bg-slate-50 border border-[#1E293B] not-dark:border-slate-300 rounded-lg px-3.5 py-2.5 text-sm font-mono text-[#F8FAFC] not-dark:text-slate-900 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-1">
                    Batas Risiko (%)
                  </label>
                  <select
                    value={riskPercent}
                    onChange={e => setRiskPercent(Number(e.target.value))}
                    className="w-full bg-[#090D16] not-dark:bg-slate-50 border border-[#1E293B] not-dark:border-slate-300 rounded-lg px-3.5 py-2.5 text-sm font-mono text-[#F8FAFC] not-dark:text-slate-900 outline-none"
                  >
                    <option value={0.5}>0.5% (Konservatif)</option>
                    <option value={1}>1.0% (Standar Institusi)</option>
                    <option value={1.5}>1.5% (Moderat)</option>
                    <option value={2}>2.0% (Maksimal)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-1">
                    Jarak Stop Loss (Pips / Points)
                  </label>
                  <input
                    type="number"
                    value={stopLossPips}
                    onChange={e => setStopLossPips(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-[#090D16] not-dark:bg-slate-50 border border-[#1E293B] not-dark:border-slate-300 rounded-lg px-3.5 py-2.5 text-sm font-mono text-[#F8FAFC] not-dark:text-slate-900 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Output Card */}
          <div className="lg:col-span-5 bg-[#0B101D] not-dark:bg-slate-50 border border-[#1E293B] not-dark:border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">Hasil Rekomendasi Eksekusi:</div>
              
              <div className="mt-4 p-4 rounded-xl bg-[#090D16] not-dark:bg-white border border-[#1E293B] not-dark:border-slate-200">
                <div className="text-[11px] font-mono text-[#94A3B8]">Ukuran Lot yang Disarankan:</div>
                <div className="text-3xl font-extrabold font-mono text-[#10B981] mt-1">
                  {calculatedLotSize.toFixed(2)} Lots
                </div>
                <div className="text-[10px] font-mono text-[#94A3B8] mt-1">
                  Berdasarkan standar kontrak 1.00 lot = $10/pip
                </div>
              </div>

              <div className="mt-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between p-2.5 rounded-lg bg-[#090D16] not-dark:bg-white border border-[#1E293B] not-dark:border-slate-200">
                  <span className="text-[#F43F5E]">Maksimal Kerugian (1R):</span>
                  <span className="text-[#F43F5E] font-bold">-${dollarRisk.toFixed(0)}</span>
                </div>

                <div className="flex justify-between p-2.5 rounded-lg bg-[#090D16] not-dark:bg-white border border-[#1E293B] not-dark:border-slate-200">
                  <span className="text-[#10B981]">Potensi Keuntungan 1:3 R:R:</span>
                  <span className="text-[#10B981] font-bold">+${targetGain3R.toFixed(0)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1E293B] not-dark:border-slate-200 text-[11px] font-mono text-[#94A3B8]">
              🛡️ Aturan Emas: Sesuaikan ukuran lot dengan jarak Stop Loss, jangan pernah menyesuaikan Stop Loss demi bisa masuk dengan lot besar!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
