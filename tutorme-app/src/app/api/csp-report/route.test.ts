/**
 * Tests for CSP Violation Report Endpoint
 */

import { describe, it, expect, vi } from 'vitest'
import { POST } from './route'

// Mock console methods
const mockConsoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {})
const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('CSP Report Endpoint', () => {
  it('should accept CSP violation reports in production', async () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    const report = {
      'csp-report': {
        'document-uri': 'https://example.com/page',
        'violated-directive': 'script-src',
        'blocked-uri': 'https://evil.com/script.js',
      },
    }

    const req = new Request('http://localhost/api/csp-report', {
      method: 'POST',
      body: JSON.stringify(report),
    })

    const res = await POST(req)
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ received: true })

    process.env.NODE_ENV = originalEnv
  })

  it('should accept CSP violation reports in development', async () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    const report = {
      'csp-report': {
        'document-uri': 'https://example.com/page',
        'violated-directive': 'script-src',
        'blocked-uri': 'inline',
      },
    }

    const req = new Request('http://localhost/api/csp-report', {
      method: 'POST',
      body: JSON.stringify(report),
    })

    const res = await POST(req)
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ received: true })

    process.env.NODE_ENV = originalEnv
  })

  it('should handle malformed JSON gracefully', async () => {
    const req = new Request('http://localhost/api/csp-report', {
      method: 'POST',
      body: 'not valid json',
    })

    const res = await POST(req)
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ received: true })
  })

  it('should handle empty body', async () => {
    const req = new Request('http://localhost/api/csp-report', {
      method: 'POST',
      body: '',
    })

    const res = await POST(req)
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ received: true })
  })
})
