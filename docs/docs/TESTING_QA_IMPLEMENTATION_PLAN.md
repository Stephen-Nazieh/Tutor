# Testing & QA Implementation Plan (Section 8, FinalThings.md)

This document compiles the implementation plan for **Section 8: Testing & QA** from FinalThings.md and describes how to run all tests.

---

## 1. Plan overview

### 1.1 Goals (FinalThings.md)

| Type              | Current | Target | Status        |
|-------------------|---------|--------|---------------|
| Unit tests        | ~5%     | >70%   | In progress   |
| Integration tests | ~0%     | >50%   | In progress   |
| E2E tests         | ~0%     | >30%   | In progress   |

### 1.2 Approach

- **Unit and integration:** Vitest (unit: jsdom + RTL; integration: node + real or test DB).
- **E2E:** Playwright, separate from Vitest; requires running app.
- **Load tests:** k6 (or Artillery) scripts, run via npm scripts; not part of `npm test`.
- **Runner script:** `scripts/run-qa.sh` runs unit then integration (if DB set); e2e and load are run manually or in CI.

### 1.3 Initial state (before implementation)

- One existing unit test file: `src/components/class/__tests__/hooks.test.ts` (whiteboard hooks) using Jest/RTL; no test runner in package.json.
- Manual API test: `scripts/test-register.sh` (curl against running server).
- No Jest/Vitest/Playwright in devDependencies.

---

## 2. What was implemented

### 2.1 Unit tests (8.1)

- **Tooling:** Vitest, @testing-library/react, @testing-library/jest-dom, @testing-library/dom, jsdom.
- **Config:** `vitest.config.ts` (path alias `@/*`, setup `src/__tests__/setup.ts`, jsdom, globals).
- **Scope:** Custom hooks, security/utils (sanitize, rbac, rate-limit), API route handlers (health GET, auth register POST) with mocked db/auth.
- **Files:**
  - `src/lib/security/sanitize.test.ts`
  - `src/lib/security/rbac.test.ts`
  - `src/lib/security/rate-limit.test.ts`
  - `src/app/api/health/route.test.ts`
  - `src/app/api/auth/register/route.test.ts`
  - `src/components/class/__tests__/hooks.test.ts` (migrated to Vitest; 3 tests skipped for timing).

### 2.2 Integration tests (8.1)

- **Config:** `vitest.integration.config.ts` (node env, `src/__tests__/integration/**/*.test.ts`).
- **Scope:** Real DB; register user, assert user/profile in DB, duplicate email returns 400.
- **File:** `src/__tests__/integration/api-auth.test.ts`.
- **Requires:** `DATABASE_URL` and running database.

### 2.3 E2E tests (8.1)

- **Tooling:** Playwright (@playwright/test).
- **Config:** `playwright.config.ts` (baseURL `http://localhost:3003`, chromium, optional webServer to start Next.js).
- **Specs:**
  - `e2e/registration.spec.ts` – open /register, fill form, submit, expect redirect to dashboard or login.
  - `e2e/tutor-clinic.spec.ts` – login as tutor, expect tutor dashboard.
  - `e2e/ai-tutor.spec.ts` – login as student, navigate to AI tutor/browse.
  - `e2e/payment.spec.ts` – login as student, open /student/classes, expect class/booking content.

### 2.4 Load tests (8.2)

- **Tooling:** k6 (install separately, e.g. `brew install k6`).
- **Scripts:**
  - `scripts/load/concurrent-users.js` – GET /api/health (concurrent users).
  - `scripts/load/ai-stress.js` – POST /api/ai-tutor/chat (optional AUTH_TOKEN).
  - `scripts/load/websocket.js` – WebSocket connections to Socket.io.
- **Docs:** `scripts/load/README.md`.

### 2.5 Automation and docs

- **Script:** `scripts/run-qa.sh` – runs unit tests, then integration if `DATABASE_URL` is set; reminds to run e2e/load manually.
- **Docs:** `docs/TESTING_QA.md` (commands, env, monitoring 8.3).

### 2.6 File and folder layout

```text
tutorme-app/
├── vitest.config.ts
├── vitest.integration.config.ts
├── playwright.config.ts
├── e2e/
│   ├── registration.spec.ts
│   ├── tutor-clinic.spec.ts
│   ├── ai-tutor.spec.ts
│   └── payment.spec.ts
├── scripts/
│   ├── load/
│   │   ├── concurrent-users.js
│   │   ├── ai-stress.js
│   │   ├── websocket.js
│   │   └── README.md
│   └── run-qa.sh
├── src/
│   ├── __tests__/
│   │   ├── setup.ts
│   │   └── integration/
│   │       └── api-auth.test.ts
│   ├── lib/security/
│   │   ├── sanitize.test.ts
│   │   ├── rbac.test.ts
│   │   └── rate-limit.test.ts
│   ├── app/api/
│   │   ├── health/route.test.ts
│   │   └── auth/register/route.test.ts
│   └── components/class/__tests__/
│       └── hooks.test.ts
└── docs/
    ├── TESTING_QA.md
    └── TESTING_QA_IMPLEMENTATION_PLAN.md  (this file)
```

---

## 3. How to run the tests

All commands are run from the project root: `tutorme-app/`.

### 3.1 Unit tests

**Command:**

```bash
npm run test
```

**Aliases:** `npm run test:unit` (same). For watch mode: `npm run test:watch`.

**Requirements:** None (no server, no database). Uses mocks for DB and external deps.

**What runs:** Vitest executes all files matching `src/**/*.test.{ts,tsx}` and `src/**/__tests__/**/*.{test,spec}.{ts,tsx}`, excluding `src/__tests__/integration/**`.

**Example output:** `Test Files 6 passed (6); Tests 41 passed | 3 skipped (44).`

---

### 3.2 Integration tests

**Command:**

```bash
npm run test:integration
```

**Requirements:**

- Database must be running (e.g. Docker Postgres or local).
- `DATABASE_URL` must be set (in `.env` or environment). For a dedicated test DB, use e.g. `tutorme_test` and run migrations first.

**Setup (test database):**

1. Create database: `createdb tutorme_test` (or equivalent).
2. Set URL: `export DATABASE_URL="postgresql://user:pass@localhost:5432/tutorme_test"` (or in `.env.test`).
3. Run migrations: `npx prisma migrate deploy`.
4. Run: `npm run test:integration`.

**What runs:** Vitest with `vitest.integration.config.ts` runs `src/__tests__/integration/**/*.test.ts` (e.g. register user, check DB, duplicate email).

**Note:** If the database is not reachable, integration tests will fail with a connection error; that is expected when DB is not running.

---

### 3.3 E2E tests (Playwright)

**Command:**

```bash
npm run test:e2e
```

**With UI (interactive):**

```bash
npm run test:e2e:ui
```

**Requirements:**

- App must be reachable at `http://localhost:3003` (or set `PLAYWRIGHT_BASE_URL`). If not in CI, Playwright can start the app automatically via `webServer` in `playwright.config.ts`.
- For specs that log in (tutor-clinic, ai-tutor, payment), either:
  - Use seeded test accounts and set env: `E2E_STUDENT_EMAIL`, `E2E_STUDENT_PASSWORD`, `E2E_TUTOR_EMAIL`, `E2E_TUTOR_PASSWORD`, or
  - Rely on placeholders (e.g. `student@example.com`) and ensure those accounts exist (e.g. from seed).

**What runs:** Playwright runs all specs in `e2e/*.spec.ts` (registration, tutor clinic, AI tutor, payment) in Chromium.

**First-time setup:** Install browsers once: `npx playwright install chromium`.

---

### 3.4 Load tests (k6)

**Prerequisite:** Install k6 (e.g. [k6 installation](https://k6.io/docs/getting-started/installation/)):

- macOS: `brew install k6`
- Other: see k6 docs.

**Commands:**

```bash
# Concurrent users (default: 10 VUs, 15s)
npm run test:load

# AI endpoint stress (optional: set AUTH_TOKEN for authenticated requests)
npm run test:load:ai

# WebSocket load
npm run test:load:ws
```

**With custom base URL and load:**

```bash
BASE_URL=http://localhost:3003 k6 run --vus 20 --duration 60s scripts/load/concurrent-users.js
```

**Requirements:** App running at `BASE_URL` (default `http://localhost:3003`). For `test:load:ai`, optionally set `AUTH_TOKEN` (e.g. session token) for protected `/api/ai-tutor/chat` requests.

**Details:** See `scripts/load/README.md`.

---

### 3.5 Full QA run (script)

**Command:**

```bash
bash scripts/run-qa.sh
```

**What it does:**

1. Runs unit tests (`npm run test`).
2. If `DATABASE_URL` is set, runs integration tests (`npm run test:integration`); otherwise skips them.
3. Prints a reminder to run E2E and load tests manually.

E2E and load are not executed by this script so you can run them when the app is up and/or when k6 is installed.

---

## 4. Quick reference: all test commands

| Command | Purpose |
|---------|--------|
| `npm run test` | Unit tests (Vitest) |
| `npm run test:unit` | Same as `test` |
| `npm run test:watch` | Unit tests in watch mode |
| `npm run test:integration` | Integration tests (requires DB) |
| `npm run test:e2e` | Playwright E2E |
| `npm run test:e2e:ui` | Playwright E2E with UI |
| `npm run test:load` | k6 concurrent users (requires k6) |
| `npm run test:load:ai` | k6 AI stress |
| `npm run test:load:ws` | k6 WebSocket |
| `bash scripts/run-qa.sh` | Unit + integration (if DB set); reminder for e2e/load |

---

## 5. Monitoring (8.3)

Section 8.3 items (error tracking, APM, uptime, AI latency, cost) are operational and not run as tests. They are documented in `docs/TESTING_QA.md`, including how to enable Sentry and what remains for future work (APM, Pingdom, AI/cost monitoring).

---

## 6. CI suggestion

For a CI pipeline (e.g. GitHub Actions):

1. **Unit:** `npm run test`
2. **Integration:** If a test database is configured, `npm run test:integration`
3. **E2E:** If the app can be started in CI, `npm run test:e2e`
4. **Load (optional):** `k6 run --vus 5 --duration 10s scripts/load/concurrent-users.js` for a quick smoke load test

No CI workflow file is included in the repo; add one that invokes these commands as needed.
