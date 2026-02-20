import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  UnauthorizedError,
  ForbiddenError,
  ValidationError,
  NotFoundError,
  handleApiError,
} from './middleware'

describe('api/middleware', () => {
  describe('error classes', () => {
    it('UnauthorizedError has default message and name', () => {
      const e = new UnauthorizedError()
      expect(e.message).toBe('Unauthorized - Please log in')
      expect(e.name).toBe('UnauthorizedError')
    })

    it('ForbiddenError has default message', () => {
      const e = new ForbiddenError()
      expect(e.message).toContain('Forbidden')
    })

    it('ValidationError preserves message', () => {
      const e = new ValidationError('Invalid email')
      expect(e.message).toBe('Invalid email')
      expect(e.name).toBe('ValidationError')
    })

    it('NotFoundError preserves message', () => {
      const e = new NotFoundError('User not found')
      expect(e.message).toBe('User not found')
    })
  })

  describe('handleApiError', () => {
    beforeEach(() => {
      vi.stubGlobal('console', { ...console, error: vi.fn() })
    })

    it('returns 500 with default message for unknown error', () => {
      process.env.NODE_ENV = 'production'
      const res = handleApiError(new Error('DB connection failed'))
      expect(res.status).toBe(500)
      return res.json().then((body) => {
        expect(body.error).toBe('Internal server error')
      })
    })

    it('returns 500 with error message in development', () => {
      process.env.NODE_ENV = 'development'
      const res = handleApiError(new Error('Custom error'))
      expect(res.status).toBe(500)
      return res.json().then((body) => {
        expect(body.error).toBe('Custom error')
      })
    })

    it('uses custom defaultMessage when error has no message', () => {
      process.env.NODE_ENV = 'production'
      const res = handleApiError(null, 'Something went wrong')
      return res.json().then((body) => {
        expect(body.error).toBe('Something went wrong')
      })
    })
  })
})
