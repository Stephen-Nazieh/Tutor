/**
 * Question Bank Tags API
 * 
 * GET /api/tutor/question-bank/tags - Get all unique tags for the tutor
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const GET = withAuth(async (req: NextRequest, session) => {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search')
    
    // Get all questions for this tutor
    const where: any = { tutorId: session.user.id }
    
    // If search is provided, filter tags
    if (search) {
        where.tags = { has: search }
    }
    
    const questions = await db.questionBankItem.findMany({
        where,
        select: { tags: true }
    })
    
    // Extract and deduplicate tags
    const allTags = questions.flatMap(q => q.tags)
    const uniqueTags = [...new Set(allTags)].sort()
    
    // Get usage count for each tag
    const tagCounts = uniqueTags.map(tag => ({
        tag,
        count: questions.filter(q => q.tags.includes(tag)).length
    }))
    
    return NextResponse.json({
        tags: uniqueTags,
        tagCounts
    })
}, { role: 'TUTOR' })
