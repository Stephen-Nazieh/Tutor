'use client';

import { useEffect, useState } from 'react';
import { useReportWebVitals } from 'next/web-vitals';

export function PerformanceProviders({ children }: { children: React.ReactNode }) {
  // Prevent hydration mismatch - only report after hydration
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useReportWebVitals((metric: Record<string, unknown>) => {
    // Only report after hydration to avoid mismatches
    if (!isHydrated) return;
    
    const body = JSON.stringify(metric);
    const url = '/api/analytics/web-vitals';
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
    } else {
      fetch(url, { body, method: 'POST', keepalive: true }).catch(() => {
        // Silently fail - analytics should not break the app
      });
    }
  });

  useEffect(() => {
    if (!isHydrated) return;
    
    let lcpObserver: PerformanceObserver | undefined;
    try {
      lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (process.env.NODE_ENV === 'development') {
          entries.forEach((entry) => console.log('[LCP]', entry));
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      // LCP not supported
    }

    return () => {
      lcpObserver?.disconnect();
    };
  }, [isHydrated]);

  return <>{children}</>;
}
