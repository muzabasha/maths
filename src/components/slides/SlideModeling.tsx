'use client';

import React, { useState } from 'react';
import Slide from '@/components/Slide';
import { BlockMath } from '@/components/Math';
import { motion } from 'framer-motion';
import { Sliders } from 'lucide-react';

export function SlideFromWordsToEquation() {
    const [glasses, setGlasses] = useState(10);

    return (
        <Slide
            title="From Words to Equation"
            subtitle="How 'x' makes math powerful"
        >
            <div className="grid grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
                        <h3 className="text-2xl font-bold text-primary">The Translation</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xl">
                                <span className="text-slate-400 font-medium">Number of glasses</span>
                                <span className="font-mono bg-white/5 px-3 py-1 rounded text-primary">x</span>
                            </div>
                            <div className="flex justify-between items-center text-xl">
                                <span className="text-slate-400 font-medium">Profit per glass</span>
                                <span className="font-mono bg-white/5 px-3 py-1 rounded">₹10 − ₹5 = ₹5</span>
                            </div>
                            <div className="h-px bg-white/10 w-full" />
                            <div className="flex justify-between items-center text-2xl font-bold">
                                <span>Total Profit</span>
                                <span className="text-primary">5x</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-3xl border border-white/10 space-y-4">
                        <h4 className="text-xl font-bold text-accent">Why "x"?</h4>
                        <p className="text-lg text-slate-300">
                            "x" is like a placeholder. It can be 1, 10, 100, or a million!
                            By using "x", we create a <strong>formula</strong> that works for everything.
                        </p>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="glass p-8 rounded-3xl border border-primary/20 flex flex-col items-center gap-8">
                        <h3 className="text-2xl font-bold">Try it out!</h3>
                        <div className="w-full space-y-2">
                            <div className="flex justify-between font-bold">
                                <span>Glasses Sold (x)</span>
                                <span className="text-primary">{glasses}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={glasses}
                                onChange={(e) => setGlasses(parseInt(e.target.value))}
                                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <BlockMath math={`\\text{Profit} = 5 \\times ${glasses} = ₹${5 * glasses}`} />
                            <motion.div
                                key={glasses}
                                initial={{ scale: 1 }}
                                animate={{ scale: [1, 1.1, 1] }}
                                className="text-6xl"
                            >
                                {5 * glasses >= 0 ? '💰' : '📉'}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </Slide>
    );
}
