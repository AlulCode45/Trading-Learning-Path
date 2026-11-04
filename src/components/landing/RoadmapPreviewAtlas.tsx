import React, { useState } from 'react';

interface RoadmapPreviewAtlasProps {
  onSelectStage: (stageIndex: number) => void;
}

export const RoadmapPreviewAtlas: React.FC<RoadmapPreviewAtlasProps> = ({ onSelectStage }) => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      step: '01',
      title: 'Foundations of Market Auction',
      tagline: 'Anatomi Candlestick & Fraktalitas Multi-Timeframe',
      hours: '15 Jam',
      topics: [
        'Auction Market Theory & Mekanisme Penawaran / Permintaan',
        'Anatomi Candlestick: Real Body vs Absorption Wicks',
        'Hubungan Fraktal: Dari Candle Harian hingga Eksekusi Menit'
      ],
      deliverable: 'Mampu membaca lelang harga murni tanpa ketergantungan indikator lag.'
    },
    {
      step: '02',
      title: 'Market Mechanics & Liquidity',
      tagline: 'Buy-Side & Sell-Side Liquidity Clusters',
      hours: '20 Jam',
      topics: [
        'Kumpulan Likuiditas Ritel: Stop Cluster di Atas Equal Extremes',
        'Anatomi Liquidity Sweep & Stop Hunt Institusi',
        'Siklus Sesi Interbank (Asia, London Open, New York Overlap)'
      ],
      deliverable: 'Memetakan letak resting orders institusi sebelum menekan tombol entri.'
    },
    {
      step: '03',
      title: 'Technical Analysis & Structure',
      tagline: 'Break of Structure (BOS) & Change of Character (CHoCH)',
      hours: '25 Jam',
      topics: [
        'Identifikasi Swing High & Swing Low Objektif',
        'BOS (Kelanjutan Tren) vs CHoCH (Pergeseran Karakter)',
        'Supply & Demand Modern: Fresh vs Mitigated Zones'
      ],
      deliverable: 'Memvalidasi kelanjutan atau pembalikan tren dengan konfirmasi body candle.'
    },
    {
      step: '04',
      title: 'Risk Architecture & Probability',
      tagline: 'Matematika Bertahan Hidup & Asymmetric R:R',
      hours: '15 Jam',
      topics: [
        'The 1% Maximum Risk Rule & Mencegah Risk of Ruin',
        'Rasio Asimetris 1:3: Mengapa 35% Win Rate Tetap Untung',
        'Kalkulasi Ukuran Lot Berdasarkan Jarak Stop Loss Struktural'
      ],
      deliverable: 'Protokol modal matematis yang menjamin akun tidak akan pernah mengalami kehancuran.'
    },
    {
      step: '05',
      title: 'Trading Strategies & Execution',
      tagline: 'Protokol Konfirmasi Eksekusi Timeframe Rendah (LTF)',
      hours: '30 Jam',
      topics: [
        'Top-Down Analysis: Menghubungkan Bias HTF ke Trigger LTF',
        'Penempatan Stop Loss Logis di Luar Protected Extremes',
        'Target Take Profit Berbasis Likuiditas & Area Diskon'
      ],
      deliverable: 'Rencana trading (Trade Plan) tertulis dengan aturan invalidasi tak tergoyahkan.'
    },
    {
      step: '06',
      title: 'Advanced Practice & Verification',
      tagline: 'Audit Jurnal Objektif & Pengujian Tanpa Bias',
      hours: '25 Jam',
      topics: [
        'Disiplin Jurnal: Dokumentasi Screenshot Sebelum & Sesudah Entri',
        'Audit Mingguan: Evaluasi Rasio Sharpe & Sortino Pribadi',
        'Mitigasi Bias Psikologis: Mengeliminasi FOMO & Revenge Trading'
      ],
      deliverable: 'Loop feedback berkesinambungan yang membedakan trader profesional dari spekulan amatir.'
    }
  ];

  const current = stages[activeStage];

  return (
    <div className="space-y-8">
      {/* Interactive Stage Step Connector (Swiss Minimalist Layout) */}
      <div className="grid grid-cols-2 md:grid-cols-6 border border-[#DCD9D0] divide-y md:divide-y-0 md:divide-x divide-[#DCD9D0] bg-[#FFFFFF]">
        {stages.map((stg, idx) => {
          const isActive = activeStage === idx;
          return (
            <button
              key={stg.step}
              onClick={() => setActiveStage(idx)}
              className={`text-left p-4 md:p-5 transition-all group ${
                isActive
                  ? 'bg-[#F5F3ED] border-b-2 border-b-[#F26A3D] text-[#171916]'
                  : 'hover:bg-[#EAE7DF]/40 text-[#85857D] hover:text-[#171916]'
              }`}
            >
              <div className="flex items-center justify-between font-mono-data text-xs">
                <span className={isActive ? 'text-[#F26A3D] font-bold' : 'text-[#85857D]'}>
                  STAGE {stg.step}
                </span>
                <span className="text-[10px] text-[#85857D]">{stg.hours}</span>
              </div>
              <div className="text-xs font-sans-ui font-semibold text-[#171916] mt-2 line-clamp-2">
                {stg.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Deep-Dive Card */}
      <div className="border border-[#DCD9D0] bg-[#FFFFFF] p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#DCD9D0] gap-4">
          <div>
            <div className="text-xs font-mono-data text-[#F26A3D] font-bold uppercase tracking-wider">
              TAHAPAN KURIKULUM {current.step} DARI 06
            </div>
            <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-[#171916] mt-1">
              {current.title}
            </h3>
            <p className="text-xs sm:text-sm font-sans-ui text-[#85857D] mt-1">
              {current.tagline} • Est. Durasi {current.hours}
            </p>
          </div>

          <button
            onClick={() => onSelectStage(activeStage)}
            className="self-start md:self-auto px-5 py-2.5 bg-[#171916] text-[#F5F3ED] hover:bg-[#F26A3D] transition-colors text-xs font-mono-data uppercase tracking-wider flex items-center space-x-2"
          >
            <span>Buka Modul di Peta Jalan</span>
            <span>&rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8">
          {/* Topics List */}
          <div className="md:col-span-7 space-y-4">
            <h4 className="text-xs font-mono-data uppercase text-[#171916] font-semibold">
              Materi Kurikulum yang Dipelajari:
            </h4>
            <div className="space-y-3">
              {current.topics.map((tpc, tIdx) => (
                <div key={tIdx} className="flex items-start space-x-3 p-3 bg-[#F5F3ED] border border-[#DCD9D0]">
                  <span className="font-mono-data text-xs text-[#F26A3D] font-bold mt-0.5">0{tIdx + 1}</span>
                  <span className="text-xs font-sans-ui text-[#171916] leading-relaxed">{tpc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Outcome / Deliverable */}
          <div className="md:col-span-5 bg-[#EAE7DF] border border-[#DCD9D0] p-6 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono-data text-[#85857D] uppercase tracking-wider">
                TARGET HASIL BELAJAR (MILESTONE):
              </div>
              <div className="mt-3 text-sm font-editorial italic text-[#171916] leading-relaxed">
                "{current.deliverable}"
              </div>
            </div>

            <div className="pt-6 border-t border-[#DCD9D0] text-[11px] font-mono-data text-[#6D896B] flex items-center space-x-1.5">
              <span>●</span>
              <span>100% TERBUKA UNTUK PUBLIK (BEBAS AKSES)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
