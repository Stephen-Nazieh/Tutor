/**
 * API endpoint to get tutors by subject
 * GET /api/tutors/by-subject?subject=math
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db as prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const subjectCode = searchParams.get('subject')

    if (!subjectCode) {
      return NextResponse.json({ error: 'Subject code required' }, { status: 400 })
    }

    // Find tutors who teach this subject
    // We look for tutors who have courses/curriculums for this subject
    const tutors = await prisma.user.findMany({
      where: {
        role: 'TUTOR',
        liveSessions: {
          some: {
            subject: {
              equals: subjectCode,
              mode: 'insensitive'
            }
          }
        }
      },
      select: {
        id: true,
        profile: {
          select: {
            name: true,
            avatarUrl: true,
            bio: true,
          }
        },
        // Get tutor stats from their sessions
        liveSessions: {
          where: {
            status: 'completed'
          },
          select: {
            id: true,
            _count: {
              select: {
                participants: true
              }
            }
          }
        },
        // Get average rating from feedback
        receivedFeedback: {
          select: {
            rating: true
          }
        }
      },
      take: 20
    })

    // Format tutor data
    const formattedTutors = tutors.map((tutor: typeof tutors[0]) => {
      const ratings = tutor.receivedFeedback.map((f: typeof tutor.receivedFeedback[0]) => f.rating).filter((r: number | null): r is number => r !== null)
      const avgRating = ratings.length > 0 
        ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length 
        : 0
      
      const totalStudents = tutor.liveSessions.reduce((sum: number, session: typeof tutor.liveSessions[0]) => 
        sum + session._count.participants, 0
      )
      
      return {
        id: tutor.id,
        name: tutor.profile?.name || 'Unknown Tutor',
        avatar: tutor.profile?.avatarUrl,
        bio: tutor.profile?.bio || `Experienced ${subjectCode} tutor`,
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: ratings.length,
        hourlyRate: null, // Can be added to Profile model later
        currency: 'SGD',
        nextAvailableSlot: null, // Can be fetched from availability API
        totalStudents,
        totalClasses: tutor.liveSessions.length
      }
    })

    // Sort by rating, then by number of students
    formattedTutors.sort((a: typeof formattedTutors[0], b: typeof formattedTutors[0]) => {
      if (b.rating !== a.rating) return b.rating - a.rating
      return b.totalStudents - a.totalStudents
    })

    return NextResponse.json({ tutors: formattedTutors })
  } catch (error) {
    console.error('Error fetching tutors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tutors' },
      { status: 500 }
    )
  }
}
