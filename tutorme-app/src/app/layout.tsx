import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { getLocale, getMessages } from 'next-intl/server'
import { Providers } from './components/Providers'
import { PerformanceProviders } from './components/PerformanceProviders'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin', 'latin-ext'], 
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['sans-serif', 'system-ui']
})

export const metadata = {
  title: {
    default: 'TutorMe - AI-Powered Educational Platform',
    template: '%s | TutorMe'
  },
  description: 'AI-human hybrid tutoring platform with 24/7 Socratic AI tutoring and live group clinics',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'TutorMe'
  },
  other: {
    'theme-color': '#ffffff',
    'msapplication-TileColor': '#ffffff',
    'msapplication-TileImage': '/ms-icon-144x144.png',
  }
}

export const dynamic = 'force-static'

async function getOptimizedLocaleData() {
  const [locale, messages] = await Promise.all([
    getLocale(),
    getMessages()
  ])
  return { locale, messages }
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const { locale, messages } = await getOptimizedLocaleData()
  
  return (
    <html lang={locale} className={`${inter.variable} font-sans`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://daily.co" />
        <link rel="dns-prefetch" href="https://localhost:3003" />
      </head>
      <body className={inter.className}>
        <Providers locale={locale} messages={messages}>
          <PerformanceProviders>
            {children}
          </PerformanceProviders>
        </Providers>
      </body>
    </html>
  )
}
