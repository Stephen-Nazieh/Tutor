// @ts-nocheck
/**
 * Question Bank Tags API
 *
 * GET /api/tutor/question-bank/tags - Get all unique tags for the tutor
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { questionBankItem } from '@/lib/db/schema'
import { eq, and, sql } from 'drizzle-orm'

export const GET = withAuth(async (req: NextRequest, session) => {
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search')

  const conditions = [eq(questionBankItem.tutorId, session.user.id)]
  if (search) {
    conditions.push(sql`${search} = ANY(${questionBankItem.tags})`)
  }

  const rows = await drizzleDb
    .select({ tags: questionBankItem.tags })
    .from(questionBankItem)
    .where(and(...conditions))

  const allTags = rows.flatMap((q) => q.tags)
  const uniqueTags = [...new Set(allTags)].sort()

  const tagCounts = uniqueTags.map((tag) => ({
    tag,
    count: rows.filter((q) => q.tags.includes(tag)).length,
  }))

  return NextResponse.json({
    tags: uniqueTags,
    tagCounts,
  })
}, { role: 'TUTOR' })
