'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { usePresentation, StudentCategory } from './PresentationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize, Minimize, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QUESTIONS_BY_CATEGORY } from './Quiz';
import { buildActivitySlides, PhaseIndicator, ScoreBar, ActivitySlide, ActivityType } from './ActivityEngine';
import Slide from './Slide';

const categoryLabels: Record<StudentCategory, string> = {
    school: 'School Students',
    ug: 'UG Students',
    pg: 'PG Students',
    research: 'Research Scholars',
};

export default function PresentationView() {
    const {
        currentSlide, activeCategory, setActiveCategory,
        setTotalSlides, nextSlide, prevSlide,
        toggleFullScreen, isFullScreen,
    } = usePresentation();

    // Gamification state
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [totalAnswered, setTotalAnswered] = useState(0);

    const handleScore = useCallback((delta: number) => {
        if (delta > 0) setScore(prev => prev + delta);
        setTotalAnswered(prev => prev + 1);
    }, []);

    const handleStreak = useCallback((correct: boolean) => {
        setStreak(prev => correct ? prev + 1 : 0);
    }, []);

    // Reset gamification on category change
    useEffect(() => {
        setScore(0);
        setStreak(0);
        setTotalAnswered(0);
    }, [activeCategory]);

    // Build activity slides for current category
    const questions = QUESTIONS_BY_CATEGORY[activeCategory];
    const slideDefs: ActivitySlide[] = useMemo(
        () => buildActivitySlides(activeCategory, questions, handleScore, handleStreak),
        [activeCategory, questions, handleScore, handleStreak],
    );
    const total = slideDefs.length;
    const totalQuestions = questions.length;

    useEffect(() => { setTotalSlides(total); }, [total, setTotalSlides]);

    const safeSlide = Math.min(currentSlide, total - 1);
    const currentDef = slideDefs[safeSlide];
    const slideKey = `${activeCategory}-${currentDef.id}`;

    // Progress through phases
    const phases: ActivityType[] = ['explore', 'experiment', 'apply', 'assess'];

    return (
        <div className={cn(
            "relative min-h-screen w-full flex flex-col transition-colors duration-500",
            isFullScreen ? "bg-slate-950" : "bg-slate-50 dark:bg-slate-950"
        )}>
            {!isFullScreen && (
                <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
                    <div className="h-16 flex items-center justify-between px-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">M</div>
                            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Math Explorer</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <ScoreBar score={score} streak={streak} totalAnswered={totalAnswered} totalQuestions={totalQuestions} />
                            <div className="w-px h-6 bg-white/10" />
                            <span className="text-sm font-medium text-muted-foreground">
                                {safeSlide + 1} / {total}
                            </span>
                            <button onClick={toggleFullScreen} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Full Screen (F)">
                                <Maximize size={20} />
                            </button>
                        </div>
                    </div>
                    {/* Category tabs + Phase indicators */}
                    <div className="flex items-center justify-between px-6 pb-3">
                        <div className="flex items-center gap-2">
                            {(Object.keys(categoryLabels) as StudentCategory[]).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                        activeCategory === cat
                                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                                            : "bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground"
                                    )}
                                >{categoryLabels[cat]}</button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            {phases.map(phase => (
                                <PhaseIndicator key={phase} phase={phase} currentPhase={currentDef.phase} />
                            ))}
                        </div>
                    </div>
                </header>
            )}

            <main className={cn(
                "flex-1 flex flex-col items-center justify-center overflow-hidden w-full",
                !isFullScreen && "pt-32 pb-20"
            )}>
                <div className="w-full max-w-7xl px-8 h-full flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={slideKey}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="w-full"
                        >
                            {currentDef.render()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* Bottom navigation */}
            <div className={cn(
                "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-4 py-2 rounded-2xl glass border border-white/10 shadow-2xl transition-opacity duration-300",
                isFullScreen ? "opacity-30 hover:opacity-100" : "opacity-100"
            )}>
                <button onClick={prevSlide} disabled={safeSlide === 0} className="p-2 disabled:opacity-30 hover:bg-white/10 rounded-xl transition-colors">
                    <ChevronLeft size={24} />
                </button>

                {/* Compact progress dots grouped by phase */}
                <div className="flex items-center gap-1 px-2 max-w-[400px] overflow-hidden">
                    {slideDefs.map((def, i) => {
                        const phaseColors: Record<ActivityType, string> = {
                            explore: 'bg-emerald-500',
                            experiment: 'bg-amber-500',
                            apply: 'bg-blue-500',
                            assess: 'bg-purple-500',
                        };
                        return (
                            <div
                                key={def.id}
                                className={cn(
                                    "h-1.5 rounded-full transition-all duration-300",
                                    safeSlide === i ? `w-6 ${phaseColors[def.phase]}` : `w-1 ${phaseColors[def.phase]} opacity-30`
                                )}
                            />
                        );
                    })}
                </div>

                <button onClick={nextSlide} disabled={safeSlide === total - 1} className="p-2 disabled:opacity-30 hover:bg-white/10 rounded-xl transition-colors">
                    <ChevronRight size={24} />
                </button>
                <div className="w-[1px] h-6 bg-white/10 mx-2" />
                <button onClick={toggleFullScreen} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                    {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
            </div>
        </div>
    );
}
