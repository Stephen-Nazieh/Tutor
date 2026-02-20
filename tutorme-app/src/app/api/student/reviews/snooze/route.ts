import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
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

    // Find the review schedule
    const schedule = await prisma.reviewSchedule.findFirst({
      where: { 
        id: reviewId,
        studentId: session.user.id
      }
    })

    if (!schedule) {
      return NextResponse.json(
        { success: false, error: 'Review schedule not found' },
        { status: 404 }
      )
    }

    // Update next review date
    const newNextReview = new Date()
    newNextReview.setDate(newNextReview.getDate() + days)

    await prisma.reviewSchedule.update({
      where: { id: schedule.id },
      data: {
        nextReview: newNextReview,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        message: `Review postponed by ${days} day${days !== 1 ? 's' : ''}`,
        newNextReview
      }
    })

  } catch (error) {
    console.error('Error snoozing review:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to snooze review' },
      { status: 500 }
    )
  }
}
