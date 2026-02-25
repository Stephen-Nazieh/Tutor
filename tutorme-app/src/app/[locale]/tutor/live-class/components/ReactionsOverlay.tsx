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
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-gray-800 rounded-full px-4 py-2 shadow-2xl border border-gray-700 flex items-center gap-2">
        {reactions.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onSelect(emoji)}
            className="text-2xl hover:scale-150 transition-transform duration-200 p-1"
          >
            {emoji}
          </button>
        ))}
        <div className="w-px h-6 bg-gray-600 mx-1" />
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
