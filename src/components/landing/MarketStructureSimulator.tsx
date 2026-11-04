import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

type Scenario = 'bos' | 'choch' | 'sweep';

export const MarketStructureSimulator: React.FC = () => {
  const [scenario, setScenario] = useState<Scenario>('bos');
  const [step, setStep] = useState<number>(3); // 1 to 4 steps

  const handleNext = () => {
    setStep(prev => (prev < 4 ? prev + 1 : 1));
  };

  const handleReset = () => {
    setStep(1);
  };

  return (
    <div className="bg-[#0F172A] dark:bg-[#0F172A] not-dark:bg-white border border-[#1E293B] not-dark:border-slate-200 rounded-2xl p-5 shadow-2xl relative overflow-hidden transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1E293B] not-dark:border-slate-200">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#F8FAFC] not-dark:text-slate-900">
            Interactive Structure Bite
          </span>
        </div>
        <div className="flex items-center space-x-1.5 bg-[#090D16] not-dark:bg-slate-100 p-1 rounded-lg border border-[#1E293B] not-dark:border-slate-200">
          <button
            onClick={() => { setScenario('bos'); setStep(3); }}
            className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all ${
              scenario === 'bos'
                ? 'bg-[#10B981] text-[#090D16] font-bold'
                : 'text-[#94A3B8] not-dark:text-slate-600 hover:text-white'
            }`}
          >
            BOS (Trend)
          </button>
          <button
            onClick={() => { setScenario('choch'); setStep(3); }}
            className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all ${
              scenario === 'choch'
                ? 'bg-[#F59E0B] text-[#090D16] font-bold'
                : 'text-[#94A3B8] not-dark:text-slate-600 hover:text-white'
            }`}
          >
            CHoCH (Shift)
          </button>
          <button
            onClick={() => { setScenario('sweep'); setStep(3); }}
            className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all ${
              scenario === 'sweep'
                ? 'bg-[#F43F5E] text-[#090D16] font-bold'
                : 'text-[#94A3B8] not-dark:text-slate-600 hover:text-white'
            }`}
          >
            Liquidity Sweep
          </button>
        </div>
      </div>

      {/* Interactive Chart Canvas View */}
      <div className="my-4 bg-[#090D16] not-dark:bg-slate-50 border border-[#1E293B] not-dark:border-slate-200 rounded-xl p-4 relative h-56 flex flex-col justify-between">
        <svg viewBox="0 0 460 180" className="w-full h-full">
          {/* Subtle horizontal grid lines */}
          <line x1="10" y1="45" x2="450" y2="45" stroke="currentColor" className="text-slate-800/40 not-dark:text-slate-200" strokeDasharray="3 3" />
          <line x1="10" y1="90" x2="450" y2="90" stroke="currentColor" className="text-slate-800/40 not-dark:text-slate-200" strokeDasharray="3 3" />
          <line x1="10" y1="135" x2="450" y2="135" stroke="currentColor" className="text-slate-800/40 not-dark:text-slate-200" strokeDasharray="3 3" />

          {scenario === 'bos' && (
            <g>
              {/* Prior Structure wave */}
              <polyline points="30,140 80,70 120,110 180,45" fill="none" stroke="#94A3B8" strokeWidth="2" />
              <circle cx="80" cy="70" r="3.5" fill="#38BDF8" />
              <text x="65" y="60" fill="#38BDF8" fontSize="10" fontFamily="JetBrains Mono">High (H1)</text>

              {/* BOS dotted breakout line */}
              <line x1="80" y1="70" x2="280" y2="70" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 4" />
              
              {step >= 2 && (
                <g>
                  {/* Pullback wave */}
                  <polyline points="180,45 220,95" fill="none" stroke="#94A3B8" strokeWidth="2" />
                  <circle cx="220" cy="95" r="3.5" fill="#10B981" />
                  <text x="210" y="112" fill="#10B981" fontSize="10" fontFamily="JetBrains Mono">Higher Low</text>
                </g>
              )}

              {step >= 3 && (
                <g>
                  {/* Breakout impulse */}
                  <polyline points="220,95 280,30" fill="none" stroke="#10B981" strokeWidth="3" />
                  <rect x="235" y="58" width="48" height="20" fill="#10B981" rx="4" />
                  <text x="245" y="72" fill="#090D16" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">BOS</text>
                </g>
              )}

              {step >= 4 && (
                <g>
                  {/* Continuation wave */}
                  <polyline points="280,30 320,60 380,15" fill="none" stroke="#10B981" strokeWidth="2.5" strokeDasharray="2 2" />
                  <circle cx="380" cy="15" r="4" fill="#10B981" />
                  <text x="320" y="15" fill="#10B981" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">New Higher High</text>
                </g>
              )}
            </g>
          )}

          {scenario === 'choch' && (
            <g>
              {/* Uptrend into peak */}
              <polyline points="30,130 90,60 140,100 210,35" fill="none" stroke="#94A3B8" strokeWidth="2" />
              <circle cx="140" cy="100" r="3.5" fill="#F59E0B" />
              <text x="110" y="120" fill="#F59E0B" fontSize="10" fontFamily="JetBrains Mono">Key HL (Protected)</text>

              {/* CHoCH horizontal line at Key Higher Low */}
              <line x1="140" y1="100" x2="350" y2="100" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" />

              {step >= 2 && (
                <g>
                  {/* Reversal drop */}
                  <polyline points="210,35 250,75 290,130" fill="none" stroke="#F43F5E" strokeWidth="2.5" />
                  <circle cx="210" cy="35" r="3.5" fill="#F43F5E" />
                </g>
              )}

              {step >= 3 && (
                <g>
                  <rect x="280" y="90" width="56" height="20" fill="#F59E0B" rx="4" />
                  <text x="290" y="104" fill="#090D16" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">CHoCH!</text>
                  <circle cx="290" cy="130" r="3.5" fill="#F43F5E" />
                  <text x="295" y="145" fill="#F43F5E" fontSize="10" fontFamily="JetBrains Mono">Lower Low</text>
                </g>
              )}

              {step >= 4 && (
                <g>
                  {/* Retest into new Lower High */}
                  <polyline points="290,130 340,90 400,160" fill="none" stroke="#F43F5E" strokeWidth="2.5" strokeDasharray="3 3" />
                  <rect x="330" y="70" width="60" height="18" fill="rgba(244,63,94,0.2)" stroke="#F43F5E" rx="3" />
                  <text x="335" y="83" fill="#F43F5E" fontSize="9" fontFamily="JetBrains Mono">SELL ENTRY</text>
                </g>
              )}
            </g>
          )}

          {scenario === 'sweep' && (
            <g>
              {/* Double Top resistance */}
              <line x1="40" y1="60" x2="400" y2="60" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x="50" y="52" fill="#38BDF8" fontSize="10" fontFamily="JetBrains Mono">Equal Highs (Retail Stops Clustered $$$)</text>

              <polyline points="40,120 90,60 140,100 190,60 230,110" fill="none" stroke="#94A3B8" strokeWidth="2" />

              {step >= 2 && (
                <g>
                  {/* Wick sweep spike */}
                  <line x1="260" y1="110" x2="260" y2="25" stroke="#F43F5E" strokeWidth="3" />
                  <rect x="250" y="45" width="20" height="40" fill="#F43F5E" rx="2" />
                  <circle cx="260" cy="25" r="4" fill="#F43F5E" />
                  <text x="275" y="30" fill="#F43F5E" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">Sweep Wick!</text>
                </g>
              )}

              {step >= 3 && (
                <g>
                  {/* Aggressive Displacement candle */}
                  <line x1="290" y1="50" x2="290" y2="150" stroke="#F43F5E" strokeWidth="2" />
                  <rect x="280" y="60" width="20" height="75" fill="#F43F5E" rx="2" />
                  <text x="310" y="100" fill="#F43F5E" fontSize="10" fontFamily="JetBrains Mono">Displacement Drop</text>
                </g>
              )}

              {step >= 4 && (
                <g>
                  <polyline points="290,135 340,110 390,165" fill="none" stroke="#F43F5E" strokeWidth="2.5" />
                  <text x="330" y="180" fill="#10B981" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">Take Profit Hit (SSL)</text>
                </g>
              )}
            </g>
          )}
        </svg>

        {/* Dynamic Context Explanation */}
        <div className="text-[11px] font-mono text-[#94A3B8] not-dark:text-slate-600 flex items-center justify-between">
          <span className="flex items-center space-x-1.5">
            {scenario === 'bos' && <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />}
            {scenario === 'choch' && <AlertTriangle className="w-3.5 h-3.5 text-[#F59E0B]" />}
            {scenario === 'sweep' && <AlertTriangle className="w-3.5 h-3.5 text-[#F43F5E]" />}
            <span>
              {scenario === 'bos' && (step < 3 ? 'Harga sedang membentuk Higher Low...' : 'Konfirmasi BOS: Tren Bullish Berlanjut')}
              {scenario === 'choch' && (step < 3 ? 'Pengujian Key Level...' : 'CHoCH Terkonfirmasi: Peluang Pergeseran Arah')}
              {scenario === 'sweep' && (step < 3 ? 'Harga mendekati kumpulan Stop Loss...' : 'Likuiditas Terserap: Terjadi Displacement Balik')}
            </span>
          </span>
          <span>Langkah {step} / 4</span>
        </div>
      </div>

      {/* Simulator Bottom Controls */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-xs text-[#94A3B8] not-dark:text-slate-500">
          Uji pemahaman visual pergerakan struktur pasar secara real-time.
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleReset}
            className="p-1.5 text-[#94A3B8] hover:text-white not-dark:hover:text-slate-900 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#10B981] hover:bg-[#059669] text-[#090D16] font-semibold rounded-lg text-xs transition-colors shadow-sm"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Langkah Berikutnya</span>
          </button>
        </div>
      </div>
    </div>
  );
};
