/**
 * Skill Radar Chart Component
 *
 * Displays user's skill scores in a radar/pentagon chart
 */

'use client'

import { cn } from '@/lib/utils'

interface SkillRadarProps {
  skills:
    | Record<string, number>
    | {
        grammar: number
        vocabulary: number
        speaking: number
        listening: number
        confidence: number
        fluency: number
      }
  className?: string
}

const skillColors: Record<string, string> = {
  // English skills
  grammar: 'bg-green-500',
  vocabulary: 'bg-yellow-500',
  speaking: 'bg-blue-500',
  listening: 'bg-pink-500',
  confidence: 'bg-purple-500',
  fluency: 'bg-orange-500',
  writing: 'bg-cyan-500',
  reading: 'bg-indigo-500',
  // Math skills
  algebra: 'bg-purple-500',
  geometry: 'bg-blue-500',
  calculus: 'bg-red-500',
  statistics: 'bg-green-500',
  probability: 'bg-yellow-500',
  'problem-solving': 'bg-orange-500',
  // Physics skills
  mechanics: 'bg-indigo-500',
  thermodynamics: 'bg-red-500',
  electricity: 'bg-yellow-500',
  waves: 'bg-cyan-500',
  quantum: 'bg-purple-500',
  optics: 'bg-blue-500',
  // Chemistry skills
  organic: 'bg-green-500',
  inorganic: 'bg-blue-500',
  physical: 'bg-red-500',
  analytical: 'bg-yellow-500',
  biochemistry: 'bg-purple-500',
  // Biology skills
  'cell-biology': 'bg-green-500',
  genetics: 'bg-purple-500',
  ecology: 'bg-emerald-500',
  anatomy: 'bg-red-500',
  evolution: 'bg-blue-500',
  // History skills
  ancient: 'bg-amber-600',
  medieval: 'bg-stone-500',
  modern: 'bg-blue-600',
  'world-wars': 'bg-red-600',
  civilizations: 'bg-yellow-600',
  // CS skills
  programming: 'bg-blue-600',
  algorithms: 'bg-purple-600',
  'data-structures': 'bg-green-600',
  databases: 'bg-yellow-600',
  'web-dev': 'bg-cyan-600',
}

const defaultColors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-yellow-500',
  'bg-pink-500',
  'bg-orange-500',
  'bg-cyan-500',
  'bg-indigo-500',
  'bg-red-500',
  'bg-emerald-500',
]

export function SkillRadar({ skills, className }: SkillRadarProps) {
  const skillEntries = Object.entries(skills)

  // Calculate average
  const avgSkill =
    skillEntries.length > 0
      ? Math.round(skillEntries.reduce((sum, [, value]) => sum + value, 0) / skillEntries.length)
      : 0

  // Find strongest and weakest
  const sortedSkills = [...skillEntries].sort((a, b) => b[1] - a[1])
  const strongest = sortedSkills[0]
  const weakest = sortedSkills[sortedSkills.length - 1]

  const getSkillColor = (skillName: string, index: number) => {
    return skillColors[skillName.toLowerCase()] || defaultColors[index % defaultColors.length]
  }

  const formatLabel = (label: string) => {
    return label.replace(/-/g, ' ').replace(/_/g, ' ')
  }

  return (
    <div className={cn('rounded-xl border bg-white p-4', className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Skills</h3>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">{avgSkill}%</p>
          <p className="text-xs text-gray-500">Average</p>
        </div>
      </div>

      {/* Skill bars */}
      <div className="space-y-3">
        {skillEntries.map(([name, value], index) => (
          <SkillBar
            key={name}
            label={formatLabel(name)}
            value={value}
            color={getSkillColor(name, index)}
          />
        ))}
      </div>

      {/* Insights */}
      {strongest && weakest && (
        <div className="mt-4 border-t pt-3 text-sm">
          <p className="text-gray-600">
            <span className="font-medium text-green-600">💪 Strongest:</span>{' '}
            {formatLabel(strongest[0])} ({strongest[1]}%)
          </p>
          <p className="mt-1 text-gray-600">
            <span className="font-medium text-orange-600">🎯 Focus on:</span>{' '}
            {formatLabel(weakest[0])} ({weakest[1]}%)
          </p>
        </div>
      )}
    </div>
  )
}

function SkillBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="capitalize text-gray-600">{label}</span>
        <span className="font-medium text-gray-800">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className={cn('h-full rounded-full transition-all duration-500', color)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
