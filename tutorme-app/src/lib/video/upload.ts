/**
 * GCS video upload: presigned PUT URL for direct browser upload.
 * Set GCS_BUCKET, GCP_PROJECT_ID, GCP_SA_KEY.
 */

import { createPresignedUploadUrl, isGcsConfigured } from '@/lib/storage/gcs'

export interface PresignResult {
  uploadUrl: string
  publicUrl: string
  key: string
  uploadHeaders?: Record<string, string>
}

export async function getPresignedPutUrl(
  key: string,
  contentType: string,
  expiresInSeconds = 3600
): Promise<PresignResult | null> {
  try {
    if (!isGcsConfigured()) return null
    const { uploadUrl, publicUrl, uploadHeaders } = await createPresignedUploadUrl(
      key,
      contentType,
      false
    )
    return { uploadUrl, publicUrl: publicUrl ?? uploadUrl.split('?')[0], key, uploadHeaders }
  } catch {
    return null
  }
}

export { isGcsConfigured }
