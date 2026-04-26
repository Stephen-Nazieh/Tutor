'use client'

import { useEffect, useMemo, useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Loader2, Globe, DollarSign, Calendar, Languages } from 'lucide-react'
import { toast } from 'sonner'
import { VariantScheduleEditor } from './VariantScheduleEditor'
import type { ScheduleItem } from '../constants'
import { REGIONS } from '@/lib/data/tutor-categories'

interface VariantConfig {
  category: string
  nationality: string
  isPublished: boolean
  price: number | null
  currency: string
  languageOfInstruction: string
  schedule: ScheduleItem[]
  weeksToSchedule?: number
}

interface VariantManagerProps {
  templateCourseId: string
  selectedCategories: string[]
  selectedCountryCodes: string[]
  defaultPrice: number | null
  defaultCurrency: string
  defaultLanguage: string
  defaultSchedule: ScheduleItem[]
  onSaved?: () => void
}

function getCountryName(code: string): string {
  if (code === 'GL') return 'Global'
  const country = REGIONS.flatMap(r => r.countries).find(c => c.code === code)
  return country?.name || code
}

export function VariantManager({
  templateCourseId,
  selectedCategories,
  selectedCountryCodes,
  defaultPrice,
  defaultCurrency,
  defaultLanguage,
  defaultSchedule,
  onSaved,
}: VariantManagerProps) {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [globalPrice, setGlobalPrice] = useState<string>(
    defaultPrice != null ? String(defaultPrice) : ''
  )
  const [globalCurrency, setGlobalCurrency] = useState(defaultCurrency || 'USD')
  const [globalLanguage, setGlobalLanguage] = useState(defaultLanguage || 'English')
  const [variants, setVariants] = useState<VariantConfig[]>([])
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false)
  const [scheduleDialogIndex, setScheduleDialogIndex] = useState<number | null>(null)

  // Load existing variants on mount
  useEffect(() => {
    let active = true
    setLoading(true)
    fetch(`/api/tutor/courses/${templateCourseId}/publish`, { credentials: 'include' })
      .then(res => (res.ok ? res.json() : { variants: [] }))
      .then(data => {
        if (!active) return
        const loaded: VariantConfig[] = (data.variants || []).map((v: any) => ({
          category: v.category,
          nationality: v.nationality,
          isPublished: v.isPublished ?? false,
          price: typeof v.price === 'number' ? v.price : null,
          currency: v.currency || 'USD',
          languageOfInstruction: v.languageOfInstruction || '',
          schedule: Array.isArray(v.schedule) ? v.schedule : [],
          weeksToSchedule: typeof v.weeksToSchedule === 'number' ? v.weeksToSchedule : 8,
        }))
        setVariants(loaded)
      })
      .catch(() => setVariants([]))
      .finally(() => setLoading(false))
    return () => {
      active = false
    }
  }, [templateCourseId])

  // Sync global defaults from parent when they change meaningfully
  useEffect(() => {
    setGlobalPrice(defaultPrice != null ? String(defaultPrice) : '')
    setGlobalCurrency(defaultCurrency || 'USD')
    setGlobalLanguage(defaultLanguage || 'English')
  }, [defaultPrice, defaultCurrency, defaultLanguage])

  // Compute the desired variant keys from current selections
  const desiredKeys = useMemo(() => {
    const keys = new Set<string>()
    const countries = selectedCountryCodes.length > 0 ? selectedCountryCodes : ['GL']
    for (const cat of selectedCategories) {
      for (const code of countries) {
        const name = getCountryName(code)
        keys.add(`${cat}|${name}`)
      }
    }
    return keys
  }, [selectedCategories, selectedCountryCodes])

  // Sync variants with desired keys: add missing, remove extras
  useEffect(() => {
    setVariants(prev => {
      const map = new Map(prev.map(v => [`${v.category}|${v.nationality}`, v]))
      let changed = false
      // Add missing
      for (const key of desiredKeys) {
        if (!map.has(key)) {
          const [category, nationality] = key.split('|')
          map.set(key, {
            category,
            nationality,
            isPublished: true,
            price: globalPrice ? parseFloat(globalPrice) : null,
            currency: globalCurrency,
            languageOfInstruction: globalLanguage,
            schedule: Array.isArray(defaultSchedule) ? [...defaultSchedule] : [],
            weeksToSchedule: 8,
          })
          changed = true
        }
      }
      // Remove extras
      for (const key of map.keys()) {
        if (!desiredKeys.has(key)) {
          map.delete(key)
          changed = true
        }
      }
      if (!changed) return prev
      return Array.from(map.values()).sort((a, b) =>
        `${a.category} - ${a.nationality}`.localeCompare(`${b.category} - ${b.nationality}`)
      )
    })
  }, [desiredKeys, globalPrice, globalCurrency, globalLanguage, defaultSchedule])

  const applyGlobalsToAll = useCallback(() => {
    const price = globalPrice ? parseFloat(globalPrice) : null
    setVariants(prev =>
      prev.map(v => ({
        ...v,
        price,
        currency: globalCurrency,
        languageOfInstruction: globalLanguage,
      }))
    )
    toast.success('Global defaults applied to all variants')
  }, [globalPrice, globalCurrency, globalLanguage])

  const updateVariant = useCallback(
    (index: number, updater: (v: VariantConfig) => VariantConfig) => {
      setVariants(prev => {
        const next = [...prev]
        next[index] = updater(next[index])
        return next
      })
    },
    []
  )

  const openScheduleDialog = useCallback((index: number) => {
    setScheduleDialogIndex(index)
    setTimeout(() => {
      setScheduleDialogOpen(true)
    }, 0)
  }, [])

  const closeScheduleDialog = useCallback(() => {
    setScheduleDialogOpen(false)
    setTimeout(() => setScheduleDialogIndex(null), 300)
  }, [])

  const handleSave = async () => {
    if (variants.length === 0) {
      toast.error('No variants to save. Select categories and countries first.')
      return
    }
    setSaving(true)
    try {
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const payload = variants.map(v => ({
        ...v,
        price: typeof v.price === 'number' ? v.price : null,
      }))

      const res = await fetch(`/api/tutor/courses/${templateCourseId}/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        },
        credentials: 'include',
        body: JSON.stringify({ variants: payload }),
      })

      if (res.ok) {
        const data = await res.json()
        const published = data.variants.filter((v: any) => v.isPublished).length
        toast.success(`Saved ${data.count} variants (${published} published)`)
        onSaved?.()
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data?.error || 'Failed to save variants')
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to save variants')
    } finally {
      setSaving(false)
    }
  }

  const publishedCount = variants.filter(v => v.isPublished).length

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-10">
          <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
          <span className="text-muted-foreground ml-2">Loading variants…</span>
        </CardContent>
      </Card>
    )
  }

  const dialogVariant = scheduleDialogIndex != null ? variants[scheduleDialogIndex] : null

  // Ensure schedule component remounts cleanly when switching variants
  const scheduleEditorKey =
    scheduleDialogIndex != null ? `schedule-editor-${scheduleDialogIndex}` : 'schedule-editor-empty'

  return (
    <div className="space-y-12">
      {/* Global Defaults */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-base font-semibold text-slate-800">
          <Globe className="h-4 w-4 text-indigo-500" />
          Global Defaults
        </h3>
        <p className="text-sm text-slate-500">
          Set default price, currency, and language for all variants.
        </p>
        <div className="grid gap-6 sm:grid-cols-4 pt-2">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">Price</Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-slate-400" />
              <Input
                type="number"
                min={0}
                value={globalPrice}
                onChange={e => setGlobalPrice(e.target.value)}
                placeholder="0.00"
                className="bg-transparent border-slate-200"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">Currency</Label>
            <Select value={globalCurrency} onValueChange={setGlobalCurrency}>
              <SelectTrigger className="bg-transparent border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {['USD', 'SGD', 'EUR', 'GBP', 'KRW', 'JPY', 'HKD', 'CNY', 'INR'].map(c => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">Language</Label>
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-slate-400" />
              <Input
                value={globalLanguage}
                onChange={e => setGlobalLanguage(e.target.value)}
                placeholder="e.g. English"
                className="bg-transparent border-slate-200"
              />
            </div>
          </div>
          <div className="flex items-end">
            <Button
              type="button"
              variant="outline"
              onClick={applyGlobalsToAll}
              className="w-full bg-transparent border-slate-200 hover:bg-slate-50"
            >
              Apply to all
            </Button>
          </div>
        </div>
      </div>

      <div className="border-b border-[rgba(0,0,0,0.06)]" />

      {/* Variant List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-800">Generated Variants</h3>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Badge variant="outline" className="border-slate-200 text-slate-600">{variants.length} total</Badge>
            <Badge variant="default" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50 border-0">{publishedCount} published</Badge>
          </div>
        </div>

        {variants.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center text-sm text-slate-500">
            Select categories and countries above to generate variant courses.
          </div>
        )}

        <div className="space-y-6">
          {variants.map((variant, index) => (
            <div key={`${variant.category}|${variant.nationality}`} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-4">
                <div className="flex items-center gap-3">
                  <h4 className="text-sm font-semibold text-slate-800">
                    {variant.category} - {variant.nationality}
                  </h4>
                  {variant.isPublished ? (
                    <Badge className="bg-emerald-500 text-white hover:bg-emerald-600 border-0">
                      Published
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-0">Draft</Badge>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-500">
                    {variant.isPublished ? 'Published' : 'Unpublished'}
                  </span>
                  <Switch
                    checked={variant.isPublished}
                    onCheckedChange={checked =>
                      updateVariant(index, v => ({ ...v, isPublished: checked }))
                    }
                  />
                </div>
              </div>
              <div className="p-5">
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-slate-700">Price</Label>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-slate-400" />
                      <Input
                        type="number"
                        min={0}
                        value={variant.price != null ? String(variant.price) : ''}
                        onChange={e => {
                          const val = e.target.value
                          updateVariant(index, v => ({
                            ...v,
                            price: val === '' ? null : parseFloat(val),
                          }))
                        }}
                        placeholder="0.00"
                        className="bg-transparent border-slate-200"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-slate-700">Currency</Label>
                    <Select
                      value={variant.currency}
                      onValueChange={val =>
                        updateVariant(index, v => ({ ...v, currency: val }))
                      }
                    >
                      <SelectTrigger className="bg-transparent border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {['USD', 'SGD', 'EUR', 'GBP', 'KRW', 'JPY', 'HKD', 'CNY', 'INR'].map(c => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-slate-700">Language</Label>
                    <div className="flex items-center gap-2">
                      <Languages className="h-4 w-4 text-slate-400" />
                      <Input
                        value={variant.languageOfInstruction}
                        onChange={e =>
                          updateVariant(index, v => ({
                            ...v,
                            languageOfInstruction: e.target.value,
                          }))
                        }
                        placeholder="e.g. English"
                        className="bg-transparent border-slate-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 p-4 transition-all duration-300 hover:bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-indigo-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Schedule</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {Array.isArray(variant.schedule) && variant.schedule.length > 0
                          ? `${variant.schedule.length} slot${variant.schedule.length === 1 ? '' : 's'} configured`
                          : 'No slots configured'}
                      </p>
                    </div>
                  </div>
                  <Button type="button" variant="outline" className="border-slate-200 bg-transparent" onClick={() => openScheduleDialog(index)}>
                    {Array.isArray(variant.schedule) && variant.schedule.length > 0
                      ? 'Edit Schedule'
                      : 'Add Class Slot'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Action */}
      <div className="flex justify-end gap-3 pt-6">
        <Button
          type="button"
          onClick={handleSave}
          disabled={saving || variants.length === 0}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 shadow-sm transition-all duration-300"
        >
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {saving ? 'Saving…' : `Publish (${publishedCount})`}
        </Button>
      </div>

      {/* Schedule Dialog */}
      <Dialog
        open={scheduleDialogOpen}
        onOpenChange={open => {
          setScheduleDialogOpen(open)
          if (!open) {
            setTimeout(() => setScheduleDialogIndex(null), 300)
          }
        }}
      >
        <DialogContent className="h-[95vh] max-h-[95vh] w-[95vw] max-w-[95vw] overflow-hidden p-0 sm:h-[90vh] sm:max-h-[800px] sm:w-[90vw] sm:max-w-[800px]">
          <div className="flex h-full flex-col bg-white">
            <DialogHeader className="border-b px-6 py-4">
              <DialogTitle>Edit Schedule</DialogTitle>
              <DialogDescription>
                {dialogVariant
                  ? `Configure schedule for ${dialogVariant.category} - ${dialogVariant.nationality}`
                  : 'Configure schedule'}
              </DialogDescription>
            </DialogHeader>
            {dialogVariant && (
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <VariantScheduleEditor
                  key={scheduleEditorKey}
                  schedule={Array.isArray(dialogVariant?.schedule) ? dialogVariant.schedule : []}
                  onScheduleChange={updater =>
                    scheduleDialogIndex != null &&
                    updateVariant(scheduleDialogIndex, v => ({
                      ...v,
                      schedule: updater(Array.isArray(v.schedule) ? v.schedule : []),
                    }))
                  }
                  price={dialogVariant?.price ?? 0}
                  weeksToSchedule={dialogVariant?.weeksToSchedule || 8}
                  onWeeksChange={weeks =>
                    scheduleDialogIndex != null &&
                    updateVariant(scheduleDialogIndex, v => ({
                      ...v,
                      weeksToSchedule: weeks,
                    }))
                  }
                />
              </div>
            )}
            <div className="border-t px-6 py-4">
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={closeScheduleDialog}
                  className="text-white"
                  style={{
                    background: '#1D4ED8',
                    borderRadius: '12px',
                    boxShadow: '0 8px 18px rgba(29,78,216,0.28)',
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
