import * as Sentry from '@sentry/nextjs'
import { getSentryInitOptions } from '@/lib/monitoring/sentry-setup'

Sentry.init({
  ...getSentryInitOptions(),
  tracesSampleRate: 0.1,
})
