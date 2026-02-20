/**
 * Format class scheduled time for display.
 * Uses browser timezone. Returns relative "Starts in X" for near-term classes (within 24 hours).
 */

const MS_MINUTE = 60 * 1000
const MS_HOUR = 60 * MS_MINUTE
const MS_DAY = 24 * MS_HOUR

export interface FormattedClassTime {
  /** Absolute date/time string (e.g. "Jan 20, 3:00 PM") */
  formatted: string
  /** Relative string for near-term only (e.g. "Starts in 2 hours") */
  relative?: string
}

/**
 * Format a scheduled class time. Uses local timezone.
 * For classes starting within 24 hours, also returns a relative string.
 */
export function formatClassTime(scheduledAt: string | Date): FormattedClassTime {
  const date = typeof scheduledAt === 'string' ? new Date(scheduledAt) : scheduledAt
  const now = new Date()
  const formatted = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const ms = date.getTime() - now.getTime()
  if (ms < 0) {
    return { formatted }
  }
  if (ms < MS_HOUR) {
    const minutes = Math.round(ms / MS_MINUTE)
    return { formatted, relative: minutes <= 1 ? 'Starting soon' : `Starts in ${minutes} minutes` }
  }
  if (ms < MS_DAY) {
    const hours = Math.round(ms / MS_HOUR)
    return { formatted, relative: hours === 1 ? 'Starts in 1 hour' : `Starts in ${hours} hours` }
  }
  if (ms < 2 * MS_DAY) {
    return { formatted, relative: `Tomorrow at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}` }
  }
  return { formatted }
}
