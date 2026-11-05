import React, { useMemo } from 'react';
import { CustomChartConfig } from '../../types/chartBuilderTypes';
import { buildSmoothCurvePath } from '../chart-builder/ChartCanvas';

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
  const polylines = config.polylines || [];
  const arrows = config.arrows || [];
  const infoCards = config.infoCards || [];
  const badges = config.badges || [];
  const legends = config.legends || [];

  const showCandles = config.showCandles !== false;
  const showVolume = config.showVolume !== false;
  const showEma = config.showEma !== false;
  const emaPeriod = config.emaPeriod || 9;
  const isDarkMode = config.isDarkMode ?? (typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true);
  const candleSpacing = config.candleSpacing || 'normal';

  const candleStep = candleSpacing === 'compact' ? 30 : candleSpacing === 'wide' ? 54 : 42;
  const candleWidth = candleSpacing === 'compact' ? 14 : candleSpacing === 'wide' ? 24 : 18;

  const hasLegend = legends.length > 0;
  const legendHeight = hasLegend ? 26 : 0;
  const totalHeight = 440;
  const volumeHeight = showVolume ? 55 : 0;
  const padding = { top: 35, right: 80, bottom: 35 + volumeHeight + legendHeight, left: 40 };

  const maxBarIndex = useMemo(() => {
    let maxIdx = Math.max(10, candles.length);
    polylines.forEach(p => p.points.forEach(pt => { if (pt.index + 2 > maxIdx) maxIdx = pt.index + 2; }));
    infoCards.forEach(c => { if (c.candleIndex + 4 > maxIdx) maxIdx = c.candleIndex + 4; });
    return maxIdx;
  }, [candles.length, polylines, infoCards]);

  const width = Math.max(580, padding.left + maxBarIndex * candleStep + padding.right + 30);

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
    const range = Math.max(20, max - min);
    return {
      minPrice: Math.floor(min - range * 0.16),
      maxPrice: Math.ceil(max + range * 0.16)
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

  const indexToX = (index: number): number => {
    return padding.left + index * candleStep + candleStep / 2;
  };

  const priceGridLevels = useMemo(() => {
    const count = 5;
    const step = (maxPrice - minPrice) / count;
    return Array.from({ length: count + 1 }, (_, i) => Math.round(minPrice + i * step));
  }, [minPrice, maxPrice]);

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

  const themeBg = isDarkMode ? '#070A12' : '#FFFFFF';
  const gridStroke = isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.05)';
  const gridLineStroke = isDarkMode ? 'rgba(148, 163, 184, 0.08)' : 'rgba(100, 116, 139, 0.15)';
  const labelTextFill = isDarkMode ? '#64748B' : '#475569';
  const candleBorderStroke = isDarkMode ? '#000000' : '#1E293B';

  const getDashArray = (style?: 'solid' | 'dashed' | 'dotted' | 'none') => {
    if (style === 'dashed') return '6 4';
    if (style === 'dotted') return '2 3';
    return 'none';
  };

  return (
    <div className={`border-2 rounded-xl p-4 my-5 overflow-x-auto ${
      isDarkMode
        ? 'bg-[#070A12] border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000]'
        : 'bg-white border-slate-300 shadow-sm'
    } ${className}`}>
      {/* Title & Subtitle Header Bar (Hanya tampil jika diisi) */}
      {(config.title || config.subtitle) && (
        <div className={`flex flex-wrap items-center justify-between gap-2 w-full mb-3 pb-2 border-b text-xs font-mono ${
          isDarkMode ? 'border-slate-800' : 'border-slate-200'
        }`}>
          {config.title ? (
            <span className="text-[#10B981] font-bold uppercase tracking-wider flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>{config.title}</span>
            </span>
          ) : <span />}
          {config.subtitle && (
            <div className="flex items-center space-x-2 text-[10px] text-slate-400">
              <span className={`px-2 py-0.5 rounded border ${
                isDarkMode ? 'bg-black/60 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}>
                {config.subtitle}
              </span>
            </div>
          )}
        </div>
      )}

      <svg
        viewBox={`0 0 ${width} ${totalHeight}`}
        style={{ width: `${width}px`, minWidth: `${width}px`, height: `${totalHeight}px` }}
        className="block select-none"
      >
        <defs>
          <pattern id="viewer-grid-pro" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke={gridStroke} strokeWidth="1" />
          </pattern>
        </defs>

        <rect width={width} height={totalHeight} fill={themeBg} />
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
                stroke={gridLineStroke}
                strokeDasharray="4 4"
              />
              <text
                x={width - padding.right + 6}
                y={y + 4}
                fill={labelTextFill}
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
          const x1 = indexToX(b.startIndex) - 12;
          const x2 = indexToX(b.endIndex) + 12;
          const boxW = Math.max(25, x2 - x1);
          const yTop = priceToY(b.topPrice);
          const yBottom = priceToY(b.bottomPrice);
          const boxHeight = Math.max(3, yBottom - yTop);
          const yMid = yTop + boxHeight / 2;

          const fillColor = b.color || '#38BDF8';
          const strokeColor = b.borderColor || fillColor;
          const textColor = b.textColor || fillColor;
          const fontSize = b.fontSize || 9.5;
          const borderStyle = b.borderStyle || 'dashed';
          const borderW = b.borderWidth ?? 1.2;
          const midColor = b.midLineColor || strokeColor;

          let labelX = x1 + 6;
          let labelY = yTop + fontSize + 4;
          let anchor: 'start' | 'middle' | 'end' = 'start';

          if (b.labelPosition === 'top-right') {
            labelX = x1 + boxW - 6;
            anchor = 'end';
          } else if (b.labelPosition === 'center') {
            labelX = x1 + boxW / 2;
            labelY = yMid + fontSize / 3;
            anchor = 'middle';
          } else if (b.labelPosition === 'bottom-left') {
            labelX = x1 + 6;
            labelY = yTop + boxHeight - 6;
          }

          return (
            <g key={b.id}>
              <rect
                x={x1}
                y={yTop}
                width={boxW}
                height={boxHeight}
                fill={fillColor}
                fillOpacity={b.opacity ?? 0.14}
                stroke={borderStyle === 'none' ? 'none' : strokeColor}
                strokeWidth={borderW}
                strokeDasharray={getDashArray(borderStyle)}
                rx="4"
              />
              {b.showMidLine && (
                <g>
                  <line
                    x1={x1}
                    y1={yMid}
                    x2={x1 + boxW}
                    y2={yMid}
                    stroke={midColor}
                    strokeWidth="1"
                    strokeDasharray="3 2"
                  />
                  <text
                    x={x1 + boxW - 4}
                    y={yMid - 3}
                    fill={midColor}
                    fontSize="8"
                    fontFamily="JetBrains Mono, monospace"
                    textAnchor="end"
                  >
                    {b.midLineLabel || '50% EQ'}
                  </text>
                </g>
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

        {/* Multi-Point Waves & Smooth Curves */}
        {polylines.map((poly) => {
          if (poly.points.length < 2) return null;
          const coords = poly.points.map(pt => ({ x: indexToX(pt.index), y: priceToY(pt.price) }));
          const lineColor = poly.color || '#38BDF8';
          const isSmooth = poly.curveType === 'smooth';
          const pathD = isSmooth
            ? buildSmoothCurvePath(coords)
            : `M ${coords.map(c => `${c.x},${c.y}`).join(' L ')}`;
          const firstPt = coords[0];

          return (
            <g key={poly.id}>
              <path
                d={pathD}
                fill="none"
                stroke={lineColor}
                strokeWidth={poly.strokeWidth || 2.5}
                strokeDasharray={getDashArray(poly.lineStyle || 'solid')}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {poly.label && (
                <text
                  x={firstPt.x + 6}
                  y={firstPt.y - 8}
                  fill={poly.textColor || lineColor}
                  fontSize={poly.fontSize || 10}
                  fontWeight="bold"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {poly.label}
                </text>
              )}
              {poly.showDots && coords.map((pt, idx) => (
                <circle key={`${poly.id}-pt-${idx}`} cx={pt.x} cy={pt.y} r="3" fill={lineColor} />
              ))}
            </g>
          );
        })}

        {/* Position Tool (Long/Short Box) */}
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

          const topY = Math.min(yTarget, yEntry);
          const targetBoxHeight = Math.abs(yEntry - yTarget);
          const bottomY = Math.min(yEntry, yStop);
          const stopBoxHeight = Math.abs(yStop - yEntry);

          const targetColor = pos.targetColor || '#10B981';
          const stopColor = pos.stopColor || '#EF4444';
          const badgeBgColor = pos.badgeBgColor || (isDarkMode ? '#020617' : '#FFFFFF');
          const badgeTextColor = pos.badgeTextColor || '#0284C7';

          return (
            <g key={pos.id}>
              <rect
                x={x1}
                y={isLong ? topY : yEntry}
                width={x2 - x1}
                height={targetBoxHeight}
                fill={targetColor}
                fillOpacity={pos.targetOpacity ?? 0.22}
                stroke={targetColor}
                strokeWidth="1"
              />
              <rect
                x={x1}
                y={isLong ? yEntry : bottomY}
                width={x2 - x1}
                height={stopBoxHeight}
                fill={stopColor}
                fillOpacity={pos.stopOpacity ?? 0.22}
                stroke={stopColor}
                strokeWidth="1"
              />
              <line x1={x1} y1={yEntry} x2={x2} y2={yEntry} stroke={isDarkMode ? '#F8FAFC' : '#0F172A'} strokeWidth="1.5" />
              <rect x={x2 - 95} y={yEntry - 10} width="90" height="18" fill={badgeBgColor} stroke={badgeTextColor} rx="3" />
              <text x={x2 - 50} y={yEntry + 2.5} fill={badgeTextColor} fontSize="8.5" fontWeight="900" fontFamily="JetBrains Mono" textAnchor="middle">
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
              {fib.showFill !== false && (
                <rect
                  x={xStart}
                  y={Math.min(y618, y786)}
                  width={xEnd - xStart}
                  height={Math.abs(y786 - y618)}
                  fill={fib.fillColor || '#10B981'}
                  fillOpacity={fib.fillOpacity ?? 0.14}
                />
              )}
              {levels.map((lvl) => {
                const p = fib.startPrice + (fib.endPrice - fib.startPrice) * lvl.pct;
                const y = priceToY(p);
                const strokeCol = fib.lineColor || lvl.color;
                const txtCol = fib.textColor || lvl.color;
                return (
                  <g key={`${fib.id}-lvl-${lvl.pct}`}>
                    <line
                      x1={xStart}
                      y1={y}
                      x2={xEnd}
                      y2={y}
                      stroke={strokeCol}
                      strokeWidth="1"
                      strokeDasharray={lvl.pct === 0.5 || lvl.pct === 0.618 ? 'none' : '3 3'}
                    />
                    <text
                      x={xEnd + 4}
                      y={y + 3}
                      fill={txtCol}
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
            stroke="#0284C7"
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
          const lineColor = t.color || '#FACC15';
          const fontSize = t.fontSize || 9;
          const textColor = t.textColor || lineColor;
          const align = t.labelAlignment || 'center';
          const labelX = align === 'start' ? x1 + 10 : align === 'end' ? x2 - 10 : (x1 + x2) / 2;
          const labelY = align === 'start' ? y1 - 8 : align === 'end' ? y2 - 8 : (y1 + y2) / 2 - 8;
          const pillW = t.label ? Math.max(30, t.label.length * (fontSize * 0.65) + 12) : 0;

          return (
            <g key={t.id}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={lineColor}
                strokeWidth={t.strokeWidth || 2}
                strokeDasharray={getDashArray(t.lineStyle || 'solid')}
                strokeLinecap="round"
              />
              {t.showDots !== false && (
                <>
                  <circle cx={x1} cy={y1} r="3" fill={lineColor} />
                  <circle cx={x2} cy={y2} r="3" fill={lineColor} />
                </>
              )}
              {t.label && (
                <g>
                  {t.showTextBg !== false && (
                    <rect
                      x={labelX - pillW / 2}
                      y={labelY - fontSize}
                      width={pillW}
                      height={fontSize + 5}
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

        {/* Curved & Straight Arrows */}
        {arrows.map((arr) => {
          const x1 = indexToX(arr.startIndex);
          const y1 = priceToY(arr.startPrice);
          const x2 = indexToX(arr.endIndex);
          const y2 = priceToY(arr.endPrice);
          const col = arr.color || '#FACC15';
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2 - (arr.curved !== false ? (arr.curveOffset ?? 25) : 0);
          const pathD = arr.curved !== false
            ? `M ${x1},${y1} Q ${midX},${midY} ${x2},${y2}`
            : `M ${x1},${y1} L ${x2},${y2}`;
          const refX = arr.curved !== false ? midX : x1;
          const refY = arr.curved !== false ? midY : y1;
          const angle = Math.atan2(y2 - refY, x2 - refX) * (180 / Math.PI);

          return (
            <g key={arr.id}>
              <path d={pathD} fill="none" stroke={col} strokeWidth={arr.strokeWidth || 2.2} strokeDasharray="4 3" />
              <polygon points="0,0 -8,-4.5 -8,4.5" fill={col} transform={`translate(${x2},${y2}) rotate(${angle})`} />
              {arr.label && (
                <text x={midX} y={midY - 6} fill={arr.textColor || col} fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">
                  {arr.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Candlesticks */}
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

          return (
            <g key={candle.id}>
              <line x1={x} y1={yHigh} x2={x} y2={bodyTop} stroke={wickColor} strokeWidth="1.8" />
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
              <line x1={x} y1={bodyTop + bodyHeight} x2={x} y2={yLow} stroke={wickColor} strokeWidth="1.8" />
              {candle.label && (
                <text
                  x={x}
                  y={totalHeight - padding.bottom + 15}
                  fill={candle.labelColor || labelTextFill}
                  fontSize="8.5"
                  fontWeight="bold"
                  fontFamily="JetBrains Mono, monospace"
                  textAnchor="middle"
                >
                  {candle.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Multi-Line Info Cards */}
        {infoCards.map((card) => {
          const x = indexToX(card.candleIndex);
          const y = priceToY(card.price);
          const cardW = card.width || 155;
          const lines = card.lines || [];
          const hasFooter = Boolean(card.footerBadge);
          const cardH = 30 + lines.length * 13.5 + (hasFooter ? 22 : 6);
          const accent = card.color || '#10B981';
          const bgCol = card.bgColor || accent;
          const bgOp = card.bgOpacity ?? 0.14;
          const bodyTextCol = card.textColor || (isDarkMode ? '#E2E8F0' : '#1E293B');

          return (
            <g key={card.id}>
              <rect x={x - cardW / 2} y={y} width={cardW} height={cardH} fill={isDarkMode ? '#0B1120' : '#FFFFFF'} fillOpacity={0.92} rx="6" />
              <rect x={x - cardW / 2} y={y} width={cardW} height={cardH} fill={bgCol} fillOpacity={bgOp} stroke={accent} strokeWidth="1.5" rx="6" />
              {card.stepBadge ? (
                <>
                  <circle cx={x - cardW / 2 + 15} cy={y + 15} r="8" fill={accent} />
                  <text x={x - cardW / 2 + 15} y={y + 18.5} fill="#000" fontSize="9" fontWeight="900" fontFamily="JetBrains Mono" textAnchor="middle">
                    {card.stepBadge}
                  </text>
                  <text x={x - cardW / 2 + 28} y={y + 18.5} fill={accent} fontSize="9" fontWeight="900" fontFamily="JetBrains Mono">
                    {card.title}
                  </text>
                </>
              ) : (
                <text x={x - cardW / 2 + 10} y={y + 18.5} fill={accent} fontSize="9.5" fontWeight="900" fontFamily="JetBrains Mono">
                  {card.title}
                </text>
              )}
              {lines.map((ln, idx) => (
                <text key={`${card.id}-l-${idx}`} x={x - cardW / 2 + 10} y={y + 34 + idx * 13} fill={bodyTextCol} fontSize="8.5" fontFamily="JetBrains Mono">
                  {ln}
                </text>
              ))}
              {card.footerBadge && (
                <g>
                  <rect x={x - cardW / 2 + 10} y={y + cardH - 20} width={cardW - 20} height={15} fill={accent} fillOpacity={0.22} rx="3" />
                  <text x={x} y={y + cardH - 10} fill={accent} fontSize="8" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">
                    {card.footerBadge}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Volume Sub-Pane */}
        {showVolume && (
          <g transform={`translate(0, ${totalHeight - volumeHeight - legendHeight})`}>
            <line x1={padding.left} y1={0} x2={width - padding.right} y2={0} stroke={gridLineStroke} strokeWidth="1" />
            {candles.map((candle, idx) => {
              const x = indexToX(idx);
              const vol = candle.volume || 1000;
              const barH = Math.max(3, (vol / maxVolume) * (volumeHeight - 16));
              const isBull = candle.close >= candle.open;
              const barColor = isBull ? 'rgba(16, 185, 129, 0.45)' : 'rgba(239, 68, 68, 0.45)';
              return (
                <rect key={`v-${candle.id}`} x={x - candleWidth / 2 + 1} y={volumeHeight - 6 - barH} width={candleWidth - 2} height={barH} fill={barColor} rx="1" />
              );
            })}
          </g>
        )}

        {/* Badges */}
        {badges.map((badge) => {
          const x = indexToX(badge.candleIndex);
          const y = priceToY(badge.price);
          const fontSize = badge.fontSize || 9;
          const bgColor = badge.bgColor || badge.color || '#FACC15';
          const bgOpacity = badge.style === 'transparent' ? 0 : (badge.bgOpacity ?? (badge.style === 'outline' ? 0.12 : 1));
          const textColor = badge.textColor || (badge.style === 'outline' || badge.style === 'transparent' ? bgColor : '#000000');
          const borderColor = badge.borderColor || (badge.style === 'outline' ? bgColor : '#000000');
          const borderWidth = badge.borderWidth ?? (badge.style === 'transparent' ? 0 : 1);
          const rx = badge.style === 'pill' ? 12 : 4;
          const badgeW = Math.max(40, (badge.text?.length || 1) * (fontSize * 0.65) + 14);
          const badgeH = Math.max(19, fontSize + 10);

          return (
            <g key={badge.id}>
              {badge.style === 'callout' && (
                <polygon
                  points={`${x - 4},${y + badgeH / 2 - 1} ${x + 4},${y + badgeH / 2 - 1} ${x},${y + badgeH / 2 + 5}`}
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

        {/* Bottom Custom Legend Bar */}
        {hasLegend && (
          <g transform={`translate(${padding.left}, ${totalHeight - 8})`}>
            {legends.map((item, idx) => (
              <g key={item.id} transform={`translate(${idx * 200}, 0)`}>
                <circle cx="5" cy="-4" r="4" fill={item.color} />
                <text x="14" y="0" fill={isDarkMode ? '#94A3B8' : '#475569'} fontSize="9.5" fontWeight="bold" fontFamily="JetBrains Mono">
                  {item.label}
                </text>
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
};
