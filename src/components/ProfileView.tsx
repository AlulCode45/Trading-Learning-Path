import React from 'react';
import { RoadmapNode } from '../types';
import { User, Award, Shield, CheckCircle2, Flame, TrendingUp, Calendar, Zap } from 'lucide-react';

interface ProfileViewProps {
  nodes: RoadmapNode[];
}

export const ProfileView: React.FC<ProfileViewProps> = ({ nodes }) => {
  const completedNodes = nodes.filter(n => n.status === 'completed');
  const inProgressNodes = nodes.filter(n => n.status === 'in_progress');
  const totalChecklists = nodes.reduce((acc, n) => acc + (n.checklists?.length || 0), 0);
  const completedChecklists = nodes.reduce((acc, n) => acc + (n.checklists?.filter(c => c.is_completed).length || 0), 0);

  const xp = completedNodes.length * 150 + inProgressNodes.length * 40;

  const getRank = () => {
    if (completedNodes.length >= 10) return { title: 'Market Structure Master', level: 'Senior Tier', badge: '💎' };
    if (completedNodes.length >= 6) return { title: 'Auction Liquidity Specialist', level: 'Intermediate Tier', badge: '⚡' };
    if (completedNodes.length >= 2) return { title: 'Price Action Apprentice', level: 'Developing Tier', badge: '🌱' };
    return { title: 'Market Novice', level: 'Foundation Tier', badge: '🧭' };
  };

  const rank = getRank();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Card Header */}
      <div className="bg-[#0F172A] not-dark:bg-white border border-[#1E293B] not-dark:border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 shadow-xl transition-all">
        <div className="w-20 h-20 rounded-2xl bg-[#090D16] not-dark:bg-slate-100 border-2 border-[#10B981] flex items-center justify-center text-4xl shadow-lg shadow-[#10B981]/15">
          {rank.badge}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
            <h1 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] not-dark:text-slate-900">
              Trader ID #4092
            </h1>
            <span className="inline-block text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
              {rank.level}
            </span>
          </div>

          <p className="text-xs text-[#94A3B8] not-dark:text-slate-600 mt-1 font-mono">
            Gelar Keahlian: <strong className="text-[#F8FAFC] not-dark:text-slate-900">{rank.title}</strong>
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4 text-xs font-mono text-[#CBD5E1] not-dark:text-slate-600">
            <span className="flex items-center space-x-1.5 text-[#F59E0B]">
              <Flame className="w-4 h-4 fill-[#F59E0B]" />
              <span>5 Hari Belajar Aktif Berturut-turut</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1.5 text-[#10B981]">
              <TrendingUp className="w-4 h-4" />
              <span>{xp} Total Experience Points (XP)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Numerical Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#0F172A] not-dark:bg-white p-5 rounded-2xl border border-[#1E293B] not-dark:border-slate-200 text-center shadow-sm">
          <div className="text-2xl font-bold font-mono text-[#10B981]">{completedNodes.length}</div>
          <div className="text-xs font-mono text-[#94A3B8] not-dark:text-slate-500 uppercase mt-1">Modul Mastered</div>
        </div>

        <div className="bg-[#0F172A] not-dark:bg-white p-5 rounded-2xl border border-[#1E293B] not-dark:border-slate-200 text-center shadow-sm">
          <div className="text-2xl font-bold font-mono text-[#38BDF8]">{completedChecklists}</div>
          <div className="text-xs font-mono text-[#94A3B8] not-dark:text-slate-500 uppercase mt-1">Checklist Selesai</div>
        </div>

        <div className="bg-[#0F172A] not-dark:bg-white p-5 rounded-2xl border border-[#1E293B] not-dark:border-slate-200 text-center shadow-sm">
          <div className="text-2xl font-bold font-mono text-[#F59E0B]">100%</div>
          <div className="text-xs font-mono text-[#94A3B8] not-dark:text-slate-500 uppercase mt-1">Akurasi Validasi</div>
        </div>

        <div className="bg-[#0F172A] not-dark:bg-white p-5 rounded-2xl border border-[#1E293B] not-dark:border-slate-200 text-center shadow-sm">
          <div className="text-2xl font-bold font-mono text-[#A855F7]">12.5 Jam</div>
          <div className="text-xs font-mono text-[#94A3B8] not-dark:text-slate-500 uppercase mt-1">Waktu Belajar</div>
        </div>
      </div>

      {/* Completed Milestones List */}
      <div className="bg-[#0F172A] not-dark:bg-white border border-[#1E293B] not-dark:border-slate-200 rounded-2xl p-6 shadow-xl">
        <h2 className="text-base font-bold text-[#F8FAFC] not-dark:text-slate-900 mb-4 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
          <span>Daftar Modul yang Telah Dikuasai</span>
        </h2>

        {completedNodes.length > 0 ? (
          <div className="space-y-2.5">
            {completedNodes.map(node => (
              <div
                key={node.id}
                className="p-3.5 rounded-xl bg-[#090D16] not-dark:bg-slate-50 border border-[#1E293B] not-dark:border-slate-200 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-[#10B981]">Level {node.level} · Modul #{node.order_index}</div>
                  <div className="text-sm font-semibold text-[#F8FAFC] not-dark:text-slate-900">{node.title}</div>
                </div>
                <span className="text-xs font-mono text-[#10B981] bg-[#10B981]/15 px-2.5 py-1 rounded-full border border-[#10B981]/30">
                  Mastered ✓
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#94A3B8] font-mono py-4 text-center">
            Anda belum menyelesaikan modul. Buka canvas roadmap untuk memulai modul pertama Anda!
          </p>
        )}
      </div>
    </div>
  );
};
