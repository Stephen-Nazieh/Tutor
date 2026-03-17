import { generateWithFallback } from '@/lib/agents'
import { safeJsonParseWithSchema } from '@/lib/ai/json'
import { z } from 'zod'

export interface ConvertToEditableRequest {
  type: 'curriculum' | 'notes'
  rawText: string
  language?: string
}

export async function convertToEditable(
  params: ConvertToEditableRequest
): Promise<{ editable: string; provider: string }> {
  const typeLabel = params.type === 'curriculum' ? 'curriculum/syllabus' : 'teaching notes'
  const prompt = `Convert the following uploaded ${typeLabel} into a clean, well-structured editable text. Keep all important information. Use headings, lists, and paragraphs. Do not add a schedule or lesson lengths - only structure the content. Output plain text only.

Uploaded content:
${params.rawText.slice(0, 12000)}`

  const result = await generateWithFallback(prompt, { temperature: 0.3, maxTokens: 4000 })
  return { editable: result.content.trim(), provider: result.provider }
}

export interface ConvertTopicsToEditableRequest {
  topicsListText: string
  subject?: string
  language?: string
}

export async function convertTopicsToEditable(
  params: ConvertTopicsToEditableRequest
): Promise<{ editable: string; provider: string }> {
  const prompt = `The user uploaded a list of topics. Expand it into editable "Edit Topics" text: each topic as a short section with a 1-2 sentence description, so the tutor can edit later. Keep the order. Output plain text only.

Topics list:
${params.topicsListText.slice(0, 8000)}`
  const result = await generateWithFallback(prompt, { temperature: 0.3, maxTokens: 4000 })
  return { editable: result.content.trim(), provider: result.provider }
}

const lessonSchema = z.object({
  title: z.string(),
  durationMinutes: z.number().optional(),
})

const moduleSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  notes: z.string().optional(),
  tasks: z.array(z.object({ title: z.string() })).optional(),
  lessons: z.array(lessonSchema),
})

const outlineSchema = z.array(lessonSchema)
const outlineModulesSchema = z.array(moduleSchema)

export type LessonItem = { title: string; durationMinutes: number }
export type ModuleItem = {
  title: string
  description?: string
  notes?: string
  tasks?: { title: string }[]
  lessons: LessonItem[]
}

function normalizeLessons(raw: Array<z.infer<typeof lessonSchema>>, typicalLessonMinutes: number): LessonItem[] {
  return raw.map((l) => ({
    title: l.title || 'Lesson',
    durationMinutes: typeof l.durationMinutes === 'number' ? l.durationMinutes : typicalLessonMinutes,
  }))
}

export interface CourseOutlineFromCurriculumRequest {
  curriculumText: string
  subject?: string
  typicalLessonMinutes: number
  language?: string
}

export async function generateCourseOutlineFromCurriculum(
  params: CourseOutlineFromCurriculumRequest
): Promise<{ outline: LessonItem[]; provider: string }> {
  const mins = params.typicalLessonMinutes ?? 45
  const prompt = `From the following curriculum/syllabus content, generate a detailed course outline. Each outline item must be completable in one typical lesson (${mins} minutes). Do not merge multiple lessons into one item. Output only a JSON array, no other text. Format:
[{"title":"Lesson 1 title","durationMinutes":${mins}},{"title":"Lesson 2 title","durationMinutes":${mins}}]

Curriculum content:
${params.curriculumText.slice(0, 12000)}`

  const result = await generateWithFallback(prompt, {
    temperature: 0.4,
    maxTokens: 3000,
    skipCache: true,
  })

  const parsed = safeJsonParseWithSchema(result.content, outlineSchema, { extract: true })
  const outline = parsed.data ? normalizeLessons(parsed.data, mins) : []
  return { outline, provider: result.provider }
}

export interface CourseOutlineAsModulesRequest {
  curriculumText: string
  notesText?: string
  subject?: string
  typicalLessonMinutes: number
  language?: string
}

export async function generateCourseOutlineAsModules(
  params: CourseOutlineAsModulesRequest
): Promise<{ modules: ModuleItem[]; outline: LessonItem[]; provider: string }> {
  const mins = params.typicalLessonMinutes ?? 45
  const combinedText = params.notesText
    ? `${params.curriculumText}\n\n--- Notes ---\n${params.notesText}`
    : params.curriculumText
  const content = combinedText.slice(0, 12000)

  const prompt = `From the following curriculum/syllabus content, generate a module-based course outline. Requirements:
- Output only a JSON array; each element is a module. No other text.
- Each module has: title (string), description (optional), notes (optional), tasks (optional array of { "title": "task name" }), lessons (required array of { "title": "lesson title", "durationMinutes": ${mins} }).
- Each lesson is one typical class (${mins} minutes). Do not merge multiple lessons into one item.
Example format:
[{"title":"Module 1","description":"...","notes":"...","tasks":[{"title":"Task 1"}],"lessons":[{"title":"Lesson 1","durationMinutes":${mins}}]},{"title":"Module 2","lessons":[{"title":"Lesson 2","durationMinutes":${mins}}]}]

Curriculum content:
${content}`

  const result = await generateWithFallback(prompt, {
    temperature: 0.4,
    maxTokens: 4000,
    skipCache: true,
  })

  const parsed = safeJsonParseWithSchema(result.content, outlineModulesSchema, { extract: true })
  const modules: ModuleItem[] = parsed.data
    ? parsed.data.map((m) => ({
        title: m.title,
        description: m.description,
        notes: m.notes,
        tasks: m.tasks?.length ? m.tasks : undefined,
        lessons: normalizeLessons(m.lessons, mins),
      }))
    : []

  const outline = modules.flatMap((m) => m.lessons)
  return { modules, outline, provider: result.provider }
}

