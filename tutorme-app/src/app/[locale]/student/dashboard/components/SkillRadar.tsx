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
        score,
      }))
    : []

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Brain className="h-5 w-5 text-purple-500" />
          Skills
        </CardTitle>
      </CardHeader>
      <CardContent>
        {skillList.length === 0 ? (
          <div className="py-6 text-center text-gray-500">
            <Brain className="mx-auto mb-2 h-12 w-12 text-gray-300" />
            <p className="text-sm font-medium text-gray-700">Skills will appear as you learn</p>
            <p className="mt-1 text-xs">
              Complete lessons and quizzes to build your skill profile.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {skillList.slice(0, 6).map(skill => (
              <div key={skill.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-gray-600">{skill.name}</span>
                  <span className="font-medium">{skill.score}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
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
