export const courseOutlineAsModulesPrompt = (params: {
  curriculumText: string
  notesText?: string
  subject?: string
  typicalLessonMinutes?: number
  language?: string
}): string => {
  const mins = params.typicalLessonMinutes ?? 45
  const combinedText = params.notesText
    ? `${params.curriculumText}\n\n--- Notes ---\n${params.notesText}`
    : params.curriculumText
  const content = combinedText.slice(0, 12000)
  return `From the following curriculum/syllabus content, generate a module-based course outline. Requirements:
- Output only a JSON array; each element is a module. No other text.
- Each module has: title (string), description (optional), notes (optional), tasks (optional array of { "title": "task name" }), lessons (required array of { "title": "lesson title", "durationMinutes": ${mins} }).
- Each lesson is one typical class (${mins} minutes). Do not merge multiple lessons into one item.
Example format:
[{"title":"Module 1","description":"...","notes":"...","tasks":[{"title":"Task 1"}],"lessons":[{"title":"Lesson 1","durationMinutes":${mins}}]},{"title":"Module 2","lessons":[{"title":"Lesson 2","durationMinutes":${mins}}]}]

Curriculum content:
${content}`
}
