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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/student/dashboard')}
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Learning Worlds</h1>
              <p className="text-sm text-gray-500">
                Choose your adventure • Level {userLevel}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Intro */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Where will you learn today?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Each world offers unique missions and challenges to help you master 
            English in different contexts.
          </p>
        </div>

        {/* Worlds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {worlds.map((world) => (
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
        'overflow-hidden transition-all cursor-pointer group',
        isLocked
          ? 'opacity-75 grayscale'
          : 'hover:shadow-lg hover:scale-[1.02]'
      )}
      onClick={onClick}
    >
      {/* Banner */}
      <div className={cn(
        'h-32 flex items-center justify-center relative',
        isLocked ? 'bg-gray-200' : 'bg-gradient-to-br from-blue-500 to-purple-600'
      )}>
        <span className="text-6xl">{world.emoji}</span>
        
        {/* Lock overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            {canUnlock ? (
              <Unlock className="w-8 h-8 text-white" />
            ) : (
              <Lock className="w-8 h-8 text-white" />
            )}
          </div>
        )}
      </div>

      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg text-gray-800">{world.name}</h3>
          {world.progress > 0 && !isLocked && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              {world.progress}%
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {world.description}
        </p>

        {/* Story arc preview */}
        <p className="text-xs text-gray-500 italic mb-4 line-clamp-2">
          "{world.storyArc}"
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t">
          {isLocked ? (
            <span className="text-sm text-gray-500">
              Level {world.unlockLevel} required
            </span>
          ) : (
            <div className="flex items-center gap-1 text-sm text-blue-600">
              <BookOpen className="w-4 h-4" />
              <span>Enter World</span>
            </div>
          )}

          <span className={cn(
            'text-xs px-2 py-1 rounded-full',
            world.difficultyLevel === 1 && 'bg-green-100 text-green-700',
            world.difficultyLevel === 2 && 'bg-yellow-100 text-yellow-700',
            world.difficultyLevel === 3 && 'bg-orange-100 text-orange-700',
            world.difficultyLevel === 4 && 'bg-red-100 text-red-700'
          )}>
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
