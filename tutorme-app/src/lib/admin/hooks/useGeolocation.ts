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
  coordinates: GeoCoordinates | null
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
    return {
      userId: user.id,
      ip: user.ip,
      coordinates: coords || null,
    }
  })
}

/**
 * Hook to fetch geolocation for a batch of users
 * Uses React Query for caching and deduplication
 */
export function useBatchGeolocation(users: OnlineUser[], options: UseGeolocationOptions = {}) {
  const { enabled = true, staleTime = GEOLOCATION_STALE_TIME } = options

  // Create a stable key based on user IDs and IPs
  const queryKey = [
    'geolocation',
    'batch',
    users
      .map(u => `${u.id}:${u.ip}`)
      .sort()
      .join(','),
  ]

  return useQuery({
    queryKey,
    queryFn: () => fetchBatchGeolocation(users),
    enabled: enabled && users.length > 0,
    staleTime,
    gcTime: 1000 * 60 * 60, // Keep in cache for 1 hour
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
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

  return useCallback(
    (users: OnlineUser[]) => {
      const queryKey = [
        'geolocation',
        'batch',
        users
          .map(u => `${u.id}:${u.ip}`)
          .sort()
          .join(','),
      ]

      queryClient.prefetchQuery({
        queryKey,
        queryFn: () => fetchBatchGeolocation(users),
        staleTime: GEOLOCATION_STALE_TIME,
      })
    },
    [queryClient]
  )
}

export type { GeolocationResult }
