'use client'

import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { SessionProvider } from 'next-auth/react'

interface ProvidersProps {
  children: ReactNode
  locale: string
  messages: Record<string, unknown>
}

export function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <NextIntlClientProvider 
      locale={locale} 
      messages={messages}
      timeZone="Asia/Shanghai"
    >
      <SessionProvider 
        refetchInterval={0}
        refetchOnWindowFocus={false}
      >
        {children}
      </SessionProvider>
    </NextIntlClientProvider>
  )
}
