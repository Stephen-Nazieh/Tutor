'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  BookOpen, 
  Plus, 
  Search, 
  Users, 
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  BarChart3,
  Loader2,
  Eye,
  LayoutGrid,
  List,
  GraduationCap
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useTutorCourses } from '@/hooks/use-course-assignments'
import { AssignCourseModal } from './components/AssignCourseModal'
import { toast } from 'sonner'
import type { BatchItem } from './[id]/builder/layout'

// Mock batches data - in real app, fetch from API
const MOCK_BATCHES: BatchItem[] = [
  {
    id: 'batch-1',
    name: 'January 2025 - Beginner',
    startDate: '2025-01-15',
    order: 1,
    difficulty: 'beginner',
    languageOfInstruction: 'en',
    price: 99,
    currency: 'USD',
    schedule: [],
    enrollmentCount: 15
  },
  {
    id: 'batch-2',
    name: 'February 2025 - Intermediate',
    startDate: '2025-02-01',
    order: 2,
    difficulty: 'intermediate',
    languageOfInstruction: 'en',
    price: 149,
    currency: 'USD',
    schedule: [],
    enrollmentCount: 12
  },
  {
    id: 'batch-3',
    name: 'March 2025 - Advanced',
    startDate: '2025-03-01',
    order: 3,
    difficulty: 'advanced',
    languageOfInstruction: 'en',
    price: 199,
    currency: 'USD',
    schedule: [],
    enrollmentCount: 8
  }
]

export default function TutorCoursesPage() {
  const router = useRouter()
  const { courses, loading, refetch } = useTutorCourses()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [assignModalOpen, setAssignModalOpen] = useState(false)
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateCourse = () => {
    router.push('/tutor/courses/new')
  }

  const handleDuplicateCourse = (courseId: string) => {
    toast.info('Duplicate feature coming soon')
  }

  const handleDeleteCourse = (courseId: string) => {
    toast.info('Delete feature coming soon')
  }

  const handleAssignCourse = async (courseId: string, batchId: string) => {
    // In real implementation, call API to create assignment
    toast.success('Course assigned successfully!')
    await refetch()
  }

  const openAssignModal = (courseId: string) => {
    setSelectedCourseId(courseId)
    setAssignModalOpen(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-500" />
            My Courses
          </h1>
          <p className="text-muted-foreground">
            Manage your courses and assign them to groups
          </p>
        </div>
        <Button onClick={handleCreateCourse} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Course
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{courses.length}</p>
                <p className="text-xs text-muted-foreground">Total Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <GraduationCap className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {courses.filter(c => c.isPublished).length}
                </p>
                <p className="text-xs text-muted-foreground">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {courses.reduce((acc, c) => acc + c.assignments.total, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Active Assignments</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {courses.reduce((acc, c) => acc + c.totalStudents, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              "p-2 rounded-md transition-all",
              viewMode === 'grid' ? "bg-white shadow-sm" : "text-muted-foreground"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              "p-2 rounded-md transition-all",
              viewMode === 'list' ? "bg-white shadow-sm" : "text-muted-foreground"
            )}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Course Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No courses yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first course to start teaching
          </p>
          <Button onClick={handleCreateCourse} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Course
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onAssign={() => openAssignModal(course.id)}
              onDuplicate={() => handleDuplicateCourse(course.id)}
              onDelete={() => handleDeleteCourse(course.id)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCourses.map(course => (
            <CourseListItem
              key={course.id}
              course={course}
              onAssign={() => openAssignModal(course.id)}
              onDuplicate={() => handleDuplicateCourse(course.id)}
              onDelete={() => handleDeleteCourse(course.id)}
            />
          ))}
        </div>
      )}

      {/* Assign Course Modal */}
      <AssignCourseModal
        isOpen={assignModalOpen}
        onClose={() => {
          setAssignModalOpen(false)
          setSelectedCourseId(null)
        }}
        onAssign={handleAssignCourse}
        courses={courses}
        batches={MOCK_BATCHES}
        preselectedCourseId={selectedCourseId || undefined}
      />
    </div>
  )
}

// Course Card Component
interface CourseCardProps {
  course: {
    id: string
    name: string
    description?: string
    subject: string
    isPublished: boolean
    assignments: {
      total: number
      active: number
    }
    totalStudents: number
    stats: {
      moduleCount: number
      lessonCount: number
      quizCount: number
    }
  }
  onAssign: () => void
  onDuplicate: () => void
  onDelete: () => void
}

function CourseCard({ course, onAssign, onDuplicate, onDelete }: CourseCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={course.isPublished ? 'default' : 'secondary'}>
                {course.isPublished ? 'Published' : 'Draft'}
              </Badge>
              <span className="text-xs text-muted-foreground">{course.subject}</span>
            </div>
            <CardTitle className="text-lg truncate">{course.name}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/tutor/courses/${course.id}/builder`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Course
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/tutor/courses/${course.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDuplicate}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={onDelete}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {course.description || 'No description'}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <span>{course.stats.moduleCount} modules</span>
          <span>{course.stats.lessonCount} lessons</span>
          <span>{course.stats.quizCount} quizzes</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{course.totalStudents}</span>
            </div>
            {course.assignments.total > 0 && (
              <Badge variant="outline" className="text-xs">
                {course.assignments.active} active
              </Badge>
            )}
          </div>
          <Button size="sm" onClick={onAssign} className="gap-1">
            <Plus className="h-3 w-3" />
            Assign
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Course List Item Component
function CourseListItem({ course, onAssign, onDuplicate, onDelete }: CourseCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 p-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant={course.isPublished ? 'default' : 'secondary'}>
              {course.isPublished ? 'Published' : 'Draft'}
            </Badge>
            <span className="text-xs text-muted-foreground">{course.subject}</span>
          </div>
          <h3 className="font-medium truncate">{course.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {course.description || 'No description'}
          </p>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <div className="text-center">
            <p className="font-medium text-foreground">{course.stats.moduleCount}</p>
            <p className="text-xs">Modules</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground">{course.stats.lessonCount}</p>
            <p className="text-xs">Lessons</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground">{course.totalStudents}</p>
            <p className="text-xs">Students</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" onClick={onAssign} className="gap-1">
            <Plus className="h-3 w-3" />
            Assign
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/tutor/courses/${course.id}/builder`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDuplicate}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={onDelete}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  )
}
