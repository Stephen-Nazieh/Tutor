'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  User,
  Settings,
  Award,
  Target,
  Flame,
  Zap,
  BookOpen,
  Clock,
  TrendingUp,
  GraduationCap,
  Mail,
  Edit3,
  Save,
  X
} from 'lucide-react'

interface GamificationData {
  level: number
  xp: number
  nextLevelXp: number
  currentLevelXp: number
  progress: number
  xpToNextLevel: number
  streakDays: number
  longestStreak: number
  skills: {
    grammar: number
    vocabulary: number
    speaking: number
    listening: number
    confidence: number
    fluency: number
  }
}

interface UserProfile {
  id: string
  name: string | null
  email: string | null
  image: string | null
  profile?: {
    gradeLevel?: string
    school?: string
    targetScore?: number
    studyHours?: number
    bio?: string
  }
}

interface StudyStats {
  totalStudyTime: number
  subjectsCompleted: number
  quizzesTaken: number
  averageScore: number
  lessonsCompleted: number
  currentStreak: number
}

export function StudentProfile() {
  const { data: session } = useSession()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [gamification, setGamification] = useState<GamificationData | null>(null)
  const [stats, setStats] = useState<StudyStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    gradeLevel: '',
    school: '',
    bio: '',
  })

  useEffect(() => {
    loadProfileData()
  }, [])

  const loadProfileData = async () => {
    try {
      const [profileRes, gamificationRes] = await Promise.all([
        fetch('/api/user/profile'),
        fetch('/api/gamification')
      ])

      const profileData = await profileRes.json()
      const gamificationData = await gamificationRes.json()

      if (profileData.profile) {
        setProfile(profileData.profile)
        setEditForm({
          name: profileData.profile.name || '',
          gradeLevel: profileData.profile.gradeLevel || '',
          school: profileData.profile.school || '',
          bio: profileData.profile.bio || '',
        })
      }

      if (gamificationData.success) {
        setGamification(gamificationData.data)
      }

      // Mock stats for now - can be fetched from a real API
      setStats({
        totalStudyTime: 47,
        subjectsCompleted: 3,
        quizzesTaken: 24,
        averageScore: 82,
        lessonsCompleted: 156,
        currentStreak: 5
      })
    } catch (error) {
      console.error('Failed to load profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      })

      if (res.ok) {
        toast.success('Profile updated successfully!')
        setIsEditing(false)
        loadProfileData()
      } else {
        toast.error('Failed to update profile')
      }
    } catch (error) {
      toast.error('Error updating profile')
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <User className="w-4 h-4" />
          Profile
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-500" />
            Student Profile
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* User Info Card */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                      {profile?.name?.charAt(0)?.toUpperCase() || 'S'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{profile?.name || 'Student'}</h3>
                      <p className="text-sm text-gray-500">{profile?.email}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          <GraduationCap className="w-3 h-3 mr-1" />
                          Grade {profile?.profile?.gradeLevel || 'N/A'}
                        </Badge>
                        {gamification && (
                          <Badge variant="secondary" className="text-xs">
                            <Zap className="w-3 h-3 mr-1" />
                            Level {gamification.level}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="grade">Grade Level</Label>
                      <Input
                        id="grade"
                        value={editForm.gradeLevel}
                        onChange={(e) => setEditForm({ ...editForm, gradeLevel: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="school">School</Label>
                      <Input
                        id="school"
                        value={editForm.school}
                        onChange={(e) => setEditForm({ ...editForm, school: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        value={editForm.bio}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      />
                    </div>
                    <Button onClick={handleSaveProfile} className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {profile?.profile?.school && (
                      <p className="text-sm">
                        <span className="text-gray-500">School:</span> {profile.profile.school}
                      </p>
                    )}
                    {profile?.profile?.bio && (
                      <p className="text-sm">
                        <span className="text-gray-500">Bio:</span> {profile.profile.bio}
                      </p>
                    )}
                    {gamification && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-500">XP Progress</span>
                          <span className="font-medium">{gamification.xp} / {gamification.nextLevelXp} XP</span>
                        </div>
                        <Progress value={gamification.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Gamification Stats */}
            {gamification && (
              <div className="grid grid-cols-2 gap-3">
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="text-2xl font-bold">{gamification.streakDays}</p>
                        <p className="text-xs text-gray-500">Day Streak</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="text-2xl font-bold">{gamification.level}</p>
                        <p className="text-xs text-gray-500">Current Level</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="space-y-4">
            {stats && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="text-2xl font-bold">{stats.totalStudyTime}h</p>
                          <p className="text-xs text-gray-500">Total Study Time</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="text-2xl font-bold">{stats.lessonsCompleted}</p>
                          <p className="text-xs text-gray-500">Lessons Completed</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-purple-500" />
                        <div>
                          <p className="text-2xl font-bold">{stats.quizzesTaken}</p>
                          <p className="text-xs text-gray-500">Quizzes Taken</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-cyan-500" />
                        <div>
                          <p className="text-2xl font-bold">{stats.averageScore}%</p>
                          <p className="text-xs text-gray-500">Average Score</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Skills Radar Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Skill Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {gamification?.skills && (
                      <div className="space-y-3">
                        {Object.entries(gamification.skills).map(([skill, score]) => (
                          <div key={skill}>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="capitalize">{skill}</span>
                              <span className="font-medium">{score}%</span>
                            </div>
                            <Progress value={score} className="h-1.5" />
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive updates about your progress</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Study Reminders</p>
                    <p className="text-sm text-gray-500">Daily reminders to maintain your streak</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">AI Tutor Voice</p>
                    <p className="text-sm text-gray-500">Change voice and accent preferences</p>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Privacy Settings</p>
                    <p className="text-sm text-gray-500">Manage your data and privacy</p>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-red-600">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-red-600 hover:bg-red-50">
                  Reset All Progress
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 hover:bg-red-50">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
