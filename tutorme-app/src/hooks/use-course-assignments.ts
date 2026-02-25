/**
 * React hooks for course assignment operations
 */

import { useState, useCallback, useEffect } from 'react'
import { toast } from 'sonner'
import type {
  CourseGroupAssignment,
  CreateAssignmentRequest,
  AssignmentPreview,
  CourseWithAssignments,
  DifficultyLevel,
} from '@/types/course-assignment'

interface TutorCoursesApiCourse {
  id: string
  name: string
  description?: string | null
  subject: string
  isPublished: boolean
  createdAt?: string
  updatedAt?: string
  _count?: {
    modules?: number
    lessons?: number
    enrollments?: number
  }
  variants?: Array<{
    batchId: string
    name: string
    difficulty: DifficultyLevel
    enrollmentCount: number
    joinLink: string
  }>
}

interface TutorCoursesApiResponse {
  courses?: TutorCoursesApiCourse[]
}

function normalizeTutorCourse(course: TutorCoursesApiCourse): CourseWithAssignments {
  return {
    id: course.id,
    name: course.name,
    description: course.description ?? undefined,
    subject: course.subject,
    isPublished: course.isPublished,
    createdAt: course.createdAt ?? '',
    updatedAt: course.updatedAt ?? '',
    assignments: {
      total: course.variants?.length ?? 0,
      active: course.variants?.length ?? 0,
      paused: 0,
      completed: 0,
    },
    totalStudents: course._count?.enrollments ?? 0,
    stats: {
      moduleCount: course._count?.modules ?? 0,
      lessonCount: course._count?.lessons ?? 0,
      quizCount: 0,
    },
    variants: course.variants ?? [],
  }
}

const assignmentApi = {
  async getTutorCourses(): Promise<CourseWithAssignments[]> {
    const res = await fetch('/api/tutor/courses', { credentials: 'include' })
    if (!res.ok) throw new Error('Failed to load courses')

    const data = (await res.json().catch(() => ({}))) as TutorCoursesApiResponse
    const courses = Array.isArray(data.courses) ? data.courses : []
    return courses.map(normalizeTutorCourse)
  },

  async getCourseAssignments(_courseId: string): Promise<CourseGroupAssignment[]> {
    void _courseId
    return []
  },

  async createAssignment(_data: CreateAssignmentRequest): Promise<CourseGroupAssignment> {
    void _data
    throw new Error('Assignment API not implemented')
  },

  async deleteAssignment(_assignmentId: string): Promise<void> {
    void _assignmentId
    throw new Error('Assignment API not implemented')
  },

  async updateAssignmentStatus(
    _assignmentId: string,
    _status: CourseGroupAssignment['status']
  ): Promise<void> {
    void _assignmentId
    void _status
    throw new Error('Assignment API not implemented')
  },

  async previewAssignment(_courseId: string, _batchId: string): Promise<AssignmentPreview> {
    void _courseId
    void _batchId
    throw new Error('Preview API not implemented')
  },
}

export function useTutorCourses() {
  const [courses, setCourses] = useState<CourseWithAssignments[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCourses = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await assignmentApi.getTutorCourses()
      setCourses(data)
    } catch {
      setError('Failed to load courses')
      toast.error('Failed to load courses')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  return { courses, loading, error, refetch: fetchCourses }
}

export function useCourseAssignments(courseId: string) {
  const [assignments, setAssignments] = useState<CourseGroupAssignment[]>([])
  const [loading, setLoading] = useState(false)

  const fetchAssignments = useCallback(async () => {
    if (!courseId) return
    setLoading(true)
    try {
      const data = await assignmentApi.getCourseAssignments(courseId)
      setAssignments(data)
    } catch {
      toast.error('Failed to load assignments')
    } finally {
      setLoading(false)
    }
  }, [courseId])

  useEffect(() => {
    fetchAssignments()
  }, [fetchAssignments])

  const createAssignment = useCallback(async (data: CreateAssignmentRequest) => {
    try {
      const assignment = await assignmentApi.createAssignment(data)
      setAssignments((prev) => [...prev, assignment])
      toast.success('Course assigned to group successfully')
      return assignment
    } catch {
      toast.error('Failed to assign course')
      throw new Error('Failed to assign course')
    }
  }, [])

  const deleteAssignment = useCallback(async (assignmentId: string) => {
    try {
      await assignmentApi.deleteAssignment(assignmentId)
      setAssignments((prev) => prev.filter((a) => a.id !== assignmentId))
      toast.success('Assignment removed')
    } catch {
      toast.error('Failed to remove assignment')
    }
  }, [])

  const updateStatus = useCallback(async (
    assignmentId: string,
    status: CourseGroupAssignment['status']
  ) => {
    try {
      await assignmentApi.updateAssignmentStatus(assignmentId, status)
      setAssignments((prev) => prev.map((a) => (a.id === assignmentId ? { ...a, status } : a)))
      toast.success(`Assignment ${status}`)
    } catch {
      toast.error('Failed to update status')
    }
  }, [])

  return {
    assignments,
    loading,
    createAssignment,
    deleteAssignment,
    updateStatus,
    refetch: fetchAssignments,
  }
}

export function useAssignmentPreview() {
  const [preview, setPreview] = useState<AssignmentPreview | null>(null)
  const [loading, setLoading] = useState(false)

  const generatePreview = useCallback(async (courseId: string, batchId: string) => {
    setLoading(true)
    try {
      const data = await assignmentApi.previewAssignment(courseId, batchId)
      setPreview(data)
      return data
    } catch {
      toast.error('Failed to generate preview')
      throw new Error('Failed to generate preview')
    } finally {
      setLoading(false)
    }
  }, [])

  const clearPreview = useCallback(() => {
    setPreview(null)
  }, [])

  return { preview, loading, generatePreview, clearPreview }
}
