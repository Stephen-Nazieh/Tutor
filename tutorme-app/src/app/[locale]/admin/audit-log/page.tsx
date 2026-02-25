'use client'

import { useState } from 'react'
import { useAuditLogs } from '@/lib/admin/hooks'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  Settings,
  Shield,
  Users,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'

const resourceTypes = [
  { value: 'all', label: 'All Resources' },
  { value: 'user', label: 'Users' },
  { value: 'feature_flag', label: 'Feature Flags' },
  { value: 'llm_provider', label: 'LLM Providers' },
  { value: 'settings', label: 'Settings' },
]

const actionTypes = [
  { value: 'all', label: 'All Actions' },
  { value: 'create', label: 'Create' },
  { value: 'update', label: 'Update' },
  { value: 'delete', label: 'Delete' },
  { value: 'login', label: 'Login' },
]

export default function AuditLogPage() {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({
    resourceType: 'all',
    action: 'all',
    search: '',
  })

  const { data, isLoading } = useAuditLogs({
    page,
    limit: 20,
    resourceType: filters.resourceType === 'all' ? undefined : filters.resourceType,
    action: filters.action === 'all' ? undefined : filters.action,
  })

  const logs = data?.logs || []
  const pagination = data?.pagination

  const getActionIcon = (action: string) => {
    if (action.includes('create')) return CheckCircle2
    if (action.includes('delete')) return AlertCircle
    if (action.includes('login')) return User
    if (action.includes('update')) return Settings
    return Shield
  }

  const getActionBadgeColor = (action: string) => {
    if (action.includes('create')) return 'bg-green-100 text-green-800'
    if (action.includes('delete')) return 'bg-red-100 text-red-800'
    if (action.includes('login')) return 'bg-blue-100 text-blue-800'
    if (action.includes('update')) return 'bg-yellow-100 text-yellow-800'
    return 'bg-slate-100 text-slate-800'
  }

  const formatAction = (action: string) => {
    return action
      .split('.')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Audit Log</h1>
          <p className="text-slate-500">
            Complete history of administrative actions
          </p>
        </div>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search logs..."
                className="pl-9"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <Select
              value={filters.resourceType}
              onValueChange={(v) => setFilters({ ...filters, resourceType: v })}
            >
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {resourceTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.action}
              onValueChange={(v) => setFilters({ ...filters, action: v })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Action type" />
              </SelectTrigger>
              <SelectContent>
                {actionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {isLoading ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              `${pagination?.total?.toLocaleString() || 0} Log Entries`
            )}
          </CardTitle>
          <CardDescription>
            Recent administrative actions and changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-8 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                  </TableRow>
                ))
              ) : logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center">
                    <p className="text-slate-500">No audit logs found</p>
                    <p className="text-sm text-slate-400">
                      Logs will appear here when admin actions are performed
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                logs.map((log: Record<string, unknown>) => {
                  const ActionIcon = getActionIcon(log.action as string)
                  return (
                    <TableRow key={log.id as string}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={getActionBadgeColor(log.action as string)}
                          >
                            <ActionIcon className="mr-1 h-3 w-3" />
                            {formatAction(log.action as string)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {(log.admin as Record<string, unknown>)?.name as string ||
                              (log.admin as Record<string, unknown>)?.email as string}
                          </p>
                          <p className="text-xs text-slate-500">
                            {(log.admin as Record<string, unknown>)?.email as string}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {log.resourceType ? (
                          <div>
                            <Badge variant="outline" className="text-xs capitalize">
                              {String(log.resourceType).replace('_', ' ')}
                            </Badge>
                            {typeof log.resourceId === 'string' && log.resourceId.length > 0 && (
                              <p className="mt-1 text-xs text-slate-500 font-mono">
                                {log.resourceId.slice(0, 8)}...
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-500">
                        {new Date(log.createdAt as string).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-slate-100 px-2 py-1 rounded">
                          {log.ipAddress as string}
                        </code>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Page {pagination.page} of {pagination.totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={page === pagination.totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
