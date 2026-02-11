
import React from 'react';
import { LogEntry } from '../types';
import { getLast90Days, parseLocalISO } from '../utils/dateUtils';
import { format } from 'date-fns';
import clsx from 'clsx';

interface Props {
  logs: Record<string, LogEntry>;
  todayKey: string;
  onDayClick: (dateKey: string) => void;
}

export const Heatmap: React.FC<Props> = ({ logs, todayKey, onDayClick }) => {
  const days = getLast90Days(todayKey);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <h3 className="font-bold text-slate-700 mb-4">90 Day History</h3>
      
      <div className="flex flex-wrap gap-1 justify-start">
        {days.map((dateKey) => {
          const entry = logs[dateKey];
          const dateObj = parseLocalISO(dateKey);
          const title = `${format(dateObj, 'MMM do')}: ${entry ? (entry.status === 'yes' ? 'Success' : 'Slip') : 'No Data'}`;
          
          return (
            <button
              key={dateKey}
              onClick={() => onDayClick(dateKey)}
              title={title}
              className={clsx(
                "w-3 h-3 sm:w-4 sm:h-4 rounded-sm transition-all hover:scale-125 hover:z-10 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-400",
                {
                  "bg-slate-100": !entry,
                  "bg-brand-500": entry?.status === 'yes',
                  "bg-red-400": entry?.status === 'no',
                }
              )}
            />
          );
        })}
      </div>
      
      <div className="flex items-center gap-4 mt-4 text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-slate-100"></div>
          <span>No Entry</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-brand-500"></div>
          <span>Success</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-red-400"></div>
          <span>Slip</span>
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-2 text-center italic">
        Tap any square to view details.
      </p>
    </div>
  );
}
