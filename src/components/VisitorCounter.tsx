'use client';

import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const key = 'akashportfolio_satpute_unique_visits_counter';
    const storageKey = 'akashportfolio_visited_session';
    const localCountKey = 'akashportfolio_local_visitor_count';
    
    // Base visitor count seed so it starts at a realistic number
    const BASE_SEED = 500;

    const hasVisited = sessionStorage.getItem(storageKey);
    let localCountVal = parseInt(localStorage.getItem(localCountKey) || '0', 10);

    if (!hasVisited) {
      localCountVal += 1;
      localStorage.setItem(localCountKey, localCountVal.toString());
      sessionStorage.setItem(storageKey, 'true');
    }

    // Set fallback count first so UI has something to show immediately
    setCount(BASE_SEED + localCountVal);

    // Try to fetch from the free CountAPI
    const endpoint = hasVisited
      ? `https://countapi.mileshilliard.com/api/v1/get/${key}`
      : `https://countapi.mileshilliard.com/api/v1/hit/${key}`;

    // Create a controller to abort the fetch if it takes too long (timeout)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    fetch(endpoint, { signal: controller.signal })
      .then((res) => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then((data) => {
        if (data && typeof data.value === 'number') {
          // If CountAPI is working, use its value + seed (ensuring it's global and increments)
          setCount(BASE_SEED + data.value);
        }
      })
      .catch((err) => {
        // Fallback is already set, so we can ignore this or log it in dev
        console.warn('VisitorCounter API failed or timed out, using local fallback:', err);
      });

    return () => clearTimeout(timeoutId);
  }, []);

  if (count === null) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-1.5 mb-4">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.06)] backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.12)]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] md:text-xs text-muted/80 tracking-wider uppercase font-mono flex items-center gap-1.5 select-none">
          <Users className="w-3.5 h-3.5 text-muted/60" />
          Visitor Count: <span className="text-white font-bold font-mono text-sm tracking-widest">{count.toLocaleString()}</span>
        </span>
      </div>
    </div>
  );
}
