'use client'

/**
 * Score Distribution Chart
 * Histogram showing class score distribution
 */

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ScoreDistributionChartProps {
  data: {
    range: string
    count: number
  }[]
  title?: string
  classAverage?: number
}

export function ScoreDistributionChart({ 
  data, 
  title = '分数分布',
  classAverage 
}: ScoreDistributionChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {classAverage && (
          <p className="text-sm text-muted-foreground">
            班级平均分: <span className="font-semibold text-primary">{classAverage.toFixed(1)}%</span>
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="range" 
                tick={{ fontSize: 12 }}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip 
                formatter={(value) => [`${value} 人`, '人数']}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => {
                  const colors = [
                    '#ef4444', // red for 0-59
                    '#f97316', // orange for 60-69
                    '#eab308', // yellow for 70-79
                    '#22c55e', // green for 80-89
                    '#10b981', // emerald for 90-100
                  ]
                  return <Cell key={`cell-${index}`} fill={colors[index] || '#3b82f6'} />
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-red-500" />
            <span>不及格</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-orange-500" />
            <span>及格</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-yellow-500" />
            <span>良好</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-500" />
            <span>优秀</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
