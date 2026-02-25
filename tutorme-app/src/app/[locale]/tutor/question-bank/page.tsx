'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import {
    Search,
    Plus,
    Trash2,
    Edit,
    Copy,
    BookOpen,
    Filter,
    X,
    CheckCircle,
    MoreHorizontal,
    Sparkles,
    Loader2
} from 'lucide-react'
import { QuestionBankItem, QuestionType, QuestionDifficulty } from '@/types/quiz'

const QUESTION_TYPES: { value: QuestionType; label: string; icon: string }[] = [
    { value: 'multiple_choice', label: 'Multiple Choice', icon: '◎' },
    { value: 'true_false', label: 'True / False', icon: '☑' },
    { value: 'short_answer', label: 'Short Answer', icon: '✎' },
    { value: 'essay', label: 'Essay', icon: '¶' },
    { value: 'multi_select', label: 'Multi-Select', icon: '☑☑' },
    { value: 'fill_in_blank', label: 'Fill in Blank', icon: '___' },
    { value: 'matching', label: 'Matching', icon: '⇄' },
]

const DIFFICULTIES: { value: QuestionDifficulty; label: string; color: string }[] = [
    { value: 'easy', label: 'Easy', color: 'bg-green-100 text-green-700' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'hard', label: 'Hard', color: 'bg-red-100 text-red-700' },
]

const SUBJECT_OPTIONS = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'History',
    'Geography',
    'Computer Science',
    'Economics',
    'Other',
]

export default function QuestionBankPage() {
    const [questions, setQuestions] = useState<QuestionBankItem[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedType, setSelectedType] = useState<QuestionType | 'all'>('all')
    const [selectedDifficulty, setSelectedDifficulty] = useState<QuestionDifficulty | 'all'>('all')
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [editingQuestion, setEditingQuestion] = useState<QuestionBankItem | null>(null)
    const [availableTags, setAvailableTags] = useState<string[]>([])
    const [customSubject, setCustomSubject] = useState('')

    // Form state
    const [formData, setFormData] = useState({
        type: 'multiple_choice' as QuestionType,
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        explanation: '',
        hint: '',
        points: 1,
        difficulty: 'medium' as QuestionDifficulty,
        tags: [] as string[],
        subject: '',
        isPublic: false
    })

    // Fetch questions
    const fetchQuestions = useCallback(async () => {
        try {
            const params = new URLSearchParams()
            if (searchQuery) params.set('q', searchQuery)
            if (selectedType !== 'all') params.set('type', selectedType)
            if (selectedDifficulty !== 'all') params.set('difficulty', selectedDifficulty)

            const res = await fetch(`/api/tutor/question-bank?${params}`)
            if (res.ok) {
                const data = await res.json()
                setQuestions(data.questions)
            }
        } catch (error) {
            toast.error('Failed to load questions')
        } finally {
            setLoading(false)
        }
    }, [searchQuery, selectedType, selectedDifficulty])

    // Fetch tags
    const fetchTags = useCallback(async () => {
        try {
            const res = await fetch('/api/tutor/question-bank/tags')
            if (res.ok) {
                const data = await res.json()
                setAvailableTags(data.tags)
            }
        } catch (error) {
            console.error('Failed to load tags')
        }
    }, [])

    useEffect(() => {
        fetchQuestions()
        fetchTags()
    }, [fetchQuestions, fetchTags])

    // Reset form
    const resetForm = () => {
        setFormData({
            type: 'multiple_choice',
            question: '',
            options: ['', '', '', ''],
            correctAnswer: '',
            explanation: '',
            hint: '',
            points: 1,
            difficulty: 'medium',
            tags: [],
            subject: '',
            isPublic: false
        })
        setCustomSubject('')
        setEditingQuestion(null)
    }

    // Open edit dialog
    const handleEdit = (question: QuestionBankItem) => {
        setEditingQuestion(question)
        setCustomSubject('')
        setFormData({
            type: question.type as QuestionType,
            question: question.question,
            options: (question.options as string[]) || ['', '', '', ''],
            correctAnswer: String(question.correctAnswer || ''),
            explanation: question.explanation || '',
            hint: question.hint || '',
            points: question.points,
            difficulty: question.difficulty as QuestionDifficulty,
            tags: question.tags,
            subject: question.subject && SUBJECT_OPTIONS.includes(question.subject) ? question.subject : (question.subject ? 'Other' : ''),
            isPublic: question.isPublic
        })
        if (question.subject && !SUBJECT_OPTIONS.includes(question.subject)) {
            setCustomSubject(question.subject)
        }
        setIsCreateDialogOpen(true)
    }

    // Save question
    const getCsrfToken = useCallback(async (): Promise<string | null> => {
        try {
            const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
            const csrfData = await csrfRes.json().catch(() => ({}))
            return csrfData?.token ?? null
        } catch {
            return null
        }
    }, [])

    const handleSave = async () => {
        try {
            const csrfToken = await getCsrfToken()
            const subjectValue = formData.subject === 'Other' ? customSubject.trim() : formData.subject
            const payload = {
                ...formData,
                subject: subjectValue || '',
                options: formData.type === 'multiple_choice' || formData.type === 'multi_select'
                    ? formData.options.filter(o => o.trim())
                    : undefined
            }

            const url = editingQuestion
                ? `/api/tutor/question-bank/${editingQuestion.id}`
                : '/api/tutor/question-bank'

            const res = await fetch(url, {
                method: editingQuestion ? 'PATCH' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
                },
                credentials: 'include',
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                toast.success(editingQuestion ? 'Question updated' : 'Question created')
                setIsCreateDialogOpen(false)
                resetForm()
                fetchQuestions()
            } else {
                const error = await res.json()
                toast.error(error.error || 'Failed to save question')
            }
        } catch (error) {
            toast.error('An error occurred')
        }
    }

    // Delete question
    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this question?')) return

        try {
            const csrfToken = await getCsrfToken()
            const res = await fetch(`/api/tutor/question-bank/${id}`, {
                method: 'DELETE',
                headers: {
                    ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
                },
                credentials: 'include',
            })

            if (res.ok) {
                toast.success('Question deleted')
                fetchQuestions()
            } else {
                toast.error('Failed to delete question')
            }
        } catch (error) {
            toast.error('An error occurred')
        }
    }

    // Duplicate question
    const handleDuplicate = async (question: QuestionBankItem) => {
        try {
            const csrfToken = await getCsrfToken()
            const res = await fetch('/api/tutor/question-bank', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
                },
                credentials: 'include',
                body: JSON.stringify({
                    type: question.type,
                    question: `${question.question} (Copy)`,
                    options: question.options,
                    correctAnswer: question.correctAnswer,
                    explanation: question.explanation,
                    hint: question.hint,
                    points: question.points,
                    difficulty: question.difficulty,
                    tags: question.tags,
                    subject: question.subject,
                    isPublic: question.isPublic
                })
            })

            if (res.ok) {
                toast.success('Question duplicated')
                fetchQuestions()
            }
        } catch (error) {
            toast.error('Failed to duplicate question')
        }
    }

    // Add option
    const addOption = () => {
        setFormData(prev => ({
            ...prev,
            options: [...prev.options, '']
        }))
    }

    // Remove option
    const removeOption = (index: number) => {
        setFormData(prev => ({
            ...prev,
            options: prev.options.filter((_, i) => i !== index)
        }))
    }

    // Update option
    const updateOption = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            options: prev.options.map((o, i) => i === index ? value : o)
        }))
    }

    // Toggle tag
    const toggleTag = (tag: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag]
        }))
    }

    const getTypeLabel = (type: string) => QUESTION_TYPES.find(t => t.value === type)?.label || type
    const getDifficultyStyle = (difficulty: string) => {
        const d = DIFFICULTIES.find(d => d.value === difficulty)
        return d?.color || 'bg-gray-100'
    }

    return (
        <div className="container mx-auto p-6 max-w-7xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <BookOpen className="w-6 h-6" />
                        Question Bank
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your reusable questions for quizzes and assessments
                    </p>
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={resetForm}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Question
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {editingQuestion ? 'Edit Question' : 'Create New Question'}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4 py-4">
                            {/* Subject */}
                            <div>
                                <Label>Subject</Label>
                                <Select
                                    value={formData.subject || '__none__'}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value === '__none__' ? '' : value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="__none__">Unspecified</SelectItem>
                                        {SUBJECT_OPTIONS.map((subject) => (
                                            <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {formData.subject === 'Other' && (
                                    <Input
                                        className="mt-2"
                                        value={customSubject}
                                        onChange={(e) => setCustomSubject(e.target.value)}
                                        placeholder="Enter subject"
                                    />
                                )}
                            </div>

                            {/* Type & Difficulty */}
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <Label>Type</Label>
                                    <Select
                                        value={formData.type}
                                        onValueChange={(v) => setFormData(prev => ({ ...prev, type: v as QuestionType }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {QUESTION_TYPES.map(t => (
                                                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Difficulty</Label>
                                    <Select
                                        value={formData.difficulty}
                                        onValueChange={(v) => setFormData(prev => ({ ...prev, difficulty: v as QuestionDifficulty }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {DIFFICULTIES.map(d => (
                                                <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Points</Label>
                                    <Input
                                        type="number"
                                        min={1}
                                        value={formData.points}
                                        onChange={(e) => setFormData(prev => ({ ...prev, points: parseInt(e.target.value) || 1 }))}
                                    />
                                </div>
                            </div>

                            {/* Question Text */}
                            <div>
                                <Label>Question</Label>
                                <Textarea
                                    value={formData.question}
                                    onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                                    placeholder="Enter your question..."
                                    rows={3}
                                />
                            </div>

                            {/* Options (for MCQ/Multi-select) */}
                            {(formData.type === 'multiple_choice' || formData.type === 'multi_select') && (
                                <div>
                                    <Label>Options</Label>
                                    <div className="space-y-2">
                                        {formData.options.map((option, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <input
                                                    type={formData.type === 'multi_select' ? 'checkbox' : 'radio'}
                                                    name="correctAnswer"
                                                    checked={formData.type === 'multi_select'
                                                        ? ((formData.correctAnswer as unknown as string[]) || []).includes(option)
                                                        : formData.correctAnswer === option
                                                    }
                                                    onChange={() => {
                                                        if (formData.type === 'multi_select') {
                                                            const current = ((formData.correctAnswer as unknown as string[]) || [])
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                correctAnswer: (current.includes(option)
                                                                    ? current.filter(a => a !== option)
                                                                    : [...current, option]) as unknown as string
                                                            }))
                                                        } else {
                                                            setFormData(prev => ({ ...prev, correctAnswer: option }))
                                                        }
                                                    }}
                                                    className="w-4 h-4"
                                                />
                                                <Input
                                                    value={option}
                                                    onChange={(e) => updateOption(index, e.target.value)}
                                                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                                                    className="flex-1"
                                                />
                                                {formData.options.length > 2 && (
                                                    <Button variant="ghost" size="sm" onClick={() => removeOption(index)}>
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                        <Button variant="outline" size="sm" onClick={addOption}>
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Option
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* True/False */}
                            {formData.type === 'true_false' && (
                                <div>
                                    <Label>Correct Answer</Label>
                                    <div className="flex gap-2 mt-2">
                                        {['true', 'false'].map((val) => (
                                            <Button
                                                key={val}
                                                type="button"
                                                variant={formData.correctAnswer === val ? 'default' : 'outline'}
                                                onClick={() => setFormData(prev => ({ ...prev, correctAnswer: val }))}
                                            >
                                                {val === 'true' ? 'True' : 'False'}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Short Answer / Essay */}
                            {(formData.type === 'short_answer' || formData.type === 'essay') && (
                                <div>
                                    <Label>Expected Answer / Rubric</Label>
                                    <Textarea
                                        value={formData.correctAnswer}
                                        onChange={(e) => setFormData(prev => ({ ...prev, correctAnswer: e.target.value }))}
                                        placeholder="Expected answer or grading rubric..."
                                        rows={3}
                                    />
                                </div>
                            )}

                            {/* Explanation & Hint */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Explanation (shown after answering)</Label>
                                    <Textarea
                                        value={formData.explanation}
                                        onChange={(e) => setFormData(prev => ({ ...prev, explanation: e.target.value }))}
                                        placeholder="Why this is the correct answer..."
                                        rows={2}
                                    />
                                </div>
                                <div>
                                    <Label>Hint (optional)</Label>
                                    <Textarea
                                        value={formData.hint}
                                        onChange={(e) => setFormData(prev => ({ ...prev, hint: e.target.value }))}
                                        placeholder="Hint to help students..."
                                        rows={2}
                                    />
                                </div>
                            </div>

                            {/* Tags */}
                            <div>
                                <Label>Tags</Label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {availableTags.map(tag => (
                                        <Badge
                                            key={tag}
                                            variant={formData.tags.includes(tag) ? 'default' : 'outline'}
                                            className="cursor-pointer"
                                            onClick={() => toggleTag(tag)}
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                    <Input
                                        placeholder="Add new tag..."
                                        className="w-32"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault()
                                                const value = (e.target as HTMLInputElement).value.trim()
                                                if (value && !formData.tags.includes(value)) {
                                                    setFormData(prev => ({ ...prev, tags: [...prev.tags, value] }))
                                                        ; (e.target as HTMLInputElement).value = ''
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Public */}
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    checked={formData.isPublic}
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublic: checked as boolean }))}
                                />
                                <Label>Make this question public for other tutors</Label>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave}>
                                {editingQuestion ? 'Update' : 'Create'}
                            </Button>
                        </DialogFooter>
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
                                    placeholder="Search questions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                        <Select value={selectedType} onValueChange={(v) => setSelectedType(v as QuestionType | 'all')}>
                            <SelectTrigger className="w-[180px]">
                                <Filter className="w-4 h-4 mr-2" />
                                <SelectValue placeholder="All Types" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                {QUESTION_TYPES.map(t => (
                                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedDifficulty} onValueChange={(v) => setSelectedDifficulty(v as QuestionDifficulty | 'all')}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="All Difficulties" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Difficulties</SelectItem>
                                {DIFFICULTIES.map(d => (
                                    <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Questions List */}
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
            ) : questions.length === 0 ? (
                <Card className="p-12 text-center">
                    <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No questions yet</h3>
                    <p className="text-muted-foreground mb-4">
                        Create your first question to start building your question bank
                    </p>
                    <Button onClick={() => { resetForm(); setIsCreateDialogOpen(true); }}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Question
                    </Button>
                </Card>
            ) : (
                <div className="space-y-4">
                    {questions.map((question) => (
                        <Card key={question.id}>
                            <CardContent className="pt-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="outline">{getTypeLabel(question.type)}</Badge>
                                            <Badge className={getDifficultyStyle(question.difficulty)}>
                                                {question.difficulty}
                                            </Badge>
                                            <Badge variant="secondary">{question.points} pts</Badge>
                                            {question.subject && (
                                                <Badge variant="outline">{question.subject}</Badge>
                                            )}
                                        </div>
                                        <p className="font-medium mb-2">{question.question}</p>
                                        {(question.options as string[])?.length > 0 && (
                                            <div className="text-sm text-muted-foreground mb-2">
                                                Options: {(question.options as string[]).map((o, i) => (
                                                    <span key={i} className={question.correctAnswer === o ? 'text-green-600 font-medium' : ''}>
                                                        {o}{i < (question.options as string[]).length - 1 ? ', ' : ''}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        {question.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {question.tags.map(tag => (
                                                    <Badge key={tag} variant="secondary" className="text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Button variant="ghost" size="sm" onClick={() => handleEdit(question)}>
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => handleDuplicate(question)}>
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => handleDelete(question.id)}>
                                            <Trash2 className="w-4 h-4 text-destructive" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
