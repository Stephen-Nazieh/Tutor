import { NextResponse } from 'next/server'
import { getDrizzleDb } from '@/lib/db/drizzle'
import { sql } from 'drizzle-orm'

export async function GET() {
  try {
    const res = await getDrizzleDb().execute(
      sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'CourseLesson' AND column_name IN ('tasks', 'assessments', 'homework', 'builderData')`
    )
    return NextResponse.json({ columns: res.rows.map(r => r.column_name) })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
