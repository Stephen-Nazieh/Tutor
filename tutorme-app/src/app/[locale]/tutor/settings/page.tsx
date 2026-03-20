'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'
import { REGIONS } from '@/lib/tutoring/categories-new'

export default function TutorSettings() {
  const { data: session } = useSession()
  const [securityOpen, setSecurityOpen] = useState(true)
  const [billingOpen, setBillingOpen] = useState(true)
  const [taxOpen, setTaxOpen] = useState(true)
  const [accountOpen, setAccountOpen] = useState(true)
  const [accountStatus, setAccountStatus] = useState('active')
  const [preferredLanguage, setPreferredLanguage] = useState('English')
  const [timeZone, setTimeZone] = useState('Asia/Shanghai')
  const [billingAddress, setBillingAddress] = useState('')
  const [renewTerm, setRenewTerm] = useState('1')
  const [payoutBalance] = useState('$0.00')
  const [taxRegion, setTaxRegion] = useState('')
  const [taxCountry, setTaxCountry] = useState('')
  const [taxLegalName, setTaxLegalName] = useState('')
  const [taxAddress, setTaxAddress] = useState('')
  const [taxId, setTaxId] = useState('')
  const [taxEntityType, setTaxEntityType] = useState('Individual')
  const languageOptions = [
    'English',
    'Cantonese',
    'Mandarin Chinese',
    'French',
    'Spanish',
    'Portuguese',
    'Korean',
    'Hindi',
    'Japanese',
    'Indonesian',
    'Vietnamese',
    'Thai',
  ]
  const timeZoneOptions = useMemo(() => {
    if (typeof Intl !== 'undefined' && 'supportedValuesOf' in Intl) {
      return (
        Intl as unknown as { supportedValuesOf: (value: 'timeZone') => string[] }
      ).supportedValuesOf('timeZone')
    }
    return ['UTC', 'Asia/Shanghai', 'America/New_York', 'Europe/London']
  }, [])
  const selectedTaxRegion = useMemo(
    () => REGIONS.find(region => region.id === taxRegion),
    [taxRegion]
  )
  const taxCountryOptions = useMemo(
    () => (selectedTaxRegion ? selectedTaxRegion.countries : []),
    [selectedTaxRegion]
  )
  const loginActivity = [
    { id: 'login-1', label: 'Web · Shanghai, CN · Today 09:24' },
    { id: 'login-2', label: 'Mobile · Singapore · Yesterday 18:11' },
    { id: 'login-3', label: 'Web · Beijing, CN · Mar 14, 2026 10:03' },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      <header className="safe-top sticky top-0 z-10 border-b bg-white shadow-sm">
        <div className="mx-auto flex w-full items-center justify-between gap-4 px-6 py-4">
          <Link
            href="/tutor/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>
          <h1 className="text-xl font-bold text-[#0F172A]">Account</h1>
        </div>
      </header>

      <main className="mx-auto w-full space-y-6 px-6 py-8">
        <Card className="border border-[#E2E8F0] shadow-sm">
          <CardHeader
            className="cursor-pointer select-none pb-3"
            onClick={() => setSecurityOpen(prev => !prev)}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-[#1F2933]">Security and Login</CardTitle>
              {securityOpen ? (
                <ChevronUp className="h-4 w-4 text-[#64748B]" />
              ) : (
                <ChevronDown className="h-4 w-4 text-[#64748B]" />
              )}
            </div>
          </CardHeader>
          {securityOpen && (
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-[#1F2933]">Change password</Label>
                  <Button
                    className="w-full bg-[#1D4ED8] text-white hover:bg-[#1B45C2]"
                    onClick={() => toast.message('Password reset flow pending')}
                  >
                    Change password
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1F2933]">Two-factor authentication (2FA)</Label>
                  <Button
                    variant="outline"
                    className="w-full border-[#1D4ED8] text-[#1D4ED8] hover:bg-[#1D4ED8]/10"
                    onClick={() => toast.message('2FA setup coming soon')}
                  >
                    Enable 2FA
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[#1F2933]">Login activity</Label>
                <div className="space-y-2 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm text-[#1F2933]">
                  {loginActivity.map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                      <span>{item.label}</span>
                      <span className="text-xs text-[#64748B]">Verified</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        <Card className="border border-[#E2E8F0] shadow-sm">
          <CardHeader
            className="cursor-pointer select-none pb-3"
            onClick={() => setBillingOpen(prev => !prev)}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-[#1F2933]">Billing and Payment</CardTitle>
              {billingOpen ? (
                <ChevronUp className="h-4 w-4 text-[#64748B]" />
              ) : (
                <ChevronDown className="h-4 w-4 text-[#64748B]" />
              )}
            </div>
          </CardHeader>
          {billingOpen && (
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-[#1F2933]">Email</Label>
                  <Input
                    value={session?.user?.email ?? ''}
                    disabled
                    className="border-[#E2E8F0] bg-[#F8FAFC] focus-visible:ring-[#4FD1C5]"
                    placeholder="Email on file"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1F2933]">Billing address</Label>
                  <Input
                    value={billingAddress}
                    onChange={e => setBillingAddress(e.target.value)}
                    className="border-[#E2E8F0] focus-visible:ring-[#4FD1C5]"
                    placeholder="Street, city, postal code"
                  />
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <div className="text-sm font-semibold text-[#1F2933]">Subscription Plan</div>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="space-y-1">
                    <Label className="text-[#1F2933]">Renew Subscription</Label>
                    <Select value={renewTerm} onValueChange={setRenewTerm}>
                      <SelectTrigger className="border-[#E2E8F0] bg-white">
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 month</SelectItem>
                        <SelectItem value="2">2 months</SelectItem>
                        <SelectItem value="12">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[#1F2933]">Subscription Cost</Label>
                    <div className="h-10 rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#1F2933]">
                      $15
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[#1F2933]">Renew</Label>
                    <Button
                      className="w-full bg-[#4FD1C5] text-[#1F2933] hover:bg-[#3CC6B9]"
                      onClick={() => toast.message('Subscription renewal queued')}
                    >
                      Renew
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    className="border-[#1D4ED8] text-[#1D4ED8] hover:bg-[#1D4ED8]/10"
                    onClick={() => toast.message('Upgrade flow pending')}
                  >
                    Upgrade plan
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#F59E0B] text-[#92400E] hover:bg-[#FDE68A]"
                    onClick={() => {
                      if (confirm('Are you sure you want to cancel your subscription?')) {
                        toast.message(
                          'Thank you for being with us. We hope you return another time.'
                        )
                      }
                    }}
                  >
                    Cancel subscription
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#4FD1C5] text-[#1F2933] hover:bg-[#4FD1C5]/10"
                    onClick={() => toast.message('Payment history loading')}
                  >
                    Payment history
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-[#1F2933]">Payout Available Balance</Label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#1F2933]">
                      {payoutBalance}
                    </div>
                    <Button
                      className="bg-[#1D4ED8] text-white hover:bg-[#1B45C2]"
                      onClick={() => toast.message('Withdrawal request sent')}
                    >
                      Withdraw
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1F2933]">Download earnings report</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      className="border-[#4FD1C5] text-[#1F2933] hover:bg-[#4FD1C5]/10"
                      onClick={() => toast.message('CSV report generated')}
                    >
                      CSV
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#4FD1C5] text-[#1F2933] hover:bg-[#4FD1C5]/10"
                      onClick={() => toast.message('PDF report generated')}
                    >
                      PDF
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        <Card className="border border-[#E2E8F0] shadow-sm">
          <CardHeader
            className="cursor-pointer select-none pb-3"
            onClick={() => setTaxOpen(prev => !prev)}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-[#1F2933]">Tax Information</CardTitle>
              {taxOpen ? (
                <ChevronUp className="h-4 w-4 text-[#64748B]" />
              ) : (
                <ChevronDown className="h-4 w-4 text-[#64748B]" />
              )}
            </div>
          </CardHeader>
          {taxOpen && (
            <CardContent className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-[#1F2933]">Region</Label>
                  <Select
                    value={taxRegion}
                    onValueChange={value => {
                      setTaxRegion(value)
                      setTaxCountry('')
                    }}
                  >
                    <SelectTrigger className="border-[#E2E8F0] bg-white">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {REGIONS.map(region => (
                        <SelectItem key={region.id} value={region.id}>
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1F2933]">Country</Label>
                  <Select value={taxCountry} onValueChange={setTaxCountry} disabled={!taxRegion}>
                    <SelectTrigger className="border-[#E2E8F0] bg-white">
                      <SelectValue
                        placeholder={taxRegion ? 'Select country' : 'Select region first'}
                      />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {taxCountryOptions.map(country => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1F2933]">Legal Name</Label>
                  <Input
                    value={taxLegalName}
                    onChange={e => setTaxLegalName(e.target.value)}
                    className="border-[#E2E8F0] focus-visible:ring-[#4FD1C5]"
                    placeholder="Legal name"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1F2933]">Address</Label>
                  <Input
                    value={taxAddress}
                    onChange={e => setTaxAddress(e.target.value)}
                    className="border-[#E2E8F0] focus-visible:ring-[#4FD1C5]"
                    placeholder="Registered address"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1F2933]">Tax ID (optional)</Label>
                  <Input
                    value={taxId}
                    onChange={e => setTaxId(e.target.value)}
                    className="border-[#E2E8F0] focus-visible:ring-[#4FD1C5]"
                    placeholder="Tax ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1F2933]">Business / Individual</Label>
                  <Select value={taxEntityType} onValueChange={setTaxEntityType}>
                    <SelectTrigger className="border-[#E2E8F0] bg-white">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Individual">Individual</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className="border-[#4FD1C5] text-[#1F2933] hover:bg-[#4FD1C5]/10"
                  onClick={() => toast.message('CSV report generated')}
                >
                  Download earnings report (CSV)
                </Button>
                <Button
                  variant="outline"
                  className="border-[#4FD1C5] text-[#1F2933] hover:bg-[#4FD1C5]/10"
                  onClick={() => toast.message('PDF report generated')}
                >
                  Download earnings report (PDF)
                </Button>
              </div>
              <Button
                className="bg-[#4FD1C5] text-[#1F2933] hover:bg-[#3CC6B9]"
                onClick={() => toast.message('Tax information saved')}
              >
                Confirm Changes
              </Button>
            </CardContent>
          )}
        </Card>

        <Card className="border border-[#E2E8F0] shadow-sm">
          <CardHeader
            className="cursor-pointer select-none pb-3"
            onClick={() => setAccountOpen(prev => !prev)}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-[#1F2933]">Account Management</CardTitle>
              {accountOpen ? (
                <ChevronUp className="h-4 w-4 text-[#64748B]" />
              ) : (
                <ChevronDown className="h-4 w-4 text-[#64748B]" />
              )}
            </div>
          </CardHeader>
          {accountOpen && (
            <CardContent className="space-y-5">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label className="text-[#1F2933]">Account status</Label>
                  <Select value={accountStatus} onValueChange={setAccountStatus}>
                    <SelectTrigger className="border-[#E2E8F0] bg-white">
                      <SelectValue placeholder="Account status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="dormant">Dormant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1F2933]">Language settings</Label>
                  <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                    <SelectTrigger className="border-[#E2E8F0] bg-white">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {languageOptions.map(language => (
                        <SelectItem key={language} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1F2933]">Time zone</Label>
                  <Select value={timeZone} onValueChange={setTimeZone}>
                    <SelectTrigger className="border-[#E2E8F0] bg-white">
                      <SelectValue placeholder="Time zone" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {timeZoneOptions.map(zone => (
                        <SelectItem key={zone} value={zone}>
                          {zone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-3 rounded-2xl border border-[#FCA5A5]/40 bg-[#FEF2F2] p-4">
                <div className="text-sm font-semibold text-[#991B1B]">Delete Account (GDPR)</div>
                <p className="text-sm text-[#7F1D1D]">
                  Permanently delete your account and personal data. You can reactivate within two
                  months if you change your mind.
                </p>
                <Button
                  variant="outline"
                  className="border-[#DC2626] text-[#991B1B] hover:bg-[#FEE2E2]"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete your account permanently?')) {
                      toast.message(
                        'Account deletion requested. Your account will be dormant for 2 months, and you can reactivate within this time.'
                      )
                    }
                  }}
                >
                  Delete account
                </Button>
              </div>
              <Button
                className="bg-[#4FD1C5] text-[#1F2933] hover:bg-[#3CC6B9]"
                onClick={() => toast.message('Account settings updated')}
              >
                Confirm Changes
              </Button>
            </CardContent>
          )}
        </Card>
      </main>
    </div>
  )
}
