import React, { useState } from 'react';
import { TrendingUp, Calendar, Info, ShieldCheck, HelpCircle } from 'lucide-react';
import { monthlyEvolutionChartData } from '../data/portfolioData';

interface EvolutionChartProps {
  showValues: boolean;
}

export const EvolutionChart: React.FC<EvolutionChartProps> = ({ showValues }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(4); // default: 19 Set/26 (current)

  const activeData = monthlyEvolutionChartData[selectedIndex];

  const formatBRL = (val: number) => {
    if (!showValues) return 'R$ ••••••••';
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // SVG Chart Dimensions
  const chartHeight = 180;
  const minVal = 9500;
  const maxVal = 12000;

  const getY = (val: number) => {
    const ratio = (val - minVal) / (maxVal - minVal);
    return chartHeight - ratio * chartHeight;
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <span>Evolução Patrimonial do Aporte</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700">
              Maio/26 - Out/26
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Progressão do montante corrigido considerando valorização das cotas e proventos reinvestidos
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF7A00]" />
            <span className="text-slate-600 font-medium">Realizado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border border-dashed border-[#FF7A00] bg-transparent" />
            <span className="text-slate-600 font-medium">Projetado (Carência)</span>
          </div>
        </div>
      </div>

      {/* Selected Point Info Card */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-200/80">
        <div>
          <span className="text-xs text-slate-500 font-medium">Período selecionado:</span>
          <p className="font-bold text-slate-900 text-sm sm:text-base">{activeData.month}</p>
        </div>

        <div>
          <span className="text-xs text-slate-500 font-medium">Montante Consolidado:</span>
          <p className="font-mono text-base sm:text-lg font-black text-slate-900">
            {formatBRL(activeData.totalAmount)}
          </p>
        </div>

        <div>
          <span className="text-xs text-slate-500 font-medium">Rendimento Acumulado:</span>
          <p className="font-mono text-base sm:text-lg font-black text-emerald-700">
            +{activeData.percentage.toFixed(2).replace('.', ',')}%
          </p>
        </div>

        <div>
          <span className="text-xs text-slate-500 font-medium">Proventos Acumulados:</span>
          <p className="font-mono text-sm sm:text-base font-bold text-slate-700">
            {formatBRL(activeData.dividends)}
          </p>
        </div>
      </div>

      {/* Interactive Visual Graph */}
      <div className="mt-6">
        <div className="relative h-48 w-full">
          {/* Horizontal Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
            <div className="border-b border-slate-200 w-full" />
            <div className="border-b border-slate-200 w-full" />
            <div className="border-b border-slate-200 w-full" />
            <div className="border-b border-slate-200 w-full" />
          </div>

          {/* SVG Line & Area */}
          <svg className="h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 180">
            <defs>
              <linearGradient id="interGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF7A00" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#FF7A00" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Path for Area fill */}
            <path
              d={`M 20 ${getY(10000)} 
                 L 115 ${getY(10320)} 
                 L 210 ${getY(10680)} 
                 L 305 ${getY(11050)} 
                 L 400 ${getY(11325)} 
                 L 400 180 
                 L 20 180 Z`}
              fill="url(#interGradient)"
            />

            {/* Solid Line up to present date (19 Set) */}
            <path
              d={`M 20 ${getY(10000)} 
                 L 115 ${getY(10320)} 
                 L 210 ${getY(10680)} 
                 L 305 ${getY(11050)} 
                 L 400 ${getY(11325)}`}
              fill="none"
              stroke="#FF7A00"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Dashed line to projected unlock date (31 Out) */}
            <path
              d={`M 400 ${getY(11325)} L 490 ${getY(11762.4)}`}
              fill="none"
              stroke="#FF7A00"
              strokeWidth="2.5"
              strokeDasharray="5,5"
              strokeLinecap="round"
            />

            {/* Lock-up indicator marker on 31 Out */}
            <circle cx="490" cy={getY(11762.4)} r="5" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="2" />
          </svg>

          {/* Interactive Clickable Nodes */}
          <div className="absolute inset-0 flex justify-between items-end pb-2">
            {monthlyEvolutionChartData.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              const isCurrent = idx === 4;
              const isFuture = idx === 5;

              return (
                <button
                  key={item.month}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className="group flex flex-col items-center cursor-pointer focus:outline-none transition-all"
                  style={{ width: '16%' }}
                >
                  {/* Floating Pill on Selected */}
                  {isSelected && (
                    <span className="mb-2 rounded-full bg-[#FF7A00] px-2 py-0.5 font-mono text-[10px] font-black text-white shadow-md animate-fade-in">
                      {item.percentage.toFixed(1).replace('.', ',')}%
                    </span>
                  )}

                  {/* Dot */}
                  <div
                    className={`h-4 w-4 rounded-full border-2 transition-all flex items-center justify-center ${
                      isSelected
                        ? 'border-white bg-[#FF7A00] scale-125 shadow-md shadow-[#FF7A00]/40'
                        : isCurrent
                        ? 'border-[#FF7A00] bg-emerald-500'
                        : isFuture
                        ? 'border-[#FF7A00] bg-white border-dashed'
                        : 'border-[#FF7A00] bg-white group-hover:scale-110'
                    }`}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                  </div>

                  {/* Label */}
                  <span
                    className={`mt-2 text-[11px] font-semibold transition-colors ${
                      isSelected
                        ? 'text-slate-900 font-extrabold'
                        : isCurrent
                        ? 'text-[#FF7A00] font-bold'
                        : isFuture
                        ? 'text-[#FF7A00]'
                        : 'text-slate-500 group-hover:text-slate-800'
                    }`}
                  >
                    {item.month}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Milestone Indicator Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[11px] rounded-2xl bg-slate-50 px-4 py-2.5 border border-slate-200/80 text-slate-600">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span>Aporte inicial realizado em 15/05/2026</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Posição atual em 19/09/2026: +13,25%</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <span className="h-2 w-2 rounded-full bg-[#FF7A00]" />
            <span>Fim da carência em 31/10/2026 (Restam 42 dias)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
