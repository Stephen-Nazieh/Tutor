import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, BookOpen, Copy, Plus, Sparkles, Video, Trash2, Users } from 'lucide-react'
import { toast } from 'sonner'
import { formatClassTime } from '@/lib/format-class-time'
import { cn } from '@/lib/utils'

export interface UpcomingClass {
  id: string
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
  const url = typeof window !== 'undefined' ? `${window.location.origin}/tutor/live-class/${classId}` : ''
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(url).then(() => toast.success('Join link copied to clipboard'))
  }
}

export function UpcomingClassesCard({ classes, formatDate, loading, onCreateClassClick, onRemoveClass }: UpcomingClassesCardProps) {
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null)
  const selectedClass = selectedClassId ? classes.find(c => c.id === selectedClassId) : classes[0]

  return (
    <Card>
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
          <div className="flex flex-col md:flex-row border rounded-xl overflow-hidden shadow-sm">
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
                  <div className="rounded-xl flex flex-col bg-white border border-gray-100 shadow-sm overflow-hidden h-fit">
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
                            {Math.round((selectedClass.enrolledStudents / selectedClass.maxStudents) * 100)}% Full
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${Math.min(100, Math.max(0, (selectedClass.enrolledStudents / selectedClass.maxStudents) * 100))}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <Link href={`/tutor/live-class/${selectedClass.id}`} className="w-full">
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md" size="lg">
                            <Video className="w-5 h-5 mr-2" />
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
                          {onRemoveClass && (
                            <Button
                              variant="outline"
                              className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                              onClick={() => onRemoveClass(selectedClass.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          )}
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
          </div>
        )}
      </CardContent>
    </Card>
  )
}
