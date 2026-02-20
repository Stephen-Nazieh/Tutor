/**
 * Types for student dashboard data (from APIs).
 */

export interface DashboardContent {
  id: string
  subject: string
  topic: string
  type?: string
  duration?: number | null
  difficulty?: string | null
  progress: number
  completed?: boolean
  thumbnailUrl?: string | null
  /** ISO date string or undefined for compatibility with ContinueLearning */
  lastStudied?: string | null
}

export interface GamificationData {
  level: number
  xp: number
  xpToNextLevel: number
  progress: number
  streakDays: number
  longestStreak: number
  skills?: Record<string, number>
}

export interface World {
  id: string
  name: string
  description?: string
  emoji?: string
  unlockLevel: number
  difficultyLevel?: number
  progress?: number
  isUnlocked?: boolean
  canAccess?: boolean
}

export interface DailyQuestItem {
  id: string
  type: string
  title: string
  description?: string
  xpReward: number
  target?: number
  progress?: number
}

export interface DailyQuestWithCompletion {
  id: string
  quest: DailyQuestItem & { requirement?: number }
  completed: boolean
  progress?: number
}

export interface Recommendation {
  type: string
  title: string
  description: string
  priority: string
  estimatedTime: string
}

export interface DashboardClass {
  id: string
  title: string
  subject: string
  gradeLevel?: string
  startTime: string
  duration: number
  maxStudents: number
  currentBookings: number
  isBooked: boolean
  requiresPayment?: boolean
  price?: number | null
}

export interface StudyGroup {
  id: string
  name: string
  subject: string
  maxMembers: number
  currentMembers: number
  isMember: boolean
}

export interface EnrolledCourse {
  id: string
  name: string
  subject: string
  description: string | null
  progress: number
  completedLessons: number
  totalLessons: number
  lastStudied: string | null
}

export interface DashboardData {
  contents: DashboardContent[]
  gamification: GamificationData | null
  worlds: World[]
  dailyQuests: DailyQuestWithCompletion[]
  recommendations: Recommendation[]
  classes: DashboardClass[]
  studyGroups: StudyGroup[]
  courses: EnrolledCourse[]
}
