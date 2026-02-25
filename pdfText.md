# PDF Tutoring Engine - Hardening Status

## Completed hardening

1. Persistent snapshot storage
- Added DB-backed snapshot API:
  - `GET /api/pdf-tutoring/snapshots`
  - `POST /api/pdf-tutoring/snapshots`
- Uses `Whiteboard` + `WhiteboardSnapshot` models for persistence.
- Added tutor-side actions in viewer:
  - `Save Snapshot`
  - `Load Latest Snapshot`

2. E2E test coverage added
- Added Playwright spec: `tutorme-app/e2e/pdf-tutoring.spec.ts`
- Covers:
  - lock/unlock interaction
  - mode toggle flow (Original / AI Cleaned Text / Marked Feedback)
  - flatten request path after PDF upload

3. Live-class wiring
- Added dedicated PDF tutoring tab in tutor whiteboard manager.
- Added student-side PDF tutoring tab in live-class whiteboard interface.

## Still pending in this environment

1. Install optional production modules (attempted, blocked by environment):
- `fabric`
- `pdf-lib`
- `unpdf`
- `pdf-parse`

The code currently supports graceful fallback when these are missing.

## Notes

- Role-based lock is enforced in Socket server:
  - only `tutor` can emit lock toggle
  - student receives lock state and cannot toggle lock
- Coordinate normalization remains active for cross-device consistency.

## Additional implementation completed in this pass

1. Replaced `<img>` with `next/image` in PDF preprocessing preview (`unoptimized` mode for blob URLs).
2. Added auto-snapshot interval (every 60s, tutor-side, only when canvas has objects).
3. Added room-level retention policy on snapshots (keeps latest 30, prunes older records).
4. Added socket canvas-state replay support so late joiners can rebuild current annotations from retained room events.
5. Added AI mistake-circle utility in viewer (`Apply AI Error Circles`) that draws red circles from returned coordinates.
6. Added shared-room query support for tutor page and a dedicated student PDF page for controlled two-session collaboration tests.
7. Added second E2E spec for tutor->student lock propagation across two logged-in sessions.
