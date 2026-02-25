/**
 * IP Geolocation Utilities
 * Fetches latitude/longitude coordinates from IP addresses via server-side API
 */

import type { GeoCoordinates } from '@/app/api/admin/geolocation/route'

export interface OnlineUser {
  id: string
  ip: string
  role: 'TUTOR' | 'STUDENT'
  name: string
  isActive: boolean
}

export interface LiveSession {
  id: string
  tutorId: string
  studentId: string
  tutorIp: string
  studentIp: string
  subject: string
  isActive: boolean
  startedAt: string
}

// Re-export GeoCoordinates type
export type { GeoCoordinates }

// Cache for IP geolocation to avoid repeated API calls
const geoCache = new Map<string, GeoCoordinates>()

/**
 * Fetch geolocation data for a single IP address via server API
 */
export async function getIpGeolocation(ip: string): Promise<GeoCoordinates | null> {
  // Check cache first
  if (geoCache.has(ip)) {
    return geoCache.get(ip)!
  }

  // Handle private IPs with mock coordinates
  if (ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    const mockCoords = getRandomMockCoordinates()
    geoCache.set(ip, mockCoords)
    return mockCoords
  }

  try {
    const response = await fetch(`/api/admin/geolocation?ip=${encodeURIComponent(ip)}`, {
      signal: AbortSignal.timeout(10000),
    })
    
    if (!response.ok) {
      // If API fails, use mock coordinates
      const mockCoords = getRandomMockCoordinates()
      geoCache.set(ip, mockCoords)
      return mockCoords
    }

    const data = await response.json()

    if (data.error) {
      console.warn(`Geolocation failed for IP ${ip}:`, data.error)
      const mockCoords = getRandomMockCoordinates()
      geoCache.set(ip, mockCoords)
      return mockCoords
    }

    const coords: GeoCoordinates = {
      lat: data.lat,
      lon: data.lon,
      city: data.city,
      country: data.country,
      region: data.region,
    }

    // Cache the result
    geoCache.set(ip, coords)
    return coords
  } catch (error) {
    console.error(`Error fetching geolocation for IP ${ip}:`, error)
    // Return mock coordinates on any error
    const mockCoords = getRandomMockCoordinates()
    geoCache.set(ip, mockCoords)
    return mockCoords
  }
}

/**
 * Batch fetch geolocation for multiple IPs
 * Uses the batch API for efficiency
 */
export async function batchGetIpGeolocation(
  users: OnlineUser[],
  onProgress?: (completed: number, total: number) => void
): Promise<Map<string, GeoCoordinates>> {
  const results = new Map<string, GeoCoordinates>()
  const uncachedUsers: OnlineUser[] = []
  
  // Check cache first
  for (const user of users) {
    if (geoCache.has(user.ip)) {
      results.set(user.id, geoCache.get(user.ip)!)
    } else if (user.ip === '127.0.0.1' || user.ip.startsWith('192.168.') || user.ip.startsWith('10.')) {
      const mockCoords = getRandomMockCoordinates()
      geoCache.set(user.ip, mockCoords)
      results.set(user.id, mockCoords)
    } else {
      uncachedUsers.push(user)
    }
  }
  
  onProgress?.(results.size, users.length)
  
  if (uncachedUsers.length === 0) {
    return results
  }

  try {
    // Use batch API for uncached users
    const response = await fetch('/api/admin/geolocation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ips: uncachedUsers.map(u => u.ip) }),
      signal: AbortSignal.timeout(30000),
    })

    if (!response.ok) {
      throw new Error(`Batch API error: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.results) {
      for (const user of uncachedUsers) {
        const coords = data.results[user.ip]
        if (coords) {
          geoCache.set(user.ip, coords)
          results.set(user.id, coords)
        }
      }
    }
  } catch (error) {
    console.error('Batch geolocation error:', error)
    // Fallback to individual requests
    for (const user of uncachedUsers) {
      const coords = await getIpGeolocation(user.ip)
      if (coords) {
        results.set(user.id, coords)
      }
      onProgress?.(results.size, users.length)
    }
  }

  return results
}

/**
 * Generate random mock coordinates for testing/development
 * Distributed across major continents
 */
export function getRandomMockCoordinates(): GeoCoordinates {
  const regions = [
    // North America
    { latRange: [25, 49], lonRange: [-125, -70], country: 'United States' },
    // Europe
    { latRange: [36, 71], lonRange: [-10, 40], country: 'Germany' },
    // Asia
    { latRange: [10, 55], lonRange: [70, 140], country: 'China' },
    // South America
    { latRange: [-35, 10], lonRange: [-80, -35], country: 'Brazil' },
    // Africa
    { latRange: [-35, 35], lonRange: [-20, 50], country: 'South Africa' },
    // Oceania
    { latRange: [-40, -10], lonRange: [110, 180], country: 'Australia' },
  ]

  const region = regions[Math.floor(Math.random() * regions.length)]
  
  return {
    lat: region.latRange[0] + Math.random() * (region.latRange[1] - region.latRange[0]),
    lon: region.lonRange[0] + Math.random() * (region.lonRange[1] - region.lonRange[0]),
    city: 'Unknown',
    country: region.country,
  }
}

/**
 * Spherical to Cartesian coordinate conversion
 * Converts latitude/longitude to 3D Vector3 position on a sphere
 * 
 * Formula:
 * x = -radius * sin(φ) * cos(θ)
 * y = radius * cos(φ)
 * z = radius * sin(φ) * sin(θ)
 * 
 * Where:
 * φ = (90 - lat) in radians (polar angle from positive y-axis)
 * θ = (lon + 180) in radians (azimuthal angle in x-z plane)
 */
export function latLonToVector3(
  lat: number,
  lon: number,
  radius: number
): { x: number; y: number; z: number } {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)

  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)

  return { x, y, z }
}

/**
 * Clear the geolocation cache
 */
export function clearGeoCache(): void {
  geoCache.clear()
}

/**
 * Get cache statistics
 */
export function getGeoCacheStats(): { size: number; entries: string[] } {
  return {
    size: geoCache.size,
    entries: Array.from(geoCache.keys()),
  }
}
