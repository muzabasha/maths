'use client';

import React from 'react';
import Slide from '@/components/Slide';
import QuizComponent from '@/components/Quiz';
import { StudentCategory } from '@/components/PresentationContext';

interface QuizSlideProps {
    category: StudentCategory;
}

export function QuizSlide({ category }: QuizSlideProps) {
    const titles: Record<StudentCategory, string> = {
        school: 'The Knowledge Challenge 🎮',
        ug: 'Test Your Understanding 🎯',
        pg: 'Advanced Concepts Quiz 🧠',
        research: 'Expert Level Challenge 🔬'
    };

    const subtitles: Record<StudentCategory, string> = {
        school: 'Test your skills before the final reward!',
        ug: 'Apply what you\'ve learned!',
        pg: 'Challenge your advanced knowledge!',
        research: 'Demonstrate your expertise!'
    };

    return (
        <Slide
            title={titles[category]}
            subtitle={subtitles[category]}
        >
            <div className="py-8">
                <QuizComponent category={category} />
            </div>
        </Slide>
    );
}
