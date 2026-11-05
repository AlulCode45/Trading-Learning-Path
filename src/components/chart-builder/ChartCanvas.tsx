import React, { useRef, useState, useMemo } from 'react';
import { 
  CustomCandle, 
  FibonacciDrawing, 
  BoxDrawing, 
  TrendlineDrawing, 
  TextBadgeAnnotation 
} from '../../types/chartBuilderTypes';

interface ChartCanvasProps {
  candles: CustomCandle[];
  fibonaccis: FibonacciDrawing[];
  boxes: BoxDrawing[];
  trendlines: TrendlineDrawing[];
  badges: TextBadgeAnnotation[];
  selectedId: string | null;
  onSelectId: (id: string | null, type: 'candle' | 'fib' | 'box' | 'trendline' | 'badge') => void;
  onUpdateCandle: (candle: CustomCandle) => void;
  activeTool: 'select' | 'candle' | 'fibonacci' | 'box' | 'trendline' | 'badge';
  onAddAnnotation: (type: 'fibonacci' | 'box' | 'trendline' | 'badge', payload: any) => void;
}

export const ChartCanvas: React.FC<ChartCanvasProps> = ({
  candles,
  fibonaccis,
  boxes,
  trendlines,
  badges,
  selectedId,
  onSelectId,
  onUpdateCandle,
  activeTool,
  onAddAnnotation
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Drawing state for interactive tools (Fibonacci / Trendline / Box)
  const [drawingStart, setDrawingStart] = useState<{ xIndex: number; price: number } | null>(null);

  // Coordinate Calculation & Bounds
  const width = Math.max(780, candles.length * 64 + 140);
  const height = 440;
  const padding = { top: 40, right: 70, bottom: 50, left: 40 };

  const { minPrice, maxPrice } = useMemo(() => {
    if (candles.length === 0) return { minPrice: 60, maxPrice: 180 };
    let min = Infinity;
    let max = -Infinity;
    for (const c of candles) {
      if (c.low < min) min = c.low;
      if (c.high > max) max = c.high;
    }
    // Expand buffer
    const range = Math.max(20, max - min);
    return {
      minPrice: Math.floor(min - range * 0.15),
      maxPrice: Math.ceil(max + range * 0.15)
    };
  }, [candles]);

  const priceToY = (price: number): number => {
    const usableHeight = height - padding.top - padding.bottom;
    const ratio = (price - minPrice) / (maxPrice - minPrice || 1);
    return height - padding.bottom - ratio * usableHeight;
  };

  const yToPrice = (y: number): number => {
    const usableHeight = height - padding.top - padding.bottom;
    const ratio = (height - padding.bottom - y) / usableHeight;
    return Math.round(minPrice + ratio * (maxPrice - minPrice));
  };

  const indexToX = (index: number): number => {
    const usableWidth = width - padding.left - padding.right;
    const step = usableWidth / Math.max(1, candles.length);
    return padding.left + index * step + step / 2;
  };

  const xToIndex = (x: number): number => {
    const usableWidth = width - padding.left - padding.right;
    const step = usableWidth / Math.max(1, candles.length);
    const raw = (x - padding.left) / step;
    return Math.max(0, Math.min(candles.length - 1, Math.floor(raw)));
  };

  // Price Grid Levels
  const priceGridLevels = useMemo(() => {
    const count = 6;
    const step = (maxPrice - minPrice) / count;
    return Array.from({ length: count + 1 }, (_, i) => Math.round(minPrice + i * step));
  }, [minPrice, maxPrice]);

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
        text: 'BOS'
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
          color: '#38BDF8'
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

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-300 dark:border-zinc-800 bg-[#060910] shadow-inner select-none">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: `${width}px`, height: `${height}px` }}
        onClick={handleSvgClick}
        className="cursor-crosshair block"
      >
        <defs>
          <pattern id="canvas-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Background Grid */}
        <rect width={width} height={height} fill="#060910" />
        <rect width={width} height={height} fill="url(#canvas-grid)" />

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
                stroke="rgba(148, 163, 184, 0.12)"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <text
                x={width - padding.right + 8}
                y={y + 4}
                fill="#64748B"
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
                y2={height - padding.bottom}
                stroke="rgba(148, 163, 184, 0.06)"
                strokeDasharray="2 4"
              />
              <text
                x={x}
                y={height - padding.bottom + 18}
                fill="#64748B"
                fontSize="10"
                fontFamily="JetBrains Mono, monospace"
                textAnchor="middle"
              >
                {c.label || `T${idx + 1}`}
              </text>
            </g>
          );
        })}

        {/* LAYER: Box Drawings (Order Block, FVG, Supply/Demand) */}
        {boxes.map((b) => {
          const x1 = indexToX(b.startIndex) - 20;
          const x2 = indexToX(b.endIndex) + 20;
          const yTop = priceToY(b.topPrice);
          const yBottom = priceToY(b.bottomPrice);
          const boxHeight = Math.max(4, yBottom - yTop);
          const isSelected = selectedId === b.id;

          return (
            <g
              key={b.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectId(b.id, 'box');
              }}
              className="cursor-pointer"
            >
              <rect
                x={x1}
                y={yTop}
                width={Math.max(30, x2 - x1)}
                height={boxHeight}
                fill={b.color}
                fillOpacity={b.opacity || 0.18}
                stroke={b.color}
                strokeWidth={isSelected ? 2.5 : 1.2}
                strokeDasharray={isSelected ? 'none' : '3 3'}
                rx="3"
              />
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

        {/* LAYER: Fibonacci Retracements */}
        {fibonaccis.map((fib) => {
          const xStart = indexToX(fib.startIndex) - 15;
          const xEnd = indexToX(fib.endIndex) + 40;
          const levels = [
            { pct: 0, label: '0.0%', color: '#94A3B8' },
            { pct: 0.382, label: '38.2%', color: '#38BDF8' },
            { pct: 0.5, label: '50.0% EQ', color: '#FACC15' },
            { pct: 0.618, label: '61.8% Golden', color: '#10B981' },
            { pct: 0.786, label: '78.6% OTE', color: '#A855F7' },
            { pct: 1.0, label: '100.0%', color: '#94A3B8' }
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
              {/* OTE Golden Zone Shading (0.618 to 0.786) */}
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
                    fill="rgba(16, 185, 129, 0.15)"
                    stroke="none"
                  />
                );
              })()}

              {/* Fibonacci Level Lines */}
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
                      strokeOpacity={0.8}
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
              <circle cx={x1} cy={y1} r={isSelected ? 4 : 3} fill={t.color || '#FACC15'} />
              <circle cx={x2} cy={y2} r={isSelected ? 4 : 3} fill={t.color || '#FACC15'} />
            </g>
          );
        })}

        {/* LAYER: Candlesticks & Interactive Wicks */}
        {candles.map((candle, idx) => {
          const x = indexToX(idx);
          const candleWidth = 26;
          const isBullish = candle.close >= candle.open;
          const bodyColor = candle.color || (isBullish ? '#10B981' : '#F43F5E');

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
                  x={x - candleWidth / 2 - 4}
                  y={yHigh - 6}
                  width={candleWidth + 8}
                  height={yLow - yHigh + 12}
                  fill="rgba(56, 189, 248, 0.1)"
                  stroke="#38BDF8"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  rx="6"
                />
              )}

              {/* Upper Wick */}
              <line
                x1={x}
                y1={yHigh}
                x2={x}
                y2={bodyTop}
                stroke={bodyColor}
                strokeWidth={isSelected ? 2.5 : 2}
              />

              {/* Real Body */}
              <rect
                x={x - candleWidth / 2}
                y={bodyTop}
                width={candleWidth}
                height={bodyHeight}
                fill={bodyColor}
                stroke={isSelected ? '#FFFFFF' : '#000000'}
                strokeWidth="1.2"
                rx="2"
              />

              {/* Lower Wick */}
              <line
                x1={x}
                y1={bodyTop + bodyHeight}
                x2={x}
                y2={yLow}
                stroke={bodyColor}
                strokeWidth={isSelected ? 2.5 : 2}
              />

              {/* Active Resize Handles if selected */}
              {isSelected && (
                <g>
                  {/* High Handle */}
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
                  {/* Low Handle */}
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

        {/* LAYER: Badges & Text Callouts (BOS, CHoCH, Liquidity) */}
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
                y={y - 12}
                width="48"
                height="22"
                fill={badge.color || '#FACC15'}
                stroke="#000"
                strokeWidth={isSelected ? 2 : 1}
                rx="4"
              />
              <text
                x={x}
                y={y + 3}
                fill="#000000"
                fontSize="10"
                fontWeight="900"
                fontFamily="JetBrains Mono, monospace"
                textAnchor="middle"
              >
                {badge.text}
              </text>
            </g>
          );
        })}

        {/* Active Tool Drawing Preview Prompt */}
        {drawingStart && (
          <text
            x={padding.left + 15}
            y={padding.top - 15}
            fill="#38BDF8"
            fontSize="11"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="bold"
          >
            Titik awal terpilih: Klik titik kedua pada chart untuk menyelesaikan {activeTool.toUpperCase()}...
          </text>
        )}
      </svg>
    </div>
  );
};
