import type { CSSProperties } from 'react'

export interface DashboardThemeTokens {
  background: string
  panel: string
  surface: string
  accent: string
  accentStrong: string
  divider: string
  textPrimary: string
  textSecondary: string
}

export interface DashboardTheme {
  id: string
  name: string
  tokens?: DashboardThemeTokens
}

export const DASHBOARD_THEMES: DashboardTheme[] = [
  {
    id: 'current',
    name: 'Current (Default)',
  },
  {
    id: 'aurora-mist',
    name: 'Aurora Mist',
    tokens: {
      background: '0 0% 93%',
      panel: '0 0% 87%',
      surface: '60 1% 83%',
      accent: '23 25% 81%',
      accentStrong: '25 17% 75%',
      divider: '36 3% 68%',
      textPrimary: '40 5% 24%',
      textSecondary: '37 3% 48%',
    },
  },
  {
    id: 'quartz-wave',
    name: 'Quartz Wave',
    tokens: {
      background: '0 0% 87%',
      panel: '0 0% 93%',
      surface: '25 17% 75%',
      accent: '60 1% 83%',
      accentStrong: '23 25% 81%',
      divider: '36 3% 68%',
      textPrimary: '40 5% 24%',
      textSecondary: '37 3% 48%',
    },
  },
  {
    id: 'chrome-dune',
    name: 'Chrome Dune',
    tokens: {
      background: '60 1% 83%',
      panel: '0 0% 93%',
      surface: '0 0% 87%',
      accent: '25 17% 75%',
      accentStrong: '23 25% 81%',
      divider: '36 3% 68%',
      textPrimary: '40 5% 24%',
      textSecondary: '37 3% 48%',
    },
  },
  {
    id: 'silica-glow',
    name: 'Silica Glow',
    tokens: {
      background: '0 0% 93%',
      panel: '60 1% 83%',
      surface: '0 0% 87%',
      accent: '23 25% 81%',
      accentStrong: '25 17% 75%',
      divider: '36 3% 68%',
      textPrimary: '40 5% 24%',
      textSecondary: '37 3% 48%',
    },
  },
  {
    id: 'pearl-grid',
    name: 'Pearl Grid',
    tokens: {
      background: '0 0% 87%',
      panel: '60 1% 83%',
      surface: '0 0% 93%',
      accent: '25 17% 75%',
      accentStrong: '23 25% 81%',
      divider: '36 3% 68%',
      textPrimary: '40 5% 24%',
      textSecondary: '37 3% 48%',
    },
  },
  {
    id: 'neutral-halo',
    name: 'Neutral Halo',
    tokens: {
      background: '0 0% 93%',
      panel: '0 0% 87%',
      surface: '25 17% 75%',
      accent: '60 1% 83%',
      accentStrong: '23 25% 81%',
      divider: '36 3% 68%',
      textPrimary: '40 5% 24%',
      textSecondary: '37 3% 48%',
    },
  },
]

export const getThemeStyle = (theme?: DashboardTheme): CSSProperties => {
  if (!theme?.tokens) return {}
  return {
    '--background': theme.tokens.background,
    '--foreground': theme.tokens.textPrimary,
    '--card': theme.tokens.surface,
    '--card-foreground': theme.tokens.textPrimary,
    '--popover': theme.tokens.panel,
    '--popover-foreground': theme.tokens.textPrimary,
    '--primary': theme.tokens.accentStrong,
    '--primary-foreground': theme.tokens.textPrimary,
    '--secondary': theme.tokens.panel,
    '--secondary-foreground': theme.tokens.textPrimary,
    '--muted': theme.tokens.panel,
    '--muted-foreground': theme.tokens.textSecondary,
    '--accent': theme.tokens.accent,
    '--accent-foreground': theme.tokens.textPrimary,
    '--border': theme.tokens.divider,
    '--input': theme.tokens.divider,
    '--ring': theme.tokens.accentStrong,
    '--theme-bg': theme.tokens.background,
    '--theme-panel': theme.tokens.panel,
    '--theme-surface': theme.tokens.surface,
    '--theme-accent': theme.tokens.accent,
    '--theme-accent-strong': theme.tokens.accentStrong,
    '--theme-divider': theme.tokens.divider,
    '--theme-text': theme.tokens.textPrimary,
    '--theme-text-secondary': theme.tokens.textSecondary,
  } as CSSProperties
}
