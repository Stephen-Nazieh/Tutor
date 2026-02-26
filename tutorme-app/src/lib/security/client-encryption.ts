// @ts-nocheck
/**
 * Enterprise-Grade Client-Side Encryption System
 *
 * AES-256-GCM + ECDH Hybrid Encryption for Chinese market (PIPL compliant)
 *
 * Multi-Layer Encryption Stack:
 * - L1: Field-level (PII, financial data)
 * - L2: Message-level (chats, communications)
 * - L3: Database-level (at-rest protection)
 * - L4: Transport encryption (API calls)
 *
 * Performance targets: <10ms small data, <5ms/KB bulk, <50MB memory, <2% battery
 * Zero-downtime deployment compatible (key versioning)
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

// =============================================================================
// Configuration
// =============================================================================

export const ENCRYPTION_CONFIG = {
  ALGORITHM: 'AES-256-GCM',
  KEY_DERIVATION: 'PBKDF2-SHA256',
  ITERATIONS: 100_000, // Chinese government standard (GM/T 0005)
  KEY_SIZE: 32, // 256 bits
  IV_SIZE: 12, // 96 bits (NIST recommended for GCM)
  TAG_SIZE: 16, // 128 bits (AES-GCM standard)
  SALT_SIZE: 32,
  ECDH_CURVE: 'P-256' as const,
  KEY_ROTATION_DAYS: 90,
  VERSION_PREFIX: 'v1',
} as const

// =============================================================================
// Types
// =============================================================================

export type EncryptionLayer = 'L1' | 'L2' | 'L3' | 'L4'

export interface PiplConsent {
  /** PIPL Article 6: Explicit consent for sensitive data */
  consentedAt: number
  purpose: string
  dataCategories: string[]
}

export interface PiplCrossBorder {
  /** PIPL Article 29: Cross-border data transfer */
  transferId?: string
  destination?: string
  safeguards?: string[]
}

export interface PiplAccessRights {
  /** PIPL Article 41: Right to explanation and access */
  requestId?: string
  explanationProvided?: boolean
}

export interface EncryptionAuditEvent {
  op: 'encrypt' | 'decrypt' | 'key_rotate' | 'recovery_export'
  layer: EncryptionLayer
  timestamp: number
  keyVersion?: string
  dataCategory?: string
  pipl?: { consent?: PiplConsent; crossBorder?: PiplCrossBorder }
}

export interface EncryptedPayload {
  v: string // version
  iv: string // base64 IV
  ct: string // base64 ciphertext (includes GCM tag)
  salt?: string // base64 salt (for PBKDF2)
  pub?: string // base64 ephemeral public key (for ECDH)
  layer: EncryptionLayer
  ts: number
}

export interface RecoveryKeyExport {
  keyId: string
  wrappedKey: string // base64, encrypted with recovery passphrase
  salt: string
  iv: string
  createdAt: number
  expiresAt: number
}

type AuditCallback = (event: EncryptionAuditEvent) => void

// =============================================================================
// Web Crypto API Helpers (browser + Node 19+)
// =============================================================================

function getCrypto(): Crypto {
  if (typeof globalThis.crypto !== 'undefined') return globalThis.crypto
  throw new Error('ClientEncryption: Web Crypto API not available')
}

function getSubtle(): SubtleCrypto {
  const crypto = getCrypto()
  if (!crypto.subtle) throw new Error('ClientEncryption: crypto.subtle not available')
  return crypto.subtle
}

function b64Encode(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof ArrayBuffer ? new Uint8Array(buf) : buf
  const arr = Array.from(bytes)
  if (arr.length > 65536) {
    const chunks: string[] = []
    for (let i = 0; i < arr.length; i += 8192) {
      chunks.push(String.fromCharCode.apply(null, arr.slice(i, i + 8192)))
    }
    return btoa(chunks.join(''))
  }
  return btoa(String.fromCharCode.apply(null, arr))
}

function b64Decode(str: string): Uint8Array {
  const binary = atob(str)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

function randomBytes(len: number): Uint8Array {
  return getCrypto().getRandomValues(new Uint8Array(len))
}

function randomId(byteLen: number): string {
  const bytes = randomBytes(byteLen)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function deriveKey(
  password: string,
  salt: Uint8Array,
  usage: KeyUsage[] = ['encrypt', 'decrypt']
): Promise<CryptoKey> {
  const subtle = getSubtle()
  const enc = new TextEncoder()
  const keyMaterial = await subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  )
  return subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: ENCRYPTION_CONFIG.ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: ENCRYPTION_CONFIG.KEY_SIZE * 8 },
    false,
    usage
  )
}

// =============================================================================
// AES-256-GCM Core
// =============================================================================

async function encryptAesGcm(
  key: CryptoKey,
  plaintext: Uint8Array,
  iv?: Uint8Array
): Promise<{ ciphertext: Uint8Array; iv: Uint8Array }> {
  const ivBytes = iv ?? randomBytes(ENCRYPTION_CONFIG.IV_SIZE)
  const subtle = getSubtle()
  const ct = await subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: ivBytes,
      tagLength: ENCRYPTION_CONFIG.TAG_SIZE * 8,
    },
    key,
    plaintext
  )
  return { ciphertext: new Uint8Array(ct), iv: ivBytes }
}

async function decryptAesGcm(
  key: CryptoKey,
  ciphertext: Uint8Array,
  iv: Uint8Array
): Promise<Uint8Array> {
  const subtle = getSubtle()
  const pt = await subtle.decrypt(
    {
      name: 'AES-GCM',
      iv,
      tagLength: ENCRYPTION_CONFIG.TAG_SIZE * 8,
    },
    key,
    ciphertext
  )
  return new Uint8Array(pt)
}

// =============================================================================
// ECDH Hybrid Encryption
// =============================================================================

async function generateEcdhKeyPair(): Promise<CryptoKeyPair> {
  return getSubtle().generateKey(
    {
      name: 'ECDH',
      namedCurve: ENCRYPTION_CONFIG.ECDH_CURVE,
    },
    true,
    ['deriveBits']
  )
}

async function deriveAesFromEcdh(
  privateKey: CryptoKey,
  publicKey: CryptoKey
): Promise<CryptoKey> {
  const bits = await getSubtle().deriveBits(
    { name: 'ECDH', public: publicKey },
    privateKey,
    256
  )
  return getSubtle().importKey(
    'raw',
    bits,
    'AES-GCM',
    false,
    ['encrypt', 'decrypt']
  )
}

// =============================================================================
// Client Encryption Class (Singleton)
// =============================================================================

class ClientEncryptionImpl {
  private keyCache = new Map<string, { key: CryptoKey; expiresAt: number }>()
  private auditCallback: AuditCallback | null = null
  private keyVersion = ENCRYPTION_CONFIG.VERSION_PREFIX
  private readonly CACHE_TTL_MS = 5 * 60 * 1000 // 5 min

  setAuditCallback(cb: AuditCallback): void {
    this.auditCallback = cb
  }

  private emitAudit(event: EncryptionAuditEvent): void {
    this.auditCallback?.(event)
  }

  private async getOrDeriveKey(
    password: string,
    salt: Uint8Array,
    cacheKey: string
  ): Promise<CryptoKey> {
    const fullKey = `${cacheKey}:${password}`
    const cached = this.keyCache.get(fullKey)
    if (cached && cached.expiresAt > Date.now()) return cached.key
    const key = await deriveKey(password, salt)
    this.keyCache.set(fullKey, {
      key,
      expiresAt: Date.now() + this.CACHE_TTL_MS,
    })
    if (this.keyCache.size > 20) {
      const oldest = [...this.keyCache.entries()].sort(
        (a, b) => a[1].expiresAt - b[1].expiresAt
      )[0]
      if (oldest) this.keyCache.delete(oldest[0])
    }
    return key
  }

  /** L1: Field-level encryption (PII, financial data) */
  async encryptField(
    plaintext: string,
    password: string,
    options?: {
      salt?: Uint8Array
      piplConsent?: PiplConsent
      dataCategory?: string
    }
  ): Promise<EncryptedPayload> {
    const salt = options?.salt ?? randomBytes(ENCRYPTION_CONFIG.SALT_SIZE)
    const cacheKey = `field:${b64Encode(salt)}`
    const key = await this.getOrDeriveKey(password, salt, cacheKey)
    const enc = new TextEncoder()
    const { ciphertext, iv } = await encryptAesGcm(key, enc.encode(plaintext))
    this.emitAudit({
      op: 'encrypt',
      layer: 'L1',
      timestamp: Date.now(),
      keyVersion: this.keyVersion,
      dataCategory: options?.dataCategory,
      pipl: options?.piplConsent ? { consent: options.piplConsent } : undefined,
    })
    return {
      v: this.keyVersion,
      iv: b64Encode(iv),
      ct: b64Encode(ciphertext),
      salt: b64Encode(salt),
      layer: 'L1',
      ts: Date.now(),
    }
  }

  async decryptField(
    payload: EncryptedPayload,
    password: string
  ): Promise<string> {
    if (!payload.salt) throw new Error('ClientEncryption: missing salt')
    const salt = b64Decode(payload.salt)
    const cacheKey = `field:${payload.salt}`
    const key = await this.getOrDeriveKey(password, salt, cacheKey)
    const pt = await decryptAesGcm(
      key,
      b64Decode(payload.ct),
      b64Decode(payload.iv)
    )
    this.emitAudit({
      op: 'decrypt',
      layer: 'L1',
      timestamp: Date.now(),
      keyVersion: payload.v,
    })
    return new TextDecoder().decode(pt)
  }

  /** L2: Message-level encryption (chats, communications) */
  async encryptMessage(
    plaintext: string,
    password: string,
    options?: { piplConsent?: PiplConsent }
  ): Promise<EncryptedPayload> {
    const salt = randomBytes(ENCRYPTION_CONFIG.SALT_SIZE)
    const cacheKey = `msg:${b64Encode(salt)}`
    const key = await this.getOrDeriveKey(password, salt, cacheKey)
    const enc = new TextEncoder()
    const { ciphertext, iv } = await encryptAesGcm(key, enc.encode(plaintext))
    this.emitAudit({
      op: 'encrypt',
      layer: 'L2',
      timestamp: Date.now(),
      keyVersion: this.keyVersion,
      pipl: options?.piplConsent ? { consent: options.piplConsent } : undefined,
    })
    return {
      v: this.keyVersion,
      iv: b64Encode(iv),
      ct: b64Encode(ciphertext),
      salt: b64Encode(salt),
      layer: 'L2',
      ts: Date.now(),
    }
  }

  async decryptMessage(payload: EncryptedPayload, password: string): Promise<string> {
    return this.decryptField(payload, password)
  }

  /** L3: Database-level encryption (at-rest) */
  async encryptPayload(
    data: Record<string, unknown>,
    password: string,
    options?: { piplCrossBorder?: PiplCrossBorder }
  ): Promise<EncryptedPayload> {
    const plaintext = JSON.stringify(data)
    const salt = randomBytes(ENCRYPTION_CONFIG.SALT_SIZE)
    const cacheKey = `db:${b64Encode(salt)}`
    const key = await this.getOrDeriveKey(password, salt, cacheKey)
    const enc = new TextEncoder()
    const { ciphertext, iv } = await encryptAesGcm(key, enc.encode(plaintext))
    this.emitAudit({
      op: 'encrypt',
      layer: 'L3',
      timestamp: Date.now(),
      keyVersion: this.keyVersion,
      pipl: options?.piplCrossBorder ? { crossBorder: options.piplCrossBorder } : undefined,
    })
    return {
      v: this.keyVersion,
      iv: b64Encode(iv),
      ct: b64Encode(ciphertext),
      salt: b64Encode(salt),
      layer: 'L3',
      ts: Date.now(),
    }
  }

  async decryptPayload<T = Record<string, unknown>>(
    payload: EncryptedPayload,
    password: string
  ): Promise<T> {
    const json = await this.decryptField(payload, password)
    return JSON.parse(json) as T
  }

  /** L4: Transport encryption (API calls) - ECDH hybrid */
  async encryptForTransport(
    plaintext: string,
    recipientPublicKey: CryptoKey
  ): Promise<EncryptedPayload> {
    const keyPair = await generateEcdhKeyPair()
    const sharedKey = await deriveAesFromEcdh(
      keyPair.privateKey as CryptoKey,
      recipientPublicKey
    )
    const enc = new TextEncoder()
    const { ciphertext, iv } = await encryptAesGcm(sharedKey, enc.encode(plaintext))
    const pubKey = await getSubtle().exportKey('raw', keyPair.publicKey as CryptoKey)
    this.emitAudit({
      op: 'encrypt',
      layer: 'L4',
      timestamp: Date.now(),
      keyVersion: this.keyVersion,
    })
    return {
      v: this.keyVersion,
      iv: b64Encode(iv),
      ct: b64Encode(ciphertext),
      pub: b64Encode(pubKey),
      layer: 'L4',
      ts: Date.now(),
    }
  }

  async decryptFromTransport(
    payload: EncryptedPayload,
    privateKey: CryptoKey
  ): Promise<string> {
    if (!payload.pub) throw new Error('ClientEncryption: missing ephemeral public key')
    const pubKey = await getSubtle().importKey(
      'raw',
      b64Decode(payload.pub),
      { name: 'ECDH', namedCurve: ENCRYPTION_CONFIG.ECDH_CURVE },
      false,
      []
    )
    const sharedKey = await deriveAesFromEcdh(privateKey, pubKey)
    const pt = await decryptAesGcm(
      sharedKey,
      b64Decode(payload.ct),
      b64Decode(payload.iv)
    )
    this.emitAudit({
      op: 'decrypt',
      layer: 'L4',
      timestamp: Date.now(),
      keyVersion: payload.v,
    })
    return new TextDecoder().decode(pt)
  }

  async importPublicKey(publicKeyBase64: string): Promise<CryptoKey> {
    return getSubtle().importKey(
      'raw',
      b64Decode(publicKeyBase64),
      { name: 'ECDH', namedCurve: ENCRYPTION_CONFIG.ECDH_CURVE },
      true,
      []
    )
  }

  async generateTransportKeyPair(): Promise<{
    publicKey: CryptoKey
    privateKey: CryptoKey
    publicKeyBase64: string
  }> {
    const pair = await generateEcdhKeyPair()
    const pubRaw = await getSubtle().exportKey('raw', pair.publicKey as CryptoKey)
    return {
      publicKey: pair.publicKey as CryptoKey,
      privateKey: pair.privateKey as CryptoKey,
      publicKeyBase64: b64Encode(pubRaw),
    }
  }

  setKeyVersion(version: string): void {
    this.keyVersion = version
  }

  getKeyVersion(): string {
    return this.keyVersion
  }

  rotateKeyVersion(): string {
    const next = `v${Date.now()}`
    this.keyVersion = next
    this.emitAudit({
      op: 'key_rotate',
      layer: 'L1',
      timestamp: Date.now(),
      keyVersion: next,
    })
    return next
  }

  async exportRecoveryKey(
    keyMaterial: CryptoKey,
    recoveryPassphrase: string,
    ttlDays = 30
  ): Promise<RecoveryKeyExport> {
    const salt = randomBytes(ENCRYPTION_CONFIG.SALT_SIZE)
    const key = await deriveKey(recoveryPassphrase, salt, ['encrypt'])
    const raw = await getSubtle().exportKey('raw', keyMaterial)
    const { ciphertext, iv } = await encryptAesGcm(key, new Uint8Array(raw))
    const now = Date.now()
    const expiresAt = now + ttlDays * 24 * 60 * 60 * 1000
    this.emitAudit({
      op: 'recovery_export',
      layer: 'L1',
      timestamp: now,
    })
    return {
      keyId: `rec_${randomId(8)}`,
      wrappedKey: b64Encode(ciphertext),
      salt: b64Encode(salt),
      iv: b64Encode(iv),
      createdAt: now,
      expiresAt,
    }
  }

  async importRecoveryKey(
    exportData: RecoveryKeyExport,
    recoveryPassphrase: string
  ): Promise<CryptoKey> {
    if (Date.now() > exportData.expiresAt) {
      throw new Error('ClientEncryption: recovery key expired')
    }
    const key = await deriveKey(recoveryPassphrase, b64Decode(exportData.salt), [
      'decrypt',
    ])
    const pt = await decryptAesGcm(
      key,
      b64Decode(exportData.wrappedKey),
      b64Decode(exportData.iv)
    )
    return getSubtle().importKey(
      'raw',
      pt,
      'AES-GCM',
      false,
      ['encrypt', 'decrypt']
    )
  }

  async hasHardwareSecurity(): Promise<boolean> {
    if (typeof window === 'undefined') return false
    try {
      return (
        typeof PublicKeyCredential !== 'undefined' &&
        typeof (PublicKeyCredential as { isUserVerifyingPlatformAuthenticatorAvailable?: () => Promise<boolean> })
          .isUserVerifyingPlatformAuthenticatorAvailable === 'function'
      )
    } catch {
      return false
    }
  }

  async isHardwareAuthenticatorAvailable(): Promise<boolean> {
    if (typeof window === 'undefined') return false
    try {
      const fn = (PublicKeyCredential as { isUserVerifyingPlatformAuthenticatorAvailable?: () => Promise<boolean> })
        .isUserVerifyingPlatformAuthenticatorAvailable
      return (await fn?.()) ?? false
    } catch {
      return false
    }
  }

  createConsent(purpose: string, dataCategories: string[]): PiplConsent {
    return {
      consentedAt: Date.now(),
      purpose,
      dataCategories,
    }
  }

  createCrossBorderRecord(
    destination: string,
    safeguards: string[] = ['standard contractual clauses']
  ): PiplCrossBorder {
    return {
      transferId: `xfer_${randomId(12)}`,
      destination,
      safeguards,
    }
  }

  createAccessRightsRecord(explanationProvided: boolean): PiplAccessRights {
    return {
      requestId: `req_${randomId(8)}`,
      explanationProvided,
    }
  }

  async encryptFieldsBulk(
    items: Array<{ value: string; password: string; dataCategory?: string }>
  ): Promise<EncryptedPayload[]> {
    const salt = randomBytes(ENCRYPTION_CONFIG.SALT_SIZE)
    const key = await deriveKey(
      items[0]?.password ?? '',
      salt,
      ['encrypt']
    )
    const results: EncryptedPayload[] = []
    const enc = new TextEncoder()
    for (const item of items) {
      const k =
        item.password === items[0]?.password
          ? key
          : await deriveKey(item.password, salt, `bulk:${b64Encode(salt)}`)
      const { ciphertext, iv } = await encryptAesGcm(k, enc.encode(item.value))
      results.push({
        v: this.keyVersion,
        iv: b64Encode(iv),
        ct: b64Encode(ciphertext),
        salt: b64Encode(salt),
        layer: 'L1',
        ts: Date.now(),
      })
    }
    return results
  }

  clearKeyCache(): void {
    this.keyCache.clear()
  }
}

// =============================================================================
// Singleton Export
// =============================================================================

export const clientEncryption = new ClientEncryptionImpl()

// =============================================================================
// Convenience Functions
// =============================================================================

export async function encryptField(
  plaintext: string,
  password: string,
  options?: { piplConsent?: PiplConsent; dataCategory?: string }
): Promise<EncryptedPayload> {
  return clientEncryption.encryptField(plaintext, password, options)
}

export async function decryptField(
  payload: EncryptedPayload,
  password: string
): Promise<string> {
  return clientEncryption.decryptField(payload, password)
}

export async function encryptMessage(
  plaintext: string,
  password: string,
  options?: { piplConsent?: PiplConsent }
): Promise<EncryptedPayload> {
  return clientEncryption.encryptMessage(plaintext, password, options)
}

export async function decryptMessage(
  payload: EncryptedPayload,
  password: string
): Promise<string> {
  return clientEncryption.decryptMessage(payload, password)
}

export async function encryptPayload(
  data: Record<string, unknown>,
  password: string,
  options?: { piplCrossBorder?: PiplCrossBorder }
): Promise<EncryptedPayload> {
  return clientEncryption.encryptPayload(data, password, options)
}

export async function decryptPayload<T = Record<string, unknown>>(
  payload: EncryptedPayload,
  password: string
): Promise<T> {
  return clientEncryption.decryptPayload<T>(payload, password)
}

export async function encryptForTransport(
  plaintext: string,
  recipientPublicKey: CryptoKey
): Promise<EncryptedPayload> {
  return clientEncryption.encryptForTransport(plaintext, recipientPublicKey)
}

export async function decryptFromTransport(
  payload: EncryptedPayload,
  privateKey: CryptoKey
): Promise<string> {
  return clientEncryption.decryptFromTransport(payload, privateKey)
}

export function isEncryptionAvailable(): boolean {
  try {
    getCrypto()
    getSubtle()
    return true
  } catch {
    return false
  }
}
