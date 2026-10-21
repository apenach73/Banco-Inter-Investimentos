import React from 'react';
import { 
  Eye, 
  EyeOff, 
  ArrowUpRight, 
  Fingerprint, 
  Lock, 
  ShieldCheck, 
  Smartphone,
  Calendar
} from 'lucide-react';
import { calculateInvestmentMetrics } from '../utils/dateCalculations';

interface HeaderProps {
  showValues: boolean;
  setShowValues: (show: boolean) => void;
  onOpenReport: () => void;
  onTriggerBiometricLock: () => void;
  isBiometricActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  showValues,
  setShowValues,
  onOpenReport,
  onTriggerBiometricLock,
  isBiometricActive,
}) => {
  const metrics = calculateInvestmentMetrics();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Inter Brand with Uploaded Logo & BANCO INTER in Uppercase */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            {/* Uploaded Banco Inter Logo */}
            <div className="relative flex h-11 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#FF7A00] p-0.5 shadow-sm shadow-[#FF7A00]/25 border border-[#FF7A00]/25">
              <img
                src="/assets/aistudio/3afb1b054f7646acabdcd1e953f77c7d_thumb1_65df5df6.jpg"
                alt="Logo BANCO INTER"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-wider text-slate-900 uppercase">
                  BANCO INTER
                </span>
                <span className="rounded-full bg-[#FF7A00]/10 px-2 py-0.5 text-[10px] font-black text-[#FF7A00] border border-[#FF7A00]/20 tracking-wider">
                  INVEST
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Alexandre Penante da Rocha • Conta: 9482103-7
              </p>
            </div>
          </div>
        </div>

        {/* Center: Live Date & Custody Status */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3.5 py-1.5 border border-slate-200 text-xs">
            <Calendar className="h-3.5 w-3.5 text-[#FF7A00]" />
            <span className="text-slate-600 font-medium">Posição em:</span>
            <strong className="text-slate-900 font-bold">{metrics.currentDateFormatted}</strong>
          </div>

          <div className="flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-1.5 border border-emerald-200/80 text-xs text-emerald-800 font-semibold">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Custódia B3 Garantida</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Biometric Status / Re-lock Button */}
          <button
            type="button"
            onClick={onTriggerBiometricLock}
            className="flex items-center gap-1.5 rounded-xl bg-[#FFF9F5] px-3 py-2 text-xs font-bold text-[#FF7A00] hover:bg-[#FF7A00]/15 border border-[#FF7A00]/30 transition-all cursor-pointer shadow-2xs"
            title="Bloquear com biometria ou testar leitura digital"
          >
            <Fingerprint className="h-4 w-4 text-[#FF7A00]" />
            <span className="hidden sm:inline">Biometria Ativa</span>
          </button>

          {/* Toggle Values Privacy */}
          <button
            type="button"
            onClick={() => setShowValues(!showValues)}
            aria-label={showValues ? 'Ocultar valores' : 'Mostrar valores'}
            className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition-all hover:bg-slate-200 border border-slate-200 cursor-pointer"
            title={showValues ? 'Ocultar saldos' : 'Exibir saldos'}
          >
            {showValues ? (
              <>
                <EyeOff className="h-4 w-4 text-slate-500" />
                <span className="hidden sm:inline">Ocultar</span>
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 text-[#FF7A00]" />
                <span className="hidden sm:inline">Exibir</span>
              </>
            )}
          </button>

          {/* Download Report */}
          <button
            type="button"
            onClick={onOpenReport}
            className="hidden sm:flex items-center gap-1.5 rounded-xl bg-[#FF7A00] px-3.5 py-2 text-xs font-bold text-white transition-all hover:bg-[#E06900] shadow-xs shadow-[#FF7A00]/25 cursor-pointer"
          >
            <ArrowUpRight className="h-4 w-4" />
            <span>Extrato Oficial</span>
          </button>

          {/* User Avatar */}
          <div 
            title="Alexandre Penante da Rocha"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-xs font-black text-[#FF7A00]"
          >
            AP
          </div>
        </div>
      </div>
    </header>
  );
};
