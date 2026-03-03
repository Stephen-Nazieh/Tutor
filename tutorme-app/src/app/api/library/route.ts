import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { libraryTask } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'

function mapTask(task: typeof libraryTask.$inferSelect) {
  return {
    id: task.id,
    question: task.question,
    type: task.type as 'multiple_choice' | 'short_answer',
    options: (task.options as string[] | null) ?? undefined,
    correctAnswer: task.correctAnswer ?? undefined,
    explanation: task.explanation ?? undefined,
    difficulty: task.difficulty,
    subject: task.subject,
    topics: (task.topics as string[]) ?? [],
    savedAt: task.createdAt.toISOString(),
    usedCount: task.usageCount,
    isFavorite: task.isFavorite,
    lastUsed: task.lastUsedAt ? task.lastUsedAt.toISOString() : undefined
  }
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ tasks: [] }, { status: 200 })
  }

  try {
    const tasks = await drizzleDb
      .select()
      .from(libraryTask)
      .where(eq(libraryTask.userId, session.user.id))
      .orderBy(desc(libraryTask.isFavorite), desc(libraryTask.usageCount))

    return NextResponse.json({ tasks: tasks.map(mapTask) })
  } catch (error) {
    console.error('Error fetching library tasks:', error)
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let data: any
  try {
    data = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!data?.question || !data?.type || !data?.difficulty || !data?.subject) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const id = crypto.randomUUID()
    await drizzleDb.insert(libraryTask).values({
      id,
      userId: session.user.id,
      question: data.question,
      type: data.type,
      options: data.options ?? [],
      correctAnswer: data.correctAnswer ?? null,
      explanation: data.explanation ?? null,
      difficulty: data.difficulty,
      subject: data.subject,
      topics: data.topics ?? [],
      isFavorite: false,
      usageCount: 0
    })

    const [task] = await drizzleDb.select().from(libraryTask).where(eq(libraryTask.id, id)).limit(1)
    if (!task) {
      return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
    }

    return NextResponse.json({ task: mapTask(task) }, { status: 201 })
  } catch (error) {
    console.error('Error saving task:', error)
    return NextResponse.json({ error: 'Failed to save task' }, { status: 500 })
  }
}
