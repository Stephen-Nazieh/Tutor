/**
 * Parent-Child Security Validation Schemas
 * Global security schema for parent-child linking with verification requirements
 */

import { z } from 'zod'

/**
 * Student linking schema - requires either child email or unique ID for security verification.
 * Prevents unauthorized parent-child associations.
 */
export const studentLinkingSchema = z
  .object({
    childEmail: z.string().email().optional(),
    childUniqueId: z.string().min(8, 'Unique ID must be at least 8 characters').optional(),
    verificationMethod: z.enum(['email', 'id', 'both']).optional(),
    // Optional display name for UI (not used for verification)
    name: z.string().min(1).max(100).optional(),
    grade: z.string().optional(),
    subjects: z.array(z.string()).optional(),
  })
  .refine(
    (data) => !!data.childEmail || !!data.childUniqueId,
    {
      message:
        'For security, you must provide either child email or unique ID to link students properly',
    }
  )

export type StudentLinkingInput = z.infer<typeof studentLinkingSchema>

/**
 * Parent registration security schema - enforces child verification before family creation.
 */
export const parentRegistrationSecuritySchema = z.object({
  children: z
    .array(studentLinkingSchema)
    .min(1, 'You must link at least one child for parent registration'),
  parentEmail: z.string().email('Valid parent email is required'),
  tosAccepted: z.literal(true, {
    message: 'You must accept the Terms of Service',
  }),
})

export type ParentRegistrationSecurityInput = z.infer<
  typeof parentRegistrationSecuritySchema
>
