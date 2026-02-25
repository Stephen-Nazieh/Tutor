/**
 * User Registration Validation Schemas
 * Parent-specific, Tutor-specific and shared registration validation
 */

import { z } from 'zod'
import { studentLinkingSchema } from './parent-child-security'

// ============================================
// Tutor Registration Schemas
// ============================================

export const tutorAdditionalDataSchema = z.object({
  education: z.string().max(500, 'Education must be less than 500 characters').optional(),
  experience: z.string().max(50, 'Experience must be less than 50 characters').optional(),
  subjects: z.array(z.string()).min(1, 'Please select at least one subject'),
  gradeLevels: z.array(z.string()).optional(),
  hourlyRate: z.number().min(0).max(10000).optional(),
})

export const tutorProfileDataSchema = z.object({
  phoneNumber: z.string().regex(/^\+?[\d\s\-\(\)]{10,}$/, 'Valid phone number required').optional(),
  bio: z.string().max(2000, 'Bio must be less than 2000 characters').optional(),
  timezone: z.string().default('Asia/Shanghai'),
  preferredLanguage: z.enum(['zh-CN', 'en']).default('zh-CN'),
})

// Legacy student schema (for backward compatibility in non-parent flows)
export const studentSchema = z.object({
  name: z.string().min(1, 'Child name is required'),
  email: z.union([z.string().email(), z.literal('')]).optional(),
  grade: z.string().optional(),
  subjects: z.array(z.string()).optional(),
})

// Security-enforced student linking for parent registration (requires childEmail or childUniqueId)
export const parentStudentLinkingSchema = studentLinkingSchema

export const emergencyContactSchema = z.object({
  name: z.string().min(1, 'Contact name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]{10,}$/, 'Valid phone number required'),
})

export const notificationSchema = z.object({
  email: z.boolean().optional(),
  sms: z.boolean().optional(),
  app: z.boolean().optional(),
  weeklyReports: z.boolean().optional(),
  paymentNotifications: z.boolean().optional(),
  emergencyContacts: z.boolean().optional(),
})

export const parentProfileDataSchema = z.object({
  phoneNumber: z.string().regex(/^\+?[\d\s\-\(\)]{10,}$/, 'Valid phone number required'),
  relationship: z.enum(['parent', 'guardian', 'step-parent', 'grandparent', 'other']),
  timezone: z.string().default('Asia/Shanghai'),
  preferredLanguage: z.enum(['zh-CN', 'en']).default('zh-CN'),
})

// Lenient emergency contact for API - allows empty placeholder entries (filtered in API)
const emergencyContactInputSchema = z.object({
  name: z.string(),
  relationship: z.string(),
  phone: z.string(),
})

export const parentAdditionalDataSchema = z.object({
  students: z.array(parentStudentLinkingSchema).optional().default([]),
  emergencyContacts: z.array(emergencyContactInputSchema).max(3).optional(),
  notificationPreferences: notificationSchema.optional(),
})

// ============================================
// Admin Registration Schemas
// ============================================

export const ADMIN_PERMISSION_GROUPS = [
  'user_management',
  'content_management',
  'financial_access',
  'system_settings',
  'analytics',
] as const

export type AdminPermissionGroup = (typeof ADMIN_PERMISSION_GROUPS)[number]

export const adminPermissionGroupsSchema = z.array(
  z.enum(ADMIN_PERMISSION_GROUPS)
)

export const adminProfileDataSchema = z.object({
  phoneNumber: z.string().regex(/^\+?[\d\s\-\(\)]{10,}$/, 'Valid phone number required'),
  organizationName: z.string().min(2, 'Organization name must be at least 2 characters').max(200),
  organizationSlug: z.string().regex(/^[a-z0-9\-]+$/, 'Slug: lowercase letters, numbers, hyphens only').optional(),
  adminLevel: z.enum(['super', 'standard', 'limited']),
  jobTitle: z.string().max(100).optional(),
  department: z.string().max(100).optional(),
})

export const adminAdditionalDataSchema = z.object({
  permissions: adminPermissionGroupsSchema.min(1, 'Select at least one permission group'),
  mfaEnabled: z.boolean().default(true),
  ipWhitelist: z.array(z.string().regex(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/, 'Invalid IP address')).optional(),
  timezone: z.string().default('Asia/Shanghai'),
  preferredLanguage: z.enum(['zh-CN', 'en']).default('zh-CN'),
})

export const adminRegistrationSchema = z
  .object({
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(128, 'Password too long')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string(),
    firstName: z.string().min(1, 'First name is required').max(50),
    lastName: z.string().min(1, 'Last name is required').max(50),
    phoneNumber: z.string().regex(/^\+?[\d\s\-\(\)]{10,}$/, 'Valid phone number required'),
    organizationName: z.string().min(2, 'Organization name is required').max(200),
    organizationSlug: z.string().max(100).optional(),
    adminLevel: z.enum(['super', 'standard', 'limited']),
    jobTitle: z.string().max(100).optional(),
    department: z.string().max(100).optional(),
    permissions: adminPermissionGroupsSchema.min(1, 'Select at least one permission group'),
    mfaEnabled: z.boolean().default(true),
    tosAccepted: z.boolean().refine((val) => val === true, {
      message: 'You must accept the Terms of Service',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type AdminRegistrationInput = z.infer<typeof adminRegistrationSchema>

// ============================================
// Parent Registration Schema
// ============================================

export const parentRegistrationSchema = z
  .object({
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string(),
    phoneNumber: z.string().regex(/^\+?[\d\s\-\(\)]{10,}$/, 'Valid phone number required'),
    relationship: z.enum(['parent', 'guardian', 'step-parent', 'grandparent', 'other']),
    timezone: z.string().default('Asia/Shanghai'),
    preferredLanguage: z.enum(['zh-CN', 'en']).default('zh-CN'),
    students: z.array(parentStudentLinkingSchema).optional().default([]),
    emergencyContacts: z.array(emergencyContactSchema).max(3).optional().default([]),
    notificationPreferences: notificationSchema.optional().default({}),
    tosAccepted: z.boolean().refine((val) => val === true, {
      message: 'You must accept the Terms of Service',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
