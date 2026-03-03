'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface Question {
    id: number;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
    analogy?: string;
}

const QUESTIONS: Question[] = [
    {
        id: 1,
        question: "If x increases, what happens to 5x?",
        options: ["Decreases", "Increases", "Stays same", "Becomes zero"],
        correct: 1,
        explanation: "As you sell more glasses (x), your profit (5x) goes up!",
        analogy: "Like walking more steps means more distance."
    },
    {
        id: 2,
        question: "x² represents:",
        options: ["Double x", "x × x", "Half x", "x − 2"],
        correct: 1,
        explanation: "x² means x multiplied by itself, forming a square area.",
        analogy: "If side is 3, area is 3x3=9."
    },
    {
        id: 3,
        question: "Highest point on a graph is called:",
        options: ["Minimum", "Maximum", "Zero", "Error"],
        correct: 1,
        explanation: "The peak of the hill represents the best possible outcome.",
        analogy: "Like reaching the top of Everest!"
    },
    {
        id: 4,
        question: "If slope is zero, we may have:",
        options: ["Highest or lowest point", "Always zero", "No solution", "Infinite"],
        correct: 0,
        explanation: "A flat slope means you are neither going up nor down - you're at the top or bottom.",
        analogy: "Like standing on a flat plateau on top of a hill."
    },
    {
        id: 5,
        question: "If predicted value is far from real value, it's a:",
        options: ["Small error", "Big error", "Perfect fit", "Stable"],
        correct: 1,
        explanation: "The gap between guess and reality is the error.",
        analogy: "Like missing the wickets by a mile in cricket!"
    }
];

export default function QuizComponent() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const handleSelect = (idx: number) => {
        if (showResult) return;
        setSelected(idx);
        setShowResult(true);
        if (idx === QUESTIONS[currentIdx].correct) {
            setScore(prev => prev + 1);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#10b981', '#3b82f6', '#f59e0b']
            });
        }
    };

    const nextQuestion = () => {
        if (currentIdx < QUESTIONS.length - 1) {
            setCurrentIdx(prev => prev + 1);
            setSelected(null);
            setShowResult(false);
        } else {
            setIsFinished(true);
        }
    };

    if (isFinished) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-12 rounded-3xl border border-primary/20 text-center space-y-8 max-w-2xl mx-auto"
            >
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={48} className="text-primary" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-4xl font-black">Quiz Complete! 🎉</h3>
                    <p className="text-2xl text-slate-400">You scored {score} out of {QUESTIONS.length}</p>
                </div>

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => {
                            setCurrentIdx(0);
                            setSelected(null);
                            setShowResult(false);
                            setScore(0);
                            setIsFinished(false);
                        }}
                        className="px-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all font-bold flex items-center gap-2"
                    >
                        <RefreshCcw size={20} /> Try Again
                    </button>
                </div>
            </motion.div>
        );
    }

    const q = QUESTIONS[currentIdx];

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <span className="text-primary font-bold text-xl">Question {currentIdx + 1}/{QUESTIONS.length}</span>
                    <div className="flex gap-1">
                        {QUESTIONS.map((_, i) => (
                            <div key={i} className={cn("h-1.5 w-8 rounded-full", i <= currentIdx ? "bg-primary" : "bg-slate-800")} />
                        ))}
                    </div>
                </div>
                <h3 className="text-4xl font-black leading-tight">{q.question}</h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {q.options.map((opt, i) => {
                    const isCorrect = i === q.correct;
                    const isSelected = selected === i;

                    return (
                        <motion.button
                            key={i}
                            whileHover={!showResult ? { scale: 1.02, x: 10 } : {}}
                            onClick={() => handleSelect(i)}
                            className={cn(
                                "p-6 text-left text-2xl font-bold rounded-2xl border transition-all duration-300 flex items-center justify-between",
                                !showResult && "bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/50",
                                showResult && isCorrect && "bg-primary/20 border-primary text-primary",
                                showResult && isSelected && !isCorrect && "bg-red-500/20 border-red-500 text-red-500",
                                showResult && !isSelected && !isCorrect && "opacity-30 border-white/5"
                            )}
                        >
                            <span>{opt}</span>
                            {showResult && isCorrect && <CheckCircle2 className="text-primary" />}
                            {showResult && isSelected && !isCorrect && <XCircle className="text-red-500" />}
                        </motion.button>
                    );
                })}
            </div>

            <AnimatePresence>
                {showResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="glass p-8 rounded-3xl border border-white/10 space-y-4">
                            <div className="flex items-center gap-2 text-xl font-bold">
                                <span className="text-primary tracking-widest uppercase text-sm">Explanation</span>
                            </div>
                            <p className="text-2xl leading-relaxed">{q.explanation}</p>
                            {q.analogy && (
                                <p className="text-xl text-slate-400 italic">💡 Analogy: {q.analogy}</p>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={nextQuestion}
                                className="px-10 py-4 bg-primary text-white text-2xl font-black rounded-2xl shadow-xl shadow-primary/30 flex items-center gap-2 hover:scale-105 transition-transform"
                            >
                                Next Question <ChevronRight size={28} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
