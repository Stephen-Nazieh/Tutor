/**
 * Achievement Unlock Animation
 * 
 * Celebratory animation when user unlocks an achievement
 */

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, Star, Trophy, Medal, Sparkles, X, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  xpBonus: number
}

interface AchievementUnlockProps {
  achievement: Achievement
  onClose?: () => void
  autoClose?: boolean
  autoCloseDelay?: number
}

const rarityConfig = {
  common: {
    color: 'from-gray-400 to-gray-500',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
    particleColor: '#9CA3AF',
  },
  rare: {
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    particleColor: '#3B82F6',
  },
  epic: {
    color: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    particleColor: '#8B5CF6',
  },
  legendary: {
    color: 'from-amber-400 via-yellow-500 to-amber-600',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    particleColor: '#F59E0B',
  },
}

export function AchievementUnlock({
  achievement,
  onClose,
  autoClose = true,
  autoCloseDelay = 5000,
}: AchievementUnlockProps) {
  const [isVisible, setIsVisible] = useState(true)
  const config = rarityConfig[achievement.rarity]

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, autoCloseDelay)
      return () => clearTimeout(timer)
    }
  }, [autoClose, autoCloseDelay, onClose])

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      >
        {/* Confetti particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              x: (Math.random() - 0.5) * 600,
              y: (Math.random() - 0.5) * 600,
              scale: Math.random() * 1.5 + 0.5,
              rotate: Math.random() * 720,
            }}
            transition={{
              duration: 1 + Math.random(),
              ease: 'easeOut',
            }}
            className="absolute w-3 h-3 rounded-full"
            style={{
              backgroundColor: config.particleColor,
              left: '50%',
              top: '50%',
            }}
          />
        ))}

        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="relative max-w-md w-full mx-4"
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute -top-4 -right-4 z-10 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Card */}
          <div className={cn(
            'rounded-2xl overflow-hidden shadow-2xl',
            config.bgColor
          )}>
            {/* Header with gradient */}
            <div className={cn(
              'bg-gradient-to-r p-8 text-center relative overflow-hidden',
              config.color
            )}>
              {/* Animated sparkles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  className="absolute"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${20 + (i % 2) * 40}%`,
                  }}
                >
                  <Sparkles className="w-6 h-6 text-white/60" />
                </motion.div>
              ))}

              {/* Achievement icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 10, delay: 0.2 }}
                className="relative z-10"
              >
                <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-5xl">{achievement.icon}</span>
                </div>
              </motion.div>

              {/* Rarity badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <span className={cn(
                  'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white'
                )}>
                  {achievement.rarity}
                </span>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6 text-center">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={cn('text-2xl font-bold mb-2', config.textColor)}
              >
                Achievement Unlocked!
              </motion.h3>

              <motion.h4
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl font-semibold text-gray-800 mb-2"
              >
                {achievement.name}
              </motion.h4>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-gray-600 mb-4"
              >
                {achievement.description}
              </motion.p>

              {/* XP Bonus */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10, delay: 0.8 }}
                className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold"
              >
                <Zap className="w-4 h-4" />
                +{achievement.xpBonus} XP
              </motion.div>

              {/* Share button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6"
              >
                <Button
                  onClick={handleClose}
                  className={cn(
                    'w-full bg-gradient-to-r text-white',
                    config.color
                  )}
                >
                  Awesome!
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Predefined achievement templates
export const ACHIEVEMENT_TEMPLATES: Record<string, Achievement> = {
  first_mission: {
    id: 'first_mission',
    name: 'First Steps',
    description: 'Complete your first mission',
    icon: '🎯',
    rarity: 'common',
    xpBonus: 50,
  },
  streak_7: {
    id: 'streak_7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    rarity: 'rare',
    xpBonus: 100,
  },
  streak_30: {
    id: 'streak_30',
    name: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    icon: '📅',
    rarity: 'epic',
    xpBonus: 300,
  },
  level_10: {
    id: 'level_10',
    name: 'Rising Star',
    description: 'Reach level 10',
    icon: '⭐',
    rarity: 'rare',
    xpBonus: 200,
  },
  level_20: {
    id: 'level_20',
    name: 'Expert Learner',
    description: 'Reach level 20',
    icon: '🏆',
    rarity: 'epic',
    xpBonus: 500,
  },
  pronunciation_pro: {
    id: 'pronunciation_pro',
    name: 'Pronunciation Pro',
    description: 'Score 90+ on pronunciation analysis',
    icon: '🎤',
    rarity: 'epic',
    xpBonus: 150,
  },
  confidence_champion: {
    id: 'confidence_champion',
    name: 'Confidence Champion',
    description: 'Reach 90% confidence score',
    icon: '💪',
    rarity: 'legendary',
    xpBonus: 500,
  },
  world_explorer: {
    id: 'world_explorer',
    name: 'World Explorer',
    description: 'Unlock all 7 learning worlds',
    icon: '🌍',
    rarity: 'legendary',
    xpBonus: 1000,
  },
}
