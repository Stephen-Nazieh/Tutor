'use client';

import { useEffect } from 'react';
import { useReportWebVitals } from 'next/web-vitals';

export function PerformanceProviders({ children }: { children: React.ReactNode }) {
  useReportWebVitals((metric: Record<string, unknown>) => {
    const body = JSON.stringify(metric);
    const url = '/api/analytics/web-vitals';
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
    } else {
      fetch(url, { body, method: 'POST', keepalive: true });
    }
  });

  useEffect(() => {
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
      lcpObserver?.disconnect(); // Fix: Disconnect on unmount
    };
  }, []);

  return <>{children}</>;
}
