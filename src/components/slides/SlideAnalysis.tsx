'use client';

import React from 'react';
import Slide from '@/components/Slide';
import { BlockMath } from '@/components/Math';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { usePresentation } from '../PresentationContext';
import { cn } from '@/lib/utils';

export function SlideSolvingStepByStep() {
    const { revealStep, nextStep } = usePresentation();

    const steps = [
        {
            title: "Step 1: Write down the Recipe",
            content: <BlockMath math="P(x) = -x^2 + 10x" />,
            explanation: "This is our profit equation. The minus sign means it's an upside-down hill!"
        },
        {
            title: "Step 2: Check the Slope (Derivative)",
            content: <BlockMath math="P'(x) = -2x + 10" />,
            explanation: "This tells us how fast the profit changes as we sell more."
        },
        {
            title: "Step 3: Find the Plateau (Set to Zero)",
            content: <BlockMath math="-2x + 10 = 0 \implies x = 5" />,
            explanation: "When the slope is zero, we've reached the very top of the hill!"
        },
        {
            title: "Step 4: Calculate the Reward",
            content: <BlockMath math="P(5) = -(5)^2 + 10(5) = 25" />,
            explanation: "Selling 5 glasses gives us a maximum profit of ₹25!"
        }
    ];

    return (
        <Slide
            title="Solving Step by Step"
            subtitle="The path from discovery to answer"
        >
            <div className="grid grid-cols-2 gap-12">
                <div className="space-y-4">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{
                                opacity: revealStep >= i ? 1 : 0.2,
                                x: revealStep >= i ? 0 : -20,
                                scale: revealStep === i ? 1.02 : 1
                            }}
                            className={cn(
                                "p-4 rounded-2xl border transition-all duration-300",
                                revealStep === i ? "bg-primary/10 border-primary" : "bg-white/5 border-white/5"
                            )}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className={cn(
                                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                                    revealStep > i ? "bg-primary text-white" : "bg-slate-700 text-slate-400"
                                )}>
                                    {revealStep > i ? <Check size={14} /> : i + 1}
                                </div>
                                <h4 className="font-bold">{step.title}</h4>
                            </div>
                            {revealStep >= i && (
                                <div className="pl-9 space-y-2">
                                    <div className="text-xl">{step.content}</div>
                                    <p className="text-sm text-slate-400">{step.explanation}</p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-col items-center justify-center glass rounded-3xl p-8 border border-white/10 gap-8">
                    <div className="relative w-64 h-64">
                        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                            <path
                                d="M 10,90 Q 50,10 90,90"
                                fill="none"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="2"
                            />
                            <motion.path
                                d="M 10,90 Q 50,10 90,90"
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="3"
                                strokeDasharray="200"
                                initial={{ strokeDashoffset: 200 }}
                                animate={{ strokeDashoffset: 200 - (revealStep + 1) * 50 }}
                            />
                            {revealStep >= 2 && (
                                <motion.circle
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    cx="50" cy="30" r="4" fill="#f59e0b"
                                />
                            )}
                        </svg>
                        {revealStep >= 2 && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 animate-bounce">
                                <span className="bg-amber-500 text-black px-3 py-1 rounded-lg text-xs font-black">MAX!</span>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={nextStep}
                        disabled={revealStep >= steps.length - 1}
                        className="px-8 py-4 bg-primary rounded-2xl font-black flex items-center gap-2 hover:scale-105 disabled:opacity-30 transition-all shadow-xl shadow-primary/20"
                    >
                        NEXT STEP <ArrowRight />
                    </button>
                    <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Press Space to continue</p>
                </div>
            </div>
        </Slide>
    );
}

export function SlideComparison() {
    const methods = [
        { title: "Graph Method", desc: "Easy to see & understand", icon: "📊", color: "text-blue-400", speed: 50, accuracy: 60 },
        { title: "Formula Method", desc: "Paper & Pencil (Exact)", icon: "✏️", color: "text-amber-400", speed: 30, accuracy: 95 },
        { title: "Computer Method", desc: "For huge problems (Fastest)", icon: "💻", color: "text-emerald-400", speed: 100, accuracy: 99.9 }
    ];

    return (
        <Slide
            title="Which Tool is Best?"
            subtitle="Choosing the right weapon for the problem"
        >
            <div className="grid grid-cols-3 gap-8">
                {methods.map((m, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass p-8 rounded-3xl border border-white/10 flex flex-col gap-6"
                    >
                        <div className="text-6xl">{m.icon}</div>
                        <div>
                            <h3 className={cn("text-2xl font-black mb-1", m.color)}>{m.title}</h3>
                            <p className="text-slate-400 font-medium">{m.desc}</p>
                        </div>

                        <div className="space-y-4 mt-4">
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                                    <span>Speed</span>
                                    <span>{m.speed}%</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${m.speed}%` }}
                                        className={cn("h-full", m.color.replace('text', 'bg'))}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                                    <span>Accuracy</span>
                                    <span>{m.accuracy}%</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${m.accuracy}%` }}
                                        className={cn("h-full", m.color.replace('text', 'bg'))}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="mt-12 p-8 bg-blue-500/10 border border-blue-500/20 rounded-3xl text-center">
                <p className="text-2xl font-bold">The Best Solution is <span className="text-blue-400">Balanced</span>: Fast, Accurate, and Stable!</p>
            </div>
        </Slide>
    );
}
