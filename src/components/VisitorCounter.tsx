'use client';

import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(() => {
    if (typeof window === 'undefined') return null;
    const localCountKey = 'local_visitor_count';
    const BASE_SEED = 2000;
    const localCountVal = parseInt(localStorage.getItem(localCountKey) || '0', 10);
    return BASE_SEED + localCountVal;
  });
  useEffect(() => {
    const key = 'akash_satpute_portfolio_visitors_2026';
    const storageKey = 'has_visited_site';
    const localCountKey = 'local_visitor_count';
    const BASE_SEED = 2000;

    const hasVisited = sessionStorage.getItem(storageKey);
    let localCountVal = parseInt(localStorage.getItem(localCountKey) || '0', 10);

    if (!hasVisited) {
      localCountVal += 1;
      localStorage.setItem(localCountKey, localCountVal.toString());
      sessionStorage.setItem(storageKey, 'true');
    }

    // Fetch from internal Next.js native API endpoint with zero CORS or ad-blocker blocking
    const endpoint = hasVisited ? '/api/visitor' : '/api/visitor?hit=true';

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    fetch(endpoint, { signal: controller.signal })
      .then((res) => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then((data) => {
        if (data && typeof data.value === 'number') {
          setCount(data.value);
        }
      })
      .catch(() => {
        // Silent local fallback if offline or network fails
        setCount(BASE_SEED + localCountVal);
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
