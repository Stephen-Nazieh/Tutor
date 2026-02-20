# PWA/SPA Implementation Plan - App Shell Architecture

## Executive Summary
Transform TutorMe into a true PWA with App Shell architecture for instant loading and native-app feel.

**Current Status:** Partially implemented - needs App Shell caching and sidebar install button.

---

## 🎯 Requirements Checklist

| # | Requirement | Current Status | Action Needed |
|---|-------------|----------------|---------------|
| 1 | SPA with Next.js | ✅ Complete | None |
| 2 | manifest.json | ⚠️ Partial | Add missing icons |
| 3 | Service Worker | ❌ Basic | Implement App Shell caching |
| 4 | Custom Install Hook | ⚠️ Wrong UX | Move to sidebar |
| 5 | HTTPS | ✅ Deployment | Configure server |

---

## 📱 App Shell Architecture

### What is App Shell?
The minimal HTML, CSS, and JavaScript required to power the user interface. It loads **instantly** (0.1s) while content loads dynamically.

```
┌─────────────────────────────────────────┐
│  [App Shell - Loads Instantly]          │
│  ┌─────────────────────────────────────┐│
│  │  Header/Nav    [👤 Profile]         ││
│  ├─────────────────────────────────────┤│
│  │  Sidebar  │                         ││
│  │  [Logo]   │                         ││
│  │  [Home]   │    [Dynamic Content]    ││
│  │  [Chat]   │    (Video, AI, etc)     ││
│  │  [Live]   │    Fetches from network ││
│  │  [💰]     │                         ││
│  │  [⚙️]     │                         ││
│  │  [⬇️]     │                         ││  ← Install button
│  └───────────┴─────────────────────────┘│
└─────────────────────────────────────────┘
        ↓ CACHED by Service Worker
        ↓ Loads in 0.1s even on 2G
```

### Shell Components to Cache:
1. **Header** - Logo, profile dropdown
2. **Sidebar** - Navigation, install button
3. **Layout Framework** - Tab containers, responsive grid
4. **Core CSS** - Tailwind styles, component library
5. **JavaScript Bundle** - React, Next.js runtime

### Dynamic Content (Network):
1. **Video streams** - Daily.co WebRTC
2. **AI responses** - Streaming from API
3. **Student data** - Real-time updates
4. **Chat messages** - WebSocket/Socket.io

---

## 🔧 Implementation Phases

### Phase 1: PWA Assets (1-2 hours)

#### 1.1 Generate Icons
Create icon files in `public/icons/`:
- `icon-72.png` (72x72)
- `icon-96.png` (96x96) 
- `icon-128.png` (128x128)
- `icon-144.png` (144x144)
- `icon-152.png` (152x152)
- `icon-192.png` (192x192) - Already referenced
- `icon-384.png` (384x384)
- `icon-512.png` (512x512) - Already referenced
- `favicon.ico` - Multi-resolution

**Tools:**
- Use `pwa-asset-generator` npm package
- Or create manually in Figma/Photoshop

```bash
npx pwa-asset-generator logo.svg public/icons --padding 10%
```

#### 1.2 Update manifest.json
```json
{
  "name": "TutorMe - AI Tutoring Platform",
  "short_name": "TutorMe",
  "description": "AI-human hybrid tutoring platform with live classes",
  "start_url": "/tutor/dashboard?utm_source=pwa",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#4f46e5",
  "orientation": "any",
  "scope": "/",
  "icons": [
    { "src": "/icons/icon-72.png", "sizes": "72x72", "type": "image/png" },
    { "src": "/icons/icon-96.png", "sizes": "96x96", "type": "image/png" },
    { "src": "/icons/icon-128.png", "sizes": "128x128", "type": "image/png" },
    { "src": "/icons/icon-144.png", "sizes": "144x144", "type": "image/png" },
    { "src": "/icons/icon-152.png", "sizes": "152x152", "type": "image/png" },
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "/icons/icon-384.png", "sizes": "384x384", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ],
  "categories": ["education", "productivity"],
  "screenshots": [
    { "src": "/screenshots/dashboard.png", "sizes": "1280x720", "type": "image/png", "form_factor": "wide" },
    { "src": "/screenshots/mobile.png", "sizes": "750x1334", "type": "image/png", "form_factor": "narrow" }
  ],
  "shortcuts": [
    { "name": "Live Class", "short_name": "Live", "description": "Start a live class", "url": "/tutor/live-class", "icons": [{ "src": "/icons/live.png", "sizes": "96x96" }] },
    { "name": "Calendar", "short_name": "Schedule", "description": "View schedule", "url": "/tutor/dashboard?tab=calendar", "icons": [{ "src": "/icons/calendar.png", "sizes": "96x96" }] }
  ]
}
```

---

### Phase 2: App Shell Service Worker (4-6 hours)

#### 2.1 Create Advanced Service Worker
Replace `public/sw.js` with Workbox-based implementation:

```typescript
// src/sw.ts - TypeScript service worker
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'tutorme-app-shell-v1';

// App Shell files to cache
const APP_SHELL_URLS = [
  '/',
  '/tutor/dashboard',
  '/tutor/command-center',
  '/manifest.json',
  // Next.js build outputs (these will be hashed)
  '/_next/static/css/*.css',
  '/_next/static/chunks/main*.js',
  '/_next/static/chunks/webpack*.js',
  '/_next/static/chunks/framework*.js',
  '/_next/static/chunks/pages/_app*.js',
];

// Install: Cache App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching App Shell');
      return cache.addAll(APP_SHELL_URLS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: App Shell strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // 1. Navigation requests (App Shell)
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request).then((response) => {
        // Return cached shell or fetch new
        return response || fetch(request).then((fetchResponse) => {
          // Cache the new version
          const responseClone = fetchResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return fetchResponse;
        });
      }).catch(() => {
        // Fallback to cached homepage if offline
        return caches.match('/');
      })
    );
    return;
  }

  // 2. Static assets (CSS, JS, fonts) - Cache First
  if (url.pathname.match(/\.(js|css|woff2?)$/)) {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request).then((fetchResponse) => {
          const responseClone = fetchResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return fetchResponse;
        });
      })
    );
    return;
  }

  // 3. API calls - Network First with timeout
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match(request);
      })
    );
    return;
  }

  // 4. Images - Stale While Revalidate
  if (url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) {
    event.respondWith(
      caches.match(request).then((response) => {
        const fetchPromise = fetch(request).then((fetchResponse) => {
          const responseClone = fetchResponse.clone();
          caches.open(CACHE_NAME + '-images').then((cache) => {
            cache.put(request, responseClone);
          });
          return fetchResponse;
        });
        return response || fetchPromise;
      })
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncPendingMessages());
  }
});

async function syncPendingMessages() {
  // Sync pending chat messages when back online
  const pending = await getPendingMessagesFromIndexedDB();
  for (const msg of pending) {
    await fetch('/api/messages', { method: 'POST', body: JSON.stringify(msg) });
  }
}
```

#### 2.2 Build Configuration
Add to `next.config.mjs`:

```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  register: false, // We'll register manually
  skipWaiting: true,
  buildExcludes: [/middleware-manifest.json$/],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: { maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 }
      }
    },
    {
      urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'static-font-assets' }
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'static-image-assets' }
    }
  ]
});

module.exports = withPWA({
  // ... existing config
});
```

---

### Phase 3: Sidebar Install Button (2-3 hours)

#### 3.1 Create Install Button Component
```typescript
// src/components/sidebar-install-button.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Check, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<{ outcome: 'accepted' | 'dismissed' }>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function SidebarInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Listen for app installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    setIsInstalling(true);
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
    setIsInstalling(false);
  };

  // Don't show if installed or not installable
  if (isInstalled || (!deferredPrompt && !isInstalling)) {
    return null;
  }

  return (
    <div className="px-3 py-2">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "w-full justify-start gap-2 text-sm",
          "hover:bg-primary/10 hover:text-primary",
          "transition-all duration-200"
        )}
        onClick={handleInstall}
        disabled={isInstalling}
      >
        {isInstalling ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span>Installing...</span>
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            <span>Install App</span>
          </>
        )}
      </Button>
      <p className="text-xs text-muted-foreground mt-1 px-2">
        Add to home screen for offline access
      </p>
    </div>
  );
}
```

#### 3.2 Integrate into Sidebar
Add to `src/components/app-sidebar.tsx` or tutor layout:

```typescript
// In the sidebar navigation, near the bottom
<div className="mt-auto">
  <Separator className="my-2" />
  <SidebarInstallButton />
  <nav className="space-y-1">
    <Button variant="ghost" size="sm" className="w-full justify-start">
      <Settings className="h-4 w-4 mr-2" />
      Settings
    </Button>
  </nav>
</div>
```

---

### Phase 4: Layout Optimization (3-4 hours)

#### 4.1 Create App Shell Layout
```typescript
// src/app/tutor/layout.tsx - App Shell wrapper
export default function TutorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Part of App Shell (cached) */}
      <aside className="w-64 border-r bg-card flex flex-col">
        <SidebarHeader /> {/* Logo - cached */}
        <SidebarNavigation /> {/* Nav items - cached */}
        <div className="mt-auto">
          <SidebarInstallButton /> {/* Conditional */}
          <UserProfile /> {/* Cached */}
        </div>
      </aside>

      {/* Main Content - Dynamic */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header /> {/* Top nav - cached */}
        <div className="flex-1 overflow-auto">
          {children} {/* Dynamic content */}
        </div>
      </main>
    </div>
  );
}
```

#### 4.2 Loading States
```typescript
// src/components/shell-skeleton.tsx
export function ShellSkeleton() {
  return (
    <div className="flex h-screen">
      {/* Sidebar skeleton - matches exact dimensions */}
      <div className="w-64 bg-card border-r animate-pulse">
        <div className="h-16 border-b bg-muted" /> {/* Header */}
        <div className="p-4 space-y-2">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-10 bg-muted rounded" />
          ))}
        </div>
      </div>
      {/* Content area */}
      <div className="flex-1 p-8">
        <div className="h-8 w-64 bg-muted rounded mb-4" />
        <div className="h-96 bg-muted rounded" />
      </div>
    </div>
  );
}
```

---

### Phase 5: Testing & Validation (2-3 hours)

#### 5.1 Lighthouse Audit
Run in Chrome DevTools:
- Open Application tab → Service Workers
- Check "Update on reload" for development
- Run Lighthouse PWA audit
- Target: 100% PWA score

#### 5.2 Test Scenarios
| Scenario | Expected Result |
|----------|-----------------|
| First load | Shell loads instantly, content follows |
| Refresh | Shell from cache (0.1s), content updates |
| Offline | Shell works, shows offline indicator |
| Slow 3G | Shell immediate, content streams in |
| Install | Sidebar button triggers install prompt |

#### 5.3 DevTools Testing
```javascript
// In Chrome DevTools Console:

// Check service worker
navigator.serviceWorker.controller

// Check cache
const caches = await window.caches.keys();
console.log(caches);

// Simulate offline
navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
```

---

## 📁 Files to Create/Modify

### New Files:
```
public/icons/
├── icon-72.png
├── icon-96.png
├── icon-128.png
├── icon-144.png
├── icon-152.png
├── icon-192.png
├── icon-384.png
└── icon-512.png

src/components/
├── sidebar-install-button.tsx
├── shell-skeleton.tsx
└── offline-indicator.tsx

src/hooks/
├── use-pwa-install.ts
└── use-network-status.ts
```

### Modified Files:
```
public/manifest.json          # Update with full icon set
public/sw.js                  # Replace with App Shell SW
src/app/layout.tsx            # Add PWA meta tags
src/app/tutor/layout.tsx      # App Shell wrapper
next.config.mjs               # Add PWA configuration
```

---

## 🎨 UX Specifications

### Install Button States:
```
[Not Installable]  → Hidden
[Installable]      → Show "Install App" with download icon
[Installing]       → Spinner with "Installing..."
[Installed]        → Checkmark with "App Installed"
```

### Offline Indicator:
```
[Online]    → Hidden
[Offline]   → Top banner: "You're offline. Some features may be limited."
[Reconnect] → "Back online! Syncing changes..."
```

### Performance Targets:
| Metric | Target |
|--------|--------|
| First Paint | < 0.5s |
| App Shell Load | < 0.1s (cached) |
| Time to Interactive | < 2s |
| Lighthouse PWA Score | 100 |

---

## 🚀 Deployment Checklist

- [ ] Icons generated and in public/icons/
- [ ] manifest.json validated (https://manifest-validator.appspot.com/)
- [ ] Service Worker registers successfully
- [ ] HTTPS enabled on domain
- [ ] Install button appears in sidebar (Chrome/Android)
- [ ] App installs to home screen
- [ ] Offline mode works
- [ ] Lighthouse audit passes (90+ all categories)

---

## 📚 References

- [Workbox Documentation](https://developer.chrome.com/docs/workbox/)
- [App Shell Model](https://developers.google.com/web/fundamentals/architecture/app-shell)
- [PWA Install Criteria](https://web.dev/install-criteria/)
- [Next.js PWA Guide](https://nextjs.org/docs/app/building-your-application/configuring/progressive-web-apps)
