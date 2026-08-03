'use client';

import React from 'react';

interface DoorTransitionWrapperProps {
  children: React.ReactNode;
}

// Bypassed for maximum site load performance and zero opening video lag
export default function DoorTransitionWrapper({ children }: DoorTransitionWrapperProps) {
  return <>{children}</>;
}
