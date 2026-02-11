import React from 'react';
import { LogEntry } from '../types';
import { getPast7Days, parseLocalISO } from '../utils/dateUtils';
import { format } from 'date-fns';

interface Props {
  logs: Record<string, LogEntry>;
  todayKey: string;
}

export const WeeklyProgress: React.FC<Props> = ({ logs, todayKey }) => {
  const last7Days = getPast7Days(todayKey); // Array of date strings, ending today/yesterday
  
  const successCount = last7Days.filter(d => logs[d]?.status === 'yes').length;
  const totalLogged = last7Days.filter(d => logs[d]).length;
  const percentage = Math.round((successCount / 7) * 100);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <div className="flex justify-between items-end mb-3">
        <h3 className="font-bold text-slate-700">Last 7 Days</h3>
        <span className="text-sm font-medium text-slate-500">{successCount}/7 Successful</span>
      </div>
      
      {/* Bars */}
      <div className="flex justify-between gap-2 mb-2">
        {last7Days.map((dateKey) => {
          const entry = logs[dateKey];
          const dayLabel = format(parseLocalISO(dateKey), 'EEEEE'); // S, M, T...
          
          let colorClass = 'bg-slate-100';
          if (entry) {
            colorClass = entry.status === 'yes' ? 'bg-brand-500' : 'bg-red-400';
          }

          return (
            <div key={dateKey} className="flex flex-col items-center gap-1 flex-1">
              <div className={`w-full h-2 rounded-full ${colorClass}`} />
              <span className="text-[10px] text-slate-400 font-medium">{dayLabel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}