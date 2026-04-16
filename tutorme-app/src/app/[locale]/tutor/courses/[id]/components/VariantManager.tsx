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
import { Badge } from '@/components/ui/badge'
import { Loader2, Globe, DollarSign, Calendar, Languages } from 'lucide-react'
import { toast } from 'sonner'
import { CourseScheduleCard } from './CourseScheduleCard'
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
  const [globalPrice, setGlobalPrice] = useState<string>(defaultPrice != null ? String(defaultPrice) : '')
  const [globalCurrency, setGlobalCurrency] = useState(defaultCurrency || 'USD')
  const [globalLanguage, setGlobalLanguage] = useState(defaultLanguage || 'English')
  const [globalSchedule, setGlobalSchedule] = useState<ScheduleItem[]>(defaultSchedule || [])
  const [variants, setVariants] = useState<VariantConfig[]>([])

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
    setGlobalSchedule(defaultSchedule || [])
  }, [defaultPrice, defaultCurrency, defaultLanguage, defaultSchedule])

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

  // Auto-add missing variants from selections; keep existing configs for already-known keys
  useEffect(() => {
    setVariants(prev => {
      const map = new Map(prev.map(v => [`${v.category}|${v.nationality}`, v]))
      let changed = false
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
            schedule: [...globalSchedule],
          })
          changed = true
        }
      }
      if (!changed) return prev
      return Array.from(map.values()).sort((a, b) =>
        `${a.category} - ${a.nationality}`.localeCompare(`${b.category} - ${b.nationality}`)
      )
    })
  }, [desiredKeys, globalPrice, globalCurrency, globalLanguage, globalSchedule])

  const applyGlobalsToAll = useCallback(() => {
    const price = globalPrice ? parseFloat(globalPrice) : null
    setVariants(prev =>
      prev.map(v => ({
        ...v,
        price,
        currency: globalCurrency,
        languageOfInstruction: globalLanguage,
        schedule: [...globalSchedule],
      }))
    )
    toast.success('Global defaults applied to all variants')
  }, [globalPrice, globalCurrency, globalLanguage, globalSchedule])

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
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Loading variants…</span>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Global Defaults */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="h-5 w-5" />
            Global Defaults
          </CardTitle>
          <CardDescription>
            Set default price, currency, language, and schedule for all variants.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="space-y-1">
              <Label className="text-xs">Price</Label>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  min={0}
                  value={globalPrice}
                  onChange={e => setGlobalPrice(e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Currency</Label>
              <Select value={globalCurrency} onValueChange={setGlobalCurrency}>
                <SelectTrigger>
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
            <div className="space-y-1">
              <Label className="text-xs">Language</Label>
              <div className="flex items-center gap-2">
                <Languages className="h-4 w-4 text-muted-foreground" />
                <Input
                  value={globalLanguage}
                  onChange={e => setGlobalLanguage(e.target.value)}
                  placeholder="e.g. English"
                />
              </div>
            </div>
            <div className="flex items-end">
              <Button type="button" variant="secondary" onClick={applyGlobalsToAll} className="w-full">
                Apply to all
              </Button>
            </div>
          </div>

          <CourseScheduleCard
            schedule={globalSchedule}
            onScheduleChange={setGlobalSchedule}
            subtitle="global default"
          />
        </CardContent>
      </Card>

      {/* Variant List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Course Variants</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">{variants.length} total</Badge>
            <Badge variant="default">{publishedCount} published</Badge>
          </div>
        </div>

        {variants.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="py-8 text-center text-sm text-muted-foreground">
              Select categories and countries above to generate variant courses.
            </CardContent>
          </Card>
        )}

        {variants.map((variant, index) => (
          <Card key={`${variant.category}|${variant.nationality}`} className="overflow-hidden">
            <CardHeader className="bg-muted/30 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-base">
                    {variant.category} - {variant.nationality}
                  </CardTitle>
                  {variant.isPublished ? (
                    <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">Published</Badge>
                  ) : (
                    <Badge variant="secondary">Draft</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
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
            </CardHeader>
            <CardContent className="space-y-4 py-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <Label className="text-xs">Price</Label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
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
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Currency</Label>
                  <Select
                    value={variant.currency}
                    onValueChange={val => updateVariant(index, v => ({ ...v, currency: val }))}
                  >
                    <SelectTrigger>
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
                <div className="space-y-1">
                  <Label className="text-xs">Language</Label>
                  <div className="flex items-center gap-2">
                    <Languages className="h-4 w-4 text-muted-foreground" />
                    <Input
                      value={variant.languageOfInstruction}
                      onChange={e =>
                        updateVariant(index, v => ({
                          ...v,
                          languageOfInstruction: e.target.value,
                        }))
                      }
                      placeholder="e.g. English"
                    />
                  </div>
                </div>
              </div>

              <CourseScheduleCard
                schedule={variant.schedule}
                onScheduleChange={updater =>
                  updateVariant(index, v => ({ ...v, schedule: updater(v.schedule) }))
                }
                subtitle={`${variant.category} - ${variant.nationality}`}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Save Action */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          onClick={handleSave}
          disabled={saving || variants.length === 0}
          className="bg-[#F17623] hover:bg-[#e06613]"
        >
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {saving ? 'Saving…' : `Save & Publish Variants (${publishedCount})`}
        </Button>
      </div>
    </div>
  )
}
