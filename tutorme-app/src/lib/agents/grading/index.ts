// Legacy grading module - functionality moved to task submission feedback workflow

export interface QuizAnswer {
  questionId: string
  answer: string | string[]
}

export interface GradingResult {
  questionId: string
  score: number
  maxScore: number
  feedback: string
}

export async function gradeSubmission(): Promise<never> {
  throw new Error('Legacy grading system removed. Use task submission feedback workflow instead.')
}

// Legacy quiz generation removed - use content-generator instead

export async function analyzeQuizPerformance(): Promise<never> {
  throw new Error('Legacy quiz analysis removed.')
}

export async function gradeQuizAnswer(
  _question: string,
  _studentAnswer: QuizAnswer,
  _correctAnswer?: string | string[]
): Promise<GradingResult> {
  throw new Error('Legacy quiz grading removed. Use task submission feedback workflow instead.')
}
