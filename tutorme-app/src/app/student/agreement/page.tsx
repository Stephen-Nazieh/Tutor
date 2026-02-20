'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { AgreementText } from '@/components/legal/AgreementText'
import { Loader2, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'

export default function AgreementPage() {
    const router = useRouter()
    const [accepted, setAccepted] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const getCsrf = async () => {
        const res = await fetch('/api/csrf', { credentials: 'include' })
        const data = await res.json().catch(() => ({}))
        return data?.token ?? null
    }

    const handleSubmit = async () => {
        if (!accepted) return

        setSubmitting(true)
        try {
            const csrf = await getCsrf()
            const res = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(csrf && { 'X-CSRF-Token': csrf }),
                },
                body: JSON.stringify({ tosAccepted: true })
            })

            if (res.ok) {
                toast.success('Agreement signed successfully')
                router.push('/student/dashboard')
                router.refresh()
            } else {
                throw new Error('Failed to update profile')
            }
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-lg">
                <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShieldCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl">Terms of Service Update</CardTitle>
                    <CardDescription>
                        Please review and accept our updated terms to continue using TutorMe.
                    </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] overflow-y-auto border rounded-md p-6 mb-6 bg-white">
                    <AgreementText />
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="terms"
                            checked={accepted}
                            onCheckedChange={(checked) => setAccepted(checked as boolean)}
                        />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I have read and agree to the Terms of Service, Privacy Policy, and Code of Conduct.
                        </label>
                    </div>
                    <Button
                        className="w-full"
                        onClick={handleSubmit}
                        disabled={!accepted || submitting}
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing...
                            </>
                        ) : (
                            'I Agree & Continue'
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
