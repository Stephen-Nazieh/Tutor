/**
 * File Upload Security Utilities
 *
 * Provides validation and sanitization for file uploads to prevent:
 * - Path traversal attacks
 * - Malicious file uploads
 * - DoS via oversized files
 */

import path from 'path'

// Dangerous file extensions that should never be allowed
const DANGEROUS_EXTENSIONS = [
  'exe',
  'dll',
  'bat',
  'cmd',
  'sh',
  'php',
  'jsp',
  'asp',
  'aspx',
  'jar',
  'war',
  'ear',
  'py',
  'rb',
  'pl',
  'cgi',
  'com',
  'scr',
  'pif',
  'vbs',
  'js',
  'wsf',
  'hta',
  'ps1',
  'psm1',
  'msh',
]

// Characters not allowed in filenames
const INVALID_FILENAME_CHARS = /[<>:"/\\|?*\x00-\x1f]/

/**
 * Validates and sanitizes a file upload
 *
 * @param fileName - Original filename
 * @param fileSize - File size in bytes
 * @param maxSize - Maximum allowed size in bytes
 * @returns Validation result with sanitized name or error
 */
export function validateFileUpload(
  fileName: string,
  fileSize: number,
  maxSize: number
): { valid: true; sanitizedName: string } | { valid: false; error: string } {
  // Check for empty filename
  if (!fileName || fileName.trim() === '') {
    return { valid: false, error: 'Filename is required' }
  }

  // Check file size
  if (fileSize > maxSize) {
    return { valid: false, error: `File size exceeds maximum of ${maxSize} bytes` }
  }

  // Check for null bytes (path traversal indicator)
  if (fileName.includes('\x00')) {
    return { valid: false, error: 'Invalid filename' }
  }

  // Check for invalid characters
  if (INVALID_FILENAME_CHARS.test(fileName)) {
    return { valid: false, error: 'Filename contains invalid characters' }
  }

  // Check for path traversal attempts
  if (fileName.includes('..') || fileName.includes('./') || fileName.includes('\\')) {
    return { valid: false, error: 'Invalid filename' }
  }

  // Get file extension
  const ext = path.extname(fileName).toLowerCase().slice(1)

  // Check for dangerous extensions
  if (DANGEROUS_EXTENSIONS.includes(ext)) {
    return { valid: false, error: `File type '.${ext}' is not allowed` }
  }

  // Sanitize filename: keep only alphanumeric, dots, dashes, and underscores
  const baseName = path.basename(fileName, path.extname(fileName))
  const sanitizedBase = baseName.replace(/[^a-zA-Z0-9\-_]/g, '_').slice(0, 100)
  const sanitizedExt = ext.slice(0, 20)
  const sanitizedName = sanitizedExt ? `${sanitizedBase}.${sanitizedExt}` : sanitizedBase

  return { valid: true, sanitizedName }
}

/**
 * Validates file content by checking magic bytes
 * Note: This is a basic implementation. For production, consider using:
 * - file-type library (npm install file-type)
 * - Or a proper file scanning service
 *
 * @param buffer - File buffer
 * @param expectedMimeType - Expected MIME type
 * @returns Whether the file content matches the expected type
 */
export function validateFileContent(buffer: Buffer, expectedMimeType: string): boolean {
  // Magic bytes for common file types
  const magicBytes: Record<string, number[]> = {
    'application/pdf': [0x25, 0x50, 0x44, 0x46], // %PDF
    'image/jpeg': [0xff, 0xd8, 0xff],
    'image/png': [0x89, 0x50, 0x4e, 0x47],
    'image/gif': [0x47, 0x49, 0x46, 0x38],
    'image/webp': [0x52, 0x49, 0x46, 0x46],
    'video/mp4': [0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70],
    'application/zip': [0x50, 0x4b, 0x03, 0x04],
  }

  const expectedMagic = magicBytes[expectedMimeType]
  if (!expectedMagic) {
    // Unknown type, allow (should be caught by extension check)
    return true
  }

  // Check if buffer starts with expected magic bytes
  for (let i = 0; i < expectedMagic.length; i++) {
    if (buffer[i] !== expectedMagic[i]) {
      return false
    }
  }

  return true
}

/**
 * Generates a safe filename with random component
 *
 * @param originalName - Original filename
 * @returns Safe filename with timestamp and random suffix
 */
export function generateSafeFileName(originalName: string): string {
  const ext = path.extname(originalName).toLowerCase().slice(0, 20)
  const timestamp = Date.now()
  const random = Math.random().toString(36).slice(2, 11)
  return `${timestamp}_${random}${ext ? '.' + ext : ''}`
}
