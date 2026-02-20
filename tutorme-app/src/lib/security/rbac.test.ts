import { describe, it, expect } from 'vitest'
import { hasPermission, getPermissionsForRole, PERMISSIONS } from './rbac'

describe('rbac', () => {
  describe('hasPermission', () => {
    it('ADMIN has admin and student permissions', () => {
      expect(hasPermission('ADMIN', PERMISSIONS.ADMIN_VIEW_PAYMENTS)).toBe(true)
      expect(hasPermission('ADMIN', PERMISSIONS.STUDENT_BOOK_CLASS)).toBe(true)
    })

    it('TUTOR has tutor but not admin permissions', () => {
      expect(hasPermission('TUTOR', PERMISSIONS.ADMIN_VIEW_PAYMENTS)).toBe(false)
      expect(hasPermission('TUTOR', PERMISSIONS.TUTOR_MANAGE_CLINICS)).toBe(true)
    })

    it('STUDENT has only student permissions', () => {
      expect(hasPermission('STUDENT', PERMISSIONS.ADMIN_VIEW_PAYMENTS)).toBe(false)
      expect(hasPermission('STUDENT', PERMISSIONS.STUDENT_VIEW_OWN)).toBe(true)
    })
  })

  describe('getPermissionsForRole', () => {
    it('returns non-empty array for each role', () => {
      expect(getPermissionsForRole('ADMIN').length).toBeGreaterThan(0)
      expect(getPermissionsForRole('STUDENT').length).toBeGreaterThan(0)
    })
  })
})
