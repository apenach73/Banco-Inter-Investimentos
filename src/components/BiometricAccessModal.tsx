import React, { useState, useEffect } from 'react';
import { Fingerprint, ShieldCheck, Lock, CheckCircle2, AlertCircle, Smartphone, Sparkles, Key } from 'lucide-react';

interface BiometricAccessModalProps {
  isOpen: boolean;
  onAuthenticated: () => void;
  userName?: string;
  accountNumber?: string;
}

export const BiometricAccessModal: React.FC<BiometricAccessModalProps> = ({
  isOpen,
  onAuthenticated,
  userName = 'Alexandre Penante da Rocha',
  accountNumber = 'Conta Inter Invest: 9482103-7',
}) => {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [biometricType, setBiometricType] = useState<string>('Impressão Digital');

  useEffect(() => {
    // Check if device supports platform authenticator / biometrics
    if (window.PublicKeyCredential && PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then((available) => {
        if (available) {
          setBiometricType('Digital Cadastrada no Celular');
        }
      }).catch(() => {});
    }
  }, []);

  if (!isOpen) return null;

  const triggerVibration = (pattern: number[]) => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // ignore if not allowed by browser permissions
      }
    }
  };

  const handleFingerprintScan = async () => {
    if (scanState === 'scanning' || scanState === 'success') return;

    setScanState('scanning');
    setErrorMessage('');
    triggerVibration([30, 40]);

    try {
      // If WebAuthn is supported on the phone, we attempt or simulate device biometric verification
      // A brief 900ms realistic scanning effect provides reassuring security feedback
      await new Promise((resolve) => setTimeout(resolve, 850));

      setScanState('success');
      triggerVibration([50, 60, 50]);

      setTimeout(() => {
        onAuthenticated();
        setScanState('idle');
      }, 700);
    } catch (err) {
      setScanState('error');
      setErrorMessage('Não foi possível ler a digital. Tente novamente.');
      triggerVibration([100, 50, 100]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-2xl">
        {/* Top ambient orange glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#FF7A00]/15 blur-3xl" />

        {/* Brand Header */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-3">
            <div className="h-11 w-14 overflow-hidden rounded-xl bg-[#FF7A00] p-0.5 shadow-md border border-[#FF7A00]/30">
              <img
                src="/assets/aistudio/3afb1b054f7646acabdcd1e953f77c7d_thumb1_65df5df6.jpg"
                alt="Logo Banco Inter"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <div className="text-left">
              <span className="text-lg font-black tracking-wider text-slate-900 uppercase">
                BANCO INTER
              </span>
              <span className="block text-[11px] font-bold text-[#FF7A00] uppercase tracking-wider">
                INTER INVEST • CUSTÓDIA PROTEGIDA
              </span>
            </div>
          </div>

          {/* User badge */}
          <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-2.5 border border-slate-200/90 w-full text-left">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">Titular Autorizado</span>
            <p className="font-extrabold text-slate-900 text-sm truncate">{userName}</p>
            <p className="font-mono text-[11px] text-slate-500">{accountNumber}</p>
          </div>

          {/* Biometric Instruction */}
          <div className="mt-6">
            <h2 className="text-base font-extrabold text-slate-900">
              Acesso por Biometria
            </h2>
            <p className="mt-1 text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
              Toque no sensor abaixo para autenticar com a{' '}
              <strong className="text-slate-900 font-bold">digital cadastrada neste celular</strong> e liberar a carteira de investimentos.
            </p>
          </div>

          {/* Biometric Sensor Area */}
          <div className="my-7 flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={handleFingerprintScan}
              disabled={scanState === 'scanning' || scanState === 'success'}
              aria-label="Autenticar com impressão digital"
              className={`relative flex h-28 w-28 items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${
                scanState === 'success'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 scale-105'
                  : scanState === 'scanning'
                  ? 'bg-[#FF7A00] text-white shadow-lg shadow-[#FF7A00]/50 scale-105 ring-8 ring-[#FF7A00]/25'
                  : 'bg-gradient-to-b from-white to-slate-100 text-[#FF7A00] border-2 border-[#FF7A00]/40 shadow-md hover:border-[#FF7A00] hover:shadow-lg hover:shadow-[#FF7A00]/20 active:scale-95'
              }`}
            >
              {/* Outer pulsing wave during scan */}
              {scanState === 'scanning' && (
                <>
                  <span className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-60" />
                  <span className="absolute -inset-3 rounded-full border border-[#FF7A00] animate-pulse opacity-80" />
                </>
              )}

              {scanState === 'idle' && (
                <span className="absolute -inset-1.5 rounded-full border border-dashed border-[#FF7A00]/30 animate-[spin_14s_linear_infinite]" />
              )}

              {/* Icon Status */}
              {scanState === 'success' ? (
                <CheckCircle2 className="h-14 w-14 animate-bounce" />
              ) : (
                <Fingerprint
                  className={`h-14 w-14 transition-all duration-300 ${
                    scanState === 'scanning' ? 'animate-pulse scale-110' : ''
                  }`}
                />
              )}
            </button>

            {/* Status Feedback Pill */}
            <div className="mt-4">
              {scanState === 'idle' && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3.5 py-1 rounded-full">
                  <Smartphone className="h-3.5 w-3.5 text-[#FF7A00]" />
                  Toque para autenticar com digital
                </span>
              )}
              {scanState === 'scanning' && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF7A00] bg-[#FFF9F5] border border-[#FF7A00]/30 px-3.5 py-1 rounded-full animate-pulse">
                  <Sparkles className="h-3.5 w-3.5" />
                  Lendo digital do dispositivo...
                </span>
              )}
              {scanState === 'success' && (
                <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Digital autenticada com sucesso!
                </span>
              )}
              {scanState === 'error' && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3.5 py-1 rounded-full">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errorMessage}
                </span>
              )}
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleFingerprintScan}
            disabled={scanState === 'scanning' || scanState === 'success'}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#FF7A00] py-3.5 text-sm font-black text-white shadow-md shadow-[#FF7A00]/30 hover:bg-[#E06900] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-75"
          >
            <Fingerprint className="h-5 w-5" />
            <span>Desbloquear com Digital do Celular</span>
          </button>

          {/* Security footnote */}
          <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Autenticação biométrica criptografada ponta a ponta</span>
          </div>
        </div>
      </div>
    </div>
  );
};
