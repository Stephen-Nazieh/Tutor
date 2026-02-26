// @ts-nocheck
/**
 * S3 Storage Service
 *
 * Wraps AWS SDK v3 for file storage operations.
 * Supports S3-compatible providers (AWS S3, Cloudflare R2, MinIO, etc.)
 *
 * Required env vars:
 *   AWS_REGION              (e.g. "ap-southeast-1")
 *   AWS_ACCESS_KEY_ID
 *   AWS_SECRET_ACCESS_KEY
 *   AWS_S3_BUCKET           (bucket name)
 *   AWS_S3_ENDPOINT         (optional, for R2 / MinIO custom endpoints)
 *   AWS_S3_PUBLIC_URL       (optional, CDN/public base URL for public objects)
 */

import {
    S3Client,
    DeleteObjectCommand,
    HeadObjectCommand,
} from '@aws-sdk/client-s3'
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// ─── Config ───────────────────────────────────────────────────────────────────

const REGION = process.env.AWS_REGION || 'ap-southeast-1'
const BUCKET = process.env.AWS_S3_BUCKET || ''
const ENDPOINT = process.env.AWS_S3_ENDPOINT // For R2/MinIO
const PUBLIC_URL = process.env.AWS_S3_PUBLIC_URL // CDN base URL for public files
const MAX_UPLOAD_BYTES = 100 * 1024 * 1024 // 100 MB

// ─── Client ───────────────────────────────────────────────────────────────────

function getClient(): S3Client {
    return new S3Client({
        region: REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
        ...(ENDPOINT ? { endpoint: ENDPOINT, forcePathStyle: true } : {}),
    })
}

// Check if S3 is configured
export function isS3Configured(): boolean {
    return !!(
        process.env.AWS_ACCESS_KEY_ID &&
        process.env.AWS_SECRET_ACCESS_KEY &&
        BUCKET
    )
}

// ─── Presigned PUT URL ────────────────────────────────────────────────────────

interface PresignedUploadResult {
    uploadUrl: string
    key: string
    publicUrl: string | null
}

/**
 * Generate a presigned PUT URL for direct browser-to-S3 upload.
 * Expires in 15 minutes.
 */
export async function createPresignedUploadUrl(
    key: string,
    mimeType: string,
    isPublic: boolean = false
): Promise<PresignedUploadResult> {
    const client = getClient()

    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        ContentType: mimeType,
        ...(isPublic ? { ACL: 'public-read' } : {}),
    })

    const uploadUrl = await getSignedUrl(client, command, { expiresIn: 15 * 60 })

    // Public URL (CDN or S3 public URL)
    const publicUrl = isPublic
        ? PUBLIC_URL
            ? `${PUBLIC_URL.replace(/\/$/, '')}/${key}`
            : `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`
        : null

    return { uploadUrl, key, publicUrl }
}

// ─── Presigned GET URL ────────────────────────────────────────────────────────

/**
 * Generate a presigned GET URL for temporary access to a private file.
 * Default expiry: 1 hour.
 */
export async function createPresignedDownloadUrl(
    key: string,
    expiresInSeconds: number = 3600,
    filename?: string
): Promise<string> {
    const client = getClient()

    const command = new GetObjectCommand({
        Bucket: BUCKET,
        Key: key,
        ...(filename
            ? {
                ResponseContentDisposition: `attachment; filename="${encodeURIComponent(filename)}"`,
            }
            : {}),
    })

    return getSignedUrl(client, command, { expiresIn: expiresInSeconds })
}

// ─── Delete ───────────────────────────────────────────────────────────────────

/**
 * Delete an object from S3.
 */
export async function deleteObject(key: string): Promise<void> {
    const client = getClient()
    await client.send(
        new DeleteObjectCommand({ Bucket: BUCKET, Key: key })
    )
}

// ─── Key Generation ───────────────────────────────────────────────────────────

import { randomUUID } from 'crypto'
import path from 'path'

/**
 * Generate a unique S3 key for a resource.
 * Pattern: {prefix}/{uuid}{ext}
 */
export function generateResourceKey(
    tutorId: string,
    filename: string,
    prefix: string = 'resources'
): string {
    const ext = path.extname(filename).toLowerCase()
    const uuid = randomUUID()
    return `tutors/${tutorId}/${prefix}/${uuid}${ext}`
}

/**
 * Infer resource type from MIME type.
 */
export function inferResourceType(mimeType: string): string {
    if (mimeType.startsWith('image/')) return 'image'
    if (mimeType.startsWith('video/')) return 'video'
    if (mimeType === 'application/pdf' || mimeType.includes('word') || mimeType.startsWith('text/'))
        return 'document'
    if (mimeType.includes('excel') || mimeType.includes('sheet') || mimeType.includes('csv'))
        return 'spreadsheet'
    return 'other'
}

export { MAX_UPLOAD_BYTES }
