'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
  Activity,
  BookOpen,
  Award
} from 'lucide-react'

interface ModernHeroSectionProps {
  stats?: {
    totalClasses: number
    totalStudents: number
    upcomingClasses: number
    earnings: number
    currency: string
  }
  loading?: boolean
  onScheduleClass?: () => void
  onCreateCourse?: () => void
}

export function ModernHeroSection({ stats, loading, onScheduleClass, onCreateCourse }: ModernHeroSectionProps) {
  const [greeting, setGreeting] = useState('Good morning')
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')

    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric' 
    })
  }

  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/10 rounded w-1/3" />
          <div className="h-4 bg-white/10 rounded w-1/4" />
          <div className="grid grid-cols-4 gap-4 mt-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-white/10 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-purple-300 text-sm font-medium">
                {greeting}, Tutor
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome Back!
            </h1>
            <p className="text-slate-400">
              {formatDate(currentTime)} • {formatTime(currentTime)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
              <Activity className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={BookOpen}
            label="Total Classes"
            value={stats?.totalClasses || 0}
            trend="+12%"
            trendUp
            color="from-blue-500 to-cyan-500"
          />
          <StatCard 
            icon={Users}
            label="Active Students"
            value={stats?.totalStudents || 0}
            trend="+8%"
            trendUp
            color="from-purple-500 to-pink-500"
          />
          <StatCard 
            icon={Calendar}
            label="Upcoming"
            value={stats?.upcomingClasses || 0}
            sublabel="This week"
            color="from-orange-500 to-red-500"
          />
          <StatCard 
            icon={DollarSign}
            label="Earnings"
            value={`${stats?.currency || 'SGD'} ${(stats?.earnings || 0).toLocaleString()}`}
            trend="+23%"
            trendUp
            color="from-green-500 to-emerald-500"
          />
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center gap-4">
          <Button 
            className="bg-white text-slate-900 hover:bg-white/90 font-medium shadow-lg"
            onClick={onScheduleClass}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Class
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button 
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 font-medium shadow-lg border-0"
            onClick={onCreateCourse}
          >
            <Award className="w-4 h-4 mr-2" />
            Create Course
          </Button>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Clock className="w-4 h-4" />
            <span>Next class in 2h 15m</span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: string | number
  sublabel?: string
  trend?: string
  trendUp?: boolean
  color: string
}

function StatCard({ icon: Icon, label, value, sublabel, trend, trendUp, color }: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 hover:bg-white/10 transition-all cursor-pointer">
      <div className={cn("absolute top-0 right-0 w-20 h-20 bg-gradient-to-br opacity-20 rounded-bl-full", color)} />
      <div className="relative">
        <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3", color)}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <p className="text-slate-400 text-xs font-medium mb-1">{label}</p>
        <div className="flex items-end justify-between">
          <p className="text-2xl font-bold text-white">{value}</p>
          {sublabel && (
            <p className="text-slate-400 text-xs">{sublabel}</p>
          )}
          {trend && (
            <div className={cn(
              "flex items-center text-xs font-medium",
              trendUp ? "text-green-400" : "text-red-400"
            )}>
              <TrendingUp className={cn("w-3 h-3 mr-0.5", !trendUp && "rotate-180")} />
              {trend}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
