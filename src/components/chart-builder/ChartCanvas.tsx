import React, { useRef, useState, useMemo } from 'react';
import { 
  CustomCandle, 
  FibonacciDrawing, 
  BoxDrawing, 
  TrendlineDrawing, 
  TextBadgeAnnotation,
  PositionDrawing,
  PolylineDrawing,
  ArrowDrawing,
  InfoCardDrawing,
  ChartLegendItem
} from '../../types/chartBuilderTypes';

export type ChartObjectType = 'candle' | 'fib' | 'box' | 'position' | 'trendline' | 'polyline' | 'arrow' | 'infocard' | 'badge';
export type ActiveChartTool = 'select' | 'candle' | 'fibonacci' | 'box' | 'position-long' | 'position-short' | 'trendline' | 'polyline' | 'arrow' | 'infocard' | 'badge';

interface ChartCanvasProps {
  candles: CustomCandle[];
  fibonaccis: FibonacciDrawing[];
  boxes: BoxDrawing[];
  positions: PositionDrawing[];
  trendlines: TrendlineDrawing[];
  polylines: PolylineDrawing[];
  arrows?: ArrowDrawing[];
  infoCards?: InfoCardDrawing[];
  badges: TextBadgeAnnotation[];
  legends?: ChartLegendItem[];
  showCandles?: boolean;
  showVolume?: boolean;
  showEma?: boolean;
  emaPeriod?: number;
  isDarkMode?: boolean;
  candleSpacing?: 'compact' | 'normal' | 'wide' | 'ultra-wide';
  selectedId: string | null;
  onSelectId: (id: string | null, type: ChartObjectType) => void;
  onUpdateCandle: (candle: CustomCandle) => void;
  onUpdateBadge?: (badge: TextBadgeAnnotation) => void;
  onUpdateInfoCard?: (card: InfoCardDrawing) => void;
  onUpdatePolyline?: (poly: PolylineDrawing) => void;
  activeTool: ActiveChartTool;
  onAddAnnotation: (type: string, payload: any) => void;
}

// Helper to build smooth SVG cubic/quadratic curve path through points
export function buildSmoothCurvePath(pts: Array<{ x: number; y: number }>): string {
  if (pts.length === 0) return '';
  if (pts.length === 1) return `M ${pts[0].x},${pts[0].y}`;
  if (pts.length === 2) return `M ${pts[0].x},${pts[0].y} L ${pts[1].x},${pts[1].y}`;

  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? i : i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

export const ChartCanvas: React.FC<ChartCanvasProps> = ({
  candles,
  fibonaccis,
  boxes,
  positions,
  trendlines,
  polylines,
  arrows = [],
  infoCards = [],
  badges,
  legends = [],
  showCandles = true,
  showVolume = true,
  showEma = true,
  emaPeriod = 9,
  isDarkMode = true,
  candleSpacing = 'normal',
  selectedId,
  onSelectId,
  onUpdateCandle,
  onUpdateBadge,
  onUpdateInfoCard,
  onUpdatePolyline,
  activeTool,
  onAddAnnotation
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Crosshair state
  const [crosshair, setCrosshair] = useState<{ x: number; y: number; price: number; index: number } | null>(null);

  // Tool drawing state (for 2-point tools like Fib, Box, Trendline, Position, Arrow)
  const [drawingStart, setDrawingStart] = useState<{ xIndex: number; price: number } | null>(null);

  // Multi-point Polyline drawing state
  const [draftPoints, setDraftPoints] = useState<Array<{ index: number; price: number }>>([]);

  // Spacing Configuration: Proporsional & Lega
  const candleStep =
    candleSpacing === 'compact' ? 44 :
    candleSpacing === 'wide' ? 84 :
    candleSpacing === 'ultra-wide' ? 110 :
    60;
  const candleWidth =
    candleSpacing === 'compact' ? 16 :
    candleSpacing === 'wide' ? 26 :
    candleSpacing === 'ultra-wide' ? 32 :
    20;

  const hasLegend = legends.length > 0;
  const legendHeight = hasLegend ? 28 : 0;
  const volumeHeight = showVolume ? 65 : 0;
  const padding = {
    top: 40,
    right: 85,
    bottom: 45 + volumeHeight + legendHeight,
    left: 45
  };
  const totalHeight = 540;

  // Lebar kanvas bertambah secara dinamis seiring bertambahnya candle tanpa menggeser posisi scroll otomatis
  const maxBarIndex = useMemo(() => {
    let maxIdx = Math.max(12, candles.length);
    polylines.forEach(p => p.points.forEach(pt => { if (pt.index + 2 > maxIdx) maxIdx = pt.index + 2; }));
    infoCards.forEach(c => {
      const estCardBars = Math.ceil((c.width || 210) / candleStep);
      const reach = (c.alignX === 'left' ? c.candleIndex + estCardBars : c.candleIndex + estCardBars / 2) + 1.5;
      if (reach > maxIdx) maxIdx = reach;
    });
    return maxIdx;
  }, [candles.length, polylines, infoCards, candleStep]);

  const width = Math.max(760, padding.left + maxBarIndex * candleStep + padding.right + 30);

  const { minPrice, maxPrice } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    for (const c of candles) {
      if (c.low < min) min = c.low;
      if (c.high > max) max = c.high;
    }
    for (const p of polylines) {
      for (const pt of p.points) {
        if (pt.price < min) min = pt.price;
        if (pt.price > max) max = pt.price;
      }
    }
    for (const b of boxes) {
      if (b.bottomPrice < min) min = b.bottomPrice;
      if (b.topPrice > max) max = b.topPrice;
    }
    if (!isFinite(min) || !isFinite(max)) return { minPrice: 60, maxPrice: 180 };
    const rawRange = Math.max(0.000001, max - min);
    const minSpan = min > 20 ? 20 : (rawRange < 0.001 ? rawRange * 0.5 : rawRange * 0.2);
    const range = Math.max(minSpan, rawRange);
    return {
      minPrice: min - range * 0.16,
      maxPrice: max + range * 0.16
    };
  }, [candles, polylines, boxes]);

  const maxVolume = useMemo(() => {
    if (candles.length === 0) return 1000;
    return Math.max(...candles.map(c => c.volume || 1000), 1000);
  }, [candles]);

  const priceToY = (price: number): number => {
    const usableHeight = totalHeight - padding.top - padding.bottom;
    const ratio = (price - minPrice) / (maxPrice - minPrice || 1);
    return totalHeight - padding.bottom - ratio * usableHeight;
  };

  const yToPrice = (y: number): number => {
    const usableHeight = totalHeight - padding.top - padding.bottom;
    const ratio = (totalHeight - padding.bottom - y) / usableHeight;
    return Math.round(minPrice + ratio * (maxPrice - minPrice));
  };

  const indexToX = (index: number): number => {
    return padding.left + index * candleStep + candleStep / 2;
  };

  const xToIndex = (x: number): number => {
    const raw = (x - padding.left) / candleStep;
    return Math.max(0, Math.floor(raw));
  };

  // Price Grid Levels
  const priceGridLevels = useMemo(() => {
    const count = 6;
    const step = (maxPrice - minPrice) / count;
    return Array.from({ length: count + 1 }, (_, i) => minPrice + i * step);
  }, [minPrice, maxPrice]);

  // Exponential Moving Average (EMA) Calculation
  const emaPoints = useMemo(() => {
    if (!showEma || candles.length < 2) return [];
    const k = 2 / (emaPeriod + 1);
    const points: Array<{ x: number; y: number }> = [];
    let prevEma = candles[0].close;

    candles.forEach((c, idx) => {
      const currentEma = c.close * k + prevEma * (1 - k);
      points.push({ x: indexToX(idx), y: priceToY(currentEma) });
      prevEma = currentEma;
    });

    return points;
  }, [candles, showEma, emaPeriod, minPrice, maxPrice, candleStep]);

  // Color Theme Tokens
  const themeBg = isDarkMode ? '#080C16' : '#FFFFFF';
  const gridStroke = isDarkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.05)';
  const gridLineStroke = isDarkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(100, 116, 139, 0.15)';
  const labelTextFill = isDarkMode ? '#64748B' : '#475569';
  const candleBorderStroke = isDarkMode ? '#000000' : '#1E293B';

  const getDashArray = (style?: 'solid' | 'dashed' | 'dotted' | 'none') => {
    if (style === 'dashed') return '6 4';
    if (style === 'dotted') return '2 3';
    return 'none';
  };

  // Commit multi-point wave
  const handleFinishDraftWave = () => {
    if (draftPoints.length >= 2) {
      onAddAnnotation('polyline', {
        points: draftPoints,
        color: '#38BDF8',
        strokeWidth: 2.5,
        lineStyle: 'solid',
        curveType: 'zigzag',
        showDots: true,
        label: 'Structure Wave'
      });
    }
    setDraftPoints([]);
  };

  // Handle Mouse Move for Crosshair
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= padding.left && x <= width - padding.right && y >= padding.top && y <= totalHeight - padding.bottom) {
      setCrosshair({
        x,
        y,
        price: yToPrice(y),
        index: xToIndex(x)
      });
    } else {
      setCrosshair(null);
    }
  };

  // Handle Canvas Click for Tools
  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (activeTool === 'select') return;

    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const xIdx = xToIndex(clickX);
    const clickedPrice = yToPrice(clickY);

    if (activeTool === 'badge') {
      onAddAnnotation('badge', {
        candleIndex: xIdx,
        price: clickedPrice,
        text: 'BOS',
        color: '#FACC15',
        bgColor: '#FACC15',
        bgOpacity: 1,
        textColor: '#000000',
        borderColor: '#000000',
        borderWidth: 1,
        fontSize: 9.5,
        style: 'badge'
      });
      return;
    }

    if (activeTool === 'infocard') {
      onAddAnnotation('infocard', {
        candleIndex: xIdx,
        price: clickedPrice,
        width: 155,
        stepBadge: '1',
        title: 'STRONG POI ZONE',
        lines: ['Konfirmasi Struktur', 'Area Akumulasi Institusi'],
        footerBadge: '✓ Valid Setup',
        color: '#10B981',
        bgOpacity: 0.15
      });
      return;
    }

    if (activeTool === 'polyline') {
      setDraftPoints(prev => [...prev, { index: xIdx, price: clickedPrice }]);
      return;
    }

    if (!drawingStart) {
      setDrawingStart({ xIndex: xIdx, price: clickedPrice });
    } else {
      if (activeTool === 'fibonacci') {
        onAddAnnotation('fibonacci', {
          startPrice: drawingStart.price,
          endPrice: clickedPrice,
          startIndex: Math.min(drawingStart.xIndex, xIdx),
          endIndex: Math.max(drawingStart.xIndex, xIdx),
          label: 'OTE Retracement',
          showFill: true,
          fillColor: '#10B981',
          fillOpacity: 0.16,
          lineStyle: 'dashed',
          showPrices: true
        });
      } else if (activeTool === 'box') {
        onAddAnnotation('box', {
          startIndex: Math.min(drawingStart.xIndex, xIdx),
          endIndex: Math.max(drawingStart.xIndex, xIdx),
          topPrice: Math.max(drawingStart.price, clickedPrice),
          bottomPrice: Math.min(drawingStart.price, clickedPrice),
          label: 'Order Block (OB)',
          labelPosition: 'top-left',
          fontSize: 10,
          color: '#38BDF8',
          textColor: '#38BDF8',
          borderColor: '#38BDF8',
          borderWidth: 1.5,
          borderStyle: 'dashed',
          opacity: 0.18,
          showMidLine: true,
          midLineLabel: '50% EQ'
        });
      } else if (activeTool === 'arrow') {
        onAddAnnotation('arrow', {
          startIndex: drawingStart.xIndex,
          startPrice: drawingStart.price,
          endIndex: xIdx,
          endPrice: clickedPrice,
          color: '#FACC15',
          strokeWidth: 2.2,
          curved: true,
          curveOffset: 15,
          label: 'Target Flow'
        });
      } else if (activeTool === 'position-long') {
        const entry = drawingStart.price;
        const target = Math.max(entry + 25, clickedPrice);
        const stop = Math.min(entry - 10, clickedPrice < entry ? clickedPrice : entry - 10);
        onAddAnnotation('position', {
          type: 'long',
          label: 'Long Setup',
          entryPrice: entry,
          targetPrice: target,
          stopPrice: stop,
          startIndex: Math.min(drawingStart.xIndex, xIdx),
          endIndex: Math.max(drawingStart.xIndex + 3, xIdx),
          targetColor: '#10B981',
          targetTextColor: '#10B981',
          targetOpacity: 0.22,
          stopColor: '#EF4444',
          stopTextColor: '#EF4444',
          stopOpacity: 0.22
        });
      } else if (activeTool === 'position-short') {
        const entry = drawingStart.price;
        const target = Math.min(entry - 25, clickedPrice);
        const stop = Math.max(entry + 10, clickedPrice > entry ? clickedPrice : entry + 10);
        onAddAnnotation('position', {
          type: 'short',
          label: 'Short Setup',
          entryPrice: entry,
          targetPrice: target,
          stopPrice: stop,
          startIndex: Math.min(drawingStart.xIndex, xIdx),
          endIndex: Math.max(drawingStart.xIndex + 3, xIdx),
          targetColor: '#10B981',
          targetTextColor: '#10B981',
          targetOpacity: 0.22,
          stopColor: '#EF4444',
          stopTextColor: '#EF4444',
          stopOpacity: 0.22
        });
      } else if (activeTool === 'trendline') {
        onAddAnnotation('trendline', {
          x1Index: drawingStart.xIndex,
          y1Price: drawingStart.price,
          x2Index: xIdx,
          y2Price: clickedPrice,
          color: '#FACC15',
          strokeWidth: 2,
          lineStyle: 'solid',
          label: 'BOS',
          labelAlignment: 'center',
          textColor: '#FACC15',
          textBgColor: isDarkMode ? '#090D16' : '#FFFFFF',
          showTextBg: true,
          showDots: true
        });
      }
      setDrawingStart(null);
    }
  };

  // Scroll Navigators
  const handleScroll = (direction: 'left' | 'right' | 'end' | 'start') => {
    if (!containerRef.current) return;
    if (direction === 'left') {
      containerRef.current.scrollBy({ left: -240, behavior: 'smooth' });
    } else if (direction === 'right') {
      containerRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    } else if (direction === 'end') {
      containerRef.current.scrollTo({ left: containerRef.current.scrollWidth, behavior: 'smooth' });
    } else {
      containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex flex-col space-y-2">
      {/* Scroll & Active Multi-point Wave Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono px-1">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] text-slate-500 dark:text-zinc-400">
            Kanvas ({candles.length} Bar • {polylines.length} Wave • {infoCards.length} Kartu • Lebar: {width}px)
          </span>
          {activeTool === 'polyline' && (
            <div className="flex items-center space-x-2 bg-sky-500/15 border border-sky-500/40 text-sky-400 px-2.5 py-0.5 rounded-lg">
              <span className="text-[10px] font-bold">
                Mode Gambar Wave: Klik titik-titik pada chart ({draftPoints.length} titik dipilih)
              </span>
              {draftPoints.length >= 2 && (
                <button
                  type="button"
                  onClick={handleFinishDraftWave}
                  className="px-2 py-0.5 rounded bg-emerald-500 text-black font-extrabold text-[10px]"
                >
                  ✓ Selesai Gambar Wave
                </button>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => handleScroll('start')}
            className="px-2 py-0.5 rounded bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 text-[10px]"
            title="Ke Awal Chart"
          >
            ⏮ Awal
          </button>
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="px-2 py-0.5 rounded bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 text-[10px]"
            title="Geser Kiri"
          >
            ◀ Kiri
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="px-2 py-0.5 rounded bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 text-[10px]"
            title="Geser Kanan"
          >
            Kanan ▶
          </button>
          <button
            type="button"
            onClick={() => handleScroll('end')}
            className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/30 font-bold text-[10px]"
            title="Ke Ujung Kanan"
          >
            Ujung Kanan ⏭
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        className={`w-full overflow-x-auto rounded-2xl border transition-colors shadow-inner select-none relative ${
          isDarkMode ? 'border-zinc-800 bg-[#080C16]' : 'border-slate-300 bg-white shadow-xs'
        }`}
        style={{ scrollbarWidth: 'thin' }}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${totalHeight}`}
          style={{ width: `${width}px`, minWidth: `${width}px`, height: `${totalHeight}px` }}
          onClick={handleSvgClick}
          onDoubleClick={() => {
            if (activeTool === 'polyline' && draftPoints.length >= 2) {
              handleFinishDraftWave();
            }
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setCrosshair(null)}
          className="cursor-crosshair block"
        >
          <defs>
            <pattern id="canvas-grid-pro" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke={gridStroke} strokeWidth="1" />
            </pattern>
          </defs>

          {/* Background Grid */}
          <rect width={width} height={totalHeight} fill={themeBg} />
          <rect width={width} height={totalHeight} fill="url(#canvas-grid-pro)" />

          {/* Horizontal Price Grid Lines & Labels */}
          {priceGridLevels.map((price) => {
            const y = priceToY(price);
            return (
              <g key={`grid-price-${price}`}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke={gridLineStroke}
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={width - padding.right + 8}
                  y={y + 4}
                  fill={labelTextFill}
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {maxPrice < 10 ? price.toFixed(4) : price.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Vertical Candle Timeline Grid */}
          {candles.map((c, idx) => {
            const x = indexToX(idx);
            const customLabelColor = c.labelColor || (c.label ? (isDarkMode ? '#F8FAFC' : '#0F172A') : labelTextFill);
            return (
              <g key={`timeline-${c.id}`}>
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={totalHeight - padding.bottom}
                  stroke={gridStroke}
                  strokeDasharray="2 4"
                />
                <text
                  x={x}
                  y={totalHeight - padding.bottom + 16}
                  fill={customLabelColor}
                  fontSize="9.5"
                  fontWeight={c.label ? 'bold' : 'normal'}
                  fontFamily="JetBrains Mono, monospace"
                  textAnchor="middle"
                >
                  {c.label || `T${idx + 1}`}
                </text>
              </g>
            );
          })}

          {/* LAYER: Box Drawings (Order Block, FVG, Zoom LTF Focus Box) */}
          {boxes.map((b) => {
            const x1 = indexToX(b.startIndex) - 12;
            const x2 = indexToX(b.endIndex) + 12;
            const boxW = Math.max(25, x2 - x1);
            const yTop = priceToY(b.topPrice);
            const yBottom = priceToY(b.bottomPrice);
            const boxHeight = Math.max(4, yBottom - yTop);
            const yMid = yTop + boxHeight / 2;
            const isSelected = selectedId === b.id;

            const fillColor = b.color || '#38BDF8';
            const strokeColor = b.borderColor || fillColor;
            const textColor = b.textColor || fillColor;
            const fontSize = b.fontSize || 10;
            const borderStyle = b.borderStyle || 'dashed';
            const borderW = isSelected ? 2.5 : (b.borderWidth ?? 1.2);
            const midColor = b.midLineColor || strokeColor;

            let labelX = x1 + 6;
            let labelY = yTop + fontSize + 4;
            let anchor: 'start' | 'middle' | 'end' = 'start';

            if (b.labelPosition === 'top-right') {
              labelX = x1 + boxW - 6;
              labelY = yTop + fontSize + 4;
              anchor = 'end';
            } else if (b.labelPosition === 'center') {
              labelX = x1 + boxW / 2;
              labelY = yMid + fontSize / 3;
              anchor = 'middle';
            } else if (b.labelPosition === 'bottom-left') {
              labelX = x1 + 6;
              labelY = yTop + boxHeight - 6;
              anchor = 'start';
            }

            const labelBadgeWidth = b.label ? b.label.length * (fontSize * 0.62) + 10 : 0;
            const labelBadgeX =
              anchor === 'middle'
                ? labelX - labelBadgeWidth / 2
                : anchor === 'end'
                ? labelX - labelBadgeWidth + 2
                : labelX - 4;

            return (
              <g
                key={b.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectId(b.id, 'box');
                }}
                className="cursor-pointer group"
              >
                <rect
                  x={x1}
                  y={yTop}
                  width={boxW}
                  height={boxHeight}
                  fill={fillColor}
                  fillOpacity={b.opacity ?? 0.14}
                  stroke={borderStyle === 'none' && !isSelected ? 'none' : strokeColor}
                  strokeWidth={borderW}
                  strokeDasharray={isSelected ? 'none' : getDashArray(borderStyle)}
                  rx="5"
                />
                {b.showMidLine && (
                  <g>
                    <line
                      x1={x1}
                      y1={yMid}
                      x2={x1 + boxW}
                      y2={yMid}
                      stroke={midColor}
                      strokeWidth="1.2"
                      strokeDasharray="4 2"
                    />
                    <text
                      x={x1 + boxW - 4}
                      y={yMid - 3}
                      fill={midColor}
                      fontSize="8.5"
                      fontFamily="JetBrains Mono, monospace"
                      textAnchor="end"
                    >
                      {b.midLineLabel || '50% EQ'}
                    </text>
                  </g>
                )}
                {b.label && b.textBgColor && (
                  <rect
                    x={labelBadgeX}
                    y={labelY - fontSize}
                    width={labelBadgeWidth}
                    height={fontSize + 5}
                    fill={b.textBgColor}
                    rx="2.5"
                  />
                )}
                {b.label && (
                  <text
                    x={labelX}
                    y={labelY}
                    fill={textColor}
                    fontSize={fontSize}
                    fontWeight="bold"
                    fontFamily="JetBrains Mono, monospace"
                    textAnchor={anchor}
                  >
                    {b.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* LAYER: Multi-Point Waves & Smooth Macro Curves (Polylines) */}
          {polylines.map((poly) => {
            if (poly.points.length < 2) return null;
            const coords = poly.points.map(pt => ({ x: indexToX(pt.index), y: priceToY(pt.price) }));
            const isSelected = selectedId === poly.id;
            const lineColor = poly.color || '#38BDF8';
            const strokeW = isSelected ? (poly.strokeWidth || 2.5) + 1 : (poly.strokeWidth || 2.5);
            const dash = getDashArray(poly.lineStyle || 'solid');
            const isSmooth = poly.curveType === 'smooth';
            const pathD = isSmooth
              ? buildSmoothCurvePath(coords)
              : `M ${coords.map(c => `${c.x},${c.y}`).join(' L ')}`;

            const firstPt = coords[0];

            return (
              <g
                key={poly.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectId(poly.id, 'polyline');
                }}
                className="cursor-pointer"
              >
                <path
                  d={pathD}
                  fill="none"
                  stroke={lineColor}
                  strokeWidth={strokeW}
                  strokeDasharray={dash}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {poly.label && (
                  <text
                    x={firstPt.x + 6}
                    y={firstPt.y - 10}
                    fill={poly.textColor || lineColor}
                    fontSize={poly.fontSize || 10.5}
                    fontWeight="bold"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {poly.label}
                  </text>
                )}
                {(poly.showDots || isSelected) && coords.map((pt, ptIdx) => (
                  <circle
                    key={`${poly.id}-pt-${ptIdx}`}
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected ? 5 : 3.2}
                    fill={lineColor}
                    stroke={isDarkMode ? '#000' : '#FFF'}
                    strokeWidth="1.5"
                    className={isSelected ? 'cursor-move' : ''}
                    onMouseDown={(e) => {
                      if (!isSelected || !onUpdatePolyline) return;
                      e.stopPropagation();
                      const handleMove = (moveEvt: MouseEvent) => {
                        const rect = svgRef.current?.getBoundingClientRect();
                        if (!rect) return;
                        const newIdx = xToIndex(moveEvt.clientX - rect.left);
                        const newPrice = yToPrice(moveEvt.clientY - rect.top);
                        const nextPts = poly.points.map((p, idx) =>
                          idx === ptIdx ? { index: newIdx, price: newPrice } : p
                        );
                        onUpdatePolyline({ ...poly, points: nextPts });
                      };
                      const handleUp = () => {
                        window.removeEventListener('mousemove', handleMove);
                        window.removeEventListener('mouseup', handleUp);
                      };
                      window.addEventListener('mousemove', handleMove);
                      window.addEventListener('mouseup', handleUp);
                    }}
                  />
                ))}
              </g>
            );
          })}

          {/* Draft Multi-Point Wave Preview */}
          {draftPoints.length > 0 && (
            <g pointerEvents="none">
              <polyline
                points={draftPoints.map(pt => `${indexToX(pt.index)},${priceToY(pt.price)}`).join(' ')}
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />
              {draftPoints.map((pt, i) => (
                <circle key={`draft-${i}`} cx={indexToX(pt.index)} cy={priceToY(pt.price)} r="4" fill="#10B981" />
              ))}
            </g>
          )}

          {/* LAYER: Position Tool (TradingView Long / Short Risk:Reward Box) */}
          {positions.map((pos) => {
            const x1 = indexToX(pos.startIndex) - 10;
            const x2 = indexToX(pos.endIndex) + 20;
            const yEntry = priceToY(pos.entryPrice);
            const yTarget = priceToY(pos.targetPrice);
            const yStop = priceToY(pos.stopPrice);

            const isLong = pos.type === 'long';
            const rewardPips = Math.abs(pos.targetPrice - pos.entryPrice);
            const riskPips = Math.abs(pos.entryPrice - pos.stopPrice);
            const rrRatio = riskPips > 0 ? (rewardPips / riskPips).toFixed(2) : '1.00';
            const isSelected = selectedId === pos.id;

            const topY = Math.min(yTarget, yEntry);
            const targetBoxHeight = Math.abs(yEntry - yTarget);
            const bottomY = Math.min(yEntry, yStop);
            const stopBoxHeight = Math.abs(yStop - yEntry);

            const targetColor = pos.targetColor || '#10B981';
            const targetTextColor = pos.targetTextColor || targetColor;
            const targetOpacity = pos.targetOpacity ?? 0.22;

            const stopColor = pos.stopColor || '#EF4444';
            const stopTextColor = pos.stopTextColor || stopColor;
            const stopOpacity = pos.stopOpacity ?? 0.22;

            const entryLineColor = pos.entryLineColor || (isDarkMode ? '#F8FAFC' : '#0F172A');
            const badgeBgColor = pos.badgeBgColor || (isDarkMode ? '#020617' : '#FFFFFF');
            const badgeTextColor = pos.badgeTextColor || '#0284C7';

            return (
              <g
                key={pos.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectId(pos.id, 'position');
                }}
                className="cursor-pointer"
              >
                <rect
                  x={x1}
                  y={isLong ? topY : yEntry}
                  width={x2 - x1}
                  height={targetBoxHeight}
                  fill={targetColor}
                  fillOpacity={targetOpacity}
                  stroke={targetColor}
                  strokeWidth={isSelected ? 2 : 1}
                />
                <text
                  x={x1 + 6}
                  y={(isLong ? topY : yEntry) + 14}
                  fill={targetTextColor}
                  fontSize="9.5"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="bold"
                >
                  {pos.label ? `${pos.label} • ` : ''}TP: {pos.targetPrice.toFixed(1)} (+{rewardPips.toFixed(1)})
                </text>

                <rect
                  x={x1}
                  y={isLong ? yEntry : bottomY}
                  width={x2 - x1}
                  height={stopBoxHeight}
                  fill={stopColor}
                  fillOpacity={stopOpacity}
                  stroke={stopColor}
                  strokeWidth={isSelected ? 2 : 1}
                />
                <text
                  x={x1 + 6}
                  y={(isLong ? yEntry : bottomY) + stopBoxHeight - 6}
                  fill={stopTextColor}
                  fontSize="9.5"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="bold"
                >
                  SL: {pos.stopPrice.toFixed(1)} (-{riskPips.toFixed(1)})
                </text>

                <line
                  x1={x1}
                  y1={yEntry}
                  x2={x2}
                  y2={yEntry}
                  stroke={entryLineColor}
                  strokeWidth="2"
                />

                <rect
                  x={x2 - 105}
                  y={yEntry - 12}
                  width="100"
                  height="22"
                  fill={badgeBgColor}
                  stroke={badgeTextColor}
                  strokeWidth="1.2"
                  rx="4"
                />
                <text
                  x={x2 - 55}
                  y={yEntry + 3}
                  fill={badgeTextColor}
                  fontSize="9.5"
                  fontWeight="900"
                  fontFamily="JetBrains Mono, monospace"
                  textAnchor="middle"
                >
                  R:R = 1 : {rrRatio}
                </text>
              </g>
            );
          })}

          {/* LAYER: Fibonacci Retracements */}
          {fibonaccis.map((fib) => {
            const xStart = indexToX(fib.startIndex) - 10;
            const xEnd = indexToX(fib.endIndex) + 35;
            const levels = [
              { pct: 0, label: '0.0%', color: '#94A3B8' },
              { pct: 0.236, label: '23.6%', color: '#64748B' },
              { pct: 0.382, label: '38.2%', color: '#38BDF8' },
              { pct: 0.5, label: '50.0% EQ', color: '#FACC15' },
              { pct: 0.618, label: '61.8% Golden', color: '#10B981' },
              { pct: 0.786, label: '78.6% OTE', color: '#A855F7' },
              { pct: 1.0, label: '100.0%', color: '#94A3B8' },
              { pct: 1.618, label: '161.8% Target', color: '#EC4899' }
            ];
            const isSelected = selectedId === fib.id;
            const showFill = fib.showFill !== false;
            const fillColor = fib.fillColor || '#10B981';
            const fillOpacity = fib.fillOpacity ?? 0.16;
            const showPrices = fib.showPrices !== false;

            return (
              <g
                key={fib.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectId(fib.id, 'fib');
                }}
                className="cursor-pointer"
              >
                {showFill && (() => {
                  const y618 = priceToY(fib.startPrice + (fib.endPrice - fib.startPrice) * 0.618);
                  const y786 = priceToY(fib.startPrice + (fib.endPrice - fib.startPrice) * 0.786);
                  const topY = Math.min(y618, y786);
                  const botY = Math.max(y618, y786);
                  return (
                    <rect
                      x={xStart}
                      y={topY}
                      width={xEnd - xStart}
                      height={botY - topY}
                      fill={fillColor}
                      fillOpacity={fillOpacity}
                      stroke="none"
                    />
                  );
                })()}

                {fib.label && (
                  <text
                    x={xStart + 4}
                    y={priceToY(fib.startPrice) - 5}
                    fill={fib.textColor || '#10B981'}
                    fontSize="9.5"
                    fontWeight="bold"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {fib.label}
                  </text>
                )}

                {levels.map((lvl) => {
                  const priceLevel = fib.startPrice + (fib.endPrice - fib.startPrice) * lvl.pct;
                  const y = priceToY(priceLevel);
                  const strokeCol = fib.lineColor || lvl.color;
                  const txtCol = fib.textColor || lvl.color;
                  const dash = fib.lineStyle
                    ? getDashArray(fib.lineStyle)
                    : (lvl.pct === 0.5 || lvl.pct === 0.618 ? 'none' : '4 3');

                  return (
                    <g key={`${fib.id}-lvl-${lvl.pct}`}>
                      <line
                        x1={xStart}
                        y1={y}
                        x2={xEnd}
                        y2={y}
                        stroke={strokeCol}
                        strokeWidth={isSelected ? 1.8 : 1.1}
                        strokeDasharray={dash}
                        strokeOpacity={0.85}
                      />
                      <text
                        x={xEnd + 4}
                        y={y + 3}
                        fill={txtCol}
                        fontSize="9"
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight="bold"
                      >
                        {lvl.label}{showPrices ? ` (${priceLevel.toFixed(1)})` : ''}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* LAYER: Trendlines with Custom Labels & Styling */}
          {trendlines.map((t) => {
            const x1 = indexToX(t.x1Index);
            const y1 = priceToY(t.y1Price);
            const x2 = indexToX(t.x2Index);
            const y2 = priceToY(t.y2Price);
            const isSelected = selectedId === t.id;

            const lineColor = t.color || '#FACC15';
            const strokeW = isSelected ? (t.strokeWidth || 2) + 1.2 : (t.strokeWidth || 2);
            const dash = getDashArray(t.lineStyle || 'solid');
            const fontSize = t.fontSize || 9.5;
            const textColor = t.textColor || lineColor;

            const align = t.labelAlignment || 'center';
            const labelX = align === 'start' ? x1 + 10 : align === 'end' ? x2 - 10 : (x1 + x2) / 2;
            const labelY = align === 'start' ? y1 - 8 : align === 'end' ? y2 - 8 : (y1 + y2) / 2 - 8;
            const pillW = t.label ? Math.max(32, t.label.length * (fontSize * 0.65) + 12) : 0;

            return (
              <g
                key={t.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectId(t.id, 'trendline');
                }}
                className="cursor-pointer"
              >
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={lineColor}
                  strokeWidth={strokeW}
                  strokeDasharray={dash}
                  strokeLinecap="round"
                />
                {(t.showDots !== false || isSelected) && (
                  <>
                    <circle cx={x1} cy={y1} r={isSelected ? 4.5 : 3} fill={lineColor} />
                    <circle cx={x2} cy={y2} r={isSelected ? 4.5 : 3} fill={lineColor} />
                  </>
                )}
                {t.label && (
                  <g>
                    {t.showTextBg !== false && (
                      <rect
                        x={labelX - pillW / 2}
                        y={labelY - fontSize}
                        width={pillW}
                        height={fontSize + 6}
                        fill={t.textBgColor || (isDarkMode ? '#090D16' : '#FFFFFF')}
                        stroke={lineColor}
                        strokeWidth="1"
                        rx="3"
                      />
                    )}
                    <text
                      x={labelX}
                      y={labelY}
                      fill={textColor}
                      fontSize={fontSize}
                      fontWeight="bold"
                      fontFamily="JetBrains Mono, monospace"
                      textAnchor="middle"
                    >
                      {t.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* LAYER: Curved & Straight Arrows */}
          {arrows.map((arr) => {
            const x1 = indexToX(arr.startIndex);
            const y1 = priceToY(arr.startPrice);
            const x2 = indexToX(arr.endIndex);
            const y2 = priceToY(arr.endPrice);
            const isSelected = selectedId === arr.id;
            const col = arr.color || '#FACC15';

            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2 - (arr.curved !== false ? (arr.curveOffset ?? 30) : 0);

            const pathD = arr.curved !== false
              ? `M ${x1},${y1} Q ${midX},${midY} ${x2},${y2}`
              : `M ${x1},${y1} L ${x2},${y2}`;

            // Angle for arrowhead
            const refX = arr.curved !== false ? midX : x1;
            const refY = arr.curved !== false ? midY : y1;
            const angle = Math.atan2(y2 - refY, x2 - refX) * (180 / Math.PI);

            return (
              <g
                key={arr.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectId(arr.id, 'arrow');
                }}
                className="cursor-pointer"
              >
                <path
                  d={pathD}
                  fill="none"
                  stroke={col}
                  strokeWidth={isSelected ? 3.2 : (arr.strokeWidth || 2.2)}
                  strokeDasharray={getDashArray(arr.lineStyle || 'dashed')}
                />
                <polygon
                  points="0,0 -9,-5 -9,5"
                  fill={col}
                  transform={`translate(${x2},${y2}) rotate(${angle})`}
                />
                {arr.label && (
                  <text
                    x={midX}
                    y={midY - 6}
                    fill={arr.textColor || col}
                    fontSize="9.5"
                    fontWeight="bold"
                    fontFamily="JetBrains Mono, monospace"
                    textAnchor="middle"
                  >
                    {arr.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* LAYER: Dynamic EMA Overlay Line */}
          {showEma && emaPoints.length > 1 && (
            <path
              d={`M ${emaPoints.map(p => `${p.x},${p.y}`).join(' L ')}`}
              fill="none"
              stroke="#0284C7"
              strokeWidth="2.2"
              strokeOpacity="0.85"
              strokeLinecap="round"
            />
          )}

          {/* LAYER: Candlesticks & Interactive Wicks */}
          {showCandles && candles.map((candle, idx) => {
            const x = indexToX(idx);
            const isBullish = candle.close >= candle.open;
            const bodyColor = candle.color || (isBullish ? '#10B981' : '#EF4444');
            const wickColor = candle.wickColor || bodyColor;
            const borderColor = candle.borderColor || candleBorderStroke;

            const yHigh = priceToY(candle.high);
            const yLow = priceToY(candle.low);
            const yOpen = priceToY(candle.open);
            const yClose = priceToY(candle.close);

            const bodyTop = Math.min(yOpen, yClose);
            const bodyHeight = Math.max(3, Math.abs(yClose - yOpen));
            const isSelected = selectedId === candle.id;

            return (
              <g
                key={candle.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectId(candle.id, 'candle');
                }}
                className="cursor-pointer group"
              >
                {isSelected && (
                  <rect
                    x={x - candleWidth / 2 - 3}
                    y={yHigh - 5}
                    width={candleWidth + 6}
                    height={yLow - yHigh + 10}
                    fill="rgba(56, 189, 248, 0.15)"
                    stroke="#38BDF8"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    rx="4"
                  />
                )}

                <line
                  x1={x}
                  y1={yHigh}
                  x2={x}
                  y2={bodyTop}
                  stroke={wickColor}
                  strokeWidth={isSelected ? 2.5 : 1.8}
                />

                <rect
                  x={x - candleWidth / 2}
                  y={bodyTop}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={bodyColor}
                  stroke={borderColor}
                  strokeWidth="1"
                  rx="1.5"
                />

                <line
                  x1={x}
                  y1={bodyTop + bodyHeight}
                  x2={x}
                  y2={yLow}
                  stroke={wickColor}
                  strokeWidth={isSelected ? 2.5 : 1.8}
                />

                {isSelected && (
                  <g>
                    <circle
                      cx={x}
                      cy={yHigh}
                      r="4"
                      fill="#38BDF8"
                      stroke="#000"
                      strokeWidth="1"
                      className="cursor-ns-resize"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        const handleMove = (moveEvt: MouseEvent) => {
                          const rect = svgRef.current?.getBoundingClientRect();
                          if (!rect) return;
                          const newPrice = yToPrice(moveEvt.clientY - rect.top);
                          if (newPrice >= Math.max(candle.open, candle.close)) {
                            onUpdateCandle({ ...candle, high: newPrice });
                          }
                        };
                        const handleUp = () => {
                          window.removeEventListener('mousemove', handleMove);
                          window.removeEventListener('mouseup', handleUp);
                        };
                        window.addEventListener('mousemove', handleMove);
                        window.addEventListener('mouseup', handleUp);
                      }}
                    />
                    <circle
                      cx={x}
                      cy={yLow}
                      r="4"
                      fill="#38BDF8"
                      stroke="#000"
                      strokeWidth="1"
                      className="cursor-ns-resize"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        const handleMove = (moveEvt: MouseEvent) => {
                          const rect = svgRef.current?.getBoundingClientRect();
                          if (!rect) return;
                          const newPrice = yToPrice(moveEvt.clientY - rect.top);
                          if (newPrice <= Math.min(candle.open, candle.close)) {
                            onUpdateCandle({ ...candle, low: newPrice });
                          }
                        };
                        const handleUp = () => {
                          window.removeEventListener('mousemove', handleMove);
                          window.removeEventListener('mouseup', handleUp);
                        };
                        window.addEventListener('mousemove', handleMove);
                        window.addEventListener('mouseup', handleUp);
                      }}
                    />
                  </g>
                )}
              </g>
            );
          })}

          {/* LAYER: Multi-Line Info Cards / Step Explanation Boxes */}
          {infoCards.map((card) => {
            const x = indexToX(card.candleIndex);
            const y = priceToY(card.price);
            const isSelected = selectedId === card.id;
            const cardW = card.width || 155;
            const lines = card.lines || [];
            const hasFooter = Boolean(card.footerBadge);
            const cardH = 30 + lines.length * 14 + (hasFooter ? 24 : 6);
            const accent = card.color || '#10B981';
            const bgCol = card.bgColor || accent;
            const bgOp = card.bgOpacity ?? 0.14;
            const bodyTextCol = card.textColor || (isDarkMode ? '#E2E8F0' : '#1E293B');

            return (
              <g
                key={card.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectId(card.id, 'infocard');
                }}
                onMouseDown={(e) => {
                  if (activeTool !== 'select' || !onUpdateInfoCard) return;
                  e.stopPropagation();
                  onSelectId(card.id, 'infocard');
                  const handleMove = (moveEvt: MouseEvent) => {
                    const rect = svgRef.current?.getBoundingClientRect();
                    if (!rect) return;
                    const newIdx = xToIndex(moveEvt.clientX - rect.left);
                    const newPrice = yToPrice(moveEvt.clientY - rect.top);
                    onUpdateInfoCard({ ...card, candleIndex: newIdx, price: newPrice });
                  };
                  const handleUp = () => {
                    window.removeEventListener('mousemove', handleMove);
                    window.removeEventListener('mouseup', handleUp);
                  };
                  window.addEventListener('mousemove', handleMove);
                  window.addEventListener('mouseup', handleUp);
                }}
                className="cursor-move"
              >
                {/* Base Card Shadow & Background */}
                <rect
                  x={x - cardW / 2}
                  y={y}
                  width={cardW}
                  height={cardH}
                  fill={isDarkMode ? '#0B1120' : '#FFFFFF'}
                  fillOpacity={0.92}
                  rx="6"
                />
                <rect
                  x={x - cardW / 2}
                  y={y}
                  width={cardW}
                  height={cardH}
                  fill={bgCol}
                  fillOpacity={bgOp}
                  stroke={accent}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  strokeDasharray={getDashArray(card.borderStyle || 'solid')}
                  rx="6"
                />

                {/* Step Circle Badge + Header Title */}
                {card.stepBadge ? (
                  <>
                    <circle cx={x - cardW / 2 + 16} cy={y + 16} r="8.5" fill={accent} />
                    <text
                      x={x - cardW / 2 + 16}
                      y={y + 19.5}
                      fill="#000000"
                      fontSize="9.5"
                      fontWeight="900"
                      fontFamily="JetBrains Mono, monospace"
                      textAnchor="middle"
                    >
                      {card.stepBadge}
                    </text>
                    <text
                      x={x - cardW / 2 + 30}
                      y={y + 19.5}
                      fill={accent}
                      fontSize="9.5"
                      fontWeight="900"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {card.title}
                    </text>
                  </>
                ) : (
                  <text
                    x={x - cardW / 2 + 10}
                    y={y + 19}
                    fill={accent}
                    fontSize="10"
                    fontWeight="900"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {card.title}
                  </text>
                )}

                {/* Explanation Lines */}
                {lines.map((lineText, idx) => (
                  <text
                    key={`${card.id}-ln-${idx}`}
                    x={x - cardW / 2 + 10}
                    y={y + 36 + idx * 13.5}
                    fill={bodyTextCol}
                    fontSize="8.8"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {lineText}
                  </text>
                ))}

                {/* Footer Pill Badge */}
                {card.footerBadge && (
                  <g>
                    <rect
                      x={x - cardW / 2 + 10}
                      y={y + cardH - 22}
                      width={cardW - 20}
                      height={16}
                      fill={accent}
                      fillOpacity={0.22}
                      rx="3"
                    />
                    <text
                      x={x}
                      y={y + cardH - 11}
                      fill={accent}
                      fontSize="8.5"
                      fontWeight="bold"
                      fontFamily="JetBrains Mono, monospace"
                      textAnchor="middle"
                    >
                      {card.footerBadge}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* LAYER: Volume Sub-Pane */}
          {showVolume && (
            <g transform={`translate(0, ${totalHeight - volumeHeight - legendHeight})`}>
              <line
                x1={padding.left}
                y1={0}
                x2={width - padding.right}
                y2={0}
                stroke={gridLineStroke}
                strokeWidth="1"
              />
              <text
                x={padding.left}
                y={11}
                fill={labelTextFill}
                fontSize="8.5"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="bold"
              >
                VOL (VSA Auction)
              </text>

              {candles.map((candle, idx) => {
                const x = indexToX(idx);
                const vol = candle.volume || 1000;
                const barH = Math.max(3, (vol / maxVolume) * (volumeHeight - 16));
                const isBull = candle.close >= candle.open;
                const barColor = candle.color
                  ? `${candle.color}73`
                  : isBull
                  ? 'rgba(16, 185, 129, 0.45)'
                  : 'rgba(239, 68, 68, 0.45)';

                return (
                  <rect
                    key={`vol-${candle.id}`}
                    x={x - candleWidth / 2 + 1}
                    y={volumeHeight - 6 - barH}
                    width={candleWidth - 2}
                    height={barH}
                    fill={barColor}
                    rx="1"
                  />
                );
              })}
            </g>
          )}

          {/* LAYER: Badges & Text Callouts */}
          {badges.map((badge) => {
            const x = indexToX(badge.candleIndex);
            const y = priceToY(badge.price);
            const isSelected = selectedId === badge.id;

            const fontSize = badge.fontSize || 9.5;
            const bgColor = badge.bgColor || badge.color || '#FACC15';
            const bgOpacity = badge.style === 'transparent' ? 0 : (badge.bgOpacity ?? (badge.style === 'outline' ? 0.12 : 1));
            const textColor = badge.textColor || (badge.style === 'outline' || badge.style === 'transparent' ? bgColor : '#000000');
            const borderColor = badge.borderColor || (badge.style === 'outline' ? bgColor : '#000000');
            const borderWidth = isSelected ? 2 : (badge.borderWidth ?? (badge.style === 'transparent' ? 0 : 1));
            const rx = badge.style === 'pill' ? 12 : 4;

            const badgeW = Math.max(42, (badge.text?.length || 1) * (fontSize * 0.65) + 16);
            const badgeH = Math.max(20, fontSize + 11);

            return (
              <g
                key={badge.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectId(badge.id, 'badge');
                }}
                onMouseDown={(e) => {
                  if (activeTool !== 'select' || !onUpdateBadge) return;
                  e.stopPropagation();
                  onSelectId(badge.id, 'badge');
                  const handleMove = (moveEvt: MouseEvent) => {
                    const rect = svgRef.current?.getBoundingClientRect();
                    if (!rect) return;
                    const newIdx = xToIndex(moveEvt.clientX - rect.left);
                    const newPrice = yToPrice(moveEvt.clientY - rect.top);
                    onUpdateBadge({ ...badge, candleIndex: newIdx, price: newPrice });
                  };
                  const handleUp = () => {
                    window.removeEventListener('mousemove', handleMove);
                    window.removeEventListener('mouseup', handleUp);
                  };
                  window.addEventListener('mousemove', handleMove);
                  window.addEventListener('mouseup', handleUp);
                }}
                className="cursor-move"
              >
                {badge.style === 'callout' && (
                  <polygon
                    points={`${x - 5},${y + badgeH / 2 - 1} ${x + 5},${y + badgeH / 2 - 1} ${x},${y + badgeH / 2 + 6}`}
                    fill={bgColor}
                    fillOpacity={bgOpacity}
                    stroke={borderColor}
                    strokeWidth={borderWidth}
                  />
                )}
                <rect
                  x={x - badgeW / 2}
                  y={y - badgeH / 2}
                  width={badgeW}
                  height={badgeH}
                  fill={bgColor}
                  fillOpacity={bgOpacity}
                  stroke={borderWidth > 0 ? borderColor : 'none'}
                  strokeWidth={borderWidth}
                  rx={rx}
                />
                <text
                  x={x}
                  y={y + fontSize * 0.34}
                  fill={textColor}
                  fontSize={fontSize}
                  fontWeight="900"
                  fontFamily="JetBrains Mono, monospace"
                  textAnchor="middle"
                >
                  {badge.text}
                </text>
              </g>
            );
          })}

          {/* LAYER: Bottom Custom Legend Bar (Like BTC.D & Altseason Index Diagram) */}
          {hasLegend && (
            <g transform={`translate(${padding.left}, ${totalHeight - 10})`}>
              {legends.map((item, idx) => {
                const offsetX = idx * 210;
                return (
                  <g key={item.id} transform={`translate(${offsetX}, 0)`}>
                    <circle cx="5" cy="-4" r="4.5" fill={item.color} />
                    <text
                      x="15"
                      y="0"
                      fill={isDarkMode ? '#94A3B8' : '#475569'}
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {item.label}
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* Interactive Crosshair Tracking Overlay */}
          {crosshair && (
            <g pointerEvents="none">
              <line
                x1={padding.left}
                y1={crosshair.y}
                x2={width - padding.right}
                y2={crosshair.y}
                stroke={isDarkMode ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.35)'}
                strokeDasharray="3 3"
                strokeWidth="1"
              />
              <rect
                x={width - padding.right + 2}
                y={crosshair.y - 10}
                width="58"
                height="20"
                fill="#0284C7"
                rx="3"
              />
              <text
                x={width - padding.right + 31}
                y={crosshair.y + 3.5}
                fill="#FFFFFF"
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                {crosshair.price.toFixed(1)}
              </text>
              <line
                x1={crosshair.x}
                y1={padding.top}
                x2={crosshair.x}
                y2={totalHeight - padding.bottom}
                stroke={isDarkMode ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.35)'}
                strokeDasharray="3 3"
                strokeWidth="1"
              />
            </g>
          )}

          {/* Active Tool Drawing Preview Prompt */}
          {drawingStart && (
            <text
              x={padding.left + 15}
              y={padding.top - 15}
              fill="#0284C7"
              fontSize="11"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="bold"
            >
              Titik awal terpilih: Klik titik kedua pada chart untuk menyelesaikan {activeTool.toUpperCase()}...
            </text>
          )}
        </svg>
      </div>
    </div>
  );
};
