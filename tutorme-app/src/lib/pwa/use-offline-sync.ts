'use client';

import { useEffect, useCallback } from 'react';

/**
 * Hook to trigger background sync when the app comes back online.
 * Sends message to service worker to replay queued offline requests.
 */
export function useOfflineSync() {
  const triggerSync = useCallback(() => {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;

    navigator.serviceWorker.ready.then((registration) => {
      // Request background sync if supported
      if ('sync' in registration) {
        (registration as ServiceWorkerRegistration & { sync: { register: (tag: string) => Promise<void> } })
          .sync.register('background-sync')
          .catch(() => {
            // Fallback: post message to SW to replay requests
            navigator.serviceWorker.controller?.postMessage({
              type: 'OFFLINE_SYNC_REQUEST',
            });
          });
      } else {
        navigator.serviceWorker.controller?.postMessage({
          type: 'OFFLINE_SYNC_REQUEST',
        });
      }
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => {
      triggerSync();
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [triggerSync]);
}
