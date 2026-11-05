import React, { useState, useEffect } from 'react';
import { 
  CustomCandle, 
  FibonacciDrawing, 
  BoxDrawing, 
  PositionDrawing, 
  TrendlineDrawing, 
  PolylineDrawing, 
  ArrowDrawing,
  InfoCardDrawing,
  TextBadgeAnnotation, 
  ChartLegendItem,
  CustomChartConfig, 
  CandleTemplatePreset 
} from '../../types/chartBuilderTypes';
import { CandleTemplateTray } from './CandleTemplateTray';
import { ChartCanvas, ChartObjectType, ActiveChartTool } from './ChartCanvas';
import { 
  X, 
  Sparkles, 
  MousePointer, 
  Sliders, 
  Box, 
  TrendingUp, 
  TrendingDown, 
  Tag, 
  Trash2, 
  Check, 
  Copy, 
  CheckCircle2,
  Sun,
  Moon,
  RotateCcw,
  Activity,
  FileText,
  CornerDownRight,
  Plus
} from 'lucide-react';

interface CustomChartBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: CustomChartConfig) => void;
  initialConfig?: CustomChartConfig;
}

const SWATCH_COLORS = [
  '#10B981', // Emerald Bull
  '#EF4444', // Rose Bear
  '#38BDF8', // Sky Blue
  '#FACC15', // Amber Gold
  '#A855F7', // Purple OTE
  '#F97316', // Orange
  '#EC4899', // Pink
  '#FFFFFF', // White
  '#0F172A'  // Slate Dark
];

export const CustomChartBuilderModal: React.FC<CustomChartBuilderModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialConfig
}) => {
  if (!isOpen) return null;

  // Theme Detection: sinkron dengan HTML dark class
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (initialConfig?.isDarkMode !== undefined) return initialConfig.isDarkMode;
    return typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  });

  // Candle Spacing / Zoom: Rapat, Normal, Lebar
  const [candleSpacing, setCandleSpacing] = useState<'compact' | 'normal' | 'wide'>(
    initialConfig?.candleSpacing || 'normal'
  );

  // Header Title & Subtitle Tag
  const [chartTitle, setChartTitle] = useState<string>(
    initialConfig?.title || 'Setup Chart & Skematik Analisis Teknikal'
  );
  const [chartSubtitle, setChartSubtitle] = useState<string>(
    initialConfig?.subtitle || 'Macro Bias (HTF) ➔ Structure (MTF) ➔ Execution (LTF)'
  );

  // Chart Elements State
  const [candles, setCandles] = useState<CustomCandle[]>(initialConfig?.candles || [
    { id: 'c-1', index: 0, open: 100, high: 115, low: 95, close: 110, volume: 1200, label: 'C1' },
    { id: 'c-2', index: 1, open: 110, high: 145, low: 108, close: 142, volume: 3100, label: 'Expansion' },
    { id: 'c-3', index: 2, open: 142, high: 146, low: 125, close: 128, volume: 1400, label: 'Pullback' },
    { id: 'c-4', index: 3, open: 128, high: 160, low: 126, close: 158, volume: 3600, label: 'BOS' },
  ]);

  const [fibonaccis, setFibonaccis] = useState<FibonacciDrawing[]>(initialConfig?.fibonaccis || []);
  const [boxes, setBoxes] = useState<BoxDrawing[]>(initialConfig?.boxes || []);
  const [positions, setPositions] = useState<PositionDrawing[]>(initialConfig?.positions || []);
  const [trendlines, setTrendlines] = useState<TrendlineDrawing[]>(initialConfig?.trendlines || []);
  const [polylines, setPolylines] = useState<PolylineDrawing[]>(initialConfig?.polylines || []);
  const [arrows, setArrows] = useState<ArrowDrawing[]>(initialConfig?.arrows || []);
  const [infoCards, setInfoCards] = useState<InfoCardDrawing[]>(initialConfig?.infoCards || []);
  const [badges, setBadges] = useState<TextBadgeAnnotation[]>(initialConfig?.badges || []);
  const [legends, setLegends] = useState<ChartLegendItem[]>(initialConfig?.legends || []);

  // Display Overlays State
  const [showCandles, setShowCandles] = useState<boolean>(initialConfig?.showCandles !== false);
  const [showVolume, setShowVolume] = useState<boolean>(initialConfig?.showVolume !== false);
  const [showEma, setShowEma] = useState<boolean>(initialConfig?.showEma !== false);
  const [emaPeriod, setEmaPeriod] = useState<number>(initialConfig?.emaPeriod || 9);

  // Active Tool & Selection State
  const [activeTool, setActiveTool] = useState<ActiveChartTool>('select');
  const [selectedItem, setSelectedItem] = useState<{ id: string; type: ChartObjectType } | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Keyboard Shortcuts (Delete, Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveTool('select');
        setSelectedItem(null);
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        const target = e.target as HTMLElement;
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) return;
        if (selectedItem) {
          handleDeleteSelected();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  // Add Blank Candle
  const handleAddBlankCandle = (isBullish: boolean) => {
    setShowCandles(true);
    const lastCandle = candles[candles.length - 1];
    const prevClose = lastCandle ? lastCandle.close : 100;
    const height = 25;
    const newCandle: CustomCandle = {
      id: `c-${Date.now()}`,
      index: candles.length,
      open: prevClose,
      close: isBullish ? prevClose + height : Math.max(20, prevClose - height),
      high: isBullish ? prevClose + height + 10 : prevClose + 8,
      low: isBullish ? prevClose - 8 : Math.max(10, prevClose - height - 10),
      volume: Math.floor(Math.random() * 2000) + 1000,
      label: `C${candles.length + 1}`
    };
    setCandles(prev => [...prev, newCandle]);
    setSelectedItem({ id: newCandle.id, type: 'candle' });
  };

  // Quick Add Wave (Zigzag or Smooth Macro Curve)
  const handleQuickAddWave = (curveType: 'zigzag' | 'smooth') => {
    const maxIdx = Math.max(8, candles.length - 1);
    const newPoly: PolylineDrawing = {
      id: `poly-${Date.now()}`,
      label: curveType === 'smooth' ? 'Daily Macro Wave (HTF Bias)' : 'MTF Structure Wave (H1)',
      color: curveType === 'smooth' ? '#FACC15' : '#38BDF8',
      strokeWidth: curveType === 'smooth' ? 3.5 : 2.5,
      lineStyle: curveType === 'smooth' ? 'dashed' : 'solid',
      curveType,
      showDots: curveType === 'zigzag',
      points: curveType === 'smooth'
        ? [
            { index: 0, price: 95 },
            { index: Math.round(maxIdx * 0.3), price: 155 },
            { index: Math.round(maxIdx * 0.65), price: 98 },
            { index: maxIdx, price: 160 }
          ]
        : [
            { index: 0, price: 95 },
            { index: 1, price: 130 },
            { index: 2, price: 112 },
            { index: 4, price: 155 },
            { index: 5, price: 128 },
            { index: 7, price: 168 }
          ]
    };
    setPolylines(prev => [...prev, newPoly]);
    setSelectedItem({ id: newPoly.id, type: 'polyline' });
  };

  // Quick Add Info Card
  const handleQuickAddInfoCard = () => {
    const newCard: InfoCardDrawing = {
      id: `card-${Date.now()}`,
      candleIndex: Math.min(2, Math.max(0, candles.length - 1)),
      price: 135,
      width: 155,
      stepBadge: '1',
      title: 'STRONG LOW (HL)',
      lines: ['Dilindungi Institusi', 'Tempat Aman Stop Loss'],
      footerBadge: '✓ Protected Zone',
      color: '#10B981',
      bgOpacity: 0.15
    };
    setInfoCards(prev => [...prev, newCard]);
    setSelectedItem({ id: newCard.id, type: 'infocard' });
  };

  // Quick Add Curved Arrow
  const handleQuickAddArrow = () => {
    const newArr: ArrowDrawing = {
      id: `arr-${Date.now()}`,
      startIndex: 1,
      startPrice: 145,
      endIndex: Math.min(5, Math.max(3, candles.length - 1)),
      endPrice: 115,
      color: '#FACC15',
      strokeWidth: 2.2,
      curved: true,
      curveOffset: 25,
      label: 'Pullback Retest'
    };
    setArrows(prev => [...prev, newArr]);
    setSelectedItem({ id: newArr.id, type: 'arrow' });
  };

  // Add Preset or Load Full Blueprint
  const handleAddPreset = (preset: CandleTemplatePreset, replaceAll: boolean = false) => {
    const baseIndex = replaceAll ? 0 : candles.length;
    const lastCandle = candles[candles.length - 1];
    const basePrice = replaceAll ? 100 : (lastCandle ? lastCandle.close : 100);
    const firstPresetOpen = preset.candles[0]?.open || 100;
    const offset = replaceAll ? 0 : (basePrice - firstPresetOpen);

    if (replaceAll) {
      if (preset.title) setChartTitle(preset.title);
      if (preset.subtitle) setChartSubtitle(preset.subtitle);
      setShowCandles(preset.showCandles !== false);
      if (preset.showVolume !== undefined) setShowVolume(preset.showVolume);
      if (preset.showEma !== undefined) setShowEma(preset.showEma);
      setFibonaccis([]);
      setPositions([]);
      setTrendlines([]);
    }

    const newCandles: CustomCandle[] = preset.candles.map((c, idx) => ({
      id: `c-${Date.now()}-${idx}`,
      index: baseIndex + idx,
      open: Math.round(c.open + offset),
      high: Math.round(c.high + offset),
      low: Math.round(c.low + offset),
      close: Math.round(c.close + offset),
      volume: c.volume || 1500,
      label: c.label || `${preset.name.slice(0, 3)} ${idx + 1}`
    }));

    setCandles(prev => replaceAll ? newCandles : [...prev, ...newCandles]);

    // Boxes
    if (preset.suggestedBoxes) {
      const newBoxes: BoxDrawing[] = preset.suggestedBoxes.map((b, idx) => ({
        id: `box-sug-${Date.now()}-${idx}`,
        startIndex: baseIndex + b.startIndex,
        endIndex: baseIndex + b.endIndex,
        topPrice: Math.round(b.topPrice + offset),
        bottomPrice: Math.round(b.bottomPrice + offset),
        label: b.label,
        color: b.color,
        textColor: b.color,
        borderColor: b.color,
        borderStyle: b.borderStyle || 'dashed',
        opacity: 0.14,
        showMidLine: b.showMidLine
      }));
      setBoxes(prev => replaceAll ? newBoxes : [...prev, ...newBoxes]);
    } else if (replaceAll) {
      setBoxes([]);
    }

    // Badges
    if (preset.suggestedBadges) {
      const newBadges: TextBadgeAnnotation[] = preset.suggestedBadges.map((badge, idx) => ({
        id: `badge-sug-${Date.now()}-${idx}`,
        candleIndex: baseIndex + badge.candleIndex,
        price: Math.round(badge.price + offset),
        text: badge.text,
        color: badge.color || '#10B981',
        bgColor: badge.color || '#10B981',
        textColor: badge.textColor || '#000000',
        borderColor: '#000000',
        borderWidth: 1,
        fontSize: 9.5,
        style: badge.style || 'badge'
      }));
      setBadges(prev => replaceAll ? newBadges : [...prev, ...newBadges]);
    } else if (replaceAll) {
      setBadges([]);
    }

    // Polylines / Waves
    if (preset.suggestedPolylines) {
      const newPolys: PolylineDrawing[] = preset.suggestedPolylines.map((poly, idx) => ({
        id: `poly-sug-${Date.now()}-${idx}`,
        color: poly.color,
        strokeWidth: poly.strokeWidth || 2.5,
        lineStyle: poly.lineStyle || 'solid',
        curveType: poly.curveType || 'zigzag',
        showDots: poly.showDots,
        label: poly.label,
        points: poly.points.map(pt => ({
          index: baseIndex + pt.index,
          price: Math.round(pt.price + offset)
        }))
      }));
      setPolylines(prev => replaceAll ? newPolys : [...prev, ...newPolys]);
    } else if (replaceAll) {
      setPolylines([]);
    }

    // Info Cards
    if (preset.suggestedInfoCards) {
      const newCards: InfoCardDrawing[] = preset.suggestedInfoCards.map((c, idx) => ({
        id: `card-sug-${Date.now()}-${idx}`,
        candleIndex: baseIndex + c.candleIndex,
        price: Math.round(c.price + offset),
        width: c.width || 155,
        stepBadge: c.stepBadge,
        title: c.title,
        lines: c.lines,
        footerBadge: c.footerBadge,
        color: c.color,
        bgOpacity: 0.14
      }));
      setInfoCards(prev => replaceAll ? newCards : [...prev, ...newCards]);
    } else if (replaceAll) {
      setInfoCards([]);
    }

    // Arrows
    if (preset.suggestedArrows) {
      const newArrows: ArrowDrawing[] = preset.suggestedArrows.map((a, idx) => ({
        id: `arr-sug-${Date.now()}-${idx}`,
        startIndex: baseIndex + a.startIndex,
        startPrice: Math.round(a.startPrice + offset),
        endIndex: baseIndex + a.endIndex,
        endPrice: Math.round(a.endPrice + offset),
        color: a.color,
        curved: a.curved !== false,
        curveOffset: a.curveOffset ?? 25,
        label: a.label
      }));
      setArrows(prev => replaceAll ? newArrows : [...prev, ...newArrows]);
    } else if (replaceAll) {
      setArrows([]);
    }

    // Legends
    if (preset.suggestedLegends) {
      const newLegends: ChartLegendItem[] = preset.suggestedLegends.map((l, idx) => ({
        id: `leg-sug-${Date.now()}-${idx}`,
        label: l.label,
        color: l.color
      }));
      setLegends(prev => replaceAll ? newLegends : [...prev, ...newLegends]);
    } else if (replaceAll) {
      setLegends([]);
    }
  };

  // Handle Add Annotation from Canvas
  const handleAddAnnotation = (type: string, payload: any) => {
    const id = `anno-${Date.now()}`;
    if (type === 'fibonacci') {
      const newFib: FibonacciDrawing = { id, ...payload };
      setFibonaccis(prev => [...prev, newFib]);
      setSelectedItem({ id, type: 'fib' });
    } else if (type === 'box') {
      const newBox: BoxDrawing = { id, ...payload };
      setBoxes(prev => [...prev, newBox]);
      setSelectedItem({ id, type: 'box' });
    } else if (type === 'position') {
      const newPos: PositionDrawing = { id, ...payload };
      setPositions(prev => [...prev, newPos]);
      setSelectedItem({ id, type: 'position' });
    } else if (type === 'trendline') {
      const newTrend: TrendlineDrawing = { id, ...payload };
      setTrendlines(prev => [...prev, newTrend]);
      setSelectedItem({ id, type: 'trendline' });
    } else if (type === 'polyline') {
      const newPoly: PolylineDrawing = { id, ...payload };
      setPolylines(prev => [...prev, newPoly]);
      setSelectedItem({ id, type: 'polyline' });
    } else if (type === 'arrow') {
      const newArr: ArrowDrawing = { id, ...payload };
      setArrows(prev => [...prev, newArr]);
      setSelectedItem({ id, type: 'arrow' });
    } else if (type === 'infocard') {
      const newCard: InfoCardDrawing = { id, ...payload };
      setInfoCards(prev => [...prev, newCard]);
      setSelectedItem({ id, type: 'infocard' });
    } else if (type === 'badge') {
      const newBadge: TextBadgeAnnotation = { id, ...payload };
      setBadges(prev => [...prev, newBadge]);
      setSelectedItem({ id, type: 'badge' });
    }
    setActiveTool('select');
  };

  // Delete Currently Selected Item
  const handleDeleteSelected = () => {
    if (!selectedItem) return;
    const { id, type } = selectedItem;
    if (type === 'candle') {
      setCandles(prev => {
        const filtered = prev.filter(c => c.id !== id);
        return filtered.map((c, idx) => ({ ...c, index: idx }));
      });
    } else if (type === 'fib') {
      setFibonaccis(prev => prev.filter(f => f.id !== id));
    } else if (type === 'box') {
      setBoxes(prev => prev.filter(b => b.id !== id));
    } else if (type === 'position') {
      setPositions(prev => prev.filter(p => p.id !== id));
    } else if (type === 'trendline') {
      setTrendlines(prev => prev.filter(t => t.id !== id));
    } else if (type === 'polyline') {
      setPolylines(prev => prev.filter(p => p.id !== id));
    } else if (type === 'arrow') {
      setArrows(prev => prev.filter(a => a.id !== id));
    } else if (type === 'infocard') {
      setInfoCards(prev => prev.filter(c => c.id !== id));
    } else if (type === 'badge') {
      setBadges(prev => prev.filter(b => b.id !== id));
    }
    setSelectedItem(null);
  };

  // Save Final Config
  const handleSaveConfig = () => {
    const finalConfig: CustomChartConfig = {
      candles,
      fibonaccis,
      boxes,
      positions,
      trendlines,
      polylines,
      arrows,
      infoCards,
      badges,
      legends,
      showCandles,
      showVolume,
      showEma,
      emaPeriod,
      candleSpacing,
      isDarkMode,
      title: chartTitle,
      subtitle: chartSubtitle,
      timeframe: '15m'
    };
    onSave(finalConfig);
    onClose();
  };

  // Copy JSON Template
  const handleCopyJson = () => {
    const jsonStr = JSON.stringify({
      title: chartTitle,
      subtitle: chartSubtitle,
      candles,
      polylines,
      infoCards,
      arrows,
      fibonaccis,
      boxes,
      positions,
      trendlines,
      badges,
      legends,
      showCandles,
      candleSpacing,
      isDarkMode
    }, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  // Active Selected Item References
  const activeCandle = selectedItem?.type === 'candle' ? candles.find(c => c.id === selectedItem.id) : null;
  const activeBox = selectedItem?.type === 'box' ? boxes.find(b => b.id === selectedItem.id) : null;
  const activePosition = selectedItem?.type === 'position' ? positions.find(p => p.id === selectedItem.id) : null;
  const activeBadge = selectedItem?.type === 'badge' ? badges.find(b => b.id === selectedItem.id) : null;
  const activeTrendline = selectedItem?.type === 'trendline' ? trendlines.find(t => t.id === selectedItem.id) : null;
  const activePolyline = selectedItem?.type === 'polyline' ? polylines.find(p => p.id === selectedItem.id) : null;
  const activeArrow = selectedItem?.type === 'arrow' ? arrows.find(a => a.id === selectedItem.id) : null;
  const activeInfoCard = selectedItem?.type === 'infocard' ? infoCards.find(c => c.id === selectedItem.id) : null;
  const activeFib = selectedItem?.type === 'fib' ? fibonaccis.find(f => f.id === selectedItem.id) : null;

  const inputClass = `w-full rounded-lg px-2.5 py-1.5 outline-none border text-xs font-mono transition-colors focus:border-emerald-500 ${
    isDarkMode ? 'bg-[#050811] border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
  }`;

  // Reusable Color Picker Field
  const renderColorControl = (
    label: string,
    currentValue: string,
    onChange: (hex: string) => void,
    onReset?: () => void
  ) => (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[11px] text-slate-500 dark:text-slate-400">{label}</label>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-[10px] text-sky-500 hover:underline flex items-center space-x-0.5"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Reset</span>
          </button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="color"
          value={currentValue.startsWith('#') && currentValue.length === 7 ? currentValue : '#10B981'}
          onChange={(e) => onChange(e.target.value)}
          className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent p-0 flex-shrink-0"
        />
        <div className="flex flex-wrap gap-1">
          {SWATCH_COLORS.map((hex) => (
            <button
              key={hex}
              type="button"
              onClick={() => onChange(hex)}
              style={{ backgroundColor: hex }}
              className={`w-4 h-4 rounded-full border transition-transform hover:scale-110 ${
                currentValue.toLowerCase() === hex.toLowerCase()
                  ? 'ring-2 ring-emerald-500 border-white scale-110'
                  : 'border-black/30'
              }`}
              title={hex}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen flex flex-col overflow-hidden animate-in fade-in duration-150">
      <div className={`w-full h-full flex flex-col overflow-hidden transition-colors ${
        isDarkMode 
          ? 'bg-[#090D16] text-white' 
          : 'bg-white text-slate-900'
      }`}>
        
        {/* Studio Full-Screen Header */}
        <div className={`border-b px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 select-none flex-shrink-0 ${
          isDarkMode ? 'bg-[#050811] border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight flex items-center space-x-2">
                <span>Interactive Chart &amp; Schematic Studio</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500 text-black font-extrabold uppercase">
                  Full-Screen Pro Engine
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Rancang ilustrasi sekelas BTC.D &amp; Altseason Index: Multi-Wave Curve, Kartu Fase, Panah Lengkung, FVG/OB, &amp; Candlestick.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? 'Beralih ke Mode Terang (Light Mode)' : 'Beralih ke Mode Gelap (Dark Mode)'}
              className={`p-2 rounded-xl border text-xs font-mono flex items-center space-x-1.5 transition-colors ${
                isDarkMode 
                  ? 'bg-slate-800 text-amber-400 border-slate-700 hover:bg-slate-700' 
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 shadow-2xs'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="text-[11px] font-bold">{isDarkMode ? 'Terang' : 'Gelap'}</span>
            </button>

            {/* Candle Spacing Selector */}
            <div className={`flex items-center space-x-1 p-1 rounded-xl border text-[11px] font-mono ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}>
              <span className="px-1 text-[10px] font-bold">Jarak:</span>
              {(['compact', 'normal', 'wide'] as const).map(sp => (
                <button
                  key={sp}
                  type="button"
                  onClick={() => setCandleSpacing(sp)}
                  className={`px-2 py-0.5 rounded-lg capitalize font-bold transition-all ${
                    candleSpacing === sp
                      ? 'bg-emerald-500 text-black shadow-2xs'
                      : 'hover:text-black dark:hover:text-white'
                  }`}
                >
                  {sp === 'compact' ? 'Rapat' : sp === 'normal' ? 'Standar' : 'Lebar'}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleCopyJson}
              title="Salin JSON Konfigurasi"
              className={`px-3 py-2 rounded-xl font-mono text-xs font-semibold flex items-center space-x-1.5 transition-colors border ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-2xs'
              }`}
            >
              {copyFeedback ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copyFeedback ? 'Tersalin!' : 'Copy JSON'}</span>
            </button>

            <button
              type="button"
              onClick={handleSaveConfig}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs font-mono rounded-xl flex items-center space-x-1.5 shadow-sm transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Simpan ke Modul</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors border ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' 
                  : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-300'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Full-Screen 3-Column Studio Workspace */}
        <div className={`flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x overflow-hidden ${
          isDarkMode ? 'divide-slate-800' : 'divide-slate-200'
        }`}>
          
          {/* Left Panel: Tools, Layers & Blueprint Templates (3 Cols) */}
          <div className={`lg:col-span-3 p-4 space-y-4 overflow-y-auto h-full ${
            isDarkMode ? 'bg-[#0A0E18]' : 'bg-slate-50'
          }`}>
            {/* Tool Selection Palette */}
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center space-x-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Peralatan Gambar &amp; Skematik:</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                {[
                  { id: 'select', label: 'Pilih & Geser', icon: MousePointer },
                  { id: 'polyline', label: 'Gambar Wave', icon: Activity },
                  { id: 'infocard', label: 'Kartu Info', icon: FileText },
                  { id: 'arrow', label: 'Panah Lengkung', icon: CornerDownRight },
                  { id: 'box', label: 'Kotak OB / Zoom', icon: Box },
                  { id: 'badge', label: 'Badge / Callout', icon: Tag },
                  { id: 'fibonacci', label: 'Fibonacci OTE', icon: TrendingUp },
                  { id: 'trendline', label: 'Trendline Ray', icon: Sliders },
                  { id: 'position-long', label: 'Long Pos (R:R)', icon: TrendingUp },
                  { id: 'position-short', label: 'Short Pos (R:R)', icon: TrendingDown }
                ].map((tool) => {
                  const Icon = tool.icon;
                  const isActive = activeTool === tool.id;
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => setActiveTool(tool.id as ActiveChartTool)}
                      className={`p-2 rounded-xl flex items-center space-x-2 transition-all border ${
                        isActive
                          ? 'bg-emerald-500 text-black font-extrabold border-emerald-400 shadow-2xs'
                          : isDarkMode
                          ? 'bg-[#121724] text-slate-300 border-slate-800 hover:border-slate-700'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 shadow-2xs'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{tool.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Layer Visibility Toggles */}
            <div className={`p-3 rounded-xl border space-y-2 ${
              isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <span className="text-[11px] font-mono font-bold block text-slate-700 dark:text-slate-300">
                Layer &amp; Indikator Aktif:
              </span>
              <div className="grid grid-cols-3 gap-1.5 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showCandles}
                    onChange={(e) => setShowCandles(e.target.checked)}
                    className="accent-emerald-500 rounded"
                  />
                  <span>Candles</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showVolume}
                    onChange={(e) => setShowVolume(e.target.checked)}
                    className="accent-emerald-500 rounded"
                  />
                  <span>Volume</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showEma}
                    onChange={(e) => setShowEma(e.target.checked)}
                    className="accent-[#0284C7] rounded"
                  />
                  <span>EMA ({emaPeriod})</span>
                </label>
              </div>
            </div>

            {/* Candle & Blueprint Templates Tray */}
            <CandleTemplateTray
              onAddPreset={handleAddPreset}
              onAddBlankCandle={handleAddBlankCandle}
              onQuickAddWave={handleQuickAddWave}
              onQuickAddInfoCard={handleQuickAddInfoCard}
              onQuickAddArrow={handleQuickAddArrow}
            />
          </div>

          {/* Center Panel: Interactive Canvas & Header/Legend Bar (6 Cols) */}
          <div className="lg:col-span-6 p-4 sm:p-5 flex flex-col justify-between space-y-3 overflow-y-auto h-full">
            {/* Editable Illustration Header Banner (Like BTC.D & Altseason Index Header) */}
            <div className={`p-3 rounded-xl border space-y-2 ${
              isDarkMode ? 'bg-[#0B1120] border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-0.5">
                    Judul Ilustrasi Kiri Atas:
                  </label>
                  <input
                    type="text"
                    value={chartTitle}
                    onChange={(e) => setChartTitle(e.target.value)}
                    placeholder="Contoh: Fraktalitas Multi-Timeframe / BTC.D Rotation"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-0.5">
                    Badge Alur Kanan Atas:
                  </label>
                  <input
                    type="text"
                    value={chartSubtitle}
                    onChange={(e) => setChartSubtitle(e.target.value)}
                    placeholder="Contoh: Macro Bias (Daily) ➔ Structure (H1) ➔ Execution"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/60 text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-bold text-emerald-500 uppercase">{ chartTitle }</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  {selectedItem && (
                    <button
                      type="button"
                      onClick={handleDeleteSelected}
                      className="px-2.5 py-1 bg-rose-500/15 hover:bg-rose-500/25 text-rose-500 border border-rose-500/30 rounded-lg text-[11px] font-mono flex items-center space-x-1 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Hapus Elemen</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setCandles([]);
                      setFibonaccis([]);
                      setBoxes([]);
                      setPositions([]);
                      setTrendlines([]);
                      setPolylines([]);
                      setArrows([]);
                      setInfoCards([]);
                      setBadges([]);
                      setLegends([]);
                      setSelectedItem(null);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors border ${
                      isDarkMode 
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' 
                        : 'bg-white hover:bg-slate-200 text-slate-700 border-slate-300 shadow-2xs'
                    }`}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* The SVG Canvas Component */}
            <div className="w-full flex-1 flex flex-col justify-center">
              <ChartCanvas
                candles={candles}
                fibonaccis={fibonaccis}
                boxes={boxes}
                positions={positions}
                trendlines={trendlines}
                polylines={polylines}
                arrows={arrows}
                infoCards={infoCards}
                badges={badges}
                legends={legends}
                showCandles={showCandles}
                showVolume={showVolume}
                showEma={showEma}
                emaPeriod={emaPeriod}
                isDarkMode={isDarkMode}
                candleSpacing={candleSpacing}
                selectedId={selectedItem?.id || null}
                onSelectId={(id, type) => setSelectedItem(id ? { id, type } : null)}
                onUpdateCandle={(updated) => {
                  setCandles(prev => prev.map(c => c.id === updated.id ? updated : c));
                }}
                onUpdateBadge={(updated) => {
                  setBadges(prev => prev.map(b => b.id === updated.id ? updated : b));
                }}
                onUpdateInfoCard={(updated) => {
                  setInfoCards(prev => prev.map(c => c.id === updated.id ? updated : c));
                }}
                onUpdatePolyline={(updated) => {
                  setPolylines(prev => prev.map(p => p.id === updated.id ? updated : p));
                }}
                activeTool={activeTool}
                onAddAnnotation={handleAddAnnotation}
              />
            </div>

            {/* Legend Manager & Shortcuts Bar */}
            <div className={`p-3 border rounded-xl text-[11px] font-mono space-y-2 ${
              isDarkMode ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Legend Bawah Chart ({legends.length} Item):
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setLegends(prev => [
                      ...prev,
                      { id: `leg-${Date.now()}`, label: 'Indikator / Siklus Baru', color: '#38BDF8' }
                    ]);
                  }}
                  className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-500 font-bold flex items-center space-x-1 hover:bg-emerald-500/30"
                >
                  <Plus className="w-3 h-3" />
                  <span>Tambah Legend</span>
                </button>
              </div>
              {legends.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {legends.map((leg) => (
                    <div
                      key={leg.id}
                      className={`flex items-center space-x-1.5 px-2 py-1 rounded-lg border ${
                        isDarkMode ? 'bg-[#050811] border-slate-700' : 'bg-white border-slate-300'
                      }`}
                    >
                      <input
                        type="color"
                        value={leg.color}
                        onChange={(e) => {
                          const col = e.target.value;
                          setLegends(prev => prev.map(l => l.id === leg.id ? { ...l, color: col } : l));
                        }}
                        className="w-4 h-4 rounded cursor-pointer border-0 bg-transparent p-0"
                      />
                      <input
                        type="text"
                        value={leg.label}
                        onChange={(e) => {
                          const val = e.target.value;
                          setLegends(prev => prev.map(l => l.id === leg.id ? { ...l, label: val } : l));
                        }}
                        className="bg-transparent outline-none text-[10px] w-36 font-mono text-slate-800 dark:text-slate-200"
                      />
                      <button
                        type="button"
                        onClick={() => setLegends(prev => prev.filter(l => l.id !== leg.id))}
                        className="text-rose-500 hover:text-rose-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Full Properties Inspector (3 Cols) */}
          <div className={`lg:col-span-3 p-4 space-y-4 overflow-y-auto h-full ${
            isDarkMode ? 'bg-[#0A0E18]' : 'bg-slate-50'
          }`}>
            <div className={`text-[11px] font-mono font-bold uppercase tracking-wider flex items-center justify-between pb-2 border-b ${
              isDarkMode ? 'text-slate-400 border-slate-800' : 'text-slate-600 border-slate-200'
            }`}>
              <div className="flex items-center space-x-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-500" />
                <span>Kustomisasi Elemen:</span>
              </div>
              {selectedItem && (
                <button
                  type="button"
                  onClick={handleDeleteSelected}
                  className="text-[10px] text-rose-500 hover:underline flex items-center space-x-0.5"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Hapus</span>
                </button>
              )}
            </div>

            {/* 1. ACTIVE WAVE / POLYLINE INSPECTOR */}
            {activePolyline ? (
              <div className="space-y-3.5 text-xs font-mono">
                <div className={`p-2.5 border rounded-xl ${
                  isDarkMode ? 'bg-[#121724] border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
                }`}>
                  <div className="text-slate-500 text-[10px] uppercase mb-0.5">Elemen Terpilih:</div>
                  <div className="font-bold text-sm text-sky-400">Wave / Multi-Point Curve</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Geser titik bulat di kanvas untuk mengubah bentuk gelombang.</div>
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1">Label Gelombang / Siklus:</label>
                  <input
                    type="text"
                    value={activePolyline.label || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPolylines(prev => prev.map(p => p.id === activePolyline.id ? { ...p, label: val } : p));
                    }}
                    placeholder="Contoh: Daily Macro Wave (HTF Bias)..."
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1">Tipe Gelombang:</label>
                    <select
                      value={activePolyline.curveType || 'zigzag'}
                      onChange={(e) => {
                        const val = e.target.value as 'zigzag' | 'smooth';
                        setPolylines(prev => prev.map(p => p.id === activePolyline.id ? { ...p, curveType: val } : p));
                      }}
                      className={inputClass}
                    >
                      <option value="zigzag">Zigzag Struktur (Tajam)</option>
                      <option value="smooth">Kurva Siklus (Smooth)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1">Gaya Garis:</label>
                    <select
                      value={activePolyline.lineStyle || 'solid'}
                      onChange={(e) => {
                        const val = e.target.value as any;
                        setPolylines(prev => prev.map(p => p.id === activePolyline.id ? { ...p, lineStyle: val } : p));
                      }}
                      className={inputClass}
                    >
                      <option value="solid">Utuh (Solid)</option>
                      <option value="dashed">Putus-putus (Dashed)</option>
                      <option value="dotted">Titik-titik (Dotted)</option>
                    </select>
                  </div>
                </div>

                {renderColorControl(
                  'Warna Garis Gelombang:',
                  activePolyline.color || '#38BDF8',
                  (color) => setPolylines(prev => prev.map(p => p.id === activePolyline.id ? { ...p, color } : p))
                )}

                {renderColorControl(
                  'Warna Teks Label:',
                  activePolyline.textColor || activePolyline.color || '#38BDF8',
                  (textColor) => setPolylines(prev => prev.map(p => p.id === activePolyline.id ? { ...p, textColor } : p))
                )}

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1">Ketebalan Garis ({activePolyline.strokeWidth || 2.5}px):</label>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="0.5"
                    value={activePolyline.strokeWidth || 2.5}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setPolylines(prev => prev.map(p => p.id === activePolyline.id ? { ...p, strokeWidth: val } : p));
                    }}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <label className="flex items-center space-x-2 cursor-pointer text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={activePolyline.showDots !== false}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setPolylines(prev => prev.map(p => p.id === activePolyline.id ? { ...p, showDots: checked } : p));
                    }}
                    className="accent-emerald-500"
                  />
                  <span>Tampilkan Titik Sudut (Vertex Dots)</span>
                </label>

                <div className="pt-1 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const lastPt = activePolyline.points[activePolyline.points.length - 1] || { index: 0, price: 100 };
                      const nextPt = { index: lastPt.index + 2, price: lastPt.price > 130 ? lastPt.price - 25 : lastPt.price + 25 };
                      setPolylines(prev => prev.map(p => p.id === activePolyline.id ? { ...p, points: [...p.points, nextPt] } : p));
                    }}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-500 border border-emerald-500/30 font-bold text-[11px]"
                  >
                    + Tambah Titik Gelombang
                  </button>
                  {activePolyline.points.length > 2 && (
                    <button
                      type="button"
                      onClick={() => {
                        setPolylines(prev => prev.map(p => p.id === activePolyline.id ? { ...p, points: p.points.slice(0, -1) } : p));
                      }}
                      className="py-1.5 px-2 rounded-lg bg-rose-500/15 text-rose-500 border border-rose-500/30 font-bold text-[11px]"
                    >
                      - Kurangi
                    </button>
                  )}
                </div>
              </div>

            /* 2. ACTIVE INFO CARD INSPECTOR */
            ) : activeInfoCard ? (
              <div className="space-y-3.5 text-xs font-mono">
                <div className={`p-2.5 border rounded-xl ${
                  isDarkMode ? 'bg-[#121724] border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
                }`}>
                  <div className="text-slate-500 text-[10px] uppercase mb-0.5">Elemen Terpilih:</div>
                  <div className="font-bold text-sm text-purple-400">Kartu Penjelasan (Info Card)</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Drag kartu di kanvas untuk memindahkan posisinya.</div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1">Badge No:</label>
                    <input
                      type="text"
                      value={activeInfoCard.stepBadge || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setInfoCards(prev => prev.map(c => c.id === activeInfoCard.id ? { ...c, stepBadge: val } : c));
                      }}
                      placeholder="1 / ✓ / $"
                      className={inputClass}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-slate-500 dark:text-slate-400 mb-1">Judul Kartu:</label>
                    <input
                      type="text"
                      value={activeInfoCard.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setInfoCards(prev => prev.map(c => c.id === activeInfoCard.id ? { ...c, title: val } : c));
                      }}
                      placeholder="STRONG LOW (HL)"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1">Isi Penjelasan (1 Baris per Enter):</label>
                  <textarea
                    rows={3}
                    value={(activeInfoCard.lines || []).join('\n')}
                    onChange={(e) => {
                      const lines = e.target.value.split('\n');
                      setInfoCards(prev => prev.map(c => c.id === activeInfoCard.id ? { ...c, lines } : c));
                    }}
                    placeholder="Baris 1&#10;Baris 2"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1">Badge Kesimpulan Bawah (Footer):</label>
                  <input
                    type="text"
                    value={activeInfoCard.footerBadge || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setInfoCards(prev => prev.map(c => c.id === activeInfoCard.id ? { ...c, footerBadge: val } : c));
                    }}
                    placeholder="Contoh: ✓ Akumulasi Institusi"
                    className={inputClass}
                  />
                </div>

                {renderColorControl(
                  'Warna Aksen, Judul & Border:',
                  activeInfoCard.color || '#10B981',
                  (color) => setInfoCards(prev => prev.map(c => c.id === activeInfoCard.id ? { ...c, color } : c))
                )}

                {renderColorControl(
                  'Warna Teks Isi:',
                  activeInfoCard.textColor || (isDarkMode ? '#E2E8F0' : '#1E293B'),
                  (textColor) => setInfoCards(prev => prev.map(c => c.id === activeInfoCard.id ? { ...c, textColor } : c))
                )}

                {renderColorControl(
                  'Warna Background Kartu:',
                  activeInfoCard.bgColor || activeInfoCard.color || '#10B981',
                  (bgColor) => setInfoCards(prev => prev.map(c => c.id === activeInfoCard.id ? { ...c, bgColor } : c))
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1">Lebar Kartu ({activeInfoCard.width || 155}px):</label>
                    <input
                      type="range"
                      min="120"
                      max="240"
                      step="5"
                      value={activeInfoCard.width || 155}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setInfoCards(prev => prev.map(c => c.id === activeInfoCard.id ? { ...c, width: val } : c));
                      }}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1">Opasitas ({Math.round((activeInfoCard.bgOpacity ?? 0.14) * 100)}%):</label>
                    <input
                      type="range"
                      min="0.05"
                      max="0.6"
                      step="0.05"
                      value={activeInfoCard.bgOpacity ?? 0.14}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setInfoCards(prev => prev.map(c => c.id === activeInfoCard.id ? { ...c, bgOpacity: val } : c));
                      }}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </div>
              </div>

            /* 3. ACTIVE ARROW INSPECTOR */
            ) : activeArrow ? (
              <div className="space-y-3.5 text-xs font-mono">
                <div className={`p-2.5 border rounded-xl ${
                  isDarkMode ? 'bg-[#121724] border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
                }`}>
                  <div className="text-slate-500 text-[10px] uppercase mb-0.5">Elemen Terpilih:</div>
                  <div className="font-bold text-sm text-pink-400">Panah Penunjuk (Curved / Flow Arrow)</div>
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1">Label Teks Panah:</label>
                  <input
                    type="text"
                    value={activeArrow.label || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setArrows(prev => prev.map(a => a.id === activeArrow.id ? { ...a, label: val } : a));
                    }}
                    placeholder="Contoh: Pullback Retest / Rotasi Modal..."
                    className={inputClass}
                  />
                </div>

                <label className="flex items-center space-x-2 cursor-pointer text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={activeArrow.curved !== false}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setArrows(prev => prev.map(a => a.id === activeArrow.id ? { ...a, curved: checked } : a));
                    }}
                    className="accent-emerald-500"
                  />
                  <span className="font-bold">Gunakan Lengkungan (Curved Arc)</span>
                </label>

                {activeArrow.curved !== false && (
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1">Derajat Lengkungan ({activeArrow.curveOffset ?? 25}):</label>
                    <input
                      type="range"
                      min="-80"
                      max="80"
                      step="5"
                      value={activeArrow.curveOffset ?? 25}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setArrows(prev => prev.map(a => a.id === activeArrow.id ? { ...a, curveOffset: val } : a));
                      }}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                )}

                {renderColorControl(
                  'Warna Panah:',
                  activeArrow.color || '#FACC15',
                  (color) => setArrows(prev => prev.map(a => a.id === activeArrow.id ? { ...a, color } : a))
                )}

                {renderColorControl(
                  'Warna Teks Label:',
                  activeArrow.textColor || activeArrow.color || '#FACC15',
                  (textColor) => setArrows(prev => prev.map(a => a.id === activeArrow.id ? { ...a, textColor } : a))
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1">Bar Awal (X1):</label>
                    <input
                      type="number"
                      value={activeArrow.startIndex}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setArrows(prev => prev.map(a => a.id === activeArrow.id ? { ...a, startIndex: val } : a));
                      }}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1">Harga Awal (Y1):</label>
                    <input
                      type="number"
                      value={activeArrow.startPrice}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setArrows(prev => prev.map(a => a.id === activeArrow.id ? { ...a, startPrice: val } : a));
                      }}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1">Bar Tujuan (X2):</label>
                    <input
                      type="number"
                      value={activeArrow.endIndex}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setArrows(prev => prev.map(a => a.id === activeArrow.id ? { ...a, endIndex: val } : a));
                      }}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1">Harga Tujuan (Y2):</label>
                    <input
                      type="number"
                      value={activeArrow.endPrice}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setArrows(prev => prev.map(a => a.id === activeArrow.id ? { ...a, endPrice: val } : a));
                      }}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

            /* 4. ACTIVE CANDLE INSPECTOR */
            ) : activeCandle ? (
              <div className="space-y-3.5 text-xs font-mono">
                <div className={`p-2.5 border rounded-xl ${
                  isDarkMode ? 'bg-[#121724] border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
                }`}>
                  <div className="text-slate-500 text-[10px] uppercase mb-0.5">Elemen Terpilih:</div>
                  <div className="font-bold text-sm text-emerald-500">Candlestick Bar #{activeCandle.index + 1}</div>
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1">Teks Label Bawah Candle:</label>
                  <input
                    type="text"
                    value={activeCandle.label || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCandles(prev => prev.map(c => c.id === activeCandle.id ? { ...c, label: val } : c));
                    }}
                    placeholder="Contoh: OB, Sweep, C1..."
                    className={inputClass}
                  />
                </div>

                {renderColorControl(
                  'Warna Teks Label:',
                  activeCandle.labelColor || (isDarkMode ? '#F8FAFC' : '#0F172A'),
                  (color) => setCandles(prev => prev.map(c => c.id === activeCandle.id ? { ...c, labelColor: color } : c)),
                  () => setCandles(prev => prev.map(c => c.id === activeCandle.id ? { ...c, labelColor: undefined } : c))
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1">Open:</label>
                    <input
                      type="number"
                      value={activeCandle.open}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setCandles(prev => prev.map(c => c.id === activeCandle.id ? { ...c, open: val } : c));
                      }}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1">Close:</label>
                    <input
                      type="number"
                      value={activeCandle.close}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setCandles(prev => prev.map(c => c.id === activeCandle.id ? { ...c, close: val } : c));
                      }}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1">High (Wick):</label>
                    <input
                      type="number"
                      value={activeCandle.high}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setCandles(prev => prev.map(c => c.id === activeCandle.id ? { ...c, high: val } : c));
                      }}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1">Low (Wick):</label>
                    <input
                      type="number"
                      value={activeCandle.low}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setCandles(prev => prev.map(c => c.id === activeCandle.id ? { ...c, low: val } : c));
                      }}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1">Volume Bar Lelang:</label>
                  <input
                    type="number"
                    value={activeCandle.volume || 1000}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCandles(prev => prev.map(c => c.id === activeCandle.id ? { ...c, volume: val } : c));
                    }}
                    className={inputClass}
                  />
                </div>

                {renderColorControl(
                  'Warna Body Candle:',
                  activeCandle.color || (activeCandle.close >= activeCandle.open ? '#10B981' : '#EF4444'),
                  (color) => setCandles(prev => prev.map(c => c.id === activeCandle.id ? { ...c, color } : c)),
                  () => setCandles(prev => prev.map(c => c.id === activeCandle.id ? { ...c, color: undefined } : c))
                )}

                {renderColorControl(
                  'Warna Sumbu (Wick):',
                  activeCandle.wickColor || activeCandle.color || (activeCandle.close >= activeCandle.open ? '#10B981' : '#EF4444'),
                  (wickColor) => setCandles(prev => prev.map(c => c.id === activeCandle.id ? { ...c, wickColor } : c)),
                  () => setCandles(prev => prev.map(c => c.id === activeCandle.id ? { ...c, wickColor: undefined } : c))
                )}

                {renderColorControl(
                  'Warna Garis Tepi (Border):',
                  activeCandle.borderColor || (isDarkMode ? '#000000' : '#1E293B'),
                  (borderColor) => setCandles(prev => prev.map(c => c.id === activeCandle.id ? { ...c, borderColor } : c)),
                  () => setCandles(prev => prev.map(c => c.id === activeCandle.id ? { ...c, borderColor: undefined } : c))
                )}
              </div>

            /* 5. ACTIVE ZONE BOX INSPECTOR */
            ) : activeBox ? (
              <div className="space-y-3.5 text-xs font-mono">
                <div className={`p-2.5 border rounded-xl ${
                  isDarkMode ? 'bg-[#121724] border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
                }`}>
                  <div className="text-slate-500 text-[10px] uppercase mb-0.5">Elemen Terpilih:</div>
                  <div className="font-bold text-sm text-sky-400">Zona Kotak (OB / FVG / Zoom LTF)</div>
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1">Teks Label Zona:</label>
                  <input
                    type="text"
                    value={activeBox.label}
                    onChange={(e) => {
                      const val = e.target.value;
                      setBoxes(prev => prev.map(b => b.id === activeBox.id ? { ...b, label: val } : b));
                    }}
                    placeholder="Order Block (OB) / Zoom LTF..."
                    className={inputClass}
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {['Order Block (OB)', 'Fair Value Gap (FVG)', 'Zoom LTF (M5/M1 Shift)', 'Demand Zone', 'Supply Zone'].map(preset => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setBoxes(prev => prev.map(b => b.id === activeBox.id ? { ...b, label: preset } : b))}
                        className={`text-[9px] px-1.5 py-0.5 rounded border ${
                          isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1">Posisi Teks:</label>
                    <select
                      value={activeBox.labelPosition || 'top-left'}
                      onChange={(e) => {
                        const val = e.target.value as any;
                        setBoxes(prev => prev.map(b => b.id === activeBox.id ? { ...b, labelPosition: val } : b));
                      }}
                      className={inputClass}
                    >
                      <option value="top-left">Kiri Atas</option>
                      <option value="top-right">Kanan Atas</option>
                      <option value="center">Tengah Box</option>
                      <option value="bottom-left">Kiri Bawah</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1">Ukuran Teks ({activeBox.fontSize || 10}px):</label>
                    <input
                      type="range"
                      min="8"
                      max="16"
                      step="0.5"
                      value={activeBox.fontSize || 10}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setBoxes(prev => prev.map(b => b.id === activeBox.id ? { ...b, fontSize: val } : b));
                      }}
                      className="w-full accent-emerald-500 mt-2"
                    />
                  </div>
                </div>

                {renderColorControl(
                  'Warna Teks Label:',
                  activeBox.textColor || activeBox.color || '#38BDF8',
                  (textColor) => setBoxes(prev => prev.map(b => b.id === activeBox.id ? { ...b, textColor } : b))
                )}

                {renderColorControl(
                  'Background Teks Label (Opsional):',
                  activeBox.textBgColor || '#090D16',
                  (textBgColor) => setBoxes(prev => prev.map(b => b.id === activeBox.id ? { ...b, textBgColor } : b)),
                  () => setBoxes(prev => prev.map(b => b.id === activeBox.id ? { ...b, textBgColor: undefined } : b))
                )}

                <hr className={isDarkMode ? 'border-slate-800' : 'border-slate-200'} />

                {renderColorControl(
                  'Warna Background Zona:',
                  activeBox.color || '#38BDF8',
                  (color) => setBoxes(prev => prev.map(b => b.id === activeBox.id ? { ...b, color } : b))
                )}

                <div>
                  <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                    <span>Opasitas Background:</span>
                    <span className="font-bold">{Math.round((activeBox.opacity ?? 0.14) * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.04"
                    max="0.75"
                    step="0.04"
                    value={activeBox.opacity ?? 0.14}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setBoxes(prev => prev.map(b => b.id === activeBox.id ? { ...b, opacity: val } : b));
                    }}
                    className="w-full accent-emerald-500"
                  />
                </div>

                {renderColorControl(
                  'Warna Border Zona:',
                  activeBox.borderColor || activeBox.color || '#38BDF8',
                  (borderColor) => setBoxes(prev => prev.map(b => b.id === activeBox.id ? { ...b, borderColor } : b))
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1">Gaya Border:</label>
                    <select
                      value={activeBox.borderStyle || 'dashed'}
                      onChange={(e) => {
                        const val = e.target.value as any;
                        setBoxes(prev => prev.map(b => b.id === activeBox.id ? { ...b, borderStyle: val } : b));
                      }}
                      className={inputClass}
                    >
                      <option value="dashed">Putus-putus (Dashed)</option>
                      <option value="solid">Garis Utuh (Solid)</option>
                      <option value="dotted">Titik-titik (Dotted)</option>
                      <option value="none">Tanpa Border</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1">Tebal Border ({activeBox.borderWidth ?? 1.2}px):</label>
                    <input
                      type="range"
                      min="1"
                      max="4"
                      step="0.5"
                      value={activeBox.borderWidth ?? 1.2}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setBoxes(prev => prev.map(b => b.id === activeBox.id ? { ...b, borderWidth: val } : b));
                      }}
                      className="w-full accent-emerald-500 mt-2"
                    />
                  </div>
                </div>

                <div className="pt-1 space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={activeBox.showMidLine || false}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setBoxes(prev => prev.map(b => b.id === activeBox.id ? { ...b, showMidLine: checked } : b));
                      }}
                      className="accent-emerald-500"
                    />
                    <span className="font-bold">Tampilkan Garis Tengah 50% (EQ)</span>
                  </label>
                </div>
              </div>

            /* 6. ACTIVE BADGE / TEXT CALLOUT INSPECTOR */
            ) : activeBadge ? (
              <div className="space-y-3.5 text-xs font-mono">
                <div className={`p-2.5 border rounded-xl ${
                  isDarkMode ? 'bg-[#121724] border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
                }`}>
                  <div className="text-slate-500 text-[10px] uppercase mb-0.5">Elemen Terpilih:</div>
                  <div className="font-bold text-sm text-amber-400">Text Badge / Callout Annotation</div>
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1">Teks Badge / Anotasi:</label>
                  <input
                    type="text"
                    value={activeBadge.text}
                    onChange={(e) => {
                      const val = e.target.value;
                      setBadges(prev => prev.map(b => b.id === activeBadge.id ? { ...b, text: val } : b));
                    }}
                    placeholder="Ketik teks bebas..."
                    className={inputClass}
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {['BOS', 'CHoCH!', 'BSL $$$', 'SSL $$$', 'BTC.D Peak', 'Altseason', 'Entry', 'Stop Loss'].map(badgeText => (
                      <button
                        key={badgeText}
                        type="button"
                        onClick={() => {
                          setBadges(prev => prev.map(b => b.id === activeBadge.id ? { ...b, text: badgeText } : b));
                        }}
                        className={`text-[9px] px-1.5 py-0.5 rounded border transition-colors ${
                          isDarkMode 
                            ? 'bg-slate-800 text-slate-300 hover:text-white border-slate-700' 
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                        }`}
                      >
                        {badgeText}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1">Gaya Bentuk:</label>
                    <select
                      value={activeBadge.style || 'badge'}
                      onChange={(e) => {
                        const val = e.target.value as any;
                        setBadges(prev => prev.map(b => b.id === activeBadge.id ? { ...b, style: val } : b));
                      }}
                      className={inputClass}
                    >
                      <option value="badge">Kotak (Badge)</option>
                      <option value="pill">Kapsul (Pill)</option>
                      <option value="callout">Callout Pointer</option>
                      <option value="outline">Outline Transparan</option>
                      <option value="transparent">Teks Murni</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1">Ukuran Font ({activeBadge.fontSize || 9.5}px):</label>
                    <input
                      type="range"
                      min="8"
                      max="16"
                      step="0.5"
                      value={activeBadge.fontSize || 9.5}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setBadges(prev => prev.map(b => b.id === activeBadge.id ? { ...b, fontSize: val } : b));
                      }}
                      className="w-full accent-emerald-500 mt-2"
                    />
                  </div>
                </div>

                {renderColorControl(
                  'Warna Teks (Font Color):',
                  activeBadge.textColor || '#000000',
                  (textColor) => setBadges(prev => prev.map(b => b.id === activeBadge.id ? { ...b, textColor } : b))
                )}

                {renderColorControl(
                  'Warna Background Badge:',
                  activeBadge.bgColor || activeBadge.color || '#FACC15',
                  (bgColor) => setBadges(prev => prev.map(b => b.id === activeBadge.id ? { ...b, bgColor, color: bgColor } : b))
                )}

                <div>
                  <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                    <span>Opasitas Background:</span>
                    <span className="font-bold">{Math.round((activeBadge.bgOpacity ?? 1) * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={activeBadge.bgOpacity ?? 1}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setBadges(prev => prev.map(b => b.id === activeBadge.id ? { ...b, bgOpacity: val } : b));
                    }}
                    className="w-full accent-emerald-500"
                  />
                </div>

                {renderColorControl(
                  'Warna Garis Tepi (Border):',
                  activeBadge.borderColor || '#000000',
                  (borderColor) => setBadges(prev => prev.map(b => b.id === activeBadge.id ? { ...b, borderColor } : b))
                )}
              </div>

            /* 7. ACTIVE TRENDLINE INSPECTOR */
            ) : activeTrendline ? (
              <div className="space-y-3.5 text-xs font-mono">
                <div className={`p-2.5 border rounded-xl ${
                  isDarkMode ? 'bg-[#121724] border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
                }`}>
                  <div className="text-slate-500 text-[10px] uppercase mb-0.5">Elemen Terpilih:</div>
                  <div className="font-bold text-sm text-amber-400">Trendline / Structure Line</div>
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1">Teks Label Garis:</label>
                  <input
                    type="text"
                    value={activeTrendline.label || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setTrendlines(prev => prev.map(t => t.id === activeTrendline.id ? { ...t, label: val } : t));
                    }}
                    placeholder="Contoh: BOS, CHoCH, EQH, Trendline..."
                    className={inputClass}
                  />
                </div>

                {renderColorControl(
                  'Warna Garis Trendline:',
                  activeTrendline.color || '#FACC15',
                  (color) => setTrendlines(prev => prev.map(t => t.id === activeTrendline.id ? { ...t, color } : t))
                )}

                {renderColorControl(
                  'Warna Teks Label:',
                  activeTrendline.textColor || activeTrendline.color || '#FACC15',
                  (textColor) => setTrendlines(prev => prev.map(t => t.id === activeTrendline.id ? { ...t, textColor } : t))
                )}

                {renderColorControl(
                  'Warna Background Teks:',
                  activeTrendline.textBgColor || (isDarkMode ? '#090D16' : '#FFFFFF'),
                  (textBgColor) => setTrendlines(prev => prev.map(t => t.id === activeTrendline.id ? { ...t, textBgColor } : t))
                )}
              </div>

            /* 8. ACTIVE FIBONACCI INSPECTOR */
            ) : activeFib ? (
              <div className="space-y-3.5 text-xs font-mono">
                <div className={`p-2.5 border rounded-xl ${
                  isDarkMode ? 'bg-[#121724] border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
                }`}>
                  <div className="text-slate-500 text-[10px] uppercase mb-0.5">Elemen Terpilih:</div>
                  <div className="font-bold text-sm text-purple-400">Fibonacci Retracement (OTE)</div>
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1">Judul / Label Fibonacci:</label>
                  <input
                    type="text"
                    value={activeFib.label || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFibonaccis(prev => prev.map(f => f.id === activeFib.id ? { ...f, label: val } : f));
                    }}
                    placeholder="Contoh: Dealing Range OTE..."
                    className={inputClass}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setFibonaccis(prev => prev.map(f => f.id === activeFib.id ? {
                      ...f,
                      startPrice: f.endPrice,
                      endPrice: f.startPrice
                    } : f));
                  }}
                  className={`w-full py-1.5 rounded-lg border text-xs font-bold flex items-center justify-center space-x-1.5 ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Balik Arah Level (0% ⇄ 100%)</span>
                </button>

                {renderColorControl(
                  'Warna Background Golden Zone:',
                  activeFib.fillColor || '#10B981',
                  (fillColor) => setFibonaccis(prev => prev.map(f => f.id === activeFib.id ? { ...f, fillColor } : f))
                )}
              </div>

            /* 9. ACTIVE POSITION (R:R TOOL) INSPECTOR */
            ) : activePosition ? (
              <div className="space-y-3.5 text-xs font-mono">
                <div className={`p-2.5 border rounded-xl ${
                  isDarkMode ? 'bg-[#121724] border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
                }`}>
                  <div className="text-slate-500 text-[10px] uppercase mb-1">Elemen Terpilih:</div>
                  <div className="font-bold text-sm flex items-center justify-between">
                    <span>{activePosition.type === 'long' ? '🟢 Long Position' : '🔴 Short Position'}</span>
                    <span className="text-[#0284C7] font-extrabold">
                      R:R = 1 : {(Math.abs(activePosition.targetPrice - activePosition.entryPrice) / (Math.abs(activePosition.entryPrice - activePosition.stopPrice) || 1)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1">Label Catatan Posisi:</label>
                  <input
                    type="text"
                    value={activePosition.label || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPositions(prev => prev.map(p => p.id === activePosition.id ? { ...p, label: val } : p));
                    }}
                    placeholder="Contoh: Buy Limit OTE..."
                    className={inputClass}
                  />
                </div>

                {renderColorControl(
                  'Warna Area Profit (TP Background):',
                  activePosition.targetColor || '#10B981',
                  (targetColor) => setPositions(prev => prev.map(p => p.id === activePosition.id ? { ...p, targetColor, targetTextColor: targetColor } : p))
                )}

                {renderColorControl(
                  'Warna Area Risiko (SL Background):',
                  activePosition.stopColor || '#EF4444',
                  (stopColor) => setPositions(prev => prev.map(p => p.id === activePosition.id ? { ...p, stopColor, stopTextColor: stopColor } : p))
                )}
              </div>
            ) : (
              <div className="h-60 flex flex-col items-center justify-center text-center p-4 text-slate-400 dark:text-slate-500 font-mono text-xs space-y-2.5">
                <Sliders className="w-8 h-8 opacity-40" />
                <div className="font-bold text-slate-600 dark:text-slate-300">Pilih Elemen di Kanvas</div>
                <span>Klik objek <strong>Gelombang (Wave)</strong>, <strong>Kartu Info</strong>, <strong>Panah</strong>, <strong>Candle</strong>, <strong>Kotak Zona</strong>, atau <strong>Badge</strong> untuk mengkustomisasi teks, warna font, background, dan border.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
