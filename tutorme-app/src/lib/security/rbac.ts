/**
 * Role-based access control: granular permissions per role.
 * Use requirePermission() in admin/sensitive routes.
 */

import type { Role } from '@/lib/db/schema'

export const PERMISSIONS = {
  // Admin
  ADMIN_VIEW_PAYMENTS: 'admin:payments:read',
  ADMIN_VIEW_WEBHOOKS: 'admin:webhooks:read',
  ADMIN_MANAGE_API_KEYS: 'admin:api_keys',
  ADMIN_VIEW_USERS: 'admin:users:read',
  // Tutor
  TUTOR_MANAGE_CLINICS: 'tutor:clinics',
  TUTOR_VIEW_REPORTS: 'tutor:reports:read',
  // Student
  STUDENT_VIEW_OWN: 'student:own:read',
  STUDENT_BOOK_CLASS: 'student:book'
} as const

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  ADMIN: [
    PERMISSIONS.ADMIN_VIEW_PAYMENTS,
    PERMISSIONS.ADMIN_VIEW_WEBHOOKS,
    PERMISSIONS.ADMIN_MANAGE_API_KEYS,
    PERMISSIONS.ADMIN_VIEW_USERS,
    PERMISSIONS.TUTOR_MANAGE_CLINICS,
    PERMISSIONS.TUTOR_VIEW_REPORTS,
    PERMISSIONS.STUDENT_VIEW_OWN,
    PERMISSIONS.STUDENT_BOOK_CLASS
  ],
  TUTOR: [
    PERMISSIONS.TUTOR_MANAGE_CLINICS,
    PERMISSIONS.TUTOR_VIEW_REPORTS,
    PERMISSIONS.STUDENT_VIEW_OWN,
    PERMISSIONS.STUDENT_BOOK_CLASS
  ],
  PARENT: [
    PERMISSIONS.STUDENT_VIEW_OWN,
    PERMISSIONS.STUDENT_BOOK_CLASS
  ],
  STUDENT: [PERMISSIONS.STUDENT_VIEW_OWN, PERMISSIONS.STUDENT_BOOK_CLASS]
}

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}

export function getPermissionsForRole(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role] ?? []
}
