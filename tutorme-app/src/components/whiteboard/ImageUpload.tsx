// @ts-nocheck
'use client'

import { useState, useCallback, useRef } from 'react'
import { ImagePlus, X, Upload, Loader2 } from 'lucide-react'
import type { AnyMathElement } from '@/types/math-whiteboard'

interface ImageUploadProps {
  onImageUpload: (element: AnyMathElement) => void
  className?: string
}

interface ImageElement extends AnyMathElement {
  type: 'image'
  src: string
  width: number
  height: number
}

export function ImageUpload({ onImageUpload, className = '' }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showUploader, setShowUploader] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const processImage = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return

    setIsLoading(true)

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        // Calculate dimensions (max 400px width/height while maintaining aspect ratio)
        let { width, height } = img
        const maxSize = 400
        
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = (height / width) * maxSize
            width = maxSize
          } else {
            width = (width / height) * maxSize
            height = maxSize
          }
        }

        const element: ImageElement = {
          id: `img-${Date.now()}`,
          type: 'image',
          authorId: 'current-user',
          layer: 0,
          locked: false,
          x: 100, // Default position, can be adjusted
          y: 100,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
          version: 1,
          lastModified: Date.now(),
          modifiedBy: 'current-user',
          src: e.target?.result as string,
          width: Math.round(width),
          height: Math.round(height),
        }

        onImageUpload(element)
        setIsLoading(false)
        setShowUploader(false)
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }, [onImageUpload])

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
    if (file && file.type.startsWith('image/')) {
      processImage(file)
    }
  }, [processImage])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      processImage(file)
    }
  }, [processImage])

  return (
    <>
      {/* Image Upload Button */}
      <button
        onClick={() => setShowUploader(true)}
        className={`flex items-center gap-1 px-3 py-2 text-sm border rounded hover:bg-slate-50 ${className}`}
      >
        <ImagePlus className="w-4 h-4" />
        Image
      </button>

      {/* Uploader Modal */}
      {showUploader && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Upload Image</h3>
              <button
                onClick={() => setShowUploader(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isLoading ? (
              <div className="py-12 text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
                <p className="mt-2 text-sm text-slate-500">Processing image...</p>
              </div>
            ) : (
              <div
                className={`
                  border-2 border-dashed rounded-lg p-8 text-center transition-colors
                  ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400'}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />

                <Upload className="w-10 h-10 mx-auto text-slate-400 mb-3" />

                <p className="text-sm text-slate-600">
                  Drop image here or click to upload
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Supports JPG, PNG, GIF
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

// Image element renderer for Fabric.js
export function createImageObject(element: ImageElement): fabric.Object {
  return new fabric.Image(element.src, {
    left: element.x,
    top: element.y,
    width: element.width,
    height: element.height,
    selectable: true,
    evented: true,
  })
}

export default ImageUpload
