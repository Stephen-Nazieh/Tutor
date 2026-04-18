import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import type { Session } from 'next-auth'
import path from 'path'
import { mkdir, writeFile, access } from 'fs/promises'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024

const ALLOWED_MIME_PREFIXES = [
  'application/pdf',
  'image/',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.',
]

function isAllowedMimeType(type: string): boolean {
  return ALLOWED_MIME_PREFIXES.some(prefix => {
    if (prefix.endsWith('/') || prefix.endsWith('.')) {
      return type.startsWith(prefix)
    }
    return type === prefix
  })
}

function sanitizeFileName(fileName: string): string {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

/**
 * Convert a document to PDF using LibreOffice (soffice).
 * Returns the absolute path to the generated PDF, or null if conversion fails.
 */
async function convertToPdf(inputPath: string, outputDir: string): Promise<string | null> {
  try {
    await execAsync(`soffice --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`, {
      timeout: 30000,
    })
    const baseName = path.basename(inputPath, path.extname(inputPath))
    const pdfPath = path.join(outputDir, `${baseName}.pdf`)
    if (await fileExists(pdfPath)) {
      return pdfPath
    }
    return null
  } catch {
    return null
  }
}

export const POST = withCsrf(
  withAuth(async (request: NextRequest, session: Session) => {
    const formData = await request.formData()
    const file = formData.get('file')
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: 'File too large (max 20MB)' }, { status: 400 })
    }

    const fileType = file.type || 'application/octet-stream'
    if (!isAllowedMimeType(fileType)) {
      return NextResponse.json({ error: 'Disallowed file type' }, { status: 400 })
    }

    const safeName = sanitizeFileName(file.name || 'document')
    const timestamp = Date.now()
    const userId = session.user.id
    const relativeDir = path.join('uploads', 'documents', userId)
    const absoluteDir = path.join(process.cwd(), 'public', relativeDir)

    await mkdir(absoluteDir, { recursive: true })

    const storedName = `${timestamp}-${safeName}`
    const absolutePath = path.join(absoluteDir, storedName)
    const bytes = Buffer.from(await file.arrayBuffer())
    await writeFile(absolutePath, bytes)

    // If the file is not already a PDF, attempt to convert it to PDF.
    let pdfUrl: string | undefined
    let pdfName: string | undefined
    if (fileType !== 'application/pdf') {
      const pdfAbsolutePath = await convertToPdf(absolutePath, absoluteDir)
      if (pdfAbsolutePath) {
        const pdfStoredName = path.basename(pdfAbsolutePath)
        pdfUrl = `/${relativeDir}/${pdfStoredName}`
        pdfName = pdfStoredName
      }
    }

    return NextResponse.json({
      url: pdfUrl || `/${relativeDir}/${storedName}`,
      name: pdfName || storedName,
      originalUrl: `/${relativeDir}/${storedName}`,
      originalName: storedName,
      size: file.size,
      type: fileType,
      isPdf: fileType === 'application/pdf' || !!pdfUrl,
    })
  })
)
