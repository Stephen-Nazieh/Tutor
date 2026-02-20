/**
 * Admin panel IP whitelist. When set, only listed IPs can access /admin and admin API routes.
 * Env: ADMIN_IP_WHITELIST (comma-separated IPs or CIDRs, e.g. "1.2.3.4,10.0.0.0/8")
 */

function parseWhitelist(): string[] {
  const raw = process.env.ADMIN_IP_WHITELIST
  if (!raw?.trim()) return []
  return raw.split(',').map((s) => s.trim()).filter(Boolean)
}

function ipToNum(ip: string): number {
  const parts = ip.split('.').map(Number)
  if (parts.length !== 4) return 0
  return (parts[0]! << 24) | (parts[1]! << 16) | (parts[2]! << 8) | parts[3]!
}

function matchCidr(ip: string, cidr: string): boolean {
  if (!cidr.includes('/')) return ip === cidr
  const [net, bits] = cidr.split('/')
  if (!net || bits === undefined) return false
  const mask = ~((1 << (32 - parseInt(bits, 10))) - 1) >>> 0
  return (ipToNum(ip) & mask) === (ipToNum(net) & mask)
}

/**
 * Returns true if admin access is allowed from this IP.
 * If whitelist is empty, all IPs are allowed.
 */
export function isAdminIpAllowed(clientIp: string): boolean {
  const whitelist = parseWhitelist()
  if (whitelist.length === 0) return true
  return whitelist.some((entry) => matchCidr(clientIp, entry) || clientIp === entry)
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0]?.trim() : null
  return ip ?? req.headers.get('x-real-ip') ?? 'unknown'
}
