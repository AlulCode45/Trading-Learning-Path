import React from 'react';
import { Compass, Users, PlusCircle, BookOpen, TrendingUp, ShieldCheck, Sun, Moon, Home } from 'lucide-react';

interface HeaderProps {
  currentView: 'landing' | 'app';
  setCurrentView: (view: 'landing' | 'app') => void;
  activeTab: 'roadmap' | 'community' | 'syllabus';
  setActiveTab: (tab: 'roadmap' | 'community' | 'syllabus') => void;
  onOpenCreateModal: () => void;
  completionPercentage: number;
  completedNodes: number;
  totalNodes: number;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  activeTab,
  setActiveTab,
  onOpenCreateModal,
  completionPercentage,
  completedNodes,
  totalNodes,
  theme,
  setTheme
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#090D16]/90 not-dark:bg-white/90 backdrop-blur-md border-b border-[#1E293B] not-dark:border-slate-200 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            onClick={() => setCurrentView('landing')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#0F172A] not-dark:bg-slate-100 border border-[#10B981]/40 flex items-center justify-center text-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base tracking-tight text-[#F8FAFC] not-dark:text-slate-900">
                  Trading Learning Path
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
                  v1.0
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] not-dark:text-slate-500 hidden sm:block">
                Peta Jalan &amp; Kurikulum Trader Finansial
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {currentView === 'landing' ? (
              <div className="flex items-center space-x-3">
                <a
                  href="#metodologi"
                  className="text-xs font-medium text-[#94A3B8] not-dark:text-slate-600 hover:text-[#10B981] transition-colors hidden md:inline"
                >
                  Metodologi
                </a>
                <button
                  onClick={() => {
                    setCurrentView('app');
                    setActiveTab('community');
                  }}
                  className="text-xs font-medium text-[#94A3B8] not-dark:text-slate-600 hover:text-[#10B981] transition-colors hidden sm:inline"
                >
                  Komunitas
                </button>
                <button
                  onClick={() => setCurrentView('app')}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-[#090D16] font-semibold rounded-lg text-xs transition-all shadow-sm"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Buka Canvas App &rarr;</span>
                </button>
              </div>
            ) : (
              /* In App Workspace: Nav Tabs */
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={() => setCurrentView('landing')}
                  className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-[#94A3B8] not-dark:text-slate-600 hover:text-white not-dark:hover:text-slate-900 hover:bg-[#1E293B]/50 not-dark:hover:bg-slate-100 transition-colors mr-1"
                  title="Kembali ke Landing Page"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Beranda</span>
                </button>

                <nav className="flex items-center space-x-1 bg-[#0F172A] not-dark:bg-slate-100 p-1 rounded-lg border border-[#1E293B] not-dark:border-slate-200">
                  <button
                    onClick={() => setActiveTab('roadmap')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      activeTab === 'roadmap'
                        ? 'bg-[#10B981] text-[#090D16] font-semibold shadow-sm'
                        : 'text-[#94A3B8] not-dark:text-slate-600 hover:text-white not-dark:hover:text-slate-900'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Roadmap</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('community')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      activeTab === 'community'
                        ? 'bg-[#10B981] text-[#090D16] font-semibold shadow-sm'
                        : 'text-[#94A3B8] not-dark:text-slate-600 hover:text-white not-dark:hover:text-slate-900'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Komunitas</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('syllabus')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      activeTab === 'syllabus'
                        ? 'bg-[#10B981] text-[#090D16] font-semibold shadow-sm'
                        : 'text-[#94A3B8] not-dark:text-slate-600 hover:text-white not-dark:hover:text-slate-900'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Silabus</span>
                  </button>
                </nav>
              </div>
            )}

            {/* Global Theme Toggle Button (Light / Dark) */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-[#0F172A] not-dark:bg-slate-100 border border-[#1E293B] not-dark:border-slate-200 text-[#94A3B8] not-dark:text-slate-700 hover:text-[#10B981] transition-colors"
              title={`Beralih ke ${theme === 'dark' ? 'Light Mode ☀️' : 'Dark Mode 🌙'}`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#F59E0B]" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Quick Action Button */}
            {currentView === 'app' && (
              <button
                onClick={onOpenCreateModal}
                className="flex items-center space-x-1 px-3 py-1.5 bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981] hover:text-[#090D16] border border-[#10B981]/40 rounded-lg text-xs font-medium transition-all duration-200"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Buat Path</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
