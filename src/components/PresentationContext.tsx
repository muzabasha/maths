'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type StudentCategory = 'school' | 'ug' | 'pg' | 'research';

interface PresentationContextType {
    currentSlide: number;
    totalSlides: number;
    isFullScreen: boolean;
    activeCategory: StudentCategory;
    setActiveCategory: (category: StudentCategory) => void;
    setTotalSlides: (count: number) => void;
    nextSlide: () => void;
    prevSlide: () => void;
    goToSlide: (index: number) => void;
    toggleFullScreen: () => void;
    revealStep: number;
    nextStep: () => void;
}

const PresentationContext = createContext<PresentationContextType | undefined>(undefined);

export function PresentationProvider({ children }: { children: ReactNode }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [revealStep, setRevealStep] = useState(0);
    const [activeCategory, setActiveCategoryState] = useState<StudentCategory>('school');

    const setActiveCategory = useCallback((category: StudentCategory) => {
        setActiveCategoryState(category);
        setCurrentSlide(0);
        setRevealStep(0);
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentSlide(prev => (prev < totalSlides - 1 ? prev + 1 : prev));
        setRevealStep(0);
    }, [totalSlides]);

    const prevSlide = useCallback(() => {
        setCurrentSlide(prev => (prev > 0 ? prev - 1 : prev));
        setRevealStep(0);
    }, []);

    const goToSlide = useCallback((index: number) => {
        if (index >= 0 && index < totalSlides) {
            setCurrentSlide(index);
            setRevealStep(0);
        }
    }, [totalSlides]);

    const nextStep = useCallback(() => {
        setRevealStep(prev => prev + 1);
    }, []);

    const toggleFullScreen = useCallback(() => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
            setIsFullScreen(true);
        } else {
            document.exitFullscreen();
            setIsFullScreen(false);
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === ' ') { e.preventDefault(); nextStep(); }
            if (e.key.toLowerCase() === 'f') toggleFullScreen();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide, nextStep, toggleFullScreen]);

    useEffect(() => {
        const handler = () => setIsFullScreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handler);
        return () => document.removeEventListener('fullscreenchange', handler);
    }, []);

    return (
        <PresentationContext.Provider value={{
            currentSlide, totalSlides, isFullScreen,
            activeCategory, setActiveCategory, setTotalSlides,
            nextSlide, prevSlide, goToSlide,
            toggleFullScreen, revealStep, nextStep
        }}>
            {children}
        </PresentationContext.Provider>
    );
}

export function usePresentation() {
    const context = useContext(PresentationContext);
    if (!context) throw new Error('usePresentation must be used within a PresentationProvider');
    return context;
}
