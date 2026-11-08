import React, { useEffect, useRef, useState } from 'react';
import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
  ColorType,
  CrosshairMode,
  LineStyle,
  createSeriesMarkers,
  type IChartApi,
  type ISeriesApi,
} from 'lightweight-charts';
import { Maximize2, Minimize2, RotateCcw, Eye, Layers, TrendingUp, Info } from 'lucide-react';

export interface ChartBoxOverlay {
  id: string;
  label: string;
  topPrice: number;
  bottomPrice: number;
  color: 'green' | 'red' | 'blue' | 'yellow' | 'purple';
  startTime?: string;
  endTime?: string;
}

export interface ChartMarkerItem {
  time: string;
  position: 'aboveBar' | 'belowBar' | 'inBar';
  color: string;
  shape: 'arrowUp' | 'arrowDown' | 'circle' | 'square';
  text: string;
}

export interface CandleDataPoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface InteractiveTradingChartProps {
  symbol?: string;
  title?: string;
  timeframe?: string;
  data?: CandleDataPoint[];
  boxes?: ChartBoxOverlay[];
  markers?: ChartMarkerItem[];
  keyLevels?: { price: number; title: string; color: string }[];
  height?: number;
  className?: string;
}

// Helper to normalize any date/time format to what Lightweight Charts accepts
const normalizeChartTime = (time: any): any => {
  if (typeof time === 'number') return time;
  if (typeof time === 'string') {
    // If strict YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(time)) return time;
    // If date with time like '2026-05-12 01:00' or ISO
    const timestamp = Math.floor(new Date(time.replace(' ', 'T') + (time.includes('Z') || time.includes('+') ? '' : 'Z')).getTime() / 1000);
    if (!isNaN(timestamp) && timestamp > 0) return timestamp;
  }
  return time;
};

// Built-in Sample Datasets for Educational Demonstrations
export const SAMPLE_CHART_PRESETS: Record<string, {
  symbol: string;
  title: string;
  timeframe: string;
  data: CandleDataPoint[];
  boxes: ChartBoxOverlay[];
  markers: ChartMarkerItem[];
  keyLevels: { price: number; title: string; color: string }[];
}> = {
  'eurusd-london-judas': {
    symbol: 'EUR/USD',
    title: 'London Open Judas Swing & FVG Fill Mitigation',
    timeframe: 'M5',
    data: [
      { time: '2026-05-12 01:00', open: 1.0830, high: 1.0836, low: 1.0828, close: 1.0834, volume: 420 },
      { time: '2026-05-12 01:15', open: 1.0834, high: 1.0838, low: 1.0830, close: 1.0835, volume: 380 },
      { time: '2026-05-12 01:30', open: 1.0835, high: 1.0842, low: 1.0832, close: 1.0838, volume: 510 },
      { time: '2026-05-12 01:45', open: 1.0838, high: 1.0845, low: 1.0836, close: 1.0840, volume: 490 },
      { time: '2026-05-12 02:00', open: 1.0840, high: 1.0862, low: 1.0838, close: 1.0858, volume: 1250 }, // London Open Spike
      { time: '2026-05-12 02:15', open: 1.0858, high: 1.0872, low: 1.0854, close: 1.0868, volume: 1890 }, // Judas Swing High
      { time: '2026-05-12 02:30', open: 1.0868, high: 1.0870, low: 1.0842, close: 1.0846, volume: 2150 }, // Bearish Displacement
      { time: '2026-05-12 02:45', open: 1.0846, high: 1.0849, low: 1.0831, close: 1.0834, volume: 1600 }, // FVG formed
      { time: '2026-05-12 03:00', open: 1.0834, high: 1.0852, low: 1.0832, close: 1.0850, volume: 920 },  // Retest into FVG CE
      { time: '2026-05-12 03:15', open: 1.0850, high: 1.0851, low: 1.0825, close: 1.0828, volume: 1740 }, // Selloff continuation
      { time: '2026-05-12 03:30', open: 1.0828, high: 1.0830, low: 1.0814, close: 1.0818, volume: 1980 },
      { time: '2026-05-12 03:45', open: 1.0818, high: 1.0822, low: 1.0805, close: 1.0808, volume: 2300 }, // Target liquidity swept
    ],
    boxes: [
      { id: 'b1', label: 'Bearish FVG (1.0846 - 1.0868)', topPrice: 1.0868, bottomPrice: 1.0846, color: 'red' },
      { id: 'b2', label: 'Asian High Liquidity Pool', topPrice: 1.0845, bottomPrice: 1.0840, color: 'yellow' }
    ],
    markers: [
      { time: '2026-05-12 02:15', position: 'aboveBar', color: '#F43F5E', shape: 'arrowDown', text: 'Judas Sweep High' },
      { time: '2026-05-12 02:45', position: 'belowBar', color: '#FACC15', shape: 'arrowDown', text: 'Bearish CHoCH' },
      { time: '2026-05-12 03:00', position: 'aboveBar', color: '#38BDF8', shape: 'circle', text: 'Limit Entry 50% CE' }
    ],
    keyLevels: [
      { price: 1.0872, title: 'High of the Day (Sweep)', color: '#F43F5E' },
      { price: 1.0845, title: 'Asian Range High', color: '#FACC15' },
      { price: 1.0805, title: 'Target Sellside Liquidity', color: '#10B981' }
    ]
  },
  'btc-wyckoff-spring': {
    symbol: 'BTC/USDT',
    title: 'Wyckoff Accumulation Phase C Spring & JAC Breakout',
    timeframe: 'H1',
    data: [
      { time: '2026-05-10 00:00', open: 62400, high: 62800, low: 62200, close: 62500, volume: 1540 },
      { time: '2026-05-10 04:00', open: 62500, high: 62700, low: 61900, close: 62100, volume: 2100 },
      { time: '2026-05-10 08:00', open: 62100, high: 62300, low: 61500, close: 61600, volume: 2890 }, // Selling Climax
      { time: '2026-05-10 12:00', open: 61600, high: 63400, low: 61550, close: 63200, volume: 3400 }, // Automatic Rally
      { time: '2026-05-10 16:00', open: 63200, high: 63500, low: 62600, close: 62800, volume: 1800 },
      { time: '2026-05-10 20:00', open: 62800, high: 63000, low: 61800, close: 61950, volume: 1650 }, // Secondary Test
      { time: '2026-05-11 00:00', open: 61950, high: 62400, low: 61900, close: 62200, volume: 1400 },
      { time: '2026-05-11 04:00', open: 62200, high: 62300, low: 61100, close: 61850, volume: 850 },  // Phase C Spring (Dry Volume!)
      { time: '2026-05-11 08:00', open: 61850, high: 63900, low: 61800, close: 63700, volume: 4600 }, // Sign of Strength (SOS)
      { time: '2026-05-11 12:00', open: 63700, high: 63800, low: 63100, close: 63300, volume: 1200 }, // LPS (Last Point Support)
      { time: '2026-05-11 16:00', open: 63300, high: 65400, low: 63250, close: 65100, volume: 5200 }, // Jump Across the Creek
      { time: '2026-05-11 20:00', open: 65100, high: 66200, low: 64900, close: 65900, volume: 4100 }, // Phase E Markup
    ],
    boxes: [
      { id: 'b1', label: 'Trading Range Support ($61,500)', topPrice: 61700, bottomPrice: 61400, color: 'blue' },
      { id: 'b2', label: 'The Creek Resistance ($63,500)', topPrice: 63600, bottomPrice: 63300, color: 'purple' }
    ],
    markers: [
      { time: '2026-05-10 08:00', position: 'belowBar', color: '#F43F5E', shape: 'circle', text: 'SC' },
      { time: '2026-05-10 12:00', position: 'aboveBar', color: '#10B981', shape: 'arrowUp', text: 'AR' },
      { time: '2026-05-11 04:00', position: 'belowBar', color: '#FACC15', shape: 'arrowUp', text: 'Spring Test' },
      { time: '2026-05-11 12:00', position: 'belowBar', color: '#10B981', shape: 'arrowUp', text: 'LPS Buy Entry' }
    ],
    keyLevels: [
      { price: 63500, title: 'The Creek Resistance', color: '#FACC15' },
      { price: 61500, title: 'Trading Range Support', color: '#38BDF8' },
      { price: 61100, title: 'Spring Low (Shakeout)', color: '#F43F5E' }
    ]
  }
};

export const InteractiveTradingChart: React.FC<InteractiveTradingChartProps> = ({
  symbol = 'EUR/USD',
  title = 'Interactive Candlestick Execution Engine',
  timeframe = 'M5',
  data,
  boxes,
  markers,
  keyLevels,
  height = 360,
  className = '',
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOverlays, setShowOverlays] = useState(true);
  const [activePreset, setActivePreset] = useState<string>('eurusd-london-judas');

  // Resolve active chart data
  const preset = SAMPLE_CHART_PRESETS[activePreset] || SAMPLE_CHART_PRESETS['eurusd-london-judas'];
  const activeSymbol = symbol || preset.symbol;
  const activeTitle = title || preset.title;
  const activeTf = timeframe || preset.timeframe;
  const activeData = data || preset.data;
  const activeBoxes = boxes || preset.boxes;
  const activeMarkers = markers || preset.markers;
  const activeKeyLevels = keyLevels || preset.keyLevels;

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Clean up previous chart instance
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const isDark = document.documentElement.classList.contains('dark') || true;

    // Initialize TradingView Lightweight Chart v5
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: height,
      layout: {
        background: { type: ColorType.Solid, color: isDark ? '#090D16' : '#FFFFFF' },
        textColor: isDark ? '#94A3B8' : '#334155',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 11,
      },
      grid: {
        vertLines: { color: isDark ? 'rgba(30, 41, 59, 0.45)' : 'rgba(226, 232, 240, 0.7)' },
        horzLines: { color: isDark ? 'rgba(30, 41, 59, 0.45)' : 'rgba(226, 232, 240, 0.7)' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: '#38BDF8',
          width: 1,
          style: LineStyle.Dashed,
          labelBackgroundColor: '#0284C7',
        },
        horzLine: {
          color: '#38BDF8',
          width: 1,
          style: LineStyle.Dashed,
          labelBackgroundColor: '#0284C7',
        },
      },
      timeScale: {
        borderColor: isDark ? '#1E293B' : '#E2E8F0',
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: isDark ? '#1E293B' : '#E2E8F0',
        scaleMargins: {
          top: 0.12,
          bottom: 0.22,
        },
      },
    });

    chartRef.current = chart;

    // Candlestick Series
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#10B981',
      downColor: '#F43F5E',
      borderVisible: false,
      wickUpColor: '#10B981',
      wickDownColor: '#F43F5E',
    });
    candlestickSeriesRef.current = candleSeries;

    // Format and set candle data
    const formattedData = activeData.map(d => ({
      time: normalizeChartTime(d.time),
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }));
    candleSeries.setData(formattedData);

    // Volume Histogram Series (Bottom overlay)
    const volumeData = activeData
      .filter(d => d.volume !== undefined)
      .map(d => ({
        time: normalizeChartTime(d.time),
        value: d.volume || 100,
        color: d.close >= d.open ? 'rgba(16, 185, 129, 0.25)' : 'rgba(244, 63, 94, 0.25)',
      }));

    if (volumeData.length > 0) {
      const volumeSeries = chart.addSeries(HistogramSeries, {
        priceFormat: { type: 'volume' },
        priceScaleId: '', // overlay
      });
      volumeSeries.priceScale().applyOptions({
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      });
      volumeSeries.setData(volumeData);
    }

    // Key horizontal levels
    if (activeKeyLevels && activeKeyLevels.length > 0) {
      activeKeyLevels.forEach(lvl => {
        candleSeries.createPriceLine({
          price: lvl.price,
          color: lvl.color,
          lineWidth: 1,
          lineStyle: LineStyle.Dashed,
          axisLabelVisible: true,
          title: lvl.title,
        });
      });
    }

    // Structural Markers (BOS, CHoCH, Sweeps)
    if (activeMarkers && activeMarkers.length > 0) {
      try {
        const normalizedMarkers = activeMarkers.map(m => ({
          ...m,
          time: normalizeChartTime(m.time),
        }));
        createSeriesMarkers(candleSeries, normalizedMarkers as any);
      } catch (err) {
        console.warn('Failed to apply series markers:', err);
      }
    }

    // Auto-fit content
    chart.timeScale().fitContent();

    // Resize observer
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [activePreset, activeData, height, showOverlays]);

  const handleReset = () => {
    if (chartRef.current) {
      chartRef.current.timeScale().fitContent();
    }
  };

  return (
    <div className={`bg-[#060A12] border-2 border-black dark:border-[#1E293B] shadow-[4px_4px_0px_#000] rounded-xl overflow-hidden my-6 ${className}`}>
      {/* Chart Control Toolbar */}
      <div className="bg-[#0B1120] border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 bg-[#020617] border border-slate-800 px-2.5 py-1 rounded">
            <TrendingUp size={14} className="text-[#10B981]" />
            <span className="text-xs font-mono font-bold text-white">{activeSymbol}</span>
            <span className="text-[10px] font-mono bg-blue-950/80 text-blue-400 px-1.5 py-0.2 rounded font-bold">
              {activeTf}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-300 font-medium hidden md:inline">
            {activeTitle}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Preset Switcher */}
          <select
            value={activePreset}
            onChange={(e) => setActivePreset(e.target.value)}
            className="text-xs font-mono bg-[#020617] border border-slate-800 text-slate-300 px-2.5 py-1 rounded focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="eurusd-london-judas">EUR/USD: London Judas + FVG</option>
            <option value="btc-wyckoff-spring">BTC/USDT: Wyckoff Spring + JAC</option>
          </select>

          <button
            onClick={() => setShowOverlays(!showOverlays)}
            title="Toggle Box Overlays"
            className={`p-1.5 rounded text-xs flex items-center space-x-1 border font-mono transition-colors ${
              showOverlays
                ? 'bg-blue-900/40 border-blue-600 text-blue-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Layers size={13} />
            <span className="hidden sm:inline">Zones</span>
          </button>

          <button
            onClick={handleReset}
            title="Reset Zoom & Pan"
            className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded transition-colors"
          >
            <RotateCcw size={13} />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title="Toggle Size"
            className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded transition-colors"
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="relative">
        <div
          ref={chartContainerRef}
          style={{ height: isFullscreen ? 520 : height }}
          className="w-full select-none"
        />

        {/* Legend / Overlay Boxes Indicator Panel */}
        {showOverlays && activeBoxes && activeBoxes.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col space-y-1.5 pointer-events-none z-10">
            {activeBoxes.map(box => {
              const colorClasses = {
                green: 'border-emerald-500/70 bg-emerald-950/70 text-emerald-300',
                red: 'border-rose-500/70 bg-rose-950/70 text-rose-300',
                blue: 'border-sky-500/70 bg-sky-950/70 text-sky-300',
                yellow: 'border-amber-500/70 bg-amber-950/70 text-amber-300',
                purple: 'border-purple-500/70 bg-purple-950/70 text-purple-300',
              }[box.color];

              return (
                <div
                  key={box.id}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border backdrop-blur-md shadow-sm ${colorClasses}`}
                >
                  <span className="font-bold">{box.label}</span>: {box.bottomPrice.toFixed(4)} - {box.topPrice.toFixed(4)}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Chart Footer Info */}
      <div className="bg-[#0B1120] border-t border-slate-800/80 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center space-x-2">
          <Info size={12} className="text-[#38BDF8]" />
          <span>Interactive Canvas: Geser untuk navigasi (pan), scroll untuk zoom, arahkan kursor untuk membaca nilai OHLC.</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">TradingView Engine</span>
        </div>
      </div>
    </div>
  );
};
