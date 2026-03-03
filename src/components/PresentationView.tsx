'use client';

import React from 'react';
import { usePresentation } from './PresentationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize, Minimize, ChevronLeft, ChevronRight, Home, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PresentationViewProps {
    slides: React.ReactNode[];
}

export default function PresentationView({ slides }: PresentationViewProps) {
    const { currentSlide, totalSlides, nextSlide, prevSlide, toggleFullScreen, isFullScreen } = usePresentation();

    return (
        <div className={cn(
            "relative min-h-screen w-full flex flex-col transition-colors duration-500",
            isFullScreen ? "bg-slate-950" : "bg-slate-50 dark:bg-slate-950"
        )}>
            {/* Header / Controls */}
            {!isFullScreen && (
                <header className="fixed top-0 left-0 right-0 z-50 h-16 glass flex items-center justify-between px-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
                            M
                        </div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                            Math Explorer
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-muted-foreground">
                            Slide {currentSlide + 1} of {totalSlides}
                        </span>
                        <button
                            onClick={toggleFullScreen}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            title="Full Screen (F)"
                        >
                            <Maximize size={20} />
                        </button>
                    </div>
                </header>
            )}

            {/* Main Slide Area */}
            <main className={cn(
                "flex-1 flex flex-col items-center justify-center overflow-hidden w-full",
                !isFullScreen && "pt-16 pb-20"
            )}>
                <div className="w-full max-w-7xl px-8 h-full flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
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

            {/* Persistent Controls for Full Screen */}
            <div className={cn(
                "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-4 py-2 rounded-2xl glass border border-white/10 shadow-2xl transition-opacity duration-300",
                isFullScreen ? "opacity-30 hover:opacity-100" : "opacity-100"
            )}>
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="p-2 disabled:opacity-30 hover:bg-white/10 rounded-xl transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>

                <div className="flex items-center gap-2 px-2">
                    {Array.from({ length: totalSlides }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-300",
                                currentSlide === i ? "w-8 bg-primary" : "w-1.5 bg-slate-600"
                            )}
                        />
                    ))}
                </div>

                <button
                    onClick={nextSlide}
                    disabled={currentSlide === totalSlides - 1}
                    className="p-2 disabled:opacity-30 hover:bg-white/10 rounded-xl transition-colors"
                >
                    <ChevronRight size={24} />
                </button>

                <div className="w-[1px] h-6 bg-white/10 mx-2" />

                <button
                    onClick={toggleFullScreen}
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                    {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
            </div>
        </div>
    );
}
