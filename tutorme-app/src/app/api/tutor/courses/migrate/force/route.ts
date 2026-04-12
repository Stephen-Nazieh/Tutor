import { NextResponse } from 'next/server'
import { getDrizzleDb } from '@/lib/db/drizzle'
import { sql } from 'drizzle-orm'

export async function GET() {
  try {
    await getDrizzleDb().execute(
      sql`ALTER TABLE "CourseLesson" ADD COLUMN IF NOT EXISTS "tasks" jsonb;`
    )
    await getDrizzleDb().execute(
      sql`ALTER TABLE "CourseLesson" ADD COLUMN IF NOT EXISTS "assessments" jsonb;`
    )
    await getDrizzleDb().execute(
      sql`ALTER TABLE "CourseLesson" ADD COLUMN IF NOT EXISTS "homework" jsonb;`
    )
    await getDrizzleDb().execute(
      sql`ALTER TABLE "CourseLesson" ADD COLUMN IF NOT EXISTS "builderData" jsonb;`
    )
    await getDrizzleDb().execute(
      sql`ALTER TABLE "CourseModule" ADD COLUMN IF NOT EXISTS "builderData" jsonb;`
    )

    // Fix for legacy moduleId column constraint that causes "Failed to save course"
    await getDrizzleDb().execute(
      sql`ALTER TABLE "CourseLesson" ALTER COLUMN "moduleId" DROP NOT NULL;`
    )

    return NextResponse.json({ success: true, message: 'Raw SQL schema applied successfully!' })
  } catch (error) {
    console.error('Migration failed:', error)
    return NextResponse.json(
      {
        success: false,
        error: String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}
