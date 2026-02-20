'use client'

/**
 * Skills Radar Chart
 * Multi-dimensional skills visualization
 */

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SkillsRadarChartProps {
  data: {
    skill: string
    score: number
    fullMark?: number
  }[]
  title?: string
  subtitle?: string
}

export function SkillsRadarChart({ 
  data, 
  title = '技能雷达图',
  subtitle
}: SkillsRadarChartProps) {
  const average = data.length > 0 
    ? data.reduce((sum, d) => sum + d.score, 0) / data.length 
    : 0

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis 
                dataKey="skill" 
                tick={{ fontSize: 11, fill: '#666' }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 10, fill: '#999' }}
                tickCount={5}
              />
              <Tooltip 
                formatter={(value, name, props) => {
                  const skillName = props?.payload?.skill || ''
                  return [`${Number(value).toFixed(0)}/100`, skillName]
                }}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                }}
              />
              <Radar
                name="技能得分"
                dataKey="score"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="#3b82f6"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center mt-2">
          <p className="text-sm text-muted-foreground">
            综合得分: <span className="font-semibold text-primary">{average.toFixed(1)}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
