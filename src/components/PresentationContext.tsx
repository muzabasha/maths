'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type StudentCategory = 'school' | 'ug' | 'pg' | 'research';

interface PresentationContextType {
    currentSlide: number;
    totalSlides: number;
    isFullScreen: boolean;
    activeCategory: StudentCategory;
    setActiveCategory: (category: StudentCategory) => void;
    nextSlide: () => void;
    prevSlide: () => void;
    goToSlide: (index: number) => void;
    toggleFullScreen: () => void;
    revealStep: number;
    nextStep: () => void;
}

const PresentationContext = createContext<PresentationContextType | undefined>(undefined);

interface ProviderProps {
    children: ReactNode;
    slideCounts: Record<StudentCategory, number>;
}

export function PresentationProvider({ children, slideCounts }: ProviderProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [revealStep, setRevealStep] = useState(0);
    const [activeCategory, setActiveCategory] = useState<StudentCategory>('school');

    const totalSlides = slideCounts[activeCategory];

    const nextSlide = useCallback(() => {
        setCurrentSlide(prev => {
            if (prev < slideCounts[activeCategory] - 1) {
                setRevealStep(0);
                return prev + 1;
            }
            return prev;
        });
    }, [activeCategory, slideCounts]);

    const prevSlide = useCallback(() => {
        setCurrentSlide(prev => {
            if (prev > 0) {
                setRevealStep(0);
                return prev - 1;
            }
            return prev;
        });
    }, []);

    const goToSlide = useCallback((index: number) => {
        setCurrentSlide(prev => {
            if (index >= 0 && index < slideCounts[activeCategory]) {
                setRevealStep(0);
                return index;
            }
            return prev;
        });
    }, [activeCategory, slideCounts]);

    const nextStep = useCallback(() => {
        setRevealStep(prev => prev + 1);
    }, []);

    const handleSetActiveCategory = useCallback((category: StudentCategory) => {
        setActiveCategory(category);
        setCurrentSlide(0);
        setRevealStep(0);
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
            if (e.key === ' ') {
                e.preventDefault();
                nextStep();
            }
            if (e.key.toLowerCase() === 'f') toggleFullScreen();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide, nextStep, toggleFullScreen]);

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullScreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
    }, []);

    return (
        <PresentationContext.Provider value={{
            currentSlide,
            totalSlides,
            isFullScreen,
            activeCategory,
            setActiveCategory: handleSetActiveCategory,
            nextSlide,
            prevSlide,
            goToSlide,
            toggleFullScreen,
            revealStep,
            nextStep
        }}>
            {children}
        </PresentationContext.Provider>
    );
}

export function usePresentation() {
    const context = useContext(PresentationContext);
    if (context === undefined) {
        throw new Error('usePresentation must be used within a PresentationProvider');
    }
    return context;
}
