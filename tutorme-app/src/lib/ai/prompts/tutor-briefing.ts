export const tutorBriefingPrompt = (params: {
  studentAttempts: Array<{
    studentId: string
    score: number
    concept: string
  }>
  recentQuizzes: Array<{
    quizId: string
    averageScore: number
    weakConcepts: string[]
  }>
  studentNames?: Record<string, string>
}): string => {
  const data = JSON.stringify({
    attempts: params.studentAttempts,
    quizzes: params.recentQuizzes,
  })

  return `Summarize for tutor in 3 bullet points:

1. What % of enrolled students struggled with which concept
2. Specific student names needing attention (top 3)
3. Suggested opening line for class

Data: ${data}

Be concise and actionable.`
}
