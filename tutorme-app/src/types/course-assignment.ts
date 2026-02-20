/**
 * Course-Group Assignment Types
 * Manages the relationship between courses and groups with automatic difficulty resolution
 */

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced'

export type AssignmentStatus = 'active' | 'paused' | 'completed' | 'archived' | 'draft'

export interface CourseGroupAssignment {
  id: string
  courseId: string
  batchId: string
  assignedAt: string
  assignedBy: string
  
  /** The group's difficulty level at time of assignment */
  groupDifficulty: DifficultyLevel
  
  /** How the course content was resolved for this group */
  resolutionStrategy: 'adaptive' | 'fixed' | 'filtered'
  
  /** Status of the assignment */
  status: AssignmentStatus
  
  /** Optional schedule dates */
  startDate?: string
  endDate?: string
  
  /** Enrollment stats */
  enrollmentCount: number
  completionCount: number
  
  /** Custom settings that override course defaults */
  overrides?: {
    price?: number
    currency?: string
    languageOfInstruction?: string
    allowLateSubmissions?: boolean
    latePenaltyPercent?: number
  }
  
  /** Cached course info for quick display */
  courseSnapshot: {
    title: string
    description: string
    moduleCount: number
    lessonCount: number
    thumbnailUrl?: string
  }
}

export interface AssignmentWithDetails extends CourseGroupAssignment {
  /** Live course data (fetched separately) */
  course?: {
    id: string
    name: string
    subject: string
    isPublished: boolean
  }
  
  /** Live batch/group data */
  batch?: {
    id: string
    name: string
    difficulty: DifficultyLevel
    enrollmentCount: number
  }
  
  /** Computed stats */
  stats: {
    totalStudents: number
    startedCount: number
    completedCount: number
    averageProgress: number
  }
}

export interface CreateAssignmentRequest {
  courseId: string
  batchId: string
  startDate?: string
  endDate?: string
  overrides?: CourseGroupAssignment['overrides']
}

export interface AssignmentPreview {
  /** How content will be resolved */
  resolution: {
    totalModules: number
    visibleModules: number
    hiddenModules: number
    adaptedContent: number
  }
  
  /** Items that will be hidden due to difficulty mismatch */
  hiddenItems: {
    type: 'module' | 'lesson' | 'task' | 'quiz'
    id: string
    title: string
    reason: string
  }[]
  
  /** Items that will be adapted */
  adaptedItems: {
    type: 'module' | 'lesson' | 'task' | 'quiz'
    id: string
    title: string
    originalValue: string
    adaptedValue: string
    field: string
  }[]
}

export interface CourseWithAssignments {
  id: string
  name: string
  description?: string
  subject: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
  
  /** Assignment summary */
  assignments: {
    total: number
    active: number
    paused: number
    completed: number
  }
  
  /** Total students across all assignments */
  totalStudents: number
  
  /** Quick stats */
  stats: {
    moduleCount: number
    lessonCount: number
    quizCount: number
  }
}

export interface BatchWithCourses {
  id: string
  name: string
  difficulty: DifficultyLevel
  enrollmentCount: number
  
  /** Courses assigned to this batch */
  assignedCourses: {
    assignmentId: string
    courseId: string
    title: string
    status: AssignmentStatus
    assignedAt: string
    startDate?: string
    endDate?: string
    progress: number
  }[]
}

/** Difficulty resolution result for a single content item */
export interface ResolvedContent<T> {
  /** The resolved content (base or variant) */
  content: T
  
  /** How this content was resolved */
  resolution: {
    type: 'base' | 'variant' | 'hidden'
    source?: 'all' | 'fixed' | 'adaptive' | 'variant'
    variantLevel?: DifficultyLevel
  }
  
  /** If hidden, why */
  hiddenReason?: string
  
  /** Original values that were overridden */
  originalValues?: Partial<T>
}
