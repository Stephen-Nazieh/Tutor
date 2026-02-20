/**
 * Format earnings for display using the tutor's preferred currency from settings.
 */

const CURRENCY_SYMBOLS: Record<string, string> = {
  SGD: 'S$',
  USD: '$',
  EUR: '€',
  GBP: '£',
  CNY: '¥',
  JPY: '¥',
}

/**
 * Format an amount in the given currency code.
 * Uses symbol when known, otherwise "CODE amount" (e.g. "123 AUD").
 */
export function formatEarnings(amount: number, currencyCode: string): string {
  const code = (currencyCode || 'SGD').toUpperCase()
  const symbol = CURRENCY_SYMBOLS[code]
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
  if (symbol) return `${symbol}${formatted}`
  return `${formatted} ${code}`
}
