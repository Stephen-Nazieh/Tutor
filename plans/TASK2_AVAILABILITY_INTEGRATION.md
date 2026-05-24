# TASK 2: Integrate Tutor Availability into Course Scheduler

## Goal
Wire the tutor dashboard availability system into the course scheduling UI so that:
1. Unavailable time slots are visually greyed out in the schedule editor
2. Tutors cannot (or are warned when they try to) select slots that conflict with their availability, exceptions, existing courses, or approved one-on-one bookings
3. The publish endpoint also checks approved one-on-one bookings as a conflict source
4. Change the "Published" badge text to "Publish" on the course builder

## Files to Modify

### 1. `src/app/api/tutor/calendar/availability/route.ts`
**Change:** Enhance GET endpoint with `?mode=schedule&start=...&end=...`

When `mode=schedule` is passed, return a normalized payload suitable for client-side conflict checking:
```ts
{
  availability: Array<{ dayOfWeek: number; startTime: string; endTime: string }>,
  exceptions: Array<{ date: string; isAvailable: boolean; startTime?: string; endTime?: string }>,
  events: Array<{ date: string; startTime: string; endTime: string; title: string }>,
  oneOnOnes: Array<{ date: string; startTime: string; endTime: string; studentName?: string }>,
}
```

Implementation:
- Query `calendarAvailability` for recurring slots (same as today)
- Query `calendarException` for date overrides (same as today)
- Query `calendarEvent` for existing events in `[start, end]` range
- Query `oneOnOneBookingRequest` where `status IN ('ACCEPTED', 'PAID')` and `requestedDate` overlaps `[start, end]`
- Normalize all to `YYYY-MM-DD` date + `HH:mm` time strings for easy client comparison

### 2. `src/app/[locale]/tutor/courses/[id]/page.tsx`
**Change:** Fetch availability data and pass to `VariantScheduleEditor`

- Add state: `const [availabilityData, setAvailabilityData] = useState<AvailabilityData | null>(null)`
- Add fetch function that calls `/api/tutor/calendar/availability?mode=schedule&start=...&end=...` based on the currently viewed week range + weeksToSchedule
- Call it when the schedule editor is mounted or when `scheduleWeekOffset` / `numberOfWeeks` changes
- Pass `availabilityData` to `<VariantScheduleEditor />`

### 3. `src/app/[locale]/tutor/courses/[id]/components/VariantScheduleEditor.tsx`
**Change:** Accept availability data, compute cell availability, grey out conflicts

New props:
```ts
interface VariantScheduleEditorProps {
  // ...existing props...
  availabilityData?: {
    availability: Array<{ dayOfWeek: number; startTime: string; endTime: string }>
    exceptions: Array<{ date: string; isAvailable: boolean; startTime?: string; endTime?: string }>
    events: Array<{ date: string; startTime: string; endTime: string; title: string }>
    oneOnOnes: Array<{ date: string; startTime: string; endTime: string; studentName?: string }>
  } | null
}
```

Helper: `isSlotAvailable(day: string, dateKey: string, timeStr: string, durationMinutes: number)`
1. Convert `day` → `dayOfWeek` number
2. Check recurring availability: does any availability row cover this `dayOfWeek` where `timeStr >= startTime && timeStr < endTime`?
3. Check exceptions for `dateKey`:
   - If `isAvailable === false` → unavailable
   - If partial time exception overlaps `[timeStr, timeStr+duration]` → unavailable
4. Check existing events for `dateKey`: does any event overlap `[timeStr, timeStr+duration]`?
5. Check one-on-ones for `dateKey`: does any one-on-one overlap?

Cell rendering:
- If `!isSlotAvailable` → `bg-slate-200 text-slate-400 cursor-not-allowed` (no hover, no toggle)
- If user clicks unavailable cell → `toast.error('This slot conflicts with your availability or an existing booking')`
- Add tooltip via `title` attribute: `"Unavailable: conflicts with [event title / one-on-one / exception]"`

### 4. `src/app/api/tutor/courses/[id]/publish/route.ts`
**Change:** Add one-on-one conflict detection during publish

In the transaction, alongside the existing `existingLiveSessions` and `existingCalendarEvents` queries, also query:
```ts
const existingOneOnOnes = await tx
  .select({ requestedDate: oneOnOneBookingRequest.requestedDate, startTime: oneOnOneBookingRequest.startTime, endTime: oneOnOneBookingRequest.endTime })
  .from(oneOnOneBookingRequest)
  .where(and(
    eq(oneOnOneBookingRequest.tutorId, userId),
    inArray(oneOnOneBookingRequest.status, ['ACCEPTED', 'PAID']),
    gte(oneOnOneBookingRequest.requestedDate, minScheduledAt),
    lte(oneOnOneBookingRequest.requestedDate, maxScheduledAt)
  ))
```

In the `overlaps` check, also check against `existingOneOnOnes`. If conflict:
- `reason: 'one_on_one'`
- `recommendations: await findAlternativeSlots(...)`

### 5. `src/app/[locale]/tutor/courses/[id]/components/VariantManager.tsx`
**Change:** Badge text "Published" → "Publish"

Line ~505:
```tsx
// Before
<Badge className="...">Published</Badge>
// After
<Badge className="...">Publish</Badge>
```

## Data Flow

```
page.tsx
  └─► GET /api/tutor/calendar/availability?mode=schedule&start=...&end=...
        └─► returns availability + exceptions + events + oneOnOnes
  └─► passes data ──► VariantScheduleEditor.tsx
                        └─► per-cell: isSlotAvailable()
                        └─► grey out / block clicks on conflicts
  └─► user clicks "Publish"
        └─► POST /api/tutor/courses/[id]/publish
              └─► checks liveSession + calendarEvent + oneOnOne conflicts
              └─► skips conflicting sessions with alternatives
```

## UI Behavior Summary

| Condition | Cell Appearance | Click Behavior |
|-----------|----------------|----------------|
| Available, not selected | White bg, hover slate-50 | Toggle ON |
| Available, selected | Blue bg (#1D4ED8), white text | Toggle OFF |
| Outside availability | Slate-200 bg, muted text | Blocked + toast |
| Blocked by exception | Slate-200 bg, muted text | Blocked + toast |
| Conflicts with existing course | Slate-200 bg, muted text | Blocked + toast |
| Conflicts with one-on-one | Slate-200 bg, muted text | Blocked + toast |

## Testing Checklist

1. Set tutor availability (e.g., Monday 9:00–12:00 only)
2. Open course scheduler → Monday 9:00 cell is selectable, Monday 13:00 is greyed out
3. Create an exception on next Monday → that Monday's 9:00 cell is greyed out
4. Schedule a one-on-one on Tuesday 10:00 → Tuesday 10:00 cell is greyed out
5. Publish a course with a conflicting slot → slot is skipped, alternative recommended
6. Verify "Publish" badge appears on published variants
