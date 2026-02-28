import { describe, expect, it, vi } from 'vitest'

const state = vi.hoisted(() => ({
  withAuthOptions: undefined as any,
}))

vi.mock('next-intl/middleware', () => ({
  default: vi.fn(() => {
    return vi.fn(() => new Response(null, { status: 200 }))
  }),
}))

vi.mock('next-auth/middleware', () => ({
  withAuth: vi.fn((middleware: any, options: any) => {
    state.withAuthOptions = options
    return middleware
  }),
}))

vi.mock('@/i18n/routing', () => ({
  routing: {
    locales: ['en', 'zh-CN'],
    defaultLocale: 'en',
  },
}))

import middleware from './middleware'

function buildReq(pathname: string, token: Record<string, unknown> | null = null): any {
  const url = `http://localhost${pathname}`
  return {
    nextUrl: new URL(url),
    url,
    method: 'GET',
    nextauth: { token },
    headers: new Headers(),
  }
}

describe('middleware auth boundaries', () => {
  it('authorized() rejects protected locale routes without token', () => {
    const authorized = state.withAuthOptions.callbacks.authorized
    const allowed = authorized({
      req: { nextUrl: new URL('http://localhost/en/student/dashboard') },
      token: null,
    })
    expect(allowed).toBe(false)
  })

  it('authorized() allows public locale login route', () => {
    const authorized = state.withAuthOptions.callbacks.authorized
    const allowed = authorized({
      req: { nextUrl: new URL('http://localhost/en/login') },
      token: null,
    })
    expect(allowed).toBe(true)
  })

  it('redirects unauthenticated locale student route to login', async () => {
    const res = await middleware(buildReq('/en/student/dashboard'))
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toContain('/login')
  })

  it('allows student role on locale student route', async () => {
    const res = await middleware(buildReq('/en/student/dashboard', { role: 'STUDENT', tosAccepted: true }))
    expect(res.status).toBe(200)
    expect(res.headers.get('X-Content-Type-Options')).toBe('nosniff')
  })

  it('blocks student role on locale tutor route', async () => {
    const res = await middleware(buildReq('/en/tutor/dashboard', { role: 'STUDENT', tosAccepted: true }))
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toContain('/login')
  })
})
