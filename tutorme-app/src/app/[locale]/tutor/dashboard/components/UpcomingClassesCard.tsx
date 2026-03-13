import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Clock, 
  BookOpen, 
  Copy, 
  Plus, 
  Sparkles, 
  Video, 
  Trash2, 
  Users, 
  Share2, 
  Loader2,
  User as UserIcon
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
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0 overflow-hidden neon-border-purple">
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
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  
  const selectedClass = selectedClassId 
    ? classes.find(c => c.id === selectedClassId) 
    : classes[0]

  return (
    <Card className="neon-border-indigo border-none overflow-hidden shadow-2xl bg-white/95 backdrop-blur-md">
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
          <div className="flex flex-col md:flex-row border-none rounded-2xl overflow-hidden shadow-lg neon-border-inner bg-white/80">
            {/* Left Column: Classes List */}
            <div className="w-full md:w-[45%] flex flex-col bg-gray-50/50 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200 bg-gray-50/80 font-semibold text-gray-700 text-sm">
                Classes List
              </div>
              <div className="space-y-1 max-h-[500px] overflow-y-auto p-3">
                {classes.map((cls) => {
                  const time = formatClassTime(cls.scheduledAt)
                  const isSelected = selectedClass?.id === cls.id
                  return (
                    <div
                      key={cls.id}
                      onClick={() => setSelectedClassId(cls.id)}
                      className={cn(
                        "cursor-pointer flex items-center justify-between p-3 rounded-lg transition-colors border max-w-full",
                        isSelected ? "border-blue-500 bg-blue-50/80 shadow-sm" : "border-transparent hover:bg-white hover:border-gray-200"
                      )}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className={cn("w-9 h-9 rounded-md flex items-center justify-center shrink-0", isSelected ? "bg-blue-100" : "bg-gray-200")}>
                          <BookOpen className={cn("w-4 h-4", isSelected ? "text-blue-600" : "text-gray-500")} />
                        </div>
                        <div className="min-w-0 flex-1 overflow-hidden">
                          <h3 className="font-medium text-sm truncate">{cls.title}</h3>
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {cls.subject} • {time.formatted}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Column: Class Preview Panel */}
            <div className="w-full md:w-[55%] flex flex-col bg-white">
              <div className="p-4 border-b border-gray-200 bg-white font-semibold text-gray-700 text-sm mb-0">
                Class Preview
              </div>
              <div className="p-4 flex-1">
                {selectedClass ? (
                  <div className="rounded-2xl flex flex-col bg-white/90 border-none shadow-xl overflow-hidden h-fit neon-border-inner backdrop-blur-sm">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                          {selectedClass.status || 'Scheduled'}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
                          {selectedClass.subject}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 leading-tight mb-2">
                        {selectedClass.title}
                      </h2>
                      <div className="flex items-center text-sm text-gray-600 gap-4 mt-4">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>
                            {formatClassTime(selectedClass.scheduledAt).formatted}
                            <span className="text-gray-400 ml-1">({selectedClass.duration}m)</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{selectedClass.enrolledStudents}/{selectedClass.maxStudents} seats</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Enrollment</span>
                          <span className="text-sm text-gray-500">
                            {Math.round((selectedClass.enrolledStudents / (selectedClass.maxStudents || 1)) * 100)}% Full
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                            style={{ 
                              width: `${Math.min(100, Math.max(0, (selectedClass.enrolledStudents / (selectedClass.maxStudents || 1)) * 100))}%` 
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-2 gap-3">
                          <Link href={`/tutor/live-class/${selectedClass.id}`} className="col-span-2">
                            <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg" size="lg">
                              <Video className="w-5 h-5 mr-2" />
                              Enter Live Room
                            </Button>
                          </Link>
                          
                          {selectedClass.curriculumId ? (
                            <Link href={`/tutor/courses/${selectedClass.curriculumId}`} className="col-span-2">
                               <Button variant="outline" className="w-full border-indigo-200 hover:bg-indigo-50 text-indigo-700 font-semibold">
                                 <BookOpen className="w-4 h-4 mr-2" />
                                 View Course Details
                               </Button>
                            </Link>
                          ) : (
                            <Link href={`/tutor/classes`} className="col-span-2">
                               <Button variant="outline" className="w-full border-indigo-200 hover:bg-indigo-50 text-indigo-700 font-semibold">
                                 <Sparkles className="w-4 h-4 mr-2" />
                                 View Class Details
                               </Button>
                            </Link>
                          )}

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
                            <Share2 className="w-4 h-4 mr-2 text-blue-500" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center p-8 text-center text-gray-500">
                    <p>Select a class to preview its details</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Share Dialog */}
            {selectedClass && (
              <ShareDialog
                open={isShareModalOpen}
                onOpenChange={setIsShareModalOpen}
                classId={selectedClass.id}
                classTitle={selectedClass.title}
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
