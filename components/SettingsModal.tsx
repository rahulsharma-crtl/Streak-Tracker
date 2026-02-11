import React, { useRef } from 'react';
import { AppSettings } from '../types';
import { X, Upload, Download, Smartphone, AlertTriangle } from 'lucide-react';

interface Props {
  settings: AppSettings;
  onSaveSettings: (s: AppSettings) => void;
  onClose: () => void;
  onExport: () => void;
  onImport: (data: string) => void;
}

export const SettingsModal: React.FC<Props> = ({ settings, onSaveSettings, onClose, onExport, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        onImport(result);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Settings</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Day Start Hour */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Start of Day Hour
            </label>
            <p className="text-xs text-slate-400 mb-2">If you stay up late, set this to 4 or 5 AM so your night streaks count for the previous day.</p>
            <select
              value={settings.dayStartHour}
              onChange={(e) => onSaveSettings({ ...settings, dayStartHour: parseInt(e.target.value) })}
              className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500"
            >
              {Array.from({ length: 24 }).map((_, i) => (
                <option key={i} value={i}>
                  {i === 0 ? 'Midnight (12 AM)' : i === 12 ? 'Noon (12 PM)' : i > 12 ? `${i - 12} PM` : `${i} AM`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              App Theme
            </label>
            <p className="text-xs text-slate-400 mb-2">Switch between light, dark, and your custom Neon theme.</p>
            <div className="grid grid-cols-3 gap-2">
              {(['light', 'dark', 'neon'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => onSaveSettings({ ...settings, theme: t })}
                  className={`p-2 rounded-xl border text-xs font-bold capitalize transition-all ${settings.theme === t
                      ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Data Management */}
          <div>
            <h4 className="font-medium text-slate-800 mb-3">Sync & Backup</h4>

            <div className="bg-brand-50 p-3 rounded-lg mb-4 flex gap-3 items-start border border-brand-100">
              <Smartphone className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
              <div className="text-xs text-brand-900 leading-relaxed">
                <strong>Cloud Sync Enabled.</strong> Set a unique <b>Sync Key</b> to save your data permanently and sync across devices.
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">
                  Cloud Sync Key
                </label>
                <input
                  type="text"
                  placeholder="Enter a secret key..."
                  value={settings.syncKey || ''}
                  onChange={(e) => onSaveSettings({ ...settings, syncKey: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500 font-mono text-sm"
                />
                <p className="text-[10px] text-slate-400 mt-1 px-1">Use a unique name or secret code (e.g. your name + favorite number).</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={onExport}
                  className="flex items-center justify-center gap-2 p-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 p-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Import
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".json"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {!(settings.syncKey && settings.syncKey.length > 3) && (
            <div className="bg-amber-50 p-3 rounded-lg text-xs text-amber-700 text-center flex flex-col gap-1 border border-amber-100">
              <span className="flex items-center justify-center gap-1 font-bold">
                <AlertTriangle className="w-3 h-3" />
                Data Not Synced
              </span>
              Set a Sync Key above to save your data to the cloud permanently.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};