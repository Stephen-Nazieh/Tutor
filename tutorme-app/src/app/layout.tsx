import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { getLocale, getMessages } from 'next-intl/server'
import { Providers } from './components/Providers'
import { PerformanceProviders } from './components/PerformanceProviders'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: {
    default: 'Solocorn - AI-Powered Educational Platform',
    template: '%s | Solocorn',
  },
  description:
    'AI-human hybrid tutoring platform with 24/7 Socratic AI tutoring and live group clinics',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Solocorn',
  },
  other: {
    'theme-color': '#10b981',
    'msapplication-TileColor': '#10b981',
  },
}

export const dynamic = 'force-static'

async function getOptimizedLocaleData() {
  const [locale, messages] = await Promise.all([getLocale(), getMessages()])
  return { locale, messages }
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { locale, messages } = await getOptimizedLocaleData()

  return (
    <html lang={locale} className={`${inter.variable} font-sans`}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
        />
        <meta name="theme-color" content="#10b981" />
        <meta name="color-scheme" content="light dark" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      </head>
      <body className={inter.className}>
        <Providers locale={locale} messages={messages}>
          <PerformanceProviders>{children}</PerformanceProviders>
        </Providers>
      </body>
    </html>
  )
}
