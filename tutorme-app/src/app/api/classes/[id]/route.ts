import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { clinic } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(req: NextRequest, context: any) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const params = await context?.params
    const { id } = params || {}

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
