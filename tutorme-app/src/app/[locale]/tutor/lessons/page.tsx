'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Search, Plus, Filter, FileText, Video, HelpCircle } from 'lucide-react'
import Link from 'next/link'

interface Lesson {
  id: string
  title: string
  subject: string
  type: 'assessment' | 'worksheet' | 'video' | 'interactive'
  updatedAt: string
}

const MOCK_LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'Algebra Fundamentals Quiz',
    subject: 'Mathematics',
    type: 'assessment',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Grammar Practice Worksheet',
    subject: 'English',
    type: 'worksheet',
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
]

export default function LessonBankPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [lessons] = useState<Lesson[]>(MOCK_LESSONS)

  const filteredLessons = lessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assessment': return <HelpCircle className="h-4 w-4" />
      case 'video': return <Video className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-500" />
            Lesson Bank
          </h1>
          <p className="text-muted-foreground">
            Manage your assessments, worksheets, and learning materials
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Lesson
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lessons List */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="worksheets">Worksheets</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredLessons.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No lessons yet</h3>
                <p className="text-gray-500 mb-4">Create your first lesson to get started</p>
                <Button>Create Lesson</Button>
              </CardContent>
            </Card>
          ) : (
            filteredLessons.map((lesson) => (
              <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {getTypeIcon(lesson.type)}
                      </div>
                      <div>
                        <h3 className="font-medium">{lesson.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{lesson.subject}</Badge>
                          <Badge variant="outline">{lesson.type}</Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
