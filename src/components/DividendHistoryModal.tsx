import React from 'react';
import { X, Coins, CheckCircle, ArrowDownToLine, Calendar, ShieldCheck, Sparkles } from 'lucide-react';
import { monthlyDividends, portfolioSummary } from '../data/portfolioData';

interface DividendHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  showValues: boolean;
}

export const DividendHistoryModal: React.FC<DividendHistoryModalProps> = ({ isOpen, onClose, showValues }) => {
  if (!isOpen) return null;

  const formatBRL = (val: number) => {
    if (!showValues) return 'R$ ••••••••';
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] flex flex-col">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
            <Coins className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              Extrato de Juros e Proventos Acumulados
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Rendimentos mensais creditados desde o aporte em Maio/2026 até a data presente ({portfolioSummary.currentDate})
            </p>
          </div>
        </div>

        {/* Total Banner */}
        <div className="mt-4 rounded-2xl bg-emerald-50/60 p-4 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs text-slate-500 uppercase font-bold">Total de Proventos Acumulados</span>
            <p className="font-mono text-2xl sm:text-3xl font-black text-emerald-700">
              +{formatBRL(portfolioSummary.accumulatedDividends)}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-1.5 text-xs text-emerald-800 font-bold border border-emerald-200 shadow-2xs">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>100% Isento de Imposto de Renda</span>
          </div>
        </div>

        {/* Scrollable list */}
        <div className="mt-4 space-y-3 overflow-y-auto pr-1 flex-1">
          {monthlyDividends.map((item) => (
            <div
              key={item.month}
              className="rounded-2xl bg-slate-50/80 p-4 border border-slate-200/80 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs">
                    <Calendar className="h-4 w-4 text-[#FF7A00]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{item.month}</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Creditado em {item.date}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-base font-black text-emerald-700 block">
                    +{formatBRL(item.totalReceived)}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold">
                    Taxa do mês: ~{item.yieldRateMonth.toFixed(2).replace('.', ',')}%
                  </span>
                </div>
              </div>

              {/* By asset breakdown pills */}
              <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase text-slate-500 font-bold">Distribuição:</span>
                {item.detailsByAsset.map((asset) => (
                  <span
                    key={asset.ticker}
                    className="inline-flex items-center gap-1 rounded-lg bg-white px-2 py-0.5 text-[11px] font-mono text-slate-700 border border-slate-200 shadow-2xs"
                  >
                    <strong className="text-slate-900">{asset.ticker}:</strong>
                    <span className="text-emerald-700 font-semibold">{formatBRL(asset.amount)}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#FF7A00] px-6 py-2.5 text-sm font-bold text-white shadow-sm shadow-[#FF7A00]/30 hover:bg-[#E06900] transition-all cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
