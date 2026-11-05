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
  User
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
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0A0D14]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#1E293B] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15">
          {/* Brand Logo (roadmap.sh Minimalist Style) */}
          <div 
            onClick={() => setCurrentView('landing')}
            className="flex items-center space-x-2.5 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black font-black text-sm">
              <TrendingUp className="w-4 h-4 text-[#10B981]" />
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-950 dark:text-white">
                Trading Learning Path
              </span>
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                .sh
              </span>
            </div>
          </div>

          {/* Navigation Items (Clean Text Links like roadmap.sh) */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setCurrentView('landing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                currentView === 'landing'
                  ? 'text-slate-950 dark:text-white font-semibold bg-slate-100 dark:bg-[#161D2C]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Beranda
            </button>

            <button
              onClick={() => setCurrentView('roadmap')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                currentView === 'roadmap'
                  ? 'text-slate-950 dark:text-white font-semibold bg-slate-100 dark:bg-[#161D2C]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Roadmaps
            </button>

            <button
              onClick={() => setCurrentView('docs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                currentView === 'docs'
                  ? 'text-slate-950 dark:text-white font-semibold bg-slate-100 dark:bg-[#161D2C]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Dokumentasi &amp; Panduan
            </button>

            <button
              onClick={() => setCurrentView('playground')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                currentView === 'playground'
                  ? 'text-slate-950 dark:text-white font-semibold bg-slate-100 dark:bg-[#161D2C]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Simulator
            </button>

            <button
              onClick={() => setCurrentView('community')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                currentView === 'community'
                  ? 'text-slate-950 dark:text-white font-semibold bg-slate-100 dark:bg-[#161D2C]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Komunitas
            </button>

            <button
              onClick={() => setCurrentView('profile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                currentView === 'profile'
                  ? 'text-slate-950 dark:text-white font-semibold bg-slate-100 dark:bg-[#161D2C]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Progres Belajar
            </button>
          </nav>

          {/* Right Actions: Contributor Modal & Theme Toggle */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={onOpenCreateModal}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#161D2C] hover:bg-slate-200 dark:hover:bg-[#222B3D] border border-slate-200 dark:border-[#1E293B] text-slate-800 dark:text-slate-200 text-xs font-medium transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Buat Roadmap</span>
            </button>

            {/* Global Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-slate-100 dark:bg-[#161D2C] hover:bg-slate-200 dark:hover:bg-[#222B3D] border border-slate-200 dark:border-[#1E293B] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              title={`Beralih ke ${theme === 'dark' ? 'Light Mode ☀️' : 'Dark Mode 🌙'}`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-slate-200 dark:border-[#1E293B] overflow-x-auto space-x-2">
          {[
            { id: 'landing', label: 'Beranda' },
            { id: 'roadmap', label: 'Roadmap' },
            { id: 'docs', label: 'Dokumentasi' },
            { id: 'playground', label: 'Simulator' },
            { id: 'community', label: 'Komunitas' },
            { id: 'profile', label: 'Progres' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentView(tab.id as ViewType)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                currentView === tab.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-black font-semibold'
                  : 'text-slate-600 dark:text-slate-400'
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
