'use client'

import { useState } from 'react'
import { useFeatureFlags } from '@/lib/admin/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
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
  Plus,
  Search,
  Trash2,
  Edit2,
  History,
  Globe,
  User,
  Users,
  Crown,
  CheckCircle2,
  XCircle,
} from 'lucide-react'

const scopes = [
  { value: 'global', label: 'Global', icon: Globe },
  { value: 'user', label: 'User', icon: User },
  { value: 'role', label: 'Role', icon: Users },
  { value: 'tier', label: 'Tier', icon: Crown },
]

export default function FeatureFlagsPage() {
  const { flags, isLoading, createFlag, updateFlag, deleteFlag } = useFeatureFlags()
  const [search, setSearch] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingFlag, setEditingFlag] = useState<Record<string, unknown> | null>(null)
  const [newFlag, setNewFlag] = useState({
    key: '',
    name: '',
    description: '',
    enabled: true,
    scope: 'global',
  })

  const filteredFlags = flags.filter(
    (flag: Record<string, unknown>) =>
      (flag.key as string).toLowerCase().includes(search.toLowerCase()) ||
      (flag.name as string).toLowerCase().includes(search.toLowerCase())
  )

  const handleCreateFlag = async () => {
    await createFlag(newFlag)
    setIsCreateDialogOpen(false)
    setNewFlag({ key: '', name: '', description: '', enabled: true, scope: 'global' })
  }

  const handleToggleFlag = async (flag: Record<string, unknown>) => {
    await updateFlag({
      id: flag.id as string,
      enabled: !flag.enabled,
      changeReason: `Toggled via admin dashboard`,
    })
  }

  const handleDeleteFlag = async (id: string) => {
    if (confirm('Are you sure you want to delete this feature flag?')) {
      await deleteFlag(id)
    }
  }

  const getScopeIcon = (scope: string) => {
    const scopeConfig = scopes.find((s) => s.value === scope)
    const Icon = scopeConfig?.icon || Globe
    return <Icon className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Feature Flags</h1>
          <p className="text-slate-500">
            Control feature availability across the platform
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Flag
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Feature Flag</DialogTitle>
              <DialogDescription>
                Add a new feature flag to control feature availability
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="key">Key</Label>
                <Input
                  id="key"
                  placeholder="e.g., new_dashboard_enabled"
                  value={newFlag.key}
                  onChange={(e) => setNewFlag({ ...newFlag, key: e.target.value })}
                />
                <p className="text-xs text-slate-500">
                  Use lowercase letters, numbers, and underscores
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., New Dashboard"
                  value={newFlag.name}
                  onChange={(e) => setNewFlag({ ...newFlag, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="What does this flag control?"
                  value={newFlag.description}
                  onChange={(e) => setNewFlag({ ...newFlag, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scope">Scope</Label>
                <Select
                  value={newFlag.scope}
                  onValueChange={(v) => setNewFlag({ ...newFlag, scope: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {scopes.map((scope) => (
                      <SelectItem key={scope.value} value={scope.value}>
                        <div className="flex items-center gap-2">
                          <scope.icon className="h-4 w-4" />
                          {scope.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="enabled">Enabled by default</Label>
                <Switch
                  id="enabled"
                  checked={newFlag.enabled}
                  onCheckedChange={(v) => setNewFlag({ ...newFlag, enabled: v })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateFlag} disabled={!newFlag.key || !newFlag.name}>
                Create Flag
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search feature flags..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Feature Flags Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {isLoading ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              `${filteredFlags.length} Feature Flags`
            )}
          </CardTitle>
          <CardDescription>
            Toggle features on/off or configure scoped access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Flag</TableHead>
                <TableHead>Scope</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-20" /></TableCell>
                  </TableRow>
                ))
              ) : filteredFlags.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center">
                    <p className="text-slate-500">No feature flags found</p>
                    <p className="text-sm text-slate-400">
                      {search ? 'Try adjusting your search' : 'Create your first feature flag'}
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredFlags.map((flag: Record<string, unknown>) => (
                  <TableRow key={flag.id as string}>
                    <TableCell>
                      <div>
                        <p className="font-medium font-mono text-sm">{flag.key as string}</p>
                        <p className="text-sm text-slate-500">{flag.name as string}</p>
                        {typeof flag.description === 'string' && flag.description.length > 0 && (
                          <p className="text-xs text-slate-400">{flag.description}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="gap-1">
                        {getScopeIcon(flag.scope as string)}
                        <span className="capitalize">{flag.scope as string}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={flag.enabled as boolean}
                          onCheckedChange={() => handleToggleFlag(flag)}
                        />
                        <Badge
                          variant={flag.enabled ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {flag.enabled ? (
                            <>
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              On
                            </>
                          ) : (
                            <>
                              <XCircle className="mr-1 h-3 w-3" />
                              Off
                            </>
                          )}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm">
                      {new Date(flag.updatedAt as string).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingFlag(flag)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteFlag(flag.id as string)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
