import React from 'react';
import { Roadmap, RoadmapNode } from '../types';
import { 
  Flame, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Award, 
  BookOpen, 
  Zap,
  Target,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface DashboardViewProps {
  roadmap: Roadmap | null;
  nodes: RoadmapNode[];
  onSelectNode: (node: RoadmapNode) => void;
  onNavigateToRoadmap: () => void;
  onNavigateToPlayground: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  roadmap,
  nodes,
  onSelectNode,
  onNavigateToRoadmap,
  onNavigateToPlayground
}) => {
  const completedNodes = nodes.filter(n => n.status === 'completed');
  const inProgressNodes = nodes.filter(n => n.status === 'in_progress');
  const availableNodes = nodes.filter(n => n.status === 'available');

  // Next node to continue
  const nextNode = inProgressNodes[0] || availableNodes[0] || nodes[0];

  const totalNodes = nodes.length;
  const completionPercentage = totalNodes > 0 ? Math.round((completedNodes.length / totalNodes) * 100) : 0;
  const xpEarned = completedNodes.length * 150 + inProgressNodes.length * 40;

  const achievements = [
    { id: 'first_candle', title: 'Auction Reader', desc: 'Selesaikan modul Anatomi Candlestick & Wick', icon: '🕯️', unlocked: completedNodes.some(n => n.id === 'node-1-1') },
    { id: 'structure_mapper', title: 'Structure Cartographer', desc: 'Kuasai BOS vs CHoCH & Valid Swing Points', icon: '📐', unlocked: completedNodes.some(n => n.id === 'node-2-2') },
    { id: 'liquidity_hunter', title: 'Liquidity Hunter', desc: 'Pahami jebakan BSL & SSL retail stops', icon: '🎯', unlocked: completedNodes.some(n => n.id === 'node-4-1') },
    { id: 'risk_master', title: 'Mathematical Fortress', desc: 'Pahami penempatan stop loss logis & 1:3 R:R', icon: '🛡️', unlocked: completedNodes.some(n => n.id === 'node-5-2') },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome & Streak Banner */}
      <div className="bg-[#0F172A] dark:bg-[#0F172A] not-dark:bg-white border border-[#1E293B] not-dark:border-slate-200 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl transition-all">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-xs font-mono">
              <Zap className="w-3.5 h-3.5" />
              <span>Trader Learning Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] not-dark:text-slate-900 tracking-tight">
              Selamat Datang Kembali, Trader.
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] not-dark:text-slate-600 max-w-xl leading-relaxed">
              Disiplin dan kurikulum teruji adalah keunggulan utama di pasar keuangan. Lanjutkan penguasaan konsep struktur pasar Anda hari ini.
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="bg-[#090D16] not-dark:bg-slate-50 border border-[#1E293B] not-dark:border-slate-200 rounded-xl p-3.5 text-center min-w-[90px]">
              <div className="flex items-center justify-center space-x-1 text-[#F59E0B]">
                <Flame className="w-4 h-4 fill-[#F59E0B]" />
                <span className="font-bold font-mono text-base">5</span>
              </div>
              <div className="text-[10px] font-mono text-[#94A3B8] not-dark:text-slate-500 uppercase mt-0.5">Hari Streak</div>
            </div>

            <div className="bg-[#090D16] not-dark:bg-slate-50 border border-[#1E293B] not-dark:border-slate-200 rounded-xl p-3.5 text-center min-w-[90px]">
              <div className="flex items-center justify-center space-x-1 text-[#10B981]">
                <TrendingUp className="w-4 h-4" />
                <span className="font-bold font-mono text-base">{xpEarned}</span>
              </div>
              <div className="text-[10px] font-mono text-[#94A3B8] not-dark:text-slate-500 uppercase mt-0.5">Total XP</div>
            </div>

            <div className="bg-[#090D16] not-dark:bg-slate-50 border border-[#1E293B] not-dark:border-slate-200 rounded-xl p-3.5 text-center min-w-[90px]">
              <div className="flex items-center justify-center space-x-1 text-[#38BDF8]">
                <Target className="w-4 h-4" />
                <span className="font-bold font-mono text-base">{completionPercentage}%</span>
              </div>
              <div className="text-[10px] font-mono text-[#94A3B8] not-dark:text-slate-500 uppercase mt-0.5">Selesai</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Continue Learning & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Continue Learning Primary Card (Left 7 Cols) */}
        <div className="lg:col-span-7 bg-[#0F172A] dark:bg-[#0F172A] not-dark:bg-white border border-[#1E293B] not-dark:border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1E293B] not-dark:border-slate-200">
              <span className="text-xs font-mono uppercase tracking-wider text-[#10B981] font-semibold flex items-center space-x-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Lanjutkan Pembelajaran Anda</span>
              </span>
              <span className="text-[11px] font-mono text-[#94A3B8] not-dark:text-slate-500">
                Jalur: {roadmap?.title || 'Price Action'}
              </span>
            </div>

            {nextNode ? (
              <div className="mt-5 space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                    Level {nextNode.level} · Modul #{nextNode.order_index}
                  </span>
                  <span className="text-xs font-mono text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded border border-[#F59E0B]/20">
                    Rekomendasi Berikutnya
                  </span>
                </div>

                <h2 className="text-xl font-bold text-[#F8FAFC] not-dark:text-slate-900 leading-snug">
                  {nextNode.title}
                </h2>

                <p className="text-xs text-[#94A3B8] not-dark:text-slate-600 leading-relaxed line-clamp-2">
                  {nextNode.summary}
                </p>

                <div className="pt-2 flex items-center space-x-4 text-xs font-mono text-[#CBD5E1] not-dark:text-slate-600">
                  <span>{nextNode.checklists?.length || 0} Checklist Validasi</span>
                  <span>•</span>
                  <span>{nextNode.quizzes?.length || 0} Soal Pemahaman</span>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-[#10B981] font-mono text-xs">
                Selamat! Seluruh modul dalam kurikulum ini telah tuntas Anda kuasai.
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#1E293B] not-dark:border-slate-200 flex items-center justify-between">
            {nextNode && (
              <button
                onClick={() => onSelectNode(nextNode)}
                className="px-5 py-2.5 bg-[#10B981] hover:bg-[#059669] text-[#090D16] font-bold rounded-xl text-xs transition-colors flex items-center space-x-2 shadow-sm"
              >
                <span>Buka Materi Modul</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onNavigateToRoadmap}
              className="text-xs font-mono text-[#94A3B8] not-dark:text-slate-600 hover:text-[#10B981] transition-colors"
            >
              Lihat Seluruh Canvas Peta Jalan &rarr;
            </button>
          </div>
        </div>

        {/* Progress & Milestone Overview (Right 5 Cols) */}
        <div className="lg:col-span-5 bg-[#0F172A] dark:bg-[#0F172A] not-dark:bg-white border border-[#1E293B] not-dark:border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1E293B] not-dark:border-slate-200">
              <span className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] font-semibold">
                Status Penguasaan Modul
              </span>
              <span className="text-xs font-mono font-bold text-[#F8FAFC] not-dark:text-slate-900">
                {completedNodes.length} / {totalNodes}
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="mt-4">
              <div className="w-full h-2.5 bg-[#090D16] not-dark:bg-slate-200 rounded-full overflow-hidden p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-[#10B981] to-[#38BDF8] rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] not-dark:text-slate-500 mt-2">
                <span>Fondasi Dasar</span>
                <span className="text-[#10B981] font-semibold">{completionPercentage}% Selesai</span>
                <span>Eksekusi Ahli</span>
              </div>
            </div>

            {/* Quick Status List */}
            <div className="mt-5 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#090D16] not-dark:bg-slate-50 border border-[#1E293B] not-dark:border-slate-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  <span className="text-[#F8FAFC] not-dark:text-slate-800">Modul Mastered</span>
                </div>
                <span className="text-[#10B981] font-bold">{completedNodes.length}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#090D16] not-dark:bg-slate-50 border border-[#1E293B] not-dark:border-slate-200">
                <div className="flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span className="text-[#F8FAFC] not-dark:text-slate-800">Sedang Dipelajari</span>
                </div>
                <span className="text-[#F59E0B] font-bold">{inProgressNodes.length}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-[#1E293B] not-dark:border-slate-200">
            <button
              onClick={onNavigateToPlayground}
              className="w-full py-2 bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/30 rounded-xl text-xs font-mono transition-colors flex items-center justify-center space-x-2"
            >
              <span>Buka Interactive Trading Playground</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Achievements & Milestones Showcase */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-[#F59E0B]" />
            <h2 className="text-base font-bold text-[#F8FAFC] not-dark:text-slate-900 tracking-tight">
              Pencapaian &amp; Lencana Keahlian (Badges)
            </h2>
          </div>
          <span className="text-xs font-mono text-[#94A3B8] not-dark:text-slate-500">
            {achievements.filter(a => a.unlocked).length} / {achievements.length} Terbuka
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map(ach => (
            <div
              key={ach.id}
              className={`p-4 rounded-xl border transition-all ${
                ach.unlocked
                  ? 'bg-[#0F172A] not-dark:bg-white border-[#10B981]/40 shadow-sm'
                  : 'bg-[#090D16]/50 not-dark:bg-slate-50 border-[#1E293B] not-dark:border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{ach.icon}</span>
                {ach.unlocked ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                    Unlocked
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1E293B] text-[#94A3B8]">
                    Terkunci
                  </span>
                )}
              </div>
              <h3 className="text-xs font-bold text-[#F8FAFC] not-dark:text-slate-900 mt-2">{ach.title}</h3>
              <p className="text-[11px] text-[#94A3B8] not-dark:text-slate-600 mt-1 leading-snug">{ach.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
