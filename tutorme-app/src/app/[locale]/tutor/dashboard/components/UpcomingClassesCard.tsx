import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Clock, 
  BookOpen, 
  Plus, 
  Users, 
  Loader2,
  User as UserIcon,
  ExternalLink,
  Share2,
  Copy,
  Video,
  Sparkles
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
import { formatClassTime } from '@/lib/format-class-time'
import { cn } from '@/lib/utils'

export interface UpcomingClass {
  id: string
  curriculumId?: string
  title: string
  subject: string
  scheduledAt: string
  duration: number
  maxStudents: number
  enrolledStudents: number
  status: string
  sessionNo?: number
  totalSessions?: number
}

interface UpcomingClassesCardProps {
  classes: UpcomingClass[]
  formatDate: (dateString: string) => string
  loading?: boolean
  onCreateClassClick?: () => void
  onRemoveClass?: (classId: string) => void
}

function copyJoinLink(classId: string) {
  const url = typeof window !== 'undefined' ? `${window.location.origin}/student/live-class/${classId}` : ''
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(url).then(() => toast.success('Join link copied to clipboard'))
  }
}

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  classId: string
  classTitle: string
}

function ShareDialog({ open, onOpenChange, classId, classTitle }: ShareDialogProps) {
  const [students, setStudents] = useState<any[]>([])
  const [groups, setGroups] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [sharing, setSharing] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [studentsRes, coursesRes] = await Promise.all([
        fetch('/api/tutor/students'),
        fetch('/api/tutor/courses')
      ])
      
      if (studentsRes.ok) {
        const data = await studentsRes.json()
        setStudents(data.students || [])
      }
      
      if (coursesRes.ok) {
        const data = await coursesRes.json()
        const allGroups: any[] = []
        data.courses?.forEach((course: any) => {
          course.variants?.forEach((v: any) => {
            allGroups.push({
              id: v.batchId,
              name: `${course.name} - ${v.name}`
            })
          })
        })
        setGroups(allGroups)
      }
    } catch (err) {
      console.error('Failed to fetch share data:', err)
      toast.error('Failed to load students and groups')
    } finally {
      setTimeout(() => setLoading(false), 100)
    }
  }, [])

  useEffect(() => {
    if (open) {
      fetchData()
      setSelectedStudents([])
      setSelectedGroups([])
    }
  }, [open, fetchData])

  const handleShare = async () => {
    if (selectedStudents.length === 0 && selectedGroups.length === 0) {
      toast.error('Please select at least one student or group')
      return
    }

    setSharing(true)
    try {
      const res = await fetch('/api/tutor/classes/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classId,
          studentIds: selectedStudents,
          groupIds: selectedGroups
        })
      })

      if (res.ok) {
        const data = await res.json()
        toast.success(data.message || 'Shared successfully')
        onOpenChange(false)
      } else {
        const err = await res.json()
        toast.error(err.error || 'Failed to share class')
      }
    } catch (err) {
      toast.error('Failed to share class')
    } finally {
      setSharing(false)
    }
  }

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredGroups = groups.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0 overflow-hidden border border-slate-200">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-500" />
            Share Class
          </DialogTitle>
          <DialogDescription>
            Select students and groups to receive the join link for <strong>{classTitle}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-4 flex flex-col gap-4 flex-1 min-h-0">
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students or groups..."
              className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e: any) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <p className="text-sm text-gray-500">Loading recipients...</p>
            </div>
          ) : (
            <ScrollArea className="flex-1 -mx-2 px-2">
              <div className="space-y-6 pb-4">
                {filteredGroups.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1">Groups</h4>
                    <div className="grid gap-1">
                      {filteredGroups.map(group => (
                        <div 
                          key={group.id} 
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => {
                            setSelectedGroups(prev => 
                              prev.includes(group.id) ? prev.filter(id => id !== group.id) : [...prev, group.id]
                            )
                          }}
                        >
                          <Checkbox 
                            id={`group-${group.id}`}
                            checked={selectedGroups.includes(group.id)}
                            onCheckedChange={() => {}} 
                          />
                          <div className="flex-1">
                            <Label className="text-sm font-medium cursor-pointer">{group.name}</Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {filteredStudents.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1">Students</h4>
                    <div className="grid gap-1">
                      {filteredStudents.map(student => (
                        <div 
                          key={student.id} 
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => {
                            setSelectedStudents(prev => 
                              prev.includes(student.id) ? prev.filter(id => id !== student.id) : [...prev, student.id]
                            )
                          }}
                        >
                          <Checkbox 
                            id={`student-${student.id}`}
                            checked={selectedStudents.includes(student.id)}
                            onCheckedChange={() => {}}
                          />
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                            <UserIcon className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Label className="text-sm font-medium block truncate cursor-pointer">{student.name}</Label>
                            <p className="text-xs text-gray-500 truncate">{student.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!loading && filteredStudents.length === 0 && filteredGroups.length === 0 && (
                  <div className="py-12 text-center">
                    <Users className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">No students or groups found</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50/50 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {selectedStudents.length + selectedGroups.length} selected
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button 
              size="sm" 
              onClick={handleShare}
              disabled={sharing || (selectedStudents.length === 0 && selectedGroups.length === 0)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {sharing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
              Share Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function UpcomingClassesCard({ classes, formatDate, loading, onCreateClassClick, onRemoveClass }: UpcomingClassesCardProps) {
  const [selectedClass, setSelectedClass] = useState<UpcomingClass | null>(null)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  // Add mock session numbers for display
  const classesWithSessions = classes.map((cls, index) => ({
    ...cls,
    sessionNo: cls.sessionNo || (index % 4) + 1,
    totalSessions: cls.totalSessions || 12
  }))

  return (
    <Card className="border border-slate-200 overflow-hidden shadow-2xl bg-white/95 backdrop-blur-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2" title="Scheduled and active classes">
          <Clock className="w-5 h-5 text-blue-500" />
          My Classes
        </CardTitle>
        <Link href="/tutor/classes">
          <Button variant="ghost" size="sm">View All</Button>
        </Link>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4" aria-busy="true">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-36 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="h-9 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : classes.length === 0 ? (
          <div className="text-center py-8 px-4 border rounded-lg border-dashed border-gray-300 bg-gray-50/50">
            <p className="text-gray-600 mb-3">No upcoming classes</p>
            {onCreateClassClick && (
              <Button onClick={onCreateClassClick}>
                <Plus className="w-4 h-4 mr-2" /> Schedule a class
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Session No.</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {classesWithSessions.map((cls) => {
                  const time = formatClassTime(cls.scheduledAt, cls.duration)
                  return (
                    <tr 
                      key={cls.id} 
                      className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center shrink-0">
                            <BookOpen className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-900">{cls.title}</p>
                            <p className="text-xs text-gray-500">{cls.subject}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">
                        {formatDate(cls.scheduledAt)}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">
                        {time.timeRange}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
                          {cls.sessionNo}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-gray-700">
                        {cls.totalSessions}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                          onClick={() => setSelectedClass(cls)}
                        >
                          Open
                          <ExternalLink className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Class Detail Modal */}
        <Dialog open={!!selectedClass} onOpenChange={() => setSelectedClass(null)}>
          <DialogContent className="sm:max-w-md border border-slate-200">
            <DialogHeader>
              <DialogTitle>{selectedClass?.title}</DialogTitle>
              <DialogDescription>
                {selectedClass?.subject}
              </DialogDescription>
            </DialogHeader>
            
            {selectedClass && (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {formatDate(selectedClass.scheduledAt)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatClassTime(selectedClass.scheduledAt).formatted} • {selectedClass.duration} min
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {selectedClass.enrolledStudents}/{selectedClass.maxStudents} students
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedClass.maxStudents - selectedClass.enrolledStudents} spots remaining
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Session {selectedClass.sessionNo || 1} of {selectedClass.totalSessions || 12}
                    </p>
                    <p className="text-sm text-gray-500">
                      Total Sessions: {selectedClass.totalSessions || 12}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <Link href={`/tutor/live-class/${selectedClass.id}`}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                      <Video className="w-4 h-4 mr-2" />
                      Enter Live Room
                    </Button>
                  </Link>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => copyJoinLink(selectedClass.id)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Link
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsShareModalOpen(true)}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  
                  {selectedClass.curriculumId ? (
                    <Link href={`/tutor/courses/${selectedClass.curriculumId}`}>
                      <Button variant="outline" className="w-full">
                        <Sparkles className="w-4 h-4 mr-2" />
                        View Course Details
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/tutor/classes">
                      <Button variant="outline" className="w-full">
                        <Sparkles className="w-4 h-4 mr-2" />
                        View Class Details
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Share Dialog */}
        {selectedClass && (
          <ShareDialog
            open={isShareModalOpen}
            onOpenChange={setIsShareModalOpen}
            classId={selectedClass.id}
            classTitle={selectedClass.title}
          />
        )}
      </CardContent>
    </Card>
  )
}
