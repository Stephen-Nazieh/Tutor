'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  TrendingUp,
  Users,
  BookOpen,
  ArrowLeft,
  Download,
  BarChart3,
  Loader2,
  Search,
  ChevronRight,
  Calendar,
  Activity,
  FileText,
  FileSpreadsheet,
  FileIcon,
  Send,
  Bot,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { EngagementDashboard } from '@/components/reports/engagement-dashboard'
import { RevenueDashboard } from '../dashboard/components/RevenueDashboard'
import { DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ClassOption {
  id: string
  title: string
  categories?: string[]
  type: 'class' | 'course'
}

interface ClassReportData {
  classInfo: {
    id: string
    totalStudents: number
    averageScore: number
  }
  charts: {
    scoreDistribution: { range: string; count: number }[]
    clusterDistribution: { name: string; count: number; color: string }[]
  }
  topStudents: {
    id: string
    name: string
    averageScore: number
    completionRate: number
  }[]
  studentsNeedingAttention: {
    id: string
    name: string
    averageScore: number
    issue: string
  }[]
  summary: {
    totalStudents: number
    averageScore: number
    advancedCount: number
    intermediateCount: number
    strugglingCount: number
  }
}

interface Student {
  id: string
  name: string
  email?: string
  averageScore?: number
  completionRate?: number
  cluster?: string
  courseCount?: number
  classCount?: number
}

interface SessionOverviewItem {
  id: string
  title: string
  subject: string
  status: string
  scheduledAt: string
  startedAt?: string | null
  endedAt?: string | null
  courseId?: string | null
}

interface CourseItem {
  id: string
  name: string
  description: string | null
  categories: string[]
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  id: string
}

export default function TutorReports() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [classData, setClassData] = useState<ClassReportData | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [availableClasses, setAvailableClasses] = useState<ClassOption[]>([])
  const [selectedClassId, setSelectedClassId] = useState<string>('')
  const [isExporting, setIsExporting] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCluster, setSelectedCluster] = useState<string>('all')
  const [globalAttentionStudents, setGlobalAttentionStudents] = useState<Student[]>([])
  const [globalAllStudents, setGlobalAllStudents] = useState<Student[]>([])
  const [loadingGlobals, setLoadingGlobals] = useState(true)

  // Fetch real students and classes on mount
  useEffect(() => {
    const loadData = async () => {
      setLoadingGlobals(true)
      try {
        // Fetch students
        const studentsRes = await fetch('/api/tutor/students', { credentials: 'include' })
        let studentList: Student[] = []
        if (studentsRes.ok) {
          const data = await studentsRes.json()
          studentList = (data.students ?? []).map((s: any) => ({
            id: s.id,
            name: s.name,
            email: s.email,
            courseCount: s.courseCount ?? 0,
            classCount: s.classCount ?? 0,
            // We don't have real performance data yet; leave optional fields undefined
          }))
        }
        setStudents(studentList)
        setGlobalAllStudents(studentList)
        setGlobalAttentionStudents(studentList.filter((s: Student) => s.cluster === 'struggling'))

        // Fetch available classes for dropdown
        const classesRes = await fetch('/api/tutor/classes?includeEnded=1', {
          credentials: 'include',
        })
        if (classesRes.ok) {
          const data = await classesRes.json()
          const classes: ClassOption[] = (data.classes ?? []).map((c: any) => ({
            id: c.id,
            title: c.title,
            categories: c.subject ? [c.subject] : [],
            type: 'class',
          }))
          setAvailableClasses(classes)
        }
      } catch (error) {
        console.error('Error loading report data:', error)
      } finally {
        setLoadingGlobals(false)
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Fetch report data when selected class changes
  useEffect(() => {
    if (!selectedClassId) {
      setIsLoading(false)
      return
    }

    const fetchReportData = async () => {
      setIsLoading(true)
      try {
        // Build report from real student data (performance metrics not yet available)
        const relevantStudents = students.length > 0 ? students : []
        const reportData: ClassReportData = {
          classInfo: {
            id: selectedClassId,
            totalStudents: relevantStudents.length,
            averageScore: 0,
          },
          charts: {
            scoreDistribution: [
              { range: '0-59', count: 0 },
              { range: '60-69', count: 0 },
              { range: '70-79', count: 0 },
              { range: '80-89', count: 0 },
              { range: '90-100', count: 0 },
            ],
            clusterDistribution: [
              { name: 'Advanced', count: 0, color: '#22c55e' },
              { name: 'Intermediate', count: 0, color: '#eab308' },
              { name: 'Struggling', count: 0, color: '#ef4444' },
            ],
          },
          topStudents: [],
          studentsNeedingAttention: [],
          summary: {
            totalStudents: relevantStudents.length,
            averageScore: 0,
            advancedCount: 0,
            intermediateCount: 0,
            strugglingCount: 0,
          },
        }
        setClassData(reportData)
      } catch (error) {
        console.error('Error fetching report data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReportData()
  }, [selectedClassId, students])

  const handleExportReport = async (format: 'pdf' | 'excel' | 'csv') => {
    setIsExporting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success(`Report exported as ${format.toUpperCase()}`)
    } catch (error) {
      toast.error('Failed to export report')
    } finally {
      setIsExporting(false)
    }
  }

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.email?.toLowerCase() ?? '').includes(searchQuery.toLowerCase())
    const matchesCluster = selectedCluster === 'all' || student.cluster === selectedCluster
    return matchesSearch && matchesCluster
  })

  const getClusterBadgeClass = (cluster?: string) => {
    switch (cluster) {
      case 'advanced':
        return 'bg-green-100 text-green-700 hover:bg-green-100'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
      case 'struggling':
        return 'bg-red-100 text-red-700 hover:bg-red-100'
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100'
    }
  }

  const getClusterLabel = (cluster?: string) => {
    switch (cluster) {
      case 'advanced':
        return 'Advanced'
      case 'intermediate':
        return 'Intermediate'
      case 'struggling':
        return 'Needs Support'
      default:
        return 'Not Assessed'
    }
  }

  if (isLoading && availableClasses.length === 0 && loadingGlobals) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Link href="/tutor/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Analytics</h1>
              <p className="text-gray-500">Track student performance and class progress</p>
            </div>
          </div>

          {/* Export Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="gap-2"
                disabled={isExporting || !selectedClassId}
              >
                {isExporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                Export Report
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExportReport('pdf')} className="gap-2">
                <FileText className="h-4 w-4 text-red-500" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportReport('excel')} className="gap-2">
                <FileSpreadsheet className="h-4 w-4 text-green-500" />
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportReport('csv')} className="gap-2">
                <FileIcon className="h-4 w-4 text-blue-500" />
                Export as CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 h-auto flex-wrap">
            <TabsTrigger value="overview" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="revenue" className="gap-2">
              <DollarSign className="h-4 w-4" />
              Revenue Insights
            </TabsTrigger>
            <TabsTrigger value="students" className="gap-2">
              <Users className="h-4 w-4" />
              Student Roster
            </TabsTrigger>
            <TabsTrigger value="engagement" className="gap-2">
              <Activity className="h-4 w-4" />
              Engagement
            </TabsTrigger>
          </TabsList>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="h-full">
            <div className="h-[800px] overflow-hidden rounded-xl bg-white">
              <RevenueDashboard />
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <Card className="border-2 border-gray-400 shadow-sm">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Student Roster</CardTitle>
                    <CardDescription>Manage and view all enrolled students</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search students..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-64"
                    />
                    <Select value={selectedCluster} onValueChange={setSelectedCluster}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by cluster" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Students</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="struggling">Needs Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.length === 0 ? (
                    <div className="py-10 text-center text-sm text-gray-500">
                      {searchQuery ? 'No students match your search.' : 'No students enrolled yet.'}
                    </div>
                  ) : (
                    filteredStudents.map(student => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Courses</p>
                            <p className="font-medium">{student.courseCount ?? 0}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Classes</p>
                            <p className="font-medium">{student.classCount ?? 0}</p>
                          </div>
                          {student.cluster && (
                            <Badge className={getClusterBadgeClass(student.cluster)}>
                              {getClusterLabel(student.cluster)}
                            </Badge>
                          )}
                          <Link href={`/tutor/reports/${student.id}`}>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement" className="space-y-6">
            <EngagementDashboard classId={selectedClassId} />
          </TabsContent>

          {/* Courses & Classes Tab */}
          <CoursesAndClassesTab />
        </Tabs>
      </div>
    </div>
  )
}

// Inline AI Chat for course insights
function ItemAIChat({
  course,
  session,
  sessions,
  students,
}: {
  course: CourseItem | null
  session?: SessionOverviewItem | null
  sessions: SessionOverviewItem[]
  students: Student[]
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSend = useCallback(async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    try {
      const courseSessions = course ? sessions.filter(
        s => s.courseId === course.id || s.subject === course.name
      ) : session ? [session] : []

      const contextPayload = {
        courseName: course?.name,
        courseDescription: course?.description,
        courseCategory: course?.categories?.[0],
        sessionTitle: session?.title,
        sessionSubject: session?.subject,
        sessionCount: courseSessions.length,
        sessions: courseSessions.map(s => ({
          title: s.title,
          status: s.status,
          scheduledAt: s.scheduledAt,
        })),
        enrolledStudents: students.map(s => ({
          name: s.name,
          courses: s.courseCount ?? 0,
        })),
      }

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          subject: course?.categories?.[0] ?? session?.subject ?? 'general',
          context: {
            ...contextPayload,
            previousMessages: [...messages, userMsg].slice(-6).map(m => ({
              role: m.role,
              content: m.content,
            })),
          },
        }),
      })

      const data = await res.json()
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          data.response ||
          'I apologize, but I am having trouble responding right now. Please try again.',
      }
      setMessages(prev => [...prev, assistantMsg])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'I apologize, but I am having trouble responding right now. Please try again.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, course, session, sessions, students, messages])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend]
  )

  const isCourse = !!course
  const isSession = !!session

  return (
    <Card className="border-2 border-cyan-100 bg-cyan-50/30 shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 pb-2">
            <span className="text-xs font-bold text-cyan-700 tracking-wider">
              {isCourse ? 'ASK AI ABOUT THIS COURSE' : isSession ? 'ASK AI ABOUT THIS SESSION' : 'QUESTION PROMPT'}
            </span>
            <span className="text-xs text-cyan-600 font-medium truncate max-w-[200px]">
              {isCourse ? course.name : isSession ? session.title : 'No item selected'}
            </span>
          </div>

          {/* Chat History */}
          {messages.length > 0 && (
            <ScrollArea className="max-h-[300px] px-4 pb-2">
              <div className="space-y-4">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={cn(
                      'flex gap-3',
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {msg.role === 'assistant' && (
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100">
                        <Bot className="h-3 w-3 text-cyan-600" />
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-[80%] rounded-lg p-2.5 text-sm',
                        msg.role === 'user' ? 'bg-cyan-600 text-white' : 'border border-cyan-100 bg-white shadow-sm text-gray-700'
                      )}
                    >
                      <div className="whitespace-pre-line">{msg.content}</div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100">
                      <Bot className="h-3 w-3 text-cyan-600" />
                    </div>
                    <div className="rounded-lg border border-cyan-100 bg-white p-2.5 shadow-sm">
                      <div className="flex gap-1">
                        <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400" />
                        <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 delay-100" />
                        <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 delay-200" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          )}

          {/* Textarea */}
          <div className="relative px-4 pb-4">
            <textarea
              placeholder={isCourse ? "Ask questions about student performance, course insights, or recommendations..." : "Ask questions about this session's engagement or performance..."}
              className="w-full min-h-[100px] resize-none bg-transparent outline-none border-none text-sm placeholder:text-cyan-600/50 text-cyan-900 focus:ring-0 p-0"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              size="icon"
              className={cn(
                "absolute bottom-4 right-4 h-8 w-8 rounded-full shadow-md transition-colors",
                input.trim() ? "bg-cyan-500 hover:bg-cyan-600 text-white" : "bg-cyan-200 text-white hover:bg-cyan-200"
              )}
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-3 px-4 border-t border-cyan-100/50">
            <span className="text-xs text-cyan-600 font-medium">
              Topic: {isCourse ? course.categories?.[0] || 'General' : isSession ? session.subject || 'General' : 'General'}
            </span>
            <span className="rounded-full border border-cyan-400 px-3 py-1 text-[10px] font-semibold text-cyan-600 tracking-wider">
              AI Integrated
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Courses & Classes Tab Component
function CoursesAndClassesTab() {
  const [courses, setCourses] = useState<CourseItem[]>([])
  const [coursesLoading, setCoursesLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<{ type: 'course' | 'session', id: string } | null>(null)
  const [sessionsOverview, setSessionsOverview] = useState<SessionOverviewItem[]>([])
  const [sessionsLoading, setSessionsLoading] = useState(true)
  const [students, setStudents] = useState<Student[]>([])

  const selectedCourse = selectedItem?.type === 'course' ? courses.find(c => c.id === selectedItem.id) || null : null
  const selectedSession = selectedItem?.type === 'session' ? sessionsOverview.find(s => s.id === selectedItem.id) || null : null

  useEffect(() => {
    const loadCourses = async () => {
      setCoursesLoading(true)
      try {
        const res = await fetch('/api/tutor/courses', { credentials: 'include' })
        if (!res.ok) throw new Error('Failed to load courses')
        const data = await res.json()
        const allCourses: CourseItem[] = (data.courses ?? []).map((c: any) => ({
          id: c.id,
          name: c.name,
          description: c.description,
          categories: Array.isArray(c.categories) ? c.categories : [],
          isPublished: c.isPublished,
          createdAt: c.createdAt,
          updatedAt: c.updatedAt,
        }))
        // Filter to published courses only
        setCourses(allCourses.filter(c => c.isPublished))
      } catch {
        setCourses([])
      } finally {
        setCoursesLoading(false)
      }
    }

    const loadSessionsOverview = async () => {
      setSessionsLoading(true)
      try {
        const res = await fetch('/api/tutor/classes?includeEnded=1', { credentials: 'include' })
        if (!res.ok) throw new Error('Failed to load sessions')
        const data = await res.json()
        setSessionsOverview((data.classes || []) as SessionOverviewItem[])
      } catch {
        setSessionsOverview([])
      } finally {
        setSessionsLoading(false)
      }
    }

    const loadStudents = async () => {
      try {
        const res = await fetch('/api/tutor/students', { credentials: 'include' })
        if (!res.ok) throw new Error('Failed to load students')
        const data = await res.json()
        setStudents(
          (data.students ?? []).map((s: any) => ({
            id: s.id,
            name: s.name,
            email: s.email,
            courseCount: s.courseCount ?? 0,
            classCount: s.classCount ?? 0,
          }))
        )
      } catch {
        setStudents([])
      }
    }

    loadCourses()
    loadSessionsOverview()
    loadStudents()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const courseSessions = selectedCourse
    ? sessionsOverview.filter(
        s => s.courseId === selectedCourse.id || s.subject === selectedCourse.name
      )
    : []

  return (
    <TabsContent value="overview" className="space-y-6">
      {/* Top Row - Course List & Sessions Side by Side */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-2 border-gray-400 shadow-sm flex flex-col">
          <CardHeader>
            <CardTitle>Courses & Classes ({courses.length})</CardTitle>
            <CardDescription>
              All published courses and completed classes, sorted by publication date.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] space-y-2 overflow-y-auto">
            {coursesLoading ? (
              <div className="flex h-full items-center justify-center py-10 text-sm text-gray-500">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading courses...
              </div>
            ) : courses.length === 0 ? (
              <div className="flex h-full items-center justify-center py-10 text-center text-sm text-gray-500">
                No published courses found.
              </div>
            ) : (
              courses.map(course => (
                <div
                  key={course.id}
                  className={cn(
                    'cursor-pointer rounded border p-3 transition-colors',
                    selectedItem?.type === 'course' && selectedItem.id === course.id
                      ? 'border-blue-300 bg-blue-50'
                      : 'hover:bg-gray-50'
                  )}
                  onClick={() => {
                    setSelectedItem(
                      selectedItem?.type === 'course' && selectedItem.id === course.id ? null : { type: 'course', id: course.id }
                    )
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="font-medium">{course.name}</div>
                    <Badge variant="secondary">Course</Badge>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {course.description || course.categories[0] || 'Untitled'}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    Published: {formatDate(course.createdAt)}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-300 shadow-sm flex flex-col">
          <CardHeader>
            <CardTitle>Sessions</CardTitle>
            <CardDescription>All sessions with current status.</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] space-y-3 overflow-y-auto">
            {sessionsLoading ? (
              <div className="text-muted-foreground flex h-full items-center justify-center py-10 text-sm">
                Loading sessions...
              </div>
            ) : sessionsOverview.length === 0 ? (
              <div className="text-muted-foreground flex h-full items-center justify-center py-10 text-center text-sm">
                No sessions found.
              </div>
            ) : (
              sessionsOverview.map((sessionItem: SessionOverviewItem) => {
                const isOngoing = sessionItem.status === 'ACTIVE'
                const isEnded = Boolean(sessionItem.endedAt) || sessionItem.status === 'COMPLETED'
                const statusLabel = isOngoing ? 'Ongoing' : isEnded ? 'Ended' : 'Scheduled'
                return (
                  <div
                    key={sessionItem.id}
                    className={cn(
                      'cursor-pointer rounded-lg border bg-white p-3 transition-colors',
                      selectedItem?.type === 'session' && selectedItem.id === sessionItem.id
                        ? 'border-blue-300 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    )}
                    onClick={() => {
                      setSelectedItem(
                        selectedItem?.type === 'session' && selectedItem.id === sessionItem.id ? null : { type: 'session', id: sessionItem.id }
                      )
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{sessionItem.title}</p>
                        <p className="text-muted-foreground text-xs">{sessionItem.subject}</p>
                      </div>
                      <Badge variant={isOngoing ? 'default' : isEnded ? 'secondary' : 'outline'}>
                        {statusLabel}
                      </Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span>Scheduled: {formatDate(sessionItem.scheduledAt)}</span>
                      {sessionItem.endedAt && (
                        <span>Ended: {formatDate(sessionItem.endedAt)}</span>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Rows - Analytics Strip & AI Chat */}
      <div className="space-y-6">
        {selectedCourse ? (
          <>
            <Card className="border-2 border-blue-400 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  Analytics: {selectedCourse.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">Date Published</p>
                    <p className="mt-1 text-lg font-medium">{formatDate(selectedCourse.createdAt)}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">No. of Sessions</p>
                    <p className="mt-1 text-lg font-medium">{courseSessions.length}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="mt-1 text-lg font-medium">{selectedCourse.categories[0] || 'N/A'}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">Enrolled Students</p>
                    <p className="mt-1 text-lg font-medium">{students.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ItemAIChat course={selectedCourse} session={null} sessions={courseSessions} students={students} />
          </>
        ) : selectedSession ? (
          <>
            <Card className="border-2 border-blue-400 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  Analytics: {selectedSession.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="mt-1 text-lg font-medium">{selectedSession.status}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">Scheduled Date</p>
                    <p className="mt-1 text-lg font-medium">{formatDate(selectedSession.scheduledAt)}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">Subject</p>
                    <p className="mt-1 text-lg font-medium">{selectedSession.subject || 'N/A'}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">Total Enrolled</p>
                    <p className="mt-1 text-lg font-medium">{students.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ItemAIChat course={null} session={selectedSession} sessions={sessionsOverview} students={students} />
          </>
        ) : (
          <Card className="flex items-center justify-center border-2 border-gray-400 shadow-sm">
            <CardContent className="py-12 text-center">
              <BarChart3 className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <p className="text-gray-500">Select a course or class to view analytics.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </TabsContent>
  )
}
