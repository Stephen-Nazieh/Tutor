'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  FolderOpen,
  Search,
  FileText,
  Image,
  Video,
  File,
  FileSpreadsheet,
  Download,
  ExternalLink,
  User,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'sonner'

interface Resource {
  id: string
  name: string
  description: string | null
  type: string
  size: number
  mimeType: string | null
  url: string
  tags: string[]
  downloadCount: number
  createdAt: string
  tutorName: string
  sharedMessage: string | null
}

function formatFileSize(bytes: number): string {
  if (!bytes) return '—'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function getIcon(type: string) {
  const cls = 'h-8 w-8'
  switch (type) {
    case 'document':
      return <FileText className={`${cls} text-blue-500`} />
    case 'image':
      return <Image className={`${cls} text-green-500`} />
    case 'video':
      return <Video className={`${cls} text-red-500`} />
    case 'spreadsheet':
      return <FileSpreadsheet className={`${cls} text-orange-500`} />
    default:
      return <File className={`${cls} text-gray-500`} />
  }
}

export default function StudentResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  const fetchResources = useCallback(async () => {
    try {
      const res = await fetch('/api/student/resources', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setResources(data.resources || [])
      }
    } catch {
      toast.error('Failed to load resources')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchResources()
  }, [fetchResources])

  const handleDownload = async (resource: Resource) => {
    try {
      const res = await fetch(`/api/tutor/resources/${resource.id}/download`, {
        credentials: 'include',
      })
      if (!res.ok) throw new Error()
      const { downloadUrl } = await res.json()
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = resource.name
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast.success('Download started')
    } catch {
      toast.error('Failed to download resource')
    }
  }

  const TYPES = ['all', 'document', 'image', 'video', 'spreadsheet', 'other']

  const filtered = resources.filter(r => {
    const matchSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      r.tutorName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchType = typeFilter === 'all' || r.type === typeFilter
    return matchSearch && matchType
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <FolderOpen className="h-6 w-6" />
          Resources
        </h1>
        <p className="mt-1 text-gray-600">Materials shared with you by your tutors</p>
      </div>

      {/* Search + Type Filter */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {TYPES.map(t => (
            <Button
              key={t}
              variant={typeFilter === t ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter(t)}
              className="capitalize"
            >
              {t}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="mb-3 h-8 w-8 rounded" />
                <Skeleton className="mb-2 h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <FolderOpen className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium text-gray-700">
              {searchQuery || typeFilter !== 'all' ? 'No matching resources' : 'No resources yet'}
            </h3>
            <p className="text-sm text-gray-500">
              {searchQuery || typeFilter !== 'all'
                ? 'Try adjusting your search or filter'
                : 'Your tutors will share materials here'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map(resource => (
            <Card key={resource.id} className="transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <div className="mb-3">{getIcon(resource.type)}</div>
                <h3 className="truncate text-sm font-medium" title={resource.name}>
                  {resource.name}
                </h3>
                {resource.description && (
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500">{resource.description}</p>
                )}
                {resource.sharedMessage && (
                  <p className="mt-1 line-clamp-1 text-xs italic text-blue-600">
                    &ldquo;{resource.sharedMessage}&rdquo;
                  </p>
                )}

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-gray-400">{formatFileSize(resource.size)}</p>
                  <p className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(resource.createdAt), { addSuffix: true })}
                  </p>
                </div>

                {resource.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {resource.tags.slice(0, 3).map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="mt-1 flex items-center gap-1">
                  <User className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-400">{resource.tutorName}</span>
                </div>

                <div className="mt-3 flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 gap-1 text-xs"
                    onClick={() => handleDownload(resource)}
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => window.open(resource.url, '_blank')}
                    title="Open in new tab"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
