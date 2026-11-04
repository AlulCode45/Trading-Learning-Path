import React, { useState } from 'react';
import { MarketAtlasHeroVisual } from './landing/MarketAtlasHeroVisual';
import { RoadmapPreviewAtlas } from './landing/RoadmapPreviewAtlas';
import { InteractiveCandlestickAtlas } from './landing/InteractiveCandlestickAtlas';
import { ContributorPortalModal } from './ContributorPortalModal';
import { 
  ArrowRight, 
  Compass, 
  Layers, 
  ShieldCheck, 
  Brain, 
  TrendingUp, 
  BookOpen, 
  Scale, 
  Check, 
  ExternalLink,
  ChevronDown,
  Terminal,
  Users
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
  onExploreMethod: (slug: string) => void;
  onNavigateToPlayground?: () => void;
  onOpenCreateRoadmap?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterApp,
  onExploreMethod,
  onNavigateToPlayground,
  onOpenCreateRoadmap
}) => {
  const [isContributorModalOpen, setIsContributorModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F3ED] text-[#171916] font-sans-ui selection:bg-[#F26A3D]/25 selection:text-[#171916]">
      {/* Editorial Top Colophon Banner */}
      <div className="border-b border-[#DCD9D0] bg-[#EAE7DF] py-2 px-4 sm:px-8 text-[11px] font-mono-data text-[#85857D] flex flex-col sm:flex-row items-center justify-between gap-1">
        <div>
          <span>THE MARKET ATLAS</span>
          <span className="mx-2">·</span>
          <span>VOL. 01 — OPEN FINANCIAL ARCHITECTURE</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-[#6D896B]">● 100% PUBLIC ACCESS (NO ACCOUNT REQUIRED)</span>
          <button 
            onClick={() => setIsContributorModalOpen(true)}
            className="hover:text-[#171916] underline transition-colors"
          >
            Contributor Portal &rarr;
          </button>
        </div>
      </div>

      {/* Editorial Minimalist Navigation */}
      <header className="sticky top-0 z-40 bg-[#F5F3ED]/95 backdrop-blur-sm border-b border-[#DCD9D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo / Brandmark */}
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer group flex items-center space-x-3"
            >
              <div className="w-9 h-9 bg-[#171916] text-[#F5F3ED] flex items-center justify-center font-editorial text-xl font-bold">
                M
              </div>
              <div>
                <span className="font-editorial text-xl tracking-tight text-[#171916] block leading-none">
                  Trading Learning Path
                </span>
                <span className="text-[10px] font-mono-data uppercase tracking-wider text-[#85857D] block mt-1">
                  The Market Atlas
                </span>
              </div>
            </div>

            {/* Public Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 text-xs font-mono-data uppercase tracking-wider text-[#85857D]">
              <a href="#perspective" className="hover:text-[#171916] transition-colors">
                Perspective
              </a>
              <a href="#roadmap" className="hover:text-[#171916] transition-colors">
                Roadmap
              </a>
              <a href="#practice" className="hover:text-[#171916] transition-colors">
                Interactive Practice
              </a>
              <a href="#philosophy" className="hover:text-[#171916] transition-colors">
                Philosophy
              </a>
            </nav>

            {/* Public CTAs */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsContributorModalOpen(true)}
                className="hidden sm:inline-block text-xs font-mono-data uppercase tracking-wider text-[#85857D] hover:text-[#171916] transition-colors px-2 py-1"
              >
                Contributor Login
              </button>

              <button
                onClick={onEnterApp}
                className="px-5 py-2.5 bg-[#171916] hover:bg-[#F26A3D] text-[#F5F3ED] font-mono-data text-xs uppercase tracking-wider font-semibold transition-colors shadow-xs flex items-center space-x-2"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================
          SECTION 01: EDITORIAL HERO
      ======================================================== */}
      <section className="border-b border-[#DCD9D0] pt-16 pb-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Editorial Headline & Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-mono-data uppercase tracking-widest text-[#F26A3D] font-bold">
                <span>✦</span>
                <span>OPEN FINANCIAL CURRICULUM · ISSUE NO. 1</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-normal leading-[1.04] text-[#171916] tracking-tight">
                Understand the Market. <br />
                <span className="italic">One Concept at a Time.</span>
              </h1>

              <p className="text-base sm:text-lg font-sans-ui text-[#171916]/80 leading-relaxed max-w-xl">
                An interactive learning path designed to take you from trading fundamentals to confident market analysis. Structured progression, zero indicator lag, 100% public access.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onEnterApp}
                  className="px-7 py-3.5 bg-[#171916] hover:bg-[#F26A3D] text-[#F5F3ED] text-xs font-mono-data uppercase tracking-widest font-semibold transition-colors flex items-center space-x-3"
                >
                  <span>Start Learning Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#roadmap"
                  className="px-6 py-3.5 bg-transparent border border-[#171916] text-[#171916] hover:bg-[#171916] hover:text-[#F5F3ED] text-xs font-mono-data uppercase tracking-widest font-semibold transition-colors"
                >
                  Explore the Roadmap &darr;
                </a>
              </div>

              {/* Metadata Notes */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#DCD9D0] text-xs font-mono-data text-[#85857D]">
                <div>
                  <div className="text-2xl font-editorial text-[#171916]">12+</div>
                  <div className="mt-1">Structured Modules</div>
                </div>
                <div>
                  <div className="text-2xl font-editorial text-[#6D896B]">0.0%</div>
                  <div className="mt-1">Indicator Lag</div>
                </div>
                <div>
                  <div className="text-2xl font-editorial text-[#F26A3D]">Free</div>
                  <div className="mt-1">Public Access</div>
                </div>
              </div>
            </div>

            {/* Right Column: Custom Market Visualization */}
            <div className="lg:col-span-5">
              <MarketAtlasHeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 02: MARKET PERSPECTIVE (ASYMMETRIC GRID)
      ======================================================== */}
      <section id="perspective" className="border-b border-[#DCD9D0] py-20 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Eyebrow & Title */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-[#DCD9D0] gap-4">
            <div>
              <span className="text-xs font-mono-data uppercase tracking-widest text-[#F26A3D] font-bold">
                PART I · FOUR CORNERSTONES
              </span>
              <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#171916] mt-2">
                A Structured Discipline, Not Gambling
              </h2>
            </div>
            <p className="text-xs font-mono-data text-[#85857D] max-w-sm leading-relaxed">
              Trading profesional adalah penguasaan probabilitas lelang dan manajemen risiko asimetris, bukan ramalan masa depan.
            </p>
          </div>

          {/* Asymmetric 4-Part Editorial Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#DCD9D0] pt-10">
            {/* Concept 01: Market Structure (Span 6) */}
            <div className="md:col-span-6 pr-0 md:pr-10 pb-10 md:pb-0 space-y-4">
              <div className="text-sm font-mono-data text-[#F26A3D] font-bold">01 / MARKET STRUCTURE</div>
              <h3 className="text-2xl font-editorial font-normal text-[#171916]">
                Anatomi Struktur Pasar Murni
              </h3>
              <p className="text-sm font-sans-ui text-[#171916]/80 leading-relaxed">
                Pasar keuangan bergerak dalam gelombang fraktal lelang harga. Mengenali apakah pasar berada dalam kelanjutan tren (*Break of Structure*) atau pergeseran arah (*Change of Character*) adalah syarat mutlak sebelum mengeksekusi order apa pun.
              </p>
              <div className="p-4 bg-[#F5F3ED] border border-[#DCD9D0] font-mono-data text-xs space-y-1 text-[#85857D]">
                <div>• Valid Swing Highs vs Minor Pullback Noise</div>
                <div>• Protected Highs/Lows (Level Pertahanan Institusi)</div>
              </div>
            </div>

            {/* Concept 02: Value Areas & Liquidity (Span 6) */}
            <div className="md:col-span-6 pl-0 md:pl-10 pt-10 md:pt-0 space-y-4">
              <div className="text-sm font-mono-data text-[#6D896B] font-bold">02 / VALUE &amp; LIQUIDITY</div>
              <h3 className="text-2xl font-editorial font-normal text-[#171916]">
                Area Nilai &amp; Likuiditas Lelang
              </h3>
              <p className="text-sm font-sans-ui text-[#171916]/80 leading-relaxed">
                Institusi tidak membeli di harga mahal (*Premium*) dan tidak menjual di harga murah (*Discount*). Mengetahui di mana letak tumpukan Stop Loss ritel (*Liquidity Pools*) mencegah Anda menjadi mangsa empuk perburuan likuiditas (*Stop Hunt*).
              </p>
              <div className="p-4 bg-[#F5F3ED] border border-[#DCD9D0] font-mono-data text-xs space-y-1 text-[#85857D]">
                <div>• Equilibrium 50% Fair Value Threshold</div>
                <div>• Fresh vs Mitigated Supply &amp; Demand Zones</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#DCD9D0] pt-12 mt-12 border-t border-[#DCD9D0]">
            {/* Concept 03: Risk Architecture (Span 6) */}
            <div className="md:col-span-6 pr-0 md:pr-10 pb-10 md:pb-0 space-y-4">
              <div className="text-sm font-mono-data text-[#171916] font-bold">03 / MATHEMATICAL RISK</div>
              <h3 className="text-2xl font-editorial font-normal text-[#171916]">
                Arsitektur Risiko Asimetris (1:3 R:R)
              </h3>
              <p className="text-sm font-sans-ui text-[#171916]/80 leading-relaxed">
                Keberhasilan jangka panjang tidak ditentukan oleh frekuensi tebakan benar (*Win Rate*), melainkan asimetri rasio keuntungan dibanding risiko. Dengan target 1:3 R:R, Anda hanya membutuhkan 25% posisi benar untuk impas.
              </p>
              <div className="p-4 bg-[#F5F3ED] border border-[#DCD9D0] font-mono-data text-xs space-y-1 text-[#85857D]">
                <div>• Batasan Risiko Maksimal 1% Modal (Anti Risk of Ruin)</div>
                <div>• Formula Ukuran Lot Berdasarkan Jarak Stop Loss Struktural</div>
              </div>
            </div>

            {/* Concept 04: Trading Psychology (Span 6) */}
            <div className="md:col-span-6 pl-0 md:pl-10 pt-10 md:pt-0 space-y-4">
              <div className="text-sm font-mono-data text-[#85857D] font-bold">04 / DISCIPLINE &amp; MIND</div>
              <h3 className="text-2xl font-editorial font-normal text-[#171916]">
                Psikologi &amp; Disiplin Jurnal Objektif
              </h3>
              <p className="text-sm font-sans-ui text-[#171916]/80 leading-relaxed">
                Musuh terbesar trader bukan pasar, melainkan bias kognitif diri sendiri: FOMO, revenge trading, dan overleveraging. Dokumentasi tangkapan layar sebelum dan sesudah eksekusi menciptakan loop evaluasi yang terukur.
              </p>
              <div className="p-4 bg-[#F5F3ED] border border-[#DCD9D0] font-mono-data text-xs space-y-1 text-[#85857D]">
                <div>• Protokol Audit Transaksi Mingguan Tanpa Emosi</div>
                <div>• Checklist Eksekusi Pra-Order Wajib</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 03: LEARNING ROADMAP PREVIEW (SIGNATURE SECTION)
      ======================================================== */}
      <section id="roadmap" className="border-b border-[#DCD9D0] py-20 bg-[#F5F3ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-[#DCD9D0] gap-4">
            <div>
              <span className="text-xs font-mono-data uppercase tracking-widest text-[#F26A3D] font-bold">
                PART II · THE SIGNATURE PATH
              </span>
              <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#171916] mt-2">
                Peta Jalan Belajar 6 Tahapan
              </h2>
            </div>
            <p className="text-xs font-mono-data text-[#85857D] max-w-sm leading-relaxed">
              Klik setiap tahapan di bawah ini untuk melihat silabus materi, estimasi jam belajar, dan kompetensi yang diuji.
            </p>
          </div>

          <div className="mt-10">
            <RoadmapPreviewAtlas onSelectStage={() => onEnterApp()} />
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 04: LEARN THROUGH PRACTICE (CANDLESTICK ATLAS)
      ======================================================== */}
      <section id="practice" className="border-b border-[#DCD9D0] py-20 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-[#DCD9D0] gap-4">
            <div>
              <span className="text-xs font-mono-data uppercase tracking-widest text-[#6D896B] font-bold">
                PART III · INTERACTIVE RECOGNITION
              </span>
              <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#171916] mt-2">
                Belajar Melalui Praktik Nyata
              </h2>
            </div>
            <p className="text-xs font-mono-data text-[#85857D] max-w-sm leading-relaxed">
              Uji pemahaman Anda terhadap bahasa lelang candlestick. Pilih formasi di bawah untuk melihat anatomi dan aturan validasinya.
            </p>
          </div>

          <div className="mt-10">
            <InteractiveCandlestickAtlas />
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 05: LEARNING PHILOSOPHY (THE MANIFESTO)
      ======================================================== */}
      <section id="philosophy" className="border-b border-[#DCD9D0] py-20 bg-[#F5F3ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Pull-quote & Manifesto Statement */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono-data uppercase tracking-widest text-[#F26A3D] font-bold">
                PART IV · EDUCATIONAL METHODOLOGY
              </span>
              <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[#171916] leading-tight">
                Bagaimana Anda Menguasai Pasar di Sini
              </h2>
              <blockquote className="border-l-2 border-[#171916] pl-4 text-base font-editorial italic text-[#171916]">
                "Pengetahuan teoritis tanpa pengujian interaktif hanyalah ilusi kompetensi. Kami menyusun kurikulum ini dalam 5 langkah berulang yang terbukti efektif."
              </blockquote>
            </div>

            {/* Right: The 5-Step Learning Narrative */}
            <div className="lg:col-span-7 space-y-6">
              {[
                {
                  step: '01',
                  title: 'Understand the Concept',
                  desc: 'Setiap modul dimulai dengan definisi objektif dari mekanisme lelang pasar keuangan — tanpa terminologi spekulatif atau janji kosong cepat kaya.'
                },
                {
                  step: '02',
                  title: 'Explore Visual Examples',
                  desc: 'Materi diperkaya diagram vektor presisi yang membedah anatomi harga: dari sumbu penolakan lelang hingga pergeseran struktur mikro.'
                },
                {
                  step: '03',
                  title: 'Practice with Interactive Exercises',
                  desc: 'Trader menguji logika secara langsung di simulator chart: mengidentifikasi Break of Structure dan menghitung ukuran lot presisi.'
                },
                {
                  step: '04',
                  title: 'Evaluate Your Understanding',
                  desc: 'Kuis kognitif dan checklist validasi memastikan Anda benar-benar memahami syarat keabsahan sebelum menandai modul tuntas.'
                },
                {
                  step: '05',
                  title: 'Progress Through the Path',
                  desc: 'Modul lanjutan terbuka secara otomatis hanya jika fondasi prasyarat sebelumnya telah dikuasai dengan sempurna.'
                }
              ].map((item) => (
                <div key={item.step} className="p-5 bg-[#FFFFFF] border border-[#DCD9D0] flex items-start space-x-4">
                  <span className="text-lg font-mono-data font-bold text-[#F26A3D] flex-shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-base font-editorial font-normal text-[#171916]">{item.title}</h3>
                    <p className="text-xs font-sans-ui text-[#171916]/80 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 06: FINAL CALL TO ACTION
      ======================================================== */}
      <section className="py-24 border-b border-[#DCD9D0] bg-[#171916] text-[#F5F3ED]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="text-xs font-mono-data uppercase tracking-widest text-[#F26A3D] font-bold">
            THE FINAL IMPERATIVE
          </div>

          <h2 className="text-4xl sm:text-6xl font-editorial font-normal leading-tight text-[#F5F3ED]">
            Build Knowledge Before You Risk Capital.
          </h2>

          <p className="text-sm sm:text-base font-sans-ui text-[#DCD9D0] max-w-xl mx-auto leading-relaxed">
            Start with the fundamentals. Develop your process. Understand the market. Tanpa registrasi, tanpa biaya, 100% terbuka untuk publik.
          </p>

          <div className="pt-6">
            <button
              onClick={onEnterApp}
              className="px-8 py-4 bg-[#F26A3D] hover:bg-[#EAE7DF] hover:text-[#171916] text-[#F5F3ED] font-mono-data text-xs uppercase tracking-widest font-bold transition-colors inline-flex items-center space-x-3 shadow-lg"
            >
              <span>Start Learning Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          EDITORIAL COLOPHON & FOOTER
      ======================================================== */}
      <footer className="py-12 bg-[#EAE7DF] border-t border-[#DCD9D0] text-xs font-mono-data text-[#85857D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#DCD9D0]">
            <div className="md:col-span-5 space-y-2">
              <div className="font-editorial text-lg text-[#171916]">Trading Learning Path</div>
              <p className="text-xs font-sans-ui text-[#85857D] leading-relaxed max-w-sm">
                The Market Atlas adalah kurikulum terpadu terbuka yang didedikasikan untuk literasi pasar finansial objektif.
              </p>
            </div>

            <div className="md:col-span-3 space-y-2">
              <div className="text-xs font-bold text-[#171916] uppercase">Public Navigation</div>
              <ul className="space-y-1.5">
                <li><a href="#perspective" className="hover:text-[#171916]">Market Perspective</a></li>
                <li><a href="#roadmap" className="hover:text-[#171916]">Learning Roadmap</a></li>
                <li><a href="#practice" className="hover:text-[#171916]">Interactive Practice</a></li>
                <li><a href="#philosophy" className="hover:text-[#171916]">Philosophy</a></li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-2">
              <div className="text-xs font-bold text-[#171916] uppercase">Community &amp; Contribution</div>
              <p className="text-xs font-sans-ui text-[#85857D] leading-relaxed">
                Ingin berbagi roadmap atau menyumbangkan modul edukasi? Bergabunglah sebagai kurator komunitas.
              </p>
              <button
                onClick={() => setIsContributorModalOpen(true)}
                className="text-[#F26A3D] font-bold hover:underline block pt-1"
              >
                Buka Portal Kontributor &rarr;
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <div>
              © 2026 Trading Learning Path · The Market Atlas · All rights reserved.
            </div>
            <div>
              Design System: Swiss Editorial Minimalist · Antislop Certified.
            </div>
          </div>
        </div>
      </footer>

      {/* Contributor Portal Modal */}
      <ContributorPortalModal
        isOpen={isContributorModalOpen}
        onClose={() => setIsContributorModalOpen(false)}
        onOpenCreateRoadmap={() => {
          if (onOpenCreateRoadmap) onOpenCreateRoadmap();
          else onEnterApp();
        }}
      />
    </div>
  );
};
