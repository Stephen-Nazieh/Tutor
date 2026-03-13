import { query } from '../adapters/db/drizzle'

export interface CurriculumModule {
  id: string
  title: string
  description: string | null
  order: number
}

export interface CurriculumLesson {
  id: string
  moduleId: string
  title: string
  description: string | null
  duration: number
  difficulty: string
  order: number
}

export interface CurriculumData {
  id: string
  subject: string
  name: string
  modules: CurriculumModule[]
  lessons: CurriculumLesson[]
}

export async function getCurriculum(subject: string): Promise<CurriculumData | null> {
  const curriculum = await query<{ id: string; subject: string; name: string }>(
    `SELECT id, subject, name FROM "Curriculum"
     WHERE subject = $1 AND "isPublished" = true
     ORDER BY "updatedAt" DESC
     LIMIT 1`,
    [subject]
  )

  if (!curriculum[0]) return null

  const modules = await query<CurriculumModule>(
    `SELECT id, title, description, "order" FROM "CurriculumModule"
     WHERE "curriculumId" = $1
     ORDER BY "order" ASC`,
    [curriculum[0].id]
  )

  const lessons = await query<CurriculumLesson>(
    `SELECT id, "moduleId", title, description, duration, difficulty, "order"
     FROM "CurriculumLesson"
     WHERE "moduleId" = ANY($1::text[])
     ORDER BY "order" ASC`,
    [modules.map((m) => m.id)]
  )

  return {
    ...curriculum[0],
    modules,
    lessons,
  }
}
