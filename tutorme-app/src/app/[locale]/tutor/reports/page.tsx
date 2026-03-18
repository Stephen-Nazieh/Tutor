'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
  subject: string
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
  averageScore: number
  completionRate: number
  cluster: string
}

// Mock Courses Data
const MOCK_COURSES = [
  {
    id: 'course-1',
    name: 'Advanced Mathematics - Calculus',
    description: 'Comprehensive calculus course covering limits, derivatives, and integrals',
    subject: 'Mathematics',
    publishedAt: '2024-12-15T10:00:00Z',
    sessions: 24,
    tasks: 48,
    assessments: 8,
    avgScore: 78,
    completionRate: 85,
    type: 'course' as const
  },
  {
    id: 'course-2',
    name: 'AP Physics 1 - Mechanics',
    description: 'Preparation for AP Physics 1 exam with focus on mechanics',
    subject: 'Physics',
    publishedAt: '2024-11-20T14:00:00Z',
    sessions: 20,
    tasks: 40,
    assessments: 6,
    avgScore: 82,
    completionRate: 92,
    type: 'course' as const
  },
  {
    id: 'course-3',
    name: 'IELTS Academic Writing',
    description: 'Intensive writing practice for IELTS Academic test',
    subject: 'English',
    publishedAt: '2024-10-05T09:00:00Z',
    sessions: 16,
    tasks: 32,
    assessments: 4,
    avgScore: 75,
    completionRate: 78,
    type: 'course' as const
  },
  {
    id: 'class-1',
    name: 'SAT Math Prep - December Intensive',
    description: 'SAT Mathematics',
    subject: 'Mathematics',
    publishedAt: '2024-12-01T08:00:00Z',
    sessions: 1,
    tasks: 12,
    assessments: 2,
    avgScore: 88,
    completionRate: 95,
    type: 'class' as const
  },
  {
    id: 'class-2',
    name: 'IB Chemistry Lab Session',
    description: 'Chemistry',
    subject: 'Chemistry',
    publishedAt: '2024-11-15T13:00:00Z',
    sessions: 1,
    tasks: 8,
    assessments: 1,
    avgScore: 81,
    completionRate: 88,
    type: 'class' as const
  }
]

// Mock AI Chat Responses
const MOCK_AI_RESPONSES: Record<string, string> = {
  'average completion rate': 'Based on the data from "Advanced Mathematics - Calculus", the average completion rate is 85%. This is 5% higher than your other courses. The high completion rate is likely due to the structured lesson plan and regular assessments.',
  'completion rate': 'Based on the data from "Advanced Mathematics - Calculus", the average completion rate is 85%. This is 5% higher than your other courses. The high completion rate is likely due to the structured lesson plan and regular assessments.',
  'students struggling': 'I\'ve identified 3 students who may need additional support in "AP Physics 1 - Mechanics":\n\n1. Alex Johnson (avg score: 62%) - struggling with kinematics\n2. Maria Garcia (avg score: 58%) - needs help with force diagrams\n3. David Lee (avg score: 55%) - difficulty with energy conservation\n\nConsider offering extra office hours or supplementary materials on these topics.',
  'struggling': 'I\'ve identified 3 students who may need additional support in "AP Physics 1 - Mechanics":\n\n1. Alex Johnson (avg score: 62%) - struggling with kinematics\n2. Maria Garcia (avg score: 58%) - needs help with force diagrams\n3. David Lee (avg score: 55%) - difficulty with energy conservation\n\nConsider offering extra office hours or supplementary materials on these topics.',
  'difficult topics': 'Analysis of assessment data for "IELTS Academic Writing" shows students are struggling most with:\n\n1. Task 2 Essay Structure (avg score: 68%)\n2. Academic Vocabulary Usage (avg score: 71%)\n3. Coherence and Cohesion (avg score: 73%)\n\nConsider adding more practice exercises in these areas.',
  'topics': 'Analysis of assessment data for "IELTS Academic Writing" shows students are struggling most with:\n\n1. Task 2 Essay Structure (avg score: 68%)\n2. Academic Vocabulary Usage (avg score: 71%)\n3. Coherence and Cohesion (avg score: 73%)\n\nConsider adding more practice exercises in these areas.',
  'improvements': 'Here are my recommendations for improving "Advanced Mathematics - Calculus":\n\n1. Add more interactive exercises between sessions 5-10 where the dropout rate is highest\n2. Consider breaking down the integration techniques module into smaller chunks\n3. Add formative assessments after each major concept\n4. Provide video solutions for the most challenging homework problems\n\nImplementing these could improve completion rates by an estimated 10-15%.',
  'recommendations': 'Here are my recommendations for improving "Advanced Mathematics - Calculus":\n\n1. Add more interactive exercises between sessions 5-10 where the dropout rate is highest\n2. Consider breaking down the integration techniques module into smaller chunks\n3. Add formative assessments after each major concept\n4. Provide video solutions for the most challenging homework problems\n\nImplementing these could improve completion rates by an estimated 10-15%.',
  'compare': 'Comparing your top 3 courses:\n\n1. SAT Math Prep - Highest avg score (88%), shortest duration\n2. AP Physics 1 - Best completion rate (92%), good engagement\n3. Advanced Mathematics - Most comprehensive, moderate scores\n\nThe SAT prep success suggests your intensive format works well. Consider applying similar pacing to other courses.',
  'performance': 'Overall course performance summary:\n\n• Total Students: 127 across all courses\n• Average Course Rating: 4.6/5.0\n• Most Popular: AP Physics 1 (45 enrollments)\n• Highest Completion: SAT Math Prep (95%)\n• Area for Improvement: IELTS Writing (78% completion)\n\nYour STEM courses are performing exceptionally well!',
  'enrollment': 'Recent enrollment trends:\n\n• December 2024: +23 new students (+18%)\n• November 2024: +19 new students (+15%)\n• October 2024: +15 new students (+12%)\n\nYour mathematics courses are driving most growth. Consider creating more advanced math content to capitalize on this trend.',
  'default': 'I\'ve analyzed the data for this course. Here are some insights:\n\n• The course has a solid foundation with good student engagement\n• Assessment scores are within the expected range\n• Consider reviewing the materials for sessions where completion drops\n• Overall, this is performing at or above average compared to similar courses\n\nWould you like me to dive deeper into any specific aspect?'
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
  const [globalAttentionStudents, setGlobalAttentionStudents] = useState<any[]>([])
  const [globalAllStudents, setGlobalAllStudents] = useState<any[]>([])
  const [loadingGlobals, setLoadingGlobals] = useState(true)

  // Mock data for initial load
  const mockStudents: Student[] = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', averageScore: 92, completionRate: 95, cluster: 'advanced' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', averageScore: 78, completionRate: 82, cluster: 'intermediate' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', averageScore: 65, completionRate: 70, cluster: 'intermediate' },
    { id: '4', name: 'Diana Prince', email: 'diana@example.com', averageScore: 88, completionRate: 90, cluster: 'advanced' },
    { id: '5', name: 'Eve Davis', email: 'eve@example.com', averageScore: 55, completionRate: 60, cluster: 'struggling' },
    { id: '6', name: 'Frank Wilson', email: 'frank@example.com', averageScore: 72, completionRate: 75, cluster: 'intermediate' },
    { id: '7', name: 'Grace Lee', email: 'grace@example.com', averageScore: 95, completionRate: 98, cluster: 'advanced' },
    { id: '8', name: 'Henry Taylor', email: 'henry@example.com', averageScore: 48, completionRate: 55, cluster: 'struggling' },
  ]

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setStudents(mockStudents)
      setAvailableClasses([
        { id: 'class-1', title: 'Mathematics 101', subject: 'Math', type: 'class' },
        { id: 'course-1', title: 'Advanced Physics', subject: 'Physics', type: 'course' },
        { id: 'class-2', title: 'English Literature', subject: 'English', type: 'class' },
      ])
      setGlobalAttentionStudents(mockStudents.filter(s => s.cluster === 'struggling'))
      setGlobalAllStudents(mockStudents)
      setLoadingGlobals(false)
      setIsLoading(false)
    }, 1000)
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
        // Mock data
        const mockData: ClassReportData = {
          classInfo: {
            id: selectedClassId,
            totalStudents: mockStudents.length,
            averageScore: Math.round(mockStudents.reduce((acc, s) => acc + s.averageScore, 0) / mockStudents.length)
          },
          charts: {
            scoreDistribution: [
              { range: '0-59', count: mockStudents.filter(s => s.averageScore < 60).length },
              { range: '60-69', count: mockStudents.filter(s => s.averageScore >= 60 && s.averageScore < 70).length },
              { range: '70-79', count: mockStudents.filter(s => s.averageScore >= 70 && s.averageScore < 80).length },
              { range: '80-89', count: mockStudents.filter(s => s.averageScore >= 80 && s.averageScore < 90).length },
              { range: '90-100', count: mockStudents.filter(s => s.averageScore >= 90).length },
            ],
            clusterDistribution: [
              { name: 'Advanced', count: mockStudents.filter(s => s.cluster === 'advanced').length, color: '#22c55e' },
              { name: 'Intermediate', count: mockStudents.filter(s => s.cluster === 'intermediate').length, color: '#eab308' },
              { name: 'Struggling', count: mockStudents.filter(s => s.cluster === 'struggling').length, color: '#ef4444' },
            ]
          },
          topStudents: mockStudents
            .sort((a, b) => b.averageScore - a.averageScore)
            .slice(0, 5)
            .map(s => ({
              id: s.id,
              name: s.name,
              averageScore: s.averageScore,
              completionRate: s.completionRate
            })),
          studentsNeedingAttention: mockStudents
            .filter(s => s.averageScore < 60 || s.cluster === 'struggling')
            .slice(0, 5)
            .map(s => ({
              id: s.id,
              name: s.name,
              averageScore: s.averageScore,
              issue: s.averageScore < 60 ? 'Low scores' : 'Needs support'
            })),
          summary: {
            totalStudents: mockStudents.length,
            averageScore: Math.round(mockStudents.reduce((acc, s) => acc + s.averageScore, 0) / mockStudents.length),
            advancedCount: mockStudents.filter(s => s.cluster === 'advanced').length,
            intermediateCount: mockStudents.filter(s => s.cluster === 'intermediate').length,
            strugglingCount: mockStudents.filter(s => s.cluster === 'struggling').length,
          }
        }
        setClassData(mockData)
      } catch (error) {
        console.error('Error fetching report data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReportData()
  }, [selectedClassId])

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
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCluster = selectedCluster === 'all' || student.cluster === selectedCluster
    return matchesSearch && matchesCluster
  })

  const getClusterBadgeClass = (cluster: string) => {
    switch (cluster) {
      case 'advanced': return 'bg-green-100 text-green-700 hover:bg-green-100'
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
      case 'struggling': return 'bg-red-100 text-red-700 hover:bg-red-100'
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100'
    }
  }

  const getClusterLabel = (cluster: string) => {
    switch (cluster) {
      case 'advanced': return 'Advanced'
      case 'intermediate': return 'Intermediate'
      case 'struggling': return 'Needs Support'
      default: return cluster
    }
  }

  if (isLoading && availableClasses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
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
              <Button variant="outline" className="gap-2" disabled={isExporting || !selectedClassId}>
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

        {/* Class Selector */}
        <Card className="mb-6 border-2 border-gray-400 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Select Class/Course:</span>
              </div>
              <Select value={selectedClassId} onValueChange={setSelectedClassId}>
                <SelectTrigger className="w-full sm:w-[400px]">
                  <SelectValue placeholder="Choose a class or course..." />
                </SelectTrigger>
                <SelectContent>
                  {availableClasses.length === 0 ? (
                    <SelectItem value="no-classes" disabled>No classes available</SelectItem>
                  ) : (
                    availableClasses.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        <div className="flex items-center gap-2">
                          <Badge variant={cls.type === 'class' ? 'default' : 'secondary'} className="text-xs">
                            {cls.type === 'class' ? 'Class' : 'Course'}
                          </Badge>
                          <span>{cls.title}</span>
                          <span className="text-gray-500 text-sm">({cls.subject})</span>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {selectedClassId && (
                <Badge variant="outline" className="text-sm">
                  {availableClasses.find(c => c.id === selectedClassId)?.type === 'class' ? 'Live Session' : 'Online Course'}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex-wrap h-auto">
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Student Roster</CardTitle>
                    <CardDescription>Manage and view all enrolled students</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search students..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
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
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
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
                          <p className="text-sm text-gray-500">Average Score</p>
                          <p className="font-medium">{student.averageScore}%</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Completion</p>
                          <p className="font-medium">{student.completionRate}%</p>
                        </div>
                        <Badge className={getClusterBadgeClass(student.cluster)}>
                          {getClusterLabel(student.cluster)}
                        </Badge>
                        <Link href={`/tutor/reports/${student.id}`}>
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
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

// Courses & Classes Tab Component
function CoursesAndClassesTab() {
  const [courses] = useState(MOCK_COURSES)
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)
  const [chatQuery, setChatQuery] = useState('')
  const [chatHistory, setChatHistory] = useState<Array<{role: 'user' | 'ai', message: string}>>([])
  const [isAiTyping, setIsAiTyping] = useState(false)

  const selectedCourse = courses.find(c => c.id === selectedCourseId)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleAskQuestion = async () => {
    if (!chatQuery.trim() || !selectedCourse) return

    const question = chatQuery.trim()
    setChatHistory(prev => [...prev, { role: 'user', message: question }])
    setChatQuery('')
    setIsAiTyping(true)

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Find matching response or use default
    const lowerQuestion = question.toLowerCase()
    let response = MOCK_AI_RESPONSES.default
    
    for (const [key, value] of Object.entries(MOCK_AI_RESPONSES)) {
      if (key !== 'default' && lowerQuestion.includes(key)) {
        response = value
        break
      }
    }

    // Replace course name in response
    response = response.replace(/"[^"]+"/, `"${selectedCourse.name}"`)

    setChatHistory(prev => [...prev, { role: 'ai', message: response }])
    setIsAiTyping(false)
  }

  return (
    <TabsContent value="overview" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Course List */}
        <Card className="border-2 border-gray-400 shadow-sm">
          <CardHeader>
            <CardTitle>Courses & Classes ({courses.length})</CardTitle>
            <CardDescription>
              All published courses and completed classes, sorted by publication date.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[500px] overflow-y-auto">
            {courses.map((course) => (
              <div
                key={course.id}
                className={cn(
                  "rounded border p-3 cursor-pointer transition-colors",
                  selectedCourseId === course.id ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                )}
                onClick={() => {
                  setSelectedCourseId(course.id === selectedCourseId ? null : course.id)
                  setChatHistory([]) // Clear chat when switching courses
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="font-medium">{course.name}</div>
                  <Badge variant={course.type === 'class' ? 'default' : 'secondary'}>
                    {course.type === 'class' ? 'Class' : 'Course'}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">{course.description || course.subject}</div>
                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  Published: {formatDate(course.publishedAt)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right Side - Analytics & AI Chat */}
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
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Date Published</p>
                      <p className="font-medium">{formatDate(selectedCourse.publishedAt)}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">No. of Sessions</p>
                      <p className="font-medium">{selectedCourse.sessions}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Task Completion Rate</p>
                      <p className="font-medium">{selectedCourse.completionRate}%</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Number of Tasks</p>
                      <p className="font-medium">{selectedCourse.tasks}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Number of Assessments</p>
                      <p className="font-medium">{selectedCourse.assessments}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Avg Score on Assessments</p>
                      <p className="font-medium">{selectedCourse.avgScore}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Chat Area */}
              <Card className="border-2 border-gray-400 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bot className="h-5 w-5 text-purple-500" />
                    Ask AI about this {selectedCourse.type}
                  </CardTitle>
                  <CardDescription>
                    Ask questions about student performance, course insights, or recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Chat History */}
                    {chatHistory.length > 0 && (
                      <ScrollArea className="h-[300px] border rounded-lg p-4 bg-gray-50">
                        <div className="space-y-4">
                          {chatHistory.map((msg, idx) => (
                            <div
                              key={idx}
                              className={cn(
                                "flex gap-3",
                                msg.role === 'user' ? 'justify-end' : 'justify-start'
                              )}
                            >
                              {msg.role === 'ai' && (
                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                  <Bot className="h-4 w-4 text-purple-600" />
                                </div>
                              )}
                              <div
                                className={cn(
                                  "max-w-[80%] rounded-lg p-3 text-sm",
                                  msg.role === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white border shadow-sm'
                                )}
                              >
                                <div className="whitespace-pre-line">{msg.message}</div>
                              </div>
                              {msg.role === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                  <User className="h-4 w-4 text-blue-600" />
                                </div>
                              )}
                            </div>
                          ))}
                          {isAiTyping && (
                            <div className="flex gap-3">
                              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                <Bot className="h-4 w-4 text-purple-600" />
                              </div>
                              <div className="bg-white border shadow-sm rounded-lg p-3">
                                <div className="flex gap-1">
                                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100" />
                                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    )}

                    {/* Input Area */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g., Which students are struggling with this course?"
                        value={chatQuery}
                        onChange={(e) => setChatQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && chatQuery.trim()) {
                            handleAskQuestion()
                          }
                        }}
                      />
                      <Button 
                        onClick={handleAskQuestion}
                        disabled={!chatQuery.trim() || isAiTyping}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Example Questions */}
                    <div className="text-xs text-gray-500">
                      Example questions:
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['What is the average completion rate?', 'Which students are struggling?', 'Recommend improvements', 'Compare with other courses'].map((q) => (
                          <button
                            key={q}
                            onClick={() => setChatQuery(q)}
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs transition-colors"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="h-full flex items-center justify-center min-h-[400px] border-2 border-gray-400 shadow-sm">
              <CardContent className="text-center py-12">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">Select a course or class to view analytics.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </TabsContent>
  )
}
