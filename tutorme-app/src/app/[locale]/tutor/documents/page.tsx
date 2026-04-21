'use client'

import { useState, useRef } from 'react'
import { Upload, FileText, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PDFViewer } from '@/components/pdf/PDFViewer'
import { toast } from 'sonner'

export default function TutorDocumentsPage() {
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Limit to 20MB
    if (file.size > 20 * 1024 * 1024) {
      toast.error('File too large (max 20MB)')
      return
    }

    setIsUploading(true)
    try {
      // Need CSRF token for uploads if required, but /api/uploads/documents might be CSRF protected.
      const csrfRes = await fetch('/api/csrf', { credentials: 'include' })
      const csrfData = await csrfRes.json().catch(() => ({}))
      const csrfToken = csrfData?.token ?? null

      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/uploads/documents', {
        method: 'POST',
        headers: {
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
        body: formData,
        credentials: 'include',
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload document')
      }

      if (data.url) {
        setFileUrl(data.url)
        toast.success('Document loaded successfully')
      } else {
        throw new Error('Failed to load document URL')
      }
    } catch (err: any) {
      toast.error(err.message || 'Error uploading file')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-gray-50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PDF Viewer</h1>
          <p className="text-sm text-gray-500">Upload and view PDF documents</p>
        </div>
        <div className="flex items-center gap-4">
          {fileUrl && (
            <Button variant="outline" onClick={() => setFileUrl(null)}>
              <X className="mr-2 h-4 w-4" />
              Close Document
            </Button>
          )}
          <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? 'Uploading...' : 'Upload Document'}
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,application/pdf,.doc,.docx,.ppt,.pptx"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {fileUrl ? (
          <PDFViewer fileUrl={fileUrl} className="h-full w-full" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-gray-400">
            <FileText className="mb-4 h-16 w-16 text-gray-300" />
            <p className="text-lg font-medium text-gray-600">No document selected</p>
            <p className="mt-2 text-sm">Click the upload button to view a PDF</p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Select File
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
