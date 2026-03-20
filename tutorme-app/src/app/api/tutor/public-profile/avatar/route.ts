import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { profile } from '@/lib/db/schema'
import { saveAvatar } from '@/lib/registration/register-user'

export const POST = withCsrf(
  withAuth(
    async (req: NextRequest, session) => {
      const contentType = req.headers.get('content-type') || ''
      if (!contentType.includes('multipart/form-data')) {
        return NextResponse.json({ error: 'Expected multipart/form-data' }, { status: 400 })
      }

      const formData = await req.formData()
      const file = formData.get('avatar')
      if (!(file instanceof File)) {
        return NextResponse.json({ error: 'Avatar file is required' }, { status: 400 })
      }

      const avatarUrl = await saveAvatar(session.user.id, file)

      const [updated] = await drizzleDb
        .update(profile)
        .set({ avatarUrl })
        .where(eq(profile.userId, session.user.id))
        .returning({ avatarUrl: profile.avatarUrl })

      return NextResponse.json({
        success: true,
        avatarUrl: updated?.avatarUrl ?? avatarUrl,
      })
    },
    { role: 'TUTOR' }
  )
)
