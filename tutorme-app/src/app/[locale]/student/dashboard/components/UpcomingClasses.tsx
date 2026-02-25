'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Users, Loader2 } from 'lucide-react'

interface Class {
  id: string
  title: string
  subject: string
  gradeLevel?: string
  startTime: string
  duration: number
  maxStudents: number
  currentBookings: number
  isBooked: boolean
  requiresPayment?: boolean
  price?: number | null
}

interface UpcomingClassesProps {
  classes: Class[]
  bookingClassId: string | null
  onBookClass: (classId: string) => void
}

export function UpcomingClasses({ classes, bookingClassId, onBookClass }: UpcomingClassesProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <Card className="mb-8">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-500" />
            Upcoming Classes
          </CardTitle>
          <Link href="/student/courses">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {classes.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium text-gray-700">No upcoming classes</p>
            <p className="text-sm mt-1">View available classes to book.</p>
            <Link href="/student/courses">
              <Button className="mt-4">View classes</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {classes.map(cls => (
              <div key={cls.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{cls.title}</h4>
                    {cls.isBooked && (
                      <Badge className="bg-green-100 text-green-800">Booked</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {cls.subject} • {formatDate(cls.startTime)}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                    <Users className="w-3 h-3" />
                    {cls.currentBookings}/{cls.maxStudents} students
                    {cls.price != null && cls.price > 0 && (
                      <span className="text-green-600 font-medium">SGD {cls.price.toFixed(2)}</span>
                    )}
                  </div>
                </div>
                {!cls.isBooked && (
                  <Button
                    size="sm"
                    disabled={bookingClassId === cls.id || cls.currentBookings >= cls.maxStudents}
                    onClick={() => onBookClass(cls.id)}
                  >
                    {bookingClassId === cls.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : cls.currentBookings >= cls.maxStudents ? (
                      'Full'
                    ) : (
                      'Book'
                    )}
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
