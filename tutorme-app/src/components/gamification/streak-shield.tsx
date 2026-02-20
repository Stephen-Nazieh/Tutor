/**
 * Streak Shield Component
 * 
 * PRO/ELITE feature to protect streaks
 */

'use client'

import { useState } from 'react'
import { Shield, ShieldCheck, ShieldAlert, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

interface StreakShieldProps {
  streakDays: number
  hasShield: boolean
  shieldUsesRemaining: number
  tier: 'FREE' | 'PRO' | 'ELITE'
  onActivateShield?: () => void
  className?: string
}

export function StreakShield({
  streakDays,
  hasShield,
  shieldUsesRemaining,
  tier,
  onActivateShield,
  className,
}: StreakShieldProps) {
  const [showDialog, setShowDialog] = useState(false)
  const isEligible = tier === 'PRO' || tier === 'ELITE'

  if (!isEligible) {
    return (
      <div className={cn('bg-gray-100 rounded-xl p-4', className)}>
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-gray-400" />
          <div>
            <h4 className="font-medium text-gray-600">Streak Shield</h4>
            <p className="text-xs text-gray-500">
              Upgrade to PRO to protect your streak
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        onClick={() => !hasShield && setShowDialog(true)}
        className={cn(
          'rounded-xl p-4 cursor-pointer transition-all',
          hasShield
            ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
            : 'bg-purple-50 hover:bg-purple-100',
          className
        )}
      >
        <div className="flex items-center gap-3">
          {hasShield ? (
            <ShieldCheck className="w-8 h-8 text-white" />
          ) : (
            <ShieldAlert className="w-8 h-8 text-purple-600" />
          )}
          <div className="flex-1">
            <h4 className={cn('font-medium', hasShield ? 'text-white' : 'text-purple-700')}>
              Streak Shield
            </h4>
            <p className={cn('text-xs', hasShield ? 'text-purple-100' : 'text-purple-600')}>
              {hasShield
                ? `${shieldUsesRemaining} use${shieldUsesRemaining !== 1 ? 's' : ''} remaining`
                : 'Click to activate protection'}
            </p>
          </div>
          {hasShield && (
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
          )}
        </div>

        {hasShield && streakDays > 0 && (
          <div className="mt-3 pt-3 border-t border-white/20">
            <p className="text-sm text-white/90">
              Your {streakDays}-day streak is protected! 🔥
            </p>
          </div>
        )}
      </div>

      {/* Activation Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-500" />
              Activate Streak Shield
            </DialogTitle>
            <DialogDescription>
              Protect your streak from being broken if you miss a day.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-700 mb-2">How it works:</h4>
              <ul className="text-sm text-purple-600 space-y-1">
                <li>• Protects your streak for 24 hours</li>
                <li>• Automatic activation if you miss a day</li>
                <li>• {tier === 'ELITE' ? 'Unlimited' : '3 uses per month'}</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-purple-600 hover:bg-purple-700"
                onClick={() => {
                  onActivateShield?.()
                  setShowDialog(false)
                }}
              >
                Activate Shield
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
