import { useState, useEffect } from 'react';
import { Roadmap, RoadmapNode, CommunityRoadmap } from './types';
import { Header } from './components/Header';
import { RoadmapCanvas } from './components/RoadmapCanvas';
import { NodeDrawer } from './components/NodeDrawer';
import { CommunityView } from './components/CommunityView';
import { SyllabusPlanView } from './components/SyllabusPlanView';
import { CreateRoadmapModal } from './components/CreateRoadmapModal';
import { Sparkles, Layers, RefreshCw } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'community' | 'syllabus'>('roadmap');
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [currentSlug, setCurrentSlug] = useState<string>('price-action-market-structure');
  const [currentRoadmap, setCurrentRoadmap] = useState<Roadmap | null>(null);
  const [nodes, setNodes] = useState<RoadmapNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [communityRoadmaps, setCommunityRoadmaps] = useState<CommunityRoadmap[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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

  // Fetch current roadmap details (nodes, checklists, progress)
  const fetchRoadmapDetails = async (slug: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/roadmaps/${slug}`);
      const json = await res.json();
      if (json.success) {
        setCurrentRoadmap(json.data.roadmap);
        setNodes(json.data.nodes);
        // keep selectedNode updated if already opened
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

  // Update Node status (completed, in_progress, available)
  const handleUpdateNodeStatus = async (nodeId: string, status: RoadmapNode['status']) => {
    try {
      const res = await fetch(`/api/nodes/${nodeId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        // Refresh to calculate child unlocking & updated completion stats
        await fetchRoadmapDetails(currentSlug);
        await fetchRoadmaps();
      }
    } catch (err) {
      console.error('Failed to update node status', err);
    }
  };

  // Toggle checklist item
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

  // Upvote community roadmap
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

  return (
    <div className="min-h-screen bg-[#090D16] text-[#F8FAFC] flex flex-col font-sans">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        completionPercentage={completionPercentage}
        completedNodes={completedCount}
        totalNodes={totalCount}
      />

      <main className="flex-1 flex flex-col">
        {activeTab === 'roadmap' && (
          <div>
            {/* Roadmap Selector Subheader */}
            <div className="bg-[#0B101D] border-b border-[#1E293B] px-4 sm:px-8 py-3 flex items-center justify-between overflow-x-auto">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-[#94A3B8] uppercase flex items-center space-x-1.5 mr-2">
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
                        : 'bg-[#0F172A] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#1E293B]'
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
                className="p-1.5 text-[#94A3B8] hover:text-[#10B981] transition-colors ml-2 flex-shrink-0"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {loading ? (
              <div className="flex-1 flex items-center justify-center p-20 text-[#94A3B8] font-mono text-xs">
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
              <div className="text-center py-20 text-[#94A3B8]">
                <p>Roadmap ini sedang dalam penyusunan kurikulum interaktif.</p>
                <button
                  onClick={() => setActiveTab('syllabus')}
                  className="mt-3 px-4 py-2 bg-[#10B981] text-[#090D16] rounded-lg text-xs font-semibold inline-flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Lihat Rencana Silabus</span>
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'community' && (
          <CommunityView
            roadmaps={communityRoadmaps}
            onUpvote={handleUpvoteCommunity}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
          />
        )}

        {activeTab === 'syllabus' && (
          <SyllabusPlanView />
        )}
      </main>

      {/* Node Slide-Over Detail Drawer */}
      {selectedNode && (
        <NodeDrawer
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          onUpdateStatus={handleUpdateNodeStatus}
          onToggleChecklist={handleToggleChecklist}
        />
      )}

      {/* Create Community Roadmap Modal */}
      <CreateRoadmapModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={() => {
          fetchCommunity();
          setActiveTab('community');
        }}
      />
    </div>
  );
}
export default App;
