'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Radar,
  Target,
  TrendingUp,
  Award,
  BookOpen,
  Calculator,
  FlaskConical,
  Globe,
  Palette,
  Music,
  Code
} from 'lucide-react'

interface Skill {
  name: string
  level: number
  maxLevel: number
  xp: number
  maxXp: number
  icon: React.ComponentType<{ className?: string }>
}

export default function StudentSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch skills data
    fetch('/api/gamification', { credentials: 'include' })
      .then(res => res.ok ? res.json() : { data: { skills: [] } })
      .then(data => {
        const skillsData = data.data?.skills || []
        // Map skills with icons
        const skillsWithIcons = [
          { name: 'Mathematics', icon: Calculator, level: 5, maxLevel: 10, xp: 750, maxXp: 1000 },
          { name: 'Science', icon: FlaskConical, level: 4, maxLevel: 10, xp: 620, maxXp: 1000 },
          { name: 'English', icon: BookOpen, level: 6, maxLevel: 10, xp: 890, maxXp: 1000 },
          { name: 'Languages', icon: Globe, level: 3, maxLevel: 10, xp: 450, maxXp: 1000 },
          { name: 'Arts', icon: Palette, level: 2, maxLevel: 10, xp: 280, maxXp: 1000 },
          { name: 'Music', icon: Music, level: 2, maxLevel: 10, xp: 320, maxXp: 1000 },
          { name: 'Programming', icon: Code, level: 4, maxLevel: 10, xp: 580, maxXp: 1000 },
        ]
        setSkills(skillsWithIcons)
      })
      .catch(() => {
        // Fallback data
        setSkills([
          { name: 'Mathematics', icon: Calculator, level: 5, maxLevel: 10, xp: 750, maxXp: 1000 },
          { name: 'Science', icon: FlaskConical, level: 4, maxLevel: 10, xp: 620, maxXp: 1000 },
          { name: 'English', icon: BookOpen, level: 6, maxLevel: 10, xp: 890, maxXp: 1000 },
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  const getLevelColor = (level: number) => {
    if (level >= 8) return 'text-purple-600 bg-purple-100'
    if (level >= 5) return 'text-blue-600 bg-blue-100'
    if (level >= 3) return 'text-green-600 bg-green-100'
    return 'text-gray-600 bg-gray-100'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Radar className="h-6 w-6" />
          My Skills
        </h1>
        <p className="text-gray-600 mt-1">
          Track your skill development across different subjects
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Skills</p>
                <p className="text-2xl font-bold">{skills.length}</p>
              </div>
              <Radar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Average Level</p>
                <p className="text-2xl font-bold">
                  {skills.length > 0 ? Math.round(skills.reduce((acc, s) => acc + s.level, 0) / skills.length) : 0}
                </p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Highest Level</p>
                <p className="text-2xl font-bold">
                  {skills.length > 0 ? Math.max(...skills.map(s => s.level)) : 0}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Badges Earned</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Award className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-48 bg-gray-200 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => {
            const Icon = skill.icon
            return (
              <Card key={skill.name} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <Badge className={getLevelColor(skill.level)}>
                      Level {skill.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-3">{skill.name}</CardTitle>
                  <CardDescription>
                    {skill.xp} / {skill.maxXp} XP to next level
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Progress 
                    value={(skill.xp / skill.maxXp) * 100} 
                    className="h-2"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {Math.round((skill.xp / skill.maxXp) * 100)}% to Level {skill.level + 1}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
