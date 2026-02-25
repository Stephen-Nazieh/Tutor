/**
 * @vitest-environment node
 * Web Crypto API (ECDH, AES-GCM) requires Node environment; jsdom has limited support.
 */
import { describe, it, expect, beforeEach } from 'vitest'
import {
  clientEncryption,
  encryptField,
  decryptField,
  encryptMessage,
  decryptMessage,
  encryptPayload,
  decryptPayload,
  encryptForTransport,
  decryptFromTransport,
  isEncryptionAvailable,
  ENCRYPTION_CONFIG,
} from './client-encryption'

describe('client-encryption', () => {
  const password = 'test-password-123'

  beforeEach(() => {
    clientEncryption.clearKeyCache()
  })

  describe('isEncryptionAvailable', () => {
    it('returns true when Web Crypto API is available', () => {
      expect(isEncryptionAvailable()).toBe(true)
    })
  })

  describe('ENCRYPTION_CONFIG', () => {
    it('has correct Chinese government standard iterations', () => {
      expect(ENCRYPTION_CONFIG.ITERATIONS).toBe(100_000)
    })
    it('uses AES-256-GCM', () => {
      expect(ENCRYPTION_CONFIG.ALGORITHM).toBe('AES-256-GCM')
    })
    it('uses 90-day key rotation', () => {
      expect(ENCRYPTION_CONFIG.KEY_ROTATION_DAYS).toBe(90)
    })
  })

  describe('L1: Field-level encryption', () => {
    it('encrypts and decrypts PII field', async () => {
      const plaintext = 'test-data'
      const encrypted = await encryptField(plaintext, password)
      expect(encrypted.v).toBeDefined()
      expect(encrypted.iv).toBeDefined()
      expect(encrypted.ct).toBeDefined()
      expect(encrypted.salt).toBeDefined()
      expect(encrypted.layer).toBe('L1')
      const decrypted = await decryptField(encrypted, password)
      expect(decrypted).toBe(plaintext)
    })

    it('produces different ciphertext for same plaintext', async () => {
      const plaintext = 'sensitive-data'
      const encrypted1 = await encryptField(plaintext, password)
      const encrypted2 = await encryptField(plaintext, password)
      expect(encrypted1.ct).not.toBe(encrypted2.ct)
      expect(encrypted1.iv).not.toBe(encrypted2.iv)
      expect(await decryptField(encrypted1, password)).toBe(plaintext)
      expect(await decryptField(encrypted2, password)).toBe(plaintext)
    })

    it('fails with wrong password', async () => {
      const encrypted = await encryptField('secret', password)
      await expect(decryptField(encrypted, 'wrong-password')).rejects.toThrow()
    })
  })

  describe('L2: Message-level encryption', () => {
    it('encrypts and decrypts message', async () => {
      const plaintext = 'Hello world'
      const encrypted = await encryptMessage(plaintext, password)
      expect(encrypted.layer).toBe('L2')
      const decrypted = await decryptMessage(encrypted, password)
      expect(decrypted).toBe(plaintext)
    })
  })

  describe('L3: Database-level encryption', () => {
    it('encrypts and decrypts payload', async () => {
      const data = { name: 'test', id: '123' }
      const encrypted = await encryptPayload(data, password)
      expect(encrypted.layer).toBe('L3')
      const decrypted = await decryptPayload(encrypted, password)
      expect(decrypted).toEqual(data)
    })
  })

  describe('L4: Transport encryption', () => {
    it('encrypts for recipient and decrypts with private key', async () => {
      const { publicKey, privateKey } = await clientEncryption.generateTransportKeyPair()
      const plaintext = 'API payload'
      const encrypted = await encryptForTransport(plaintext, publicKey)
      expect(encrypted.layer).toBe('L4')
      expect(encrypted.pub).toBeDefined()
      expect(encrypted.pub!.length).toBeGreaterThan(0)
      const decrypted = await decryptFromTransport(encrypted, privateKey)
      expect(decrypted).toBe(plaintext)
    })
  })

  describe('Key rotation', () => {
    it('rotateKeyVersion updates version', () => {
      const v1 = clientEncryption.getKeyVersion()
      const v2 = clientEncryption.rotateKeyVersion()
      expect(v2).not.toBe(v1)
    })
  })

  describe('Audit callback', () => {
    it('emits audit events on encrypt', async () => {
      const events: unknown[] = []
      clientEncryption.setAuditCallback((e) => events.push(e))
      await encryptField('test', password)
      expect(events.length).toBeGreaterThanOrEqual(1)
      expect((events[0] as { op: string; layer: string }).op).toBe('encrypt')
      expect((events[0] as { op: string; layer: string }).layer).toBe('L1')
    })
  })
})
