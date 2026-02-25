import * as Sentry from '@sentry/nextjs'
import { getSentryInitOptions } from './sentry-setup'

Sentry.init({
  ...getSentryInitOptions(),
  beforeSend(event) {
    if (event.request?.cookies) {
      event.request.cookies = '[Filtered]'
    }
    if (event.user) {
      event.user = { id: event.user.id, role: event.user.role }
    }
    return event
  },
})