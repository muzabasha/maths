'use client';

import { PresentationProvider } from '@/components/PresentationContext';
import PresentationView from '@/components/PresentationView';

export default function Home() {
  return (
    <PresentationProvider>
      <PresentationView />
    </PresentationProvider>
  );
}
