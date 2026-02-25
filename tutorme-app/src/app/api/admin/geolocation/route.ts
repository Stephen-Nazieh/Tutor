/**
 * IP Geolocation API Route
 * Server-side proxy for ip-api.com to avoid CORS issues
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export interface GeoCoordinates {
  lat: number
  lon: number
  city?: string
  country?: string
  region?: string
}

// Simple in-memory cache (per-request only - use Redis for production)
const geoCache = new Map<string, GeoCoordinates>()

/**
 * GET /api/admin/geolocation?ip=x.x.x.x
 * Fetch geolocation for a single IP
 */
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.role || !['ADMIN', 'TUTOR'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const ip = request.nextUrl.searchParams.get('ip')
  
  if (!ip) {
    return NextResponse.json({ error: 'IP address required' }, { status: 400 })
  }

  // Validate IP format
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/
  if (!ipRegex.test(ip)) {
    return NextResponse.json({ error: 'Invalid IP format' }, { status: 400 })
  }

  // Check cache
  if (geoCache.has(ip)) {
    return NextResponse.json(geoCache.get(ip))
  }

  // Handle private IPs with mock data
  if (ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
    const mockCoords = getRandomMockCoordinates()
    geoCache.set(ip, mockCoords)
    return NextResponse.json(mockCoords)
  }

  try {
    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,lat,lon,city,country,regionName`,
      { 
        signal: AbortSignal.timeout(5000),
        headers: { 'Accept': 'application/json' }
      }
    )
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()

    if (data.status !== 'success') {
      // Return mock coordinates for failed lookups
      const mockCoords = getRandomMockCoordinates()
      geoCache.set(ip, mockCoords)
      return NextResponse.json(mockCoords)
    }

    const coords: GeoCoordinates = {
      lat: data.lat,
      lon: data.lon,
      city: data.city,
      country: data.country,
      region: data.regionName,
    }

    geoCache.set(ip, coords)
    return NextResponse.json(coords)
  } catch (error) {
    console.warn(`Geolocation fetch failed for ${ip}:`, error)
    // Return mock coordinates on error
    const mockCoords = getRandomMockCoordinates()
    geoCache.set(ip, mockCoords)
    return NextResponse.json(mockCoords)
  }
}

/**
 * POST /api/admin/geolocation
 * Batch fetch geolocation for multiple IPs
 */
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.role || !['ADMIN', 'TUTOR'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { ips } = body as { ips: string[] }

    if (!Array.isArray(ips) || ips.length === 0) {
      return NextResponse.json({ error: 'IPs array required' }, { status: 400 })
    }

    if (ips.length > 50) {
      return NextResponse.json({ error: 'Maximum 50 IPs per request' }, { status: 400 })
    }

    const results = new Map<string, GeoCoordinates>()
    
    // Process sequentially to respect rate limits
    for (const ip of ips) {
      // Check cache first
      if (geoCache.has(ip)) {
        results.set(ip, geoCache.get(ip)!)
        continue
      }

      // Handle private IPs
      if (ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
        const mockCoords = getRandomMockCoordinates()
        geoCache.set(ip, mockCoords)
        results.set(ip, mockCoords)
        continue
      }

      try {
        const response = await fetch(
          `http://ip-api.com/json/${ip}?fields=status,lat,lon,city,country,regionName`,
          { 
            signal: AbortSignal.timeout(5000),
            headers: { 'Accept': 'application/json' }
          }
        )
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json()

        if (data.status === 'success') {
          const coords: GeoCoordinates = {
            lat: data.lat,
            lon: data.lon,
            city: data.city,
            country: data.country,
            region: data.regionName,
          }
          geoCache.set(ip, coords)
          results.set(ip, coords)
        } else {
          // Use mock for failed lookups
          const mockCoords = getRandomMockCoordinates()
          geoCache.set(ip, mockCoords)
          results.set(ip, mockCoords)
        }
      } catch (error) {
        // Use mock on error
        const mockCoords = getRandomMockCoordinates()
        geoCache.set(ip, mockCoords)
        results.set(ip, mockCoords)
      }

      // Small delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 50))
    }

    return NextResponse.json({ results: Object.fromEntries(results) })
  } catch (error) {
    console.error('Batch geolocation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * Generate random mock coordinates for testing/development
 */
function getRandomMockCoordinates(): GeoCoordinates {
  const regions = [
    { latRange: [25, 49], lonRange: [-125, -70], country: 'United States' },
    { latRange: [36, 71], lonRange: [-10, 40], country: 'Germany' },
    { latRange: [35, 60], lonRange: [-10, 10], country: 'United Kingdom' },
    { latRange: [10, 55], lonRange: [70, 140], country: 'China' },
    { latRange: [20, 46], lonRange: [122, 146], country: 'Japan' },
    { latRange: [-35, 10], lonRange: [-80, -35], country: 'Brazil' },
    { latRange: [-35, 35], lonRange: [-20, 50], country: 'South Africa' },
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
