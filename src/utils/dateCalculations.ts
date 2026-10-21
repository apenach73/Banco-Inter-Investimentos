/**
 * Utilities for calculating investment values, dynamic dates, and countdown
 * based on the mobile device's current date when opening the Banco Inter app.
 */

export interface DynamicInvestmentMetrics {
  currentDateFormatted: string;
  currentDateShort: string;
  daysElapsed: number;
  totalDays: number;
  daysRemaining: number;
  percentElapsed: number;
  currentYieldRate: number; // 14.25%
  initialContribution: number; // 10000.00
  totalCorrectedAmount: number; // 11425.00
  totalProfitAmount: number; // 1425.00
  capitalAppreciation: number; // 865.50
  accumulatedDividends: number; // 559.50
  dailyAccrualRate: number; // ~R$ 8.96 / day
  lockupEndDate: string; // "31/10/2026"
  contributionDate: string; // "15/05/2026"
  isLocked: boolean;
}

export function calculateInvestmentMetrics(): DynamicInvestmentMetrics {
  const initialContribution = 10000.0;
  const contributionDateStr = '15/05/2026';
  const lockupEndDateStr = '31/10/2026';

  // Target lockup range in 2026
  const startDate = new Date(2026, 4, 15, 9, 0, 0); // 15 May 2026
  const endDate = new Date(2026, 9, 31, 23, 59, 59); // 31 Oct 2026

  // Device present date
  const now = new Date();

  // If the device's year is already in 2026 or later, use the actual device date.
  // If the device clock is in another year (e.g. 2024 or 2025 during testing),
  // map to the current day and month projected onto 2026 so that real-time countdown reflects current day.
  let effectiveNow = new Date(now);
  if (effectiveNow.getFullYear() !== 2026) {
    // Project month and day to 2026 for consistent investment timeline
    effectiveNow = new Date(2026, now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
    // Clamp if before start date
    if (effectiveNow < startDate) {
      effectiveNow = new Date(2026, 9, 21, now.getHours(), now.getMinutes(), now.getSeconds());
    }
  }

  // Ensure effectiveNow does not exceed unlock date for calculations
  const totalDurationMs = endDate.getTime() - startDate.getTime();
  const totalDays = Math.round(totalDurationMs / (1000 * 60 * 60 * 24)); // 169 days

  const elapsedMs = Math.max(0, effectiveNow.getTime() - startDate.getTime());
  const daysElapsed = Math.min(totalDays, Math.floor(elapsedMs / (1000 * 60 * 60 * 24)));
  const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - effectiveNow.getTime()) / (1000 * 60 * 60 * 24)));
  const percentElapsed = Math.min(100, Math.max(0, Math.round((daysElapsed / totalDays) * 100)));

  // Target yield: 14.25% as specified by the user
  const currentYieldRate = 14.25;
  const totalProfitAmount = +(initialContribution * (currentYieldRate / 100)).toFixed(2); // 1425.00
  const totalCorrectedAmount = +(initialContribution + totalProfitAmount).toFixed(2); // 11425.00

  // Asset breakdown: capital appreciation (cotas) ~60.7% + dividends reinvested ~39.3%
  const capitalAppreciation = 865.5;
  const accumulatedDividends = 559.5;
  const dailyAccrualRate = +(totalProfitAmount / (daysElapsed || 1)).toFixed(2);

  // Formatted date string for display
  const day = String(effectiveNow.getDate()).padStart(2, '0');
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const monthName = monthNames[effectiveNow.getMonth()];
  const year = effectiveNow.getFullYear();
  const currentDateFormatted = `${day} de ${monthName} de ${year}`;
  const currentDateShort = `${day}/${String(effectiveNow.getMonth() + 1).padStart(2, '0')}/${year}`;

  return {
    currentDateFormatted,
    currentDateShort,
    daysElapsed,
    totalDays,
    daysRemaining,
    percentElapsed,
    currentYieldRate,
    initialContribution,
    totalCorrectedAmount,
    totalProfitAmount,
    capitalAppreciation,
    accumulatedDividends,
    dailyAccrualRate,
    lockupEndDate: lockupEndDateStr,
    contributionDate: contributionDateStr,
    isLocked: daysRemaining > 0,
  };
}
