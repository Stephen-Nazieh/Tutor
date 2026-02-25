'use client'

import { useMemo, useCallback } from 'react'
import type { LiveStudent, SmartGroupingSuggestion, BreakoutSessionConfig } from '../../../types'

interface UseSmartGroupingProps {
  students: LiveStudent[]
  config: BreakoutSessionConfig
}

export function useSmartGrouping({ students, config }: UseSmartGroupingProps) {
  const generateSmartGrouping = useCallback((): SmartGroupingSuggestion | undefined => {
    if (students.length < 4) return undefined
    
    const { roomCount, distributionMode } = config
    
    // Categorize students by skill level
    const beginners = students.filter(s => 
      s.skillLevel === 'beginner' || 
      (s.recentPerformance !== undefined && s.recentPerformance < 60)
    )
    const intermediate = students.filter(s => 
      s.skillLevel === 'intermediate' || 
      (s.recentPerformance !== undefined && s.recentPerformance >= 60 && s.recentPerformance < 80)
    )
    const advanced = students.filter(s => 
      s.skillLevel === 'advanced' || 
      (s.recentPerformance !== undefined && s.recentPerformance >= 80)
    )
    
    const unclassified = students.filter(s => 
      !s.skillLevel && s.recentPerformance === undefined
    )
    
    switch (distributionMode) {
      case 'skill_based': {
        if (beginners.length === 0 && advanced.length === 0) return undefined
        
        const groups: SmartGroupingSuggestion['groups'] = []
        
        // Group beginners together
        if (beginners.length > 0) {
          for (let i = 0; i < Math.min(roomCount, Math.ceil(beginners.length / 4)); i++) {
            const startIdx = i * 4
            const groupMembers = beginners.slice(startIdx, startIdx + 4).map(s => s.id)
            if (groupMembers.length > 0) {
              groups.push({
                roomIndex: groups.length,
                members: groupMembers,
                rationale: 'Beginners can work at a comfortable pace with foundational support',
                predictedOutcome: 'Higher confidence and reduced frustration',
                skillProfile: {
                  beginners: groupMembers.length,
                  intermediate: 0,
                  advanced: 0
                }
              })
            }
          }
        }
        
        // Group intermediate together
        if (intermediate.length > 0 && groups.length < roomCount) {
          for (let i = 0; i < Math.min(roomCount - groups.length, Math.ceil(intermediate.length / 4)); i++) {
            const startIdx = i * 4
            const groupMembers = intermediate.slice(startIdx, startIdx + 4).map(s => s.id)
            if (groupMembers.length > 0) {
              groups.push({
                roomIndex: groups.length,
                members: groupMembers,
                rationale: 'Intermediate students can build on existing knowledge',
                predictedOutcome: 'Steady progress with peer collaboration',
                skillProfile: {
                  beginners: 0,
                  intermediate: groupMembers.length,
                  advanced: 0
                }
              })
            }
          }
        }
        
        // Group advanced together
        if (advanced.length > 0 && groups.length < roomCount) {
          for (let i = 0; i < Math.min(roomCount - groups.length, Math.ceil(advanced.length / 4)); i++) {
            const startIdx = i * 4
            const groupMembers = advanced.slice(startIdx, startIdx + 4).map(s => s.id)
            if (groupMembers.length > 0) {
              groups.push({
                roomIndex: groups.length,
                members: groupMembers,
                rationale: 'Advanced students can tackle complex challenges',
                predictedOutcome: 'Deeper exploration and leadership development',
                skillProfile: {
                  beginners: 0,
                  intermediate: 0,
                  advanced: groupMembers.length
                }
              })
            }
          }
        }
        
        return {
          type: 'skill_based',
          description: 'Group students by similar skill levels for targeted instruction',
          confidence: 0.85,
          groups
        }
      }
      
      case 'social': {
        // Mix abilities for peer teaching
        const groups: SmartGroupingSuggestion['groups'] = []
        
        for (let i = 0; i < roomCount; i++) {
          const members: string[] = []
          
          // Add 1-2 beginners
          const beginnerCount = Math.min(2, beginners.length - members.length)
          for (let b = 0; b < beginnerCount; b++) {
            const beginner = beginners.find(s => !members.includes(s.id))
            if (beginner) members.push(beginner.id)
          }
          
          // Add 1-2 intermediate
          const intermediateCount = Math.min(2, 4 - members.length)
          for (let int = 0; int < intermediateCount; int++) {
            const inter = intermediate.find(s => !members.includes(s.id))
            if (inter) members.push(inter.id)
          }
          
          // Add 1 advanced if available
          if (members.length < 4 && advanced.length > 0) {
            const adv = advanced.find(s => !members.includes(s.id))
            if (adv) members.push(adv.id)
          }
          
          // Fill with unclassified
          while (members.length < 3 && unclassified.length > 0) {
            const uncl = unclassified.find(s => !members.includes(s.id))
            if (uncl) members.push(uncl.id)
          }
          
          if (members.length >= 2) {
            groups.push({
              roomIndex: i,
              members,
              rationale: 'Balanced group with mentorship opportunities',
              predictedOutcome: 'Enhanced learning through teaching and diverse perspectives',
              skillProfile: {
                beginners: members.filter(id => beginners.some(b => b.id === id)).length,
                intermediate: members.filter(id => intermediate.some(int => int.id === id)).length,
                advanced: members.filter(id => advanced.some(a => a.id === id)).length
              }
            })
          }
        }
        
        return {
          type: 'social',
          description: 'Mix skill levels to promote peer teaching and collaboration',
          confidence: 0.80,
          groups
        }
      }
      
      case 'random': {
        // Shuffle students randomly
        const shuffled = [...students].sort(() => Math.random() - 0.5)
        const groups: SmartGroupingSuggestion['groups'] = []
        
        for (let i = 0; i < roomCount; i++) {
          const startIdx = i * config.participantsPerRoom
          const members = shuffled.slice(startIdx, startIdx + config.participantsPerRoom).map(s => s.id)
          
          if (members.length > 0) {
            groups.push({
              roomIndex: i,
              members,
              rationale: 'Random distribution for unbiased group formation',
              predictedOutcome: 'Natural group dynamics and diverse interactions',
              skillProfile: {
                beginners: members.filter(id => beginners.some(b => b.id === id)).length,
                intermediate: members.filter(id => intermediate.some(int => int.id === id)).length,
                advanced: members.filter(id => advanced.some(a => a.id === id)).length
              }
            })
          }
        }
        
        return {
          type: 'random',
          description: 'Randomly distribute students across groups',
          confidence: 0.70,
          groups
        }
      }
      
      default:
        return undefined
    }
  }, [students, config])
  
  const suggestion = useMemo(() => {
    if (config.distributionMode === 'manual' || config.distributionMode === 'self_select') {
      return undefined
    }
    return generateSmartGrouping()
  }, [generateSmartGrouping, config.distributionMode])
  
  return { suggestion }
}

// Helper to calculate optimal room count based on student count
export function calculateOptimalRoomCount(studentCount: number): number {
  if (studentCount <= 4) return 1
  if (studentCount <= 8) return 2
  if (studentCount <= 15) return 3
  if (studentCount <= 24) return 4
  if (studentCount <= 35) return 5
  return Math.min(10, Math.ceil(studentCount / 6))
}
