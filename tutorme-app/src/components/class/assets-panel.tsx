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
  X
} from 'lucide-react'
import { toast } from 'sonner'
import { MemoryService } from '@/lib/ai/memory-service'

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
    metadata: { topic: 'math' }
  },
  {
    id: 'les-1',
    name: 'Algebra Basics',
    type: 'lesson',
    parentId: 'sub-1',
    createdAt: new Date('2026-01-16'),
    updatedAt: new Date('2026-01-20'),
    description: 'Introduction to algebra',
    metadata: { topic: 'algebra', tags: ['variables', 'equations'] }
  },
  {
    id: 'les-2',
    name: 'Linear Equations',
    type: 'lesson',
    parentId: 'sub-1',
    createdAt: new Date('2026-01-18'),
    updatedAt: new Date('2026-01-25'),
    metadata: { topic: 'algebra', tags: ['linear_equations'] }
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
    metadata: { topic: 'quadratic_equations', tags: ['finding_roots'], difficulty: 'hard' }
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
    metadata: { tags: ['force', 'motion'] }
  },
  {
    id: 'task-3',
    name: 'Force Problems',
    type: 'task',
    parentId: 'les-3',
    createdAt: new Date('2026-01-13'),
    updatedAt: new Date('2026-01-14'),
    metadata: { difficulty: 'intermediate' }
  },
]

export function AssetsPanel({ roomId, students = [], onAssetSelect, onAssetCreate, onAssetDelete, selectionMode, onAssetsSelect, onClose }: AssetsPanelProps) {
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
      const topicMatch = asset.metadata?.topic && struggleTopics.has(asset.metadata.topic.toLowerCase())
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
    return assets.filter(a =>
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
    return assets
      .filter(a => a.parentId === parentId)
      .sort((a, b) => a.name.localeCompare(b.name))
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
    const Icon = type === 'subject' || type === 'lesson'
      ? (isOpen ? FolderOpen : Folder)
      : typeIcons[type]
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
          className={`group flex items-center gap-2 px-3 py-2 my-0.5 rounded-lg cursor-pointer transition-all duration-200 border border-transparent
            ${isSelected
              ? 'bg-blue-600/20 border-blue-500/30 text-white shadow-sm backdrop-blur-sm'
              : 'hover:bg-white/5 hover:border-white/10 text-gray-300'
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
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => handleCheckboxChange(asset.id, e.target.checked)}
            />
          )}

          <span className={`p-1.5 rounded-md border ${typeColors[asset.type]}`}>
            <AssetIcon type={asset.type} isOpen={isExpanded} />
          </span>

          <span className="flex-1 truncate text-sm font-medium">{asset.name}</span>

          {asset.metadata?.difficulty && (
            <Badge variant="outline" className={`text-[10px] px-1 h-5 ${asset.metadata.difficulty === 'hard' ? 'border-red-500/50 text-red-400' :
              asset.metadata.difficulty === 'intermediate' ? 'border-yellow-500/50 text-yellow-400' :
                'border-green-500/50 text-green-400'
              }`}>
              {asset.metadata.difficulty}
            </Badge>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-gray-200">
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation()
                setSelectedAsset(asset)
              }}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Edit className="h-4 w-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-400 focus:text-red-400 focus:bg-red-900/20"
                onClick={(e) => handleDeleteAsset(asset, e)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isFolder && isExpanded && hasChildren && (
          <div className="relative">
            <div className="absolute left-[20px] top-0 bottom-0 w-px bg-gray-800" style={{ left: `${19 + depth * 16}px` }} />
            {children.map(child => renderAssetItem(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-black/40 backdrop-blur-xl border-l border-white/10 text-white shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-white/10 shrink-0 bg-white/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-xl shadow-lg shadow-orange-900/20 shrink-0">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Smart Assets</h2>
              <p className="text-xs text-gray-400">AI-Curated Materials</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full hover:bg-white/10"
              onClick={() => setViewMode(viewMode === 'tree' ? 'list' : 'tree')}
            >
              <Layout className="h-4 w-4" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 border border-blue-400/20">
                  <Plus className="h-4 w-4 mr-2" />
                  New
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900/95 border-gray-700 text-white backdrop-blur-xl">
                <DialogHeader>
                  <DialogTitle>Create New Asset</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-white/5 border-gray-700"
                    onClick={() => handleCreateAsset('subject')}
                  >
                    <GraduationCap className="h-6 w-6 text-blue-400" />
                    <span>Subject</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-white/5 border-gray-700"
                    onClick={() => handleCreateAsset('lesson')}
                  >
                    <BookOpen className="h-6 w-6 text-green-400" />
                    <span>Lesson</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-white/5 border-gray-700"
                    onClick={() => handleCreateAsset('task')}
                  >
                    <FileQuestion className="h-6 w-6 text-orange-400" />
                    <span>Task</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-white/5 border-gray-700"
                    onClick={() => handleCreateAsset('assessment')}
                  >
                    <ClipboardCheck className="h-6 w-6 text-purple-400" />
                    <span>Assessment</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2 col-span-2 hover:bg-white/5 border-gray-700"
                    onClick={() => handleCreateAsset('note')}
                  >
                    <StickyNote className="h-6 w-6 text-yellow-400" />
                    <span>Note</span>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            {selectionMode && onClose && (
              <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
          <Input
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-black/20 border-white/10 text-white focus:bg-black/40 focus:border-blue-500/50 transition-all rounded-xl"
          />
        </div>
      </div>

      {/* Content Area with Resizable Panels */}
      <PanelGroup orientation="horizontal" className="flex-1 min-h-0">

        {/* Left Panel: Asset List */}
        <Panel defaultSize={60} minSize={30}>
          <ScrollArea className="h-full">
            {/* Smart Recommendations Section */}
            {recommendedAssets.length > 0 && !searchQuery && (
              <div className="p-4 pb-2 border-b border-white/5 bg-gradient-to-b from-blue-900/10 to-transparent">
                <div className="flex items-center gap-2 mb-3 text-blue-300">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Recommended for Class</span>
                </div>
                <div className="space-y-1">
                  {recommendedAssets.map(asset => renderAssetItem(asset))}
                </div>
              </div>
            )}

            <div className="p-4">
              <div className="flex items-center gap-2 mb-3 text-gray-500">
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
                  <div className="text-center py-12 text-gray-500">
                    <Search className="h-12 w-12 mx-auto mb-3 opacity-20" />
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
                    <div className="text-center py-12 text-gray-500">
                      <Folder className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p>No assets yet</p>
                      <Button variant="link" onClick={() => handleCreateAsset('subject')}>Create Subject</Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </Panel>

        {/* Resizer Handle */}
        <PanelResizeHandle className="w-1 bg-white/5 hover:bg-blue-500/50 transition-colors cursor-col-resize active:bg-blue-600" />

        {/* Right Panel: Preview (Collapsible?) */}
        {selectedAsset && (
          <Panel defaultSize={40} minSize={20}>
            <div className="h-full flex flex-col bg-black/20 backdrop-blur-md border-l border-white/5">
              <ScrollArea className="flex-1 p-5">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 rounded-xl shadow-lg ${typeColors[selectedAsset.type]}`}>
                    <AssetIcon type={selectedAsset.type} />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="font-bold text-lg leading-tight truncate text-white">{selectedAsset.name}</h3>
                    <p className="text-xs text-blue-300/80 mt-1 uppercase tracking-wide font-medium">{typeLabels[selectedAsset.type]}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {selectedAsset.description && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description</h4>
                      <p className="text-sm text-gray-300 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
                        {selectedAsset.description}
                      </p>
                    </div>
                  )}

                  {selectedAsset.metadata && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Details</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedAsset.metadata.taskType && (
                          <div className="bg-white/5 p-2 rounded border border-white/5">
                            <span className="block text-[10px] text-gray-500 uppercase">Type</span>
                            <span className="text-sm capitalize">{selectedAsset.metadata.taskType.replace('_', ' ')}</span>
                          </div>
                        )}
                        {selectedAsset.metadata.difficulty && (
                          <div className="bg-white/5 p-2 rounded border border-white/5">
                            <span className="block text-[10px] text-gray-500 uppercase">Difficulty</span>
                            <span className={`text-sm capitalize font-medium ${selectedAsset.metadata.difficulty === 'hard' ? 'text-red-400' :
                              selectedAsset.metadata.difficulty === 'intermediate' ? 'text-yellow-400' :
                                'text-green-400'
                              }`}>
                              {selectedAsset.metadata.difficulty}
                            </span>
                          </div>
                        )}
                        {selectedAsset.metadata.duration && (
                          <div className="bg-white/5 p-2 rounded border border-white/5">
                            <span className="block text-[10px] text-gray-500 uppercase">Duration</span>
                            <span className="text-sm">{selectedAsset.metadata.duration} min</span>
                          </div>
                        )}
                        {selectedAsset.metadata.topic && (
                          <div className="bg-white/5 p-2 rounded border border-white/5">
                            <span className="block text-[10px] text-gray-500 uppercase">Topic</span>
                            <span className="text-sm capitalize">{selectedAsset.metadata.topic}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedAsset.content && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Preview</h4>
                      <div className="bg-black/40 p-4 rounded-lg text-sm font-mono text-gray-300 max-h-60 overflow-y-auto border border-white/10 shadow-inner">
                        {selectedAsset.content}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-sm space-y-3">
                <div className="flex justify-between text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                  <span>Created {selectedAsset.createdAt.toLocaleDateString()}</span>
                  <span>Updated {selectedAsset.updatedAt.toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 border-white/10 hover:bg-white/5 text-gray-300">
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20">
                    <Zap className="h-4 w-4 mr-2" /> Open
                  </Button>
                </div>
              </div>
            </div>
          </Panel>
        )}
      </PanelGroup>

      {/* Footer Stats */}
      <div className="p-2 border-t border-white/10 bg-black/30 backdrop-blur-sm shrink-0 flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-wider font-medium px-4">
        <div className="flex gap-4">
          <span>{assets.filter(a => a.type === 'subject').length} Subjects</span>
          <span>{assets.filter(a => a.type === 'lesson').length} Lessons</span>
          <span>{assets.filter(a => a.type === 'task').length} Tasks</span>
        </div>
        <span>{assets.length} Assets</span>
      </div>

      {/* Selection Mode Footer */}
      {selectionMode && (
        <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-sm flex justify-between items-center">
          <span className="text-sm text-gray-400">{selectedAssets.size} selected</span>
          <Button onClick={handleConfirmSelection} disabled={selectedAssets.size === 0} size="sm" className="bg-purple-600 hover:bg-purple-500">
            Select {selectedAssets.size > 0 ? `(${selectedAssets.size})` : ''}
          </Button>
        </div>
      )}
    </div>
  )
}
