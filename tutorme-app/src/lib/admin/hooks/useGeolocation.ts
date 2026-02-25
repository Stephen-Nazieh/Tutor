/**
 * React Query hook for IP geolocation with caching
 * Provides efficient caching and automatic fallback handling
 */

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import type { GeoCoordinates, OnlineUser } from '@/lib/geo/ipGeolocation'

interface GeolocationResult {
  userId: string
  ip: string
  coordinates: GeoCoordinates
  isMock: boolean
}

interface UseGeolocationOptions {
  enabled?: boolean
  staleTime?: number
}

const GEOLOCATION_STALE_TIME = 1000 * 60 * 30 // 30 minutes - IP location rarely changes

/**
 * Fetch geolocation for multiple users using batch API
 */
async function fetchBatchGeolocation(users: OnlineUser[]): Promise<GeolocationResult[]> {
  if (users.length === 0) return []

  const response = await fetch('/api/admin/geolocation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ips: users.map(u => u.ip) }),
    signal: AbortSignal.timeout(30000),
  })

  if (!response.ok) {
    throw new Error(`Geolocation API error: ${response.status}`)
  }

  const data = await response.json()
  const results = data.results || {}

  return users.map(user => {
    const coords = results[user.ip]
    // Check if this is a mock coordinate (private IP or API failure)
    const isMock = !coords || coords.city === 'Unknown' || 
                   user.ip.startsWith('127.') || 
                   user.ip.startsWith('192.168.') || 
                   user.ip.startsWith('10.')
    
    return {
      userId: user.id,
      ip: user.ip,
      coordinates: coords || generateMockCoordinates(),
      isMock,
    }
  })
}

function generateMockCoordinates(): GeoCoordinates {
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

/**
 * Hook to fetch geolocation for a batch of users
 * Uses React Query for caching and deduplication
 */
export function useBatchGeolocation(
  users: OnlineUser[],
  options: UseGeolocationOptions = {}
) {
  const { enabled = true, staleTime = GEOLOCATION_STALE_TIME } = options

  // Create a stable key based on user IDs and IPs
  const queryKey = ['geolocation', 'batch', users.map(u => `${u.id}:${u.ip}`).sort().join(',')]

  return useQuery({
    queryKey,
    queryFn: () => fetchBatchGeolocation(users),
    enabled: enabled && users.length > 0,
    staleTime,
    gcTime: 1000 * 60 * 60, // Keep in cache for 1 hour
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

/**
 * Hook to get a single user's geolocation from cache or fetch
 */
export function useUserGeolocation(user: OnlineUser | null) {
  const queryClient = useQueryClient()

  const getCached = useCallback(() => {
    if (!user) return null
    
    // Check all batch queries for this user
    const queries = queryClient.getQueriesData<GeolocationResult[]>({
      queryKey: ['geolocation', 'batch'],
    })

    for (const [, data] of queries) {
      if (data) {
        const found = data.find(r => r.userId === user.id)
        if (found) return found
      }
    }
    return null
  }, [queryClient, user])

  const query = useBatchGeolocation(user ? [user] : [], {
    enabled: !!user && !getCached(),
  })

  return {
    ...query,
    data: query.data?.[0] ?? getCached(),
    getCached,
  }
}

/**
 * Hook to prefetch geolocation data
 */
export function usePrefetchGeolocation() {
  const queryClient = useQueryClient()

  return useCallback((users: OnlineUser[]) => {
    const queryKey = ['geolocation', 'batch', users.map(u => `${u.id}:${u.ip}`).sort().join(',')]
    
    queryClient.prefetchQuery({
      queryKey,
      queryFn: () => fetchBatchGeolocation(users),
      staleTime: GEOLOCATION_STALE_TIME,
    })
  }, [queryClient])
}

export type { GeolocationResult }
