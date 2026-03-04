'use client';

import Slide from '@/components/Slide';
import QuizComponent from '@/components/Quiz';
import { usePresentation, StudentCategory } from '@/components/PresentationContext';

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

export function QuizSlide() {
    const { activeCategory } = usePresentation();

    return (
        <Slide
            title={titles[activeCategory]}
            subtitle={subtitles[activeCategory]}
        >
            <div className="py-8">
                <QuizComponent />
            </div>
        </Slide>
    );
}
