import React from 'react';
import { X, Printer, ShieldCheck, Download, CheckCircle2, Lock } from 'lucide-react';
import { portfolioSummary, fiiAssets } from '../data/portfolioData';

interface OfficialReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  showValues: boolean;
}

export const OfficialReportModal: React.FC<OfficialReportModalProps> = ({ isOpen, onClose, showValues }) => {
  if (!isOpen) return null;

  const formatBRL = (val: number) => {
    if (!showValues) return 'R$ ••••••••';
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in print:p-0 print:bg-white">
      <div className="relative w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto print:max-h-none print:border-0 print:bg-white print:text-black">
        {/* Close button (hidden in print) */}
        <button
          type="button"
          onClick={onClose}
          className="print:hidden absolute right-5 top-5 rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Report Header */}
        <div className="flex items-center justify-between border-b border-slate-100 print:border-neutral-300 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-16 items-center justify-center overflow-hidden rounded-2xl bg-[#FF7A00] p-0.5 shadow-md border border-[#FF7A00]/20">
              <img
                src="/banco-inter-logo.jpg"
                alt="Logo Banco Inter"
                className="h-full w-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 print:text-black tracking-tight">BANCO INTER S.A.</h1>
              <p className="text-xs text-slate-500 print:text-neutral-600">
                Inter DTVM Ltda. • CNPJ: 18.945.670/0001-46 • Registro CVM nº 356
              </p>
              <p className="text-[11px] text-[#FF7A00] font-bold">
                DEMONSTRATIVO CONSOLIDADO DE CUSTÓDIA & RENDIMENTO
              </p>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-500 print:text-neutral-600 block">Posição Apurada em</span>
            <strong className="font-mono text-sm text-slate-900 print:text-black">{portfolioSummary.currentDate}</strong>
          </div>
        </div>

        {/* Lockup Alert Strip */}
        <div className="mt-4 rounded-xl border border-[#FF7A00]/30 bg-[#FFF9F5] p-3.5 text-xs text-slate-800 print:text-amber-900 print:bg-amber-50">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Lock className="h-4 w-4 shrink-0 text-[#FF7A00] print:text-amber-800" />
            <span>AVISO DE CARÊNCIA: SALDO BLOQUEADO ATÉ {portfolioSummary.lockupEndDate}</span>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-slate-600 print:text-neutral-700">
            Aporte estruturado de fundos imobiliários com prazo de bloqueio até 31/10/2026. Resgate antecipado não permitido durante o período de carência.
          </p>
        </div>

        {/* Customer & Investment Summary */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl bg-slate-50 print:bg-neutral-100 p-4 border border-slate-200/80 print:border-neutral-300 text-xs">
          <div>
            <span className="text-slate-500 print:text-neutral-600 block font-medium">Titular da Conta</span>
            <strong className="text-slate-900 print:text-black block text-sm">{portfolioSummary.accountHolder}</strong>
            <span className="text-slate-400 font-mono">{portfolioSummary.accountNumber}</span>
          </div>

          <div>
            <span className="text-slate-500 print:text-neutral-600 block font-medium">Aporte Inicial</span>
            <strong className="text-slate-900 print:text-black block text-sm">{formatBRL(portfolioSummary.initialContribution)}</strong>
            <span className="text-slate-400">Data: {portfolioSummary.contributionDate}</span>
          </div>

          <div>
            <span className="text-slate-500 print:text-neutral-600 block font-medium">Rendimento Acumulado</span>
            <strong className="text-emerald-700 print:text-emerald-700 block text-sm font-bold">
              +{portfolioSummary.currentYieldRate.toFixed(2).replace('.', ',')}%
            </strong>
            <span className="text-emerald-700 font-medium">+{formatBRL(portfolioSummary.totalProfitAmount)}</span>
          </div>

          <div>
            <span className="text-slate-500 print:text-neutral-600 block font-medium">Montante Atual Corrigido</span>
            <strong className="text-slate-950 print:text-black block text-base font-mono font-black">
              {formatBRL(portfolioSummary.totalCorrectedAmount)}
            </strong>
            <span className="text-[#FF7A00] print:text-amber-700 text-[10px] font-bold">Bloqueado até 31/10</span>
          </div>
        </div>

        {/* FII Table */}
        <div className="mt-6">
          <h2 className="text-xs uppercase font-bold text-slate-700 print:text-neutral-700 tracking-wider mb-3">
            Detalhamento por Ativo em Carteira
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 print:border-neutral-300">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 print:bg-neutral-200 text-slate-700 print:text-neutral-700 font-bold border-b border-slate-200 print:border-neutral-300">
                <tr>
                  <th className="p-3">Fundo (Ticker)</th>
                  <th className="p-3">Cotas</th>
                  <th className="p-3">Preço Compra</th>
                  <th className="p-3">Cotação Atual</th>
                  <th className="p-3">Proventos</th>
                  <th className="p-3">Montante Total</th>
                  <th className="p-3 text-right">Retorno</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 print:divide-neutral-200">
                {fiiAssets.map((asset) => {
                  const total = asset.currentValuation + asset.accumulatedDividends;
                  return (
                    <tr key={asset.ticker} className="hover:bg-slate-50 print:hover:bg-transparent">
                      <td className="p-3 font-mono font-bold text-slate-900 print:text-black">
                        {asset.ticker}
                        <span className="block text-[10px] font-normal text-slate-500 print:text-neutral-600">
                          {asset.segment}
                        </span>
                      </td>
                      <td className="p-3 text-slate-700 print:text-black font-mono">{asset.shares}</td>
                      <td className="p-3 text-slate-700 print:text-black font-mono">{formatBRL(asset.initialSharePrice)}</td>
                      <td className="p-3 text-slate-700 print:text-black font-mono">{formatBRL(asset.currentSharePrice)}</td>
                      <td className="p-3 text-emerald-700 print:text-emerald-700 font-mono font-semibold">+{formatBRL(asset.accumulatedDividends)}</td>
                      <td className="p-3 font-bold text-slate-900 print:text-black font-mono">{formatBRL(total)}</td>
                      <td className="p-3 text-right font-bold text-emerald-700 print:text-emerald-700">
                        +{asset.yieldPercentage.toFixed(1).replace('.', ',')}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-100 print:bg-neutral-200 font-bold border-t border-slate-200 print:border-neutral-300 text-slate-900 print:text-black">
                <tr>
                  <td className="p-3" colSpan={4}>TOTAL CONSOLIDADO (100%)</td>
                  <td className="p-3 text-emerald-700 print:text-emerald-700 font-mono font-bold">+{formatBRL(portfolioSummary.accumulatedDividends)}</td>
                  <td className="p-3 font-mono text-sm font-black">{formatBRL(portfolioSummary.totalCorrectedAmount)}</td>
                  <td className="p-3 text-right text-emerald-700 print:text-emerald-700 font-mono font-bold">+{portfolioSummary.currentYieldRate.toFixed(2).replace('.', ',')}%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Legal & Fiscal notes */}
        <div className="mt-6 text-[11px] text-slate-500 print:text-neutral-600 space-y-1 leading-relaxed">
          <p>
            • <strong>Isenção Fiscal:</strong> Os rendimentos distribuídos por Fundos Imobiliários (FIIs) são isentos de Imposto de Renda Retido na Fonte (IRRF) para pessoas físicas, conforme preceitua a Lei nº 11.033/2004.
          </p>
          <p>
            • <strong>Autenticação B3:</strong> Código de Custódia Eletrônica: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">B3-INT-20260919-94821037-LOCK</code>
          </p>
        </div>

        {/* Actions (hidden in print) */}
        <div className="print:hidden mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Fechar
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-xl bg-[#FF7A00] px-5 py-2.5 text-xs font-bold text-white shadow-sm shadow-[#FF7A00]/30 hover:bg-[#E06900] transition-all cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>Imprimir / Salvar PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
