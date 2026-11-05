import React, { useState, useMemo, useRef } from 'react';
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
  Navigation,
  Layers,
  ArrowRight,
  Maximize2
} from 'lucide-react';

interface RoadmapCanvasProps {
  roadmap: Roadmap;
  nodes: RoadmapNode[];
  onSelectNode: (node: RoadmapNode) => void;
  selectedNodeId: string | null;
}

interface PositionedNode extends RoadmapNode {
  posX: number;
  posY: number;
  width: number;
  height: number;
}

const CANVAS_WIDTH = 860;
const NODE_WIDTH = 230;
const NODE_HEIGHT = 112;

const STAGE_LABELS: Record<number, { title: string; subtitle: string }> = {
  1: { title: 'FASE 1: FONDASI LELANG & HARGA', subtitle: 'Anatomi candlestick, sumbu, dan fraktalitas multi-timeframe' },
  2: { title: 'FASE 2: STRUKTUR PASAR & KONFIRMASI TREN', subtitle: 'Break of Structure (BOS), CHoCH, dan titik swing ekstrem' },
  3: { title: 'FASE 3: ZONA NILAI INSTITUSI & IMBALANCE', subtitle: 'Fair Value Gaps, Supply & Demand, serta diskon equilibrium' },
  4: { title: 'FASE 4: KOLAM LIKUIDITAS & JEBAKAN', subtitle: 'Pemetaan BSL & SSL, Equal Highs, dan Liquidity Sweeps' },
  5: { title: 'FASE 5: PROTOKOL EKSEKUSI & MANAJEMEN RISIKO', subtitle: 'Trigger LTF, aturan risiko 1%, dan audit jurnal trading' }
};

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
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.15, 1.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.15, 0.65));
  const handleResetZoom = () => setZoom(1);

  // Calculate clean, mathematically symmetrical positions for each node
  const positionedNodes: PositionedNode[] = useMemo(() => {
    // Group nodes by level
    const byLevel = new Map<number, RoadmapNode[]>();
    nodes.forEach(n => {
      const lvl = n.level || 1;
      if (!byLevel.has(lvl)) byLevel.set(lvl, []);
      byLevel.get(lvl)!.push(n);
    });

    const result: PositionedNode[] = [];
    const sortedLevels = Array.from(byLevel.keys()).sort((a, b) => a - b);

    // Calculate Y positions dynamically per level
    let currentY = 70;

    sortedLevels.forEach(lvl => {
      const nodesInLvl = byLevel.get(lvl)!;

      if (nodesInLvl.length === 1) {
        // Perfectly centered spine
        result.push({
          ...nodesInLvl[0],
          posX: (CANVAS_WIDTH - NODE_WIDTH) / 2, // 315px
          posY: currentY,
          width: NODE_WIDTH,
          height: NODE_HEIGHT
        });
        currentY += 160;
      } else if (nodesInLvl.length === 2) {
        // Balanced left and right lanes
        result.push({
          ...nodesInLvl[0],
          posX: 140, // Left lane
          posY: currentY,
          width: NODE_WIDTH,
          height: NODE_HEIGHT
        });
        result.push({
          ...nodesInLvl[1],
          posX: 490, // Right lane
          posY: currentY,
          width: NODE_WIDTH,
          height: NODE_HEIGHT
        });
        currentY += 170;
      } else if (nodesInLvl.length === 3) {
        // 3-lane balanced grid
        result.push({
          ...nodesInLvl[0],
          posX: 60,
          posY: currentY,
          width: NODE_WIDTH,
          height: NODE_HEIGHT
        });
        result.push({
          ...nodesInLvl[1],
          posX: 315,
          posY: currentY,
          width: NODE_WIDTH,
          height: NODE_HEIGHT
        });
        result.push({
          ...nodesInLvl[2],
          posX: 570,
          posY: currentY,
          width: NODE_WIDTH,
          height: NODE_HEIGHT
        });
        currentY += 180;
      } else {
        // Fallback for larger groups
        nodesInLvl.forEach((n, idx) => {
          const spacing = CANVAS_WIDTH / (nodesInLvl.length + 1);
          result.push({
            ...n,
            posX: spacing * (idx + 1) - NODE_WIDTH / 2,
            posY: currentY,
            width: NODE_WIDTH,
            height: NODE_HEIGHT
          });
        });
        currentY += 180;
      }
    });

    return result;
  }, [nodes]);

  const totalCanvasHeight = useMemo(() => {
    if (positionedNodes.length === 0) return 1200;
    const maxY = Math.max(...positionedNodes.map(n => n.posY));
    return maxY + 180;
  }, [positionedNodes]);

  // Node position lookup map
  const posMap = useMemo(() => {
    const map = new Map<string, PositionedNode>();
    positionedNodes.forEach(n => map.set(n.id, n));
    return map;
  }, [positionedNodes]);

  // Clean Bézier connections from bottom port of parent to top port of child
  const connections = useMemo(() => {
    return positionedNodes
      .filter(child => child.parent_node_id && posMap.has(child.parent_node_id))
      .map(child => {
        const parent = posMap.get(child.parent_node_id!)!;
        const isParentCompleted = parent.status === 'completed';
        const isChildCompleted = child.status === 'completed';

        const fromX = parent.posX + NODE_WIDTH / 2;
        const fromY = parent.posY + NODE_HEIGHT;
        const toX = child.posX + NODE_WIDTH / 2;
        const toY = child.posY;

        return {
          id: `${parent.id}->${child.id}`,
          fromX,
          fromY,
          toX,
          toY,
          isActive: isParentCompleted,
          isCompleted: isParentCompleted && isChildCompleted
        };
      });
  }, [positionedNodes, posMap]);

  // Distinct Stages for visual stage dividers
  const stageDividers = useMemo(() => {
    const stages: Array<{ level: number; y: number; title: string; subtitle: string }> = [];
    const seen = new Set<number>();

    positionedNodes.forEach(n => {
      if (!seen.has(n.level)) {
        seen.add(n.level);
        const info = STAGE_LABELS[n.level] || { title: `FASE ${n.level}`, subtitle: 'Modul Pembelajaran' };
        stages.push({
          level: n.level,
          y: Math.max(n.posY - 35, 20),
          title: info.title,
          subtitle: info.subtitle
        });
      }
    });

    return stages;
  }, [positionedNodes]);

  // Filtered nodes based on search and status
  const filteredNodes = useMemo(() => {
    return positionedNodes.filter(n => {
      const matchSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          n.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'all' || n.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [positionedNodes, searchTerm, statusFilter]);

  const getStatusBadge = (status: RoadmapNode['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center space-x-1 text-[10px] font-mono text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-full border border-[#10B981]/30 font-semibold">
            <CheckCircle2 className="w-3 h-3" />
            <span>Mastered</span>
          </span>
        );
      case 'in_progress':
        return (
          <span className="flex items-center space-x-1 text-[10px] font-mono text-[#F59E0B] bg-[#F59E0B]/15 px-2 py-0.5 rounded-full border border-[#F59E0B]/30 animate-pulse font-semibold">
            <Clock className="w-3 h-3" />
            <span>Aktif</span>
          </span>
        );
      case 'available':
        return (
          <span className="flex items-center space-x-1 text-[10px] font-mono text-[#38BDF8] bg-[#38BDF8]/15 px-2 py-0.5 rounded-full border border-[#38BDF8]/30 font-semibold">
            <Sparkles className="w-3 h-3" />
            <span>Terbuka</span>
          </span>
        );
      case 'locked':
      default:
        return (
          <span className="flex items-center space-x-1 text-[10px] font-mono text-[#64748B] not-dark:text-slate-500 bg-[#1E293B]/60 not-dark:bg-slate-100 px-2 py-0.5 rounded-full border border-[#334155]/50 not-dark:border-slate-300">
            <Lock className="w-2.5 h-2.5" />
            <span>Lanjutan</span>
          </span>
        );
    }
  };

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
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-semibold">
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
              placeholder="Cari konsep..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-[#090D16] not-dark:bg-slate-100 border border-[#1E293B] not-dark:border-slate-200 focus:border-[#10B981] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#F8FAFC] not-dark:text-slate-900 placeholder-[#94A3B8] outline-none w-36 sm:w-44 transition-colors"
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
            <option value="completed">Mastered ✓</option>
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
              title="Kanvas Graf 2D"
              className={`p-1.5 rounded text-xs transition-colors ${viewMode === 'canvas' ? 'bg-[#1E293B] not-dark:bg-white text-[#10B981] shadow-sm' : 'text-[#94A3B8] not-dark:text-slate-600 hover:text-white not-dark:hover:text-black'}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('linear')}
              title="Urutan Linier"
              className={`p-1.5 rounded text-xs transition-colors ${viewMode === 'linear' ? 'bg-[#1E293B] not-dark:bg-white text-[#10B981] shadow-sm' : 'text-[#94A3B8] not-dark:text-slate-600 hover:text-white not-dark:hover:text-black'}`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Zoom controls */}
          {viewMode === 'canvas' && (
            <div className="flex items-center space-x-1 bg-[#090D16] not-dark:bg-slate-100 p-1 rounded-lg border border-[#1E293B] not-dark:border-slate-200">
              <button
                onClick={handleZoomOut}
                className="p-1.5 text-[#94A3B8] not-dark:text-slate-600 hover:text-white not-dark:hover:text-black hover:bg-[#1E293B] not-dark:hover:bg-slate-200 rounded transition-colors"
                title="Perkecil (-)"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono px-1 text-[#94A3B8] not-dark:text-slate-700">{Math.round(zoom * 100)}%</span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 text-[#94A3B8] not-dark:text-slate-600 hover:text-white not-dark:hover:text-black hover:bg-[#1E293B] not-dark:hover:bg-slate-200 rounded transition-colors"
                title="Perbesar (+)"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1.5 text-[#94A3B8] not-dark:text-slate-600 hover:text-white not-dark:hover:text-black hover:bg-[#1E293B] not-dark:hover:bg-slate-200 rounded transition-colors"
                title="Reset Zoom (100%)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Canvas Area */}
      {viewMode === 'canvas' ? (
        <div 
          ref={containerRef}
          className="relative w-full h-[820px] overflow-auto bg-grid-tactical p-8 flex justify-center"
        >
          <div
            className="relative transition-transform duration-200 origin-top"
            style={{
              width: `${CANVAS_WIDTH}px`,
              height: `${totalCanvasHeight}px`,
              transform: `scale(${zoom})`
            }}
          >
            {/* Stage Level Backdrop Dividers */}
            {stageDividers.map(stage => (
              <div
                key={stage.level}
                style={{ position: 'absolute', top: `${stage.y}px`, left: '10px', right: '10px' }}
                className="pointer-events-none z-0"
              >
                <div className="flex items-center space-x-3 mb-1">
                  <span className="text-[10px] font-mono tracking-widest text-[#10B981] font-bold px-2 py-0.5 rounded bg-[#10B981]/10 border border-[#10B981]/25">
                    {stage.title}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#10B981]/30 via-[#1D2532] not-dark:via-slate-300 to-transparent" />
                </div>
                <p className="text-[10px] font-mono text-[#64748B] pl-1">
                  {stage.subtitle}
                </p>
              </div>
            ))}

            {/* SVG Vector Connections (Smooth Bézier Curves) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              style={{ width: `${CANVAS_WIDTH}px`, height: `${totalCanvasHeight}px` }}
            >
              <defs>
                <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="gradient-active" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>
              </defs>

              {connections.map(conn => {
                const dy = conn.toY - conn.fromY;
                const pathD = `M ${conn.fromX} ${conn.fromY} C ${conn.fromX} ${conn.fromY + dy * 0.5}, ${conn.toX} ${conn.toY - dy * 0.5}, ${conn.toX} ${conn.toY}`;

                return (
                  <g key={conn.id}>
                    {/* Shadow / Base Line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={conn.isActive ? (conn.isCompleted ? '#10B981' : 'url(#gradient-active)') : '#94A3B8'}
                      strokeWidth={conn.isActive ? 2.5 : 1.5}
                      strokeDasharray={conn.isActive ? 'none' : '4 4'}
                      strokeOpacity={conn.isActive ? 0.95 : 0.3}
                      filter={conn.isCompleted ? 'url(#glow-emerald)' : undefined}
                    />

                    {/* Midpoint Pulse Indicator */}
                    {conn.isActive && (
                      <circle
                        cx={(conn.fromX + conn.toX) / 2}
                        cy={(conn.fromY + conn.toY) / 2}
                        r="3.5"
                        fill={conn.isCompleted ? '#10B981' : '#38BDF8'}
                        className="animate-pulse"
                      />
                    )}

                    {/* Small Arrowhead Marker at Child */}
                    <circle
                      cx={conn.toX}
                      cy={conn.toY}
                      r="2.5"
                      fill={conn.isActive ? '#10B981' : '#64748B'}
                    />
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
                    left: `${node.posX}px`,
                    top: `${node.posY}px`,
                    width: `${node.width}px`,
                    height: `${node.height}px`
                  }}
                  className={`group cursor-pointer rounded-xl p-3.5 transition-all duration-200 select-none flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#121722] not-dark:bg-white border-2 border-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.25)] scale-[1.02] z-30'
                      : isLocked
                      ? 'bg-[#0D1017]/90 not-dark:bg-slate-50 border border-[#1D2532] not-dark:border-slate-300 opacity-75 hover:opacity-95 z-20 shadow-sm'
                      : node.status === 'completed'
                      ? 'bg-[#121722] not-dark:bg-white border border-[#10B981]/50 shadow-[0_4px_12px_rgba(16,185,129,0.12)] hover:border-[#10B981] hover:scale-[1.02] z-20'
                      : node.status === 'in_progress'
                      ? 'bg-[#121722] not-dark:bg-white border border-[#F59E0B]/60 shadow-[0_4px_12px_rgba(245,158,11,0.12)] hover:border-[#F59E0B] hover:scale-[1.02] z-20'
                      : 'bg-[#121722] not-dark:bg-white border border-[#2B3547] not-dark:border-slate-300 hover:border-[#38BDF8] hover:scale-[1.02] z-20 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-[#929BAA] not-dark:text-slate-500 font-semibold">
                        Modul #{node.order_index}
                      </span>
                      {getStatusBadge(node.status)}
                    </div>

                    <h3 className={`text-xs font-bold leading-snug line-clamp-2 transition-colors ${
                      isLocked 
                        ? 'text-[#929BAA] not-dark:text-slate-500' 
                        : 'text-[#F8FAFC] not-dark:text-slate-900 group-hover:text-[#10B981]'
                    }`}>
                      {node.title}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-[#1D2532] not-dark:border-slate-200 flex items-center justify-between text-[10px] font-mono text-[#929BAA] not-dark:text-slate-500">
                    <span>{node.checklists?.length || 0} Verifikasi</span>
                    <span className="text-[#10B981] group-hover:translate-x-0.5 transition-transform font-bold flex items-center space-x-0.5">
                      <span>Buka</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Mobile-First Linear Order View */
        <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-4 w-full">
          <div className="text-xs text-[#929BAA] not-dark:text-slate-500 font-mono uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Alur Belajar Berurutan ({filteredNodes.length} Modul)</span>
            <span className="text-[10px] text-[#10B981]">Sesuai Silabus Kurikulum</span>
          </div>

          {filteredNodes.map((node, index) => (
            <div
              key={node.id}
              onClick={() => onSelectNode(node)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start space-x-4 ${
                selectedNodeId === node.id
                  ? 'bg-[#121722] not-dark:bg-white border-[#10B981] shadow-md'
                  : 'bg-[#121722]/80 not-dark:bg-white border-[#1D2532] not-dark:border-slate-200 hover:border-[#10B981]/50'
              }`}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#08090D] not-dark:bg-slate-100 border border-[#1D2532] not-dark:border-slate-200 flex items-center justify-center font-mono text-xs font-bold text-[#10B981]">
                {node.order_index}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#929BAA] not-dark:text-slate-500">Level {node.level}</span>
                  {getStatusBadge(node.status)}
                </div>
                <h3 className="text-sm font-bold text-[#F8FAFC] not-dark:text-slate-900 mt-1">{node.title}</h3>
                <p className="text-xs text-[#929BAA] not-dark:text-slate-600 line-clamp-2 mt-1">{node.summary}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
