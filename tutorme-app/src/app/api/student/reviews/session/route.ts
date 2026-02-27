import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { contentItem, reviewSchedule, quizAttempt } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const contentId = searchParams.get('contentId')

    if (!contentId) {
      return NextResponse.json(
        { success: false, error: 'Content ID required' },
        { status: 400 }
      )
    }

    const studentId = session.user.id

    const [content] = await drizzleDb
      .select({
        id: contentItem.id,
        title: contentItem.title,
        subject: contentItem.subject,
        description: contentItem.description,
        transcript: contentItem.transcript,
      })
      .from(contentItem)
      .where(eq(contentItem.id, contentId))
      .limit(1)

    if (!content) {
      return NextResponse.json(
        { success: false, error: 'Content not found' },
        { status: 404 }
      )
    }

    const [reviewScheduleRow] = await drizzleDb
      .select()
      .from(reviewSchedule)
      .where(
        and(
          eq(reviewSchedule.studentId, studentId),
          eq(reviewSchedule.contentId, contentId)
        )
      )
      .limit(1)

    // Quiz in Drizzle has no contentId; get quiz attempts for student and match by quizId->contentId not available.
    // Return last quiz attempt score for this student (any quiz) or null.
    const quizAttemptRows = await drizzleDb
      .select()
      .from(quizAttempt)
      .where(eq(quizAttempt.studentId, studentId))
      .orderBy(desc(quizAttempt.completedAt))
      .limit(1)

    const now = new Date()
    let currentRetention = 70
    if (reviewScheduleRow) {
      const lastReview = new Date(reviewScheduleRow.lastReviewed)
      const hoursSinceLastReview =
        (now.getTime() - lastReview.getTime()) / (1000 * 60 * 60)
      const retrievability = Math.exp(
        -hoursSinceLastReview / reviewScheduleRow.stability
      )
      currentRetention = Math.round(retrievability * 100)
    }

    let recommendedMode: 'quick' | 'full' | 'quiz' = 'quick'
    if (currentRetention < 50) {
      recommendedMode = 'full'
    } else if (currentRetention < 70) {
      recommendedMode = 'quiz'
    }

    const contentForFlashcards = {
      ...content,
      subject: content.subject,
    }
    const flashcards = generateFlashcardsFromContent(contentForFlashcards)

    return NextResponse.json({
      success: true,
      data: {
        id: reviewScheduleRow?.id ?? `${studentId}-${contentId}`,
        contentId: content.id,
        contentTitle: content.title,
        subject: content.subject,
        description: content.description,
        currentRetention,
        recommendedMode,
        estimatedTime:
          recommendedMode === 'quick' ? 5 : recommendedMode === 'full' ? 20 : 15,
        lastQuizScore: quizAttemptRows[0]?.score ?? null,
        flashcards,
      },
    })
  } catch (error) {
    console.error('Error fetching review session:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch review session' },
      { status: 500 }
    )
  }
}

function generateFlashcardsFromContent(content: {
  subject?: string
  [k: string]: unknown
}) {
  const subjectFlashcards: Record<string, any[]> = {
    english: [
      {
        id: '1',
        front: 'What is a metaphor?',
        back: 'A figure of speech comparing two unlike things without using "like" or "as"',
        difficulty: 'medium',
      },
      {
        id: '2',
        front: 'Define "syntax"',
        back: 'The arrangement of words and phrases to create well-formed sentences',
        difficulty: 'hard',
      },
      {
        id: '3',
        front: 'What is alliteration?',
        back: 'The occurrence of the same letter or sound at the beginning of adjacent words',
        difficulty: 'easy',
      },
    ],
    math: [
      {
        id: '1',
        front: 'What is the Pythagorean theorem?',
        back: 'a² + b² = c², where c is the hypotenuse of a right triangle',
        difficulty: 'easy',
      },
      {
        id: '2',
        front: 'Define "derivative"',
        back: 'The rate of change of a function with respect to a variable',
        difficulty: 'hard',
      },
      {
        id: '3',
        front: 'What is pi (π)?',
        back: 'The ratio of a circle circumference to its diameter, approximately 3.14159',
        difficulty: 'easy',
      },
    ],
    science: [
      {
        id: '1',
        front: 'What is photosynthesis?',
        back: 'The process by which plants convert light energy into chemical energy',
        difficulty: 'easy',
      },
      {
        id: '2',
        front: "State Newton's Third Law",
        back: 'For every action, there is an equal and opposite reaction',
        difficulty: 'medium',
      },
      {
        id: '3',
        front: 'What is mitosis?',
        back: 'Cell division that results in two identical daughter cells',
        difficulty: 'medium',
      },
    ],
  }
  return (
    subjectFlashcards[content.subject?.toLowerCase() ?? ''] ??
    subjectFlashcards['science']
  )
}
