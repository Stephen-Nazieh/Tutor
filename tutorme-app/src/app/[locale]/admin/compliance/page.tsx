'use client'

import { useEffect, useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Trash2,
  Download,
  Users,
  Eye,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ExternalLink,
  RefreshCw,
} from 'lucide-react'
import { toast } from 'sonner'

interface ComplianceSummary {
  pendingDeletionRequests: number
  completedDeletionsLast30Days: number
  pendingExportRequests: number
  minorsWithoutParentalConsent: number
  thirdPartyServicesAudited: number
  thirdPartyServicesNonCompliant: number
}

interface DeletionRequest {
  id: string
  userId: string
  requestedBy: string
  reason: string | null
  status: string
  requestedAt: string
  processedAt: string | null
  adminNotes: string | null
}

interface PiiAccessLog {
  id: string
  accessorId: string
  accessorRole: string
  targetUserId: string | null
  resourceType: string
  action: string
  endpoint: string
  accessedAt: string
  legalBasis: string | null
}

interface ThirdParty {
  id: string
  serviceName: string
  category: string
  gdprCompliant: boolean
  coppaCompliant: boolean
  ferpaCompliant: boolean
  dataProcessingAgreement: boolean
  noTrainingClause: boolean
  privacyPolicyUrl: string | null
  notes: string | null
  lastAuditedAt: string
}

interface ComplianceData {
  summary: ComplianceSummary
  pendingDeletions: DeletionRequest[]
  exportRequests: any[]
  recentPiiAccess: PiiAccessLog[]
  thirdParties: ThirdParty[]
  minorUsers: any[]
  recentConsents: any[]
}

const COMPLIANCE_BADGES = [
  { label: 'COPPA', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { label: 'FERPA', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { label: 'GDPR', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
]

function ComplianceBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${ok ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'}`}
    >
      {ok ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
      {label}
    </span>
  )
}

export default function CompliancePage() {
  const [data, setData] = useState<ComplianceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/compliance', { credentials: 'include' })
      if (!res.ok) throw new Error('Failed to load')
      setData(await res.json())
    } catch {
      toast.error('Failed to load compliance data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const processDeletion = async (
    requestId: string,
    action: 'approve_deletion' | 'reject_deletion'
  ) => {
    setProcessingId(requestId)
    try {
      const res = await fetch('/api/admin/compliance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action, requestId }),
      })
      const result = await res.json()
      if (res.ok) {
        toast.success(result.message)
        load()
      } else {
        toast.error(result.error || 'Action failed')
      }
    } finally {
      setProcessingId(null)
    }
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )

  const s = data?.summary

  return (
    <div className="max-w-7xl space-y-6 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <Shield className="h-7 w-7 text-blue-600" />
            Privacy & Compliance
          </h1>
          <p className="mt-1 text-muted-foreground">
            COPPA, FERPA & GDPR compliance dashboard — manage data rights, access logs, and
            third-party audits.
          </p>
          <div className="mt-3 flex gap-2">
            {COMPLIANCE_BADGES.map(b => (
              <span
                key={b.label}
                className={`rounded-full border px-3 py-1 text-xs font-bold ${b.color}`}
              >
                {b.label} Active
              </span>
            ))}
          </div>
        </div>
        <Button variant="outline" onClick={load} className="gap-2">
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card className={s?.pendingDeletionRequests ? 'border-red-200 bg-red-50' : ''}>
          <CardHeader className="pb-1">
            <CardTitle className="flex items-center gap-1 text-sm font-medium">
              <Trash2 className="h-4 w-4 text-red-500" /> Deletion Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{s?.pendingDeletionRequests ?? 0}</div>
            <p className="text-xs text-muted-foreground">pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="flex items-center gap-1 text-sm font-medium">
              <CheckCircle2 className="h-4 w-4 text-green-500" /> Deletions Done
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{s?.completedDeletionsLast30Days ?? 0}</div>
            <p className="text-xs text-muted-foreground">last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="flex items-center gap-1 text-sm font-medium">
              <Download className="h-4 w-4 text-blue-500" /> Export Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{s?.pendingExportRequests ?? 0}</div>
            <p className="text-xs text-muted-foreground">pending</p>
          </CardContent>
        </Card>

        <Card className={s?.minorsWithoutParentalConsent ? 'border-amber-200 bg-amber-50' : ''}>
          <CardHeader className="pb-1">
            <CardTitle className="flex items-center gap-1 text-sm font-medium">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> Minors (COPPA)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {s?.minorsWithoutParentalConsent ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">missing consent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="flex items-center gap-1 text-sm font-medium">
              <Eye className="h-4 w-4 text-purple-500" /> 3rd Parties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{s?.thirdPartyServicesAudited ?? 0}</div>
            <p className="text-xs text-muted-foreground">audited</p>
          </CardContent>
        </Card>

        <Card className={s?.thirdPartyServicesNonCompliant ? 'border-orange-200 bg-orange-50' : ''}>
          <CardHeader className="pb-1">
            <CardTitle className="flex items-center gap-1 text-sm font-medium">
              <ShieldAlert className="h-4 w-4 text-orange-500" /> Non-Compliant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {s?.thirdPartyServicesNonCompliant ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">3rd parties</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="deletions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="deletions">
            Deletion Requests
            {(s?.pendingDeletionRequests ?? 0) > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 text-xs">
                {s?.pendingDeletionRequests}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="access-log">Access Audit Log</TabsTrigger>
          <TabsTrigger value="third-parties">Third-Party Audit</TabsTrigger>
        </TabsList>

        {/* Deletion Requests */}
        <TabsContent value="deletions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Data Deletion Requests</CardTitle>
              <CardDescription>
                GDPR Art.17 — must be processed within 30 days of receipt.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(data?.pendingDeletions ?? []).length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  <ShieldCheck className="mx-auto mb-2 h-10 w-10 text-green-400" />
                  No pending deletion requests. All caught up!
                </div>
              ) : (
                <div className="space-y-3">
                  {data?.pendingDeletions.map(r => (
                    <div key={r.id} className="space-y-2 rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm font-medium">
                            User:{' '}
                            <code className="rounded bg-muted px-1 text-xs">
                              {r.userId.slice(0, 12)}...
                            </code>
                          </div>
                          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" /> Requested: {formatDate(r.requestedAt)}
                          </div>
                          {r.reason && (
                            <div className="mt-1 text-xs text-muted-foreground">
                              Reason: {r.reason}
                            </div>
                          )}
                        </div>
                        <Badge
                          variant="outline"
                          className="border-amber-300 bg-amber-50 text-amber-600"
                        >
                          {r.status}
                        </Badge>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={processingId === r.id}
                          onClick={() => processDeletion(r.id, 'approve_deletion')}
                        >
                          <Trash2 className="mr-1 h-3 w-3" /> Approve & Queue
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={processingId === r.id}
                          onClick={() => processDeletion(r.id, 'reject_deletion')}
                        >
                          <XCircle className="mr-1 h-3 w-3" /> Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* PII Access Log */}
        <TabsContent value="access-log" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>PII Access Audit Log</CardTitle>
              <CardDescription>
                FERPA compliance — who accessed what data, when. Hashed IPs, no actual data values
                stored.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(data?.recentPiiAccess ?? []).length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No access events logged yet.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 pr-4 text-left font-medium">Accessor</th>
                        <th className="py-2 pr-4 text-left font-medium">Role</th>
                        <th className="py-2 pr-4 text-left font-medium">Resource</th>
                        <th className="py-2 pr-4 text-left font-medium">Action</th>
                        <th className="py-2 pr-4 text-left font-medium">Endpoint</th>
                        <th className="py-2 text-left font-medium">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.recentPiiAccess.map(log => (
                        <tr key={log.id} className="border-b hover:bg-muted/50">
                          <td className="py-2 pr-4 font-mono">{log.accessorId.slice(0, 8)}...</td>
                          <td className="py-2 pr-4">
                            <Badge variant="outline" className="text-xs">
                              {log.accessorRole}
                            </Badge>
                          </td>
                          <td className="py-2 pr-4 text-muted-foreground">{log.resourceType}</td>
                          <td className="py-2 pr-4">
                            <span
                              className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                                log.action === 'delete'
                                  ? 'bg-red-100 text-red-700'
                                  : log.action === 'export'
                                    ? 'bg-blue-100 text-blue-700'
                                    : log.action === 'read'
                                      ? 'bg-gray-100 text-gray-700'
                                      : 'bg-amber-100 text-amber-700'
                              }`}
                            >
                              {log.action}
                            </span>
                          </td>
                          <td className="py-2 pr-4 font-mono text-muted-foreground">
                            {log.endpoint}
                          </td>
                          <td className="whitespace-nowrap py-2 text-muted-foreground">
                            {formatDate(log.accessedAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Third-Party Audit */}
        <TabsContent value="third-parties" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Service Audit</CardTitle>
              <CardDescription>
                Phase 3 compliance — all external services that process student data must be EdTech
                compliant.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(data?.thirdParties ?? []).length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    No third-party services audited yet.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Add services via the database to track compliance.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data?.thirdParties.map(tp => (
                    <div key={tp.id} className="rounded-lg border p-4">
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <div className="font-medium">{tp.serviceName}</div>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {tp.category}
                          </Badge>
                        </div>
                        {tp.privacyPolicyUrl && (
                          <a
                            href={tp.privacyPolicyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-blue-500 hover:underline"
                          >
                            Privacy Policy <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <ComplianceBadge ok={tp.gdprCompliant} label="GDPR" />
                        <ComplianceBadge ok={tp.coppaCompliant} label="COPPA" />
                        <ComplianceBadge ok={tp.ferpaCompliant} label="FERPA" />
                        <ComplianceBadge ok={tp.dataProcessingAgreement} label="DPA Signed" />
                        {tp.noTrainingClause && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700">
                            <ShieldCheck className="h-3 w-3" /> No-Training Clause
                          </span>
                        )}
                      </div>
                      {tp.notes && <p className="mt-2 text-xs text-muted-foreground">{tp.notes}</p>}
                      <p className="mt-2 text-xs text-muted-foreground">
                        Last audited: {formatDate(tp.lastAuditedAt)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Default third-party services info box */}
              <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-800">
                  <Shield className="h-4 w-4" /> Configured AI Data Policy
                </h4>
                <p className="text-xs text-blue-700">
                  All AI providers (Kimi) are configured with the <strong>no-training</strong>{' '}
                  system instruction. Student and tutor data is explicitly marked as not available
                  for model training. This is stated in our Privacy Policy.
                </p>
                <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
                  {[{ name: 'Kimi K2.5', note: '⚠️ Verify DPA with Moonshot AI' }].map(ai => (
                    <div
                      key={ai.name}
                      className="rounded border border-blue-100 bg-white p-2 text-xs"
                    >
                      <div className="font-medium">{ai.name}</div>
                      <div className="text-muted-foreground">{ai.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
