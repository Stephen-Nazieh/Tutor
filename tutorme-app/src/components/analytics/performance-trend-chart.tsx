'use client'

/**
 * Performance Trend Chart
 * Line chart showing score trends over time
 */

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface PerformanceTrendChartProps {
  data: {
    date: string
    score: number
    classAverage?: number
  }[]
  title?: string
  showClassAverage?: boolean
  studentName?: string
}

export function PerformanceTrendChart({ 
  data, 
  title = '成绩趋势',
  showClassAverage = false,
  studentName
}: PerformanceTrendChartProps) {
  const average = data.length > 0 
    ? data.reduce((sum, d) => sum + d.score, 0) / data.length 
    : 0

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {studentName && (
          <p className="text-sm text-muted-foreground">{studentName}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                axisLine={false}
              />
              <YAxis 
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value, name) => {
                  const label = name === 'score' ? '成绩' : '班级平均'
                  return [`${Number(value).toFixed(1)}%`, label]
                }}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                }}
              />
              <ReferenceLine 
                y={average} 
                stroke="#888" 
                strokeDasharray="3 3" 
                label={{ value: `平均: ${average.toFixed(1)}%`, position: 'right' }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                name="score"
              />
              {showClassAverage && (
                <Line 
                  type="monotone" 
                  dataKey="classAverage" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="classAverage"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>{studentName || '学生成绩'}</span>
          </div>
          {showClassAverage && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>班级平均</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
