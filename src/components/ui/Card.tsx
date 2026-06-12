'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.ComponentPropsWithoutRef<typeof motion.div> {
  children: React.ReactNode;
  hoverGlow?: boolean;
  glass?: boolean;
  delay?: number;
}

export default function Card({
  children,
  className,
  hoverGlow = true,
  glass = false,
  delay = 0,
  ...props
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={
        hoverGlow
          ? {
              y: -4,
              borderColor: 'rgba(139, 92, 246, 0.3)',
              boxShadow: '0 10px 30px -10px rgba(59, 130, 246, 0.15)',
            }
          : undefined
      }
      className={twMerge(
        clsx(
          'rounded-xl border border-border bg-card p-6 transition-all duration-300',
          glass && 'glass',
          className
        )
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
