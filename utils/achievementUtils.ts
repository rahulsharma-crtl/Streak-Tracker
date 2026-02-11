import { StreakStats } from '../types';

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    requirement: number; // days in streak
}

export const ACHIEVEMENTS: Achievement[] = [
    { id: 'start', name: 'First Step', description: 'Log your first day.', icon: '🌱', requirement: 1 },
    { id: 'week', name: 'Iron Will', description: 'Maintain a 7-day streak.', icon: '🛡️', requirement: 7 },
    { id: 'fortnight', name: 'Inner Peace', description: 'Maintain a 14-day streak.', icon: '🧘', requirement: 14 },
    { id: 'month', name: 'Transformed', description: 'One month of discipline.', icon: '🔥', requirement: 30 },
    { id: 'hundred', name: 'Century Warrior', description: 'Reach 100 days.', icon: '👑', requirement: 100 },
    { id: 'year', name: 'Unstoppable', description: 'A full year of mastery.', icon: '⛰️', requirement: 365 },
];

export const getNextMilestone = (currentStreak: number) => {
    return ACHIEVEMENTS.find(a => a.requirement > currentStreak) || null;
};
