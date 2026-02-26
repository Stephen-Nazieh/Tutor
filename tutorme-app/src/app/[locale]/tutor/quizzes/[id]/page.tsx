'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import {
    ArrowLeft,
    Save,
    Plus,
    Trash2,
    Play,
    Users,
    Settings,
    FileQuestion,
    BarChart3,
    Eye,
    Loader2,
    CheckCircle,
    XCircle,
    GripVertical,
    ChevronDown,
    ChevronRight
} from 'lucide-react'
import { Quiz, QuizQuestion, QuizType, QuestionType } from '@/types/quiz'
import { QuestionEditor } from '@/components/course-builder/QuestionEditor'

const QUESTION_TYPES: { value: QuestionType; label: string }[] = [
    { value: 'multiple_choice', label: 'Multiple Choice' },
    { value: 'true_false', label: 'True / False' },
    { value: 'short_answer', label: 'Short Answer' },
    { value: 'essay', label: 'Essay' },
    { value: 'multi_select', label: 'Multi-Select' },
    { value: 'fill_in_blank', label: 'Fill in Blank' },
]

export default function QuizBuilderPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const [quizId, setQuizId] = useState<string>('')
    const [quiz, setQuiz] = useState<Quiz | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [activeTab, setActiveTab] = useState('questions')

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'graded' as QuizType,
        timeLimit: '',
        allowedAttempts: 1,
        shuffleQuestions: false,
        shuffleOptions: false,
        showCorrectAnswers: 'after_attempt' as Quiz['showCorrectAnswers'],
        passingScore: '',
        tags: [] as string[],
        startDate: '',
        dueDate: ''
    })

    const [questions, setQuestions] = useState<QuizQuestion[]>([])

    // Resolve params
    useEffect(() => {
        params.then(p => setQuizId(p.id))
    }, [params])

    // Fetch quiz
    const fetchQuiz = useCallback(async () => {
        if (!quizId) return

        try {
            const res = await fetch(`/api/tutor/quizzes/${quizId}`)
            if (res.ok) {
                const data = await res.json()
                const quiz = data.quiz
                setQuiz(quiz)
                setQuestions(quiz.questions as QuizQuestion[])
                setFormData({
                    title: quiz.title,
                    description: quiz.description || '',
                    type: quiz.type,
                    timeLimit: quiz.timeLimit?.toString() || '',
                    allowedAttempts: quiz.allowedAttempts,
                    shuffleQuestions: quiz.shuffleQuestions,
                    shuffleOptions: quiz.shuffleOptions,
                    showCorrectAnswers: quiz.showCorrectAnswers,
                    passingScore: quiz.passingScore?.toString() || '',
                    tags: quiz.tags || [],
                    startDate: quiz.startDate ? new Date(quiz.startDate).toISOString().slice(0, 16) : '',
                    dueDate: quiz.dueDate ? new Date(quiz.dueDate).toISOString().slice(0, 16) : ''
                })
            } else {
                toast.error('Failed to load quiz')
            }
        } catch (error) {
            toast.error('An error occurred')
        } finally {
            setLoading(false)
        }
    }, [quizId])

    useEffect(() => {
        fetchQuiz()
    }, [fetchQuiz])

    // Save quiz
    const handleSave = async () => {
        if (!quizId) return

        setSaving(true)
        try {
            const payload = {
                ...formData,
                timeLimit: formData.timeLimit ? parseInt(formData.timeLimit) : null,
                passingScore: formData.passingScore ? parseInt(formData.passingScore) : null,
                questions,
                startDate: formData.startDate || null,
                dueDate: formData.dueDate || null
            }

            const res = await fetch(`/api/tutor/quizzes/${quizId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                toast.success('Quiz saved')
            } else {
                toast.error('Failed to save quiz')
            }
        } catch (error) {
            toast.error('An error occurred')
        } finally {
            setSaving(false)
        }
    }

    // Publish quiz
    const handlePublish = async () => {
        if (!quizId) return

        if (questions.length === 0) {
            toast.error('Add at least one question before publishing')
            return
        }

        try {
            const res = await fetch(`/api/tutor/quizzes/${quizId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'published' })
            })

            if (res.ok) {
                toast.success('Quiz published')
                fetchQuiz()
            } else {
                toast.error('Failed to publish quiz')
            }
        } catch (error) {
            toast.error('An error occurred')
        }
    }

    // Preview quiz
    const handlePreview = () => {
        window.open(`/tutor/quizzes/${quizId}/preview`, '_blank')
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        )
    }

    if (!quiz) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Quiz not found</p>
            </div>
        )
    }

    const totalPoints = questions.reduce((sum, q) => sum + (q.points || 1), 0)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" onClick={() => router.push('/tutor/quizzes')}>
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                            <div>
                                <h1 className="text-xl font-semibold">{formData.title || 'Untitled Quiz'}</h1>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Badge variant={quiz.status === 'published' ? 'default' : 'secondary'}>
                                        {quiz.status}
                                    </Badge>
                                    <span>{questions.length} questions</span>
                                    <span>•</span>
                                    <span>{totalPoints} points</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" onClick={handlePreview}>
                                <Eye className="w-4 h-4 mr-2" />
                                Preview
                            </Button>
                            <Button variant="outline" onClick={handleSave} disabled={saving}>
                                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                Save
                            </Button>
                            {quiz.status === 'draft' && (
                                <Button onClick={handlePublish}>
                                    <Play className="w-4 h-4 mr-2" />
                                    Publish
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-6">
                        <TabsTrigger value="questions">
                            <FileQuestion className="w-4 h-4 mr-2" />
                            Questions
                        </TabsTrigger>
                        <TabsTrigger value="settings">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                        </TabsTrigger>
                        <TabsTrigger value="assign">
                            <Users className="w-4 h-4 mr-2" />
                            Assign
                        </TabsTrigger>
                        <TabsTrigger value="analytics">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Analytics
                        </TabsTrigger>
                    </TabsList>

                    {/* Questions Tab */}
                    <TabsContent value="questions" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Quiz Questions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <QuestionEditor
                                    questions={questions as any}
                                    onChange={setQuestions as any}
                                    compact={false}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings" className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label>Quiz Title</Label>
                                        <Input
                                            value={formData.title}
                                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                            placeholder="Enter quiz title"
                                        />
                                    </div>
                                    <div>
                                        <Label>Description</Label>
                                        <Textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                            placeholder="Describe what this quiz covers..."
                                            rows={3}
                                        />
                                    </div>
                                    <div>
                                        <Label>Quiz Type</Label>
                                        <Select
                                            value={formData.type}
                                            onValueChange={(v) => setFormData(prev => ({ ...prev, type: v as QuizType }))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="practice">Practice</SelectItem>
                                                <SelectItem value="graded">Graded</SelectItem>
                                                <SelectItem value="diagnostic">Diagnostic</SelectItem>
                                                <SelectItem value="survey">Survey</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Quiz Options</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Time Limit (minutes)</Label>
                                            <Input
                                                type="number"
                                                min={1}
                                                value={formData.timeLimit}
                                                onChange={(e) => setFormData(prev => ({ ...prev, timeLimit: e.target.value }))}
                                                placeholder="No limit"
                                            />
                                        </div>
                                        <div>
                                            <Label>Allowed Attempts</Label>
                                            <Input
                                                type="number"
                                                min={1}
                                                value={formData.allowedAttempts}
                                                onChange={(e) => setFormData(prev => ({ ...prev, allowedAttempts: parseInt(e.target.value) || 1 }))}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Passing Score (%)</Label>
                                        <Input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={formData.passingScore}
                                            onChange={(e) => setFormData(prev => ({ ...prev, passingScore: e.target.value }))}
                                            placeholder="No passing score"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                checked={formData.shuffleQuestions}
                                                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, shuffleQuestions: checked as boolean }))}
                                            />
                                            <Label>Shuffle questions for each student</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                checked={formData.shuffleOptions}
                                                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, shuffleOptions: checked as boolean }))}
                                            />
                                            <Label>Shuffle answer options</Label>
                                        </div>
                                    </div>
                                    <div>
                                        <Label>When to show correct answers</Label>
                                        <Select
                                            value={formData.showCorrectAnswers}
                                            onValueChange={(v) => setFormData(prev => ({ ...prev, showCorrectAnswers: v as Quiz['showCorrectAnswers'] }))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="never">Never</SelectItem>
                                                <SelectItem value="immediately">Immediately after attempt</SelectItem>
                                                <SelectItem value="after_attempt">After attempt is graded</SelectItem>
                                                <SelectItem value="after_due_date">After due date</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Scheduling</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label>Start Date (optional)</Label>
                                        <Input
                                            type="datetime-local"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <Label>Due Date (optional)</Label>
                                        <Input
                                            type="datetime-local"
                                            value={formData.dueDate}
                                            onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Assign Tab */}
                    <TabsContent value="assign">
                        <QuizAssignmentPanel quizId={quizId} />
                    </TabsContent>

                    {/* Analytics Tab */}
                    <TabsContent value="analytics">
                        <QuizAnalyticsPanel quizId={quizId} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

// Quiz Assignment Panel Component
function QuizAssignmentPanel({ quizId }: { quizId: string }) {
    const [assignments, setAssignments] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [assignedToType, setAssignedToType] = useState<'student' | 'group' | 'all'>('all')
    const [dueDate, setDueDate] = useState('')

    const fetchAssignments = useCallback(async () => {
        try {
            const res = await fetch(`/api/tutor/quizzes/${quizId}/assign`)
            if (res.ok) {
                const data = await res.json()
                setAssignments(data.assignments)
            }
        } catch (error) {
            console.error('Failed to load assignments')
        } finally {
            setLoading(false)
        }
    }, [quizId])

    useEffect(() => {
        fetchAssignments()
    }, [fetchAssignments])

    const handleAssign = async () => {
        try {
            const res = await fetch(`/api/tutor/quizzes/${quizId}/assign`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    assignedToType,
                    assignedToAll: assignedToType === 'all',
                    dueDate: dueDate || null
                })
            })

            if (res.ok) {
                toast.success('Quiz assigned')
                fetchAssignments()
            } else {
                toast.error('Failed to assign quiz')
            }
        } catch (error) {
            toast.error('An error occurred')
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <Card>
            <CardHeader>
                <CardTitle>Assign Quiz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                    <div>
                        <Label>Assign To</Label>
                        <Select value={assignedToType} onValueChange={(v) => setAssignedToType(v as any)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Students</SelectItem>
                                <SelectItem value="group">Specific Group</SelectItem>
                                <SelectItem value="student">Specific Student</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Due Date (optional)</Label>
                        <Input
                            type="datetime-local"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>
                    <div className="flex items-end">
                        <Button onClick={handleAssign} className="w-full">
                            <Users className="w-4 h-4 mr-2" />
                            Assign Quiz
                        </Button>
                    </div>
                </div>

                <Separator />

                <div>
                    <h3 className="font-medium mb-4">Active Assignments</h3>
                    {assignments.length === 0 ? (
                        <p className="text-muted-foreground">No active assignments</p>
                    ) : (
                        <div className="space-y-2">
                            {assignments.map((assignment) => (
                                <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <Badge variant="outline">{assignment.assignedToType}</Badge>
                                        <span className="ml-2 text-sm">
                                            Assigned {new Date(assignment.assignedAt).toLocaleDateString()}
                                        </span>
                                        {assignment.dueDate && (
                                            <span className="ml-2 text-sm text-muted-foreground">
                                                Due {new Date(assignment.dueDate).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        <Trash2 className="w-4 h-4 text-destructive" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

// Quiz Analytics Panel Component
function QuizAnalyticsPanel({ quizId }: { quizId: string }) {
    const [analytics, setAnalytics] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await fetch(`/api/tutor/quizzes/${quizId}/analytics`)
                if (res.ok) {
                    const data = await res.json()
                    setAnalytics(data.analytics)
                }
            } catch (error) {
                console.error('Failed to load analytics')
            } finally {
                setLoading(false)
            }
        }

        fetchAnalytics()
    }, [quizId])

    if (loading) return <div>Loading analytics...</div>
    if (!analytics) return <div>No analytics available</div>

    return (
        <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{analytics.attemptsCount}</div>
                        <p className="text-sm text-muted-foreground">Total Attempts</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{analytics.averageScore}%</div>
                        <p className="text-sm text-muted-foreground">Average Score</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{analytics.completionRate}%</div>
                        <p className="text-sm text-muted-foreground">Completion Rate</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">
                            {Math.floor(analytics.averageTimeSpent / 60)}m
                        </div>
                        <p className="text-sm text-muted-foreground">Avg. Time Spent</p>
                    </CardContent>
                </Card>
            </div>

            {/* Score Distribution */}
            <Card>
                <CardHeader>
                    <CardTitle>Score Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {Object.entries(analytics.scoreDistribution).map(([range, count]) => {
                            const total = analytics.attemptsCount || 1
                            const percentage = Math.round((count as number / total) * 100)
                            return (
                                <div key={range} className="flex items-center gap-4">
                                    <div className="w-24 text-sm">{range.replace('-', ' - ')}%</div>
                                    <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 rounded-full"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <div className="w-16 text-right text-sm">{count as number}</div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Question Analytics */}
            <Card>
                <CardHeader>
                    <CardTitle>Question Performance</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {analytics.questionAnalytics.map((qa: any, index: number) => (
                            <div key={qa.questionId} className="p-4 border rounded-lg">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <span className="font-medium">Q{index + 1}:</span>
                                        <span className="ml-2">{qa.questionText}</span>
                                    </div>
                                    <Badge variant={qa.difficultyIndex > 0.7 ? 'default' : qa.difficultyIndex > 0.4 ? 'secondary' : 'destructive'}>
                                        {qa.correctCount}/{qa.correctCount + qa.incorrectCount + qa.partialCount} correct
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>Avg Score: {qa.averageScore.toFixed(1)}</span>
                                    <span>Difficulty: {(qa.difficultyIndex * 100).toFixed(0)}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Student Performance */}
            <Card>
                <CardHeader>
                    <CardTitle>Student Performance</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {analytics.studentPerformance.slice(0, 10).map((student: any) => (
                            <div key={student.studentId} className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                    <span className="font-medium">{student.studentName}</span>
                                    <span className="ml-2 text-sm text-muted-foreground">
                                        {student.attemptCount} attempt{student.attemptCount !== 1 ? 's' : ''}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm">
                                        Best: <span className="font-medium">{student.bestScore}%</span>
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        Avg: {student.averageScore}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
