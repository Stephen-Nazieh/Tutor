import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(
    req: NextRequest,
    context: any
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const params = await context?.params;
  const { id } = params || {};
        const classItem = await db.clinic.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                subject: true,
                description: true,
                status: true,
                tutorId: true
            }
        })

        if (!classItem) {
            return NextResponse.json({ error: 'Class not found' }, { status: 404 })
        }

        return NextResponse.json({ class: classItem })
    } catch (error) {
        console.error('Failed to fetch class details:', error)
        return NextResponse.json({ error: 'Failed to fetch class details' }, { status: 500 })
    }
}
