/**
 * Compliance middleware helpers.
 * Phase 5: Trace access, NOT content — log WHO accessed WHAT, never the data itself.
 * FERPA requires access logs for all educational records.
 */
import { NextRequest } from 'next/server'
import crypto from 'crypto'
import { drizzleDb } from '@/lib/db/drizzle'
import { piiAccessLog } from '@/lib/db/schema'

export type ResourceType =
  | 'student_profile'
  | 'tutor_profile'
  | 'parent_profile'
  | 'ai_session'
  | 'quiz_attempt'
  | 'task_submission'
  | 'financial_record'
  | 'family_member'
  | 'live_session'
  | 'curriculum'
  | 'user_list'
  | 'data_export'
  | 'consent_record'

export type AccessAction = 'read' | 'create' | 'update' | 'delete' | 'export'

export type LegalBasis =
  | 'legitimate_interest'
  | 'consent'
  | 'contract'
  | 'legal_obligation'
  | 'vital_interests'
  | 'public_task'

/**
 * Hash an IP address using SHA-256 with salt.
 * Never store raw IPs — this satisfies GDPR pseudonymisation requirement.
 */
export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT || 'solocorn-ip-salt-2024'
  return crypto.createHmac('sha256', salt).update(ip).digest('hex').slice(0, 16)
}

/**
 * Get the client IP from a request (X-Forwarded-For → fallback).
 */
export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

/**
 * Log access to sensitive/PII-containing resources.
 * Call this in API route handlers after successful authorization.
 *
 * @param params - Details of the access event
 */
export async function logPiiAccess(params: {
  accessorId: string
  accessorRole: string
  targetUserId?: string
  resourceType: ResourceType
  resourceId?: string
  action: AccessAction
  endpoint: string
  req?: NextRequest
  legalBasis?: LegalBasis
}): Promise<void> {
  try {
    const ipHash = params.req ? hashIp(getClientIp(params.req)) : null
    await drizzleDb.insert(piiAccessLog).values({
      id: crypto.randomUUID(),
      accessorId: params.accessorId,
      accessorRole: params.accessorRole,
      targetUserId: params.targetUserId ?? null,
      resourceType: params.resourceType,
      resourceId: params.resourceId ?? null,
      action: params.action,
      endpoint: params.endpoint,
      ipHash,
      legalBasis: params.legalBasis ?? 'legitimate_interest',
    })
  } catch (err) {
    // Never let audit logging failure break the main request
    console.error('[PII Audit] Failed to write access log:', err)
  }
}

/**
 * Log data deletion events (GDPR Art.17 compliance).
 */
export async function logDeletion(params: {
  accessorId: string
  accessorRole: string
  targetUserId: string
  resourceType: ResourceType
  endpoint: string
  req?: NextRequest
}): Promise<void> {
  return logPiiAccess({
    ...params,
    action: 'delete',
    legalBasis: 'legal_obligation',
  })
}
