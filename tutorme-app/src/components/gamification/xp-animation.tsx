/**
 * XP Animation Component
 * 
 * Shows animated XP gain popup
 */

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Star, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface XpAnimationProps {
  amount: number
  reason?: string
  onComplete?: () => void
  className?: string
}

export function XpAnimation({
  amount,
  reason,
  onComplete,
  className,
}: XpAnimationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.8 }}
        className={cn(
          'fixed z-50 pointer-events-none',
          'flex flex-col items-center',
          className
        )}
        style={{
          left: '50%',
          top: '30%',
          transform: 'translateX(-50%)',
        }}
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: 2,
          }}
          className="relative"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-50" />
          
          {/* Main badge */}
          <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-2xl font-bold">+{amount}</span>
            <span className="text-sm font-medium opacity-90">XP</span>
          </div>

          {/* Floating stars */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (i - 1) * 40],
                y: [0, -30 - i * 10],
              }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: 1,
              }}
              className="absolute top-1/2 left-1/2"
            >
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </motion.div>
          ))}
        </motion.div>

        {reason && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-2 text-sm font-medium text-gray-700 bg-white/80 px-3 py-1 rounded-full shadow-sm"
          >
            {reason}
          </motion.p>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * Level Up Animation
 */
interface LevelUpAnimationProps {
  level: number
  onComplete?: () => void
}

export function LevelUpAnimation({ level, onComplete }: LevelUpAnimationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', damping: 15 }}
          className="text-center"
        >
          {/* Level badge */}
          <motion.div
            animate={{ 
              rotate: [0, -5, 5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 0.5, repeat: 2 }}
            className="relative inline-block"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-2xl">
              <div className="text-white text-center">
                <p className="text-sm font-medium opacity-80">LEVEL</p>
                <p className="text-5xl font-bold">{level}</p>
              </div>
            </div>
            
            {/* Orbiting sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.1,
                }}
                className="absolute top-1/2 left-1/2"
                style={{
                  transformOrigin: '0 0',
                }}
              >
                <div
                  style={{
                    transform: `translateX(${60}px)`,
                  }}
                >
                  <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white mt-6"
          >
            Level Up!
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/80 mt-2"
          >
            You've reached Level {level}!
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6"
          >
            <button
              onClick={() => setIsVisible(false)}
              className="px-6 py-2 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
