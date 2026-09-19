import { Eye, EyeOff, Bell, ShieldCheck, ArrowUpRight, HelpCircle } from 'lucide-react';
import { portfolioSummary } from '../data/portfolioData';

interface HeaderProps {
  showValues: boolean;
  setShowValues: (show: boolean) => void;
  onOpenReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ showValues, setShowValues, onOpenReport }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Inter Brand & Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            {/* Banco Inter Uploaded Brand Logo */}
            <div className="relative flex h-10 w-14 items-center justify-center overflow-hidden rounded-xl bg-[#FF7A00] p-0.5 shadow-sm shadow-[#FF7A00]/20 border border-[#FF7A00]/20">
              <img
                src="/banco-inter-logo.jpg"
                alt="Logo Banco Inter"
                className="h-full w-full object-cover rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-slate-900 tracking-tight">Banco Inter</span>
                <span className="rounded-full bg-[#FF7A00]/10 px-2 py-0.5 text-[10px] font-black text-[#FF7A00] border border-[#FF7A00]/20">
                  INVEST
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {portfolioSummary.accountNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Live Date & Custody Status */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-1.5 border border-slate-200 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-600 font-medium">Posição em:</span>
            <strong className="text-slate-900 font-mono font-bold">{portfolioSummary.currentDate}</strong>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Custódia B3 Certificada</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
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
            className="hidden sm:flex items-center gap-1.5 rounded-xl bg-[#FFF9F5] px-3.5 py-2 text-xs font-bold text-[#FF7A00] transition-all hover:bg-[#FF7A00]/15 border border-[#FF7A00]/25 cursor-pointer shadow-xs"
          >
            <ArrowUpRight className="h-4 w-4" />
            <span>Extrato Oficial</span>
          </button>

          {/* User Avatar */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-xs font-black text-[#FF7A00]">
            AP
          </div>
        </div>
      </div>
    </header>
  );
};
