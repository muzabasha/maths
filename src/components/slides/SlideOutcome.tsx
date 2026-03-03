'use client';

import React, { useState } from 'react';
import Slide from '@/components/Slide';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Target, TrendingUp, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

export function SlideErrorAnalysis() {
    const [guess, setGuess] = useState(100);
    const actual = 120;
    const error = Math.abs(actual - guess);

    return (
        <Slide
            title="How Close are We? 🏏"
            subtitle="The Cricket Score Analogy"
        >
            <div className="grid grid-cols-2 gap-12 items-center">
                <div className="space-y-8 glass p-10 rounded-3xl border border-white/10">
                    <h3 className="text-4xl font-black text-amber-400 italic">The Prediction Mode</h3>
                    <p className="text-2xl text-slate-300 leading-relaxed">
                        Suppose we predict the first innings score: <span className="text-white font-bold">{guess}</span> runs.
                        But the actual score is: <span className="text-primary font-bold">{actual}</span> runs.
                    </p>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-3xl font-black p-6 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                            <span>Current Error:</span>
                            <motion.span
                                key={error}
                                initial={{ scale: 1.5, color: '#f59e0b' }}
                                animate={{ scale: 1, color: error === 0 ? '#10b981' : '#f59e0b' }}
                                className={cn(error === 0 ? "text-primary" : "text-amber-500")}
                            >
                                {error} runs
                            </motion.span>
                        </div>

                        <div className="flex justify-between items-center text-xl font-bold p-4 bg-white/5 rounded-xl text-slate-400 italic">
                            {error === 0 ? "🎯 Bullseye! (Perfect Fit)" : error < 10 ? "✨ So close! (Small Error)" : error < 30 ? "📉 Getting there... (Medium Error)" : "🚀 Far away! (Big Error)"}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-12 glass p-12 rounded-3xl border border-primary/20 bg-primary/5 min-h-[500px] justify-center text-center">
                    <h3 className="text-2xl font-bold">Adjust Your Prediction (Guess)</h3>
                    <div className="w-full space-y-4">
                        <div className="flex justify-between text-2xl font-black">
                            <span>Predicted Score</span>
                            <span className="text-primary">{guess}</span>
                        </div>
                        <input
                            type="range" min="50" max="200" step="1" value={guess}
                            onChange={(e) => setGuess(parseInt(e.target.value))}
                            className="w-full h-4 bg-slate-700 rounded-2xl appearance-none cursor-pointer accent-primary p-2"
                        />
                    </div>

                    <div className="relative w-full h-24 flex items-center justify-center">
                        <div className="absolute w-full h-1 bg-slate-800 rounded-full" />
                        <div className="absolute left-[calc(50%+10px)] -translate-x-1/2 -translate-y-8 text-6xl opacity-20">🎯</div>

                        {/* Target */}
                        <div className="absolute left-[calc((120-50)/(200-50)*100%)] -translate-x-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_#10b981]">
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 font-black text-primary animate-pulse">ACTUAL</div>
                        </div>

                        {/* Guess */}
                        <motion.div
                            animate={{ left: `${((guess - 50) / (200 - 50)) * 100}%` }}
                            className="absolute -translate-x-1/2 w-4 h-4 bg-amber-500 rounded-full shadow-[0_0_20px_#f59e0b]"
                        >
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-black text-amber-500">GUESS</div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl mt-[-80px]">🏏</div>
                        </motion.div>
                    </div>

                    <p className="text-slate-500 italic">"The goal of any model is to reduce error to zero!"</p>
                </div>
            </div>
        </Slide>
    );
}

export function SlideConclusion() {
    const [celebrated, setCelebrated] = useState(false);

    const handleFinish = () => {
        setCelebrated(true);
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#10b981', '#3b82f6', '#f59e0b', '#ffffff']
        });
    };

    return (
        <Slide
            title="You Did It! 🎉"
            subtitle="Today you discovered the power of Applied Mathematics"
        >
            <div className="flex flex-col items-center justify-center py-20 gap-12 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="w-40 h-40 bg-linear-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 relative"
                >
                    <Trophy size={80} className="text-white drop-shadow-lg" />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-white/20 rounded-full"
                    />
                </motion.div>

                <div className="space-y-6">
                    <h3 className="text-6xl font-black math-gradient">Math Explorer Level 1 Mastery</h3>
                    <p className="text-3xl text-slate-400 font-medium">
                        You moved from zero to understanding how to model the world.
                    </p>
                </div>

                <div className="grid grid-cols-4 gap-6 w-full mt-8">
                    {[
                        { label: "Modeling", icon: <Search />, color: "bg-blue-500/10 border-blue-500/20" },
                        { label: "Predicting", icon: <TrendingUp />, color: "bg-emerald-500/10 border-emerald-500/20" },
                        { label: "Optimizing", icon: <Target />, color: "bg-amber-500/10 border-amber-500/20" },
                        { label: "Solving", icon: <Search />, color: "bg-primary-500/10 border-primary-500/20" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 + i * 0.1 }}
                            className={cn("p-6 rounded-2xl border flex flex-col items-center gap-3", item.color)}
                        >
                            <div className="text-primary">{item.icon}</div>
                            <h4 className="font-bold">{item.label}</h4>
                        </motion.div>
                    ))}
                </div>

                {!celebrated && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleFinish}
                        className="mt-12 px-16 py-6 bg-primary text-white text-3xl font-black rounded-3xl shadow-2xl shadow-primary/50 flex items-center gap-4 transition-all"
                    >
                        CELEBRATE PROGRESS 🎉
                    </motion.button>
                )}
            </div>
        </Slide>
    );
}
