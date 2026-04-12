import { drizzleDb } from './src/lib/db/drizzle';
import { sql } from 'drizzle-orm';

async function fixTimestamps() {
  try {
    console.log('Adding default timestamps to Curriculum tables...');
    await drizzleDb.execute(sql`
      ALTER TABLE "Course" ALTER COLUMN "updatedAt" SET DEFAULT now();
      ALTER TABLE "CourseLesson" ADD COLUMN IF NOT EXISTS "updatedAt" timestamp with time zone NOT NULL DEFAULT now();
      ALTER TABLE "CourseLessonProgress" ADD COLUMN IF NOT EXISTS "updatedAt" timestamp with time zone NOT NULL DEFAULT now();
    `);
    console.log('Success! Timestamps fixed.');
  } catch (e) {
    console.error('Error:', e);
  }
  process.exit(0);
}

fixTimestamps();
