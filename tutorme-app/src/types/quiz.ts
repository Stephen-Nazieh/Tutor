/**
 * Quiz & Assessment System Types
 * Comprehensive type definitions for the quiz/assessment system
 */

// ============================================
// Question Bank Types
// ============================================

export type QuestionType = 
  | 'multiple_choice' 
  | 'true_false' 
  | 'short_answer' 
  | 'essay' 
  | 'matching' 
  | 'fill_in_blank' 
  | 'multi_select'

export type QuestionDifficulty = 'easy' | 'medium' | 'hard'

export interface QuestionBankItem {
  id: string
  tutorId: string
  type: QuestionType
  question: string
  options?: string[]
  correctAnswer?: string | string[]
  explanation?: string
  hint?: string
  points: number
  difficulty: QuestionDifficulty
  tags: string[]
  subject?: string
  curriculumId?: string
  lessonId?: string
  createdAt: Date
  updatedAt: Date
  usageCount: number
  isPublic: boolean
}

export interface CreateQuestionBankItemInput {
  type: QuestionType
  question: string
  options?: string[]
  correctAnswer?: string | string[]
  explanation?: string
  hint?: string
  points: number
  difficulty: QuestionDifficulty
  tags: string[]
  subject?: string
  curriculumId?: string
  lessonId?: string
  isPublic?: boolean
}

// ============================================
// Quiz Types
// ============================================

export type QuizStatus = 'draft' | 'published' | 'archived' | 'closed'
export type QuizType = 'practice' | 'graded' | 'diagnostic' | 'survey'

export interface Quiz {
  id: string
  tutorId: string
  curriculumId?: string
  lessonId?: string
  title: string
  description?: string
  type: QuizType
  status: QuizStatus
  timeLimit?: number // in minutes, null = no limit
  allowedAttempts: number
  shuffleQuestions: boolean
  shuffleOptions: boolean
  showCorrectAnswers: 'never' | 'after_attempt' | 'after_due_date' | 'immediately'
  passingScore?: number // percentage
  questions: QuizQuestion[]
  totalPoints: number
  tags: string[]
  startDate?: Date
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface QuizQuestion {
  id: string
  quizId?: string
  bankItemId?: string // Reference to question bank item
  type: QuestionType
  question: string
  options?: string[]
  correctAnswer?: string | string[]
  explanation?: string
  hint?: string
  points: number
  difficulty: QuestionDifficulty
  order: number
  tags?: string[]
}

export interface CreateQuizInput {
  title: string
  description?: string
  type: QuizType
  curriculumId?: string
  lessonId?: string
  timeLimit?: number
  allowedAttempts?: number
  shuffleQuestions?: boolean
  shuffleOptions?: boolean
  showCorrectAnswers?: Quiz['showCorrectAnswers']
  passingScore?: number
  tags?: string[]
  startDate?: Date
  dueDate?: Date
}

export interface UpdateQuizInput extends Partial<CreateQuizInput> {
  status?: QuizStatus
}

// ============================================
// Quiz Assignment Types
// ============================================

export interface QuizAssignment {
  id: string
  quizId: string
  assignedByTutorId: string
  assignedToType: 'student' | 'group' | 'all'
  assignedToId?: string // studentId or groupId
  assignedToAll: boolean
  assignedAt: Date
  dueDate?: Date
  isActive: boolean
}

export interface CreateQuizAssignmentInput {
  quizId: string
  assignedToType: 'student' | 'group' | 'all'
  assignedToId?: string
  assignedToAll: boolean
  dueDate?: Date
}

// ============================================
// Quiz Attempt Types
// ============================================

export type QuizAttemptStatus = 'in_progress' | 'submitted' | 'graded' | 'abandoned'

export interface QuizAttempt {
  id: string
  quizId: string
  studentId: string
  assignmentId?: string
  status: QuizAttemptStatus
  startedAt: Date
  submittedAt?: Date
  answers: Record<string, QuizAnswer>
  score?: number
  maxScore: number
  percentage?: number
  timeSpent: number // seconds
  feedback?: string
  questionResults: QuestionResult[]
  attemptNumber: number
  isGraded: boolean
}

export interface QuizAnswer {
  questionId: string
  answer: string | string[]
  answeredAt: Date
}

export interface QuestionResult {
  questionId: string
  correct: boolean
  pointsEarned: number
  pointsMax: number
  selectedAnswer?: string | string[]
  correctAnswer?: string | string[]
  feedback?: string
  explanation?: string
  timeSpentSec?: number
  gradedBy: 'auto' | 'ai' | 'tutor'
  gradedAt?: Date
}

// ============================================
// Student Quiz Interface Types
// ============================================

export interface StudentQuiz {
  id: string
  title: string
  description?: string
  type: QuizType
  timeLimit?: number
  allowedAttempts: number
  totalQuestions: number
  totalPoints: number
  dueDate?: Date
  startDate?: Date
  status: 'available' | 'locked' | 'completed' | 'overdue' | 'upcoming'
  attemptsMade: number
  bestScore?: number
  canAttempt: boolean
}

export interface QuizSession {
  attemptId: string
  quizId: string
  quizTitle: string
  questions: QuizQuestion[]
  currentQuestionIndex: number
  answers: Record<string, QuizAnswer>
  startedAt: Date
  timeRemaining?: number // seconds, undefined if no time limit
}

// ============================================
// Quiz Analytics Types
// ============================================

export interface QuizAnalytics {
  quizId: string
  quizTitle: string
  totalStudents: number
  attemptsCount: number
  completionRate: number
  averageScore: number
  averageTimeSpent: number // seconds
  scoreDistribution: ScoreDistribution
  questionAnalytics: QuestionAnalytics[]
  studentPerformance: StudentQuizPerformance[]
}

export interface ScoreDistribution {
  '90-100': number
  '80-89': number
  '70-79': number
  '60-69': number
  'below-60': number
}

export interface QuestionAnalytics {
  questionId: string
  questionText: string
  type: QuestionType
  points: number
  correctCount: number
  incorrectCount: number
  partialCount: number
  averageScore: number
  averageTimeSpent: number
  difficultyIndex: number // 0-1, higher = easier
  discriminationIndex: number // -1 to 1, higher = better discriminator
  commonWrongAnswers?: { answer: string; count: number }[]
}

export interface StudentQuizPerformance {
  studentId: string
  studentName: string
  attemptCount: number
  bestScore: number
  averageScore: number
  lastAttemptAt?: Date
  status: 'not_started' | 'in_progress' | 'completed'
}

export interface ClassQuizAnalytics {
  classId: string
  className: string
  quizzes: {
    quizId: string
    quizTitle: string
    completionRate: number
    averageScore: number
    attemptsCount: number
  }[]
  studentAverages: {
    studentId: string
    studentName: string
    overallAverage: number
    quizzesTaken: number
  }[]
}

// ============================================
// Grading Types
// ============================================

export interface AutoGradingResult {
  questionId: string
  pointsEarned: number
  pointsMax: number
  correct: boolean
  feedback: string
  explanation?: string
  gradedBy: 'auto' | 'ai'
}

export interface AIGradingInput {
  question: string
  rubric?: string
  studentAnswer: string
  correctAnswer?: string
  maxScore: number
  questionType: QuestionType
}

export interface AIGradingOutput {
  score: number
  maxScore: number
  feedback: string
  explanation: string
  confidence: number
}

export interface ManualGradingInput {
  attemptId: string
  questionId: string
  pointsEarned: number
  feedback?: string
}

// ============================================
// Filter & Search Types
// ============================================

export interface QuestionBankFilters {
  type?: QuestionType
  difficulty?: QuestionDifficulty
  subject?: string
  tags?: string[]
  curriculumId?: string
  lessonId?: string
  searchQuery?: string
}

export interface QuizFilters {
  status?: QuizStatus
  type?: QuizType
  curriculumId?: string
  searchQuery?: string
}
