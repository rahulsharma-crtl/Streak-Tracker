import React from 'react';
import { ShieldCheck, Settings } from 'lucide-react';

interface Props {
  onOpenSettings: () => void;
}

export const Header: React.FC<Props> = ({ onOpenSettings }) => {
  return (
    <header className="bg-white border-b border-slate-100 px-4 py-4 sticky top-0 z-10 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="bg-brand-100/50 p-1.5 rounded-lg overflow-hidden flex items-center justify-center">
          <img src="/icon.192.png" alt="Streak Tracker Logo" className="w-7 h-7 object-cover rounded-md" />
        </div>
        <h1 className="font-bold text-lg text-slate-800 tracking-tight">No-Chat Tracker</h1>
      </div>
      <button
        onClick={onOpenSettings}
        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
        aria-label="Settings"
      >
        <Settings className="w-5 h-5" />
      </button>
    </header>
  );
};