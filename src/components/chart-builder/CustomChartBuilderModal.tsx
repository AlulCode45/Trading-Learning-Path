import React, { useState } from 'react';
import { 
  CustomCandle, 
  FibonacciDrawing, 
  BoxDrawing, 
  TrendlineDrawing, 
  TextBadgeAnnotation,
  CustomChartConfig,
  CandleTemplatePreset
} from '../../types/chartBuilderTypes';
import { CandleTemplateTray } from './CandleTemplateTray';
import { ChartCanvas } from './ChartCanvas';
import { 
  X, 
  Sparkles, 
  MousePointer, 
  Plus, 
  Sliders, 
  Box, 
  TrendingUp, 
  Tag, 
  Trash2, 
  RotateCcw, 
  Check, 
  Download,
  Layers,
  ArrowRight
} from 'lucide-react';

interface CustomChartBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: CustomChartConfig) => void;
  initialConfig?: CustomChartConfig;
}

export const CustomChartBuilderModal: React.FC<CustomChartBuilderModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialConfig
}) => {
  if (!isOpen) return null;

  // Chart Elements State
  const [candles, setCandles] = useState<CustomCandle[]>(initialConfig?.candles || [
    { id: 'c-1', index: 0, open: 100, high: 115, low: 95, close: 110, label: 'C1' },
    { id: 'c-2', index: 1, open: 110, high: 145, low: 108, close: 142, label: 'Expansion' },
    { id: 'c-3', index: 2, open: 142, high: 146, low: 125, close: 128, label: 'Pullback' },
    { id: 'c-4', index: 3, open: 128, high: 160, low: 126, close: 158, label: 'BOS' },
  ]);

  const [fibonaccis, setFibonaccis] = useState<FibonacciDrawing[]>(initialConfig?.fibonaccis || []);
  const [boxes, setBoxes] = useState<BoxDrawing[]>(initialConfig?.boxes || []);
  const [trendlines, setTrendlines] = useState<TrendlineDrawing[]>(initialConfig?.trendlines || []);
  const [badges, setBadges] = useState<TextBadgeAnnotation[]>(initialConfig?.badges || []);

  const [activeTool, setActiveTool] = useState<'select' | 'candle' | 'fibonacci' | 'box' | 'trendline' | 'badge'>('select');
  const [selectedItem, setSelectedItem] = useState<{ id: string; type: 'candle' | 'fib' | 'box' | 'trendline' | 'badge' } | null>(null);

  // Add Blank Candle
  const handleAddBlankCandle = (isBullish: boolean) => {
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
      label: `C${candles.length + 1}`
    };
    setCandles(prev => [...prev, newCandle]);
    setSelectedItem({ id: newCandle.id, type: 'candle' });
  };

  // Add Preset Formation
  const handleAddPreset = (preset: CandleTemplatePreset) => {
    const baseIndex = candles.length;
    const lastCandle = candles[candles.length - 1];
    const basePrice = lastCandle ? lastCandle.close : 100;
    const firstPresetOpen = preset.candles[0]?.open || 100;
    const offset = basePrice - firstPresetOpen;

    const newCandles: CustomCandle[] = preset.candles.map((c, idx) => ({
      id: `c-${Date.now()}-${idx}`,
      index: baseIndex + idx,
      open: Math.round(c.open + offset),
      high: Math.round(c.high + offset),
      low: Math.round(c.low + offset),
      close: Math.round(c.close + offset),
      label: c.label || `${preset.name.slice(0, 3)} ${idx + 1}`
    }));

    setCandles(prev => [...prev, ...newCandles]);
  };

  // Handle Add Annotation from Canvas
  const handleAddAnnotation = (type: 'fibonacci' | 'box' | 'trendline' | 'badge', payload: any) => {
    const id = `anno-${Date.now()}`;
    if (type === 'fibonacci') {
      const newFib: FibonacciDrawing = { id, ...payload };
      setFibonaccis(prev => [...prev, newFib]);
      setSelectedItem({ id, type: 'fib' });
    } else if (type === 'box') {
      const newBox: BoxDrawing = { id, ...payload };
      setBoxes(prev => [...prev, newBox]);
      setSelectedItem({ id, type: 'box' });
    } else if (type === 'trendline') {
      const newTrend: TrendlineDrawing = { id, ...payload };
      setTrendlines(prev => [...prev, newTrend]);
      setSelectedItem({ id, type: 'trendline' });
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
    } else if (type === 'trendline') {
      setTrendlines(prev => prev.filter(t => t.id !== id));
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
      trendlines,
      badges,
      title: 'Setup Chart Kustom',
      timeframe: '15m'
    };
    onSave(finalConfig);
    onClose();
  };

  // Get current active selected candle
  const activeCandle = selectedItem?.type === 'candle' 
    ? candles.find(c => c.id === selectedItem.id) 
    : null;

  const activeBox = selectedItem?.type === 'box'
    ? boxes.find(b => b.id === selectedItem.id)
    : null;

  const activeBadge = selectedItem?.type === 'badge'
    ? badges.find(b => b.id === selectedItem.id)
    : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#090D16] border-2 border-black dark:border-zinc-700 shadow-[10px_10px_0px_#000] rounded-2xl w-full max-w-7xl max-h-[94vh] flex flex-col overflow-hidden my-auto animate-in fade-in duration-200">
        
        {/* Studio Header */}
        <div className="bg-[#050811] border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-3 select-none">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xl">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center space-x-2">
                <span>Interactive Candle &amp; Analysis Chart Studio</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500 text-black font-extrabold uppercase">
                  Engine V2
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Rancang skenario chart kustom: tambahkan candle, buat kotak Order Block / FVG, tarik Fibonacci Retracement, dan pasang badge anotasi.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
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
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Studio Workspace Layout */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          
          {/* Left Panel: Tools & Candle Templates (3 Cols) */}
          <div className="lg:col-span-3 p-4 bg-[#0A0E18] space-y-5 overflow-y-auto max-h-[75vh]">
            {/* Tool Selection Palette */}
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center space-x-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Peralatan Analisa (Tools):</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'select', label: 'Pilih & Geser', icon: MousePointer },
                  { id: 'fibonacci', label: 'Fibonacci OTE', icon: TrendingUp },
                  { id: 'box', label: 'Kotak OB / FVG', icon: Box },
                  { id: 'trendline', label: 'Trendline Ray', icon: Sliders },
                  { id: 'badge', label: 'Badge BOS/CHoCH', icon: Tag }
                ].map((tool) => {
                  const Icon = tool.icon;
                  const isActive = activeTool === tool.id;
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => setActiveTool(tool.id as any)}
                      className={`p-2 rounded-xl text-xs font-mono flex items-center space-x-2 transition-all border ${
                        isActive
                          ? 'bg-emerald-500 text-black font-extrabold border-emerald-400 shadow-2xs'
                          : 'bg-[#121724] text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{tool.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Candle Templates Tray */}
            <CandleTemplateTray
              onAddPreset={handleAddPreset}
              onAddBlankCandle={handleAddBlankCandle}
            />
          </div>

          {/* Center Panel: Interactive Canvas & Canvas Toolbar (6 Cols) */}
          <div className="lg:col-span-6 p-4 sm:p-5 flex flex-col justify-between space-y-4 overflow-y-auto">
            {/* Canvas Quick Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#0E131F] border border-slate-800 p-2.5 rounded-xl text-xs font-mono">
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="text-[11px] font-bold text-slate-400">Status Alat:</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-extrabold uppercase text-[10px]">
                  Mode: {activeTool.toUpperCase()}
                </span>
                <span className="text-[11px] text-slate-400">| Total: {candles.length} Candle</span>
              </div>

              <div className="flex items-center space-x-1.5">
                {selectedItem && (
                  <button
                    type="button"
                    onClick={handleDeleteSelected}
                    className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-mono flex items-center space-x-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Hapus Terpilih</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setCandles([]);
                    setFibonaccis([]);
                    setBoxes([]);
                    setTrendlines([]);
                    setBadges([]);
                    setSelectedItem(null);
                  }}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono transition-colors"
                >
                  Bersihkan
                </button>
              </div>
            </div>

            {/* The SVG Canvas */}
            <div className="flex-1 flex items-center justify-center">
              <ChartCanvas
                candles={candles}
                fibonaccis={fibonaccis}
                boxes={boxes}
                trendlines={trendlines}
                badges={badges}
                selectedId={selectedItem?.id || null}
                onSelectId={(id, type) => setSelectedItem(id ? { id, type } : null)}
                onUpdateCandle={(updated) => {
                  setCandles(prev => prev.map(c => c.id === updated.id ? updated : c));
                }}
                activeTool={activeTool}
                onAddAnnotation={handleAddAnnotation}
              />
            </div>

            {/* Quick Tips Footer */}
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>💡 Tip: Klik langsung pada candle untuk mengatur tinggi wick dan body lelang.</span>
              <span className="text-emerald-400">Drawing Active</span>
            </div>
          </div>

          {/* Right Panel: Properties Inspector (3 Cols) */}
          <div className="lg:col-span-3 p-4 bg-[#0A0E18] space-y-4 overflow-y-auto max-h-[75vh]">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5 pb-2 border-b border-slate-800">
              <Sliders className="w-3.5 h-3.5 text-amber-500" />
              <span>Inspektur Properti (Properties):</span>
            </div>

            {/* Active Candle Inspector */}
            {activeCandle ? (
              <div className="space-y-3 text-xs font-mono">
                <div className="p-2.5 bg-[#121724] border border-slate-800 rounded-xl">
                  <div className="text-slate-400 text-[10px] uppercase mb-1">Objek Terpilih:</div>
                  <div className="font-bold text-white text-sm">Candle Bar #{activeCandle.index + 1}</div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Label Candle:</label>
                  <input
                    type="text"
                    value={activeCandle.label || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCandles(prev => prev.map(c => c.id === activeCandle.id ? { ...c, label: val } : c));
                    }}
                    placeholder="Contoh: OB, Sweep, C1..."
                    className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3 py-1.5 text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-400 mb-1">Open Price:</label>
                    <input
                      type="number"
                      value={activeCandle.open}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setCandles(prev => prev.map(c => c.id === activeCandle.id ? { ...c, open: val } : c));
                      }}
                      className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3 py-1 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Close Price:</label>
                    <input
                      type="number"
                      value={activeCandle.close}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setCandles(prev => prev.map(c => c.id === activeCandle.id ? { ...c, close: val } : c));
                      }}
                      className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3 py-1 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">High Price:</label>
                    <input
                      type="number"
                      value={activeCandle.high}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setCandles(prev => prev.map(c => c.id === activeCandle.id ? { ...c, high: val } : c));
                      }}
                      className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3 py-1 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Low Price:</label>
                    <input
                      type="number"
                      value={activeCandle.low}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setCandles(prev => prev.map(c => c.id === activeCandle.id ? { ...c, low: val } : c));
                      }}
                      className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3 py-1 text-white outline-none"
                    />
                  </div>
                </div>

                {/* Color Override */}
                <div>
                  <label className="block text-slate-400 mb-1">Warna Khusus:</label>
                  <div className="flex items-center space-x-2">
                    {['#10B981', '#F43F5E', '#38BDF8', '#FACC15', '#A855F7'].map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => {
                          setCandles(prev => prev.map(c => c.id === activeCandle.id ? { ...c, color } : c));
                        }}
                        style={{ backgroundColor: color }}
                        className="w-6 h-6 rounded-full border border-black/40 hover:scale-110 transition-transform"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : activeBox ? (
              <div className="space-y-3 text-xs font-mono">
                <div className="p-2.5 bg-[#121724] border border-slate-800 rounded-xl">
                  <div className="text-slate-400 text-[10px] uppercase mb-1">Objek Terpilih:</div>
                  <div className="font-bold text-white text-sm">Zone Box Area</div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Label Area:</label>
                  <input
                    type="text"
                    value={activeBox.label}
                    onChange={(e) => {
                      const val = e.target.value;
                      setBoxes(prev => prev.map(b => b.id === activeBox.id ? { ...b, label: val } : b));
                    }}
                    className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3 py-1.5 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Pilihan Warna Box:</label>
                  <div className="flex items-center space-x-2">
                    {['#38BDF8', '#10B981', '#F43F5E', '#FACC15', '#A855F7'].map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => {
                          setBoxes(prev => prev.map(b => b.id === activeBox.id ? { ...b, color } : b));
                        }}
                        style={{ backgroundColor: color }}
                        className="w-6 h-6 rounded-full border border-black/40 hover:scale-110 transition-transform"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : activeBadge ? (
              <div className="space-y-3 text-xs font-mono">
                <div className="p-2.5 bg-[#121724] border border-slate-800 rounded-xl">
                  <div className="text-slate-400 text-[10px] uppercase mb-1">Objek Terpilih:</div>
                  <div className="font-bold text-white text-sm">Structure Badge</div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Teks Badge:</label>
                  <input
                    type="text"
                    value={activeBadge.text}
                    onChange={(e) => {
                      const val = e.target.value;
                      setBadges(prev => prev.map(b => b.id === activeBadge.id ? { ...b, text: val } : b));
                    }}
                    placeholder="BOS / CHoCH..."
                    className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3 py-1.5 text-white outline-none"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['BOS', 'CHoCH', 'SSL Sweep', 'BSL Target', 'Entry Zone', 'Stop Loss'].map(badgeText => (
                    <button
                      key={badgeText}
                      type="button"
                      onClick={() => {
                        setBadges(prev => prev.map(b => b.id === activeBadge.id ? { ...b, text: badgeText } : b));
                      }}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white"
                    >
                      {badgeText}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center text-center p-4 text-slate-500 font-mono text-xs">
                <Sliders className="w-8 h-8 mb-2 opacity-40 text-slate-400" />
                <span>Klik objek candle atau gambar pada kanvas untuk mengubah propertinya.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
