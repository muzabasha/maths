'use client';

import { useEffect, useMemo } from 'react';
import { usePresentation, StudentCategory } from './PresentationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize, Minimize, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SingleQuestion, QUESTIONS_BY_CATEGORY } from './Quiz';
import Slide from './Slide';

const categoryLabels: Record<StudentCategory, string> = {
    school: 'School Students',
    ug: 'UG Students',
    pg: 'PG Students',
    research: 'Research Scholars',
};

/*
 * Slide factory — returns a plain array of { id, render } objects.
 * The `render` function is called at render time so React always
 * creates fresh component instances for the active category.
 */
function getSlideDefinitions(category: StudentCategory) {
    const questions = QUESTIONS_BY_CATEGORY[category];

    // Map each question to its own slide
    const defs = questions.map((q, index) => ({
        id: `activity-${q.id}-${index}`,
        render: () => (
            <Slide
                title={`Activity ${index + 1}`}
                subtitle={categoryLabels[category]}
            >
                <div className="py-8">
                    <SingleQuestion question={q} />
                </div>
            </Slide>
        )
    }));

    return defs;
}

export default function PresentationView() {
    const {
        currentSlide, activeCategory, setActiveCategory,
        setTotalSlides, nextSlide, prevSlide,
        toggleFullScreen, isFullScreen,
    } = usePresentation();

    // Rebuild slide definitions whenever category changes
    const slideDefs = useMemo(
        () => getSlideDefinitions(activeCategory),
        [activeCategory],
    );
    const total = slideDefs.length;

    // Sync total with context
    useEffect(() => { setTotalSlides(total); }, [total, setTotalSlides]);

    // Clamp currentSlide (safety)
    const safeSlide = Math.min(currentSlide, total - 1);

    // Call the render function for the current slide
    const currentDef = slideDefs[safeSlide];
    const slideKey = `${activeCategory}-${currentDef.id}`;

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
                            <span className="text-sm font-medium text-muted-foreground">
                                Slide {safeSlide + 1} of {total}
                            </span>
                            <button onClick={toggleFullScreen} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Full Screen (F)">
                                <Maximize size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-6 pb-3">
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
                </header>
            )}

            <main className={cn(
                "flex-1 flex flex-col items-center justify-center overflow-hidden w-full",
                !isFullScreen && "pt-28 pb-20"
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

            <div className={cn(
                "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-4 py-2 rounded-2xl glass border border-white/10 shadow-2xl transition-opacity duration-300",
                isFullScreen ? "opacity-30 hover:opacity-100" : "opacity-100"
            )}>
                <button onClick={prevSlide} disabled={safeSlide === 0} className="p-2 disabled:opacity-30 hover:bg-white/10 rounded-xl transition-colors">
                    <ChevronLeft size={24} />
                </button>
                <div className="flex items-center gap-2 px-2">
                    {slideDefs.map((def, i) => (
                        <div key={def.id} className={cn("h-1.5 rounded-full transition-all duration-300", safeSlide === i ? "w-8 bg-primary" : "w-1.5 bg-slate-600")} />
                    ))}
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
