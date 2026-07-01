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
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [isDoorOpeningStarted, setIsDoorOpeningStarted] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Low-end device detection
    const detectLowEnd = (): boolean => {
      // Slow CPU cores
      const cores = navigator.hardwareConcurrency;
      if (cores && cores < 4) return true;

      // Low RAM (in GB)
      const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      if (memory && memory < 4) return true;

      // Save Data mode or 2g/3g connections
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
      if (conn) {
        if (conn.saveData) return true;
        const type = conn.effectiveType;
        if (type === '2g' || type === '3g') return true;
      }

      // WebGL check (failure to init WebGL suggests extremely weak GPU or software rendering)
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return true;
      } catch {
        return true;
      }

      return false;
    };

    const lowEnd = detectLowEnd();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLowEndDevice(lowEnd);

    // 2. Query/Session check
    const urlParams = new URLSearchParams(window.location.search);
    const isReplay = urlParams.get('replay') === 'true';
    if (isReplay) {
      sessionStorage.removeItem('hasPlayedDoorTransition');
    }

    const hasPlayed = sessionStorage.getItem('hasPlayedDoorTransition') === 'true';

    // If already played or it's a low-end device, bypass the intro animation entirely
    if (hasPlayed || lowEnd) {
      setIsIntroActive(false);
      setIsDoorOpeningStarted(true);
      setIsIntroComplete(true);
      document.body.style.overflow = '';
    } else {
      setIsIntroActive(true);
      setIsDoorOpeningStarted(false);
      setIsIntroComplete(false);
      document.body.style.overflow = 'hidden';
    }

    setIsInitialized(true);
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
