import React from 'react';
import { X, TrendingUp, Coins, ShieldCheck, Lock, ExternalLink, Building2, Calendar, FileText } from 'lucide-react';
import { FIIAsset } from '../types';
import { portfolioSummary } from '../data/portfolioData';

interface AssetDetailModalProps {
  asset: FIIAsset | null;
  onClose: () => void;
  showValues: boolean;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({ asset, onClose, showValues }) => {
  if (!asset) return null;

  const formatBRL = (val: number) => {
    if (!showValues) return 'R$ ••••••••';
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const totalValue = asset.currentValuation + asset.accumulatedDividends;
  const capitalGain = asset.currentValuation - asset.initialAllocation;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF9F5] text-[#FF7A00] border border-[#FF7A00]/25 font-black font-mono text-lg">
            {asset.ticker.slice(0, 4)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900 font-mono">{asset.ticker}</h2>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700">
                {asset.segment}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{asset.name}</p>
          </div>
        </div>

        {/* Lock Notice for this asset */}
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-50 p-3 border border-amber-200 text-xs text-amber-900">
          <Lock className="h-4 w-4 shrink-0 text-amber-700" />
          <span>
            Ativo integrado à carteira em carência. Saldo bloqueado até <strong className="text-amber-950">{portfolioSummary.lockupEndDate}</strong>.
          </span>
        </div>

        {/* Highlighted Value Card */}
        <div className="mt-4 rounded-2xl bg-slate-50 p-4 border border-slate-200/80 space-y-1">
          <span className="text-xs uppercase text-slate-500 font-bold">Montante Atual Corrigido</span>
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-2xl sm:text-3xl font-black text-slate-900">
              {formatBRL(totalValue)}
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              +{asset.yieldPercentage.toFixed(1).replace('.', ',')}%
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Aporte inicial alocado: {formatBRL(asset.initialAllocation)} ({asset.portfolioPercentage}% da carteira)
          </p>
        </div>

        {/* Breakdown Stats Grid */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl bg-slate-50/70 p-3 border border-slate-200/80">
            <span className="text-slate-500 font-medium block">Cotas sob Custódia</span>
            <span className="font-mono text-sm font-bold text-slate-900 block mt-0.5">{asset.shares} cotas</span>
            <span className="text-[10px] text-slate-400">Compradas em 15/05/26</span>
          </div>

          <div className="rounded-xl bg-slate-50/70 p-3 border border-slate-200/80">
            <span className="text-slate-500 font-medium block">Preço Médio (Maio/26)</span>
            <span className="font-mono text-sm font-bold text-slate-900 block mt-0.5">{formatBRL(asset.initialSharePrice)}</span>
            <span className="text-[10px] text-slate-400">Custo de aquisição</span>
          </div>

          <div className="rounded-xl bg-slate-50/70 p-3 border border-slate-200/80">
            <span className="text-slate-500 font-medium block">Cotação Atual (19/09/26)</span>
            <span className="font-mono text-sm font-bold text-slate-900 block mt-0.5">{formatBRL(asset.currentSharePrice)}</span>
            <span className="text-[10px] text-emerald-700 font-bold">
              +{((asset.currentSharePrice / asset.initialSharePrice - 1) * 100).toFixed(1)}% valorização
            </span>
          </div>

          <div className="rounded-xl bg-slate-50/70 p-3 border border-slate-200/80">
            <span className="text-slate-500 font-medium block">Juros / Dividendos Pagos</span>
            <span className="font-mono text-sm font-bold text-emerald-700 block mt-0.5">+{formatBRL(asset.accumulatedDividends)}</span>
            <span className="text-[10px] text-slate-500 font-medium">DY {asset.dividendYieldAnnualized}% a.a.</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-[#FF7A00] py-2.5 text-sm font-bold text-white shadow-sm shadow-[#FF7A00]/25 transition-all hover:bg-[#E06900] cursor-pointer"
          >
            Fechar Detalhes
          </button>
        </div>
      </div>
    </div>
  );
};
