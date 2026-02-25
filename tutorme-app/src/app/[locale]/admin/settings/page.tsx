'use client'

import { useState } from 'react'
import { useSettings } from '@/lib/admin/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Settings,
  Globe,
  Shield,
  Brain,
  Bell,
  AlertTriangle,
  Save,
  RefreshCw,
} from 'lucide-react'

const settingCategories = [
  { value: 'general', label: 'General', icon: Globe },
  { value: 'features', label: 'Features', icon: Settings },
  { value: 'ai', label: 'AI', icon: Brain },
  { value: 'security', label: 'Security', icon: Shield },
  { value: 'notifications', label: 'Notifications', icon: Bell },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const { settings, isLoading, updateSetting } = useSettings(activeTab)
  const [editedSettings, setEditedSettings] = useState<Record<string, unknown>>({})
  const [saving, setSaving] = useState(false)

  const handleValueChange = (key: string, value: unknown) => {
    setEditedSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = async (category: string, key: string) => {
    setSaving(true)
    try {
      await updateSetting({
        category,
        key,
        value: editedSettings[key],
      })
      setEditedSettings((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    } finally {
      setSaving(false)
    }
  }

  const renderSettingInput = (setting: Record<string, unknown>) => {
    const value = editedSettings[setting.key as string] !== undefined
      ? editedSettings[setting.key as string]
      : (setting.value as Record<string, unknown>)?.value

    const valueType = (setting.valueType as string) || 'string'

    switch (valueType) {
      case 'boolean':
        return (
          <Switch
            checked={value as boolean}
            onCheckedChange={(v) => handleValueChange(setting.key as string, v)}
          />
        )
      case 'number':
        return (
          <Input
            type="number"
            value={value as number}
            onChange={(e) => handleValueChange(setting.key as string, parseFloat(e.target.value))}
          />
        )
      case 'json':
        return (
          <textarea
            className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={JSON.stringify(value, null, 2)}
            onChange={(e) => {
              try {
                handleValueChange(setting.key as string, JSON.parse(e.target.value))
              } catch {
                // Invalid JSON, ignore
              }
            }}
          />
        )
      default:
        return (
          <Input
            value={value as string}
            onChange={(e) => handleValueChange(setting.key as string, e.target.value)}
          />
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
        <p className="text-slate-500">
          Configure platform-wide settings and preferences
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 lg:w-auto">
          {settingCategories.map((cat) => (
            <TabsTrigger key={cat.value} value={cat.value} className="gap-2">
              <cat.icon className="h-4 w-4 hidden sm:block" />
              <span className="hidden sm:inline">{cat.label}</span>
              <span className="sm:hidden">{cat.label.slice(0, 3)}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {settingCategories.map((category) => (
          <TabsContent key={category.value} value={category.value}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <category.icon className="h-5 w-5 text-slate-500" />
                  <CardTitle>{category.label} Settings</CardTitle>
                </div>
                <CardDescription>
                  Manage {category.label.toLowerCase()} configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))
                ) : settings.length === 0 ? (
                  <div className="text-center py-12">
                    <Settings className="mx-auto h-12 w-12 text-slate-300" />
                    <p className="mt-4 text-slate-500">No settings in this category</p>
                    <p className="text-sm text-slate-400">
                      Default settings will be created automatically
                    </p>
                  </div>
                ) : (
                  settings.map((setting: Record<string, unknown>) => (
                    <div
                      key={setting.key as string}
                      className="flex items-start justify-between gap-4 pb-6 border-b last:border-0 last:pb-0"
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <Label className="text-base font-medium">
                            {String(setting.key).replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Label>
                          {(setting.requiresRestart as boolean) && (
                            <Badge variant="secondary" className="text-xs">
                              <RefreshCw className="mr-1 h-3 w-3" />
                              Requires Restart
                            </Badge>
                          )}
                          {(setting.isDefault as boolean) && (
                            <Badge variant="outline" className="text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                        {typeof setting.description === 'string' && setting.description.length > 0 && (
                          <p className="text-sm text-slate-500">{setting.description}</p>
                        )}
                        <p className="text-xs text-slate-400">
                          Type: {(setting.valueType as string) || 'string'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-48 sm:w-64">
                          {renderSettingInput(setting)}
                        </div>
                        {editedSettings[setting.key as string] !== undefined && (
                          <Button
                            size="sm"
                            onClick={() => handleSave(category.value, setting.key as string)}
                            disabled={saving}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Warning Card */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-800">Important</p>
              <p className="text-sm text-yellow-700">
                Changes to system settings may affect all users. Some settings require a server restart to take effect.
                Always test changes in a development environment first.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
