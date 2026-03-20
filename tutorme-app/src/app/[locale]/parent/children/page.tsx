'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Plus, TrendingUp, Calendar, BookOpen } from 'lucide-react'

const children = [
  {
    id: '1',
    name: 'Emily Johnson',
    grade: 'Grade 8',
    age: 13,
    subjects: ['Mathematics', 'Science', 'English', 'History'],
    progress: 85,
    attendance: '95%',
    upcomingClasses: 3,
    completedAssignments: 24,
    totalAssignments: 28,
    tutor: 'Mr. Zhang',
    recentGrade: 'A-',
  },
  {
    id: '2',
    name: 'Michael Johnson',
    grade: 'Grade 10',
    age: 15,
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English'],
    progress: 92,
    attendance: '98%',
    upcomingClasses: 2,
    completedAssignments: 31,
    totalAssignments: 32,
    tutor: 'Ms. Li',
    recentGrade: 'A',
  },
]

export default function ParentChildrenPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Children</h1>
          <p className="mt-1 text-gray-500">Manage and track your children's learning progress</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Child
        </Button>
      </div>

      <div className="grid gap-6">
        {children.map(child => (
          <Card key={child.id}>
            <CardContent className="p-6">
              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex items-start gap-4 lg:w-1/3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                    {child.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{child.name}</h3>
                    <p className="text-gray-500">
                      {child.grade} • Age {child.age}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {child.subjects.slice(0, 3).map(subject => (
                        <Badge key={subject} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {child.subjects.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{child.subjects.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:w-1/3">
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{child.progress}%</p>
                    <p className="text-xs text-gray-500">Progress</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{child.attendance}</p>
                    <p className="text-xs text-gray-500">Attendance</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <p className="text-2xl font-bold text-purple-600">{child.recentGrade}</p>
                    <p className="text-xs text-gray-500">Recent Grade</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <p className="text-2xl font-bold text-orange-600">{child.upcomingClasses}</p>
                    <p className="text-xs text-gray-500">Upcoming</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 lg:w-1/3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Assignments</span>
                    <span className="font-medium">
                      {child.completedAssignments}/{child.totalAssignments}
                    </span>
                  </div>
                  <Progress
                    value={(child.completedAssignments / child.totalAssignments) * 100}
                    className="h-2"
                  />
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Progress
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Assignments
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
