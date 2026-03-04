'use client';

import React, { useMemo } from 'react';
import { PresentationProvider, StudentCategory } from '@/components/PresentationContext';
import PresentationView from '@/components/PresentationView';
import { SlideIntro, SlideLemonadeStory } from '@/components/slides/SlideFoundations';
import { SlideFromWordsToEquation } from '@/components/slides/SlideModeling';
import { SlidePolynomialRecipe } from '@/components/slides/SlidePolynomialIntuition';
import { SlidePowerOfX } from '@/components/slides/SlidePowers';
import { SlideDifferentiation, SlideStability } from '@/components/slides/SlideCalculus';
import { SlideSolvingStepByStep, SlideComparison } from '@/components/slides/SlideAnalysis';
import { SlideErrorAnalysis, SlideConclusion } from '@/components/slides/SlideOutcome';
import { QuizSlide } from '@/components/slides/QuizSlide';

function buildSlides(category: StudentCategory): React.ReactNode[] {
  const prefix = category;

  const common = [
    <SlideIntro key={`${prefix}-intro`} />,
    <SlideLemonadeStory key={`${prefix}-lemonade`} />,
    <SlideFromWordsToEquation key={`${prefix}-modeling`} />,
    <SlidePolynomialRecipe key={`${prefix}-polynomial`} />,
  ];

  const intermediate = [
    <SlidePowerOfX key={`${prefix}-powers`} />,
    <SlideDifferentiation key={`${prefix}-diff`} />,
    <SlideSolvingStepByStep key={`${prefix}-solve`} />,
  ];

  const advanced = [
    <SlideErrorAnalysis key={`${prefix}-error`} />,
    <SlideComparison key={`${prefix}-compare`} />,
    <SlideStability key={`${prefix}-stability`} />,
  ];

  const quiz = <QuizSlide key={`${prefix}-quiz`} category={category} />;
  const conclusion = <SlideConclusion key={`${prefix}-conclusion`} />;

  switch (category) {
    case 'school':
      return [...common, quiz, conclusion];
    case 'ug':
      return [...common, ...intermediate, quiz, conclusion];
    case 'pg':
    case 'research':
      return [...common, ...intermediate, ...advanced, quiz, conclusion];
  }
}

const SLIDE_COUNTS: Record<StudentCategory, number> = {
  school: buildSlides('school').length,
  ug: buildSlides('ug').length,
  pg: buildSlides('pg').length,
  research: buildSlides('research').length,
};

export default function Home() {
  return (
    <PresentationProvider slideCounts={SLIDE_COUNTS}>
      <SlidesRenderer />
    </PresentationProvider>
  );
}

function SlidesRenderer() {
  const slidesByCategory = useMemo(() => ({
    school: buildSlides('school'),
    ug: buildSlides('ug'),
    pg: buildSlides('pg'),
    research: buildSlides('research'),
  }), []);

  return <PresentationView slidesByCategory={slidesByCategory} />;
}
