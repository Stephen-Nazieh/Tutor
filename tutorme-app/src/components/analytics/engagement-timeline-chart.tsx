'use client'

/**
 * Engagement Timeline Chart
 * Shows participation and engagement over time
 */

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface EngagementTimelineChartProps {
  data: {
    time: string
    messages: number
    interactions: number
    handRaises: number
  }[]
  title?: string
}

export function EngagementTimelineChart({ 
  data, 
  title = '课堂参与度时间线'
}: EngagementTimelineChartProps) {
  const totalMessages = data.reduce((sum, d) => sum + d.messages, 0)
  const totalInteractions = data.reduce((sum, d) => sum + d.interactions, 0)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>消息: <strong className="text-blue-500">{totalMessages}</strong></span>
          <span>互动: <strong className="text-green-500">{totalInteractions}</strong></span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorInteractions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 11 }}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                }}
              />
              <Area 
                type="monotone" 
                dataKey="messages" 
                name="消息数"
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorMessages)" 
              />
              <Area 
                type="monotone" 
                dataKey="interactions" 
                name="互动数"
                stroke="#22c55e" 
                fillOpacity={1} 
                fill="url(#colorInteractions)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-blue-500" />
            <span>消息发送</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-500" />
            <span>课堂互动</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
