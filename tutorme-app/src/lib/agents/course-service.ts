import { generateWithFallback } from './orchestrator-llm'

export interface CourseDescriptionRequest {
  subject: string
  gradeLevel?: string
  difficulty?: string
}

function buildCourseDescriptionPrompt(params: CourseDescriptionRequest): string {
  const subjectLabel = params.subject || 'this subject'
  const grade = params.gradeLevel || 'all levels'
  const difficulty = params.difficulty || 'intermediate'
  return `Write a short, engaging course description (1-3 sentences) for a ${subjectLabel} course. Target audience: ${grade}, ${difficulty} level. Describe what students will learn and the course focus. Output only the description text, no labels or quotes.`
}

export async function generateCourseDescription(
  params: CourseDescriptionRequest
): Promise<{ description: string; provider: string }> {
  const prompt = buildCourseDescriptionPrompt(params)
  const result = await generateWithFallback(prompt, {
    temperature: 0.6,
    maxTokens: 200,
    skipCache: true,
  })
  return { description: (result.content || '').trim(), provider: result.provider }
}
