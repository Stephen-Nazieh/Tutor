'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import {
    Search,
    Plus,
    Edit,
    Trash2,
    BarChart3,
    Users,
    Clock,
    CheckCircle,
    MoreHorizontal,
    FileText,
    Play,
    Copy,
    Loader2
} from 'lucide-react'
import { Quiz, QuizStatus, QuizType } from '@/types/quiz'

const QUIZ_TYPES: { value: QuizType; label: string }[] = [
    { value: 'practice', label: 'Practice' },
    { value: 'graded', label: 'Graded' },
    { value: 'diagnostic', label: 'Diagnostic' },
    { value: 'survey', label: 'Survey' },
]

const QUIZ_STATUSES: { value: QuizStatus; label: string; color: string }[] = [
    { value: 'draft', label: 'Draft', color: 'bg-gray-100 text-gray-700' },
    { value: 'published', label: 'Published', color: 'bg-green-100 text-green-700' },
    { value: 'archived', label: 'Archived', color: 'bg-red-100 text-red-700' },
    { value: 'closed', label: 'Closed', color: 'bg-orange-100 text-orange-700' },
]

export default function QuizzesPage() {
    const router = useRouter()
    const [quizzes, setQuizzes] = useState<Quiz[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedStatus, setSelectedStatus] = useState<QuizStatus | 'all'>('all')
    const [selectedType, setSelectedType] = useState<QuizType | 'all'>('all')
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

    // Form state for quick create
    const [newQuizForm, setNewQuizForm] = useState({
        title: '',
        type: 'graded' as QuizType,
        description: ''
    })

    const fetchQuizzes = useCallback(async () => {
        try {
            const params = new URLSearchParams()
            if (searchQuery) params.set('q', searchQuery)
            if (selectedStatus !== 'all') params.set('status', selectedStatus)
            if (selectedType !== 'all') params.set('type', selectedType)

            const res = await fetch(`/api/tutor/quizzes?${params}`)
            if (res.ok) {
                const data = await res.json()
                setQuizzes(data.quizzes)
            }
        } catch (error) {
            toast.error('Failed to load quizzes')
        } finally {
            setLoading(false)
        }
    }, [searchQuery, selectedStatus, selectedType])

    useEffect(() => {
        fetchQuizzes()
    }, [fetchQuizzes])

    const handleCreateQuiz = async () => {
        if (!newQuizForm.title.trim()) {
            toast.error('Please enter a quiz title')
            return
        }

        try {
            const res = await fetch('/api/tutor/quizzes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: newQuizForm.title,
                    type: newQuizForm.type,
                    description: newQuizForm.description,
                    questions: []
                })
            })

            if (res.ok) {
                const data = await res.json()
                toast.success('Quiz created')
                setIsCreateDialogOpen(false)
                router.push(`/tutor/quizzes/${data.quiz.id}`)
            } else {
                toast.error('Failed to create quiz')
            }
        } catch (error) {
            toast.error('An error occurred')
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this quiz?')) return

        try {
            const res = await fetch(`/api/tutor/quizzes/${id}`, {
                method: 'DELETE'
            })

            if (res.ok) {
                toast.success('Quiz deleted')
                fetchQuizzes()
            } else {
                toast.error('Failed to delete quiz')
            }
        } catch (error) {
            toast.error('An error occurred')
        }
    }

    const handleDuplicate = async (quiz: Quiz) => {
        try {
            const res = await fetch('/api/tutor/quizzes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: `${quiz.title} (Copy)`,
                    type: quiz.type,
                    description: quiz.description,
                    timeLimit: quiz.timeLimit,
                    allowedAttempts: quiz.allowedAttempts,
                    shuffleQuestions: quiz.shuffleQuestions,
                    shuffleOptions: quiz.shuffleOptions,
                    showCorrectAnswers: quiz.showCorrectAnswers,
                    passingScore: quiz.passingScore,
                    questions: quiz.questions,
                    tags: quiz.tags,
                    curriculumId: quiz.curriculumId,
                    lessonId: quiz.lessonId
                })
            })

            if (res.ok) {
                toast.success('Quiz duplicated')
                fetchQuizzes()
            }
        } catch (error) {
            toast.error('Failed to duplicate quiz')
        }
    }

    const getStatusBadge = (status: string) => {
        const s = QUIZ_STATUSES.find(s => s.value === status)
        return <Badge className={s?.color || 'bg-gray-100'}>{s?.label || status}</Badge>
    }

    const getTypeLabel = (type: string) => {
        return QUIZ_TYPES.find(t => t.value === type)?.label || type
    }

    return (
        <div className="container mx-auto p-6 max-w-7xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <FileText className="w-6 h-6" />
                        Quizzes & Assessments
                    </h1>
                    <p className="text-muted-foreground">
                        Create and manage quizzes for your students
                    </p>
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Create Quiz
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Quiz</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div>
                                <Label>Quiz Title</Label>
                                <Input
                                    value={newQuizForm.title}
                                    onChange={(e) => setNewQuizForm(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="Enter quiz title..."
                                />
                            </div>
                            <div>
                                <Label>Type</Label>
                                <Select 
                                    value={newQuizForm.type} 
                                    onValueChange={(v) => setNewQuizForm(prev => ({ ...prev, type: v as QuizType }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {QUIZ_TYPES.map(t => (
                                            <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Description (optional)</Label>
                                <Input
                                    value={newQuizForm.description}
                                    onChange={(e) => setNewQuizForm(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Brief description of the quiz..."
                                />
                            </div>
                            <Button onClick={handleCreateQuiz} className="w-full">
                                Create & Continue
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <CardContent className="pt-4">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[200px]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search quizzes..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                        <Select value={selectedStatus} onValueChange={(v) => setSelectedStatus(v as QuizStatus | 'all')}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="All Statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                {QUIZ_STATUSES.map(s => (
                                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedType} onValueChange={(v) => setSelectedType(v as QuizType | 'all')}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="All Types" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                {QUIZ_TYPES.map(t => (
                                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Quizzes List */}
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
            ) : quizzes.length === 0 ? (
                <Card className="p-12 text-center">
                    <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No quizzes yet</h3>
                    <p className="text-muted-foreground mb-4">
                        Create your first quiz to assess your students
                    </p>
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Quiz
                    </Button>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {quizzes.map((quiz) => (
                        <Card key={quiz.id} className="cursor-pointer hover:shadow-md transition-shadow"
                              onClick={() => router.push(`/tutor/quizzes/${quiz.id}`)}>
                            <CardHeader className="pb-2">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg line-clamp-1">{quiz.title}</CardTitle>
                                        <CardDescription className="line-clamp-1">
                                            {quiz.description || 'No description'}
                                        </CardDescription>
                                    </div>
                                    {getStatusBadge(quiz.status)}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Badge variant="outline">{getTypeLabel(quiz.type)}</Badge>
                                    <Badge variant="secondary">
                                        {(quiz.questions as any[]).length} questions
                                    </Badge>
                                    {quiz.timeLimit && (
                                        <Badge variant="secondary">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {quiz.timeLimit} min
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            {(quiz as any).attemptCount || 0} attempts
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <BarChart3 className="w-4 h-4" />
                                            {(quiz as any).assignmentCount || 0} assigned
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="flex-1"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            router.push(`/tutor/quizzes/${quiz.id}`)
                                        }}
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleDuplicate(quiz)
                                        }}
                                    >
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleDelete(quiz.id)
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4 text-destructive" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
