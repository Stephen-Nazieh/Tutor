/**
 * @vitest-environment node
 * Enterprise-grade security test suite for global platform
 * Web Crypto API requires Node environment; jsdom has limited support.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  clientEncryption,
  encryptField,
  decryptField,
  encryptForTransport,
  decryptFromTransport,
  ENCRYPTION_CONFIG,
} from '@/lib/security/client-encryption'
import { piplCompliance } from '@/lib/security/pipl-compliance'
import { getPerformanceMonitor } from '@/lib/performance/performance-monitoring'
import * as securityAuditModule from '@/lib/security/security-audit'

const { securityAudit } = securityAuditModule

// Mock db for tests that write to UserActivityLog/SecurityEvent (no DB in unit tests)
vi.mock('@/lib/db', () => ({
  db: {
    userActivityLog: { create: vi.fn().mockResolvedValue({}) },
    securityEvent: { create: vi.fn().mockResolvedValue({}) },
  },
}))

vi.mock('@/lib/db/drizzle', () => ({
  drizzleDb: {
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockResolvedValue(undefined),
    }),
  },
}))

describe('Comprehensive Security Tests', () => {
  beforeEach(() => {
    clientEncryption.clearKeyCache()
  })

  // ==========================================================================
  // 1. Client-side encryption tests
  // ==========================================================================
  describe('Client-side encryption', () => {
    it('should encrypt PII data with AES-256-GCM', async () => {
      const plaintext = 'Personal Identifiable Information'
      const encrypted = await encryptField(plaintext, 'test-passphrase', {
        dataCategory: 'name',
        piplConsent: {
          consentedAt: Date.now(),
          purpose: 'storage',
          dataCategories: ['name'],
        },
      })

      expect(encrypted.v).toBeDefined()
      expect(encrypted.ct).toBeDefined()
      expect(encrypted.iv).toBeDefined()
      expect(encrypted.salt).toBeDefined()
      expect(encrypted.layer).toBe('L1')

      const decrypted = await decryptField(encrypted, 'test-passphrase')
      expect(decrypted).toBe(plaintext)
    })

    it('should use AES-256-GCM algorithm per config', () => {
      expect(ENCRYPTION_CONFIG.ALGORITHM).toBe('AES-256-GCM')
      expect(ENCRYPTION_CONFIG.KEY_SIZE).toBe(32)
      expect(ENCRYPTION_CONFIG.IV_SIZE).toBe(12)
    })

    it('should meet Chinese government standard iterations', () => {
      expect(ENCRYPTION_CONFIG.ITERATIONS).toBe(100_000)
    })
  })

  // ==========================================================================
  // 2. Parent-tutor communication security (transport encryption)
  // ==========================================================================
  describe('Parent-tutor communication security', () => {
    it('should allow two-way encrypted communication via ECDH transport', async () => {
      const mockMessage = {
        conversationId: 'conv_123',
        content: 'Test message for security audit',
        senderId: 'tutor_456',
        recipientId: 'parent_789',
      }

      const { publicKey, privateKey } = await clientEncryption.generateTransportKeyPair()
      const encryptedMessage = await encryptForTransport(
        JSON.stringify(mockMessage),
        publicKey
      )

      expect(encryptedMessage.pub).toBeDefined()
      expect(encryptedMessage.ct).toBeDefined()
      expect(encryptedMessage.layer).toBe('L4')

      const decrypted = await decryptFromTransport(encryptedMessage, privateKey)
      const parsed = JSON.parse(decrypted)
      expect(parsed.conversationId).toBe('conv_123')
      expect(parsed.content).toBe('Test message for security audit')
    })
  })

  // ==========================================================================
  // 3. PIPL compliance tests
  // ==========================================================================
  describe('PIPL compliance', () => {
    it('should generate PIPL-compliant consent records', async () => {
      const consent = await piplCompliance.article6.createConsentRecord(
        'user_123',
        ['name', 'email'],
        'payment',
        { legalBasis: 'explicit_consent' }
      )

      expect(consent.userId).toBe('user_123')
      expect(consent.purpose).toBe('payment')
      expect(consent.dataTypes).toEqual(['name', 'email'])
      expect(consent.legalBasis).toBe('explicit_consent')
      expect(consent.id).toMatch(/^consent_/)
      expect(consent.createdAt).toBeInstanceOf(Date)
    })

    it('should classify PII fields correctly', () => {
      const emailResult = piplCompliance.classifyField('email', 'test@example.com')
      expect(emailResult).toBeDefined()
      expect(emailResult?.level).toBe('general')

      const phoneResult = piplCompliance.classifyField('phone', '+8613800138000')
      expect(phoneResult).toBeDefined()
      expect(phoneResult?.level).toBe('sensitive')
    })
  })

  // ==========================================================================
  // 4. Role-based access control (RBAC) - unit test via security audit
  // ==========================================================================
  describe('Role-based access control', () => {
    it('should track role violation attempts via security audit', () => {
      expect(() => {
        securityAudit.logRoleViolation('stu_123', 'PARENT', '/api/parent/financial/dashboard', {
          attemptedResource: 'child_payments',
        })
      }).not.toThrow()

      // Verify security audit exposes RBAC logging (integration tests verify DB writes)
      expect(securityAudit.logRoleViolation).toBeDefined()
      expect(securityAudit.logAccessAttempt).toBeDefined()
    })
  })

  // ==========================================================================
  // 5. Performance security monitoring
  // ==========================================================================
  describe('Performance security monitoring', () => {
    it('should expose performance monitor with security capabilities', () => {
      const monitor = getPerformanceMonitor()
      expect(monitor).toBeDefined()
      expect(typeof monitor.reportMetric).toBe('function')
      expect(typeof monitor.reportError).toBe('function')
    })

    it('should report security-related metrics', () => {
      const monitor = getPerformanceMonitor()
      expect(() => {
        monitor.reportMetric('security_payment_alert', 1, 'count', {
          endpoint: '/api/class/payment-alert',
          status: '402',
        })
      }).not.toThrow()
    })
  })

  // ==========================================================================
  // 6. Security audit system
  // ==========================================================================
  describe('Security audit system', () => {
    it('should log payment alert events', () => {
      expect(() => {
        securityAudit.logPaymentAlert('stu_123', 'cor_456', 'room_789', {
          curriculumId: 'cor_456',
          familyAccountId: 'fam_123',
        })
      }).not.toThrow()
    })

    it('should log access attempts', () => {
      expect(() => {
        securityAudit.logAccessAttempt('user_123', '/api/parent/financial/dashboard', {
          success: false,
          reason: 'forbidden_role',
        })
      }).not.toThrow()
    })
  })
})
