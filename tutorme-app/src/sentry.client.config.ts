import * as Sentry from '@sentry/nextjs'
import { getSentryInitOptions, setupClientMonitoring } from '@/lib/monitoring/sentry-setup'

Sentry.init({
  ...getSentryInitOptions(),
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
})

setupClientMonitoring()

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
