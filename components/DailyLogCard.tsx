import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, AlertCircle, RotateCcw } from 'lucide-react';
import { LogEntry } from '../types';
import { format } from 'date-fns';
import { parseLocalISO } from '../utils/dateUtils';
import { MESSAGES_PRAISE } from '../constants';

interface Props {
  dateKey: string;
  existingEntry?: LogEntry;
  onLogYes: () => void;
  onLogNo: () => void;
  onUndo: () => void;
}

export const DailyLogCard: React.FC<Props> = ({ dateKey, existingEntry, onLogYes, onLogNo, onUndo }) => {
  const [praise, setPraise] = useState('');

  useEffect(() => {
    // Pick a random praise message on mount or when success happens
    setPraise(MESSAGES_PRAISE[Math.floor(Math.random() * MESSAGES_PRAISE.length)]);
  }, [existingEntry]);

  const displayDate = format(parseLocalISO(dateKey), 'EEEE, MMM do');

  if (existingEntry) {
    const isSuccess = existingEntry.status === 'yes';
    return (
      <div className={`relative rounded-2xl p-6 border shadow-sm transition-all flex flex-col items-center text-center ${
        isSuccess 
          ? 'bg-brand-50 border-brand-100' 
          : 'bg-white border-danger-100'
      }`}>
        
        {/* Small Top-Right Undo Button */}
        <button 
          onClick={onUndo}
          className="absolute top-3 right-3 p-2 text-slate-400 hover:text-slate-600 hover:bg-black/5 rounded-full transition-colors"
          title="Undo / Reset"
          aria-label="Undo log"
        >
          <RotateCcw size={18} />
        </button>
        
        <div className="text-slate-500 font-medium text-sm uppercase tracking-wide mb-4 mt-2">{displayDate}</div>
        
        {isSuccess ? (
          <>
            <div className="bg-green-100 p-4 rounded-full animate-bounce-small mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <div className="mb-2">
              <h2 className="text-2xl font-bold text-green-800 mb-2">Streak Active!</h2>
              <p className="text-green-800 text-lg font-medium italic leading-relaxed max-w-xs mx-auto">
                "{praise}"
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-red-100 p-4 rounded-full mb-4">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <div className="mb-2">
              <h2 className="text-2xl font-bold text-red-800 mb-2">Log Recorded</h2>
              <p className="text-slate-600 text-sm">
                 {existingEntry.note ? `"${existingEntry.note}"` : "You were honest today. That takes courage."}
              </p>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">How was today?</h2>
        <p className="text-slate-400 text-sm mt-1">{displayDate}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onLogYes}
          className="flex flex-col items-center justify-center p-6 rounded-xl bg-brand-50 border-2 border-brand-100 hover:bg-brand-100 hover:border-brand-200 active:scale-95 transition-all group"
          aria-label="I won today"
        >
          <CheckCircle2 className="w-10 h-10 text-brand-500 mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-brand-900">I Won</span>
        </button>

        <button
          onClick={onLogNo}
          className="flex flex-col items-center justify-center p-6 rounded-xl bg-red-50 border-2 border-red-100 hover:bg-red-100 hover:border-red-200 active:scale-95 transition-all group"
          aria-label="I slipped today"
        >
          <XCircle className="w-10 h-10 text-red-500 mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-red-900">I Slipped</span>
        </button>
      </div>
    </div>
  );
}