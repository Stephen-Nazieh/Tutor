DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Curriculum')
     AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Course') THEN
    EXECUTE 'ALTER TABLE "Curriculum" RENAME TO "Course"';
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'CurriculumLesson')
     AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'CourseLesson') THEN
    EXECUTE 'ALTER TABLE "CurriculumLesson" RENAME TO "CourseLesson"';
  END IF;
END $$;

DO $$
DECLARE
  tbl text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['CourseLesson', 'CourseEnrollment', 'CourseProgress', 'CourseShare', 'LiveSession', 'CalendarEvent', 'BuilderTask', 'ResourceShare', 'StudentPerformance']
  LOOP
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = tbl AND column_name = 'curriculumId'
    ) AND NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = tbl AND column_name = 'courseId'
    ) THEN
      EXECUTE format('ALTER TABLE %I RENAME COLUMN "curriculumId" TO "courseId"', tbl);
    END IF;
  END LOOP;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'LiveSession' AND column_name = 'subject'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'LiveSession' AND column_name = 'category'
  ) THEN
    EXECUTE 'ALTER TABLE "LiveSession" RENAME COLUMN "subject" TO "category"';
  END IF;
END $$;

ALTER TABLE "CourseLesson" ADD COLUMN IF NOT EXISTS "tasks" jsonb;
ALTER TABLE "CourseLesson" ADD COLUMN IF NOT EXISTS "assessments" jsonb;
ALTER TABLE "CourseLesson" ADD COLUMN IF NOT EXISTS "homework" jsonb;
