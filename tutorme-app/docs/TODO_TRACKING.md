# TODO Comments Tracking

Tracked TODOs from codebase (as of code review). Resolve or document decisions.

| Location | TODO | Status / note |
|----------|------|----------------|
| `src/app/api/analytics/students/[studentId]/route.ts` | Add proper relationship check when Curriculum model has tutorId | Deferred: align when curriculum ownership is standardized |
| `src/app/[locale]/tutor/courses/[id]/builder/layout.tsx` | Navigate to classroom page | Deferred: UX flow TBD |
| `src/lib/socket-server.ts` | Implement other distribution modes | Deferred: current mode sufficient |
| `src/app/api/tutor/calendar/export/route.ts` | Store feed token in database | Deferred: persistence for calendar feed |
| `src/app/[locale]/student/ai-tutor/english/page.tsx` | Text-to-speech with selected voice | Deferred: TTS feature |
| `src/app/[locale]/admin/analytics/errors/route.ts` | Implement actual error counting / top routes / affected users / error rate | Deferred: wire to real error store (e.g. Sentry) |

When addressing a TODO: implement the change, then remove or update the comment and this row.
