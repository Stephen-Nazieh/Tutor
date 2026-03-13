export const quizGeneratorPrompt = (params: {
  transcript: string
  grade: number
  weakAreas: string[]
  prereq?: string
  subject?: string
}): string => {
  return `Generate 3 questions based on the following video content:

Video content: ${params.transcript}

Student info:
- Grade: ${params.grade}
- Weak areas: ${params.weakAreas.join(', ')}
- Prerequisite: ${params.prereq || 'fundamental concepts'}

Generate:
Q1: Basic recall (multiple choice)
Q2: Application (short answer, AI-gradable)
Q3: Challenge (connects to prerequisite)

Return valid JSON:
{
  "questions": [
    {
      "type": "multiple_choice",
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "answer": "A"
    },
    {
      "type": "short_answer",
      "question": "Question text",
      "rubric": "Grading criteria"
    },
    {
      "type": "short_answer",
      "question": "Question text",
      "rubric": "Grading criteria"
    }
  ]
}`
}
