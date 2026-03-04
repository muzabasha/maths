'use client';

import { useEffect } from 'react';
import { usePresentation, StudentCategory } from './PresentationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize, Minimize, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SlideIntro, SlideLemonadeStory } from './slides/SlideFoundations';
import { SlideFromWordsToEquation } from './slides/SlideModeling';
import { SlidePolynomialRecipe } from './slides/SlidePolynomialIntuition';
import { SlidePowerOfX } from './slides/SlidePowers';
import { SlideDifferentiation, SlideStability } from './slides/SlideCalculus';
import { SlideSolvingStepByStep, SlideComparison } from './slides/SlideAnalysis';
import { SlideErrorAnalysis, SlideConclusion } from './slides/SlideOutcome';
import QuizComponent from './Quiz';
import Slide from './Slide';

const categoryLabels: Record<StudentCategory, string> = {
    school: 'School Students',
    ug: 'UG Students',
    pg: 'PG Students',
    research: 'Research Scholars',
};

const quizMeta: Record<StudentCategory, { title: string; subtitle: string }> = {
    school: { title: 'The Knowledge Challenge 🎮', subtitle: 'Test your skills before the final reward!' },
    ug: { title: 'Test Your Understanding 🎯', subtitle: 'Apply what you\'ve learned!' },
    pg: { title: 'Advanced Concepts Quiz 🧠', subtitle: 'Challenge your advanced knowledge!' },
    research: { title: 'Expert Level Challenge 🔬', subtitle: 'Demonstrate your expertise!' },
};

function buildSlides(category: StudentCategory) {
    const slides: React.ReactNode[] = [
        <SlideIntro key="intro" />,
        <SlideLemonadeStory key="lemonade" />,
        <SlideFromWordsToEquation key="modeling" />,
        <SlidePolynomialRecipe key="polynomial" />,
    ];

    if (category !== 'school') {
        slides.push(
            <SlidePowerOfX key="powers" />,
            <SlideDifferentiation key="diff" />,
            <SlideSolvingStepByStep key="solve" />,
        );
    }

    if (category === 'pg' || category === 'research') {
        slides.push(
            <SlideErrorAnalysis key="error" />,
            <SlideComparison key="compare" />,
            <SlideStability key="stability" />,
        );
    }

    const meta = quizMeta[category];
    slides.push(
        <Slide key="quiz" title={meta.title} subtitle={meta.subtitle}>
            <div className="py-8">
                <QuizComponent category={category} />
            </div>
        </Slide>,
    );

    slides.push(<SlideConclusion key="conclusion" />);
    return slides;
}

export default function PresentationView() {
    const {
        currentSlide, activeCategory, setActiveCategory,
        setTotalSlides, nextSlide, prevSlide,
        toggleFullScreen, isFullScreen,
    } = usePresentation();

    // Build slides fresh every render based on activeCategory
    const slides = buildSlides(activeCategory);
    const total = slides.length;

    // Keep context in sync
    useEffect(() => { setTotalSlides(total); }, [total, setTotalSlides]);

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
                            <span className="text-sm font-medium text-muted-foreground">Slide {currentSlide + 1} of {total}</span>
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
                            key={`${activeCategory}-${currentSlide}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="w-full"
                        >
                            {slides[currentSlide]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            <div className={cn(
                "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-4 py-2 rounded-2xl glass border border-white/10 shadow-2xl transition-opacity duration-300",
                isFullScreen ? "opacity-30 hover:opacity-100" : "opacity-100"
            )}>
                <button onClick={prevSlide} disabled={currentSlide === 0} className="p-2 disabled:opacity-30 hover:bg-white/10 rounded-xl transition-colors">
                    <ChevronLeft size={24} />
                </button>
                <div className="flex items-center gap-2 px-2">
                    {Array.from({ length: total }).map((_, i) => (
                        <div key={i} className={cn("h-1.5 rounded-full transition-all duration-300", currentSlide === i ? "w-8 bg-primary" : "w-1.5 bg-slate-600")} />
                    ))}
                </div>
                <button onClick={nextSlide} disabled={currentSlide === total - 1} className="p-2 disabled:opacity-30 hover:bg-white/10 rounded-xl transition-colors">
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
