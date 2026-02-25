/**
 * Branch Manager Component
 * 
 * Allows creating, switching, and merging branches for whiteboard versions.
 */

'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  GitBranch, 
  Plus, 
  Check, 
  GitMerge,
  MoreHorizontal,
  Trash2,
  ArrowRightLeft
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import type { Branch, BranchComparison } from '@/lib/whiteboard/branching'

interface BranchManagerProps {
  branches: Branch[]
  activeBranchId: string | null
  onCreateBranch: (name: string, description?: string) => void
  onSwitchBranch: (branchId: string) => void
  onDeleteBranch: (branchId: string) => void
  onCompareBranches: (baseId: string, compareId: string) => BranchComparison | null
  onMergeBranch: (sourceId: string, strategy: 'theirs' | 'ours' | 'manual') => void
  className?: string
}

export function BranchManager({
  branches,
  activeBranchId,
  onCreateBranch,
  onSwitchBranch,
  onDeleteBranch,
  onCompareBranches,
  onMergeBranch,
  className,
}: BranchManagerProps) {
  const [newBranchName, setNewBranchName] = useState('')
  const [newBranchDescription, setNewBranchDescription] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [comparingBranchId, setComparingBranchId] = useState<string | null>(null)
  const [comparison, setComparison] = useState<BranchComparison | null>(null)

  const handleCreate = useCallback(() => {
    if (newBranchName.trim()) {
      onCreateBranch(newBranchName.trim(), newBranchDescription.trim())
      setNewBranchName('')
      setNewBranchDescription('')
      setIsCreating(false)
    }
  }, [newBranchName, newBranchDescription, onCreateBranch])

  const handleCompare = useCallback((baseId: string, compareId: string) => {
    const result = onCompareBranches(baseId, compareId)
    setComparison(result)
    setComparingBranchId(compareId)
  }, [onCompareBranches])

  const activeBranch = branches.find(b => b.id === activeBranchId)
  const mainBranch = branches.find(b => b.name === 'main')

  return (
    <div className={cn('bg-white border rounded-lg shadow-sm', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">Branches</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1"
          onClick={() => setIsCreating(true)}
        >
          <Plus className="w-3 h-3" />
          New
        </Button>
      </div>

      {/* Create Branch Dialog */}
      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Branch</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={newBranchName}
                onChange={(e) => setNewBranchName(e.target.value)}
                placeholder="e.g., Try Alternative Approach"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description (optional)</label>
              <Input
                value={newBranchDescription}
                onChange={(e) => setNewBranchDescription(e.target.value)}
                placeholder="What are you trying?"
                className="mt-1"
              />
            </div>
            <Button onClick={handleCreate} className="w-full">
              Create Branch
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Branch List */}
      <div className="max-h-64 overflow-y-auto">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className={cn(
              'flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0',
              branch.id === activeBranchId && 'bg-blue-50 hover:bg-blue-50'
            )}
            onClick={() => onSwitchBranch(branch.id)}
          >
            <div className="flex items-center gap-3">
              {/* Branch color indicator */}
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: branch.color }}
              />
              
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{branch.name}</span>
                  {branch.id === activeBranchId && (
                    <Check className="w-3 h-3 text-blue-500" />
                  )}
                  {branch.isMerged && (
                    <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                      Merged
                    </span>
                  )}
                </div>
                {branch.description && (
                  <p className="text-xs text-gray-500">{branch.description}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {branch.id !== activeBranchId && (
                  <DropdownMenuItem onClick={() => onSwitchBranch(branch.id)}>
                    <ArrowRightLeft className="w-4 h-4 mr-2" />
                    Switch
                  </DropdownMenuItem>
                )}
                {branch.id !== activeBranchId && branch.id !== mainBranch?.id && (
                  <>
                    <DropdownMenuItem onClick={() => handleCompare(activeBranchId || '', branch.id)}>
                      <GitMerge className="w-4 h-4 mr-2" />
                      Compare & Merge
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDeleteBranch(branch.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>

      {/* Comparison Dialog */}
      {comparison && (
        <Dialog open={!!comparison} onOpenChange={() => setComparison(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Compare Branches</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-green-50 p-3 rounded">
                  <div className="text-2xl font-bold text-green-600">{comparison.added.length}</div>
                  <div className="text-xs text-green-600">Added</div>
                </div>
                <div className="bg-red-50 p-3 rounded">
                  <div className="text-2xl font-bold text-red-600">{comparison.removed.length}</div>
                  <div className="text-xs text-red-600">Removed</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded">
                  <div className="text-2xl font-bold text-yellow-600">{comparison.modified.length}</div>
                  <div className="text-xs text-yellow-600">Modified</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    onMergeBranch(comparingBranchId || '', 'theirs')
                    setComparison(null)
                  }}
                >
                  Use Theirs
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => {
                    onMergeBranch(comparingBranchId || '', 'manual')
                    setComparison(null)
                  }}
                >
                  Manual Merge
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
