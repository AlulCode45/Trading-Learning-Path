import React, { useState, useRef, useMemo } from 'react';
import {
  X,
  Check,
  Plus,
  Trash2,
  Move,
  GitBranch,
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Layers,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Unlink,
  Grid,
  BoxSelect,
  ArrowRight
} from 'lucide-react';
import {
  StudioNodeItem,
  RoadmapEdgeConnection,
  RoadmapStageBoxConfig,
  PortPosition,
  EdgeLineStyle,
  EdgeCurveType,
  STUDIO_NODE_WIDTH,
  STUDIO_NODE_HEIGHT,
  STUDIO_CANVAS_WIDTH,
  LANE_LEFT_X,
  LANE_CENTER_X,
  LANE_RIGHT_X,
  getPortCoordinates,
  buildEdgeSvgPath,
  buildArrowPolygonPoints
} from '../../types/roadmapStudioTypes';

interface RoadmapGraphStudioModalProps {
  isOpen: boolean;
  roadmapTitle: string;
  nodes: StudioNodeItem[];
  connections: RoadmapEdgeConnection[];
  stageBoxes: RoadmapStageBoxConfig[];
  onClose: () => void;
  onApply: (payload: {
    nodes: StudioNodeItem[];
    connections: RoadmapEdgeConnection[];
    stageBoxes: RoadmapStageBoxConfig[];
  }) => void;
}

const NODE_COLOR_PALETTE = [
  { label: 'Kuning (Core)', hex: '#FEF08A', border: '#CA8A04', tagBg: '#000000', tagText: '#FEF08A' },
  { label: 'Biru (Struktur)', hex: '#BAE6FD', border: '#0284C7', tagBg: '#000000', tagText: '#BAE6FD' },
  { label: 'Ungu (Zona Nilai)', hex: '#E9D5FF', border: '#9333EA', tagBg: '#000000', tagText: '#E9D5FF' },
  { label: 'Hijau (Likuiditas)', hex: '#BBF7D0', border: '#16A34A', tagBg: '#000000', tagText: '#BBF7D0' },
  { label: 'Merah Muda (Risiko)', hex: '#FECDD3', border: '#E11D48', tagBg: '#000000', tagText: '#FECDD3' },
  { label: 'Oranye (Eksekusi)', hex: '#FED7AA', border: '#EA580C', tagBg: '#000000', tagText: '#FED7AA' },
  { label: ' Putih Bersih', hex: '#FFFFFF', border: '#0F172A', tagBg: '#0F172A', tagText: '#FFFFFF' }
];

const EDGE_COLOR_PALETTE = [
  { label: 'Hitam / Kontras', hex: '#1E293B' },
  { label: 'Emas / Kuning', hex: '#CA8A04' },
  { label: 'Biru Langit', hex: '#0284C7' },
  { label: 'Ungu Institusi', hex: '#9333EA' },
  { label: 'Hijau Bullish', hex: '#16A34A' },
  { label: 'Merah Risiko', hex: '#E11D48' }
];

export const RoadmapGraphStudioModal: React.FC<RoadmapGraphStudioModalProps> = ({
  isOpen,
  roadmapTitle,
  nodes: initialNodes,
  connections: initialConnections,
  stageBoxes: initialStageBoxes,
  onClose,
  onApply
}) => {
  const [nodes, setNodes] = useState<StudioNodeItem[]>(() =>
    initialNodes.map((n, idx) => ({
      ...n,
      posX: typeof n.posX === 'number' ? n.posX : idx === 0 ? LANE_CENTER_X : idx % 2 === 1 ? LANE_LEFT_X : LANE_RIGHT_X,
      posY: typeof n.posY === 'number' ? n.posY : 90 + idx * 165
    }))
  );

  const [connections, setConnections] = useState<RoadmapEdgeConnection[]>(() => {
    if (initialConnections && initialConnections.length > 0) {
      return initialConnections;
    }
    const autoEdges: RoadmapEdgeConnection[] = [];
    for (let i = 0; i < initialNodes.length - 1; i++) {
      autoEdges.push({
        id: `edge-${initialNodes[i].id}-${initialNodes[i + 1].id}`,
        fromNodeId: initialNodes[i].id,
        toNodeId: initialNodes[i + 1].id,
        fromPort: 'bottom',
        toPort: 'top',
        color: '#0284C7',
        lineStyle: 'solid',
        curveType: 'bezier'
      });
    }
    return autoEdges;
  });

  const [stageBoxes, setStageBoxes] = useState<RoadmapStageBoxConfig[]>(() => initialStageBoxes || []);

  const [studioMode, setStudioMode] = useState<'move' | 'connect'>('move');
  const [snapToGrid, setSnapToGrid] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(0.95);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(nodes[0]?.id || null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);

  // Dragging state for nodes or stage boxes
  const [draggingNode, setDraggingNode] = useState<{
    id: string;
    startClientX: number;
    startClientY: number;
    initialPosX: number;
    initialPosY: number;
  } | null>(null);

  const [draggingStage, setDraggingStage] = useState<{
    id: string;
    mode: 'move' | 'resize';
    startClientX: number;
    startClientY: number;
    initialX: number;
    initialY: number;
    initialW: number;
    initialH: number;
  } | null>(null);

  // Interactive line drawing state (drag from port or click-to-click)
  const [drawingEdge, setDrawingEdge] = useState<{
    fromNodeId: string;
    fromPort: PortPosition;
    currentX: number;
    currentY: number;
  } | null>(null);

  const [connectStartSource, setConnectStartSource] = useState<{
    nodeId: string;
    port: PortPosition;
  } | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  const nodeMap = useMemo(() => {
    const map = new Map<string, StudioNodeItem>();
    nodes.forEach(n => map.set(n.id, n));
    return map;
  }, [nodes]);

  const totalCanvasHeight = useMemo(() => {
    const maxNodeY = nodes.length > 0 ? Math.max(...nodes.map(n => n.posY + STUDIO_NODE_HEIGHT)) : 800;
    const maxStageY = stageBoxes.length > 0 ? Math.max(...stageBoxes.map(b => b.y + b.height)) : 0;
    return Math.max(920, maxNodeY + 220, maxStageY + 160);
  }, [nodes, stageBoxes]);

  if (!isOpen) return null;

  const snapVal = (v: number) => (snapToGrid ? Math.round(v / 15) * 15 : Math.round(v));

  const getCanvasRelativeCoords = (clientX: number, clientY: number) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: (clientX - rect.left) / zoom,
      y: (clientY - rect.top) / zoom
    };
  };

  // --- Mouse Move & Up on Canvas ---
  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (draggingNode) {
      const dx = (e.clientX - draggingNode.startClientX) / zoom;
      const dy = (e.clientY - draggingNode.startClientY) / zoom;
      const nextX = Math.max(15, Math.min(STUDIO_CANVAS_WIDTH - STUDIO_NODE_WIDTH - 15, snapVal(draggingNode.initialPosX + dx)));
      const nextY = Math.max(20, snapVal(draggingNode.initialPosY + dy));

      setNodes(prev =>
        prev.map(n => (n.id === draggingNode.id ? { ...n, posX: nextX, posY: nextY } : n))
      );
      return;
    }

    if (draggingStage) {
      const dx = (e.clientX - draggingStage.startClientX) / zoom;
      const dy = (e.clientY - draggingStage.startClientY) / zoom;
      if (draggingStage.mode === 'move') {
        const nextX = Math.max(10, Math.min(STUDIO_CANVAS_WIDTH - 200, snapVal(draggingStage.initialX + dx)));
        const nextY = Math.max(10, snapVal(draggingStage.initialY + dy));
        setStageBoxes(prev =>
          prev.map(b => (b.id === draggingStage.id ? { ...b, x: nextX, y: nextY } : b))
        );
      } else {
        const nextW = Math.max(280, Math.min(STUDIO_CANVAS_WIDTH - draggingStage.initialX - 10, snapVal(draggingStage.initialW + dx)));
        const nextH = Math.max(140, snapVal(draggingStage.initialH + dy));
        setStageBoxes(prev =>
          prev.map(b => (b.id === draggingStage.id ? { ...b, width: nextW, height: nextH } : b))
        );
      }
      return;
    }

    if (drawingEdge) {
      const coords = getCanvasRelativeCoords(e.clientX, e.clientY);
      setDrawingEdge(prev => (prev ? { ...prev, currentX: coords.x, currentY: coords.y } : null));
    }
  };

  const handleCanvasMouseUp = () => {
    setDraggingNode(null);
    setDraggingStage(null);
    if (drawingEdge) {
      setDrawingEdge(null);
    }
  };

  // --- Create Connection Helper ---
  const createConnectionBetween = (
    fromNodeId: string,
    fromPort: PortPosition,
    toNodeId: string,
    toPort: PortPosition
  ) => {
    if (fromNodeId === toNodeId) return;
    const exists = connections.some(
      c => c.fromNodeId === fromNodeId && c.toNodeId === toNodeId && c.fromPort === fromPort && c.toPort === toPort
    );
    if (exists) return;

    const newEdge: RoadmapEdgeConnection = {
      id: `edge-${fromNodeId}-${toNodeId}-${Date.now().toString().slice(-4)}`,
      fromNodeId,
      toNodeId,
      fromPort,
      toPort,
      color: '#0284C7',
      lineStyle: 'solid',
      curveType: 'bezier'
    };
    setConnections(prev => [...prev, newEdge]);
    setSelectedEdgeId(newEdge.id);
    setSelectedNodeId(null);
    setSelectedStageId(null);
  };

  const detectSmartPorts = (sourceNode: StudioNodeItem, targetNode: StudioNodeItem): { fromPort: PortPosition; toPort: PortPosition } => {
    const dy = targetNode.posY - sourceNode.posY;
    const dx = targetNode.posX - sourceNode.posX;
    if (Math.abs(dy) < 60) {
      return dx >= 0 ? { fromPort: 'right', toPort: 'left' } : { fromPort: 'left', toPort: 'right' };
    }
    return dy >= 0 ? { fromPort: 'bottom', toPort: 'top' } : { fromPort: 'top', toPort: 'bottom' };
  };

  // --- Auto Layout Generators ---
  const applyLayoutPreset = (type: 'zigzag' | 'linear' | 'branching' | 'two-column') => {
    const updatedNodes = nodes.map((n, idx) => {
      if (type === 'linear') {
        return { ...n, posX: LANE_CENTER_X, posY: 80 + idx * 165 };
      }
      if (type === 'two-column') {
        const row = Math.floor(idx / 2);
        const isLeft = idx % 2 === 0;
        return { ...n, posX: isLeft ? LANE_LEFT_X : LANE_RIGHT_X, posY: 80 + row * 175 };
      }
      if (type === 'branching') {
        if (idx === 0) return { ...n, posX: LANE_CENTER_X, posY: 80 };
        if (idx === nodes.length - 1 && nodes.length > 2) {
          const totalRows = Math.ceil((nodes.length - 2) / 2);
          return { ...n, posX: LANE_CENTER_X, posY: 250 + totalRows * 180 };
        }
        const branchIdx = idx - 1;
        const row = Math.floor(branchIdx / 2);
        const isLeft = branchIdx % 2 === 0;
        return { ...n, posX: isLeft ? LANE_LEFT_X : LANE_RIGHT_X, posY: 250 + row * 180 };
      }
      // Default: zigzag
      if (idx === 0) return { ...n, posX: LANE_CENTER_X, posY: 80 };
      const isLeft = idx % 2 === 1;
      return { ...n, posX: isLeft ? LANE_LEFT_X : LANE_RIGHT_X, posY: 80 + idx * 160 };
    });

    setNodes(updatedNodes);

    // If branching preset chosen, also wire up clean branching & convergence connections
    if (type === 'branching' && updatedNodes.length >= 3) {
      const newEdges: RoadmapEdgeConnection[] = [];
      const root = updatedNodes[0];
      const leftFirst = updatedNodes[1];
      const rightFirst = updatedNodes[2];
      if (leftFirst) {
        newEdges.push({
          id: `edge-${root.id}-${leftFirst.id}`,
          fromNodeId: root.id,
          toNodeId: leftFirst.id,
          fromPort: 'bottom',
          toPort: 'top',
          color: '#CA8A04',
          lineStyle: 'solid',
          curveType: 'bezier',
          label: 'Jalur A'
        });
      }
      if (rightFirst) {
        newEdges.push({
          id: `edge-${root.id}-${rightFirst.id}`,
          fromNodeId: root.id,
          toNodeId: rightFirst.id,
          fromPort: 'bottom',
          toPort: 'top',
          color: '#0284C7',
          lineStyle: 'solid',
          curveType: 'bezier',
          label: 'Jalur B'
        });
      }
      for (let i = 1; i < updatedNodes.length - 1; i++) {
        const nextInTrack = i + 2;
        if (nextInTrack < updatedNodes.length - 1) {
          newEdges.push({
            id: `edge-${updatedNodes[i].id}-${updatedNodes[nextInTrack].id}`,
            fromNodeId: updatedNodes[i].id,
            toNodeId: updatedNodes[nextInTrack].id,
            fromPort: 'bottom',
            toPort: 'top',
            color: '#9333EA',
            lineStyle: 'solid',
            curveType: 'bezier'
          });
        } else {
          const capstone = updatedNodes[updatedNodes.length - 1];
          newEdges.push({
            id: `edge-${updatedNodes[i].id}-${capstone.id}`,
            fromNodeId: updatedNodes[i].id,
            toNodeId: capstone.id,
            fromPort: 'bottom',
            toPort: 'top',
            color: '#16A34A',
            lineStyle: 'solid',
            curveType: 'bezier',
            label: 'Konvergensi'
          });
        }
      }
      setConnections(newEdges);
    }
  };

  const handleAutoConnectSequential = () => {
    const seqEdges: RoadmapEdgeConnection[] = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      const ports = detectSmartPorts(nodes[i], nodes[i + 1]);
      seqEdges.push({
        id: `edge-${nodes[i].id}-${nodes[i + 1].id}-${i}`,
        fromNodeId: nodes[i].id,
        toNodeId: nodes[i + 1].id,
        fromPort: ports.fromPort,
        toPort: ports.toPort,
        color: '#0284C7',
        lineStyle: 'solid',
        curveType: 'bezier'
      });
    }
    setConnections(seqEdges);
  };

  const handleAutoGenerateStageBoxes = () => {
    const levelMap = new Map<number, StudioNodeItem[]>();
    nodes.forEach(n => {
      const lvl = n.level || 1;
      if (!levelMap.has(lvl)) levelMap.set(lvl, []);
      levelMap.get(lvl)!.push(n);
    });

    const generated: RoadmapStageBoxConfig[] = [];
    Array.from(levelMap.entries())
      .sort((a, b) => a[0] - b[0])
      .forEach(([lvl, groupNodes], idx) => {
        const minY = Math.min(...groupNodes.map(n => n.posY));
        const maxY = Math.max(...groupNodes.map(n => n.posY + STUDIO_NODE_HEIGHT));
        const colors = ['#FACC15', '#38BDF8', '#C084FC', '#4ADE80', '#FB7185'];
        generated.push({
          id: `stage-${lvl}-${Date.now()}-${idx}`,
          level: lvl,
          title: `FASE ${lvl}: TAHAPAN KURIKULUM ${lvl}`,
          subtitle: `${groupNodes.length} Modul Terintegrasi`,
          tag: `Fase #${lvl}`,
          x: 45,
          y: Math.max(20, minY - 42),
          width: 910,
          height: Math.max(175, maxY - minY + 75),
          colorHex: colors[(lvl - 1) % colors.length]
        });
      });

    setStageBoxes(generated);
  };

  const handleAddNewNodeInStudio = () => {
    const nextIdx = nodes.length + 1;
    const lastNode = nodes[nodes.length - 1];
    const newNode: StudioNodeItem = {
      id: `node-${nextIdx}-${Date.now().toString().slice(-3)}`,
      title: `Modul Baru #${nextIdx}`,
      duration: '2 jam',
      level: lastNode ? lastNode.level : 1,
      importance: 'recommended',
      posX: lastNode ? (lastNode.posX === LANE_LEFT_X ? LANE_RIGHT_X : LANE_LEFT_X) : LANE_CENTER_X,
      posY: lastNode ? lastNode.posY + 165 : 90,
      customColor: '#BAE6FD'
    };

    setNodes(prev => [...prev, newNode]);
    if (lastNode) {
      createConnectionBetween(lastNode.id, 'bottom', newNode.id, 'top');
    }
    setSelectedNodeId(newNode.id);
    setSelectedEdgeId(null);
    setSelectedStageId(null);
  };

  const handleAddStageBox = () => {
    const nextLvl = stageBoxes.length + 1;
    const lastBox = stageBoxes[stageBoxes.length - 1];
    const newBox: RoadmapStageBoxConfig = {
      id: `stage-custom-${Date.now()}`,
      level: nextLvl,
      title: `${nextLvl}. AREA FASE KURIKULUM BARU`,
      subtitle: 'Kelompokkan modul di dalam kotak fase ini',
      tag: `Fase ${nextLvl}`,
      x: 45,
      y: lastBox ? lastBox.y + lastBox.height + 40 : 40,
      width: 910,
      height: 240,
      colorHex: '#FACC15'
    };
    setStageBoxes(prev => [...prev, newBox]);
    setSelectedStageId(newBox.id);
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || null;
  const selectedEdge = connections.find(c => c.id === selectedEdgeId) || null;
  const selectedStage = stageBoxes.find(b => b.id === selectedStageId) || null;

  const updateSelectedNode = (patch: Partial<StudioNodeItem>) => {
    if (!selectedNodeId) return;
    setNodes(prev => prev.map(n => (n.id === selectedNodeId ? { ...n, ...patch } : n)));
  };

  const updateSelectedEdge = (patch: Partial<RoadmapEdgeConnection>) => {
    if (!selectedEdgeId) return;
    setConnections(prev => prev.map(c => (c.id === selectedEdgeId ? { ...c, ...patch } : c)));
  };

  const updateSelectedStage = (patch: Partial<RoadmapStageBoxConfig>) => {
    if (!selectedStageId) return;
    setStageBoxes(prev => prev.map(b => (b.id === selectedStageId ? { ...b, ...patch } : b)));
  };

  const getDefaultThemeHex = (lvl: number) => {
    const map: Record<number, string> = {
      1: '#FEF08A',
      2: '#BAE6FD',
      3: '#E9D5FF',
      4: '#BBF7D0',
      5: '#FECDD3'
    };
    return map[((lvl - 1) % 5) + 1] || '#FEF08A';
  };

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-slate-900/80 backdrop-blur-xs flex flex-col overflow-hidden select-none">
      {/* Top Studio Header Bar */}
      <div className="px-5 py-3 bg-white dark:bg-[#0D111A] border-b border-slate-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 z-20">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#FACC15] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-black font-black">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded bg-black text-[#FACC15] text-[10px] font-mono font-extrabold uppercase">
                Visual Flow Studio
              </span>
              <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight">
                {roadmapTitle || 'Studio Peta Kurikulum & Alur Garis Interaktif'}
              </h2>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">
              Geser bebas posisi modul (Drag &amp; Drop) dan tarik garis konektor dari titik port modul mana saja ke modul lainnya.
            </p>
          </div>
        </div>

        {/* Center Mode Switcher & Quick Tools */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-100 dark:bg-zinc-900 p-1 rounded-xl border border-slate-300 dark:border-zinc-700">
            <button
              type="button"
              onClick={() => {
                setStudioMode('move');
                setConnectStartSource(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-all ${
                studioMode === 'move'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Move className="w-3.5 h-3.5" />
              <span>Geser Posisi</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setStudioMode('connect');
                setConnectStartSource(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-all ${
                studioMode === 'connect'
                  ? 'bg-[#FACC15] text-black border border-black shadow-[2px_2px_0px_#000]'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Mode Tarik Garis</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setSnapToGrid(prev => !prev)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-semibold flex items-center space-x-1 transition-all ${
              snapToGrid
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300'
                : 'bg-slate-100 dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 text-slate-600 dark:text-zinc-400'
            }`}
            title="Snap koordinat modul ke grid 15px"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Snap Grid</span>
          </button>

          <button
            type="button"
            onClick={handleAddNewNodeInStudio}
            className="px-3 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-800 dark:text-sky-300 border border-sky-500/30 text-xs font-mono font-bold flex items-center space-x-1 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Modul</span>
          </button>

          <button
            type="button"
            onClick={handleAddStageBox}
            className="px-3 py-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 text-purple-800 dark:text-purple-300 border border-purple-500/30 text-xs font-mono font-bold flex items-center space-x-1 transition-all"
          >
            <BoxSelect className="w-3.5 h-3.5" />
            <span>+ Kotak Fase</span>
          </button>
        </div>

        {/* Right Actions: Cancel & Save */}
        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 text-xs font-mono font-semibold text-slate-700 dark:text-zinc-300 flex items-center space-x-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Tutup</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onApply({ nodes, connections, stageBoxes });
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-black font-mono font-extrabold text-xs border-2 border-black shadow-[3px_3px_0px_#000] flex items-center space-x-1.5 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Simpan Layout &amp; Alur Garis</span>
          </button>
        </div>
      </div>

      {/* Secondary Sub-Toolbar: Auto-Layout Presets & Zoom */}
      <div className="px-5 py-2 bg-slate-100 dark:bg-[#121723] border-b border-slate-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono z-10">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 mr-1 flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Preset Tata Letak Otomatis:</span>
          </span>
          <button
            type="button"
            onClick={() => applyLayoutPreset('zigzag')}
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 hover:bg-amber-50 dark:hover:bg-zinc-700 border border-slate-300 dark:border-zinc-700 text-[11px] font-semibold text-slate-800 dark:text-zinc-200"
          >
            ⚡ Zigzag (Kiri-Kanan)
          </button>
          <button
            type="button"
            onClick={() => applyLayoutPreset('linear')}
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 hover:bg-amber-50 dark:hover:bg-zinc-700 border border-slate-300 dark:border-zinc-700 text-[11px] font-semibold text-slate-800 dark:text-zinc-200"
          >
            ⬇️ Spine Vertikal Lurus
          </button>
          <button
            type="button"
            onClick={() => applyLayoutPreset('branching')}
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 hover:bg-amber-50 dark:hover:bg-zinc-700 border border-slate-300 dark:border-zinc-700 text-[11px] font-semibold text-slate-800 dark:text-zinc-200"
          >
            🔀 Cabang Paralel &amp; Konvergensi
          </button>
          <button
            type="button"
            onClick={() => applyLayoutPreset('two-column')}
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 hover:bg-amber-50 dark:hover:bg-zinc-700 border border-slate-300 dark:border-zinc-700 text-[11px] font-semibold text-slate-800 dark:text-zinc-200"
          >
            ⏸️ 2-Kolom Sejajar
          </button>

          <span className="mx-1 text-slate-300 dark:text-zinc-700">|</span>

          <button
            type="button"
            onClick={handleAutoConnectSequential}
            className="px-2.5 py-1 rounded-md bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-[11px] font-bold text-sky-700 dark:text-sky-300"
          >
            🔗 Hubungkan Berurutan
          </button>
          <button
            type="button"
            onClick={handleAutoGenerateStageBoxes}
            className="px-2.5 py-1 rounded-md bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-[11px] font-bold text-purple-700 dark:text-purple-300"
          >
            📦 Bungkus Fase Otomatis
          </button>
          <button
            type="button"
            onClick={() => {
              setConnections([]);
              setSelectedEdgeId(null);
            }}
            className="px-2.5 py-1 rounded-md bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-[11px] font-bold text-rose-700 dark:text-rose-300"
          >
            🗑️ Hapus Semua Garis
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-1 bg-white dark:bg-zinc-900 px-2 py-0.5 rounded-lg border border-slate-300 dark:border-zinc-700">
          <button
            type="button"
            onClick={() => setZoom(z => Math.max(0.55, Number((z - 0.1).toFixed(2))))}
            className="p-1 text-slate-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-bold px-1.5 text-slate-800 dark:text-zinc-200">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoom(z => Math.min(1.35, Number((z + 0.1).toFixed(2))))}
            className="p-1 text-slate-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoom(0.95)}
            className="p-1 text-slate-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Split Workspace: Interactive 2D Flowchart Canvas (Left) + Inspector Sidebar (Right) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Interactive Canvas */}
        <div
          className="flex-1 overflow-auto bg-grid-tactical bg-[#F8FAFC] dark:bg-[#0B0F19] p-6 sm:p-10 flex justify-center relative"
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
        >
          {/* Floating Banner when in Connect Mode */}
          {studioMode === 'connect' && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full bg-black text-[#FACC15] border-2 border-[#FACC15] shadow-lg text-xs font-mono font-bold flex items-center space-x-2">
              <Link2 className="w-4 h-4 animate-pulse" />
              <span>
                {connectStartSource
                  ? `Pilih modul tujuan untuk dihubungkan dari [${nodeMap.get(connectStartSource.nodeId)?.title || connectStartSource.nodeId}]...`
                  : 'Mode Tarik Garis Aktif: Klik titik port modul asal, lalu klik titik port modul tujuan (atau drag langsung antar port)'}
              </span>
              {connectStartSource && (
                <button
                  type="button"
                  onClick={() => setConnectStartSource(null)}
                  className="ml-2 px-2 py-0.5 rounded bg-zinc-800 text-white text-[10px]"
                >
                  Batal
                </button>
              )}
            </div>
          )}

          <div
            ref={canvasRef}
            onClick={(e) => {
              if (e.target === canvasRef.current) {
                setSelectedNodeId(null);
                setSelectedEdgeId(null);
                setSelectedStageId(null);
                setConnectStartSource(null);
              }
            }}
            className="relative origin-top bg-white/50 dark:bg-[#0E1320]/60 border-2 border-dashed border-slate-300 dark:border-zinc-800 rounded-3xl shadow-inner"
            style={{
              width: `${STUDIO_CANVAS_WIDTH}px`,
              height: `${totalCanvasHeight}px`,
              transform: `scale(${zoom})`
            }}
          >
            {/* Center Vertical Guide Line */}
            <div
              className="absolute top-0 bottom-0 border-l border-dashed border-slate-300/60 dark:border-zinc-800/70 pointer-events-none"
              style={{ left: `${STUDIO_CANVAS_WIDTH / 2}px` }}
            />

            {/* Stage Group Containers (Background Enclosure Boxes) */}
            {stageBoxes.map(box => {
              const isStageSelected = selectedStageId === box.id;
              return (
                <div
                  key={box.id}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setSelectedStageId(box.id);
                    setSelectedNodeId(null);
                    setSelectedEdgeId(null);
                    setDraggingStage({
                      id: box.id,
                      mode: 'move',
                      startClientX: e.clientX,
                      startClientY: e.clientY,
                      initialX: box.x,
                      initialY: box.y,
                      initialW: box.width,
                      initialH: box.height
                    });
                  }}
                  style={{
                    position: 'absolute',
                    left: `${box.x}px`,
                    top: `${box.y}px`,
                    width: `${box.width}px`,
                    height: `${box.height}px`
                  }}
                  className={`rounded-2xl border-2 border-dashed transition-colors cursor-move ${
                    isStageSelected
                      ? 'border-amber-500 bg-amber-500/5 ring-2 ring-amber-400/30 z-10'
                      : 'border-slate-300 dark:border-zinc-700 bg-white/40 dark:bg-zinc-900/30 hover:border-slate-400 z-0'
                  }`}
                >
                  <div className="absolute -top-3.5 left-6 flex items-center space-x-2">
                    <span
                      style={{ backgroundColor: '#000', color: box.colorHex || '#FACC15' }}
                      className="px-2.5 py-0.5 rounded text-[11px] font-mono font-extrabold uppercase border-2 border-black shadow-[2px_2px_0px_#000]"
                    >
                      {box.title}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-600 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-slate-300 dark:border-zinc-700">
                      {box.tag}
                    </span>
                  </div>

                  {/* Bottom-Right Resize Handle for Stage Box */}
                  <div
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setSelectedStageId(box.id);
                      setDraggingStage({
                        id: box.id,
                        mode: 'resize',
                        startClientX: e.clientX,
                        startClientY: e.clientY,
                        initialX: box.x,
                        initialY: box.y,
                        initialW: box.width,
                        initialH: box.height
                      });
                    }}
                    title="Tarik untuk mengubah ukuran kotak fase"
                    className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded bg-black text-white flex items-center justify-center cursor-nwse-resize text-[9px] font-mono shadow"
                  >
                    ↘
                  </div>
                </div>
              );
            })}

            {/* SVG Layer for Drawn Connections & Live Dragging Line */}
            <svg
              className="absolute inset-0 w-full h-full z-10 pointer-events-none"
              style={{ width: `${STUDIO_CANVAS_WIDTH}px`, height: `${totalCanvasHeight}px` }}
            >
              {connections.map(edge => {
                const sourceNode = nodeMap.get(edge.fromNodeId);
                const targetNode = nodeMap.get(edge.toNodeId);
                if (!sourceNode || !targetNode) return null;

                const fromCoords = getPortCoordinates(sourceNode, edge.fromPort || 'bottom');
                const toCoords = getPortCoordinates(targetNode, edge.toPort || 'top');
                const pathD = buildEdgeSvgPath(
                  fromCoords.x,
                  fromCoords.y,
                  toCoords.x,
                  toCoords.y,
                  edge.fromPort || 'bottom',
                  edge.toPort || 'top',
                  edge.curveType || 'bezier'
                );
                const arrowPoints = buildArrowPolygonPoints(toCoords.x, toCoords.y, edge.toPort || 'top');
                const isSelected = selectedEdgeId === edge.id;
                const strokeColor = edge.color || '#0284C7';
                const midX = (fromCoords.x + toCoords.x) / 2;
                const midY = (fromCoords.y + toCoords.y) / 2;

                return (
                  <g
                    key={edge.id}
                    className="pointer-events-auto cursor-pointer group"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEdgeId(edge.id);
                      setSelectedNodeId(null);
                      setSelectedStageId(null);
                    }}
                  >
                    {/* Wide invisible hit area so clicking lines is effortless */}
                    <path d={pathD} fill="none" stroke="transparent" strokeWidth={18} />

                    {/* Highlight Halo */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isSelected ? '#FACC15' : '#FFFFFF'}
                      className="dark:stroke-[#0B0F19]"
                      strokeWidth={isSelected ? 8 : 6}
                      strokeLinecap="round"
                    />

                    {/* Main Connector Path */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={isSelected ? 3.5 : 2.75}
                      strokeLinecap="round"
                      strokeDasharray={
                        edge.lineStyle === 'dashed'
                          ? '8 6'
                          : edge.lineStyle === 'animated'
                          ? '6 6'
                          : undefined
                      }
                    />

                    {/* Origin Port Dot */}
                    <circle
                      cx={fromCoords.x}
                      cy={fromCoords.y}
                      r={4.5}
                      fill={strokeColor}
                      stroke="#000"
                      strokeWidth={1.5}
                    />

                    {/* Target Arrowhead */}
                    <polygon points={arrowPoints} fill={strokeColor} stroke="#000" strokeWidth={1} />

                    {/* Midpoint Badge or Pulse Dot */}
                    {edge.label ? (
                      <g transform={`translate(${midX}, ${midY})`}>
                        <rect
                          x={-Math.max(34, edge.label.length * 3.8)}
                          y={-11}
                          width={Math.max(68, edge.label.length * 7.6)}
                          height={22}
                          rx={6}
                          fill={isSelected ? '#FACC15' : '#0F172A'}
                          stroke="#000000"
                          strokeWidth={1.5}
                        />
                        <text
                          x={0}
                          y={4}
                          textAnchor="middle"
                          fill={isSelected ? '#000000' : '#FFFFFF'}
                          className="text-[10px] font-mono font-bold select-none"
                        >
                          {edge.label}
                        </text>
                      </g>
                    ) : (
                      <circle
                        cx={midX}
                        cy={midY}
                        r={isSelected ? 5.5 : 4}
                        fill={isSelected ? '#FACC15' : strokeColor}
                        stroke="#000"
                        strokeWidth={1.5}
                      />
                    )}
                  </g>
                );
              })}

              {/* Active Dragging Preview Line */}
              {drawingEdge && nodeMap.has(drawingEdge.fromNodeId) && (() => {
                const src = nodeMap.get(drawingEdge.fromNodeId)!;
                const startPt = getPortCoordinates(src, drawingEdge.fromPort);
                const previewPath = buildEdgeSvgPath(
                  startPt.x,
                  startPt.y,
                  drawingEdge.currentX,
                  drawingEdge.currentY,
                  drawingEdge.fromPort,
                  'top',
                  'bezier'
                );
                return (
                  <g>
                    <path
                      d={previewPath}
                      fill="none"
                      stroke="#FACC15"
                      strokeWidth={3.5}
                      strokeDasharray="6 4"
                      strokeLinecap="round"
                    />
                    <circle cx={drawingEdge.currentX} cy={drawingEdge.currentY} r={6} fill="#FACC15" stroke="#000" strokeWidth={2} />
                  </g>
                );
              })()}
            </svg>

            {/* Draggable Module Cards with 4 Interactive Connection Ports */}
            {nodes.map((node, index) => {
              const isSelected = selectedNodeId === node.id;
              const isConnectSource = connectStartSource?.nodeId === node.id;
              const bgHex = node.customColor || getDefaultThemeHex(node.level);

              const ports: Array<{ pos: PortPosition; className: string; label: string }> = [
                { pos: 'top', className: '-top-2.5 left-1/2 -translate-x-1/2', label: 'Port Atas' },
                { pos: 'bottom', className: '-bottom-2.5 left-1/2 -translate-x-1/2', label: 'Port Bawah' },
                { pos: 'left', className: 'top-1/2 -left-2.5 -translate-y-1/2', label: 'Port Kiri' },
                { pos: 'right', className: 'top-1/2 -right-2.5 -translate-y-1/2', label: 'Port Kanan' }
              ];

              return (
                <div
                  key={node.id}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    if (studioMode === 'connect') {
                      if (!connectStartSource) {
                        setConnectStartSource({ nodeId: node.id, port: 'bottom' });
                      } else if (connectStartSource.nodeId !== node.id) {
                        const srcNode = nodeMap.get(connectStartSource.nodeId);
                        const smart = srcNode ? detectSmartPorts(srcNode, node) : { fromPort: connectStartSource.port, toPort: 'top' as PortPosition };
                        createConnectionBetween(connectStartSource.nodeId, smart.fromPort, node.id, smart.toPort);
                        setConnectStartSource(null);
                      }
                      return;
                    }

                    setSelectedNodeId(node.id);
                    setSelectedEdgeId(null);
                    setSelectedStageId(null);
                    setDraggingNode({
                      id: node.id,
                      startClientX: e.clientX,
                      startClientY: e.clientY,
                      initialPosX: node.posX,
                      initialPosY: node.posY
                    });
                  }}
                  onMouseUp={(e) => {
                    if (drawingEdge && drawingEdge.fromNodeId !== node.id) {
                      e.stopPropagation();
                      const srcNode = nodeMap.get(drawingEdge.fromNodeId);
                      const smart = srcNode ? detectSmartPorts(srcNode, node) : { fromPort: drawingEdge.fromPort, toPort: 'top' as PortPosition };
                      createConnectionBetween(drawingEdge.fromNodeId, drawingEdge.fromPort, node.id, smart.toPort);
                      setDrawingEdge(null);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    left: `${node.posX}px`,
                    top: `${node.posY}px`,
                    width: `${STUDIO_NODE_WIDTH}px`,
                    height: `${STUDIO_NODE_HEIGHT}px`,
                    backgroundColor: bgHex
                  }}
                  className={`group rounded-xl p-3 border-2 border-black transition-shadow flex flex-col justify-between z-20 ${
                    studioMode === 'connect' ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'
                  } ${
                    isSelected || isConnectSource
                      ? 'ring-4 ring-[#FACC15] shadow-[6px_6px_0px_#000] z-30'
                      : 'shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000]'
                  }`}
                >
                  {/* 4 Interactive Connection Anchor Ports (Top, Bottom, Left, Right) */}
                  {ports.map(p => (
                    <div
                      key={p.pos}
                      title={`${p.label} — Drag atau klik untuk menarik garis`}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        if (connectStartSource) {
                          if (connectStartSource.nodeId !== node.id) {
                            createConnectionBetween(connectStartSource.nodeId, connectStartSource.port, node.id, p.pos);
                          }
                          setConnectStartSource(null);
                          return;
                        }
                        const pt = getPortCoordinates(node, p.pos);
                        setDrawingEdge({
                          fromNodeId: node.id,
                          fromPort: p.pos,
                          currentX: pt.x,
                          currentY: pt.y
                        });
                      }}
                      onMouseUp={(e) => {
                        e.stopPropagation();
                        if (drawingEdge && drawingEdge.fromNodeId !== node.id) {
                          createConnectionBetween(drawingEdge.fromNodeId, drawingEdge.fromPort, node.id, p.pos);
                          setDrawingEdge(null);
                        }
                      }}
                      className={`absolute ${p.className} w-4 h-4 rounded-full bg-white hover:bg-[#FACC15] border-2 border-black shadow-xs flex items-center justify-center transition-transform hover:scale-125 cursor-crosshair z-40 ${
                        studioMode === 'connect' || isSelected || drawingEdge
                          ? 'opacity-100 scale-110'
                          : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-black" />
                    </div>
                  ))}

                  {/* Card Header Row */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-black text-white">
                      #{index + 1} {node.customBadge || `Fase ${node.level}`}
                    </span>
                    <span className="text-[9.5px] font-mono font-bold text-zinc-800 bg-black/10 px-1.5 py-0.5 rounded">
                      X:{Math.round(node.posX)} Y:{Math.round(node.posY)}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h4 className="text-xs font-extrabold text-zinc-950 line-clamp-2 leading-snug my-1">
                    {node.title || `Modul #${index + 1}`}
                  </h4>

                  {/* Card Footer */}
                  <div className="pt-1 border-t border-black/15 flex items-center justify-between text-[10px] font-mono text-zinc-800">
                    <span>⏱ {node.duration || '2 jam'}</span>
                    <span className="font-bold flex items-center space-x-0.5">
                      <span>Tarik Port</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Customization Inspector Panel */}
        <div className="w-80 sm:w-96 bg-white dark:bg-[#0D111A] border-l border-slate-200 dark:border-zinc-800 flex flex-col overflow-y-auto p-5 space-y-5 z-20">
          {/* Selected Node Inspector */}
          {selectedNode && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-[#10B981]" />
                  <h3 className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                    Kustomisasi Kartu Modul
                  </h3>
                </div>
                {nodes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setNodes(prev => prev.filter(n => n.id !== selectedNode.id));
                      setConnections(prev =>
                        prev.filter(c => c.fromNodeId !== selectedNode.id && c.toNodeId !== selectedNode.id)
                      );
                      setSelectedNodeId(null);
                    }}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-mono flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                )}
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                    Judul Modul
                  </label>
                  <input
                    type="text"
                    value={selectedNode.title}
                    onChange={e => updateSelectedNode({ title: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white font-semibold outline-none focus:border-black dark:focus:border-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                      Label Badge Kartu
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Wajib / Inti"
                      value={selectedNode.customBadge || ''}
                      onChange={e => updateSelectedNode({ customBadge: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                      Fase / Level (1-5)
                    </label>
                    <select
                      value={selectedNode.level}
                      onChange={e => updateSelectedNode({ level: Number(e.target.value) })}
                      className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white outline-none"
                    >
                      {[1, 2, 3, 4, 5].map(lvl => (
                        <option key={lvl} value={lvl}>
                          Fase {lvl}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quick Lane Alignment */}
                <div>
                  <label className="block font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Perataan Jalur Cepat (Lane Alignment)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => updateSelectedNode({ posX: LANE_LEFT_X })}
                      className="py-1.5 px-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 font-mono text-[11px] font-bold flex items-center justify-center space-x-1"
                    >
                      <AlignLeft className="w-3.5 h-3.5" />
                      <span>Kiri</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateSelectedNode({ posX: LANE_CENTER_X })}
                      className="py-1.5 px-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 font-mono text-[11px] font-bold flex items-center justify-center space-x-1"
                    >
                      <AlignCenter className="w-3.5 h-3.5" />
                      <span>Tengah</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateSelectedNode({ posX: LANE_RIGHT_X })}
                      className="py-1.5 px-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 font-mono text-[11px] font-bold flex items-center justify-center space-x-1"
                    >
                      <AlignRight className="w-3.5 h-3.5" />
                      <span>Kanan</span>
                    </button>
                  </div>
                </div>

                {/* Coordinates X / Y */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-mono text-[11px] text-slate-500 dark:text-zinc-400 mb-1">
                      Posisi Horizontal (X)
                    </label>
                    <input
                      type="number"
                      value={Math.round(selectedNode.posX)}
                      onChange={e => updateSelectedNode({ posX: Number(e.target.value) })}
                      className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-slate-500 dark:text-zinc-400 mb-1">
                      Posisi Vertikal (Y)
                    </label>
                    <input
                      type="number"
                      value={Math.round(selectedNode.posY)}
                      onChange={e => updateSelectedNode({ posY: Number(e.target.value) })}
                      className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Custom Card Color Palette */}
                <div>
                  <label className="block font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Warna Kartu Modul
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {NODE_COLOR_PALETTE.map(c => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => updateSelectedNode({ customColor: c.hex })}
                        className={`px-2.5 py-1.5 rounded-lg border text-left text-[11px] font-mono font-semibold flex items-center space-x-2 transition-all ${
                          (selectedNode.customColor || getDefaultThemeHex(selectedNode.level)) === c.hex
                            ? 'border-black dark:border-white ring-2 ring-amber-400 font-bold'
                            : 'border-slate-200 dark:border-zinc-800'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-xs border border-black flex-shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="truncate text-slate-800 dark:text-zinc-200">{c.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center space-x-2">
                    <input
                      type="color"
                      value={selectedNode.customColor || getDefaultThemeHex(selectedNode.level)}
                      onChange={e => updateSelectedNode({ customColor: e.target.value })}
                      className="w-8 h-7 rounded cursor-pointer border border-slate-300"
                    />
                    <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                      Pilih warna HEX bebas
                    </span>
                  </div>
                </div>

                {/* Quick Connect from this node to another node */}
                <div className="pt-3 border-t border-slate-200 dark:border-zinc-800">
                  <label className="block font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                    🔗 Tarik Garis Cepat dari Modul Ini ke:
                  </label>
                  <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
                    {nodes
                      .filter(n => n.id !== selectedNode.id)
                      .map((target, idx) => {
                        const alreadyConnected = connections.some(
                          c => c.fromNodeId === selectedNode.id && c.toNodeId === target.id
                        );
                        return (
                          <div
                            key={target.id}
                            className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-[11px]"
                          >
                            <span className="truncate pr-2 font-medium text-slate-800 dark:text-zinc-200">
                              #{idx + 1} {target.title}
                            </span>
                            {alreadyConnected ? (
                              <button
                                type="button"
                                onClick={() =>
                                  setConnections(prev =>
                                    prev.filter(
                                      c => !(c.fromNodeId === selectedNode.id && c.toNodeId === target.id)
                                    )
                                  )
                                }
                                className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400 font-mono font-bold text-[10px] flex items-center space-x-1 flex-shrink-0"
                              >
                                <Unlink className="w-2.5 h-2.5" />
                                <span>Putus</span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  const smart = detectSmartPorts(selectedNode, target);
                                  createConnectionBetween(selectedNode.id, smart.fromPort, target.id, smart.toPort);
                                }}
                                className="px-2 py-0.5 rounded bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-[10px] flex items-center space-x-1 flex-shrink-0"
                              >
                                <Link2 className="w-2.5 h-2.5" />
                                <span>Hubungkan</span>
                              </button>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Selected Edge / Connection Inspector */}
          {selectedEdge && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Link2 className="w-4 h-4 text-amber-500" />
                  <h3 className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                    Kustomisasi Garis Konektor
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setConnections(prev => prev.filter(c => c.id !== selectedEdge.id));
                    setSelectedEdgeId(null);
                  }}
                  className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold flex items-center space-x-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus Garis</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 font-mono text-[11px]">
                  <div className="text-slate-500 dark:text-zinc-400">Dari Modul:</div>
                  <div className="font-bold text-slate-900 dark:text-white truncate">
                    {nodeMap.get(selectedEdge.fromNodeId)?.title || selectedEdge.fromNodeId}
                  </div>
                  <div className="text-slate-500 dark:text-zinc-400 mt-1.5">Menuju Modul:</div>
                  <div className="font-bold text-slate-900 dark:text-white truncate">
                    {nodeMap.get(selectedEdge.toNodeId)?.title || selectedEdge.toNodeId}
                  </div>
                </div>

                <div>
                  <label className="block font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                    Label Teks pada Garis (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="Misal: Wajib Lulus, Cabang A, Opsional..."
                    value={selectedEdge.label || ''}
                    onChange={e => updateSelectedEdge({ label: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white outline-none focus:border-black dark:focus:border-white"
                  />
                </div>

                {/* Curve Type */}
                <div>
                  <label className="block font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                    Bentuk Kurva Garis
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(
                      [
                        { id: 'bezier', label: 'Bezier Halus' },
                        { id: 'step', label: 'Siku Step' },
                        { id: 'straight', label: 'Lurus' }
                      ] as Array<{ id: EdgeCurveType; label: string }>
                    ).map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => updateSelectedEdge({ curveType: item.id })}
                        className={`py-1.5 px-2 rounded-lg border font-mono text-[11px] font-bold ${
                          (selectedEdge.curveType || 'bezier') === item.id
                            ? 'bg-black text-white dark:bg-white dark:text-black border-black'
                            : 'bg-slate-50 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border-slate-300 dark:border-zinc-700'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Line Style */}
                <div>
                  <label className="block font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                    Gaya Garis
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(
                      [
                        { id: 'solid', label: 'Solid Tebal' },
                        { id: 'dashed', label: 'Putus-putus' },
                        { id: 'animated', label: 'Titik Rapat' }
                      ] as Array<{ id: EdgeLineStyle; label: string }>
                    ).map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => updateSelectedEdge({ lineStyle: item.id })}
                        className={`py-1.5 px-2 rounded-lg border font-mono text-[11px] font-bold ${
                          (selectedEdge.lineStyle || 'solid') === item.id
                            ? 'bg-black text-white dark:bg-white dark:text-black border-black'
                            : 'bg-slate-50 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border-slate-300 dark:border-zinc-700'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Port Selection */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-mono text-[11px] text-slate-600 dark:text-zinc-400 mb-1">
                      Titik Keluar (Port Asal)
                    </label>
                    <select
                      value={selectedEdge.fromPort || 'bottom'}
                      onChange={e => updateSelectedEdge({ fromPort: e.target.value as PortPosition })}
                      className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-lg px-2 py-1.5 text-xs font-mono"
                    >
                      <option value="top">Atas (Top)</option>
                      <option value="bottom">Bawah (Bottom)</option>
                      <option value="left">Kiri (Left)</option>
                      <option value="right">Kanan (Right)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-slate-600 dark:text-zinc-400 mb-1">
                      Titik Masuk (Port Tujuan)
                    </label>
                    <select
                      value={selectedEdge.toPort || 'top'}
                      onChange={e => updateSelectedEdge({ toPort: e.target.value as PortPosition })}
                      className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-lg px-2 py-1.5 text-xs font-mono"
                    >
                      <option value="top">Atas (Top)</option>
                      <option value="bottom">Bawah (Bottom)</option>
                      <option value="left">Kiri (Left)</option>
                      <option value="right">Kanan (Right)</option>
                    </select>
                  </div>
                </div>

                {/* Edge Color */}
                <div>
                  <label className="block font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Warna Garis Konektor
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {EDGE_COLOR_PALETTE.map(c => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => updateSelectedEdge({ color: c.hex })}
                        className={`px-2.5 py-1.5 rounded-lg border text-left text-[11px] font-mono flex items-center space-x-2 ${
                          selectedEdge.color === c.hex
                            ? 'border-black dark:border-white ring-2 ring-amber-400 font-bold'
                            : 'border-slate-200 dark:border-zinc-800'
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: c.hex }} />
                        <span className="truncate text-slate-800 dark:text-zinc-200">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Selected Stage Box Inspector */}
          {selectedStage && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-3">
                <div className="flex items-center space-x-2">
                  <BoxSelect className="w-4 h-4 text-purple-500" />
                  <h3 className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                    Kustomisasi Kotak Fase
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStageBoxes(prev => prev.filter(b => b.id !== selectedStage.id));
                    setSelectedStageId(null);
                  }}
                  className="p-1.5 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold flex items-center space-x-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                    Judul Header Fase
                  </label>
                  <input
                    type="text"
                    value={selectedStage.title}
                    onChange={e => updateSelectedStage({ title: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                    Tag Label Kanan
                  </label>
                  <input
                    type="text"
                    value={selectedStage.tag}
                    onChange={e => updateSelectedStage({ tag: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-mono text-[11px] text-slate-500 mb-1">Lebar (Width)</label>
                    <input
                      type="number"
                      value={Math.round(selectedStage.width)}
                      onChange={e => updateSelectedStage({ width: Number(e.target.value) })}
                      className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-slate-500 mb-1">Tinggi (Height)</label>
                    <input
                      type="number"
                      value={Math.round(selectedStage.height)}
                      onChange={e => updateSelectedStage({ height: Number(e.target.value) })}
                      className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Overview List when nothing specific selected or as quick directory */}
          <div className="pt-3 border-t border-slate-200 dark:border-zinc-800 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-500 dark:text-zinc-400 uppercase">
              <span>Daftar Garis Aktif ({connections.length})</span>
              <span>Klik untuk Edit</span>
            </div>

            {connections.length === 0 ? (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-dashed border-slate-300 dark:border-zinc-800 text-[11px] text-slate-500 dark:text-zinc-400 text-center">
                Belum ada garis konektor. Tarik dari titik port modul atau klik &ldquo;🔗 Hubungkan Berurutan&rdquo;.
              </div>
            ) : (
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {connections.map(conn => {
                  const src = nodeMap.get(conn.fromNodeId);
                  const dst = nodeMap.get(conn.toNodeId);
                  const isActive = selectedEdgeId === conn.id;
                  return (
                    <div
                      key={conn.id}
                      onClick={() => {
                        setSelectedEdgeId(conn.id);
                        setSelectedNodeId(null);
                        setSelectedStageId(null);
                      }}
                      className={`p-2 rounded-lg border text-[11px] font-mono cursor-pointer flex items-center justify-between transition-all ${
                        isActive
                          ? 'bg-amber-500/15 border-amber-500 text-slate-900 dark:text-white font-bold'
                          : 'bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:border-slate-400'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span>{src?.title?.slice(0, 14) || conn.fromNodeId}</span>
                        <span className="mx-1 text-amber-500">→</span>
                        <span>{dst?.title?.slice(0, 14) || conn.toNodeId}</span>
                        {conn.label && (
                          <span className="ml-1.5 px-1.5 py-0.2 rounded bg-black text-[#FACC15] text-[9px]">
                            {conn.label}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConnections(prev => prev.filter(c => c.id !== conn.id));
                          if (selectedEdgeId === conn.id) setSelectedEdgeId(null);
                        }}
                        className="text-rose-500 hover:text-rose-700 p-0.5"
                        title="Hapus garis ini"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
