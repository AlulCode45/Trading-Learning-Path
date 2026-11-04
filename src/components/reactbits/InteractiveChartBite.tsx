import React, { useState } from 'react';
import { Sparkles, Layers, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  label?: string;
  type?: 'sweep' | 'fvg' | 'bos' | 'normal';
}

const SAMPLE_CANDLES: CandleData[] = [
  { time: '10:00', open: 100, high: 105, low: 98, close: 104, type: 'normal' },
  { time: '10:15', open: 104, high: 107, low: 102, close: 106, type: 'normal' },
  { time: '10:30', open: 106, high: 115, low: 105, close: 114, label: 'Displacement', type: 'fvg' },
  { time: '10:45', open: 114, high: 118, low: 112, close: 117, label: 'BOS Confirmed', type: 'bos' },
  { time: '11:00', open: 117, high: 119, low: 109, close: 111, label: 'Liquidity Sweep', type: 'sweep' },
  { time: '11:15', open: 111, high: 116, low: 110, close: 115, type: 'normal' },
  { time: '11:30', open: 115, high: 122, low: 114, close: 121, label: 'New High (HH)', type: 'normal' }
];

export const InteractiveChartBite: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number>(3);
  const current = SAMPLE_CANDLES[hoveredIdx];

  const minPrice = 95;
  const maxPrice = 125;
  const height = 160;

  const getY = (val: number) => height - ((val - minPrice) / (maxPrice - minPrice)) * height;

  return (
    <div className="p-5 rounded-2xl bg-[#090D16] not-dark:bg-white border border-[#1D2532] not-dark:border-slate-200 select-none">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1D2532] not-dark:border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold text-[#F8FAFC] not-dark:text-slate-900">
              EUR/USD 15M • Micro Structure Bite
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#10B981]/20 text-[#10B981]">
              Live Scrub
            </span>
          </div>
          <div className="text-[11px] font-mono text-[#94A3B8] mt-0.5">
            Geser kursor di atas lilin untuk melihat anatomi lelang:
          </div>
        </div>

        {/* Dynamic Price readout */}
        <div className="text-right font-mono text-xs">
          <div className={`font-bold ${current.close >= current.open ? 'text-[#10B981]' : 'text-[#F43F5E]'}`}>
            {current.close.toFixed(2)}
          </div>
          <div className="text-[10px] text-[#64748B]">
            O:{current.open} H:{current.high} L:{current.low}
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative h-44 w-full flex items-end">
        <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${SAMPLE_CANDLES.length * 60} ${height}`}>
          {/* Subtle horizontal grid lines */}
          {[100, 110, 120].map(price => (
            <line
              key={price}
              x1="0"
              y1={getY(price)}
              x2={SAMPLE_CANDLES.length * 60}
              y2={getY(price)}
              stroke="#1D2532"
              strokeDasharray="3 3"
              strokeWidth="1"
            />
          ))}

          {/* FVG Highlight Zone */}
          <rect
            x={1 * 60 + 10}
            y={getY(114)}
            width={2 * 60}
            height={getY(106) - getY(114)}
            fill="rgba(56, 189, 248, 0.12)"
            stroke="rgba(56, 189, 248, 0.3)"
            strokeDasharray="2 2"
          />

          {/* Candlesticks loop */}
          {SAMPLE_CANDLES.map((c, i) => {
            const x = i * 60 + 30;
            const isBull = c.close >= c.open;
            const topBody = isBull ? c.close : c.open;
            const botBody = isBull ? c.open : c.close;
            const bodyHeight = Math.max(getY(botBody) - getY(topBody), 3);
            const isHovered = hoveredIdx === i;

            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                className="cursor-pointer transition-transform duration-150"
              >
                {/* Candle Wick */}
                <line
                  x1={x}
                  y1={getY(c.high)}
                  x2={x}
                  y2={getY(c.low)}
                  stroke={isBull ? '#10B981' : '#F43F5E'}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                />

                {/* Candle Body */}
                <rect
                  x={x - 12}
                  y={getY(topBody)}
                  width={24}
                  height={bodyHeight}
                  fill={isBull ? '#10B981' : '#F43F5E'}
                  rx={2}
                  className={isHovered ? 'opacity-100 filter drop-shadow(0 0 6px rgba(16,185,129,0.5))' : 'opacity-85'}
                />

                {/* Active Indicator Pin */}
                {isHovered && (
                  <circle
                    cx={x}
                    cy={getY(c.close)}
                    r={4}
                    fill="#FFFFFF"
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bite Inspector Feedback */}
      <div className="mt-4 p-3 rounded-xl bg-[#0D1017] not-dark:bg-slate-50 border border-[#1D2532] not-dark:border-slate-200 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-[11px] text-[#38BDF8] px-1.5 py-0.5 rounded bg-[#38BDF8]/15 font-semibold">
            Candle #{hoveredIdx + 1}
          </span>
          <span className="font-medium text-[#F8FAFC] not-dark:text-slate-800">
            {current.label || 'Konsolidasi Normal'}
          </span>
        </div>

        <div className="text-[11px] font-mono text-[#94A3B8]">
          {current.type === 'fvg' && 'Celah Ketidakseimbangan 3-Lilin (FVG)'}
          {current.type === 'bos' && 'Pemecahan Struktur Valid (Body Close)'}
          {current.type === 'sweep' && 'Pembersihan Sumbu Likuiditas (Sweep)'}
          {current.type === 'normal' && 'Pengiriman Harga Netral'}
        </div>
      </div>
    </div>
  );
};
