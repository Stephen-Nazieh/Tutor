const memory = new Map<string, { value: unknown; expiresAt: number }>()

export async function getCache<T>(key: string): Promise<T | null> {
  const entry = memory.get(key)
  if (!entry) return null
  if (Date.now() > entry.expiresAt) {
    memory.delete(key)
    return null
  }
  return entry.value as T
}

export async function setCache<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
  memory.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 })
}
