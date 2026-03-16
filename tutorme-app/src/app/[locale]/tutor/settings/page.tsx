'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'

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
  const [taxCountry, setTaxCountry] = useState('')
  const [taxLegalName, setTaxLegalName] = useState('')
  const [taxAddress, setTaxAddress] = useState('')
  const [taxId, setTaxId] = useState('')
  const [taxEntityType, setTaxEntityType] = useState('Individual')
  const loginActivity = [
    { id: 'login-1', label: 'Web · Shanghai, CN · Today 09:24' },
    { id: 'login-2', label: 'Mobile · Singapore · Yesterday 18:11' },
    { id: 'login-3', label: 'Web · Beijing, CN · Mar 14, 2026 10:03' },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      <header className="bg-white border-b shadow-sm sticky top-0 z-10 safe-top">
        <div className="mx-auto flex w-full items-center justify-between gap-4 px-6 py-4">
          <Link href="/tutor/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>
          <h1 className="text-xl font-bold text-[#0F172A]">Account</h1>
        </div>
      </header>

      <main className="mx-auto w-full px-6 py-8 space-y-6">
        <Card className="border border-[#E2E8F0] shadow-sm">
          <CardHeader
            className="cursor-pointer select-none pb-3"
            onClick={() => setSecurityOpen((prev) => !prev)}
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
                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm text-[#1F2933] space-y-2">
                  {loginActivity.map((item) => (
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
            onClick={() => setBillingOpen((prev) => !prev)}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-[#1F2933]">Email Billing and Payment</CardTitle>
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
                    onChange={(e) => setBillingAddress(e.target.value)}
                    className="border-[#E2E8F0] focus-visible:ring-[#4FD1C5]"
                    placeholder="Street, city, postal code"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-3">
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
                    Upgrade or cancel plan
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

              <div className="rounded-2xl border border-[#F59E0B]/30 bg-[#FFFBEB] p-4 space-y-3">
                <div className="text-sm font-semibold text-[#92400E]">Cancel Subscription</div>
                <p className="text-sm text-[#92400E]">
                  Are you sure? Once you delete your account, your account will be dormant for 2 months. You can login and
                  activate your account within this time.
                </p>
                <Button
                  variant="outline"
                  className="border-[#F59E0B] text-[#92400E] hover:bg-[#FDE68A]"
                  onClick={() => toast.message('Cancellation request recorded')}
                >
                  Cancel
                </Button>
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
            onClick={() => setTaxOpen((prev) => !prev)}
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
                  <Label className="text-[#1F2933]">Country</Label>
                  <Input
                    value={taxCountry}
                    onChange={(e) => setTaxCountry(e.target.value)}
                    className="border-[#E2E8F0] focus-visible:ring-[#4FD1C5]"
                    placeholder="Country"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1F2933]">Legal Name</Label>
                  <Input
                    value={taxLegalName}
                    onChange={(e) => setTaxLegalName(e.target.value)}
                    className="border-[#E2E8F0] focus-visible:ring-[#4FD1C5]"
                    placeholder="Legal name"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1F2933]">Address</Label>
                  <Input
                    value={taxAddress}
                    onChange={(e) => setTaxAddress(e.target.value)}
                    className="border-[#E2E8F0] focus-visible:ring-[#4FD1C5]"
                    placeholder="Registered address"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1F2933]">Tax ID (optional)</Label>
                  <Input
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
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
            onClick={() => setAccountOpen((prev) => !prev)}
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
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1F2933]">Time zone</Label>
                  <Select value={timeZone} onValueChange={setTimeZone}>
                    <SelectTrigger className="border-[#E2E8F0] bg-white">
                      <SelectValue placeholder="Time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Shanghai">Asia/Shanghai</SelectItem>
                      <SelectItem value="America/Los_Angeles">America/Los_Angeles</SelectItem>
                      <SelectItem value="America/New_York">America/New_York</SelectItem>
                      <SelectItem value="Europe/London">Europe/London</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
