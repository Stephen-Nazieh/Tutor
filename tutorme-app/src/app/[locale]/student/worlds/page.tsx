/**
 * World Selection Page
 *
 * Browse and select learning worlds
 */

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Unlock, ChevronRight, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'

interface World {
  id: string
  name: string
  emoji: string
  description: string
  storyArc: string
  unlockLevel: number
  difficultyLevel: number
  isUnlocked: boolean
  canAccess: boolean
  progress: number
}

export default function WorldsPage() {
  const router = useRouter()
  const [worlds, setWorlds] = useState<World[]>([])
  const [userLevel, setUserLevel] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWorlds()
  }, [])

  const fetchWorlds = async () => {
    try {
      const response = await fetch('/api/gamification/worlds')
      const data = await response.json()

      if (data.success) {
        setWorlds(data.data)
        // Get user level from first world's context or default
        if (data.data.length > 0) {
          const unlocked = data.data.filter((w: World) => w.isUnlocked)
          if (unlocked.length > 0) {
            setUserLevel(Math.max(...unlocked.map((w: World) => w.unlockLevel)))
          }
        }
      }
    } catch (error) {
      toast.error('Failed to load worlds')
    } finally {
      setLoading(false)
    }
  }

  const handleWorldClick = (world: World) => {
    if (!world.isUnlocked) {
      if (world.canAccess) {
        toast.success(`Unlocking ${world.name}!`)
        // Could trigger unlock API here
      } else {
        toast.info(`Reach Level ${world.unlockLevel} to unlock this world`)
        return
      }
    }
    router.push(`/student/worlds/${world.id}`)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push('/student/dashboard')}>
              <ChevronRight className="h-5 w-5 rotate-180" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Learning Worlds</h1>
              <p className="text-sm text-gray-500">Choose your adventure • Level {userLevel}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Intro */}
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">Where will you learn today?</h2>
          <p className="mx-auto max-w-xl text-gray-600">
            Each world offers unique missions and challenges to help you master English in different
            contexts.
          </p>
        </div>

        {/* Worlds Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {worlds.map(world => (
            <WorldCard
              key={world.id}
              world={world}
              userLevel={userLevel}
              onClick={() => handleWorldClick(world)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

function WorldCard({
  world,
  userLevel,
  onClick,
}: {
  world: World
  userLevel: number
  onClick: () => void
}) {
  const isLocked = !world.isUnlocked
  const canUnlock = userLevel >= world.unlockLevel && isLocked

  return (
    <Card
      className={cn(
        'group cursor-pointer overflow-hidden transition-all',
        isLocked ? 'opacity-75 grayscale' : 'hover:scale-[1.02] hover:shadow-lg'
      )}
      onClick={onClick}
    >
      {/* Banner */}
      <div
        className={cn(
          'relative flex h-32 items-center justify-center',
          isLocked ? 'bg-gray-200' : 'bg-gradient-to-br from-blue-500 to-purple-600'
        )}
      >
        <span className="text-6xl">{world.emoji}</span>

        {/* Lock overlay */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            {canUnlock ? (
              <Unlock className="h-8 w-8 text-white" />
            ) : (
              <Lock className="h-8 w-8 text-white" />
            )}
          </div>
        )}
      </div>

      <CardContent className="p-5">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-lg font-bold text-gray-800">{world.name}</h3>
          {world.progress > 0 && !isLocked && (
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
              {world.progress}%
            </span>
          )}
        </div>

        <p className="mb-3 line-clamp-2 text-sm text-gray-600">{world.description}</p>

        {/* Story arc preview */}
        <p className="mb-4 line-clamp-2 text-xs italic text-gray-500">"{world.storyArc}"</p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t pt-3">
          {isLocked ? (
            <span className="text-sm text-gray-500">Level {world.unlockLevel} required</span>
          ) : (
            <div className="flex items-center gap-1 text-sm text-blue-600">
              <BookOpen className="h-4 w-4" />
              <span>Enter World</span>
            </div>
          )}

          <span
            className={cn(
              'rounded-full px-2 py-1 text-xs',
              world.difficultyLevel === 1 && 'bg-green-100 text-green-700',
              world.difficultyLevel === 2 && 'bg-yellow-100 text-yellow-700',
              world.difficultyLevel === 3 && 'bg-orange-100 text-orange-700',
              world.difficultyLevel === 4 && 'bg-red-100 text-red-700'
            )}
          >
            Difficulty {world.difficultyLevel}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

// Helper for cn function
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
