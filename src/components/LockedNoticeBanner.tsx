import React from 'react';
import { Lock, Clock, AlertCircle, ShieldAlert, CheckCircle2, Calendar, Info } from 'lucide-react';
import { portfolioSummary } from '../data/portfolioData';

interface LockedNoticeBannerProps {
  showValues: boolean;
}

export const LockedNoticeBanner: React.FC<LockedNoticeBannerProps> = ({ showValues }) => {
  const percentElapsed = Math.round(
    (portfolioSummary.daysElapsed / portfolioSummary.totalDaysLocked) * 100
  );

  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-[#FF7A00]/30 bg-white p-6 shadow-md">
      {/* Background ambient accent */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#FF7A00]/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Lock Status Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FF7A00]/10 border border-[#FF7A00]/25 text-[#FF7A00] shadow-xs">
            <Lock className="h-6 w-6" />
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF7A00]/10 px-3 py-1 text-xs font-black text-[#FF7A00] border border-[#FF7A00]/25">
                <ShieldAlert className="h-3.5 w-3.5" />
                SALDO BLOQUEADO PARA RESGATE
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Carência contratual de investimento
              </span>
            </div>

            <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl">
              Disponível para saque e liquidação em{' '}
              <span className="text-[#FF7A00] font-black underline decoration-[#FF7A00]/40 underline-offset-4">
                {portfolioSummary.lockupEndDate}
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              O aporte de {showValues ? 'R$ 10.000,00' : '••••••••'} realizado em{' '}
              <strong className="text-slate-900 font-bold">Maio/2026</strong> encontra-se em período de lock-up estratégico.
              Os proventos e a valorização de <strong className="text-slate-900 font-bold">+13,25%</strong> continuam sendo contabilizados e reinvestidos
              automaticamente na sua posição até a data de desbloqueio.
            </p>
          </div>
        </div>

        {/* Right: Countdown & Progress Widget */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 rounded-2xl bg-[#FFF9F5] p-4.5 border border-[#FF7A00]/20 lg:min-w-[290px] shadow-xs">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <Clock className="h-3.5 w-3.5 text-[#FF7A00]" />
              <span>Contagem regressiva:</span>
            </div>
            <span className="font-mono text-sm font-black text-[#FF7A00]">
              {portfolioSummary.daysRemaining} dias restantes
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full space-y-1.5">
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>{portfolioSummary.contributionDate}</span>
              <span className="font-bold text-slate-800">{percentElapsed}% decorrido</span>
              <span className="text-[#FF7A00] font-bold">{portfolioSummary.lockupEndDate}</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFA143] transition-all duration-700"
                style={{ width: `${percentElapsed}%` }}
              />
            </div>
          </div>

          {/* Quick Notice */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>Desbloqueio automático sem taxas adicionais</span>
          </div>
        </div>
      </div>
    </div>
  );
};
