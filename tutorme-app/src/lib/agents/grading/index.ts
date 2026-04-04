/**
 * ============================================================================
 * GRADING AGENT - Main Implementation
 * ============================================================================
 *
 * UI LOCATIONS:
 * - /tutor/courses/[id]/tasks - "Auto Grade" button
 * - /student/quizzes/[id]/results - Shows AI-generated feedback
 * - /tutor/grading - Batch grading interface
 *
 * This agent automatically grades student submissions.
 */

import { generateWithFallback } from '../orchestrator-llm'
import { Question, StudentAnswer, Student, ProgressData, Quiz, getStudent } from '../shared-data'
import {
  buildShortAnswerGradingPrompt,
  buildEssayGradingPrompt,
  buildMathGradingPrompt,
  buildFeedbackTonePrompt,
  GradingRequest,
  GradingResult,
} from './prompts/grader-prompts'
import { safeJsonParseWithSchema } from '@/lib/ai/json'
import { z } from 'zod'

function tryParseJson<T>(content: string): T | null {
  try {
    return JSON.parse(content) as T
  } catch {
    return null
  }
}

const quizGradeSchema = z.object({
  score: z.number(),
  confidence: z.number(),
  feedback: z.string(),
  explanation: z.string(),
  nextSteps: z.array(z.string()).optional(),
  relatedStruggles: z.array(z.string()).optional(),
})

export interface QuizGradeRequest {
  question: string
  rubric: string
  studentAnswer: string
  maxScore: number
  studentContext?: {
    recentStruggles: Array<{ topic: string; errorType: string; severity: number }>
    masteredTopics: string[]
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading' | 'analytical' | 'mixed'
    currentMood:
      | 'frustrated'
      | 'neutral'
      | 'engaged'
      | 'confident'
      | 'curious'
      | 'anxious'
      | 'bored'
  }
}

export type QuizGradeResult = z.infer<typeof quizGradeSchema> & {
  isPersonalized: boolean
  provider: string
}

function buildQuizGradePrompt(req: QuizGradeRequest): { prompt: string; isPersonalized: boolean } {
  const ctx = req.studentContext
  if (ctx) {
    const contextInfo = `

Student Context:
- Recent struggles: ${ctx.recentStruggles.map(s => s.topic).join(', ') || 'none'}
- Mastered topics: ${ctx.masteredTopics.join(', ') || 'none'}
- Learning style: ${ctx.learningStyle}
- Current mood: ${ctx.currentMood}`

    return {
      isPersonalized: true,
      prompt: `Please grade the student's answer based on the rubric and provide personalized feedback.${contextInfo}

Question: ${req.question}

Rubric: ${req.rubric}

Student Answer: ${req.studentAnswer}

Max Score: ${req.maxScore}

Provide personalized feedback:
1. If student has historical struggles with related topics, explicitly reference them in explanation
2. Adjust explanation based on learning style (visual: use diagrams/image analogies; auditory: use sound/rhythm analogies; reading: provide detailed text; kinesthetic: use hands-on examples)
3. Adjust tone based on current mood (frustrated/anxious: more encouraging; neutral: standard; engaged/confident: more challenging)
4. Provide 1-2 specific next steps

Return JSON:
{
  "score": number (0-${req.maxScore}),
  "confidence": number (0-1),
  "feedback": "Personalized brief feedback referencing student's history",
  "explanation": "Detailed grading explanation adapted to learning style",
  "nextSteps": ["Specific suggestion 1", "Specific suggestion 2"],
  "relatedStruggles": ["Related historical struggle topics"]
}`,
    }
  }

  return {
    isPersonalized: false,
    prompt: `Please grade the student's answer based on the rubric.

Question: ${req.question}

Rubric: ${req.rubric}

Student Answer: ${req.studentAnswer}

Max Score: ${req.maxScore}

Return JSON:
{
  "score": number (0-${req.maxScore}),
  "confidence": number (0-1),
  "feedback": "Brief feedback for student",
  "explanation": "Explanation of grading"
}`,
  }
}

/**
 * Grade a freeform quiz answer (API-facing grading capability).
 *
 * Used by `/api/quiz/grade` to keep grading under the agents layer.
 */
export async function gradeQuizAnswer(request: QuizGradeRequest): Promise<QuizGradeResult> {
  const { prompt, isPersonalized } = buildQuizGradePrompt(request)
  const result = await generateWithFallback(prompt, {
    temperature: 0.3,
    maxTokens: 900,
  })

  const parsed = safeJsonParseWithSchema(result.content, quizGradeSchema, { extract: true })
  if (parsed.data) {
    return { ...parsed.data, isPersonalized, provider: result.provider }
  }

  return {
    score: Math.round(request.maxScore * 0.5),
    confidence: 0.5,
    feedback: 'Your answer has been recorded.',
    explanation: 'Automatic grading failed, will be reviewed manually.',
    nextSteps: [],
    relatedStruggles: [],
    isPersonalized,
    provider: result.provider,
  }
}

export interface BatchGradingRequest {
  quizId: string
  studentId: string
  answers: Map<string, string> // questionId -> answer
}

export interface BatchGradingResult {
  totalScore: number
  maxScore: number
  percentage: number
  gradedAnswers: GradedAnswer[]
  summary: string
  recommendations: string[]
}

export interface GradedAnswer {
  questionId: string
  score: number
  maxScore: number
  isCorrect: boolean
  feedback: string
}

/**
 * Grade a single short answer submission
 *
 * UI FLOW:
 * 1. Student submits quiz /student/quizzes/[id]
 * 2. Or tutor clicks "Auto Grade" in /tutor/courses/[id]/tasks
 * 3. This function called for each short answer/essay
 * 4. Results saved and shown to student
 */
export async function gradeShortAnswer(
  question: Question,
  studentAnswer: string,
  studentId: string
): Promise<GradingResult> {
  const student = await getStudent(studentId)
  if (!student) throw new Error('Student not found')

  const request: GradingRequest = {
    question,
    studentAnswer,
    student,
    maxPoints: question.points,
  }

  const prompt = buildShortAnswerGradingPrompt(request)

  const result = await generateWithFallback(prompt, {
    temperature: 0.3, // Lower for consistent grading
    maxTokens: 1000,
  })

  try {
    const grading = tryParseJson<GradingResult>(result.content)
    if (!grading) throw new Error('Invalid grading JSON')

    // Adjust feedback tone based on performance
    const adjustedFeedback = await adjustFeedbackTone(
      grading.feedback,
      grading.score,
      question.points,
      'Student',
      false
    )

    return {
      ...grading,
      feedback: adjustedFeedback,
    }
  } catch (error) {
    console.error('Failed to parse grading result:', error)
    // Fallback: mark as incorrect with generic feedback
    return {
      score: 0,
      maxScore: question.points,
      isCorrect: false,
      feedback: 'Unable to auto-grade this submission. A tutor will review it.',
      misconceptions: [],
      suggestions: ['Wait for tutor feedback'],
    }
  }
}

/**
 * Grade an essay submission
 *
 * UI: Essay submission in course assignments
 */
export async function gradeEssay(
  essayQuestion: string,
  rubric: string[],
  studentEssay: string,
  maxPoints: number,
  studentId: string
): Promise<{
  totalScore: number
  rubricScores: Array<{ criterion: string; score: number; comment: string }>
  overallFeedback: string
  strengths: string[]
  improvements: string[]
  isPassing: boolean
}> {
  const student = await getStudent(studentId)
  if (!student) throw new Error('Student not found')

  const prompt = buildEssayGradingPrompt(
    essayQuestion,
    rubric,
    studentEssay,
    maxPoints,
    student.currentLevel
  )

  const result = await generateWithFallback(prompt, {
    temperature: 0.4,
    maxTokens: 2000,
  })

  const parsed = tryParseJson<{
    totalScore: number
    rubricScores: Array<{ criterion: string; score: number; comment: string }>
    overallFeedback: string
    strengths: string[]
    improvements: string[]
    isPassing: boolean
  }>(result.content)

  if (parsed) return parsed

  console.error('Failed to parse essay grading:', result.content)
  return {
    totalScore: 0,
    rubricScores: rubric.map(criterion => ({
      criterion,
      score: 0,
      comment: 'Auto-grading failed.',
    })),
    overallFeedback: 'Unable to auto-grade this essay. A tutor will review it.',
    strengths: [],
    improvements: ['Await tutor feedback'],
    isPassing: false,
  }
}

/**
 * Grade a math problem with step checking
 *
 * UI: Math quiz submissions
 */
export async function gradeMathProblem(
  problem: string,
  correctAnswer: string,
  correctSteps: string[],
  studentWork: string,
  maxPoints: number
): Promise<{
  score: number
  stepBreakdown: Array<{ step: number; correct: boolean; feedback: string }>
  finalAnswerCorrect: boolean
  errorType: 'calculation' | 'conceptual' | 'missing_step' | 'none'
  feedback: string
  hints: string[]
}> {
  const prompt = buildMathGradingPrompt(
    problem,
    correctAnswer,
    correctSteps,
    studentWork,
    maxPoints
  )

  const result = await generateWithFallback(prompt, {
    temperature: 0.3,
    maxTokens: 1500,
  })

  const parsed = tryParseJson<{
    score: number
    stepBreakdown: Array<{ step: number; correct: boolean; feedback: string }>
    finalAnswerCorrect: boolean
    errorType: 'calculation' | 'conceptual' | 'missing_step' | 'none'
    feedback: string
    hints: string[]
  }>(result.content)

  if (parsed) return parsed

  console.error('Failed to parse math grading:', result.content)
  return {
    score: 0,
    stepBreakdown: [],
    finalAnswerCorrect: false,
    errorType: 'none',
    feedback: 'Unable to auto-grade this submission. A tutor will review it.',
    hints: ['Try again and show each step clearly.'],
  }
}

/**
 * Adjust feedback tone based on performance
 */
async function adjustFeedbackTone(
  baseFeedback: string,
  score: number,
  maxScore: number,
  studentName: string,
  isStruggling: boolean
): Promise<string> {
  const prompt = buildFeedbackTonePrompt(baseFeedback, score, maxScore, studentName, isStruggling)

  const result = await generateWithFallback(prompt, {
    temperature: 0.5,
    maxTokens: 500,
  })

  return result.content
}

/**
 * Batch grade an entire quiz
 *
 * UI: "Auto Grade All" button in tutor interface
 */
export async function gradeQuizBatch(request: BatchGradingRequest): Promise<BatchGradingResult> {
  const quiz = await getQuiz(request.quizId)
  if (!quiz) throw new Error('Quiz not found')

  const gradedAnswers: GradedAnswer[] = []
  let totalScore = 0
  let maxScore = 0

  // Grade each answer
  for (const [questionId, answer] of request.answers) {
    const question = quiz.questions.find(q => q.id === questionId)
    if (!question) continue

    let graded: GradedAnswer

    if (question.type === 'multiple_choice') {
      // Auto-grade MCQ immediately
      const isCorrect = answer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase()
      graded = {
        questionId,
        score: isCorrect ? question.points : 0,
        maxScore: question.points,
        isCorrect,
        feedback: isCorrect ? 'Correct!' : `The correct answer is: ${question.correctAnswer}`,
      }
    } else {
      // Use AI for short answer/essay
      const result = await gradeShortAnswer(question, answer, request.studentId)
      graded = {
        questionId,
        score: result.score,
        maxScore: question.points,
        isCorrect: result.isCorrect,
        feedback: result.feedback,
      }
    }

    gradedAnswers.push(graded)
    totalScore += graded.score
    maxScore += question.points
  }

  const percentage = (totalScore / maxScore) * 100

  // Generate summary
  const summary = await generateGradingSummary(gradedAnswers, quiz.questions, percentage)

  // Generate recommendations
  const recommendations = await generateRecommendations(
    gradedAnswers,
    quiz.questions,
    request.studentId
  )

  return {
    totalScore,
    maxScore,
    percentage,
    gradedAnswers,
    summary,
    recommendations,
  }
}

/**
 * Generate summary of quiz performance
 */
async function generateGradingSummary(
  gradedAnswers: GradedAnswer[],
  questions: Question[],
  percentage: number
): Promise<string> {
  const correctCount = gradedAnswers.filter(a => a.isCorrect).length
  const totalCount = gradedAnswers.length

  let performance = ''
  if (percentage >= 90) performance = 'excellent'
  else if (percentage >= 70) performance = 'good'
  else if (percentage >= 50) performance = 'needs improvement'
  else performance = 'significant struggles'

  return `You scored ${correctCount} out of ${totalCount} (${percentage.toFixed(1)}%). This is a ${performance} performance.`
}

/**
 * Generate learning recommendations based on quiz results
 */
async function generateRecommendations(
  gradedAnswers: GradedAnswer[],
  questions: Question[],
  studentId: string
): Promise<string[]> {
  // Identify weak topics
  const weakTopics: string[] = []

  gradedAnswers.forEach(answer => {
    if (!answer.isCorrect) {
      const question = questions.find(q => q.id === answer.questionId)
      if (question && !weakTopics.includes(question.difficulty)) {
        weakTopics.push(question.difficulty)
      }
    }
  })

  return [
    'Review the questions you missed',
    'Focus on ' + (weakTopics.join(', ') || 'fundamentals'),
    'Try the practice exercises for these topics',
    'Ask the AI tutor for help with difficult concepts',
  ]
}

// Helper function - need to implement in shared-data.ts
async function getQuiz(quizId: string): Promise<Quiz | null> {
  const { drizzleDb } = await import('@/lib/db/drizzle')
  const { quiz: quizTable } = await import('@/lib/db/schema')
  const { eq } = await import('drizzle-orm')

  const [quizRow] = await drizzleDb
    .select()
    .from(quizTable)
    .where(eq(quizTable.quizId, quizId))
    .limit(1)

  if (!quizRow) return null

  const rawQuestions = ((quizRow as any).questions as any[]) ?? []

  const questions: Question[] = rawQuestions.map((q, idx) => {
    const rawCorrect = (q as any).correctAnswer
    const correctAnswer =
      typeof rawCorrect === 'string'
        ? rawCorrect
        : rawCorrect == null
          ? ''
          : Array.isArray(rawCorrect)
            ? rawCorrect.join(', ')
            : JSON.stringify(rawCorrect)

    const typeValue = (q as any).type
    const type: Question['type'] =
      typeValue === 'multiple_choice' ||
      typeValue === 'short_answer' ||
      typeValue === 'essay' ||
      typeValue === 'math'
        ? typeValue
        : 'short_answer'

    const difficultyValue = (q as any).difficulty
    const difficulty: Question['difficulty'] =
      difficultyValue === 'easy' || difficultyValue === 'medium' || difficultyValue === 'hard'
        ? difficultyValue
        : 'medium'

    return {
      id: (q as any).id ?? `${quizRow.quizId}:q${idx + 1}`,
      type,
      question: String((q as any).question ?? ''),
      options: Array.isArray((q as any).options) ? (q as any).options : undefined,
      correctAnswer,
      explanation: String((q as any).explanation ?? ''),
      points: Number((q as any).points ?? 1),
      difficulty,
    }
  })

  return {
    id: quizRow.quizId,
    lessonId: quizRow.lessonId ?? '',
    title: quizRow.title,
    questions,
    timeLimit: quizRow.timeLimit ?? undefined,
    totalPoints: quizRow.totalPoints,
  }
}
