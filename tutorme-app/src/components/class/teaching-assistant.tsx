/**
 * Teaching Assistant Panel
 * AI-powered teaching assistant that:
 * - Records live notes during lessons
 * - Generates lesson summaries and key concepts
 * - Includes student monitoring and insights
 * - Facilitates realtime chat interaction
 */

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { MemoryService } from '@/lib/ai/memory-service'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Bot,
  StickyNote,
  FileText,
  Users,

  Send,
  Plus,
  Trash2,
  Sparkles,

  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  Download,

  GraduationCap,
  Target,
  TrendingUp,
  MessageSquare,
  Edit3,
  Save,
  X
} from 'lucide-react'

interface Student {
  id: string
  name: string
  status: 'active' | 'struggling' | 'idle' | 'needs_help'
  engagement: number
  understanding: number
  frustration: number
  lastActive: Date
  raisedHand?: boolean
  currentActivity?: string
}

interface TranscriptEntry {
  id: string
  timestamp: Date
  speaker: string
  text: string
  isAiGenerated?: boolean
}

interface LessonSummary {
  keyConcepts: string[]
  actionItems: string[]
  homework: string
  nextTopic: string
}

interface Task {
  id: string
  title: string
  description: string
  type: 'quiz' | 'assignment' | 'practice' | 'assessment' | 'project'
  difficulty: 'easy' | 'medium' | 'hard'
  timeLimit?: number
  questions?: Question[]
  documentSource?: string
  assignedTo: string[]
  status: 'draft' | 'assigned' | 'in_progress' | 'completed' | 'graded'
  submissions: Submission[]
  createdAt: Date
}

interface Question {
  id: string
  type: 'multiple_choice' | 'short_answer' | 'essay' | 'code' | 'fill_blank'
  question: string
  options?: string[]
  correctAnswer?: string
  points: number
}

interface Submission {
  studentId: string
  studentName: string
  submittedAt: Date
  answers: Answer[]
  score?: number
  feedback?: string
  status: 'submitted' | 'grading' | 'graded'
}

interface Answer {
  questionId: string
  answer: string
  isCorrect?: boolean
  score?: number
  feedback?: string
}

interface Report {
  id: string
  studentId: string
  studentName: string
  taskId: string
  taskTitle: string
  score: number
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  generatedAt: Date
}

interface TeachingAssistantProps {
  students: Student[]
  onPushHint?: (studentId: string, hint: string, type: 'socratic' | 'direct' | 'encouragement') => void
  onInviteBreakout?: (studentId: string) => void
  roomId: string
  chatMessages?: any[]
}

export function TeachingAssistant({ students, onPushHint, onInviteBreakout, roomId, chatMessages = [] }: TeachingAssistantProps) {
  // Panel state
  const [isExpanded, setIsExpanded] = useState(true)
  const [activeTab, setActiveTab] = useState('assistant')

  // Assistant Chat state
  const [assistantMessages, setAssistantMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    { role: 'assistant', content: "Hi! I'm your teaching assistant. I'm analyzing the lesson and student engagement. How can I help?" }
  ])
  const [assistantInput, setAssistantInput] = useState('')
  const assistantScrollRef = useRef<HTMLDivElement>(null)






  // Transcript state
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([])
  const [summary, setSummary] = useState<LessonSummary | null>(null)
  const [isRecording, setIsRecording] = useState(false)

  // Tasks state

  // Tasks state
  const [isGenerating, setIsGenerating] = useState(false)

  // Reports state
  const [reports, setReports] = useState<Report[]>([])
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [showReportDialog, setShowReportDialog] = useState(false)

  // Simulate Live Transcript
  useEffect(() => {
    if (!isRecording) return

    const interval = setInterval(() => {
      const speakers = ['Tutor', 'Student', 'Student']
      const phrases = [
        "Let's move on to the next concept.",
        "I have a question about the formula.",
        "Could you explain that again?",
        "Excellent usage of the theorem!",
        "Remember to double check your negative signs.",
        "So, what is the derivative of this function?",
        "I think I understand now, thanks.",
        "We need to solve for X first."
      ]

      const randomSpeaker = speakers[Math.floor(Math.random() * speakers.length)]
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]

      const entry: TranscriptEntry = {
        id: Date.now().toString(),
        timestamp: new Date(),
        speaker: randomSpeaker,
        text: randomPhrase
      }

      setTranscript(prev => [...prev, entry])
      MemoryService.appendTranscript(roomId, entry)
    }, 4000)

    return () => clearInterval(interval)
  }, [isRecording])

  const generateSummary = async () => {
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    const newSummary = {
      keyConcepts: ['Quadratic Formula', 'Find Roots', 'Graphing Parabolas'],
      actionItems: ['Review Chapter 4', 'Practice Problem Set B'],
      homework: 'Complete exercises 1-10 on page 42.',
      nextTopic: 'Complex Numbers',
      struggles: ['finding_roots', 'negative_signs'] // Inferred from transcript
    }

    setSummary(newSummary)

    // Push summary to Unified Context (Shared Brain) for each student
    students.forEach((student) => {
      MemoryService.processClassSummary(student.id, {
        ...newSummary,
        topic: 'Quadratic Equations',
        status: student.status === 'struggling' ? 'struggled' : 'completed',
        struggles: student.status === 'struggling' ? newSummary.struggles : []
      }).catch(console.error)
    })

    setIsGenerating(false)
  }

  const handleAssistantSend = async () => {
    if (!assistantInput.trim()) return

    const userMsg = assistantInput
    setAssistantMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setAssistantInput('')

    // Simulate AI response
    setTimeout(() => {
      let response = "I can help with that."
      if (userMsg.toLowerCase().includes('quiz')) {
        response = "I can generate a quiz based on the last 5 minutes of chat using the 'Tasks' tab."
      } else if (userMsg.toLowerCase().includes('student')) {
        const struggling = students.filter(s => s.status === 'struggling')
        if (struggling.length > 0) {
          response = `${struggling.length} students seem to be struggling. I recommend sending a hint to ${struggling[0].name}.`
        } else {
          response = "All students seem to be following along well!"
        }
      }

      setAssistantMessages(prev => [...prev, { role: 'assistant', content: response }])
    }, 1000)
  }

  useEffect(() => {
    if (assistantScrollRef.current) {
      assistantScrollRef.current.scrollTop = assistantScrollRef.current.scrollHeight
    }
  }, [assistantMessages])





  if (!isExpanded) {
    return (
      <div className="w-12 bg-slate-800 border-l border-slate-700 flex flex-col items-center py-4">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsExpanded(true)}>
          <ChevronUp className="w-4 h-4" />
        </Button>
        <Bot className="w-6 h-6 text-blue-400 mt-2" />
        <span className="text-xs text-slate-400 mt-1 rotate-90 whitespace-nowrap">Teaching Assistant</span>
      </div>
    )
  }

  return (
    <div className="w-[500px] bg-slate-800 border-l border-slate-700 flex flex-col">
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="w-full rounded-none border-b border-slate-700 bg-slate-800 p-0 h-10">
          <TabsTrigger value="assistant" className="flex-1 rounded-none data-[state=active]:bg-slate-700">
            <Bot className="w-4 h-4 mr-1" /> Teaching Assistant
          </TabsTrigger>
          <TabsTrigger value="transcript" className="flex-1 rounded-none data-[state=active]:bg-slate-700">
            <FileText className="w-4 h-4 mr-1" /> Transcript
          </TabsTrigger>

          <TabsTrigger value="students" className="flex-1 rounded-none data-[state=active]:bg-slate-700">
            <Users className="w-4 h-4 mr-1" /> Students
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex-1 rounded-none data-[state=active]:bg-slate-700">
            <FileText className="w-4 h-4 mr-1" /> Reports
          </TabsTrigger>
        </TabsList>

        {/* Assistant Tab */}
        <TabsContent value="assistant" className="flex-1 flex flex-col m-0 p-0">
          <ScrollArea className="flex-1 p-4" ref={assistantScrollRef}>
            <div className="space-y-4">
              {assistantMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-lg p-3 text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-200'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-3 border-t border-slate-700 flex gap-2">
            <Input
              value={assistantInput}
              onChange={(e) => setAssistantInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAssistantSend()}
              placeholder="Ask for help..."
              className="flex-1 bg-slate-900 border-slate-600"
            />
            <Button size="icon" onClick={handleAssistantSend}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </TabsContent>

        {/* Transcript Tab */}
        <TabsContent value="transcript" className="flex-1 flex flex-col m-0 p-0">
          <div className="p-3 border-b border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <Button
                variant={isRecording ? 'destructive' : 'default'}
                size="sm"
                onClick={() => setIsRecording(!isRecording)}
                className="flex-1"
              >
                {isRecording ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                {isRecording ? 'Stop Recording' : 'Start Live Transcript'}
              </Button>
            </div>
            {summary ? (
              <div className="bg-slate-900 rounded p-3 text-sm space-y-2 mb-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-green-400">Lesson Summary</h4>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setSummary(null)}>
                    <X className="w-3 h-3" />
                  </Button>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Key Concepts:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {summary.keyConcepts.map(c => <Badge key={c} variant="outline" className="text-xs">{c}</Badge>)}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block">Homework:</span>
                    <span className="text-slate-200">{summary.homework}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Next Topic:</span>
                    <span className="text-slate-200">{summary.nextTopic}</span>
                  </div>
                </div>
              </div>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={generateSummary}
                disabled={transcript.length === 0 || isGenerating}
              >
                <Sparkles className="w-4 h-4 mr-1" />
                {isGenerating ? 'Generating...' : 'Generate AI Summary'}
              </Button>
            )}


          </div>

          <ScrollArea className="flex-1 p-3">
            <div className="space-y-3">
              {transcript.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-slate-600" />
                  </div>
                  <p className="text-slate-500 text-sm">
                    Start recording to see live transcript.
                  </p>
                </div>
              )}
              {transcript.map(entry => (
                <div key={entry.id} className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-medium ${entry.speaker === 'Tutor' ? 'text-blue-400' : 'text-green-400'}`}>
                      {entry.speaker}
                    </span>
                    <span className="text-xs text-slate-500">
                      {entry.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-slate-200 pl-2 border-l-2 border-slate-700 ml-1">
                    {entry.text}
                  </p>
                </div>
              ))}
              {isRecording && (
                <div className="flex items-center gap-2 text-xs text-slate-500 animate-pulse pl-3">
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                  Listening...
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>



        {/* Students Tab */}
        <TabsContent value="students" className="flex-1 flex flex-col m-0 p-0">
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-2">
              {students.length === 0 && (
                <p className="text-slate-500 text-sm text-center py-4">No students connected.</p>
              )}
              {students.map(student => (
                <div key={student.id} className={`p-3 rounded-lg ${student.status === 'struggling' ? 'bg-red-900/30 border border-red-800' : student.status === 'needs_help' ? 'bg-yellow-900/30 border border-yellow-800' : 'bg-slate-700'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${student.status === 'active' ? 'bg-green-600' : student.status === 'struggling' ? 'bg-red-600' : 'bg-yellow-600'}`}>
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{student.name}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span>Engagement: {student.engagement}%</span>
                          <span>•</span>
                          <span>Understanding: {student.understanding}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                          <span className={student.frustration > 50 ? 'text-red-400' : 'text-green-400'}>
                            Frustration: {student.frustration}%
                          </span>
                        </div>
                      </div>
                    </div>
                    {student.raisedHand && (
                      <Badge className="bg-yellow-600">Hand Raised</Badge>
                    )}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={() => onPushHint?.(student.id, 'Remember to break down the problem into smaller steps', 'socratic')}>
                      Send Hint
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={() => onInviteBreakout?.(student.id)}>
                      1:1 Session
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="flex-1 flex flex-col m-0 p-0">
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-2">
              {reports.length === 0 && (
                <p className="text-slate-500 text-sm text-center py-4">
                  No reports yet. Grade student submissions to generate reports.
                </p>
              )}
              {reports.map(report => (
                <div key={report.id} className="p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">{report.studentName}</h4>
                      <p className="text-xs text-slate-400">{report.taskTitle}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-lg font-bold ${report.score >= 80 ? 'text-green-400' : report.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {report.score}%
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-2" onClick={() => { setSelectedReport(report); setShowReportDialog(true); }}>
                    View Report
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>







      {/* Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Student Report: {selectedReport?.studentName}</DialogTitle>
            <DialogDescription>{selectedReport?.taskTitle}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center p-4 bg-slate-800 rounded-lg">
              <span className={`text-4xl font-bold ${selectedReport && selectedReport.score >= 80 ? 'text-green-400' : selectedReport && selectedReport.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                {selectedReport?.score}%
              </span>
            </div>

            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" /> Strengths
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-300">
                {selectedReport?.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-400" /> Areas for Improvement
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-300">
                {selectedReport?.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" /> Recommendations
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-300">
                {selectedReport?.recommendations.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>

            <div className="text-xs text-slate-500">
              Generated: {selectedReport?.generatedAt.toLocaleString()}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => selectedReport && alert('Report downloaded!')}>
              <Download className="w-4 h-4 mr-1" /> Download
            </Button>
            <Button onClick={() => setShowReportDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
