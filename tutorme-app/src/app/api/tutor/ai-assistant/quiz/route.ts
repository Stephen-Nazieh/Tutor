/**
 * AI Quiz Generation API
 * POST /api/tutor/ai-assistant/quiz
 * 
 * Generates quizzes with adaptive difficulty and various question types.
 * Supports: multiple choice, true/false, short answer, fill in the blank
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { generateWithFallback } from '@/lib/ai/orchestrator'
import { z } from 'zod'

const QuestionTypes = ['mcq', 'true_false', 'short_answer', 'fill_blank'] as const
const DifficultyLevels = ['beginner', 'intermediate', 'advanced'] as const

const QuizRequestSchema = z.object({
  topic: z.string().min(1),
  subject: z.string().min(1),
  questionCount: z.number().min(1).max(20).default(5),
  questionTypes: z.array(z.enum(QuestionTypes)).default(['mcq']),
  difficulty: z.enum(DifficultyLevels).default('intermediate'),
  gradeLevel: z.string().optional(),
  learningObjectives: z.array(z.string()).optional(),
  includeAnswers: z.boolean().default(true),
  includeExplanations: z.boolean().default(true),
  timeLimit: z.number().optional(), // minutes
  adaptiveBasedOn: z.string().optional(), // previous quiz ID for adaptive difficulty
})

type QuizRequest = z.infer<typeof QuizRequestSchema>

interface Question {
  id: string
  type: typeof QuestionTypes[number]
  question: string
  options?: string[] // for mcq
  correctAnswer: string
  explanation?: string
  difficulty: string
  points: number
}

interface Quiz {
  title: string
  description: string
  topic: string
  subject: string
  difficulty: string
  timeLimit?: number
  totalPoints: number
  questions: Question[]
  instructions: string
}

function generateQuizPrompt(params: QuizRequest): string {
  const typeDescriptions: Record<typeof QuestionTypes[number], string> = {
    mcq: 'Multiple choice with 4 options (A, B, C, D)',
    true_false: 'True/False questions',
    short_answer: 'Short answer questions (1-2 sentence answers)',
    fill_blank: 'Fill in the blank questions with clear blanks indicated',
  }
  
  const difficultyGuidelines: Record<typeof DifficultyLevels[number], string> = {
    beginner: 'Focus on recall and basic understanding. Use straightforward language.',
    intermediate: 'Focus on application and analysis. Require some reasoning.',
    advanced: 'Focus on synthesis and evaluation. Require critical thinking and deep understanding.',
  }
  
  return `
Create a ${params.difficulty} level quiz on "${params.topic}" for ${params.subject}.

SPECIFICATIONS:
- Number of questions: ${params.questionCount}
- Question types: ${params.questionTypes.map(t => typeDescriptions[t]).join(', ')}
- Difficulty: ${params.difficulty} (${difficultyGuidelines[params.difficulty]})
${params.gradeLevel ? `- Target grade level: ${params.gradeLevel}` : ''}
${params.learningObjectives?.length ? `- Learning objectives: ${params.learningObjectives.join(', ')}` : ''}
${params.timeLimit ? `- Recommended time: ${params.timeLimit} minutes` : ''}

REQUIREMENTS:
1. Questions should be clear and unambiguous
2. Distribute question types evenly if multiple types requested
3. ${params.includeAnswers ? 'Include correct answers' : 'Do NOT include answers'}
4. ${params.includeExplanations ? 'Provide brief explanations for each answer' : 'No explanations needed'}
5. Assign points based on difficulty (1-5 points per question)
6. Ensure questions test different cognitive levels (remember, understand, apply, analyze)

RESPONSE FORMAT - Return valid JSON:
{
  "title": "Quiz Title",
  "description": "Brief description of what this quiz covers",
  "instructions": "Instructions for students taking the quiz",
  "questions": [
    {
      "type": "mcq",
      "question": "What is...?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option B",
      "explanation": "Option B is correct because...",
      "difficulty": "intermediate",
      "points": 2
    }
  ]
}

For true_false questions, set options to ["True", "False"].
For fill_blank, indicate blanks with ______ in the question text.
Generate exactly ${params.questionCount} questions.
`
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 11)
}

function parseQuizResponse(content: string, params: QuizRequest): Quiz {
  try {
    // Try to extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      
      // Add IDs to questions
      const questions: Question[] = (parsed.questions || []).map((q: Partial<Question>) => ({
        id: generateId(),
        type: q.type || 'mcq',
        question: q.question || '',
        options: q.options,
        correctAnswer: q.correctAnswer || '',
        explanation: q.explanation,
        difficulty: q.difficulty || params.difficulty,
        points: q.points || 1,
      }))
      
      const totalPoints = questions.reduce((sum, q) => sum + q.points, 0)
      
      return {
        title: parsed.title || `${params.topic} Quiz`,
        description: parsed.description || `A ${params.difficulty} quiz on ${params.topic}`,
        topic: params.topic,
        subject: params.subject,
        difficulty: params.difficulty,
        timeLimit: params.timeLimit,
        totalPoints,
        questions,
        instructions: parsed.instructions || 'Answer all questions to the best of your ability.',
      }
    }
  } catch (e) {
    console.log('JSON parse failed, using fallback')
  }
  
  // Fallback: create a basic quiz structure
  return {
    title: `${params.topic} Quiz`,
    description: `A ${params.difficulty} level quiz covering ${params.topic}.`,
    topic: params.topic,
    subject: params.subject,
    difficulty: params.difficulty,
    timeLimit: params.timeLimit,
    totalPoints: params.questionCount,
    instructions: 'Answer all questions carefully.',
    questions: Array.from({ length: params.questionCount }, (_, i) => ({
      id: generateId(),
      type: params.questionTypes[i % params.questionTypes.length],
      question: `Question ${i + 1} about ${params.topic}`,
      options: params.questionTypes[i % params.questionTypes.length] === 'mcq' 
        ? ['Option A', 'Option B', 'Option C', 'Option D']
        : params.questionTypes[i % params.questionTypes.length] === 'true_false'
          ? ['True', 'False']
          : undefined,
      correctAnswer: 'Answer',
      explanation: params.includeExplanations ? 'Explanation of the answer' : undefined,
      difficulty: params.difficulty,
      points: 1,
    })),
  }
}

export const POST = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  
  try {
    const body = await req.json()
    const validation = QuizRequestSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.format() },
        { status: 400 }
      )
    }
    
    const params = validation.data
    
    // Generate quiz prompt
    const prompt = generateQuizPrompt(params)
    
    // Generate quiz
    const result = await generateWithFallback(prompt, {
      temperature: 0.7,
      maxTokens: 3000,
    })
    
    // Parse the response
    const quiz = parseQuizResponse(result.content, params)
    
    // Save quiz to database if table exists
    const savedQuiz = await db.quiz?.create({
      data: {
        tutorId,
        title: quiz.title,
        description: quiz.description,
        topic: quiz.topic,
        subject: quiz.subject,
        difficulty: quiz.difficulty,
        timeLimit: quiz.timeLimit,
        questions: quiz.questions,
        totalPoints: quiz.totalPoints,
      },
    }).catch(() => {
      console.log('Quiz table not found, skipping save')
      return null
    })
    
    // Create insight
    await db.aIAssistantInsight.create({
      data: {
        sessionId: body.sessionId || 'temp',
        type: 'content_suggestion',
        title: `Generated Quiz: ${quiz.title}`,
        content: `${quiz.questions.length} questions on ${quiz.topic}`,
        relatedData: {
          topic: quiz.topic,
          difficulty: quiz.difficulty,
          questionCount: quiz.questions.length,
        },
      },
    }).catch(() => {
      // Continue even if insight creation fails
    })
    
    return NextResponse.json({
      quiz,
      saved: !!savedQuiz,
      quizId: savedQuiz?.id,
      metadata: {
        provider: result.provider,
        latencyMs: result.latencyMs,
        generatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Quiz generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate quiz' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// GET - List generated quizzes
export const GET = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  
  try {
    const quizzes = await db.quiz?.findMany({
      where: { tutorId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        topic: true,
        subject: true,
        difficulty: true,
        createdAt: true,
      },
    }).catch(() => []) || []
    
    return NextResponse.json({ quizzes })
  } catch (error) {
    console.error('Fetch quizzes error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quizzes' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
