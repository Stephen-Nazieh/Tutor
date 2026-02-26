/**
 * GET /api/curriculums/catalog?subject=english|math
 * Returns curriculum catalog entries for the given subject (for Create Course dropdown).
 * Drizzle ORM.
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq, asc } from 'drizzle-orm'
import { handleApiError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculumCatalog } from '@/lib/db/schema'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const subject = searchParams.get('subject')?.toLowerCase()

    const items = subject
      ? await drizzleDb
          .select()
          .from(curriculumCatalog)
          .where(eq(curriculumCatalog.subject, subject))
          .orderBy(asc(curriculumCatalog.subject), asc(curriculumCatalog.name))
      : await drizzleDb
          .select()
          .from(curriculumCatalog)
          .orderBy(asc(curriculumCatalog.subject), asc(curriculumCatalog.name))

    return NextResponse.json({ curriculums: items })
  } catch (error) {
    return handleApiError(error, 'Failed to load curriculum catalog', 'curriculums/catalog')
  }
}
