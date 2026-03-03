'use client';

import React, { useState } from 'react';
import Slide from '@/components/Slide';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function SlideDifferentiation() {
    const [slope, setSlope] = useState(1);

    return (
        <Slide
            title="Checking the Direction"
            subtitle="The Magic of Derivatives"
        >
            <div className="grid grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
                        <h3 className="text-3xl font-bold text-accent">Derivative means Shift!</h3>
                        <p className="text-2xl text-slate-300">
                            It's just a fancy word for <span className="text-white font-bold underline decoration-accent">"How much is it changing?"</span>
                        </p>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-4 text-xl">
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                                    <TrendingUp />
                                </div>
                                <span>Positive (+) = Going Up</span>
                            </div>
                            <div className="flex items-center gap-4 text-xl">
                                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-500">
                                    <TrendingDown />
                                </div>
                                <span>Negative (−) = Going Down</span>
                            </div>
                            <div className="flex items-center gap-4 text-xl">
                                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500">
                                    <Minus />
                                </div>
                                <span>Zero (0) = Standing Flat at the Peak!</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-xl italic text-slate-400">
                            "Think of it like checking if you are walking uphill or downhill."
                        </p>
                    </div>
                </div>

                <div className="glass p-12 rounded-3xl border border-primary/20 flex flex-col items-center gap-12 h-[500px]">
                    <h3 className="text-2xl font-bold">Slope Visualizer</h3>

                    <div className="relative w-full h-1 bg-slate-800 rounded-full mt-24">
                        <motion.div
                            animate={{ rotate: -slope * 15 }}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-4 bg-linear-to-r from-transparent via-primary to-transparent"
                        >
                            <div className="absolute top-[-30px] left-1/2 -translate-x-1/2">
                                <span className="text-4xl">🚶‍♂️</span>
                            </div>
                        </motion.div>
                    </div>

                    <div className="mt-auto w-full space-y-4">
                        <div className="flex justify-between font-bold">
                            <span>Current Slope</span>
                            <span className={cn(
                                "text-2xl",
                                slope > 0 ? "text-emerald-400" : slope < 0 ? "text-red-400" : "text-amber-400"
                            )}>
                                {slope > 0 ? "Going Up 📈" : slope < 0 ? "Going Down 📉" : "At the Top! 🎯"}
                            </span>
                        </div>
                        <input
                            type="range" min="-3" max="3" step="1" value={slope}
                            onChange={(e) => setSlope(parseInt(e.target.value))}
                            className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>
                </div>
            </div>
        </Slide>
    );
}

export function SlideStability() {
    const [noise, setNoise] = useState(0);

    return (
        <Slide
            title="Steady as a Rock"
            subtitle="Why Stability Matters"
        >
            <div className="flex flex-col gap-12 text-center max-w-4xl mx-auto">
                <p className="text-3xl text-slate-300">
                    In real life, things aren't perfect. There is always "wind" or "noise".
                    A good model stays steady even when things shake!
                </p>

                <div className="grid grid-cols-2 gap-12">
                    <div className="glass p-8 rounded-3xl border border-white/10 space-y-8 overflow-hidden relative">
                        <h3 className="text-2xl font-bold">Model A (Unstable)</h3>
                        <div className="flex justify-center py-8">
                            <motion.div
                                animate={{
                                    x: noise * 50,
                                    rotate: noise * 20,
                                    y: noise * 10
                                }}
                                className="text-9xl filter drop-shadow-2xl"
                            >
                                ✈️
                            </motion.div>
                        </div>
                        <p className="text-red-400 font-bold">Small wind → Big shift!</p>
                    </div>

                    <div className="glass p-8 rounded-3xl border border-white/10 space-y-8 overflow-hidden relative">
                        <h3 className="text-2xl font-bold">Model B (Stable)</h3>
                        <div className="flex justify-center py-8">
                            <motion.div
                                animate={{
                                    x: noise * 5,
                                    rotate: noise * 2,
                                    y: noise * 2
                                }}
                                className="text-9xl filter drop-shadow-2xl"
                            >
                                🏢
                            </motion.div>
                        </div>
                        <p className="text-emerald-400 font-bold">Small wind → Steady!</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between font-bold text-xl">
                        <span>Add "Wind" (Perturbation)</span>
                        <span>{noise === 0 ? "Calm" : noise < 0 ? "West Wind" : "East Wind"}</span>
                    </div>
                    <input
                        type="range" min="-1" max="1" step="0.1" value={noise}
                        onChange={(e) => setNoise(parseFloat(e.target.value))}
                        className="w-full h-8 bg-slate-700 rounded-2xl appearance-none cursor-pointer accent-accent p-2"
                    />
                </div>
            </div>
        </Slide>
    );
}
