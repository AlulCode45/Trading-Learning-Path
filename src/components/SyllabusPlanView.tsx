import React from 'react';
import { Layers, ShieldCheck, Cpu, BarChart3, Globe2, Sparkles, CheckCircle2 } from 'lucide-react';

export const SyllabusPlanView: React.FC = () => {
  const plans = [
    {
      title: 'Smart Money Concepts (SMC) & ICT Path',
      category: 'Institutional Trading',
      status: 'Ready for Release',
      statusColor: 'text-[#10B981] bg-[#10B981]/15 border-[#10B981]/30',
      icon: Layers,
      hours: '60 Jam',
      modulesCount: 14,
      description: 'Membedah algoritma penghantar harga antarbank (IPDA), jejak institusi, Fair Value Gap (FVG), dan sesi trading Killzones.',
      levels: [
        { name: 'Level 1: Imbalance & Order Blocks', topics: ['Mean Threshold OB', 'Breaker Blocks & Mitigation', 'Fair Value Gap (FVG) & Inversion'] },
        { name: 'Level 2: Sesi Likuiditas & Jam Pasar', topics: ['Asian Range Dynamics', 'London Open Killzone', 'New York Open & PM Session Expansion'] },
        { name: 'Level 3: Model Manipulasi Institusi', topics: ['Accumulation - Manipulation - Distribution (AMD)', 'Judas Swing Protocols', 'Daily Bias Formulation'] },
        { name: 'Level 4: High-Probability Execution', topics: ['Turtle Soup Strategy', 'Silver Bullet 60-min window', 'Multi-TF Model (Daily to M1)'] }
      ]
    },
    {
      title: 'Wyckoff Method & Volume Spread Analysis (VSA)',
      category: 'Classical Volume Analysis',
      status: 'Architecture Completed',
      statusColor: 'text-[#38BDF8] bg-[#38BDF8]/15 border-[#38BDF8]/30',
      icon: BarChart3,
      hours: '50 Jam',
      modulesCount: 12,
      description: 'Studi mendalam hukum lelang Richard Wyckoff: siklus akumulasi, distribusi, spring, markup, serta interaksi volume terhadap spread harga.',
      levels: [
        { name: 'Level 1: Tiga Hukum Pokok Wyckoff', topics: ['Supply vs Demand', 'Cause vs Effect (Point & Figure)', 'Effort vs Result Analysis'] },
        { name: 'Level 2: Schematics Akumulasi', topics: ['Phase A (PS, SC, AR, ST)', 'Phase B (Testing Supply)', 'Phase C (The Spring / Shakeout)', 'Phase D & E (Sign of Strength SOS)'] },
        { name: 'Level 3: Schematics Distribusi', topics: ['Preliminary Supply (PSY) & Buying Climax (BC)', 'Upthrust After Distribution (UTAD)', 'Sign of Weakness (SOW) & Markdown'] },
        { name: 'Level 4: Bar-by-Bar VSA Reading', topics: ['Climax Volume', 'Absorption Volume', 'No Demand & No Supply Test Bars'] }
      ]
    },
    {
      title: 'Risk Management & Trading Psychology',
      category: 'Core Foundation',
      status: 'Prioritas Berikutnya',
      statusColor: 'text-[#F59E0B] bg-[#F59E0B]/15 border-[#F59E0B]/30',
      icon: ShieldCheck,
      hours: '30 Jam',
      modulesCount: 10,
      description: 'Matematika probabilitas untuk mencegah Risk of Ruin, fractional sizing 1%, manajemen emosi tilt, dan protokol jurnal objektif.',
      levels: [
        { name: 'Level 1: Matematika Probabilitas Pasar', topics: ['Law of Large Numbers', 'Menghitung Expected Value (EV)', 'Distribusi Acak Win/Loss'] },
        { name: 'Level 2: Position Sizing Logis', topics: ['Aturan Maksimal 1% Risiko per Trade', 'Kalkulasi Lot Otomatis', 'Drawdown Recovery Matrix'] },
        { name: 'Level 3: Pemrograman Psikologi Trader', topics: ['Mengatasi FOMO & Revenge Trading', 'Cognitive Biases dalam Charting', 'Disiplin Duduk di Tangan (Patience)'] },
        { name: 'Level 4: Audit & Jurnal Berkala', topics: ['Metrik Sharpe & Sortino Pribadi', 'Review Eksekusi Mingguan', 'Trade Plan Checklist'] }
      ]
    },
    {
      title: 'Quantitative & Algorithmic Trading Path',
      category: 'Kuantitatif & Sistematis',
      status: 'Perencanaan Kurikulum',
      statusColor: 'text-[#A855F7] bg-[#A855F7]/15 border-[#A855F7]/30',
      icon: Cpu,
      hours: '80 Jam',
      modulesCount: 16,
      description: 'Pengembangan strategi berbasis data tanpa bias subjektif menggunakan Python finansial (Pandas, Numpy), Pine Script v5, dan automated backtesting.',
      levels: [
        { name: 'Level 1: Python untuk Analisis Finansial', topics: ['Pembersihan Data OHLCV', 'Kalkulasi Volatilitas & Moving Distributions', 'Visualisasi Seaborn'] },
        { name: 'Level 2: Pine Script v5 Mastery', topics: ['Custom Indicators & Alerts', 'Strategy Execution Tester', 'Trailing Stop & Dynamic TP Automation'] },
        { name: 'Level 3: Backtesting Bebas Bias', topics: ['Menghindari Lookahead Bias', 'Walk-Forward Analysis', 'Monte Carlo Simulation'] },
        { name: 'Level 4: Eksekusi API Brokerage', topics: ['Order Management System (OMS)', 'Webhooks TradingView ke CCXT / MetaTrader', 'Latency Management'] }
      ]
    },
    {
      title: 'Macro, Intermarket & Fundamental Analysis',
      category: 'Makroekonomi Global',
      status: 'Perencanaan Kurikulum',
      statusColor: 'text-[#94A3B8] bg-[#1E293B] border-[#334155]',
      icon: Globe2,
      hours: '40 Jam',
      modulesCount: 10,
      description: 'Memahami gambaran besar likuiditas global: kebijakan suku bunga The Fed/ECB, korelasi DXY vs Emas vs Yield Obligasi, serta kalender berita High-Impact.',
      levels: [
        { name: 'Level 1: Siklus Kebijakan Moneter', topics: ['Suku Bunga & Quantitative Easing/Tightening', 'Dot Plot & Ekspektasi Pasar FedWatch', 'Inflasi CPI vs PCE'] },
        { name: 'Level 2: Rantai Korelasi Antarpasar', topics: ['US Dollar Index (DXY) vs Komoditas', 'US 10-Year Treasury Yields vs Saham', 'Risk-On vs Risk-Off Sentiment'] },
        { name: 'Level 3: Kalender Berita Ekonomi', topics: ['Non-Farm Payrolls (NFP) Breakdown', 'Gross Domestic Product (GDP) & PMI', 'Strategi No-Trade Sebelum Red Folder'] },
        { name: 'Level 4: Data Sentimen Institusi', topics: ['Commitment of Traders (COT) Report', 'Options Open Interest Max Pain', 'Central Bank Reserves'] }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 text-xs font-mono uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Rencana Silabus Masa Depan</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
          Peta Kurikulum Terpadu Seluruh Metodologi
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 max-w-3xl leading-relaxed">
          Berikut adalah rancangan silabus mendalam untuk metodologi trading lanjutan yang akan segera dirilis sebagai jalur interaktif berikutnya di Trading Learning Path.
        </p>
      </div>

      {/* Grid of Future Paths */}
      <div className="space-y-6">
        {plans.map((plan, idx) => {
          const Icon = plan.icon;
          return (
            <div
              key={idx}
              className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 hover:border-[#334155] transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-[#1E293B] gap-3">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#090D16] border border-[#1E293B] flex items-center justify-center text-[#10B981]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#F8FAFC]">{plan.title}</h2>
                    <span className="text-xs font-mono text-[#94A3B8]">{plan.category} • Est. {plan.hours} • {plan.modulesCount} Modul</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`text-xs font-mono px-3 py-1 rounded-full border ${plan.statusColor}`}>
                    {plan.status}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#CBD5E1] my-4 leading-relaxed max-w-4xl">
                {plan.description}
              </p>

              {/* Levels & Topics Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {plan.levels.map((lvl, lIdx) => (
                  <div key={lIdx} className="bg-[#090D16] p-3.5 rounded-xl border border-[#1E293B]">
                    <div className="text-xs font-mono font-semibold text-[#10B981] mb-2">{lvl.name}</div>
                    <ul className="space-y-1.5">
                      {lvl.topics.map((t, tIdx) => (
                        <li key={tIdx} className="text-[11px] text-[#94A3B8] flex items-start space-x-1.5">
                          <CheckCircle2 className="w-3 h-3 text-[#38BDF8] flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
