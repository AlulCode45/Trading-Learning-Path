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
  Navigation,
  ArrowRight
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

interface LevelThemeConfig {
  name: string;
  shortLabel: string;
  colorHex: string;
  glowColor: string;
  cardBaseClass: string;
  cardSelectedClass: string;
  tagClass: string;
  stripColor: string;
}

const LEVEL_THEMES: Record<number, LevelThemeConfig> = {
  1: {
    name: 'Fondasi Lelang',
    shortLabel: 'Fase 1',
    colorHex: '#10B981', // Emerald Mint
    glowColor: 'rgba(16, 185, 129, 0.4)',
    cardBaseClass: 'bg-emerald-50/95 hover:bg-emerald-50 border-emerald-300 hover:border-emerald-500 dark:bg-[#061812] dark:hover:bg-[#082018] dark:border-emerald-500/40 dark:hover:border-emerald-400',
    cardSelectedClass: 'bg-emerald-50 border-2 border-[#10B981] dark:bg-[#061812] dark:border-[#10B981]',
    tagClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-500/40',
    stripColor: '#10B981'
  },
  2: {
    name: 'Struktur Pasar',
    shortLabel: 'Fase 2',
    colorHex: '#0284C7', // Sky Cyan Blue
    glowColor: 'rgba(2, 132, 199, 0.4)',
    cardBaseClass: 'bg-sky-50/95 hover:bg-sky-50 border-sky-300 hover:border-sky-500 dark:bg-[#06182B] dark:hover:bg-[#09223D] dark:border-sky-500/40 dark:hover:border-sky-400',
    cardSelectedClass: 'bg-sky-50 border-2 border-[#0284C7] dark:bg-[#06182B] dark:border-[#0284C7]',
    tagClass: 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/80 dark:text-sky-300 dark:border-sky-500/40',
    stripColor: '#0284C7'
  },
  3: {
    name: 'Zona Nilai & FVG',
    shortLabel: 'Fase 3',
    colorHex: '#F59E0B', // Golden Amber
    glowColor: 'rgba(245, 158, 11, 0.4)',
    cardBaseClass: 'bg-amber-50/95 hover:bg-amber-50 border-amber-300 hover:border-amber-500 dark:bg-[#1C1405] dark:hover:bg-[#271B07] dark:border-amber-500/40 dark:hover:border-amber-400',
    cardSelectedClass: 'bg-amber-50 border-2 border-[#F59E0B] dark:bg-[#1C1405] dark:border-[#F59E0B]',
    tagClass: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-500/40',
    stripColor: '#F59E0B'
  },
  4: {
    name: 'Likuiditas & Sweeps',
    shortLabel: 'Fase 4',
    colorHex: '#A855F7', // Royal Violet Purple
    glowColor: 'rgba(168, 85, 247, 0.4)',
    cardBaseClass: 'bg-purple-50/95 hover:bg-purple-50 border-purple-300 hover:border-purple-500 dark:bg-[#170928] dark:hover:bg-[#220D3B] dark:border-purple-500/40 dark:hover:border-purple-400',
    cardSelectedClass: 'bg-purple-50 border-2 border-[#A855F7] dark:bg-[#170928] dark:border-[#A855F7]',
    tagClass: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/80 dark:text-purple-300 dark:border-purple-500/40',
    stripColor: '#A855F7'
  },
  5: {
    name: 'Eksekusi & Risiko',
    shortLabel: 'Fase 5',
    colorHex: '#F43F5E', // Rose Crimson
    glowColor: 'rgba(244, 63, 94, 0.4)',
    cardBaseClass: 'bg-rose-50/95 hover:bg-rose-50 border-rose-300 hover:border-rose-500 dark:bg-[#1F0713] dark:hover:bg-[#2B0A1A] dark:border-rose-500/40 dark:hover:border-rose-400',
    cardSelectedClass: 'bg-rose-50 border-2 border-[#F43F5E] dark:bg-[#1F0713] dark:border-[#F43F5E]',
    tagClass: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/80 dark:text-rose-300 dark:border-rose-500/40',
    stripColor: '#F43F5E'
  }
};

const getLevelTheme = (lvl: number): LevelThemeConfig => {
  return LEVEL_THEMES[lvl] || LEVEL_THEMES[((lvl - 1) % 5) + 1] || LEVEL_THEMES[1];
};

// Canvas geometry: spacious, uncrowded 3-lane grid with 60px horizontal clearance
const CANVAS_WIDTH = 1000;
const NODE_WIDTH = 240;
const NODE_HEIGHT = 118;

// Lane X coordinates
const LANE_LEFT_X = 80;
const LANE_CENTER_X = 380;
const LANE_RIGHT_X = 680;

const STAGE_LABELS: Record<number, { title: string; subtitle: string; y: number }> = {
  1: { 
    title: 'FASE 1: FONDASI LELANG & ANATOMI HARGA', 
    subtitle: 'Anatomi candlestick, sumbu volume, dan fraktalitas multi-timeframe',
    y: 25
  },
  2: { 
    title: 'FASE 2: STRUKTUR PASAR & KONFIRMASI TREN', 
    subtitle: 'Break of Structure (BOS), Change of Character (CHoCH), dan swing extremes',
    y: 440
  },
  3: { 
    title: 'FASE 3: ZONA NILAI INSTITUSI & IMBALANCE', 
    subtitle: 'Fair Value Gaps (FVG), Supply & Demand fresh vs mitigated, serta equilibrium',
    y: 860
  },
  4: { 
    title: 'FASE 4: KOLAM LIKUIDITAS & JEBAKAN PASAR', 
    subtitle: 'Pemetaan Buy-side & Sell-side Liquidity, Equal Highs, dan Liquidity Sweeps',
    y: 1080
  },
  5: { 
    title: 'FASE 5: PROTOKOL EKSEKUSI & MANAJEMEN RISIKO', 
    subtitle: 'Trigger konfirmasi LTF, aturan risiko 1% modal, dan audit jurnal trading',
    y: 1300
  }
};

// Symmetrical, uncrowded position map for the core 12 modules
const POSITION_PRESETS: Record<string, { posX: number; posY: number }> = {
  'node-1-1': { posX: LANE_CENTER_X, posY: 80 },   // Fase 1: Single Center Spine
  'node-1-2': { posX: LANE_CENTER_X, posY: 260 },  // Fase 1: Step 2 Center Spine
  'node-2-1': { posX: LANE_CENTER_X, posY: 495 },  // Fase 2: Valid Swings Center
  'node-2-2': { posX: LANE_LEFT_X,   posY: 695 },  // Fase 2: BOS / CHoCH Left
  'node-2-3': { posX: LANE_RIGHT_X,  posY: 695 },  // Fase 2: Strong / Weak Highs Right
  'node-3-1': { posX: LANE_LEFT_X,   posY: 915 },  // Fase 3: Supply & Demand Left
  'node-3-2': { posX: LANE_RIGHT_X,  posY: 915 },  // Fase 3: Premium / Discount Right
  'node-4-1': { posX: LANE_LEFT_X,   posY: 1135 }, // Fase 4: BSL & SSL Left
  'node-4-2': { posX: LANE_RIGHT_X,  posY: 1135 }, // Fase 4: Liquidity Sweeps Right
  'node-5-1': { posX: LANE_LEFT_X,   posY: 1355 }, // Fase 5: LTF Entry Trigger Left
  'node-5-2': { posX: LANE_RIGHT_X,  posY: 1355 }, // Fase 5: Logical Stop Loss Right
  'node-5-3': { posX: LANE_CENTER_X, posY: 1545 }, // Fase 5: Capstone Review Center Convergence
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

  // Position nodes with spacious coordinates: presets for known curriculum or dynamic tree fallback
  const positionedNodes: PositionedNode[] = useMemo(() => {
    return nodes.map(node => {
      if (POSITION_PRESETS[node.id]) {
        return {
          ...node,
          posX: POSITION_PRESETS[node.id].posX,
          posY: POSITION_PRESETS[node.id].posY,
          width: NODE_WIDTH,
          height: NODE_HEIGHT
        };
      }

      // Dynamic fallback for custom / community roadmaps
      const lvl = node.level || 1;
      const order = node.order_index || 1;
      const isLeft = order % 2 === 0;
      const posX = order === 1 ? LANE_CENTER_X : isLeft ? LANE_LEFT_X : LANE_RIGHT_X;
      const posY = 80 + (order - 1) * 160;

      return {
        ...node,
        posX,
        posY,
        width: NODE_WIDTH,
        height: NODE_HEIGHT
      };
    });
  }, [nodes]);

  const totalCanvasHeight = useMemo(() => {
    if (positionedNodes.length === 0) return 1600;
    const maxY = Math.max(...positionedNodes.map(n => n.posY));
    return maxY + 180;
  }, [positionedNodes]);

  const posMap = useMemo(() => {
    const map = new Map<string, PositionedNode>();
    positionedNodes.forEach(n => map.set(n.id, n));
    return map;
  }, [positionedNodes]);

  // Clean Bézier connections with parent & child phase themes
  const connections = useMemo(() => {
    const list: Array<{
      id: string;
      fromX: number;
      fromY: number;
      toX: number;
      toY: number;
      isActive: boolean;
      isCompleted: boolean;
      parentColor: string;
      childColor: string;
    }> = [];

    positionedNodes.forEach(child => {
      if (child.parent_node_id && posMap.has(child.parent_node_id)) {
        const parent = posMap.get(child.parent_node_id)!;
        const isParentCompleted = parent.status === 'completed';
        const isChildCompleted = child.status === 'completed';

        const parentTheme = getLevelTheme(parent.level);
        const childTheme = getLevelTheme(child.level);

        list.push({
          id: `${parent.id}->${child.id}`,
          fromX: parent.posX + NODE_WIDTH / 2,
          fromY: parent.posY + NODE_HEIGHT,
          toX: child.posX + NODE_WIDTH / 2,
          toY: child.posY,
          isActive: isParentCompleted,
          isCompleted: isParentCompleted && isChildCompleted,
          parentColor: parentTheme.colorHex,
          childColor: childTheme.colorHex
        });
      }
    });

    // Add dual convergence curve into node-5-3 if node-5-2 exists
    const node52 = posMap.get('node-5-2');
    const node53 = posMap.get('node-5-3');
    if (node52 && node53) {
      const isParentCompleted = node52.status === 'completed';
      const isChildCompleted = node53.status === 'completed';
      const theme5 = getLevelTheme(5);

      list.push({
        id: 'node-5-2->node-5-3',
        fromX: node52.posX + NODE_WIDTH / 2,
        fromY: node52.posY + NODE_HEIGHT,
        toX: node53.posX + NODE_WIDTH / 2,
        toY: node53.posY,
        isActive: isParentCompleted,
        isCompleted: isParentCompleted && isChildCompleted,
        parentColor: theme5.colorHex,
        childColor: theme5.colorHex
      });
    }

    return list;
  }, [positionedNodes, posMap]);

  // Visual stage divider banners
  const stageDividers = useMemo(() => {
    const presentLevels = new Set(positionedNodes.map(n => n.level));
    const list = [];

    for (let lvl = 1; lvl <= 5; lvl++) {
      if (presentLevels.has(lvl) && STAGE_LABELS[lvl]) {
        list.push({
          level: lvl,
          y: STAGE_LABELS[lvl].y,
          title: STAGE_LABELS[lvl].title,
          subtitle: STAGE_LABELS[lvl].subtitle,
          theme: getLevelTheme(lvl)
        });
      }
    }

    return list;
  }, [positionedNodes]);

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
          <span className="flex items-center space-x-1 text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40 px-2 py-0.5 rounded-full font-bold shadow-xs">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>Mastered</span>
          </span>
        );
      case 'in_progress':
        return (
          <span className="flex items-center space-x-1 text-[10px] font-mono bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/40 px-2 py-0.5 rounded-full animate-pulse font-bold shadow-xs">
            <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            <span>Aktif</span>
          </span>
        );
      case 'available':
        return (
          <span className="flex items-center space-x-1 text-[10px] font-mono bg-sky-100 text-sky-800 border border-sky-300 dark:bg-sky-500/20 dark:text-sky-300 dark:border-sky-500/40 px-2 py-0.5 rounded-full font-bold shadow-xs">
            <Sparkles className="w-3 h-3 text-sky-600 dark:text-sky-400" />
            <span>Terbuka</span>
          </span>
        );
      case 'locked':
      default:
        return (
          <span className="flex items-center space-x-1 text-[10px] font-mono bg-slate-200/80 text-slate-700 border border-slate-300 dark:bg-[#1E293B]/70 dark:text-slate-400 dark:border-[#334155]/50 px-2 py-0.5 rounded-full font-medium">
            <Lock className="w-2.5 h-2.5 text-slate-500 dark:text-slate-400" />
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
    <div className="relative w-full overflow-hidden flex flex-col bg-slate-50 dark:bg-[#08090D] transition-colors">
      {/* Roadmap Header Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-[#1E293B] bg-white dark:bg-[#0D1017] gap-4 transition-colors">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">{roadmap.title}</h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-[#10B981]/15 dark:text-[#10B981] border border-emerald-300 dark:border-[#10B981]/30 font-semibold">
              {roadmap.difficulty}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-[#94A3B8] hidden md:inline">
              Est. {roadmap.estimated_hours} Jam Belajar
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-[#94A3B8] mt-1 max-w-2xl">{roadmap.description}</p>
        </div>

        {/* Search, Filter & View Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Cari konsep..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-slate-100 dark:bg-[#090D16] border border-slate-200 dark:border-[#1E293B] focus:border-[#10B981] rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-[#F8FAFC] placeholder-slate-400 dark:placeholder-[#94A3B8] outline-none w-36 sm:w-44 transition-colors"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="bg-slate-100 dark:bg-[#090D16] border border-slate-200 dark:border-[#1E293B] rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-700 dark:text-[#94A3B8] outline-none"
          >
            <option value="all">Semua Status</option>
            <option value="available">Tersedia</option>
            <option value="in_progress">Sedang Dipelajari</option>
            <option value="completed">Mastered ✓</option>
          </select>

          {/* Jump to Active Button */}
          <button
            onClick={handleJumpToActive}
            className="flex items-center space-x-1 px-2.5 py-1.5 bg-emerald-100 text-emerald-800 dark:bg-[#10B981]/15 dark:text-[#10B981] hover:bg-[#10B981] hover:text-black border border-emerald-300 dark:border-[#10B981]/30 rounded-lg text-xs font-mono transition-colors font-medium"
            title="Lompat ke Modul Aktif"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Modul Aktif</span>
          </button>

          {/* View mode toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-[#090D16] p-1 rounded-lg border border-slate-200 dark:border-[#1E293B]">
            <button
              onClick={() => setViewMode('canvas')}
              title="Kanvas Graf 2D"
              className={`p-1.5 rounded text-xs transition-colors ${viewMode === 'canvas' ? 'bg-white dark:bg-[#1E293B] text-[#10B981] shadow-xs' : 'text-slate-600 dark:text-[#94A3B8] hover:text-black dark:hover:text-white'}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('linear')}
              title="Urutan Linier"
              className={`p-1.5 rounded text-xs transition-colors ${viewMode === 'linear' ? 'bg-white dark:bg-[#1E293B] text-[#10B981] shadow-xs' : 'text-slate-600 dark:text-[#94A3B8] hover:text-black dark:hover:text-white'}`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Zoom controls */}
          {viewMode === 'canvas' && (
            <div className="flex items-center space-x-1 bg-slate-100 dark:bg-[#090D16] p-1 rounded-lg border border-slate-200 dark:border-[#1E293B]">
              <button
                onClick={handleZoomOut}
                className="p-1.5 text-slate-600 dark:text-[#94A3B8] hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#1E293B] rounded transition-colors"
                title="Perkecil (-)"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono px-1 text-slate-700 dark:text-[#94A3B8]">{Math.round(zoom * 100)}%</span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 text-slate-600 dark:text-[#94A3B8] hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#1E293B] rounded transition-colors"
                title="Perbesar (+)"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1.5 text-slate-600 dark:text-[#94A3B8] hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#1E293B] rounded transition-colors"
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
          className="relative w-full h-[860px] overflow-auto bg-grid-tactical bg-slate-50 dark:bg-[#08090D] p-8 flex justify-center transition-colors"
        >
          <div
            className="relative transition-transform duration-200 origin-top"
            style={{
              width: `${CANVAS_WIDTH}px`,
              height: `${totalCanvasHeight}px`,
              transform: `scale(${zoom})`
            }}
          >
            {/* Colorful Stage Level Backdrop Dividers */}
            {stageDividers.map(stage => {
              const theme = stage.theme;
              return (
                <div
                  key={stage.level}
                  style={{ position: 'absolute', top: `${stage.y}px`, left: '30px', right: '30px' }}
                  className="pointer-events-none z-0"
                >
                  <div className="flex items-center space-x-3 mb-1">
                    <span 
                      style={{ 
                        borderColor: `${theme.colorHex}55`,
                        color: theme.colorHex,
                        backgroundColor: `${theme.colorHex}15`
                      }}
                      className="text-[10.5px] font-mono tracking-widest font-bold px-3 py-0.5 rounded-md border shadow-xs"
                    >
                      {stage.title}
                    </span>
                    <div 
                      style={{
                        background: `linear-gradient(to right, ${theme.colorHex}55, ${theme.colorHex}15, transparent)`
                      }}
                      className="flex-1 h-[1.5px]" 
                    />
                  </div>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 pl-1 font-medium">
                    {stage.subtitle}
                  </p>
                </div>
              );
            })}

            {/* SVG Vector Connections (Smooth Bézier Curves with Chromatic Gradients) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              style={{ width: `${CANVAS_WIDTH}px`, height: `${totalCanvasHeight}px` }}
            >
              <defs>
                <filter id="glow-connector" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                {connections.map(conn => (
                  <linearGradient 
                    key={`grad-${conn.id}`} 
                    id={`grad-${conn.id.replace(/[^a-zA-Z0-9]/g, '_')}`} 
                    x1="0%" y1="0%" x2="0%" y2="100%"
                  >
                    <stop offset="0%" stopColor={conn.parentColor} />
                    <stop offset="100%" stopColor={conn.childColor} />
                  </linearGradient>
                ))}
              </defs>

              {connections.map(conn => {
                const dy = conn.toY - conn.fromY;
                const pathD = `M ${conn.fromX} ${conn.fromY} C ${conn.fromX} ${conn.fromY + dy * 0.5}, ${conn.toX} ${conn.toY - dy * 0.5}, ${conn.toX} ${conn.toY - 2}`;
                const gradId = `grad-${conn.id.replace(/[^a-zA-Z0-9]/g, '_')}`;

                return (
                  <g key={conn.id}>
                    {/* High-contrast halo stroke behind line to make it pop boldly against grid */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="currentColor"
                      className="text-white dark:text-[#08090D]"
                      strokeWidth={7}
                      strokeLinecap="round"
                      strokeOpacity={0.95}
                    />

                    {/* Bold, vibrant chromatic gradient connector line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={`url(#${gradId})`}
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeOpacity={1}
                      filter={conn.isCompleted ? 'url(#glow-connector)' : undefined}
                    />

                    {/* Source node exit anchor port */}
                    <circle
                      cx={conn.fromX}
                      cy={conn.fromY}
                      r={4.5}
                      fill={conn.parentColor}
                      stroke="currentColor"
                      className="text-white dark:text-[#08090D]"
                      strokeWidth={2}
                    />

                    {/* Midpoint flow pulse indicator */}
                    <circle
                      cx={(conn.fromX + conn.toX) / 2}
                      cy={(conn.fromY + conn.toY) / 2}
                      r={4}
                      fill={conn.childColor}
                      stroke="currentColor"
                      className="text-white dark:text-[#08090D] animate-pulse"
                      strokeWidth={1.5}
                    />

                    {/* Prominent directional arrowhead pointing into child node */}
                    <polygon
                      points={`${conn.toX - 6},${conn.toY - 12} ${conn.toX + 6},${conn.toY - 12} ${conn.toX},${conn.toY - 2}`}
                      fill={conn.childColor}
                      stroke="currentColor"
                      className="text-white dark:text-[#08090D]"
                      strokeWidth={1.5}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Interactive Colorful Node Cards */}
            {filteredNodes.map(node => {
              const isSelected = selectedNodeId === node.id;
              const isLocked = node.status === 'locked';
              const theme = getLevelTheme(node.level);

              const cardClasses = isSelected
                ? `${theme.cardSelectedClass} scale-[1.03] z-30 shadow-lg`
                : isLocked
                ? 'bg-slate-100/90 hover:bg-slate-100 border-slate-300 hover:border-slate-400 dark:bg-[#0D1017]/90 dark:hover:bg-[#121722] dark:border-[#1E293B] opacity-80 hover:opacity-100 z-20 shadow-xs'
                : `${theme.cardBaseClass} hover:scale-[1.02] hover:shadow-md z-20`;

              return (
                <div
                  key={node.id}
                  onClick={() => onSelectNode(node)}
                  style={{
                    position: 'absolute',
                    left: `${node.posX}px`,
                    top: `${node.posY}px`,
                    width: `${node.width}px`,
                    height: `${node.height}px`,
                    boxShadow: isSelected 
                      ? `0 0 24px ${theme.glowColor}, 0 4px 16px rgba(0,0,0,0.15)` 
                      : undefined
                  }}
                  className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-200 select-none flex flex-col justify-between border ${cardClasses}`}
                >
                  {/* Colored Top Accent Strip for instant visual stage identification */}
                  <div 
                    style={{ backgroundColor: theme.stripColor }} 
                    className="h-1.5 w-full flex-shrink-0"
                  />

                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        {/* Stage Phase Tag */}
                        <span 
                          className={`text-[9.5px] font-mono px-2 py-0.5 rounded font-bold border ${theme.tagClass}`}
                        >
                          {theme.shortLabel} #{node.order_index}
                        </span>
                        {getStatusBadge(node.status)}
                      </div>

                      <h3 className={`text-xs font-bold leading-snug line-clamp-2 transition-colors ${
                        isLocked 
                          ? 'text-slate-600 dark:text-slate-400' 
                          : 'text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300'
                      }`}>
                        {node.title}
                      </h3>
                    </div>

                    <div className="pt-2 mt-1 border-t border-slate-200/90 dark:border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-600 dark:text-slate-400">
                      <span>{node.checklists?.length || 0} Verifikasi</span>
                      <span 
                        style={{ color: theme.colorHex }} 
                        className="group-hover:translate-x-0.5 transition-transform font-bold flex items-center space-x-0.5"
                      >
                        <span>Buka</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Mobile-First Linear Order View with Colorful Stage Tiers */
        <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-4 w-full">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Alur Belajar Berurutan ({filteredNodes.length} Modul)</span>
            <span className="text-[10px] text-emerald-600 dark:text-[#10B981] font-bold">5 Fase Kurikulum</span>
          </div>

          {filteredNodes.map((node) => {
            const theme = getLevelTheme(node.level);
            return (
              <div
                key={node.id}
                onClick={() => onSelectNode(node)}
                style={{
                  borderLeftWidth: '5px',
                  borderLeftColor: theme.colorHex
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start space-x-4 ${
                  selectedNodeId === node.id
                    ? `${theme.cardSelectedClass} shadow-md`
                    : `${theme.cardBaseClass} hover:shadow-sm`
                }`}
              >
                <div 
                  style={{ 
                    backgroundColor: `${theme.colorHex}20`,
                    borderColor: `${theme.colorHex}55`,
                    color: theme.colorHex 
                  }}
                  className="flex-shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center font-mono text-xs font-bold"
                >
                  {node.order_index}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span 
                      style={{ color: theme.colorHex }} 
                      className="text-xs font-mono font-bold"
                    >
                      {theme.shortLabel} — {theme.name}
                    </span>
                    {getStatusBadge(node.status)}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{node.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">{node.summary}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
