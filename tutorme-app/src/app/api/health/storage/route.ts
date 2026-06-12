/**
 * GET /api/health/storage
 *
 * Diagnostic endpoint for Google Cloud Storage configuration.
 * Validates env vars, credentials, bucket access, upload, signed URL generation,
 * and public ACL capabilities — all without requiring authentication.
 *
 * Use this to diagnose why uploads fail or why signed URLs cannot be generated.
 */

import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface StorageCheck {
  name: string
  status: 'healthy' | 'warning' | 'error' | 'not_configured'
  message: string
  duration: number
  details?: Record<string, unknown>
}

interface StorageHealthResult {
  overall: 'healthy' | 'warning' | 'error' | 'not_configured'
  checks: StorageCheck[]
  timestamp: string
  recommendations: string[]
}

export async function GET() {
  const startTime = Date.now()
  const checks: StorageCheck[] = []
  const recommendations: string[] = []

  // ─── 1. Environment variables ────────────────────────────────────────────
  const envCheck = await checkEnvVars()
  checks.push(envCheck)
  if (envCheck.status !== 'healthy') {
    recommendations.push('Set GCS_BUCKET, GCP_PROJECT_ID, and GCP_SA_KEY in your environment.')
  }

  // If GCS is not configured at all, return early with a clear not_configured state
  if (envCheck.status === 'not_configured') {
    const result: StorageHealthResult = {
      overall: 'not_configured',
      checks,
      timestamp: new Date().toISOString(),
      recommendations: [
        'GCS is not configured. Uploads will fall back to local disk storage (.local-storage/).',
        'If you want GCS uploads, set GCS_BUCKET, GCP_PROJECT_ID, and GCP_SA_KEY.',
      ],
    }
    return NextResponse.json(result, { status: 200 })
  }

  // ─── 2. Service account key validation ───────────────────────────────────
  const saCheck = await checkServiceAccountKey()
  checks.push(saCheck)
  if (saCheck.status !== 'healthy') {
    recommendations.push(
      'GCP_SA_KEY must be a valid JSON service-account key with type, project_id, private_key, and client_email fields.'
    )
  }

  // ─── 3. Bucket access ────────────────────────────────────────────────────
  const bucketCheck = await checkBucketAccess()
  checks.push(bucketCheck)
  if (bucketCheck.status !== 'healthy') {
    recommendations.push('Ensure the service account has roles/storage.objectAdmin on the bucket.')
    recommendations.push('Verify the bucket name and region are correct.')
  }

  // ─── 4. Upload + signed URL + makePublic test ────────────────────────────
  const uploadCheck = await checkUploadAndSignedUrl()
  checks.push(uploadCheck)
  if (uploadCheck.status !== 'healthy') {
    const details = uploadCheck.details ?? {}
    if (details.uploadFailed) {
      recommendations.push(
        'Upload failed — check that the service account can write to the bucket.'
      )
    }
    if (details.signedUrlFailed) {
      recommendations.push(
        'Signed URL generation failed — grant the service account roles/iam.serviceAccountTokenCreator (or verify the private_key in GCP_SA_KEY is valid).'
      )
    }
    if (details.makePublicFailed && !details.uniformBucketLevelAccess) {
      recommendations.push(
        'makePublic() failed for a reason other than uniform bucket-level access.'
      )
    }
  }

  const overall = calculateOverallStatus(checks)
  const result: StorageHealthResult = {
    overall,
    checks,
    timestamp: new Date().toISOString(),
    recommendations:
      recommendations.length > 0 ? recommendations : ['GCS storage is fully operational.'],
  }

  return NextResponse.json(result, {
    status: overall === 'error' ? 503 : overall === 'warning' ? 200 : 200,
  })
}

// ─── Individual checks ──────────────────────────────────────────────────────

async function checkEnvVars(): Promise<StorageCheck> {
  const start = Date.now()
  const bucket = process.env.GCS_BUCKET
  const projectId = process.env.GCP_PROJECT_ID
  const saKey = process.env.GCP_SA_KEY

  const missing: string[] = []
  if (!bucket) missing.push('GCS_BUCKET')
  if (!projectId) missing.push('GCP_PROJECT_ID')
  if (!saKey) missing.push('GCP_SA_KEY')

  if (missing.length === 3) {
    return {
      name: 'environment_variables',
      status: 'not_configured',
      message: 'GCS is not configured.',
      duration: Date.now() - start,
      details: { missing },
    }
  }

  if (missing.length > 0) {
    return {
      name: 'environment_variables',
      status: 'error',
      message: `Missing required environment variables: ${missing.join(', ')}`,
      duration: Date.now() - start,
      details: {
        missing,
        present: ['GCS_BUCKET', 'GCP_PROJECT_ID', 'GCP_SA_KEY'].filter(v => !!process.env[v]),
      },
    }
  }

  return {
    name: 'environment_variables',
    status: 'healthy',
    message: 'All required environment variables are present.',
    duration: Date.now() - start,
    details: { bucket, projectId: projectId!, hasSaKey: true },
  }
}

async function checkServiceAccountKey(): Promise<StorageCheck> {
  const start = Date.now()
  const saKeyRaw = process.env.GCP_SA_KEY

  if (!saKeyRaw) {
    return {
      name: 'service_account_key',
      status: 'not_configured',
      message: 'GCP_SA_KEY is not set.',
      duration: Date.now() - start,
    }
  }

  let parsed: Record<string, unknown>
  try {
    parsed = JSON.parse(saKeyRaw) as Record<string, unknown>
  } catch {
    return {
      name: 'service_account_key',
      status: 'error',
      message: 'GCP_SA_KEY is not valid JSON.',
      duration: Date.now() - start,
    }
  }

  const requiredFields = ['type', 'project_id', 'private_key', 'client_email']
  const missingFields = requiredFields.filter(f => !parsed[f])

  if (missingFields.length > 0) {
    return {
      name: 'service_account_key',
      status: 'error',
      message: `GCP_SA_KEY is missing required fields: ${missingFields.join(', ')}`,
      duration: Date.now() - start,
      details: { missingFields },
    }
  }

  if (parsed.type !== 'service_account') {
    return {
      name: 'service_account_key',
      status: 'error',
      message: `GCP_SA_KEY type must be "service_account", got "${parsed.type}".`,
      duration: Date.now() - start,
      details: { type: parsed.type },
    }
  }

  return {
    name: 'service_account_key',
    status: 'healthy',
    message: 'Service account key is valid JSON with all required fields.',
    duration: Date.now() - start,
    details: {
      project_id: parsed.project_id,
      client_email: parsed.client_email,
      has_private_key:
        typeof parsed.private_key === 'string' && (parsed.private_key as string).length > 0,
    },
  }
}

async function checkBucketAccess(): Promise<StorageCheck> {
  const start = Date.now()
  const bucketName = process.env.GCS_BUCKET

  if (!bucketName) {
    return {
      name: 'bucket_access',
      status: 'not_configured',
      message: 'GCS_BUCKET is not set.',
      duration: Date.now() - start,
    }
  }

  try {
    const { getStorage } = await import('@/lib/storage/gcs')
    const storage = await getStorage()
    const [exists] = await storage.bucket(bucketName).exists()

    if (!exists) {
      return {
        name: 'bucket_access',
        status: 'error',
        message: `Bucket "${bucketName}" does not exist or the service account cannot access it.`,
        duration: Date.now() - start,
        details: { bucket: bucketName },
      }
    }

    return {
      name: 'bucket_access',
      status: 'healthy',
      message: `Bucket "${bucketName}" exists and is accessible.`,
      duration: Date.now() - start,
      details: { bucket: bucketName },
    }
  } catch (err: any) {
    return {
      name: 'bucket_access',
      status: 'error',
      message: err?.message || 'Failed to check bucket access.',
      duration: Date.now() - start,
      details: { bucket: bucketName, error: err?.message },
    }
  }
}

async function checkUploadAndSignedUrl(): Promise<StorageCheck> {
  const start = Date.now()
  const bucketName = process.env.GCS_BUCKET

  if (!bucketName) {
    return {
      name: 'upload_and_signed_url',
      status: 'not_configured',
      message: 'GCS_BUCKET is not set.',
      duration: Date.now() - start,
    }
  }

  const testKey = `health-checks/storage-test-${Date.now()}.txt`
  const testContent = Buffer.from('tutorme-storage-health-check')

  try {
    const { getStorage } = await import('@/lib/storage/gcs')
    const storage = await getStorage()
    const bucket = storage.bucket(bucketName)
    const file = bucket.file(testKey)

    // 1. Upload
    await file.save(testContent, {
      metadata: { contentType: 'text/plain' },
    })

    // 2. Generate signed URL
    let signedUrl: string | null = null
    let signedUrlFailed = false
    let signedUrlError: string | null = null
    try {
      const [url] = await file.getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + 60 * 1000,
      })
      signedUrl = url
    } catch (err: any) {
      signedUrlFailed = true
      signedUrlError = err?.message || String(err)
    }

    // 3. Try makePublic and detect uniform bucket-level access
    let makePublicFailed = false
    let makePublicError: string | null = null
    let uniformBucketLevelAccess = false
    try {
      await file.makePublic()
    } catch (err: any) {
      makePublicFailed = true
      makePublicError = err?.message || String(err)
      if (err?.code === 400 || err?.message?.includes('uniform bucket-level access')) {
        uniformBucketLevelAccess = true
      }
    }

    // 4. Cleanup
    try {
      await file.delete()
    } catch {
      // ignore cleanup errors
    }

    const details: Record<string, unknown> = {
      uploadSuccess: true,
      signedUrlGenerated: !signedUrlFailed,
      signedUrlError,
      makePublicSuccess: !makePublicFailed,
      makePublicError,
      uniformBucketLevelAccess,
      testKey,
    }

    if (signedUrlFailed && makePublicFailed && !uniformBucketLevelAccess) {
      return {
        name: 'upload_and_signed_url',
        status: 'error',
        message: 'Upload succeeded, but both signed URL generation and makePublic() failed.',
        duration: Date.now() - start,
        details,
      }
    }

    if (signedUrlFailed) {
      return {
        name: 'upload_and_signed_url',
        status: 'warning',
        message:
          'Upload succeeded, but signed URL generation failed. The system will fall back to public URLs.',
        duration: Date.now() - start,
        details,
      }
    }

    if (makePublicFailed && uniformBucketLevelAccess) {
      return {
        name: 'upload_and_signed_url',
        status: 'healthy',
        message:
          'Upload and signed URL generation work. Uniform bucket-level access is enabled (makePublic skipped — this is expected and secure).',
        duration: Date.now() - start,
        details,
      }
    }

    return {
      name: 'upload_and_signed_url',
      status: 'healthy',
      message: 'Upload, signed URL generation, and public ACLs all work correctly.',
      duration: Date.now() - start,
      details,
    }
  } catch (err: any) {
    return {
      name: 'upload_and_signed_url',
      status: 'error',
      message: err?.message || 'Upload test failed.',
      duration: Date.now() - start,
      details: { uploadFailed: true, error: err?.message },
    }
  }
}

function calculateOverallStatus(checks: StorageCheck[]): StorageHealthResult['overall'] {
  if (checks.some(c => c.status === 'error')) return 'error'
  if (checks.some(c => c.status === 'warning')) return 'warning'
  if (checks.every(c => c.status === 'not_configured')) return 'not_configured'
  return 'healthy'
}
