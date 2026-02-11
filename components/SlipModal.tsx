import React, { useState } from 'react';
import { MESSAGES_COMPASSION } from '../constants';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSubmit: (note: string) => void;
}

export const SlipModal: React.FC<Props> = ({ onClose, onSubmit }) => {
  const [note, setNote] = useState('');
  const [step, setStep] = useState<'input' | 'compassion'>('input');
  const [randomMessage] = useState(MESSAGES_COMPASSION[Math.floor(Math.random() * MESSAGES_COMPASSION.length)]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    setStep('compassion');
  };

  const handleFinalize = () => {
    onSubmit(note);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">
            {step === 'input' ? 'Log a Slip' : 'Be Kind to Yourself'}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {step === 'input' ? (
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                What triggered you today?
              </label>
              <textarea
                className="w-full p-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none resize-none text-sm min-h-[100px]"
                placeholder="Stress, boredom, loneliness..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                required
                autoFocus
              />
              <button
                type="submit"
                className="w-full mt-4 bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-slate-800 transition-colors"
              >
                Reflect & Continue
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-lg text-slate-700 leading-relaxed font-medium">
                "{randomMessage}"
              </p>
              <button
                onClick={handleFinalize}
                className="w-full bg-brand-600 text-white font-semibold py-3 rounded-xl hover:bg-brand-700 transition-colors"
              >
                I accept
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};