import React from 'react';
import { ACHIEVEMENTS, getNextMilestone } from '../utils/achievementUtils';
import { Award, Target } from 'lucide-react';

interface Props {
    currentStreak: number;
}

export const Achievements: React.FC<Props> = ({ currentStreak }) => {
    const nextMilestone = getNextMilestone(currentStreak);
    const unlocked = ACHIEVEMENTS.filter(a => a.requirement <= currentStreak);

    return (
        <div className="space-y-4">
            {nextMilestone && (
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-brand-600" />
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Next Milestone</span>
                        </div>
                        <span className="text-xs font-bold text-brand-600">{currentStreak}/{nextMilestone.requirement} days</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-2xl">{nextMilestone.icon}</div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-800 text-sm">{nextMilestone.name}</h4>
                            <p className="text-xs text-slate-500">{nextMilestone.description}</p>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                                <div
                                    className="h-full bg-brand-500 transition-all duration-500"
                                    style={{ width: `${(currentStreak / nextMilestone.requirement) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-4 gap-2">
                {unlocked.map(a => (
                    <div key={a.id} className="bg-white aspect-square rounded-xl border border-brand-100 flex flex-col items-center justify-center p-2 text-center animate-in zoom-in-50 duration-300">
                        <div className="text-xl mb-1">{a.icon}</div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase leading-tight">{a.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
