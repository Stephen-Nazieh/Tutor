/**
 * Branching Versions System
 * 
 * Features:
 * - Create branches for alternative approaches
 * - Compare branches side-by-side
 * - Merge branches with conflict resolution
 * - Branch history and metadata
 */

import type { WhiteboardStroke } from '@/hooks/use-live-class-whiteboard'
import type { DurableOperation } from './durability'

export interface Branch {
  id: string
  name: string
  description?: string
  parentBranchId: string | null
  parentSeq: number
  createdAt: number
  createdBy: string
  strokes: WhiteboardStroke[]
  operations: DurableOperation[]
  isActive: boolean
  isMerged: boolean
  mergedInto?: string
  mergeSeq?: number
  color: string
}

export interface BranchComparison {
  baseBranch: string
  compareBranch: string
  added: WhiteboardStroke[]
  removed: WhiteboardStroke[]
  modified: Array<{
    strokeId: string
    base: WhiteboardStroke
    compare: WhiteboardStroke
    differences: string[]
  }>
  unchanged: WhiteboardStroke[]
}

export interface MergeConflict {
  strokeId: string
  base: WhiteboardStroke | null
  theirs: WhiteboardStroke | null
  ours: WhiteboardStroke | null
  resolution?: 'theirs' | 'ours' | 'custom'
  customStroke?: WhiteboardStroke
}

export interface MergeResult {
  success: boolean
  conflicts: MergeConflict[]
  mergedStrokes: WhiteboardStroke[]
  mergedBranchId?: string
}

export interface BranchStats {
  totalStrokes: number
  totalOperations: number
  lastModified: number
  contributors: string[]
  complexity: number
}

const BRANCH_COLORS = [
  '#3b82f6', // Blue
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#84cc16', // Lime
]

export class BranchingManager {
  private branches = new Map<string, Branch>()
  private activeBranchId: string | null = null
  private mainBranchId: string | null = null

  constructor(
    private readonly userId: string,
    initialStrokes: WhiteboardStroke[] = []
  ) {
    // Create main branch
    const mainBranch = this.createBranch('main', null, initialStrokes)
    this.mainBranchId = mainBranch.id
    this.activeBranchId = mainBranch.id
  }

  /**
   * Create a new branch
   */
  createBranch(
    name: string,
    parentBranchId: string | null = null,
    initialStrokes?: WhiteboardStroke[],
    description?: string
  ): Branch {
    const parentBranch = parentBranchId ? this.branches.get(parentBranchId) : null
    
    const branch: Branch = {
      id: `branch-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      name,
      description,
      parentBranchId: parentBranchId,
      parentSeq: parentBranch ? parentBranch.operations.length : 0,
      createdAt: Date.now(),
      createdBy: this.userId,
      strokes: initialStrokes ? [...initialStrokes] : parentBranch ? [...parentBranch.strokes] : [],
      operations: [],
      isActive: false,
      isMerged: false,
      color: this.assignBranchColor(),
    }

    this.branches.set(branch.id, branch)
    return branch
  }

  /**
   * Switch to a different branch
   */
  switchBranch(branchId: string): boolean {
    const branch = this.branches.get(branchId)
    if (!branch) return false

    // Deactivate current branch
    if (this.activeBranchId) {
      const current = this.branches.get(this.activeBranchId)
      if (current) {
        current.isActive = false
      }
    }

    // Activate new branch
    branch.isActive = true
    this.activeBranchId = branchId

    return true
  }

  /**
   * Get the active branch
   */
  getActiveBranch(): Branch | null {
    if (!this.activeBranchId) return null
    return this.branches.get(this.activeBranchId) || null
  }

  /**
   * Get the main branch
   */
  getMainBranch(): Branch | null {
    if (!this.mainBranchId) return null
    return this.branches.get(this.mainBranchId) || null
  }

  /**
   * Get all branches
   */
  getAllBranches(): Branch[] {
    return Array.from(this.branches.values())
  }

  /**
   * Get branch by ID
   */
  getBranch(branchId: string): Branch | null {
    return this.branches.get(branchId) || null
  }

  /**
   * Rename a branch
   */
  renameBranch(branchId: string, newName: string): boolean {
    const branch = this.branches.get(branchId)
    if (!branch) return false

    branch.name = newName
    return true
  }

  /**
   * Delete a branch
   */
  deleteBranch(branchId: string): boolean {
    if (branchId === this.mainBranchId) {
      throw new Error('Cannot delete main branch')
    }

    const branch = this.branches.get(branchId)
    if (!branch) return false

    // If this is the active branch, switch to main
    if (this.activeBranchId === branchId) {
      this.switchBranch(this.mainBranchId!)
    }

    this.branches.delete(branchId)
    return true
  }

  /**
   * Add an operation to the active branch
   */
  addOperation(operation: DurableOperation): boolean {
    const branch = this.getActiveBranch()
    if (!branch) return false

    branch.operations.push(operation)
    
    // Apply to strokes if it's a stroke operation
    if (operation.type === 'stroke' && operation.payload) {
      const stroke = operation.payload as WhiteboardStroke
      branch.strokes.push(stroke)
    }

    return true
  }

  /**
   * Update strokes in active branch
   */
  updateStrokes(strokes: WhiteboardStroke[]): void {
    const branch = this.getActiveBranch()
    if (branch) {
      branch.strokes = [...strokes]
    }
  }

  /**
   * Compare two branches
   */
  compareBranches(baseBranchId: string, compareBranchId: string): BranchComparison {
    const baseBranch = this.branches.get(baseBranchId)
    const compareBranch = this.branches.get(compareBranchId)

    if (!baseBranch || !compareBranch) {
      throw new Error('Branch not found')
    }

    const baseStrokes = new Map(baseBranch.strokes.map((s) => [s.id, s]))
    const compareStrokes = new Map(compareBranch.strokes.map((s) => [s.id, s]))

    const added: WhiteboardStroke[] = []
    const removed: WhiteboardStroke[] = []
    const modified: BranchComparison['modified'] = []
    const unchanged: WhiteboardStroke[] = []

    // Find added and modified
    compareStrokes.forEach((stroke, id) => {
      const baseStroke = baseStrokes.get(id)
      if (!baseStroke) {
        added.push(stroke)
      } else if (!this.strokesEqual(baseStroke, stroke)) {
        modified.push({
          strokeId: id,
          base: baseStroke,
          compare: stroke,
          differences: this.findDifferences(baseStroke, stroke),
        })
      } else {
        unchanged.push(stroke)
      }
    })

    // Find removed
    baseStrokes.forEach((stroke, id) => {
      if (!compareStrokes.has(id)) {
        removed.push(stroke)
      }
    })

    return {
      baseBranch: baseBranchId,
      compareBranch: compareBranchId,
      added,
      removed,
      modified,
      unchanged,
    }
  }

  /**
   * Merge a branch into the active branch
   */
  mergeBranch(
    sourceBranchId: string,
    strategy: 'theirs' | 'ours' | 'manual' = 'manual'
  ): MergeResult {
    const targetBranch = this.getActiveBranch()
    const sourceBranch = this.branches.get(sourceBranchId)

    if (!targetBranch || !sourceBranch) {
      return { success: false, conflicts: [], mergedStrokes: [] }
    }

    if (sourceBranch.isMerged) {
      throw new Error('Branch is already merged')
    }

    const comparison = this.compareBranches(targetBranch.id, sourceBranchId)
    const conflicts: MergeConflict[] = []
    const mergedStrokes: WhiteboardStroke[] = [...targetBranch.strokes]

    // Handle added strokes (no conflict)
    comparison.added.forEach((stroke) => {
      mergedStrokes.push(stroke)
    })

    // Handle removed strokes
    comparison.removed.forEach((stroke) => {
      const index = mergedStrokes.findIndex((s) => s.id === stroke.id)
      if (index !== -1) {
        if (strategy === 'theirs') {
          // Remove it
          mergedStrokes.splice(index, 1)
        } else if (strategy === 'manual') {
          conflicts.push({
            strokeId: stroke.id,
            base: stroke,
            theirs: null,
            ours: stroke,
          })
        }
        // For 'ours', keep it (do nothing)
      }
    })

    // Handle modified strokes (potential conflicts)
    comparison.modified.forEach((diff) => {
      if (strategy === 'theirs') {
        // Use theirs
        const index = mergedStrokes.findIndex((s) => s.id === diff.strokeId)
        if (index !== -1) {
          mergedStrokes[index] = diff.compare
        }
      } else if (strategy === 'ours') {
        // Use ours (do nothing)
      } else {
        // Manual resolution needed
        conflicts.push({
          strokeId: diff.strokeId,
          base: diff.base,
          theirs: diff.compare,
          ours: mergedStrokes.find((s) => s.id === diff.strokeId) || null,
        })
      }
    })

    // If no conflicts or strategy is automatic, apply merge
    const success = conflicts.length === 0 || strategy !== 'manual'

    if (success) {
      targetBranch.strokes = mergedStrokes
      sourceBranch.isMerged = true
      sourceBranch.mergedInto = targetBranch.id
      sourceBranch.mergeSeq = targetBranch.operations.length
    }

    return {
      success,
      conflicts,
      mergedStrokes,
      mergedBranchId: success ? targetBranch.id : undefined,
    }
  }

  /**
   * Resolve a merge conflict
   */
  resolveConflict(
    mergeResult: MergeResult,
    strokeId: string,
    resolution: MergeConflict['resolution'],
    customStroke?: WhiteboardStroke
  ): MergeResult {
    const conflictIndex = mergeResult.conflicts.findIndex((c) => c.strokeId === strokeId)
    if (conflictIndex === -1) return mergeResult

    const conflict = mergeResult.conflicts[conflictIndex]
    conflict.resolution = resolution
    conflict.customStroke = customStroke

    // Apply resolution
    const targetBranch = this.getActiveBranch()
    if (!targetBranch) return mergeResult

    const index = targetBranch.strokes.findIndex((s) => s.id === strokeId)

    if (resolution === 'theirs' && conflict.theirs) {
      if (index !== -1) {
        targetBranch.strokes[index] = conflict.theirs
      }
    } else if (resolution === 'ours' && conflict.ours) {
      // Already ours, do nothing
    } else if (resolution === 'custom' && customStroke) {
      if (index !== -1) {
        targetBranch.strokes[index] = customStroke
      }
    }

    // Remove resolved conflict
    mergeResult.conflicts.splice(conflictIndex, 1)

    // If all conflicts resolved, complete merge
    if (mergeResult.conflicts.length === 0) {
      mergeResult.success = true
      mergeResult.mergedStrokes = targetBranch.strokes

      const sourceBranch = this.branches.get(mergeResult.mergedBranchId || '')
      if (sourceBranch) {
        sourceBranch.isMerged = true
        sourceBranch.mergedInto = targetBranch.id
      }
    }

    return mergeResult
  }

  /**
   * Get branch statistics
   */
  getBranchStats(branchId: string): BranchStats | null {
    const branch = this.branches.get(branchId)
    if (!branch) return null

    const contributors = new Set<string>()
    branch.operations.forEach((op) => contributors.add(op.userId))

    return {
      totalStrokes: branch.strokes.length,
      totalOperations: branch.operations.length,
      lastModified: branch.operations.length > 0
        ? branch.operations[branch.operations.length - 1].timestamp
        : branch.createdAt,
      contributors: Array.from(contributors),
      complexity: this.calculateComplexity(branch),
    }
  }

  /**
   * Get branch lineage (ancestor chain)
   */
  getBranchLineage(branchId: string): Branch[] {
    const lineage: Branch[] = []
    let current: Branch | undefined = this.branches.get(branchId)

    while (current) {
      lineage.unshift(current)
      current = current.parentBranchId
        ? this.branches.get(current.parentBranchId)
        : undefined
    }

    return lineage
  }

  /**
   * Get child branches
   */
  getChildBranches(parentBranchId: string): Branch[] {
    return Array.from(this.branches.values()).filter(
      (b) => b.parentBranchId === parentBranchId
    )
  }

  /**
   * Export branch as JSON
   */
  exportBranch(branchId: string): string {
    const branch = this.branches.get(branchId)
    if (!branch) throw new Error('Branch not found')

    return JSON.stringify({
      ...branch,
      exportedAt: Date.now(),
    })
  }

  /**
   * Import branch from JSON
   */
  importBranch(json: string): Branch {
    const data = JSON.parse(json)
    const branch: Branch = {
      ...data,
      isActive: false, // Never activate imported branch automatically
      color: this.assignBranchColor(),
    }

    this.branches.set(branch.id, branch)
    return branch
  }

  /**
   * Assign a color to a branch
   */
  private assignBranchColor(): string {
    const usedColors = new Set(Array.from(this.branches.values()).map((b) => b.color))
    
    for (const color of BRANCH_COLORS) {
      if (!usedColors.has(color)) {
        return color
      }
    }

    // If all colors used, cycle through
    return BRANCH_COLORS[this.branches.size % BRANCH_COLORS.length]
  }

  /**
   * Check if two strokes are equal
   */
  private strokesEqual(a: WhiteboardStroke, b: WhiteboardStroke): boolean {
    return (
      a.id === b.id &&
      a.color === b.color &&
      a.width === b.width &&
      JSON.stringify(a.points) === JSON.stringify(b.points)
    )
  }

  /**
   * Find differences between two strokes
   */
  private findDifferences(a: WhiteboardStroke, b: WhiteboardStroke): string[] {
    const differences: string[] = []

    if (a.color !== b.color) differences.push('color')
    if (a.width !== b.width) differences.push('width')
    if (JSON.stringify(a.points) !== JSON.stringify(b.points)) differences.push('points')
    if (a.type !== b.type) differences.push('type')

    return differences
  }

  /**
   * Calculate branch complexity
   */
  private calculateComplexity(branch: Branch): number {
    // Simple complexity metric based on stroke count and variety
    const uniqueColors = new Set(branch.strokes.map((s) => s.color)).size
    const uniqueTypes = new Set(branch.strokes.map((s) => s.type)).size
    
    return branch.strokes.length * (1 + uniqueColors * 0.1 + uniqueTypes * 0.2)
  }
}

/**
 * Create a visual diff representation
 */
export function createVisualDiff(
  comparison: BranchComparison,
  width: number,
  height: number
): string {
  // This would create an SVG or canvas representation of the differences
  // For now, return a simple placeholder
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="100%" height="100%" fill="#f8fafc"/>
      <text x="50%" y="50%" text-anchor="middle" fill="#64748b">
        ${comparison.added.length} added, ${comparison.removed.length} removed, ${comparison.modified.length} modified
      </text>
    </svg>
  `
}
