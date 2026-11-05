import React, { useState } from 'react';
import { VisualDiagram } from '../VisualDiagram';
import { InteractiveTradingChart } from './InteractiveTradingChart';
import { ChartSnapshotViewer } from './ChartSnapshotViewer';
import { PresetSvgCatalog } from './PresetSvgCatalog';
import { Sparkles, TrendingUp, Image as ImageIcon, Layers, Sliders } from 'lucide-react';

export type IllustrationMode = 'preset' | 'interactive_chart' | 'snapshot';

export interface UnifiedIllustrationEngineProps {
  initialMode?: IllustrationMode;
  presetType?: string;
  chartConfig?: {
    symbol?: string;
    title?: string;
    timeframe?: string;
    data?: any[];
    boxes?: any[];
    markers?: any[];
    keyLevels?: any[];
  };
  snapshotConfig?: {
    src?: string;
    caption?: string;
    sourceUrl?: string;
  };
  allowModeSwitch?: boolean;
  className?: string;
}

export const UnifiedIllustrationEngine: React.FC<UnifiedIllustrationEngineProps> = ({
  initialMode = 'preset',
  presetType = 'candlestick_anatomy',
  chartConfig,
  snapshotConfig,
  allowModeSwitch = true,
  className = '',
}) => {
  const [currentMode, setCurrentMode] = useState<IllustrationMode>(initialMode);
  const [activePreset, setActivePreset] = useState<string>(presetType);

  return (
    <div className={`my-6 select-none ${className}`}>
      {/* Mode Switcher Tabs */}
      {allowModeSwitch && (
        <div className="bg-[#0B1120] border-2 border-black dark:border-[#1E293B] shadow-[3px_3px_0px_#000] rounded-xl p-1.5 mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentMode('preset')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-all ${
                currentMode === 'preset'
                  ? 'bg-[#FACC15] text-black shadow-[2px_2px_0px_#000]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles size={13} />
              <span>Mode 1: Preset SVG</span>
            </button>

            <button
              onClick={() => setCurrentMode('interactive_chart')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-all ${
                currentMode === 'interactive_chart'
                  ? 'bg-[#38BDF8] text-black shadow-[2px_2px_0px_#000]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <TrendingUp size={13} />
              <span>Mode 2: Interactive Chart</span>
            </button>

            <button
              onClick={() => setCurrentMode('snapshot')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-all ${
                currentMode === 'snapshot'
                  ? 'bg-[#10B981] text-black shadow-[2px_2px_0px_#000]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ImageIcon size={13} />
              <span>Mode 3: Snapshot &amp; Draw</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center space-x-1.5 text-[10px] font-mono text-slate-500 pr-2">
            <Sliders size={12} />
            <span>3-Mode Engine</span>
          </div>
        </div>
      )}

      {/* Render Active Engine Mode */}
      {currentMode === 'preset' && (
        <div>
          {/* If specific preset is assigned, render standard VisualDiagram; otherwise allow browsing catalog */}
          {presetType ? (
            <div className="space-y-3">
              <VisualDiagram type={activePreset} />
              <details className="bg-[#0B1120] border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-slate-400 cursor-pointer">
                <summary className="font-bold text-slate-300 hover:text-[#38BDF8]">
                  + Buka Katalog 25 Preset SVG Lainnya
                </summary>
                <div className="mt-3">
                  <PresetSvgCatalog
                    selectedType={activePreset}
                    onSelect={(type) => setActivePreset(type)}
                  />
                </div>
              </details>
            </div>
          ) : (
            <PresetSvgCatalog
              selectedType={activePreset}
              onSelect={(type) => setActivePreset(type)}
            />
          )}
        </div>
      )}

      {currentMode === 'interactive_chart' && (
        <InteractiveTradingChart
          symbol={chartConfig?.symbol}
          title={chartConfig?.title}
          timeframe={chartConfig?.timeframe}
          data={chartConfig?.data}
          boxes={chartConfig?.boxes}
          markers={chartConfig?.markers}
          keyLevels={chartConfig?.keyLevels}
        />
      )}

      {currentMode === 'snapshot' && (
        <ChartSnapshotViewer
          src={snapshotConfig?.src}
          caption={snapshotConfig?.caption}
          sourceUrl={snapshotConfig?.sourceUrl}
          allowUpload={true}
          allowAnnotation={true}
        />
      )}
    </div>
  );
};
