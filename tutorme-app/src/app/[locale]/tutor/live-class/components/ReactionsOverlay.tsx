'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ReactionsOverlayProps {
  reactions: string[]
  onSelect: (emoji: string) => void
  onClose: () => void
}

export function ReactionsOverlay({ reactions, onSelect, onClose }: ReactionsOverlayProps) {
  return (
    <div className="absolute bottom-20 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800 px-4 py-2 shadow-2xl">
        {reactions.map(emoji => (
          <button
            key={emoji}
            onClick={() => onSelect(emoji)}
            className="p-1 text-2xl transition-transform duration-200 hover:scale-150"
          >
            {emoji}
          </button>
        ))}
        <div className="mx-1 h-6 w-px bg-gray-600" />
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  )
}
