/**
 * React hooks for course assignment operations
 */

import { useState, useCallback, useEffect } from 'react'
import { toast } from 'sonner'
import type { 
  CourseGroupAssignment, 
  CreateAssignmentRequest, 
  AssignmentPreview,
  CourseWithAssignments 
} from '@/types/course-assignment'

// Mock API functions - replace with actual API calls
const mockApi = {
  async getTutorCourses(): Promise<CourseWithAssignments[]> {
    // Simulate API delay
    await new Promise(r => setTimeout(r, 500))
    return [
      {
        id: 'course-1',
        name: 'Python Fundamentals',
        description: 'Learn Python from scratch',
        subject: 'Programming',
        isPublished: true,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T14:30:00Z',
        assignments: { total: 3, active: 2, paused: 0, completed: 1 },
        totalStudents: 45,
        stats: { moduleCount: 4, lessonCount: 12, quizCount: 3 }
      },
      {
        id: 'course-2',
        name: 'Data Science Basics',
        description: 'Introduction to data analysis',
        subject: 'Data Science',
        isPublished: true,
        createdAt: '2024-02-01T09:00:00Z',
        updatedAt: '2024-02-05T16:00:00Z',
        assignments: { total: 0, active: 0, paused: 0, completed: 0 },
        totalStudents: 0,
        stats: { moduleCount: 6, lessonCount: 18, quizCount: 5 }
      }
    ]
  },

  async getCourseAssignments(courseId: string): Promise<CourseGroupAssignment[]> {
    await new Promise(r => setTimeout(r, 300))
    return []
  },

  async createAssignment(data: CreateAssignmentRequest): Promise<CourseGroupAssignment> {
    await new Promise(r => setTimeout(r, 800))
    return {
      id: `assignment-${Date.now()}`,
      courseId: data.courseId,
      batchId: data.batchId,
      assignedAt: new Date().toISOString(),
      assignedBy: 'current-user',
      groupDifficulty: 'beginner',
      resolutionStrategy: 'adaptive',
      status: 'active',
      enrollmentCount: 0,
      completionCount: 0,
      courseSnapshot: {
        title: 'Course Title',
        description: 'Course description',
        moduleCount: 4,
        lessonCount: 12
      }
    }
  },

  async deleteAssignment(assignmentId: string): Promise<void> {
    await new Promise(r => setTimeout(r, 400))
  },

  async updateAssignmentStatus(
    assignmentId: string, 
    status: CourseGroupAssignment['status']
  ): Promise<void> {
    await new Promise(r => setTimeout(r, 400))
  },

  async previewAssignment(courseId: string, batchId: string): Promise<AssignmentPreview> {
    await new Promise(r => setTimeout(r, 600))
    return {
      resolution: {
        totalModules: 4,
        visibleModules: 4,
        hiddenModules: 0,
        adaptedContent: 2
      },
      hiddenItems: [],
      adaptedItems: [
        {
          type: 'lesson',
          id: 'lesson-1',
          title: 'Introduction',
          originalValue: 'Introduction to Python',
          adaptedValue: 'Python Basics for Beginners',
          field: 'title'
        }
      ]
    }
  }
}

export function useTutorCourses() {
  const [courses, setCourses] = useState<CourseWithAssignments[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCourses = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await mockApi.getTutorCourses()
      setCourses(data)
    } catch (err) {
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
      const data = await mockApi.getCourseAssignments(courseId)
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
      const assignment = await mockApi.createAssignment(data)
      setAssignments(prev => [...prev, assignment])
      toast.success('Course assigned to group successfully')
      return assignment
    } catch {
      toast.error('Failed to assign course')
      throw new Error('Failed to assign course')
    }
  }, [])

  const deleteAssignment = useCallback(async (assignmentId: string) => {
    try {
      await mockApi.deleteAssignment(assignmentId)
      setAssignments(prev => prev.filter(a => a.id !== assignmentId))
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
      await mockApi.updateAssignmentStatus(assignmentId, status)
      setAssignments(prev => prev.map(a => 
        a.id === assignmentId ? { ...a, status } : a
      ))
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
    refetch: fetchAssignments
  }
}

export function useAssignmentPreview() {
  const [preview, setPreview] = useState<AssignmentPreview | null>(null)
  const [loading, setLoading] = useState(false)

  const generatePreview = useCallback(async (courseId: string, batchId: string) => {
    setLoading(true)
    try {
      const data = await mockApi.previewAssignment(courseId, batchId)
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
