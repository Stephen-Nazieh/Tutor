# Code Review: Course Builder → Course Details Flow (Potential Break Points)

Review focused on the tutor course flow: Course Builder "Next" button → Course Details page, and the schedule/settings sections we've touched.

---

## 1. **Course Details Page** (`src/app/[locale]/tutor/courses/[id]/page.tsx`)

### Fixed in this pass

- **Missing `id` (React/route params)**  
  When the page mounts before route params are ready, `id` can be `undefined`. That led to:
  - `Link href={/tutor/courses/${id}/builder}` → `/tutor/courses/undefined/builder`
  - `fetch(/api/tutor/courses/${id})` → 404 and confusing state  
  **Fix:** Guard with `if (!id)` after all hooks and return a loading UI; added `if (!id) return` at the start of `loadCourse` so no request is made when `id` is missing.

- **`formatTime` / `formatTimeRange`**  
  Malformed or missing `startTime` (e.g. no `":"`, or undefined) could cause `NaN` or runtime errors.  
  **Fix:** Type checks and fallbacks: return `"–"` for invalid input; use `(parts[1] ?? 0)` and `Number.isNaN` guards; same for `durationMinutes`.

- **Schedule summary reducers**  
  `scheduleSummary.reduce` assumed every slot had `durationMinutes` and `dayOfWeek`.  
  **Fix:** Use `(slot.durationMinutes ?? 0)` and `(slot?.durationMinutes ?? 0)` in cost/total-duration; in `scheduleByDay`, skip slots without `dayOfWeek` and use `slot?.dayOfWeek`.

- **`timezoneLabel`**  
  `Intl.DateTimeFormat().resolvedOptions().timeZone` can throw in some environments.  
  **Fix:** Wrapped in try/catch with fallback `'Local time'`.

### Other notes (no change)

- **Hooks order:** All hooks run unconditionally at the top; the only early return is after hooks (when `!id`), so React’s rules of hooks are satisfied. No conditional hooks.
- **`useCallback` / `useEffect`:** `generateScheduleSummary` and the schedule-sync `useEffect` have consistent dependency arrays; no obvious stale-closure or infinite-loop issues.
- **`course` null:** Handlers that use `course` already guard with `if (!course) return`. The main UI uses state derived from `course` (e.g. `courseName`, `price`), which are updated in an effect when `course` is set, so initial null is safe.

---

## 2. **Course Builder Content** (`src/app/[locale]/tutor/courses/components/CourseBuilderContent.tsx`)

- **`courseId` null:** The "Next" button is already guarded: if `courseId` is falsy, it shows a toast instead of navigating, so we never navigate to `/tutor/courses/undefined`.
- **`loadCourse`:** Only runs when `courseId` is truthy (`if (!courseId) return`), so no request to `undefined` from this component.

---

## 3. **Remaining risks / follow-ups**

- **React error #310 (minified):** In production the crash was reported as a generic React hook error. The fixes above remove the main suspects (undefined `id`, bad schedule data, fragile formatters). If the error persists after deploy, reproducing in **development** (`npm run dev`) will show the exact component and line.
- **`scheduleWeekStart` / `weekDates`:** Derived from `scheduleWeekOffset` and `new Date()`. If `scheduleWeekOffset` were ever non-numeric it could produce invalid dates; currently it’s always set from `useState(0)` or numeric updates, so low risk.
- **API 404s:** `/api/analytics/web-vitals` and `/forgot-password` 404s are unrelated to this flow; they don’t cause the course-details crash but could be fixed or stubbed to reduce console noise.
- **Service worker:** `Request method 'PUT' is unsupported` in Cache API is a separate issue (e.g. don’t cache non-GET requests); not in the critical path for the Course Builder → Details flow.

---

## Summary

- **Course details page:** Defensive handling for missing `id`, invalid time strings, and incomplete schedule slots; `timezoneLabel` safe against `Intl` errors.
- **Course Builder:** "Next" already guarded for missing `courseId`.
- **Recommendation:** Deploy these changes and retest the "Next" flow; if the client error persists, capture the **unminified** error and stack from `npm run dev` to fix the exact call site.
