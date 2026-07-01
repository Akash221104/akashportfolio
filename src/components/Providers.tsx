'use client';

import React from 'react';
import { AnimationProvider } from '@/context/AnimationContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AnimationProvider>
      {children}
    </AnimationProvider>
  );
}

