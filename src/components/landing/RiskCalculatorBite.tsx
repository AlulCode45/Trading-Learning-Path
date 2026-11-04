import React, { useState } from 'react';
import { DollarSign, Shield, Percent, Target } from 'lucide-react';

export const RiskCalculatorBite: React.FC = () => {
  const [balance, setBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [rewardRatio, setRewardRatio] = useState<number>(3);
  const [sampleWinRate, setSampleWinRate] = useState<number>(40); // 40% win rate

  const riskAmount = (balance * riskPercent) / 100;
  const rewardAmount = riskAmount * rewardRatio;

  // 20 trades simulation
  const totalTrades = 20;
  const wins = Math.round((totalTrades * sampleWinRate) / 100);
  const losses = totalTrades - wins;
  const totalGains = wins * rewardAmount;
  const totalLosses = losses * riskAmount;
  const netProfit = totalGains - totalLosses;
  const breakevenWinRate = Math.round((1 / (1 + rewardRatio)) * 100);

  return (
    <div className="bg-[#0F172A] dark:bg-[#0F172A] not-dark:bg-white border border-[#1E293B] not-dark:border-slate-200 rounded-2xl p-6 shadow-xl transition-all">
      <div className="flex items-center justify-between pb-4 border-b border-[#1E293B] not-dark:border-slate-200">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#10B981] font-semibold flex items-center space-x-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>Kalkulator Probabilitas Asimetris</span>
          </span>
          <h3 className="text-base font-bold text-[#F8FAFC] not-dark:text-slate-900 mt-1">
            Mengapa 1:3 R:R Mengubah Hasil Trading
          </h3>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
          Math-First Edge
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        {/* Sliders Column */}
        <div className="space-y-4 md:col-span-2">
          {/* Capital Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-[#94A3B8] not-dark:text-slate-600">Modal Akun (Account Equity):</span>
              <span className="text-[#F8FAFC] not-dark:text-slate-900 font-bold">${balance.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={balance}
              onChange={e => setBalance(Number(e.target.value))}
              className="w-full h-1.5 bg-[#1E293B] not-dark:bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#10B981]"
            />
          </div>

          {/* Risk Percentage Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-[#94A3B8] not-dark:text-slate-600">Risiko Maksimal per Trade:</span>
              <span className="text-[#10B981] font-bold">{riskPercent}% (${riskAmount.toFixed(0)})</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={riskPercent}
              onChange={e => setRiskPercent(Number(e.target.value))}
              className="w-full h-1.5 bg-[#1E293B] not-dark:bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#10B981]"
            />
          </div>

          {/* Target R:R */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-[#94A3B8] not-dark:text-slate-600">Target Risk/Reward (R:R):</span>
              <span className="text-[#38BDF8] font-bold">1 : {rewardRatio} (${rewardAmount.toFixed(0)} Gain)</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="0.5"
              value={rewardRatio}
              onChange={e => setRewardRatio(Number(e.target.value))}
              className="w-full h-1.5 bg-[#1E293B] not-dark:bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
            />
          </div>
        </div>

        {/* Dynamic Metric Output Box */}
        <div className="bg-[#090D16] not-dark:bg-slate-50 border border-[#1E293B] not-dark:border-slate-200 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-[#94A3B8] not-dark:text-slate-500 uppercase">
              Simulasi 20 Eksekusi ({sampleWinRate}% Win Rate)
            </div>
            <div className="mt-2 space-y-1 text-xs font-mono">
              <div className="flex justify-between text-[#F43F5E]">
                <span>{losses} Posisi Loss (Salah):</span>
                <span>-${totalLosses.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-[#10B981]">
                <span>{wins} Posisi Win (Benar):</span>
                <span>+${totalGains.toFixed(0)}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#1E293B] not-dark:border-slate-200">
            <div className="text-[11px] font-mono text-[#94A3B8] not-dark:text-slate-500">Hasil Bersih (Net Gain):</div>
            <div className={`text-xl font-mono font-bold mt-0.5 ${netProfit >= 0 ? 'text-[#10B981]' : 'text-[#F43F5E]'}`}>
              {netProfit >= 0 ? `+$${netProfit.toFixed(0)}` : `-$${Math.abs(netProfit).toFixed(0)}`}
            </div>
            <div className="text-[10px] font-mono text-[#94A3B8] mt-1">
              Breakeven hanya butuh win rate <strong className="text-[#F8FAFC] not-dark:text-slate-900">{breakevenWinRate}%</strong>!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
