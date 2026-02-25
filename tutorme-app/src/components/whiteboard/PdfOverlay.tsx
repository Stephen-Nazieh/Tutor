'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as fabric from 'fabric'
import type { AnyMathElement } from '@/types/math-whiteboard'

// PDF.js types
declare const pdfjsLib: typeof import('pdfjs-dist')

interface PdfOverlayProps {
  pdfUrl: string
  pageNumber: number
  width: number
  height: number
  onPageRender?: (pageInfo: { width: number; height: number; pageNum: number; totalPages: number }) => void
}

export function PdfOverlay({
  pdfUrl,
  pageNumber,
  width,
  height,
  onPageRender,
}: PdfOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pdfDoc, setPdfDoc] = useState<any>(null)
  const [scale, setScale] = useState(1)

  // Load PDF document
  useEffect(() => {
    let isMounted = true

    const loadPdf = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Dynamically import PDF.js
        const pdfjs = await import('pdfjs-dist')
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

        const loadingTask = pdfjs.getDocument(pdfUrl)
        const pdf = await loadingTask.promise

        if (isMounted) {
          setPdfDoc(pdf)
          onPageRender?.({
            width: 0,
            height: 0,
            pageNum: 1,
            totalPages: pdf.numPages,
          })
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load PDF')
          setIsLoading(false)
        }
      }
    }

    if (pdfUrl) {
      loadPdf()
    }

    return () => {
      isMounted = false
    }
  }, [pdfUrl, onPageRender])

  // Render page when document or page number changes
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return

    let isMounted = true

    const renderPage = async () => {
      try {
        setIsLoading(true)

        const page = await pdfDoc.getPage(pageNumber)

        // Calculate scale to fit the canvas
        const viewport = page.getViewport({ scale: 1 })
        const scaleX = width / viewport.width
        const scaleY = height / viewport.height
        const renderScale = Math.min(scaleX, scaleY) * 0.95 // 95% to leave some margin

        if (isMounted) {
          setScale(renderScale)
        }

        const scaledViewport = page.getViewport({ scale: renderScale })

        const canvas = canvasRef.current
        if (!canvas) return

        const context = canvas.getContext('2d')
        if (!context) return

        canvas.width = scaledViewport.width
        canvas.height = scaledViewport.height

        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        }

        await page.render(renderContext).promise

        if (isMounted) {
          setIsLoading(false)
          onPageRender?.({
            width: scaledViewport.width,
            height: scaledViewport.height,
            pageNum: pageNumber,
            totalPages: pdfDoc.numPages,
          })
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to render page')
          setIsLoading(false)
        }
      }
    }

    renderPage()

    return () => {
      isMounted = false
    }
  }, [pdfDoc, pageNumber, width, height, onPageRender])

  if (error) {
    return (
      <div
        className="flex items-center justify-center bg-red-50 border border-red-200 rounded"
        style={{ width, height }}
      >
        <div className="text-center p-4">
          <p className="text-red-600 text-sm">PDF Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="border shadow-sm"
        style={{
          maxWidth: width,
          maxHeight: height,
        }}
      />

      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-white/90"
          style={{ width: canvasRef.current?.width || width, height: canvasRef.current?.height || height }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-2 text-xs text-slate-500">Loading PDF...</p>
          </div>
        </div>
      )}
    </div>
  )
}

// PDF Upload Component
interface PdfUploaderProps {
  onPdfUpload: (file: File, url: string) => void
  className?: string
}

export function PdfUploader({ onPdfUpload, className = '' }: PdfUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file)
      onPdfUpload(file, url)
    }
  }, [onPdfUpload])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file)
      onPdfUpload(file, url)
    }
  }, [onPdfUpload])

  return (
    <div
      className={`
        border-2 border-dashed rounded-lg p-8 text-center transition-colors
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400'}
        ${className}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileSelect}
      />

      <svg
        className="mx-auto h-12 w-12 text-slate-400"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
        />
      </svg>

      <div className="mt-4">
        <p className="text-sm font-medium text-slate-700">
          Drop PDF here or click to upload
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Supports PDF worksheets and documents
        </p>
      </div>
    </div>
  )
}

// PDF Page Manager Component
interface PdfPageManagerProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  onClose?: () => void
  fileName?: string
}

export function PdfPageManager({
  totalPages,
  currentPage,
  onPageChange,
  onClose,
  fileName,
}: PdfPageManagerProps) {
  return (
    <div className="flex items-center gap-4 bg-white border rounded-lg px-4 py-2 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-500">PDF:</span>
        {fileName && (
          <span className="text-sm font-medium truncate max-w-[150px]">
            {fileName}
          </span>
        )}
      </div>

      <div className="w-px h-6 bg-slate-200" />

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          className="p-1 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <span className="text-sm min-w-[80px] text-center">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
          className="p-1 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {onClose && (
        <>
          <div className="w-px h-6 bg-slate-200" />
          <button
            onClick={onClose}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Remove PDF
          </button>
        </>
      )}
    </div>
  )
}

// PDF Export Component
interface PdfExportProps {
  pdfUrl: string
  annotations: AnyMathElement[]
  currentPage: number
  onExport?: (blob: Blob) => void
}

export async function exportPdfWithAnnotations({
  pdfUrl,
  annotations,
  currentPage,
  onExport,
}: PdfExportProps): Promise<void> {
  try {
    // Import pdf-lib
    const { PDFDocument, rgb } = await import('pdf-lib')

    // Fetch the existing PDF
    const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer())

    // Load the PDF
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    // Get the page
    const page = pdfDoc.getPage(currentPage - 1)
    const { width, height } = page.getSize()

    // Filter annotations for current page
    const pageAnnotations = annotations.filter(
      el => el.type === 'path' || el.type === 'text' || el.type === 'equation'
    )

    // Add annotations as content streams
    for (const annotation of pageAnnotations) {
      switch (annotation.type) {
        case 'text':
          const textEl = annotation as any
          page.drawText(textEl.text, {
            x: annotation.x,
            y: height - annotation.y - (textEl.fontSize || 16),
            size: textEl.fontSize || 16,
            color: hexToRgb(textEl.color || '#000000'),
          })
          break

        case 'path':
          const pathEl = annotation as any
          if (pathEl.points && pathEl.points.length > 1) {
            // Draw path as line segments
            for (let i = 1; i < pathEl.points.length; i++) {
              const p1 = pathEl.points[i - 1]
              const p2 = pathEl.points[i]
              if (p1 && p2) {
                page.drawLine({
                  start: { x: p1.x + annotation.x, y: height - (p1.y + annotation.y) },
                  end: { x: p2.x + annotation.x, y: height - (p2.y + annotation.y) },
                  thickness: pathEl.strokeWidth || 2,
                  color: hexToRgb(pathEl.strokeColor || '#000000'),
                })
              }
            }
          }
          break

        case 'equation':
          const eqEl = annotation as any
          page.drawText(`[LaTeX: ${eqEl.latex}]`, {
            x: annotation.x,
            y: height - annotation.y - 20,
            size: 12,
            color: hexToRgb(eqEl.color || '#000000'),
          })
          break
      }
    }

    // Save the PDF
    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })

    onExport?.(blob)

    // Download
    const downloadUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = `annotated-${Date.now()}.pdf`
    link.click()
    URL.revokeObjectURL(downloadUrl)
  } catch (error) {
    console.error('PDF export failed:', error)
    throw error
  }
}

// Helper function to convert hex color to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) {
    return { r: 0, g: 0, b: 0 }
  }
  return {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  }
}

export default PdfOverlay
