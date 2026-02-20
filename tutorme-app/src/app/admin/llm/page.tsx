'use client'

import { useState } from 'react'
import { useLlmProviders, useLlmRoutingRules } from '@/lib/admin/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  Server,
  CheckCircle2,
  XCircle,
  Star,
  ArrowRight,
  Trash2,
  Settings,
  Brain,
  Route,
} from 'lucide-react'

const providerTypes = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'google', label: 'Google' },
  { value: 'ollama', label: 'Ollama (Local)' },
  { value: 'custom', label: 'Custom' },
]

export default function LlmConfigPage() {
  const { providers, isLoading: providersLoading, createProvider, updateProvider } = useLlmProviders()
  const { rules, isLoading: rulesLoading, createRule, updateRule, deleteRule } = useLlmRoutingRules()
  const [activeTab, setActiveTab] = useState('providers')
  const [isAddProviderOpen, setIsAddProviderOpen] = useState(false)
  const [isAddRuleOpen, setIsAddRuleOpen] = useState(false)
  const [newProvider, setNewProvider] = useState({
    name: '',
    providerType: 'openai',
    apiKey: '',
    baseUrl: '',
  })
  const [newRule, setNewRule] = useState({
    name: '',
    priority: 0,
    targetModelId: '',
    fallbackModelId: '',
    conditions: {},
  })

  const handleAddProvider = async () => {
    await createProvider(newProvider)
    setIsAddProviderOpen(false)
    setNewProvider({ name: '', providerType: 'openai', apiKey: '', baseUrl: '' })
  }

  const handleToggleProvider = async (provider: Record<string, unknown>) => {
    await updateProvider({
      id: provider.id as string,
      isActive: !provider.isActive,
    })
  }

  const handleSetDefault = async (provider: Record<string, unknown>) => {
    await updateProvider({
      id: provider.id as string,
      isDefault: true,
    })
  }

  // Get all models from all providers
  const allModels = providers.flatMap((p: Record<string, unknown>) =>
    (p.models as Record<string, unknown>[])?.map((m) => ({
      ...m,
      providerName: p.name,
    })) || []
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI Configuration</h1>
          <p className="text-slate-500">
            Manage LLM providers and routing rules
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="providers">
            <Server className="mr-2 h-4 w-4" />
            Providers
          </TabsTrigger>
          <TabsTrigger value="routing">
            <Route className="mr-2 h-4 w-4" />
            Routing Rules
          </TabsTrigger>
        </TabsList>

        {/* Providers Tab */}
        <TabsContent value="providers" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isAddProviderOpen} onOpenChange={setIsAddProviderOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Provider
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add LLM Provider</DialogTitle>
                  <DialogDescription>
                    Configure a new LLM provider for the platform
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      placeholder="e.g., OpenAI Production"
                      value={newProvider.name}
                      onChange={(e) => setNewProvider({ ...newProvider, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Provider Type</Label>
                    <Select
                      value={newProvider.providerType}
                      onValueChange={(v) => setNewProvider({ ...newProvider, providerType: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {providerTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>API Key</Label>
                    <Input
                      type="password"
                      placeholder="sk-..."
                      value={newProvider.apiKey}
                      onChange={(e) => setNewProvider({ ...newProvider, apiKey: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Base URL (Optional)</Label>
                    <Input
                      placeholder="https://api.openai.com/v1"
                      value={newProvider.baseUrl}
                      onChange={(e) => setNewProvider({ ...newProvider, baseUrl: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddProviderOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddProvider} disabled={!newProvider.name}>
                    Add Provider
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {providersLoading ? (
              Array(4).fill(0).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-24 w-full" />
                  </CardContent>
                </Card>
              ))
            ) : providers.length === 0 ? (
              <Card className="col-span-2">
                <CardContent className="p-12 text-center">
                  <Brain className="mx-auto h-12 w-12 text-slate-300" />
                  <p className="mt-4 text-slate-500">No LLM providers configured</p>
                  <p className="text-sm text-slate-400">
                    Add a provider to start using AI features
                  </p>
                </CardContent>
              </Card>
            ) : (
              providers.map((provider: Record<string, unknown>) => (
                <Card key={provider.id as string}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{provider.name as string}</h3>
                          {provider.isDefault === true && (
                            <Badge variant="default" className="text-xs">
                              <Star className="mr-1 h-3 w-3" />
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 capitalize">
                          {provider.providerType as string}
                        </p>
                      </div>
                      <Switch
                        checked={provider.isActive as boolean}
                        onCheckedChange={() => handleToggleProvider(provider)}
                      />
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Models</span>
                        <span className="font-medium">
                          {(provider.models as unknown[])?.length || 0}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Priority</span>
                        <span className="font-medium">{provider.priority as number}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Routing Rules</span>
                        <span className="font-medium">
                          {(provider._count as Record<string, number>)?.routingRules || 0}
                        </span>
                      </div>
                    </div>

                    {!provider.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 w-full"
                        onClick={() => handleSetDefault(provider)}
                      >
                        <Star className="mr-2 h-4 w-4" />
                        Set as Default
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Routing Rules Tab */}
        <TabsContent value="routing" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setIsAddRuleOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Rule
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Routing Rules</CardTitle>
              <CardDescription>
                Define which models to use based on conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rule</TableHead>
                    <TableHead>Conditions</TableHead>
                    <TableHead>Target Model</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rulesLoading ? (
                    Array(3).fill(0).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                        <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                      </TableRow>
                    ))
                  ) : rules.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center">
                        <p className="text-slate-500">No routing rules configured</p>
                        <p className="text-sm text-slate-400">
                          Add rules to route requests to specific models
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    rules.map((rule: Record<string, unknown>) => (
                      <TableRow key={rule.id as string}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{rule.name as string || 'Untitled Rule'}</p>
                            <p className="text-sm text-slate-500">
                              Priority: {rule.priority as number}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="text-xs bg-slate-100 px-2 py-1 rounded">
                            {JSON.stringify(rule.conditions)}
                          </code>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">
                              {(rule.targetModel as Record<string, unknown>)?.name as string || (rule.targetModel as Record<string, unknown>)?.modelId as string}
                            </span>
                            {typeof (rule.fallbackModel as Record<string, string> | undefined)?.name === 'string' && (
                              <>
                                <ArrowRight className="h-4 w-4 text-slate-400" />
                                <span className="text-sm text-slate-500">
                                  {(rule.fallbackModel as Record<string, string>).name}
                                </span>
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={rule.isActive as boolean}
                            onCheckedChange={async () => {
                              await updateRule({
                                id: rule.id as string,
                                isActive: !rule.isActive,
                              })
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteRule(rule.id as string)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
