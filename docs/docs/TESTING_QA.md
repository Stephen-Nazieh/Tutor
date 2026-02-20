# Testing & QA (Section 8, FinalThings.md)

How to run tests, environment setup, coverage targets, and monitoring (8.3).

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run test` | Unit tests (Vitest); fast, no server or DB. |
| `npm run test:unit` | Same as `test`. |
| `npm run test:watch` | Unit tests in watch mode. |
| `npm run test:integration` | Integration tests (Vitest + real DB). Requires `DATABASE_URL`. |
| `npm run test:e2e` | Playwright E2E; starts app via `webServer` if not CI. |
| `npm run test:e2e:ui` | Playwright with UI. |
| `npm run test:load` | k6 load test (concurrent users). Requires [k6](https://k6.io) installed. |
| `npm run test:load:ai` | k6 AI endpoint stress (optional `AUTH_TOKEN`). |
| `bash scripts/run-qa.sh` | Runs unit, then integration (if DB set); reminds to run e2e/load manually. |

---

## Unit tests

- **Runner:** Vitest + @testing-library/react + jsdom.
- **Location:** `src/**/*.test.{ts,tsx}`, `src/**/__tests__/**/*.test.{ts,tsx}`.
- **Config:** `vitest.config.ts` (path alias `@/*`, setup in `src/__tests__/setup.ts`).
- **Target:** >70% on critical paths (utilities, hooks, API route handlers with mocks).

---

## Integration tests

- **Runner:** Vitest (node environment).
- **Config:** `vitest.integration.config.ts`.
- **Location:** `src/__tests__/integration/**/*.test.ts`.
- **Requires:** Running database; set `DATABASE_URL` (e.g. `tutorme_test` for a separate test DB).
- **Target:** >50% on API + auth flows (register, login, protected routes, DB operations).

To run against a test database:

1. Create a DB (e.g. `createdb tutorme_test`).
2. Set `DATABASE_URL` to point to it (or use `.env.test`).
3. Run migrations: `npx prisma migrate deploy`.
4. Run `npm run test:integration`.

---

## E2E tests (Playwright)

- **Config:** `playwright.config.ts`; base URL `http://localhost:3003` (or `PLAYWRIGHT_BASE_URL`).
- **Location:** `e2e/*.spec.ts`.
- **Flows:** Registration, tutor clinic (dashboard), AI tutor, payment (student classes).
- **Target:** >30% on critical user flows.

Optional env for authenticated E2E:

- `E2E_STUDENT_EMAIL`, `E2E_STUDENT_PASSWORD`
- `E2E_TUTOR_EMAIL`, `E2E_TUTOR_PASSWORD`

If not set, specs use placeholders (e.g. `student@example.com`); ensure seed or test accounts exist.

---

## Load tests (k6)

- **Scripts:** `scripts/load/concurrent-users.js`, `scripts/load/ai-stress.js`.
- **README:** `scripts/load/README.md`.
- **Requires:** [k6](https://k6.io/docs/getting-started/installation/) installed (e.g. `brew install k6`).
- **Targets:** Concurrent user simulation (1000+), AI stress, WebSocket (50 per clinic), DB pool limits.

Run:

- `npm run test:load` (concurrent users, 10 VUs, 15s).
- `BASE_URL=http://localhost:3003 k6 run --vus 20 --duration 60s scripts/load/concurrent-users.js`.

---

## 8.3 Monitoring (FinalThings.md)

Operational items, not run as part of `npm test`:

| Item | Description | Status |
|------|-------------|--------|
| **Error tracking** | Sentry (or similar) for errors in API and client. | Documented here; add `@sentry/nextjs` and error boundary + API error reporting when ready. |
| **Performance (APM)** | New Relic / Datadog for request and DB metrics. | Future; configure in production. |
| **Uptime** | Pingdom / StatusCake for HTTP checks. | Future; point at `/api/health`. |
| **AI latency** | Monitor provider response times (Ollama, Kimi, Zhipu). | Can be logged in `lib/ai/orchestrator.ts` (latencyMs) and sent to APM. |
| **Cost monitoring** | Track AI API usage and cost. | Future; use provider dashboards or custom metrics. |

### Enabling Sentry (optional)

1. Install: `npm install @sentry/nextjs`.
2. Run: `npx @sentry/wizard@latest -i nextjs`.
3. Configure `SENTRY_DSN` in env.
4. Add error boundary and optional API error reporting; see [Sentry Next.js docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/).

---

## CI

Suggested pipeline steps:

1. `npm run test` (unit).
2. If `DATABASE_URL` is set (e.g. test DB in CI): `npm run test:integration`.
3. If app can be started: `npm run test:e2e` (Playwright).
4. Optional: `k6 run --vus 5 --duration 10s scripts/load/concurrent-users.js` for a quick load smoke test.

No CI config is included in this repo; add a workflow (e.g. GitHub Actions) that runs the above as needed.
