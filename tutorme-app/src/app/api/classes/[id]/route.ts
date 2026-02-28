import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { clinic } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(req: NextRequest, context?: { params?: Promise<Record<string, string | string[]>> | Record<string, string | string[]> }) {
  try {
    const session = await getServerSession(authOptions, req)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const id = await getParamAsync(context?.params, 'id')
    if (!id) {
      return NextResponse.json({ error: 'Class ID required' }, { status: 400 })
    }

    const [classItem] = await drizzleDb
      .select({
        id: clinic.id,
        title: clinic.title,
        subject: clinic.subject,
        description: clinic.description,
        status: clinic.status,
        tutorId: clinic.tutorId,
      })
      .from(clinic)
      .where(eq(clinic.id, id))
      .limit(1)

    if (!classItem) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 })
    }

    return NextResponse.json({ class: classItem })
  } catch (error) {
    console.error('Failed to fetch class details:', error)
    return NextResponse.json(
      { error: 'Failed to fetch class details' },
      { status: 500 }
    )
  }
}
