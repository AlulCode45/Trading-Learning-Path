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
  const positions = config.positions || [];
  const trendlines = config.trendlines || [];
  const badges = config.badges || [];
  const showVolume = config.showVolume !== false;
  const showEma = config.showEma !== false;
  const emaPeriod = config.emaPeriod || 9;

  const width = Math.max(760, candles.length * 58 + 140);
  const totalHeight = 420;
  const volumeHeight = showVolume ? 60 : 0;
  const padding = { top: 35, right: 75, bottom: 35 + volumeHeight, left: 35 };

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

  // Exponential Moving Average (EMA) Points
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
  }, [candles, showEma, emaPeriod, minPrice, maxPrice]);

  return (
    <div className={`bg-[#070A12] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl p-4 my-5 overflow-x-auto ${className}`}>
      {/* Title Bar */}
      <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-800 text-xs font-mono">
        <span className="text-[#10B981] font-bold uppercase tracking-wider flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>{title || config.title || 'Interactive Custom Candlestick Model'}</span>
        </span>
        <div className="flex items-center space-x-2 text-[10px] text-slate-400">
          {showEma && <span className="text-[#38BDF8] font-bold">EMA {emaPeriod}</span>}
          {showVolume && <span>• Volume VSA</span>}
          <span className="bg-slate-900 border border-slate-700 text-slate-300 px-2 py-0.5 rounded">
            {candles.length} Candles
          </span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${width} ${totalHeight}`}
        style={{ width: `${width}px`, height: `${totalHeight}px` }}
        className="block select-none"
      >
        <defs>
          <pattern id="viewer-grid-pro" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width={width} height={totalHeight} fill="#070A12" />
        <rect width={width} height={totalHeight} fill="url(#viewer-grid-pro)" />

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

        {/* Box Drawings with Optional 50% Midline */}
        {boxes.map((b) => {
          const x1 = indexToX(b.startIndex) - 16;
          const x2 = indexToX(b.endIndex) + 16;
          const yTop = priceToY(b.topPrice);
          const yBottom = priceToY(b.bottomPrice);
          const boxHeight = Math.max(3, yBottom - yTop);
          const yMid = yTop + boxHeight / 2;

          return (
            <g key={b.id}>
              <rect
                x={x1}
                y={yTop}
                width={Math.max(25, x2 - x1)}
                height={boxHeight}
                fill={b.color}
                fillOpacity={b.opacity || 0.18}
                stroke={b.color}
                strokeWidth="1.2"
                strokeDasharray="3 3"
                rx="3"
              />
              {b.showMidLine && (
                <line
                  x1={x1}
                  y1={yMid}
                  x2={x2}
                  y2={yMid}
                  stroke={b.color}
                  strokeWidth="1"
                  strokeDasharray="3 2"
                />
              )}
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

        {/* Position Tool (Long/Short Box) */}
        {positions.map((pos) => {
          const x1 = indexToX(pos.startIndex) - 12;
          const x2 = indexToX(pos.endIndex) + 20;
          const yEntry = priceToY(pos.entryPrice);
          const yTarget = priceToY(pos.targetPrice);
          const yStop = priceToY(pos.stopPrice);

          const isLong = pos.type === 'long';
          const rewardPips = Math.abs(pos.targetPrice - pos.entryPrice);
          const riskPips = Math.abs(pos.entryPrice - pos.stopPrice);
          const rrRatio = riskPips > 0 ? (rewardPips / riskPips).toFixed(2) : '1.00';

          const topY = Math.min(yTarget, yEntry);
          const targetBoxHeight = Math.abs(yEntry - yTarget);
          const bottomY = Math.min(yEntry, yStop);
          const stopBoxHeight = Math.abs(yStop - yEntry);

          return (
            <g key={pos.id}>
              <rect
                x={x1}
                y={isLong ? topY : yEntry}
                width={x2 - x1}
                height={targetBoxHeight}
                fill="rgba(16, 185, 129, 0.22)"
                stroke="#10B981"
                strokeWidth="1"
              />
              <rect
                x={x1}
                y={isLong ? yEntry : bottomY}
                width={x2 - x1}
                height={stopBoxHeight}
                fill="rgba(244, 63, 94, 0.22)"
                stroke="#F43F5E"
                strokeWidth="1"
              />
              <line x1={x1} y1={yEntry} x2={x2} y2={yEntry} stroke="#F8FAFC" strokeWidth="1.5" />
              <rect x={x2 - 95} y={yEntry - 10} width="90" height="18" fill="#020617" stroke="#38BDF8" rx="3" />
              <text x={x2 - 50} y={yEntry + 2.5} fill="#38BDF8" fontSize="8.5" fontWeight="900" fontFamily="JetBrains Mono" textAnchor="middle">
                R:R = 1 : {rrRatio}
              </text>
            </g>
          );
        })}

        {/* Fibonacci Retracements */}
        {fibonaccis.map((fib) => {
          const xStart = indexToX(fib.startIndex) - 10;
          const xEnd = indexToX(fib.endIndex) + 35;
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

        {/* Dynamic EMA Line */}
        {showEma && emaPoints.length > 1 && (
          <path
            d={`M ${emaPoints.map(p => `${p.x},${p.y}`).join(' L ')}`}
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2"
            strokeOpacity="0.8"
            strokeLinecap="round"
          />
        )}

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
              <line x1={x} y1={yHigh} x2={x} y2={bodyTop} stroke={bodyColor} strokeWidth="1.8" />
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
              <line x1={x} y1={bodyTop + bodyHeight} x2={x} y2={yLow} stroke={bodyColor} strokeWidth="1.8" />
              {candle.label && (
                <text
                  x={x}
                  y={totalHeight - padding.bottom + 15}
                  fill="#94A3B8"
                  fontSize="8.5"
                  fontFamily="JetBrains Mono, monospace"
                  textAnchor="middle"
                >
                  {candle.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Volume Sub-Pane */}
        {showVolume && (
          <g transform={`translate(0, ${totalHeight - volumeHeight})`}>
            <line x1={padding.left} y1={0} x2={width - padding.right} y2={0} stroke="rgba(148, 163, 184, 0.18)" strokeWidth="1" />
            {candles.map((candle, idx) => {
              const x = indexToX(idx);
              const vol = candle.volume || 1000;
              const barH = Math.max(3, (vol / maxVolume) * (volumeHeight - 16));
              const isBull = candle.close >= candle.open;
              const barColor = isBull ? 'rgba(16, 185, 129, 0.45)' : 'rgba(244, 63, 94, 0.45)';
              return (
                <rect key={`v-${candle.id}`} x={x - 8} y={volumeHeight - 6 - barH} width="16" height={barH} fill={barColor} rx="1" />
              );
            })}
          </g>
        )}

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
