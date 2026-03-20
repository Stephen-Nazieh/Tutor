'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Video, BookOpen } from 'lucide-react'

const classes = [
  {
    id: '1',
    subject: 'Mathematics',
    tutor: 'Mr. Zhang',
    schedule: 'Mon, Wed, Fri',
    time: '16:00 - 17:30',
    status: 'active',
    nextClass: 'Today, 16:00',
    student: 'Emily',
  },
  {
    id: '2',
    subject: 'Physics',
    tutor: 'Ms. Li',
    schedule: 'Tue, Thu',
    time: '15:00 - 16:30',
    status: 'active',
    nextClass: 'Tomorrow, 15:00',
    student: 'Michael',
  },
  {
    id: '3',
    subject: 'English',
    tutor: 'Mrs. Wang',
    schedule: 'Sat',
    time: '10:00 - 11:30',
    status: 'upcoming',
    nextClass: 'Sat, 10:00',
    student: 'Emily',
  },
]

export default function ParentClassesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Classes & Schedule</h1>
          <p className="mt-1 text-gray-500">View and manage your children&apos;s class schedules</p>
        </div>
        <Button>
          <BookOpen className="mr-2 h-4 w-4" />
          Book New Class
        </Button>
      </div>

      <div className="grid gap-4">
        {classes.map(cls => (
          <Card key={cls.id}>
            <CardContent className="p-6">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{cls.subject}</h3>
                      <Badge variant={cls.status === 'active' ? 'default' : 'secondary'}>
                        {cls.status}
                      </Badge>
                    </div>
                    <p className="text-gray-500">{cls.tutor}</p>
                    <p className="mt-1 text-sm text-gray-400">For: {cls.student}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {cls.schedule}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    {cls.time}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="mr-4 text-right">
                    <p className="text-sm text-gray-500">Next Class</p>
                    <p className="font-medium">{cls.nextClass}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Video className="mr-2 h-4 w-4" />
                    Join
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
