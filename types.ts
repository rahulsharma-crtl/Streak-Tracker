export type DayStatus = 'yes' | 'no';

export interface LogEntry {
  date: string; // YYYY-MM-DD
  status: DayStatus;
  note: string;
  timestamp: number;
}

export interface AppSettings {
  dayStartHour: number; // 0-23
  userName?: string;
}

export interface StreakStats {
  currentStreak: number;
  longestStreak: number;
}