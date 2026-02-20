/**
 * Personality Selector Component
 * 
 * Allows user to choose AI avatar personality
 */

'use client'

import { useState } from 'react'
import { Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { AVATAR_PERSONALITIES, type AvatarPersonality } from '@/lib/gamification/service'

interface PersonalitySelectorProps {
  currentPersonality: AvatarPersonality
  onSelect: (personality: AvatarPersonality) => void
  className?: string
}

export function PersonalitySelector({
  currentPersonality,
  onSelect,
  className,
}: PersonalitySelectorProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(currentPersonality)

  const handleSelect = (personality: AvatarPersonality) => {
    setSelected(personality)
    onSelect(personality)
    setOpen(false)
  }

  const current = AVATAR_PERSONALITIES[currentPersonality]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn('gap-2', className)}
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">{current.name}</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Choose Your AI Tutor Personality
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {(Object.keys(AVATAR_PERSONALITIES) as AvatarPersonality[]).map((key) => {
            const p = AVATAR_PERSONALITIES[key]
            const isSelected = selected === key

            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={cn(
                  'w-full p-4 rounded-xl border-2 text-left transition-all',
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5',
                    isSelected
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  )}>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-800">{p.name}</h4>
                      {isSelected && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1">
                      {p.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge text={p.tone} />
                      <Badge text={`${Math.round(p.socraticBalance * 100)}% Socratic`} />
                      {p.usesEmojis && <Badge text="Uses emojis" />}
                    </div>

                    {/* Example quote */}
                    <p className="text-xs text-gray-500 mt-2 italic">
                      "{p.examplePhrases.greeting}"
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Badge({ text }: { text: string }) {
  return (
    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
      {text}
    </span>
  )
}
