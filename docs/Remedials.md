# TutorMe – Full Implementation Plan (Easy → Hard)

> **Purpose:** Single ordered backlog from all sources (FinalThings.md, YourActions.md, DASHBOARD_FIX_PLAN.md, TUTOR_DASHBOARD_IMPROVEMENTS.md).  
> **Order:** Easy → Medium → Hard → Very Hard. High-complexity items (e.g. Phone/SMS) are at the bottom.

---

## Already done (reference only)

- **Mobile responsive audit** – Touch targets (44px), safe-area, responsive padding on key pages.
- **Rate limiting** – Login, register, payment create, enroll, booking.
- **CSP** – Strict CSP headers in middleware.
- **XSS / sanitization** – Hardened at API boundaries (extend to remaining routes as per plan below).
- **Refund processing** – Course refunds (tutor = creator).
- **Database optimizations** – Pooling, batch loaders, Redis cache, read-replica ready.
- **Tutor stats & classes** – `GET /api/tutor/stats`, `GET /api/tutor/classes`, students-needing-attention (per TUTOR_DASHBOARD_IMPROVEMENTS).

---

## Tier 1 – Easy (docs, config, small UI)

Quick wins: documentation, placeholders, and small behavioral/UX fixes.

### 1.1 Documentation & status

- [ ] **Update FinalThings.md** – Mark completed: Rate Limiting, CSP, Responsive Design Audit, Refund Processing; set Security 6.1 table accordingly.
- [ ] **Update YourActions.md** – Note Phase 2 complete; update “Current Status” and “Last Updated”.
- [ ] **FAQ (user)** – One-page FAQ: login, registration, onboarding, dashboard, payments, common errors.
- [ ] **Troubleshooting (user)** – Short troubleshooting doc (port conflicts, Docker, DB reset, Prisma).
- [ ] **Contributing guide** – Code style, branch naming, how to run tests/lint (even if tests are minimal).

### 1.2 API & developer docs (skeleton)

- [ ] **Rate limit info in API docs** – Document which endpoints are rate-limited and limits (e.g. login 5/min).
- [ ] **Error reference** – List of API error codes and messages used in the app.
- [ ] **OpenAPI spec (skeleton)** – Document 5–10 critical endpoints (auth, dashboard, payments) as a base; expand later.

### 1.3 Student dashboard – placeholders & navigation

- [ ] **AI Recommendations** – Add click handler to navigate to recommended content or `/student/learn` with context.
- [ ] **WorldsMap / DailyQuests** – Confirm `onWorldClick` and `onQuestClick` are passed and navigate correctly (per DASHBOARD_FIX_PLAN).
- [ ] **“Coming Soon” for Book / Join** – If Clinics or Study Groups APIs are not ready, show toast “Coming soon” on Book and Join until APIs exist.

### 1.4 Tutor dashboard – quick UX

- [ ] **Empty state – Upcoming classes** – When no classes: message + primary CTA “Create your first class” (or “Schedule a class”).
- [ ] **Empty state – Students needing attention** – When list empty: “No students need attention right now.”
- [ ] **Copy join link** – Button on each class row to copy join URL (e.g. `${origin}/class/${roomId}`).
- [ ] **Refetch after create class** – Wire `onClassCreated` to refetch upcoming classes and stats so new class appears without reload.
- [ ] **Loading skeletons** – Dashboard: skeleton cards for stats and upcoming list while loading.

### 1.5 Accessibility & i18n (low effort)

- [ ] **Tutor dashboard focus styles** – Clear focus ring for Create Class, Enter Room, View All, Quick Action buttons.
- [ ] **aria-busy / aria-live** – Use on dashboard and CreateClassDialog during loading; trap focus in dialog.
- [ ] **Timezone / relative time** – Show class times in tutor timezone or “Starts in X hours” for near-term.
- [ ] **Currency in stats** – If tutor profile has currency (SGD, USD, etc.), show earnings with correct symbol (stats API may already support).

### 1.6 Localization (first pass)

- [ ] **Tutor dashboard zh-CN** – Add Chinese strings for: Welcome back, Create Class, Upcoming Classes, View All, Enter Room, Students Needing Attention, AI Insights, Quick Actions, stat labels, empty states, errors (per AGENTS.md).

---

## Tier 2 – Medium-easy (repeated patterns, single-domain features)

Apply existing patterns or add one clear feature per item.

### 2.1 API route refactoring

Apply the same middleware pattern (auth, validation, error handling) used elsewhere to:

- [ ] `/api/student/**` (8 routes)
- [ ] `/api/curriculum/**` (6 routes)
- [ ] `/api/content/**` (4 routes)
- [ ] `/api/quiz/**` (5 routes)
- [ ] `/api/ai-tutor/**` (7 routes)
- [ ] `/api/class/**` (5 routes)
- [ ] `/api/gamification/**` (6 routes)
- [ ] `/api/analytics/**` (4 routes)
- [ ] `/api/reports/**` (2 routes)

### 2.2 Tutor dashboard – real data

- [ ] **Replace MOCK_CLASSES** – Use `GET /api/tutor/classes` (or existing tutor classes API) for upcoming classes.
- [ ] **Replace mock stats** – Use `GET /api/tutor/stats` for totalClasses, totalStudents, upcomingClasses, earnings.
- [ ] **Replace MOCK_STUDENTS** – Use `GET /api/tutor/students-needing-attention` for “students needing attention.”
- [ ] **AI Insights** – Replace static text with `GET /api/analytics/insights` (or similar) for real “N students struggling…” / “X% mastered…” data.
- [ ] **View All classes page** – Add `app/tutor/classes/page.tsx`: list from API, columns (title, subject, date/time, duration, enrolled/max, status), actions (Enter Room, Copy link, Cancel if supported), empty + loading + error.

### 2.3 CreateClassDialog polish

- [ ] **Inline API errors** – Show API error message (e.g. “Room creation failed”) in the dialog.
- [ ] **Disable form during submit** – Prevent double submit and clarify loading state.

### 2.4 Auth & session (no new providers)

- [ ] **JWT refresh** – Complete refresh mechanism if currently partial (tokens, rotation, storage).
- [ ] **Session invalidation** – Proper logout and session invalidation (e.g. on password change, admin revoke).

### 2.5 Security – extend existing

- [ ] **XSS – remaining boundaries** – Ensure sanitization is applied at every API that accepts user-generated input (review and add where missing).
- [ ] **CSRF protection** – Add CSRF tokens or same-site cookie policy for state-changing operations (login, register, payments, enroll, booking, etc.).

### 2.6 Notifications & billing (narrow scope)

- [ ] **Email notifications** – Booking confirmation and reminder emails (templates + send via existing or new email provider).
- [ ] **Usage quota enforcement** – Enforce daily limits for free tier on key actions (e.g. AI messages, quizzes) and return clear error when exceeded.
- [ ] **Billing dashboard (UI)** – User-facing page: payment history, receipts, next billing (if applicable); can read from existing payment data first.

### 2.7 Documentation (next step)

- [ ] **Architecture diagram** – One high-level diagram (frontend, API, DB, Redis, AI, video).
- [ ] **Database schema doc** – Entity relationship summary and main tables (can be generated from Prisma + short descriptions).
- [ ] **Authentication guide** – How sessions/tokens work, how to call APIs when logged in.

---

## Tier 3 – Medium (new domains, multi-step features)

Features that need new APIs, schema, or non-trivial UI.

### 3.1 Student dashboard – Clinics & Study Groups

- [ ] **Clinics schema** – Add `Clinic`, `ClinicBooking` (or equivalent) to Prisma; migration.
- [ ] **Clinics API** – GET list upcoming clinics; POST book a spot (with auth and validation).
- [ ] **Study Groups schema** – Add `StudyGroup`, `StudyGroupMember` (or equivalent); migration.
- [ ] **Study Groups API** – GET list groups; POST join (with auth and validation).
- [ ] **Dashboard “Book”** – Wire Book button to clinics API (modal or dedicated page).
- [ ] **Dashboard “Join”** – Wire Join to study groups API; refresh list after join.

### 3.2 Video learning

- [ ] **Video player enhancements** – Custom skin, Chinese labels; playback speed (0.5x–2x); keyboard shortcuts (space, arrows); picture-in-picture; variable quality if available.
- [ ] **Video analytics** – Watch time, pause/seek events, completion %, drop-off analysis; store and optionally surface in admin/tutor views.
- [ ] **Inline video quizzes** – Auto-pause at quiz timestamps; overlay quiz UI; resume after completion; skip option with note.

### 3.3 Video storage (foundation only)

- [ ] **Video upload & storage** – S3-compatible storage; upload API; progress indicator; link to existing content model (no need for full transcoding in first step).
- [ ] **Optional: compression/transcoding** – Later: multiple qualities (720p, 1080p) if needed.

### 3.4 Performance (frontend)

- [ ] **Route-level code splitting** – Ensure each major route is a separate chunk (Next.js default; verify and fix any heavy shared bundles).
- [ ] **Lazy load heavy components** – Whiteboard, video player: dynamic import so they don’t block initial load.
- [ ] **Image optimization** – WebP where possible; responsive sizes for thumbnails/cards.
- [ ] **Font optimization** – Subset Chinese fonts if bundle size is an issue; defer non-critical fonts.

### 3.5 Performance (backend & AI)

- [ ] **Redis caching** – Cache frequent read-only queries (e.g. curriculum list, content metadata) with TTL.
- [ ] **AI response streaming** – Stream AI chat responses so TTI and perceived latency improve.
- [ ] **AI response caching** – Cache common Q&A by content/topic where appropriate.

### 3.6 Testing (foundation)

- [ ] **Unit tests – setup** – Jest + React Testing Library; run in CI.
- [ ] **Unit tests – first targets** – Custom hooks, `lib/utils`, sanitize; a few API route handlers.
- [ ] **Integration tests – setup** – DB, API client; at least one auth flow and one dashboard flow.

### 3.7 Monitoring & observability

- [ ] **Error tracking** – Sentry (or similar): capture unhandled errors and API errors.
- [ ] **AI latency/cost** – Log provider, latency, token usage for AI calls; simple dashboard or export for cost monitoring.

### 3.8 Data protection (first steps)

- [ ] **Audit logging** – Log sensitive actions (login, payment, enrollment, role change) to table or external log; no PII in logs.
- [ ] **Data retention policy** – Document and implement auto-delete or anonymize for old logs/analytics (e.g. 90 days).

---

## Tier 4 – Hard (large refactors, new systems)

Significant design and implementation effort.

### 4.1 Component refactoring

- [ ] **EnhancedWhiteboard** – Refactor from ~1,351 lines to ~300–400: extract hooks, separate canvas renderer, use shared UI components.
- [ ] **Student dashboard** – Break into smaller components (cards, sections) with clear boundaries.
- [ ] **Tutor dashboard** – Modularize clinic/session controls and reuse on class page where relevant.
- [ ] **AI Chat Widget** – Extract message send/receive and state into dedicated handlers/hooks.

### 4.2 Security & compliance

- [ ] **PII encryption at rest** – Encrypt sensitive fields (e.g. email, phone) in DB; key management.
- [ ] **GDPR compliance** – Data export (user data dump) and account/data deletion flow; document in privacy policy.
- [ ] **RBAC** – Granular permissions (e.g. tutor vs admin, content editor); enforce in API and UI.

### 4.3 Payments & subscriptions

- [ ] **Subscription tiers** – Define Free/Basic/Pro; enforce in middleware or feature flags (e.g. AI usage, clinics).
- [ ] **Subscription management** – Upgrade/downgrade, cancel; sync with payment provider.

### 4.4 Session recording

- [ ] **Record live clinics** – Capture video/audio and whiteboard; store (e.g. S3); privacy and consent.
- [ ] **Replay UI** – Page or modal for tutors/students to watch past sessions.

### 4.5 Content & curriculum

- [ ] **Curriculum builder UI** – Drag-and-drop editor for courses/units/lessons; save to existing schema.
- [ ] **Content moderation** – Flag inappropriate content; review queue (admin); optional AI pre-filter.
- [ ] **AI content assistant** – Auto-generate descriptions or summaries for content/curriculum.

### 4.6 Gamification

- [ ] **Streak shield** – PRO feature to protect streak (e.g. one skip per week); implement where “TODO” exists.
- [ ] **Achievement unlock animations** – Visual feedback when achievements unlock.
- [ ] **Leaderboard** – Weekly/monthly rankings by subject or global.
- [ ] **Weekly report** – Automated email with progress summary (e.g. topics studied, quizzes, streak).

### 4.7 Tutor enhancements

- [ ] **Earnings analytics** – Detailed payout breakdown (by class, date range, subject).
- [ ] **Student briefing AI** – Pre-session summary for tutor (struggling topics, last activity).
- [ ] **Session templates** – Save and reuse session structures (agenda, default whiteboard).
- [ ] **Queue management** – Waitlist for full clinics; notify when spot opens.

### 4.8 AI & learning

- [ ] **Language optimization** – Tune prompts for Chinese, Korean, Cantonese; mixed language and cultural context.
- [ ] **Math formula support** – LaTeX in chat; formula input; optional graph plotting and step-by-step solutions.
- [ ] **AI quiz generation** – Complete “generate from transcript” flow if only partial today.

### 4.9 E2E & load testing

- [ ] **E2E – Playwright** – Flows: registration, login, student dashboard, tutor clinic entry, AI chat, payment (happy path).
- [ ] **Load testing** – Concurrent users (e.g. 100–500), AI endpoint stress, WebSocket (e.g. 50 in one room), DB connection limits.

### 4.10 Infrastructure (pre-production)

- [ ] **Deployment guide** – Step-by-step: VPS, Docker Compose, env vars, migrations, rollback.
- [ ] **CI/CD** – GitHub Actions: lint, unit/integration tests; optional staging deploy; production with manual approval.
- [ ] **Backups** – Automated DB backups (e.g. daily); retention; test restore at least once.
- [ ] **Monitoring & alerts** – Uptime checks; critical error alerts; optional Prometheus/Grafana for API/DB.

---

## Tier 5 – Very hard / defer (high complexity or external deps)

These add the most complexity or depend on external services; do after Tiers 1–4 where possible. **Phone/SMS and similar auth options are intentionally last.**

### 5.1 PWA & mobile-native

- [ ] **PWA** – Service worker; offline caching for key pages; “Add to home screen” prompt; push notifications (optional).
- [ ] **Mobile-optimized video** – Portrait mode, swipe gestures, bottom sheet controls, battery-aware playback.

### 5.2 AI – advanced & sandbox

- [ ] **Code execution sandbox** – Docker-based runner for Python/JS; secure env; output capture and display in UI.
- [ ] **Model quantization / provider optimization** – Faster inference; smarter fallback chain.
- [ ] **Learning style detection** – Adapt prompts/content to visual/auditory/kinesthetic (research + prompts).
- [ ] **Personalized study plans** – AI-generated learning paths from diagnostic and progress.

### 5.3 Access control & ops

- [ ] **API key management** – Secure keys for third-party or internal services.
- [ ] **IP whitelisting** – Optional restriction for admin or sensitive endpoints.
- [ ] **Suspicious activity detection** – Heuristics or tooling for brute force, abuse; alerts.
- [ ] **Backup encryption** – Encrypt backups at rest (e.g. S3 SSE); key handling.
- [ ] **Full production deployment** – Hong Kong VPS (or target region); SSL (e.g. Let’s Encrypt); CDN (e.g. Cloudflare); domain; Nginx; production Docker Compose.

### 5.4 Additional dashboards & content

- [ ] **Admin dashboard** – Platform and usage metrics; user management; content moderation queue.
- [ ] **Parent dashboard** – Read-only progress for linked student accounts (permissions, invite flow).
- [ ] **Bulk import/export** – CSV/JSON for curriculum/content transfer.
- [ ] **Calendar integration** – Google/Outlook sync for tutor schedule.

### 5.5 Social & future platform

- [ ] **Study groups (full)** – If not done in Tier 3: discovery, create, join, chat or activity feed.
- [ ] **Discussion forums** – Subject-based Q&A (optional).
- [ ] **Pronunciation / speech** – Speech-to-text and scoring for language practice.
- [ ] **Multi-language support** – Spanish, French, Japanese (beyond current zh-CN/EN).

### 5.6 Authentication – high complexity (do last)

- [ ] **Phone number login / SMS verification** – SMS provider (e.g. Twilio, regional); verification flow; link phone to account; optional phone-as-primary login.
- [ ] **WeChat login / Mini Program** – OAuth or WeChat SDK; optional Mini Program (separate project).
- [ ] **React Native app** – If desired: shared API; native iOS/Android UI (large scope).
- [ ] **Corporate / white-label / LMS** – Only if product strategy requires it.

---

## How to use this plan

1. **Work in order** – Tier 1 → 2 → 3 → 4 → 5; within a tier, order can be adjusted by priority.
2. **Check off** – Use `[x]` in this file when an item is done; optionally add a one-line “Done: …” with date or PR.
3. **Sync with other docs** – When you complete an item, update FinalThings.md or YourActions.md if it’s listed there.
4. **Defer Tier 5** until Tiers 1–4 are in good shape, unless a specific item (e.g. PWA) is required earlier.
5. **Phone/SMS and WeChat** – Treat as post-MVP unless required by launch; they sit at the bottom of Tier 5.

---

*Generated from FinalThings.md, YourActions.md, DASHBOARD_FIX_PLAN.md, TUTOR_DASHBOARD_IMPROVEMENTS.md. Order: easy → hard; high-complexity auth at bottom.*
