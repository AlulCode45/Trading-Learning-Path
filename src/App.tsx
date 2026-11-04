import { useState, useEffect, useMemo } from 'react';
import { Roadmap, RoadmapNode, CommunityRoadmap } from './types';
import { Header, ViewType } from './components/Header';
import { HomeDiscovery } from './components/HomeDiscovery';
import { DocReader } from './components/DocReader';
import { DashboardView } from './components/DashboardView';
import { RoadmapCanvas } from './components/RoadmapCanvas';
import { PlaygroundView } from './components/PlaygroundView';
import { NodeDrawer } from './components/NodeDrawer';
import { CommunityView } from './components/CommunityView';
import { ProfileView } from './components/ProfileView';
import { SyllabusPlanView } from './components/SyllabusPlanView';
import { CreateRoadmapModal } from './components/CreateRoadmapModal';
import { ContributorPortalModal } from './components/ContributorPortalModal';
import { Layers, RefreshCw, Sparkles } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('tlp-theme') as 'dark' | 'light') || 'dark';
  });

  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [currentSlug, setCurrentSlug] = useState<string>('price-action-market-structure');
  const [currentRoadmap, setCurrentRoadmap] = useState<Roadmap | null>(null);
  const [nodes, setNodes] = useState<RoadmapNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string>('candlestick-anatomy-wick-dynamics');
  const [communityRoadmaps, setCommunityRoadmaps] = useState<CommunityRoadmap[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isContributorModalOpen, setIsContributorModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Sync theme with document element
  useEffect(() => {
    localStorage.setItem('tlp-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Fetch all roadmaps list
  const fetchRoadmaps = async () => {
    try {
      const res = await fetch('/api/roadmaps');
      const json = await res.json();
      if (json.success) {
        setRoadmaps(json.data);
      }
    } catch (err) {
      console.error('Failed to load roadmaps', err);
    }
  };

  // Fetch current roadmap details (nodes, checklists, quizzes)
  const fetchRoadmapDetails = async (slug: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/roadmaps/${slug}`);
      const json = await res.json();
      if (json.success) {
        setCurrentRoadmap(json.data.roadmap);
        setNodes(json.data.nodes);
        if (selectedNode) {
          const updated = json.data.nodes.find((n: RoadmapNode) => n.id === selectedNode.id);
          if (updated) setSelectedNode(updated);
        }
      }
    } catch (err) {
      console.error('Failed to load roadmap details', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch community roadmaps
  const fetchCommunity = async () => {
    try {
      const res = await fetch('/api/community');
      const json = await res.json();
      if (json.success) {
        setCommunityRoadmaps(json.data);
      }
    } catch (err) {
      console.error('Failed to load community roadmaps', err);
    }
  };

  useEffect(() => {
    fetchRoadmaps();
    fetchRoadmapDetails(currentSlug);
    fetchCommunity();
  }, []);

  const handleSelectRoadmap = (slug: string) => {
    setCurrentSlug(slug);
    setSelectedNode(null);
    fetchRoadmapDetails(slug);
  };

  const handleUpdateNodeStatus = async (nodeId: string, status: RoadmapNode['status']) => {
    try {
      const res = await fetch(`/api/nodes/${nodeId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        await fetchRoadmapDetails(currentSlug);
        await fetchRoadmaps();
      }
    } catch (err) {
      console.error('Failed to update node status', err);
    }
  };

  const handleToggleChecklist = async (checklistId: string, isCompleted: boolean) => {
    try {
      const res = await fetch(`/api/checklists/${checklistId}/toggle`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted })
      });
      if (res.ok) {
        await fetchRoadmapDetails(currentSlug);
      }
    } catch (err) {
      console.error('Failed to toggle checklist', err);
    }
  };

  const handleUpvoteCommunity = async (id: string) => {
    try {
      const res = await fetch(`/api/community/${id}/upvote`, { method: 'POST' });
      if (res.ok) {
        await fetchCommunity();
      }
    } catch (err) {
      console.error('Failed to upvote', err);
    }
  };

  const completedCount = nodes.filter(n => n.status === 'completed').length;
  const totalCount = nodes.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const nodeStatusMap = useMemo(() => {
    const map: Record<string, RoadmapNode['status']> = {};
    nodes.forEach(n => { map[n.id] = n.status; });
    return map;
  }, [nodes]);

  return (
    <div className="min-h-screen bg-[#08090D] not-dark:bg-[#F8FAFC] text-[#F8FAFC] not-dark:text-[#0F172A] flex flex-col font-sans transition-colors duration-200">
      {/* Universal Header with Navigation & Theme Toggle */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        completionPercentage={completionPercentage}
        completedNodes={completedCount}
        totalNodes={totalCount}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Content Router */}
      <main className="flex-1 flex flex-col">
        {currentView === 'landing' && (
          <HomeDiscovery
            roadmaps={roadmaps}
            onSelectRoadmap={handleSelectRoadmap}
            onNavigateToRoadmap={() => setCurrentView('roadmap')}
            onNavigateToDocs={(slug) => {
              setSelectedArticleSlug(slug);
              setCurrentView('docs');
            }}
            onNavigateToPlayground={() => setCurrentView('playground')}
            onOpenContributorModal={() => setIsContributorModalOpen(true)}
          />
        )}

        {currentView === 'docs' && (
          <DocReader
            articleSlug={selectedArticleSlug}
            allNodes={nodes}
            onSelectArticle={(slug) => setSelectedArticleSlug(slug)}
            onReturnToRoadmap={() => setCurrentView('roadmap')}
            onUpdateNodeStatus={handleUpdateNodeStatus}
            nodeStatus={nodeStatusMap}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            roadmap={currentRoadmap}
            nodes={nodes}
            onSelectNode={setSelectedNode}
            onNavigateToRoadmap={() => setCurrentView('roadmap')}
            onNavigateToPlayground={() => setCurrentView('playground')}
          />
        )}

        {currentView === 'roadmap' && (
          <div>
            {/* Methodology Bar */}
            <div className="bg-[#0D1017] not-dark:bg-slate-100 border-b border-[#1D2532] not-dark:border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between overflow-x-auto transition-colors">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-[#929BAA] not-dark:text-slate-600 uppercase flex items-center space-x-1.5 mr-2">
                  <Layers className="w-3.5 h-3.5 text-[#10B981]" />
                  <span className="hidden sm:inline">Pilih Metodologi:</span>
                </span>

                {roadmaps.map(rm => (
                  <button
                    key={rm.id}
                    onClick={() => handleSelectRoadmap(rm.slug)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center space-x-2 ${
                      currentSlug === rm.slug
                        ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/50 font-semibold shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                        : 'bg-[#121722] not-dark:bg-white text-[#929BAA] not-dark:text-slate-700 hover:text-[#F8FAFC] not-dark:hover:text-black border border-[#1D2532] not-dark:border-slate-300'
                    }`}
                  >
                    <span>{rm.title}</span>
                    {rm.slug !== 'price-action-market-structure' && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#38BDF8]/15 text-[#38BDF8] rounded">
                        Next
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={() => fetchRoadmapDetails(currentSlug)}
                title="Refresh progress"
                className="p-1.5 text-[#929BAA] hover:text-[#10B981] transition-colors ml-2 flex-shrink-0"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {loading ? (
              <div className="flex-1 flex items-center justify-center p-20 text-[#929BAA] font-mono text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#10B981] animate-ping" />
                  <span>Memuat Peta Jalan &amp; Titik Struktur...</span>
                </div>
              </div>
            ) : currentRoadmap && nodes.length > 0 ? (
              <RoadmapCanvas
                roadmap={currentRoadmap}
                nodes={nodes}
                onSelectNode={setSelectedNode}
                selectedNodeId={selectedNode?.id || null}
              />
            ) : (
              <div className="text-center py-20 text-[#929BAA]">
                <p>Roadmap ini sedang dalam penyusunan kurikulum interaktif.</p>
                <button
                  onClick={() => setCurrentView('syllabus')}
                  className="mt-3 px-4 py-2 bg-[#10B981] text-[#08090D] rounded-lg text-xs font-semibold inline-flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Lihat Rencana Silabus</span>
                </button>
              </div>
            )}
          </div>
        )}

        {currentView === 'playground' && (
          <PlaygroundView />
        )}

        {currentView === 'community' && (
          <CommunityView
            roadmaps={communityRoadmaps}
            onUpvote={handleUpvoteCommunity}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
          />
        )}

        {currentView === 'profile' && (
          <ProfileView nodes={nodes} />
        )}

        {currentView === 'syllabus' && (
          <SyllabusPlanView />
        )}
      </main>

      {/* Node Slide-Over Detail Drawer with Quizzes & Confetti */}
      {selectedNode && (
        <NodeDrawer
          node={selectedNode}
          allNodes={nodes}
          onClose={() => setSelectedNode(null)}
          onSelectNode={setSelectedNode}
          onUpdateStatus={handleUpdateNodeStatus}
          onToggleChecklist={handleToggleChecklist}
          onOpenDocReader={(slug) => {
            setSelectedArticleSlug(slug);
            setSelectedNode(null);
            setCurrentView('docs');
          }}
        />
      )}

      {/* Create Community Roadmap Modal */}
      <CreateRoadmapModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={() => {
          fetchCommunity();
          setCurrentView('community');
        }}
      />

      {/* Contributor Portal Modal */}
      <ContributorPortalModal
        isOpen={isContributorModalOpen}
        onClose={() => setIsContributorModalOpen(false)}
        onOpenCreateRoadmap={() => {
          setIsContributorModalOpen(false);
          setIsCreateModalOpen(true);
        }}
      />
    </div>
  );
}
export default App;
