import { routing } from '@/i18n/routing'

export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  const locale = segments[0]
  if (locale && routing.locales.includes(locale as (typeof routing.locales)[number])) {
    if (segments.length === 1) return '/'
    return `/${segments.slice(1).join('/')}`
  }
  return pathname
}
