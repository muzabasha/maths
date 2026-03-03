'use client';

import React from 'react';
import Slide from '@/components/Slide';
import QuizComponent from '@/components/Quiz';

export function QuizSlide() {
    return (
        <Slide
            title="The Knowledge Challenge 🎮"
            subtitle="Test your skills before the final reward!"
        >
            <div className="py-8">
                <QuizComponent />
            </div>
        </Slide>
    );
}
