import React from 'react';
import { Compass, Users, PlusCircle, BookOpen, TrendingUp, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: 'roadmap' | 'community' | 'syllabus';
  setActiveTab: (tab: 'roadmap' | 'community' | 'syllabus') => void;
  onOpenCreateModal: () => void;
  completionPercentage: number;
  completedNodes: number;
  totalNodes: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenCreateModal,
  completionPercentage,
  completedNodes,
  totalNodes
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#090D16]/90 backdrop-blur-md border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-[#0F172A] border border-[#10B981]/40 flex items-center justify-center text-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base tracking-tight text-[#F8FAFC]">Trading Learning Path</span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">v1.0 MVP</span>
              </div>
              <p className="text-xs text-[#94A3B8] hidden sm:block">Kurikulum & Peta Jalan Visual untuk Trader Finansial</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2 bg-[#0F172A] p-1 rounded-lg border border-[#1E293B]">
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'roadmap'
                  ? 'bg-[#10B981] text-[#090D16] font-semibold shadow-sm'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Official Path</span>
            </button>

            <button
              onClick={() => setActiveTab('community')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'community'
                  ? 'bg-[#10B981] text-[#090D16] font-semibold shadow-sm'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]/50'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Komunitas UGC</span>
            </button>

            <button
              onClick={() => setActiveTab('syllabus')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'syllabus'
                  ? 'bg-[#10B981] text-[#090D16] font-semibold shadow-sm'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Rencana Silabus</span>
              <span className="md:hidden">Silabus</span>
            </button>
          </nav>

          {/* Action & Stats */}
          <div className="flex items-center space-x-3">
            {/* Progress indicator */}
            <div className="hidden lg:flex items-center space-x-2.5 bg-[#0F172A] px-3 py-1.5 rounded-lg border border-[#1E293B]">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <div className="text-right">
                <div className="text-[10px] uppercase font-mono text-[#94A3B8]">Mastery Progress</div>
                <div className="text-xs font-mono font-semibold text-[#F8FAFC]">
                  {completedNodes}/{totalNodes} Nodes ({completionPercentage}%)
                </div>
              </div>
              <div className="w-12 h-1.5 bg-[#1E293B] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#10B981] transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            <button
              onClick={onOpenCreateModal}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981] hover:text-[#090D16] border border-[#10B981]/40 rounded-lg text-xs font-medium transition-all duration-200"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Buat Path</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
