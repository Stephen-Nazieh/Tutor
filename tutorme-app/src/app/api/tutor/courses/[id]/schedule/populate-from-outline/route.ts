/**
 * POST /api/tutor/courses/[id]/schedule/populate-from-outline
 * Fill class schedule from course outline (one slot per outline item). Tutor-only.
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { course } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const POST = withCsrf(
  withAuth(
    async (req, session, context) => {
      const id = await getParamAsync(context?.params, 'id')
      if (!id) return NextResponse.json({ error: 'Course ID required' }, { status: 400 })

      const [courseRow] = await drizzleDb
        .select({ schedule: course.schedule })
        .from(course)
        .where(eq(course.courseId, id))
      if (!courseRow) throw new NotFoundError('Course not found')

      // Note: courseMaterials column doesn't exist - outline generation needs to be reimplemented
      // For now, return an error suggesting manual schedule creation
      return NextResponse.json(
        { error: 'Outline-based schedule population is not available. Please create schedule manually.' },
        { status: 400 }
      )

      // Code below is unreachable due to early return above
      // Kept for reference when reimplementing outline-based schedule population
    },
    { role: 'TUTOR' }
  )
)
