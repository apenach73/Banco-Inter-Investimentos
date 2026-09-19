import React, { useState } from 'react';
import { Calendar, Lock, Unlock, ArrowRight, ShieldCheck, CheckCircle, Sparkles, RefreshCw } from 'lucide-react';
import { portfolioSummary } from '../data/portfolioData';

interface ProjectionSimulatorProps {
  showValues: boolean;
}

export const ProjectionSimulator: React.FC<ProjectionSimulatorProps> = ({ showValues }) => {
  const [selectedUnlockAction, setSelectedUnlockAction] = useState<'reinvest' | 'checking_account' | 'keep_fii'>('keep_fii');
  const [simulatedAporte, setSimulatedAporte] = useState<number>(10000);

  const formatBRL = (val: number) => {
    if (!showValues) return 'R$ ••••••••';
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Unlock className="h-5 w-5 text-[#FF7A00]" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              Planejamento de Desbloqueio (31/10/2026)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Configure com antecedência o que acontecerá automaticamente no término da carência
          </p>
        </div>

        <div className="rounded-full bg-[#FFF9F5] px-3 py-1 text-xs font-black text-[#FF7A00] border border-[#FF7A00]/25">
          Faltam 42 dias
        </div>
      </div>

      {/* Projection Comparison Box */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Box 1: Aporte Inicial */}
        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80">
          <span className="text-xs text-slate-500 font-medium block">Aporte Inicial (Maio/26)</span>
          <p className="font-mono text-lg sm:text-xl font-bold text-slate-900 mt-1">
            {formatBRL(portfolioSummary.initialContribution)}
          </p>
          <span className="text-[11px] text-slate-400 block mt-1">Capital inicial investido</span>
        </div>

        {/* Box 2: Presente Data */}
        <div className="rounded-2xl bg-[#FFF9F5] p-4 border border-[#FF7A00]/30 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#FF7A00] font-bold block">Hoje ({portfolioSummary.currentDate})</span>
            <span className="rounded bg-[#FF7A00]/20 px-1.5 py-0.5 text-[10px] font-black text-[#FF7A00]">
              Atual
            </span>
          </div>
          <p className="font-mono text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {formatBRL(portfolioSummary.totalCorrectedAmount)}
          </p>
          <span className="text-[11px] text-emerald-700 font-bold block mt-1">
            +{portfolioSummary.currentYieldRate.toFixed(2).replace('.', ',')}% (+{formatBRL(portfolioSummary.totalProfitAmount)})
          </span>
        </div>

        {/* Box 3: Data de Desbloqueio */}
        <div className="rounded-2xl bg-amber-50/70 p-4 border border-amber-300/60">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-900 font-bold block">No Desbloqueio (31/10/26)</span>
            <span className="rounded bg-amber-200/70 px-1.5 py-0.5 text-[10px] font-black text-amber-900">
              Projeção
            </span>
          </div>
          <p className="font-mono text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {formatBRL(portfolioSummary.projectedAmountAtLockupEnd)}
          </p>
          <span className="text-[11px] text-amber-800 font-bold block mt-1">
            ~17,6% projetado (+{formatBRL(portfolioSummary.projectedAmountAtLockupEnd - portfolioSummary.initialContribution)})
          </span>
        </div>
      </div>

      {/* Action Preference at Unlock */}
      <div className="mt-6 space-y-3">
        <label className="text-xs uppercase font-bold text-slate-600 tracking-wider block">
          Instrução Programada para 31/10/2026:
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Option 1: Keep in FII */}
          <button
            type="button"
            onClick={() => setSelectedUnlockAction('keep_fii')}
            className={`rounded-2xl p-4 text-left border transition-all cursor-pointer flex flex-col justify-between ${
              selectedUnlockAction === 'keep_fii'
                ? 'border-[#FF7A00] bg-[#FFF9F5] shadow-xs'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900">Manter em FIIs</span>
                {selectedUnlockAction === 'keep_fii' && <CheckCircle className="h-4 w-4 text-[#FF7A00]" />}
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                Continua recebendo proventos mensais isentos de I.R. diretamente na sua conta Inter.
              </p>
            </div>
            <span className="mt-2 text-[10px] text-[#FF7A00] font-bold">Recomendação Inter</span>
          </button>

          {/* Option 2: Auto transfer to checking account */}
          <button
            type="button"
            onClick={() => setSelectedUnlockAction('checking_account')}
            className={`rounded-2xl p-4 text-left border transition-all cursor-pointer flex flex-col justify-between ${
              selectedUnlockAction === 'checking_account'
                ? 'border-[#FF7A00] bg-[#FFF9F5] shadow-xs'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900">Crédito em Conta</span>
                {selectedUnlockAction === 'checking_account' && <CheckCircle className="h-4 w-4 text-[#FF7A00]" />}
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                Liquidação integral e crédito de todo o saldo corrigido na Conta Corrente Inter no dia 31/10/2026.
              </p>
            </div>
            <span className="mt-2 text-[10px] text-slate-500 font-semibold">Sem taxa de resgate</span>
          </button>

          {/* Option 3: Reinvest in Fixed Income / Inter Invest */}
          <button
            type="button"
            onClick={() => setSelectedUnlockAction('reinvest')}
            className={`rounded-2xl p-4 text-left border transition-all cursor-pointer flex flex-col justify-between ${
              selectedUnlockAction === 'reinvest'
                ? 'border-[#FF7A00] bg-[#FFF9F5] shadow-xs'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900">Reinvestir em LCI Inter</span>
                {selectedUnlockAction === 'reinvest' && <CheckCircle className="h-4 w-4 text-[#FF7A00]" />}
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                Migra o montante total para LCI Inter 95% do CDI com garantia FGC e isenção de IR.
              </p>
            </div>
            <span className="mt-2 text-[10px] text-emerald-700 font-bold">Garantia FGC R$ 250k</span>
          </button>
        </div>
      </div>
    </div>
  );
};
