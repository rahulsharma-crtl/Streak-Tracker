
import React, { useState, useEffect, useMemo } from 'react';
import { LogEntry, AppSettings, DayStatus } from './types';
import { DEFAULT_SETTINGS, MESSAGES_PRAISE } from './constants';
import { getAppDateKey, calculateStats } from './utils/dateUtils';
import { saveToFirebase, fetchFromFirebase } from './utils/firebaseService';
import { StreakDisplay } from './components/StreakCounter';
import { DailyLogCard } from './components/DailyLogCard';
import { Heatmap } from './components/Heatmap';
import { WeeklyProgress } from './components/WeeklyProgress';
import { SlipModal } from './components/SlipModal';
import { SettingsModal } from './components/SettingsModal';
import { Header } from './components/Header';
import { DayDetailModal } from './components/DayDetailModal';
import { WisdomCard } from './components/WisdomCard';
import { Achievements } from './components/Achievements';
import { Settings, Share2 } from 'lucide-react';

// Confetti global from CDN
declare var confetti: any;

const STORAGE_KEY = 'no-chat-tracker-data';

interface AppData {
  logs: Record<string, LogEntry>;
  settings: AppSettings;
}

export default function App() {
  // State
  const [logs, setLogs] = useState<Record<string, LogEntry>>({});
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isSlipModalOpen, setIsSlipModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load Data
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: AppData = JSON.parse(stored);
        setLogs(parsed.logs || {});
        setSettings({ ...DEFAULT_SETTINGS, ...(parsed.settings || {}) });
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
    setHasLoaded(true);
  }, []);

  // Sync from Firebase
  useEffect(() => {
    const syncFromCloud = async () => {
      if (settings.syncKey && settings.syncKey.length > 3) {
        const cloudData = await fetchFromFirebase(settings.syncKey);
        if (cloudData) {
          // Merge logic: For now, we simple update if cloud exists. 
          // In a real app, we'd check timestamps.
          setLogs(prev => ({ ...prev, ...(cloudData.logs || {}) }));
          setSettings(prev => ({ ...prev, ...(cloudData.settings || {}), syncKey: prev.syncKey })); // Keep local syncKey
        }
      }
    };
    if (hasLoaded) {
      syncFromCloud();
    }
  }, [settings.syncKey, hasLoaded]);

  // Save Data
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ logs, settings }));
      if (settings.syncKey && settings.syncKey.length > 3) {
        saveToFirebase(settings.syncKey, { logs, settings });
      }
    }
  }, [logs, settings, hasLoaded]);

  // Logic
  const todayKey = useMemo(() => getAppDateKey(new Date(), settings.dayStartHour), [settings.dayStartHour]);

  const stats = useMemo(() => calculateStats(logs, todayKey), [logs, todayKey]);

  const handleLog = (status: DayStatus, note?: string) => {
    const newLog: LogEntry = {
      date: todayKey,
      status,
      timestamp: Date.now(),
      note: note || ''
    };

    setLogs(prev => ({
      ...prev,
      [todayKey]: newLog
    }));

    if (status === 'yes') {
      triggerConfetti();
    }
  };

  const handleUndoLog = () => {
    setLogs(prev => {
      const newLogs = { ...prev };
      delete newLogs[todayKey];
      return newLogs;
    });
  };

  const triggerConfetti = () => {
    if (typeof confetti === 'function') {
      const count = 200;
      const defaults = { origin: { y: 0.7 } };

      function fire(particleRatio: number, opts: any) {
        confetti(Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio)
        }));
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }
  };


  if (!hasLoaded) return null;

  const todaysEntry = logs[todayKey];

  return (
    <div className={`max-w-md mx-auto min-h-screen sm:border-x sm:shadow-xl relative transition-colors duration-300 ${settings.theme === 'neon' ? 'theme-neon bg-slate-950 border-slate-900' :
      settings.theme === 'dark' ? 'dark bg-slate-900 text-white border-slate-800' :
        'bg-slate-50 border-slate-200'
      }`}>
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />

      <main className="p-4 space-y-6 pb-24">
        {/* Wisdom Card */}
        <WisdomCard />

        {/* Streak Counter */}
        <StreakDisplay
          currentStreak={stats.currentStreak}
          longestStreak={stats.longestStreak}
          isTodayLogged={!!todaysEntry && todaysEntry.status === 'yes'}
        />

        {/* Achievements */}
        <Achievements currentStreak={stats.currentStreak} />

        {/* Main Action Card */}
        <DailyLogCard
          dateKey={todayKey}
          existingEntry={todaysEntry}
          onLogYes={() => handleLog('yes')}
          onLogNo={() => setIsSlipModalOpen(true)}
          onUndo={handleUndoLog}
        />

        {/* Weekly Progress */}
        <WeeklyProgress logs={logs} todayKey={todayKey} />

        {/* Heatmap */}
        <Heatmap
          logs={logs}
          todayKey={todayKey}
          onDayClick={(date) => setSelectedDate(date)}
        />

        {/* Spacer for bottom reachability */}
        <div className="h-4" />
      </main>

      {/* Modals */}
      {isSlipModalOpen && (
        <SlipModal
          onClose={() => setIsSlipModalOpen(false)}
          onSubmit={(note) => {
            handleLog('no', note);
            setIsSlipModalOpen(false);
          }}
        />
      )}

      {isSettingsOpen && (
        <SettingsModal
          settings={settings}
          onSaveSettings={setSettings}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {selectedDate && (
        <DayDetailModal
          dateKey={selectedDate}
          logs={logs}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
}
