import React from 'react';
import { Flame, Trophy } from 'lucide-react';

interface Props {
  currentStreak: number;
  longestStreak: number;
  isTodayLogged: boolean;
}

export const StreakDisplay: React.FC<Props> = ({ currentStreak, longestStreak, isTodayLogged }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute -right-6 -top-6 opacity-5">
        <Flame className="w-48 h-48" />
      </div>

      <div className="flex flex-col items-center justify-center text-center relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Flame className={`w-5 h-5 ${currentStreak > 0 ? 'text-orange-500 fill-orange-500' : 'text-slate-400'}`} />
          <span className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Current Streak</span>
        </div>
        
        <div className={`text-6xl font-black tracking-tight mb-2 ${isTodayLogged ? 'text-brand-600' : 'text-slate-800'}`}>
          {currentStreak}
        </div>
        
        <div className="text-slate-400 text-sm font-medium bg-slate-50 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mt-2">
          <Trophy className="w-3.5 h-3.5 text-yellow-500" />
          Best: {longestStreak} days
        </div>
      </div>
    </div>
  );
};