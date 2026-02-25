/**
 * Public curriculum catalogue API ("curriculums list").
 * GET /api/curriculums/list — returns published curriculums only (no auth).
 * Rate limited per IP. For "my courses" with user progress, use GET /api/curriculum (withAuth) instead.
 *
 * Subject codes: ?subject= is normalized (lowercased). Supported values should match curriculum.subject
 * in DB (e.g. math, english). Aliases below map URL/subject codes to DB values for consistency with
 * dashboard signup links (e.g. /student/subjects/math/courses).
 */
import { NextRequest, NextResponse } from 'next/server'
import { withRateLimit, handleApiError } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import type { Prisma } from '@prisma/client'

const LIST_RATE_LIMIT_MAX = 60 // per minute per IP

/** Map alternate subject codes to canonical DB subject (e.g. mathematics -> math). */
const SUBJECT_ALIAS: Record<string, string> = {
  mathematics: 'math',
  english_language: 'english',
  chinese: 'chinese'
}

type Where = Prisma.CurriculumWhereInput
interface CurriculumWithCounts {
  id: string
  name: string
  subject: string
  description: string | null
  difficulty: string
  estimatedHours: number
  price: unknown
  currency: unknown
  modules: Array<{ _count: { lessons: number } }>
}

export async function GET(req: NextRequest) {
  const { response: rateLimitRes } = await withRateLimit(req, LIST_RATE_LIMIT_MAX)
  if (rateLimitRes) return rateLimitRes

  try {
    const { searchParams } = new URL(req.url)
    const subjectParam = searchParams.get('subject')
    const subject = subjectParam
      ? (SUBJECT_ALIAS[subjectParam.toLowerCase()] ?? subjectParam.toLowerCase())
      : undefined

    const where: Where = {
      isPublished: true
    }
    if (subject) {
      where.subject = subject
    }

    const curriculums = await db.curriculum.findMany({
      where,
      include: {
        _count: {
          select: {
            modules: true,
            enrollments: true
          }
        },
        modules: {
          include: {
            _count: {
              select: {
                lessons: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    const enrichedCurriculums = curriculums.map((c: any) => {
      const totalLessons = c.modules.reduce((sum: number, m: { _count: { lessons: number } }) => sum + m._count.lessons, 0)
      return {
        id: c.id,
        name: c.name,
        subject: c.subject,
        description: c.description,
        difficulty: c.difficulty,
        estimatedHours: c.estimatedHours,
        price: c.price,
        currency: c.currency,
        gradeLevel: c.gradeLevel,
        modulesCount: c._count.modules,
        lessonsCount: totalLessons,
        studentCount: c._count.enrollments,
        createdAt: c.createdAt
      }
    })

    return NextResponse.json({ curriculums: enrichedCurriculums })
  } catch (error) {
    return handleApiError(error, 'Failed to list curriculums', 'curriculums/list')
  }
}
