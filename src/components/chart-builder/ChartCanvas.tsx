import React, { useRef, useState, useMemo, useEffect } from 'react';
import { 
  CustomCandle, 
  FibonacciDrawing, 
  BoxDrawing, 
  TrendlineDrawing, 
  TextBadgeAnnotation,
  PositionDrawing,
  PolylineDrawing
} from '../../types/chartBuilderTypes';

interface ChartCanvasProps {
  candles: CustomCandle[];
  fibonaccis: FibonacciDrawing[];
  boxes: BoxDrawing[];
  positions: PositionDrawing[];
  trendlines: TrendlineDrawing[];
  polylines: PolylineDrawing[];
  badges: TextBadgeAnnotation[];
  showVolume?: boolean;
  showEma?: boolean;
  emaPeriod?: number;
  isDarkMode?: boolean;
  candleSpacing?: 'compact' | 'normal' | 'wide';
  selectedId: string | null;
  onSelectId: (id: string | null, type: 'candle' | 'fib' | 'box' | 'position' | 'trendline' | 'polyline' | 'badge') => void;
  onUpdateCandle: (candle: CustomCandle) => void;
  activeTool: 'select' | 'candle' | 'fibonacci' | 'box' | 'position-long' | 'position-short' | 'trendline' | 'polyline' | 'badge';
  onAddAnnotation: (type: string, payload: any) => void;
}

export const ChartCanvas: React.FC<ChartCanvasProps> = ({
  candles,
  fibonaccis,
  boxes,
  positions,
  trendlines,
  polylines,
  badges,
  showVolume = true,
  showEma = true,
  emaPeriod = 9,
  isDarkMode = true,
  candleSpacing = 'normal',
  selectedId,
  onSelectId,
  onUpdateCandle,
  activeTool,
  onAddAnnotation
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Crosshair state
  const [crosshair, setCrosshair] = useState<{ x: number; y: number; price: number; index: number } | null>(null);

  // Tool drawing state (for 2-point tools like Fib, Box, Trendline, Position)
  const [drawingStart, setDrawingStart] = useState<{ xIndex: number; price: number } | null>(null);

  // Spacing Configuration: Proporsional & Rapat seperti TradingView
  const candleStep = candleSpacing === 'compact' ? 26 : candleSpacing === 'wide' ? 44 : 34;
  const candleWidth = candleSpacing === 'compact' ? 14 : candleSpacing === 'wide' ? 24 : 18;

  // Coordinate Calculation & Bounds
  const padding = { top: 40, right: 85, bottom: showVolume ? 105 : 45, left: 45 };
  const totalHeight = 480;
  const volumeHeight = showVolume ? 65 : 0;

  // Lebar kanvas bertambah secara dinamis seiring bertambahnya candle
  const width = Math.max(840, padding.left + candles.length * candleStep + padding.right + 80);

  // Auto-scroll ke ujung kanan saat candle baru bertambah
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollWidth,
        behavior: 'smooth'
      });
    }
  }, [candles.length]);

  const { minPrice, maxPrice } = useMemo(() => {
    if (candles.length === 0) return { minPrice: 60, maxPrice: 180 };
    let min = Infinity;
    let max = -Infinity;
    for (const c of candles) {
      if (c.low < min) min = c.low;
      if (c.high > max) max = c.high;
    }
    const range = Math.max(20, max - min);
    return {
      minPrice: Math.floor(min - range * 0.15),
      maxPrice: Math.ceil(max + range * 0.15)
    };
  }, [candles]);

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
    return Math.max(0, Math.min(candles.length - 1, Math.floor(raw)));
  };

  // Price Grid Levels
  const priceGridLevels = useMemo(() => {
    const count = 6;
    const step = (maxPrice - minPrice) / count;
    return Array.from({ length: count + 1 }, (_, i) => Math.round(minPrice + i * step));
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
        color: '#FACC15'
      });
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
          endIndex: Math.max(drawingStart.xIndex, xIdx)
        });
      } else if (activeTool === 'box') {
        onAddAnnotation('box', {
          startIndex: Math.min(drawingStart.xIndex, xIdx),
          endIndex: Math.max(drawingStart.xIndex, xIdx),
          topPrice: Math.max(drawingStart.price, clickedPrice),
          bottomPrice: Math.min(drawingStart.price, clickedPrice),
          label: 'Order Block (OB)',
          color: '#38BDF8',
          showMidLine: true
        });
      } else if (activeTool === 'position-long') {
        const entry = drawingStart.price;
        const target = Math.max(entry + 25, clickedPrice);
        const stop = Math.min(entry - 10, clickedPrice < entry ? clickedPrice : entry - 10);
        onAddAnnotation('position', {
          type: 'long',
          entryPrice: entry,
          targetPrice: target,
          stopPrice: stop,
          startIndex: Math.min(drawingStart.xIndex, xIdx),
          endIndex: Math.max(drawingStart.xIndex + 3, xIdx)
        });
      } else if (activeTool === 'position-short') {
        const entry = drawingStart.price;
        const target = Math.min(entry - 25, clickedPrice);
        const stop = Math.max(entry + 10, clickedPrice > entry ? clickedPrice : entry + 10);
        onAddAnnotation('position', {
          type: 'short',
          entryPrice: entry,
          targetPrice: target,
          stopPrice: stop,
          startIndex: Math.min(drawingStart.xIndex, xIdx),
          endIndex: Math.max(drawingStart.xIndex + 3, xIdx)
        });
      } else if (activeTool === 'trendline') {
        onAddAnnotation('trendline', {
          x1Index: drawingStart.xIndex,
          y1Price: drawingStart.price,
          x2Index: xIdx,
          y2Price: clickedPrice,
          color: '#FACC15'
        });
      }
      setDrawingStart(null);
    }
  };

  // Scroll Navigators
  const handleScroll = (direction: 'left' | 'right' | 'end' | 'start') => {
    if (!containerRef.current) return;
    if (direction === 'left') {
      containerRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    } else if (direction === 'right') {
      containerRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    } else if (direction === 'end') {
      containerRef.current.scrollTo({ left: containerRef.current.scrollWidth, behavior: 'smooth' });
    } else {
      containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex flex-col space-y-2">
      {/* Scroll Navigation Header Bar */}
      <div className="flex items-center justify-between text-xs font-mono px-1">
        <span className="text-[11px] text-slate-500 dark:text-zinc-400">
          Kanvas ({candles.length} Bar • Lebar: {width}px)
        </span>
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
            title="Ke Candle Terbaru"
          >
            Terbaru ⏭
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
                  {price.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Vertical Candle Timeline Grid */}
          {candles.map((c, idx) => {
            const x = indexToX(idx);
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
                  fill={labelTextFill}
                  fontSize="9.5"
                  fontFamily="JetBrains Mono, monospace"
                  textAnchor="middle"
                >
                  {c.label || `T${idx + 1}`}
                </text>
              </g>
            );
          })}

          {/* LAYER: Box Drawings (Order Block, FVG, Supply/Demand with Mid-line) */}
          {boxes.map((b) => {
            const x1 = indexToX(b.startIndex) - 12;
            const x2 = indexToX(b.endIndex) + 12;
            const yTop = priceToY(b.topPrice);
            const yBottom = priceToY(b.bottomPrice);
            const boxHeight = Math.max(4, yBottom - yTop);
            const yMid = yTop + boxHeight / 2;
            const isSelected = selectedId === b.id;

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
                  width={Math.max(25, x2 - x1)}
                  height={boxHeight}
                  fill={b.color}
                  fillOpacity={b.opacity || 0.18}
                  stroke={b.color}
                  strokeWidth={isSelected ? 2.5 : 1.2}
                  strokeDasharray={isSelected ? 'none' : '3 3'}
                  rx="3"
                />
                {b.showMidLine && (
                  <g>
                    <line
                      x1={x1}
                      y1={yMid}
                      x2={x2}
                      y2={yMid}
                      stroke={b.color}
                      strokeWidth="1.2"
                      strokeDasharray="4 2"
                    />
                    <text
                      x={x2 - 4}
                      y={yMid - 3}
                      fill={b.color}
                      fontSize="8.5"
                      fontFamily="JetBrains Mono, monospace"
                      textAnchor="end"
                    >
                      50% EQ
                    </text>
                  </g>
                )}
                <text
                  x={x1 + 6}
                  y={yTop + 14}
                  fill={b.color}
                  fontSize="10"
                  fontWeight="bold"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {b.label}
                </text>
              </g>
            );
          })}

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

            return (
              <g
                key={pos.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectId(pos.id, 'position');
                }}
                className="cursor-pointer"
              >
                {/* Target / Reward Box (Green) */}
                <rect
                  x={x1}
                  y={isLong ? topY : yEntry}
                  width={x2 - x1}
                  height={targetBoxHeight}
                  fill="rgba(16, 185, 129, 0.22)"
                  stroke="#10B981"
                  strokeWidth={isSelected ? 2 : 1}
                />
                <text
                  x={x1 + 6}
                  y={(isLong ? topY : yEntry) + 14}
                  fill="#10B981"
                  fontSize="9.5"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="bold"
                >
                  TP: {pos.targetPrice.toFixed(1)} (+{rewardPips.toFixed(1)} pts)
                </text>

                {/* Stop / Risk Box (Red) */}
                <rect
                  x={x1}
                  y={isLong ? yEntry : bottomY}
                  width={x2 - x1}
                  height={stopBoxHeight}
                  fill="rgba(239, 68, 68, 0.22)"
                  stroke="#EF4444"
                  strokeWidth={isSelected ? 2 : 1}
                />
                <text
                  x={x1 + 6}
                  y={(isLong ? yEntry : bottomY) + stopBoxHeight - 6}
                  fill="#EF4444"
                  fontSize="9.5"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="bold"
                >
                  SL: {pos.stopPrice.toFixed(1)} (-{riskPips.toFixed(1)} pts)
                </text>

                {/* Center Entry Line */}
                <line
                  x1={x1}
                  y1={yEntry}
                  x2={x2}
                  y2={yEntry}
                  stroke={isDarkMode ? '#F8FAFC' : '#0F172A'}
                  strokeWidth="2"
                />

                {/* Risk:Reward Ratio Floating Badge */}
                <rect
                  x={x2 - 105}
                  y={yEntry - 12}
                  width="100"
                  height="22"
                  fill={isDarkMode ? '#020617' : '#FFFFFF'}
                  stroke="#38BDF8"
                  strokeWidth="1.2"
                  rx="4"
                />
                <text
                  x={x2 - 55}
                  y={yEntry + 3}
                  fill="#0284C7"
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

            return (
              <g
                key={fib.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectId(fib.id, 'fib');
                }}
                className="cursor-pointer"
              >
                {/* OTE Golden Zone Shading */}
                {(() => {
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
                      fill="rgba(16, 185, 129, 0.16)"
                      stroke="none"
                    />
                  );
                })()}

                {levels.map((lvl) => {
                  const priceLevel = fib.startPrice + (fib.endPrice - fib.startPrice) * lvl.pct;
                  const y = priceToY(priceLevel);
                  return (
                    <g key={`${fib.id}-lvl-${lvl.pct}`}>
                      <line
                        x1={xStart}
                        y1={y}
                        x2={xEnd}
                        y2={y}
                        stroke={lvl.color}
                        strokeWidth={isSelected ? 1.8 : 1}
                        strokeDasharray={lvl.pct === 0.5 || lvl.pct === 0.618 ? 'none' : '4 3'}
                        strokeOpacity={0.85}
                      />
                      <text
                        x={xEnd + 4}
                        y={y + 3}
                        fill={lvl.color}
                        fontSize="9"
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight="bold"
                      >
                        {lvl.label} ({priceLevel.toFixed(1)})
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* LAYER: Trendlines */}
          {trendlines.map((t) => {
            const x1 = indexToX(t.x1Index);
            const y1 = priceToY(t.y1Price);
            const x2 = indexToX(t.x2Index);
            const y2 = priceToY(t.y2Price);
            const isSelected = selectedId === t.id;

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
                  stroke={t.color || '#FACC15'}
                  strokeWidth={isSelected ? 3.5 : 2}
                  strokeLinecap="round"
                />
                <circle cx={x1} cy={y1} r={isSelected ? 4.5 : 3} fill={t.color || '#FACC15'} />
                <circle cx={x2} cy={y2} r={isSelected ? 4.5 : 3} fill={t.color || '#FACC15'} />
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
          {candles.map((candle, idx) => {
            const x = indexToX(idx);
            const isBullish = candle.close >= candle.open;
            const bodyColor = candle.color || (isBullish ? '#10B981' : '#EF4444');

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
                {/* Selection Halo */}
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

                {/* Upper Wick */}
                <line
                  x1={x}
                  y1={yHigh}
                  x2={x}
                  y2={bodyTop}
                  stroke={bodyColor}
                  strokeWidth={isSelected ? 2.5 : 1.8}
                />

                {/* Real Body */}
                <rect
                  x={x - candleWidth / 2}
                  y={bodyTop}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={bodyColor}
                  stroke={candleBorderStroke}
                  strokeWidth="1"
                  rx="1.5"
                />

                {/* Lower Wick */}
                <line
                  x1={x}
                  y1={bodyTop + bodyHeight}
                  x2={x}
                  y2={yLow}
                  stroke={bodyColor}
                  strokeWidth={isSelected ? 2.5 : 1.8}
                />

                {/* Active Resize Handles if selected */}
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

          {/* LAYER: Volume Sub-Pane */}
          {showVolume && (
            <g transform={`translate(0, ${totalHeight - volumeHeight})`}>
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
                const barColor = isBull ? 'rgba(16, 185, 129, 0.45)' : 'rgba(239, 68, 68, 0.45)';

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

            return (
              <g
                key={badge.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectId(badge.id, 'badge');
                }}
                className="cursor-pointer"
              >
                <rect
                  x={x - 24}
                  y={y - 11}
                  width="48"
                  height="20"
                  fill={badge.color || '#FACC15'}
                  stroke="#000"
                  strokeWidth={isSelected ? 2 : 1}
                  rx="3"
                />
                <text
                  x={x}
                  y={y + 3}
                  fill="#000000"
                  fontSize="9.5"
                  fontWeight="900"
                  fontFamily="JetBrains Mono, monospace"
                  textAnchor="middle"
                >
                  {badge.text}
                </text>
              </g>
            );
          })}

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
