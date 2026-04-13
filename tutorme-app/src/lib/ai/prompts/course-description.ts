export const courseDescriptionFromSubjectPrompt = (params: {
  subject: string
  difficulty?: string
}): string => {
  const subjectLabel = params.subject || 'this subject'
  const difficulty = params.difficulty || 'intermediate'
  return `Write a short, engaging course description (1-3 sentences) for a ${subjectLabel} course. Target audience: ${difficulty} level. Describe what students will learn and the course focus. Output only the description text, no labels or quotes.`
}
