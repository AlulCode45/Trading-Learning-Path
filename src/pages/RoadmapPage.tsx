import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Roadmap, RoadmapNode } from '../types';
import { RoadmapCanvas } from '../components/RoadmapCanvas';
import { NodeDrawer } from '../components/NodeDrawer';
import { Layers, RefreshCw, Sparkles, ArrowLeft } from 'lucide-react';

export const RoadmapPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const currentSlug = slug || 'price-action-market-structure';

  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [currentRoadmap, setCurrentRoadmap] = useState<Roadmap | null>(null);
  const [nodes, setNodes] = useState<RoadmapNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load all roadmaps for methodology selector
  useEffect(() => {
    fetch('/api/roadmaps')
      .then(res => res.json())
      .then(json => {
        if (json.success) setRoadmaps(json.data);
      })
      .catch(err => console.error('Failed to load roadmaps', err));
  }, []);

  // Load roadmap details for current slug
  const fetchDetails = async (targetSlug: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/roadmaps/${targetSlug}`);
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

  useEffect(() => {
    fetchDetails(currentSlug);
    setSelectedNode(null);
  }, [currentSlug]);

  const handleUpdateNodeStatus = async (nodeId: string, status: RoadmapNode['status']) => {
    try {
      const res = await fetch(`/api/nodes/${nodeId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        await fetchDetails(currentSlug);
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
        await fetchDetails(currentSlug);
      }
    } catch (err) {
      console.error('Failed to toggle checklist', err);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-[#0A0D14] text-slate-900 dark:text-[#E2E8F0] transition-colors">
      {/* Methodology Selection Bar */}
      <div className="bg-slate-100 dark:bg-[#0D1017] border-b border-slate-200 dark:border-[#1D2532] px-4 sm:px-8 py-3 flex items-center justify-between overflow-x-auto transition-colors">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-slate-600 dark:text-[#929BAA] uppercase flex items-center space-x-1.5 mr-2">
            <Layers className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="hidden sm:inline">Metodologi:</span>
          </span>

          {roadmaps.map(rm => (
            <button
              key={rm.id}
              onClick={() => navigate(`/roadmaps/${rm.slug}`)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center space-x-2 ${
                currentSlug === rm.slug
                  ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/50 font-semibold shadow-xs'
                  : 'bg-white dark:bg-[#121722] text-slate-700 dark:text-[#929BAA] hover:text-black dark:hover:text-[#F8FAFC] border border-slate-300 dark:border-[#1D2532]'
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
          onClick={() => fetchDetails(currentSlug)}
          title="Refresh data"
          className="p-1.5 text-slate-500 dark:text-[#929BAA] hover:text-[#10B981] transition-colors ml-2 flex-shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Main Roadmap Area */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center p-24 text-slate-500 dark:text-[#929BAA] font-mono text-xs">
          <div className="flex items-center space-x-2.5">
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
        <div className="text-center py-24 text-slate-500 dark:text-[#929BAA]">
          <p>Roadmap ini sedang dalam penyusunan kurikulum interaktif.</p>
          <button
            onClick={() => navigate('/roadmaps/price-action-market-structure')}
            className="mt-3 px-4 py-2 bg-[#10B981] text-black font-semibold rounded-lg text-xs inline-flex items-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Price Action Roadmap</span>
          </button>
        </div>
      )}

      {/* Node Slide-Over Drawer with Quiz, Verification, and Doc link */}
      {selectedNode && (
        <NodeDrawer
          node={selectedNode}
          allNodes={nodes}
          onClose={() => setSelectedNode(null)}
          onSelectNode={setSelectedNode}
          onUpdateStatus={handleUpdateNodeStatus}
          onToggleChecklist={handleToggleChecklist}
          onOpenDocReader={(topicSlug) => {
            setSelectedNode(null);
            navigate(`/docs/${topicSlug}`);
          }}
        />
      )}
    </div>
  );
};
