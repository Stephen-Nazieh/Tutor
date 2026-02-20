import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { hashPassword, isAuthorized } from './auth'

describe('auth', () => {
  describe('hashPassword', () => {
    it('returns a non-empty string different from input', async () => {
      const password = 'TestPassword123'
      const hashed = await hashPassword(password)
      expect(hashed).toBeTruthy()
      expect(hashed).not.toBe(password)
      expect(hashed.length).toBeGreaterThan(20)
    })

    it('produces different hashes for same input (salt)', async () => {
      const password = 'SamePassword1'
      const a = await hashPassword(password)
      const b = await hashPassword(password)
      expect(a).not.toBe(b)
    })
  })

  describe('isAuthorized', () => {
    it('returns true when user role is in allowed list', () => {
      expect(isAuthorized('STUDENT', ['STUDENT', 'TUTOR'])).toBe(true)
      expect(isAuthorized('ADMIN', ['ADMIN'])).toBe(true)
    })

    it('returns false when user role is not in allowed list', () => {
      expect(isAuthorized('STUDENT', ['TUTOR', 'ADMIN'])).toBe(false)
      expect(isAuthorized('TUTOR', [])).toBe(false)
    })

    it('is case-sensitive', () => {
      expect(isAuthorized('student', ['STUDENT'])).toBe(false)
      expect(isAuthorized('STUDENT', ['student'])).toBe(false)
    })
  })
})
