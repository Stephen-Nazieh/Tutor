/**
 * ============================================================================
 * GRADING AGENT - GRADING PROMPTS
 * ============================================================================
 *
 * UI LOCATION:
 * - /tutor/courses/[id]/tasks - "Auto Grade" button
 * - /student/quizzes/[id]/results - Shows AI feedback
 *
 * EDIT THIS FILE to change how submissions are graded.
 */

import { Question, Student } from '../../shared-data'

export interface GradingRequest {
  question: Question
  studentAnswer: string
  student: Student
  maxPoints: number
}

export interface GradingResult {
  score: number
  maxScore: number
  isCorrect: boolean
  feedback: string
  misconceptions: string[]
  suggestions: string[]
}

/**
 * Main grading prompt for short answer questions
 * TRIGGERED BY: Tutor clicks "Auto Grade" or student submits quiz
 */
export function buildShortAnswerGradingPrompt(request: GradingRequest): string {
  return `You are an expert grader for ${request.question.type} questions.

QUESTION: ${request.question.question}
CORRECT ANSWER: ${request.question.correctAnswer}
EXPLANATION: ${request.question.explanation}
MAX POINTS: ${request.maxPoints}

STUDENT'S ANSWER: "${request.studentAnswer}"

STUDENT INFO:
- Level: ${request.student.currentLevel}
- Grade: ${request.student.grade}

## GRADING INSTRUCTIONS
1. Compare student answer to correct answer
2. Award partial credit if partially correct
3. Consider the student's level when grading
4. Be lenient with phrasing differences if concept is correct
5. Award full points (${request.maxPoints}) only for complete correctness

## OUTPUT FORMAT (JSON)
{
  "score": number (0 to ${request.maxPoints}),
  "isCorrect": boolean (true if score == ${request.maxPoints}),
  "feedback": "Detailed feedback for student (2-3 sentences)",
  "misconceptions": ["Any misconceptions detected"],
  "suggestions": ["Specific suggestions for improvement"]
}

Grade this submission now:`
}

/**
 * Essay grading prompt with rubric
 * TRIGGERED BY: Essay submission in course builder
 */
export function buildEssayGradingPrompt(
  essayQuestion: string,
  rubric: string[],
  studentEssay: string,
  maxPoints: number,
  studentLevel: string
): string {
  return `Grade this essay using the provided rubric.

ESSAY QUESTION: ${essayQuestion}

RUBRIC (grade on each criterion 0-${Math.ceil(maxPoints / rubric.length)}):
${rubric.map((r, i) => `${i + 1}. ${r}`).join('\n')}

STUDENT ESSAY:
"""
${studentEssay}
"""

STUDENT LEVEL: ${studentLevel}

## GRADING GUIDELINES
1. Apply rubric consistently
2. Award partial credit where deserved
3. Consider effort and understanding, not just perfect grammar
4. For ${studentLevel} level, expect appropriate complexity

## OUTPUT FORMAT (JSON)
{
  "totalScore": number (0 to ${maxPoints}),
  "rubricScores": [
    {"criterion": "rubric item", "score": number, "comment": "why"}
  ],
  "overallFeedback": "2-3 paragraph summary",
  "strengths": ["What they did well"],
  "improvements": ["Specific areas to improve"],
  "isPassing": boolean (score >= ${maxPoints * 0.6})
}

Grade now:`
}

/**
 * Math problem grading with step checking
 * TRIGGERED BY: Math quiz submission
 */
export function buildMathGradingPrompt(
  problem: string,
  correctAnswer: string,
  correctSteps: string[],
  studentWork: string,
  maxPoints: number
): string {
  return `Grade this math problem submission.

PROBLEM: ${problem}
CORRECT ANSWER: ${correctAnswer}
CORRECT STEPS:
${correctSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

STUDENT'S WORK:
"""
${studentWork}
"""

## GRADING APPROACH
1. Check final answer first (worth 30% of points)
2. Check each step (worth 70% distributed equally)
3. Allow alternative valid methods
4. Partial credit for correct steps even if final answer wrong
5. Deduct for missing steps or incorrect logic

## SCORING
- Full points: Correct answer + all correct steps
- Partial: Wrong answer but correct steps (calculation error)
- Low: Conceptual misunderstanding

## OUTPUT FORMAT (JSON)
{
  "score": number,
  "stepBreakdown": [
    {"step": 1, "correct": boolean, "feedback": "comment"}
  ],
  "finalAnswerCorrect": boolean,
  "errorType": "calculation|conceptual|missing_step|none",
  "feedback": "Encouraging feedback with explanation",
  "hints": ["Hints for similar problems"]
}

Grade now:`
}

/**
 * Feedback tone adjuster
 * Changes tone based on student performance
 */
export function buildFeedbackTonePrompt(
  baseFeedback: string,
  score: number,
  maxScore: number,
  studentLabel: string,
  isStruggling: boolean
): string {
  const percentage = (score / maxScore) * 100

  let tone = ''
  if (percentage >= 90) {
    tone = 'Enthusiastic and celebratory. Acknowledge excellence.'
  } else if (percentage >= 70) {
    tone = 'Encouraging and constructive. Recognize good work with gentle guidance.'
  } else if (percentage >= 50) {
    tone = 'Supportive and guiding. Emphasize growth mindset. Offer specific help.'
  } else {
    tone = isStruggling
      ? 'Very supportive and non-judgmental. Focus on effort. Offer concrete next steps and encouragement.'
      : 'Supportive but direct about gaps. Clear action items for improvement.'
  }

  return `Rewrite this feedback for ${studentLabel} in a ${tone}

ORIGINAL FEEDBACK:
${baseFeedback}

REQUIREMENTS:
- Keep all factual corrections
- Adjust tone to be appropriate
- Add encouragement appropriate to their score (${percentage}%)
- Keep length similar
- Sign off as "Solocorn AI"

Rewritten feedback:`
}
