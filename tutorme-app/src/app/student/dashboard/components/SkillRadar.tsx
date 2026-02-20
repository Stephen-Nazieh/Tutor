'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain } from 'lucide-react'

interface Skill {
  name: string
  score: number
}

interface SkillRadarProps {
  skills: Record<string, number> | null
}

export function SkillRadar({ skills }: SkillRadarProps) {
  const skillList: Skill[] = skills
    ? Object.entries(skills).map(([name, score]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        score
      }))
    : []

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          Skills
        </CardTitle>
      </CardHeader>
      <CardContent>
        {skillList.length === 0 ? (
          <div className="py-6 text-center text-gray-500">
            <Brain className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p className="text-sm font-medium text-gray-700">Skills will appear as you learn</p>
            <p className="text-xs mt-1">Complete lessons and quizzes to build your skill profile.</p>
          </div>
        ) : (
        <div className="space-y-3">
          {skillList.slice(0, 6).map(skill => (
            <div key={skill.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{skill.name}</span>
                <span className="font-medium">{skill.score}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                  style={{ width: `${skill.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        )}
      </CardContent>
    </Card>
  )
}
