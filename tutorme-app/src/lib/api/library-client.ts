export interface LibraryTask {
  id: string
  question: string
  type: 'multiple_choice' | 'short_answer'
  options?: string[]
  correctAnswer?: string
  explanation?: string
  difficulty: string
  subject: string
  topics: string[]
  savedAt: string
  usedCount: number
  isFavorite: boolean
  lastUsed?: string
}

export interface CreateLibraryTaskInput {
  question: string
  type: 'multiple_choice' | 'short_answer'
  options?: string[]
  correctAnswer?: string
  explanation?: string
  difficulty: string
  subject: string
  topics: string[]
}

async function parseJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const message = await res.text()
    throw new Error(message || `Request failed with ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function getLibraryTasks(): Promise<LibraryTask[]> {
  const res = await fetch('/api/library', { cache: 'no-store' })
  const data = await parseJson<{ tasks: LibraryTask[] }>(res)
  return data.tasks
}

export async function saveLibraryTask(input: CreateLibraryTaskInput): Promise<LibraryTask> {
  const res = await fetch('/api/library', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  const data = await parseJson<{ task: LibraryTask }>(res)
  return data.task
}

export async function toggleFavoriteTask(taskId: string): Promise<LibraryTask> {
  const res = await fetch(`/api/library/${taskId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'toggleFavorite' }),
  })
  const data = await parseJson<{ task: LibraryTask }>(res)
  return data.task
}

export async function deleteLibraryTask(taskId: string): Promise<boolean> {
  const res = await fetch(`/api/library/${taskId}`, { method: 'DELETE' })
  const data = await parseJson<{ success: boolean }>(res)
  return data.success
}

export async function incrementTaskUsage(taskId: string): Promise<boolean> {
  const res = await fetch(`/api/library/${taskId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'incrementUsage' }),
  })
  const data = await parseJson<{ success: boolean }>(res)
  return data.success
}
