'use client';

import React from 'react';
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

// School Students - Basic concepts
const SCHOOL_SLIDES = [
  <SlideIntro key="intro" />,
  <SlideLemonadeStory key="lemonade" />,
  <SlideFromWordsToEquation key="modeling" />,
  <SlidePolynomialRecipe key="polynomial" />,
  <QuizSlide key="quiz" category="school" />,
  <SlideConclusion key="conclusion" />,
];

// UG Students - Intermediate concepts
const UG_SLIDES = [
  <SlideIntro key="intro" />,
  <SlideLemonadeStory key="lemonade" />,
  <SlideFromWordsToEquation key="modeling" />,
  <SlidePolynomialRecipe key="polynomial" />,
  <SlidePowerOfX key="powers" />,
  <SlideDifferentiation key="diff" />,
  <SlideSolvingStepByStep key="solve" />,
  <QuizSlide key="quiz" category="ug" />,
  <SlideConclusion key="conclusion" />,
];

// PG Students - Advanced concepts
const PG_SLIDES = [
  <SlideIntro key="intro" />,
  <SlideLemonadeStory key="lemonade" />,
  <SlideFromWordsToEquation key="modeling" />,
  <SlidePolynomialRecipe key="polynomial" />,
  <SlidePowerOfX key="powers" />,
  <SlideDifferentiation key="diff" />,
  <SlideSolvingStepByStep key="solve" />,
  <SlideErrorAnalysis key="error" />,
  <SlideComparison key="compare" />,
  <SlideStability key="stability" />,
  <QuizSlide key="quiz" category="pg" />,
  <SlideConclusion key="conclusion" />,
];

// Research Scholars - All concepts including advanced analysis
const RESEARCH_SLIDES = [
  <SlideIntro key="intro" />,
  <SlideLemonadeStory key="lemonade" />,
  <SlideFromWordsToEquation key="modeling" />,
  <SlidePolynomialRecipe key="polynomial" />,
  <SlidePowerOfX key="powers" />,
  <SlideDifferentiation key="diff" />,
  <SlideSolvingStepByStep key="solve" />,
  <SlideErrorAnalysis key="error" />,
  <SlideComparison key="compare" />,
  <SlideStability key="stability" />,
  <QuizSlide key="quiz" category="research" />,
  <SlideConclusion key="conclusion" />,
];

const SLIDES_BY_CATEGORY: Record<StudentCategory, React.ReactNode[]> = {
  school: SCHOOL_SLIDES,
  ug: UG_SLIDES,
  pg: PG_SLIDES,
  research: RESEARCH_SLIDES,
};

const SLIDE_COUNTS: Record<StudentCategory, number> = {
  school: SCHOOL_SLIDES.length,
  ug: UG_SLIDES.length,
  pg: PG_SLIDES.length,
  research: RESEARCH_SLIDES.length,
};

export default function Home() {
  return (
    <PresentationProvider slideCounts={SLIDE_COUNTS}>
      <PresentationView slidesByCategory={SLIDES_BY_CATEGORY} />
    </PresentationProvider>
  );
}
