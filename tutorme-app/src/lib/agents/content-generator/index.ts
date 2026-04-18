/**
 * ============================================================================
 * CONTENT GENERATOR AGENT - Main Implementation
 * ============================================================================
 *
 * UI LOCATIONS:
 * - /tutor/insights?tab=builder&courseId=[id] (CourseBuilder.tsx) - "Generate Questions" button
 * - /tutor/insights?tab=builder&courseId=[id] - "Generate Lesson Content" button
 * - /admin/content - Content management interface
 *
 * This agent generates educational content: quizzes, lessons, questions.
 */

import { generateWithFallback } from '../orchestrator-llm'
import { Quiz, Question, Course, Student, getCourse, getStudent } from '../shared-data'
import { safeJsonParseWithSchema } from '@/lib/ai/json'
import { z } from 'zod'
import {
  buildQuizGenerationPrompt,
  buildDifficultyAdjustmentPrompt,
  buildLessonContentPrompt,
  buildSimilarQuestionPrompt,
  QuizGenerationRequest,
} from './prompts/quiz-generator'

export interface GeneratedQuiz {
  title: string
  questions: Question[]
  totalPoints: number
  estimatedTime: number
}

export interface GeneratedLesson {
  title: string
  content: string
  keyPoints: string[]
  checkUnderstanding: string[]
  suggestedActivity?: string
}

const transcriptQuizSchema = z.object({
  questions: z.array(
    z.object({
      type: z.enum(['multiple_choice', 'short_answer']),
      question: z.string(),
      options: z.array(z.string()).optional(),
      answer: z.string().optional(),
      rubric: z.string().optional(),
    })
  ),
})

export interface TranscriptQuizRequest {
  transcript: string
  grade: number
  weakAreas: string[]
  prereq?: string
  subject?: string
}

export type TranscriptQuizResult = z.infer<typeof transcriptQuizSchema> & {
  provider: string
}

function buildTranscriptQuizPrompt(params: TranscriptQuizRequest): string {
  return `Generate 3 questions based on the following video content:

Video content: ${params.transcript}

Student info:
- Grade: ${params.grade}
- Weak areas: ${params.weakAreas.join(', ')}
- Prerequisite: ${params.prereq || 'fundamental concepts'}
- Subject: ${params.subject || 'general'}

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

/**
 * Generate a quick, 3-question quiz from a transcript (student-facing).
 *
 * Used by `/api/quiz/generate`.
 */
export async function generateTranscriptQuiz(
  request: TranscriptQuizRequest
): Promise<TranscriptQuizResult> {
  const prompt = buildTranscriptQuizPrompt(request)
  const result = await generateWithFallback(prompt, {
    temperature: 0.7,
    maxTokens: 1500,
  })

  const parsed = safeJsonParseWithSchema(result.content, transcriptQuizSchema, { extract: true })
  if (!parsed.data) {
    throw new Error('Failed to generate valid transcript quiz format')
  }

  return { ...parsed.data, provider: result.provider }
}

/**
 * Generate a complete quiz
 *
 * UI FLOW:
 * 1. Tutor in /tutor/insights?tab=builder&courseId=[id] selects topic
 * 2. Clicks "Generate Questions" button
 * 3. Selects difficulty, number of questions, types
 * 4. This function is called
 * 5. Generated quiz appears in preview panel
 */
export async function generateQuiz(request: QuizGenerationRequest): Promise<GeneratedQuiz> {
  const prompt = buildQuizGenerationPrompt(request)

  const result = await generateWithFallback(prompt, {
    temperature: 0.7,
    maxTokens: 4000, // Quizzes can be long
  })

  try {
    // Parse JSON response
    const questions: Question[] = JSON.parse(result.content)

    // Calculate total points
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0)

    // Estimate time (2 min per multiple choice, 5 min per short answer, 15 min per essay)
    const estimatedTime = questions.reduce((sum, q) => {
      if (q.type === 'multiple_choice') return sum + 2
      if (q.type === 'short_answer') return sum + 5
      if (q.type === 'essay') return sum + 15
      return sum + 3
    }, 0)

    return {
      title: `Quiz: ${request.topic}`,
      questions,
      totalPoints,
      estimatedTime,
    }
  } catch (error) {
    console.error('Failed to parse generated quiz:', error)
    throw new Error('Failed to generate valid quiz format')
  }
}

/**
 * Adjust difficulty of existing question
 *
 * UI: "Make Easier" / "Make Harder" buttons in question editor
 * TRIGGER: Tutor wants to adjust difficulty of generated question
 */
export async function adjustDifficulty(
  question: Question,
  targetDifficulty: 'easy' | 'medium' | 'hard'
): Promise<Question> {
  const prompt = buildDifficultyAdjustmentPrompt(
    JSON.stringify(question),
    question.difficulty,
    targetDifficulty
  )

  const result = await generateWithFallback(prompt, {
    temperature: 0.5,
    maxTokens: 1000,
  })

  try {
    return JSON.parse(result.content)
  } catch {
    throw new Error('Failed to parse adjusted question')
  }
}

/**
 * Generate lesson content
 *
 * UI: "Generate Lesson" button in course builder
 * TRIGGER: Tutor creating new lesson
 */
export async function generateLessonContent(
  topic: string,
  subject: string,
  targetGrade: string,
  duration: number
): Promise<GeneratedLesson> {
  const prompt = buildLessonContentPrompt(topic, subject, targetGrade, duration)

  const result = await generateWithFallback(prompt, {
    temperature: 0.6,
    maxTokens: 3000,
  })

  // Parse the markdown response
  const content = result.content

  // Extract key points (lines starting with - or numbered)
  const keyPointsMatch = content.match(
    /(?:key takeaway|summary|main points?):([\s\S]*?)(?=\n\n|\n#|$)/i
  )
  const keyPoints = keyPointsMatch
    ? keyPointsMatch[1].split('\n').filter(l => l.trim().startsWith('-') || l.trim().match(/^\d\./))
    : []

  // Extract check understanding questions
  const checkMatch = content.match(
    /(?:check your understanding|assessment|quiz):([\s\S]*?)(?=\n\n|\n#|$)/i
  )
  const checkUnderstanding = checkMatch
    ? checkMatch[1].split('\n').filter(l => l.trim().match(/^\d+\./))
    : []

  return {
    title: topic,
    content,
    keyPoints,
    checkUnderstanding,
  }
}

/**
 * Generate similar questions based on example
 *
 * UI: "Generate More Like This" button
 * TRIGGER: Tutor likes a question and wants variations
 */
export async function generateSimilarQuestions(
  exampleQuestion: Question,
  count: number
): Promise<Question[]> {
  const prompt = buildSimilarQuestionPrompt(JSON.stringify(exampleQuestion), count)

  const result = await generateWithFallback(prompt, {
    temperature: 0.8, // Higher for variety
    maxTokens: 2000,
  })

  try {
    return JSON.parse(result.content)
  } catch {
    throw new Error('Failed to parse similar questions')
  }
}

/**
 * Generate personalized practice based on student weaknesses
 *
 * UI: "Personalized Practice" button in student dashboard
 * TRIGGER: Automatic or tutor-initiated for struggling student
 */
export async function generatePersonalizedPractice(
  studentId: string,
  subject: string
): Promise<GeneratedQuiz> {
  // Fetch student's weak areas
  const student = await getStudent(studentId)
  if (!student) throw new Error('Student not found')

  const course = await getCourse(subject, student.grade)

  const prompt = `Generate a personalized practice quiz for ${student.name} in ${subject}.

STUDENT INFO:
- Grade: ${student.grade}
- Level: ${student.currentLevel}
- Learning Style: ${student.learningStyle}

FOCUS AREAS:
Based on their progress, they need practice with these topics.

REQUIREMENTS:
- 5-8 questions
- Mix of their weak areas
- Difficulty: ${student.currentLevel}
- Include hints for ${student.learningStyle} learners

Generate the quiz in JSON format.`

  const result = await generateWithFallback(prompt, {
    temperature: 0.6,
    maxTokens: 2500,
  })

  const questions: Question[] = JSON.parse(result.content)

  return {
    title: `Personalized Practice: ${subject}`,
    questions,
    totalPoints: questions.reduce((sum, q) => sum + q.points, 0),
    estimatedTime: questions.length * 3,
  }
}
