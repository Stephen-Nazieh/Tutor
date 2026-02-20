import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

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

    // Get content details
    const content = await prisma.contentItem.findUnique({
      where: { id: contentId },
      select: {
        id: true,
        title: true,
        subject: true,
        description: true,
        transcript: true
      }
    })

    if (!content) {
      return NextResponse.json(
        { success: false, error: 'Content not found' },
        { status: 404 }
      )
    }

    // Get review schedule
    const reviewSchedule = await prisma.reviewSchedule.findFirst({
      where: { studentId, contentId }
    })

    // Get quiz attempts for this content
    const quizAttempts = await prisma.quizAttempt.findMany({
      where: { 
        studentId,
        quiz: {
          contentId
        }
      },
      orderBy: { completedAt: 'desc' },
      take: 1
    })

    // Calculate current retention
    const now = new Date()
    let currentRetention = 70 // Default

    if (reviewSchedule) {
      const lastReview = new Date(reviewSchedule.lastReviewed)
      const hoursSinceLastReview = (now.getTime() - lastReview.getTime()) / (1000 * 60 * 60)
      const retrievability = Math.exp(-hoursSinceLastReview / reviewSchedule.stability)
      currentRetention = Math.round(retrievability * 100)
    }

    // Determine recommended mode based on retention
    let recommendedMode: 'quick' | 'full' | 'quiz' = 'quick'
    if (currentRetention < 50) {
      recommendedMode = 'full'
    } else if (currentRetention < 70) {
      recommendedMode = 'quiz'
    }

    // Generate flashcards from content (simplified - in real app, use AI or structured content)
    const flashcards = generateFlashcardsFromContent(content)

    return NextResponse.json({
      success: true,
      data: {
        id: reviewSchedule?.id || `${studentId}-${contentId}`,
        contentId: content.id,
        contentTitle: content.title,
        subject: content.subject,
        description: content.description,
        currentRetention,
        recommendedMode,
        estimatedTime: recommendedMode === 'quick' ? 5 : recommendedMode === 'full' ? 20 : 15,
        lastQuizScore: quizAttempts[0]?.score || null,
        flashcards
      }
    })

  } catch (error) {
    console.error('Error fetching review session:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch review session' },
      { status: 500 }
    )
  }
}

// Helper to generate flashcards from content
function generateFlashcardsFromContent(content: any) {
  // In a real app, this would parse the transcript/description and generate cards
  // For now, return generic flashcards based on subject
  const subjectFlashcards: Record<string, any[]> = {
    'english': [
      { id: '1', front: 'What is a metaphor?', back: 'A figure of speech comparing two unlike things without using "like" or "as"', difficulty: 'medium' },
      { id: '2', front: 'Define "syntax"', back: 'The arrangement of words and phrases to create well-formed sentences', difficulty: 'hard' },
      { id: '3', front: 'What is alliteration?', back: 'The occurrence of the same letter or sound at the beginning of adjacent words', difficulty: 'easy' }
    ],
    'math': [
      { id: '1', front: 'What is the Pythagorean theorem?', back: 'a² + b² = c², where c is the hypotenuse of a right triangle', difficulty: 'easy' },
      { id: '2', front: 'Define "derivative"', back: 'The rate of change of a function with respect to a variable', difficulty: 'hard' },
      { id: '3', front: 'What is pi (π)?', back: 'The ratio of a circle circumference to its diameter, approximately 3.14159', difficulty: 'easy' }
    ],
    'science': [
      { id: '1', front: 'What is photosynthesis?', back: 'The process by which plants convert light energy into chemical energy', difficulty: 'easy' },
      { id: '2', front: 'State Newton\'s Third Law', back: 'For every action, there is an equal and opposite reaction', difficulty: 'medium' },
      { id: '3', front: 'What is mitosis?', back: 'Cell division that results in two identical daughter cells', difficulty: 'medium' }
    ]
  }

  return subjectFlashcards[content.subject?.toLowerCase()] || subjectFlashcards['science']
}
