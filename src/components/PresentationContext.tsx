'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PresentationContextType {
    currentSlide: number;
    totalSlides: number;
    isFullScreen: boolean;
    nextSlide: () => void;
    prevSlide: () => void;
    goToSlide: (index: number) => void;
    toggleFullScreen: () => void;
    revealStep: number;
    nextStep: () => void;
}

const PresentationContext = createContext<PresentationContextType | undefined>(undefined);

export function PresentationProvider({ children, totalSlides }: { children: ReactNode; totalSlides: number }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [revealStep, setRevealStep] = useState(0);

    const nextSlide = () => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(prev => prev + 1);
            setRevealStep(0);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
            setRevealStep(0);
        }
    };

    const goToSlide = (index: number) => {
        if (index >= 0 && index < totalSlides) {
            setCurrentSlide(index);
            setRevealStep(0);
        }
    };

    const nextStep = () => {
        setRevealStep(prev => prev + 1);
    };

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
            setIsFullScreen(true);
        } else {
            document.exitFullscreen();
            setIsFullScreen(false);
        }
    };

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
    }, [currentSlide, totalSlides]);

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
