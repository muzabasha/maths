'use client';

import React from 'react';
import { PresentationProvider } from '@/components/PresentationContext';
import PresentationView from '@/components/PresentationView';
import { SlideIntro, SlideLemonadeStory } from '@/components/slides/SlideFoundations';
import { SlideFromWordsToEquation } from '@/components/slides/SlideModeling';
import { SlidePolynomialRecipe } from '@/components/slides/SlidePolynomialIntuition';
import { SlidePowerOfX } from '@/components/slides/SlidePowers';
import { SlideDifferentiation, SlideStability } from '@/components/slides/SlideCalculus';
import { SlideSolvingStepByStep, SlideComparison } from '@/components/slides/SlideAnalysis';
import { SlideErrorAnalysis, SlideConclusion } from '@/components/slides/SlideOutcome';
import { QuizSlide } from '@/components/slides/QuizSlide';

const SLIDES = [
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
  <QuizSlide key="quiz" />,
  <SlideConclusion key="conclusion" />,
];

export default function Home() {
  return (
    <PresentationProvider totalSlides={SLIDES.length}>
      <PresentationView slides={SLIDES} />
    </PresentationProvider>
  );
}
