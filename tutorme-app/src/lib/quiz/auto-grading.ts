/**
 * Auto-Grading Service
 * 
 * Provides automatic grading for quiz questions:
 * - Objective questions (multiple choice, true/false, multi-select) are graded instantly
 * - Subjective questions (short answer, essay) use AI grading with fallback to manual
 */

import { generateWithFallback } from '@/lib/ai/orchestrator'
import { 
    QuestionType, 
    QuizQuestion, 
    AutoGradingResult, 
    AIGradingInput, 
    AIGradingOutput,
    QuestionResult 
} from '@/types/quiz'

/**
 * Grade a single question automatically
 */
export async function gradeQuestion(
    question: QuizQuestion,
    studentAnswer: string | string[],
    options: {
        useAI?: boolean
        studentId?: string
    } = {}
): Promise<AutoGradingResult> {
    const { useAI = true } = options
    
    switch (question.type) {
        case 'multiple_choice':
        case 'true_false':
            return gradeMultipleChoice(question, studentAnswer)
            
        case 'multi_select':
            return gradeMultiSelect(question, studentAnswer)
            
        case 'fill_in_blank':
            return gradeFillInBlank(question, studentAnswer)
            
        case 'matching':
            return gradeMatching(question, studentAnswer)
            
        case 'short_answer':
        case 'essay':
            if (useAI) {
                return gradeWithAI(question, studentAnswer)
            }
            return createUngradedResult(question)
            
        default:
            return createUngradedResult(question)
    }
}

/**
 * Grade multiple choice or true/false question
 */
function gradeMultipleChoice(
    question: QuizQuestion,
    studentAnswer: string | string[]
): AutoGradingResult {
    const correctAnswer = String(question.correctAnswer || '').toLowerCase().trim()
    const answer = String(studentAnswer).toLowerCase().trim()
    const isCorrect = correctAnswer === answer
    
    return {
        questionId: question.id,
        pointsEarned: isCorrect ? question.points : 0,
        pointsMax: question.points,
        correct: isCorrect,
        feedback: isCorrect 
            ? 'Correct!' 
            : `Incorrect. The correct answer is: ${question.correctAnswer}`,
        explanation: question.explanation || undefined,
        gradedBy: 'auto'
    }
}

/**
 * Grade multi-select question (multiple correct answers)
 */
function gradeMultiSelect(
    question: QuizQuestion,
    studentAnswer: string | string[]
): AutoGradingResult {
    const correctAnswers = Array.isArray(question.correctAnswer) 
        ? question.correctAnswer.map(a => String(a).toLowerCase().trim())
        : [String(question.correctAnswer).toLowerCase().trim()]
    
    const studentAnswers = Array.isArray(studentAnswer)
        ? studentAnswer.map(a => String(a).toLowerCase().trim())
        : [String(studentAnswer).toLowerCase().trim()]
    
    // Calculate partial credit
    const correctSelected = studentAnswers.filter(a => correctAnswers.includes(a)).length
    const incorrectSelected = studentAnswers.filter(a => !correctAnswers.includes(a)).length
    const totalCorrect = correctAnswers.length
    
    // Scoring: correct selections get positive points, incorrect selections deduct
    const pointsPerCorrect = question.points / totalCorrect
    const deductionPerIncorrect = pointsPerCorrect * 0.5 // 50% deduction for wrong selections
    
    let pointsEarned = (correctSelected * pointsPerCorrect) - (incorrectSelected * deductionPerIncorrect)
    pointsEarned = Math.max(0, Math.min(question.points, pointsEarned)) // Clamp to [0, max]
    
    // Round to 2 decimal places
    pointsEarned = Math.round(pointsEarned * 100) / 100
    
    const isFullyCorrect = correctSelected === totalCorrect && incorrectSelected === 0
    const isPartial = pointsEarned > 0 && !isFullyCorrect
    
    return {
        questionId: question.id,
        pointsEarned,
        pointsMax: question.points,
        correct: isFullyCorrect,
        feedback: isFullyCorrect 
            ? 'Correct! All selections are right.'
            : isPartial 
                ? `Partially correct. You got ${correctSelected} of ${totalCorrect} correct.`
                : 'Incorrect.',
        explanation: question.explanation || undefined,
        gradedBy: 'auto'
    }
}

/**
 * Grade fill-in-the-blank question (case-insensitive exact match)
 */
function gradeFillInBlank(
    question: QuizQuestion,
    studentAnswer: string | string[]
): AutoGradingResult {
    const correctAnswer = String(question.correctAnswer || '').toLowerCase().trim()
    const answer = String(studentAnswer).toLowerCase().trim()
    
    // Support multiple acceptable answers (separated by |)
    const acceptableAnswers = correctAnswer.split('|').map(a => a.trim())
    const isCorrect = acceptableAnswers.some(a => a === answer)
    
    return {
        questionId: question.id,
        pointsEarned: isCorrect ? question.points : 0,
        pointsMax: question.points,
        correct: isCorrect,
        feedback: isCorrect 
            ? 'Correct!' 
            : `Incorrect. The correct answer is: ${question.correctAnswer}`,
        explanation: question.explanation || undefined,
        gradedBy: 'auto'
    }
}

/**
 * Grade matching question
 */
function gradeMatching(
    question: QuizQuestion,
    studentAnswer: string | string[]
): AutoGradingResult {
    // Matching answers are expected as an object or array of pairs
    const correctMatches = question.correctAnswer as Record<string, string> || {}
    const studentMatches = studentAnswer as Record<string, string> || {}
    
    const totalPairs = Object.keys(correctMatches).length
    let correctCount = 0
    
    for (const [key, correctValue] of Object.entries(correctMatches)) {
        if (studentMatches[key]?.toLowerCase().trim() === correctValue.toLowerCase().trim()) {
            correctCount++
        }
    }
    
    const pointsPerMatch = question.points / totalPairs
    const pointsEarned = Math.round(correctCount * pointsPerMatch * 100) / 100
    const isFullyCorrect = correctCount === totalPairs
    
    return {
        questionId: question.id,
        pointsEarned,
        pointsMax: question.points,
        correct: isFullyCorrect,
        feedback: isFullyCorrect 
            ? 'Perfect match!' 
            : `You matched ${correctCount} of ${totalPairs} correctly.`,
        explanation: question.explanation || undefined,
        gradedBy: 'auto'
    }
}

/**
 * Grade subjective questions using AI
 */
async function gradeWithAI(
    question: QuizQuestion,
    studentAnswer: string | string[]
): Promise<AutoGradingResult> {
    const answerText = Array.isArray(studentAnswer) ? studentAnswer.join(', ') : String(studentAnswer)
    
    try {
        const prompt = buildAIGradingPrompt({
            question: question.question,
            rubric: question.correctAnswer 
                ? `Expected answer should include: ${question.correctAnswer}` 
                : undefined,
            studentAnswer: answerText,
            correctAnswer: question.correctAnswer ? String(question.correctAnswer) : undefined,
            maxScore: question.points,
            questionType: question.type
        })
        
        const result = await generateWithFallback(prompt, {
            temperature: 0.3,
            maxTokens: 800
        })
        
        const grading = parseAIGradingResponse(result.content)
        
        return {
            questionId: question.id,
            pointsEarned: Math.min(question.points, Math.max(0, grading.score)),
            pointsMax: question.points,
            correct: grading.score >= question.points * 0.7, // 70% threshold for "correct"
            feedback: grading.feedback,
            explanation: grading.explanation,
            gradedBy: 'ai'
        }
    } catch (error) {
        console.error('AI grading failed:', error)
        return createUngradedResult(question)
    }
}

/**
 * Build AI grading prompt
 */
function buildAIGradingPrompt(input: AIGradingInput): string {
    return `You are an expert educational assessor. Grade the following student answer based on the question and rubric.

QUESTION: ${input.question}

${input.rubric ? `RUBRIC/EXPECTED ANSWER: ${input.rubric}` : ''}
${input.correctAnswer ? `CORRECT ANSWER: ${input.correctAnswer}` : ''}

STUDENT ANSWER: ${input.studentAnswer}

MAXIMUM SCORE: ${input.maxScore}

Provide your grading in the following JSON format:
{
    "score": number (0-${input.maxScore}),
    "feedback": "Brief, encouraging feedback for the student",
    "explanation": "Why this score was given and what was missing or excellent",
    "confidence": number (0-1)
}

Be fair but thorough. Partial credit is allowed. Return only valid JSON.`
}

/**
 * Parse AI grading response
 */
function parseAIGradingResponse(content: string): AIGradingOutput {
    try {
        // Extract JSON from response
        const jsonMatch = content.match(/\{[\s\S]*\}/)
        if (!jsonMatch) {
            throw new Error('No JSON found in response')
        }
        
        const parsed = JSON.parse(jsonMatch[0])
        
        return {
            score: parsed.score || 0,
            maxScore: parsed.maxScore || 100,
            feedback: parsed.feedback || 'Your answer has been graded.',
            explanation: parsed.explanation || '',
            confidence: parsed.confidence || 0.5
        }
    } catch (error) {
        console.error('Failed to parse AI grading response:', error)
        return {
            score: 0,
            maxScore: 100,
            feedback: 'Could not grade answer automatically.',
            explanation: 'An error occurred during AI grading.',
            confidence: 0
        }
    }
}

/**
 * Create an ungraded result (for manual grading)
 */
function createUngradedResult(question: QuizQuestion): AutoGradingResult {
    return {
        questionId: question.id,
        pointsEarned: 0,
        pointsMax: question.points,
        correct: false,
        feedback: 'This question requires manual grading.',
        explanation: question.explanation || undefined,
        gradedBy: 'auto'
    }
}

/**
 * Grade an entire quiz
 */
export async function gradeQuiz(
    questions: QuizQuestion[],
    answers: Record<string, string | string[]>,
    options: {
        useAI?: boolean
        studentId?: string
    } = {}
): Promise<{
    results: QuestionResult[]
    totalScore: number
    maxScore: number
    percentage: number
}> {
    const results: QuestionResult[] = []
    let totalScore = 0
    let maxScore = 0
    
    for (const question of questions) {
        const studentAnswer = answers[question.id]
        
        // Skip if no answer provided
        if (studentAnswer === undefined || studentAnswer === null || studentAnswer === '') {
            results.push({
                questionId: question.id,
                correct: false,
                pointsEarned: 0,
                pointsMax: question.points,
                selectedAnswer: studentAnswer,
                correctAnswer: question.correctAnswer,
                feedback: 'No answer provided',
                gradedBy: 'auto'
            })
            maxScore += question.points
            continue
        }
        
        const grading = await gradeQuestion(question, studentAnswer, options)
        
        results.push({
            questionId: question.id,
            correct: grading.correct,
            pointsEarned: grading.pointsEarned,
            pointsMax: grading.pointsMax,
            selectedAnswer: studentAnswer,
            correctAnswer: question.correctAnswer,
            feedback: grading.feedback,
            explanation: grading.explanation,
            gradedBy: grading.gradedBy
        })
        
        totalScore += grading.pointsEarned
        maxScore += question.points
    }
    
    const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0
    
    return {
        results,
        totalScore,
        maxScore,
        percentage
    }
}

/**
 * Check if a question type can be auto-graded
 */
export function isAutoGradable(type: QuestionType): boolean {
    return ['multiple_choice', 'true_false', 'multi_select', 'fill_in_blank', 'matching'].includes(type)
}

/**
 * Check if a question type requires AI grading
 */
export function requiresAIGrading(type: QuestionType): boolean {
    return ['short_answer', 'essay'].includes(type)
}
