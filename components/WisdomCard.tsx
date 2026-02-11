import React, { useState, useEffect } from 'react';
import { MESSAGES_PRAISE } from '../constants';
import { Quote, RefreshCcw } from 'lucide-react';

export const WisdomCard: React.FC = () => {
    const [quote, setQuote] = useState('');

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * MESSAGES_PRAISE.length);
        setQuote(MESSAGES_PRAISE[randomIndex]);
    };

    useEffect(() => {
        getRandomQuote();
    }, []);

    return (
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden group">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-brand-500/20 transition-colors" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full -ml-12 -mb-12 blur-2xl" />

            <div className="relative">
                <div className="flex justify-between items-start mb-4">
                    <Quote className="w-6 h-6 text-brand-400 fill-brand-400" />
                    <button
                        onClick={getRandomQuote}
                        className="p-2 hover:bg-white/10 rounded-full text-slate-400 transition-colors active:rotate-180 duration-500"
                    >
                        <RefreshCcw className="w-4 h-4" />
                    </button>
                </div>

                <p className="text-lg font-semibold leading-relaxed mb-1 italic">
                    "{quote}"
                </p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
                    Daily Wisdom
                </p>
            </div>
        </div>
    );
};
