#!/usr/bin/env bash
# Run QA test suite: unit -> integration -> e2e (optional).
# Load tests are separate: npm run test:load
# Requires: npm run test (unit), optionally DATABASE_URL for integration, running app for e2e.

set -e
cd "$(dirname "$0")/.."

echo "=== Unit tests ==="
npm run test

if [ -n "$DATABASE_URL" ]; then
  echo "=== Integration tests (DATABASE_URL set) ==="
  npm run test:integration || true
else
  echo "=== Skipping integration tests (no DATABASE_URL) ==="
fi

echo "=== E2E tests (start app if needed: npm run dev:next) ==="
echo "Run manually: npm run test:e2e"
echo "Load tests: npm run test:load"
