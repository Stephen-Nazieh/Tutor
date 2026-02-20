'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { 
  TrendingUp, 
  Clock, 
  Target, 
  AlertTriangle,
  Search,
  ChevronRight,
  BarChart3,
  BookOpen,
  Award,
  MoreHorizontal,
  Filter
} from 'lucide-react'

interface StudentProgress {
  id: string
  name: string
  email: string
  avatar?: string
  overallProgress: number
  timeSpent: number // in minutes
  sessionsAttended: number
  totalSessions: number
  lastActive: string
  skillLevels: {
    subject: string
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
    progress: number
  }[]
  recentScores: number[]
  strugglingAreas: string[]
  strengths: string[]
  engagementRate: number
  assignmentCompletion: number
}

interface StudentProgressCardProps {
  students?: StudentProgress[]
  loading?: boolean
}

const generateDemoStudents = (): StudentProgress[] => [
  {
    id: '1',
    name: 'Alice Zhang',
    email: 'alice@example.com',
    overallProgress: 78,
    timeSpent: 1240,
    sessionsAttended: 12,
    totalSessions: 14,
    lastActive: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    skillLevels: [
      { subject: 'Calculus', level: 'intermediate', progress: 75 },
      { subject: 'Algebra', level: 'advanced', progress: 88 },
      { subject: 'Geometry', level: 'intermediate', progress: 70 },
    ],
    recentScores: [85, 82, 88, 90],
    strugglingAreas: ['Integration by parts'],
    strengths: ['Linear equations', 'Factoring'],
    engagementRate: 92,
    assignmentCompletion: 95,
  },
  {
    id: '2',
    name: 'Bob Li',
    email: 'bob@example.com',
    overallProgress: 45,
    timeSpent: 680,
    sessionsAttended: 8,
    totalSessions: 14,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    skillLevels: [
      { subject: 'Calculus', level: 'beginner', progress: 35 },
      { subject: 'Algebra', level: 'intermediate', progress: 55 },
      { subject: 'Geometry', level: 'beginner', progress: 40 },
    ],
    recentScores: [55, 58, 52, 60],
    strugglingAreas: ['Derivatives', 'Limits', 'Functions'],
    strengths: ['Basic arithmetic'],
    engagementRate: 65,
    assignmentCompletion: 60,
  },
  {
    id: '3',
    name: 'Carol Wang',
    email: 'carol@example.com',
    overallProgress: 92,
    timeSpent: 1560,
    sessionsAttended: 13,
    totalSessions: 14,
    lastActive: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    skillLevels: [
      { subject: 'Calculus', level: 'advanced', progress: 95 },
      { subject: 'Algebra', level: 'expert', progress: 98 },
      { subject: 'Geometry', level: 'advanced', progress: 90 },
    ],
    recentScores: [95, 98, 92, 96],
    strugglingAreas: [],
    strengths: ['Problem solving', 'Critical thinking', 'All topics'],
    engagementRate: 98,
    assignmentCompletion: 100,
  },
  {
    id: '4',
    name: 'David Chen',
    email: 'david@example.com',
    overallProgress: 62,
    timeSpent: 890,
    sessionsAttended: 10,
    totalSessions: 14,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    skillLevels: [
      { subject: 'Calculus', level: 'beginner', progress: 45 },
      { subject: 'Algebra', level: 'intermediate', progress: 68 },
      { subject: 'Geometry', level: 'intermediate', progress: 72 },
    ],
    recentScores: [70, 65, 72, 68],
    strugglingAreas: ['Chain rule'],
    strengths: ['Geometric proofs'],
    engagementRate: 78,
    assignmentCompletion: 80,
  },
  {
    id: '5',
    name: 'Emma Liu',
    email: 'emma@example.com',
    overallProgress: 85,
    timeSpent: 1320,
    sessionsAttended: 13,
    totalSessions: 14,
    lastActive: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    skillLevels: [
      { subject: 'Calculus', level: 'intermediate', progress: 82 },
      { subject: 'Algebra', level: 'advanced', progress: 90 },
      { subject: 'Geometry', level: 'intermediate', progress: 78 },
    ],
    recentScores: [88, 85, 90, 87],
    strugglingAreas: ['Optimization problems'],
    strengths: ['Derivatives', 'Graphing'],
    engagementRate: 95,
    assignmentCompletion: 92,
  },
]

const getLevelColor = (level: string) => {
  switch (level) {
    case 'beginner': return 'bg-red-100 text-red-700 border-red-200'
    case 'intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    case 'advanced': return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'expert': return 'bg-green-100 text-green-700 border-green-200'
    default: return 'bg-gray-100 text-gray-700'
  }
}

const getProgressColor = (progress: number) => {
  if (progress >= 80) return 'bg-green-500'
  if (progress >= 60) return 'bg-blue-500'
  if (progress >= 40) return 'bg-yellow-500'
  return 'bg-red-500'
}

const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0) return `${hours}h ${mins}m`
  return `${mins}m`
}

const formatLastActive = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 1000 / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

export function StudentProgressCard({ students: initialStudents, loading }: StudentProgressCardProps) {
  const [students] = useState<StudentProgress[]>(initialStudents || generateDemoStudents())
  const [searchQuery, setSearchQuery] = useState('')
  const [filterLevel, setFilterLevel] = useState<string>('all')
  const [selectedStudent, setSelectedStudent] = useState<StudentProgress | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = filterLevel === 'all' || 
                        student.skillLevels.some(s => s.level === filterLevel)
    return matchesSearch && matchesLevel
  })

  // Calculate class averages
  const classAverage = Math.round(students.reduce((sum, s) => sum + s.overallProgress, 0) / students.length)
  const avgEngagement = Math.round(students.reduce((sum, s) => sum + s.engagementRate, 0) / students.length)
  const strugglingCount = students.filter(s => s.overallProgress < 60).length

  if (loading) {
    return (
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <CardTitle className="text-base">Student Progress</CardTitle>
            </div>
            <div className="flex gap-2">
              {strugglingCount > 0 && (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {strugglingCount} Need Help
                </Badge>
              )}
            </div>
          </div>

          {/* Class Summary */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="p-2 bg-blue-50 rounded-lg text-center">
              <p className="text-lg font-bold text-blue-700">{classAverage}%</p>
              <p className="text-xs text-blue-600">Class Avg</p>
            </div>
            <div className="p-2 bg-green-50 rounded-lg text-center">
              <p className="text-lg font-bold text-green-700">{avgEngagement}%</p>
              <p className="text-xs text-green-600">Engagement</p>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg text-center">
              <p className="text-lg font-bold text-purple-700">{students.length}</p>
              <p className="text-xs text-purple-600">Students</p>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex gap-2 mt-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="h-9 px-2 border rounded-lg text-sm bg-white"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0">
          <div>
            <div className="space-y-2 px-4 pb-4">
              {filteredStudents.length === 0 ? (
                <div className="text-center py-8">
                  <TrendingUp className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No students found</p>
                </div>
              ) : (
                filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md",
                      student.overallProgress < 60 
                        ? "bg-red-50 border-red-200" 
                        : "bg-white border-gray-200"
                    )}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className={cn(
                          "text-sm",
                          student.overallProgress >= 80 ? "bg-green-100 text-green-700" :
                          student.overallProgress >= 60 ? "bg-blue-100 text-blue-700" :
                          "bg-red-100 text-red-700"
                        )}>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate">{student.name}</p>
                          <span className={cn(
                            "text-xs font-bold",
                            student.overallProgress >= 80 ? "text-green-600" :
                            student.overallProgress >= 60 ? "text-blue-600" :
                            "text-red-600"
                          )}>
                            {student.overallProgress}%
                          </span>
                        </div>

                        <Progress 
                          value={student.overallProgress} 
                          className="h-1.5 mt-1"
                        />

                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(student.timeSpent)}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {student.sessionsAttended}/{student.totalSessions}
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            {formatLastActive(student.lastActive)}
                          </span>
                        </div>

                        {student.strugglingAreas.length > 0 && (
                          <div className="flex items-center gap-1 mt-2">
                            <AlertTriangle className="w-3 h-3 text-red-500" />
                            <span className="text-xs text-red-600">
                              Struggling: {student.strugglingAreas.slice(0, 2).join(', ')}
                              {student.strugglingAreas.length > 2 && '...'}
                            </span>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1 mt-2">
                          {student.skillLevels.slice(0, 2).map((skill, idx) => (
                            <Badge 
                              key={idx} 
                              variant="outline" 
                              className={cn("text-xs px-1.5 py-0", getLevelColor(skill.level))}
                            >
                              {skill.subject}: {skill.level}
                            </Badge>
                          ))}
                          {student.skillLevels.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{student.skillLevels.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Detail Dialog */}
      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedStudent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="text-lg bg-blue-100 text-blue-700">
                      {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle>{selectedStudent.name}</DialogTitle>
                    <DialogDescription>{selectedStudent.email}</DialogDescription>
                    <div className="flex gap-2 mt-2">
                      <Badge variant={selectedStudent.overallProgress >= 80 ? 'default' : selectedStudent.overallProgress >= 60 ? 'secondary' : 'destructive'}>
                        {selectedStudent.overallProgress}% Overall
                      </Badge>
                      <Badge variant="outline">
                        <Award className="w-3 h-3 mr-1" />
                        {selectedStudent.sessionsAttended} Sessions
                      </Badge>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Progress Overview */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">{selectedStudent.overallProgress}%</p>
                    <p className="text-xs text-gray-500">Progress</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">{selectedStudent.engagementRate}%</p>
                    <p className="text-xs text-gray-500">Engagement</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">{selectedStudent.assignmentCompletion}%</p>
                    <p className="text-xs text-gray-500">Assignments</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">{formatTime(selectedStudent.timeSpent)}</p>
                    <p className="text-xs text-gray-500">Time Spent</p>
                  </div>
                </div>

                {/* Skill Levels */}
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Skill Mastery
                  </h3>
                  <div className="space-y-3">
                    {selectedStudent.skillLevels.map((skill, idx) => (
                      <div key={idx} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{skill.subject}</span>
                          <Badge className={getLevelColor(skill.level)}>
                            {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                          </Badge>
                        </div>
                        <Progress value={skill.progress} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">{skill.progress}% mastered</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Performance */}
                <div>
                  <h3 className="font-medium mb-3">Recent Scores</h3>
                  <div className="flex gap-2">
                    {selectedStudent.recentScores.map((score, idx) => (
                      <div 
                        key={idx}
                        className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center font-bold",
                          score >= 80 ? "bg-green-100 text-green-700" :
                          score >= 60 ? "bg-blue-100 text-blue-700" :
                          "bg-red-100 text-red-700"
                        )}
                      >
                        {score}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strengths & Struggles */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Strengths
                    </h4>
                    <ul className="space-y-1">
                      {selectedStudent.strengths.map((strength, idx) => (
                        <li key={idx} className="text-sm text-green-700">• {strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-1">
                      {selectedStudent.strugglingAreas.length > 0 ? (
                        selectedStudent.strugglingAreas.map((area, idx) => (
                          <li key={idx} className="text-sm text-red-700">• {area}</li>
                        ))
                      ) : (
                        <li className="text-sm text-red-600">No significant struggles identified</li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Comparison to Class */}
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Comparison to Class Average</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Student</span>
                        <span className="font-medium">{selectedStudent.overallProgress}%</span>
                      </div>
                      <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${selectedStudent.overallProgress}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-gray-400">vs</div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Class Avg</span>
                        <span className="font-medium">{classAverage}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gray-500 rounded-full"
                          style={{ width: `${classAverage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full">View Full Report</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
