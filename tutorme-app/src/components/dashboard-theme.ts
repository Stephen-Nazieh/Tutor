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
      background: '#EDEDED',
      panel: '#DFDFDF',
      surface: '#D4D4D3',
      accent: '#DBCCC3',
      accentStrong: '#CABDB4',
      divider: '#B0AEAB',
      textPrimary: '#3F3D39',
      textSecondary: '#7F7C77',
    },
  },
  {
    id: 'quartz-wave',
    name: 'Quartz Wave',
    tokens: {
      background: '#DFDFDF',
      panel: '#EDEDED',
      surface: '#CABDB4',
      accent: '#D4D4D3',
      accentStrong: '#DBCCC3',
      divider: '#B0AEAB',
      textPrimary: '#3F3D39',
      textSecondary: '#7F7C77',
    },
  },
  {
    id: 'chrome-dune',
    name: 'Chrome Dune',
    tokens: {
      background: '#D4D4D3',
      panel: '#EDEDED',
      surface: '#DFDFDF',
      accent: '#CABDB4',
      accentStrong: '#DBCCC3',
      divider: '#B0AEAB',
      textPrimary: '#3F3D39',
      textSecondary: '#7F7C77',
    },
  },
  {
    id: 'silica-glow',
    name: 'Silica Glow',
    tokens: {
      background: '#EDEDED',
      panel: '#D4D4D3',
      surface: '#DFDFDF',
      accent: '#DBCCC3',
      accentStrong: '#CABDB4',
      divider: '#B0AEAB',
      textPrimary: '#3F3D39',
      textSecondary: '#7F7C77',
    },
  },
  {
    id: 'pearl-grid',
    name: 'Pearl Grid',
    tokens: {
      background: '#DFDFDF',
      panel: '#D4D4D3',
      surface: '#EDEDED',
      accent: '#CABDB4',
      accentStrong: '#DBCCC3',
      divider: '#B0AEAB',
      textPrimary: '#3F3D39',
      textSecondary: '#7F7C77',
    },
  },
  {
    id: 'neutral-halo',
    name: 'Neutral Halo',
    tokens: {
      background: '#EDEDED',
      panel: '#DFDFDF',
      surface: '#CABDB4',
      accent: '#D4D4D3',
      accentStrong: '#DBCCC3',
      divider: '#B0AEAB',
      textPrimary: '#3F3D39',
      textSecondary: '#7F7C77',
    },
  },
]

export const getThemeStyle = (theme?: DashboardTheme): CSSProperties => {
  if (!theme?.tokens) return {}
  return {
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
