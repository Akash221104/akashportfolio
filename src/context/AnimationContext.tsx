'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AnimationContextType {
  isIntroActive: boolean;
  isDoorOpeningStarted: boolean;
  isIntroComplete: boolean;
  isLowEndDevice: boolean;
  skipIntro: () => void;
  startDoorOpening: () => void;
  completeIntro: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [isIntroActive, setIsIntroActive] = useState(false);
  const [isDoorOpeningStarted, setIsDoorOpeningStarted] = useState(true);
  const [isIntroComplete, setIsIntroComplete] = useState(true);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [isInitialized, setIsInitialized] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.body.style.overflow = '';
  }, []);

  const skipIntro = () => {
    setIsIntroActive(false);
    setIsDoorOpeningStarted(true);
    setIsIntroComplete(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('hasPlayedDoorTransition', 'true');
      document.body.style.overflow = '';
    }
  };

  const startDoorOpening = () => {
    setIsDoorOpeningStarted(true);
  };

  const completeIntro = () => {
    setIsIntroActive(false);
    setIsIntroComplete(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('hasPlayedDoorTransition', 'true');
      document.body.style.overflow = '';
    }
  };

  return (
    <AnimationContext.Provider
      value={{
        isIntroActive: isInitialized ? isIntroActive : false,
        isDoorOpeningStarted: isInitialized ? isDoorOpeningStarted : false,
        isIntroComplete: isInitialized ? isIntroComplete : false,
        isLowEndDevice,
        skipIntro,
        startDoorOpening,
        completeIntro,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}
