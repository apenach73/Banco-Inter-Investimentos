import React, { useState } from 'react';
import { 
  Lock, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  Calendar, 
  AlertTriangle, 
  ArrowRight,
  HelpCircle,
  FileText
} from 'lucide-react';
import { calculateInvestmentMetrics } from '../utils/dateCalculations';
import { RedemptionComplianceModal } from './RedemptionComplianceModal';

interface LockedNoticeBannerProps {
  showValues: boolean;
}

export const LockedNoticeBanner: React.FC<LockedNoticeBannerProps> = ({ showValues }) => {
  const [isRedemptionModalOpen, setIsRedemptionModalOpen] = useState<boolean>(false);
  const metrics = calculateInvestmentMetrics();

  const formatBRL = (val: number) => {
    if (!showValues) return 'R$ ••••••••';
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl border-2 border-[#FF7A00]/30 bg-white p-6 sm:p-8 shadow-sm">
        {/* Subtle orange background aura */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#FF7A00]/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Column: Lock Status & Mandatory Warning */}
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FF7A00]/10 border border-[#FF7A00]/25 text-[#FF7A00] shadow-xs">
              <Lock className="h-6 w-6" />
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF7A00]/10 px-3.5 py-1 text-xs font-black text-[#FF7A00] border border-[#FF7A00]/25 tracking-wide uppercase">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  SALDO BLOQUEADO PARA RESGATE
                </span>
              </div>

              {/* Specific contractual requirement text */}
              <div className="rounded-xl bg-amber-50/80 px-3.5 py-2 border border-amber-200/80 text-xs font-semibold text-amber-900 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                <span>
                  Carência contratual de investimento sob cobrança de taxas de 28% a título de IOF, IRPF e taxas administrativas.
                </span>
              </div>

              <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl pt-1">
                Disponível para saque e liquidação em{' '}
                <span className="text-[#FF7A00] font-black underline decoration-[#FF7A00]/40 underline-offset-4">
                  {metrics.lockupEndDate}
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                O aporte de {formatBRL(metrics.initialContribution)} realizado em{' '}
                <strong className="text-slate-900 font-bold">Maio/2026</strong> encontra-se em período de lock-up estratégico.
                Os proventos e a valorização de <strong className="text-emerald-700 font-bold">+{metrics.currentYieldRate.toFixed(2).replace('.', ',')}%</strong> continuam
                sendo contabilizados e reinvestidos automaticamente na sua posição até a data de desbloqueio.
              </p>

              {/* Botão de Resgate Solicitado */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsRedemptionModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#FF7A00] px-5 py-2.5 text-xs font-black text-white shadow-md shadow-[#FF7A00]/25 hover:bg-[#E06900] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <Lock className="h-4 w-4" />
                  <span>Solicitar Resgate de Saldo</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <span className="ml-3 text-[11px] text-slate-500 font-medium">
                  Sujeito a análise de conformidade PLD e termo de carência
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Countdown, Progress & Unlock Details */}
          <div className="flex flex-col gap-3 rounded-2xl bg-[#FFF9F5] p-5 border border-[#FF7A00]/25 lg:min-w-[320px] shadow-xs">
            {/* Countdown Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-700 font-bold">
                <Clock className="h-4 w-4 text-[#FF7A00]" />
                <span>Contagem regressiva:</span>
              </div>
              <span className="font-mono text-sm font-black text-[#FF7A00]">
                {metrics.daysRemaining} dias restantes
              </span>
            </div>

            <p className="text-[11px] text-slate-500 font-medium">
              Quantitativo de dias restantes até o resgate
            </p>

            {/* Timeline & Progress Bar */}
            <div className="w-full space-y-2 pt-1">
              <div className="flex justify-between items-center text-[11px] font-semibold text-slate-600">
                <span className="font-mono text-slate-700">{metrics.contributionDate}</span>
                <span className="font-black text-[#FF7A00] bg-white px-2 py-0.5 rounded-full border border-[#FF7A00]/20 shadow-2xs">
                  {metrics.percentElapsed}% decorrido
                </span>
                <span className="font-mono text-[#FF7A00] font-black">{metrics.lockupEndDate}</span>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFA143] transition-all duration-700 shadow-xs"
                  style={{ width: `${metrics.percentElapsed}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Início do Aporte</span>
                <span>A porcentagem do tempo decorrido</span>
                <span>Data desbloqueio {metrics.lockupEndDate}</span>
              </div>
            </div>

            {/* Guarantee Note */}
            <div className="pt-2 border-t border-[#FF7A00]/15 flex items-center gap-2 text-xs text-slate-700 font-semibold">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Desbloqueio automático sem taxas adicionais</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance & Redemption Notice Modal */}
      <RedemptionComplianceModal
        isOpen={isRedemptionModalOpen}
        onClose={() => setIsRedemptionModalOpen(false)}
        percentElapsed={metrics.percentElapsed}
        lockupEndDate={metrics.lockupEndDate}
      />
    </>
  );
};
