/**
 * GET /api/curriculums/catalog?subject=english|math
 * Returns curriculum catalog entries for the given subject (for Create Course dropdown).
 */

import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const subject = searchParams.get('subject')?.toLowerCase()

    const where = subject ? { subject } : {}
    const items = await db.curriculumCatalog.findMany({
      where,
      orderBy: [{ subject: 'asc' }, { name: 'asc' }],
    })

    return NextResponse.json({ curriculums: items })
  } catch (error) {
    return handleApiError(error, 'Failed to load curriculum catalog', 'curriculums/catalog')
  }
}
