export const HANDLE_REGEX = /^[a-zA-Z0-9_]{3,30}$/

const RESERVED_HANDLES = new Set(['admin', 'support', 'everyone', 'staff', 'system', 'help'])

export function normalizeHandle(value: string): string {
  return value.trim().replace(/^@+/, '').toLowerCase()
}

export function isReservedHandle(value: string): boolean {
  return RESERVED_HANDLES.has(normalizeHandle(value))
}

export function isValidHandle(value: string): boolean {
  return HANDLE_REGEX.test(value)
}

export function assertValidHandle(value: string): void {
  if (!isValidHandle(value)) {
    throw new Error('Handle must be at least 3 characters, letters/numbers/underscores only')
  }
  if (isReservedHandle(value)) {
    throw new Error('This handle is reserved')
  }
}

export function getReservedHandles(): string[] {
  return Array.from(RESERVED_HANDLES.values())
}
