'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { PDFCollaborativeViewer } from './PDFCollaborativeViewer'

interface PDFTutoringWorkbenchProps {
  roomId: string
}

export function PDFTutoringWorkbench({ roomId }: PDFTutoringWorkbenchProps) {
  const [extractResult, setExtractResult] = useState('')
  const [preprocessUrl, setPreprocessUrl] = useState('')
  const [status, setStatus] = useState('Idle')
  const [extractParser, setExtractParser] = useState<string>('unknown')
  const [techCheck, setTechCheck] = useState<{ unpdfAvailable?: boolean; pdfParseAvailable?: boolean } | null>(null)

  const extractPdfText = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    setStatus('Extracting text...')
    const res = await fetch('/api/pdf-tutoring/extract', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    setExtractResult(data.markdown || data.text || '')
    setExtractParser(data.parser || 'unknown')
    setTechCheck(data.technologyCheck || null)
    setStatus(res.ok ? 'Text extracted' : 'Extraction failed')
  }

  const preprocessImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)

    setStatus('Preprocessing image...')
    const res = await fetch('/api/pdf-tutoring/preprocess', {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      setStatus('Preprocess failed')
      return
    }

    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    setPreprocessUrl(url)
    setStatus('Image preprocessed')
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>AI Tutoring Engine - PDF Workbench</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Room: {roomId}</Badge>
            <Badge>{status}</Badge>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="space-y-2 rounded-md border p-3">
              <h3 className="font-medium">Document Pipeline</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Parser: {extractParser}</Badge>
                {techCheck && (
                  <>
                    <Badge variant={techCheck.unpdfAvailable ? 'default' : 'outline'}>
                      unpdf {techCheck.unpdfAvailable ? 'on' : 'off'}
                    </Badge>
                    <Badge variant={techCheck.pdfParseAvailable ? 'default' : 'outline'}>
                      pdf-parse {techCheck.pdfParseAvailable ? 'on' : 'off'}
                    </Badge>
                  </>
                )}
              </div>
              <div className="space-y-2">
                <Input type="file" accept="application/pdf" onChange={extractPdfText} />
                <Input type="file" accept="image/*" onChange={preprocessImage} />
              </div>
              {extractResult && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{extractResult.length} chars extracted</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={async () => {
                        await navigator.clipboard.writeText(extractResult)
                        setStatus('Extracted text copied')
                      }}
                    >
                      Copy text
                    </Button>
                  </div>
                  <pre className="max-h-48 overflow-auto rounded bg-muted p-2 text-xs whitespace-pre-wrap">{extractResult}</pre>
                </div>
              )}
              {preprocessUrl && (
                <Image
                  src={preprocessUrl}
                  alt="Preprocessed homework"
                  width={512}
                  height={320}
                  className="max-h-48 w-auto rounded border"
                  unoptimized
                />
              )}
            </div>

            <div className="space-y-2 rounded-md border p-3">
              <h3 className="font-medium">Live Collaboration + Marking</h3>
              <p className="text-xs text-muted-foreground">
                Includes lock/unlock, mode toggles, low-latency sync broadcast, and PDF flattening output.
              </p>
              <Button variant="outline" size="sm" onClick={() => setStatus('Ready for live tutoring')}>Prepare Session</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <PDFCollaborativeViewer roomId={roomId} />
    </div>
  )
}
