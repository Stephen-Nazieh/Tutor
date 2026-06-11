import dns from 'dns/promises'
import net from 'net'

const ALLOWED_PROTOCOLS = new Set(['http:', 'https:'])

function isPrivateIp(ip: string): boolean {
  if (ip === '::1') return true
  if (ip.startsWith('fe80:') || ip.startsWith('fc') || ip.startsWith('fd')) return true

  const parts = ip.split('.').map(Number)
  if (parts.length !== 4 || parts.some(part => !Number.isInteger(part))) return false
  const [a, b] = parts
  return (
    a === 10 ||
    a === 127 ||
    a === 0 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168)
  )
}

export async function assertSafeProxyUrl(rawUrl: string): Promise<URL> {
  let parsed: URL
  try {
    parsed = new URL(rawUrl)
  } catch {
    throw new Error('Invalid URL')
  }

  if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) {
    throw new Error('Unsupported protocol')
  }

  const hostname = parsed.hostname.toLowerCase()
  if (hostname === 'localhost' || hostname.endsWith('.localhost')) {
    throw new Error('Local hosts are not allowed')
  }

  if (net.isIP(hostname)) {
    if (isPrivateIp(hostname)) throw new Error('Private network URLs are not allowed')
    return parsed
  }

  const addresses = await dns.lookup(hostname, { all: true, verbatim: true })
  if (addresses.length === 0 || addresses.some(address => isPrivateIp(address.address))) {
    throw new Error('Private network URLs are not allowed')
  }

  return parsed
}
