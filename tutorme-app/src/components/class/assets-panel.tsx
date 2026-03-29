'use client'

/**
 * Assets Panel (Smart Assistant Edition)
 * PRO FEATURES:
 * - Smart Recommendations based on Student Context
 * - Resizable Panels Layout
 * - Glassmorphism UI
 */

import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Folder,
  FolderOpen,
  FileText,
  FileQuestion,
  ClipboardCheck,
  StickyNote,
  ChevronRight,
  ChevronDown,
  Plus,
  MoreVertical,
  Search,
  Upload,
  File,
  BookOpen,
  GraduationCap,
  Layers,
  Edit,
  Trash2,
  Download,
  Eye,
  Sparkles,
  Zap,
  Layout,
  X,
} from 'lucide-react'
import { toast } from 'sonner'
import { MemoryService } from '@/lib/ai/memory-service.client'

type AssetType = 'subject' | 'lesson' | 'task' | 'assessment' | 'note'

interface Asset {
  id: string
  name: string
  type: AssetType
  parentId: string | null
  createdAt: Date
  updatedAt: Date
  content?: string
  fileUrl?: string
  fileType?: string
  description?: string
  metadata?: {
    taskType?: string
    difficulty?: string
    duration?: number
    topic?: string
    tags?: string[]
  }
}

interface StudentStub {
  id: string
  name: string
  status: 'active' | 'struggling' | 'idle' | 'needs_help'
  // In a real app we'd pull full context, here we simulate filtered view
  struggles?: string[]
}

interface AssetsPanelProps {
  roomId: string
  students?: StudentStub[]
  onAssetSelect?: (asset: Asset) => void
  onAssetCreate?: (asset: Partial<Asset>) => void
  onAssetDelete?: (assetId: string) => void
  selectionMode?: boolean
  onAssetsSelect?: (assets: Asset[]) => void
  onClose?: () => void
}

const typeIcons: Record<AssetType, typeof File> = {
  subject: GraduationCap,
  lesson: BookOpen,
  task: FileQuestion,
  assessment: ClipboardCheck,
  note: StickyNote,
}

const typeColors: Record<AssetType, string> = {
  subject: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  lesson: 'bg-green-500/20 text-green-400 border-green-500/50',
  task: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
  assessment: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  note: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
}

const typeLabels: Record<AssetType, string> = {
  subject: 'Subject',
  lesson: 'Lesson',
  task: 'Task',
  assessment: 'Assessment',
  note: 'Note',
}

// Mock data - in production this would come from API
const mockAssets: Asset[] = [
  {
    id: 'sub-1',
    name: 'Mathematics',
    type: 'subject',
    parentId: null,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-02-10'),
    description: 'Mathematics curriculum materials',
    metadata: { topic: 'math' },
  },
  {
    id: 'les-1',
    name: 'Algebra Basics',
    type: 'lesson',
    parentId: 'sub-1',
    createdAt: new Date('2026-01-16'),
    updatedAt: new Date('2026-01-20'),
    description: 'Introduction to algebra',
    metadata: { topic: 'algebra', tags: ['variables', 'equations'] },
  },
  {
    id: 'les-2',
    name: 'Linear Equations',
    type: 'lesson',
    parentId: 'sub-1',
    createdAt: new Date('2026-01-18'),
    updatedAt: new Date('2026-01-25'),
    metadata: { topic: 'algebra', tags: ['linear_equations'] },
  },
  // Adding specific assets for recommendation demo
  {
    id: 'task-101',
    name: 'Quadratic Formula Practice',
    type: 'task',
    parentId: 'les-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    description: 'Targeted practice for finding roots.',
    metadata: { topic: 'quadratic_equations', tags: ['finding_roots'], difficulty: 'hard' },
  },
  {
    id: 'task-1',
    name: 'Practice Problems Set 1',
    type: 'task',
    parentId: 'les-1',
    createdAt: new Date('2026-01-17'),
    updatedAt: new Date('2026-01-17'),
    metadata: { taskType: 'multiple_choice', difficulty: 'beginner' },
  },
  {
    id: 'task-2',
    name: 'Quiz: Variables',
    type: 'task',
    parentId: 'les-1',
    createdAt: new Date('2026-01-19'),
    updatedAt: new Date('2026-01-19'),
    metadata: { taskType: 'short_answer', difficulty: 'intermediate' },
  },
  {
    id: 'assess-1',
    name: 'Algebra Mid-Assessment',
    type: 'assessment',
    parentId: 'sub-1',
    createdAt: new Date('2026-01-30'),
    updatedAt: new Date('2026-02-01'),
    metadata: { duration: 45 },
  },
  {
    id: 'note-1',
    name: 'Teaching Notes',
    type: 'note',
    parentId: 'les-1',
    createdAt: new Date('2026-01-16'),
    updatedAt: new Date('2026-02-05'),
    content: 'Focus on real-world examples. Students struggle with negative numbers.',
  },
  {
    id: 'sub-2',
    name: 'Physics',
    type: 'subject',
    parentId: null,
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-02-08'),
    description: 'Physics curriculum',
  },
  {
    id: 'les-3',
    name: 'Mechanics',
    type: 'lesson',
    parentId: 'sub-2',
    createdAt: new Date('2026-01-12'),
    updatedAt: new Date('2026-01-15'),
    metadata: { tags: ['force', 'motion'] },
  },
  {
    id: 'task-3',
    name: 'Force Problems',
    type: 'task',
    parentId: 'les-3',
    createdAt: new Date('2026-01-13'),
    updatedAt: new Date('2026-01-14'),
    metadata: { difficulty: 'intermediate' },
  },
]

export function AssetsPanel({
  roomId,
  students = [],
  onAssetSelect,
  onAssetCreate,
  onAssetDelete,
  selectionMode,
  onAssetsSelect,
  onClose,
}: AssetsPanelProps) {
  const [assets, setAssets] = useState<Asset[]>(mockAssets)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['sub-1', 'sub-2']))
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [viewMode, setViewMode] = useState<'tree' | 'list'>('tree')
  const [selectedAssets, setSelectedAssets] = useState<Set<string>>(new Set())

  const handleCheckboxChange = (assetId: string, checked: boolean) => {
    setSelectedAssets(prev => {
      const next = new Set(prev)
      if (checked) next.add(assetId)
      else next.delete(assetId)
      return next
    })
  }

  const handleConfirmSelection = () => {
    const selected = assets.filter(a => selectedAssets.has(a.id))
    onAssetsSelect?.(selected)
  }

  // Smart Recommendations Logic
  const recommendedAssets = useMemo(() => {
    // 1. Identify active struggles from connected students
    const struggleTopics = new Set<string>()
    students.forEach(s => {
      if (s.status === 'struggling' && s.struggles) {
        s.struggles.forEach(topic => struggleTopics.add(topic.toLowerCase()))
      }
      // For demo, assume 'finding_roots' is a struggle if anyone is struggling
      if (s.status === 'struggling') {
        struggleTopics.add('quadratic_equations')
        struggleTopics.add('finding_roots')
      }
    })

    if (struggleTopics.size === 0) return []

    // 2. Find matching assets
    return assets.filter(asset => {
      const topicMatch =
        asset.metadata?.topic && struggleTopics.has(asset.metadata.topic.toLowerCase())
      const tagMatch = asset.metadata?.tags?.some(tag => struggleTopics.has(tag.toLowerCase()))
      const textMatch = struggleTopics.has(asset.name.toLowerCase())
      return topicMatch || tagMatch || textMatch
    })
  }, [assets, students])

  // Build tree structure
  const assetTree = useMemo(() => {
    const buildTree = (parentId: string | null): Asset[] => {
      return assets
        .filter(a => a.parentId === parentId)
        .sort((a, b) => {
          // Folders (subjects, lessons) first, then files
          const aIsFolder = a.type === 'subject' || a.type === 'lesson'
          const bIsFolder = b.type === 'subject' || b.type === 'lesson'
          if (aIsFolder && !bIsFolder) return -1
          if (!aIsFolder && bIsFolder) return 1
          return a.name.localeCompare(b.name)
        })
    }
    return buildTree(null)
  }, [assets])

  // Filtered assets for search
  const filteredAssets = useMemo(() => {
    if (!searchQuery) return null
    return assets.filter(
      a =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [assets, searchQuery])

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const getChildAssets = (parentId: string) => {
    return assets.filter(a => a.parentId === parentId).sort((a, b) => a.name.localeCompare(b.name))
  }

  const handleCreateAsset = (type: AssetType, parentId: string | null = null) => {
    const newAsset: Asset = {
      id: `${type}-${Date.now()}`,
      name: `New ${typeLabels[type]}`,
      type,
      parentId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setAssets(prev => [...prev, newAsset])
    if (parentId) {
      setExpandedFolders(prev => new Set(prev).add(parentId))
    }
    toast.success(`Created new ${typeLabels[type]}`)
    onAssetCreate?.(newAsset)
  }

  const handleDeleteAsset = (asset: Asset, e: React.MouseEvent) => {
    e.stopPropagation()
    // Delete all children recursively
    const deleteRecursive = (id: string) => {
      const children = assets.filter(a => a.parentId === id)
      children.forEach(child => deleteRecursive(child.id))
      setAssets(prev => prev.filter(a => a.id !== id))
    }
    deleteRecursive(asset.id)
    toast.success('Asset deleted')
    onAssetDelete?.(asset.id)
  }

  const AssetIcon = ({ type, isOpen }: { type: AssetType; isOpen?: boolean }) => {
    const Icon =
      type === 'subject' || type === 'lesson' ? (isOpen ? FolderOpen : Folder) : typeIcons[type]
    return <Icon className="h-4 w-4" />
  }

  const renderAssetItem = (asset: Asset, depth: number = 0) => {
    const isFolder = asset.type === 'subject' || asset.type === 'lesson'
    const isExpanded = expandedFolders.has(asset.id)
    const children = isFolder ? getChildAssets(asset.id) : []
    const hasChildren = children.length > 0
    const isSelected = selectedAsset?.id === asset.id

    return (
      <div key={asset.id} className="select-none">
        <div
          className={`group my-0.5 flex cursor-pointer items-center gap-2 rounded-lg border border-transparent px-3 py-2 transition-all duration-200 ${
            isSelected
              ? 'border-blue-500/30 bg-blue-600/20 text-white shadow-sm backdrop-blur-sm'
              : 'text-gray-300 hover:border-white/10 hover:bg-white/5'
          }`}
          style={{ paddingLeft: `${12 + depth * 16}px` }}
          onClick={() => {
            if (isFolder) {
              toggleFolder(asset.id)
            }
            setSelectedAsset(asset)
            onAssetSelect?.(asset)
          }}
        >
          {isFolder && hasChildren ? (
            isExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            )
          ) : (
            <span className="w-4" />
          )}

          {selectionMode && !isFolder && (
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedAssets.has(asset.id)}
              onClick={e => e.stopPropagation()}
              onChange={e => handleCheckboxChange(asset.id, e.target.checked)}
            />
          )}

          <span className={`rounded-md border p-1.5 ${typeColors[asset.type]}`}>
            <AssetIcon type={asset.type} isOpen={isExpanded} />
          </span>

          <span className="flex-1 truncate text-sm font-medium">{asset.name}</span>

          {asset.metadata?.difficulty && (
            <Badge
              variant="outline"
              className={`h-5 px-1 text-[10px] ${
                asset.metadata.difficulty === 'hard'
                  ? 'border-red-500/50 text-red-400'
                  : asset.metadata.difficulty === 'intermediate'
                    ? 'border-yellow-500/50 text-yellow-400'
                    : 'border-green-500/50 text-green-400'
              }`}
            >
              {asset.metadata.difficulty}
            </Badge>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-gray-700 bg-gray-800 text-gray-200">
              <DropdownMenuItem
                onClick={e => {
                  e.stopPropagation()
                  setSelectedAsset(asset)
                }}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={e => e.stopPropagation()}>
                <Edit className="mr-2 h-4 w-4" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={e => e.stopPropagation()}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-400 focus:bg-red-900/20 focus:text-red-400"
                onClick={e => handleDeleteAsset(asset, e)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isFolder && isExpanded && hasChildren && (
          <div className="relative">
            <div
              className="absolute bottom-0 left-[20px] top-0 w-px bg-gray-800"
              style={{ left: `${19 + depth * 16}px` }}
            />
            {children.map(child => renderAssetItem(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col border-l border-white/10 bg-black/40 text-white shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="shrink-0 border-b border-white/10 bg-white/5 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="shrink-0 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 shadow-lg shadow-orange-900/20">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-lg font-bold text-transparent">
                Smart Assets
              </h2>
              <p className="text-xs text-gray-400">AI-Curated Materials</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-full p-0 hover:bg-white/10"
              onClick={() => setViewMode(viewMode === 'tree' ? 'list' : 'tree')}
            >
              <Layout className="h-4 w-4" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="border border-blue-400/20 bg-blue-600 text-white shadow-lg shadow-blue-900/20 hover:bg-blue-500"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New
                </Button>
              </DialogTrigger>
              <DialogContent className="border-gray-700 bg-gray-900/95 text-white backdrop-blur-xl">
                <DialogHeader>
                  <DialogTitle>Create New Asset</DialogTitle>
                </DialogHeader>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="flex h-auto flex-col items-center gap-2 border-gray-700 py-4 hover:bg-white/5"
                    onClick={() => handleCreateAsset('subject')}
                  >
                    <GraduationCap className="h-6 w-6 text-blue-400" />
                    <span>Subject</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex h-auto flex-col items-center gap-2 border-gray-700 py-4 hover:bg-white/5"
                    onClick={() => handleCreateAsset('lesson')}
                  >
                    <BookOpen className="h-6 w-6 text-green-400" />
                    <span>Lesson</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex h-auto flex-col items-center gap-2 border-gray-700 py-4 hover:bg-white/5"
                    onClick={() => handleCreateAsset('task')}
                  >
                    <FileQuestion className="h-6 w-6 text-orange-400" />
                    <span>Task</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex h-auto flex-col items-center gap-2 border-gray-700 py-4 hover:bg-white/5"
                    onClick={() => handleCreateAsset('assessment')}
                  >
                    <ClipboardCheck className="h-6 w-6 text-purple-400" />
                    <span>Assessment</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="col-span-2 flex h-auto flex-col items-center gap-2 border-gray-700 py-4 hover:bg-white/5"
                    onClick={() => handleCreateAsset('note')}
                  >
                    <StickyNote className="h-6 w-6 text-yellow-400" />
                    <span>Note</span>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            {selectionMode && onClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="group relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500 transition-colors group-focus-within:text-blue-400" />
          <Input
            placeholder="Search assets..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="rounded-xl border-white/10 bg-black/20 pl-10 text-white transition-all focus:border-blue-500/50 focus:bg-black/40"
          />
        </div>
      </div>

      {/* Content Area with Resizable Panels */}
      <PanelGroup orientation="horizontal" className="min-h-0 flex-1">
        {/* Left Panel: Asset List */}
        <Panel defaultSize={60} minSize={30}>
          <ScrollArea className="h-full">
            {/* Smart Recommendations Section */}
            {recommendedAssets.length > 0 && !searchQuery && (
              <div className="border-b border-white/5 bg-gradient-to-b from-blue-900/10 to-transparent p-4 pb-2">
                <div className="mb-3 flex items-center gap-2 text-blue-300">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Recommended for Class
                  </span>
                </div>
                <div className="space-y-1">
                  {recommendedAssets.map(asset => renderAssetItem(asset))}
                </div>
              </div>
            )}

            <div className="p-4">
              <div className="mb-3 flex items-center gap-2 text-gray-500">
                <Folder className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">All Library</span>
              </div>

              {searchQuery ? (
                // Search results
                filteredAssets && filteredAssets.length > 0 ? (
                  <div className="space-y-1">
                    {filteredAssets.map(asset => renderAssetItem(asset, 0))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-gray-500">
                    <Search className="mx-auto mb-3 h-12 w-12 opacity-20" />
                    <p>No assets found</p>
                  </div>
                )
              ) : (
                // Tree view
                <div className="space-y-1">
                  {assetTree.length > 0 ? (
                    assetTree.map(asset => (
                      <div key={asset.id} className="group">
                        {renderAssetItem(asset, 0)}
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center text-gray-500">
                      <Folder className="mx-auto mb-3 h-12 w-12 opacity-20" />
                      <p>No assets yet</p>
                      <Button variant="link" onClick={() => handleCreateAsset('subject')}>
                        Create Subject
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </Panel>

        {/* Resizer Handle */}
        <PanelResizeHandle className="w-1 cursor-col-resize bg-white/5 transition-colors hover:bg-blue-500/50 active:bg-blue-600" />

        {/* Right Panel: Preview (Collapsible?) */}
        {selectedAsset && (
          <Panel defaultSize={40} minSize={20}>
            <div className="flex h-full flex-col border-l border-white/5 bg-black/20 backdrop-blur-md">
              <ScrollArea className="flex-1 p-5">
                <div className="mb-6 flex items-start gap-4">
                  <div className={`rounded-xl p-3 shadow-lg ${typeColors[selectedAsset.type]}`}>
                    <AssetIcon type={selectedAsset.type} />
                  </div>
                  <div className="min-w-0 flex-1 pt-1">
                    <h3 className="truncate text-lg font-bold leading-tight text-white">
                      {selectedAsset.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-blue-300/80">
                      {typeLabels[selectedAsset.type]}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {selectedAsset.description && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Description
                      </h4>
                      <p className="rounded-lg border border-white/5 bg-white/5 p-3 text-sm leading-relaxed text-gray-300">
                        {selectedAsset.description}
                      </p>
                    </div>
                  )}

                  {selectedAsset.metadata && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Details
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedAsset.metadata.taskType && (
                          <div className="rounded border border-white/5 bg-white/5 p-2">
                            <span className="block text-[10px] uppercase text-gray-500">Type</span>
                            <span className="text-sm capitalize">
                              {selectedAsset.metadata.taskType.replace('_', ' ')}
                            </span>
                          </div>
                        )}
                        {selectedAsset.metadata.difficulty && (
                          <div className="rounded border border-white/5 bg-white/5 p-2">
                            <span className="block text-[10px] uppercase text-gray-500">
                              Difficulty
                            </span>
                            <span
                              className={`text-sm font-medium capitalize ${
                                selectedAsset.metadata.difficulty === 'hard'
                                  ? 'text-red-400'
                                  : selectedAsset.metadata.difficulty === 'intermediate'
                                    ? 'text-yellow-400'
                                    : 'text-green-400'
                              }`}
                            >
                              {selectedAsset.metadata.difficulty}
                            </span>
                          </div>
                        )}
                        {selectedAsset.metadata.duration && (
                          <div className="rounded border border-white/5 bg-white/5 p-2">
                            <span className="block text-[10px] uppercase text-gray-500">
                              Duration
                            </span>
                            <span className="text-sm">{selectedAsset.metadata.duration} min</span>
                          </div>
                        )}
                        {selectedAsset.metadata.topic && (
                          <div className="rounded border border-white/5 bg-white/5 p-2">
                            <span className="block text-[10px] uppercase text-gray-500">Topic</span>
                            <span className="text-sm capitalize">
                              {selectedAsset.metadata.topic}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedAsset.content && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Preview
                      </h4>
                      <div className="max-h-60 overflow-y-auto rounded-lg border border-white/10 bg-black/40 p-4 font-mono text-sm text-gray-300 shadow-inner">
                        {selectedAsset.content}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="space-y-3 border-t border-white/10 bg-black/20 p-4 backdrop-blur-sm">
                <div className="flex justify-between text-[10px] font-medium uppercase tracking-wider text-gray-500">
                  <span>Created {selectedAsset.createdAt.toLocaleDateString()}</span>
                  <span>Updated {selectedAsset.updatedAt.toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-white/10 text-gray-300 hover:bg-white/5"
                  >
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button className="flex-1 bg-blue-600 text-white shadow-lg shadow-blue-900/20 hover:bg-blue-500">
                    <Zap className="mr-2 h-4 w-4" /> Open
                  </Button>
                </div>
              </div>
            </div>
          </Panel>
        )}
      </PanelGroup>

      {/* Footer Stats */}
      <div className="flex shrink-0 items-center justify-between border-t border-white/10 bg-black/30 p-2 px-4 text-[10px] font-medium uppercase tracking-wider text-gray-500 backdrop-blur-sm">
        <div className="flex gap-4">
          <span>{assets.filter(a => a.type === 'subject').length} Subjects</span>
          <span>{assets.filter(a => a.type === 'lesson').length} Lessons</span>
          <span>{assets.filter(a => a.type === 'task').length} Tasks</span>
        </div>
        <span>{assets.length} Assets</span>
      </div>

      {/* Selection Mode Footer */}
      {selectionMode && (
        <div className="flex items-center justify-between border-t border-white/10 bg-black/40 p-4 backdrop-blur-sm">
          <span className="text-sm text-gray-400">{selectedAssets.size} selected</span>
          <Button
            onClick={handleConfirmSelection}
            disabled={selectedAssets.size === 0}
            size="sm"
            className="bg-purple-600 hover:bg-purple-500"
          >
            Select {selectedAssets.size > 0 ? `(${selectedAssets.size})` : ''}
          </Button>
        </div>
      )}
    </div>
  )
}
