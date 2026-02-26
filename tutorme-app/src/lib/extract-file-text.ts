// @ts-nocheck
/**
 * Extract plain text from uploaded files: .txt, .md, .pdf, .docx, and images (OCR).
 * Used by the course/subject materials upload flow.
 */

export async function extractTextFromFile(file: File): Promise<string> {
  const name = file.name.toLowerCase()
  const type = file.type

  // Plain text
  if (
    type === 'text/plain' ||
    type.startsWith('text/') ||
    name.endsWith('.txt') ||
    name.endsWith('.md') ||
    name.endsWith('.markdown')
  ) {
    return readAsText(file)
  }

  // PDF
  if (type === 'application/pdf' || name.endsWith('.pdf')) {
    return extractPdfText(file)
  }

  // Word .docx
  if (
    type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    name.endsWith('.docx')
  ) {
    return extractDocxText(file)
  }

  // Legacy .doc - treat as binary; we could try mammoth with .doc but support is limited
  if (name.endsWith('.doc')) {
    try {
      return extractDocxText(file)
    } catch {
      return readAsText(file).catch(() => '')
    }
  }

  // Images: OCR
  if (type.startsWith('image/')) {
    return extractImageText(file)
  }

  // Fallback: try as text
  return readAsText(file).catch(() => '')
}

function readAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result ?? ''))
    reader.onerror = () => reject(reader.error)
    reader.readAsText(file)
  })
}

async function extractPdfText(file: File): Promise<string> {
  const pdfjs = await import('pdfjs-dist')
  // Worker must be same-origin (CSP blocks external scripts). Served from public/ via copy-pdf-worker script.
  if (typeof window !== 'undefined') {
    const opts = (pdfjs as { GlobalWorkerOptions?: { workerSrc?: string } }).GlobalWorkerOptions
    if (opts && !opts.workerSrc) {
      opts.workerSrc = '/pdf.worker.min.mjs'
    }
  }
  const data = await file.arrayBuffer()
  const doc = await pdfjs.getDocument({ data }).promise
  const numPages = doc.numPages
  const parts: string[] = []
  for (let i = 1; i <= numPages; i++) {
    const page = await doc.getPage(i)
    const content = await page.getTextContent()
    const pageText = content.items.map((item: { str?: string }) => (item as { str?: string }).str ?? '').join(' ')
    parts.push(pageText)
  }
  return parts.join('\n\n').trim() || ''
}

async function extractDocxText(file: File): Promise<string> {
  const mammoth = await import('mammoth')
  const arrayBuffer = await file.arrayBuffer()
  const result = await mammoth.extractRawText({ arrayBuffer })
  return (result.value || '').trim()
}

async function extractImageText(file: File): Promise<string> {
  const mod = await import('tesseract.js')
  const api = (mod as { default?: { recognize: (image: File, lang?: string, opts?: object) => Promise<{ data: { text?: string } }> }; recognize?: (image: File, lang?: string, opts?: object) => Promise<{ data: { text?: string } }> }).default ?? mod
  const { data } = await api.recognize(file, 'eng', { logger: () => {} })
  return (data?.text || '').trim()
}
