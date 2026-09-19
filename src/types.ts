export interface FIIAsset {
  ticker: string;
  name: string;
  segment: 'Logística' | 'Papel / CRI' | 'Shoppings' | 'Híbrido' | 'Lajes Corporativas';
  shares: number;
  initialAllocation: number; // in BRL
  initialSharePrice: number; // in BRL (May 2026)
  currentSharePrice: number; // in BRL (19 Sept 2026)
  currentValuation: number; // shares * currentSharePrice
  accumulatedDividends: number; // in BRL total paid by this asset
  totalYieldAmount: number; // valuation gain + dividends
  yieldPercentage: number; // percentage gain
  portfolioPercentage: number; // % of total initial portfolio
  dividendYieldAnnualized: number;
  monthlyDividendPerShare: number;
  riskRating: 'Baixo' | 'Médio-Baixo' | 'Médio';
}

export interface MonthlyDividendRecord {
  month: string; // e.g. "Maio/26", "Junho/26"
  date: string;
  totalReceived: number;
  yieldRateMonth: number;
  reinvested: boolean;
  status: 'Creditado na Carteira' | 'Provisionado';
  detailsByAsset: {
    ticker: string;
    amount: number;
  }[];
}

export interface PortfolioSummary {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  initialContribution: number; // 10000.00
  contributionDate: string; // "15/05/2026"
  lockupEndDate: string; // "31/10/2026"
  currentDate: string; // "19/09/2026"
  totalDaysLocked: number;
  daysElapsed: number;
  daysRemaining: number;
  currentYieldRate: number; // 13.25%
  totalCorrectedAmount: number; // 11325.00
  totalProfitAmount: number; // 1325.00
  capitalAppreciation: number; // 815.40
  accumulatedDividends: number; // 509.60
  taxStatus: string; // "Isento de IR para Pessoas Físicas (Lei 11.033/04)"
  projectedAmountAtLockupEnd: number; // projected at 31/10/2026
  benchmarkComparison: {
    cdiPerformance: number; // e.g. 4.2% in same period
    ibovPerformance: number; // e.g. 5.1%
    ifixPerformance: number; // e.g. 7.8%
    relativeToCdi: number; // e.g. 315% do CDI
  };
}
