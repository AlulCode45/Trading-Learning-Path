import React from 'react';
import { 
  Compass, 
  Users, 
  PlusCircle, 
  BookOpen, 
  TrendingUp, 
  Sun, 
  Moon, 
  Home, 
  LayoutDashboard, 
  Terminal, 
  User, 
  Flame 
} from 'lucide-react';

export type ViewType = 'landing' | 'dashboard' | 'roadmap' | 'docs' | 'playground' | 'community' | 'profile' | 'syllabus';

interface HeaderProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
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
  onOpenCreateModal,
  completionPercentage,
  completedNodes,
  totalNodes,
  theme,
  setTheme
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#08090D]/90 not-dark:bg-white/90 backdrop-blur-md border-b border-[#1D2532] not-dark:border-slate-200 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            onClick={() => setCurrentView('landing')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#121722] not-dark:bg-slate-100 border border-[#10B981]/40 flex items-center justify-center text-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base tracking-tight text-[#F8FAFC] not-dark:text-slate-900">
                  Trading Learning Path
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                  Pro
                </span>
              </div>
              <p className="text-xs text-[#929BAA] not-dark:text-slate-500 hidden sm:block">
                Visual Financial Curriculum
              </p>
            </div>
          </div>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1 bg-[#0D1017] not-dark:bg-slate-100 p-1 rounded-xl border border-[#1D2532] not-dark:border-slate-200">
            <button
              onClick={() => setCurrentView('landing')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'landing'
                  ? 'bg-[#1D2532] not-dark:bg-white text-[#10B981] font-semibold shadow-sm'
                  : 'text-[#929BAA] not-dark:text-slate-600 hover:text-white not-dark:hover:text-black'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </button>

            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'dashboard'
                  ? 'bg-[#10B981] text-[#08090D] font-semibold shadow-sm'
                  : 'text-[#929BAA] not-dark:text-slate-600 hover:text-white not-dark:hover:text-black'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setCurrentView('roadmap')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'roadmap'
                  ? 'bg-[#10B981] text-[#08090D] font-semibold shadow-sm'
                  : 'text-[#929BAA] not-dark:text-slate-600 hover:text-white not-dark:hover:text-black'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Roadmap</span>
            </button>

            <button
              onClick={() => setCurrentView('docs')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'docs'
                  ? 'bg-[#10B981] text-[#08090D] font-semibold shadow-sm'
                  : 'text-[#929BAA] not-dark:text-slate-600 hover:text-white not-dark:hover:text-black'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Dokumentasi</span>
            </button>

            <button
              onClick={() => setCurrentView('playground')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'playground'
                  ? 'bg-[#10B981] text-[#08090D] font-semibold shadow-sm'
                  : 'text-[#929BAA] not-dark:text-slate-600 hover:text-white not-dark:hover:text-black'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Playground</span>
            </button>

            <button
              onClick={() => setCurrentView('community')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'community'
                  ? 'bg-[#10B981] text-[#08090D] font-semibold shadow-sm'
                  : 'text-[#929BAA] not-dark:text-slate-600 hover:text-white not-dark:hover:text-black'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Komunitas</span>
            </button>

            <button
              onClick={() => setCurrentView('profile')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'profile'
                  ? 'bg-[#10B981] text-[#08090D] font-semibold shadow-sm'
                  : 'text-[#929BAA] not-dark:text-slate-600 hover:text-white not-dark:hover:text-black'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Profil</span>
            </button>
          </nav>

          {/* Right Action Icons & Streak */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Streak Counter */}
            <div className="hidden sm:flex items-center space-x-1 px-2.5 py-1 bg-[#121722] not-dark:bg-slate-100 border border-[#1D2532] not-dark:border-slate-200 rounded-lg text-xs font-mono">
              <Flame className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
              <span className="font-bold text-[#F8FAFC] not-dark:text-slate-900">5d Streak</span>
            </div>

            {/* Quick Action: Enter App or Create */}
            {currentView === 'landing' ? (
              <button
                onClick={() => setCurrentView('roadmap')}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#10B981] hover:bg-[#059669] text-[#08090D] font-bold rounded-lg text-xs transition-all shadow-sm"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Masuk App</span>
              </button>
            ) : (
              <button
                onClick={onOpenCreateModal}
                className="hidden sm:flex items-center space-x-1 px-3 py-1.5 bg-[#10B981]/15 text-[#10B981] hover:bg-[#10B981] hover:text-[#08090D] border border-[#10B981]/40 rounded-lg text-xs font-medium transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Buat Path</span>
              </button>
            )}

            {/* Global Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-[#121722] not-dark:bg-slate-100 border border-[#1D2532] not-dark:border-slate-200 text-[#929BAA] not-dark:text-slate-700 hover:text-[#10B981] transition-colors"
              title={`Beralih ke ${theme === 'dark' ? 'Light Mode ☀️' : 'Dark Mode 🌙'}`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#F59E0B]" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Submenu Bar */}
        <div className="flex lg:hidden items-center justify-between py-2 border-t border-[#1D2532] not-dark:border-slate-200 overflow-x-auto space-x-2">
          {[
            { id: 'landing', label: 'Beranda' },
            { id: 'roadmap', label: 'Roadmap' },
            { id: 'docs', label: 'Dokumentasi' },
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'playground', label: 'Playground' },
            { id: 'community', label: 'Komunitas' },
            { id: 'profile', label: 'Profil' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentView(tab.id as ViewType)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono whitespace-nowrap transition-colors ${
                currentView === tab.id
                  ? 'bg-[#10B981] text-[#08090D] font-bold'
                  : 'text-[#929BAA] not-dark:text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
