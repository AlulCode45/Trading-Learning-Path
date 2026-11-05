import React, { useMemo } from 'react';
import { CustomChartConfig } from '../../types/chartBuilderTypes';

interface CustomChartRendererProps {
  config: CustomChartConfig;
  title?: string;
  className?: string;
}

export const CustomChartRenderer: React.FC<CustomChartRendererProps> = ({
  config,
  title,
  className = ''
}) => {
  const candles = config.candles || [];
  const fibonaccis = config.fibonaccis || [];
  const boxes = config.boxes || [];
  const trendlines = config.trendlines || [];
  const badges = config.badges || [];

  const width = Math.max(680, candles.length * 52 + 120);
  const height = 360;
  const padding = { top: 35, right: 65, bottom: 40, left: 35 };

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

  const priceToY = (price: number): number => {
    const usableHeight = height - padding.top - padding.bottom;
    const ratio = (price - minPrice) / (maxPrice - minPrice || 1);
    return height - padding.bottom - ratio * usableHeight;
  };

  const indexToX = (index: number): number => {
    const usableWidth = width - padding.left - padding.right;
    const step = usableWidth / Math.max(1, candles.length);
    return padding.left + index * step + step / 2;
  };

  const priceGridLevels = useMemo(() => {
    const count = 5;
    const step = (maxPrice - minPrice) / count;
    return Array.from({ length: count + 1 }, (_, i) => Math.round(minPrice + i * step));
  }, [minPrice, maxPrice]);

  return (
    <div className={`bg-[#070A12] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-4 my-5 overflow-x-auto ${className}`}>
      {/* Title Bar */}
      <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800 text-xs font-mono">
        <span className="text-[#10B981] font-bold uppercase tracking-wider flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>{title || config.title || 'Interactive Custom Candlestick Model'}</span>
        </span>
        <span className="text-[10px] bg-slate-900 border border-slate-700 text-slate-300 px-2 py-0.5 rounded">
          Custom Canvas Model ({candles.length} Candles)
        </span>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: `${width}px`, height: `${height}px` }}
        className="block select-none"
      >
        <defs>
          <pattern id="viewer-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width={width} height={height} fill="#070A12" />
        <rect width={width} height={height} fill="url(#viewer-grid)" />

        {/* Horizontal Price Lines & Labels */}
        {priceGridLevels.map((price) => {
          const y = priceToY(price);
          return (
            <g key={`grid-p-${price}`}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="rgba(148, 163, 184, 0.08)"
                strokeDasharray="4 4"
              />
              <text
                x={width - padding.right + 6}
                y={y + 4}
                fill="#64748B"
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
              >
                {price.toFixed(1)}
              </text>
            </g>
          );
        })}

        {/* Box Drawings */}
        {boxes.map((b) => {
          const x1 = indexToX(b.startIndex) - 16;
          const x2 = indexToX(b.endIndex) + 16;
          const yTop = priceToY(b.topPrice);
          const yBottom = priceToY(b.bottomPrice);
          return (
            <g key={b.id}>
              <rect
                x={x1}
                y={yTop}
                width={Math.max(25, x2 - x1)}
                height={Math.max(3, yBottom - yTop)}
                fill={b.color}
                fillOpacity={b.opacity || 0.18}
                stroke={b.color}
                strokeWidth="1.2"
                strokeDasharray="3 3"
                rx="3"
              />
              <text
                x={x1 + 6}
                y={yTop + 13}
                fill={b.color}
                fontSize="9.5"
                fontWeight="bold"
                fontFamily="JetBrains Mono, monospace"
              >
                {b.label}
              </text>
            </g>
          );
        })}

        {/* Fibonacci Retracements */}
        {fibonaccis.map((fib) => {
          const xStart = indexToX(fib.startIndex) - 10;
          const xEnd = indexToX(fib.endIndex) + 30;
          const levels = [
            { pct: 0, label: '0.0%', color: '#94A3B8' },
            { pct: 0.382, label: '38.2%', color: '#38BDF8' },
            { pct: 0.5, label: '50.0% EQ', color: '#FACC15' },
            { pct: 0.618, label: '61.8%', color: '#10B981' },
            { pct: 0.786, label: '78.6% OTE', color: '#A855F7' },
            { pct: 1.0, label: '100.0%', color: '#94A3B8' }
          ];

          const y618 = priceToY(fib.startPrice + (fib.endPrice - fib.startPrice) * 0.618);
          const y786 = priceToY(fib.startPrice + (fib.endPrice - fib.startPrice) * 0.786);

          return (
            <g key={fib.id}>
              {/* Golden Pocket Shade */}
              <rect
                x={xStart}
                y={Math.min(y618, y786)}
                width={xEnd - xStart}
                height={Math.abs(y786 - y618)}
                fill="rgba(16, 185, 129, 0.14)"
              />
              {levels.map((lvl) => {
                const p = fib.startPrice + (fib.endPrice - fib.startPrice) * lvl.pct;
                const y = priceToY(p);
                return (
                  <g key={`${fib.id}-lvl-${lvl.pct}`}>
                    <line
                      x1={xStart}
                      y1={y}
                      x2={xEnd}
                      y2={y}
                      stroke={lvl.color}
                      strokeWidth="1"
                      strokeDasharray={lvl.pct === 0.5 || lvl.pct === 0.618 ? 'none' : '3 3'}
                    />
                    <text
                      x={xEnd + 4}
                      y={y + 3}
                      fill={lvl.color}
                      fontSize="8.5"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                    >
                      {lvl.label}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Trendlines */}
        {trendlines.map((t) => {
          const x1 = indexToX(t.x1Index);
          const y1 = priceToY(t.y1Price);
          const x2 = indexToX(t.x2Index);
          const y2 = priceToY(t.y2Price);
          return (
            <g key={t.id}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={t.color || '#FACC15'}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx={x1} cy={y1} r="3" fill={t.color || '#FACC15'} />
              <circle cx={x2} cy={y2} r="3" fill={t.color || '#FACC15'} />
            </g>
          );
        })}

        {/* Candlesticks */}
        {candles.map((candle, idx) => {
          const x = indexToX(idx);
          const candleWidth = 22;
          const isBullish = candle.close >= candle.open;
          const bodyColor = candle.color || (isBullish ? '#10B981' : '#F43F5E');

          const yHigh = priceToY(candle.high);
          const yLow = priceToY(candle.low);
          const yOpen = priceToY(candle.open);
          const yClose = priceToY(candle.close);

          const bodyTop = Math.min(yOpen, yClose);
          const bodyHeight = Math.max(3, Math.abs(yClose - yOpen));

          return (
            <g key={candle.id}>
              {/* Upper Wick */}
              <line x1={x} y1={yHigh} x2={x} y2={bodyTop} stroke={bodyColor} strokeWidth="1.8" />
              {/* Real Body */}
              <rect
                x={x - candleWidth / 2}
                y={bodyTop}
                width={candleWidth}
                height={bodyHeight}
                fill={bodyColor}
                stroke="#000"
                strokeWidth="1.2"
                rx="2"
              />
              {/* Lower Wick */}
              <line x1={x} y1={bodyTop + bodyHeight} x2={x} y2={yLow} stroke={bodyColor} strokeWidth="1.8" />
              {/* Label */}
              {candle.label && (
                <text
                  x={x}
                  y={height - padding.bottom + 16}
                  fill="#94A3B8"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                  textAnchor="middle"
                >
                  {candle.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Badges */}
        {badges.map((badge) => {
          const x = indexToX(badge.candleIndex);
          const y = priceToY(badge.price);
          return (
            <g key={badge.id}>
              <rect
                x={x - 22}
                y={y - 11}
                width="44"
                height="20"
                fill={badge.color || '#FACC15'}
                stroke="#000"
                strokeWidth="1"
                rx="4"
              />
              <text
                x={x}
                y={y + 3}
                fill="#000"
                fontSize="9"
                fontWeight="900"
                fontFamily="JetBrains Mono, monospace"
                textAnchor="middle"
              >
                {badge.text}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
