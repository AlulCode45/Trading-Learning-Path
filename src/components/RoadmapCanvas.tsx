import React, { useState, useMemo } from 'react';
import { Roadmap, RoadmapNode } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  Lock, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Smartphone, 
  Monitor, 
  Search, 
  Filter,
  Navigation
} from 'lucide-react';

interface RoadmapCanvasProps {
  roadmap: Roadmap;
  nodes: RoadmapNode[];
  onSelectNode: (node: RoadmapNode) => void;
  selectedNodeId: string | null;
}

export const RoadmapCanvas: React.FC<RoadmapCanvasProps> = ({
  roadmap,
  nodes,
  onSelectNode,
  selectedNodeId
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'canvas' | 'linear'>('canvas');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'in_progress' | 'completed'>('all');

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.15, 1.6));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.15, 0.65));
  const handleResetZoom = () => setZoom(1);

  // Filtered nodes
  const filteredNodes = useMemo(() => {
    return nodes.filter(n => {
      const matchSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          n.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'all' || n.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [nodes, searchTerm, statusFilter]);

  // Group nodes by parent for connecting lines
  const nodeMap = useMemo(() => {
    const map = new Map<string, RoadmapNode>();
    nodes.forEach(n => map.set(n.id, n));
    return map;
  }, [nodes]);

  const connections = useMemo(() => {
    return nodes
      .filter(n => n.parent_node_id && nodeMap.has(n.parent_node_id))
      .map(child => {
        const parent = nodeMap.get(child.parent_node_id!)!;
        const isParentCompleted = parent.status === 'completed';
        const isChildCompleted = child.status === 'completed';

        return {
          id: `${parent.id}->${child.id}`,
          fromX: parent.coordinates_x + 110,
          fromY: parent.coordinates_y + 70,
          toX: child.coordinates_x + 110,
          toY: child.coordinates_y,
          isActive: isParentCompleted,
          isCompleted: isParentCompleted && isChildCompleted
        };
      });
  }, [nodes, nodeMap]);

  const getStatusBadge = (status: RoadmapNode['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center space-x-1 text-[11px] font-mono text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-full border border-[#10B981]/30">
            <CheckCircle2 className="w-3 h-3" />
            <span>Mastered</span>
          </span>
        );
      case 'in_progress':
        return (
          <span className="flex items-center space-x-1 text-[11px] font-mono text-[#F59E0B] bg-[#F59E0B]/15 px-2 py-0.5 rounded-full border border-[#F59E0B]/30 animate-pulse">
            <Clock className="w-3 h-3" />
            <span>In Progress</span>
          </span>
        );
      case 'available':
        return (
          <span className="flex items-center space-x-1 text-[11px] font-mono text-[#38BDF8] bg-[#38BDF8]/15 px-2 py-0.5 rounded-full border border-[#38BDF8]/30">
            <Sparkles className="w-3 h-3" />
            <span>Available</span>
          </span>
        );
      case 'locked':
      default:
        return (
          <span className="flex items-center space-x-1 text-[11px] font-mono text-[#94A3B8] not-dark:text-slate-500 bg-[#1E293B] not-dark:bg-slate-100 px-2 py-0.5 rounded-full border border-[#334155] not-dark:border-slate-300">
            <Lock className="w-3 h-3" />
            <span>Locked</span>
          </span>
        );
    }
  };

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1: return 'Level 1 · Fondasi';
      case 2: return 'Level 2 · Struktur';
      case 3: return 'Level 3 · Nilai';
      case 4: return 'Level 4 · Likuiditas';
      case 5: return 'Level 5 · Eksekusi';
      default: return `Level ${level}`;
    }
  };

  // Jump to next active node
  const handleJumpToActive = () => {
    const active = nodes.find(n => n.status === 'in_progress') || nodes.find(n => n.status === 'available');
    if (active) {
      onSelectNode(active);
    }
  };

  return (
    <div className="relative w-full overflow-hidden flex flex-col bg-[#08090D] not-dark:bg-[#F8FAFC] transition-colors">
      {/* Roadmap Header Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 border-b border-[#1E293B] not-dark:border-slate-200 bg-[#0D1017] not-dark:bg-white gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-lg sm:text-xl font-bold text-[#F8FAFC] not-dark:text-slate-900 tracking-tight">{roadmap.title}</h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
              {roadmap.difficulty}
            </span>
            <span className="text-xs font-mono text-[#94A3B8] not-dark:text-slate-500 hidden md:inline">
              Est. {roadmap.estimated_hours} Jam Belajar
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] not-dark:text-slate-600 mt-1 max-w-2xl">{roadmap.description}</p>
        </div>

        {/* Search, Filter & View Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Cari modul..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-[#090D16] not-dark:bg-slate-100 border border-[#1E293B] not-dark:border-slate-200 focus:border-[#10B981] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#F8FAFC] not-dark:text-slate-900 placeholder-[#94A3B8] outline-none w-36 sm:w-44"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="bg-[#090D16] not-dark:bg-slate-100 border border-[#1E293B] not-dark:border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono text-[#94A3B8] not-dark:text-slate-700 outline-none"
          >
            <option value="all">Semua Status</option>
            <option value="available">Tersedia</option>
            <option value="in_progress">Sedang Dipelajari</option>
            <option value="completed">Selesai (Mastered)</option>
          </select>

          {/* Jump to Active Button */}
          <button
            onClick={handleJumpToActive}
            className="flex items-center space-x-1 px-2.5 py-1.5 bg-[#10B981]/15 text-[#10B981] hover:bg-[#10B981] hover:text-[#090D16] border border-[#10B981]/30 rounded-lg text-xs font-mono transition-colors"
            title="Lompat ke Modul Aktif"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Modul Aktif</span>
          </button>

          {/* View mode toggle */}
          <div className="flex items-center bg-[#090D16] not-dark:bg-slate-100 p-1 rounded-lg border border-[#1E293B] not-dark:border-slate-200">
            <button
              onClick={() => setViewMode('canvas')}
              title="Canvas 2D Mode"
              className={`p-1.5 rounded text-xs transition-colors ${viewMode === 'canvas' ? 'bg-[#1E293B] not-dark:bg-white text-[#10B981] shadow-sm' : 'text-[#94A3B8] not-dark:text-slate-600 hover:text-white not-dark:hover:text-black'}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('linear')}
              title="Linear Timeline Mode"
              className={`p-1.5 rounded text-xs transition-colors ${viewMode === 'linear' ? 'bg-[#1E293B] not-dark:bg-white text-[#10B981] shadow-sm' : 'text-[#94A3B8] not-dark:text-slate-600 hover:text-white not-dark:hover:text-black'}`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Zoom controls (Canvas only) */}
          {viewMode === 'canvas' && (
            <div className="flex items-center space-x-1 bg-[#090D16] not-dark:bg-slate-100 p-1 rounded-lg border border-[#1E293B] not-dark:border-slate-200">
              <button
                onClick={handleZoomOut}
                className="p-1.5 text-[#94A3B8] not-dark:text-slate-600 hover:text-white not-dark:hover:text-black hover:bg-[#1E293B] not-dark:hover:bg-slate-200 rounded transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono px-1 text-[#94A3B8] not-dark:text-slate-700">{Math.round(zoom * 100)}%</span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 text-[#94A3B8] not-dark:text-slate-600 hover:text-white not-dark:hover:text-black hover:bg-[#1E293B] not-dark:hover:bg-slate-200 rounded transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1.5 text-[#94A3B8] not-dark:text-slate-600 hover:text-white not-dark:hover:text-black hover:bg-[#1E293B] not-dark:hover:bg-slate-200 rounded transition-colors"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Canvas Area */}
      {viewMode === 'canvas' ? (
        <div className="relative w-full h-[780px] overflow-auto bg-grid-tactical p-8 flex justify-center">
          <div
            className="relative transition-transform duration-200 origin-top"
            style={{
              width: '840px',
              height: '1180px',
              transform: `scale(${zoom})`
            }}
          >
            {/* SVG Vector Connections (DAG Bézier curves) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ width: '840px', height: '1180px' }}
            >
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {connections.map(conn => {
                const dy = conn.toY - conn.fromY;
                const pathD = `M ${conn.fromX} ${conn.fromY} C ${conn.fromX} ${conn.fromY + dy * 0.55}, ${conn.toX} ${conn.toY - dy * 0.55}, ${conn.toX} ${conn.toY}`;

                return (
                  <g key={conn.id}>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={conn.isActive ? (conn.isCompleted ? '#10B981' : '#38BDF8') : '#475569'}
                      strokeWidth={conn.isActive ? 2.5 : 1.5}
                      strokeDasharray={conn.isActive ? 'none' : '4 4'}
                      strokeOpacity={conn.isActive ? 0.9 : 0.3}
                      filter={conn.isCompleted ? 'url(#glow)' : undefined}
                    />

                    {conn.isActive && (
                      <circle
                        cx={(conn.fromX + conn.toX) / 2}
                        cy={(conn.fromY + conn.toY) / 2}
                        r="3.5"
                        fill={conn.isCompleted ? '#10B981' : '#38BDF8'}
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Interactive Node Cards */}
            {filteredNodes.map(node => {
              const isSelected = selectedNodeId === node.id;
              const isLocked = node.status === 'locked';

              return (
                <div
                  key={node.id}
                  onClick={() => onSelectNode(node)}
                  style={{
                    position: 'absolute',
                    left: `${node.coordinates_x}px`,
                    top: `${node.coordinates_y}px`,
                    width: '220px'
                  }}
                  className={`group cursor-pointer rounded-xl p-3.5 transition-all duration-200 select-none ${
                    isSelected
                      ? 'bg-[#121722] not-dark:bg-white border-2 border-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.25)] scale-[1.02] z-30'
                      : isLocked
                      ? 'bg-[#0D1017]/80 not-dark:bg-slate-100/90 border border-[#1D2532] not-dark:border-slate-300 opacity-65 hover:opacity-85 z-10'
                      : node.status === 'completed'
                      ? 'bg-[#121722] not-dark:bg-white border border-[#10B981]/50 shadow-[0_4px_12px_rgba(16,185,129,0.1)] hover:border-[#10B981] hover:scale-[1.02] z-20'
                      : node.status === 'in_progress'
                      ? 'bg-[#121722] not-dark:bg-white border border-[#F59E0B]/60 shadow-[0_4px_12px_rgba(245,158,11,0.1)] hover:border-[#F59E0B] hover:scale-[1.02] z-20'
                      : 'bg-[#121722] not-dark:bg-white border border-[#2B3547] not-dark:border-slate-300 hover:border-[#38BDF8] hover:scale-[1.02] z-20 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-[#929BAA] not-dark:text-slate-500 uppercase">
                      {getLevelLabel(node.level)}
                    </span>
                    {getStatusBadge(node.status)}
                  </div>

                  <h3 className={`text-xs font-semibold leading-snug line-clamp-2 transition-colors ${
                    isLocked 
                      ? 'text-[#929BAA] not-dark:text-slate-400' 
                      : 'text-[#F8FAFC] not-dark:text-slate-900 group-hover:text-[#10B981]'
                  }`}>
                    {node.title}
                  </h3>

                  <div className="mt-2.5 pt-2 border-t border-[#1D2532] not-dark:border-slate-200 flex items-center justify-between text-[10px] font-mono text-[#929BAA] not-dark:text-slate-500">
                    <span>{node.checklists?.length || 0} Tugas</span>
                    <span className="text-[#10B981] group-hover:translate-x-0.5 transition-transform font-bold">Detail &rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Mobile Linear View */
        <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-4">
          <div className="text-xs text-[#929BAA] not-dark:text-slate-500 font-mono uppercase tracking-wider mb-2">
            Urutan Jalur Belajar Linier ({filteredNodes.length} Modul)
          </div>
          {filteredNodes.map((node, index) => (
            <div
              key={node.id}
              onClick={() => onSelectNode(node)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start space-x-4 ${
                selectedNodeId === node.id
                  ? 'bg-[#121722] not-dark:bg-white border-[#10B981] shadow-md'
                  : 'bg-[#121722]/70 not-dark:bg-white border-[#1D2532] not-dark:border-slate-200 hover:border-[#2B3547]'
              }`}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#08090D] not-dark:bg-slate-100 border border-[#1D2532] not-dark:border-slate-200 flex items-center justify-center font-mono text-xs font-bold text-[#10B981]">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#929BAA] not-dark:text-slate-500">{getLevelLabel(node.level)}</span>
                  {getStatusBadge(node.status)}
                </div>
                <h3 className="text-sm font-semibold text-[#F8FAFC] not-dark:text-slate-900 mt-1">{node.title}</h3>
                <p className="text-xs text-[#929BAA] not-dark:text-slate-600 line-clamp-2 mt-1">{node.summary}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
