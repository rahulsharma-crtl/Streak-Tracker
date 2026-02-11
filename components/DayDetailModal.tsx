
import React, { useMemo } from 'react';
import { LogEntry } from '../types';
import { format } from 'date-fns';
import { parseLocalISO, calculateStats } from '../utils/dateUtils';
import { X, CheckCircle2, XCircle, Calendar, Flame } from 'lucide-react';

interface Props {
  dateKey: string;
  logs: Record<string, LogEntry>;
  onClose: () => void;
}

export const DayDetailModal: React.FC<Props> = ({ dateKey, logs, onClose }) => {
  const entry = logs[dateKey];
  const dateObj = parseLocalISO(dateKey);
  
  // Calculate what the streak was ON this specific day
  const historicStats = useMemo(() => {
    return calculateStats(logs, dateKey);
  }, [logs, dateKey]);

  const isSuccess = entry?.status === 'yes';
  const isSlip = entry?.status === 'no';
  const isMissing = !entry;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="w-4 h-4" />
            <span className="font-semibold">{format(dateObj, 'MMMM do, yyyy')}</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-full text-slate-400 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-center">
          {/* Status Icon */}
          <div className="flex justify-center mb-4">
            {isSuccess && (
              <div className="bg-brand-100 p-4 rounded-full">
                <CheckCircle2 className="w-12 h-12 text-brand-600" />
              </div>
            )}
            {isSlip && (
              <div className="bg-red-100 p-4 rounded-full">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
            )}
            {isMissing && (
              <div className="bg-slate-100 p-4 rounded-full">
                <div className="w-12 h-12 rounded-full border-4 border-slate-300 border-dashed"></div>
              </div>
            )}
          </div>

          {/* Status Text */}
          <h2 className={`text-2xl font-bold mb-2 ${
            isSuccess ? 'text-brand-700' : isSlip ? 'text-red-700' : 'text-slate-400'
          }`}>
            {isSuccess ? 'Victory!' : isSlip ? 'Slip-up' : 'No Entry'}
          </h2>

          {/* Streak on that day */}
          <div className="flex items-center justify-center gap-2 mb-6 text-slate-500 bg-slate-50 py-2 px-4 rounded-full w-fit mx-auto">
            <Flame className={`w-4 h-4 ${historicStats.currentStreak > 0 ? 'text-orange-500 fill-orange-500' : 'text-slate-300'}`} />
            <span className="text-sm font-medium">
              Streak on this day: <span className="text-slate-900 font-bold">{historicStats.currentStreak}</span>
            </span>
          </div>

          {/* Note/Details */}
          <div className="bg-slate-50 rounded-xl p-4 text-left border border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              {isSlip ? 'Trigger / Note' : 'Note'}
            </span>
            <p className="text-slate-700 text-sm leading-relaxed">
              {entry?.note 
                ? `"${entry.note}"` 
                : isSuccess 
                  ? "No notes recorded for this victory." 
                  : isSlip 
                    ? "No details recorded." 
                    : "You didn't log anything for this day."}
            </p>
          </div>

          <button 
            onClick={onClose}
            className="mt-6 w-full bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
