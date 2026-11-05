import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { RoadmapsDirectoryPage } from './pages/RoadmapsDirectoryPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { DocPage } from './pages/DocPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { CommunityPage } from './pages/CommunityPage';
import { ProfilePage } from './pages/ProfilePage';
import { CreateRoadmapModal } from './components/CreateRoadmapModal';

export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('tlp-theme') as 'dark' | 'light') || 'dark';
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [forkInitialData, setForkInitialData] = useState<any | null>(null);

  const handleOpenCreateModal = (forkData?: any) => {
    setForkInitialData(forkData || null);
    setIsCreateModalOpen(true);
  };

  useEffect(() => {
    localStorage.setItem('tlp-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-[#0A0D14] text-slate-900 dark:text-[#E2E8F0] flex flex-col font-sans transition-colors duration-200">
        {/* Universal Header with Real Navigation Links & Theme Switcher */}
        <Header
          onOpenCreateModal={() => handleOpenCreateModal()}
          theme={theme}
          setTheme={setTheme}
        />

        {/* Real URL Routes */}
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/roadmaps"
              element={
                <RoadmapsDirectoryPage
                  onOpenCreateModal={() => handleOpenCreateModal()}
                  onForkRoadmap={(rm) => handleOpenCreateModal(rm)}
                />
              }
            />
            <Route path="/roadmaps/:slug" element={<RoadmapPage />} />
            <Route path="/docs" element={<Navigate to="/docs/candlestick-anatomy-wick-dynamics" replace />} />
            <Route path="/docs/:slug" element={<DocPage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Create Roadmap Modal */}
        <CreateRoadmapModal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
            setForkInitialData(null);
          }}
          forkInitialData={forkInitialData}
          onCreated={() => {
            window.location.href = '/community';
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
