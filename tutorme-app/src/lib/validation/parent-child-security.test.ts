import { describe, it, expect } from 'vitest'
import { studentLinkingSchema, parentRegistrationSecuritySchema } from './parent-child-security'

describe('parent-child-security', () => {
  describe('studentLinkingSchema', () => {
    it('accepts childEmail only', () => {
      const result = studentLinkingSchema.safeParse({
        childEmail: 'child@example.com',
        name: 'Child',
      })
      expect(result.success).toBe(true)
    })

    it('accepts childUniqueId only (min 8 chars)', () => {
      const result = studentLinkingSchema.safeParse({
        childUniqueId: 'STU-12345678',
        name: 'Child',
      })
      expect(result.success).toBe(true)
    })

    it('rejects when neither childEmail nor childUniqueId provided', () => {
      const result = studentLinkingSchema.safeParse({
        name: 'Child',
        grade: 'Grade 1',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('child email or unique ID')
      }
    })

    it('rejects childUniqueId shorter than 8 chars', () => {
      const result = studentLinkingSchema.safeParse({
        childUniqueId: 'short',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('parentRegistrationSecuritySchema', () => {
    it('accepts valid parent registration with children', () => {
      const result = parentRegistrationSecuritySchema.safeParse({
        children: [{ childEmail: 'child@example.com' }],
        parentEmail: 'parent@example.com',
        tosAccepted: true,
      })
      expect(result.success).toBe(true)
    })

    it('rejects when no children', () => {
      const result = parentRegistrationSecuritySchema.safeParse({
        children: [],
        parentEmail: 'parent@example.com',
        tosAccepted: true,
      })
      expect(result.success).toBe(false)
    })

    it('rejects when tosAccepted is false', () => {
      const result = parentRegistrationSecuritySchema.safeParse({
        children: [{ childEmail: 'child@example.com' }],
        parentEmail: 'parent@example.com',
        tosAccepted: false,
      })
      expect(result.success).toBe(false)
    })
  })
})
