/**
 * PollTemplates
 * Component for selecting from pre-defined poll templates
 */

'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { POLL_TEMPLATES, getTemplateById } from './utils/pollTemplates'
import { HelpCircle, Gauge, List, Play, Brain, Cloud, MessageSquare, Clock } from 'lucide-react'

interface PollTemplatesProps {
  selectedId?: string
  onSelect: (templateId: string) => void
  className?: string
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  HelpCircle,
  Gauge,
  List,
  Play,
  Brain,
  Cloud,
  MessageSquare,
  Clock,
}

export function PollTemplates({ selectedId, onSelect, className }: PollTemplatesProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-3', className)}>
      {POLL_TEMPLATES.map(template => {
        const Icon = ICON_MAP[template.icon] || HelpCircle
        const isSelected = selectedId === template.id

        return (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={cn(
              'rounded-lg border p-4 text-left transition-all hover:border-blue-500 hover:bg-blue-50',
              isSelected && 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  'rounded-lg p-2',
                  isSelected ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h5 className="text-sm font-medium text-gray-900">{template.name}</h5>
                <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">{template.description}</p>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400">{template.type.replace('_', ' ')}</div>
          </button>
        )
      })}
    </div>
  )
}

export { getTemplateById, POLL_TEMPLATES }
