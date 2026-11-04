import React from 'react';
import { MarketStructureSimulator } from './landing/MarketStructureSimulator';
import { RiskCalculatorBite } from './landing/RiskCalculatorBite';
import { 
  ArrowRight, 
  Compass, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Users, 
  CheckCircle2, 
  Sparkles,
  BarChart2,
  TrendingUp,
  BookOpen
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
  onExploreMethod: (slug: string) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterApp,
  onExploreMethod,
  theme,
  setTheme
}) => {
  return (
    <div className="min-h-screen bg-[#090D16] dark:bg-[#090D16] not-dark:bg-[#F8FAFC] text-[#F8FAFC] not-dark:text-[#0F172A] transition-colors duration-200">
      {/* Landing Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-[#1E293B] not-dark:border-slate-200 bg-grid-tactical">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 text-xs font-mono uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open-Source Financial Trader Roadmap</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-[#F8FAFC] not-dark:text-slate-900">
                Berhenti Belajar Dari Noise. Kuasai Kurikulum Trading Terstruktur.
              </h1>

              <p className="text-base sm:text-lg text-[#94A3B8] not-dark:text-slate-600 leading-relaxed max-w-2xl">
                Tinggalkan ratusan video YouTube acak yang saling bertentangan. Trading Learning Path menghadirkan visual pohon belajar (DAG) berstandar institusi: dari Price Action murni, Smart Money Concepts, hingga mitigasi risiko matematis.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onEnterApp}
                  className="px-6 py-3.5 bg-[#10B981] hover:bg-[#059669] text-[#090D16] font-bold rounded-xl text-sm transition-all shadow-lg shadow-[#10B981]/20 flex items-center space-x-2 group"
                >
                  <span>Buka Peta Jalan (Interactive App)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#metodologi"
                  className="px-6 py-3.5 bg-[#0F172A] not-dark:bg-white text-[#F8FAFC] not-dark:text-slate-800 hover:border-[#10B981] border border-[#1E293B] not-dark:border-slate-200 font-semibold rounded-xl text-sm transition-all flex items-center space-x-2"
                >
                  <BookOpen className="w-4 h-4 text-[#10B981]" />
                  <span>Jelajahi 5 Metodologi</span>
                </a>
              </div>

              {/* Social Proof / Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#1E293B] not-dark:border-slate-200 text-xs font-mono">
                <div>
                  <div className="text-xl font-bold text-[#F8FAFC] not-dark:text-slate-900">12+</div>
                  <div className="text-[#94A3B8] not-dark:text-slate-500 mt-0.5">Modul Price Action</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#10B981]">100%</div>
                  <div className="text-[#94A3B8] not-dark:text-slate-500 mt-0.5">Bebas Indikator Lag</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#38BDF8]">Open UGC</div>
                  <div className="text-[#94A3B8] not-dark:text-slate-500 mt-0.5">Komunitas Terbuka</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Simulator Bite */}
            <div className="lg:col-span-5">
              <MarketStructureSimulator />
            </div>
          </div>
        </div>
      </section>

      {/* 5 Core Methodologies Section */}
      <section id="metodologi" className="py-20 border-b border-[#1E293B] not-dark:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-wider text-[#10B981] font-semibold">
              Kurikulum Berstandar Global
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] not-dark:text-slate-900 mt-2 tracking-tight">
              Pilih Jalur Spesialisasi Trading Anda
            </h2>
            <p className="text-sm text-[#94A3B8] not-dark:text-slate-600 mt-3 leading-relaxed">
              Setiap metodologi dibangun dengan kurva prasyarat logis. Tidak ada loncatan materi sebelum fondasi dasar teruji secara objektif.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Price Action (ACTIVE MVP) */}
            <div 
              onClick={() => onExploreMethod('price-action-market-structure')}
              className="bg-[#0F172A] not-dark:bg-white border-2 border-[#10B981] rounded-2xl p-6 flex flex-col justify-between hover:scale-[1.01] transition-all cursor-pointer shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#10B981] text-[#090D16] font-bold">
                  ACTIVE ROADMAP
                </span>
              </div>
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC] not-dark:text-slate-900 group-hover:text-[#10B981] transition-colors">
                  Price Action &amp; Market Structure
                </h3>
                <p className="text-xs text-[#94A3B8] not-dark:text-slate-600 mt-2 leading-relaxed">
                  Fondasi membaca lelang harga murni, validitas swing high/low, BOS, CHoCH, dan liquidity sweep tanpa ketergantungan indikator.
                </p>
                <div className="mt-4 pt-3 border-t border-[#1E293B] not-dark:border-slate-100 space-y-1.5 text-xs text-[#CBD5E1] not-dark:text-slate-700 font-mono">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>12 Modul Pembelajaran Interaktif</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Interactive SVG DAG Engine</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1E293B] not-dark:border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono text-[#10B981] font-semibold">Mulai Jalur Ini &rarr;</span>
                <span className="text-[11px] font-mono text-[#94A3B8]">Est. 45 Jam</span>
              </div>
            </div>

            {/* Card 2: SMC / ICT */}
            <div 
              onClick={onEnterApp}
              className="bg-[#0F172A] not-dark:bg-white border border-[#1E293B] not-dark:border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-[#38BDF8] transition-all cursor-pointer group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC] not-dark:text-slate-900 group-hover:text-[#38BDF8] transition-colors">
                  Smart Money Concepts (SMC) &amp; ICT
                </h3>
                <p className="text-xs text-[#94A3B8] not-dark:text-slate-600 mt-2 leading-relaxed">
                  Membedah Order Blocks, Fair Value Gap (FVG), interbank killzones, dan algoritma IPDA dalam mengantarkan harga ke liquidity pool.
                </p>
                <div className="mt-4 pt-3 border-t border-[#1E293B] not-dark:border-slate-100 space-y-1.5 text-xs text-[#94A3B8] not-dark:text-slate-600 font-mono">
                  <div>• Model AMD (Accumulation, Manipulation, Distribution)</div>
                  <div>• Sesi London &amp; New York Open Killzones</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1E293B] not-dark:border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono text-[#38BDF8]">Lihat Silabus Lengkap &rarr;</span>
                <span className="text-[11px] font-mono text-[#94A3B8]">14 Modul</span>
              </div>
            </div>

            {/* Card 3: Wyckoff & VSA */}
            <div 
              onClick={onEnterApp}
              className="bg-[#0F172A] not-dark:bg-white border border-[#1E293B] not-dark:border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-[#F59E0B] transition-all cursor-pointer group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] mb-4">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC] not-dark:text-slate-900 group-hover:text-[#F59E0B] transition-colors">
                  Wyckoff Method &amp; VSA
                </h3>
                <p className="text-xs text-[#94A3B8] not-dark:text-slate-600 mt-2 leading-relaxed">
                  Prinsip akumulasi, distribusi, Spring/Shakeout, dan analisis interaksi volume lelang terhadap spread batang harga.
                </p>
                <div className="mt-4 pt-3 border-t border-[#1E293B] not-dark:border-slate-100 space-y-1.5 text-xs text-[#94A3B8] not-dark:text-slate-600 font-mono">
                  <div>• Schematics Fase Akumulasi A–E</div>
                  <div>• Volume Spread Analysis (Absorption vs Climax)</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1E293B] not-dark:border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono text-[#F59E0B]">Lihat Silabus Lengkap &rarr;</span>
                <span className="text-[11px] font-mono text-[#94A3B8]">12 Modul</span>
              </div>
            </div>

            {/* Card 4: Risk Management & Psychology */}
            <div 
              onClick={onEnterApp}
              className="bg-[#0F172A] not-dark:bg-white border border-[#1E293B] not-dark:border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-[#10B981] transition-all cursor-pointer group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC] not-dark:text-slate-900 group-hover:text-[#10B981] transition-colors">
                  Risk Management &amp; Psychology
                </h3>
                <p className="text-xs text-[#94A3B8] not-dark:text-slate-600 mt-2 leading-relaxed">
                  Fondasi matematis bertahan hidup: fractional position sizing 1%, asimetris R:R, mitigasi tilt emosi, dan audit jurnal objektif.
                </p>
                <div className="mt-4 pt-3 border-t border-[#1E293B] not-dark:border-slate-100 space-y-1.5 text-xs text-[#94A3B8] not-dark:text-slate-600 font-mono">
                  <div>• Mencegah Risk of Ruin &amp; Drawdown Spiral</div>
                  <div>• Trade Plan &amp; Emotional Discipline Matrix</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1E293B] not-dark:border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono text-[#10B981]">Lihat Silabus Lengkap &rarr;</span>
                <span className="text-[11px] font-mono text-[#94A3B8]">10 Modul</span>
              </div>
            </div>

            {/* Card 5: Quantitative & Algo */}
            <div 
              onClick={onEnterApp}
              className="bg-[#0F172A] not-dark:bg-white border border-[#1E293B] not-dark:border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-[#A855F7] transition-all cursor-pointer group md:col-span-2 lg:col-span-2"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#A855F7]/15 border border-[#A855F7]/30 flex items-center justify-center text-[#A855F7] mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC] not-dark:text-slate-900 group-hover:text-[#A855F7] transition-colors">
                  Quantitative &amp; Algorithmic Trading
                </h3>
                <p className="text-xs text-[#94A3B8] not-dark:text-slate-600 mt-2 leading-relaxed">
                  Pemrograman Python finansial, Pine Script v5, backtesting bebas bias, dan automasi eksekusi API tanpa intervensi emosional.
                </p>
                <div className="mt-4 pt-3 border-t border-[#1E293B] not-dark:border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#94A3B8] not-dark:text-slate-600 font-mono">
                  <div>• Data Wrangling Pandas &amp; Volatilitas</div>
                  <div>• Walk-Forward Testing &amp; Sharpe Ratio</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1E293B] not-dark:border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono text-[#A855F7]">Lihat Silabus Lengkap &rarr;</span>
                <span className="text-[11px] font-mono text-[#94A3B8]">16 Modul</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Bite: Risk Calculator Simulator */}
      <section className="py-20 border-b border-[#1E293B] not-dark:border-slate-200 bg-[#0B101D] not-dark:bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-10 text-center">
            <span className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] font-semibold">
              Interactive Mathematics
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] not-dark:text-slate-900 mt-1">
              Buktikan Sendiri Kekuatan Manajemen Risiko Asimetris
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] not-dark:text-slate-600 mt-2">
              Geser nilai modal dan rasio keuntungan untuk melihat simulasi hasil nyata 20 transaksi.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <RiskCalculatorBite />
          </div>
        </div>
      </section>

      {/* Community Callout & Final CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-xs font-mono">
            <Users className="w-3.5 h-3.5" />
            <span>Dibangun Bersama Komunitas</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] not-dark:text-slate-900 tracking-tight">
            Mulai Belajar Melalui Peta Jalan Interaktif Sekarang
          </h2>

          <p className="text-sm text-[#94A3B8] not-dark:text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Semua modul dilengkapi diagram visual, checklist verifikasi, serta penyimpanan progres lokal instan tanpa perlu mendaftar akun rumit.
          </p>

          <div className="pt-4 flex justify-center">
            <button
              onClick={onEnterApp}
              className="px-8 py-4 bg-[#10B981] hover:bg-[#059669] text-[#090D16] font-bold rounded-xl text-base transition-all shadow-xl shadow-[#10B981]/25 flex items-center space-x-2 group"
            >
              <span>Masuk ke Canvas Roadmap</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* High-Taste Minimalist Footer */}
      <footer className="border-t border-[#1E293B] not-dark:border-slate-200 py-10 bg-[#090D16] not-dark:bg-slate-100 text-xs font-mono text-[#94A3B8] not-dark:text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="font-semibold text-[#F8FAFC] not-dark:text-slate-900">Trading Learning Path</span>
            <span>— Free &amp; Open Financial Education</span>
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hover:text-[#F8FAFC] not-dark:hover:text-slate-900 transition-colors"
            >
              Tema: {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
            <a href="#metodologi" className="hover:text-[#10B981] transition-colors">Metodologi</a>
            <button onClick={onEnterApp} className="hover:text-[#10B981] transition-colors">Buka Aplikasi</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
