import { NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { sql } from 'drizzle-orm'

export async function GET() {
  try {
    await drizzleDb.execute(sql`ALTER TABLE "CourseLesson" ADD COLUMN IF NOT EXISTS "tasks" jsonb;`)
    await drizzleDb.execute(sql`ALTER TABLE "CourseLesson" ADD COLUMN IF NOT EXISTS "assessments" jsonb;`)
    await drizzleDb.execute(sql`ALTER TABLE "CourseLesson" ADD COLUMN IF NOT EXISTS "homework" jsonb;`)
    await drizzleDb.execute(sql`ALTER TABLE "CourseLesson" ADD COLUMN IF NOT EXISTS "builderData" jsonb;`)
    return NextResponse.json({ success: true, message: "Columns added successfully" })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
