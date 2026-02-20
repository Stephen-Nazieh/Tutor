'use client'

/**
 * Topic Mastery Chart
 * Bar chart showing mastery level per topic
 */

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TopicMasteryChartProps {
  data: {
    topic: string
    mastery: number // 0-100
    target?: number // target mastery level
  }[]
  title?: string
  showTarget?: boolean
}

export function TopicMasteryChart({ 
  data, 
  title = '知识点掌握情况',
  showTarget = true
}: TopicMasteryChartProps) {
  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return '#22c55e' // green - mastered
    if (mastery >= 60) return '#eab308' // yellow - developing
    return '#ef4444' // red - needs work
  }

  const getMasteryLabel = (mastery: number) => {
    if (mastery >= 80) return '已掌握'
    if (mastery >= 60) return '学习中'
    return '需加强'
  }

  const masteredCount = data.filter(d => d.mastery >= 80).length
  const totalCount = data.length

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          已掌握: <span className="font-semibold text-green-500">{masteredCount}</span> / {totalCount} 知识点
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              layout="vertical"
              margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                type="number" 
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis 
                type="category" 
                dataKey="topic"
                tick={{ fontSize: 11 }}
                width={75}
                axisLine={false}
              />
              <Tooltip 
                formatter={(value, name, props) => {
                  const mastery = Number(value)
                  const label = getMasteryLabel(mastery)
                  return [`${mastery.toFixed(1)}% - ${label}`, '掌握度']
                }}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                }}
              />
              {showTarget && (
                <ReferenceLine 
                  x={80} 
                  stroke="#22c55e" 
                  strokeDasharray="3 3"
                  label={{ value: '掌握目标', position: 'top' }}
                />
              )}
              <Bar dataKey="mastery" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getMasteryColor(entry.mastery)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-500" />
            <span>已掌握 (≥80%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-yellow-500" />
            <span>学习中 (60-79%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-red-500" />
            <span>需加强 (&lt;60%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
