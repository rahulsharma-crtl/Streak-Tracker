import { LogEntry, StreakStats } from '../types';
import { format, differenceInCalendarDays, addDays } from 'date-fns';

// Parse YYYY-MM-DD string to a Date object in local time at midnight
export const parseLocalISO = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};

// Get the "App Date" based on start hour.
// If it's 2AM and startHour is 4AM, it counts as the previous day.
export const getAppDateKey = (date: Date, startHour: number): string => {
  const d = new Date(date);
  if (d.getHours() < startHour) {
    d.setDate(d.getDate() - 1);
  }
  return format(d, 'yyyy-MM-dd');
};

export const calculateStats = (logs: Record<string, LogEntry>, todayKey: string): StreakStats => {
  const dates = Object.keys(logs).sort();
  if (dates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Calculate Longest Streak
  // We iterate chronologically through sorted dates
  // If we find a gap greater than 1 day (meaning a missing day), streak breaks if we are strict.
  // However, for this app, a missing log usually means nothing recorded. 
  // The requirement says: "Count consecutive days with status 'yes' until today breaks."
  
  // To do this accurately, we need to iterate day by day from the first log to today.
  if (dates.length > 0) {
    const firstDate = parseLocalISO(dates[0]);
    const lastDate = parseLocalISO(todayKey);
    const totalDays = differenceInCalendarDays(lastDate, firstDate) + 1;

    for (let i = 0; i < totalDays; i++) {
      const d = addDays(firstDate, i);
      const key = format(d, 'yyyy-MM-dd');
      const entry = logs[key];

      if (entry && entry.status === 'yes') {
        tempStreak++;
      } else {
        tempStreak = 0;
      }
      if (tempStreak > longestStreak) longestStreak = tempStreak;
    }
  }

  // Calculate Current Streak
  // Iterate backwards from today
  let checkDate = parseLocalISO(todayKey);
  let streakAlive = true;
  
  // If today is logged as NO, streak is 0.
  // If today is logged as YES, streak starts at 1.
  // If today is NOT logged, we check yesterday.
  
  const todayEntry = logs[todayKey];
  
  if (todayEntry) {
     if (todayEntry.status === 'no') {
         currentStreak = 0;
         streakAlive = false;
     } else {
         currentStreak = 1;
         checkDate = addDays(checkDate, -1); // Prepare to check yesterday
     }
  } else {
     // Today not logged yet. Check yesterday.
     checkDate = addDays(checkDate, -1);
  }

  while (streakAlive) {
    const key = format(checkDate, 'yyyy-MM-dd');
    const entry = logs[key];
    if (entry && entry.status === 'yes') {
      currentStreak++;
      checkDate = addDays(checkDate, -1);
    } else {
      streakAlive = false;
    }
  }

  return { currentStreak, longestStreak };
};

export const getLast90Days = (todayKey: string): string[] => {
  const today = parseLocalISO(todayKey);
  const days: string[] = [];
  for (let i = 89; i >= 0; i--) {
    days.push(format(addDays(today, -i), 'yyyy-MM-dd'));
  }
  return days;
};

export const getPast7Days = (todayKey: string): string[] => {
  const today = parseLocalISO(todayKey);
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    days.push(format(addDays(today, -i), 'yyyy-MM-dd'));
  }
  return days;
};