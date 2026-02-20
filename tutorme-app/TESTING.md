# Testing Guide

## Unit tests (Vitest)

```bash
npm run test          # or npm run test:unit
npm run test:watch    # watch mode
```

- **Location:** `src/**/*.test.{ts,tsx}` and `src/**/__tests__/**/*.{test,spec}.{ts,tsx}`
- **Setup:** `src/__tests__/setup.ts` (jest-dom)
- **Config:** `vitest.config.ts` (jsdom; excludes integration)
- **No database required** for unit tests.

## Integration tests

```bash
npm run test:integration
```

- **Location:** `src/__tests__/integration/**/*.test.ts`
- **Config:** `vitest.integration.config.ts` (node env; 15s timeout)
- **Database:** Requires a running Postgres instance. Set `DATABASE_URL` (e.g. to a dedicated `tutorme_test` database).
- **Recommendation:** In CI, use a service container or hosted test DB; run migrations (or deploy schema) before integration tests.

## E2E tests (Playwright)

```bash
npm run test:e2e
npm run test:e2e:ui   # interactive UI
```

- **Location:** `e2e/*.spec.ts` (e.g. `ai-tutor.spec.ts`, `payment.spec.ts`, `registration.spec.ts`, `tutor-clinic.spec.ts`)
- **App:** The app must be running (e.g. `npm run dev` on port 3003) or use Playwright’s `webServer` to start it.
- **Auth/data:** Some specs rely on seeded users. Use env vars for credentials, e.g.:
  - `E2E_STUDENT_EMAIL` (defaults to `student@example.com` if unset)
  - `E2E_STUDENT_PASSWORD` (defaults to `Password1` if unset)
- **Recommendation:** Document required seed data (e.g. a student with the above credentials) and run `npm run db:seed` (or a test-only seed) before E2E in CI.

## Load tests (k6)

```bash
npm run test:load      # concurrent users
npm run test:load:ai   # AI stress
npm run test:load:ws   # WebSocket
```

- **Location:** `scripts/load/*.js`
- **Requires:** Running app and (for AI) configured AI providers or mocks.

## E2E/DB requirements summary

| Requirement        | Description |
|--------------------|-------------|
| **App URL**        | Default `http://localhost:3003` (or set in Playwright config). |
| **Database (E2E)** | E2E can use the same DB as dev; ensure seed has test users. |
| **Database (integration)** | Set `DATABASE_URL` to test DB; run migrations before tests. |
| **Seeded users**   | At least one student (e.g. `E2E_STUDENT_EMAIL` / `E2E_STUDENT_PASSWORD`) for login E2E. |
| **Env vars**       | No AI keys needed for unit tests; use `MOCK_AI=true` for AI unit tests. E2E may need `NEXTAUTH_SECRET`, `NEXTAUTH_URL`. |

## CI

- Run **typecheck:** `npm run typecheck`
- Run **lint:** `npm run lint`
- Run **unit tests:** `npm run test`
- Optionally run **integration tests** if a test database is available.
- Optionally run **E2E** in a separate job with a running app and seeded DB.

See `.github/workflows/ci.yml` (if present) for the exact steps.
