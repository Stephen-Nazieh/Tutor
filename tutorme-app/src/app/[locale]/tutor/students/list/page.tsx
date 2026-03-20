'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, GraduationCap, Plus } from 'lucide-react'

export default function StudentsListPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/tutor/groups">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold">
              <GraduationCap className="h-6 w-6 text-green-500" />
              All Students
            </h1>
            <p className="text-muted-foreground">View and manage all your students</p>
          </div>
        </div>
        <Button asChild>
          <Link href="/tutor/group-builder">
            <Plus className="mr-2 h-4 w-4" />
            Enroll Student
          </Link>
        </Button>
      </div>

      {/* Placeholder Content */}
      <Card>
        <CardHeader>
          <CardTitle>Students List</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page will display a detailed list of all your students with filtering, search, and
            progress tracking capabilities.
          </p>
          <div className="mt-4 rounded-lg border-2 border-dashed p-8 text-center">
            <GraduationCap className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <p className="text-gray-500">Student details list coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
