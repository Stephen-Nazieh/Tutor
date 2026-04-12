export const courseOutlineFromCoursePrompt = (params: {
  courseText: string
  subject?: string
  typicalLessonMinutes?: number
  language?: string
}): string => {
  const mins = params.typicalLessonMinutes ?? 45
  return `From the following course/syllabus content, generate a detailed course outline. Each outline item must be completable in one typical lesson (${mins} minutes). Do not merge multiple lessons into one item. Output only a JSON array, no other text. Format:
[{"title":"Lesson 1 title","durationMinutes":${mins}},{"title":"Lesson 2 title","durationMinutes":${mins}}]

Course content:
${params.courseText.slice(0, 12000)}`
}
