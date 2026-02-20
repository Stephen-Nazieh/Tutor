'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  Plus, 
  Search, 
  Calendar,
  BarChart3,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Link as LinkIcon,
  Loader2,
  GraduationCap,
  BookOpen,
  Radio,
  Video,
  AlertCircle
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

// Types
interface Group {
  id: string
  name: string
  description?: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  languageOfInstruction: string
  enrollmentCount: number
  courseCount: number
  isLive: boolean
  createdAt: string
  schedule: Array<{
    dayOfWeek: string
    startTime: string
    durationMinutes: number
  }>
  assignedCourses: Array<{
    courseId: string
    title: string
    status: string
  }>
}

const DIFFICULTY_COLORS = {
  beginner: 'bg-green-100 text-green-700 border-green-200',
  intermediate: 'bg-blue-100 text-blue-700 border-blue-200',
  advanced: 'bg-purple-100 text-purple-700 border-purple-200'
}

const DIFFICULTY_LABELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced'
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

// Mock data - in real app, fetch from API
const MOCK_GROUPS: Group[] = [
  {
    id: 'batch-1',
    name: 'January 2025 - Beginner',
    description: 'Introduction to programming for beginners',
    difficulty: 'beginner',
    languageOfInstruction: 'en',
    enrollmentCount: 15,
    courseCount: 2,
    isLive: true,
    createdAt: '2024-12-15T10:00:00Z',
    schedule: [
      { dayOfWeek: 'Monday', startTime: '10:00', durationMinutes: 60 },
      { dayOfWeek: 'Wednesday', startTime: '10:00', durationMinutes: 60 }
    ],
    assignedCourses: [
      { courseId: 'course-1', title: 'Python Fundamentals', status: 'active' },
      { courseId: 'course-2', title: 'Web Development Basics', status: 'active' }
    ]
  },
  {
    id: 'batch-2',
    name: 'February 2025 - Intermediate',
    description: 'Advanced concepts for intermediate learners',
    difficulty: 'intermediate',
    languageOfInstruction: 'en',
    enrollmentCount: 12,
    courseCount: 1,
    isLive: false,
    createdAt: '2024-12-20T14:00:00Z',
    schedule: [
      { dayOfWeek: 'Tuesday', startTime: '14:00', durationMinutes: 90 },
      { dayOfWeek: 'Thursday', startTime: '14:00', durationMinutes: 90 }
    ],
    assignedCourses: [
      { courseId: 'course-3', title: 'Data Structures & Algorithms', status: 'active' }
    ]
  },
  {
    id: 'batch-3',
    name: 'March 2025 - Advanced',
    description: 'Expert-level course for advanced students',
    difficulty: 'advanced',
    languageOfInstruction: 'en',
    enrollmentCount: 8,
    courseCount: 0,
    isLive: false,
    createdAt: '2025-01-05T09:00:00Z',
    schedule: [],
    assignedCourses: []
  }
]

export default function MyGroupsPage() {
  const router = useRouter()
  const [groups, setGroups] = useState<Group[]>(MOCK_GROUPS)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [groupToDelete, setGroupToDelete] = useState<Group | null>(null)

  // In real app, fetch from API
  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      // Check localStorage for newly created groups
      const storedGroups = localStorage.getItem('tutor_groups')
      if (storedGroups) {
        try {
          const parsed = JSON.parse(storedGroups)
          setGroups(prev => [...parsed, ...prev.filter(g => !parsed.find((pg: Group) => pg.id === g.id))])
        } catch {
          setGroups(MOCK_GROUPS)
        }
      } else {
        setGroups(MOCK_GROUPS)
      }
      setLoading(false)
    }, 500)
  }, [])

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateGroup = () => {
    // Navigate to the Group Builder page
    router.push('/tutor/group-builder')
  }

  const handleDeleteGroup = (group: Group) => {
    setGroupToDelete(group)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!groupToDelete) return
    
    setGroups(prev => prev.filter(g => g.id !== groupToDelete.id))
    
    // Update localStorage
    const storedGroups = localStorage.getItem('tutor_groups')
    if (storedGroups) {
      try {
        const parsed = JSON.parse(storedGroups)
        const updated = parsed.filter((g: Group) => g.id !== groupToDelete.id)
        localStorage.setItem('tutor_groups', JSON.stringify(updated))
      } catch {}
    }
    
    toast.success(`Group "${groupToDelete.name}" deleted`)
    setDeleteDialogOpen(false)
    setGroupToDelete(null)
  }

  const handleCopyLink = (groupId: string) => {
    const url = `${window.location.origin}/curriculum/enroll?group=${groupId}`
    navigator.clipboard.writeText(url)
    toast.success('Group enrollment link copied')
  }

  const handleToggleLive = (groupId: string, isLive: boolean) => {
    setGroups(prev => prev.map(g => 
      g.id === groupId ? { ...g, isLive } : g
    ))
    toast.success(isLive ? 'Group is now online' : 'Group is now offline')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-500" />
            My Groups
          </h1>
          <p className="text-muted-foreground">
            View and manage all your teaching groups
          </p>
        </div>
        <Button onClick={handleCreateGroup} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Group
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{groups.length}</p>
                <p className="text-xs text-muted-foreground">Total Groups</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <GraduationCap className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {groups.reduce((acc, g) => acc + g.enrollmentCount, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {groups.reduce((acc, g) => acc + g.courseCount, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Assigned Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Radio className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {groups.filter(g => g.isLive).length}
                </p>
                <p className="text-xs text-muted-foreground">Live Groups</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Groups Grid */}
      {filteredGroups.length === 0 ? (
        <div className="text-center py-16">
          <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No groups yet</h3>
          <p className="text-muted-foreground mb-4">
            Go to Group Builder to create your first group
          </p>
          <Button onClick={handleCreateGroup} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Group
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map(group => (
            <GroupCard
              key={group.id}
              group={group}
              onDelete={() => handleDeleteGroup(group)}
              onCopyLink={() => handleCopyLink(group.id)}
              onToggleLive={(isLive) => handleToggleLive(group.id, isLive)}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Group</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{groupToDelete?.name}&quot;? This action cannot be undone.
              {groupToDelete && groupToDelete.enrollmentCount > 0 && (
                <div className="mt-2 flex items-start gap-2 text-amber-600">
                  <AlertCircle className="h-4 w-4 mt-0.5" />
                  <span>
                    This group has {groupToDelete.enrollmentCount} enrolled students. 
                    They will lose access to assigned courses.
                  </span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Group Card Component
interface GroupCardProps {
  group: Group
  onDelete: () => void
  onCopyLink: () => void
  onToggleLive: (isLive: boolean) => void
}

function GroupCard({ group, onDelete, onCopyLink, onToggleLive }: GroupCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={cn(
                'text-[10px]',
                DIFFICULTY_COLORS[group.difficulty]
              )}>
                {DIFFICULTY_LABELS[group.difficulty]}
              </Badge>
              {group.isLive && (
                <Badge className="bg-green-500 text-white text-[10px]">
                  <Radio className="h-2 w-2 mr-1 animate-pulse" />
                  Live
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg truncate">{group.name}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/tutor/group-builder">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit in Group Builder
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={onDelete}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {group.description || 'No description'}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm mb-4">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{group.enrollmentCount} students</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>{group.courseCount} courses</span>
          </div>
        </div>

        {/* Schedule Preview */}
        {group.schedule && group.schedule.length > 0 ? (
          <div className="text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1 mb-1">
              <Calendar className="h-3 w-3" />
              <span>Schedule:</span>
            </div>
            <div className="space-y-0.5 pl-4">
              {group.schedule.slice(0, 2).map((slot, idx) => (
                <div key={idx}>
                  {slot.dayOfWeek} at {slot.startTime} ({slot.durationMinutes} min)
                </div>
              ))}
              {group.schedule.length > 2 && (
                <div>+{group.schedule.length - 2} more</div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-xs text-muted-foreground mb-4">
            No schedule set
          </div>
        )}

        {/* Assigned Courses */}
        {group.assignedCourses && group.assignedCourses.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-1">Assigned Courses:</p>
            <div className="flex flex-wrap gap-1">
              {group.assignedCourses.map(course => (
                <Badge key={course.courseId} variant="outline" className="text-[10px]">
                  {course.title}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t flex-wrap">
          <Button
            variant={group.isLive ? "default" : "outline"}
            size="sm"
            onClick={() => onToggleLive(!group.isLive)}
            className={cn(
              "gap-1 text-xs flex-1 min-w-[80px]",
              group.isLive && "bg-green-600 hover:bg-green-700"
            )}
          >
            {group.isLive ? (
              <>
                <Video className="h-3 w-3" />
                Online
              </>
            ) : (
              <>
                <Radio className="h-3 w-3" />
                Go Live
              </>
            )}
          </Button>
          <Button size="sm" variant="outline" onClick={onCopyLink} className="gap-1 text-xs flex-1 min-w-[80px]">
            <LinkIcon className="h-3 w-3" />
            Copy Link
          </Button>
          <Button size="sm" variant="outline" asChild className="flex-1 min-w-[80px]">
            <Link href="/tutor/group-builder">
              Manage
            </Link>
          </Button>
          <Button 
            size="sm" 
            variant="default" 
            asChild 
            className="flex-1 min-w-[100px] bg-blue-600 hover:bg-blue-700"
          >
            <Link href="/tutor/group-builder">
              <Plus className="h-3 w-3 mr-1" />
              Assign Course
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
