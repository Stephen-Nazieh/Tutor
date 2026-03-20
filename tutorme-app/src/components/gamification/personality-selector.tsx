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
import { AVATAR_PERSONALITIES, type AvatarPersonality } from '@/lib/gamification/constants'

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
        <Button variant="outline" size="sm" className={cn('gap-2', className)}>
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline">{current.name}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Choose Your AI Tutor Personality
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          {(Object.keys(AVATAR_PERSONALITIES) as AvatarPersonality[]).map(key => {
            const p = AVATAR_PERSONALITIES[key]
            const isSelected = selected === key

            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={cn(
                  'w-full rounded-xl border-2 p-4 text-left transition-all',
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      'mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2',
                      isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                    )}
                  >
                    {isSelected && <Check className="h-4 w-4 text-white" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-800">{p.name}</h4>
                      {isSelected && (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                          Active
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-gray-600">{p.description}</p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge text={p.tone} />
                      <Badge text={`${Math.round(p.socraticBalance * 100)}% Socratic`} />
                      {p.usesEmojis && <Badge text="Uses emojis" />}
                    </div>

                    {/* Example quote */}
                    <p className="mt-2 text-xs italic text-gray-500">
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
  return <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{text}</span>
}
