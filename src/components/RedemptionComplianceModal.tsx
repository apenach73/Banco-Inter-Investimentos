import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Lock, 
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { calculateInvestmentMetrics } from '../utils/dateCalculations';

interface RedemptionComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  percentElapsed: number;
  lockupEndDate: string;
}

export const RedemptionComplianceModal: React.FC<RedemptionComplianceModalProps> = ({
  isOpen,
  onClose,
  percentElapsed,
  lockupEndDate,
}) => {
  const [docSubmitted, setDocSubmitted] = useState<boolean>(false);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [protocolId] = useState<string>(() => `INT-${Math.floor(100000 + Math.random() * 900000)}-PLD`);

  if (!isOpen) return null;

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFileName(e.target.files[0].name);
      setDocSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Brand Header */}
        <div className="flex items-center gap-3.5 border-b border-slate-100 pb-5">
          <div className="flex h-11 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#FF7A00] p-0.5 shadow-md border border-[#FF7A00]/25">
            <img
              src="/assets/aistudio/3afb1b054f7646acabdcd1e953f77c7d_thumb1_65df5df6.jpg"
              alt="Logo Banco Inter"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
          <div>
            <span className="text-base font-black tracking-wider text-slate-900 uppercase">
              BANCO INTER
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#FF7A00]">
                Departamento de Compliance & Prevenção (PLD/FT)
              </span>
              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-black text-amber-800">
                Aviso Regulatório
              </span>
            </div>
          </div>
        </div>

        {/* Official Notification Message */}
        <div className="mt-5 space-y-4">
          {/* Greeting Box */}
          <div className="rounded-2xl bg-amber-50/70 p-4 border border-amber-200/90 text-amber-950">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-700 shrink-0" />
              <h2 className="text-base font-extrabold text-amber-900">
                Olá, Alexandre Penante da Rocha:
              </h2>
            </div>

            <div className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-700 space-y-3 font-medium">
              <p>
                Em todas as contas de investimento do Banco Inter, são programadas análises periódicas automáticas que para uma experiência mais segura e de acordo com as políticas internas do banco, executando checagem de compliance além de regras rígidas contra Prevenção à Lavagem de Dinheiro. Lei nº 9.613/1998 e Circular Banco Central do Brasil nº 3.978/2020.
              </p>

              <p>
                Após uma avaliação cuidadosa, sua conta de investimentos necessita de uma análise mais estruturada em decorrência da origem dos recursos aplicados. Não se preocupe, seus fundos estarão seguros e após o envio da documentação solicitada em nosso aplicativo, os fundos estarão disponíveis para resgate no prazo de 7 a 15 dias úteis após o envio.
              </p>
            </div>
          </div>

          {/* Contextual Lock & Timeline Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Porcentagem do tempo decorrido */}
            <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-200/90">
              <span className="text-slate-500 font-semibold block">A porcentagem do tempo decorrido</span>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="font-mono text-xl font-black text-slate-900">
                  {percentElapsed}%
                </span>
                <span className="text-[11px] text-slate-500 font-medium">do período de carência</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-[#FF7A00]"
                  style={{ width: `${percentElapsed}%` }}
                />
              </div>
            </div>

            {/* Data de desbloqueio */}
            <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-200/90">
              <span className="text-slate-500 font-semibold block">Data de desbloqueio contratual</span>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="font-mono text-xl font-black text-[#FF7A00]">
                  {lockupEndDate}
                </span>
                <span className="rounded bg-[#FF7A00]/10 px-1.5 py-0.5 text-[10px] font-black text-[#FF7A00]">
                  Término
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Liquidação automática sem encargos após o término da carência
              </p>
            </div>
          </div>

          {/* Protocol & Document Upload Section */}
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Protocolo de Compliance</span>
              <span className="font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                {protocolId}
              </span>
            </div>

            <div className="mt-3">
              {!docSubmitted ? (
                <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#FF7A00]/40 bg-white p-4 text-center hover:bg-[#FFF9F5] hover:border-[#FF7A00] transition-all cursor-pointer">
                  <UploadCloud className="h-6 w-6 text-[#FF7A00]" />
                  <span className="mt-1 text-xs font-bold text-slate-800">
                    Enviar Comprovante de Origem de Recursos
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Extrato bancário, declaração de IRPF ou contrato de origem (PDF, JPG, PNG)
                  </span>
                  <input
                    type="file"
                    onChange={handleSimulateUpload}
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg"
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-3 border border-emerald-200 text-xs text-emerald-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <div>
                      <strong className="block">Documento enviado com sucesso!</strong>
                      <span className="text-[11px] text-emerald-700">{selectedFileName || 'comprovante_recursos.pdf'}</span>
                    </div>
                  </div>
                  <span className="font-bold text-[11px] bg-emerald-100 text-emerald-900 px-2 py-1 rounded">
                    Em análise (7-15 dias úteis)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-500 text-[11px]">
            Central de Suporte Inter Invest: <strong>3003-4070</strong> • Opção 4 (Compliance)
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#FF7A00] px-5 py-2.5 font-bold text-white shadow-sm hover:bg-[#E06900] transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
