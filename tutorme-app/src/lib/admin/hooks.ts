/**
 * Admin Dashboard Hooks
 * React hooks for admin operations
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Types
export interface AdminSession {
  adminId: string
  email: string
  name: string | null
  roles: string[]
  permissions: string[]
  expiresAt: string
}

// Fetch session
async function fetchSession(): Promise<AdminSession | null> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
    
    const res = await fetch('/api/admin/auth/session', {
      signal: controller.signal,
    })
    
    clearTimeout(timeoutId)
    
    if (!res.ok) return null
    const data = await res.json()
    return data.session
  } catch (error) {
    console.error('Failed to fetch session:', error)
    return null
  }
}

// Login
async function login(credentials: { email: string; password: string; otpCode?: string }) {
  const res = await fetch('/api/admin/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Login failed')
  }
  return res.json()
}

// Logout
async function logout() {
  const res = await fetch('/api/admin/auth/logout', { method: 'POST' })
  if (!res.ok) throw new Error('Logout failed')
  return res.json()
}

// Use admin session
export function useAdminSession() {
  const queryClient = useQueryClient()

  const { data: session, isLoading, error } = useQuery({
    queryKey: ['admin-session'],
    queryFn: fetchSession,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-session'] })
    },
  })

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(['admin-session'], null)
      queryClient.invalidateQueries({ queryKey: ['admin-session'] })
    },
  })

  return {
    session,
    isLoading,
    error,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  }
}

// Use admin users
export function useAdminUsers(filters?: {
  role?: string
  search?: string
  isActive?: string
  page?: number
  limit?: number
}) {
  const queryString = filters
    ? '?' + new URLSearchParams(
        Object.entries(filters).filter(([, v]) => v !== undefined) as [string, string][]
      ).toString()
    : ''

  return useQuery({
    queryKey: ['admin-users', filters],
    queryFn: async () => {
      const res = await fetch(`/api/admin/users${queryString}`)
      if (!res.ok) throw new Error('Failed to fetch users')
      return res.json()
    },
  })
}

// Use feature flags
export function useFeatureFlags() {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['feature-flags'],
    queryFn: async () => {
      const res = await fetch('/api/admin/feature-flags')
      if (!res.ok) throw new Error('Failed to fetch feature flags')
      return res.json()
    },
  })

  const createMutation = useMutation({
    mutationFn: async (flag: Record<string, unknown>) => {
      const res = await fetch('/api/admin/feature-flags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flag),
      })
      if (!res.ok) throw new Error('Failed to create feature flag')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feature-flags'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Record<string, unknown>) => {
      const res = await fetch('/api/admin/feature-flags', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      })
      if (!res.ok) throw new Error('Failed to update feature flag')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feature-flags'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/feature-flags?id=${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete feature flag')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feature-flags'] })
    },
  })

  return {
    flags: data?.flags || [],
    isLoading,
    error,
    createFlag: createMutation.mutateAsync,
    updateFlag: updateMutation.mutateAsync,
    deleteFlag: deleteMutation.mutateAsync,
  }
}

// Use LLM providers
export function useLlmProviders() {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['llm-providers'],
    queryFn: async () => {
      const res = await fetch('/api/admin/llm/providers')
      if (!res.ok) throw new Error('Failed to fetch providers')
      return res.json()
    },
  })

  const createMutation = useMutation({
    mutationFn: async (provider: Record<string, unknown>) => {
      const res = await fetch('/api/admin/llm/providers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(provider),
      })
      if (!res.ok) throw new Error('Failed to create provider')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['llm-providers'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Record<string, unknown>) => {
      const res = await fetch('/api/admin/llm/providers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      })
      if (!res.ok) throw new Error('Failed to update provider')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['llm-providers'] })
    },
  })

  return {
    providers: data?.providers || [],
    isLoading,
    error,
    createProvider: createMutation.mutateAsync,
    updateProvider: updateMutation.mutateAsync,
  }
}

// Use routing rules
export function useLlmRoutingRules() {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['llm-routing-rules'],
    queryFn: async () => {
      const res = await fetch('/api/admin/llm/routing')
      if (!res.ok) throw new Error('Failed to fetch routing rules')
      return res.json()
    },
  })

  const createMutation = useMutation({
    mutationFn: async (rule: Record<string, unknown>) => {
      const res = await fetch('/api/admin/llm/routing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rule),
      })
      if (!res.ok) throw new Error('Failed to create routing rule')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['llm-routing-rules'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Record<string, unknown>) => {
      const res = await fetch('/api/admin/llm/routing', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      })
      if (!res.ok) throw new Error('Failed to update routing rule')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['llm-routing-rules'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/llm/routing?id=${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete routing rule')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['llm-routing-rules'] })
    },
  })

  return {
    rules: data?.rules || [],
    isLoading,
    error,
    createRule: createMutation.mutateAsync,
    updateRule: updateMutation.mutateAsync,
    deleteRule: deleteMutation.mutateAsync,
  }
}

// Use settings
export function useSettings(category?: string) {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['settings', category],
    queryFn: async () => {
      const url = category
        ? `/api/admin/settings?category=${category}`
        : '/api/admin/settings'
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch settings')
      return res.json()
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (setting: {
      category: string
      key: string
      value: unknown
      valueType?: string
      description?: string
    }) => {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(setting),
      })
      if (!res.ok) throw new Error('Failed to update setting')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
  })

  return {
    settings: data?.settings || [],
    isLoading,
    error,
    updateSetting: updateMutation.mutateAsync,
  }
}

// Use audit logs
export function useAuditLogs(filters?: {
  page?: number
  limit?: number
  adminId?: string
  action?: string
  resourceType?: string
  startDate?: string
  endDate?: string
}) {
  const queryString = filters
    ? '?' + new URLSearchParams(
        Object.entries(filters).filter(([, v]) => v !== undefined) as [string, string][]
      ).toString()
    : ''

  return useQuery({
    queryKey: ['audit-logs', filters],
    queryFn: async () => {
      const res = await fetch(`/api/admin/audit-log${queryString}`)
      if (!res.ok) throw new Error('Failed to fetch audit logs')
      return res.json()
    },
  })
}

// Use analytics
export function useAnalytics(days: number = 7) {
  return useQuery({
    queryKey: ['analytics', days],
    queryFn: async () => {
      const res = await fetch(`/api/admin/analytics/overview?days=${days}`)
      if (!res.ok) throw new Error('Failed to fetch analytics')
      return res.json()
    },
  })
}

export interface TopologyNode {
  id: string
  role: 'TUTOR' | 'STUDENT'
  name: string
  email: string
  avatarUrl: string | null
  timezone: string
  lat: number
  lon: number
  activeSessions: number
  totalConnections: number
}

export interface TopologyEdge {
  id: string
  sessionId: string
  tutorId: string
  studentId: string
  subject: string
  status: 'ACTIVE' | 'RECENT'
  isActive: boolean
  startedAt: string | null
}

export interface AdminTopologyResponse {
  topology: {
    nodes: TopologyNode[]
    edges: TopologyEdge[]
    stats: {
      tutors: number
      students: number
      liveConnections: number
      totalConnections: number
    }
  }
  meta: {
    days: number
    generatedAt: string
  }
}

export function useAdminTopology(days: number = 7) {
  return useQuery<AdminTopologyResponse>({
    queryKey: ['admin-topology', days],
    queryFn: async () => {
      const res = await fetch(`/api/admin/analytics/topology?days=${days}`)
      if (!res.ok) throw new Error('Failed to fetch topology analytics')
      return res.json() as Promise<AdminTopologyResponse>
    },
    refetchInterval: 15000,
  })
}
