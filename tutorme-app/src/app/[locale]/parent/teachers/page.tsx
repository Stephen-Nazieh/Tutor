'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Calendar, Star } from 'lucide-react'

const teachers = [
  {
    id: '1',
    name: 'Mr. Zhang',
    subject: 'Mathematics',
    student: 'Emily',
    rating: 4.9,
    classes: 12,
    nextClass: 'Today, 16:00',
    email: 'zhang@tutorme.com',
  },
  {
    id: '2',
    name: 'Ms. Li',
    subject: 'Physics',
    student: 'Michael',
    rating: 4.8,
    classes: 8,
    nextClass: 'Tomorrow, 15:00',
    email: 'li@tutorme.com',
  },
  {
    id: '3',
    name: 'Mrs. Wang',
    subject: 'English',
    student: 'Emily',
    rating: 4.7,
    classes: 6,
    nextClass: 'Sat, 10:00',
    email: 'wang@tutorme.com',
  },
]

export default function ParentTeachersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Teachers</h1>
        <p className="mt-1 text-gray-500">Connect with your children&apos;s tutors</p>
      </div>

      <div className="grid gap-4">
        {teachers.map(teacher => (
          <Card key={teacher.id}>
            <CardContent className="p-6">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-blue-600 text-xl text-white">
                      {teacher.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{teacher.name}</h3>
                    <p className="text-gray-500">{teacher.subject} Teacher</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant="secondary">For: {teacher.student}</Badge>
                      <div className="flex items-center gap-1 text-yellow-600">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm">{teacher.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{teacher.classes}</p>
                    <p>Classes</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Next Class</p>
                    <p className="font-medium">{teacher.nextClass}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  <Button variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
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
