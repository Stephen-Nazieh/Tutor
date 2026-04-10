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

export async function gradeQuizAnswer(_params: {
  question: string
  rubric: string
  studentAnswer: string
  maxScore: number
  studentId?: string
}): Promise<{
  score: number
  maxScore: number
  confidence: number
  feedback: string
  explanation: string
  nextSteps: string[]
  relatedStruggles: string[]
  provider: string
  isPersonalized: boolean
}> {
  throw new Error('Legacy quiz grading removed. Use task submission feedback workflow instead.')
}

export async function gradeEssay(
  _topic: string,
  _criteria: string[],
  _submission: string,
  _maxScore: number,
  _studentId?: string
): Promise<{
  totalScore: number
  isPassing: boolean
  overallFeedback: string
}> {
  throw new Error('Legacy essay grading removed. Use task submission feedback workflow instead.')
}

export async function gradeMathProblem(
  _problem: string,
  _correctAnswer: string,
  _steps: string[],
  _studentAnswer: string,
  _maxScore: number
): Promise<{
  score: number
  finalAnswerCorrect: boolean
  feedback: string
}> {
  throw new Error('Legacy math grading removed. Use task submission feedback workflow instead.')
}

export async function gradeQuizBatch(_params: {
  quizId: string
  studentId: string
  answers: Map<string, string>
}): Promise<{
  totalScore: number
  maxScore: number
  percentage: number
  gradedAnswers: unknown[]
  summary: string
}> {
  throw new Error(
    'Legacy quiz batch grading removed. Use task submission feedback workflow instead.'
  )
}
