# Tutor Dashboard & Class Improvements

Suggested improvements for the Tutor dashboard and class flow, based on the current codebase.

---

## 1. Data & API Integration

### 1.1 Replace mock data with real APIs

- **Upcoming classes** – Dashboard currently uses `MOCK_CLASSES`. Fetch from `GET /api/class/rooms` (filter by current tutor; support “upcoming” or “active” if the API supports it). If the API only returns “active” rooms (last 4 hours), add an endpoint or query for *scheduled* upcoming sessions (e.g. `GET /api/tutor/upcoming-classes` or extend `LiveSession` query with `scheduledAt > now`).
- **Stats** – Replace hardcoded `stats` (totalClasses, totalStudents, upcomingClasses, earnings) with:
  - `GET /api/tutor/stats` or aggregate from existing APIs (e.g. count of `LiveSession`, enrolled students, upcoming sessions, earnings from payments).
- **Students needing attention** – Replace `MOCK_STUDENTS` with data from reports/analytics (e.g. `GET /api/reports/students-needing-attention` or derive from quiz/session APIs).
- **AI Insights** – Replace static text with `GET /api/analytics/insights` or similar so “3 students struggling with…” and “85% mastered…” are real.

### 1.2 Add “View All” classes page

- **UpcomingClassesCard** links to `/tutor/classes`, but that route does not exist. Add `app/tutor/classes/page.tsx` that:
  - Fetches the tutor’s classes (e.g. `GET /api/class/rooms?tutorId=<current>` or a dedicated tutor classes API).
  - Shows a list/table with: title, subject, date/time, duration, enrolled/max, status, actions (Enter Room, Copy link, Cancel if supported).
  - Handles empty state and loading/error.

---

## 2. UX & Behavior

### 2.1 Loading and error states

- **Dashboard** – Show skeletons or spinners while stats and upcoming classes load; show a clear error state and retry if fetch fails.
- **CreateClassDialog** – Already has “creating”; consider disabling form fields during submit and showing inline validation errors from the API (e.g. “Room creation failed”).

### 2.2 Empty states

- **Upcoming classes** – When there are no upcoming classes, show a short message and a primary “Create your first class” (or “Schedule a class”) CTA instead of an empty list.
- **Students needing attention** – When the list is empty, show “No students need attention right now” (or similar) so it’s clear the section is intentional.

### 2.3 After creating a class

- **Refresh list** – Pass `onClassCreated` from the dashboard to `CreateClassDialog` and use it to refetch upcoming classes (and stats if applicable) so the new class appears without a full page reload. Currently the dialog has the callback but the dashboard uses static mock data.

### 2.4 Class list actions

- **Enter Room** – Keep; ensure `href` uses the same ID the API returns (e.g. `session.id` or `room.id` depending on routing).
- **Copy join link** – Add “Copy link” (or share) so the tutor can send the class URL to students.
- **Timezone** – Show scheduled times in the tutor’s timezone (from profile/settings or browser); consider “Starts in X hours” for near-term classes.

---

## 3. Localization & Accessibility

### 3.1 Chinese-first (per AGENTS.md)

- All tutor dashboard strings are currently in English. Add zh-CN for: “Welcome back”, “Create Class”, “Upcoming Classes”, “View All”, “Enter Room”, “Students Needing Attention”, “AI Insights”, “Quick Actions”, stat labels, button labels, empty states, and errors.

### 3.2 Accessibility

- Ensure “Create Class”, “Enter Room”, “View All”, and Quick Action buttons have clear focus styles and are keyboard-accessible.
- Use `aria-busy` or `aria-live` for loading states; ensure dialog focus is trapped and returns to trigger on close.

---

## 4. Stats & Settings Consistency

### 4.1 Earnings and currency

- **StatsCards** shows earnings as `¥{stats.earnings}`. If the tutor sets a currency in Settings (e.g. SGD, USD), show earnings in that currency and use the correct symbol (or “SGD”, “USD”, etc.).
- Option: fetch currency from profile/settings and format accordingly; or add a “display currency” to the stats API.

### 4.2 Time range for “Upcoming”

- Clarify what “upcoming” means (e.g. next 7 days, or all future). Use the same definition in the API and in the dashboard copy.

---

## 5. Quick wins (low effort)

| Improvement | Where | What to do |
|-------------|--------|------------|
| Create `/tutor/classes` page | New page | List classes from `GET /api/class/rooms` (or tutor-specific endpoint), with Enter Room and empty state. |
| Refetch after create | `dashboard/page.tsx` | Add state for “classes” and “stats”; fetch in `useEffect`; in `onClassCreated` refetch so new class appears. |
| Empty state for upcoming | `UpcomingClassesCard` | If `classes.length === 0`, render “No upcoming classes” + link/button to create class. |
| Copy join link | `UpcomingClassesCard` or class row | Button that copies `${window.location.origin}/class/${cls.id}` (or the correct join URL). |
| Loading skeletons | Dashboard | Skeleton cards for stats and upcoming list while `loading === true`. |

---

## 6. Medium-term (API-dependent) ✅ Implemented

- **Tutor stats API** – ✅ `GET /api/tutor/stats` returns `{ totalClasses, totalStudents, upcomingClasses, earnings, currency }`. Currency from tutor profile (Settings).
- **Upcoming vs active** – ✅ `GET /api/tutor/classes` returns scheduled (scheduledAt ≥ now) plus active sessions; no time cap. Same definition for "Upcoming" stat; documented in API.
- **Students needing attention** – ✅ `GET /api/tutor/students-needing-attention` returns students with recent quiz below 60% (30 days) or missed clinic (14 days). Response: `{ students: [{ id, name, initial, color, issue }] }`.

---

## 7. Class room page (already separate) ✅ Implemented

- The class room (`/class/[roomId]`) already has tutor controls, whiteboard, video, breakout, etc. ✅
- **Dashboard tie-in:** ✅
  - Enter Room opens in a new tab on tutor dashboard and /tutor/classes. Class room header has "Back to dashboard" (tutor -> /tutor/dashboard, student -> /student/dashboard).

---

## Summary

| Priority | Area | Action |
|----------|------|--------|
| High | Data | Replace mock classes and stats with real API; add `/tutor/classes` page. |
| High | UX | Loading/error and empty states; refetch after creating a class. |
| Medium | UX | Copy join link, timezone/relative time, currency in stats. |
| Medium | i18n | Chinese strings for all tutor dashboard and class list. |
| Lower | Accessibility | Focus, aria attributes, keyboard support. |

Implementing **Section 5 (Quick wins)** and **Section 1.1–1.2 (API + View All page)** will make the tutor class dashboard production-ready and consistent with the rest of the app.
