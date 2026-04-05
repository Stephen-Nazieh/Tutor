/**
 * GET /api/curriculums/catalog?category=english|math
 * Returns curriculum catalog entries for the given category (for Create Course dropdown).
 * Drizzle ORM.
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq, asc } from 'drizzle-orm'
import { handleApiError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { courseCatalog } from '@/lib/db/schema'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')?.toLowerCase()

    const items = category
      ? await drizzleDb
          .select()
          .from(courseCatalog)
          .where(eq(courseCatalog.category, category))
          .orderBy(asc(courseCatalog.category), asc(courseCatalog.name))
      : await drizzleDb
          .select()
          .from(courseCatalog)
          .orderBy(asc(courseCatalog.category), asc(courseCatalog.name))

    return NextResponse.json({ curriculums: items })
  } catch (error) {
    return handleApiError(error, 'Failed to load curriculum catalog', 'curriculums/catalog')
  }
}
