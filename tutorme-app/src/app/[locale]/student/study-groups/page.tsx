'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import { toast } from "sonner"
import { 
  Users, 
  CheckCircle, 
  Loader2, 
  ArrowLeft,
  BookOpen,
  Plus,
  Crown,
  LogOut,
  Search,
  User
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface StudyGroup {
  id: string
  name: string
  subject: string
  description?: string
  maxMembers: number
  currentMembers: number
  isMember: boolean
  isFull: boolean
  memberRole?: string
  createdAt: string
  creator: {
    id: string
    profile?: {
      name?: string
      avatar?: string
    }
  }
}

export default function StudyGroupsPage() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [groups, setGroups] = useState<StudyGroup[]>([])
  const [myGroups, setMyGroups] = useState<StudyGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [joiningGroupId, setJoiningGroupId] = useState<string | null>(null)
  const [leavingGroupId, setLeavingGroupId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [subjectFilter, setSubjectFilter] = useState<string>('all')
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [creating, setCreating] = useState(false)

  // Form state
  const [newGroup, setNewGroup] = useState({
    name: '',
    subject: '',
    description: '',
    maxMembers: 20
  })

  useEffect(() => {
    if (status === 'authenticated') {
      fetchGroups()
      fetchMyGroups()
    }
  }, [status])

  const fetchGroups = async () => {
    try {
      const url = subjectFilter !== 'all' 
        ? `/api/study-groups?limit=50&subject=${subjectFilter}`
        : '/api/study-groups?limit=50'
      const res = await fetch(url)
      const data = await res.json()
      if (data.groups) {
        setGroups(data.groups)
      }
    } catch (error) {
      toast.error(`Error`, {
        description: "Failed to load study groups",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchMyGroups = async () => {
    try {
      const res = await fetch('/api/study-groups?myGroups=true')
      const data = await res.json()
      if (data.groups) {
        setMyGroups(data.groups)
      }
    } catch (error) {
      console.error('Failed to fetch my groups')
    }
  }

  const handleJoinGroup = async (groupId: string) => {
    setJoiningGroupId(groupId)
    try {
      const res = await fetch('/api/study-groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId })
      })
      const data = await res.json()
      
      if (data.success) {
        toast.success(`Joined Group! 👥`, {
          description: data.message,
        })
        // Refresh both lists
        fetchGroups()
        fetchMyGroups()
      } else {
        toast.error(`Join Failed`, {
          description: data.error || 'Failed to join group',
        })
      }
    } catch (error) {
      toast.error(`Error`, {
        description: 'Failed to join group. Please try again.',
      })
    } finally {
      setJoiningGroupId(null)
    }
  }

  const handleLeaveGroup = async (groupId: string) => {
    setLeavingGroupId(groupId)
    try {
      const res = await fetch('/api/study-groups', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId })
      })
      const data = await res.json()
      
      if (data.success) {
        toast.success(`Left Group`, {
          description: data.message,
        })
        // Refresh both lists
        fetchGroups()
        fetchMyGroups()
      } else {
        toast.error(`Failed to Leave`, {
          description: data.error || 'Failed to leave group',
        })
      }
    } catch (error) {
      toast.error(`Error`, {
        description: 'Failed to leave group. Please try again.',
      })
    } finally {
      setLeavingGroupId(null)
    }
  }

  const handleCreateGroup = async () => {
    if (!newGroup.name || !newGroup.subject) {
      toast.error(`Missing Fields`, {
        description: "Please fill in all required fields",
      })
      return
    }

    setCreating(true)
    try {
      const res = await fetch('/api/study-groups', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGroup)
      })
      const data = await res.json()
      
      if (data.success) {
        toast.success(`Group Created! 🎉`, {
          description: `"${newGroup.name}" has been created`,
        })
        setCreateDialogOpen(false)
        setNewGroup({ name: '', subject: '', description: '', maxMembers: 20 })
        // Refresh lists
        fetchGroups()
        fetchMyGroups()
      } else {
        toast.error(`Create Failed`, {
          description: data.error || 'Failed to create group',
        })
      }
    } catch (error) {
      toast.error(`Error`, {
        description: 'Failed to create group. Please try again.',
      })
    } finally {
      setCreating(false)
    }
  }

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const availableGroups = filteredGroups.filter(g => !g.isMember)

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading study groups...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/student/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">TutorMe</h1>
          </div>
          <UserNav />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Study Groups</h2>
            <p className="text-gray-600 mt-1">Join groups to learn together with peers</p>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Study Group</DialogTitle>
                <DialogDescription>
                  Start a new study group for a subject you're interested in.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Group Name *</Label>
                  <Input
                    id="name"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                    placeholder="e.g., Calculus Study Squad"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select 
                    value={newGroup.subject} 
                    onValueChange={(value) => setNewGroup({ ...newGroup, subject: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                    placeholder="What will you study?"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxMembers">Max Members</Label>
                  <Input
                    id="maxMembers"
                    type="number"
                    min={2}
                    max={50}
                    value={newGroup.maxMembers}
                    onChange={(e) => setNewGroup({ ...newGroup, maxMembers: parseInt(e.target.value) || 20 })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateGroup} disabled={creating}>
                  {creating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Create Group
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList>
            <TabsTrigger value="browse">
              Browse ({availableGroups.length})
            </TabsTrigger>
            <TabsTrigger value="my-groups">
              My Groups ({myGroups.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search groups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {availableGroups.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableGroups.map((group) => (
                  <Card key={group.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            {group.subject}
                          </Badge>
                          <CardTitle className="text-lg">{group.name}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {group.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {group.description}
                        </p>
                      )}
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {group.currentMembers}/{group.maxMembers} members
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Created by {group.creator.profile?.name || 'Anonymous'}
                        </div>
                      </div>

                      <Button 
                        className="w-full"
                        disabled={joiningGroupId === group.id || group.isFull}
                        onClick={() => handleJoinGroup(group.id)}
                      >
                        {joiningGroupId === group.id ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : null}
                        {group.isFull ? 'Full' : 'Join Group'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-12 pb-12 text-center">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600">
                    {searchQuery || subjectFilter !== 'all' 
                      ? 'No groups match your search' 
                      : 'No available groups'}
                  </h3>
                  <p className="text-gray-500 mt-1">
                    {searchQuery || subjectFilter !== 'all'
                      ? 'Try different search terms'
                      : 'Create the first study group!'}
                  </p>
                  {!searchQuery && subjectFilter === 'all' && (
                    <Button className="mt-4" onClick={() => setCreateDialogOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Group
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="my-groups">
            {myGroups.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myGroups.map((group) => (
                  <Card key={group.id} className={group.memberRole === 'admin' ? 'border-yellow-300' : 'border-green-300'}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">
                              {group.subject}
                            </Badge>
                            {group.memberRole === 'admin' && (
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <Crown className="w-3 h-3 mr-1" />
                                Admin
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg">{group.name}</CardTitle>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {group.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {group.description}
                        </p>
                      )}
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {group.currentMembers}/{group.maxMembers} members
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1" variant="outline">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Open
                        </Button>
                        {group.memberRole !== 'admin' && (
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleLeaveGroup(group.id)}
                            disabled={leavingGroupId === group.id}
                          >
                            {leavingGroupId === group.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <LogOut className="w-4 h-4 text-red-500" />
                            )}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-12 pb-12 text-center">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600">Not in any groups yet</h3>
                  <p className="text-gray-500 mt-1">Join a study group to start collaborating</p>
                  <Button className="mt-4" onClick={() => {
                    const tabs = document.querySelector('[data-state="active"]')
                    if (tabs) {
                      const browseTab = document.querySelector('[value="browse"]') as HTMLElement
                      browseTab?.click()
                    }
                  }}>
                    Browse Groups
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
