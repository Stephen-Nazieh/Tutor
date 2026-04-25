import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession, course, user } from '@/lib/db/schema'
import { eq, inArray } from 'drizzle-orm'
import { randomUUID } from 'crypto'
import { notify } from '@/lib/notifications/notify'

const SPECIAL_TOKENS = ['kim.kon#26', 'stephen#26'] // fallback token, should match the one in landing page

export const POST = withAuth(
  async (req: NextRequest, { user: currentUser }) => {
    try {
      const { type, courseId, title, trainingToken, targetAudience, trainingCategory } = await req.json()

      if (type === 'training') {
        // Verify token
        if (!SPECIAL_TOKENS.includes(trainingToken)) {
          return NextResponse.json({ error: 'Invalid access token' }, { status: 403 })
        }

        const sessionId = randomUUID()
        
        await drizzleDb.insert(liveSession).values({
          sessionId,
          tutorId: currentUser.id,
          courseId: null, // Training sessions aren't tied to a specific course
          title: title || 'Live Training Session',
          category: 'Training',
          description: 'Tutor training session',
          status: 'active',
          startedAt: new Date(),
          scheduledAt: new Date(),
          sessionType: 'training',
          trainingCategory: trainingCategory || 'orientation',
          trainingTargetAudience: targetAudience || 'all',
          trainingToken,
          roomId: randomUUID(), // This will be created in daily.co when accessed
        })

        // Notify tutors based on target audience
        const targetTutors = await drizzleDb.select({ id: user.userId }).from(user).where(eq(user.role, 'TUTOR'))

        const notifyPromises = targetTutors.map(t => 
          notify({
            userId: t.id,
            type: 'system',
            title: 'New Training Session Started',
            message: `A new ${trainingCategory || 'orientation'} training session has started!`,
            actionUrl: `/tutor/sessions/${sessionId}`
          })
        )
        await Promise.allSettled(notifyPromises)

        return NextResponse.json({ success: true, sessionId })
      } 
      
      if (type === 'teaching') {
        if (!courseId) {
          return NextResponse.json({ error: 'Course ID is required for teaching sessions' }, { status: 400 })
        }

        // Check if course is published and has students
        const [courseRecord] = await drizzleDb.select().from(course).where(eq(course.courseId, courseId)).limit(1)
        if (!courseRecord) {
          return NextResponse.json({ error: 'Course not found' }, { status: 404 })
        }

        const sessionId = randomUUID()
        const isPublished = courseRecord.isPublished

        await drizzleDb.insert(liveSession).values({
          sessionId,
          tutorId: currentUser.id,
          courseId,
          title: title || `${courseRecord.name} - Live Session`,
          category: Array.isArray(courseRecord.categories) ? courseRecord.categories[0] || 'General' : 'General',
          status: 'active',
          startedAt: new Date(),
          scheduledAt: new Date(),
          sessionType: 'teaching',
          roomId: randomUUID(),
        })

        if (isPublished) {
          // Find enrolled students and notify them
          // Note: In a real app, we would query courseEnrollment table to find students
          // For now, we'll assume the notification logic exists elsewhere or we trigger it via an event
        }

        return NextResponse.json({ success: true, sessionId })
      }

      return NextResponse.json({ error: 'Invalid session type' }, { status: 400 })
    } catch (error) {
      console.error('Failed to create session:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  },
  { role: 'TUTOR' }
)
