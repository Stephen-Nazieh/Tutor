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
  TrendingUp, 
  Users, 
  BookOpen, 
  Award,
  ArrowLeft,
  Download,
  BarChart3,
  Loader2,
  Search,
  ChevronRight,
  GraduationCap,
  AlertTriangle,
  Calendar
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { ScoreDistributionChart } from '@/components/analytics/score-distribution-chart'

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

export default function TutorReports() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [classData, setClassData] = useState<ClassReportData | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  
  // Class selector state
  const [availableClasses, setAvailableClasses] = useState<ClassOption[]>([])
  const [selectedClassId, setSelectedClassId] = useState<string>('')

  // Fetch available classes on mount
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const [classesRes, coursesRes] = await Promise.all([
          fetch('/api/tutor/classes', { credentials: 'include' }),
          fetch('/api/tutor/courses', { credentials: 'include' }),
        ])
        
        let options: ClassOption[] = []
        
        if (classesRes.ok) {
          const classesData = await classesRes.json()
          const classOptions = (classesData.classes || []).map((c: any) => ({
            id: c.id,
            title: c.title,
            subject: c.subject,
            type: 'class' as const,
          }))
          options = [...options, ...classOptions]
        }
        
        if (coursesRes.ok) {
          const coursesData = await coursesRes.json()
          const courseOptions = (coursesData.courses || []).map((c: any) => ({
            id: c.id,
            title: c.name,
            subject: c.subject,
            type: 'course' as const,
          }))
          options = [...options, ...courseOptions]
        }
        
        setAvailableClasses(options)
        
        // Select first class by default if available
        if (options.length > 0 && !selectedClassId) {
          setSelectedClassId(options[0].id)
        }
      } catch (error) {
        console.error('Error fetching classes:', error)
        toast.error('Failed to load classes')
      }
    }
    
    fetchClasses()
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
        // Fetch class report
        const reportRes = await fetch(`/api/reports/class/${selectedClassId}`, {
          credentials: 'include',
        })
        
        if (reportRes.ok) {
          const reportData = await reportRes.json()
          if (reportData.success) {
            setClassData(reportData.data)
          }
        }
        
        // Fetch students list
        const analyticsRes = await fetch(`/api/analytics/class/${selectedClassId}`, {
          credentials: 'include',
        })
        
        if (analyticsRes.ok) {
          const analyticsData = await analyticsRes.json()
          if (analyticsData.success && analyticsData.data?.students) {
            setStudents(analyticsData.data.students.map((s: any) => ({
              id: s.id,
              name: s.name || `Student ${s.id.slice(-6)}`,
              averageScore: s.averageScore || 0,
              completionRate: s.completionRate || 0,
              cluster: s.cluster || 'intermediate'
            })))
          }
        }
      } catch (error) {
        console.error('Error fetching report data:', error)
        toast.error('Failed to load report data')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchReportData()
  }, [selectedClassId])

  const handleExportReport = () => {
    if (!classData || students.length === 0) {
      toast.info('No data to export')
      return
    }
    
    // Create CSV content
    const csvRows = [
      ['Student Name', 'Average Score', 'Completion Rate', 'Cluster'].join(','),
      ...students.map(s => [
        `"${s.name}"`,
        s.averageScore,
        `${s.completionRate}%`,
        s.cluster,
      ].join(','))
    ]
    
    const csvContent = csvRows.join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `class-report-${selectedClassId}-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
    
    toast.success('Report exported successfully')
  }

  const handleStudentClick = (studentId: string) => {
    router.push(`/tutor/reports/${studentId}`)
  }

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getClusterBadgeColor = (cluster: string) => {
    switch (cluster) {
      case 'advanced': return 'bg-green-100 text-green-700 hover:bg-green-100'
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
      case 'struggling': return 'bg-red-100 text-red-700 hover:bg-red-100'
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100'
    }
  }

  const getClusterLabel = (cluster: string) => {
    switch (cluster) {
      case 'advanced': return '优秀'
      case 'intermediate': return '中等'
      case 'struggling': return '需帮助'
      default: return cluster
    }
  }

  // Mock data for initial load when no API data
  const mockClassData: ClassReportData = {
    classInfo: {
      id: selectedClassId || 'default',
      totalStudents: students.length || 0,
      averageScore: students.length 
        ? Math.round(students.reduce((acc, s) => acc + s.averageScore, 0) / students.length)
        : 0
    },
    charts: {
      scoreDistribution: [
        { range: '0-59', count: students.filter(s => s.averageScore < 60).length },
        { range: '60-69', count: students.filter(s => s.averageScore >= 60 && s.averageScore < 70).length },
        { range: '70-79', count: students.filter(s => s.averageScore >= 70 && s.averageScore < 80).length },
        { range: '80-89', count: students.filter(s => s.averageScore >= 80 && s.averageScore < 90).length },
        { range: '90-100', count: students.filter(s => s.averageScore >= 90).length },
      ],
      clusterDistribution: [
        { name: '优秀', count: students.filter(s => s.cluster === 'advanced').length, color: '#22c55e' },
        { name: '中等', count: students.filter(s => s.cluster === 'intermediate').length, color: '#eab308' },
        { name: '需帮助', count: students.filter(s => s.cluster === 'struggling').length, color: '#ef4444' },
      ]
    },
    topStudents: students
      .sort((a, b) => b.averageScore - a.averageScore)
      .slice(0, 5)
      .map(s => ({
        id: s.id,
        name: s.name,
        averageScore: s.averageScore,
        completionRate: s.completionRate
      })),
    studentsNeedingAttention: students
      .filter(s => s.averageScore < 60 || s.cluster === 'struggling')
      .slice(0, 5)
      .map(s => ({
        id: s.id,
        name: s.name,
        averageScore: s.averageScore,
        issue: s.averageScore < 60 ? 'Low scores' : 'Needs support'
      })),
    summary: {
      totalStudents: students.length,
      averageScore: students.length 
        ? Math.round(students.reduce((acc, s) => acc + s.averageScore, 0) / students.length)
        : 0,
      advancedCount: students.filter(s => s.cluster === 'advanced').length,
      intermediateCount: students.filter(s => s.cluster === 'intermediate').length,
      strugglingCount: students.filter(s => s.cluster === 'struggling').length,
    }
  }

  const displayData = classData || mockClassData
  const selectedClassInfo = availableClasses.find(c => c.id === selectedClassId)

  if (isLoading && availableClasses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Link href="/tutor/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Reports & Analytics</h1>
              <p className="text-gray-500">Track student performance and class progress</p>
            </div>
          </div>
          <Button variant="outline" className="gap-2" onClick={handleExportReport}>
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Class Selector */}
        <Card className="mb-6">
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
              {selectedClassInfo && (
                <Badge variant="outline" className="text-sm">
                  {selectedClassInfo.type === 'class' ? 'Live Session' : 'Online Course'}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : !selectedClassId ? (
          <Card className="py-12">
            <CardContent className="text-center">
              <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No Class Selected</h3>
              <p className="text-gray-500">
                Please select a class or course from the dropdown above to view reports.
              </p>
            </CardContent>
          </Card>
        ) : students.length === 0 ? (
          <Card className="py-12">
            <CardContent className="text-center">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No Students Yet</h3>
              <p className="text-gray-500">
                This {selectedClassInfo?.type || 'class'} doesn&apos;t have any enrolled students yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Class Overview
              </TabsTrigger>
              <TabsTrigger value="students" className="gap-2">
                <Users className="h-4 w-4" />
                All Students
              </TabsTrigger>
            </TabsList>

            {/* Class Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Students</p>
                        <p className="text-3xl font-bold">{displayData.summary.totalStudents}</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Class Average</p>
                        <p className="text-3xl font-bold">{displayData.summary.averageScore}%</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Advanced</p>
                        <p className="text-3xl font-bold text-green-600">
                          {displayData.summary.advancedCount}
                        </p>
                      </div>
                      <Award className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Need Help</p>
                        <p className="text-3xl font-bold text-red-600">
                          {displayData.summary.strugglingCount}
                        </p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Score Distribution</CardTitle>
                    <CardDescription>Distribution of student scores across the class</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScoreDistributionChart data={displayData.charts.scoreDistribution} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Clusters</CardTitle>
                    <CardDescription>Student grouping by performance level</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {displayData.charts.clusterDistribution.map((cluster) => (
                        <div key={cluster.name} className="flex items-center gap-4">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: cluster.color }}
                          />
                          <span className="flex-1">{cluster.name}</span>
                          <span className="font-bold">{cluster.count}</span>
                          <span className="text-sm text-gray-500">
                            {displayData.summary.totalStudents > 0 
                              ? Math.round((cluster.count / displayData.summary.totalStudents) * 100)
                              : 0}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Student Lists */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performers</CardTitle>
                    <CardDescription>Students with highest scores</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {displayData.topStudents.length > 0 ? displayData.topStudents.map((student, index) => (
                        <div 
                          key={student.id} 
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => handleStudentClick(student.id)}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-gray-400 w-6">#{index + 1}</span>
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-blue-100 text-blue-700">
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <span className="font-medium block">{student.name}</span>
                              <span className="text-xs text-gray-500">
                                {student.completionRate}% completion
                              </span>
                            </div>
                          </div>
                          <Badge variant="default" className="bg-green-100 text-green-700">
                            {student.averageScore}%
                          </Badge>
                        </div>
                      )) : (
                        <p className="text-center text-gray-500 py-4">No students yet</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Needs Attention</CardTitle>
                    <CardDescription>Students who may need additional support</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {displayData.studentsNeedingAttention.length > 0 ? displayData.studentsNeedingAttention.map((student) => (
                        <div 
                          key={student.id} 
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => handleStudentClick(student.id)}
                        >
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.issue}</p>
                          </div>
                          <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100">
                            {student.averageScore}%
                          </Badge>
                        </div>
                      )) : (
                        <p className="text-center text-gray-500 py-4">All students are doing well!</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* All Students Tab */}
            <TabsContent value="students" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>All Students</CardTitle>
                      <CardDescription>Click on a student to view detailed report</CardDescription>
                    </div>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search students..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                      <div 
                        key={student.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => handleStudentClick(student.id)}
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-blue-100 text-blue-700 text-lg">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-lg">{student.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getClusterBadgeColor(student.cluster)}>
                                {getClusterLabel(student.cluster)}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {student.completionRate}% completion
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-2xl font-bold">{student.averageScore}%</p>
                            <p className="text-sm text-gray-500">Average Score</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-12">
                        <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">
                          {searchQuery ? 'No students match your search' : 'No students enrolled yet'}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
