/**
 * Hook for managing live topology data
 * Fetches online users and active sessions
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import type { OnlineUser, LiveSession } from '@/lib/geo/ipGeolocation'

interface UseLiveTopologyOptions {
  refreshInterval?: number
  days?: number
}

interface UseLiveTopologyReturn {
  users: OnlineUser[]
  sessions: LiveSession[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

// Stable mock users - same IDs to prevent Canvas remounting
const STABLE_MOCK_USERS: OnlineUser[] = [
  { id: 'user-0', ip: '203.0.113.1', role: 'TUTOR', name: 'James Smith', isActive: true },
  { id: 'user-1', ip: '203.0.113.2', role: 'STUDENT', name: 'Maria Johnson', isActive: true },
  { id: 'user-2', ip: '203.0.113.3', role: 'TUTOR', name: 'Robert Williams', isActive: false },
  { id: 'user-3', ip: '203.0.113.4', role: 'STUDENT', name: 'Jennifer Brown', isActive: true },
  { id: 'user-4', ip: '203.0.113.5', role: 'STUDENT', name: 'Michael Jones', isActive: true },
  { id: 'user-5', ip: '203.0.113.6', role: 'TUTOR', name: 'Linda Garcia', isActive: true },
  { id: 'user-6', ip: '203.0.113.7', role: 'STUDENT', name: 'William Miller', isActive: false },
  { id: 'user-7', ip: '203.0.113.8', role: 'STUDENT', name: 'Patricia Davis', isActive: true },
  { id: 'user-8', ip: '203.0.113.9', role: 'TUTOR', name: 'David Rodriguez', isActive: true },
  { id: 'user-9', ip: '203.0.113.10', role: 'STUDENT', name: 'Elizabeth Martinez', isActive: true },
  { id: 'user-10', ip: '198.51.100.1', role: 'STUDENT', name: 'Thomas Anderson', isActive: true },
  { id: 'user-11', ip: '198.51.100.2', role: 'TUTOR', name: 'Sarah Wilson', isActive: true },
  { id: 'user-12', ip: '198.51.100.3', role: 'STUDENT', name: 'Christopher Moore', isActive: false },
  { id: 'user-13', ip: '198.51.100.4', role: 'STUDENT', name: 'Lisa Taylor', isActive: true },
  { id: 'user-14', ip: '198.51.100.5', role: 'TUTOR', name: 'Daniel Jackson', isActive: true },
  { id: 'user-15', ip: '198.51.100.6', role: 'STUDENT', name: 'Nancy White', isActive: true },
  { id: 'user-16', ip: '198.51.100.7', role: 'STUDENT', name: 'Paul Harris', isActive: false },
  { id: 'user-17', ip: '198.51.100.8', role: 'TUTOR', name: 'Sandra Martin', isActive: true },
  { id: 'user-18', ip: '198.51.100.9', role: 'STUDENT', name: 'Kevin Thompson', isActive: true },
  { id: 'user-19', ip: '198.51.100.10', role: 'STUDENT', name: 'Betty Gonzalez', isActive: true },
]

// Generate mock users - stable IDs to prevent Canvas remounting
function generateMockUsers(count: number): OnlineUser[] {
  // Return stable users, just update their active status slightly for realism
  return STABLE_MOCK_USERS.slice(0, count).map(user => ({
    ...user,
    // Slight variation in active status but keep same ID
    isActive: Math.random() > 0.2, // 80% chance of being active
  }))
}

// Stable mock sessions - same IDs to prevent Canvas remounting
const STABLE_MOCK_SESSIONS: LiveSession[] = [
  { id: 'session-0-0', tutorId: 'user-0', studentId: 'user-1', tutorIp: '203.0.113.1', studentIp: '203.0.113.2', subject: 'Mathematics', isActive: true, startedAt: new Date(Date.now() - 1800000).toISOString() },
  { id: 'session-0-1', tutorId: 'user-0', studentId: 'user-4', tutorIp: '203.0.113.1', studentIp: '203.0.113.5', subject: 'Physics', isActive: true, startedAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 'session-2-0', tutorId: 'user-5', studentId: 'user-3', tutorIp: '203.0.113.6', studentIp: '203.0.113.4', subject: 'Chemistry', isActive: true, startedAt: new Date(Date.now() - 2400000).toISOString() },
  { id: 'session-2-1', tutorId: 'user-5', studentId: 'user-7', tutorIp: '203.0.113.6', studentIp: '203.0.113.8', subject: 'Biology', isActive: false, startedAt: new Date(Date.now() - 7200000).toISOString() },
  { id: 'session-4-0', tutorId: 'user-8', studentId: 'user-9', tutorIp: '203.0.113.9', studentIp: '203.0.113.10', subject: 'English', isActive: true, startedAt: new Date(Date.now() - 1200000).toISOString() },
  { id: 'session-4-1', tutorId: 'user-8', studentId: 'user-10', tutorIp: '203.0.113.9', studentIp: '198.51.100.1', subject: 'History', isActive: true, startedAt: new Date(Date.now() - 3000000).toISOString() },
  { id: 'session-6-0', tutorId: 'user-11', studentId: 'user-13', tutorIp: '198.51.100.2', studentIp: '198.51.100.4', subject: 'Computer Science', isActive: true, startedAt: new Date(Date.now() - 900000).toISOString() },
  { id: 'session-6-1', tutorId: 'user-11', studentId: 'user-15', tutorIp: '198.51.100.2', studentIp: '198.51.100.6', subject: 'Mathematics', isActive: false, startedAt: new Date(Date.now() - 5400000).toISOString() },
  { id: 'session-8-0', tutorId: 'user-17', studentId: 'user-18', tutorIp: '198.51.100.8', studentIp: '198.51.100.9', subject: 'Physics', isActive: true, startedAt: new Date(Date.now() - 1500000).toISOString() },
  { id: 'session-8-1', tutorId: 'user-17', studentId: 'user-19', tutorIp: '198.51.100.8', studentIp: '198.51.100.10', subject: 'Chemistry', isActive: true, startedAt: new Date(Date.now() - 4200000).toISOString() },
]

// Generate mock sessions from users - stable IDs to prevent Canvas remounting
function generateMockSessions(users: OnlineUser[]): LiveSession[] {
  // Return stable sessions with updated active status based on current user states
  return STABLE_MOCK_SESSIONS.map(session => {
    const tutor = users.find(u => u.id === session.tutorId)
    const student = users.find(u => u.id === session.studentId)
    
    // Session is only active if both tutor and student are active
    const isActive = (tutor?.isActive && student?.isActive) ?? false
    
    return {
      ...session,
      isActive,
      // Update IPs in case they changed
      tutorIp: tutor?.ip ?? session.tutorIp,
      studentIp: student?.ip ?? session.studentIp,
    }
  }).filter(s => s.isActive || Math.random() > 0.5) // Keep most sessions
}

// Stable data refs to prevent flickering
const stableUsers = generateMockUsers(20)
const stableSessions = generateMockSessions(stableUsers)

export function useLiveTopology(options: UseLiveTopologyOptions = {}): UseLiveTopologyReturn {
  const { refreshInterval = 0, days = 7 } = options  // Default to 0 (no polling) to prevent flickering
  
  const [users, setUsers] = useState<OnlineUser[]>(stableUsers)  // Use stable data immediately
  const [sessions, setSessions] = useState<LiveSession[]>(stableSessions)
  const [isLoading, setIsLoading] = useState(false)  // Start as false since we have data
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Keep stable refs
  const usersRef = useRef(stableUsers)
  const sessionsRef = useRef(stableSessions)

  const fetchData = useCallback(async () => {
    try {
      // Don't set loading true to prevent UI flicker
      // In production, this would be an API call
      // const response = await fetch('/api/admin/live-users')
      // const data = await response.json()
      
      // Use stable data - only update if we actually got new data from API
      // For now, keep the same stable data to prevent flickering
      setUsers(usersRef.current)
      setSessions(sessionsRef.current)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch live data')
    }
  }, [days])

  // Initial fetch - only once
  useEffect(() => {
    fetchData()
  }, [])  // Empty deps - only run once

  // Set up polling only if explicitly enabled
  useEffect(() => {
    if (refreshInterval > 0) {
      intervalRef.current = setInterval(fetchData, refreshInterval)
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [fetchData, refreshInterval])

  return {
    users,
    sessions,
    isLoading,
    error,
    refetch: fetchData,
  }
}

export default useLiveTopology
