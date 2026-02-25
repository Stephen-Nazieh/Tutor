'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Loader2, ArrowLeft, Save, DollarSign, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { PaymentGatewaySelector, type GatewayOption } from '@/components/payment-gateway-selector'

const SUBJECTS = [
    { id: 'math', name: 'Mathematics' },
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'biology', name: 'Biology' },
    { id: 'english', name: 'English' },
    { id: 'history', name: 'History' },
]

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const TIME_SLOTS = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00'
]

export default function TutorSettings() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const [formData, setFormData] = useState({
        bio: '',
        credentials: '',
        subjects: [] as string[],
        availability: {} as Record<string, string[]>,
        hourlyRate: '',
        paidClassesEnabled: false,
        paymentGatewayPreference: 'HITPAY' as GatewayOption,
        currency: 'SGD'
    })

    useEffect(() => {
        fetch('/api/user/profile')
            .then(res => res.json())
            .then(data => {
                if (data.profile) {
                    setFormData({
                        bio: data.profile.bio || '',
                        credentials: data.profile.credentials || '',
                        subjects: data.profile.specialties || [],
                        availability: data.profile.availability || {},
                        hourlyRate: data.profile.hourlyRate?.toString() || '',
                        paidClassesEnabled: Boolean(data.profile.paidClassesEnabled),
                        paymentGatewayPreference: (data.profile.paymentGatewayPreference === 'AIRWALLEX' ? 'AIRWALLEX' : 'HITPAY') as GatewayOption,
                        currency: data.profile.currency || 'SGD'
                    })
                }
                setLoading(false)
            })
            .catch(err => {
                console.error('Failed to load profile:', err)
                toast.error('Failed to load profile')
                setLoading(false)
            })
    }, [])

    const toggleSubject = (subjectId: string) => {
        setFormData(prev => ({
            ...prev,
            subjects: prev.subjects.includes(subjectId)
                ? prev.subjects.filter(s => s !== subjectId)
                : [...prev.subjects, subjectId]
        }))
    }

    const toggleTimeSlot = (day: string, time: string) => {
        setFormData(prev => {
            const daySlots = prev.availability[day] || []
            const newSlots = daySlots.includes(time)
                ? daySlots.filter(t => t !== time)
                : [...daySlots, time]
            return {
                ...prev,
                availability: {
                    ...prev.availability,
                    [day]: newSlots
                }
            }
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            const response = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bio: formData.bio,
                    credentials: formData.credentials,
                    subjects: formData.subjects,
                    availability: formData.availability,
                    hourlyRate: parseFloat(formData.hourlyRate) || 0,
                    paidClassesEnabled: formData.paidClassesEnabled,
                    paymentGatewayPreference: formData.paymentGatewayPreference,
                    currency: formData.currency || null,
                })
            })

            if (response.ok) {
                toast.success('Profile updated successfully')
            } else {
                throw new Error('Failed to update profile')
            }
        } catch (err) {
            console.error(err)
            toast.error('Failed to update profile')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-green-500" />
                    <p className="text-gray-600">Loading settings...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <header className="bg-white border-b shadow-sm sticky top-0 z-10 safe-top">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/tutor/dashboard">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold">Tutor Settings</h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Professional Profile</CardTitle>
                            <CardDescription>Manage your public teaching profile and rates</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-8">

                                {/* Bio */}
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        placeholder="Tell students about your experience..."
                                        className="min-h-[120px]"
                                    />
                                </div>

                                {/* Credentials */}
                                <div className="space-y-2">
                                    <Label htmlFor="credentials">Credentials</Label>
                                    <Input
                                        id="credentials"
                                        value={formData.credentials}
                                        onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                                        placeholder="PhD in Mathematics, etc."
                                    />
                                </div>

                                {/* Subjects */}
                                <div>
                                    <Label className="mb-3 block">Subjects You Teach</Label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {SUBJECTS.map((subject) => (
                                            <button
                                                key={subject.id}
                                                type="button"
                                                onClick={() => toggleSubject(subject.id)}
                                                className={`p-3 rounded-lg border text-left flex items-center gap-2 transition-colors ${formData.subjects.includes(subject.id)
                                                        ? 'border-green-500 bg-green-50 text-green-700'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <span className="text-sm font-medium">{subject.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Availability */}
                                <div>
                                    <Label className="mb-3 block">Weekly Availability</Label>
                                    <div className="space-y-4 border rounded-lg p-4 max-h-[400px] overflow-y-auto">
                                        {DAYS.map((day) => (
                                            <div key={day} className="border-b pb-4 last:border-0 last:pb-0">
                                                <h4 className="font-medium mb-2 text-sm text-gray-700">{day}</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {TIME_SLOTS.map((time) => (
                                                        <button
                                                            key={time}
                                                            type="button"
                                                            onClick={() => toggleTimeSlot(day, time)}
                                                            className={`px-2 py-1 text-xs rounded border transition-colors ${formData.availability[day]?.includes(time)
                                                                    ? 'bg-green-500 text-white border-green-500'
                                                                    : 'border-gray-100 hover:border-green-300'
                                                                }`}
                                                        >
                                                            {time}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Paid classes & payment */}
                                <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label className="text-base font-medium">Paid classes</Label>
                                            <p className="text-sm text-gray-500 mt-0.5">Allow students to pay for your classes (hourly rate × duration)</p>
                                        </div>
                                        <button
                                            type="button"
                                            role="switch"
                                            aria-checked={formData.paidClassesEnabled}
                                            onClick={() => setFormData(prev => ({ ...prev, paidClassesEnabled: !prev.paidClassesEnabled }))}
                                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${formData.paidClassesEnabled ? 'bg-green-600' : 'bg-gray-200'}`}
                                        >
                                            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform ${formData.paidClassesEnabled ? 'translate-x-5' : 'translate-x-1'}`} />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Label htmlFor="hourlyRate" className="whitespace-nowrap">Default hourly rate (SGD)</Label>
                                        <div className="relative max-w-[150px]">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <Input
                                                id="hourlyRate"
                                                type="number"
                                                min={0}
                                                step={0.01}
                                                value={formData.hourlyRate}
                                                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                                                className="pl-9 font-bold"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <CreditCard className="h-4 w-4 text-gray-500" />
                                            <Label className="text-base font-medium">Payment gateway preference</Label>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-3">Used when you create paid classes (can be overridden per class later)</p>
                                        <PaymentGatewaySelector
                                            value={formData.paymentGatewayPreference}
                                            onChange={(v) => setFormData(prev => ({ ...prev, paymentGatewayPreference: v }))}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="currency" className="text-base font-medium">Currency</Label>
                                        <p className="text-sm text-gray-500 mb-2">Default currency for your paid classes</p>
                                        <Select value={formData.currency} onValueChange={(v) => setFormData(prev => ({ ...prev, currency: v }))}>
                                            <SelectTrigger id="currency" className="max-w-[140px]">
                                                <SelectValue placeholder="Currency" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="SGD">SGD</SelectItem>
                                                <SelectItem value="USD">USD</SelectItem>
                                                <SelectItem value="EUR">EUR</SelectItem>
                                                <SelectItem value="GBP">GBP</SelectItem>
                                                <SelectItem value="CNY">CNY</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button type="submit" disabled={saving} className="bg-green-600 hover:bg-green-700">
                                        {saving ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Save Profile
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
