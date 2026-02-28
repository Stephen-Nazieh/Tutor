import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { eq, and } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { reviewSchedule } from '@/lib/db/schema'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions, request)

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { reviewId, days = 1 } = body

    if (!reviewId) {
      return NextResponse.json(
        { success: false, error: 'Review ID required' },
        { status: 400 }
      )
    }

    const [schedule] = await drizzleDb
      .select()
      .from(reviewSchedule)
      .where(
        and(
          eq(reviewSchedule.id, reviewId),
          eq(reviewSchedule.studentId, session.user.id)
        )
      )
      .limit(1)

    if (!schedule) {
      return NextResponse.json(
        { success: false, error: 'Review schedule not found' },
        { status: 404 }
      )
    }

    const newNextReview = new Date()
    newNextReview.setDate(newNextReview.getDate() + days)

    await drizzleDb
      .update(reviewSchedule)
      .set({
        nextReview: newNextReview,
        updatedAt: new Date(),
      })
      .where(eq(reviewSchedule.id, schedule.id))

    return NextResponse.json({
      success: true,
      data: {
        message: `Review postponed by ${days} day${days !== 1 ? 's' : ''}`,
        newNextReview,
      },
    })
  } catch (error) {
    console.error('Error snoozing review:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to snooze review' },
      { status: 500 }
    )
  }
}
