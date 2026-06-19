import { ALL_COUNTRIES } from '@/lib/data/tutor-categories'

export const COUNTRY_NAME_TO_CODE: Record<string, string> = {}
export const COUNTRY_CODE_TO_NAME: Record<string, string> = {}

function register(code: string, name: string) {
  const normalizedCode = code.trim().toLowerCase()
  const normalizedName = name.trim().toLowerCase()
  COUNTRY_NAME_TO_CODE[normalizedName] = normalizedCode
  if (!COUNTRY_CODE_TO_NAME[normalizedCode]) {
    COUNTRY_CODE_TO_NAME[normalizedCode] = name.trim()
  }
}

ALL_COUNTRIES.forEach(country => {
  register(country.code, country.name)
})

// Common aliases / alternate spellings used in the app or data
register('GB', 'UK')
register('GB', 'Great Britain')
register('GB', 'Britain')
register('US', 'USA')
register('US', 'United States of America')
register('US', 'America')
register('KR', 'South Korea')
register('KR', 'Republic of Korea')
register('HK', 'Hong Kong SAR')
register('HK', 'HK')
register('TW', 'Taiwan')
register('TW', 'Republic of China')
register('AE', 'UAE')
register('AE', 'Emirates')
register('CZ', 'Czechia')
register('MK', 'Macedonia')

/**
 * Resolve a country display name to a lowercase ISO-3166-style code.
 * Returns 'gl' for "Global" and null for unrecognized / empty input.
 */
export function getCountryCode(name?: string | null): string | null {
  if (!name) return null
  const normalized = name.trim().toLowerCase()
  if (normalized === 'global') return 'gl'
  if (normalized === '--' || normalized === 'not specified' || normalized === 'n/a') return null
  return COUNTRY_NAME_TO_CODE[normalized] || null
}

/**
 * Resolve a lowercase country code back to its display name.
 */
export function getCountryName(code?: string | null): string | null {
  if (!code) return null
  const normalized = code.trim().toLowerCase()
  if (normalized === 'gl') return 'Global'
  return COUNTRY_CODE_TO_NAME[normalized] || null
}

/**
 * Return the public URL for a country's flag SVG.
 * Returns null for Global or unrecognized inputs.
 */
export function getFlagUrl(nameOrCode?: string | null): string | null {
  if (!nameOrCode) return null
  const normalizedInput = nameOrCode.trim().toLowerCase()
  if (normalizedInput === 'global') return null
  const code = getCountryCode(nameOrCode) || normalizedInput
  if (!code || code === 'gl') return null
  return `/flags/${code}.svg`
}
