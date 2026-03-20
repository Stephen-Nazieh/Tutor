'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Clock, ChevronRight, Plus, GraduationCap, Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface Course {
  id: string
  name: string
  description: string | null
  subject: string
  gradeLevel: string | null
  difficulty: string
  estimatedHours: number
  isPublished: boolean
  _count: {
    lessons: number
    enrollments: number
  }
}

export default function TutorCurriculumPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('/api/tutor/courses', { credentials: 'include' })
      .then(res => (res.ok ? res.json() : { courses: [] }))
      .then(data => setCourses(data.courses ?? []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false))
  }, [])

  const filteredCourses = courses.filter(
    c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
          <p className="mt-1 text-gray-600">Manage your courses and curriculum</p>
        </div>
        <Button asChild>
          <Link href="/tutor/courses/new">
            <Plus className="mr-2 h-4 w-4" />
            Create New Course
          </Link>
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="mb-2 h-4 w-32 rounded bg-gray-200" />
                <div className="h-3 w-48 rounded bg-gray-200" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredCourses.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <GraduationCap className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium text-gray-700">
              {searchQuery ? 'No courses found' : 'No courses yet'}
            </h3>
            <p className="mb-4 text-gray-500">
              {searchQuery
                ? 'Try adjusting your search'
                : 'Create your first course to get started'}
            </p>
            <Button asChild>
              <Link href="/tutor/courses/new">
                <Plus className="mr-2 h-4 w-4" />
                Create New Course
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map(course => (
            <Card key={course.id} className="transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <Badge variant={course.isPublished ? 'default' : 'secondary'}>
                    {course.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                </div>
                <CardTitle className="mt-3 text-lg">{course.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {course.description || 'No description'}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge variant="outline">{course.subject}</Badge>
                  {course.gradeLevel && <Badge variant="outline">{course.gradeLevel}</Badge>}
                  <Badge variant="outline" className="capitalize">
                    {course.difficulty}
                  </Badge>
                </div>

                <div className="mb-4 flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.estimatedHours}h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course._count.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    <span>{course._count.enrollments} students</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/tutor/courses/${course.id}/builder`}>
                      Open Builder
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
