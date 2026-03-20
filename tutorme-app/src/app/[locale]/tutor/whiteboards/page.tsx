'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  MoreVertical,
  Trash2,
  Copy,
  Download,
  Grid3X3,
  Layout,
  Search,
  Palette,
  Clock,
  FileText,
  ArrowLeft,
  Loader2,
} from 'lucide-react'
import { toast } from 'sonner'
import { formatDistanceToNow } from 'date-fns'

interface Whiteboard {
  id: string
  title: string
  description: string | null
  isTemplate: boolean
  isPublic: boolean
  backgroundColor: string
  backgroundStyle: string
  createdAt: string
  updatedAt: string
  pages: { id: string; name: string }[]
  _count: { pages: number; snapshots: number }
}

export default function WhiteboardsPage() {
  const router = useRouter()
  const [whiteboards, setWhiteboards] = useState<Whiteboard[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [creating, setCreating] = useState(false)
  const [newWhiteboard, setNewWhiteboard] = useState({
    title: '',
    description: '',
    backgroundColor: '#ffffff',
    backgroundStyle: 'solid' as const,
  })

  useEffect(() => {
    fetchWhiteboards()
  }, [])

  const fetchWhiteboards = async () => {
    try {
      const res = await fetch('/api/whiteboards', { credentials: 'include' })
      if (!res.ok) throw new Error('Failed to fetch whiteboards')
      const data = await res.json()
      setWhiteboards(data.whiteboards || [])
    } catch (error) {
      toast.error('Failed to load whiteboards')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!newWhiteboard.title.trim()) {
      toast.error('Title is required')
      return
    }

    setCreating(true)
    try {
      const res = await fetch('/api/whiteboards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newWhiteboard),
      })

      if (!res.ok) throw new Error('Failed to create whiteboard')

      const data = await res.json()
      toast.success('Whiteboard created')
      setShowCreateDialog(false)
      setNewWhiteboard({
        title: '',
        description: '',
        backgroundColor: '#ffffff',
        backgroundStyle: 'solid',
      })

      // Navigate to the new whiteboard
      router.push(`/tutor/whiteboards/${data.whiteboard.id}`)
    } catch (error) {
      toast.error('Failed to create whiteboard')
      console.error(error)
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this whiteboard?')) return

    try {
      const res = await fetch(`/api/whiteboards/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!res.ok) throw new Error('Failed to delete whiteboard')

      toast.success('Whiteboard deleted')
      setWhiteboards(whiteboards.filter(wb => wb.id !== id))
    } catch (error) {
      toast.error('Failed to delete whiteboard')
      console.error(error)
    }
  }

  const handleDuplicate = async (whiteboard: Whiteboard) => {
    try {
      const res = await fetch('/api/whiteboards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: `${whiteboard.title} (Copy)`,
          description: whiteboard.description,
          backgroundColor: whiteboard.backgroundColor,
          backgroundStyle: whiteboard.backgroundStyle,
        }),
      })

      if (!res.ok) throw new Error('Failed to duplicate whiteboard')

      const data = await res.json()
      toast.success('Whiteboard duplicated')
      fetchWhiteboards()
    } catch (error) {
      toast.error('Failed to duplicate whiteboard')
      console.error(error)
    }
  }

  const handleExport = async (id: string, format: string) => {
    try {
      const res = await fetch(`/api/whiteboards/${id}/export?format=${format}`, {
        credentials: 'include',
      })

      if (!res.ok) throw new Error('Failed to export')

      if (format === 'json') {
        const data = await res.json()
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `whiteboard-${id}.json`
        a.click()
      } else {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `whiteboard-${id}.${format}`
        a.click()
      }

      toast.success('Export downloaded')
    } catch (error) {
      toast.error('Failed to export whiteboard')
      console.error(error)
    }
  }

  const filteredWhiteboards = whiteboards.filter(
    wb =>
      wb.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (wb.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  )

  const getBackgroundStyle = (style: string) => {
    switch (style) {
      case 'grid':
        return 'bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px]'
      case 'dots':
        return 'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px]'
      case 'lines':
        return 'bg-[repeating-linear-gradient(0deg,#e5e7eb_0px,#e5e7eb_1px,transparent_1px,transparent_20px)]'
      default:
        return ''
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="w-full">
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/tutor/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Whiteboards</h1>
              <p className="text-gray-600">Create and manage your teaching whiteboards</p>
            </div>
          </div>

          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Whiteboard
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Whiteboard</DialogTitle>
                <DialogDescription>
                  Create a new whiteboard for your teaching sessions.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Math Diagrams"
                    value={newWhiteboard.title}
                    onChange={e => setNewWhiteboard({ ...newWhiteboard, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Optional description"
                    value={newWhiteboard.description}
                    onChange={e =>
                      setNewWhiteboard({ ...newWhiteboard, description: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Background Style</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {['solid', 'grid', 'dots', 'lines'].map(style => (
                      <button
                        key={style}
                        onClick={() =>
                          setNewWhiteboard({ ...newWhiteboard, backgroundStyle: style as any })
                        }
                        className={`rounded-lg border-2 p-3 transition-all ${
                          newWhiteboard.backgroundStyle === style
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div
                          className={`h-8 w-full rounded ${getBackgroundStyle(style)} bg-gray-50`}
                        />
                        <span className="mt-1 block text-xs capitalize">{style}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreate} disabled={creating}>
                  {creating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search whiteboards..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Whiteboards Grid */}
        {filteredWhiteboards.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <Palette className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                {searchQuery ? 'No whiteboards found' : 'No whiteboards yet'}
              </h3>
              <p className="mb-4 text-gray-500">
                {searchQuery
                  ? 'Try adjusting your search query'
                  : 'Create your first whiteboard to get started'}
              </p>
              {!searchQuery && (
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Whiteboard
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredWhiteboards.map(whiteboard => (
              <Card key={whiteboard.id} className="group transition-shadow hover:shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <CardTitle className="truncate text-lg">
                        <Link
                          href={`/tutor/whiteboards/${whiteboard.id}`}
                          className="transition-colors hover:text-blue-600"
                        >
                          {whiteboard.title}
                        </Link>
                      </CardTitle>
                      {whiteboard.description && (
                        <p className="mt-1 truncate text-sm text-gray-500">
                          {whiteboard.description}
                        </p>
                      )}
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleDuplicate(whiteboard)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExport(whiteboard.id, 'json')}>
                          <Download className="mr-2 h-4 w-4" />
                          Export JSON
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExport(whiteboard.id, 'svg')}>
                          <Download className="mr-2 h-4 w-4" />
                          Export SVG
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(whiteboard.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Preview */}
                  <Link href={`/tutor/whiteboards/${whiteboard.id}`}>
                    <div
                      className={`mb-4 h-32 rounded-lg border-2 border-gray-100 ${getBackgroundStyle(whiteboard.backgroundStyle)}`}
                      style={{ backgroundColor: whiteboard.backgroundColor }}
                    />
                  </Link>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {whiteboard._count.pages} page{whiteboard._count.pages !== 1 ? 's' : ''}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatDistanceToNow(new Date(whiteboard.updatedAt), { addSuffix: true })}
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="mt-3 flex gap-2">
                    {whiteboard.isTemplate && <Badge variant="secondary">Template</Badge>}
                    {whiteboard.isPublic && <Badge variant="outline">Public</Badge>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
