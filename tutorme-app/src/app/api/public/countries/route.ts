import { NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { course, courseVariant } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  const rows = await drizzleDb
    .select({ country: courseVariant.nationality })
    .from(courseVariant)
    .innerJoin(course, eq(courseVariant.publishedCourseId, course.courseId))
    .where(eq(course.isPublished, true))

  const countries = Array.from(
    new Set(
      rows.map(r => r.country).filter((c): c is string => typeof c === 'string' && !!c.trim())
    )
  ).sort((a, b) => a.localeCompare(b))

  return NextResponse.json({ countries })
}
