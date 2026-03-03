'use client';

import React, { useState } from 'react';
import Slide from '@/components/Slide';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function SlidePowerOfX() {
    const [val, setVal] = useState(3);

    return (
        <Slide
            title="The Power of Power!"
            subtitle="Why do we use x² and x³?"
        >
            <div className="grid grid-cols-3 gap-8 h-full">
                {/* x - Line */}
                <div className="glass p-8 rounded-3xl border border-white/10 flex flex-col gap-8">
                    <div className="space-y-1">
                        <h3 className="text-3xl font-black text-blue-400 italic">x</h3>
                        <p className="text-slate-400">Walking straight (Line)</p>
                    </div>

                    <div className="flex-1 flex items-center justify-center p-4">
                        <motion.div
                            animate={{ width: val * 40 }}
                            className="h-2 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                        />
                    </div>

                    <div className="text-center font-bold text-2xl">
                        Value: {val}
                    </div>
                </div>

                {/* x² - Area */}
                <div className="glass p-8 rounded-3xl border border-white/10 flex flex-col gap-8">
                    <div className="space-y-1">
                        <h3 className="text-3xl font-black text-emerald-400 italic">x²</h3>
                        <p className="text-slate-400">Area of a square</p>
                    </div>

                    <div className="flex-1 flex items-center justify-center p-4">
                        <motion.div
                            animate={{ width: val * 40, height: val * 40 }}
                            className="bg-emerald-500/20 border-2 border-emerald-500 rounded-lg shadow-inner flex items-center justify-center overflow-hidden"
                        >
                            <div className="grid grid-cols-6 grid-rows-6 w-full h-full opacity-20">
                                {Array.from({ length: 36 }).map((_, i) => (
                                    <div key={i} className="border border-emerald-500/30" />
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="text-center font-bold text-2xl">
                        Area: {val * val}
                    </div>
                </div>

                {/* x³ - Volume */}
                <div className="glass p-8 rounded-3xl border border-white/10 flex flex-col gap-8">
                    <div className="space-y-1">
                        <h3 className="text-3xl font-black text-amber-400 italic">x³</h3>
                        <p className="text-slate-400">Volume of a box</p>
                    </div>

                    <div className="flex-1 flex items-center justify-center p-4">
                        <div className="relative group" style={{ perspective: '800px' }}>
                            <motion.div
                                animate={{
                                    width: val * 25,
                                    height: val * 25,
                                    rotateY: 45,
                                    rotateX: -15
                                }}
                                style={{ transformStyle: 'preserve-3d' }}
                                className="relative"
                            >
                                {/* Front */}
                                <div className="absolute inset-0 bg-amber-500/30 border border-amber-500 translate-z-[12.5px]" style={{ transform: `translateZ(${val * 12.5}px)` }} />
                                {/* Back */}
                                <div className="absolute inset-0 bg-amber-500/20 border border-amber-500 translate-z-[-12.5px]" style={{ transform: `translateZ(${-val * 12.5}px)` }} />
                                {/* Right */}
                                <div className="absolute inset-0 bg-amber-500/25 border border-amber-500 origin-right rotate-y-90" style={{ transform: `rotateY(90deg) translateZ(${val * 12.5}px)` }} />
                                {/* Left */}
                                <div className="absolute inset-0 bg-amber-500/25 border border-amber-500 origin-left rotate-y--90" style={{ transform: `rotateY(-90deg) translateZ(${val * 12.5}px)` }} />
                                {/* Top */}
                                <div className="absolute inset-0 bg-amber-500/40 border border-amber-500 origin-top rotate-x-90" style={{ transform: `rotateX(90deg) translateZ(${val * 12.5}px)` }} />
                                {/* Bottom */}
                                <div className="absolute inset-0 bg-amber-500/40 border border-amber-500 origin-bottom rotate-x--90" style={{ transform: `rotateX(-90deg) translateZ(${val * 12.5}px)` }} />
                            </motion.div>
                        </div>
                    </div>

                    <div className="text-center font-bold text-2xl">
                        Volume: {val * val * val}
                    </div>
                </div>
            </div>

            <div className="mt-12 max-w-2xl mx-auto space-y-4">
                <div className="flex justify-between font-bold text-xl">
                    <span>Change Side Length (x)</span>
                    <span className="text-primary">{val}</span>
                </div>
                <input
                    type="range" min="1" max="6" step="0.1" value={val}
                    onChange={(e) => setVal(parseFloat(e.target.value))}
                    className="w-full h-4 bg-slate-700 rounded-xl appearance-none cursor-pointer accent-primary shadow-lg shadow-primary/20"
                />
            </div>
        </Slide>
    );
}
