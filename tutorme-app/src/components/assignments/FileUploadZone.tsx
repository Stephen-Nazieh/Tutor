'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import {
    Upload,
    File,
    FileText,
    Image,
    X,
    CheckCircle2,
    AlertCircle,
    Loader2,
} from 'lucide-react'

export interface UploadedFile {
    url: string
    name: string
    size: number
    type: string
}

interface FileUploadZoneProps {
    taskId: string
    onUpload: (file: UploadedFile) => void
    onRemove?: (url: string) => void
    files?: UploadedFile[]
    maxFiles?: number
    disabled?: boolean
    className?: string
}

export function FileUploadZone({
    taskId,
    onUpload,
    onRemove,
    files = [],
    maxFiles = 5,
    disabled = false,
    className,
}: FileUploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [error, setError] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFile = useCallback(async (file: File) => {
        setError(null)
        setUploading(true)
        setUploadProgress(0)

        // Simulate progress
        const progressInterval = setInterval(() => {
            setUploadProgress((prev) => Math.min(prev + 15, 90))
        }, 200)

        try {
            const formData = new FormData()
            formData.append('file', file)

            const res = await fetch(`/api/student/assignments/${taskId}/upload`, {
                method: 'POST',
                body: formData,
            })

            clearInterval(progressInterval)

            if (res.ok) {
                const data = await res.json()
                setUploadProgress(100)
                onUpload(data.file)
                setTimeout(() => {
                    setUploadProgress(0)
                    setUploading(false)
                }, 500)
            } else {
                const errData = await res.json()
                setError(errData.error || 'Upload failed')
                setUploading(false)
                setUploadProgress(0)
            }
        } catch {
            clearInterval(progressInterval)
            setError('Upload failed — please try again')
            setUploading(false)
            setUploadProgress(0)
        }
    }, [taskId, onUpload])

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault()
            setIsDragging(false)
            if (disabled || files.length >= maxFiles) return
            const droppedFile = e.dataTransfer.files[0]
            if (droppedFile) handleFile(droppedFile)
        },
        [disabled, files.length, maxFiles, handleFile]
    )

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) handleFile(selectedFile)
        if (inputRef.current) inputRef.current.value = ''
    }

    const getFileIcon = (type: string) => {
        if (type.includes('pdf')) return <FileText className="w-4 h-4 text-red-500" />
        if (type.includes('image')) return <Image className="w-4 h-4 text-blue-500" />
        return <File className="w-4 h-4 text-gray-500" />
    }

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    }

    return (
        <div className={className}>
            {/* Drop zone */}
            <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => !disabled && !uploading && inputRef.current?.click()}
                className={cn(
                    'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all',
                    isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-gray-300',
                    disabled && 'opacity-50 cursor-not-allowed',
                    uploading && 'pointer-events-none',
                )}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.docx"
                    onChange={handleSelect}
                    className="hidden"
                    disabled={disabled}
                />
                {uploading ? (
                    <div className="space-y-2">
                        <Loader2 className="w-8 h-8 mx-auto text-blue-500 animate-spin" />
                        <p className="text-sm text-gray-600">Uploading...</p>
                        <Progress value={uploadProgress} className="h-1.5 max-w-xs mx-auto" />
                    </div>
                ) : (
                    <>
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm font-medium text-gray-700">
                            Drop file here or click to browse
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            PDF, PNG, JPG, DOCX · Max 10MB
                        </p>
                    </>
                )}
            </div>

            {/* Error */}
            {error && (
                <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                </div>
            )}

            {/* Uploaded files list */}
            {files.length > 0 && (
                <div className="mt-3 space-y-1.5">
                    {files.map((f) => (
                        <div
                            key={f.url}
                            className="flex items-center gap-2 p-2 rounded-lg border bg-gray-50"
                        >
                            {getFileIcon(f.type)}
                            <span className="text-sm truncate flex-1">{f.name}</span>
                            <span className="text-xs text-gray-400">{formatSize(f.size)}</span>
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {onRemove && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); onRemove(f.url) }}
                                    className="p-0.5 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {files.length >= maxFiles && (
                <p className="text-xs text-gray-500 mt-2">
                    Maximum {maxFiles} files reached
                </p>
            )}
        </div>
    )
}
