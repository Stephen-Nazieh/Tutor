import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession as liveSessionTable } from '@/lib/db/schema'
import { notify } from '@/lib/notifications/notify'

export const POST = withAuth(
  async (req, sessionObj, context) => {
    const studentId = sessionObj.user.id
    
    let sessionId = ''
    try {
      const params = await context?.params
      sessionId = (params as any)?.id
    } catch (e) {}
    
    if (!sessionId) {
      const parts = req.nextUrl.pathname.split('/').filter(Boolean)
      const reqIdx = parts.lastIndexOf('request-materials')
      if (reqIdx > 0) {
        sessionId = parts[reqIdx - 1]
      }
    }

    // Verify session
    const [session] = await drizzleDb
      .select()
      .from(liveSessionTable)
      .where(eq(liveSessionTable.sessionId, sessionId))
      .limit(1)

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    if (!session.tutorId) {
      return NextResponse.json({ error: 'No tutor assigned to this session' }, { status: 400 })
    }

    // Send notification to tutor
    try {
      const studentName = sessionObj.user.name || 'A student'
      const sessionTitle = session.title || 'a session'

      await notify({
        userId: session.tutorId,
        type: 'class',
        title: 'Material Request',
        message: `${studentName} has requested materials for the passed session "${sessionTitle}".`,
        actionUrl: `/tutor/insights`,
      })

      return NextResponse.json({ success: true, message: 'Request sent' })
    } catch (err) {
      console.error('Failed to notify tutor:', err)
      return NextResponse.json({ error: 'Failed to send request' }, { status: 500 })
    }
  },
  { role: 'STUDENT' }
)
