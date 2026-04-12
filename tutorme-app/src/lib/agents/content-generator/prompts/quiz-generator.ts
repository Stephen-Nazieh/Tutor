/**
 * ============================================================================
 * CONTENT GENERATOR - QUIZ GENERATION PROMPTS
 * ============================================================================
 *
 * UI LOCATION: /tutor/courses/[id]/builder - "Generate Questions" button
 *
 * EDIT THIS FILE to change how quizzes are generated.
 */

import { Course, Student } from '../../shared-data'

export interface QuizGenerationRequest {
  subject: string
  topic: string
  difficulty: 'easy' | 'medium' | 'hard'
  numQuestions: number
  questionTypes: ('multiple_choice' | 'short_answer' | 'essay' | 'math')[]
  targetStudent?: Student
}

/**
 * Main prompt for generating a complete quiz
 * TRIGGERED BY: Tutor clicks "Generate Quiz" in course builder
 */
export function buildQuizGenerationPrompt(request: QuizGenerationRequest): string {
  return `You are an expert ${request.subject} educator creating a quiz.

TOPIC: ${request.topic}
DIFFICULTY: ${request.difficulty}
NUMBER OF QUESTIONS: ${request.numQuestions}
ALLOWED QUESTION TYPES: ${request.questionTypes.join(', ')}

## QUIZ REQUIREMENTS
1. Questions must be original and not from common textbooks
2. Each question should test understanding, not just memorization
3. Include a mix of question types if multiple types requested
4. Difficulty should be: ${request.difficulty}
5. Each question must have a clear correct answer
6. Provide detailed explanations for why answers are correct

## QUESTION TYPE GUIDELINES

### Multiple Choice
- 4 options (A, B, C, D)
- Only ONE correct answer
- Distractors should be plausible
- Avoid "all of the above" or "none of the above"

### Short Answer
- Answer should be 1-3 sentences
- Can be graded automatically with key phrases
- Clear, specific expected answer

### Math Problems
- Show step-by-step solution in explanation
- Include units where applicable
- Round to 2 decimal places if needed

### Essay
- Provide grading rubric in explanation
- Key points student should address
- Expected length (word count)

## OUTPUT FORMAT
Return ONLY a JSON array of questions in this format:
[
  {
    "type": "multiple_choice",
    "question": "Question text here?",
    "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
    "correctAnswer": "A. Option 1",
    "explanation": "Detailed explanation here",
    "points": 10,
    "difficulty": "medium"
  }
]

Generate ${request.numQuestions} questions now:`
}

/**
 * Prompt for adjusting question difficulty
 * TRIGGERED BY: Tutor clicks "Make Easier" or "Make Harder"
 */
export function buildDifficultyAdjustmentPrompt(
  originalQuestion: string,
  currentDifficulty: string,
  targetDifficulty: string
): string {
  return `Adjust the difficulty of this ${currentDifficulty} question to make it ${targetDifficulty}.

ORIGINAL QUESTION:
${originalQuestion}

GUIDELINES:
- Keep the same concept/topic
- ${
    targetDifficulty === 'easier'
      ? 'Break into simpler steps, provide more context, reduce computation'
      : 'Add complexity, remove hints, require multiple steps, add edge cases'
  }
- Maintain educational value
- Keep similar length

Return the adjusted question in the same format.`
}

/**
 * Prompt for generating lesson content
 * TRIGGERED BY: Tutor clicks "Generate Lesson" in course builder
 */
export function buildLessonContentPrompt(
  topic: string,
  subject: string,
  targetGrade: string,
  duration: number // minutes
): string {
  return `Create a ${duration}-minute lesson on "${topic}" for ${subject}, grade ${targetGrade}.

LESSON STRUCTURE:
1. HOOK (2-3 min): Engaging introduction, real-world connection
2. CONCEPTS (40% of time): Core material with examples
3. PRACTICE (30% of time): Worked example + student practice
4. CHECK (20% of time): Quick assessment questions
5. SUMMARY (10% of time): Key takeaways

CONTENT REQUIREMENTS:
- Use age-appropriate language
- Include at least one visual description (chart, diagram, etc.)
- Add 2-3 "Check Your Understanding" questions
- Include common misconceptions to address
- Suggest hands-on activity if applicable

FORMAT:
Return structured markdown with clear section headers.`
}

/**
 * Prompt for generating similar questions
 * TRIGGERED BY: "Generate More Like This" button
 */
export function buildSimilarQuestionPrompt(exampleQuestion: string, count: number): string {
  return `Generate ${count} new questions similar to this one:

EXAMPLE:
${exampleQuestion}

REQUIREMENTS:
- Same difficulty level
- Same question type
- Same topic/concept
- Different numbers/scenarios
- Different wording

Return as JSON array.`
}
