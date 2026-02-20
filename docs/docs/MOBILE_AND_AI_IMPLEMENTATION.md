# FinalThings 1.1 & 1.2 Implementation Record

This document records the implementation of **section 1.1 (Mobile Experience)** and **section 1.2 (AI improvements – code execution sandbox)** from FinalThings.md.

---

## 1.1 Mobile Experience

### 1.1.1 Responsive design audit

- **Layout and viewport**
  - **`src/app/layout.tsx`**: Added `viewport` export (Next.js) with `width: device-width`, `initialScale: 1`, `maximumScale: 5`, `userScalable: true`, and `themeColor: #0f172a`.
  - **`src/app/globals.css`**: `html { min-width: 320px; -webkit-text-size-adjust: 100%; }`, `body { touch-action: manipulation; }`.
  - **`tailwind.config.ts`**: Added `screens.xs: "320px"`, `minWidth["screen-xs"]: "320px"`, `minHeight.touch: "44px"` for 320px+ and touch-target utilities.
- **Touch-friendly controls (min 44px)**
  - **`src/components/ui/button.tsx`**: New size variant `icon-touch`: `min-h-[44px] min-w-[44px] h-11 w-11` on mobile, `h-10 w-10` on `sm+`.
  - **`src/app/globals.css`**: Utility `.touch-target { min-width: 2.75rem; min-height: 2.75rem; }` for custom touch targets.
  - **Video player**: Play/pause, skip, volume, fullscreen, and playback-rate buttons use `size="icon-touch"` on mobile; progress and speed menu items use `min-h-[44px]` where appropriate. Seek range uses a larger thumb on mobile and `touch-manipulation`.

### 1.1.2 PWA support

- **Web app manifest**
  - **`public/manifest.json`**: Added with `name`, `short_name`, `description`, `start_url`, `display: standalone`, `theme_color`, `background_color`, `orientation: portrait-primary`, and `icons` pointing to `/icons/icon-192.png` and `/icons/icon-512.png`.
  - **`src/app/layout.tsx`**: `metadata.manifest = "/manifest.json"`, `metadata.appleWebApp = { capable: true, title: "TutorMe" }`.
- **Service worker and offline**
  - **`public/sw.js`**: Install caches `["/", "/manifest.json"]` (install uses `/` and fallback on fetch); activate cleans old caches; fetch uses network-first for navigate, falls back to cache when offline.
  - **`src/components/pwa-install-prompt.tsx`**: Client component that registers `/sw.js` on mount, listens for `beforeinstallprompt`, and shows a dismissable “Add to home screen” prompt (stores dismiss in `localStorage`). Buttons use touch-target sizing.
- **Icons**
  - Manifest references `/icons/icon-192.png` and `/icons/icon-512.png`. Add 192×192 and 512×512 PNGs under `public/icons/` for full PWA/add-to-home support.

### 1.1.3 Mobile-optimized video

- **`src/components/video-player/index.tsx`**
  - **Portrait / narrow layout**: Video wrapper uses `aspect-video`, `max-h-[70vh]` on small screens, and `object-contain` so portrait/narrow viewports are supported without clipping.
  - **Bottom-sheet controls**: On viewport `max-width: 640px`, controls are shown in a bottom-sheet style (rounded top, `pb-safe`). Visibility toggles on tap (no hover); opacity is 0 by default and 1 when `showControls` is true. On desktop, controls remain hover-to-show.
  - **Swipe gestures**: Touch start/end on the video: horizontal swipe >50px seeks forward/backward 10s (right = +10s, left = -10s). Tap toggles controls on mobile.
  - **Battery-aware**: When Battery API is available and `level < 0.2`, a small banner is shown while playing: “省电：可降低播放速度或亮度以节省电量”.
  - **Other**: `playsInline` set on `<video>` for iOS; volume slider hidden on small mobile to save space; all control buttons use touch-friendly sizing on mobile.

---

## 1.2 AI improvements – Code execution sandbox

### 1.2.1 Docker-based code runner

- **`src/lib/code-runner/sandbox.ts`**
  - Runs user code in Docker containers: `python:3.11-slim` for Python, `node:20-slim` for JavaScript.
  - Options: `--rm`, `-i` (stdin), `--network=none`, `--memory=128m`, `--cpus=0.5`, `--read-only`, `--security-opt=no-new-privileges`.
  - Python: `python -c "import sys; exec(sys.stdin.read())"` with code on stdin.
  - JavaScript: `node -e "..."` reading script from `/dev/stdin` and `eval`-ing (stdin piped from host).
  - Limits: 16KB max code length; 15s execution timeout (SIGKILL); stdout/stderr truncated to 32KB each.
  - Returns `{ stdout, stderr, exitCode, timedOut, error? }`.

### 1.2.2 API and security

- **`src/app/api/code/run/route.ts`**
  - **POST /api/code/run**: Body `{ language: "python" | "javascript", code: string }` (Zod-validated, max 16KB).
  - Requires CSRF for POST; rate limit 30 requests per client per window (via existing rate limiter).
  - Responds with `{ stdout, stderr, exitCode, timedOut, error? }` or 400/429/500 with error message.

### 1.2.3 How to run and verify

1. **Docker**
   - Docker must be installed and the daemon running on the host that runs the Next.js server.
   - First run may pull images: `python:3.11-slim`, `node:20-slim`.

2. **Calling the API**
   - From the app, send a POST with valid CSRF token and JSON body, e.g.:
     - `{ "language": "python", "code": "print(1+1)" }` → expect `stdout: "2\n"`, `exitCode: 0`.
     - `{ "language": "javascript", "code": "console.log(1+1)" }` → expect `stdout: "2\n"`, `exitCode: 0`.
   - If Docker is unavailable or the run fails, the route returns 500 or a result with `error` / `timedOut` set.

3. **Optional UI**
   - No dedicated “code run” UI was added; the sandbox is intended for use by the AI tutor or future code-exercise features. Integrate by calling `POST /api/code/run` with the chosen language and code string and displaying `stdout`/`stderr`/`exitCode`/`timedOut`/`error`.

---

## Files changed/added

| Path | Change |
|------|--------|
| `src/app/layout.tsx` | Viewport, manifest, appleWebApp, PWAInstallPrompt |
| `src/app/globals.css` | 320px min width, touch-action, .touch-target |
| `tailwind.config.ts` | xs screen, minWidth screen-xs, minHeight touch |
| `src/components/ui/button.tsx` | size `icon-touch` |
| `src/components/pwa-install-prompt.tsx` | **New** – SW registration, install prompt |
| `public/manifest.json` | **New** – PWA manifest |
| `public/sw.js` | **New** – Service worker (offline cache) |
| `src/components/video-player/index.tsx` | Mobile controls, portrait, swipe, battery hint |
| `src/lib/code-runner/sandbox.ts` | **New** – Docker sandbox runner |
| `src/app/api/code/run/route.ts` | **New** – POST /api/code/run |

---

## Quick verification

- **Mobile**: Resize to 320px width; confirm no horizontal scroll, buttons ≥44px, video controls tap-to-show and swipe seek.
- **PWA**: Open site over HTTPS (or localhost); in DevTools Application, check Manifest and Service Worker; optionally add icons and test “Add to home screen”.
- **Sandbox**: `curl -X POST http://localhost:3000/api/code/run -H "Content-Type: application/json" -d '{"language":"python","code":"print(2+2)"}'` (include CSRF token from your app if required by middleware).
