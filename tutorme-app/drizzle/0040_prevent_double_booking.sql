CREATE EXTENSION IF NOT EXISTS btree_gist;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'CalendarEvent_no_overlap_per_tutor'
  ) THEN
    ALTER TABLE "CalendarEvent"
      ADD CONSTRAINT "CalendarEvent_no_overlap_per_tutor"
      EXCLUDE USING gist (
        "tutorId" WITH =,
        tstzrange("startTime", "endTime", '[)') WITH &&
      )
      WHERE ("deletedAt" IS NULL AND "isCancelled" = false AND "status" <> 'CANCELLED');
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "LiveSession_tutorId_scheduledAt_active_key"
  ON "LiveSession" ("tutorId", "scheduledAt")
  WHERE ("scheduledAt" IS NOT NULL AND "status" IN ('scheduled', 'active', 'preparing', 'live', 'paused'));
