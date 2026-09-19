import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Coins, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight,
  HelpCircle,
  Calendar,
  Lock
} from 'lucide-react';
import { portfolioSummary } from '../data/portfolioData';

interface ConsolidatedHeroProps {
  showValues: boolean;
  onViewDividends: () => void;
}

export const ConsolidatedHero: React.FC<ConsolidatedHeroProps> = ({ showValues, onViewDividends }) => {
  const formatBRL = (val: number) => {
    if (!showValues) return 'R$ ••••••••';
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-[#FF7A00]/10 px-2.5 py-1 text-xs font-bold text-[#FF7A00] border border-[#FF7A00]/20">
            CARTEIRA DIVERSIFICADA FII
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Aporte inicial: <strong className="text-slate-900">Maio/2026</strong> ({formatBRL(portfolioSummary.initialContribution)})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            Posição Atualizada em {portfolioSummary.currentDate}
          </span>
        </div>
      </div>

      {/* Main Metric Spotlight */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        {/* Left Col: Big Amount & Yield Rate */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Montante Total Corrigido</span>
            <span className="inline-flex items-center gap-1 text-[#FF7A00] text-[11px] bg-[#FF7A00]/10 px-2 py-0.5 rounded-full font-bold border border-[#FF7A00]/20">
              <Lock className="h-3 w-3" /> Bloqueado até 31/10/26
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-4">
            <h1 className="font-mono text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              {formatBRL(portfolioSummary.totalCorrectedAmount)}
            </h1>

            <div className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-1.5 text-sm sm:text-base font-black text-emerald-700 border border-emerald-200">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <span>+{portfolioSummary.currentYieldRate.toFixed(2).replace('.', ',')}%</span>
            </div>
          </div>

          {/* Profit subtext */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
            <span>
              Lucro Total Acumulado:{' '}
              <strong className="text-emerald-700 font-mono font-bold">
                +{formatBRL(portfolioSummary.totalProfitAmount)}
              </strong>
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">
              Superando o CDI em <strong className="text-slate-900">{portfolioSummary.benchmarkComparison.relativeToCdi}%</strong>
            </span>
          </div>
        </div>

        {/* Right Col: Detailed Breakdown Cards */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Card 1: Valorização dos Ativos */}
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80 hover:border-[#FF7A00]/40 transition-all">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold">Valorização das Cotas</span>
              <TrendingUp className="h-4 w-4 text-[#FF7A00]" />
            </div>
            <p className="mt-2 font-mono text-lg sm:text-xl font-black text-slate-900">
              +{formatBRL(portfolioSummary.capitalAppreciation)}
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              +8,15% ganho patrimonial
            </p>
          </div>

          {/* Card 2: Juros e Proventos Acumulados */}
          <div 
            onClick={onViewDividends}
            className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80 hover:border-emerald-500/50 hover:bg-emerald-50/40 transition-all cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold group-hover:text-emerald-700 transition-colors">Juros / Dividendos</span>
              <Coins className="h-4 w-4 text-emerald-600 group-hover:scale-110 transition-transform" />
            </div>
            <p className="mt-2 font-mono text-lg sm:text-xl font-black text-emerald-700">
              +{formatBRL(portfolioSummary.accumulatedDividends)}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 flex items-center justify-between font-medium">
              <span>+5,10% proventos</span>
              <span className="text-emerald-700 font-bold underline underline-offset-2">ver extrato</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Summary Strip */}
      <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="flex items-center gap-2.5 text-slate-700">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <p className="font-bold text-slate-900">100% Isento de IR</p>
            <p className="text-[11px] text-slate-500">Pessoa física (Lei 11.033/04)</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-slate-700">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF9F5] text-[#FF7A00] border border-[#FF7A00]/25">
            <Calendar className="h-4 w-4" />
          </div>
          <div>
            <p className="font-bold text-slate-900">Carência até 31/10/2026</p>
            <p className="text-[11px] text-slate-500">Desbloqueio em 42 dias</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-slate-700">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
            <ArrowUpRight className="h-4 w-4" />
          </div>
          <div>
            <p className="font-bold text-slate-900">Projeção no Desbloqueio</p>
            <p className="text-[11px] text-slate-500 font-mono font-medium">
              {formatBRL(portfolioSummary.projectedAmountAtLockupEnd)} (~17,6%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
