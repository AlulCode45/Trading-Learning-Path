import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Compass, 
  Users, 
  PlusCircle, 
  BookOpen, 
  TrendingUp, 
  Sun, 
  Moon, 
  Home, 
  Terminal, 
  User
} from 'lucide-react';

interface HeaderProps {
  onOpenCreateModal: () => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCreateModal,
  theme,
  setTheme
}) => {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (targetPath: string) => {
    if (targetPath === '/' && path === '/') return true;
    if (targetPath !== '/' && path.startsWith(targetPath)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0A0D14]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#1E293B] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15">
          {/* Brand Logo Link to / */}
          <Link 
            to="/"
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
          </Link>

          {/* Real Route Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive('/')
                  ? 'text-slate-950 dark:text-white font-semibold bg-slate-100 dark:bg-[#161D2C]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Beranda
            </Link>

            <Link
              to="/roadmaps"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive('/roadmaps')
                  ? 'text-slate-950 dark:text-white font-semibold bg-slate-100 dark:bg-[#161D2C]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Roadmaps
            </Link>

            <Link
              to="/docs"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive('/docs')
                  ? 'text-slate-950 dark:text-white font-semibold bg-slate-100 dark:bg-[#161D2C]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Dokumentasi &amp; Panduan
            </Link>

            <Link
              to="/playground"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive('/playground')
                  ? 'text-slate-950 dark:text-white font-semibold bg-slate-100 dark:bg-[#161D2C]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Simulator
            </Link>

            <Link
              to="/community"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive('/community')
                  ? 'text-slate-950 dark:text-white font-semibold bg-slate-100 dark:bg-[#161D2C]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Komunitas
            </Link>

            <Link
              to="/profile"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive('/profile')
                  ? 'text-slate-950 dark:text-white font-semibold bg-slate-100 dark:bg-[#161D2C]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Progres Belajar
            </Link>
          </nav>

          {/* Right Actions: Create Modal & Theme Toggle */}
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

        {/* Mobile Navigation Links */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-slate-200 dark:border-[#1E293B] overflow-x-auto space-x-2">
          {[
            { to: '/', label: 'Beranda' },
            { to: '/roadmaps', label: 'Roadmap' },
            { to: '/docs', label: 'Dokumentasi' },
            { to: '/playground', label: 'Simulator' },
            { to: '/community', label: 'Komunitas' },
            { to: '/profile', label: 'Progres' }
          ].map(tab => (
            <Link
              key={tab.to}
              to={tab.to}
              className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                (tab.to === '/' && path === '/') || (tab.to !== '/' && path.startsWith(tab.to.split('/')[1]))
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-black font-semibold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};
