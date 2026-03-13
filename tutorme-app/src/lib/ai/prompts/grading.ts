export const gradingPrompt = (params: {
  question: string
  rubric: string
  studentAnswer: string
  maxScore: number
}): string => {
  return `Please grade the student's answer based on the rubric.

Question: ${params.question}

Rubric: ${params.rubric}

Student Answer: ${params.studentAnswer}

Max Score: ${params.maxScore}

Return JSON:
{
  "score": number (0-${params.maxScore}),
  "confidence": number (0-1),
  "feedback": "Brief feedback for student",
  "explanation": "Explanation of grading"
}`
}
