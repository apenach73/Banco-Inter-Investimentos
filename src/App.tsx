/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { LockedNoticeBanner } from './components/LockedNoticeBanner';
import { ConsolidatedHero } from './components/ConsolidatedHero';
import { EvolutionChart } from './components/EvolutionChart';
import { AssetAllocationList } from './components/AssetAllocationList';
import { ProjectionSimulator } from './components/ProjectionSimulator';
import { AssetDetailModal } from './components/AssetDetailModal';
import { DividendHistoryModal } from './components/DividendHistoryModal';
import { OfficialReportModal } from './components/OfficialReportModal';
import { BiometricAccessModal } from './components/BiometricAccessModal';
import { FIIAsset } from './types';
import { calculateInvestmentMetrics } from './utils/dateCalculations';
import { ShieldCheck, Lock, Fingerprint } from 'lucide-react';

export default function App() {
  const [showValues, setShowValues] = useState<boolean>(true);
  const [isBiometricAuthenticated, setIsBiometricAuthenticated] = useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<FIIAsset | null>(null);
  const [isDividendModalOpen, setIsDividendModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  const metrics = calculateInvestmentMetrics();

  return (
    <div className="min-h-screen bg-[#F6F7F9] text-[#191C21] flex flex-col selection:bg-[#FF7A00] selection:text-white">
      {/* Biometric Authentication Lock Screen for Mobile / Device Fingerprint */}
      <BiometricAccessModal
        isOpen={!isBiometricAuthenticated}
        onAuthenticated={() => setIsBiometricAuthenticated(true)}
        userName="Alexandre Penante da Rocha"
        accountNumber="Conta Inter Invest: 9482103-7"
      />

      {/* Top BANCO INTER Navigation Header */}
      <Header
        showValues={showValues}
        setShowValues={setShowValues}
        onOpenReport={() => setIsReportModalOpen(true)}
        onTriggerBiometricLock={() => setIsBiometricAuthenticated(false)}
        isBiometricActive={isBiometricAuthenticated}
      />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* 1. Hero: Montante Total Corrigido & Rendimento de 14,25% até a data do celular */}
        <section aria-label="Consolidado de investimentos">
          <ConsolidatedHero
            showValues={showValues}
            onViewDividends={() => setIsDividendModalOpen(true)}
          />
        </section>

        {/* 2. Evolução Gráfica Patrimonial (Maio/26 - Out/26) */}
        <section aria-label="Evolução patrimonial gráfica">
          <EvolutionChart showValues={showValues} />
        </section>

        {/* 3. Carteira Diversificada de Fundos Imobiliários */}
        <section aria-label="Ativos da carteira de FIIs">
          <AssetAllocationList
            showValues={showValues}
            onSelectAsset={(asset) => setSelectedAsset(asset)}
          />
        </section>

        {/* 4. Planejamento & Simulação do Desbloqueio (31/10/2026) */}
        <section aria-label="Planejamento de liquidez e carência">
          <ProjectionSimulator showValues={showValues} />
        </section>

        {/* 5. Seção de Saldo Bloqueado para Resgate - Localizada no Fim do App */}
        <section aria-label="Aviso de carência e bloqueio no fim do app">
          <LockedNoticeBanner showValues={showValues} />
        </section>

        {/* Help & Custody Assurance Strip */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 shadow-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>
              Custódia garantida pela <strong className="text-slate-900">B3 (Brasil, Bolsa, Balcão)</strong> e administrada por <strong className="text-slate-900">Banco Inter S.A.</strong>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsReportModalOpen(true)}
              className="text-[#FF7A00] hover:text-[#E06900] hover:underline cursor-pointer font-bold transition-colors"
            >
              Emitir Comprovante Oficial
            </button>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-medium">Central Inter Invest: 3003-4070</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4">
          <p className="font-semibold text-slate-700">© 2026 BANCO INTER S.A. - Inter DTVM Ltda. Todos os direitos reservados.</p>
          <p className="mt-1 text-[11px] text-slate-500">
            Acompanhamento de custódia e rendimento corrigido até a data atual ({metrics.currentDateFormatted}). Rendimentos passados não garantem rentabilidade futura.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <AssetDetailModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
        showValues={showValues}
      />

      <DividendHistoryModal
        isOpen={isDividendModalOpen}
        onClose={() => setIsDividendModalOpen(false)}
        showValues={showValues}
      />

      <OfficialReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        showValues={showValues}
      />
    </div>
  );
}
