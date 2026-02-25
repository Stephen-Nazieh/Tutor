'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import {
    FileText,
    Clock,
    CheckCircle,
    AlertCircle,
    Play,
    Trophy,
    Calendar,
    BarChart3,
    Loader2
} from 'lucide-react'
import { StudentQuiz } from '@/types/quiz'

export default function StudentQuizzesPage() {
    const router = useRouter()
    const [quizzes, setQuizzes] = useState<StudentQuiz[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('available')

    const fetchQuizzes = useCallback(async () => {
        try {
            const res = await fetch(`/api/student/quizzes?status=${activeTab === 'completed' ? 'completed' : activeTab}`)
            if (res.ok) {
                const data = await res.json()
                setQuizzes(data.quizzes)
            }
        } catch (error) {
            toast.error('Failed to load quizzes')
        } finally {
            setLoading(false)
        }
    }, [activeTab])

    useEffect(() => {
        fetchQuizzes()
    }, [fetchQuizzes])

    const getStatusBadge = (status: StudentQuiz['status']) => {
        switch (status) {
            case 'available':
                return <Badge className="bg-green-100 text-green-700">Available</Badge>
            case 'completed':
                return <Badge className="bg-blue-100 text-blue-700">Completed</Badge>
            case 'overdue':
                return <Badge className="bg-red-100 text-red-700">Overdue</Badge>
            case 'upcoming':
                return <Badge className="bg-yellow-100 text-yellow-700">Upcoming</Badge>
            case 'locked':
                return <Badge variant="secondary">Locked</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const getTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            practice: 'Practice',
            graded: 'Graded',
            diagnostic: 'Diagnostic',
            survey: 'Survey'
        }
        return labels[type] || type
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <FileText className="w-6 h-6" />
                    My Quizzes
                </h1>
                <p className="text-muted-foreground">
                    View and take quizzes assigned to you
                </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                    <TabsTrigger value="available">
                        Available
                    </TabsTrigger>
                    <TabsTrigger value="completed">
                        Completed
                    </TabsTrigger>
                    <TabsTrigger value="all">
                        All
                    </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab}>
                    {quizzes.length === 0 ? (
                        <Card className="p-12 text-center">
                            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">No quizzes found</h3>
                            <p className="text-muted-foreground">
                                {activeTab === 'available' 
                                    ? 'You have no quizzes available right now.' 
                                    : 'You haven\'t completed any quizzes yet.'}
                            </p>
                        </Card>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {quizzes.map((quiz) => (
                                <Card key={quiz.id} className={quiz.status === 'completed' ? 'opacity-75' : ''}>
                                    <CardHeader className="pb-2">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-lg">{quiz.title}</CardTitle>
                                                <CardDescription>
                                                    {getTypeLabel(quiz.type)}
                                                </CardDescription>
                                            </div>
                                            {getStatusBadge(quiz.status)}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <Badge variant="outline">
                                                {quiz.totalQuestions} questions
                                            </Badge>
                                            <Badge variant="outline">
                                                {quiz.totalPoints} points
                                            </Badge>
                                            {quiz.timeLimit && (
                                                <Badge variant="outline">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    {quiz.timeLimit} min
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Due date */}
                                        {quiz.dueDate && (
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                                <Calendar className="w-4 h-4" />
                                                Due {new Date(quiz.dueDate).toLocaleDateString()}
                                            </div>
                                        )}

                                        {/* Previous attempts */}
                                        {quiz.attemptsMade > 0 && (
                                            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium">
                                                        Previous Attempts: {quiz.attemptsMade}
                                                    </span>
                                                    {quiz.bestScore !== undefined && (
                                                        <span className="text-sm">
                                                            Best: <span className="font-bold text-green-600">{quiz.bestScore}%</span>
                                                        </span>
                                                    )}
                                                </div>
                                                {quiz.bestScore !== undefined && (
                                                    <Progress value={quiz.bestScore} className="h-2" />
                                                )}
                                            </div>
                                        )}

                                        {/* Attempts remaining */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">
                                                {quiz.attemptsMade} / {quiz.allowedAttempts} attempts used
                                            </span>
                                            {quiz.canAttempt ? (
                                                <Button 
                                                    size="sm"
                                                    onClick={() => router.push(`/student/quizzes/${quiz.id}`)}
                                                >
                                                    <Play className="w-4 h-4 mr-2" />
                                                    {quiz.attemptsMade > 0 ? 'Retake' : 'Start'}
                                                </Button>
                                            ) : quiz.status === 'completed' ? (
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={() => router.push(`/student/quizzes/${quiz.id}`)}
                                                >
                                                    <BarChart3 className="w-4 h-4 mr-2" />
                                                    Review
                                                </Button>
                                            ) : (
                                                <Badge variant="secondary">Not Available</Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}
