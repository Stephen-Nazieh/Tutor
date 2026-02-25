'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Clock, CheckCircle, AlertCircle } from 'lucide-react'

const assignments = [
  {
    id: '1',
    title: 'Algebra Practice Problems',
    subject: 'Mathematics',
    student: 'Emily',
    dueDate: '2026-02-25',
    status: 'pending',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Physics Lab Report',
    subject: 'Physics',
    student: 'Michael',
    dueDate: '2026-02-24',
    status: 'submitted',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Essay: My Favorite Book',
    subject: 'English',
    student: 'Emily',
    dueDate: '2026-02-28',
    status: 'pending',
    priority: 'low'
  }
]

export default function ParentAssignmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
        <p className="text-gray-500 mt-1">Track your children&apos;s assignments and due dates</p>
      </div>

      <div className="grid gap-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    assignment.status === 'submitted' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    {assignment.status === 'submitted' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <BookOpen className="h-5 w-5 text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{assignment.title}</h3>
                    <p className="text-sm text-gray-500">{assignment.subject} • For: {assignment.student}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={assignment.priority === 'high' ? 'destructive' : 'outline'}>
                        {assignment.priority}
                      </Badge>
                      <Badge variant={assignment.status === 'submitted' ? 'default' : 'secondary'}>
                        {assignment.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    Due: {assignment.dueDate}
                  </div>
                  {assignment.status === 'pending' && (
                    <Button variant="outline" size="sm" className="mt-2">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Remind
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
