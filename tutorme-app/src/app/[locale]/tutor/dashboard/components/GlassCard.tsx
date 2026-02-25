'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  title?: string
  icon?: React.ComponentType<{ className?: string }>
  className?: string
  headerClassName?: string
  gradient?: 'purple' | 'blue' | 'green' | 'orange' | 'pink' | 'none'
  badge?: string | number
  action?: ReactNode
}

export function GlassCard({ 
  children, 
  title, 
  icon: Icon, 
  className,
  headerClassName,
  gradient = 'none',
  badge,
  action
}: GlassCardProps) {
  const gradientStyles = {
    purple: 'from-purple-500/10 to-pink-500/10 border-purple-200/50',
    blue: 'from-blue-500/10 to-cyan-500/10 border-blue-200/50',
    green: 'from-green-500/10 to-emerald-500/10 border-green-200/50',
    orange: 'from-orange-500/10 to-amber-500/10 border-orange-200/50',
    pink: 'from-pink-500/10 to-rose-500/10 border-pink-200/50',
    none: 'border-gray-200'
  }

  return (
    <Card className={cn(
      "overflow-hidden bg-white/80 backdrop-blur-xl border",
      gradient !== 'none' && `bg-gradient-to-br ${gradientStyles[gradient]}`,
      className
    )}>
      {title && (
        <CardHeader className={cn("pb-3", headerClassName)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {Icon && (
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  gradient === 'purple' ? "bg-purple-100 text-purple-600" :
                  gradient === 'blue' ? "bg-blue-100 text-blue-600" :
                  gradient === 'green' ? "bg-green-100 text-green-600" :
                  gradient === 'orange' ? "bg-orange-100 text-orange-600" :
                  gradient === 'pink' ? "bg-pink-100 text-pink-600" :
                  "bg-gray-100 text-gray-600"
                )}>
                  <Icon className="w-4 h-4" />
                </div>
              )}
              <CardTitle className="text-base font-semibold">{title}</CardTitle>
              {badge !== undefined && (
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-medium",
                  gradient === 'purple' ? "bg-purple-100 text-purple-700" :
                  gradient === 'blue' ? "bg-blue-100 text-blue-700" :
                  gradient === 'green' ? "bg-green-100 text-green-700" :
                  gradient === 'orange' ? "bg-orange-100 text-orange-700" :
                  gradient === 'pink' ? "bg-pink-100 text-pink-700" :
                  "bg-gray-100 text-gray-700"
                )}>
                  {badge}
                </span>
              )}
            </div>
            {action && <div>{action}</div>}
          </div>
        </CardHeader>
      )}
      <CardContent className={cn("pt-0", !title && "pt-6")}>
        {children}
      </CardContent>
    </Card>
  )
}
