/**
 * Normalize Next.js dynamic route params to a single string.
 * Next.js 15+ may expose params as Record<string, string | string[]> or Promise<...>.
 * Use this so Drizzle eq(column, id) receives string, not string | string[].
 */
export function getParam(
  params: Record<string, string | string[] | undefined> | undefined,
  key: string
): string | undefined {
  if (!params || typeof params !== 'object') return undefined
  const value = params[key]
  if (value == null) return undefined
  return Array.isArray(value) ? value[0] : value
}

/**
 * Await params if it's a Promise, then get a single string param.
 */
export async function getParamAsync(
  params: Promise<Record<string, string | string[]>> | Record<string, string | string[]> | undefined,
  key: string
): Promise<string | undefined> {
  const resolved = params instanceof Promise ? await params : params
  return getParam(resolved as Record<string, string | string[] | undefined>, key)
}
