/**
 * S3-compatible video upload: presigned PUT URL for direct browser upload.
 * Set S3_BUCKET, S3_REGION, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY; optional S3_ENDPOINT (e.g. MinIO).
 */

export interface PresignResult {
  uploadUrl: string
  publicUrl: string
  key: string
}

export async function getPresignedPutUrl(
  key: string,
  contentType: string,
  expiresInSeconds = 3600
): Promise<PresignResult | null> {
  const bucket = process.env.S3_BUCKET
  const region = process.env.S3_REGION
  const accessKey = process.env.S3_ACCESS_KEY_ID
  const secretKey = process.env.S3_SECRET_ACCESS_KEY
  if (!bucket || !region || !accessKey || !secretKey) return null

  try {
    // Dynamic import - these packages may not be installed
    const awsSdk = await import('@aws-sdk/client-s3').catch(() => null)
    const presigner = await import('@aws-sdk/s3-request-presigner').catch(() => null)
    
    if (!awsSdk || !presigner) {
      console.warn('AWS SDK packages not installed. S3 upload disabled.')
      return null
    }
    
    const { S3Client, PutObjectCommand } = awsSdk
    const { getSignedUrl } = presigner

    const endpoint = process.env.S3_ENDPOINT
    const client = new S3Client({
      region,
      credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
      ...(endpoint && { endpoint, forcePathStyle: true }),
    })

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    })

    const uploadUrl = await getSignedUrl(client, command, { expiresIn: expiresInSeconds })

    const publicUrl = endpoint
      ? `${endpoint.replace(/\/$/, '')}/${bucket}/${key}`
      : `https://${bucket}.s3.${region}.amazonaws.com/${key}`

    return { uploadUrl, publicUrl, key }
  } catch {
    return null
  }
}

export function isS3Configured(): boolean {
  return !!(
    process.env.S3_BUCKET &&
    process.env.S3_REGION &&
    process.env.S3_ACCESS_KEY_ID &&
    process.env.S3_SECRET_ACCESS_KEY
  )
}
