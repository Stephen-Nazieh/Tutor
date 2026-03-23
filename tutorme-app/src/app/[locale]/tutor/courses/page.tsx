'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import {
  Search,
  Filter,
  BookOpen,
  Clock,
  ChevronRight,
  GraduationCap,
  Pencil,
  Play,
} from 'lucide-react'

export default function CoursesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [allCourses, setAllCourses] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      try {
        const coursesRes = await fetch('/api/tutor/courses', { credentials: 'include' })
        if (coursesRes.ok) {
          const coursesData = await coursesRes.json()
          if (active) setAllCourses(coursesData.courses || [])
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to load data')
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <BookOpen className="h-6 w-6" />
            Course Catalogue
          </h1>
          <p className="text-muted-foreground">Manage your courses and curriculum</p>
        </div>
      </div>

      <Card className="neon-border-indigo overflow-hidden border-none bg-white/95 shadow-2xl backdrop-blur-md">
        <CardContent className="pt-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {loading ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">Loading courses...</p>
            </div>
          ) : allCourses.length === 0 ? (
            <div className="py-12 text-center">
              <GraduationCap className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <h3 className="mb-2 text-lg font-medium text-gray-700">No courses yet</h3>
              <Button asChild onClick={() => router.push('/tutor/courses/new')}>
                <a>New session</a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allCourses
                .filter(
                  c =>
                    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.subject.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(course => (
                  <Card
                    key={course.id}
                    className="neon-border-inner border-none bg-white/60 backdrop-blur-sm transition-all hover:bg-white hover:shadow-2xl"
                  >
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
                        {course.difficulty && (
                          <Badge variant="outline" className="capitalize">
                            {course.difficulty}
                          </Badge>
                        )}
                      </div>

                      <div className="mb-4 flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.estimatedHours || 0}h</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{course._count?.lessons || 0} lessons</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" />
                          <span>{course._count?.enrollments || 0} students</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <span className="text-lg font-bold text-blue-600">
                          {course.isFree || !course.price ? 'Free' : `$${course.price}`}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <Link href={`/tutor/courses/${course.id}/builder`}>
                            <Pencil className="mr-1 h-4 w-4" />
                            Edit
                          </Link>
                        </Button>
                        <Button asChild size="sm" className="flex-1">
                          <Link href={`/tutor/classes?course=${course.id}`}>
                            <Play className="mr-1 h-4 w-4" />
                            Go Live
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
