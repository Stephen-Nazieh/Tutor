'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BookOpen, Search, Plus, Filter, FileText, Video, HelpCircle, X, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

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
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [lessons, setLessons] = useState<Lesson[]>(MOCK_LESSONS)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  
  // Form state
  const [newAssessmentTitle, setNewAssessmentTitle] = useState('')
  const [newAssessmentSubject, setNewAssessmentSubject] = useState('')
  const [newAssessmentType, setNewAssessmentType] = useState<'assessment' | 'worksheet'>('assessment')

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

  const handleCreateAssessment = async () => {
    if (!newAssessmentTitle.trim()) {
      toast.error('Please enter a title')
      return
    }
    if (!newAssessmentSubject) {
      toast.error('Please select a subject')
      return
    }

    setIsCreating(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newLesson: Lesson = {
      id: `new-${Date.now()}`,
      title: newAssessmentTitle,
      subject: newAssessmentSubject,
      type: newAssessmentType,
      updatedAt: new Date().toISOString(),
    }
    
    setLessons(prev => [newLesson, ...prev])
    setIsCreating(false)
    setIsCreateDialogOpen(false)
    
    // Reset form
    setNewAssessmentTitle('')
    setNewAssessmentSubject('')
    setNewAssessmentType('assessment')
    
    toast.success(`${newAssessmentType === 'assessment' ? 'Assessment' : 'Worksheet'} created successfully`)
    
    // Navigate to the builder to add questions
    // In a real app, this would navigate to the assessment editor
    // router.push(`/tutor/lessons/${newLesson.id}/edit`)
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
        <Button 
          className="gap-2"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Create Assessment
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
                <p className="text-gray-500 mb-4">Create your first assessment to get started</p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>Create Assessment</Button>
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

        <TabsContent value="assessments" className="space-y-4">
          {filteredLessons.filter(l => l.type === 'assessment').length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No assessments yet</h3>
                <p className="text-gray-500 mb-4">Create your first assessment</p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>Create Assessment</Button>
              </CardContent>
            </Card>
          ) : (
            filteredLessons
              .filter(l => l.type === 'assessment')
              .map((lesson) => (
                <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <HelpCircle className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="font-medium">{lesson.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{lesson.subject}</Badge>
                            <Badge variant="outline">assessment</Badge>
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

        <TabsContent value="worksheets" className="space-y-4">
          {filteredLessons.filter(l => l.type === 'worksheet').length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No worksheets yet</h3>
                <p className="text-gray-500 mb-4">Create your first worksheet</p>
                <Button onClick={() => {
                  setNewAssessmentType('worksheet')
                  setIsCreateDialogOpen(true)
                }}>Create Worksheet</Button>
              </CardContent>
            </Card>
          ) : (
            filteredLessons
              .filter(l => l.type === 'worksheet')
              .map((lesson) => (
                <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="font-medium">{lesson.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{lesson.subject}</Badge>
                            <Badge variant="outline">worksheet</Badge>
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

      {/* Create Assessment Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Assessment</DialogTitle>
            <DialogDescription>
              Create a new assessment or worksheet for your courses.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select 
                value={newAssessmentType} 
                onValueChange={(v: 'assessment' | 'worksheet') => setNewAssessmentType(v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="assessment">Assessment</SelectItem>
                  <SelectItem value="worksheet">Worksheet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder={`Enter ${newAssessmentType} title...`}
                value={newAssessmentTitle}
                onChange={(e) => setNewAssessmentTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={newAssessmentSubject} onValueChange={setNewAssessmentSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="Geography">Geography</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateAssessment}
              disabled={isCreating || !newAssessmentTitle.trim() || !newAssessmentSubject}
            >
              {isCreating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create {newAssessmentType === 'assessment' ? 'Assessment' : 'Worksheet'}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
