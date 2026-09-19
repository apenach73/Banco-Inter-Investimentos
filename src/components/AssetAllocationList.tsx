import React, { useState } from 'react';
import { 
  Building2, 
  Warehouse, 
  ShoppingBag, 
  FileText, 
  Briefcase, 
  ChevronRight, 
  TrendingUp, 
  Coins, 
  Percent,
  CheckCircle,
  ExternalLink,
  Info
} from 'lucide-react';
import { fiiAssets } from '../data/portfolioData';
import { FIIAsset } from '../types';

interface AssetAllocationListProps {
  showValues: boolean;
  onSelectAsset: (asset: FIIAsset) => void;
}

export const AssetAllocationList: React.FC<AssetAllocationListProps> = ({ showValues, onSelectAsset }) => {
  const [selectedSegment, setSelectedSegment] = useState<string>('Todos');

  const segments = ['Todos', 'Logística', 'Papel / CRI', 'Shoppings', 'Lajes Corporativas'];

  const filteredAssets = selectedSegment === 'Todos'
    ? fiiAssets
    : fiiAssets.filter(a => a.segment === selectedSegment);

  const formatBRL = (val: number) => {
    if (!showValues) return 'R$ ••••••••';
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const getSegmentIcon = (segment: string) => {
    switch (segment) {
      case 'Logística':
        return <Warehouse className="h-4 w-4 text-blue-400" />;
      case 'Papel / CRI':
        return <FileText className="h-4 w-4 text-emerald-400" />;
      case 'Shoppings':
        return <ShoppingBag className="h-4 w-4 text-purple-400" />;
      case 'Lajes Corporativas':
        return <Building2 className="h-4 w-4 text-amber-400" />;
      default:
        return <Briefcase className="h-4 w-4 text-[#FF8714]" />;
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header & Segments Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              Composição da Carteira Diversificada
            </h2>
            <span className="rounded-full bg-[#FF7A00]/10 px-2.5 py-0.5 text-xs font-black text-[#FF7A00] border border-[#FF7A00]/20">
              5 Fundos
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Fundos Imobiliários selecionados com diversificação por setor, liquidez diária e renda isenta
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
          {segments.map((seg) => {
            const isActive = selectedSegment === seg;
            return (
              <button
                key={seg}
                type="button"
                onClick={() => setSelectedSegment(seg)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#FF7A00] text-white shadow-xs shadow-[#FF7A00]/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/60'
                }`}
              >
                {seg}
              </button>
            );
          })}
        </div>
      </div>

      {/* Asset Cards List */}
      <div className="mt-5 space-y-3">
        {filteredAssets.map((asset) => {
          const totalValuation = asset.currentValuation + asset.accumulatedDividends;
          return (
            <div
              key={asset.ticker}
              onClick={() => onSelectAsset(asset)}
              className="group relative flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl bg-slate-50/70 p-4 border border-slate-200/80 transition-all hover:bg-white hover:border-[#FF7A00]/50 hover:shadow-sm cursor-pointer"
            >
              {/* Left Column: Ticker, Name, Sector */}
              <div className="flex items-center gap-3.5 min-w-[240px]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 group-hover:border-[#FF7A00]/40 transition-colors shadow-2xs">
                  {getSegmentIcon(asset.segment)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-black text-slate-900 group-hover:text-[#FF7A00] transition-colors">
                      {asset.ticker}
                    </span>
                    <span className="rounded bg-slate-200/70 px-1.5 py-0.5 text-[10px] font-bold text-slate-700">
                      {asset.segment}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1 mt-0.5 font-medium">
                    {asset.name}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {asset.shares} cotas • PM: {formatBRL(asset.initialSharePrice)}
                  </p>
                </div>
              </div>

              {/* Middle Column: Current Price & Capital Gain */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6 text-left md:text-right">
                {/* Cotacao atual */}
                <div>
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Cotação Atual</span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-slate-900">
                    {formatBRL(asset.currentSharePrice)}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold block">
                    +{((asset.currentSharePrice / asset.initialSharePrice - 1) * 100).toFixed(1)}% cotas
                  </span>
                </div>

                {/* Proventos pagos */}
                <div>
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Juros / Dividendos</span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-emerald-700 flex items-center md:justify-end gap-1">
                    <Coins className="h-3 w-3 text-emerald-600" />
                    +{formatBRL(asset.accumulatedDividends)}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium block">
                    DY {asset.dividendYieldAnnualized}% a.a.
                  </span>
                </div>

                {/* Total Corrigido & Yield */}
                <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Montante Atual</span>
                  <span className="font-mono text-sm sm:text-base font-black text-slate-900 block">
                    {formatBRL(totalValuation)}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-black text-emerald-700">
                    <TrendingUp className="h-3 w-3 text-emerald-600" />
                    +{asset.yieldPercentage.toFixed(1).replace('.', ',')}%
                  </span>
                </div>
              </div>

              {/* Right: Chevron */}
              <div className="hidden md:flex items-center text-slate-400 group-hover:text-[#FF7A00] group-hover:translate-x-1 transition-all">
                <ChevronRight className="h-5 w-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <span>Rendimentos de FIIs são 100% isentos de I.R. para pessoa física</span>
        </div>
        <span>Clique em qualquer fundo para ver histórico e laudo detalhado</span>
      </div>
    </div>
  );
};
