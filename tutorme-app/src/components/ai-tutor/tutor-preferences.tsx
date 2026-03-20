'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { User, Volume2, Globe, Palette, Save } from 'lucide-react'

interface TutorPreferencesProps {
  enrollmentId: string
  currentPreferences: {
    teachingAge: number
    voiceGender: string
    voiceAccent: string
    avatarStyle: string
    backgroundColor?: string
  }
  onUpdate: (prefs: any) => void
}

const AGE_OPTIONS = [
  { value: 5, label: '5-8 years', description: 'Simple words, stories, fun analogies' },
  { value: 8, label: '8-10 years', description: 'Clear explanations, relatable examples' },
  { value: 10, label: '10-12 years', description: 'Academic language, real-world connections' },
  { value: 12, label: '12-15 years', description: 'Standard academic, critical thinking' },
  { value: 15, label: '15-18 years', description: 'College-prep, nuanced analysis' },
  { value: 18, label: 'Adult', description: 'Sophisticated discourse, theory' },
]

const GENDER_OPTIONS = [
  { value: 'female', label: 'Female', emoji: '👩' },
  { value: 'male', label: 'Male', emoji: '👨' },
  { value: 'neutral', label: 'Neutral', emoji: '🧑' },
]

const ACCENT_OPTIONS = [
  { value: 'us', label: 'American', flag: '🇺🇸' },
  { value: 'uk', label: 'British', flag: '🇬🇧' },
  { value: 'au', label: 'Australian', flag: '🇦🇺' },
  { value: 'ca', label: 'Canadian', flag: '🇨🇦' },
]

const AVATAR_STYLES = [
  { value: 'modern', label: 'Modern', description: 'Sleek, futuristic design' },
  { value: 'friendly', label: 'Friendly', description: 'Warm, approachable look' },
  { value: 'classic', label: 'Classic', description: 'Traditional, academic style' },
]

const BACKGROUND_COLORS = [
  { value: 'light', label: 'Light', color: 'bg-gray-50', textColor: 'text-gray-900' },
  { value: 'warm', label: 'Warm', color: 'bg-amber-50', textColor: 'text-amber-900' },
  { value: 'cool', label: 'Cool', color: 'bg-slate-100', textColor: 'text-slate-900' },
  { value: 'mint', label: 'Mint', color: 'bg-emerald-50', textColor: 'text-emerald-900' },
  { value: 'lavender', label: 'Lavender', color: 'bg-purple-50', textColor: 'text-purple-900' },
  { value: 'dark', label: 'Dark', color: 'bg-gray-900', textColor: 'text-gray-100' },
]

export function TutorPreferences({
  enrollmentId,
  currentPreferences,
  onUpdate,
}: TutorPreferencesProps) {
  const [preferences, setPreferences] = useState(currentPreferences)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/ai-tutor/enrollments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enrollmentId,
          updates: preferences,
        }),
      })

      if (!res.ok) throw new Error('Failed to save')

      onUpdate(preferences)
      toast.success('Preferences saved!')
    } catch (error) {
      toast.error('Failed to save preferences')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Tutor Preferences
        </CardTitle>
        <CardDescription>Customize how your AI tutor teaches and communicates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Teaching Age */}
        <div>
          <label className="mb-3 flex items-center gap-2 text-sm font-medium">
            <User className="h-4 w-4" />
            Teach me like I'm...
          </label>
          <div className="grid grid-cols-2 gap-2">
            {AGE_OPTIONS.map(age => (
              <button
                key={age.value}
                onClick={() => setPreferences(prev => ({ ...prev, teachingAge: age.value }))}
                className={`rounded-lg border p-3 text-left transition-all ${
                  preferences.teachingAge === age.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-sm font-medium">{age.label}</span>
                <p className="mt-1 text-xs text-gray-500">{age.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Voice Gender */}
        <div>
          <label className="mb-3 flex items-center gap-2 text-sm font-medium">
            <Volume2 className="h-4 w-4" />
            Voice Gender
          </label>
          <div className="flex gap-2">
            {GENDER_OPTIONS.map(gender => (
              <button
                key={gender.value}
                onClick={() => setPreferences(prev => ({ ...prev, voiceGender: gender.value }))}
                className={`flex-1 rounded-lg border p-3 text-center transition-all ${
                  preferences.voiceGender === gender.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-2xl">{gender.emoji}</span>
                <p className="mt-1 text-sm">{gender.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Voice Accent */}
        <div>
          <label className="mb-3 flex items-center gap-2 text-sm font-medium">
            <Globe className="h-4 w-4" />
            Voice Accent
          </label>
          <div className="flex gap-2">
            {ACCENT_OPTIONS.map(accent => (
              <button
                key={accent.value}
                onClick={() => setPreferences(prev => ({ ...prev, voiceAccent: accent.value }))}
                className={`flex-1 rounded-lg border p-3 text-center transition-all ${
                  preferences.voiceAccent === accent.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-2xl">{accent.flag}</span>
                <p className="mt-1 text-sm">{accent.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Avatar Style */}
        <div>
          <label className="mb-3 flex items-center gap-2 text-sm font-medium">
            <Palette className="h-4 w-4" />
            Avatar Style
          </label>
          <div className="flex gap-2">
            {AVATAR_STYLES.map(style => (
              <button
                key={style.value}
                onClick={() => setPreferences(prev => ({ ...prev, avatarStyle: style.value }))}
                className={`flex-1 rounded-lg border p-3 text-center transition-all ${
                  preferences.avatarStyle === style.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="text-sm font-medium">{style.label}</p>
                <p className="mt-1 text-xs text-gray-500">{style.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Background Color */}
        <div>
          <label className="mb-3 flex items-center gap-2 text-sm font-medium">
            <Palette className="h-4 w-4" />
            Chat Background
          </label>
          <div className="grid grid-cols-3 gap-2">
            {BACKGROUND_COLORS.map(bg => (
              <button
                key={bg.value}
                onClick={() => setPreferences(prev => ({ ...prev, backgroundColor: bg.value }))}
                className={`rounded-lg border-2 p-3 transition-all ${
                  preferences.backgroundColor === bg.value
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`h-8 w-full rounded-md ${bg.color} mb-2`} />
                <p className={`text-xs font-medium ${bg.textColor}`}>{bg.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <Button className="w-full" onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Saving...' : 'Save Preferences'}
        </Button>
      </CardContent>
    </Card>
  )
}
